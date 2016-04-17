var THREE = THREE || {};
if (!window.Int32Array) {
    window.Int32Array = Array;
    window.Float32Array = Array
}
THREE.Color = function(hex) {
    this.setHex(hex)
};
THREE.Color.prototype = {
    copy: function(color) {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        this.hex = color.hex
    },
    setHex: function(hex) {
        this.hex = ~~hex & 16777215;
        this.updateRGB()
    },
    setRGB: function(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.updateHex()
    },
    setHSV: function(h, s, v) {
        var r, g, b, i, f, p, q, t;
        if (v == 0) r = g = b = 0;
        else {
            i = Math.floor(h * 6);
            f = h * 6 - i;
            p = v * (1 - s);
            q = v * (1 - s * f);
            t = v * (1 - s * (1 - f));
            switch (i) {
                case 1:
                    r = q;
                    g = v;
                    b = p;
                    break;
                case 2:
                    r = p;
                    g = v;
                    b = t;
                    break;
                case 3:
                    r = p;
                    g = q;
                    b = v;
                    break;
                case 4:
                    r = t;
                    g = p;
                    b = v;
                    break;
                case 5:
                    r = v;
                    g = p;
                    b = q;
                    break;
                case 6:
                case 0:
                    r = v;
                    g = t;
                    b = p;
                    break
            }
        }
        this.setRGB(r, g, b)
    },
    updateHex: function() {
        this.hex = ~~(this.r * 255) << 16 ^ ~~(this.g * 255) << 8 ^ ~~(this.b * 255)
    },
    updateRGB: function() {
        this.r = (this.hex >> 16 & 255) / 255;
        this.g = (this.hex >> 8 & 255) / 255;
        this.b = (this.hex & 255) / 255
    },
    clone: function() {
        return new THREE.Color(this.hex)
    }
};
THREE.Vector2 = function(x, y) {
    this.set(x || 0, y || 0)
};
THREE.Vector2.prototype = {
    set: function(x, y) {
        this.x = x;
        this.y = y;
        return this
    },
    copy: function(v) {
        this.x = v.x;
        this.y = v.y;
        return this
    },
    clone: function() {
        return new THREE.Vector2(this.x, this.y)
    },
    add: function(v1, v2) {
        this.x = v1.x + v2.x;
        this.y = v1.y + v2.y;
        return this
    },
    addSelf: function(v) {
        this.x += v.x;
        this.y += v.y;
        return this
    },
    sub: function(v1, v2) {
        this.x = v1.x - v2.x;
        this.y = v1.y - v2.y;
        return this
    },
    subSelf: function(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this
    },
    multiplyScalar: function(s) {
        this.x *= s;
        this.y *= s;
        return this
    },
    divideScalar: function(s) {
        if (s) {
            this.x /=
                s;
            this.y /= s
        } else this.set(0, 0);
        return this
    },
    negate: function() {
        return this.multiplyScalar(-1)
    },
    dot: function(v) {
        return this.x * v.x + this.y * v.y
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y
    },
    length: function() {
        return Math.sqrt(this.lengthSq())
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    setLength: function(l) {
        return this.normalize().multiplyScalar(l)
    },
    unit: function() {
        return this.normalize()
    }
};
THREE.Vector3 = function(x, y, z) {
    this.set(x || 0, y || 0, z || 0)
};
THREE.Vector3.prototype = {
    set: function(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this
    },
    copy: function(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this
    },
    clone: function() {
        return new THREE.Vector3(this.x, this.y, this.z)
    },
    add: function(v1, v2) {
        this.x = v1.x + v2.x;
        this.y = v1.y + v2.y;
        this.z = v1.z + v2.z;
        return this
    },
    addSelf: function(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this
    },
    addScalar: function(s) {
        this.x += s;
        this.y += s;
        this.z += s;
        return this
    },
    sub: function(v1, v2) {
        this.x = v1.x - v2.x;
        this.y = v1.y - v2.y;
        this.z = v1.z - v2.z;
        return this
    },
    subSelf: function(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this
    },
    multiply: function(a, b) {
        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;
        return this
    },
    multiplySelf: function(v) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.y;
        return this
    },
    multiplyScalar: function(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        return this
    },
    divideSelf: function(v) {
        return this.divide(this, v)
    },
    divideScalar: function(s) {
        if (s) {
            this.x /= s;
            this.y /= s;
            this.z /= s
        } else this.set(0, 0, 0);
        return this
    },
    negate: function() {
        return this.multiplyScalar(-1)
    },
    dot: function(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y + this.z * this.z
    },
    length: function() {
        return Math.sqrt(this.lengthSq())
    },
    lengthManhattan: function() {
        return this.x + this.y + this.z
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    setLength: function(l) {
        return this.normalize().multiplyScalar(l)
    },
    cross: function(a, b) {
        this.x = a.y * b.z - a.z * b.y;
        this.y = a.z * b.x - a.x * b.z;
        this.z = a.x * b.y - a.y * b.x;
        return this
    },
    crossSelf: function(v) {
        return this.set(this.y *
            v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x)
    },
    distanceTo: function(v) {
        return Math.sqrt(this.distanceToSquared(v))
    },
    distanceToSquared: function(v) {
        return (new THREE.Vector3).sub(this, v).lengthSq()
    },
    setPositionFromMatrix: function(m) {
        this.x = m.n14;
        this.y = m.n24;
        this.z = m.n34
    },
    setRotationFromMatrix: function(m) {
        var cosY = Math.cos(this.y);
        this.y = Math.asin(m.n13);
        if (Math.abs(cosY) > 1.0E-5) {
            this.x = Math.atan2(-m.n23 / cosY, m.n33 / cosY);
            this.z = Math.atan2(-m.n12 / cosY, m.n11 / cosY)
        } else {
            this.x = 0;
            this.z = Math.atan2(m.n21,
                m.n22)
        }
    },
    isZero: function() {
        return this.lengthSq() < 1.0E-4
    }
};
THREE.Vector4 = function(x, y, z, w) {
    this.set(x || 0, y || 0, z || 0, w || 1)
};
THREE.Vector4.prototype = {
    set: function(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this
    },
    copy: function(v) {
        return this.set(v.x, v.y, v.z, v.w || 1)
    },
    clone: function() {
        return new THREE.Vector4(this.x, this.y, this.z, this.w)
    },
    add: function(v1, v2) {
        this.x = v1.x + v2.x;
        this.y = v1.y + v2.y;
        this.z = v1.z + v2.z;
        this.w = v1.w + v2.w;
        return this
    },
    addSelf: function(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        this.w += v.w;
        return this
    },
    sub: function(v1, v2) {
        this.x = v1.x - v2.x;
        this.y = v1.y - v2.y;
        this.z = v1.z - v2.z;
        this.w = v1.w - v2.w;
        return this
    },
    subSelf: function(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        this.w -= v.w;
        return this
    },
    multiplyScalar: function(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        this.w *= s;
        return this
    },
    divideScalar: function(s) {
        if (s) {
            this.x /= s;
            this.y /= s;
            this.z /= s;
            this.w /= s
        } else this.set(0, 0, 0, 1);
        return this
    },
    negate: function() {
        return this.multiplyScalar(-1)
    },
    dot: function(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w
    },
    lengthSq: function() {
        return this.dot(this)
    },
    length: function() {
        return Math.sqrt(this.lengthSq())
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    setLength: function(l) {
        return this.normalize().multiplyScalar(l)
    },
    lerpSelf: function(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        this.z += (v.z - this.z) * alpha;
        this.w += (v.w - this.w) * alpha;
        return this
    }
};
THREE.Ray = function(origin, direction) {
    this.origin = origin || new THREE.Vector3;
    this.direction = direction || new THREE.Vector3
};
THREE.Ray.prototype = {
    intersectScene: function(scene) {
        return this.intersectObjects(scene.objects)
    },
    intersectObjects: function(objects) {
        var i, l, object, intersects = [];
        for (i = 0, l = objects.length; i < l; i++) intersects = intersects.concat(this.intersectObject(objects[i]));
        intersects.sort(function(a, b) {
            return a.distance - b.distance
        });
        return intersects
    },
    intersectObject: function(object) {
        if (object instanceof THREE.Particle) {
            var distance = distanceFromIntersection(this.origin, this.direction, object);
            if (!distance || distance >
                object.scale.x) return [];
            return [{
                distance: distance,
                point: object.position,
                face: null,
                object: object
            }]
        } else if (object instanceof THREE.Mesh) {
            var distance = distanceFromIntersection(this.origin, this.direction, object);
            if (!distance || distance > object.geometry.boundingSphere.radius * Math.max(object.scale.x, Math.max(object.scale.y, object.scale.z))) return [];
            var f, fl, face, a, b, c, d, normal, dot, scalar, origin, direction, geometry = object.geometry,
                vertices = geometry.vertices,
                objMatrix, intersect, intersects = [],
                intersectPoint;
            for (f = 0, fl = geometry.faces.length; f < fl; f++) {
                face = geometry.faces[f];
                origin = this.origin.clone();
                direction = this.direction.clone();
                objMatrix = object.matrixWorld;
                a = objMatrix.multiplyVector3(vertices[face.a].position.clone());
                b = objMatrix.multiplyVector3(vertices[face.b].position.clone());
                c = objMatrix.multiplyVector3(vertices[face.c].position.clone());
                d = face instanceof THREE.Face4 ? objMatrix.multiplyVector3(vertices[face.d].position.clone()) : null;
                normal = object.matrixRotationWorld.multiplyVector3(face.normal.clone());
                dot = direction.dot(normal);
                if (object.doubleSided || (object.flipSided ? dot > 0 : dot < 0)) {
                    scalar = normal.dot((new THREE.Vector3).sub(a, origin)) / dot;
                    intersectPoint = origin.addSelf(direction.multiplyScalar(scalar));
                    if (face instanceof THREE.Face3) {
                        if (pointInFace3(intersectPoint, a, b, c)) {
                            intersect = {
                                distance: this.origin.distanceTo(intersectPoint),
                                point: intersectPoint,
                                face: face,
                                object: object
                            };
                            intersects.push(intersect)
                        }
                    } else if (face instanceof THREE.Face4)
                        if (pointInFace3(intersectPoint, a, b, d) || pointInFace3(intersectPoint,
                                b, c, d)) {
                            intersect = {
                                distance: this.origin.distanceTo(intersectPoint),
                                point: intersectPoint,
                                face: face,
                                object: object
                            };
                            intersects.push(intersect)
                        }
                }
            }
            return intersects
        } else return [];

        function distanceFromIntersection(origin, direction, object) {
            var vector, dot, intersect, distance;
            vector = object.position.clone().subSelf(origin);
            dot = vector.dot(direction);
            if (dot < 0) return false;
            intersect = origin.clone().addSelf(direction.clone().multiplyScalar(dot));
            distance = object.position.distanceTo(intersect);
            return distance
        }

        function pointInFace3(p,
            a, b, c) {
            var v0 = c.clone().subSelf(a),
                v1 = b.clone().subSelf(a),
                v2 = p.clone().subSelf(a),
                dot00 = v0.dot(v0),
                dot01 = v0.dot(v1),
                dot02 = v0.dot(v2),
                dot11 = v1.dot(v1),
                dot12 = v1.dot(v2),
                invDenom = 1 / (dot00 * dot11 - dot01 * dot01),
                u = (dot11 * dot02 - dot01 * dot12) * invDenom,
                v = (dot00 * dot12 - dot01 * dot02) * invDenom;
            return u > 0 && v > 0 && u + v < 1
        }
    }
};
THREE.Rectangle = function() {
    var _left, _top, _right, _bottom, _width, _height, _isEmpty = true;

    function resize() {
        _width = _right - _left;
        _height = _bottom - _top
    }
    this.getX = function() {
        return _left
    };
    this.getY = function() {
        return _top
    };
    this.getWidth = function() {
        return _width
    };
    this.getHeight = function() {
        return _height
    };
    this.getLeft = function() {
        return _left
    };
    this.getTop = function() {
        return _top
    };
    this.getRight = function() {
        return _right
    };
    this.getBottom = function() {
        return _bottom
    };
    this.set = function(left, top, right, bottom) {
        _isEmpty =
            false;
        _left = left;
        _top = top;
        _right = right;
        _bottom = bottom;
        resize()
    };
    this.addPoint = function(x, y) {
        if (_isEmpty) {
            _isEmpty = false;
            _left = x;
            _top = y;
            _right = x;
            _bottom = y;
            resize()
        } else {
            _left = _left < x ? _left : x;
            _top = _top < y ? _top : y;
            _right = _right > x ? _right : x;
            _bottom = _bottom > y ? _bottom : y;
            resize()
        }
    };
    this.add3Points = function(x1, y1, x2, y2, x3, y3) {
        if (_isEmpty) {
            _isEmpty = false;
            _left = x1 < x2 ? x1 < x3 ? x1 : x3 : x2 < x3 ? x2 : x3;
            _top = y1 < y2 ? y1 < y3 ? y1 : y3 : y2 < y3 ? y2 : y3;
            _right = x1 > x2 ? x1 > x3 ? x1 : x3 : x2 > x3 ? x2 : x3;
            _bottom = y1 > y2 ? y1 > y3 ? y1 : y3 : y2 > y3 ? y2 : y3;
            resize()
        } else {
            _left =
                x1 < x2 ? x1 < x3 ? x1 < _left ? x1 : _left : x3 < _left ? x3 : _left : x2 < x3 ? x2 < _left ? x2 : _left : x3 < _left ? x3 : _left;
            _top = y1 < y2 ? y1 < y3 ? y1 < _top ? y1 : _top : y3 < _top ? y3 : _top : y2 < y3 ? y2 < _top ? y2 : _top : y3 < _top ? y3 : _top;
            _right = x1 > x2 ? x1 > x3 ? x1 > _right ? x1 : _right : x3 > _right ? x3 : _right : x2 > x3 ? x2 > _right ? x2 : _right : x3 > _right ? x3 : _right;
            _bottom = y1 > y2 ? y1 > y3 ? y1 > _bottom ? y1 : _bottom : y3 > _bottom ? y3 : _bottom : y2 > y3 ? y2 > _bottom ? y2 : _bottom : y3 > _bottom ? y3 : _bottom;
            resize()
        }
    };
    this.addRectangle = function(r) {
        if (_isEmpty) {
            _isEmpty = false;
            _left = r.getLeft();
            _top = r.getTop();
            _right =
                r.getRight();
            _bottom = r.getBottom();
            resize()
        } else {
            _left = _left < r.getLeft() ? _left : r.getLeft();
            _top = _top < r.getTop() ? _top : r.getTop();
            _right = _right > r.getRight() ? _right : r.getRight();
            _bottom = _bottom > r.getBottom() ? _bottom : r.getBottom();
            resize()
        }
    };
    this.inflate = function(v) {
        _left -= v;
        _top -= v;
        _right += v;
        _bottom += v;
        resize()
    };
    this.minSelf = function(r) {
        _left = _left > r.getLeft() ? _left : r.getLeft();
        _top = _top > r.getTop() ? _top : r.getTop();
        _right = _right < r.getRight() ? _right : r.getRight();
        _bottom = _bottom < r.getBottom() ? _bottom : r.getBottom();
        resize()
    };
    this.instersects = function(r) {
        return Math.min(_right, r.getRight()) - Math.max(_left, r.getLeft()) >= 0 && Math.min(_bottom, r.getBottom()) - Math.max(_top, r.getTop()) >= 0
    };
    this.empty = function() {
        _isEmpty = true;
        _left = 0;
        _top = 0;
        _right = 0;
        _bottom = 0;
        resize()
    };
    this.isEmpty = function() {
        return _isEmpty
    }
};
THREE.Matrix3 = function() {
    this.m = []
};
THREE.Matrix3.prototype = {
    transpose: function() {
        var tmp, m = this.m;
        tmp = m[1];
        m[1] = m[3];
        m[3] = tmp;
        tmp = m[2];
        m[2] = m[6];
        m[6] = tmp;
        tmp = m[5];
        m[5] = m[7];
        m[7] = tmp;
        return this
    },
    transposeIntoArray: function(r) {
        var m = this.m;
        r[0] = m[0];
        r[1] = m[3];
        r[2] = m[6];
        r[3] = m[1];
        r[4] = m[4];
        r[5] = m[7];
        r[6] = m[2];
        r[7] = m[5];
        r[8] = m[8];
        return this
    }
};
THREE.Matrix4 = function(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
    this.set(n11 || 1, n12 || 0, n13 || 0, n14 || 0, n21 || 0, n22 || 1, n23 || 0, n24 || 0, n31 || 0, n32 || 0, n33 || 1, n34 || 0, n41 || 0, n42 || 0, n43 || 0, n44 || 1);
    this.flat = new Array(16);
    this.m33 = new THREE.Matrix3
};
THREE.Matrix4.prototype = {
    set: function(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
        this.n11 = n11;
        this.n12 = n12;
        this.n13 = n13;
        this.n14 = n14;
        this.n21 = n21;
        this.n22 = n22;
        this.n23 = n23;
        this.n24 = n24;
        this.n31 = n31;
        this.n32 = n32;
        this.n33 = n33;
        this.n34 = n34;
        this.n41 = n41;
        this.n42 = n42;
        this.n43 = n43;
        this.n44 = n44;
        return this
    },
    identity: function() {
        this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this
    },
    copy: function(m) {
        this.set(m.n11, m.n12, m.n13, m.n14, m.n21, m.n22, m.n23, m.n24, m.n31, m.n32, m.n33, m.n34, m.n41,
            m.n42, m.n43, m.n44);
        return this
    },
    lookAt: function(eye, center, up) {
        var x = THREE.Matrix4.__v1,
            y = THREE.Matrix4.__v2,
            z = THREE.Matrix4.__v3;
        z.sub(eye, center).normalize();
        if (z.length() === 0) z.z = 1;
        x.cross(up, z).normalize();
        if (x.length() === 0) {
            z.x += 1.0E-4;
            x.cross(up, z).normalize()
        }
        y.cross(z, x).normalize();
        this.n11 = x.x;
        this.n12 = y.x;
        this.n13 = z.x;
        this.n21 = x.y;
        this.n22 = y.y;
        this.n23 = z.y;
        this.n31 = x.z;
        this.n32 = y.z;
        this.n33 = z.z;
        return this
    },
    multiplyVector3: function(v) {
        var vx = v.x,
            vy = v.y,
            vz = v.z,
            d = 1 / (this.n41 * vx + this.n42 *
                vy + this.n43 * vz + this.n44);
        v.x = (this.n11 * vx + this.n12 * vy + this.n13 * vz + this.n14) * d;
        v.y = (this.n21 * vx + this.n22 * vy + this.n23 * vz + this.n24) * d;
        v.z = (this.n31 * vx + this.n32 * vy + this.n33 * vz + this.n34) * d;
        return v
    },
    multiplyVector4: function(v) {
        var vx = v.x,
            vy = v.y,
            vz = v.z,
            vw = v.w;
        v.x = this.n11 * vx + this.n12 * vy + this.n13 * vz + this.n14 * vw;
        v.y = this.n21 * vx + this.n22 * vy + this.n23 * vz + this.n24 * vw;
        v.z = this.n31 * vx + this.n32 * vy + this.n33 * vz + this.n34 * vw;
        v.w = this.n41 * vx + this.n42 * vy + this.n43 * vz + this.n44 * vw;
        return v
    },
    rotateAxis: function(v) {
        var vx =
            v.x,
            vy = v.y,
            vz = v.z;
        v.x = vx * this.n11 + vy * this.n12 + vz * this.n13;
        v.y = vx * this.n21 + vy * this.n22 + vz * this.n23;
        v.z = vx * this.n31 + vy * this.n32 + vz * this.n33;
        v.normalize();
        return v
    },
    crossVector: function(a) {
        var v = new THREE.Vector4;
        v.x = this.n11 * a.x + this.n12 * a.y + this.n13 * a.z + this.n14 * a.w;
        v.y = this.n21 * a.x + this.n22 * a.y + this.n23 * a.z + this.n24 * a.w;
        v.z = this.n31 * a.x + this.n32 * a.y + this.n33 * a.z + this.n34 * a.w;
        v.w = a.w ? this.n41 * a.x + this.n42 * a.y + this.n43 * a.z + this.n44 * a.w : 1;
        return v
    },
    multiply: function(a, b) {
        var a11 = a.n11,
            a12 = a.n12,
            a13 =
            a.n13,
            a14 = a.n14,
            a21 = a.n21,
            a22 = a.n22,
            a23 = a.n23,
            a24 = a.n24,
            a31 = a.n31,
            a32 = a.n32,
            a33 = a.n33,
            a34 = a.n34,
            a41 = a.n41,
            a42 = a.n42,
            a43 = a.n43,
            a44 = a.n44,
            b11 = b.n11,
            b12 = b.n12,
            b13 = b.n13,
            b14 = b.n14,
            b21 = b.n21,
            b22 = b.n22,
            b23 = b.n23,
            b24 = b.n24,
            b31 = b.n31,
            b32 = b.n32,
            b33 = b.n33,
            b34 = b.n34,
            b41 = b.n41,
            b42 = b.n42,
            b43 = b.n43,
            b44 = b.n44;
        this.n11 = a11 * b11 + a12 * b21 + a13 * b31;
        this.n12 = a11 * b12 + a12 * b22 + a13 * b32;
        this.n13 = a11 * b13 + a12 * b23 + a13 * b33;
        this.n14 = a11 * b14 + a12 * b24 + a13 * b34 + a14;
        this.n21 = a21 * b11 + a22 * b21 + a23 * b31;
        this.n22 = a21 * b12 + a22 * b22 + a23 * b32;
        this.n23 =
            a21 * b13 + a22 * b23 + a23 * b33;
        this.n24 = a21 * b14 + a22 * b24 + a23 * b34 + a24;
        this.n31 = a31 * b11 + a32 * b21 + a33 * b31;
        this.n32 = a31 * b12 + a32 * b22 + a33 * b32;
        this.n33 = a31 * b13 + a32 * b23 + a33 * b33;
        this.n34 = a31 * b14 + a32 * b24 + a33 * b34 + a34;
        this.n41 = a41 * b11 + a42 * b21 + a43 * b31;
        this.n42 = a41 * b12 + a42 * b22 + a43 * b32;
        this.n43 = a41 * b13 + a42 * b23 + a43 * b33;
        this.n44 = a41 * b14 + a42 * b24 + a43 * b34 + a44;
        return this
    },
    multiplyToArray: function(a, b, r) {
        this.multiply(a, b);
        r[0] = this.n11;
        r[1] = this.n21;
        r[2] = this.n31;
        r[3] = this.n41;
        r[4] = this.n12;
        r[5] = this.n22;
        r[6] = this.n32;
        r[7] = this.n42;
        r[8] = this.n13;
        r[9] = this.n23;
        r[10] = this.n33;
        r[11] = this.n43;
        r[12] = this.n14;
        r[13] = this.n24;
        r[14] = this.n34;
        r[15] = this.n44;
        return this
    },
    multiplySelf: function(m) {
        this.multiply(this, m);
        return this
    },
    multiplyScalar: function(s) {
        this.n11 *= s;
        this.n12 *= s;
        this.n13 *= s;
        this.n14 *= s;
        this.n21 *= s;
        this.n22 *= s;
        this.n23 *= s;
        this.n24 *= s;
        this.n31 *= s;
        this.n32 *= s;
        this.n33 *= s;
        this.n34 *= s;
        this.n41 *= s;
        this.n42 *= s;
        this.n43 *= s;
        this.n44 *= s;
        return this
    },
    determinant: function() {
        var n11 = this.n11,
            n12 = this.n12,
            n13 = this.n13,
            n14 = this.n14,
            n21 = this.n21,
            n22 = this.n22,
            n23 = this.n23,
            n24 = this.n24,
            n31 = this.n31,
            n32 = this.n32,
            n33 = this.n33,
            n34 = this.n34,
            n41 = this.n41,
            n42 = this.n42,
            n43 = this.n43,
            n44 = this.n44;
        return n14 * n23 * n32 * n41 - n13 * n24 * n32 * n41 - n14 * n22 * n33 * n41 + n12 * n24 * n33 * n41 + n13 * n22 * n34 * n41 - n12 * n23 * n34 * n41 - n14 * n23 * n31 * n42 + n13 * n24 * n31 * n42 + n14 * n21 * n33 * n42 - n11 * n24 * n33 * n42 - n13 * n21 * n34 * n42 + n11 * n23 * n34 * n42 + n14 * n22 * n31 * n43 - n12 * n24 * n31 * n43 - n14 * n21 * n32 * n43 + n11 * n24 * n32 * n43 + n12 * n21 * n34 * n43 - n11 * n22 * n34 * n43 - n13 * n22 * n31 * n44 + n12 * n23 * n31 * n44 + n13 * n21 * n32 * n44 - n11 *
            n23 * n32 * n44 - n12 * n21 * n33 * n44 + n11 * n22 * n33 * n44
    },
    transpose: function() {
        var tmp;
        tmp = this.n21;
        this.n21 = this.n12;
        this.n12 = tmp;
        tmp = this.n31;
        this.n31 = this.n13;
        this.n13 = tmp;
        tmp = this.n32;
        this.n32 = this.n23;
        this.n23 = tmp;
        tmp = this.n41;
        this.n41 = this.n14;
        this.n14 = tmp;
        tmp = this.n42;
        this.n42 = this.n24;
        this.n24 = tmp;
        tmp = this.n43;
        this.n43 = this.n34;
        this.n43 = tmp;
        return this
    },
    clone: function() {
        var m = new THREE.Matrix4;
        m.n11 = this.n11;
        m.n12 = this.n12;
        m.n13 = this.n13;
        m.n14 = this.n14;
        m.n21 = this.n21;
        m.n22 = this.n22;
        m.n23 = this.n23;
        m.n24 =
            this.n24;
        m.n31 = this.n31;
        m.n32 = this.n32;
        m.n33 = this.n33;
        m.n34 = this.n34;
        m.n41 = this.n41;
        m.n42 = this.n42;
        m.n43 = this.n43;
        m.n44 = this.n44;
        return m
    },
    flatten: function() {
        this.flat[0] = this.n11;
        this.flat[1] = this.n21;
        this.flat[2] = this.n31;
        this.flat[3] = this.n41;
        this.flat[4] = this.n12;
        this.flat[5] = this.n22;
        this.flat[6] = this.n32;
        this.flat[7] = this.n42;
        this.flat[8] = this.n13;
        this.flat[9] = this.n23;
        this.flat[10] = this.n33;
        this.flat[11] = this.n43;
        this.flat[12] = this.n14;
        this.flat[13] = this.n24;
        this.flat[14] = this.n34;
        this.flat[15] =
            this.n44;
        return this.flat
    },
    flattenToArray: function(flat) {
        flat[0] = this.n11;
        flat[1] = this.n21;
        flat[2] = this.n31;
        flat[3] = this.n41;
        flat[4] = this.n12;
        flat[5] = this.n22;
        flat[6] = this.n32;
        flat[7] = this.n42;
        flat[8] = this.n13;
        flat[9] = this.n23;
        flat[10] = this.n33;
        flat[11] = this.n43;
        flat[12] = this.n14;
        flat[13] = this.n24;
        flat[14] = this.n34;
        flat[15] = this.n44;
        return flat
    },
    flattenToArrayOffset: function(flat, offset) {
        flat[offset] = this.n11;
        flat[offset + 1] = this.n21;
        flat[offset + 2] = this.n31;
        flat[offset + 3] = this.n41;
        flat[offset + 4] = this.n12;
        flat[offset + 5] = this.n22;
        flat[offset + 6] = this.n32;
        flat[offset + 7] = this.n42;
        flat[offset + 8] = this.n13;
        flat[offset + 9] = this.n23;
        flat[offset + 10] = this.n33;
        flat[offset + 11] = this.n43;
        flat[offset + 12] = this.n14;
        flat[offset + 13] = this.n24;
        flat[offset + 14] = this.n34;
        flat[offset + 15] = this.n44;
        return flat
    },
    setTranslation: function(x, y, z) {
        this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
        return this
    },
    setScale: function(x, y, z) {
        this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
        return this
    },
    setRotationX: function(theta) {
        var c = Math.cos(theta),
            s =
            Math.sin(theta);
        this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
        return this
    },
    setRotationY: function(theta) {
        var c = Math.cos(theta),
            s = Math.sin(theta);
        this.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);
        return this
    },
    setRotationZ: function(theta) {
        var c = Math.cos(theta),
            s = Math.sin(theta);
        this.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this
    },
    setRotationAxis: function(axis, angle) {
        var c = Math.cos(angle),
            s = Math.sin(angle),
            t = 1 - c,
            x = axis.x,
            y = axis.y,
            z = axis.z,
            tx = t * x,
            ty = t * y;
        this.set(tx * x + c, tx * y - s * z, tx * z + s * y, 0, tx * y + s * z, ty * y + c, ty *
            z - s * x, 0, tx * z - s * y, ty * z + s * x, t * z * z + c, 0, 0, 0, 0, 1);
        return this
    },
    setPosition: function(v) {
        this.n14 = v.x;
        this.n24 = v.y;
        this.n34 = v.z;
        return this
    },
    getPosition: function() {
        if (!this.position) this.position = new THREE.Vector3;
        this.position.set(this.n14, this.n24, this.n34);
        return this.position
    },
    getColumnX: function() {
        if (!this.columnX) this.columnX = new THREE.Vector3;
        this.columnX.set(this.n11, this.n21, this.n31);
        return this.columnX
    },
    getColumnY: function() {
        if (!this.columnY) this.columnY = new THREE.Vector3;
        this.columnY.set(this.n12,
            this.n22, this.n32);
        return this.columnY
    },
    getColumnZ: function() {
        if (!this.columnZ) this.columnZ = new THREE.Vector3;
        this.columnZ.set(this.n13, this.n23, this.n33);
        return this.columnZ
    },
    setRotationFromEuler: function(v) {
        var x = v.x,
            y = v.y,
            z = v.z,
            a = Math.cos(x),
            b = Math.sin(x),
            c = Math.cos(y),
            d = Math.sin(y),
            e = Math.cos(z),
            f = Math.sin(z),
            ad = a * d,
            bd = b * d;
        this.n11 = c * e;
        this.n12 = -c * f;
        this.n13 = d;
        this.n21 = bd * e + a * f;
        this.n22 = -bd * f + a * e;
        this.n23 = -b * c;
        this.n31 = -ad * e + b * f;
        this.n32 = ad * f + b * e;
        this.n33 = a * c;
        return this
    },
    setRotationFromQuaternion: function(q) {
        var x =
            q.x,
            y = q.y,
            z = q.z,
            w = q.w,
            x2 = x + x,
            y2 = y + y,
            z2 = z + z,
            xx = x * x2,
            xy = x * y2,
            xz = x * z2,
            yy = y * y2,
            yz = y * z2,
            zz = z * z2,
            wx = w * x2,
            wy = w * y2,
            wz = w * z2;
        this.n11 = 1 - (yy + zz);
        this.n12 = xy - wz;
        this.n13 = xz + wy;
        this.n21 = xy + wz;
        this.n22 = 1 - (xx + zz);
        this.n23 = yz - wx;
        this.n31 = xz - wy;
        this.n32 = yz + wx;
        this.n33 = 1 - (xx + yy);
        return this
    },
    scale: function(v) {
        var x = v.x,
            y = v.y,
            z = v.z;
        this.n11 *= x;
        this.n12 *= y;
        this.n13 *= z;
        this.n21 *= x;
        this.n22 *= y;
        this.n23 *= z;
        this.n31 *= x;
        this.n32 *= y;
        this.n33 *= z;
        this.n41 *= x;
        this.n42 *= y;
        this.n43 *= z;
        return this
    },
    extractPosition: function(m) {
        this.n14 =
            m.n14;
        this.n24 = m.n24;
        this.n34 = m.n34
    },
    extractRotation: function(m, s) {
        var invScaleX = 1 / s.x,
            invScaleY = 1 / s.y,
            invScaleZ = 1 / s.z;
        this.n11 = m.n11 * invScaleX;
        this.n21 = m.n21 * invScaleX;
        this.n31 = m.n31 * invScaleX;
        this.n12 = m.n12 * invScaleY;
        this.n22 = m.n22 * invScaleY;
        this.n32 = m.n32 * invScaleY;
        this.n13 = m.n13 * invScaleZ;
        this.n23 = m.n23 * invScaleZ;
        this.n33 = m.n33 * invScaleZ
    }
};
THREE.Matrix4.makeInvert = function(m1, m2) {
    var n11 = m1.n11,
        n12 = m1.n12,
        n13 = m1.n13,
        n14 = m1.n14,
        n21 = m1.n21,
        n22 = m1.n22,
        n23 = m1.n23,
        n24 = m1.n24,
        n31 = m1.n31,
        n32 = m1.n32,
        n33 = m1.n33,
        n34 = m1.n34,
        n41 = m1.n41,
        n42 = m1.n42,
        n43 = m1.n43,
        n44 = m1.n44;
    if (m2 === undefined) m2 = new THREE.Matrix4;
    m2.n11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44;
    m2.n12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44;
    m2.n13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44;
    m2.n14 =
        n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
    m2.n21 = n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44;
    m2.n22 = n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44;
    m2.n23 = n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44;
    m2.n24 = n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34;
    m2.n31 = n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44;
    m2.n32 = n14 * n32 * n41 - n12 * n34 * n41 - n14 *
        n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44;
    m2.n33 = n13 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44;
    m2.n34 = n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34;
    m2.n41 = n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43;
    m2.n42 = n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43;
    m2.n43 = n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43;
    m2.n44 = n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 *
        n33 + n11 * n22 * n33;
    m2.multiplyScalar(1 / m1.determinant());
    return m2
};
THREE.Matrix4.makeInvert3x3 = function(m1) {
    var m33 = m1.m33,
        m33m = m33.m,
        a11 = m1.n33 * m1.n22 - m1.n32 * m1.n23,
        a21 = -m1.n33 * m1.n21 + m1.n31 * m1.n23,
        a31 = m1.n32 * m1.n21 - m1.n31 * m1.n22,
        a12 = -m1.n33 * m1.n12 + m1.n32 * m1.n13,
        a22 = m1.n33 * m1.n11 - m1.n31 * m1.n13,
        a32 = -m1.n32 * m1.n11 + m1.n31 * m1.n12,
        a13 = m1.n23 * m1.n12 - m1.n22 * m1.n13,
        a23 = -m1.n23 * m1.n11 + m1.n21 * m1.n13,
        a33 = m1.n22 * m1.n11 - m1.n21 * m1.n12,
        det = m1.n11 * a11 + m1.n21 * a12 + m1.n31 * a13,
        idet;
    if (det == 0) console.error("THREE.Matrix4.makeInvert3x3: Matrix not invertible.");
    idet = 1 / det;
    m33m[0] = idet *
        a11;
    m33m[1] = idet * a21;
    m33m[2] = idet * a31;
    m33m[3] = idet * a12;
    m33m[4] = idet * a22;
    m33m[5] = idet * a32;
    m33m[6] = idet * a13;
    m33m[7] = idet * a23;
    m33m[8] = idet * a33;
    return m33
};
THREE.Matrix4.makeFrustum = function(left, right, bottom, top, near, far) {
    var m, x, y, a, b, c, d;
    m = new THREE.Matrix4;
    x = 2 * near / (right - left);
    y = 2 * near / (top - bottom);
    a = (right + left) / (right - left);
    b = (top + bottom) / (top - bottom);
    c = -(far + near) / (far - near);
    d = -2 * far * near / (far - near);
    m.n11 = x;
    m.n12 = 0;
    m.n13 = a;
    m.n14 = 0;
    m.n21 = 0;
    m.n22 = y;
    m.n23 = b;
    m.n24 = 0;
    m.n31 = 0;
    m.n32 = 0;
    m.n33 = c;
    m.n34 = d;
    m.n41 = 0;
    m.n42 = 0;
    m.n43 = -1;
    m.n44 = 0;
    return m
};
THREE.Matrix4.makePerspective = function(fov, aspect, near, far) {
    var ymax, ymin, xmin, xmax;
    ymax = near * Math.tan(fov * Math.PI / 360);
    ymin = -ymax;
    xmin = ymin * aspect;
    xmax = ymax * aspect;
    return THREE.Matrix4.makeFrustum(xmin, xmax, ymin, ymax, near, far)
};
THREE.Matrix4.makeOrtho = function(left, right, top, bottom, near, far) {
    var m, x, y, z, w, h, p;
    m = new THREE.Matrix4;
    w = right - left;
    h = top - bottom;
    p = far - near;
    x = (right + left) / w;
    y = (top + bottom) / h;
    z = (far + near) / p;
    m.n11 = 2 / w;
    m.n12 = 0;
    m.n13 = 0;
    m.n14 = -x;
    m.n21 = 0;
    m.n22 = 2 / h;
    m.n23 = 0;
    m.n24 = -y;
    m.n31 = 0;
    m.n32 = 0;
    m.n33 = -2 / p;
    m.n34 = -z;
    m.n41 = 0;
    m.n42 = 0;
    m.n43 = 0;
    m.n44 = 1;
    return m
};
THREE.Matrix4.__v1 = new THREE.Vector3;
THREE.Matrix4.__v2 = new THREE.Vector3;
THREE.Matrix4.__v3 = new THREE.Vector3;
THREE.Object3D = function() {
    this.parent = undefined;
    this.children = [];
    this.up = new THREE.Vector3(0, 1, 0);
    this.position = new THREE.Vector3;
    this.rotation = new THREE.Vector3;
    this.scale = new THREE.Vector3(1, 1, 1);
    this.dynamic = false;
    this.rotationAutoUpdate = true;
    this.matrix = new THREE.Matrix4;
    this.matrixWorld = new THREE.Matrix4;
    this.matrixRotationWorld = new THREE.Matrix4;
    this.matrixAutoUpdate = true;
    this.matrixWorldNeedsUpdate = true;
    this.quaternion = new THREE.Quaternion;
    this.useQuaternion = false;
    this.boundRadius = 0;
    this.boundRadiusScale =
        1;
    this.visible = true;
    this._vector = new THREE.Vector3;
    this.name = ""
};
THREE.Object3D.prototype = {
    translate: function(distance, axis) {
        this.matrix.rotateAxis(axis);
        this.position.addSelf(axis.multiplyScalar(distance))
    },
    translateX: function(distance) {
        this.translate(distance, this._vector.set(1, 0, 0))
    },
    translateY: function(distance) {
        this.translate(distance, this._vector.set(0, 1, 0))
    },
    translateZ: function(distance) {
        this.translate(distance, this._vector.set(0, 0, 1))
    },
    lookAt: function(vector) {
        this.matrix.lookAt(vector, this.position, this.up);
        if (this.rotationAutoUpdate) this.rotation.setRotationFromMatrix(this.matrix)
    },
    addChild: function(child) {
        if (this.children.indexOf(child) === -1) {
            if (child.parent !== undefined) child.parent.removeChild(child);
            child.parent = this;
            this.children.push(child);
            var scene = this;
            while (scene.parent !== undefined) scene = scene.parent;
            if (scene !== undefined && scene instanceof THREE.Scene) scene.addChildRecurse(child)
        }
    },
    removeChild: function(child) {
        var childIndex = this.children.indexOf(child);
        if (childIndex !== -1) {
            child.parent = undefined;
            this.children.splice(childIndex, 1)
        }
    },
    getChildByName: function(name, doRecurse) {
        var c,
            cl, child, recurseResult;
        for (c = 0, cl = this.children.length; c < cl; c++) {
            child = this.children[c];
            if (child.name === name) return child;
            if (doRecurse) {
                recurseResult = child.getChildByName(name, doRecurse);
                if (recurseResult !== undefined) return recurseResult
            }
        }
        return undefined
    },
    updateMatrix: function() {
        this.matrix.setPosition(this.position);
        if (this.useQuaternion) this.matrix.setRotationFromQuaternion(this.quaternion);
        else this.matrix.setRotationFromEuler(this.rotation);
        if (this.scale.x !== 1 || this.scale.y !== 1 || this.scale.z !==
            1) {
            this.matrix.scale(this.scale);
            this.boundRadiusScale = Math.max(this.scale.x, Math.max(this.scale.y, this.scale.z))
        }
        this.matrixWorldNeedsUpdate = true
    },
    update: function(parentMatrixWorld, forceUpdate, camera) {
        this.matrixAutoUpdate && this.updateMatrix();
        if (this.matrixWorldNeedsUpdate || forceUpdate) {
            if (parentMatrixWorld) this.matrixWorld.multiply(parentMatrixWorld, this.matrix);
            else this.matrixWorld.copy(this.matrix);
            this.matrixRotationWorld.extractRotation(this.matrixWorld, this.scale);
            this.matrixWorldNeedsUpdate =
                false;
            forceUpdate = true
        }
        for (var i = 0, l = this.children.length; i < l; i++) this.children[i].update(this.matrixWorld, forceUpdate, camera)
    }
};
THREE.Quaternion = function(x, y, z, w) {
    this.set(x || 0, y || 0, z || 0, w !== undefined ? w : 1)
};
THREE.Quaternion.prototype = {
    set: function(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this
    },
    copy: function(q) {
        this.x = q.x;
        this.y = q.y;
        this.z = q.z;
        this.w = q.w;
        return this
    },
    setFromEuler: function(vec3) {
        var c = 0.5 * Math.PI / 360,
            x = vec3.x * c,
            y = vec3.y * c,
            z = vec3.z * c,
            c1 = Math.cos(y),
            s1 = Math.sin(y),
            c2 = Math.cos(-z),
            s2 = Math.sin(-z),
            c3 = Math.cos(x),
            s3 = Math.sin(x),
            c1c2 = c1 * c2,
            s1s2 = s1 * s2;
        this.w = c1c2 * c3 - s1s2 * s3;
        this.x = c1c2 * s3 + s1s2 * c3;
        this.y = s1 * c2 * c3 + c1 * s2 * s3;
        this.z = c1 * s2 * c3 - s1 * c2 * s3;
        return this
    },
    setFromAxisAngle: function(axis,
        angle) {
        var halfAngle = angle / 2,
            s = Math.sin(halfAngle);
        this.x = axis.x * s;
        this.y = axis.y * s;
        this.z = axis.z * s;
        this.w = Math.cos(halfAngle);
        return this
    },
    calculateW: function() {
        this.w = -Math.sqrt(Math.abs(1 - this.x * this.x - this.y * this.y - this.z * this.z));
        return this
    },
    inverse: function() {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;
        return this
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    },
    normalize: function() {
        var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        if (l ==
            0) {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 0
        } else {
            l = 1 / l;
            this.x = this.x * l;
            this.y = this.y * l;
            this.z = this.z * l;
            this.w = this.w * l
        }
        return this
    },
    multiplySelf: function(quat2) {
        var qax = this.x,
            qay = this.y,
            qaz = this.z,
            qaw = this.w,
            qbx = quat2.x,
            qby = quat2.y,
            qbz = quat2.z,
            qbw = quat2.w;
        this.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
        this.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
        this.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
        this.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
        return this
    },
    multiply: function(q1, q2) {
        this.x = q1.x * q2.w + q1.y * q2.z - q1.z * q2.y + q1.w * q2.x;
        this.y = -q1.x *
            q2.z + q1.y * q2.w + q1.z * q2.x + q1.w * q2.y;
        this.z = q1.x * q2.y - q1.y * q2.x + q1.z * q2.w + q1.w * q2.z;
        this.w = -q1.x * q2.x - q1.y * q2.y - q1.z * q2.z + q1.w * q2.w;
        return this
    },
    multiplyVector3: function(vec, dest) {
        if (!dest) dest = vec;
        var x = vec.x,
            y = vec.y,
            z = vec.z,
            qx = this.x,
            qy = this.y,
            qz = this.z,
            qw = this.w;
        var ix = qw * x + qy * z - qz * y,
            iy = qw * y + qz * x - qx * z,
            iz = qw * z + qx * y - qy * x,
            iw = -qx * x - qy * y - qz * z;
        dest.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        dest.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        dest.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        return dest
    }
};
THREE.Quaternion.slerp = function(qa, qb, qm, t) {
    var cosHalfTheta = qa.w * qb.w + qa.x * qb.x + qa.y * qb.y + qa.z * qb.z;
    if (Math.abs(cosHalfTheta) >= 1) {
        qm.w = qa.w;
        qm.x = qa.x;
        qm.y = qa.y;
        qm.z = qa.z;
        return qm
    }
    var halfTheta = Math.acos(cosHalfTheta),
        sinHalfTheta = Math.sqrt(1 - cosHalfTheta * cosHalfTheta);
    if (Math.abs(sinHalfTheta) < 0.001) {
        qm.w = 0.5 * (qa.w + qb.w);
        qm.x = 0.5 * (qa.x + qb.x);
        qm.y = 0.5 * (qa.y + qb.y);
        qm.z = 0.5 * (qa.z + qb.z);
        return qm
    }
    var ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta,
        ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
    qm.w = qa.w * ratioA +
        qb.w * ratioB;
    qm.x = qa.x * ratioA + qb.x * ratioB;
    qm.y = qa.y * ratioA + qb.y * ratioB;
    qm.z = qa.z * ratioA + qb.z * ratioB;
    return qm
};
THREE.Vertex = function(position) {
    this.position = position || new THREE.Vector3
};
THREE.Face3 = function(a, b, c, normal, color, materials) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.normal = normal instanceof THREE.Vector3 ? normal : new THREE.Vector3;
    this.vertexNormals = normal instanceof Array ? normal : [];
    this.color = color instanceof THREE.Color ? color : new THREE.Color;
    this.vertexColors = color instanceof Array ? color : [];
    this.vertexTangents = [];
    this.materials = materials instanceof Array ? materials : [materials];
    this.centroid = new THREE.Vector3
};
THREE.Face4 = function(a, b, c, d, normal, color, materials) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.normal = normal instanceof THREE.Vector3 ? normal : new THREE.Vector3;
    this.vertexNormals = normal instanceof Array ? normal : [];
    this.color = color instanceof THREE.Color ? color : new THREE.Color;
    this.vertexColors = color instanceof Array ? color : [];
    this.vertexTangents = [];
    this.materials = materials instanceof Array ? materials : [materials];
    this.centroid = new THREE.Vector3
};
THREE.UV = function(u, v) {
    this.set(u || 0, v || 0)
};
THREE.UV.prototype = {
    set: function(u, v) {
        this.u = u;
        this.v = v;
        return this
    },
    copy: function(uv) {
        this.set(uv.u, uv.v);
        return this
    }
};
THREE.Geometry = function() {
    this.id = "Geometry" + THREE.GeometryIdCounter++;
    this.vertices = [];
    this.colors = [];
    this.faces = [];
    this.edges = [];
    this.faceUvs = [[]];
    this.faceVertexUvs = [[]];
    this.morphTargets = [];
    this.morphColors = [];
    this.skinWeights = [];
    this.skinIndices = [];
    this.boundingBox = null;
    this.boundingSphere = null;
    this.hasTangents = false
};
THREE.Geometry.prototype = {
    computeCentroids: function() {
        var f, fl, face;
        for (f = 0, fl = this.faces.length; f < fl; f++) {
            face = this.faces[f];
            face.centroid.set(0, 0, 0);
            if (face instanceof THREE.Face3) {
                face.centroid.addSelf(this.vertices[face.a].position);
                face.centroid.addSelf(this.vertices[face.b].position);
                face.centroid.addSelf(this.vertices[face.c].position);
                face.centroid.divideScalar(3)
            } else if (face instanceof THREE.Face4) {
                face.centroid.addSelf(this.vertices[face.a].position);
                face.centroid.addSelf(this.vertices[face.b].position);
                face.centroid.addSelf(this.vertices[face.c].position);
                face.centroid.addSelf(this.vertices[face.d].position);
                face.centroid.divideScalar(4)
            }
        }
    },
    computeFaceNormals: function(useVertexNormals) {
        var n, nl, v, vl, vertex, f, fl, face, vA, vB, vC, cb = new THREE.Vector3,
            ab = new THREE.Vector3;
        for (f = 0, fl = this.faces.length; f < fl; f++) {
            face = this.faces[f];
            if (useVertexNormals && face.vertexNormals.length) {
                cb.set(0, 0, 0);
                for (n = 0, nl = face.vertexNormals.length; n < nl; n++) cb.addSelf(face.vertexNormals[n]);
                cb.divideScalar(3);
                if (!cb.isZero()) cb.normalize();
                face.normal.copy(cb)
            } else {
                vA = this.vertices[face.a];
                vB = this.vertices[face.b];
                vC = this.vertices[face.c];
                cb.sub(vC.position, vB.position);
                ab.sub(vA.position, vB.position);
                cb.crossSelf(ab);
                if (!cb.isZero()) cb.normalize();
                face.normal.copy(cb)
            }
        }
    },
    computeVertexNormals: function() {
        var v, vl, f, fl, face, vertices;
        if (this.__tmpVertices == undefined) {
            this.__tmpVertices = new Array(this.vertices.length);
            vertices = this.__tmpVertices;
            for (v = 0, vl = this.vertices.length; v < vl; v++) vertices[v] = new THREE.Vector3;
            for (f = 0, fl = this.faces.length; f <
                fl; f++) {
                face = this.faces[f];
                if (face instanceof THREE.Face3) face.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
                else if (face instanceof THREE.Face4) face.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3]
            }
        } else {
            vertices = this.__tmpVertices;
            for (v = 0, vl = this.vertices.length; v < vl; v++) vertices[v].set(0, 0, 0)
        }
        for (f = 0, fl = this.faces.length; f < fl; f++) {
            face = this.faces[f];
            if (face instanceof THREE.Face3) {
                vertices[face.a].addSelf(face.normal);
                vertices[face.b].addSelf(face.normal);
                vertices[face.c].addSelf(face.normal)
            } else if (face instanceof THREE.Face4) {
                vertices[face.a].addSelf(face.normal);
                vertices[face.b].addSelf(face.normal);
                vertices[face.c].addSelf(face.normal);
                vertices[face.d].addSelf(face.normal)
            }
        }
        for (v = 0, vl = this.vertices.length; v < vl; v++) vertices[v].normalize();
        for (f = 0, fl = this.faces.length; f < fl; f++) {
            face = this.faces[f];
            if (face instanceof THREE.Face3) {
                face.vertexNormals[0].copy(vertices[face.a]);
                face.vertexNormals[1].copy(vertices[face.b]);
                face.vertexNormals[2].copy(vertices[face.c])
            } else if (face instanceof THREE.Face4) {
                face.vertexNormals[0].copy(vertices[face.a]);
                face.vertexNormals[1].copy(vertices[face.b]);
                face.vertexNormals[2].copy(vertices[face.c]);
                face.vertexNormals[3].copy(vertices[face.d])
            }
        }
    },
    computeTangents: function() {
        var f, fl, v, vl, i, il, vertexIndex, face, uv, vA, vB, vC, uvA, uvB, uvC, x1, x2, y1, y2, z1, z2, s1, s2, t1, t2, r, t, test, tan1 = [],
            tan2 = [],
            sdir = new THREE.Vector3,
            tdir = new THREE.Vector3,
            tmp = new THREE.Vector3,
            tmp2 = new THREE.Vector3,
            n = new THREE.Vector3,
            w;
        for (v = 0, vl = this.vertices.length; v < vl; v++) {
            tan1[v] =
                new THREE.Vector3;
            tan2[v] = new THREE.Vector3
        }

        function handleTriangle(context, a, b, c, ua, ub, uc) {
            vA = context.vertices[a].position;
            vB = context.vertices[b].position;
            vC = context.vertices[c].position;
            uvA = uv[ua];
            uvB = uv[ub];
            uvC = uv[uc];
            x1 = vB.x - vA.x;
            x2 = vC.x - vA.x;
            y1 = vB.y - vA.y;
            y2 = vC.y - vA.y;
            z1 = vB.z - vA.z;
            z2 = vC.z - vA.z;
            s1 = uvB.u - uvA.u;
            s2 = uvC.u - uvA.u;
            t1 = uvB.v - uvA.v;
            t2 = uvC.v - uvA.v;
            r = 1 / (s1 * t2 - s2 * t1);
            sdir.set((t2 * x1 - t1 * x2) * r, (t2 * y1 - t1 * y2) * r, (t2 * z1 - t1 * z2) * r);
            tdir.set((s1 * x2 - s2 * x1) * r, (s1 * y2 - s2 * y1) * r, (s1 * z2 - s2 * z1) * r);
            tan1[a].addSelf(sdir);
            tan1[b].addSelf(sdir);
            tan1[c].addSelf(sdir);
            tan2[a].addSelf(tdir);
            tan2[b].addSelf(tdir);
            tan2[c].addSelf(tdir)
        }
        for (f = 0, fl = this.faces.length; f < fl; f++) {
            face = this.faces[f];
            uv = this.faceVertexUvs[0][f];
            if (face instanceof THREE.Face3) handleTriangle(this, face.a, face.b, face.c, 0, 1, 2);
            else if (face instanceof THREE.Face4) {
                handleTriangle(this, face.a, face.b, face.c, 0, 1, 2);
                handleTriangle(this, face.a, face.b, face.d, 0, 1, 3)
            }
        }
        var faceIndex = ["a", "b", "c", "d"];
        for (f = 0, fl = this.faces.length; f < fl; f++) {
            face = this.faces[f];
            for (i =
                0; i < face.vertexNormals.length; i++) {
                n.copy(face.vertexNormals[i]);
                vertexIndex = face[faceIndex[i]];
                t = tan1[vertexIndex];
                tmp.copy(t);
                tmp.subSelf(n.multiplyScalar(n.dot(t))).normalize();
                tmp2.cross(face.vertexNormals[i], t);
                test = tmp2.dot(tan2[vertexIndex]);
                w = test < 0 ? -1 : 1;
                face.vertexTangents[i] = new THREE.Vector4(tmp.x, tmp.y, tmp.z, w)
            }
        }
        this.hasTangents = true
    },
    computeBoundingBox: function() {
        var vertex;
        if (this.vertices.length > 0) {
            this.boundingBox = {
                "x": [this.vertices[0].position.x, this.vertices[0].position.x],
                "y": [this.vertices[0].position.y,
this.vertices[0].position.y],
                "z": [this.vertices[0].position.z, this.vertices[0].position.z]
            };
            for (var v = 1, vl = this.vertices.length; v < vl; v++) {
                vertex = this.vertices[v];
                if (vertex.position.x < this.boundingBox.x[0]) this.boundingBox.x[0] = vertex.position.x;
                else if (vertex.position.x > this.boundingBox.x[1]) this.boundingBox.x[1] = vertex.position.x;
                if (vertex.position.y < this.boundingBox.y[0]) this.boundingBox.y[0] = vertex.position.y;
                else if (vertex.position.y > this.boundingBox.y[1]) this.boundingBox.y[1] = vertex.position.y;
                if (vertex.position.z < this.boundingBox.z[0]) this.boundingBox.z[0] = vertex.position.z;
                else if (vertex.position.z > this.boundingBox.z[1]) this.boundingBox.z[1] = vertex.position.z
            }
        }
    },
    computeBoundingSphere: function() {
        var radius = 0;
        for (var v = 0, vl = this.vertices.length; v < vl; v++) radius = Math.max(radius, this.vertices[v].position.length());
        this.boundingSphere = {
            radius: radius
        }
    },
    computeEdgeFaces: function() {
        function edge_hash(a, b) {
            return Math.min(a, b) + "_" + Math.max(a, b)
        }

        function addToMap(map, hash, i) {
            if (map[hash] === undefined) {
                map[hash] = {
                    "set": {},
                    "array": []
                };
                map[hash].set[i] = 1;
                map[hash].array.push(i)
            } else if (map[hash].set[i] === undefined) {
                map[hash].set[i] = 1;
                map[hash].array.push(i)
            }
        }
        var i, il, v1, v2, j, k, face, faceIndices, faceIndex, edge, hash, vfMap = {};
        for (i = 0, il = this.faces.length; i < il; i++) {
            face = this.faces[i];
            if (face instanceof THREE.Face3) {
                hash = edge_hash(face.a, face.b);
                addToMap(vfMap, hash, i);
                hash = edge_hash(face.b, face.c);
                addToMap(vfMap, hash, i);
                hash = edge_hash(face.a, face.c);
                addToMap(vfMap, hash, i)
            } else if (face instanceof THREE.Face4) {
                hash =
                    edge_hash(face.b, face.d);
                addToMap(vfMap, hash, i);
                hash = edge_hash(face.a, face.b);
                addToMap(vfMap, hash, i);
                hash = edge_hash(face.a, face.d);
                addToMap(vfMap, hash, i);
                hash = edge_hash(face.b, face.c);
                addToMap(vfMap, hash, i);
                hash = edge_hash(face.c, face.d);
                addToMap(vfMap, hash, i)
            }
        }
        for (i = 0, il = this.edges.length; i < il; i++) {
            edge = this.edges[i];
            v1 = edge.vertexIndices[0];
            v2 = edge.vertexIndices[1];
            edge.faceIndices = vfMap[edge_hash(v1, v2)].array;
            for (j = 0; j < edge.faceIndices.length; j++) {
                faceIndex = edge.faceIndices[j];
                edge.faces.push(this.faces[faceIndex])
            }
        }
    }
};
THREE.GeometryIdCounter = 0;
THREE.Camera = function(fov, aspect, near, far, target) {
    THREE.Object3D.call(this);
    this.fov = fov || 50;
    this.aspect = aspect || 1;
    this.near = near || 0.1;
    this.far = far || 2E3;
    this.target = target || new THREE.Object3D;
    this.useTarget = true;
    this.matrixWorldInverse = new THREE.Matrix4;
    this.projectionMatrix = null;
    this.updateProjectionMatrix()
};
THREE.Camera.prototype = new THREE.Object3D;
THREE.Camera.prototype.constructor = THREE.Camera;
THREE.Camera.prototype.supr = THREE.Object3D.prototype;
THREE.Camera.prototype.translate = function(distance, axis) {
    this.matrix.rotateAxis(axis);
    this.position.addSelf(axis.multiplyScalar(distance));
    this.target.position.addSelf(axis.multiplyScalar(distance))
};
THREE.Camera.prototype.updateProjectionMatrix = function() {
    this.projectionMatrix = THREE.Matrix4.makePerspective(this.fov, this.aspect, this.near, this.far)
};
THREE.Camera.prototype.update = function(parentMatrixWorld, forceUpdate, camera) {
    if (this.useTarget) {
        this.matrix.lookAt(this.position, this.target.position, this.up);
        this.matrix.setPosition(this.position);
        if (parentMatrixWorld) this.matrixWorld.multiply(parentMatrixWorld, this.matrix);
        else this.matrixWorld.copy(this.matrix);
        THREE.Matrix4.makeInvert(this.matrixWorld, this.matrixWorldInverse);
        forceUpdate = true
    } else {
        this.matrixAutoUpdate && this.updateMatrix();
        if (forceUpdate || this.matrixWorldNeedsUpdate) {
            if (parentMatrixWorld) this.matrixWorld.multiply(parentMatrixWorld,
                this.matrix);
            else this.matrixWorld.copy(this.matrix);
            this.matrixWorldNeedsUpdate = false;
            forceUpdate = true;
            THREE.Matrix4.makeInvert(this.matrixWorld, this.matrixWorldInverse)
        }
    }
    for (var i = 0; i < this.children.length; i++) this.children[i].update(this.matrixWorld, forceUpdate, camera)
};
THREE.Light = function(hex) {
    THREE.Object3D.call(this);
    this.color = new THREE.Color(hex)
};
THREE.Light.prototype = new THREE.Object3D;
THREE.Light.prototype.constructor = THREE.Light;
THREE.Light.prototype.supr = THREE.Object3D.prototype;
THREE.Material = function(parameters) {
    this.id = THREE.MaterialCounter.value++;
    parameters = parameters || {};
    this.opacity = parameters.opacity !== undefined ? parameters.opacity : 1;
    this.transparent = parameters.transparent !== undefined ? parameters.transparent : false;
    this.blending = parameters.blending !== undefined ? parameters.blending : THREE.NormalBlending;
    this.depthTest = parameters.depthTest !== undefined ? parameters.depthTest : true
};
THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;
THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;
THREE.NormalBlending = 0;
THREE.AdditiveBlending = 1;
THREE.SubtractiveBlending = 2;
THREE.MultiplyBlending = 3;
THREE.AdditiveAlphaBlending = 4;
THREE.MaterialCounter = {
    value: 0
};
THREE.MeshBasicMaterial = function(parameters) {
    THREE.Material.call(this, parameters);
    parameters = parameters || {};
    this.color = parameters.color !== undefined ? new THREE.Color(parameters.color) : new THREE.Color(16777215);
    this.map = parameters.map !== undefined ? parameters.map : null;
    this.lightMap = parameters.lightMap !== undefined ? parameters.lightMap : null;
    this.envMap = parameters.envMap !== undefined ? parameters.envMap : null;
    this.combine = parameters.combine !== undefined ? parameters.combine : THREE.MultiplyOperation;
    this.reflectivity =
        parameters.reflectivity !== undefined ? parameters.reflectivity : 1;
    this.refractionRatio = parameters.refractionRatio !== undefined ? parameters.refractionRatio : 0.98;
    this.shading = parameters.shading !== undefined ? parameters.shading : THREE.SmoothShading;
    this.wireframe = parameters.wireframe !== undefined ? parameters.wireframe : false;
    this.wireframeLinewidth = parameters.wireframeLinewidth !== undefined ? parameters.wireframeLinewidth : 1;
    this.wireframeLinecap = parameters.wireframeLinecap !== undefined ? parameters.wireframeLinecap : "round";
    this.wireframeLinejoin = parameters.wireframeLinejoin !== undefined ? parameters.wireframeLinejoin : "round";
    this.vertexColors = parameters.vertexColors !== undefined ? parameters.vertexColors : false;
    this.skinning = parameters.skinning !== undefined ? parameters.skinning : false;
    this.morphTargets = parameters.morphTargets !== undefined ? parameters.morphTargets : false
};
THREE.MeshBasicMaterial.prototype = new THREE.Material;
THREE.MeshBasicMaterial.prototype.constructor = THREE.MeshBasicMaterial;
THREE.MeshFaceMaterial = function() {};
THREE.Particle = function(materials) {
    THREE.Object3D.call(this);
    this.materials = materials instanceof Array ? materials : [materials]
};
THREE.Particle.prototype = new THREE.Object3D;
THREE.Particle.prototype.constructor = THREE.Particle;
THREE.Line = function(geometry, materials, type) {
    THREE.Object3D.call(this);
    this.geometry = geometry;
    this.materials = materials instanceof Array ? materials : [materials];
    this.type = type != undefined ? type : THREE.LineStrip
};
THREE.LineStrip = 0;
THREE.LinePieces = 1;
THREE.Line.prototype = new THREE.Object3D;
THREE.Line.prototype.constructor = THREE.Line;
THREE.Mesh = function(geometry, materials) {
    THREE.Object3D.call(this);
    this.geometry = geometry;
    this.materials = materials && materials.length ? materials : [materials];
    this.flipSided = false;
    this.doubleSided = false;
    this.overdraw = false;
    if (this.geometry) {
        if (!this.geometry.boundingSphere) this.geometry.computeBoundingSphere();
        this.boundRadius = geometry.boundingSphere.radius;
        if (this.geometry.morphTargets.length) {
            this.morphTargetBase = -1;
            this.morphTargetForcedOrder = [];
            this.morphTargetInfluences = [];
            this.morphTargetDictionary = {};
            for (var m = 0; m < this.geometry.morphTargets.length; m++) {
                this.morphTargetInfluences.push(0);
                this.morphTargetDictionary[this.geometry.morphTargets[m].name] = m
            }
        }
    }
};
THREE.Mesh.prototype = new THREE.Object3D;
THREE.Mesh.prototype.constructor = THREE.Mesh;
THREE.Mesh.prototype.supr = THREE.Object3D.prototype;
THREE.Mesh.prototype.getMorphTargetIndexByName = function(name) {
    if (this.morphTargetDictionary[name] !== undefined) return this.morphTargetDictionary[name];
    console.log("THREE.Mesh.getMorphTargetIndexByName: morph target " + name + " does not exist. Returning 0.");
    return 0
};
THREE.Bone = function(belongsToSkin) {
    THREE.Object3D.call(this);
    this.skin = belongsToSkin;
    this.skinMatrix = new THREE.Matrix4;
    this.hasNoneBoneChildren = false
};
THREE.Bone.prototype = new THREE.Object3D;
THREE.Bone.prototype.constructor = THREE.Bone;
THREE.Bone.prototype.supr = THREE.Object3D.prototype;
THREE.Bone.prototype.update = function(parentSkinMatrix, forceUpdate, camera) {
    if (this.matrixAutoUpdate) forceUpdate |= this.updateMatrix();
    if (forceUpdate || this.matrixWorldNeedsUpdate) {
        if (parentSkinMatrix) this.skinMatrix.multiply(parentSkinMatrix, this.matrix);
        else this.skinMatrix.copy(this.matrix);
        this.matrixWorldNeedsUpdate = false;
        forceUpdate = true
    }
    var child, i, l = this.children.length;
    if (this.hasNoneBoneChildren) {
        this.matrixWorld.multiply(this.skin.matrixWorld, this.skinMatrix);
        for (i = 0; i < l; i++) {
            child = this.children[i];
            if (!(child instanceof THREE.Bone)) child.update(this.matrixWorld, true, camera);
            else child.update(this.skinMatrix, forceUpdate, camera)
        }
    } else
        for (i = 0; i < l; i++) this.children[i].update(this.skinMatrix, forceUpdate, camera)
};
THREE.Bone.prototype.addChild = function(child) {
    if (this.children.indexOf(child) === -1) {
        if (child.parent !== undefined) child.parent.removeChild(child);
        child.parent = this;
        this.children.push(child);
        if (!(child instanceof THREE.Bone)) this.hasNoneBoneChildren = true
    }
};
THREE.Sound = function(sources, radius, volume, loop) {
    THREE.Object3D.call(this);
    this.isLoaded = false;
    this.isAddedToDOM = false;
    this.isPlaying = false;
    this.duration = -1;
    this.radius = radius !== undefined ? Math.abs(radius) : 100;
    this.volume = Math.min(1, Math.max(0, volume !== undefined ? volume : 1));
    this.domElement = document.createElement("audio");
    this.domElement.volume = 0;
    this.domElement.pan = 0;
    this.domElement.loop = loop !== undefined ? loop : true;
    this.sources = sources instanceof Array ? sources : [sources];
    var element, source, type, s, sl =
        this.sources.length;
    for (s = 0; s < sl; s++) {
        source = this.sources[s];
        source.toLowerCase();
        if (source.indexOf(".mp3") !== -1) type = "audio/mpeg";
        else if (source.indexOf(".ogg") !== -1) type = "audio/ogg";
        else if (source.indexOf(".wav") !== -1) type = "audio/wav";
        if (this.domElement.canPlayType(type)) {
            element = document.createElement("source");
            element.src = this.sources[s];
            this.domElement.THREESound = this;
            this.domElement.appendChild(element);
            this.domElement.addEventListener("canplay", this.onLoad, true);
            this.domElement.load();
            break
        }
    }
};
THREE.Sound.prototype = new THREE.Object3D;
THREE.Sound.prototype.constructor = THREE.Sound;
THREE.Sound.prototype.supr = THREE.Object3D.prototype;
THREE.Sound.prototype.onLoad = function() {
    var sound = this.THREESound;
    if (sound.isLoaded) return;
    this.removeEventListener("canplay", this.onLoad, true);
    sound.isLoaded = true;
    sound.duration = this.duration;
    if (sound.isPlaying) sound.play()
};
THREE.Sound.prototype.addToDOM = function(parent) {
    this.isAddedToDOM = true;
    parent.appendChild(this.domElement)
};
THREE.Sound.prototype.play = function(startTime) {
    this.isPlaying = true;
    if (this.isLoaded) {
        this.domElement.play();
        if (startTime) this.domElement.currentTime = startTime % this.duration
    }
};
THREE.Sound.prototype.pause = function() {
    this.isPlaying = false;
    this.domElement.pause()
};
THREE.Sound.prototype.stop = function() {
    this.isPlaying = false;
    this.domElement.pause();
    this.domElement.currentTime = 0
};
THREE.Sound.prototype.calculateVolumeAndPan = function(cameraRelativePosition) {
    var distance = cameraRelativePosition.length();
    if (distance <= this.radius) this.domElement.volume = this.volume * (1 - distance / this.radius);
    else this.domElement.volume = 0
};
THREE.Sound.prototype.update = function(parentMatrixWorld, forceUpdate, camera) {
    if (this.matrixAutoUpdate) {
        this.matrix.setPosition(this.position);
        forceUpdate = true
    }
    if (forceUpdate || this.matrixWorldNeedsUpdate) {
        if (parentMatrixWorld) this.matrixWorld.multiply(parentMatrixWorld, this.matrix);
        else this.matrixWorld.copy(this.matrix);
        this.matrixWorldNeedsUpdate = false;
        forceUpdate = true
    }
    var i, l = this.children.length;
    for (i = 0; i < l; i++) this.children[i].update(this.matrixWorld, forceUpdate, camera)
};
THREE.Scene = function() {
    THREE.Object3D.call(this);
    this.matrixAutoUpdate = false;
    this.fog = null;
    this.collisions = null;
    this.objects = [];
    this.lights = [];
    this.sounds = [];
    this.__objectsAdded = [];
    this.__objectsRemoved = []
};
THREE.Scene.prototype = new THREE.Object3D;
THREE.Scene.prototype.constructor = THREE.Scene;
THREE.Scene.prototype.supr = THREE.Object3D.prototype;
THREE.Scene.prototype.addChild = function(child) {
    this.supr.addChild.call(this, child);
    this.addChildRecurse(child)
};
THREE.Scene.prototype.addChildRecurse = function(child) {
    if (child instanceof THREE.Light) {
        if (this.lights.indexOf(child) === -1) this.lights.push(child)
    } else if (child instanceof THREE.Sound) {
        if (this.sounds.indexOf(child) === -1) this.sounds.push(child)
    } else if (!(child instanceof THREE.Camera || child instanceof THREE.Bone))
        if (this.objects.indexOf(child) === -1) {
            this.objects.push(child);
            this.__objectsAdded.push(child)
        }
    for (var c = 0; c < child.children.length; c++) this.addChildRecurse(child.children[c])
};
THREE.Scene.prototype.removeChild = function(child) {
    this.supr.removeChild.call(this, child);
    this.removeChildRecurse(child)
};
THREE.Scene.prototype.removeChildRecurse = function(child) {
    if (child instanceof THREE.Light) {
        var i = this.lights.indexOf(child);
        if (i !== -1) this.lights.splice(i, 1)
    } else if (child instanceof THREE.Sound) {
        var i = this.sounds.indexOf(child);
        if (i !== -1) this.sounds.splice(i, 1)
    } else if (!(child instanceof THREE.Camera)) {
        var i = this.objects.indexOf(child);
        if (i !== -1) {
            this.objects.splice(i, 1);
            this.__objectsRemoved.push(child)
        }
    }
    for (var c = 0; c < child.children.length; c++) this.removeChildRecurse(child.children[c])
};
THREE.Scene.prototype.addObject = THREE.Scene.prototype.addChild;
THREE.Scene.prototype.removeObject = THREE.Scene.prototype.removeChild;
THREE.Scene.prototype.addLight = THREE.Scene.prototype.addChild;
THREE.Scene.prototype.removeLight = THREE.Scene.prototype.removeChild;
THREE.Projector = function() {
    var _object, _objectCount, _objectPool = [],
        _vertex, _vertexCount, _vertexPool = [],
        _face, _face3Count, _face3Pool = [],
        _face4Count, _face4Pool = [],
        _line, _lineCount, _linePool = [],
        _particle, _particleCount, _particlePool = [],
        _vector3 = new THREE.Vector4,
        _vector4 = new THREE.Vector4,
        _projScreenMatrix = new THREE.Matrix4,
        _projScreenObjectMatrix = new THREE.Matrix4,
        _frustum = [new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4],
        _clippedVertex1PositionScreen =
        new THREE.Vector4,
        _clippedVertex2PositionScreen = new THREE.Vector4,
        _face3VertexNormals;
    this.projectVector = function(vector, camera) {
        _projScreenMatrix.multiply(camera.projectionMatrix, camera.matrixWorldInverse);
        _projScreenMatrix.multiplyVector3(vector);
        return vector
    };
    this.unprojectVector = function(vector, camera) {
        _projScreenMatrix.multiply(camera.matrixWorld, THREE.Matrix4.makeInvert(camera.projectionMatrix));
        _projScreenMatrix.multiplyVector3(vector);
        return vector
    };
    this.projectObjects = function(scene, camera,
        sort) {
        var renderList = [],
            o, ol, objects, object, matrix;
        _objectCount = 0;
        objects = scene.objects;
        for (o = 0, ol = objects.length; o < ol; o++) {
            object = objects[o];
            if (!object.visible || object instanceof THREE.Mesh && !isInFrustum(object)) continue;
            _object = getNextObjectInPool();
            _vector3.copy(object.position);
            _projScreenMatrix.multiplyVector3(_vector3);
            _object.object = object;
            _object.z = _vector3.z;
            renderList.push(_object)
        }
        sort && renderList.sort(painterSort);
        return renderList
    };
    this.projectScene = function(scene, camera, sort) {
        var renderList = [],
            near = camera.near,
            far = camera.far,
            o, ol, v, vl, f, fl, n, nl, c, cl, u, ul, objects, object, objectMatrix, objectMatrixRotation, objectMaterials, objectOverdraw, geometry, vertices, vertex, vertexPositionScreen, faces, face, faceVertexNormals, normal, faceVertexUvs, uvs, v1, v2, v3, v4;
        _face3Count = 0;
        _face4Count = 0;
        _lineCount = 0;
        _particleCount = 0;
        camera.matrixAutoUpdate && camera.update(undefined, true);
        scene.update(undefined, false, camera);
        _projScreenMatrix.multiply(camera.projectionMatrix, camera.matrixWorldInverse);
        computeFrustum(_projScreenMatrix);
        objects = this.projectObjects(scene, camera, true);
        for (o = 0, ol = objects.length; o < ol; o++) {
            object = objects[o].object;
            if (!object.visible) continue;
            objectMatrix = object.matrixWorld;
            objectMatrixRotation = object.matrixRotationWorld;
            objectMaterials = object.materials;
            objectOverdraw = object.overdraw;
            _vertexCount = 0;
            if (object instanceof THREE.Mesh) {
                geometry = object.geometry;
                vertices = geometry.vertices;
                faces = geometry.faces;
                faceVertexUvs = geometry.faceVertexUvs;
                for (v = 0, vl = vertices.length; v < vl; v++) {
                    _vertex = getNextVertexInPool();
                    _vertex.positionWorld.copy(vertices[v].position);
                    objectMatrix.multiplyVector3(_vertex.positionWorld);
                    _vertex.positionScreen.copy(_vertex.positionWorld);
                    _projScreenMatrix.multiplyVector4(_vertex.positionScreen);
                    _vertex.positionScreen.x /= _vertex.positionScreen.w;
                    _vertex.positionScreen.y /= _vertex.positionScreen.w;
                    _vertex.visible = _vertex.positionScreen.z > near && _vertex.positionScreen.z < far
                }
                for (f = 0, fl = faces.length; f < fl; f++) {
                    face = faces[f];
                    if (face instanceof THREE.Face3) {
                        v1 = _vertexPool[face.a];
                        v2 = _vertexPool[face.b];
                        v3 = _vertexPool[face.c];
                        if (v1.visible && v2.visible && v3.visible && (object.doubleSided || object.flipSided != (v3.positionScreen.x - v1.positionScreen.x) * (v2.positionScreen.y - v1.positionScreen.y) - (v3.positionScreen.y - v1.positionScreen.y) * (v2.positionScreen.x - v1.positionScreen.x) < 0)) {
                            _face = getNextFace3InPool();
                            _face.v1.copy(v1);
                            _face.v2.copy(v2);
                            _face.v3.copy(v3)
                        } else continue
                    } else if (face instanceof THREE.Face4) {
                        v1 = _vertexPool[face.a];
                        v2 = _vertexPool[face.b];
                        v3 = _vertexPool[face.c];
                        v4 = _vertexPool[face.d];
                        if (v1.visible &&
                            v2.visible && v3.visible && v4.visible && (object.doubleSided || object.flipSided != ((v4.positionScreen.x - v1.positionScreen.x) * (v2.positionScreen.y - v1.positionScreen.y) - (v4.positionScreen.y - v1.positionScreen.y) * (v2.positionScreen.x - v1.positionScreen.x) < 0 || (v2.positionScreen.x - v3.positionScreen.x) * (v4.positionScreen.y - v3.positionScreen.y) - (v2.positionScreen.y - v3.positionScreen.y) * (v4.positionScreen.x - v3.positionScreen.x) < 0))) {
                            _face = getNextFace4InPool();
                            _face.v1.copy(v1);
                            _face.v2.copy(v2);
                            _face.v3.copy(v3);
                            _face.v4.copy(v4)
                        } else continue
                    }
                    _face.normalWorld.copy(face.normal);
                    objectMatrixRotation.multiplyVector3(_face.normalWorld);
                    _face.centroidWorld.copy(face.centroid);
                    objectMatrix.multiplyVector3(_face.centroidWorld);
                    _face.centroidScreen.copy(_face.centroidWorld);
                    _projScreenMatrix.multiplyVector3(_face.centroidScreen);
                    faceVertexNormals = face.vertexNormals;
                    for (n = 0, nl = faceVertexNormals.length; n < nl; n++) {
                        normal = _face.vertexNormalsWorld[n];
                        normal.copy(faceVertexNormals[n]);
                        objectMatrixRotation.multiplyVector3(normal)
                    }
                    for (c =
                        0, cl = faceVertexUvs.length; c < cl; c++) {
                        uvs = faceVertexUvs[c][f];
                        if (!uvs) continue;
                        for (u = 0, ul = uvs.length; u < ul; u++) _face.uvs[c][u] = uvs[u]
                    }
                    _face.meshMaterials = objectMaterials;
                    _face.faceMaterials = face.materials;
                    _face.overdraw = objectOverdraw;
                    _face.z = _face.centroidScreen.z;
                    renderList.push(_face)
                }
            } else if (object instanceof THREE.Line) {
                _projScreenObjectMatrix.multiply(_projScreenMatrix, objectMatrix);
                vertices = object.geometry.vertices;
                v1 = getNextVertexInPool();
                v1.positionScreen.copy(vertices[0].position);
                _projScreenObjectMatrix.multiplyVector4(v1.positionScreen);
                for (v = 1, vl = vertices.length; v < vl; v++) {
                    v1 = getNextVertexInPool();
                    v1.positionScreen.copy(vertices[v].position);
                    _projScreenObjectMatrix.multiplyVector4(v1.positionScreen);
                    v2 = _vertexPool[_vertexCount - 2];
                    _clippedVertex1PositionScreen.copy(v1.positionScreen);
                    _clippedVertex2PositionScreen.copy(v2.positionScreen);
                    if (clipLine(_clippedVertex1PositionScreen, _clippedVertex2PositionScreen)) {
                        _clippedVertex1PositionScreen.multiplyScalar(1 / _clippedVertex1PositionScreen.w);
                        _clippedVertex2PositionScreen.multiplyScalar(1 /
                            _clippedVertex2PositionScreen.w);
                        _line = getNextLineInPool();
                        _line.v1.positionScreen.copy(_clippedVertex1PositionScreen);
                        _line.v2.positionScreen.copy(_clippedVertex2PositionScreen);
                        _line.z = Math.max(_clippedVertex1PositionScreen.z, _clippedVertex2PositionScreen.z);
                        _line.materials = object.materials;
                        renderList.push(_line)
                    }
                }
            } else if (object instanceof THREE.Particle) {
                _vector4.set(object.matrixWorld.n14, object.matrixWorld.n24, object.matrixWorld.n34, 1);
                _projScreenMatrix.multiplyVector4(_vector4);
                _vector4.z /=
                    _vector4.w;
                if (_vector4.z > 0 && _vector4.z < 1) {
                    _particle = getNextParticleInPool();
                    _particle.x = _vector4.x / _vector4.w;
                    _particle.y = _vector4.y / _vector4.w;
                    _particle.z = _vector4.z;
                    _particle.rotation = object.rotation.z;
                    _particle.scale.x = object.scale.x * Math.abs(_particle.x - (_vector4.x + camera.projectionMatrix.n11) / (_vector4.w + camera.projectionMatrix.n14));
                    _particle.scale.y = object.scale.y * Math.abs(_particle.y - (_vector4.y + camera.projectionMatrix.n22) / (_vector4.w + camera.projectionMatrix.n24));
                    _particle.materials = object.materials;
                    renderList.push(_particle)
                }
            }
        }
        sort && renderList.sort(painterSort);
        return renderList
    };

    function getNextObjectInPool() {
        var object = _objectPool[_objectCount] = _objectPool[_objectCount] || new THREE.RenderableObject;
        _objectCount++;
        return object
    }

    function getNextVertexInPool() {
        var vertex = _vertexPool[_vertexCount] = _vertexPool[_vertexCount] || new THREE.RenderableVertex;
        _vertexCount++;
        return vertex
    }

    function getNextFace3InPool() {
        var face = _face3Pool[_face3Count] = _face3Pool[_face3Count] || new THREE.RenderableFace3;
        _face3Count++;
        return face
    }

    function getNextFace4InPool() {
        var face = _face4Pool[_face4Count] = _face4Pool[_face4Count] || new THREE.RenderableFace4;
        _face4Count++;
        return face
    }

    function getNextLineInPool() {
        var line = _linePool[_lineCount] = _linePool[_lineCount] || new THREE.RenderableLine;
        _lineCount++;
        return line
    }

    function getNextParticleInPool() {
        var particle = _particlePool[_particleCount] = _particlePool[_particleCount] || new THREE.RenderableParticle;
        _particleCount++;
        return particle
    }

    function painterSort(a, b) {
        return b.z - a.z
    }

    function computeFrustum(m) {
        _frustum[0].set(m.n41 -
            m.n11, m.n42 - m.n12, m.n43 - m.n13, m.n44 - m.n14);
        _frustum[1].set(m.n41 + m.n11, m.n42 + m.n12, m.n43 + m.n13, m.n44 + m.n14);
        _frustum[2].set(m.n41 + m.n21, m.n42 + m.n22, m.n43 + m.n23, m.n44 + m.n24);
        _frustum[3].set(m.n41 - m.n21, m.n42 - m.n22, m.n43 - m.n23, m.n44 - m.n24);
        _frustum[4].set(m.n41 - m.n31, m.n42 - m.n32, m.n43 - m.n33, m.n44 - m.n34);
        _frustum[5].set(m.n41 + m.n31, m.n42 + m.n32, m.n43 + m.n33, m.n44 + m.n34);
        for (var i = 0; i < 6; i++) {
            var plane = _frustum[i];
            plane.divideScalar(Math.sqrt(plane.x * plane.x + plane.y * plane.y + plane.z * plane.z))
        }
    }

    function isInFrustum(object) {
        var distance,
            matrix = object.matrixWorld,
            radius = -object.geometry.boundingSphere.radius * Math.max(object.scale.x, Math.max(object.scale.y, object.scale.z));
        for (var i = 0; i < 6; i++) {
            distance = _frustum[i].x * matrix.n14 + _frustum[i].y * matrix.n24 + _frustum[i].z * matrix.n34 + _frustum[i].w;
            if (distance <= radius) return false
        }
        return true
    }

    function clipLine(s1, s2) {
        var alpha1 = 0,
            alpha2 = 1,
            bc1near = s1.z + s1.w,
            bc2near = s2.z + s2.w,
            bc1far = -s1.z + s1.w,
            bc2far = -s2.z + s2.w;
        if (bc1near >= 0 && bc2near >= 0 && bc1far >= 0 && bc2far >= 0) return true;
        else if (bc1near < 0 && bc2near <
            0 || bc1far < 0 && bc2far < 0) return false;
        else {
            if (bc1near < 0) alpha1 = Math.max(alpha1, bc1near / (bc1near - bc2near));
            else if (bc2near < 0) alpha2 = Math.min(alpha2, bc1near / (bc1near - bc2near));
            if (bc1far < 0) alpha1 = Math.max(alpha1, bc1far / (bc1far - bc2far));
            else if (bc2far < 0) alpha2 = Math.min(alpha2, bc1far / (bc1far - bc2far));
            if (alpha2 < alpha1) return false;
            else {
                s1.lerpSelf(s2, alpha1);
                s2.lerpSelf(s1, 1 - alpha2);
                return true
            }
        }
    }
};
THREE.CanvasRenderer = function(parameters) {
    var _this = this,
        _renderList = null,
        _projector = new THREE.Projector,
        parameters = parameters || {},
        _canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElement("canvas"),
        _canvasWidth, _canvasHeight, _canvasWidthHalf, _canvasHeightHalf, _context = _canvas.getContext("2d"),
        _clearColor = new THREE.Color(0),
        _clearOpacity = 0,
        _contextGlobalAlpha = 1,
        _contextGlobalCompositeOperation = 0,
        _contextStrokeStyle = null,
        _contextFillStyle = null,
        _contextLineWidth = null,
        _contextLineCap =
        null,
        _contextLineJoin = null,
        _v1, _v2, _v3, _v4, _v5 = new THREE.RenderableVertex,
        _v6 = new THREE.RenderableVertex,
        _v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _v4x, _v4y, _v5x, _v5y, _v6x, _v6y, _color = new THREE.Color(0),
        _color1 = new THREE.Color(0),
        _color2 = new THREE.Color(0),
        _color3 = new THREE.Color(0),
        _color4 = new THREE.Color(0),
        _near, _far, _bitmap, _uvs, _uv1x, _uv1y, _uv2x, _uv2y, _uv3x, _uv3y, _clipRect = new THREE.Rectangle,
        _clearRect = new THREE.Rectangle,
        _bboxRect = new THREE.Rectangle,
        _enableLighting = false,
        _light = new THREE.Color,
        _ambientLight =
        new THREE.Color,
        _directionalLights = new THREE.Color,
        _pointLights = new THREE.Color,
        _pi2 = Math.PI * 2,
        _vector3 = new THREE.Vector3,
        _pixelMap, _pixelMapContext, _pixelMapImage, _pixelMapData, _gradientMap, _gradientMapContext, _gradientMapQuality = 16;
    _pixelMap = document.createElement("canvas");
    _pixelMap.width = _pixelMap.height = 2;
    _pixelMapContext = _pixelMap.getContext("2d");
    _pixelMapContext.fillStyle = "rgba(0,0,0,1)";
    _pixelMapContext.fillRect(0, 0, 2, 2);
    _pixelMapImage = _pixelMapContext.getImageData(0, 0, 2, 2);
    _pixelMapData =
        _pixelMapImage.data;
    _gradientMap = document.createElement("canvas");
    _gradientMap.width = _gradientMap.height = _gradientMapQuality;
    _gradientMapContext = _gradientMap.getContext("2d");
    _gradientMapContext.translate(-_gradientMapQuality / 2, -_gradientMapQuality / 2);
    _gradientMapContext.scale(_gradientMapQuality, _gradientMapQuality);
    _gradientMapQuality--;
    this.domElement = _canvas;
    this.autoClear = true;
    this.sortObjects = true;
    this.sortElements = true;
    this.data = {
        vertices: 0,
        faces: 0
    };
    this.setSize = function(width, height) {
        _canvasWidth =
            width;
        _canvasHeight = height;
        _canvasWidthHalf = _canvasWidth / 2;
        _canvasHeightHalf = _canvasHeight / 2;
        _canvas.width = _canvasWidth;
        _canvas.height = _canvasHeight;
        _clipRect.set(-_canvasWidthHalf, -_canvasHeightHalf, _canvasWidthHalf, _canvasHeightHalf);
        _contextGlobalAlpha = 1;
        _contextGlobalCompositeOperation = 0;
        _contextStrokeStyle = null;
        _contextFillStyle = null;
        _contextLineWidth = null;
        _contextLineCap = null;
        _contextLineJoin = null
    };
    this.setClearColor = function(color, opacity) {
        _clearColor = color;
        _clearOpacity = opacity
    };
    this.setClearColorHex =
        function(hex, opacity) {
            _clearColor.setHex(hex);
            _clearOpacity = opacity
        };
    this.clear = function() {
        _context.setTransform(1, 0, 0, -1, _canvasWidthHalf, _canvasHeightHalf);
        if (!_clearRect.isEmpty()) {
            _clearRect.inflate(1);
            _clearRect.minSelf(_clipRect);
            if (_clearColor.hex == 0 && _clearOpacity == 0) _context.clearRect(_clearRect.getX(), _clearRect.getY(), _clearRect.getWidth(), _clearRect.getHeight());
            else {
                setBlending(THREE.NormalBlending);
                setOpacity(1);
                _context.fillStyle = "rgba(" + Math.floor(_clearColor.r * 255) + "," + Math.floor(_clearColor.g *
                    255) + "," + Math.floor(_clearColor.b * 255) + "," + _clearOpacity + ")";
                _context.fillRect(_clearRect.getX(), _clearRect.getY(), _clearRect.getWidth(), _clearRect.getHeight())
            }
            _clearRect.empty()
        }
    };
    this.render = function(scene, camera) {
        var e, el, element, m, ml, fm, fml, material;
        this.autoClear ? this.clear() : _context.setTransform(1, 0, 0, -1, _canvasWidthHalf, _canvasHeightHalf);
        _this.data.vertices = 0;
        _this.data.faces = 0;
        _renderList = _projector.projectScene(scene, camera, this.sortElements);
        _enableLighting = scene.lights.length > 0;
        if (_enableLighting) calculateLights(scene);
        for (e = 0, el = _renderList.length; e < el; e++) {
            element = _renderList[e];
            _bboxRect.empty();
            if (element instanceof THREE.RenderableParticle) {
                _v1 = element;
                _v1.x *= _canvasWidthHalf;
                _v1.y *= _canvasHeightHalf;
                m = 0;
                ml = element.materials.length;
                while (m < ml) {
                    material = element.materials[m++];
                    material.opacity != 0 && renderParticle(_v1, element, material, scene)
                }
            } else if (element instanceof THREE.RenderableLine) {
                _v1 = element.v1;
                _v2 = element.v2;
                _v1.positionScreen.x *= _canvasWidthHalf;
                _v1.positionScreen.y *= _canvasHeightHalf;
                _v2.positionScreen.x *=
                    _canvasWidthHalf;
                _v2.positionScreen.y *= _canvasHeightHalf;
                _bboxRect.addPoint(_v1.positionScreen.x, _v1.positionScreen.y);
                _bboxRect.addPoint(_v2.positionScreen.x, _v2.positionScreen.y);
                if (_clipRect.instersects(_bboxRect)) {
                    m = 0;
                    ml = element.materials.length;
                    while (m < ml) {
                        material = element.materials[m++];
                        material.opacity != 0 && renderLine(_v1, _v2, element, material, scene)
                    }
                }
            } else if (element instanceof THREE.RenderableFace3) {
                _v1 = element.v1;
                _v2 = element.v2;
                _v3 = element.v3;
                _v1.positionScreen.x *= _canvasWidthHalf;
                _v1.positionScreen.y *=
                    _canvasHeightHalf;
                _v2.positionScreen.x *= _canvasWidthHalf;
                _v2.positionScreen.y *= _canvasHeightHalf;
                _v3.positionScreen.x *= _canvasWidthHalf;
                _v3.positionScreen.y *= _canvasHeightHalf;
                if (element.overdraw) {
                    expand(_v1.positionScreen, _v2.positionScreen);
                    expand(_v2.positionScreen, _v3.positionScreen);
                    expand(_v3.positionScreen, _v1.positionScreen)
                }
                _bboxRect.add3Points(_v1.positionScreen.x, _v1.positionScreen.y, _v2.positionScreen.x, _v2.positionScreen.y, _v3.positionScreen.x, _v3.positionScreen.y);
                if (_clipRect.instersects(_bboxRect)) {
                    m =
                        0;
                    ml = element.meshMaterials.length;
                    while (m < ml) {
                        material = element.meshMaterials[m++];
                        if (material instanceof THREE.MeshFaceMaterial) {
                            fm = 0;
                            fml = element.faceMaterials.length;
                            while (fm < fml) {
                                material = element.faceMaterials[fm++];
                                material && material.opacity != 0 && renderFace3(_v1, _v2, _v3, 0, 1, 2, element, material, scene)
                            }
                            continue
                        }
                        material.opacity != 0 && renderFace3(_v1, _v2, _v3, 0, 1, 2, element, material, scene)
                    }
                }
            } else if (element instanceof THREE.RenderableFace4) {
                _v1 = element.v1;
                _v2 = element.v2;
                _v3 = element.v3;
                _v4 = element.v4;
                _v1.positionScreen.x *=
                    _canvasWidthHalf;
                _v1.positionScreen.y *= _canvasHeightHalf;
                _v2.positionScreen.x *= _canvasWidthHalf;
                _v2.positionScreen.y *= _canvasHeightHalf;
                _v3.positionScreen.x *= _canvasWidthHalf;
                _v3.positionScreen.y *= _canvasHeightHalf;
                _v4.positionScreen.x *= _canvasWidthHalf;
                _v4.positionScreen.y *= _canvasHeightHalf;
                _v5.positionScreen.copy(_v2.positionScreen);
                _v6.positionScreen.copy(_v4.positionScreen);
                if (element.overdraw) {
                    expand(_v1.positionScreen, _v2.positionScreen);
                    expand(_v2.positionScreen, _v4.positionScreen);
                    expand(_v4.positionScreen,
                        _v1.positionScreen);
                    expand(_v3.positionScreen, _v5.positionScreen);
                    expand(_v3.positionScreen, _v6.positionScreen)
                }
                _bboxRect.addPoint(_v1.positionScreen.x, _v1.positionScreen.y);
                _bboxRect.addPoint(_v2.positionScreen.x, _v2.positionScreen.y);
                _bboxRect.addPoint(_v3.positionScreen.x, _v3.positionScreen.y);
                _bboxRect.addPoint(_v4.positionScreen.x, _v4.positionScreen.y);
                if (_clipRect.instersects(_bboxRect)) {
                    m = 0;
                    ml = element.meshMaterials.length;
                    while (m < ml) {
                        material = element.meshMaterials[m++];
                        if (material instanceof THREE.MeshFaceMaterial) {
                            fm = 0;
                            fml = element.faceMaterials.length;
                            while (fm < fml) {
                                material = element.faceMaterials[fm++];
                                material && material.opacity != 0 && renderFace4(_v1, _v2, _v3, _v4, _v5, _v6, element, material, scene)
                            }
                            continue
                        }
                        material.opacity != 0 && renderFace4(_v1, _v2, _v3, _v4, _v5, _v6, element, material, scene)
                    }
                }
            }
            _clearRect.addRectangle(_bboxRect)
        }
        _context.setTransform(1, 0, 0, 1, 0, 0);

        function calculateLights(scene) {
            var l, ll, light, lightColor, lights = scene.lights;
            _ambientLight.setRGB(0, 0, 0);
            _directionalLights.setRGB(0, 0,
                0);
            _pointLights.setRGB(0, 0, 0);
            for (l = 0, ll = lights.length; l < ll; l++) {
                light = lights[l];
                lightColor = light.color;
                if (light instanceof THREE.AmbientLight) {
                    _ambientLight.r += lightColor.r;
                    _ambientLight.g += lightColor.g;
                    _ambientLight.b += lightColor.b
                } else if (light instanceof THREE.DirectionalLight) {
                    _directionalLights.r += lightColor.r;
                    _directionalLights.g += lightColor.g;
                    _directionalLights.b += lightColor.b
                } else if (light instanceof THREE.PointLight) {
                    _pointLights.r += lightColor.r;
                    _pointLights.g += lightColor.g;
                    _pointLights.b +=
                        lightColor.b
                }
            }
        }

        function calculateLight(scene, position, normal, color) {
            var l, ll, light, lightColor, amount, lights = scene.lights;
            for (l = 0, ll = lights.length; l < ll; l++) {
                light = lights[l];
                lightColor = light.color;
                if (light instanceof THREE.DirectionalLight) {
                    amount = normal.dot(light.position);
                    if (amount <= 0) continue;
                    amount *= light.intensity;
                    color.r += lightColor.r * amount;
                    color.g += lightColor.g * amount;
                    color.b += lightColor.b * amount
                } else if (light instanceof THREE.PointLight) {
                    amount = normal.dot(_vector3.sub(light.position, position).normalize());
                    if (amount <= 0) continue;
                    amount *= light.distance == 0 ? 1 : 1 - Math.min(position.distanceTo(light.position) / light.distance, 1);
                    if (amount == 0) continue;
                    amount *= light.intensity;
                    color.r += lightColor.r * amount;
                    color.g += lightColor.g * amount;
                    color.b += lightColor.b * amount
                }
            }
        }

        function renderParticle(v1, element, material, scene) {
            setOpacity(material.opacity);
            setBlending(material.blending);
            var width, height, scaleX, scaleY, bitmap, bitmapWidth, bitmapHeight;
            if (material instanceof THREE.ParticleBasicMaterial) {
                if (material.map) {
                    bitmap = material.map.image;
                    bitmapWidth = bitmap.width >> 1;
                    bitmapHeight = bitmap.height >> 1;
                    scaleX = element.scale.x * _canvasWidthHalf;
                    scaleY = element.scale.y * _canvasHeightHalf;
                    width = scaleX * bitmapWidth;
                    height = scaleY * bitmapHeight;
                    _bboxRect.set(v1.x - width, v1.y - height, v1.x + width, v1.y + height);
                    if (!_clipRect.instersects(_bboxRect)) return;
                    _context.save();
                    _context.translate(v1.x, v1.y);
                    _context.rotate(-element.rotation);
                    _context.scale(scaleX, -scaleY);
                    _context.translate(-bitmapWidth, -bitmapHeight);
                    _context.drawImage(bitmap, 0, 0);
                    _context.restore()
                }
            } else if (material instanceof THREE.ParticleCanvasMaterial) {
                width = element.scale.x * _canvasWidthHalf;
                height = element.scale.y * _canvasHeightHalf;
                _bboxRect.set(v1.x - width, v1.y - height, v1.x + width, v1.y + height);
                if (!_clipRect.instersects(_bboxRect)) return;
                setStrokeStyle(material.color);
                setFillStyle(material.color);
                _context.save();
                _context.translate(v1.x, v1.y);
                _context.rotate(-element.rotation);
                _context.scale(width, height);
                material.program(_context);
                _context.restore()
            }
        }

        function renderLine(v1, v2, element, material, scene) {
            setOpacity(material.opacity);
            setBlending(material.blending);
            _context.beginPath();
            _context.moveTo(v1.positionScreen.x, v1.positionScreen.y);
            _context.lineTo(v2.positionScreen.x, v2.positionScreen.y);
            _context.closePath();
            if (material instanceof THREE.LineBasicMaterial) {
                setLineWidth(material.linewidth);
                setLineCap(material.linecap);
                setLineJoin(material.linejoin);
                setStrokeStyle(material.color);
                _context.stroke();
                _bboxRect.inflate(material.linewidth * 2)
            }
        }

        function renderFace3(v1, v2, v3, uv1, uv2, uv3, element, material, scene) {
            _this.data.vertices +=
                3;
            _this.data.faces++;
            setOpacity(material.opacity);
            setBlending(material.blending);
            _v1x = v1.positionScreen.x;
            _v1y = v1.positionScreen.y;
            _v2x = v2.positionScreen.x;
            _v2y = v2.positionScreen.y;
            _v3x = v3.positionScreen.x;
            _v3y = v3.positionScreen.y;
            drawTriangle(_v1x, _v1y, _v2x, _v2y, _v3x, _v3y);
            if (material instanceof THREE.MeshBasicMaterial)
                if (material.map) {
                    if (material.map.mapping instanceof THREE.UVMapping) {
                        _uvs = element.uvs[0];
                        texturePath(_v1x, _v1y, _v2x, _v2y, _v3x, _v3y, material.map.image, _uvs[uv1].u, _uvs[uv1].v, _uvs[uv2].u,
                            _uvs[uv2].v, _uvs[uv3].u, _uvs[uv3].v)
                    }
                } else if (material.envMap) {
                if (material.envMap.mapping instanceof THREE.SphericalReflectionMapping) {
                    var cameraMatrix = camera.matrixWorldInverse;
                    _vector3.copy(element.vertexNormalsWorld[0]);
                    _uv1x = (_vector3.x * cameraMatrix.n11 + _vector3.y * cameraMatrix.n12 + _vector3.z * cameraMatrix.n13) * 0.5 + 0.5;
                    _uv1y = -(_vector3.x * cameraMatrix.n21 + _vector3.y * cameraMatrix.n22 + _vector3.z * cameraMatrix.n23) * 0.5 + 0.5;
                    _vector3.copy(element.vertexNormalsWorld[1]);
                    _uv2x = (_vector3.x * cameraMatrix.n11 +
                        _vector3.y * cameraMatrix.n12 + _vector3.z * cameraMatrix.n13) * 0.5 + 0.5;
                    _uv2y = -(_vector3.x * cameraMatrix.n21 + _vector3.y * cameraMatrix.n22 + _vector3.z * cameraMatrix.n23) * 0.5 + 0.5;
                    _vector3.copy(element.vertexNormalsWorld[2]);
                    _uv3x = (_vector3.x * cameraMatrix.n11 + _vector3.y * cameraMatrix.n12 + _vector3.z * cameraMatrix.n13) * 0.5 + 0.5;
                    _uv3y = -(_vector3.x * cameraMatrix.n21 + _vector3.y * cameraMatrix.n22 + _vector3.z * cameraMatrix.n23) * 0.5 + 0.5;
                    texturePath(_v1x, _v1y, _v2x, _v2y, _v3x, _v3y, material.envMap.image, _uv1x, _uv1y, _uv2x, _uv2y, _uv3x,
                        _uv3y)
                }
            } else material.wireframe ? strokePath(material.color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin) : fillPath(material.color);
            else if (material instanceof THREE.MeshLambertMaterial) {
                if (material.map && !material.wireframe) {
                    if (material.map.mapping instanceof THREE.UVMapping) {
                        _uvs = element.uvs[0];
                        texturePath(_v1x, _v1y, _v2x, _v2y, _v3x, _v3y, material.map.image, _uvs[uv1].u, _uvs[uv1].v, _uvs[uv2].u, _uvs[uv2].v, _uvs[uv3].u, _uvs[uv3].v)
                    }
                    setBlending(THREE.SubtractiveBlending)
                }
                if (_enableLighting)
                    if (!material.wireframe &&
                        material.shading == THREE.SmoothShading && element.vertexNormalsWorld.length == 3) {
                        _color1.r = _color2.r = _color3.r = _ambientLight.r;
                        _color1.g = _color2.g = _color3.g = _ambientLight.g;
                        _color1.b = _color2.b = _color3.b = _ambientLight.b;
                        calculateLight(scene, element.v1.positionWorld, element.vertexNormalsWorld[0], _color1);
                        calculateLight(scene, element.v2.positionWorld, element.vertexNormalsWorld[1], _color2);
                        calculateLight(scene, element.v3.positionWorld, element.vertexNormalsWorld[2], _color3);
                        _color4.r = (_color2.r + _color3.r) *
                            0.5;
                        _color4.g = (_color2.g + _color3.g) * 0.5;
                        _color4.b = (_color2.b + _color3.b) * 0.5;
                        _bitmap = getGradientTexture(_color1, _color2, _color3, _color4);
                        texturePath(_v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _bitmap, 0, 0, 1, 0, 0, 1)
                    } else {
                        _light.r = _ambientLight.r;
                        _light.g = _ambientLight.g;
                        _light.b = _ambientLight.b;
                        calculateLight(scene, element.centroidWorld, element.normalWorld, _light);
                        _color.r = Math.max(0, Math.min(material.color.r * _light.r, 1));
                        _color.g = Math.max(0, Math.min(material.color.g * _light.g, 1));
                        _color.b = Math.max(0, Math.min(material.color.b *
                            _light.b, 1));
                        _color.updateHex();
                        material.wireframe ? strokePath(_color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin) : fillPath(_color)
                    } else material.wireframe ? strokePath(material.color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin) : fillPath(material.color)
            } else if (material instanceof THREE.MeshDepthMaterial) {
                _near = camera.near;
                _far = camera.far;
                _color1.r = _color1.g = _color1.b = 1 - smoothstep(v1.positionScreen.z, _near, _far);
                _color2.r = _color2.g =
                    _color2.b = 1 - smoothstep(v2.positionScreen.z, _near, _far);
                _color3.r = _color3.g = _color3.b = 1 - smoothstep(v3.positionScreen.z, _near, _far);
                _color4.r = (_color2.r + _color3.r) * 0.5;
                _color4.g = (_color2.g + _color3.g) * 0.5;
                _color4.b = (_color2.b + _color3.b) * 0.5;
                _bitmap = getGradientTexture(_color1, _color2, _color3, _color4);
                texturePath(_v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _bitmap, 0, 0, 1, 0, 0, 1)
            } else if (material instanceof THREE.MeshNormalMaterial) {
                _color.r = normalToComponent(element.normalWorld.x);
                _color.g = normalToComponent(element.normalWorld.y);
                _color.b = normalToComponent(element.normalWorld.z);
                _color.updateHex();
                material.wireframe ? strokePath(_color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin) : fillPath(_color)
            }
        }

        function renderFace4(v1, v2, v3, v4, v5, v6, element, material, scene) {
            _this.data.vertices += 4;
            _this.data.faces++;
            setOpacity(material.opacity);
            setBlending(material.blending);
            if (material.map || material.envMap) {
                renderFace3(v1, v2, v4, 0, 1, 3, element, material, scene);
                renderFace3(v5, v3, v6, 1, 2, 3, element, material, scene);
                return
            }
            _v1x = v1.positionScreen.x;
            _v1y = v1.positionScreen.y;
            _v2x = v2.positionScreen.x;
            _v2y = v2.positionScreen.y;
            _v3x = v3.positionScreen.x;
            _v3y = v3.positionScreen.y;
            _v4x = v4.positionScreen.x;
            _v4y = v4.positionScreen.y;
            _v5x = v5.positionScreen.x;
            _v5y = v5.positionScreen.y;
            _v6x = v6.positionScreen.x;
            _v6y = v6.positionScreen.y;
            if (material instanceof THREE.MeshBasicMaterial) {
                drawQuad(_v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _v4x, _v4y);
                material.wireframe ? strokePath(material.color, material.wireframeLinewidth, material.wireframeLinecap,
                    material.wireframeLinejoin) : fillPath(material.color)
            } else if (material instanceof THREE.MeshLambertMaterial)
                if (_enableLighting)
                    if (!material.wireframe && material.shading == THREE.SmoothShading && element.vertexNormalsWorld.length == 4) {
                        _color1.r = _color2.r = _color3.r = _color4.r = _ambientLight.r;
                        _color1.g = _color2.g = _color3.g = _color4.g = _ambientLight.g;
                        _color1.b = _color2.b = _color3.b = _color4.b = _ambientLight.b;
                        calculateLight(scene, element.v1.positionWorld, element.vertexNormalsWorld[0], _color1);
                        calculateLight(scene,
                            element.v2.positionWorld, element.vertexNormalsWorld[1], _color2);
                        calculateLight(scene, element.v4.positionWorld, element.vertexNormalsWorld[3], _color3);
                        calculateLight(scene, element.v3.positionWorld, element.vertexNormalsWorld[2], _color4);
                        _bitmap = getGradientTexture(_color1, _color2, _color3, _color4);
                        drawTriangle(_v1x, _v1y, _v2x, _v2y, _v4x, _v4y);
                        texturePath(_v1x, _v1y, _v2x, _v2y, _v4x, _v4y, _bitmap, 0, 0, 1, 0, 0, 1);
                        drawTriangle(_v5x, _v5y, _v3x, _v3y, _v6x, _v6y);
                        texturePath(_v5x, _v5y, _v3x, _v3y, _v6x, _v6y, _bitmap, 1, 0, 1,
                            1, 0, 1)
                    } else {
                        _light.r = _ambientLight.r;
                        _light.g = _ambientLight.g;
                        _light.b = _ambientLight.b;
                        calculateLight(scene, element.centroidWorld, element.normalWorld, _light);
                        _color.r = Math.max(0, Math.min(material.color.r * _light.r, 1));
                        _color.g = Math.max(0, Math.min(material.color.g * _light.g, 1));
                        _color.b = Math.max(0, Math.min(material.color.b * _light.b, 1));
                        _color.updateHex();
                        drawQuad(_v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _v4x, _v4y);
                        material.wireframe ? strokePath(_color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin) :
                            fillPath(_color)
                    } else {
                drawQuad(_v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _v4x, _v4y);
                material.wireframe ? strokePath(material.color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin) : fillPath(material.color)
            } else if (material instanceof THREE.MeshNormalMaterial) {
                _color.r = normalToComponent(element.normalWorld.x);
                _color.g = normalToComponent(element.normalWorld.y);
                _color.b = normalToComponent(element.normalWorld.z);
                _color.updateHex();
                drawQuad(_v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _v4x, _v4y);
                material.wireframe ?
                    strokePath(_color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin) : fillPath(_color)
            } else if (material instanceof THREE.MeshDepthMaterial) {
                _near = camera.near;
                _far = camera.far;
                _color1.r = _color1.g = _color1.b = 1 - smoothstep(v1.positionScreen.z, _near, _far);
                _color2.r = _color2.g = _color2.b = 1 - smoothstep(v2.positionScreen.z, _near, _far);
                _color3.r = _color3.g = _color3.b = 1 - smoothstep(v4.positionScreen.z, _near, _far);
                _color4.r = _color4.g = _color4.b = 1 - smoothstep(v3.positionScreen.z, _near, _far);
                _bitmap = getGradientTexture(_color1, _color2, _color3, _color4);
                drawTriangle(_v1x, _v1y, _v2x, _v2y, _v4x, _v4y);
                texturePath(_v1x, _v1y, _v2x, _v2y, _v4x, _v4y, _bitmap, 0, 0, 1, 0, 0, 1);
                drawTriangle(_v5x, _v5y, _v3x, _v3y, _v6x, _v6y);
                texturePath(_v5x, _v5y, _v3x, _v3y, _v6x, _v6y, _bitmap, 1, 0, 1, 1, 0, 1)
            }
        }

        function drawTriangle(x0, y0, x1, y1, x2, y2) {
            _context.beginPath();
            _context.moveTo(x0, y0);
            _context.lineTo(x1, y1);
            _context.lineTo(x2, y2);
            _context.lineTo(x0, y0);
            _context.closePath()
        }

        function drawQuad(x0, y0, x1, y1, x2, y2, x3, y3) {
            _context.beginPath();
            _context.moveTo(x0, y0);
            _context.lineTo(x1, y1);
            _context.lineTo(x2, y2);
            _context.lineTo(x3, y3);
            _context.lineTo(x0, y0);
            _context.closePath()
        }

        function strokePath(color, linewidth, linecap, linejoin) {
            setLineWidth(linewidth);
            setLineCap(linecap);
            setLineJoin(linejoin);
            setStrokeStyle(color);
            _context.stroke();
            _bboxRect.inflate(linewidth * 2)
        }

        function fillPath(color) {
            setFillStyle(color);
            _context.fill()
        }

        function texturePath(x0, y0, x1, y1, x2, y2, bitmap, u0, v0, u1, v1, u2, v2) {
            var a, b, c, d, e, f, det, idet, width = bitmap.width - 1,
                height =
                bitmap.height - 1;
            u0 *= width;
            v0 *= height;
            u1 *= width;
            v1 *= height;
            u2 *= width;
            v2 *= height;
            x1 -= x0;
            y1 -= y0;
            x2 -= x0;
            y2 -= y0;
            u1 -= u0;
            v1 -= v0;
            u2 -= u0;
            v2 -= v0;
            det = u1 * v2 - u2 * v1;
            if (det == 0) return;
            idet = 1 / det;
            a = (v2 * x1 - v1 * x2) * idet;
            b = (v2 * y1 - v1 * y2) * idet;
            c = (u1 * x2 - u2 * x1) * idet;
            d = (u1 * y2 - u2 * y1) * idet;
            e = x0 - a * u0 - c * v0;
            f = y0 - b * u0 - d * v0;
            _context.save();
            _context.transform(a, b, c, d, e, f);
            _context.clip();
            _context.drawImage(bitmap, 0, 0);
            _context.restore()
        }

        function getGradientTexture(color1, color2, color3, color4) {
            var c1r = ~~(color1.r * 255),
                c1g = ~~(color1.g *
                    255),
                c1b = ~~(color1.b * 255),
                c2r = ~~(color2.r * 255),
                c2g = ~~(color2.g * 255),
                c2b = ~~(color2.b * 255),
                c3r = ~~(color3.r * 255),
                c3g = ~~(color3.g * 255),
                c3b = ~~(color3.b * 255),
                c4r = ~~(color4.r * 255),
                c4g = ~~(color4.g * 255),
                c4b = ~~(color4.b * 255);
            _pixelMapData[0] = c1r < 0 ? 0 : c1r > 255 ? 255 : c1r;
            _pixelMapData[1] = c1g < 0 ? 0 : c1g > 255 ? 255 : c1g;
            _pixelMapData[2] = c1b < 0 ? 0 : c1b > 255 ? 255 : c1b;
            _pixelMapData[4] = c2r < 0 ? 0 : c2r > 255 ? 255 : c2r;
            _pixelMapData[5] = c2g < 0 ? 0 : c2g > 255 ? 255 : c2g;
            _pixelMapData[6] = c2b < 0 ? 0 : c2b > 255 ? 255 : c2b;
            _pixelMapData[8] = c3r < 0 ? 0 : c3r > 255 ? 255 : c3r;
            _pixelMapData[9] = c3g < 0 ? 0 : c3g > 255 ? 255 : c3g;
            _pixelMapData[10] = c3b < 0 ? 0 : c3b > 255 ? 255 : c3b;
            _pixelMapData[12] = c4r < 0 ? 0 : c4r > 255 ? 255 : c4r;
            _pixelMapData[13] = c4g < 0 ? 0 : c4g > 255 ? 255 : c4g;
            _pixelMapData[14] = c4b < 0 ? 0 : c4b > 255 ? 255 : c4b;
            _pixelMapContext.putImageData(_pixelMapImage, 0, 0);
            _gradientMapContext.drawImage(_pixelMap, 0, 0);
            return _gradientMap
        }

        function smoothstep(value, min, max) {
            var x = (value - min) / (max - min);
            return x * x * (3 - 2 * x)
        }

        function normalToComponent(normal) {
            var component = (normal + 1) * 0.5;
            return component < 0 ? 0 : component >
                1 ? 1 : component
        }

        function expand(v1, v2) {
            var x = v2.x - v1.x,
                y = v2.y - v1.y,
                unit = 1 / Math.sqrt(x * x + y * y);
            x *= unit;
            y *= unit;
            v2.x += x;
            v2.y += y;
            v1.x -= x;
            v1.y -= y
        }
    };

    function setOpacity(value) {
        if (_contextGlobalAlpha != value) _context.globalAlpha = _contextGlobalAlpha = value
    }

    function setBlending(value) {
        if (_contextGlobalCompositeOperation != value) {
            switch (value) {
                case THREE.NormalBlending:
                    _context.globalCompositeOperation = "source-over";
                    break;
                case THREE.AdditiveBlending:
                    _context.globalCompositeOperation = "lighter";
                    break;
                case THREE.SubtractiveBlending:
                    _context.globalCompositeOperation =
                        "darker";
                    break
            }
            _contextGlobalCompositeOperation = value
        }
    }

    function setLineWidth(value) {
        if (_contextLineWidth != value) _context.lineWidth = _contextLineWidth = value
    }

    function setLineCap(value) {
        if (_contextLineCap != value) _context.lineCap = _contextLineCap = value
    }

    function setLineJoin(value) {
        if (_contextLineJoin != value) _context.lineJoin = _contextLineJoin = value
    }

    function setStrokeStyle(color) {
        if (_contextStrokeStyle != color.hex) {
            _contextStrokeStyle = color.hex;
            _context.strokeStyle = "#" + pad(_contextStrokeStyle.toString(16))
        }
    }

    function setFillStyle(color) {
        if (_contextFillStyle != color.hex) {
            _contextFillStyle = color.hex;
            _context.fillStyle = "#" + pad(_contextFillStyle.toString(16))
        }
    }

    function pad(str) {
        while (str.length < 6) str = "0" + str;
        return str
    }
};
THREE.RenderableVertex = function() {
    this.positionWorld = new THREE.Vector3;
    this.positionScreen = new THREE.Vector4;
    this.visible = true
};
THREE.RenderableVertex.prototype.copy = function(vertex) {
    this.positionWorld.copy(vertex.positionWorld);
    this.positionScreen.copy(vertex.positionScreen)
};
THREE.RenderableFace3 = function() {
    this.v1 = new THREE.RenderableVertex;
    this.v2 = new THREE.RenderableVertex;
    this.v3 = new THREE.RenderableVertex;
    this.centroidWorld = new THREE.Vector3;
    this.centroidScreen = new THREE.Vector3;
    this.normalWorld = new THREE.Vector3;
    this.vertexNormalsWorld = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
    this.meshMaterials = null;
    this.faceMaterials = null;
    this.overdraw = false;
    this.uvs = [[]];
    this.z = null
};
THREE.RenderableFace4 = function() {
    this.v1 = new THREE.RenderableVertex;
    this.v2 = new THREE.RenderableVertex;
    this.v3 = new THREE.RenderableVertex;
    this.v4 = new THREE.RenderableVertex;
    this.centroidWorld = new THREE.Vector3;
    this.centroidScreen = new THREE.Vector3;
    this.normalWorld = new THREE.Vector3;
    this.vertexNormalsWorld = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
    this.meshMaterials = null;
    this.faceMaterials = null;
    this.overdraw = false;
    this.uvs = [[]];
    this.z = null
};
THREE.RenderableObject = function() {
    this.object = null;
    this.z = null
};
THREE.RenderableParticle = function() {
    this.x = null;
    this.y = null;
    this.z = null;
    this.rotation = null;
    this.scale = new THREE.Vector2;
    this.materials = null
};
THREE.RenderableLine = function() {
    this.z = null;
    this.v1 = new THREE.RenderableVertex;
    this.v2 = new THREE.RenderableVertex;
    this.materials = null
};
THREE.Plane = function(width, height, segmentsWidth, segmentsHeight) {
    THREE.Geometry.call(this);
    var ix, iy, width_half = width / 2,
        height_half = height / 2,
        gridX = segmentsWidth || 1,
        gridY = segmentsHeight || 1,
        gridX1 = gridX + 1,
        gridY1 = gridY + 1,
        segment_width = width / gridX,
        segment_height = height / gridY;
    for (iy = 0; iy < gridY1; iy++)
        for (ix = 0; ix < gridX1; ix++) {
            var x = ix * segment_width - width_half;
            var y = iy * segment_height - height_half;
            this.vertices.push(new THREE.Vertex(new THREE.Vector3(x, -y, 0)))
        }
    for (iy = 0; iy < gridY; iy++)
        for (ix = 0; ix < gridX; ix++) {
            var a =
                ix + gridX1 * iy;
            var b = ix + gridX1 * (iy + 1);
            var c = ix + 1 + gridX1 * (iy + 1);
            var d = ix + 1 + gridX1 * iy;
            this.faces.push(new THREE.Face4(a, b, c, d));
            this.faceVertexUvs[0].push([new THREE.UV(ix / gridX, iy / gridY), new THREE.UV(ix / gridX, (iy + 1) / gridY), new THREE.UV((ix + 1) / gridX, (iy + 1) / gridY), new THREE.UV((ix + 1) / gridX, iy / gridY)])
        }
    this.computeCentroids();
    this.computeFaceNormals()
};
THREE.Plane.prototype = new THREE.Geometry;
THREE.Plane.prototype.constructor = THREE.Plane;

var cancelRequestAnimFrame = function() {
    return window.cancelAnimationFrame || 
        window.webkitCancelRequestAnimationFrame || 
        window.mozCancelRequestAnimationFrame || 
        window.oCancelRequestAnimationFrame || 
        window.msCancelRequestAnimationFrame || clearTimeout
}();