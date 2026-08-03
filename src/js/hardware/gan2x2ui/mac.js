/**
 * Récupération auto de la MAC GAN via BLE advertisements.
 *
 * Chrome : chrome://flags/#enable-experimental-web-platform-features
 *       (+ new-permissions-backend si besoin)
 * Bluefy iOS : Enable BLE Advertisements
 *
 * Format (afedotov / csTimer) : derniers 6 octets du Manufacturer Specific Data,
 * stockés little-endian → on lit à l'envers pour obtenir AA:BB:CC:DD:EE:FF.
 */

/** Company IDs GAN observés : 0x0001, 0x0101, … 0xFF01 */
export const GAN_COMPANY_IDS = Array.from({ length: 256 }, (_, i) => (i << 8) | 0x01);

const CACHE_PREFIX = "gan2x2ui.mac.";

/**
 * @param {DataView} dataView
 * @returns {string|null}
 */
export function extractMacFromDataView(dataView) {
  if (!dataView || dataView.byteLength < 6) return null;
  // Certains firmwares préfixent un octet de type → on prend les 6 derniers.
  const mac = [];
  for (let i = 1; i <= 6; i++) {
    mac.push(dataView.getUint8(dataView.byteLength - i).toString(16).padStart(2, "0"));
  }
  return mac.join(":");
}

/**
 * @param {BluetoothManufacturerDataMap|Map|undefined} manufacturerData
 * @returns {string|null}
 */
export function extractMacFromManufacturerData(manufacturerData) {
  if (!manufacturerData) return null;
  for (const [, view] of manufacturerData) {
    const mac = extractMacFromDataView(view);
    if (mac) return mac;
  }
  return null;
}

/**
 * Suffixe 12 hex dans le nom (ex. GAN-xxxx-AABBCCDDEEFF) — jamais un suffixe 6 hex + OUI inventé.
 * @param {string} [name]
 * @returns {string|null}
 */
export function extractMacFromDeviceName(name) {
  if (!name) return null;
  const m = String(name).match(/([0-9a-f]{12})\s*$/i);
  if (!m) return null;
  const h = m[1].toLowerCase();
  return h.match(/.{2}/g).join(":");
}

/**
 * @param {string} [deviceId]
 * @param {string} [deviceName]
 * @returns {string|null}
 */
export function loadCachedMac(deviceId, deviceName) {
  try {
    if (typeof localStorage === "undefined") return null;
    if (deviceId) {
      const v = localStorage.getItem(CACHE_PREFIX + "id." + deviceId);
      if (v) return v;
    }
    if (deviceName) {
      const v = localStorage.getItem(CACHE_PREFIX + "name." + deviceName);
      if (v) return v;
    }
  } catch {
    /* private mode */
  }
  return null;
}

/**
 * @param {string} mac
 * @param {string} [deviceId]
 * @param {string} [deviceName]
 */
export function saveCachedMac(mac, deviceId, deviceName) {
  try {
    if (typeof localStorage === "undefined" || !mac) return;
    if (deviceId) localStorage.setItem(CACHE_PREFIX + "id." + deviceId, mac);
    if (deviceName) localStorage.setItem(CACHE_PREFIX + "name." + deviceName, mac);
  } catch {
    /* ignore */
  }
}

/**
 * Attend un advertisement avec manufacturer data utilisable.
 * @param {BluetoothDevice} device
 * @param {{ timeoutMs?: number, signal?: AbortSignal }} [opts]
 * @returns {Promise<string>}
 */
export async function resolveMacFromAdvertisements(device, opts = {}) {
  if (typeof device.watchAdvertisements !== "function") {
    throw new Error(
      "watchAdvertisements indisponible — active chrome://flags/#enable-experimental-web-platform-features puis relance Chrome"
    );
  }

  const timeoutMs = opts.timeoutMs ?? 10000;
  const ac = new AbortController();
  const onAbort = () => ac.abort();
  opts.signal?.addEventListener("abort", onAbort, { once: true });

  return new Promise((resolve, reject) => {
    let settled = false;
    const timer = setTimeout(() => {
      finish(() =>
        reject(
          new Error(
            "Timeout advertisements — flag Chrome experimental + cube allumé à proximité, ou passe opts.mac"
          )
        )
      );
    }, timeoutMs);

    function finish(fn) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      opts.signal?.removeEventListener("abort", onAbort);
      try {
        ac.abort();
      } catch {
        /* already aborted */
      }
      fn();
    }

    const onAdv = (ev) => {
      const mac = extractMacFromManufacturerData(ev.manufacturerData);
      if (mac) finish(() => resolve(mac));
    };

    device.addEventListener("advertisementreceived", onAdv);

    device.watchAdvertisements({ signal: ac.signal }).catch((err) => {
      finish(() =>
        reject(
          err?.name === "NotFoundError" || /experimental|permission/i.test(String(err?.message || err))
            ? new Error(
                "Advertisements bloqués — chrome://flags/#enable-experimental-web-platform-features (ou new-permissions-backend)"
              )
            : err
        )
      );
    });

    ac.signal.addEventListener(
      "abort",
      () => {
        device.removeEventListener("advertisementreceived", onAdv);
        if (!settled && opts.signal?.aborted) {
          finish(() => reject(new DOMException("Aborted", "AbortError")));
        }
      },
      { once: true }
    );
  });
}

/**
 * Résolution MAC : opts.mac → ads → nom → cache localStorage.
 * @param {BluetoothDevice} device
 * @param {{ mac?: string|Uint8Array, autoMac?: boolean, macTimeoutMs?: number, signal?: AbortSignal, cache?: boolean }} opts
 * @returns {Promise<{ mac: string, source: 'opts'|'advertisement'|'name'|'cache' }>}
 */
export async function resolveMac(device, opts = {}) {
  if (opts.mac) {
    const mac =
      opts.mac instanceof Uint8Array
        ? [...opts.mac].map((b) => b.toString(16).padStart(2, "0")).join(":")
        : String(opts.mac).trim();
    if (opts.cache !== false) saveCachedMac(mac, device.id, device.name);
    return { mac, source: "opts" };
  }

  if (opts.autoMac === false) {
    throw new Error("opts.mac requis (autoMac désactivé)");
  }

  // 1) advertisements
  try {
    const mac = await resolveMacFromAdvertisements(device, {
      timeoutMs: opts.macTimeoutMs,
      signal: opts.signal,
    });
    if (opts.cache !== false) saveCachedMac(mac, device.id, device.name);
    return { mac, source: "advertisement" };
  } catch (err) {
    // 2) nom
    const fromName = extractMacFromDeviceName(device.name);
    if (fromName) {
      if (opts.cache !== false) saveCachedMac(fromName, device.id, device.name);
      return { mac: fromName, source: "name" };
    }
    // 3) cache
    const cached = loadCachedMac(device.id, device.name);
    if (cached) return { mac: cached, source: "cache" };
    throw err;
  }
}
