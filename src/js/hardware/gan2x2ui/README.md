# gan2x2ui (source)

ES modules used to generate `../gan2x2uilib.js` for the csTimer Closure build.

```bash
npx esbuild src/js/hardware/gan2x2ui/index.js \
  --bundle --format=iife --global-name=gan2x2ui --target=es2017 \
  --outfile=src/js/hardware/gan2x2uilib.js
```

Then prepend the MIT header in `gan2x2uilib.js`.

Upstream project: https://github.com/thomaslekieffre/gan2x2ui (MIT)
