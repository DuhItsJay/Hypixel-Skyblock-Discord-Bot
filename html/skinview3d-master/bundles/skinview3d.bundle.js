/* @preserve skinview3d / MIT License / https://github.com/bs-community/skinview3d */
!(function (e, t) {
	'object' == typeof exports && 'undefined' != typeof module
		? t(exports)
		: 'function' == typeof define && define.amd
		? define(['exports'], t)
		: t(((e = 'undefined' != typeof globalThis ? globalThis : e || self).skinview3d = {}))
})(this, function (e) {
	'use strict'
	const t = 0,
		i = 1,
		n = 2,
		r = 0,
		a = 1,
		s = 2,
		o = 3,
		l = 100,
		c = 301,
		h = 302,
		d = 303,
		u = 306,
		p = 1e3,
		f = 1001,
		m = 1002,
		g = 1003,
		x = 1006,
		_ = 1008,
		v = 1009,
		y = 1012,
		M = 1014,
		b = 1015,
		S = 1016,
		w = 1020,
		T = 1022,
		A = 1023,
		E = 1026,
		L = 1027,
		P = 3e3,
		F = 3001,
		C = 7680,
		N = '300 es'
	class D {
		addEventListener(e, t) {
			void 0 === this._listeners && (this._listeners = {})
			const i = this._listeners
			void 0 === i[e] && (i[e] = []), -1 === i[e].indexOf(t) && i[e].push(t)
		}
		hasEventListener(e, t) {
			if (void 0 === this._listeners) return !1
			const i = this._listeners
			return void 0 !== i[e] && -1 !== i[e].indexOf(t)
		}
		removeEventListener(e, t) {
			if (void 0 === this._listeners) return
			const i = this._listeners[e]
			if (void 0 !== i) {
				const e = i.indexOf(t)
				;-1 !== e && i.splice(e, 1)
			}
		}
		dispatchEvent(e) {
			if (void 0 === this._listeners) return
			const t = this._listeners[e.type]
			if (void 0 !== t) {
				e.target = this
				const i = t.slice(0)
				for (let t = 0, n = i.length; t < n; t++) i[t].call(this, e)
				e.target = null
			}
		}
	}
	const I = []
	for (let e = 0; e < 256; e++) I[e] = (e < 16 ? '0' : '') + e.toString(16)
	const R = Math.PI / 180,
		U = 180 / Math.PI
	function z() {
		const e = (4294967295 * Math.random()) | 0,
			t = (4294967295 * Math.random()) | 0,
			i = (4294967295 * Math.random()) | 0,
			n = (4294967295 * Math.random()) | 0
		return (
			I[255 & e] +
			I[(e >> 8) & 255] +
			I[(e >> 16) & 255] +
			I[(e >> 24) & 255] +
			'-' +
			I[255 & t] +
			I[(t >> 8) & 255] +
			'-' +
			I[((t >> 16) & 15) | 64] +
			I[(t >> 24) & 255] +
			'-' +
			I[(63 & i) | 128] +
			I[(i >> 8) & 255] +
			'-' +
			I[(i >> 16) & 255] +
			I[(i >> 24) & 255] +
			I[255 & n] +
			I[(n >> 8) & 255] +
			I[(n >> 16) & 255] +
			I[(n >> 24) & 255]
		).toUpperCase()
	}
	function O(e, t, i) {
		return Math.max(t, Math.min(i, e))
	}
	function B(e, t, i) {
		return (1 - i) * e + i * t
	}
	function k(e) {
		return 0 == (e & (e - 1)) && 0 !== e
	}
	function G(e) {
		return Math.pow(2, Math.floor(Math.log(e) / Math.LN2))
	}
	class H {
		constructor(e = 0, t = 0) {
			;(this.x = e), (this.y = t)
		}
		get width() {
			return this.x
		}
		set width(e) {
			this.x = e
		}
		get height() {
			return this.y
		}
		set height(e) {
			this.y = e
		}
		set(e, t) {
			return (this.x = e), (this.y = t), this
		}
		setScalar(e) {
			return (this.x = e), (this.y = e), this
		}
		setX(e) {
			return (this.x = e), this
		}
		setY(e) {
			return (this.y = e), this
		}
		setComponent(e, t) {
			switch (e) {
				case 0:
					this.x = t
					break
				case 1:
					this.y = t
					break
				default:
					throw new Error('index is out of range: ' + e)
			}
			return this
		}
		getComponent(e) {
			switch (e) {
				case 0:
					return this.x
				case 1:
					return this.y
				default:
					throw new Error('index is out of range: ' + e)
			}
		}
		clone() {
			return new this.constructor(this.x, this.y)
		}
		copy(e) {
			return (this.x = e.x), (this.y = e.y), this
		}
		add(e, t) {
			return void 0 !== t
				? (console.warn('THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.'), this.addVectors(e, t))
				: ((this.x += e.x), (this.y += e.y), this)
		}
		addScalar(e) {
			return (this.x += e), (this.y += e), this
		}
		addVectors(e, t) {
			return (this.x = e.x + t.x), (this.y = e.y + t.y), this
		}
		addScaledVector(e, t) {
			return (this.x += e.x * t), (this.y += e.y * t), this
		}
		sub(e, t) {
			return void 0 !== t
				? (console.warn('THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.'), this.subVectors(e, t))
				: ((this.x -= e.x), (this.y -= e.y), this)
		}
		subScalar(e) {
			return (this.x -= e), (this.y -= e), this
		}
		subVectors(e, t) {
			return (this.x = e.x - t.x), (this.y = e.y - t.y), this
		}
		multiply(e) {
			return (this.x *= e.x), (this.y *= e.y), this
		}
		multiplyScalar(e) {
			return (this.x *= e), (this.y *= e), this
		}
		divide(e) {
			return (this.x /= e.x), (this.y /= e.y), this
		}
		divideScalar(e) {
			return this.multiplyScalar(1 / e)
		}
		applyMatrix3(e) {
			const t = this.x,
				i = this.y,
				n = e.elements
			return (this.x = n[0] * t + n[3] * i + n[6]), (this.y = n[1] * t + n[4] * i + n[7]), this
		}
		min(e) {
			return (this.x = Math.min(this.x, e.x)), (this.y = Math.min(this.y, e.y)), this
		}
		max(e) {
			return (this.x = Math.max(this.x, e.x)), (this.y = Math.max(this.y, e.y)), this
		}
		clamp(e, t) {
			return (this.x = Math.max(e.x, Math.min(t.x, this.x))), (this.y = Math.max(e.y, Math.min(t.y, this.y))), this
		}
		clampScalar(e, t) {
			return (this.x = Math.max(e, Math.min(t, this.x))), (this.y = Math.max(e, Math.min(t, this.y))), this
		}
		clampLength(e, t) {
			const i = this.length()
			return this.divideScalar(i || 1).multiplyScalar(Math.max(e, Math.min(t, i)))
		}
		floor() {
			return (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this
		}
		ceil() {
			return (this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this
		}
		round() {
			return (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this
		}
		roundToZero() {
			return (this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x)), (this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y)), this
		}
		negate() {
			return (this.x = -this.x), (this.y = -this.y), this
		}
		dot(e) {
			return this.x * e.x + this.y * e.y
		}
		cross(e) {
			return this.x * e.y - this.y * e.x
		}
		lengthSq() {
			return this.x * this.x + this.y * this.y
		}
		length() {
			return Math.sqrt(this.x * this.x + this.y * this.y)
		}
		manhattanLength() {
			return Math.abs(this.x) + Math.abs(this.y)
		}
		normalize() {
			return this.divideScalar(this.length() || 1)
		}
		angle() {
			return Math.atan2(-this.y, -this.x) + Math.PI
		}
		distanceTo(e) {
			return Math.sqrt(this.distanceToSquared(e))
		}
		distanceToSquared(e) {
			const t = this.x - e.x,
				i = this.y - e.y
			return t * t + i * i
		}
		manhattanDistanceTo(e) {
			return Math.abs(this.x - e.x) + Math.abs(this.y - e.y)
		}
		setLength(e) {
			return this.normalize().multiplyScalar(e)
		}
		lerp(e, t) {
			return (this.x += (e.x - this.x) * t), (this.y += (e.y - this.y) * t), this
		}
		lerpVectors(e, t, i) {
			return (this.x = e.x + (t.x - e.x) * i), (this.y = e.y + (t.y - e.y) * i), this
		}
		equals(e) {
			return e.x === this.x && e.y === this.y
		}
		fromArray(e, t = 0) {
			return (this.x = e[t]), (this.y = e[t + 1]), this
		}
		toArray(e = [], t = 0) {
			return (e[t] = this.x), (e[t + 1] = this.y), e
		}
		fromBufferAttribute(e, t, i) {
			return (
				void 0 !== i && console.warn('THREE.Vector2: offset has been removed from .fromBufferAttribute().'), (this.x = e.getX(t)), (this.y = e.getY(t)), this
			)
		}
		rotateAround(e, t) {
			const i = Math.cos(t),
				n = Math.sin(t),
				r = this.x - e.x,
				a = this.y - e.y
			return (this.x = r * i - a * n + e.x), (this.y = r * n + a * i + e.y), this
		}
		random() {
			return (this.x = Math.random()), (this.y = Math.random()), this
		}
		*[Symbol.iterator]() {
			yield this.x, yield this.y
		}
	}
	H.prototype.isVector2 = !0
	class V {
		constructor() {
			;(this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]),
				arguments.length > 0 && console.error('THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.')
		}
		set(e, t, i, n, r, a, s, o, l) {
			const c = this.elements
			return (c[0] = e), (c[1] = n), (c[2] = s), (c[3] = t), (c[4] = r), (c[5] = o), (c[6] = i), (c[7] = a), (c[8] = l), this
		}
		identity() {
			return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
		}
		copy(e) {
			const t = this.elements,
				i = e.elements
			return (t[0] = i[0]), (t[1] = i[1]), (t[2] = i[2]), (t[3] = i[3]), (t[4] = i[4]), (t[5] = i[5]), (t[6] = i[6]), (t[7] = i[7]), (t[8] = i[8]), this
		}
		extractBasis(e, t, i) {
			return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), i.setFromMatrix3Column(this, 2), this
		}
		setFromMatrix4(e) {
			const t = e.elements
			return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this
		}
		multiply(e) {
			return this.multiplyMatrices(this, e)
		}
		premultiply(e) {
			return this.multiplyMatrices(e, this)
		}
		multiplyMatrices(e, t) {
			const i = e.elements,
				n = t.elements,
				r = this.elements,
				a = i[0],
				s = i[3],
				o = i[6],
				l = i[1],
				c = i[4],
				h = i[7],
				d = i[2],
				u = i[5],
				p = i[8],
				f = n[0],
				m = n[3],
				g = n[6],
				x = n[1],
				_ = n[4],
				v = n[7],
				y = n[2],
				M = n[5],
				b = n[8]
			return (
				(r[0] = a * f + s * x + o * y),
				(r[3] = a * m + s * _ + o * M),
				(r[6] = a * g + s * v + o * b),
				(r[1] = l * f + c * x + h * y),
				(r[4] = l * m + c * _ + h * M),
				(r[7] = l * g + c * v + h * b),
				(r[2] = d * f + u * x + p * y),
				(r[5] = d * m + u * _ + p * M),
				(r[8] = d * g + u * v + p * b),
				this
			)
		}
		multiplyScalar(e) {
			const t = this.elements
			return (t[0] *= e), (t[3] *= e), (t[6] *= e), (t[1] *= e), (t[4] *= e), (t[7] *= e), (t[2] *= e), (t[5] *= e), (t[8] *= e), this
		}
		determinant() {
			const e = this.elements,
				t = e[0],
				i = e[1],
				n = e[2],
				r = e[3],
				a = e[4],
				s = e[5],
				o = e[6],
				l = e[7],
				c = e[8]
			return t * a * c - t * s * l - i * r * c + i * s * o + n * r * l - n * a * o
		}
		invert() {
			const e = this.elements,
				t = e[0],
				i = e[1],
				n = e[2],
				r = e[3],
				a = e[4],
				s = e[5],
				o = e[6],
				l = e[7],
				c = e[8],
				h = c * a - s * l,
				d = s * o - c * r,
				u = l * r - a * o,
				p = t * h + i * d + n * u
			if (0 === p) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0)
			const f = 1 / p
			return (
				(e[0] = h * f),
				(e[1] = (n * l - c * i) * f),
				(e[2] = (s * i - n * a) * f),
				(e[3] = d * f),
				(e[4] = (c * t - n * o) * f),
				(e[5] = (n * r - s * t) * f),
				(e[6] = u * f),
				(e[7] = (i * o - l * t) * f),
				(e[8] = (a * t - i * r) * f),
				this
			)
		}
		transpose() {
			let e
			const t = this.elements
			return (e = t[1]), (t[1] = t[3]), (t[3] = e), (e = t[2]), (t[2] = t[6]), (t[6] = e), (e = t[5]), (t[5] = t[7]), (t[7] = e), this
		}
		getNormalMatrix(e) {
			return this.setFromMatrix4(e).invert().transpose()
		}
		transposeIntoArray(e) {
			const t = this.elements
			return (e[0] = t[0]), (e[1] = t[3]), (e[2] = t[6]), (e[3] = t[1]), (e[4] = t[4]), (e[5] = t[7]), (e[6] = t[2]), (e[7] = t[5]), (e[8] = t[8]), this
		}
		setUvTransform(e, t, i, n, r, a, s) {
			const o = Math.cos(r),
				l = Math.sin(r)
			return this.set(i * o, i * l, -i * (o * a + l * s) + a + e, -n * l, n * o, -n * (-l * a + o * s) + s + t, 0, 0, 1), this
		}
		scale(e, t) {
			const i = this.elements
			return (i[0] *= e), (i[3] *= e), (i[6] *= e), (i[1] *= t), (i[4] *= t), (i[7] *= t), this
		}
		rotate(e) {
			const t = Math.cos(e),
				i = Math.sin(e),
				n = this.elements,
				r = n[0],
				a = n[3],
				s = n[6],
				o = n[1],
				l = n[4],
				c = n[7]
			return (
				(n[0] = t * r + i * o), (n[3] = t * a + i * l), (n[6] = t * s + i * c), (n[1] = -i * r + t * o), (n[4] = -i * a + t * l), (n[7] = -i * s + t * c), this
			)
		}
		translate(e, t) {
			const i = this.elements
			return (i[0] += e * i[2]), (i[3] += e * i[5]), (i[6] += e * i[8]), (i[1] += t * i[2]), (i[4] += t * i[5]), (i[7] += t * i[8]), this
		}
		equals(e) {
			const t = this.elements,
				i = e.elements
			for (let e = 0; e < 9; e++) if (t[e] !== i[e]) return !1
			return !0
		}
		fromArray(e, t = 0) {
			for (let i = 0; i < 9; i++) this.elements[i] = e[i + t]
			return this
		}
		toArray(e = [], t = 0) {
			const i = this.elements
			return (
				(e[t] = i[0]),
				(e[t + 1] = i[1]),
				(e[t + 2] = i[2]),
				(e[t + 3] = i[3]),
				(e[t + 4] = i[4]),
				(e[t + 5] = i[5]),
				(e[t + 6] = i[6]),
				(e[t + 7] = i[7]),
				(e[t + 8] = i[8]),
				e
			)
		}
		clone() {
			return new this.constructor().fromArray(this.elements)
		}
	}
	function W(e) {
		if (0 === e.length) return -1 / 0
		let t = e[0]
		for (let i = 1, n = e.length; i < n; ++i) e[i] > t && (t = e[i])
		return t
	}
	function X(e) {
		return document.createElementNS('http://www.w3.org/1999/xhtml', e)
	}
	let Y
	V.prototype.isMatrix3 = !0
	let j = 0
	class Q extends D {
		constructor(e = Q.DEFAULT_IMAGE, t = Q.DEFAULT_MAPPING, i = 1001, n = 1001, r = 1006, a = 1008, s = 1023, o = 1009, l = 1, c = 3e3) {
			super(),
				Object.defineProperty(this, 'id', { value: j++ }),
				(this.uuid = z()),
				(this.name = ''),
				(this.image = e),
				(this.mipmaps = []),
				(this.mapping = t),
				(this.wrapS = i),
				(this.wrapT = n),
				(this.magFilter = r),
				(this.minFilter = a),
				(this.anisotropy = l),
				(this.format = s),
				(this.internalFormat = null),
				(this.type = o),
				(this.offset = new H(0, 0)),
				(this.repeat = new H(1, 1)),
				(this.center = new H(0, 0)),
				(this.rotation = 0),
				(this.matrixAutoUpdate = !0),
				(this.matrix = new V()),
				(this.generateMipmaps = !0),
				(this.premultiplyAlpha = !1),
				(this.flipY = !0),
				(this.unpackAlignment = 4),
				(this.encoding = c),
				(this.userData = {}),
				(this.version = 0),
				(this.onUpdate = null),
				(this.isRenderTargetTexture = !1)
		}
		updateMatrix() {
			this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y)
		}
		clone() {
			return new this.constructor().copy(this)
		}
		copy(e) {
			return (
				(this.name = e.name),
				(this.image = e.image),
				(this.mipmaps = e.mipmaps.slice(0)),
				(this.mapping = e.mapping),
				(this.wrapS = e.wrapS),
				(this.wrapT = e.wrapT),
				(this.magFilter = e.magFilter),
				(this.minFilter = e.minFilter),
				(this.anisotropy = e.anisotropy),
				(this.format = e.format),
				(this.internalFormat = e.internalFormat),
				(this.type = e.type),
				this.offset.copy(e.offset),
				this.repeat.copy(e.repeat),
				this.center.copy(e.center),
				(this.rotation = e.rotation),
				(this.matrixAutoUpdate = e.matrixAutoUpdate),
				this.matrix.copy(e.matrix),
				(this.generateMipmaps = e.generateMipmaps),
				(this.premultiplyAlpha = e.premultiplyAlpha),
				(this.flipY = e.flipY),
				(this.unpackAlignment = e.unpackAlignment),
				(this.encoding = e.encoding),
				(this.userData = JSON.parse(JSON.stringify(e.userData))),
				this
			)
		}
		toJSON(e) {
			const t = void 0 === e || 'string' == typeof e
			if (!t && void 0 !== e.textures[this.uuid]) return e.textures[this.uuid]
			const i = {
				metadata: { version: 4.5, type: 'Texture', generator: 'Texture.toJSON' },
				uuid: this.uuid,
				name: this.name,
				mapping: this.mapping,
				repeat: [this.repeat.x, this.repeat.y],
				offset: [this.offset.x, this.offset.y],
				center: [this.center.x, this.center.y],
				rotation: this.rotation,
				wrap: [this.wrapS, this.wrapT],
				format: this.format,
				type: this.type,
				encoding: this.encoding,
				minFilter: this.minFilter,
				magFilter: this.magFilter,
				anisotropy: this.anisotropy,
				flipY: this.flipY,
				premultiplyAlpha: this.premultiplyAlpha,
				unpackAlignment: this.unpackAlignment,
			}
			if (void 0 !== this.image) {
				const n = this.image
				if ((void 0 === n.uuid && (n.uuid = z()), !t && void 0 === e.images[n.uuid])) {
					let t
					if (Array.isArray(n)) {
						t = []
						for (let e = 0, i = n.length; e < i; e++) n[e].isDataTexture ? t.push(q(n[e].image)) : t.push(q(n[e]))
					} else t = q(n)
					e.images[n.uuid] = { uuid: n.uuid, url: t }
				}
				i.image = n.uuid
			}
			return '{}' !== JSON.stringify(this.userData) && (i.userData = this.userData), t || (e.textures[this.uuid] = i), i
		}
		dispose() {
			this.dispatchEvent({ type: 'dispose' })
		}
		transformUv(e) {
			if (300 !== this.mapping) return e
			if ((e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1))
				switch (this.wrapS) {
					case p:
						e.x = e.x - Math.floor(e.x)
						break
					case f:
						e.x = e.x < 0 ? 0 : 1
						break
					case m:
						1 === Math.abs(Math.floor(e.x) % 2) ? (e.x = Math.ceil(e.x) - e.x) : (e.x = e.x - Math.floor(e.x))
				}
			if (e.y < 0 || e.y > 1)
				switch (this.wrapT) {
					case p:
						e.y = e.y - Math.floor(e.y)
						break
					case f:
						e.y = e.y < 0 ? 0 : 1
						break
					case m:
						1 === Math.abs(Math.floor(e.y) % 2) ? (e.y = Math.ceil(e.y) - e.y) : (e.y = e.y - Math.floor(e.y))
				}
			return this.flipY && (e.y = 1 - e.y), e
		}
		set needsUpdate(e) {
			!0 === e && this.version++
		}
	}
	function q(e) {
		return ('undefined' != typeof HTMLImageElement && e instanceof HTMLImageElement) ||
			('undefined' != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement) ||
			('undefined' != typeof ImageBitmap && e instanceof ImageBitmap)
			? class {
					static getDataURL(e) {
						if (/^data:/i.test(e.src)) return e.src
						if ('undefined' == typeof HTMLCanvasElement) return e.src
						let t
						if (e instanceof HTMLCanvasElement) t = e
						else {
							void 0 === Y && (Y = X('canvas')), (Y.width = e.width), (Y.height = e.height)
							const i = Y.getContext('2d')
							e instanceof ImageData ? i.putImageData(e, 0, 0) : i.drawImage(e, 0, 0, e.width, e.height), (t = Y)
						}
						return t.width > 2048 || t.height > 2048
							? (console.warn('THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons', e), t.toDataURL('image/jpeg', 0.6))
							: t.toDataURL('image/png')
					}
			  }.getDataURL(e)
			: e.data
			? { data: Array.prototype.slice.call(e.data), width: e.width, height: e.height, type: e.data.constructor.name }
			: (console.warn('THREE.Texture: Unable to serialize Texture.'), {})
	}
	;(Q.DEFAULT_IMAGE = void 0), (Q.DEFAULT_MAPPING = 300), (Q.prototype.isTexture = !0)
	class Z {
		constructor(e = 0, t = 0, i = 0, n = 1) {
			;(this.x = e), (this.y = t), (this.z = i), (this.w = n)
		}
		get width() {
			return this.z
		}
		set width(e) {
			this.z = e
		}
		get height() {
			return this.w
		}
		set height(e) {
			this.w = e
		}
		set(e, t, i, n) {
			return (this.x = e), (this.y = t), (this.z = i), (this.w = n), this
		}
		setScalar(e) {
			return (this.x = e), (this.y = e), (this.z = e), (this.w = e), this
		}
		setX(e) {
			return (this.x = e), this
		}
		setY(e) {
			return (this.y = e), this
		}
		setZ(e) {
			return (this.z = e), this
		}
		setW(e) {
			return (this.w = e), this
		}
		setComponent(e, t) {
			switch (e) {
				case 0:
					this.x = t
					break
				case 1:
					this.y = t
					break
				case 2:
					this.z = t
					break
				case 3:
					this.w = t
					break
				default:
					throw new Error('index is out of range: ' + e)
			}
			return this
		}
		getComponent(e) {
			switch (e) {
				case 0:
					return this.x
				case 1:
					return this.y
				case 2:
					return this.z
				case 3:
					return this.w
				default:
					throw new Error('index is out of range: ' + e)
			}
		}
		clone() {
			return new this.constructor(this.x, this.y, this.z, this.w)
		}
		copy(e) {
			return (this.x = e.x), (this.y = e.y), (this.z = e.z), (this.w = void 0 !== e.w ? e.w : 1), this
		}
		add(e, t) {
			return void 0 !== t
				? (console.warn('THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead.'), this.addVectors(e, t))
				: ((this.x += e.x), (this.y += e.y), (this.z += e.z), (this.w += e.w), this)
		}
		addScalar(e) {
			return (this.x += e), (this.y += e), (this.z += e), (this.w += e), this
		}
		addVectors(e, t) {
			return (this.x = e.x + t.x), (this.y = e.y + t.y), (this.z = e.z + t.z), (this.w = e.w + t.w), this
		}
		addScaledVector(e, t) {
			return (this.x += e.x * t), (this.y += e.y * t), (this.z += e.z * t), (this.w += e.w * t), this
		}
		sub(e, t) {
			return void 0 !== t
				? (console.warn('THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.'), this.subVectors(e, t))
				: ((this.x -= e.x), (this.y -= e.y), (this.z -= e.z), (this.w -= e.w), this)
		}
		subScalar(e) {
			return (this.x -= e), (this.y -= e), (this.z -= e), (this.w -= e), this
		}
		subVectors(e, t) {
			return (this.x = e.x - t.x), (this.y = e.y - t.y), (this.z = e.z - t.z), (this.w = e.w - t.w), this
		}
		multiply(e) {
			return (this.x *= e.x), (this.y *= e.y), (this.z *= e.z), (this.w *= e.w), this
		}
		multiplyScalar(e) {
			return (this.x *= e), (this.y *= e), (this.z *= e), (this.w *= e), this
		}
		applyMatrix4(e) {
			const t = this.x,
				i = this.y,
				n = this.z,
				r = this.w,
				a = e.elements
			return (
				(this.x = a[0] * t + a[4] * i + a[8] * n + a[12] * r),
				(this.y = a[1] * t + a[5] * i + a[9] * n + a[13] * r),
				(this.z = a[2] * t + a[6] * i + a[10] * n + a[14] * r),
				(this.w = a[3] * t + a[7] * i + a[11] * n + a[15] * r),
				this
			)
		}
		divideScalar(e) {
			return this.multiplyScalar(1 / e)
		}
		setAxisAngleFromQuaternion(e) {
			this.w = 2 * Math.acos(e.w)
			const t = Math.sqrt(1 - e.w * e.w)
			return t < 1e-4 ? ((this.x = 1), (this.y = 0), (this.z = 0)) : ((this.x = e.x / t), (this.y = e.y / t), (this.z = e.z / t)), this
		}
		setAxisAngleFromRotationMatrix(e) {
			let t, i, n, r
			const a = 0.01,
				s = 0.1,
				o = e.elements,
				l = o[0],
				c = o[4],
				h = o[8],
				d = o[1],
				u = o[5],
				p = o[9],
				f = o[2],
				m = o[6],
				g = o[10]
			if (Math.abs(c - d) < a && Math.abs(h - f) < a && Math.abs(p - m) < a) {
				if (Math.abs(c + d) < s && Math.abs(h + f) < s && Math.abs(p + m) < s && Math.abs(l + u + g - 3) < s) return this.set(1, 0, 0, 0), this
				t = Math.PI
				const e = (l + 1) / 2,
					o = (u + 1) / 2,
					x = (g + 1) / 2,
					_ = (c + d) / 4,
					v = (h + f) / 4,
					y = (p + m) / 4
				return (
					e > o && e > x
						? e < a
							? ((i = 0), (n = 0.707106781), (r = 0.707106781))
							: ((i = Math.sqrt(e)), (n = _ / i), (r = v / i))
						: o > x
						? o < a
							? ((i = 0.707106781), (n = 0), (r = 0.707106781))
							: ((n = Math.sqrt(o)), (i = _ / n), (r = y / n))
						: x < a
						? ((i = 0.707106781), (n = 0.707106781), (r = 0))
						: ((r = Math.sqrt(x)), (i = v / r), (n = y / r)),
					this.set(i, n, r, t),
					this
				)
			}
			let x = Math.sqrt((m - p) * (m - p) + (h - f) * (h - f) + (d - c) * (d - c))
			return (
				Math.abs(x) < 0.001 && (x = 1), (this.x = (m - p) / x), (this.y = (h - f) / x), (this.z = (d - c) / x), (this.w = Math.acos((l + u + g - 1) / 2)), this
			)
		}
		min(e) {
			return (this.x = Math.min(this.x, e.x)), (this.y = Math.min(this.y, e.y)), (this.z = Math.min(this.z, e.z)), (this.w = Math.min(this.w, e.w)), this
		}
		max(e) {
			return (this.x = Math.max(this.x, e.x)), (this.y = Math.max(this.y, e.y)), (this.z = Math.max(this.z, e.z)), (this.w = Math.max(this.w, e.w)), this
		}
		clamp(e, t) {
			return (
				(this.x = Math.max(e.x, Math.min(t.x, this.x))),
				(this.y = Math.max(e.y, Math.min(t.y, this.y))),
				(this.z = Math.max(e.z, Math.min(t.z, this.z))),
				(this.w = Math.max(e.w, Math.min(t.w, this.w))),
				this
			)
		}
		clampScalar(e, t) {
			return (
				(this.x = Math.max(e, Math.min(t, this.x))),
				(this.y = Math.max(e, Math.min(t, this.y))),
				(this.z = Math.max(e, Math.min(t, this.z))),
				(this.w = Math.max(e, Math.min(t, this.w))),
				this
			)
		}
		clampLength(e, t) {
			const i = this.length()
			return this.divideScalar(i || 1).multiplyScalar(Math.max(e, Math.min(t, i)))
		}
		floor() {
			return (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), (this.z = Math.floor(this.z)), (this.w = Math.floor(this.w)), this
		}
		ceil() {
			return (this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), (this.z = Math.ceil(this.z)), (this.w = Math.ceil(this.w)), this
		}
		round() {
			return (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), (this.z = Math.round(this.z)), (this.w = Math.round(this.w)), this
		}
		roundToZero() {
			return (
				(this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x)),
				(this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y)),
				(this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z)),
				(this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w)),
				this
			)
		}
		negate() {
			return (this.x = -this.x), (this.y = -this.y), (this.z = -this.z), (this.w = -this.w), this
		}
		dot(e) {
			return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w
		}
		lengthSq() {
			return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
		}
		length() {
			return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
		}
		manhattanLength() {
			return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
		}
		normalize() {
			return this.divideScalar(this.length() || 1)
		}
		setLength(e) {
			return this.normalize().multiplyScalar(e)
		}
		lerp(e, t) {
			return (this.x += (e.x - this.x) * t), (this.y += (e.y - this.y) * t), (this.z += (e.z - this.z) * t), (this.w += (e.w - this.w) * t), this
		}
		lerpVectors(e, t, i) {
			return (this.x = e.x + (t.x - e.x) * i), (this.y = e.y + (t.y - e.y) * i), (this.z = e.z + (t.z - e.z) * i), (this.w = e.w + (t.w - e.w) * i), this
		}
		equals(e) {
			return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w
		}
		fromArray(e, t = 0) {
			return (this.x = e[t]), (this.y = e[t + 1]), (this.z = e[t + 2]), (this.w = e[t + 3]), this
		}
		toArray(e = [], t = 0) {
			return (e[t] = this.x), (e[t + 1] = this.y), (e[t + 2] = this.z), (e[t + 3] = this.w), e
		}
		fromBufferAttribute(e, t, i) {
			return (
				void 0 !== i && console.warn('THREE.Vector4: offset has been removed from .fromBufferAttribute().'),
				(this.x = e.getX(t)),
				(this.y = e.getY(t)),
				(this.z = e.getZ(t)),
				(this.w = e.getW(t)),
				this
			)
		}
		random() {
			return (this.x = Math.random()), (this.y = Math.random()), (this.z = Math.random()), (this.w = Math.random()), this
		}
		*[Symbol.iterator]() {
			yield this.x, yield this.y, yield this.z, yield this.w
		}
	}
	Z.prototype.isVector4 = !0
	class J extends D {
		constructor(e, t, i = {}) {
			super(),
				(this.width = e),
				(this.height = t),
				(this.depth = 1),
				(this.scissor = new Z(0, 0, e, t)),
				(this.scissorTest = !1),
				(this.viewport = new Z(0, 0, e, t)),
				(this.texture = new Q(void 0, i.mapping, i.wrapS, i.wrapT, i.magFilter, i.minFilter, i.format, i.type, i.anisotropy, i.encoding)),
				(this.texture.isRenderTargetTexture = !0),
				(this.texture.image = { width: e, height: t, depth: 1 }),
				(this.texture.generateMipmaps = void 0 !== i.generateMipmaps && i.generateMipmaps),
				(this.texture.internalFormat = void 0 !== i.internalFormat ? i.internalFormat : null),
				(this.texture.minFilter = void 0 !== i.minFilter ? i.minFilter : x),
				(this.depthBuffer = void 0 === i.depthBuffer || i.depthBuffer),
				(this.stencilBuffer = void 0 !== i.stencilBuffer && i.stencilBuffer),
				(this.depthTexture = void 0 !== i.depthTexture ? i.depthTexture : null)
		}
		setTexture(e) {
			;(e.image = { width: this.width, height: this.height, depth: this.depth }), (this.texture = e)
		}
		setSize(e, t, i = 1) {
			;(this.width === e && this.height === t && this.depth === i) ||
				((this.width = e),
				(this.height = t),
				(this.depth = i),
				(this.texture.image.width = e),
				(this.texture.image.height = t),
				(this.texture.image.depth = i),
				this.dispose()),
				this.viewport.set(0, 0, e, t),
				this.scissor.set(0, 0, e, t)
		}
		clone() {
			return new this.constructor().copy(this)
		}
		copy(e) {
			return (
				(this.width = e.width),
				(this.height = e.height),
				(this.depth = e.depth),
				this.viewport.copy(e.viewport),
				(this.texture = e.texture.clone()),
				(this.texture.image = { ...this.texture.image }),
				(this.depthBuffer = e.depthBuffer),
				(this.stencilBuffer = e.stencilBuffer),
				(this.depthTexture = e.depthTexture),
				this
			)
		}
		dispose() {
			this.dispatchEvent({ type: 'dispose' })
		}
	}
	J.prototype.isWebGLRenderTarget = !0
	class K extends J {
		constructor(e, t, i = {}) {
			super(e, t, i),
				(this.samples = 4),
				(this.ignoreDepthForMultisampleCopy = void 0 === i.ignoreDepth || i.ignoreDepth),
				(this.useRenderToTexture = void 0 !== i.useRenderToTexture && i.useRenderToTexture),
				(this.useRenderbuffer = !1 === this.useRenderToTexture)
		}
		copy(e) {
			return (
				super.copy.call(this, e), (this.samples = e.samples), (this.useRenderToTexture = e.useRenderToTexture), (this.useRenderbuffer = e.useRenderbuffer), this
			)
		}
	}
	K.prototype.isWebGLMultisampleRenderTarget = !0
	class $ {
		constructor(e = 0, t = 0, i = 0, n = 1) {
			;(this._x = e), (this._y = t), (this._z = i), (this._w = n)
		}
		static slerp(e, t, i, n) {
			return console.warn('THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead.'), i.slerpQuaternions(e, t, n)
		}
		static slerpFlat(e, t, i, n, r, a, s) {
			let o = i[n + 0],
				l = i[n + 1],
				c = i[n + 2],
				h = i[n + 3]
			const d = r[a + 0],
				u = r[a + 1],
				p = r[a + 2],
				f = r[a + 3]
			if (0 === s) return (e[t + 0] = o), (e[t + 1] = l), (e[t + 2] = c), void (e[t + 3] = h)
			if (1 === s) return (e[t + 0] = d), (e[t + 1] = u), (e[t + 2] = p), void (e[t + 3] = f)
			if (h !== f || o !== d || l !== u || c !== p) {
				let e = 1 - s
				const t = o * d + l * u + c * p + h * f,
					i = t >= 0 ? 1 : -1,
					n = 1 - t * t
				if (n > Number.EPSILON) {
					const r = Math.sqrt(n),
						a = Math.atan2(r, t * i)
					;(e = Math.sin(e * a) / r), (s = Math.sin(s * a) / r)
				}
				const r = s * i
				if (((o = o * e + d * r), (l = l * e + u * r), (c = c * e + p * r), (h = h * e + f * r), e === 1 - s)) {
					const e = 1 / Math.sqrt(o * o + l * l + c * c + h * h)
					;(o *= e), (l *= e), (c *= e), (h *= e)
				}
			}
			;(e[t] = o), (e[t + 1] = l), (e[t + 2] = c), (e[t + 3] = h)
		}
		static multiplyQuaternionsFlat(e, t, i, n, r, a) {
			const s = i[n],
				o = i[n + 1],
				l = i[n + 2],
				c = i[n + 3],
				h = r[a],
				d = r[a + 1],
				u = r[a + 2],
				p = r[a + 3]
			return (
				(e[t] = s * p + c * h + o * u - l * d),
				(e[t + 1] = o * p + c * d + l * h - s * u),
				(e[t + 2] = l * p + c * u + s * d - o * h),
				(e[t + 3] = c * p - s * h - o * d - l * u),
				e
			)
		}
		get x() {
			return this._x
		}
		set x(e) {
			;(this._x = e), this._onChangeCallback()
		}
		get y() {
			return this._y
		}
		set y(e) {
			;(this._y = e), this._onChangeCallback()
		}
		get z() {
			return this._z
		}
		set z(e) {
			;(this._z = e), this._onChangeCallback()
		}
		get w() {
			return this._w
		}
		set w(e) {
			;(this._w = e), this._onChangeCallback()
		}
		set(e, t, i, n) {
			return (this._x = e), (this._y = t), (this._z = i), (this._w = n), this._onChangeCallback(), this
		}
		clone() {
			return new this.constructor(this._x, this._y, this._z, this._w)
		}
		copy(e) {
			return (this._x = e.x), (this._y = e.y), (this._z = e.z), (this._w = e.w), this._onChangeCallback(), this
		}
		setFromEuler(e, t) {
			if (!e || !e.isEuler) throw new Error('THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.')
			const i = e._x,
				n = e._y,
				r = e._z,
				a = e._order,
				s = Math.cos,
				o = Math.sin,
				l = s(i / 2),
				c = s(n / 2),
				h = s(r / 2),
				d = o(i / 2),
				u = o(n / 2),
				p = o(r / 2)
			switch (a) {
				case 'XYZ':
					;(this._x = d * c * h + l * u * p), (this._y = l * u * h - d * c * p), (this._z = l * c * p + d * u * h), (this._w = l * c * h - d * u * p)
					break
				case 'YXZ':
					;(this._x = d * c * h + l * u * p), (this._y = l * u * h - d * c * p), (this._z = l * c * p - d * u * h), (this._w = l * c * h + d * u * p)
					break
				case 'ZXY':
					;(this._x = d * c * h - l * u * p), (this._y = l * u * h + d * c * p), (this._z = l * c * p + d * u * h), (this._w = l * c * h - d * u * p)
					break
				case 'ZYX':
					;(this._x = d * c * h - l * u * p), (this._y = l * u * h + d * c * p), (this._z = l * c * p - d * u * h), (this._w = l * c * h + d * u * p)
					break
				case 'YZX':
					;(this._x = d * c * h + l * u * p), (this._y = l * u * h + d * c * p), (this._z = l * c * p - d * u * h), (this._w = l * c * h - d * u * p)
					break
				case 'XZY':
					;(this._x = d * c * h - l * u * p), (this._y = l * u * h - d * c * p), (this._z = l * c * p + d * u * h), (this._w = l * c * h + d * u * p)
					break
				default:
					console.warn('THREE.Quaternion: .setFromEuler() encountered an unknown order: ' + a)
			}
			return !1 !== t && this._onChangeCallback(), this
		}
		setFromAxisAngle(e, t) {
			const i = t / 2,
				n = Math.sin(i)
			return (this._x = e.x * n), (this._y = e.y * n), (this._z = e.z * n), (this._w = Math.cos(i)), this._onChangeCallback(), this
		}
		setFromRotationMatrix(e) {
			const t = e.elements,
				i = t[0],
				n = t[4],
				r = t[8],
				a = t[1],
				s = t[5],
				o = t[9],
				l = t[2],
				c = t[6],
				h = t[10],
				d = i + s + h
			if (d > 0) {
				const e = 0.5 / Math.sqrt(d + 1)
				;(this._w = 0.25 / e), (this._x = (c - o) * e), (this._y = (r - l) * e), (this._z = (a - n) * e)
			} else if (i > s && i > h) {
				const e = 2 * Math.sqrt(1 + i - s - h)
				;(this._w = (c - o) / e), (this._x = 0.25 * e), (this._y = (n + a) / e), (this._z = (r + l) / e)
			} else if (s > h) {
				const e = 2 * Math.sqrt(1 + s - i - h)
				;(this._w = (r - l) / e), (this._x = (n + a) / e), (this._y = 0.25 * e), (this._z = (o + c) / e)
			} else {
				const e = 2 * Math.sqrt(1 + h - i - s)
				;(this._w = (a - n) / e), (this._x = (r + l) / e), (this._y = (o + c) / e), (this._z = 0.25 * e)
			}
			return this._onChangeCallback(), this
		}
		setFromUnitVectors(e, t) {
			let i = e.dot(t) + 1
			return (
				i < Number.EPSILON
					? ((i = 0),
					  Math.abs(e.x) > Math.abs(e.z)
							? ((this._x = -e.y), (this._y = e.x), (this._z = 0), (this._w = i))
							: ((this._x = 0), (this._y = -e.z), (this._z = e.y), (this._w = i)))
					: ((this._x = e.y * t.z - e.z * t.y), (this._y = e.z * t.x - e.x * t.z), (this._z = e.x * t.y - e.y * t.x), (this._w = i)),
				this.normalize()
			)
		}
		angleTo(e) {
			return 2 * Math.acos(Math.abs(O(this.dot(e), -1, 1)))
		}
		rotateTowards(e, t) {
			const i = this.angleTo(e)
			if (0 === i) return this
			const n = Math.min(1, t / i)
			return this.slerp(e, n), this
		}
		identity() {
			return this.set(0, 0, 0, 1)
		}
		invert() {
			return this.conjugate()
		}
		conjugate() {
			return (this._x *= -1), (this._y *= -1), (this._z *= -1), this._onChangeCallback(), this
		}
		dot(e) {
			return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w
		}
		lengthSq() {
			return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
		}
		length() {
			return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
		}
		normalize() {
			let e = this.length()
			return (
				0 === e
					? ((this._x = 0), (this._y = 0), (this._z = 0), (this._w = 1))
					: ((e = 1 / e), (this._x = this._x * e), (this._y = this._y * e), (this._z = this._z * e), (this._w = this._w * e)),
				this._onChangeCallback(),
				this
			)
		}
		multiply(e, t) {
			return void 0 !== t
				? (console.warn('THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.'),
				  this.multiplyQuaternions(e, t))
				: this.multiplyQuaternions(this, e)
		}
		premultiply(e) {
			return this.multiplyQuaternions(e, this)
		}
		multiplyQuaternions(e, t) {
			const i = e._x,
				n = e._y,
				r = e._z,
				a = e._w,
				s = t._x,
				o = t._y,
				l = t._z,
				c = t._w
			return (
				(this._x = i * c + a * s + n * l - r * o),
				(this._y = n * c + a * o + r * s - i * l),
				(this._z = r * c + a * l + i * o - n * s),
				(this._w = a * c - i * s - n * o - r * l),
				this._onChangeCallback(),
				this
			)
		}
		slerp(e, t) {
			if (0 === t) return this
			if (1 === t) return this.copy(e)
			const i = this._x,
				n = this._y,
				r = this._z,
				a = this._w
			let s = a * e._w + i * e._x + n * e._y + r * e._z
			if ((s < 0 ? ((this._w = -e._w), (this._x = -e._x), (this._y = -e._y), (this._z = -e._z), (s = -s)) : this.copy(e), s >= 1))
				return (this._w = a), (this._x = i), (this._y = n), (this._z = r), this
			const o = 1 - s * s
			if (o <= Number.EPSILON) {
				const e = 1 - t
				return (
					(this._w = e * a + t * this._w),
					(this._x = e * i + t * this._x),
					(this._y = e * n + t * this._y),
					(this._z = e * r + t * this._z),
					this.normalize(),
					this._onChangeCallback(),
					this
				)
			}
			const l = Math.sqrt(o),
				c = Math.atan2(l, s),
				h = Math.sin((1 - t) * c) / l,
				d = Math.sin(t * c) / l
			return (
				(this._w = a * h + this._w * d),
				(this._x = i * h + this._x * d),
				(this._y = n * h + this._y * d),
				(this._z = r * h + this._z * d),
				this._onChangeCallback(),
				this
			)
		}
		slerpQuaternions(e, t, i) {
			this.copy(e).slerp(t, i)
		}
		random() {
			const e = Math.random(),
				t = Math.sqrt(1 - e),
				i = Math.sqrt(e),
				n = 2 * Math.PI * Math.random(),
				r = 2 * Math.PI * Math.random()
			return this.set(t * Math.cos(n), i * Math.sin(r), i * Math.cos(r), t * Math.sin(n))
		}
		equals(e) {
			return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w
		}
		fromArray(e, t = 0) {
			return (this._x = e[t]), (this._y = e[t + 1]), (this._z = e[t + 2]), (this._w = e[t + 3]), this._onChangeCallback(), this
		}
		toArray(e = [], t = 0) {
			return (e[t] = this._x), (e[t + 1] = this._y), (e[t + 2] = this._z), (e[t + 3] = this._w), e
		}
		fromBufferAttribute(e, t) {
			return (this._x = e.getX(t)), (this._y = e.getY(t)), (this._z = e.getZ(t)), (this._w = e.getW(t)), this
		}
		_onChange(e) {
			return (this._onChangeCallback = e), this
		}
		_onChangeCallback() {}
	}
	$.prototype.isQuaternion = !0
	class ee {
		constructor(e = 0, t = 0, i = 0) {
			;(this.x = e), (this.y = t), (this.z = i)
		}
		set(e, t, i) {
			return void 0 === i && (i = this.z), (this.x = e), (this.y = t), (this.z = i), this
		}
		setScalar(e) {
			return (this.x = e), (this.y = e), (this.z = e), this
		}
		setX(e) {
			return (this.x = e), this
		}
		setY(e) {
			return (this.y = e), this
		}
		setZ(e) {
			return (this.z = e), this
		}
		setComponent(e, t) {
			switch (e) {
				case 0:
					this.x = t
					break
				case 1:
					this.y = t
					break
				case 2:
					this.z = t
					break
				default:
					throw new Error('index is out of range: ' + e)
			}
			return this
		}
		getComponent(e) {
			switch (e) {
				case 0:
					return this.x
				case 1:
					return this.y
				case 2:
					return this.z
				default:
					throw new Error('index is out of range: ' + e)
			}
		}
		clone() {
			return new this.constructor(this.x, this.y, this.z)
		}
		copy(e) {
			return (this.x = e.x), (this.y = e.y), (this.z = e.z), this
		}
		add(e, t) {
			return void 0 !== t
				? (console.warn('THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.'), this.addVectors(e, t))
				: ((this.x += e.x), (this.y += e.y), (this.z += e.z), this)
		}
		addScalar(e) {
			return (this.x += e), (this.y += e), (this.z += e), this
		}
		addVectors(e, t) {
			return (this.x = e.x + t.x), (this.y = e.y + t.y), (this.z = e.z + t.z), this
		}
		addScaledVector(e, t) {
			return (this.x += e.x * t), (this.y += e.y * t), (this.z += e.z * t), this
		}
		sub(e, t) {
			return void 0 !== t
				? (console.warn('THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.'), this.subVectors(e, t))
				: ((this.x -= e.x), (this.y -= e.y), (this.z -= e.z), this)
		}
		subScalar(e) {
			return (this.x -= e), (this.y -= e), (this.z -= e), this
		}
		subVectors(e, t) {
			return (this.x = e.x - t.x), (this.y = e.y - t.y), (this.z = e.z - t.z), this
		}
		multiply(e, t) {
			return void 0 !== t
				? (console.warn('THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.'), this.multiplyVectors(e, t))
				: ((this.x *= e.x), (this.y *= e.y), (this.z *= e.z), this)
		}
		multiplyScalar(e) {
			return (this.x *= e), (this.y *= e), (this.z *= e), this
		}
		multiplyVectors(e, t) {
			return (this.x = e.x * t.x), (this.y = e.y * t.y), (this.z = e.z * t.z), this
		}
		applyEuler(e) {
			return (
				(e && e.isEuler) || console.error('THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.'),
				this.applyQuaternion(ie.setFromEuler(e))
			)
		}
		applyAxisAngle(e, t) {
			return this.applyQuaternion(ie.setFromAxisAngle(e, t))
		}
		applyMatrix3(e) {
			const t = this.x,
				i = this.y,
				n = this.z,
				r = e.elements
			return (this.x = r[0] * t + r[3] * i + r[6] * n), (this.y = r[1] * t + r[4] * i + r[7] * n), (this.z = r[2] * t + r[5] * i + r[8] * n), this
		}
		applyNormalMatrix(e) {
			return this.applyMatrix3(e).normalize()
		}
		applyMatrix4(e) {
			const t = this.x,
				i = this.y,
				n = this.z,
				r = e.elements,
				a = 1 / (r[3] * t + r[7] * i + r[11] * n + r[15])
			return (
				(this.x = (r[0] * t + r[4] * i + r[8] * n + r[12]) * a),
				(this.y = (r[1] * t + r[5] * i + r[9] * n + r[13]) * a),
				(this.z = (r[2] * t + r[6] * i + r[10] * n + r[14]) * a),
				this
			)
		}
		applyQuaternion(e) {
			const t = this.x,
				i = this.y,
				n = this.z,
				r = e.x,
				a = e.y,
				s = e.z,
				o = e.w,
				l = o * t + a * n - s * i,
				c = o * i + s * t - r * n,
				h = o * n + r * i - a * t,
				d = -r * t - a * i - s * n
			return (this.x = l * o + d * -r + c * -s - h * -a), (this.y = c * o + d * -a + h * -r - l * -s), (this.z = h * o + d * -s + l * -a - c * -r), this
		}
		project(e) {
			return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)
		}
		unproject(e) {
			return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)
		}
		transformDirection(e) {
			const t = this.x,
				i = this.y,
				n = this.z,
				r = e.elements
			return (this.x = r[0] * t + r[4] * i + r[8] * n), (this.y = r[1] * t + r[5] * i + r[9] * n), (this.z = r[2] * t + r[6] * i + r[10] * n), this.normalize()
		}
		divide(e) {
			return (this.x /= e.x), (this.y /= e.y), (this.z /= e.z), this
		}
		divideScalar(e) {
			return this.multiplyScalar(1 / e)
		}
		min(e) {
			return (this.x = Math.min(this.x, e.x)), (this.y = Math.min(this.y, e.y)), (this.z = Math.min(this.z, e.z)), this
		}
		max(e) {
			return (this.x = Math.max(this.x, e.x)), (this.y = Math.max(this.y, e.y)), (this.z = Math.max(this.z, e.z)), this
		}
		clamp(e, t) {
			return (
				(this.x = Math.max(e.x, Math.min(t.x, this.x))), (this.y = Math.max(e.y, Math.min(t.y, this.y))), (this.z = Math.max(e.z, Math.min(t.z, this.z))), this
			)
		}
		clampScalar(e, t) {
			return (this.x = Math.max(e, Math.min(t, this.x))), (this.y = Math.max(e, Math.min(t, this.y))), (this.z = Math.max(e, Math.min(t, this.z))), this
		}
		clampLength(e, t) {
			const i = this.length()
			return this.divideScalar(i || 1).multiplyScalar(Math.max(e, Math.min(t, i)))
		}
		floor() {
			return (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), (this.z = Math.floor(this.z)), this
		}
		ceil() {
			return (this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), (this.z = Math.ceil(this.z)), this
		}
		round() {
			return (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), (this.z = Math.round(this.z)), this
		}
		roundToZero() {
			return (
				(this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x)),
				(this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y)),
				(this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z)),
				this
			)
		}
		negate() {
			return (this.x = -this.x), (this.y = -this.y), (this.z = -this.z), this
		}
		dot(e) {
			return this.x * e.x + this.y * e.y + this.z * e.z
		}
		lengthSq() {
			return this.x * this.x + this.y * this.y + this.z * this.z
		}
		length() {
			return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
		}
		manhattanLength() {
			return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
		}
		normalize() {
			return this.divideScalar(this.length() || 1)
		}
		setLength(e) {
			return this.normalize().multiplyScalar(e)
		}
		lerp(e, t) {
			return (this.x += (e.x - this.x) * t), (this.y += (e.y - this.y) * t), (this.z += (e.z - this.z) * t), this
		}
		lerpVectors(e, t, i) {
			return (this.x = e.x + (t.x - e.x) * i), (this.y = e.y + (t.y - e.y) * i), (this.z = e.z + (t.z - e.z) * i), this
		}
		cross(e, t) {
			return void 0 !== t
				? (console.warn('THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.'), this.crossVectors(e, t))
				: this.crossVectors(this, e)
		}
		crossVectors(e, t) {
			const i = e.x,
				n = e.y,
				r = e.z,
				a = t.x,
				s = t.y,
				o = t.z
			return (this.x = n * o - r * s), (this.y = r * a - i * o), (this.z = i * s - n * a), this
		}
		projectOnVector(e) {
			const t = e.lengthSq()
			if (0 === t) return this.set(0, 0, 0)
			const i = e.dot(this) / t
			return this.copy(e).multiplyScalar(i)
		}
		projectOnPlane(e) {
			return te.copy(this).projectOnVector(e), this.sub(te)
		}
		reflect(e) {
			return this.sub(te.copy(e).multiplyScalar(2 * this.dot(e)))
		}
		angleTo(e) {
			const t = Math.sqrt(this.lengthSq() * e.lengthSq())
			if (0 === t) return Math.PI / 2
			const i = this.dot(e) / t
			return Math.acos(O(i, -1, 1))
		}
		distanceTo(e) {
			return Math.sqrt(this.distanceToSquared(e))
		}
		distanceToSquared(e) {
			const t = this.x - e.x,
				i = this.y - e.y,
				n = this.z - e.z
			return t * t + i * i + n * n
		}
		manhattanDistanceTo(e) {
			return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z)
		}
		setFromSpherical(e) {
			return this.setFromSphericalCoords(e.radius, e.phi, e.theta)
		}
		setFromSphericalCoords(e, t, i) {
			const n = Math.sin(t) * e
			return (this.x = n * Math.sin(i)), (this.y = Math.cos(t) * e), (this.z = n * Math.cos(i)), this
		}
		setFromCylindrical(e) {
			return this.setFromCylindricalCoords(e.radius, e.theta, e.y)
		}
		setFromCylindricalCoords(e, t, i) {
			return (this.x = e * Math.sin(t)), (this.y = i), (this.z = e * Math.cos(t)), this
		}
		setFromMatrixPosition(e) {
			const t = e.elements
			return (this.x = t[12]), (this.y = t[13]), (this.z = t[14]), this
		}
		setFromMatrixScale(e) {
			const t = this.setFromMatrixColumn(e, 0).length(),
				i = this.setFromMatrixColumn(e, 1).length(),
				n = this.setFromMatrixColumn(e, 2).length()
			return (this.x = t), (this.y = i), (this.z = n), this
		}
		setFromMatrixColumn(e, t) {
			return this.fromArray(e.elements, 4 * t)
		}
		setFromMatrix3Column(e, t) {
			return this.fromArray(e.elements, 3 * t)
		}
		equals(e) {
			return e.x === this.x && e.y === this.y && e.z === this.z
		}
		fromArray(e, t = 0) {
			return (this.x = e[t]), (this.y = e[t + 1]), (this.z = e[t + 2]), this
		}
		toArray(e = [], t = 0) {
			return (e[t] = this.x), (e[t + 1] = this.y), (e[t + 2] = this.z), e
		}
		fromBufferAttribute(e, t, i) {
			return (
				void 0 !== i && console.warn('THREE.Vector3: offset has been removed from .fromBufferAttribute().'),
				(this.x = e.getX(t)),
				(this.y = e.getY(t)),
				(this.z = e.getZ(t)),
				this
			)
		}
		random() {
			return (this.x = Math.random()), (this.y = Math.random()), (this.z = Math.random()), this
		}
		randomDirection() {
			const e = 2 * (Math.random() - 0.5),
				t = Math.random() * Math.PI * 2,
				i = Math.sqrt(1 - e ** 2)
			return (this.x = i * Math.cos(t)), (this.y = i * Math.sin(t)), (this.z = e), this
		}
		*[Symbol.iterator]() {
			yield this.x, yield this.y, yield this.z
		}
	}
	ee.prototype.isVector3 = !0
	const te = new ee(),
		ie = new $()
	class ne {
		constructor(e = new ee(1 / 0, 1 / 0, 1 / 0), t = new ee(-1 / 0, -1 / 0, -1 / 0)) {
			;(this.min = e), (this.max = t)
		}
		set(e, t) {
			return this.min.copy(e), this.max.copy(t), this
		}
		setFromArray(e) {
			let t = 1 / 0,
				i = 1 / 0,
				n = 1 / 0,
				r = -1 / 0,
				a = -1 / 0,
				s = -1 / 0
			for (let o = 0, l = e.length; o < l; o += 3) {
				const l = e[o],
					c = e[o + 1],
					h = e[o + 2]
				l < t && (t = l), c < i && (i = c), h < n && (n = h), l > r && (r = l), c > a && (a = c), h > s && (s = h)
			}
			return this.min.set(t, i, n), this.max.set(r, a, s), this
		}
		setFromBufferAttribute(e) {
			let t = 1 / 0,
				i = 1 / 0,
				n = 1 / 0,
				r = -1 / 0,
				a = -1 / 0,
				s = -1 / 0
			for (let o = 0, l = e.count; o < l; o++) {
				const l = e.getX(o),
					c = e.getY(o),
					h = e.getZ(o)
				l < t && (t = l), c < i && (i = c), h < n && (n = h), l > r && (r = l), c > a && (a = c), h > s && (s = h)
			}
			return this.min.set(t, i, n), this.max.set(r, a, s), this
		}
		setFromPoints(e) {
			this.makeEmpty()
			for (let t = 0, i = e.length; t < i; t++) this.expandByPoint(e[t])
			return this
		}
		setFromCenterAndSize(e, t) {
			const i = ae.copy(t).multiplyScalar(0.5)
			return this.min.copy(e).sub(i), this.max.copy(e).add(i), this
		}
		setFromObject(e) {
			return this.makeEmpty(), this.expandByObject(e)
		}
		clone() {
			return new this.constructor().copy(this)
		}
		copy(e) {
			return this.min.copy(e.min), this.max.copy(e.max), this
		}
		makeEmpty() {
			return (this.min.x = this.min.y = this.min.z = 1 / 0), (this.max.x = this.max.y = this.max.z = -1 / 0), this
		}
		isEmpty() {
			return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
		}
		getCenter(e) {
			return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5)
		}
		getSize(e) {
			return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min)
		}
		expandByPoint(e) {
			return this.min.min(e), this.max.max(e), this
		}
		expandByVector(e) {
			return this.min.sub(e), this.max.add(e), this
		}
		expandByScalar(e) {
			return this.min.addScalar(-e), this.max.addScalar(e), this
		}
		expandByObject(e) {
			e.updateWorldMatrix(!1, !1)
			const t = e.geometry
			void 0 !== t && (null === t.boundingBox && t.computeBoundingBox(), se.copy(t.boundingBox), se.applyMatrix4(e.matrixWorld), this.union(se))
			const i = e.children
			for (let e = 0, t = i.length; e < t; e++) this.expandByObject(i[e])
			return this
		}
		containsPoint(e) {
			return !(e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y || e.z < this.min.z || e.z > this.max.z)
		}
		containsBox(e) {
			return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z
		}
		getParameter(e, t) {
			return t.set(
				(e.x - this.min.x) / (this.max.x - this.min.x),
				(e.y - this.min.y) / (this.max.y - this.min.y),
				(e.z - this.min.z) / (this.max.z - this.min.z)
			)
		}
		intersectsBox(e) {
			return !(e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y || e.max.z < this.min.z || e.min.z > this.max.z)
		}
		intersectsSphere(e) {
			return this.clampPoint(e.center, ae), ae.distanceToSquared(e.center) <= e.radius * e.radius
		}
		intersectsPlane(e) {
			let t, i
			return (
				e.normal.x > 0 ? ((t = e.normal.x * this.min.x), (i = e.normal.x * this.max.x)) : ((t = e.normal.x * this.max.x), (i = e.normal.x * this.min.x)),
				e.normal.y > 0 ? ((t += e.normal.y * this.min.y), (i += e.normal.y * this.max.y)) : ((t += e.normal.y * this.max.y), (i += e.normal.y * this.min.y)),
				e.normal.z > 0 ? ((t += e.normal.z * this.min.z), (i += e.normal.z * this.max.z)) : ((t += e.normal.z * this.max.z), (i += e.normal.z * this.min.z)),
				t <= -e.constant && i >= -e.constant
			)
		}
		intersectsTriangle(e) {
			if (this.isEmpty()) return !1
			this.getCenter(pe),
				fe.subVectors(this.max, pe),
				oe.subVectors(e.a, pe),
				le.subVectors(e.b, pe),
				ce.subVectors(e.c, pe),
				he.subVectors(le, oe),
				de.subVectors(ce, le),
				ue.subVectors(oe, ce)
			let t = [0, -he.z, he.y, 0, -de.z, de.y, 0, -ue.z, ue.y, he.z, 0, -he.x, de.z, 0, -de.x, ue.z, 0, -ue.x, -he.y, he.x, 0, -de.y, de.x, 0, -ue.y, ue.x, 0]
			return (
				!!xe(t, oe, le, ce, fe) &&
				((t = [1, 0, 0, 0, 1, 0, 0, 0, 1]), !!xe(t, oe, le, ce, fe) && (me.crossVectors(he, de), (t = [me.x, me.y, me.z]), xe(t, oe, le, ce, fe)))
			)
		}
		clampPoint(e, t) {
			return t.copy(e).clamp(this.min, this.max)
		}
		distanceToPoint(e) {
			return ae.copy(e).clamp(this.min, this.max).sub(e).length()
		}
		getBoundingSphere(e) {
			return this.getCenter(e.center), (e.radius = 0.5 * this.getSize(ae).length()), e
		}
		intersect(e) {
			return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this
		}
		union(e) {
			return this.min.min(e.min), this.max.max(e.max), this
		}
		applyMatrix4(e) {
			return (
				this.isEmpty() ||
					(re[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e),
					re[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e),
					re[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e),
					re[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e),
					re[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e),
					re[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e),
					re[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e),
					re[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e),
					this.setFromPoints(re)),
				this
			)
		}
		translate(e) {
			return this.min.add(e), this.max.add(e), this
		}
		equals(e) {
			return e.min.equals(this.min) && e.max.equals(this.max)
		}
	}
	ne.prototype.isBox3 = !0
	const re = [new ee(), new ee(), new ee(), new ee(), new ee(), new ee(), new ee(), new ee()],
		ae = new ee(),
		se = new ne(),
		oe = new ee(),
		le = new ee(),
		ce = new ee(),
		he = new ee(),
		de = new ee(),
		ue = new ee(),
		pe = new ee(),
		fe = new ee(),
		me = new ee(),
		ge = new ee()
	function xe(e, t, i, n, r) {
		for (let a = 0, s = e.length - 3; a <= s; a += 3) {
			ge.fromArray(e, a)
			const s = r.x * Math.abs(ge.x) + r.y * Math.abs(ge.y) + r.z * Math.abs(ge.z),
				o = t.dot(ge),
				l = i.dot(ge),
				c = n.dot(ge)
			if (Math.max(-Math.max(o, l, c), Math.min(o, l, c)) > s) return !1
		}
		return !0
	}
	const _e = new ne(),
		ve = new ee(),
		ye = new ee(),
		Me = new ee()
	class be {
		constructor(e = new ee(), t = -1) {
			;(this.center = e), (this.radius = t)
		}
		set(e, t) {
			return this.center.copy(e), (this.radius = t), this
		}
		setFromPoints(e, t) {
			const i = this.center
			void 0 !== t ? i.copy(t) : _e.setFromPoints(e).getCenter(i)
			let n = 0
			for (let t = 0, r = e.length; t < r; t++) n = Math.max(n, i.distanceToSquared(e[t]))
			return (this.radius = Math.sqrt(n)), this
		}
		copy(e) {
			return this.center.copy(e.center), (this.radius = e.radius), this
		}
		isEmpty() {
			return this.radius < 0
		}
		makeEmpty() {
			return this.center.set(0, 0, 0), (this.radius = -1), this
		}
		containsPoint(e) {
			return e.distanceToSquared(this.center) <= this.radius * this.radius
		}
		distanceToPoint(e) {
			return e.distanceTo(this.center) - this.radius
		}
		intersectsSphere(e) {
			const t = this.radius + e.radius
			return e.center.distanceToSquared(this.center) <= t * t
		}
		intersectsBox(e) {
			return e.intersectsSphere(this)
		}
		intersectsPlane(e) {
			return Math.abs(e.distanceToPoint(this.center)) <= this.radius
		}
		clampPoint(e, t) {
			const i = this.center.distanceToSquared(e)
			return t.copy(e), i > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t
		}
		getBoundingBox(e) {
			return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e)
		}
		applyMatrix4(e) {
			return this.center.applyMatrix4(e), (this.radius = this.radius * e.getMaxScaleOnAxis()), this
		}
		translate(e) {
			return this.center.add(e), this
		}
		expandByPoint(e) {
			Me.subVectors(e, this.center)
			const t = Me.lengthSq()
			if (t > this.radius * this.radius) {
				const e = Math.sqrt(t),
					i = 0.5 * (e - this.radius)
				this.center.add(Me.multiplyScalar(i / e)), (this.radius += i)
			}
			return this
		}
		union(e) {
			return (
				!0 === this.center.equals(e.center)
					? ye.set(0, 0, 1).multiplyScalar(e.radius)
					: ye.subVectors(e.center, this.center).normalize().multiplyScalar(e.radius),
				this.expandByPoint(ve.copy(e.center).add(ye)),
				this.expandByPoint(ve.copy(e.center).sub(ye)),
				this
			)
		}
		equals(e) {
			return e.center.equals(this.center) && e.radius === this.radius
		}
		clone() {
			return new this.constructor().copy(this)
		}
	}
	const Se = new ee(),
		we = new ee(),
		Te = new ee(),
		Ae = new ee(),
		Ee = new ee(),
		Le = new ee(),
		Pe = new ee()
	class Fe {
		constructor(e = new ee(), t = new ee(0, 0, -1)) {
			;(this.origin = e), (this.direction = t)
		}
		set(e, t) {
			return this.origin.copy(e), this.direction.copy(t), this
		}
		copy(e) {
			return this.origin.copy(e.origin), this.direction.copy(e.direction), this
		}
		at(e, t) {
			return t.copy(this.direction).multiplyScalar(e).add(this.origin)
		}
		lookAt(e) {
			return this.direction.copy(e).sub(this.origin).normalize(), this
		}
		recast(e) {
			return this.origin.copy(this.at(e, Se)), this
		}
		closestPointToPoint(e, t) {
			t.subVectors(e, this.origin)
			const i = t.dot(this.direction)
			return i < 0 ? t.copy(this.origin) : t.copy(this.direction).multiplyScalar(i).add(this.origin)
		}
		distanceToPoint(e) {
			return Math.sqrt(this.distanceSqToPoint(e))
		}
		distanceSqToPoint(e) {
			const t = Se.subVectors(e, this.origin).dot(this.direction)
			return t < 0 ? this.origin.distanceToSquared(e) : (Se.copy(this.direction).multiplyScalar(t).add(this.origin), Se.distanceToSquared(e))
		}
		distanceSqToSegment(e, t, i, n) {
			we.copy(e).add(t).multiplyScalar(0.5), Te.copy(t).sub(e).normalize(), Ae.copy(this.origin).sub(we)
			const r = 0.5 * e.distanceTo(t),
				a = -this.direction.dot(Te),
				s = Ae.dot(this.direction),
				o = -Ae.dot(Te),
				l = Ae.lengthSq(),
				c = Math.abs(1 - a * a)
			let h, d, u, p
			if (c > 0)
				if (((h = a * o - s), (d = a * s - o), (p = r * c), h >= 0))
					if (d >= -p)
						if (d <= p) {
							const e = 1 / c
							;(h *= e), (d *= e), (u = h * (h + a * d + 2 * s) + d * (a * h + d + 2 * o) + l)
						} else (d = r), (h = Math.max(0, -(a * d + s))), (u = -h * h + d * (d + 2 * o) + l)
					else (d = -r), (h = Math.max(0, -(a * d + s))), (u = -h * h + d * (d + 2 * o) + l)
				else
					d <= -p
						? ((h = Math.max(0, -(-a * r + s))), (d = h > 0 ? -r : Math.min(Math.max(-r, -o), r)), (u = -h * h + d * (d + 2 * o) + l))
						: d <= p
						? ((h = 0), (d = Math.min(Math.max(-r, -o), r)), (u = d * (d + 2 * o) + l))
						: ((h = Math.max(0, -(a * r + s))), (d = h > 0 ? r : Math.min(Math.max(-r, -o), r)), (u = -h * h + d * (d + 2 * o) + l))
			else (d = a > 0 ? -r : r), (h = Math.max(0, -(a * d + s))), (u = -h * h + d * (d + 2 * o) + l)
			return i && i.copy(this.direction).multiplyScalar(h).add(this.origin), n && n.copy(Te).multiplyScalar(d).add(we), u
		}
		intersectSphere(e, t) {
			Se.subVectors(e.center, this.origin)
			const i = Se.dot(this.direction),
				n = Se.dot(Se) - i * i,
				r = e.radius * e.radius
			if (n > r) return null
			const a = Math.sqrt(r - n),
				s = i - a,
				o = i + a
			return s < 0 && o < 0 ? null : s < 0 ? this.at(o, t) : this.at(s, t)
		}
		intersectsSphere(e) {
			return this.distanceSqToPoint(e.center) <= e.radius * e.radius
		}
		distanceToPlane(e) {
			const t = e.normal.dot(this.direction)
			if (0 === t) return 0 === e.distanceToPoint(this.origin) ? 0 : null
			const i = -(this.origin.dot(e.normal) + e.constant) / t
			return i >= 0 ? i : null
		}
		intersectPlane(e, t) {
			const i = this.distanceToPlane(e)
			return null === i ? null : this.at(i, t)
		}
		intersectsPlane(e) {
			const t = e.distanceToPoint(this.origin)
			if (0 === t) return !0
			return e.normal.dot(this.direction) * t < 0
		}
		intersectBox(e, t) {
			let i, n, r, a, s, o
			const l = 1 / this.direction.x,
				c = 1 / this.direction.y,
				h = 1 / this.direction.z,
				d = this.origin
			return (
				l >= 0 ? ((i = (e.min.x - d.x) * l), (n = (e.max.x - d.x) * l)) : ((i = (e.max.x - d.x) * l), (n = (e.min.x - d.x) * l)),
				c >= 0 ? ((r = (e.min.y - d.y) * c), (a = (e.max.y - d.y) * c)) : ((r = (e.max.y - d.y) * c), (a = (e.min.y - d.y) * c)),
				i > a || r > n
					? null
					: ((r > i || i != i) && (i = r),
					  (a < n || n != n) && (n = a),
					  h >= 0 ? ((s = (e.min.z - d.z) * h), (o = (e.max.z - d.z) * h)) : ((s = (e.max.z - d.z) * h), (o = (e.min.z - d.z) * h)),
					  i > o || s > n ? null : ((s > i || i != i) && (i = s), (o < n || n != n) && (n = o), n < 0 ? null : this.at(i >= 0 ? i : n, t)))
			)
		}
		intersectsBox(e) {
			return null !== this.intersectBox(e, Se)
		}
		intersectTriangle(e, t, i, n, r) {
			Ee.subVectors(t, e), Le.subVectors(i, e), Pe.crossVectors(Ee, Le)
			let a,
				s = this.direction.dot(Pe)
			if (s > 0) {
				if (n) return null
				a = 1
			} else {
				if (!(s < 0)) return null
				;(a = -1), (s = -s)
			}
			Ae.subVectors(this.origin, e)
			const o = a * this.direction.dot(Le.crossVectors(Ae, Le))
			if (o < 0) return null
			const l = a * this.direction.dot(Ee.cross(Ae))
			if (l < 0) return null
			if (o + l > s) return null
			const c = -a * Ae.dot(Pe)
			return c < 0 ? null : this.at(c / s, r)
		}
		applyMatrix4(e) {
			return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this
		}
		equals(e) {
			return e.origin.equals(this.origin) && e.direction.equals(this.direction)
		}
		clone() {
			return new this.constructor().copy(this)
		}
	}
	class Ce {
		constructor() {
			;(this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
				arguments.length > 0 && console.error('THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.')
		}
		set(e, t, i, n, r, a, s, o, l, c, h, d, u, p, f, m) {
			const g = this.elements
			return (
				(g[0] = e),
				(g[4] = t),
				(g[8] = i),
				(g[12] = n),
				(g[1] = r),
				(g[5] = a),
				(g[9] = s),
				(g[13] = o),
				(g[2] = l),
				(g[6] = c),
				(g[10] = h),
				(g[14] = d),
				(g[3] = u),
				(g[7] = p),
				(g[11] = f),
				(g[15] = m),
				this
			)
		}
		identity() {
			return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
		}
		clone() {
			return new Ce().fromArray(this.elements)
		}
		copy(e) {
			const t = this.elements,
				i = e.elements
			return (
				(t[0] = i[0]),
				(t[1] = i[1]),
				(t[2] = i[2]),
				(t[3] = i[3]),
				(t[4] = i[4]),
				(t[5] = i[5]),
				(t[6] = i[6]),
				(t[7] = i[7]),
				(t[8] = i[8]),
				(t[9] = i[9]),
				(t[10] = i[10]),
				(t[11] = i[11]),
				(t[12] = i[12]),
				(t[13] = i[13]),
				(t[14] = i[14]),
				(t[15] = i[15]),
				this
			)
		}
		copyPosition(e) {
			const t = this.elements,
				i = e.elements
			return (t[12] = i[12]), (t[13] = i[13]), (t[14] = i[14]), this
		}
		setFromMatrix3(e) {
			const t = e.elements
			return this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1), this
		}
		extractBasis(e, t, i) {
			return e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), i.setFromMatrixColumn(this, 2), this
		}
		makeBasis(e, t, i) {
			return this.set(e.x, t.x, i.x, 0, e.y, t.y, i.y, 0, e.z, t.z, i.z, 0, 0, 0, 0, 1), this
		}
		extractRotation(e) {
			const t = this.elements,
				i = e.elements,
				n = 1 / Ne.setFromMatrixColumn(e, 0).length(),
				r = 1 / Ne.setFromMatrixColumn(e, 1).length(),
				a = 1 / Ne.setFromMatrixColumn(e, 2).length()
			return (
				(t[0] = i[0] * n),
				(t[1] = i[1] * n),
				(t[2] = i[2] * n),
				(t[3] = 0),
				(t[4] = i[4] * r),
				(t[5] = i[5] * r),
				(t[6] = i[6] * r),
				(t[7] = 0),
				(t[8] = i[8] * a),
				(t[9] = i[9] * a),
				(t[10] = i[10] * a),
				(t[11] = 0),
				(t[12] = 0),
				(t[13] = 0),
				(t[14] = 0),
				(t[15] = 1),
				this
			)
		}
		makeRotationFromEuler(e) {
			;(e && e.isEuler) || console.error('THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.')
			const t = this.elements,
				i = e.x,
				n = e.y,
				r = e.z,
				a = Math.cos(i),
				s = Math.sin(i),
				o = Math.cos(n),
				l = Math.sin(n),
				c = Math.cos(r),
				h = Math.sin(r)
			if ('XYZ' === e.order) {
				const e = a * c,
					i = a * h,
					n = s * c,
					r = s * h
				;(t[0] = o * c),
					(t[4] = -o * h),
					(t[8] = l),
					(t[1] = i + n * l),
					(t[5] = e - r * l),
					(t[9] = -s * o),
					(t[2] = r - e * l),
					(t[6] = n + i * l),
					(t[10] = a * o)
			} else if ('YXZ' === e.order) {
				const e = o * c,
					i = o * h,
					n = l * c,
					r = l * h
				;(t[0] = e + r * s),
					(t[4] = n * s - i),
					(t[8] = a * l),
					(t[1] = a * h),
					(t[5] = a * c),
					(t[9] = -s),
					(t[2] = i * s - n),
					(t[6] = r + e * s),
					(t[10] = a * o)
			} else if ('ZXY' === e.order) {
				const e = o * c,
					i = o * h,
					n = l * c,
					r = l * h
				;(t[0] = e - r * s),
					(t[4] = -a * h),
					(t[8] = n + i * s),
					(t[1] = i + n * s),
					(t[5] = a * c),
					(t[9] = r - e * s),
					(t[2] = -a * l),
					(t[6] = s),
					(t[10] = a * o)
			} else if ('ZYX' === e.order) {
				const e = a * c,
					i = a * h,
					n = s * c,
					r = s * h
				;(t[0] = o * c),
					(t[4] = n * l - i),
					(t[8] = e * l + r),
					(t[1] = o * h),
					(t[5] = r * l + e),
					(t[9] = i * l - n),
					(t[2] = -l),
					(t[6] = s * o),
					(t[10] = a * o)
			} else if ('YZX' === e.order) {
				const e = a * o,
					i = a * l,
					n = s * o,
					r = s * l
				;(t[0] = o * c),
					(t[4] = r - e * h),
					(t[8] = n * h + i),
					(t[1] = h),
					(t[5] = a * c),
					(t[9] = -s * c),
					(t[2] = -l * c),
					(t[6] = i * h + n),
					(t[10] = e - r * h)
			} else if ('XZY' === e.order) {
				const e = a * o,
					i = a * l,
					n = s * o,
					r = s * l
				;(t[0] = o * c),
					(t[4] = -h),
					(t[8] = l * c),
					(t[1] = e * h + r),
					(t[5] = a * c),
					(t[9] = i * h - n),
					(t[2] = n * h - i),
					(t[6] = s * c),
					(t[10] = r * h + e)
			}
			return (t[3] = 0), (t[7] = 0), (t[11] = 0), (t[12] = 0), (t[13] = 0), (t[14] = 0), (t[15] = 1), this
		}
		makeRotationFromQuaternion(e) {
			return this.compose(Ie, e, Re)
		}
		lookAt(e, t, i) {
			const n = this.elements
			return (
				Oe.subVectors(e, t),
				0 === Oe.lengthSq() && (Oe.z = 1),
				Oe.normalize(),
				Ue.crossVectors(i, Oe),
				0 === Ue.lengthSq() && (1 === Math.abs(i.z) ? (Oe.x += 1e-4) : (Oe.z += 1e-4), Oe.normalize(), Ue.crossVectors(i, Oe)),
				Ue.normalize(),
				ze.crossVectors(Oe, Ue),
				(n[0] = Ue.x),
				(n[4] = ze.x),
				(n[8] = Oe.x),
				(n[1] = Ue.y),
				(n[5] = ze.y),
				(n[9] = Oe.y),
				(n[2] = Ue.z),
				(n[6] = ze.z),
				(n[10] = Oe.z),
				this
			)
		}
		multiply(e, t) {
			return void 0 !== t
				? (console.warn('THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.'), this.multiplyMatrices(e, t))
				: this.multiplyMatrices(this, e)
		}
		premultiply(e) {
			return this.multiplyMatrices(e, this)
		}
		multiplyMatrices(e, t) {
			const i = e.elements,
				n = t.elements,
				r = this.elements,
				a = i[0],
				s = i[4],
				o = i[8],
				l = i[12],
				c = i[1],
				h = i[5],
				d = i[9],
				u = i[13],
				p = i[2],
				f = i[6],
				m = i[10],
				g = i[14],
				x = i[3],
				_ = i[7],
				v = i[11],
				y = i[15],
				M = n[0],
				b = n[4],
				S = n[8],
				w = n[12],
				T = n[1],
				A = n[5],
				E = n[9],
				L = n[13],
				P = n[2],
				F = n[6],
				C = n[10],
				N = n[14],
				D = n[3],
				I = n[7],
				R = n[11],
				U = n[15]
			return (
				(r[0] = a * M + s * T + o * P + l * D),
				(r[4] = a * b + s * A + o * F + l * I),
				(r[8] = a * S + s * E + o * C + l * R),
				(r[12] = a * w + s * L + o * N + l * U),
				(r[1] = c * M + h * T + d * P + u * D),
				(r[5] = c * b + h * A + d * F + u * I),
				(r[9] = c * S + h * E + d * C + u * R),
				(r[13] = c * w + h * L + d * N + u * U),
				(r[2] = p * M + f * T + m * P + g * D),
				(r[6] = p * b + f * A + m * F + g * I),
				(r[10] = p * S + f * E + m * C + g * R),
				(r[14] = p * w + f * L + m * N + g * U),
				(r[3] = x * M + _ * T + v * P + y * D),
				(r[7] = x * b + _ * A + v * F + y * I),
				(r[11] = x * S + _ * E + v * C + y * R),
				(r[15] = x * w + _ * L + v * N + y * U),
				this
			)
		}
		multiplyScalar(e) {
			const t = this.elements
			return (
				(t[0] *= e),
				(t[4] *= e),
				(t[8] *= e),
				(t[12] *= e),
				(t[1] *= e),
				(t[5] *= e),
				(t[9] *= e),
				(t[13] *= e),
				(t[2] *= e),
				(t[6] *= e),
				(t[10] *= e),
				(t[14] *= e),
				(t[3] *= e),
				(t[7] *= e),
				(t[11] *= e),
				(t[15] *= e),
				this
			)
		}
		determinant() {
			const e = this.elements,
				t = e[0],
				i = e[4],
				n = e[8],
				r = e[12],
				a = e[1],
				s = e[5],
				o = e[9],
				l = e[13],
				c = e[2],
				h = e[6],
				d = e[10],
				u = e[14]
			return (
				e[3] * (+r * o * h - n * l * h - r * s * d + i * l * d + n * s * u - i * o * u) +
				e[7] * (+t * o * u - t * l * d + r * a * d - n * a * u + n * l * c - r * o * c) +
				e[11] * (+t * l * h - t * s * u - r * a * h + i * a * u + r * s * c - i * l * c) +
				e[15] * (-n * s * c - t * o * h + t * s * d + n * a * h - i * a * d + i * o * c)
			)
		}
		transpose() {
			const e = this.elements
			let t
			return (
				(t = e[1]),
				(e[1] = e[4]),
				(e[4] = t),
				(t = e[2]),
				(e[2] = e[8]),
				(e[8] = t),
				(t = e[6]),
				(e[6] = e[9]),
				(e[9] = t),
				(t = e[3]),
				(e[3] = e[12]),
				(e[12] = t),
				(t = e[7]),
				(e[7] = e[13]),
				(e[13] = t),
				(t = e[11]),
				(e[11] = e[14]),
				(e[14] = t),
				this
			)
		}
		setPosition(e, t, i) {
			const n = this.elements
			return e.isVector3 ? ((n[12] = e.x), (n[13] = e.y), (n[14] = e.z)) : ((n[12] = e), (n[13] = t), (n[14] = i)), this
		}
		invert() {
			const e = this.elements,
				t = e[0],
				i = e[1],
				n = e[2],
				r = e[3],
				a = e[4],
				s = e[5],
				o = e[6],
				l = e[7],
				c = e[8],
				h = e[9],
				d = e[10],
				u = e[11],
				p = e[12],
				f = e[13],
				m = e[14],
				g = e[15],
				x = h * m * l - f * d * l + f * o * u - s * m * u - h * o * g + s * d * g,
				_ = p * d * l - c * m * l - p * o * u + a * m * u + c * o * g - a * d * g,
				v = c * f * l - p * h * l + p * s * u - a * f * u - c * s * g + a * h * g,
				y = p * h * o - c * f * o - p * s * d + a * f * d + c * s * m - a * h * m,
				M = t * x + i * _ + n * v + r * y
			if (0 === M) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
			const b = 1 / M
			return (
				(e[0] = x * b),
				(e[1] = (f * d * r - h * m * r - f * n * u + i * m * u + h * n * g - i * d * g) * b),
				(e[2] = (s * m * r - f * o * r + f * n * l - i * m * l - s * n * g + i * o * g) * b),
				(e[3] = (h * o * r - s * d * r - h * n * l + i * d * l + s * n * u - i * o * u) * b),
				(e[4] = _ * b),
				(e[5] = (c * m * r - p * d * r + p * n * u - t * m * u - c * n * g + t * d * g) * b),
				(e[6] = (p * o * r - a * m * r - p * n * l + t * m * l + a * n * g - t * o * g) * b),
				(e[7] = (a * d * r - c * o * r + c * n * l - t * d * l - a * n * u + t * o * u) * b),
				(e[8] = v * b),
				(e[9] = (p * h * r - c * f * r - p * i * u + t * f * u + c * i * g - t * h * g) * b),
				(e[10] = (a * f * r - p * s * r + p * i * l - t * f * l - a * i * g + t * s * g) * b),
				(e[11] = (c * s * r - a * h * r - c * i * l + t * h * l + a * i * u - t * s * u) * b),
				(e[12] = y * b),
				(e[13] = (c * f * n - p * h * n + p * i * d - t * f * d - c * i * m + t * h * m) * b),
				(e[14] = (p * s * n - a * f * n - p * i * o + t * f * o + a * i * m - t * s * m) * b),
				(e[15] = (a * h * n - c * s * n + c * i * o - t * h * o - a * i * d + t * s * d) * b),
				this
			)
		}
		scale(e) {
			const t = this.elements,
				i = e.x,
				n = e.y,
				r = e.z
			return (
				(t[0] *= i),
				(t[4] *= n),
				(t[8] *= r),
				(t[1] *= i),
				(t[5] *= n),
				(t[9] *= r),
				(t[2] *= i),
				(t[6] *= n),
				(t[10] *= r),
				(t[3] *= i),
				(t[7] *= n),
				(t[11] *= r),
				this
			)
		}
		getMaxScaleOnAxis() {
			const e = this.elements,
				t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2],
				i = e[4] * e[4] + e[5] * e[5] + e[6] * e[6],
				n = e[8] * e[8] + e[9] * e[9] + e[10] * e[10]
			return Math.sqrt(Math.max(t, i, n))
		}
		makeTranslation(e, t, i) {
			return this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, i, 0, 0, 0, 1), this
		}
		makeRotationX(e) {
			const t = Math.cos(e),
				i = Math.sin(e)
			return this.set(1, 0, 0, 0, 0, t, -i, 0, 0, i, t, 0, 0, 0, 0, 1), this
		}
		makeRotationY(e) {
			const t = Math.cos(e),
				i = Math.sin(e)
			return this.set(t, 0, i, 0, 0, 1, 0, 0, -i, 0, t, 0, 0, 0, 0, 1), this
		}
		makeRotationZ(e) {
			const t = Math.cos(e),
				i = Math.sin(e)
			return this.set(t, -i, 0, 0, i, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
		}
		makeRotationAxis(e, t) {
			const i = Math.cos(t),
				n = Math.sin(t),
				r = 1 - i,
				a = e.x,
				s = e.y,
				o = e.z,
				l = r * a,
				c = r * s
			return (
				this.set(
					l * a + i,
					l * s - n * o,
					l * o + n * s,
					0,
					l * s + n * o,
					c * s + i,
					c * o - n * a,
					0,
					l * o - n * s,
					c * o + n * a,
					r * o * o + i,
					0,
					0,
					0,
					0,
					1
				),
				this
			)
		}
		makeScale(e, t, i) {
			return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, i, 0, 0, 0, 0, 1), this
		}
		makeShear(e, t, i, n, r, a) {
			return this.set(1, i, r, 0, e, 1, a, 0, t, n, 1, 0, 0, 0, 0, 1), this
		}
		compose(e, t, i) {
			const n = this.elements,
				r = t._x,
				a = t._y,
				s = t._z,
				o = t._w,
				l = r + r,
				c = a + a,
				h = s + s,
				d = r * l,
				u = r * c,
				p = r * h,
				f = a * c,
				m = a * h,
				g = s * h,
				x = o * l,
				_ = o * c,
				v = o * h,
				y = i.x,
				M = i.y,
				b = i.z
			return (
				(n[0] = (1 - (f + g)) * y),
				(n[1] = (u + v) * y),
				(n[2] = (p - _) * y),
				(n[3] = 0),
				(n[4] = (u - v) * M),
				(n[5] = (1 - (d + g)) * M),
				(n[6] = (m + x) * M),
				(n[7] = 0),
				(n[8] = (p + _) * b),
				(n[9] = (m - x) * b),
				(n[10] = (1 - (d + f)) * b),
				(n[11] = 0),
				(n[12] = e.x),
				(n[13] = e.y),
				(n[14] = e.z),
				(n[15] = 1),
				this
			)
		}
		decompose(e, t, i) {
			const n = this.elements
			let r = Ne.set(n[0], n[1], n[2]).length()
			const a = Ne.set(n[4], n[5], n[6]).length(),
				s = Ne.set(n[8], n[9], n[10]).length()
			this.determinant() < 0 && (r = -r), (e.x = n[12]), (e.y = n[13]), (e.z = n[14]), De.copy(this)
			const o = 1 / r,
				l = 1 / a,
				c = 1 / s
			return (
				(De.elements[0] *= o),
				(De.elements[1] *= o),
				(De.elements[2] *= o),
				(De.elements[4] *= l),
				(De.elements[5] *= l),
				(De.elements[6] *= l),
				(De.elements[8] *= c),
				(De.elements[9] *= c),
				(De.elements[10] *= c),
				t.setFromRotationMatrix(De),
				(i.x = r),
				(i.y = a),
				(i.z = s),
				this
			)
		}
		makePerspective(e, t, i, n, r, a) {
			void 0 === a && console.warn('THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.')
			const s = this.elements,
				o = (2 * r) / (t - e),
				l = (2 * r) / (i - n),
				c = (t + e) / (t - e),
				h = (i + n) / (i - n),
				d = -(a + r) / (a - r),
				u = (-2 * a * r) / (a - r)
			return (
				(s[0] = o),
				(s[4] = 0),
				(s[8] = c),
				(s[12] = 0),
				(s[1] = 0),
				(s[5] = l),
				(s[9] = h),
				(s[13] = 0),
				(s[2] = 0),
				(s[6] = 0),
				(s[10] = d),
				(s[14] = u),
				(s[3] = 0),
				(s[7] = 0),
				(s[11] = -1),
				(s[15] = 0),
				this
			)
		}
		makeOrthographic(e, t, i, n, r, a) {
			const s = this.elements,
				o = 1 / (t - e),
				l = 1 / (i - n),
				c = 1 / (a - r),
				h = (t + e) * o,
				d = (i + n) * l,
				u = (a + r) * c
			return (
				(s[0] = 2 * o),
				(s[4] = 0),
				(s[8] = 0),
				(s[12] = -h),
				(s[1] = 0),
				(s[5] = 2 * l),
				(s[9] = 0),
				(s[13] = -d),
				(s[2] = 0),
				(s[6] = 0),
				(s[10] = -2 * c),
				(s[14] = -u),
				(s[3] = 0),
				(s[7] = 0),
				(s[11] = 0),
				(s[15] = 1),
				this
			)
		}
		equals(e) {
			const t = this.elements,
				i = e.elements
			for (let e = 0; e < 16; e++) if (t[e] !== i[e]) return !1
			return !0
		}
		fromArray(e, t = 0) {
			for (let i = 0; i < 16; i++) this.elements[i] = e[i + t]
			return this
		}
		toArray(e = [], t = 0) {
			const i = this.elements
			return (
				(e[t] = i[0]),
				(e[t + 1] = i[1]),
				(e[t + 2] = i[2]),
				(e[t + 3] = i[3]),
				(e[t + 4] = i[4]),
				(e[t + 5] = i[5]),
				(e[t + 6] = i[6]),
				(e[t + 7] = i[7]),
				(e[t + 8] = i[8]),
				(e[t + 9] = i[9]),
				(e[t + 10] = i[10]),
				(e[t + 11] = i[11]),
				(e[t + 12] = i[12]),
				(e[t + 13] = i[13]),
				(e[t + 14] = i[14]),
				(e[t + 15] = i[15]),
				e
			)
		}
	}
	Ce.prototype.isMatrix4 = !0
	const Ne = new ee(),
		De = new Ce(),
		Ie = new ee(0, 0, 0),
		Re = new ee(1, 1, 1),
		Ue = new ee(),
		ze = new ee(),
		Oe = new ee(),
		Be = new Ce(),
		ke = new $()
	class Ge {
		constructor(e = 0, t = 0, i = 0, n = Ge.DefaultOrder) {
			;(this._x = e), (this._y = t), (this._z = i), (this._order = n)
		}
		get x() {
			return this._x
		}
		set x(e) {
			;(this._x = e), this._onChangeCallback()
		}
		get y() {
			return this._y
		}
		set y(e) {
			;(this._y = e), this._onChangeCallback()
		}
		get z() {
			return this._z
		}
		set z(e) {
			;(this._z = e), this._onChangeCallback()
		}
		get order() {
			return this._order
		}
		set order(e) {
			;(this._order = e), this._onChangeCallback()
		}
		set(e, t, i, n = this._order) {
			return (this._x = e), (this._y = t), (this._z = i), (this._order = n), this._onChangeCallback(), this
		}
		clone() {
			return new this.constructor(this._x, this._y, this._z, this._order)
		}
		copy(e) {
			return (this._x = e._x), (this._y = e._y), (this._z = e._z), (this._order = e._order), this._onChangeCallback(), this
		}
		setFromRotationMatrix(e, t = this._order, i = !0) {
			const n = e.elements,
				r = n[0],
				a = n[4],
				s = n[8],
				o = n[1],
				l = n[5],
				c = n[9],
				h = n[2],
				d = n[6],
				u = n[10]
			switch (t) {
				case 'XYZ':
					;(this._y = Math.asin(O(s, -1, 1))),
						Math.abs(s) < 0.9999999 ? ((this._x = Math.atan2(-c, u)), (this._z = Math.atan2(-a, r))) : ((this._x = Math.atan2(d, l)), (this._z = 0))
					break
				case 'YXZ':
					;(this._x = Math.asin(-O(c, -1, 1))),
						Math.abs(c) < 0.9999999 ? ((this._y = Math.atan2(s, u)), (this._z = Math.atan2(o, l))) : ((this._y = Math.atan2(-h, r)), (this._z = 0))
					break
				case 'ZXY':
					;(this._x = Math.asin(O(d, -1, 1))),
						Math.abs(d) < 0.9999999 ? ((this._y = Math.atan2(-h, u)), (this._z = Math.atan2(-a, l))) : ((this._y = 0), (this._z = Math.atan2(o, r)))
					break
				case 'ZYX':
					;(this._y = Math.asin(-O(h, -1, 1))),
						Math.abs(h) < 0.9999999 ? ((this._x = Math.atan2(d, u)), (this._z = Math.atan2(o, r))) : ((this._x = 0), (this._z = Math.atan2(-a, l)))
					break
				case 'YZX':
					;(this._z = Math.asin(O(o, -1, 1))),
						Math.abs(o) < 0.9999999 ? ((this._x = Math.atan2(-c, l)), (this._y = Math.atan2(-h, r))) : ((this._x = 0), (this._y = Math.atan2(s, u)))
					break
				case 'XZY':
					;(this._z = Math.asin(-O(a, -1, 1))),
						Math.abs(a) < 0.9999999 ? ((this._x = Math.atan2(d, l)), (this._y = Math.atan2(s, r))) : ((this._x = Math.atan2(-c, u)), (this._y = 0))
					break
				default:
					console.warn('THREE.Euler: .setFromRotationMatrix() encountered an unknown order: ' + t)
			}
			return (this._order = t), !0 === i && this._onChangeCallback(), this
		}
		setFromQuaternion(e, t, i) {
			return Be.makeRotationFromQuaternion(e), this.setFromRotationMatrix(Be, t, i)
		}
		setFromVector3(e, t = this._order) {
			return this.set(e.x, e.y, e.z, t)
		}
		reorder(e) {
			return ke.setFromEuler(this), this.setFromQuaternion(ke, e)
		}
		equals(e) {
			return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order
		}
		fromArray(e) {
			return (this._x = e[0]), (this._y = e[1]), (this._z = e[2]), void 0 !== e[3] && (this._order = e[3]), this._onChangeCallback(), this
		}
		toArray(e = [], t = 0) {
			return (e[t] = this._x), (e[t + 1] = this._y), (e[t + 2] = this._z), (e[t + 3] = this._order), e
		}
		toVector3(e) {
			return e ? e.set(this._x, this._y, this._z) : new ee(this._x, this._y, this._z)
		}
		_onChange(e) {
			return (this._onChangeCallback = e), this
		}
		_onChangeCallback() {}
	}
	;(Ge.prototype.isEuler = !0), (Ge.DefaultOrder = 'XYZ'), (Ge.RotationOrders = ['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX'])
	class He {
		constructor() {
			this.mask = 1
		}
		set(e) {
			this.mask = ((1 << e) | 0) >>> 0
		}
		enable(e) {
			this.mask |= (1 << e) | 0
		}
		enableAll() {
			this.mask = -1
		}
		toggle(e) {
			this.mask ^= (1 << e) | 0
		}
		disable(e) {
			this.mask &= ~((1 << e) | 0)
		}
		disableAll() {
			this.mask = 0
		}
		test(e) {
			return 0 != (this.mask & e.mask)
		}
		isEnabled(e) {
			return 0 != (this.mask & ((1 << e) | 0))
		}
	}
	let Ve = 0
	const We = new ee(),
		Xe = new $(),
		Ye = new Ce(),
		je = new ee(),
		Qe = new ee(),
		qe = new ee(),
		Ze = new $(),
		Je = new ee(1, 0, 0),
		Ke = new ee(0, 1, 0),
		$e = new ee(0, 0, 1),
		et = { type: 'added' },
		tt = { type: 'removed' }
	class it extends D {
		constructor() {
			super(),
				Object.defineProperty(this, 'id', { value: Ve++ }),
				(this.uuid = z()),
				(this.name = ''),
				(this.type = 'Object3D'),
				(this.parent = null),
				(this.children = []),
				(this.up = it.DefaultUp.clone())
			const e = new ee(),
				t = new Ge(),
				i = new $(),
				n = new ee(1, 1, 1)
			t._onChange(function () {
				i.setFromEuler(t, !1)
			}),
				i._onChange(function () {
					t.setFromQuaternion(i, void 0, !1)
				}),
				Object.defineProperties(this, {
					position: { configurable: !0, enumerable: !0, value: e },
					rotation: { configurable: !0, enumerable: !0, value: t },
					quaternion: { configurable: !0, enumerable: !0, value: i },
					scale: { configurable: !0, enumerable: !0, value: n },
					modelViewMatrix: { value: new Ce() },
					normalMatrix: { value: new V() },
				}),
				(this.matrix = new Ce()),
				(this.matrixWorld = new Ce()),
				(this.matrixAutoUpdate = it.DefaultMatrixAutoUpdate),
				(this.matrixWorldNeedsUpdate = !1),
				(this.layers = new He()),
				(this.visible = !0),
				(this.castShadow = !1),
				(this.receiveShadow = !1),
				(this.frustumCulled = !0),
				(this.renderOrder = 0),
				(this.animations = []),
				(this.userData = {})
		}
		onBeforeRender() {}
		onAfterRender() {}
		applyMatrix4(e) {
			this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale)
		}
		applyQuaternion(e) {
			return this.quaternion.premultiply(e), this
		}
		setRotationFromAxisAngle(e, t) {
			this.quaternion.setFromAxisAngle(e, t)
		}
		setRotationFromEuler(e) {
			this.quaternion.setFromEuler(e, !0)
		}
		setRotationFromMatrix(e) {
			this.quaternion.setFromRotationMatrix(e)
		}
		setRotationFromQuaternion(e) {
			this.quaternion.copy(e)
		}
		rotateOnAxis(e, t) {
			return Xe.setFromAxisAngle(e, t), this.quaternion.multiply(Xe), this
		}
		rotateOnWorldAxis(e, t) {
			return Xe.setFromAxisAngle(e, t), this.quaternion.premultiply(Xe), this
		}
		rotateX(e) {
			return this.rotateOnAxis(Je, e)
		}
		rotateY(e) {
			return this.rotateOnAxis(Ke, e)
		}
		rotateZ(e) {
			return this.rotateOnAxis($e, e)
		}
		translateOnAxis(e, t) {
			return We.copy(e).applyQuaternion(this.quaternion), this.position.add(We.multiplyScalar(t)), this
		}
		translateX(e) {
			return this.translateOnAxis(Je, e)
		}
		translateY(e) {
			return this.translateOnAxis(Ke, e)
		}
		translateZ(e) {
			return this.translateOnAxis($e, e)
		}
		localToWorld(e) {
			return e.applyMatrix4(this.matrixWorld)
		}
		worldToLocal(e) {
			return e.applyMatrix4(Ye.copy(this.matrixWorld).invert())
		}
		lookAt(e, t, i) {
			e.isVector3 ? je.copy(e) : je.set(e, t, i)
			const n = this.parent
			this.updateWorldMatrix(!0, !1),
				Qe.setFromMatrixPosition(this.matrixWorld),
				this.isCamera || this.isLight ? Ye.lookAt(Qe, je, this.up) : Ye.lookAt(je, Qe, this.up),
				this.quaternion.setFromRotationMatrix(Ye),
				n && (Ye.extractRotation(n.matrixWorld), Xe.setFromRotationMatrix(Ye), this.quaternion.premultiply(Xe.invert()))
		}
		add(e) {
			if (arguments.length > 1) {
				for (let e = 0; e < arguments.length; e++) this.add(arguments[e])
				return this
			}
			return e === this
				? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this)
				: (e && e.isObject3D
						? (null !== e.parent && e.parent.remove(e), (e.parent = this), this.children.push(e), e.dispatchEvent(et))
						: console.error('THREE.Object3D.add: object not an instance of THREE.Object3D.', e),
				  this)
		}
		remove(e) {
			if (arguments.length > 1) {
				for (let e = 0; e < arguments.length; e++) this.remove(arguments[e])
				return this
			}
			const t = this.children.indexOf(e)
			return -1 !== t && ((e.parent = null), this.children.splice(t, 1), e.dispatchEvent(tt)), this
		}
		removeFromParent() {
			const e = this.parent
			return null !== e && e.remove(this), this
		}
		clear() {
			for (let e = 0; e < this.children.length; e++) {
				const t = this.children[e]
				;(t.parent = null), t.dispatchEvent(tt)
			}
			return (this.children.length = 0), this
		}
		attach(e) {
			return (
				this.updateWorldMatrix(!0, !1),
				Ye.copy(this.matrixWorld).invert(),
				null !== e.parent && (e.parent.updateWorldMatrix(!0, !1), Ye.multiply(e.parent.matrixWorld)),
				e.applyMatrix4(Ye),
				this.add(e),
				e.updateWorldMatrix(!1, !0),
				this
			)
		}
		getObjectById(e) {
			return this.getObjectByProperty('id', e)
		}
		getObjectByName(e) {
			return this.getObjectByProperty('name', e)
		}
		getObjectByProperty(e, t) {
			if (this[e] === t) return this
			for (let i = 0, n = this.children.length; i < n; i++) {
				const n = this.children[i].getObjectByProperty(e, t)
				if (void 0 !== n) return n
			}
		}
		getWorldPosition(e) {
			return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld)
		}
		getWorldQuaternion(e) {
			return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Qe, e, qe), e
		}
		getWorldScale(e) {
			return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Qe, Ze, e), e
		}
		getWorldDirection(e) {
			this.updateWorldMatrix(!0, !1)
			const t = this.matrixWorld.elements
			return e.set(t[8], t[9], t[10]).normalize()
		}
		raycast() {}
		traverse(e) {
			e(this)
			const t = this.children
			for (let i = 0, n = t.length; i < n; i++) t[i].traverse(e)
		}
		traverseVisible(e) {
			if (!1 === this.visible) return
			e(this)
			const t = this.children
			for (let i = 0, n = t.length; i < n; i++) t[i].traverseVisible(e)
		}
		traverseAncestors(e) {
			const t = this.parent
			null !== t && (e(t), t.traverseAncestors(e))
		}
		updateMatrix() {
			this.matrix.compose(this.position, this.quaternion, this.scale), (this.matrixWorldNeedsUpdate = !0)
		}
		updateMatrixWorld(e) {
			this.matrixAutoUpdate && this.updateMatrix(),
				(this.matrixWorldNeedsUpdate || e) &&
					(null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
					(this.matrixWorldNeedsUpdate = !1),
					(e = !0))
			const t = this.children
			for (let i = 0, n = t.length; i < n; i++) t[i].updateMatrixWorld(e)
		}
		updateWorldMatrix(e, t) {
			const i = this.parent
			if (
				(!0 === e && null !== i && i.updateWorldMatrix(!0, !1),
				this.matrixAutoUpdate && this.updateMatrix(),
				null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
				!0 === t)
			) {
				const e = this.children
				for (let t = 0, i = e.length; t < i; t++) e[t].updateWorldMatrix(!1, !0)
			}
		}
		toJSON(e) {
			const t = void 0 === e || 'string' == typeof e,
				i = {}
			t &&
				((e = { geometries: {}, materials: {}, textures: {}, images: {}, shapes: {}, skeletons: {}, animations: {} }),
				(i.metadata = { version: 4.5, type: 'Object', generator: 'Object3D.toJSON' }))
			const n = {}
			function r(t, i) {
				return void 0 === t[i.uuid] && (t[i.uuid] = i.toJSON(e)), i.uuid
			}
			if (
				((n.uuid = this.uuid),
				(n.type = this.type),
				'' !== this.name && (n.name = this.name),
				!0 === this.castShadow && (n.castShadow = !0),
				!0 === this.receiveShadow && (n.receiveShadow = !0),
				!1 === this.visible && (n.visible = !1),
				!1 === this.frustumCulled && (n.frustumCulled = !1),
				0 !== this.renderOrder && (n.renderOrder = this.renderOrder),
				'{}' !== JSON.stringify(this.userData) && (n.userData = this.userData),
				(n.layers = this.layers.mask),
				(n.matrix = this.matrix.toArray()),
				!1 === this.matrixAutoUpdate && (n.matrixAutoUpdate = !1),
				this.isInstancedMesh &&
					((n.type = 'InstancedMesh'),
					(n.count = this.count),
					(n.instanceMatrix = this.instanceMatrix.toJSON()),
					null !== this.instanceColor && (n.instanceColor = this.instanceColor.toJSON())),
				this.isScene)
			)
				this.background &&
					(this.background.isColor ? (n.background = this.background.toJSON()) : this.background.isTexture && (n.background = this.background.toJSON(e).uuid)),
					this.environment && this.environment.isTexture && (n.environment = this.environment.toJSON(e).uuid)
			else if (this.isMesh || this.isLine || this.isPoints) {
				n.geometry = r(e.geometries, this.geometry)
				const t = this.geometry.parameters
				if (void 0 !== t && void 0 !== t.shapes) {
					const i = t.shapes
					if (Array.isArray(i))
						for (let t = 0, n = i.length; t < n; t++) {
							const n = i[t]
							r(e.shapes, n)
						}
					else r(e.shapes, i)
				}
			}
			if (
				(this.isSkinnedMesh &&
					((n.bindMode = this.bindMode),
					(n.bindMatrix = this.bindMatrix.toArray()),
					void 0 !== this.skeleton && (r(e.skeletons, this.skeleton), (n.skeleton = this.skeleton.uuid))),
				void 0 !== this.material)
			)
				if (Array.isArray(this.material)) {
					const t = []
					for (let i = 0, n = this.material.length; i < n; i++) t.push(r(e.materials, this.material[i]))
					n.material = t
				} else n.material = r(e.materials, this.material)
			if (this.children.length > 0) {
				n.children = []
				for (let t = 0; t < this.children.length; t++) n.children.push(this.children[t].toJSON(e).object)
			}
			if (this.animations.length > 0) {
				n.animations = []
				for (let t = 0; t < this.animations.length; t++) {
					const i = this.animations[t]
					n.animations.push(r(e.animations, i))
				}
			}
			if (t) {
				const t = a(e.geometries),
					n = a(e.materials),
					r = a(e.textures),
					s = a(e.images),
					o = a(e.shapes),
					l = a(e.skeletons),
					c = a(e.animations)
				t.length > 0 && (i.geometries = t),
					n.length > 0 && (i.materials = n),
					r.length > 0 && (i.textures = r),
					s.length > 0 && (i.images = s),
					o.length > 0 && (i.shapes = o),
					l.length > 0 && (i.skeletons = l),
					c.length > 0 && (i.animations = c)
			}
			return (i.object = n), i
			function a(e) {
				const t = []
				for (const i in e) {
					const n = e[i]
					delete n.metadata, t.push(n)
				}
				return t
			}
		}
		clone(e) {
			return new this.constructor().copy(this, e)
		}
		copy(e, t = !0) {
			if (
				((this.name = e.name),
				this.up.copy(e.up),
				this.position.copy(e.position),
				(this.rotation.order = e.rotation.order),
				this.quaternion.copy(e.quaternion),
				this.scale.copy(e.scale),
				this.matrix.copy(e.matrix),
				this.matrixWorld.copy(e.matrixWorld),
				(this.matrixAutoUpdate = e.matrixAutoUpdate),
				(this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate),
				(this.layers.mask = e.layers.mask),
				(this.visible = e.visible),
				(this.castShadow = e.castShadow),
				(this.receiveShadow = e.receiveShadow),
				(this.frustumCulled = e.frustumCulled),
				(this.renderOrder = e.renderOrder),
				(this.userData = JSON.parse(JSON.stringify(e.userData))),
				!0 === t)
			)
				for (let t = 0; t < e.children.length; t++) {
					const i = e.children[t]
					this.add(i.clone())
				}
			return this
		}
	}
	;(it.DefaultUp = new ee(0, 1, 0)), (it.DefaultMatrixAutoUpdate = !0), (it.prototype.isObject3D = !0)
	const nt = new ee(),
		rt = new ee(),
		at = new ee(),
		st = new ee(),
		ot = new ee(),
		lt = new ee(),
		ct = new ee(),
		ht = new ee(),
		dt = new ee(),
		ut = new ee()
	class pt {
		constructor(e = new ee(), t = new ee(), i = new ee()) {
			;(this.a = e), (this.b = t), (this.c = i)
		}
		static getNormal(e, t, i, n) {
			n.subVectors(i, t), nt.subVectors(e, t), n.cross(nt)
			const r = n.lengthSq()
			return r > 0 ? n.multiplyScalar(1 / Math.sqrt(r)) : n.set(0, 0, 0)
		}
		static getBarycoord(e, t, i, n, r) {
			nt.subVectors(n, t), rt.subVectors(i, t), at.subVectors(e, t)
			const a = nt.dot(nt),
				s = nt.dot(rt),
				o = nt.dot(at),
				l = rt.dot(rt),
				c = rt.dot(at),
				h = a * l - s * s
			if (0 === h) return r.set(-2, -1, -1)
			const d = 1 / h,
				u = (l * o - s * c) * d,
				p = (a * c - s * o) * d
			return r.set(1 - u - p, p, u)
		}
		static containsPoint(e, t, i, n) {
			return this.getBarycoord(e, t, i, n, st), st.x >= 0 && st.y >= 0 && st.x + st.y <= 1
		}
		static getUV(e, t, i, n, r, a, s, o) {
			return this.getBarycoord(e, t, i, n, st), o.set(0, 0), o.addScaledVector(r, st.x), o.addScaledVector(a, st.y), o.addScaledVector(s, st.z), o
		}
		static isFrontFacing(e, t, i, n) {
			return nt.subVectors(i, t), rt.subVectors(e, t), nt.cross(rt).dot(n) < 0
		}
		set(e, t, i) {
			return this.a.copy(e), this.b.copy(t), this.c.copy(i), this
		}
		setFromPointsAndIndices(e, t, i, n) {
			return this.a.copy(e[t]), this.b.copy(e[i]), this.c.copy(e[n]), this
		}
		setFromAttributeAndIndices(e, t, i, n) {
			return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, i), this.c.fromBufferAttribute(e, n), this
		}
		clone() {
			return new this.constructor().copy(this)
		}
		copy(e) {
			return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this
		}
		getArea() {
			return nt.subVectors(this.c, this.b), rt.subVectors(this.a, this.b), 0.5 * nt.cross(rt).length()
		}
		getMidpoint(e) {
			return e
				.addVectors(this.a, this.b)
				.add(this.c)
				.multiplyScalar(1 / 3)
		}
		getNormal(e) {
			return pt.getNormal(this.a, this.b, this.c, e)
		}
		getPlane(e) {
			return e.setFromCoplanarPoints(this.a, this.b, this.c)
		}
		getBarycoord(e, t) {
			return pt.getBarycoord(e, this.a, this.b, this.c, t)
		}
		getUV(e, t, i, n, r) {
			return pt.getUV(e, this.a, this.b, this.c, t, i, n, r)
		}
		containsPoint(e) {
			return pt.containsPoint(e, this.a, this.b, this.c)
		}
		isFrontFacing(e) {
			return pt.isFrontFacing(this.a, this.b, this.c, e)
		}
		intersectsBox(e) {
			return e.intersectsTriangle(this)
		}
		closestPointToPoint(e, t) {
			const i = this.a,
				n = this.b,
				r = this.c
			let a, s
			ot.subVectors(n, i), lt.subVectors(r, i), ht.subVectors(e, i)
			const o = ot.dot(ht),
				l = lt.dot(ht)
			if (o <= 0 && l <= 0) return t.copy(i)
			dt.subVectors(e, n)
			const c = ot.dot(dt),
				h = lt.dot(dt)
			if (c >= 0 && h <= c) return t.copy(n)
			const d = o * h - c * l
			if (d <= 0 && o >= 0 && c <= 0) return (a = o / (o - c)), t.copy(i).addScaledVector(ot, a)
			ut.subVectors(e, r)
			const u = ot.dot(ut),
				p = lt.dot(ut)
			if (p >= 0 && u <= p) return t.copy(r)
			const f = u * l - o * p
			if (f <= 0 && l >= 0 && p <= 0) return (s = l / (l - p)), t.copy(i).addScaledVector(lt, s)
			const m = c * p - u * h
			if (m <= 0 && h - c >= 0 && u - p >= 0) return ct.subVectors(r, n), (s = (h - c) / (h - c + (u - p))), t.copy(n).addScaledVector(ct, s)
			const g = 1 / (m + f + d)
			return (a = f * g), (s = d * g), t.copy(i).addScaledVector(ot, a).addScaledVector(lt, s)
		}
		equals(e) {
			return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c)
		}
	}
	let ft = 0
	class mt extends D {
		constructor() {
			super(),
				Object.defineProperty(this, 'id', { value: ft++ }),
				(this.uuid = z()),
				(this.name = ''),
				(this.type = 'Material'),
				(this.fog = !0),
				(this.blending = 1),
				(this.side = 0),
				(this.vertexColors = !1),
				(this.opacity = 1),
				(this.format = A),
				(this.transparent = !1),
				(this.blendSrc = 204),
				(this.blendDst = 205),
				(this.blendEquation = l),
				(this.blendSrcAlpha = null),
				(this.blendDstAlpha = null),
				(this.blendEquationAlpha = null),
				(this.depthFunc = 3),
				(this.depthTest = !0),
				(this.depthWrite = !0),
				(this.stencilWriteMask = 255),
				(this.stencilFunc = 519),
				(this.stencilRef = 0),
				(this.stencilFuncMask = 255),
				(this.stencilFail = C),
				(this.stencilZFail = C),
				(this.stencilZPass = C),
				(this.stencilWrite = !1),
				(this.clippingPlanes = null),
				(this.clipIntersection = !1),
				(this.clipShadows = !1),
				(this.shadowSide = null),
				(this.colorWrite = !0),
				(this.precision = null),
				(this.polygonOffset = !1),
				(this.polygonOffsetFactor = 0),
				(this.polygonOffsetUnits = 0),
				(this.dithering = !1),
				(this.alphaToCoverage = !1),
				(this.premultipliedAlpha = !1),
				(this.visible = !0),
				(this.toneMapped = !0),
				(this.userData = {}),
				(this.version = 0),
				(this._alphaTest = 0)
		}
		get alphaTest() {
			return this._alphaTest
		}
		set alphaTest(e) {
			this._alphaTest > 0 != e > 0 && this.version++, (this._alphaTest = e)
		}
		onBuild() {}
		onBeforeRender() {}
		onBeforeCompile() {}
		customProgramCacheKey() {
			return this.onBeforeCompile.toString()
		}
		setValues(e) {
			if (void 0 !== e)
				for (const t in e) {
					const i = e[t]
					if (void 0 === i) {
						console.warn("THREE.Material: '" + t + "' parameter is undefined.")
						continue
					}
					if ('shading' === t) {
						console.warn('THREE.' + this.type + ': .shading has been removed. Use the boolean .flatShading instead.'), (this.flatShading = 1 === i)
						continue
					}
					const n = this[t]
					void 0 !== n
						? n && n.isColor
							? n.set(i)
							: n && n.isVector3 && i && i.isVector3
							? n.copy(i)
							: (this[t] = i)
						: console.warn('THREE.' + this.type + ": '" + t + "' is not a property of this material.")
				}
		}
		toJSON(e) {
			const t = void 0 === e || 'string' == typeof e
			t && (e = { textures: {}, images: {} })
			const i = { metadata: { version: 4.5, type: 'Material', generator: 'Material.toJSON' } }
			function n(e) {
				const t = []
				for (const i in e) {
					const n = e[i]
					delete n.metadata, t.push(n)
				}
				return t
			}
			if (
				((i.uuid = this.uuid),
				(i.type = this.type),
				'' !== this.name && (i.name = this.name),
				this.color && this.color.isColor && (i.color = this.color.getHex()),
				void 0 !== this.roughness && (i.roughness = this.roughness),
				void 0 !== this.metalness && (i.metalness = this.metalness),
				void 0 !== this.sheen && (i.sheen = this.sheen),
				this.sheenColor && this.sheenColor.isColor && (i.sheenColor = this.sheenColor.getHex()),
				void 0 !== this.sheenRoughness && (i.sheenRoughness = this.sheenRoughness),
				this.emissive && this.emissive.isColor && (i.emissive = this.emissive.getHex()),
				this.emissiveIntensity && 1 !== this.emissiveIntensity && (i.emissiveIntensity = this.emissiveIntensity),
				this.specular && this.specular.isColor && (i.specular = this.specular.getHex()),
				void 0 !== this.specularIntensity && (i.specularIntensity = this.specularIntensity),
				this.specularColor && this.specularColor.isColor && (i.specularColor = this.specularColor.getHex()),
				void 0 !== this.shininess && (i.shininess = this.shininess),
				void 0 !== this.clearcoat && (i.clearcoat = this.clearcoat),
				void 0 !== this.clearcoatRoughness && (i.clearcoatRoughness = this.clearcoatRoughness),
				this.clearcoatMap && this.clearcoatMap.isTexture && (i.clearcoatMap = this.clearcoatMap.toJSON(e).uuid),
				this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (i.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid),
				this.clearcoatNormalMap &&
					this.clearcoatNormalMap.isTexture &&
					((i.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid), (i.clearcoatNormalScale = this.clearcoatNormalScale.toArray())),
				this.map && this.map.isTexture && (i.map = this.map.toJSON(e).uuid),
				this.matcap && this.matcap.isTexture && (i.matcap = this.matcap.toJSON(e).uuid),
				this.alphaMap && this.alphaMap.isTexture && (i.alphaMap = this.alphaMap.toJSON(e).uuid),
				this.lightMap && this.lightMap.isTexture && ((i.lightMap = this.lightMap.toJSON(e).uuid), (i.lightMapIntensity = this.lightMapIntensity)),
				this.aoMap && this.aoMap.isTexture && ((i.aoMap = this.aoMap.toJSON(e).uuid), (i.aoMapIntensity = this.aoMapIntensity)),
				this.bumpMap && this.bumpMap.isTexture && ((i.bumpMap = this.bumpMap.toJSON(e).uuid), (i.bumpScale = this.bumpScale)),
				this.normalMap &&
					this.normalMap.isTexture &&
					((i.normalMap = this.normalMap.toJSON(e).uuid), (i.normalMapType = this.normalMapType), (i.normalScale = this.normalScale.toArray())),
				this.displacementMap &&
					this.displacementMap.isTexture &&
					((i.displacementMap = this.displacementMap.toJSON(e).uuid),
					(i.displacementScale = this.displacementScale),
					(i.displacementBias = this.displacementBias)),
				this.roughnessMap && this.roughnessMap.isTexture && (i.roughnessMap = this.roughnessMap.toJSON(e).uuid),
				this.metalnessMap && this.metalnessMap.isTexture && (i.metalnessMap = this.metalnessMap.toJSON(e).uuid),
				this.emissiveMap && this.emissiveMap.isTexture && (i.emissiveMap = this.emissiveMap.toJSON(e).uuid),
				this.specularMap && this.specularMap.isTexture && (i.specularMap = this.specularMap.toJSON(e).uuid),
				this.specularIntensityMap && this.specularIntensityMap.isTexture && (i.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid),
				this.specularColorMap && this.specularColorMap.isTexture && (i.specularColorMap = this.specularColorMap.toJSON(e).uuid),
				this.envMap && this.envMap.isTexture && ((i.envMap = this.envMap.toJSON(e).uuid), void 0 !== this.combine && (i.combine = this.combine)),
				void 0 !== this.envMapIntensity && (i.envMapIntensity = this.envMapIntensity),
				void 0 !== this.reflectivity && (i.reflectivity = this.reflectivity),
				void 0 !== this.refractionRatio && (i.refractionRatio = this.refractionRatio),
				this.gradientMap && this.gradientMap.isTexture && (i.gradientMap = this.gradientMap.toJSON(e).uuid),
				void 0 !== this.transmission && (i.transmission = this.transmission),
				this.transmissionMap && this.transmissionMap.isTexture && (i.transmissionMap = this.transmissionMap.toJSON(e).uuid),
				void 0 !== this.thickness && (i.thickness = this.thickness),
				this.thicknessMap && this.thicknessMap.isTexture && (i.thicknessMap = this.thicknessMap.toJSON(e).uuid),
				void 0 !== this.attenuationDistance && (i.attenuationDistance = this.attenuationDistance),
				void 0 !== this.attenuationColor && (i.attenuationColor = this.attenuationColor.getHex()),
				void 0 !== this.size && (i.size = this.size),
				null !== this.shadowSide && (i.shadowSide = this.shadowSide),
				void 0 !== this.sizeAttenuation && (i.sizeAttenuation = this.sizeAttenuation),
				1 !== this.blending && (i.blending = this.blending),
				0 !== this.side && (i.side = this.side),
				this.vertexColors && (i.vertexColors = !0),
				this.opacity < 1 && (i.opacity = this.opacity),
				this.format !== A && (i.format = this.format),
				!0 === this.transparent && (i.transparent = this.transparent),
				(i.depthFunc = this.depthFunc),
				(i.depthTest = this.depthTest),
				(i.depthWrite = this.depthWrite),
				(i.colorWrite = this.colorWrite),
				(i.stencilWrite = this.stencilWrite),
				(i.stencilWriteMask = this.stencilWriteMask),
				(i.stencilFunc = this.stencilFunc),
				(i.stencilRef = this.stencilRef),
				(i.stencilFuncMask = this.stencilFuncMask),
				(i.stencilFail = this.stencilFail),
				(i.stencilZFail = this.stencilZFail),
				(i.stencilZPass = this.stencilZPass),
				this.rotation && 0 !== this.rotation && (i.rotation = this.rotation),
				!0 === this.polygonOffset && (i.polygonOffset = !0),
				0 !== this.polygonOffsetFactor && (i.polygonOffsetFactor = this.polygonOffsetFactor),
				0 !== this.polygonOffsetUnits && (i.polygonOffsetUnits = this.polygonOffsetUnits),
				this.linewidth && 1 !== this.linewidth && (i.linewidth = this.linewidth),
				void 0 !== this.dashSize && (i.dashSize = this.dashSize),
				void 0 !== this.gapSize && (i.gapSize = this.gapSize),
				void 0 !== this.scale && (i.scale = this.scale),
				!0 === this.dithering && (i.dithering = !0),
				this.alphaTest > 0 && (i.alphaTest = this.alphaTest),
				!0 === this.alphaToCoverage && (i.alphaToCoverage = this.alphaToCoverage),
				!0 === this.premultipliedAlpha && (i.premultipliedAlpha = this.premultipliedAlpha),
				!0 === this.wireframe && (i.wireframe = this.wireframe),
				this.wireframeLinewidth > 1 && (i.wireframeLinewidth = this.wireframeLinewidth),
				'round' !== this.wireframeLinecap && (i.wireframeLinecap = this.wireframeLinecap),
				'round' !== this.wireframeLinejoin && (i.wireframeLinejoin = this.wireframeLinejoin),
				!0 === this.flatShading && (i.flatShading = this.flatShading),
				!1 === this.visible && (i.visible = !1),
				!1 === this.toneMapped && (i.toneMapped = !1),
				'{}' !== JSON.stringify(this.userData) && (i.userData = this.userData),
				t)
			) {
				const t = n(e.textures),
					r = n(e.images)
				t.length > 0 && (i.textures = t), r.length > 0 && (i.images = r)
			}
			return i
		}
		clone() {
			return new this.constructor().copy(this)
		}
		copy(e) {
			;(this.name = e.name),
				(this.fog = e.fog),
				(this.blending = e.blending),
				(this.side = e.side),
				(this.vertexColors = e.vertexColors),
				(this.opacity = e.opacity),
				(this.format = e.format),
				(this.transparent = e.transparent),
				(this.blendSrc = e.blendSrc),
				(this.blendDst = e.blendDst),
				(this.blendEquation = e.blendEquation),
				(this.blendSrcAlpha = e.blendSrcAlpha),
				(this.blendDstAlpha = e.blendDstAlpha),
				(this.blendEquationAlpha = e.blendEquationAlpha),
				(this.depthFunc = e.depthFunc),
				(this.depthTest = e.depthTest),
				(this.depthWrite = e.depthWrite),
				(this.stencilWriteMask = e.stencilWriteMask),
				(this.stencilFunc = e.stencilFunc),
				(this.stencilRef = e.stencilRef),
				(this.stencilFuncMask = e.stencilFuncMask),
				(this.stencilFail = e.stencilFail),
				(this.stencilZFail = e.stencilZFail),
				(this.stencilZPass = e.stencilZPass),
				(this.stencilWrite = e.stencilWrite)
			const t = e.clippingPlanes
			let i = null
			if (null !== t) {
				const e = t.length
				i = new Array(e)
				for (let n = 0; n !== e; ++n) i[n] = t[n].clone()
			}
			return (
				(this.clippingPlanes = i),
				(this.clipIntersection = e.clipIntersection),
				(this.clipShadows = e.clipShadows),
				(this.shadowSide = e.shadowSide),
				(this.colorWrite = e.colorWrite),
				(this.precision = e.precision),
				(this.polygonOffset = e.polygonOffset),
				(this.polygonOffsetFactor = e.polygonOffsetFactor),
				(this.polygonOffsetUnits = e.polygonOffsetUnits),
				(this.dithering = e.dithering),
				(this.alphaTest = e.alphaTest),
				(this.alphaToCoverage = e.alphaToCoverage),
				(this.premultipliedAlpha = e.premultipliedAlpha),
				(this.visible = e.visible),
				(this.toneMapped = e.toneMapped),
				(this.userData = JSON.parse(JSON.stringify(e.userData))),
				this
			)
		}
		dispose() {
			this.dispatchEvent({ type: 'dispose' })
		}
		set needsUpdate(e) {
			!0 === e && this.version++
		}
	}
	mt.prototype.isMaterial = !0
	const gt = {
			aliceblue: 15792383,
			antiquewhite: 16444375,
			aqua: 65535,
			aquamarine: 8388564,
			azure: 15794175,
			beige: 16119260,
			bisque: 16770244,
			black: 0,
			blanchedalmond: 16772045,
			blue: 255,
			blueviolet: 9055202,
			brown: 10824234,
			burlywood: 14596231,
			cadetblue: 6266528,
			chartreuse: 8388352,
			chocolate: 13789470,
			coral: 16744272,
			cornflowerblue: 6591981,
			cornsilk: 16775388,
			crimson: 14423100,
			cyan: 65535,
			darkblue: 139,
			darkcyan: 35723,
			darkgoldenrod: 12092939,
			darkgray: 11119017,
			darkgreen: 25600,
			darkgrey: 11119017,
			darkkhaki: 12433259,
			darkmagenta: 9109643,
			darkolivegreen: 5597999,
			darkorange: 16747520,
			darkorchid: 10040012,
			darkred: 9109504,
			darksalmon: 15308410,
			darkseagreen: 9419919,
			darkslateblue: 4734347,
			darkslategray: 3100495,
			darkslategrey: 3100495,
			darkturquoise: 52945,
			darkviolet: 9699539,
			deeppink: 16716947,
			deepskyblue: 49151,
			dimgray: 6908265,
			dimgrey: 6908265,
			dodgerblue: 2003199,
			firebrick: 11674146,
			floralwhite: 16775920,
			forestgreen: 2263842,
			fuchsia: 16711935,
			gainsboro: 14474460,
			ghostwhite: 16316671,
			gold: 16766720,
			goldenrod: 14329120,
			gray: 8421504,
			green: 32768,
			greenyellow: 11403055,
			grey: 8421504,
			honeydew: 15794160,
			hotpink: 16738740,
			indianred: 13458524,
			indigo: 4915330,
			ivory: 16777200,
			khaki: 15787660,
			lavender: 15132410,
			lavenderblush: 16773365,
			lawngreen: 8190976,
			lemonchiffon: 16775885,
			lightblue: 11393254,
			lightcoral: 15761536,
			lightcyan: 14745599,
			lightgoldenrodyellow: 16448210,
			lightgray: 13882323,
			lightgreen: 9498256,
			lightgrey: 13882323,
			lightpink: 16758465,
			lightsalmon: 16752762,
			lightseagreen: 2142890,
			lightskyblue: 8900346,
			lightslategray: 7833753,
			lightslategrey: 7833753,
			lightsteelblue: 11584734,
			lightyellow: 16777184,
			lime: 65280,
			limegreen: 3329330,
			linen: 16445670,
			magenta: 16711935,
			maroon: 8388608,
			mediumaquamarine: 6737322,
			mediumblue: 205,
			mediumorchid: 12211667,
			mediumpurple: 9662683,
			mediumseagreen: 3978097,
			mediumslateblue: 8087790,
			mediumspringgreen: 64154,
			mediumturquoise: 4772300,
			mediumvioletred: 13047173,
			midnightblue: 1644912,
			mintcream: 16121850,
			mistyrose: 16770273,
			moccasin: 16770229,
			navajowhite: 16768685,
			navy: 128,
			oldlace: 16643558,
			olive: 8421376,
			olivedrab: 7048739,
			orange: 16753920,
			orangered: 16729344,
			orchid: 14315734,
			palegoldenrod: 15657130,
			palegreen: 10025880,
			paleturquoise: 11529966,
			palevioletred: 14381203,
			papayawhip: 16773077,
			peachpuff: 16767673,
			peru: 13468991,
			pink: 16761035,
			plum: 14524637,
			powderblue: 11591910,
			purple: 8388736,
			rebeccapurple: 6697881,
			red: 16711680,
			rosybrown: 12357519,
			royalblue: 4286945,
			saddlebrown: 9127187,
			salmon: 16416882,
			sandybrown: 16032864,
			seagreen: 3050327,
			seashell: 16774638,
			sienna: 10506797,
			silver: 12632256,
			skyblue: 8900331,
			slateblue: 6970061,
			slategray: 7372944,
			slategrey: 7372944,
			snow: 16775930,
			springgreen: 65407,
			steelblue: 4620980,
			tan: 13808780,
			teal: 32896,
			thistle: 14204888,
			tomato: 16737095,
			turquoise: 4251856,
			violet: 15631086,
			wheat: 16113331,
			white: 16777215,
			whitesmoke: 16119285,
			yellow: 16776960,
			yellowgreen: 10145074,
		},
		xt = { h: 0, s: 0, l: 0 },
		_t = { h: 0, s: 0, l: 0 }
	function vt(e, t, i) {
		return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? e + 6 * (t - e) * i : i < 0.5 ? t : i < 2 / 3 ? e + 6 * (t - e) * (2 / 3 - i) : e
	}
	function yt(e) {
		return e < 0.04045 ? 0.0773993808 * e : Math.pow(0.9478672986 * e + 0.0521327014, 2.4)
	}
	function Mt(e) {
		return e < 0.0031308 ? 12.92 * e : 1.055 * Math.pow(e, 0.41666) - 0.055
	}
	class bt {
		constructor(e, t, i) {
			return void 0 === t && void 0 === i ? this.set(e) : this.setRGB(e, t, i)
		}
		set(e) {
			return e && e.isColor ? this.copy(e) : 'number' == typeof e ? this.setHex(e) : 'string' == typeof e && this.setStyle(e), this
		}
		setScalar(e) {
			return (this.r = e), (this.g = e), (this.b = e), this
		}
		setHex(e) {
			return (e = Math.floor(e)), (this.r = ((e >> 16) & 255) / 255), (this.g = ((e >> 8) & 255) / 255), (this.b = (255 & e) / 255), this
		}
		setRGB(e, t, i) {
			return (this.r = e), (this.g = t), (this.b = i), this
		}
		setHSL(e, t, i) {
			var n
			if (((e = ((e % (n = 1)) + n) % n), (t = O(t, 0, 1)), (i = O(i, 0, 1)), 0 === t)) this.r = this.g = this.b = i
			else {
				const n = i <= 0.5 ? i * (1 + t) : i + t - i * t,
					r = 2 * i - n
				;(this.r = vt(r, n, e + 1 / 3)), (this.g = vt(r, n, e)), (this.b = vt(r, n, e - 1 / 3))
			}
			return this
		}
		setStyle(e) {
			function t(t) {
				void 0 !== t && parseFloat(t) < 1 && console.warn('THREE.Color: Alpha component of ' + e + ' will be ignored.')
			}
			let i
			if ((i = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(e))) {
				let e
				const n = i[1],
					r = i[2]
				switch (n) {
					case 'rgb':
					case 'rgba':
						if ((e = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r)))
							return (
								(this.r = Math.min(255, parseInt(e[1], 10)) / 255),
								(this.g = Math.min(255, parseInt(e[2], 10)) / 255),
								(this.b = Math.min(255, parseInt(e[3], 10)) / 255),
								t(e[4]),
								this
							)
						if ((e = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r)))
							return (
								(this.r = Math.min(100, parseInt(e[1], 10)) / 100),
								(this.g = Math.min(100, parseInt(e[2], 10)) / 100),
								(this.b = Math.min(100, parseInt(e[3], 10)) / 100),
								t(e[4]),
								this
							)
						break
					case 'hsl':
					case 'hsla':
						if ((e = /^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))) {
							const i = parseFloat(e[1]) / 360,
								n = parseInt(e[2], 10) / 100,
								r = parseInt(e[3], 10) / 100
							return t(e[4]), this.setHSL(i, n, r)
						}
				}
			} else if ((i = /^\#([A-Fa-f\d]+)$/.exec(e))) {
				const e = i[1],
					t = e.length
				if (3 === t)
					return (
						(this.r = parseInt(e.charAt(0) + e.charAt(0), 16) / 255),
						(this.g = parseInt(e.charAt(1) + e.charAt(1), 16) / 255),
						(this.b = parseInt(e.charAt(2) + e.charAt(2), 16) / 255),
						this
					)
				if (6 === t)
					return (
						(this.r = parseInt(e.charAt(0) + e.charAt(1), 16) / 255),
						(this.g = parseInt(e.charAt(2) + e.charAt(3), 16) / 255),
						(this.b = parseInt(e.charAt(4) + e.charAt(5), 16) / 255),
						this
					)
			}
			return e && e.length > 0 ? this.setColorName(e) : this
		}
		setColorName(e) {
			const t = gt[e.toLowerCase()]
			return void 0 !== t ? this.setHex(t) : console.warn('THREE.Color: Unknown color ' + e), this
		}
		clone() {
			return new this.constructor(this.r, this.g, this.b)
		}
		copy(e) {
			return (this.r = e.r), (this.g = e.g), (this.b = e.b), this
		}
		copySRGBToLinear(e) {
			return (this.r = yt(e.r)), (this.g = yt(e.g)), (this.b = yt(e.b)), this
		}
		copyLinearToSRGB(e) {
			return (this.r = Mt(e.r)), (this.g = Mt(e.g)), (this.b = Mt(e.b)), this
		}
		convertSRGBToLinear() {
			return this.copySRGBToLinear(this), this
		}
		convertLinearToSRGB() {
			return this.copyLinearToSRGB(this), this
		}
		getHex() {
			return ((255 * this.r) << 16) ^ ((255 * this.g) << 8) ^ ((255 * this.b) << 0)
		}
		getHexString() {
			return ('000000' + this.getHex().toString(16)).slice(-6)
		}
		getHSL(e) {
			const t = this.r,
				i = this.g,
				n = this.b,
				r = Math.max(t, i, n),
				a = Math.min(t, i, n)
			let s, o
			const l = (a + r) / 2
			if (a === r) (s = 0), (o = 0)
			else {
				const e = r - a
				switch (((o = l <= 0.5 ? e / (r + a) : e / (2 - r - a)), r)) {
					case t:
						s = (i - n) / e + (i < n ? 6 : 0)
						break
					case i:
						s = (n - t) / e + 2
						break
					case n:
						s = (t - i) / e + 4
				}
				s /= 6
			}
			return (e.h = s), (e.s = o), (e.l = l), e
		}
		getStyle() {
			return 'rgb(' + ((255 * this.r) | 0) + ',' + ((255 * this.g) | 0) + ',' + ((255 * this.b) | 0) + ')'
		}
		offsetHSL(e, t, i) {
			return this.getHSL(xt), (xt.h += e), (xt.s += t), (xt.l += i), this.setHSL(xt.h, xt.s, xt.l), this
		}
		add(e) {
			return (this.r += e.r), (this.g += e.g), (this.b += e.b), this
		}
		addColors(e, t) {
			return (this.r = e.r + t.r), (this.g = e.g + t.g), (this.b = e.b + t.b), this
		}
		addScalar(e) {
			return (this.r += e), (this.g += e), (this.b += e), this
		}
		sub(e) {
			return (this.r = Math.max(0, this.r - e.r)), (this.g = Math.max(0, this.g - e.g)), (this.b = Math.max(0, this.b - e.b)), this
		}
		multiply(e) {
			return (this.r *= e.r), (this.g *= e.g), (this.b *= e.b), this
		}
		multiplyScalar(e) {
			return (this.r *= e), (this.g *= e), (this.b *= e), this
		}
		lerp(e, t) {
			return (this.r += (e.r - this.r) * t), (this.g += (e.g - this.g) * t), (this.b += (e.b - this.b) * t), this
		}
		lerpColors(e, t, i) {
			return (this.r = e.r + (t.r - e.r) * i), (this.g = e.g + (t.g - e.g) * i), (this.b = e.b + (t.b - e.b) * i), this
		}
		lerpHSL(e, t) {
			this.getHSL(xt), e.getHSL(_t)
			const i = B(xt.h, _t.h, t),
				n = B(xt.s, _t.s, t),
				r = B(xt.l, _t.l, t)
			return this.setHSL(i, n, r), this
		}
		equals(e) {
			return e.r === this.r && e.g === this.g && e.b === this.b
		}
		fromArray(e, t = 0) {
			return (this.r = e[t]), (this.g = e[t + 1]), (this.b = e[t + 2]), this
		}
		toArray(e = [], t = 0) {
			return (e[t] = this.r), (e[t + 1] = this.g), (e[t + 2] = this.b), e
		}
		fromBufferAttribute(e, t) {
			return (this.r = e.getX(t)), (this.g = e.getY(t)), (this.b = e.getZ(t)), !0 === e.normalized && ((this.r /= 255), (this.g /= 255), (this.b /= 255)), this
		}
		toJSON() {
			return this.getHex()
		}
	}
	;(bt.NAMES = gt), (bt.prototype.isColor = !0), (bt.prototype.r = 1), (bt.prototype.g = 1), (bt.prototype.b = 1)
	class St extends mt {
		constructor(e) {
			super(),
				(this.type = 'MeshBasicMaterial'),
				(this.color = new bt(16777215)),
				(this.map = null),
				(this.lightMap = null),
				(this.lightMapIntensity = 1),
				(this.aoMap = null),
				(this.aoMapIntensity = 1),
				(this.specularMap = null),
				(this.alphaMap = null),
				(this.envMap = null),
				(this.combine = 0),
				(this.reflectivity = 1),
				(this.refractionRatio = 0.98),
				(this.wireframe = !1),
				(this.wireframeLinewidth = 1),
				(this.wireframeLinecap = 'round'),
				(this.wireframeLinejoin = 'round'),
				this.setValues(e)
		}
		copy(e) {
			return (
				super.copy(e),
				this.color.copy(e.color),
				(this.map = e.map),
				(this.lightMap = e.lightMap),
				(this.lightMapIntensity = e.lightMapIntensity),
				(this.aoMap = e.aoMap),
				(this.aoMapIntensity = e.aoMapIntensity),
				(this.specularMap = e.specularMap),
				(this.alphaMap = e.alphaMap),
				(this.envMap = e.envMap),
				(this.combine = e.combine),
				(this.reflectivity = e.reflectivity),
				(this.refractionRatio = e.refractionRatio),
				(this.wireframe = e.wireframe),
				(this.wireframeLinewidth = e.wireframeLinewidth),
				(this.wireframeLinecap = e.wireframeLinecap),
				(this.wireframeLinejoin = e.wireframeLinejoin),
				this
			)
		}
	}
	St.prototype.isMeshBasicMaterial = !0
	const wt = new ee(),
		Tt = new H()
	class At {
		constructor(e, t, i) {
			if (Array.isArray(e)) throw new TypeError('THREE.BufferAttribute: array should be a Typed Array.')
			;(this.name = ''),
				(this.array = e),
				(this.itemSize = t),
				(this.count = void 0 !== e ? e.length / t : 0),
				(this.normalized = !0 === i),
				(this.usage = 35044),
				(this.updateRange = { offset: 0, count: -1 }),
				(this.version = 0)
		}
		onUploadCallback() {}
		set needsUpdate(e) {
			!0 === e && this.version++
		}
		setUsage(e) {
			return (this.usage = e), this
		}
		copy(e) {
			return (
				(this.name = e.name),
				(this.array = new e.array.constructor(e.array)),
				(this.itemSize = e.itemSize),
				(this.count = e.count),
				(this.normalized = e.normalized),
				(this.usage = e.usage),
				this
			)
		}
		copyAt(e, t, i) {
			;(e *= this.itemSize), (i *= t.itemSize)
			for (let n = 0, r = this.itemSize; n < r; n++) this.array[e + n] = t.array[i + n]
			return this
		}
		copyArray(e) {
			return this.array.set(e), this
		}
		copyColorsArray(e) {
			const t = this.array
			let i = 0
			for (let n = 0, r = e.length; n < r; n++) {
				let r = e[n]
				void 0 === r && (console.warn('THREE.BufferAttribute.copyColorsArray(): color is undefined', n), (r = new bt())),
					(t[i++] = r.r),
					(t[i++] = r.g),
					(t[i++] = r.b)
			}
			return this
		}
		copyVector2sArray(e) {
			const t = this.array
			let i = 0
			for (let n = 0, r = e.length; n < r; n++) {
				let r = e[n]
				void 0 === r && (console.warn('THREE.BufferAttribute.copyVector2sArray(): vector is undefined', n), (r = new H())), (t[i++] = r.x), (t[i++] = r.y)
			}
			return this
		}
		copyVector3sArray(e) {
			const t = this.array
			let i = 0
			for (let n = 0, r = e.length; n < r; n++) {
				let r = e[n]
				void 0 === r && (console.warn('THREE.BufferAttribute.copyVector3sArray(): vector is undefined', n), (r = new ee())),
					(t[i++] = r.x),
					(t[i++] = r.y),
					(t[i++] = r.z)
			}
			return this
		}
		copyVector4sArray(e) {
			const t = this.array
			let i = 0
			for (let n = 0, r = e.length; n < r; n++) {
				let r = e[n]
				void 0 === r && (console.warn('THREE.BufferAttribute.copyVector4sArray(): vector is undefined', n), (r = new Z())),
					(t[i++] = r.x),
					(t[i++] = r.y),
					(t[i++] = r.z),
					(t[i++] = r.w)
			}
			return this
		}
		applyMatrix3(e) {
			if (2 === this.itemSize) for (let t = 0, i = this.count; t < i; t++) Tt.fromBufferAttribute(this, t), Tt.applyMatrix3(e), this.setXY(t, Tt.x, Tt.y)
			else if (3 === this.itemSize)
				for (let t = 0, i = this.count; t < i; t++) wt.fromBufferAttribute(this, t), wt.applyMatrix3(e), this.setXYZ(t, wt.x, wt.y, wt.z)
			return this
		}
		applyMatrix4(e) {
			for (let t = 0, i = this.count; t < i; t++)
				(wt.x = this.getX(t)), (wt.y = this.getY(t)), (wt.z = this.getZ(t)), wt.applyMatrix4(e), this.setXYZ(t, wt.x, wt.y, wt.z)
			return this
		}
		applyNormalMatrix(e) {
			for (let t = 0, i = this.count; t < i; t++)
				(wt.x = this.getX(t)), (wt.y = this.getY(t)), (wt.z = this.getZ(t)), wt.applyNormalMatrix(e), this.setXYZ(t, wt.x, wt.y, wt.z)
			return this
		}
		transformDirection(e) {
			for (let t = 0, i = this.count; t < i; t++)
				(wt.x = this.getX(t)), (wt.y = this.getY(t)), (wt.z = this.getZ(t)), wt.transformDirection(e), this.setXYZ(t, wt.x, wt.y, wt.z)
			return this
		}
		set(e, t = 0) {
			return this.array.set(e, t), this
		}
		getX(e) {
			return this.array[e * this.itemSize]
		}
		setX(e, t) {
			return (this.array[e * this.itemSize] = t), this
		}
		getY(e) {
			return this.array[e * this.itemSize + 1]
		}
		setY(e, t) {
			return (this.array[e * this.itemSize + 1] = t), this
		}
		getZ(e) {
			return this.array[e * this.itemSize + 2]
		}
		setZ(e, t) {
			return (this.array[e * this.itemSize + 2] = t), this
		}
		getW(e) {
			return this.array[e * this.itemSize + 3]
		}
		setW(e, t) {
			return (this.array[e * this.itemSize + 3] = t), this
		}
		setXY(e, t, i) {
			return (e *= this.itemSize), (this.array[e + 0] = t), (this.array[e + 1] = i), this
		}
		setXYZ(e, t, i, n) {
			return (e *= this.itemSize), (this.array[e + 0] = t), (this.array[e + 1] = i), (this.array[e + 2] = n), this
		}
		setXYZW(e, t, i, n, r) {
			return (e *= this.itemSize), (this.array[e + 0] = t), (this.array[e + 1] = i), (this.array[e + 2] = n), (this.array[e + 3] = r), this
		}
		onUpload(e) {
			return (this.onUploadCallback = e), this
		}
		clone() {
			return new this.constructor(this.array, this.itemSize).copy(this)
		}
		toJSON() {
			const e = { itemSize: this.itemSize, type: this.array.constructor.name, array: Array.prototype.slice.call(this.array), normalized: this.normalized }
			return (
				'' !== this.name && (e.name = this.name),
				35044 !== this.usage && (e.usage = this.usage),
				(0 === this.updateRange.offset && -1 === this.updateRange.count) || (e.updateRange = this.updateRange),
				e
			)
		}
	}
	At.prototype.isBufferAttribute = !0
	class Et extends At {
		constructor(e, t, i) {
			super(new Uint16Array(e), t, i)
		}
	}
	class Lt extends At {
		constructor(e, t, i) {
			super(new Uint32Array(e), t, i)
		}
	}
	;(class extends At {
		constructor(e, t, i) {
			super(new Uint16Array(e), t, i)
		}
	}.prototype.isFloat16BufferAttribute = !0)
	class Pt extends At {
		constructor(e, t, i) {
			super(new Float32Array(e), t, i)
		}
	}
	let Ft = 0
	const Ct = new Ce(),
		Nt = new it(),
		Dt = new ee(),
		It = new ne(),
		Rt = new ne(),
		Ut = new ee()
	class zt extends D {
		constructor() {
			super(),
				Object.defineProperty(this, 'id', { value: Ft++ }),
				(this.uuid = z()),
				(this.name = ''),
				(this.type = 'BufferGeometry'),
				(this.index = null),
				(this.attributes = {}),
				(this.morphAttributes = {}),
				(this.morphTargetsRelative = !1),
				(this.groups = []),
				(this.boundingBox = null),
				(this.boundingSphere = null),
				(this.drawRange = { start: 0, count: 1 / 0 }),
				(this.userData = {})
		}
		getIndex() {
			return this.index
		}
		setIndex(e) {
			return Array.isArray(e) ? (this.index = new (W(e) > 65535 ? Lt : Et)(e, 1)) : (this.index = e), this
		}
		getAttribute(e) {
			return this.attributes[e]
		}
		setAttribute(e, t) {
			return (this.attributes[e] = t), this
		}
		deleteAttribute(e) {
			return delete this.attributes[e], this
		}
		hasAttribute(e) {
			return void 0 !== this.attributes[e]
		}
		addGroup(e, t, i = 0) {
			this.groups.push({ start: e, count: t, materialIndex: i })
		}
		clearGroups() {
			this.groups = []
		}
		setDrawRange(e, t) {
			;(this.drawRange.start = e), (this.drawRange.count = t)
		}
		applyMatrix4(e) {
			const t = this.attributes.position
			void 0 !== t && (t.applyMatrix4(e), (t.needsUpdate = !0))
			const i = this.attributes.normal
			if (void 0 !== i) {
				const t = new V().getNormalMatrix(e)
				i.applyNormalMatrix(t), (i.needsUpdate = !0)
			}
			const n = this.attributes.tangent
			return (
				void 0 !== n && (n.transformDirection(e), (n.needsUpdate = !0)),
				null !== this.boundingBox && this.computeBoundingBox(),
				null !== this.boundingSphere && this.computeBoundingSphere(),
				this
			)
		}
		applyQuaternion(e) {
			return Ct.makeRotationFromQuaternion(e), this.applyMatrix4(Ct), this
		}
		rotateX(e) {
			return Ct.makeRotationX(e), this.applyMatrix4(Ct), this
		}
		rotateY(e) {
			return Ct.makeRotationY(e), this.applyMatrix4(Ct), this
		}
		rotateZ(e) {
			return Ct.makeRotationZ(e), this.applyMatrix4(Ct), this
		}
		translate(e, t, i) {
			return Ct.makeTranslation(e, t, i), this.applyMatrix4(Ct), this
		}
		scale(e, t, i) {
			return Ct.makeScale(e, t, i), this.applyMatrix4(Ct), this
		}
		lookAt(e) {
			return Nt.lookAt(e), Nt.updateMatrix(), this.applyMatrix4(Nt.matrix), this
		}
		center() {
			return this.computeBoundingBox(), this.boundingBox.getCenter(Dt).negate(), this.translate(Dt.x, Dt.y, Dt.z), this
		}
		setFromPoints(e) {
			const t = []
			for (let i = 0, n = e.length; i < n; i++) {
				const n = e[i]
				t.push(n.x, n.y, n.z || 0)
			}
			return this.setAttribute('position', new Pt(t, 3)), this
		}
		computeBoundingBox() {
			null === this.boundingBox && (this.boundingBox = new ne())
			const e = this.attributes.position,
				t = this.morphAttributes.position
			if (e && e.isGLBufferAttribute)
				return (
					console.error(
						'THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',
						this
					),
					void this.boundingBox.set(new ee(-1 / 0, -1 / 0, -1 / 0), new ee(1 / 0, 1 / 0, 1 / 0))
				)
			if (void 0 !== e) {
				if ((this.boundingBox.setFromBufferAttribute(e), t))
					for (let e = 0, i = t.length; e < i; e++) {
						const i = t[e]
						It.setFromBufferAttribute(i),
							this.morphTargetsRelative
								? (Ut.addVectors(this.boundingBox.min, It.min),
								  this.boundingBox.expandByPoint(Ut),
								  Ut.addVectors(this.boundingBox.max, It.max),
								  this.boundingBox.expandByPoint(Ut))
								: (this.boundingBox.expandByPoint(It.min), this.boundingBox.expandByPoint(It.max))
					}
			} else this.boundingBox.makeEmpty()
			;(isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) &&
				console.error(
					'THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',
					this
				)
		}
		computeBoundingSphere() {
			null === this.boundingSphere && (this.boundingSphere = new be())
			const e = this.attributes.position,
				t = this.morphAttributes.position
			if (e && e.isGLBufferAttribute)
				return (
					console.error(
						'THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',
						this
					),
					void this.boundingSphere.set(new ee(), 1 / 0)
				)
			if (e) {
				const i = this.boundingSphere.center
				if ((It.setFromBufferAttribute(e), t))
					for (let e = 0, i = t.length; e < i; e++) {
						const i = t[e]
						Rt.setFromBufferAttribute(i),
							this.morphTargetsRelative
								? (Ut.addVectors(It.min, Rt.min), It.expandByPoint(Ut), Ut.addVectors(It.max, Rt.max), It.expandByPoint(Ut))
								: (It.expandByPoint(Rt.min), It.expandByPoint(Rt.max))
					}
				It.getCenter(i)
				let n = 0
				for (let t = 0, r = e.count; t < r; t++) Ut.fromBufferAttribute(e, t), (n = Math.max(n, i.distanceToSquared(Ut)))
				if (t)
					for (let r = 0, a = t.length; r < a; r++) {
						const a = t[r],
							s = this.morphTargetsRelative
						for (let t = 0, r = a.count; t < r; t++)
							Ut.fromBufferAttribute(a, t), s && (Dt.fromBufferAttribute(e, t), Ut.add(Dt)), (n = Math.max(n, i.distanceToSquared(Ut)))
					}
				;(this.boundingSphere.radius = Math.sqrt(n)),
					isNaN(this.boundingSphere.radius) &&
						console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this)
			}
		}
		computeTangents() {
			const e = this.index,
				t = this.attributes
			if (null === e || void 0 === t.position || void 0 === t.normal || void 0 === t.uv)
				return void console.error('THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)')
			const i = e.array,
				n = t.position.array,
				r = t.normal.array,
				a = t.uv.array,
				s = n.length / 3
			void 0 === t.tangent && this.setAttribute('tangent', new At(new Float32Array(4 * s), 4))
			const o = t.tangent.array,
				l = [],
				c = []
			for (let e = 0; e < s; e++) (l[e] = new ee()), (c[e] = new ee())
			const h = new ee(),
				d = new ee(),
				u = new ee(),
				p = new H(),
				f = new H(),
				m = new H(),
				g = new ee(),
				x = new ee()
			function _(e, t, i) {
				h.fromArray(n, 3 * e),
					d.fromArray(n, 3 * t),
					u.fromArray(n, 3 * i),
					p.fromArray(a, 2 * e),
					f.fromArray(a, 2 * t),
					m.fromArray(a, 2 * i),
					d.sub(h),
					u.sub(h),
					f.sub(p),
					m.sub(p)
				const r = 1 / (f.x * m.y - m.x * f.y)
				isFinite(r) &&
					(g.copy(d).multiplyScalar(m.y).addScaledVector(u, -f.y).multiplyScalar(r),
					x.copy(u).multiplyScalar(f.x).addScaledVector(d, -m.x).multiplyScalar(r),
					l[e].add(g),
					l[t].add(g),
					l[i].add(g),
					c[e].add(x),
					c[t].add(x),
					c[i].add(x))
			}
			let v = this.groups
			0 === v.length && (v = [{ start: 0, count: i.length }])
			for (let e = 0, t = v.length; e < t; ++e) {
				const t = v[e],
					n = t.start
				for (let e = n, r = n + t.count; e < r; e += 3) _(i[e + 0], i[e + 1], i[e + 2])
			}
			const y = new ee(),
				M = new ee(),
				b = new ee(),
				S = new ee()
			function w(e) {
				b.fromArray(r, 3 * e), S.copy(b)
				const t = l[e]
				y.copy(t), y.sub(b.multiplyScalar(b.dot(t))).normalize(), M.crossVectors(S, t)
				const i = M.dot(c[e]) < 0 ? -1 : 1
				;(o[4 * e] = y.x), (o[4 * e + 1] = y.y), (o[4 * e + 2] = y.z), (o[4 * e + 3] = i)
			}
			for (let e = 0, t = v.length; e < t; ++e) {
				const t = v[e],
					n = t.start
				for (let e = n, r = n + t.count; e < r; e += 3) w(i[e + 0]), w(i[e + 1]), w(i[e + 2])
			}
		}
		computeVertexNormals() {
			const e = this.index,
				t = this.getAttribute('position')
			if (void 0 !== t) {
				let i = this.getAttribute('normal')
				if (void 0 === i) (i = new At(new Float32Array(3 * t.count), 3)), this.setAttribute('normal', i)
				else for (let e = 0, t = i.count; e < t; e++) i.setXYZ(e, 0, 0, 0)
				const n = new ee(),
					r = new ee(),
					a = new ee(),
					s = new ee(),
					o = new ee(),
					l = new ee(),
					c = new ee(),
					h = new ee()
				if (e)
					for (let d = 0, u = e.count; d < u; d += 3) {
						const u = e.getX(d + 0),
							p = e.getX(d + 1),
							f = e.getX(d + 2)
						n.fromBufferAttribute(t, u),
							r.fromBufferAttribute(t, p),
							a.fromBufferAttribute(t, f),
							c.subVectors(a, r),
							h.subVectors(n, r),
							c.cross(h),
							s.fromBufferAttribute(i, u),
							o.fromBufferAttribute(i, p),
							l.fromBufferAttribute(i, f),
							s.add(c),
							o.add(c),
							l.add(c),
							i.setXYZ(u, s.x, s.y, s.z),
							i.setXYZ(p, o.x, o.y, o.z),
							i.setXYZ(f, l.x, l.y, l.z)
					}
				else
					for (let e = 0, s = t.count; e < s; e += 3)
						n.fromBufferAttribute(t, e + 0),
							r.fromBufferAttribute(t, e + 1),
							a.fromBufferAttribute(t, e + 2),
							c.subVectors(a, r),
							h.subVectors(n, r),
							c.cross(h),
							i.setXYZ(e + 0, c.x, c.y, c.z),
							i.setXYZ(e + 1, c.x, c.y, c.z),
							i.setXYZ(e + 2, c.x, c.y, c.z)
				this.normalizeNormals(), (i.needsUpdate = !0)
			}
		}
		merge(e, t) {
			if (!e || !e.isBufferGeometry) return void console.error('THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.', e)
			void 0 === t &&
				((t = 0),
				console.warn(
					'THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge.'
				))
			const i = this.attributes
			for (const n in i) {
				if (void 0 === e.attributes[n]) continue
				const r = i[n].array,
					a = e.attributes[n],
					s = a.array,
					o = a.itemSize * t,
					l = Math.min(s.length, r.length - o)
				for (let e = 0, t = o; e < l; e++, t++) r[t] = s[e]
			}
			return this
		}
		normalizeNormals() {
			const e = this.attributes.normal
			for (let t = 0, i = e.count; t < i; t++) Ut.fromBufferAttribute(e, t), Ut.normalize(), e.setXYZ(t, Ut.x, Ut.y, Ut.z)
		}
		toNonIndexed() {
			function e(e, t) {
				const i = e.array,
					n = e.itemSize,
					r = e.normalized,
					a = new i.constructor(t.length * n)
				let s = 0,
					o = 0
				for (let r = 0, l = t.length; r < l; r++) {
					s = e.isInterleavedBufferAttribute ? t[r] * e.data.stride + e.offset : t[r] * n
					for (let e = 0; e < n; e++) a[o++] = i[s++]
				}
				return new At(a, n, r)
			}
			if (null === this.index) return console.warn('THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.'), this
			const t = new zt(),
				i = this.index.array,
				n = this.attributes
			for (const r in n) {
				const a = e(n[r], i)
				t.setAttribute(r, a)
			}
			const r = this.morphAttributes
			for (const n in r) {
				const a = [],
					s = r[n]
				for (let t = 0, n = s.length; t < n; t++) {
					const n = e(s[t], i)
					a.push(n)
				}
				t.morphAttributes[n] = a
			}
			t.morphTargetsRelative = this.morphTargetsRelative
			const a = this.groups
			for (let e = 0, i = a.length; e < i; e++) {
				const i = a[e]
				t.addGroup(i.start, i.count, i.materialIndex)
			}
			return t
		}
		toJSON() {
			const e = { metadata: { version: 4.5, type: 'BufferGeometry', generator: 'BufferGeometry.toJSON' } }
			if (
				((e.uuid = this.uuid),
				(e.type = this.type),
				'' !== this.name && (e.name = this.name),
				Object.keys(this.userData).length > 0 && (e.userData = this.userData),
				void 0 !== this.parameters)
			) {
				const t = this.parameters
				for (const i in t) void 0 !== t[i] && (e[i] = t[i])
				return e
			}
			e.data = { attributes: {} }
			const t = this.index
			null !== t && (e.data.index = { type: t.array.constructor.name, array: Array.prototype.slice.call(t.array) })
			const i = this.attributes
			for (const t in i) {
				const n = i[t]
				e.data.attributes[t] = n.toJSON(e.data)
			}
			const n = {}
			let r = !1
			for (const t in this.morphAttributes) {
				const i = this.morphAttributes[t],
					a = []
				for (let t = 0, n = i.length; t < n; t++) {
					const n = i[t]
					a.push(n.toJSON(e.data))
				}
				a.length > 0 && ((n[t] = a), (r = !0))
			}
			r && ((e.data.morphAttributes = n), (e.data.morphTargetsRelative = this.morphTargetsRelative))
			const a = this.groups
			a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)))
			const s = this.boundingSphere
			return null !== s && (e.data.boundingSphere = { center: s.center.toArray(), radius: s.radius }), e
		}
		clone() {
			return new this.constructor().copy(this)
		}
		copy(e) {
			;(this.index = null), (this.attributes = {}), (this.morphAttributes = {}), (this.groups = []), (this.boundingBox = null), (this.boundingSphere = null)
			const t = {}
			this.name = e.name
			const i = e.index
			null !== i && this.setIndex(i.clone(t))
			const n = e.attributes
			for (const e in n) {
				const i = n[e]
				this.setAttribute(e, i.clone(t))
			}
			const r = e.morphAttributes
			for (const e in r) {
				const i = [],
					n = r[e]
				for (let e = 0, r = n.length; e < r; e++) i.push(n[e].clone(t))
				this.morphAttributes[e] = i
			}
			this.morphTargetsRelative = e.morphTargetsRelative
			const a = e.groups
			for (let e = 0, t = a.length; e < t; e++) {
				const t = a[e]
				this.addGroup(t.start, t.count, t.materialIndex)
			}
			const s = e.boundingBox
			null !== s && (this.boundingBox = s.clone())
			const o = e.boundingSphere
			return (
				null !== o && (this.boundingSphere = o.clone()),
				(this.drawRange.start = e.drawRange.start),
				(this.drawRange.count = e.drawRange.count),
				(this.userData = e.userData),
				void 0 !== e.parameters && (this.parameters = Object.assign({}, e.parameters)),
				this
			)
		}
		dispose() {
			this.dispatchEvent({ type: 'dispose' })
		}
	}
	zt.prototype.isBufferGeometry = !0
	const Ot = new Ce(),
		Bt = new Fe(),
		kt = new be(),
		Gt = new ee(),
		Ht = new ee(),
		Vt = new ee(),
		Wt = new ee(),
		Xt = new ee(),
		Yt = new ee(),
		jt = new ee(),
		Qt = new ee(),
		qt = new ee(),
		Zt = new H(),
		Jt = new H(),
		Kt = new H(),
		$t = new ee(),
		ei = new ee()
	class ti extends it {
		constructor(e = new zt(), t = new St()) {
			super(), (this.type = 'Mesh'), (this.geometry = e), (this.material = t), this.updateMorphTargets()
		}
		copy(e) {
			return (
				super.copy(e),
				void 0 !== e.morphTargetInfluences && (this.morphTargetInfluences = e.morphTargetInfluences.slice()),
				void 0 !== e.morphTargetDictionary && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)),
				(this.material = e.material),
				(this.geometry = e.geometry),
				this
			)
		}
		updateMorphTargets() {
			const e = this.geometry
			if (e.isBufferGeometry) {
				const t = e.morphAttributes,
					i = Object.keys(t)
				if (i.length > 0) {
					const e = t[i[0]]
					if (void 0 !== e) {
						;(this.morphTargetInfluences = []), (this.morphTargetDictionary = {})
						for (let t = 0, i = e.length; t < i; t++) {
							const i = e[t].name || String(t)
							this.morphTargetInfluences.push(0), (this.morphTargetDictionary[i] = t)
						}
					}
				}
			} else {
				const t = e.morphTargets
				void 0 !== t && t.length > 0 && console.error('THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.')
			}
		}
		raycast(e, t) {
			const i = this.geometry,
				n = this.material,
				r = this.matrixWorld
			if (void 0 === n) return
			if ((null === i.boundingSphere && i.computeBoundingSphere(), kt.copy(i.boundingSphere), kt.applyMatrix4(r), !1 === e.ray.intersectsSphere(kt))) return
			if ((Ot.copy(r).invert(), Bt.copy(e.ray).applyMatrix4(Ot), null !== i.boundingBox && !1 === Bt.intersectsBox(i.boundingBox))) return
			let a
			if (i.isBufferGeometry) {
				const r = i.index,
					s = i.attributes.position,
					o = i.morphAttributes.position,
					l = i.morphTargetsRelative,
					c = i.attributes.uv,
					h = i.attributes.uv2,
					d = i.groups,
					u = i.drawRange
				if (null !== r)
					if (Array.isArray(n))
						for (let i = 0, p = d.length; i < p; i++) {
							const p = d[i],
								f = n[p.materialIndex]
							for (let i = Math.max(p.start, u.start), n = Math.min(r.count, Math.min(p.start + p.count, u.start + u.count)); i < n; i += 3) {
								const n = r.getX(i),
									d = r.getX(i + 1),
									u = r.getX(i + 2)
								;(a = ii(this, f, e, Bt, s, o, l, c, h, n, d, u)), a && ((a.faceIndex = Math.floor(i / 3)), (a.face.materialIndex = p.materialIndex), t.push(a))
							}
						}
					else {
						for (let i = Math.max(0, u.start), d = Math.min(r.count, u.start + u.count); i < d; i += 3) {
							const d = r.getX(i),
								u = r.getX(i + 1),
								p = r.getX(i + 2)
							;(a = ii(this, n, e, Bt, s, o, l, c, h, d, u, p)), a && ((a.faceIndex = Math.floor(i / 3)), t.push(a))
						}
					}
				else if (void 0 !== s)
					if (Array.isArray(n))
						for (let i = 0, r = d.length; i < r; i++) {
							const r = d[i],
								p = n[r.materialIndex]
							for (let i = Math.max(r.start, u.start), n = Math.min(s.count, Math.min(r.start + r.count, u.start + u.count)); i < n; i += 3) {
								;(a = ii(this, p, e, Bt, s, o, l, c, h, i, i + 1, i + 2)),
									a && ((a.faceIndex = Math.floor(i / 3)), (a.face.materialIndex = r.materialIndex), t.push(a))
							}
						}
					else {
						for (let i = Math.max(0, u.start), r = Math.min(s.count, u.start + u.count); i < r; i += 3) {
							;(a = ii(this, n, e, Bt, s, o, l, c, h, i, i + 1, i + 2)), a && ((a.faceIndex = Math.floor(i / 3)), t.push(a))
						}
					}
			} else i.isGeometry && console.error('THREE.Mesh.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.')
		}
	}
	function ii(e, t, i, n, r, a, s, o, l, c, h, d) {
		Gt.fromBufferAttribute(r, c), Ht.fromBufferAttribute(r, h), Vt.fromBufferAttribute(r, d)
		const u = e.morphTargetInfluences
		if (a && u) {
			jt.set(0, 0, 0), Qt.set(0, 0, 0), qt.set(0, 0, 0)
			for (let e = 0, t = a.length; e < t; e++) {
				const t = u[e],
					i = a[e]
				0 !== t &&
					(Wt.fromBufferAttribute(i, c),
					Xt.fromBufferAttribute(i, h),
					Yt.fromBufferAttribute(i, d),
					s
						? (jt.addScaledVector(Wt, t), Qt.addScaledVector(Xt, t), qt.addScaledVector(Yt, t))
						: (jt.addScaledVector(Wt.sub(Gt), t), Qt.addScaledVector(Xt.sub(Ht), t), qt.addScaledVector(Yt.sub(Vt), t)))
			}
			Gt.add(jt), Ht.add(Qt), Vt.add(qt)
		}
		e.isSkinnedMesh && (e.boneTransform(c, Gt), e.boneTransform(h, Ht), e.boneTransform(d, Vt))
		const p = (function (e, t, i, n, r, a, s, o) {
			let l
			if (((l = 1 === t.side ? n.intersectTriangle(s, a, r, !0, o) : n.intersectTriangle(r, a, s, 2 !== t.side, o)), null === l)) return null
			ei.copy(o), ei.applyMatrix4(e.matrixWorld)
			const c = i.ray.origin.distanceTo(ei)
			return c < i.near || c > i.far ? null : { distance: c, point: ei.clone(), object: e }
		})(e, t, i, n, Gt, Ht, Vt, $t)
		if (p) {
			o && (Zt.fromBufferAttribute(o, c), Jt.fromBufferAttribute(o, h), Kt.fromBufferAttribute(o, d), (p.uv = pt.getUV($t, Gt, Ht, Vt, Zt, Jt, Kt, new H()))),
				l && (Zt.fromBufferAttribute(l, c), Jt.fromBufferAttribute(l, h), Kt.fromBufferAttribute(l, d), (p.uv2 = pt.getUV($t, Gt, Ht, Vt, Zt, Jt, Kt, new H())))
			const e = { a: c, b: h, c: d, normal: new ee(), materialIndex: 0 }
			pt.getNormal(Gt, Ht, Vt, e.normal), (p.face = e)
		}
		return p
	}
	ti.prototype.isMesh = !0
	class ni extends zt {
		constructor(e = 1, t = 1, i = 1, n = 1, r = 1, a = 1) {
			super(), (this.type = 'BoxGeometry'), (this.parameters = { width: e, height: t, depth: i, widthSegments: n, heightSegments: r, depthSegments: a })
			const s = this
			;(n = Math.floor(n)), (r = Math.floor(r)), (a = Math.floor(a))
			const o = [],
				l = [],
				c = [],
				h = []
			let d = 0,
				u = 0
			function p(e, t, i, n, r, a, p, f, m, g, x) {
				const _ = a / m,
					v = p / g,
					y = a / 2,
					M = p / 2,
					b = f / 2,
					S = m + 1,
					w = g + 1
				let T = 0,
					A = 0
				const E = new ee()
				for (let a = 0; a < w; a++) {
					const s = a * v - M
					for (let o = 0; o < S; o++) {
						const d = o * _ - y
						;(E[e] = d * n),
							(E[t] = s * r),
							(E[i] = b),
							l.push(E.x, E.y, E.z),
							(E[e] = 0),
							(E[t] = 0),
							(E[i] = f > 0 ? 1 : -1),
							c.push(E.x, E.y, E.z),
							h.push(o / m),
							h.push(1 - a / g),
							(T += 1)
					}
				}
				for (let e = 0; e < g; e++)
					for (let t = 0; t < m; t++) {
						const i = d + t + S * e,
							n = d + t + S * (e + 1),
							r = d + (t + 1) + S * (e + 1),
							a = d + (t + 1) + S * e
						o.push(i, n, a), o.push(n, r, a), (A += 6)
					}
				s.addGroup(u, A, x), (u += A), (d += T)
			}
			p('z', 'y', 'x', -1, -1, i, t, e, a, r, 0),
				p('z', 'y', 'x', 1, -1, i, t, -e, a, r, 1),
				p('x', 'z', 'y', 1, 1, e, i, t, n, a, 2),
				p('x', 'z', 'y', 1, -1, e, i, -t, n, a, 3),
				p('x', 'y', 'z', 1, -1, e, t, i, n, r, 4),
				p('x', 'y', 'z', -1, -1, e, t, -i, n, r, 5),
				this.setIndex(o),
				this.setAttribute('position', new Pt(l, 3)),
				this.setAttribute('normal', new Pt(c, 3)),
				this.setAttribute('uv', new Pt(h, 2))
		}
		static fromJSON(e) {
			return new ni(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments)
		}
	}
	function ri(e) {
		const t = {}
		for (const i in e) {
			t[i] = {}
			for (const n in e[i]) {
				const r = e[i][n]
				r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture || r.isQuaternion)
					? (t[i][n] = r.clone())
					: Array.isArray(r)
					? (t[i][n] = r.slice())
					: (t[i][n] = r)
			}
		}
		return t
	}
	function ai(e) {
		const t = {}
		for (let i = 0; i < e.length; i++) {
			const n = ri(e[i])
			for (const e in n) t[e] = n[e]
		}
		return t
	}
	const si = { clone: ri, merge: ai }
	class oi extends mt {
		constructor(e) {
			super(),
				(this.type = 'ShaderMaterial'),
				(this.defines = {}),
				(this.uniforms = {}),
				(this.vertexShader = 'void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}'),
				(this.fragmentShader = 'void main(){gl_FragColor=vec4(1.0,0.0,0.0,1.0);}'),
				(this.linewidth = 1),
				(this.wireframe = !1),
				(this.wireframeLinewidth = 1),
				(this.fog = !1),
				(this.lights = !1),
				(this.clipping = !1),
				(this.extensions = { derivatives: !1, fragDepth: !1, drawBuffers: !1, shaderTextureLOD: !1 }),
				(this.defaultAttributeValues = { color: [1, 1, 1], uv: [0, 0], uv2: [0, 0] }),
				(this.index0AttributeName = void 0),
				(this.uniformsNeedUpdate = !1),
				(this.glslVersion = null),
				void 0 !== e &&
					(void 0 !== e.attributes && console.error('THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead.'),
					this.setValues(e))
		}
		copy(e) {
			return (
				super.copy(e),
				(this.fragmentShader = e.fragmentShader),
				(this.vertexShader = e.vertexShader),
				(this.uniforms = ri(e.uniforms)),
				(this.defines = Object.assign({}, e.defines)),
				(this.wireframe = e.wireframe),
				(this.wireframeLinewidth = e.wireframeLinewidth),
				(this.lights = e.lights),
				(this.clipping = e.clipping),
				(this.extensions = Object.assign({}, e.extensions)),
				(this.glslVersion = e.glslVersion),
				this
			)
		}
		toJSON(e) {
			const t = super.toJSON(e)
			;(t.glslVersion = this.glslVersion), (t.uniforms = {})
			for (const i in this.uniforms) {
				const n = this.uniforms[i].value
				n && n.isTexture
					? (t.uniforms[i] = { type: 't', value: n.toJSON(e).uuid })
					: n && n.isColor
					? (t.uniforms[i] = { type: 'c', value: n.getHex() })
					: n && n.isVector2
					? (t.uniforms[i] = { type: 'v2', value: n.toArray() })
					: n && n.isVector3
					? (t.uniforms[i] = { type: 'v3', value: n.toArray() })
					: n && n.isVector4
					? (t.uniforms[i] = { type: 'v4', value: n.toArray() })
					: n && n.isMatrix3
					? (t.uniforms[i] = { type: 'm3', value: n.toArray() })
					: n && n.isMatrix4
					? (t.uniforms[i] = { type: 'm4', value: n.toArray() })
					: (t.uniforms[i] = { value: n })
			}
			Object.keys(this.defines).length > 0 && (t.defines = this.defines), (t.vertexShader = this.vertexShader), (t.fragmentShader = this.fragmentShader)
			const i = {}
			for (const e in this.extensions) !0 === this.extensions[e] && (i[e] = !0)
			return Object.keys(i).length > 0 && (t.extensions = i), t
		}
	}
	oi.prototype.isShaderMaterial = !0
	class li extends it {
		constructor() {
			super(), (this.type = 'Camera'), (this.matrixWorldInverse = new Ce()), (this.projectionMatrix = new Ce()), (this.projectionMatrixInverse = new Ce())
		}
		copy(e, t) {
			return (
				super.copy(e, t),
				this.matrixWorldInverse.copy(e.matrixWorldInverse),
				this.projectionMatrix.copy(e.projectionMatrix),
				this.projectionMatrixInverse.copy(e.projectionMatrixInverse),
				this
			)
		}
		getWorldDirection(e) {
			this.updateWorldMatrix(!0, !1)
			const t = this.matrixWorld.elements
			return e.set(-t[8], -t[9], -t[10]).normalize()
		}
		updateMatrixWorld(e) {
			super.updateMatrixWorld(e), this.matrixWorldInverse.copy(this.matrixWorld).invert()
		}
		updateWorldMatrix(e, t) {
			super.updateWorldMatrix(e, t), this.matrixWorldInverse.copy(this.matrixWorld).invert()
		}
		clone() {
			return new this.constructor().copy(this)
		}
	}
	li.prototype.isCamera = !0
	class ci extends li {
		constructor(e = 50, t = 1, i = 0.1, n = 2e3) {
			super(),
				(this.type = 'PerspectiveCamera'),
				(this.fov = e),
				(this.zoom = 1),
				(this.near = i),
				(this.far = n),
				(this.focus = 10),
				(this.aspect = t),
				(this.view = null),
				(this.filmGauge = 35),
				(this.filmOffset = 0),
				this.updateProjectionMatrix()
		}
		copy(e, t) {
			return (
				super.copy(e, t),
				(this.fov = e.fov),
				(this.zoom = e.zoom),
				(this.near = e.near),
				(this.far = e.far),
				(this.focus = e.focus),
				(this.aspect = e.aspect),
				(this.view = null === e.view ? null : Object.assign({}, e.view)),
				(this.filmGauge = e.filmGauge),
				(this.filmOffset = e.filmOffset),
				this
			)
		}
		setFocalLength(e) {
			const t = (0.5 * this.getFilmHeight()) / e
			;(this.fov = 2 * U * Math.atan(t)), this.updateProjectionMatrix()
		}
		getFocalLength() {
			const e = Math.tan(0.5 * R * this.fov)
			return (0.5 * this.getFilmHeight()) / e
		}
		getEffectiveFOV() {
			return 2 * U * Math.atan(Math.tan(0.5 * R * this.fov) / this.zoom)
		}
		getFilmWidth() {
			return this.filmGauge * Math.min(this.aspect, 1)
		}
		getFilmHeight() {
			return this.filmGauge / Math.max(this.aspect, 1)
		}
		setViewOffset(e, t, i, n, r, a) {
			;(this.aspect = e / t),
				null === this.view && (this.view = { enabled: !0, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }),
				(this.view.enabled = !0),
				(this.view.fullWidth = e),
				(this.view.fullHeight = t),
				(this.view.offsetX = i),
				(this.view.offsetY = n),
				(this.view.width = r),
				(this.view.height = a),
				this.updateProjectionMatrix()
		}
		clearViewOffset() {
			null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix()
		}
		updateProjectionMatrix() {
			const e = this.near
			let t = (e * Math.tan(0.5 * R * this.fov)) / this.zoom,
				i = 2 * t,
				n = this.aspect * i,
				r = -0.5 * n
			const a = this.view
			if (null !== this.view && this.view.enabled) {
				const e = a.fullWidth,
					s = a.fullHeight
				;(r += (a.offsetX * n) / e), (t -= (a.offsetY * i) / s), (n *= a.width / e), (i *= a.height / s)
			}
			const s = this.filmOffset
			0 !== s && (r += (e * s) / this.getFilmWidth()),
				this.projectionMatrix.makePerspective(r, r + n, t, t - i, e, this.far),
				this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
		}
		toJSON(e) {
			const t = super.toJSON(e)
			return (
				(t.object.fov = this.fov),
				(t.object.zoom = this.zoom),
				(t.object.near = this.near),
				(t.object.far = this.far),
				(t.object.focus = this.focus),
				(t.object.aspect = this.aspect),
				null !== this.view && (t.object.view = Object.assign({}, this.view)),
				(t.object.filmGauge = this.filmGauge),
				(t.object.filmOffset = this.filmOffset),
				t
			)
		}
	}
	ci.prototype.isPerspectiveCamera = !0
	const hi = 90
	class di extends it {
		constructor(e, t, i) {
			if ((super(), (this.type = 'CubeCamera'), !0 !== i.isWebGLCubeRenderTarget))
				return void console.error('THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.')
			this.renderTarget = i
			const n = new ci(hi, 1, e, t)
			;(n.layers = this.layers), n.up.set(0, -1, 0), n.lookAt(new ee(1, 0, 0)), this.add(n)
			const r = new ci(hi, 1, e, t)
			;(r.layers = this.layers), r.up.set(0, -1, 0), r.lookAt(new ee(-1, 0, 0)), this.add(r)
			const a = new ci(hi, 1, e, t)
			;(a.layers = this.layers), a.up.set(0, 0, 1), a.lookAt(new ee(0, 1, 0)), this.add(a)
			const s = new ci(hi, 1, e, t)
			;(s.layers = this.layers), s.up.set(0, 0, -1), s.lookAt(new ee(0, -1, 0)), this.add(s)
			const o = new ci(hi, 1, e, t)
			;(o.layers = this.layers), o.up.set(0, -1, 0), o.lookAt(new ee(0, 0, 1)), this.add(o)
			const l = new ci(hi, 1, e, t)
			;(l.layers = this.layers), l.up.set(0, -1, 0), l.lookAt(new ee(0, 0, -1)), this.add(l)
		}
		update(e, t) {
			null === this.parent && this.updateMatrixWorld()
			const i = this.renderTarget,
				[n, r, a, s, o, l] = this.children,
				c = e.xr.enabled,
				h = e.getRenderTarget()
			e.xr.enabled = !1
			const d = i.texture.generateMipmaps
			;(i.texture.generateMipmaps = !1),
				e.setRenderTarget(i, 0),
				e.render(t, n),
				e.setRenderTarget(i, 1),
				e.render(t, r),
				e.setRenderTarget(i, 2),
				e.render(t, a),
				e.setRenderTarget(i, 3),
				e.render(t, s),
				e.setRenderTarget(i, 4),
				e.render(t, o),
				(i.texture.generateMipmaps = d),
				e.setRenderTarget(i, 5),
				e.render(t, l),
				e.setRenderTarget(h),
				(e.xr.enabled = c)
		}
	}
	class ui extends Q {
		constructor(e, t, i, n, r, a, s, o, l, h) {
			super((e = void 0 !== e ? e : []), (t = void 0 !== t ? t : c), i, n, r, a, s, o, l, h), (this.flipY = !1)
		}
		get images() {
			return this.image
		}
		set images(e) {
			this.image = e
		}
	}
	ui.prototype.isCubeTexture = !0
	class pi extends J {
		constructor(e, t, i) {
			Number.isInteger(t) && (console.warn('THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )'), (t = i)),
				super(e, e, t),
				(t = t || {}),
				(this.texture = new ui(void 0, t.mapping, t.wrapS, t.wrapT, t.magFilter, t.minFilter, t.format, t.type, t.anisotropy, t.encoding)),
				(this.texture.isRenderTargetTexture = !0),
				(this.texture.generateMipmaps = void 0 !== t.generateMipmaps && t.generateMipmaps),
				(this.texture.minFilter = void 0 !== t.minFilter ? t.minFilter : x),
				(this.texture._needsFlipEnvMap = !1)
		}
		fromEquirectangularTexture(e, t) {
			;(this.texture.type = t.type),
				(this.texture.format = A),
				(this.texture.encoding = t.encoding),
				(this.texture.generateMipmaps = t.generateMipmaps),
				(this.texture.minFilter = t.minFilter),
				(this.texture.magFilter = t.magFilter)
			const i = {
					uniforms: { tEquirect: { value: null } },
					vertexShader:
						'varying vec3 vWorldDirection;vec3 transformDirection(in vec3 dir,in mat4 matrix){return normalize((matrix*vec4(dir,0.0)).xyz);}void main(){vWorldDirection=transformDirection(position,modelMatrix);\n#include <begin_vertex>\n#include <project_vertex>\n}',
					fragmentShader:
						'uniform sampler2D tEquirect;varying vec3 vWorldDirection;\n#include <common>\nvoid main(){vec3 direction=normalize(vWorldDirection);vec2 sampleUV=equirectUv(direction);gl_FragColor=texture2D(tEquirect,sampleUV);}',
				},
				n = new ni(5, 5, 5),
				r = new oi({
					name: 'CubemapFromEquirect',
					uniforms: ri(i.uniforms),
					vertexShader: i.vertexShader,
					fragmentShader: i.fragmentShader,
					side: 1,
					blending: 0,
				})
			r.uniforms.tEquirect.value = t
			const a = new ti(n, r),
				s = t.minFilter
			t.minFilter === _ && (t.minFilter = x)
			return new di(1, 10, this).update(e, a), (t.minFilter = s), a.geometry.dispose(), a.material.dispose(), this
		}
		clear(e, t, i, n) {
			const r = e.getRenderTarget()
			for (let r = 0; r < 6; r++) e.setRenderTarget(this, r), e.clear(t, i, n)
			e.setRenderTarget(r)
		}
	}
	pi.prototype.isWebGLCubeRenderTarget = !0
	const fi = new ee(),
		mi = new ee(),
		gi = new V()
	class xi {
		constructor(e = new ee(1, 0, 0), t = 0) {
			;(this.normal = e), (this.constant = t)
		}
		set(e, t) {
			return this.normal.copy(e), (this.constant = t), this
		}
		setComponents(e, t, i, n) {
			return this.normal.set(e, t, i), (this.constant = n), this
		}
		setFromNormalAndCoplanarPoint(e, t) {
			return this.normal.copy(e), (this.constant = -t.dot(this.normal)), this
		}
		setFromCoplanarPoints(e, t, i) {
			const n = fi.subVectors(i, t).cross(mi.subVectors(e, t)).normalize()
			return this.setFromNormalAndCoplanarPoint(n, e), this
		}
		copy(e) {
			return this.normal.copy(e.normal), (this.constant = e.constant), this
		}
		normalize() {
			const e = 1 / this.normal.length()
			return this.normal.multiplyScalar(e), (this.constant *= e), this
		}
		negate() {
			return (this.constant *= -1), this.normal.negate(), this
		}
		distanceToPoint(e) {
			return this.normal.dot(e) + this.constant
		}
		distanceToSphere(e) {
			return this.distanceToPoint(e.center) - e.radius
		}
		projectPoint(e, t) {
			return t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)
		}
		intersectLine(e, t) {
			const i = e.delta(fi),
				n = this.normal.dot(i)
			if (0 === n) return 0 === this.distanceToPoint(e.start) ? t.copy(e.start) : null
			const r = -(e.start.dot(this.normal) + this.constant) / n
			return r < 0 || r > 1 ? null : t.copy(i).multiplyScalar(r).add(e.start)
		}
		intersectsLine(e) {
			const t = this.distanceToPoint(e.start),
				i = this.distanceToPoint(e.end)
			return (t < 0 && i > 0) || (i < 0 && t > 0)
		}
		intersectsBox(e) {
			return e.intersectsPlane(this)
		}
		intersectsSphere(e) {
			return e.intersectsPlane(this)
		}
		coplanarPoint(e) {
			return e.copy(this.normal).multiplyScalar(-this.constant)
		}
		applyMatrix4(e, t) {
			const i = t || gi.getNormalMatrix(e),
				n = this.coplanarPoint(fi).applyMatrix4(e),
				r = this.normal.applyMatrix3(i).normalize()
			return (this.constant = -n.dot(r)), this
		}
		translate(e) {
			return (this.constant -= e.dot(this.normal)), this
		}
		equals(e) {
			return e.normal.equals(this.normal) && e.constant === this.constant
		}
		clone() {
			return new this.constructor().copy(this)
		}
	}
	xi.prototype.isPlane = !0
	const _i = new be(),
		vi = new ee()
	class yi {
		constructor(e = new xi(), t = new xi(), i = new xi(), n = new xi(), r = new xi(), a = new xi()) {
			this.planes = [e, t, i, n, r, a]
		}
		set(e, t, i, n, r, a) {
			const s = this.planes
			return s[0].copy(e), s[1].copy(t), s[2].copy(i), s[3].copy(n), s[4].copy(r), s[5].copy(a), this
		}
		copy(e) {
			const t = this.planes
			for (let i = 0; i < 6; i++) t[i].copy(e.planes[i])
			return this
		}
		setFromProjectionMatrix(e) {
			const t = this.planes,
				i = e.elements,
				n = i[0],
				r = i[1],
				a = i[2],
				s = i[3],
				o = i[4],
				l = i[5],
				c = i[6],
				h = i[7],
				d = i[8],
				u = i[9],
				p = i[10],
				f = i[11],
				m = i[12],
				g = i[13],
				x = i[14],
				_ = i[15]
			return (
				t[0].setComponents(s - n, h - o, f - d, _ - m).normalize(),
				t[1].setComponents(s + n, h + o, f + d, _ + m).normalize(),
				t[2].setComponents(s + r, h + l, f + u, _ + g).normalize(),
				t[3].setComponents(s - r, h - l, f - u, _ - g).normalize(),
				t[4].setComponents(s - a, h - c, f - p, _ - x).normalize(),
				t[5].setComponents(s + a, h + c, f + p, _ + x).normalize(),
				this
			)
		}
		intersectsObject(e) {
			const t = e.geometry
			return null === t.boundingSphere && t.computeBoundingSphere(), _i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld), this.intersectsSphere(_i)
		}
		intersectsSprite(e) {
			return _i.center.set(0, 0, 0), (_i.radius = 0.7071067811865476), _i.applyMatrix4(e.matrixWorld), this.intersectsSphere(_i)
		}
		intersectsSphere(e) {
			const t = this.planes,
				i = e.center,
				n = -e.radius
			for (let e = 0; e < 6; e++) {
				if (t[e].distanceToPoint(i) < n) return !1
			}
			return !0
		}
		intersectsBox(e) {
			const t = this.planes
			for (let i = 0; i < 6; i++) {
				const n = t[i]
				if (
					((vi.x = n.normal.x > 0 ? e.max.x : e.min.x),
					(vi.y = n.normal.y > 0 ? e.max.y : e.min.y),
					(vi.z = n.normal.z > 0 ? e.max.z : e.min.z),
					n.distanceToPoint(vi) < 0)
				)
					return !1
			}
			return !0
		}
		containsPoint(e) {
			const t = this.planes
			for (let i = 0; i < 6; i++) if (t[i].distanceToPoint(e) < 0) return !1
			return !0
		}
		clone() {
			return new this.constructor().copy(this)
		}
	}
	function Mi() {
		let e = null,
			t = !1,
			i = null,
			n = null
		function r(t, a) {
			i(t, a), (n = e.requestAnimationFrame(r))
		}
		return {
			start: function () {
				!0 !== t && null !== i && ((n = e.requestAnimationFrame(r)), (t = !0))
			},
			stop: function () {
				e.cancelAnimationFrame(n), (t = !1)
			},
			setAnimationLoop: function (e) {
				i = e
			},
			setContext: function (t) {
				e = t
			},
		}
	}
	function bi(e, t) {
		const i = t.isWebGL2,
			n = new WeakMap()
		return {
			get: function (e) {
				return e.isInterleavedBufferAttribute && (e = e.data), n.get(e)
			},
			remove: function (t) {
				t.isInterleavedBufferAttribute && (t = t.data)
				const i = n.get(t)
				i && (e.deleteBuffer(i.buffer), n.delete(t))
			},
			update: function (t, r) {
				if (t.isGLBufferAttribute) {
					const e = n.get(t)
					return void ((!e || e.version < t.version) && n.set(t, { buffer: t.buffer, type: t.type, bytesPerElement: t.elementSize, version: t.version }))
				}
				t.isInterleavedBufferAttribute && (t = t.data)
				const a = n.get(t)
				void 0 === a
					? n.set(
							t,
							(function (t, n) {
								const r = t.array,
									a = t.usage,
									s = e.createBuffer()
								e.bindBuffer(n, s), e.bufferData(n, r, a), t.onUploadCallback()
								let o = 5126
								return (
									r instanceof Float32Array
										? (o = 5126)
										: r instanceof Float64Array
										? console.warn('THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.')
										: r instanceof Uint16Array
										? t.isFloat16BufferAttribute
											? i
												? (o = 5131)
												: console.warn('THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.')
											: (o = 5123)
										: r instanceof Int16Array
										? (o = 5122)
										: r instanceof Uint32Array
										? (o = 5125)
										: r instanceof Int32Array
										? (o = 5124)
										: r instanceof Int8Array
										? (o = 5120)
										: (r instanceof Uint8Array || r instanceof Uint8ClampedArray) && (o = 5121),
									{ buffer: s, type: o, bytesPerElement: r.BYTES_PER_ELEMENT, version: t.version }
								)
							})(t, r)
					  )
					: a.version < t.version &&
					  (!(function (t, n, r) {
							const a = n.array,
								s = n.updateRange
							e.bindBuffer(r, t),
								-1 === s.count
									? e.bufferSubData(r, 0, a)
									: (i
											? e.bufferSubData(r, s.offset * a.BYTES_PER_ELEMENT, a, s.offset, s.count)
											: e.bufferSubData(r, s.offset * a.BYTES_PER_ELEMENT, a.subarray(s.offset, s.offset + s.count)),
									  (s.count = -1))
					  })(a.buffer, t, r),
					  (a.version = t.version))
			},
		}
	}
	class Si extends zt {
		constructor(e = 1, t = 1, i = 1, n = 1) {
			super(), (this.type = 'PlaneGeometry'), (this.parameters = { width: e, height: t, widthSegments: i, heightSegments: n })
			const r = e / 2,
				a = t / 2,
				s = Math.floor(i),
				o = Math.floor(n),
				l = s + 1,
				c = o + 1,
				h = e / s,
				d = t / o,
				u = [],
				p = [],
				f = [],
				m = []
			for (let e = 0; e < c; e++) {
				const t = e * d - a
				for (let i = 0; i < l; i++) {
					const n = i * h - r
					p.push(n, -t, 0), f.push(0, 0, 1), m.push(i / s), m.push(1 - e / o)
				}
			}
			for (let e = 0; e < o; e++)
				for (let t = 0; t < s; t++) {
					const i = t + l * e,
						n = t + l * (e + 1),
						r = t + 1 + l * (e + 1),
						a = t + 1 + l * e
					u.push(i, n, a), u.push(n, r, a)
				}
			this.setIndex(u), this.setAttribute('position', new Pt(p, 3)), this.setAttribute('normal', new Pt(f, 3)), this.setAttribute('uv', new Pt(m, 2))
		}
		static fromJSON(e) {
			return new Si(e.width, e.height, e.widthSegments, e.heightSegments)
		}
	}
	const wi = {
			alphamap_fragment: '#ifdef USE_ALPHAMAP\ndiffuseColor.a*=texture2D(alphaMap,vUv).g;\n#endif',
			alphamap_pars_fragment: '#ifdef USE_ALPHAMAP\nuniform sampler2D alphaMap;\n#endif',
			alphatest_fragment: '#ifdef USE_ALPHATEST\nif(diffuseColor.a<alphaTest)discard;\n#endif',
			alphatest_pars_fragment: '#ifdef USE_ALPHATEST\nuniform float alphaTest;\n#endif',
			aomap_fragment:
				'#ifdef USE_AOMAP\nfloat ambientOcclusion=(texture2D(aoMap,vUv2).r-1.0)*aoMapIntensity+1.0;reflectedLight.indirectDiffuse*=ambientOcclusion;\n#if defined(USE_ENVMAP)&&defined(STANDARD)\nfloat dotNV=saturate(dot(geometry.normal,geometry.viewDir));reflectedLight.indirectSpecular*=computeSpecularOcclusion(dotNV,ambientOcclusion,material.roughness);\n#endif\n#endif',
			aomap_pars_fragment: '#ifdef USE_AOMAP\nuniform sampler2D aoMap;uniform float aoMapIntensity;\n#endif',
			begin_vertex: 'vec3 transformed=vec3(position);',
			beginnormal_vertex: 'vec3 objectNormal=vec3(normal);\n#ifdef USE_TANGENT\nvec3 objectTangent=vec3(tangent.xyz);\n#endif',
			bsdfs:
				'vec3 BRDF_Lambert(const in vec3 diffuseColor){return RECIPROCAL_PI*diffuseColor;}vec3 F_Schlick(const in vec3 f0,const in float f90,const in float dotVH){float fresnel=exp2((-5.55473*dotVH-6.98316)*dotVH);return f0*(1.0-fresnel)+(f90*fresnel);}float V_GGX_SmithCorrelated(const in float alpha,const in float dotNL,const in float dotNV){float a2=pow2(alpha);float gv=dotNL*sqrt(a2+(1.0-a2)*pow2(dotNV));float gl=dotNV*sqrt(a2+(1.0-a2)*pow2(dotNL));return 0.5/max(gv+gl,EPSILON);}float D_GGX(const in float alpha,const in float dotNH){float a2=pow2(alpha);float denom=pow2(dotNH)*(a2-1.0)+1.0;return RECIPROCAL_PI*a2/pow2(denom);}vec3 BRDF_GGX(const in vec3 lightDir,const in vec3 viewDir,const in vec3 normal,const in vec3 f0,const in float f90,const in float roughness){float alpha=pow2(roughness);vec3 halfDir=normalize(lightDir+viewDir);float dotNL=saturate(dot(normal,lightDir));float dotNV=saturate(dot(normal,viewDir));float dotNH=saturate(dot(normal,halfDir));float dotVH=saturate(dot(viewDir,halfDir));vec3 F=F_Schlick(f0,f90,dotVH);float V=V_GGX_SmithCorrelated(alpha,dotNL,dotNV);float D=D_GGX(alpha,dotNH);return F*(V*D);}vec2 LTC_Uv(const in vec3 N,const in vec3 V,const in float roughness){const float LUT_SIZE=64.0;const float LUT_SCALE=(LUT_SIZE-1.0)/LUT_SIZE;const float LUT_BIAS=0.5/LUT_SIZE;float dotNV=saturate(dot(N,V));vec2 uv=vec2(roughness,sqrt(1.0-dotNV));uv=uv*LUT_SCALE+LUT_BIAS;return uv;}float LTC_ClippedSphereFormFactor(const in vec3 f){float l=length(f);return max((l*l+f.z)/(l+1.0),0.0);}vec3 LTC_EdgeVectorFormFactor(const in vec3 v1,const in vec3 v2){float x=dot(v1,v2);float y=abs(x);float a=0.8543985+(0.4965155+0.0145206*y)*y;float b=3.4175940+(4.1616724+y)*y;float v=a/b;float theta_sintheta=(x>0.0)?v:0.5*inversesqrt(max(1.0-x*x,1e-7))-v;return cross(v1,v2)*theta_sintheta;}vec3 LTC_Evaluate(const in vec3 N,const in vec3 V,const in vec3 P,const in mat3 mInv,const in vec3 rectCoords[4]){vec3 v1=rectCoords[1]-rectCoords[0];vec3 v2=rectCoords[3]-rectCoords[0];vec3 lightNormal=cross(v1,v2);if(dot(lightNormal,P-rectCoords[0])<0.0)return vec3(0.0);vec3 T1,T2;T1=normalize(V-N*dot(V,N));T2=-cross(N,T1);mat3 mat=mInv*transposeMat3(mat3(T1,T2,N));vec3 coords[4];coords[0]=mat*(rectCoords[0]-P);coords[1]=mat*(rectCoords[1]-P);coords[2]=mat*(rectCoords[2]-P);coords[3]=mat*(rectCoords[3]-P);coords[0]=normalize(coords[0]);coords[1]=normalize(coords[1]);coords[2]=normalize(coords[2]);coords[3]=normalize(coords[3]);vec3 vectorFormFactor=vec3(0.0);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[0],coords[1]);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[1],coords[2]);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[2],coords[3]);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[3],coords[0]);float result=LTC_ClippedSphereFormFactor(vectorFormFactor);return vec3(result);}float G_BlinnPhong_Implicit(){return 0.25;}float D_BlinnPhong(const in float shininess,const in float dotNH){return RECIPROCAL_PI*(shininess*0.5+1.0)*pow(dotNH,shininess);}vec3 BRDF_BlinnPhong(const in vec3 lightDir,const in vec3 viewDir,const in vec3 normal,const in vec3 specularColor,const in float shininess){vec3 halfDir=normalize(lightDir+viewDir);float dotNH=saturate(dot(normal,halfDir));float dotVH=saturate(dot(viewDir,halfDir));vec3 F=F_Schlick(specularColor,1.0,dotVH);float G=G_BlinnPhong_Implicit();float D=D_BlinnPhong(shininess,dotNH);return F*(G*D);}\n#if defined(USE_SHEEN)\nfloat D_Charlie(float roughness,float dotNH){float alpha=pow2(roughness);float invAlpha=1.0/alpha;float cos2h=dotNH*dotNH;float sin2h=max(1.0-cos2h,0.0078125);return(2.0+invAlpha)*pow(sin2h,invAlpha*0.5)/(2.0*PI);}float V_Neubelt(float dotNV,float dotNL){return saturate(1.0/(4.0*(dotNL+dotNV-dotNL*dotNV)));}vec3 BRDF_Sheen(const in vec3 lightDir,const in vec3 viewDir,const in vec3 normal,vec3 sheenColor,const in float sheenRoughness){vec3 halfDir=normalize(lightDir+viewDir);float dotNL=saturate(dot(normal,lightDir));float dotNV=saturate(dot(normal,viewDir));float dotNH=saturate(dot(normal,halfDir));float D=D_Charlie(sheenRoughness,dotNH);float V=V_Neubelt(dotNV,dotNL);return sheenColor*(D*V);}\n#endif',
			bumpmap_pars_fragment:
				'#ifdef USE_BUMPMAP\nuniform sampler2D bumpMap;uniform float bumpScale;vec2 dHdxy_fwd(){vec2 dSTdx=dFdx(vUv);vec2 dSTdy=dFdy(vUv);float Hll=bumpScale*texture2D(bumpMap,vUv).x;float dBx=bumpScale*texture2D(bumpMap,vUv+dSTdx).x-Hll;float dBy=bumpScale*texture2D(bumpMap,vUv+dSTdy).x-Hll;return vec2(dBx,dBy);}vec3 perturbNormalArb(vec3 surf_pos,vec3 surf_norm,vec2 dHdxy,float faceDirection){vec3 vSigmaX=vec3(dFdx(surf_pos.x),dFdx(surf_pos.y),dFdx(surf_pos.z));vec3 vSigmaY=vec3(dFdy(surf_pos.x),dFdy(surf_pos.y),dFdy(surf_pos.z));vec3 vN=surf_norm;vec3 R1=cross(vSigmaY,vN);vec3 R2=cross(vN,vSigmaX);float fDet=dot(vSigmaX,R1)*faceDirection;vec3 vGrad=sign(fDet)*(dHdxy.x*R1+dHdxy.y*R2);return normalize(abs(fDet)*surf_norm-vGrad);}\n#endif',
			clipping_planes_fragment:
				'#if NUM_CLIPPING_PLANES>0\nvec4 plane;\n#pragma unroll_loop_start\nfor(int i=0;i<UNION_CLIPPING_PLANES;i++){plane=clippingPlanes[i];if(dot(vClipPosition,plane.xyz)>plane.w)discard;}\n#pragma unroll_loop_end\n#if UNION_CLIPPING_PLANES<NUM_CLIPPING_PLANES\nbool clipped=true;\n#pragma unroll_loop_start\nfor(int i=UNION_CLIPPING_PLANES;i<NUM_CLIPPING_PLANES;i++){plane=clippingPlanes[i];clipped=(dot(vClipPosition,plane.xyz)>plane.w)&&clipped;}\n#pragma unroll_loop_end\nif(clipped)discard;\n#endif\n#endif',
			clipping_planes_pars_fragment: '#if NUM_CLIPPING_PLANES>0\nvarying vec3 vClipPosition;uniform vec4 clippingPlanes[NUM_CLIPPING_PLANES];\n#endif',
			clipping_planes_pars_vertex: '#if NUM_CLIPPING_PLANES>0\nvarying vec3 vClipPosition;\n#endif',
			clipping_planes_vertex: '#if NUM_CLIPPING_PLANES>0\nvClipPosition=-mvPosition.xyz;\n#endif',
			color_fragment: '#if defined(USE_COLOR_ALPHA)\ndiffuseColor*=vColor;\n#elif defined(USE_COLOR)\ndiffuseColor.rgb*=vColor;\n#endif',
			color_pars_fragment: '#if defined(USE_COLOR_ALPHA)\nvarying vec4 vColor;\n#elif defined(USE_COLOR)\nvarying vec3 vColor;\n#endif',
			color_pars_vertex:
				'#if defined(USE_COLOR_ALPHA)\nvarying vec4 vColor;\n#elif defined(USE_COLOR)||defined(USE_INSTANCING_COLOR)\nvarying vec3 vColor;\n#endif',
			color_vertex:
				'#if defined(USE_COLOR_ALPHA)\nvColor=vec4(1.0);\n#elif defined(USE_COLOR)||defined(USE_INSTANCING_COLOR)\nvColor=vec3(1.0);\n#endif\n#ifdef USE_COLOR\nvColor*=color;\n#endif\n#ifdef USE_INSTANCING_COLOR\nvColor.xyz*=instanceColor.xyz;\n#endif',
			common:
				'#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate(a)clamp(a,0.0,1.0)\n#endif\n#define whiteComplement(a)(1.0-saturate(a))\nfloat pow2(const in float x){return x*x;}float pow3(const in float x){return x*x*x;}float pow4(const in float x){float x2=x*x;return x2*x2;}float max3(const in vec3 v){return max(max(v.x,v.y),v.z);}float average(const in vec3 color){return dot(color,vec3(0.3333));}highp float rand(const in vec2 uv){const highp float a=12.9898,b=78.233,c=43758.5453;highp float dt=dot(uv.xy,vec2(a,b)),sn=mod(dt,PI);return fract(sin(sn)*c);}\n#ifdef HIGH_PRECISION\nfloat precisionSafeLength(vec3 v){return length(v);}\n#else\nfloat precisionSafeLength(vec3 v){float maxComponent=max3(abs(v));return length(v/maxComponent)*maxComponent;}\n#endif\nstruct IncidentLight{vec3 color;vec3 direction;bool visible;};struct ReflectedLight{vec3 directDiffuse;vec3 directSpecular;vec3 indirectDiffuse;vec3 indirectSpecular;};struct GeometricContext{vec3 position;vec3 normal;vec3 viewDir;\n#ifdef USE_CLEARCOAT\nvec3 clearcoatNormal;\n#endif\n};vec3 transformDirection(in vec3 dir,in mat4 matrix){return normalize((matrix*vec4(dir,0.0)).xyz);}vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}mat3 transposeMat3(const in mat3 m){mat3 tmp;tmp[0]=vec3(m[0].x,m[1].x,m[2].x);tmp[1]=vec3(m[0].y,m[1].y,m[2].y);tmp[2]=vec3(m[0].z,m[1].z,m[2].z);return tmp;}float linearToRelativeLuminance(const in vec3 color){vec3 weights=vec3(0.2126,0.7152,0.0722);return dot(weights,color.rgb);}bool isPerspectiveMatrix(mat4 m){return m[2][3]==-1.0;}vec2 equirectUv(in vec3 dir){float u=atan(dir.z,dir.x)*RECIPROCAL_PI2+0.5;float v=asin(clamp(dir.y,-1.0,1.0))*RECIPROCAL_PI+0.5;return vec2(u,v);}',
			cube_uv_reflection_fragment:
				'#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_maxMipLevel 8.0\n#define cubeUV_minMipLevel 4.0\n#define cubeUV_maxTileSize 256.0\n#define cubeUV_minTileSize 16.0\nfloat getFace(vec3 direction){vec3 absDirection=abs(direction);float face=-1.0;if(absDirection.x>absDirection.z){if(absDirection.x>absDirection.y)face=direction.x>0.0?0.0:3.0;else face=direction.y>0.0?1.0:4.0;}else{if(absDirection.z>absDirection.y)face=direction.z>0.0?2.0:5.0;else face=direction.y>0.0?1.0:4.0;}return face;}vec2 getUV(vec3 direction,float face){vec2 uv;if(face==0.0){uv=vec2(direction.z,direction.y)/abs(direction.x);}else if(face==1.0){uv=vec2(-direction.x,-direction.z)/abs(direction.y);}else if(face==2.0){uv=vec2(-direction.x,direction.y)/abs(direction.z);}else if(face==3.0){uv=vec2(-direction.z,direction.y)/abs(direction.x);}else if(face==4.0){uv=vec2(-direction.x,direction.z)/abs(direction.y);}else{uv=vec2(direction.x,direction.y)/abs(direction.z);}return 0.5*(uv+1.0);}vec3 bilinearCubeUV(sampler2D envMap,vec3 direction,float mipInt){float face=getFace(direction);float filterInt=max(cubeUV_minMipLevel-mipInt,0.0);mipInt=max(mipInt,cubeUV_minMipLevel);float faceSize=exp2(mipInt);float texelSize=1.0/(3.0*cubeUV_maxTileSize);vec2 uv=getUV(direction,face)*(faceSize-1.0)+0.5;if(face>2.0){uv.y+=faceSize;face-=3.0;}uv.x+=face*faceSize;if(mipInt<cubeUV_maxMipLevel){uv.y+=2.0*cubeUV_maxTileSize;}uv.y+=filterInt*2.0*cubeUV_minTileSize;uv.x+=3.0*max(0.0,cubeUV_maxTileSize-2.0*faceSize);uv*=texelSize;return texture2D(envMap,uv).rgb;}\n#define r0 1.0\n#define v0 0.339\n#define m0-2.0\n#define r1 0.8\n#define v1 0.276\n#define m1-1.0\n#define r4 0.4\n#define v4 0.046\n#define m4 2.0\n#define r5 0.305\n#define v5 0.016\n#define m5 3.0\n#define r6 0.21\n#define v6 0.0038\n#define m6 4.0\nfloat roughnessToMip(float roughness){float mip=0.0;if(roughness>=r1){mip=(r0-roughness)*(m1-m0)/(r0-r1)+m0;}else if(roughness>=r4){mip=(r1-roughness)*(m4-m1)/(r1-r4)+m1;}else if(roughness>=r5){mip=(r4-roughness)*(m5-m4)/(r4-r5)+m4;}else if(roughness>=r6){mip=(r5-roughness)*(m6-m5)/(r5-r6)+m5;}else{mip=-2.0*log2(1.16*roughness);}return mip;}vec4 textureCubeUV(sampler2D envMap,vec3 sampleDir,float roughness){float mip=clamp(roughnessToMip(roughness),m0,cubeUV_maxMipLevel);float mipF=fract(mip);float mipInt=floor(mip);vec3 color0=bilinearCubeUV(envMap,sampleDir,mipInt);if(mipF==0.0){return vec4(color0,1.0);}else{vec3 color1=bilinearCubeUV(envMap,sampleDir,mipInt+1.0);return vec4(mix(color0,color1,mipF),1.0);}}\n#endif',
			defaultnormal_vertex:
				'vec3 transformedNormal=objectNormal;\n#ifdef USE_INSTANCING\nmat3 m=mat3(instanceMatrix);transformedNormal/=vec3(dot(m[0],m[0]),dot(m[1],m[1]),dot(m[2],m[2]));transformedNormal=m*transformedNormal;\n#endif\ntransformedNormal=normalMatrix*transformedNormal;\n#ifdef FLIP_SIDED\ntransformedNormal=-transformedNormal;\n#endif\n#ifdef USE_TANGENT\nvec3 transformedTangent=(modelViewMatrix*vec4(objectTangent,0.0)).xyz;\n#ifdef FLIP_SIDED\ntransformedTangent=-transformedTangent;\n#endif\n#endif',
			displacementmap_pars_vertex:
				'#ifdef USE_DISPLACEMENTMAP\nuniform sampler2D displacementMap;uniform float displacementScale;uniform float displacementBias;\n#endif',
			displacementmap_vertex:
				'#ifdef USE_DISPLACEMENTMAP\ntransformed+=normalize(objectNormal)*(texture2D(displacementMap,vUv).x*displacementScale+displacementBias);\n#endif',
			emissivemap_fragment:
				'#ifdef USE_EMISSIVEMAP\nvec4 emissiveColor=texture2D(emissiveMap,vUv);emissiveColor.rgb=emissiveMapTexelToLinear(emissiveColor).rgb;totalEmissiveRadiance*=emissiveColor.rgb;\n#endif',
			emissivemap_pars_fragment: '#ifdef USE_EMISSIVEMAP\nuniform sampler2D emissiveMap;\n#endif',
			encodings_fragment: 'gl_FragColor=linearToOutputTexel(gl_FragColor);',
			encodings_pars_fragment:
				'vec4 LinearToLinear(in vec4 value){return value;}vec4 sRGBToLinear(in vec4 value){return vec4(mix(pow(value.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),value.rgb*0.0773993808,vec3(lessThanEqual(value.rgb,vec3(0.04045)))),value.a);}vec4 LinearTosRGB(in vec4 value){return vec4(mix(pow(value.rgb,vec3(0.41666))*1.055-vec3(0.055),value.rgb*12.92,vec3(lessThanEqual(value.rgb,vec3(0.0031308)))),value.a);}',
			envmap_fragment:
				'#ifdef USE_ENVMAP\n#ifdef ENV_WORLDPOS\nvec3 cameraToFrag;if(isOrthographic){cameraToFrag=normalize(vec3(-viewMatrix[0][2],-viewMatrix[1][2],-viewMatrix[2][2]));}else{cameraToFrag=normalize(vWorldPosition-cameraPosition);}vec3 worldNormal=inverseTransformDirection(normal,viewMatrix);\n#ifdef ENVMAP_MODE_REFLECTION\nvec3 reflectVec=reflect(cameraToFrag,worldNormal);\n#else\nvec3 reflectVec=refract(cameraToFrag,worldNormal,refractionRatio);\n#endif\n#else\nvec3 reflectVec=vReflect;\n#endif\n#ifdef ENVMAP_TYPE_CUBE\nvec4 envColor=textureCube(envMap,vec3(flipEnvMap*reflectVec.x,reflectVec.yz));envColor=envMapTexelToLinear(envColor);\n#elif defined(ENVMAP_TYPE_CUBE_UV)\nvec4 envColor=textureCubeUV(envMap,reflectVec,0.0);\n#else\nvec4 envColor=vec4(0.0);\n#endif\n#ifdef ENVMAP_BLENDING_MULTIPLY\noutgoingLight=mix(outgoingLight,outgoingLight*envColor.xyz,specularStrength*reflectivity);\n#elif defined(ENVMAP_BLENDING_MIX)\noutgoingLight=mix(outgoingLight,envColor.xyz,specularStrength*reflectivity);\n#elif defined(ENVMAP_BLENDING_ADD)\noutgoingLight+=envColor.xyz*specularStrength*reflectivity;\n#endif\n#endif',
			envmap_common_pars_fragment:
				'#ifdef USE_ENVMAP\nuniform float envMapIntensity;uniform float flipEnvMap;\n#ifdef ENVMAP_TYPE_CUBE\nuniform samplerCube envMap;\n#else\nuniform sampler2D envMap;\n#endif\n#endif',
			envmap_pars_fragment:
				'#ifdef USE_ENVMAP\nuniform float reflectivity;\n#if defined(USE_BUMPMAP)||defined(USE_NORMALMAP)||defined(PHONG)\n#define ENV_WORLDPOS\n#endif\n#ifdef ENV_WORLDPOS\nvarying vec3 vWorldPosition;uniform float refractionRatio;\n#else\nvarying vec3 vReflect;\n#endif\n#endif',
			envmap_pars_vertex:
				'#ifdef USE_ENVMAP\n#if defined(USE_BUMPMAP)||defined(USE_NORMALMAP)||defined(PHONG)\n#define ENV_WORLDPOS\n#endif\n#ifdef ENV_WORLDPOS\nvarying vec3 vWorldPosition;\n#else\nvarying vec3 vReflect;uniform float refractionRatio;\n#endif\n#endif',
			envmap_physical_pars_fragment:
				'#if defined(USE_ENVMAP)\n#ifdef ENVMAP_MODE_REFRACTION\nuniform float refractionRatio;\n#endif\nvec3 getIBLIrradiance(const in vec3 normal){\n#if defined(ENVMAP_TYPE_CUBE_UV)\nvec3 worldNormal=inverseTransformDirection(normal,viewMatrix);vec4 envMapColor=textureCubeUV(envMap,worldNormal,1.0);return PI*envMapColor.rgb*envMapIntensity;\n#else\nreturn vec3(0.0);\n#endif\n}vec3 getIBLRadiance(const in vec3 viewDir,const in vec3 normal,const in float roughness){\n#if defined(ENVMAP_TYPE_CUBE_UV)\nvec3 reflectVec;\n#ifdef ENVMAP_MODE_REFLECTION\nreflectVec=reflect(-viewDir,normal);reflectVec=normalize(mix(reflectVec,normal,roughness*roughness));\n#else\nreflectVec=refract(-viewDir,normal,refractionRatio);\n#endif\nreflectVec=inverseTransformDirection(reflectVec,viewMatrix);vec4 envMapColor=textureCubeUV(envMap,reflectVec,roughness);return envMapColor.rgb*envMapIntensity;\n#else\nreturn vec3(0.0);\n#endif\n}\n#endif',
			envmap_vertex:
				'#ifdef USE_ENVMAP\n#ifdef ENV_WORLDPOS\nvWorldPosition=worldPosition.xyz;\n#else\nvec3 cameraToVertex;if(isOrthographic){cameraToVertex=normalize(vec3(-viewMatrix[0][2],-viewMatrix[1][2],-viewMatrix[2][2]));}else{cameraToVertex=normalize(worldPosition.xyz-cameraPosition);}vec3 worldNormal=inverseTransformDirection(transformedNormal,viewMatrix);\n#ifdef ENVMAP_MODE_REFLECTION\nvReflect=reflect(cameraToVertex,worldNormal);\n#else\nvReflect=refract(cameraToVertex,worldNormal,refractionRatio);\n#endif\n#endif\n#endif',
			fog_vertex: '#ifdef USE_FOG\nvFogDepth=-mvPosition.z;\n#endif',
			fog_pars_vertex: '#ifdef USE_FOG\nvarying float vFogDepth;\n#endif',
			fog_fragment:
				'#ifdef USE_FOG\n#ifdef FOG_EXP2\nfloat fogFactor=1.0-exp(-fogDensity*fogDensity*vFogDepth*vFogDepth);\n#else\nfloat fogFactor=smoothstep(fogNear,fogFar,vFogDepth);\n#endif\ngl_FragColor.rgb=mix(gl_FragColor.rgb,fogColor,fogFactor);\n#endif',
			fog_pars_fragment:
				'#ifdef USE_FOG\nuniform vec3 fogColor;varying float vFogDepth;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;uniform float fogFar;\n#endif\n#endif',
			gradientmap_pars_fragment:
				'#ifdef USE_GRADIENTMAP\nuniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance(vec3 normal,vec3 lightDirection){float dotNL=dot(normal,lightDirection);vec2 coord=vec2(dotNL*0.5+0.5,0.0);\n#ifdef USE_GRADIENTMAP\nreturn vec3(texture2D(gradientMap,coord).r);\n#else\nreturn(coord.x<0.7)?vec3(0.7):vec3(1.0);\n#endif\n}',
			lightmap_fragment:
				'#ifdef USE_LIGHTMAP\nvec4 lightMapTexel=texture2D(lightMap,vUv2);vec3 lightMapIrradiance=lightMapTexelToLinear(lightMapTexel).rgb*lightMapIntensity;\n#ifndef PHYSICALLY_CORRECT_LIGHTS\nlightMapIrradiance*=PI;\n#endif\nreflectedLight.indirectDiffuse+=lightMapIrradiance;\n#endif',
			lightmap_pars_fragment: '#ifdef USE_LIGHTMAP\nuniform sampler2D lightMap;uniform float lightMapIntensity;\n#endif',
			lights_lambert_vertex:
				'vec3 diffuse=vec3(1.0);GeometricContext geometry;geometry.position=mvPosition.xyz;geometry.normal=normalize(transformedNormal);geometry.viewDir=(isOrthographic)?vec3(0,0,1):normalize(-mvPosition.xyz);GeometricContext backGeometry;backGeometry.position=geometry.position;backGeometry.normal=-geometry.normal;backGeometry.viewDir=geometry.viewDir;vLightFront=vec3(0.0);vIndirectFront=vec3(0.0);\n#ifdef DOUBLE_SIDED\nvLightBack=vec3(0.0);vIndirectBack=vec3(0.0);\n#endif\nIncidentLight directLight;float dotNL;vec3 directLightColor_Diffuse;vIndirectFront+=getAmbientLightIrradiance(ambientLightColor);vIndirectFront+=getLightProbeIrradiance(lightProbe,geometry.normal);\n#ifdef DOUBLE_SIDED\nvIndirectBack+=getAmbientLightIrradiance(ambientLightColor);vIndirectBack+=getLightProbeIrradiance(lightProbe,backGeometry.normal);\n#endif\n#if NUM_POINT_LIGHTS>0\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_POINT_LIGHTS;i++){getPointLightInfo(pointLights[i],geometry,directLight);dotNL=dot(geometry.normal,directLight.direction);directLightColor_Diffuse=directLight.color;vLightFront+=saturate(dotNL)*directLightColor_Diffuse;\n#ifdef DOUBLE_SIDED\nvLightBack+=saturate(-dotNL)*directLightColor_Diffuse;\n#endif\n}\n#pragma unroll_loop_end\n#endif\n#if NUM_SPOT_LIGHTS>0\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_SPOT_LIGHTS;i++){getSpotLightInfo(spotLights[i],geometry,directLight);dotNL=dot(geometry.normal,directLight.direction);directLightColor_Diffuse=directLight.color;vLightFront+=saturate(dotNL)*directLightColor_Diffuse;\n#ifdef DOUBLE_SIDED\nvLightBack+=saturate(-dotNL)*directLightColor_Diffuse;\n#endif\n}\n#pragma unroll_loop_end\n#endif\n#if NUM_DIR_LIGHTS>0\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_DIR_LIGHTS;i++){getDirectionalLightInfo(directionalLights[i],geometry,directLight);dotNL=dot(geometry.normal,directLight.direction);directLightColor_Diffuse=directLight.color;vLightFront+=saturate(dotNL)*directLightColor_Diffuse;\n#ifdef DOUBLE_SIDED\nvLightBack+=saturate(-dotNL)*directLightColor_Diffuse;\n#endif\n}\n#pragma unroll_loop_end\n#endif\n#if NUM_HEMI_LIGHTS>0\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_HEMI_LIGHTS;i++){vIndirectFront+=getHemisphereLightIrradiance(hemisphereLights[i],geometry.normal);\n#ifdef DOUBLE_SIDED\nvIndirectBack+=getHemisphereLightIrradiance(hemisphereLights[i],backGeometry.normal);\n#endif\n}\n#pragma unroll_loop_end\n#endif',
			lights_pars_begin:
				'uniform bool receiveShadow;uniform vec3 ambientLightColor;uniform vec3 lightProbe[9];vec3 shGetIrradianceAt(in vec3 normal,in vec3 shCoefficients[9]){float x=normal.x,y=normal.y,z=normal.z;vec3 result=shCoefficients[0]*0.886227;result+=shCoefficients[1]*2.0*0.511664*y;result+=shCoefficients[2]*2.0*0.511664*z;result+=shCoefficients[3]*2.0*0.511664*x;result+=shCoefficients[4]*2.0*0.429043*x*y;result+=shCoefficients[5]*2.0*0.429043*y*z;result+=shCoefficients[6]*(0.743125*z*z-0.247708);result+=shCoefficients[7]*2.0*0.429043*x*z;result+=shCoefficients[8]*0.429043*(x*x-y*y);return result;}vec3 getLightProbeIrradiance(const in vec3 lightProbe[9],const in vec3 normal){vec3 worldNormal=inverseTransformDirection(normal,viewMatrix);vec3 irradiance=shGetIrradianceAt(worldNormal,lightProbe);return irradiance;}vec3 getAmbientLightIrradiance(const in vec3 ambientLightColor){vec3 irradiance=ambientLightColor;return irradiance;}float getDistanceAttenuation(const in float lightDistance,const in float cutoffDistance,const in float decayExponent){\n#if defined(PHYSICALLY_CORRECT_LIGHTS)\nfloat distanceFalloff=1.0/max(pow(lightDistance,decayExponent),0.01);if(cutoffDistance>0.0){distanceFalloff*=pow2(saturate(1.0-pow4(lightDistance/cutoffDistance)));}return distanceFalloff;\n#else\nif(cutoffDistance>0.0&&decayExponent>0.0){return pow(saturate(-lightDistance/cutoffDistance+1.0),decayExponent);}return 1.0;\n#endif\n}float getSpotAttenuation(const in float coneCosine,const in float penumbraCosine,const in float angleCosine){return smoothstep(coneCosine,penumbraCosine,angleCosine);}\n#if NUM_DIR_LIGHTS>0\nstruct DirectionalLight{vec3 direction;vec3 color;};uniform DirectionalLight directionalLights[NUM_DIR_LIGHTS];void getDirectionalLightInfo(const in DirectionalLight directionalLight,const in GeometricContext geometry,out IncidentLight light){light.color=directionalLight.color;light.direction=directionalLight.direction;light.visible=true;}\n#endif\n#if NUM_POINT_LIGHTS>0\nstruct PointLight{vec3 position;vec3 color;float distance;float decay;};uniform PointLight pointLights[NUM_POINT_LIGHTS];void getPointLightInfo(const in PointLight pointLight,const in GeometricContext geometry,out IncidentLight light){vec3 lVector=pointLight.position-geometry.position;light.direction=normalize(lVector);float lightDistance=length(lVector);light.color=pointLight.color;light.color*=getDistanceAttenuation(lightDistance,pointLight.distance,pointLight.decay);light.visible=(light.color!=vec3(0.0));}\n#endif\n#if NUM_SPOT_LIGHTS>0\nstruct SpotLight{vec3 position;vec3 direction;vec3 color;float distance;float decay;float coneCos;float penumbraCos;};uniform SpotLight spotLights[NUM_SPOT_LIGHTS];void getSpotLightInfo(const in SpotLight spotLight,const in GeometricContext geometry,out IncidentLight light){vec3 lVector=spotLight.position-geometry.position;light.direction=normalize(lVector);float angleCos=dot(light.direction,spotLight.direction);float spotAttenuation=getSpotAttenuation(spotLight.coneCos,spotLight.penumbraCos,angleCos);if(spotAttenuation>0.0){float lightDistance=length(lVector);light.color=spotLight.color*spotAttenuation;light.color*=getDistanceAttenuation(lightDistance,spotLight.distance,spotLight.decay);light.visible=(light.color!=vec3(0.0));}else{light.color=vec3(0.0);light.visible=false;}}\n#endif\n#if NUM_RECT_AREA_LIGHTS>0\nstruct RectAreaLight{vec3 color;vec3 position;vec3 halfWidth;vec3 halfHeight;};uniform sampler2D ltc_1;uniform sampler2D ltc_2;uniform RectAreaLight rectAreaLights[NUM_RECT_AREA_LIGHTS];\n#endif\n#if NUM_HEMI_LIGHTS>0\nstruct HemisphereLight{vec3 direction;vec3 skyColor;vec3 groundColor;};uniform HemisphereLight hemisphereLights[NUM_HEMI_LIGHTS];vec3 getHemisphereLightIrradiance(const in HemisphereLight hemiLight,const in vec3 normal){float dotNL=dot(normal,hemiLight.direction);float hemiDiffuseWeight=0.5*dotNL+0.5;vec3 irradiance=mix(hemiLight.groundColor,hemiLight.skyColor,hemiDiffuseWeight);return irradiance;}\n#endif',
			lights_toon_fragment: 'ToonMaterial material;material.diffuseColor=diffuseColor.rgb;',
			lights_toon_pars_fragment:
				'varying vec3 vViewPosition;struct ToonMaterial{vec3 diffuseColor;};void RE_Direct_Toon(const in IncidentLight directLight,const in GeometricContext geometry,const in ToonMaterial material,inout ReflectedLight reflectedLight){vec3 irradiance=getGradientIrradiance(geometry.normal,directLight.direction)*directLight.color;reflectedLight.directDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}void RE_IndirectDiffuse_Toon(const in vec3 irradiance,const in GeometricContext geometry,const in ToonMaterial material,inout ReflectedLight reflectedLight){reflectedLight.indirectDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}\n#define RE_Direct RE_Direct_Toon\n#define RE_IndirectDiffuse RE_IndirectDiffuse_Toon\n#define Material_LightProbeLOD(material)(0)',
			lights_phong_fragment:
				'BlinnPhongMaterial material;material.diffuseColor=diffuseColor.rgb;material.specularColor=specular;material.specularShininess=shininess;material.specularStrength=specularStrength;',
			lights_phong_pars_fragment:
				'varying vec3 vViewPosition;struct BlinnPhongMaterial{vec3 diffuseColor;vec3 specularColor;float specularShininess;float specularStrength;};void RE_Direct_BlinnPhong(const in IncidentLight directLight,const in GeometricContext geometry,const in BlinnPhongMaterial material,inout ReflectedLight reflectedLight){float dotNL=saturate(dot(geometry.normal,directLight.direction));vec3 irradiance=dotNL*directLight.color;reflectedLight.directDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);reflectedLight.directSpecular+=irradiance*BRDF_BlinnPhong(directLight.direction,geometry.viewDir,geometry.normal,material.specularColor,material.specularShininess)*material.specularStrength;}void RE_IndirectDiffuse_BlinnPhong(const in vec3 irradiance,const in GeometricContext geometry,const in BlinnPhongMaterial material,inout ReflectedLight reflectedLight){reflectedLight.indirectDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}\n#define RE_Direct RE_Direct_BlinnPhong\n#define RE_IndirectDiffuse RE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD(material)(0)',
			lights_physical_fragment:
				'PhysicalMaterial material;material.diffuseColor=diffuseColor.rgb*(1.0-metalnessFactor);vec3 dxy=max(abs(dFdx(geometryNormal)),abs(dFdy(geometryNormal)));float geometryRoughness=max(max(dxy.x,dxy.y),dxy.z);material.roughness=max(roughnessFactor,0.0525);material.roughness+=geometryRoughness;material.roughness=min(material.roughness,1.0);\n#ifdef IOR\n#ifdef SPECULAR\nfloat specularIntensityFactor=specularIntensity;vec3 specularColorFactor=specularColor;\n#ifdef USE_SPECULARINTENSITYMAP\nspecularIntensityFactor*=texture2D(specularIntensityMap,vUv).a;\n#endif\n#ifdef USE_SPECULARCOLORMAP\nspecularColorFactor*=specularColorMapTexelToLinear(texture2D(specularColorMap,vUv)).rgb;\n#endif\nmaterial.specularF90=mix(specularIntensityFactor,1.0,metalnessFactor);\n#else\nfloat specularIntensityFactor=1.0;vec3 specularColorFactor=vec3(1.0);material.specularF90=1.0;\n#endif\nmaterial.specularColor=mix(min(pow2((ior-1.0)/(ior+1.0))*specularColorFactor,vec3(1.0))*specularIntensityFactor,diffuseColor.rgb,metalnessFactor);\n#else\nmaterial.specularColor=mix(vec3(0.04),diffuseColor.rgb,metalnessFactor);material.specularF90=1.0;\n#endif\n#ifdef USE_CLEARCOAT\nmaterial.clearcoat=clearcoat;material.clearcoatRoughness=clearcoatRoughness;material.clearcoatF0=vec3(0.04);material.clearcoatF90=1.0;\n#ifdef USE_CLEARCOATMAP\nmaterial.clearcoat*=texture2D(clearcoatMap,vUv).x;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\nmaterial.clearcoatRoughness*=texture2D(clearcoatRoughnessMap,vUv).y;\n#endif\nmaterial.clearcoat=saturate(material.clearcoat);material.clearcoatRoughness=max(material.clearcoatRoughness,0.0525);material.clearcoatRoughness+=geometryRoughness;material.clearcoatRoughness=min(material.clearcoatRoughness,1.0);\n#endif\n#ifdef USE_SHEEN\nmaterial.sheenColor=sheenColor;\n#ifdef USE_SHEENCOLORMAP\nmaterial.sheenColor*=sheenColorMapTexelToLinear(texture2D(sheenColorMap,vUv)).rgb;\n#endif\nmaterial.sheenRoughness=clamp(sheenRoughness,0.07,1.0);\n#ifdef USE_SHEENROUGHNESSMAP\nmaterial.sheenRoughness*=texture2D(sheenRoughnessMap,vUv).a;\n#endif\n#endif',
			lights_physical_pars_fragment:
				'struct PhysicalMaterial{vec3 diffuseColor;float roughness;vec3 specularColor;float specularF90;\n#ifdef USE_CLEARCOAT\nfloat clearcoat;float clearcoatRoughness;vec3 clearcoatF0;float clearcoatF90;\n#endif\n#ifdef USE_SHEEN\nvec3 sheenColor;float sheenRoughness;\n#endif\n};vec3 clearcoatSpecular=vec3(0.0);vec3 sheenSpecular=vec3(0.0);float IBLSheenBRDF(const in vec3 normal,const in vec3 viewDir,const in float roughness){float dotNV=saturate(dot(normal,viewDir));float r2=roughness*roughness;float a=roughness<0.25?-339.2*r2+161.4*roughness-25.9:-8.48*r2+14.3*roughness-9.95;float b=roughness<0.25?44.0*r2-23.7*roughness+3.26:1.97*r2-3.27*roughness+0.72;float DG=exp(a*dotNV+b)+(roughness<0.25?0.0:0.1*(roughness-0.25));return saturate(DG*RECIPROCAL_PI);}vec2 DFGApprox(const in vec3 normal,const in vec3 viewDir,const in float roughness){float dotNV=saturate(dot(normal,viewDir));const vec4 c0=vec4(-1,-0.0275,-0.572,0.022);const vec4 c1=vec4(1,0.0425,1.04,-0.04);vec4 r=roughness*c0+c1;float a004=min(r.x*r.x,exp2(-9.28*dotNV))*r.x+r.y;vec2 fab=vec2(-1.04,1.04)*a004+r.zw;return fab;}vec3 EnvironmentBRDF(const in vec3 normal,const in vec3 viewDir,const in vec3 specularColor,const in float specularF90,const in float roughness){vec2 fab=DFGApprox(normal,viewDir,roughness);return specularColor*fab.x+specularF90*fab.y;}void computeMultiscattering(const in vec3 normal,const in vec3 viewDir,const in vec3 specularColor,const in float specularF90,const in float roughness,inout vec3 singleScatter,inout vec3 multiScatter){vec2 fab=DFGApprox(normal,viewDir,roughness);vec3 FssEss=specularColor*fab.x+specularF90*fab.y;float Ess=fab.x+fab.y;float Ems=1.0-Ess;vec3 Favg=specularColor+(1.0-specularColor)*0.047619;vec3 Fms=FssEss*Favg/(1.0-Ems*Favg);singleScatter+=FssEss;multiScatter+=Fms*Ems;}\n#if NUM_RECT_AREA_LIGHTS>0\nvoid RE_Direct_RectArea_Physical(const in RectAreaLight rectAreaLight,const in GeometricContext geometry,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){vec3 normal=geometry.normal;vec3 viewDir=geometry.viewDir;vec3 position=geometry.position;vec3 lightPos=rectAreaLight.position;vec3 halfWidth=rectAreaLight.halfWidth;vec3 halfHeight=rectAreaLight.halfHeight;vec3 lightColor=rectAreaLight.color;float roughness=material.roughness;vec3 rectCoords[4];rectCoords[0]=lightPos+halfWidth-halfHeight;rectCoords[1]=lightPos-halfWidth-halfHeight;rectCoords[2]=lightPos-halfWidth+halfHeight;rectCoords[3]=lightPos+halfWidth+halfHeight;vec2 uv=LTC_Uv(normal,viewDir,roughness);vec4 t1=texture2D(ltc_1,uv);vec4 t2=texture2D(ltc_2,uv);mat3 mInv=mat3(vec3(t1.x,0,t1.y),vec3(0,1,0),vec3(t1.z,0,t1.w));vec3 fresnel=(material.specularColor*t2.x+(vec3(1.0)-material.specularColor)*t2.y);reflectedLight.directSpecular+=lightColor*fresnel*LTC_Evaluate(normal,viewDir,position,mInv,rectCoords);reflectedLight.directDiffuse+=lightColor*material.diffuseColor*LTC_Evaluate(normal,viewDir,position,mat3(1.0),rectCoords);}\n#endif\nvoid RE_Direct_Physical(const in IncidentLight directLight,const in GeometricContext geometry,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){float dotNL=saturate(dot(geometry.normal,directLight.direction));vec3 irradiance=dotNL*directLight.color;\n#ifdef USE_CLEARCOAT\nfloat dotNLcc=saturate(dot(geometry.clearcoatNormal,directLight.direction));vec3 ccIrradiance=dotNLcc*directLight.color;clearcoatSpecular+=ccIrradiance*BRDF_GGX(directLight.direction,geometry.viewDir,geometry.clearcoatNormal,material.clearcoatF0,material.clearcoatF90,material.clearcoatRoughness);\n#endif\n#ifdef USE_SHEEN\nsheenSpecular+=irradiance*BRDF_Sheen(directLight.direction,geometry.viewDir,geometry.normal,material.sheenColor,material.sheenRoughness);\n#endif\nreflectedLight.directSpecular+=irradiance*BRDF_GGX(directLight.direction,geometry.viewDir,geometry.normal,material.specularColor,material.specularF90,material.roughness);reflectedLight.directDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}void RE_IndirectDiffuse_Physical(const in vec3 irradiance,const in GeometricContext geometry,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){reflectedLight.indirectDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}void RE_IndirectSpecular_Physical(const in vec3 radiance,const in vec3 irradiance,const in vec3 clearcoatRadiance,const in GeometricContext geometry,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){\n#ifdef USE_CLEARCOAT\nclearcoatSpecular+=clearcoatRadiance*EnvironmentBRDF(geometry.clearcoatNormal,geometry.viewDir,material.clearcoatF0,material.clearcoatF90,material.clearcoatRoughness);\n#endif\n#ifdef USE_SHEEN\nsheenSpecular+=irradiance*material.sheenColor*IBLSheenBRDF(geometry.normal,geometry.viewDir,material.sheenRoughness);\n#endif\nvec3 singleScattering=vec3(0.0);vec3 multiScattering=vec3(0.0);vec3 cosineWeightedIrradiance=irradiance*RECIPROCAL_PI;computeMultiscattering(geometry.normal,geometry.viewDir,material.specularColor,material.specularF90,material.roughness,singleScattering,multiScattering);vec3 diffuse=material.diffuseColor*(1.0-(singleScattering+multiScattering));reflectedLight.indirectSpecular+=radiance*singleScattering;reflectedLight.indirectSpecular+=multiScattering*cosineWeightedIrradiance;reflectedLight.indirectDiffuse+=diffuse*cosineWeightedIrradiance;}\n#define RE_Direct RE_Direct_Physical\n#define RE_Direct_RectArea RE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse RE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular RE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion(const in float dotNV,const in float ambientOcclusion,const in float roughness){return saturate(pow(dotNV+ambientOcclusion,exp2(-16.0*roughness-1.0))-1.0+ambientOcclusion);}',
			lights_fragment_begin:
				'GeometricContext geometry;geometry.position=-vViewPosition;geometry.normal=normal;geometry.viewDir=(isOrthographic)?vec3(0,0,1):normalize(vViewPosition);\n#ifdef USE_CLEARCOAT\ngeometry.clearcoatNormal=clearcoatNormal;\n#endif\nIncidentLight directLight;\n#if (NUM_POINT_LIGHTS>0)&&defined(RE_Direct)\nPointLight pointLight;\n#if defined(USE_SHADOWMAP)&&NUM_POINT_LIGHT_SHADOWS>0\nPointLightShadow pointLightShadow;\n#endif\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_POINT_LIGHTS;i++){pointLight=pointLights[i];getPointLightInfo(pointLight,geometry,directLight);\n#if defined(USE_SHADOWMAP)&&(UNROLLED_LOOP_INDEX<NUM_POINT_LIGHT_SHADOWS)\npointLightShadow=pointLightShadows[i];directLight.color*=all(bvec2(directLight.visible,receiveShadow))?getPointShadow(pointShadowMap[i],pointLightShadow.shadowMapSize,pointLightShadow.shadowBias,pointLightShadow.shadowRadius,vPointShadowCoord[i],pointLightShadow.shadowCameraNear,pointLightShadow.shadowCameraFar):1.0;\n#endif\nRE_Direct(directLight,geometry,material,reflectedLight);}\n#pragma unroll_loop_end\n#endif\n#if (NUM_SPOT_LIGHTS>0)&&defined(RE_Direct)\nSpotLight spotLight;\n#if defined(USE_SHADOWMAP)&&NUM_SPOT_LIGHT_SHADOWS>0\nSpotLightShadow spotLightShadow;\n#endif\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_SPOT_LIGHTS;i++){spotLight=spotLights[i];getSpotLightInfo(spotLight,geometry,directLight);\n#if defined(USE_SHADOWMAP)&&(UNROLLED_LOOP_INDEX<NUM_SPOT_LIGHT_SHADOWS)\nspotLightShadow=spotLightShadows[i];directLight.color*=all(bvec2(directLight.visible,receiveShadow))?getShadow(spotShadowMap[i],spotLightShadow.shadowMapSize,spotLightShadow.shadowBias,spotLightShadow.shadowRadius,vSpotShadowCoord[i]):1.0;\n#endif\nRE_Direct(directLight,geometry,material,reflectedLight);}\n#pragma unroll_loop_end\n#endif\n#if (NUM_DIR_LIGHTS>0)&&defined(RE_Direct)\nDirectionalLight directionalLight;\n#if defined(USE_SHADOWMAP)&&NUM_DIR_LIGHT_SHADOWS>0\nDirectionalLightShadow directionalLightShadow;\n#endif\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_DIR_LIGHTS;i++){directionalLight=directionalLights[i];getDirectionalLightInfo(directionalLight,geometry,directLight);\n#if defined(USE_SHADOWMAP)&&(UNROLLED_LOOP_INDEX<NUM_DIR_LIGHT_SHADOWS)\ndirectionalLightShadow=directionalLightShadows[i];directLight.color*=all(bvec2(directLight.visible,receiveShadow))?getShadow(directionalShadowMap[i],directionalLightShadow.shadowMapSize,directionalLightShadow.shadowBias,directionalLightShadow.shadowRadius,vDirectionalShadowCoord[i]):1.0;\n#endif\nRE_Direct(directLight,geometry,material,reflectedLight);}\n#pragma unroll_loop_end\n#endif\n#if (NUM_RECT_AREA_LIGHTS>0)&&defined(RE_Direct_RectArea)\nRectAreaLight rectAreaLight;\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_RECT_AREA_LIGHTS;i++){rectAreaLight=rectAreaLights[i];RE_Direct_RectArea(rectAreaLight,geometry,material,reflectedLight);}\n#pragma unroll_loop_end\n#endif\n#if defined(RE_IndirectDiffuse)\nvec3 iblIrradiance=vec3(0.0);vec3 irradiance=getAmbientLightIrradiance(ambientLightColor);irradiance+=getLightProbeIrradiance(lightProbe,geometry.normal);\n#if (NUM_HEMI_LIGHTS>0)\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_HEMI_LIGHTS;i++){irradiance+=getHemisphereLightIrradiance(hemisphereLights[i],geometry.normal);}\n#pragma unroll_loop_end\n#endif\n#endif\n#if defined(RE_IndirectSpecular)\nvec3 radiance=vec3(0.0);vec3 clearcoatRadiance=vec3(0.0);\n#endif',
			lights_fragment_maps:
				'#if defined(RE_IndirectDiffuse)\n#ifdef USE_LIGHTMAP\nvec4 lightMapTexel=texture2D(lightMap,vUv2);vec3 lightMapIrradiance=lightMapTexelToLinear(lightMapTexel).rgb*lightMapIntensity;\n#ifndef PHYSICALLY_CORRECT_LIGHTS\nlightMapIrradiance*=PI;\n#endif\nirradiance+=lightMapIrradiance;\n#endif\n#if defined(USE_ENVMAP)&&defined(STANDARD)&&defined(ENVMAP_TYPE_CUBE_UV)\niblIrradiance+=getIBLIrradiance(geometry.normal);\n#endif\n#endif\n#if defined(USE_ENVMAP)&&defined(RE_IndirectSpecular)\nradiance+=getIBLRadiance(geometry.viewDir,geometry.normal,material.roughness);\n#ifdef USE_CLEARCOAT\nclearcoatRadiance+=getIBLRadiance(geometry.viewDir,geometry.clearcoatNormal,material.clearcoatRoughness);\n#endif\n#endif',
			lights_fragment_end:
				'#if defined(RE_IndirectDiffuse)\nRE_IndirectDiffuse(irradiance,geometry,material,reflectedLight);\n#endif\n#if defined(RE_IndirectSpecular)\nRE_IndirectSpecular(radiance,iblIrradiance,clearcoatRadiance,geometry,material,reflectedLight);\n#endif',
			logdepthbuf_fragment:
				'#if defined(USE_LOGDEPTHBUF)&&defined(USE_LOGDEPTHBUF_EXT)\ngl_FragDepthEXT=vIsPerspective==0.0?gl_FragCoord.z:log2(vFragDepth)*logDepthBufFC*0.5;\n#endif',
			logdepthbuf_pars_fragment:
				'#if defined(USE_LOGDEPTHBUF)&&defined(USE_LOGDEPTHBUF_EXT)\nuniform float logDepthBufFC;varying float vFragDepth;varying float vIsPerspective;\n#endif',
			logdepthbuf_pars_vertex:
				'#ifdef USE_LOGDEPTHBUF\n#ifdef USE_LOGDEPTHBUF_EXT\nvarying float vFragDepth;varying float vIsPerspective;\n#else\nuniform float logDepthBufFC;\n#endif\n#endif',
			logdepthbuf_vertex:
				'#ifdef USE_LOGDEPTHBUF\n#ifdef USE_LOGDEPTHBUF_EXT\nvFragDepth=1.0+gl_Position.w;vIsPerspective=float(isPerspectiveMatrix(projectionMatrix));\n#else\nif(isPerspectiveMatrix(projectionMatrix)){gl_Position.z=log2(max(EPSILON,gl_Position.w+1.0))*logDepthBufFC-1.0;gl_Position.z*=gl_Position.w;}\n#endif\n#endif',
			map_fragment: '#ifdef USE_MAP\nvec4 texelColor=texture2D(map,vUv);texelColor=mapTexelToLinear(texelColor);diffuseColor*=texelColor;\n#endif',
			map_pars_fragment: '#ifdef USE_MAP\nuniform sampler2D map;\n#endif',
			map_particle_fragment:
				'#if defined(USE_MAP)||defined(USE_ALPHAMAP)\nvec2 uv=(uvTransform*vec3(gl_PointCoord.x,1.0-gl_PointCoord.y,1)).xy;\n#endif\n#ifdef USE_MAP\nvec4 mapTexel=texture2D(map,uv);diffuseColor*=mapTexelToLinear(mapTexel);\n#endif\n#ifdef USE_ALPHAMAP\ndiffuseColor.a*=texture2D(alphaMap,uv).g;\n#endif',
			map_particle_pars_fragment:
				'#if defined(USE_MAP)||defined(USE_ALPHAMAP)\nuniform mat3 uvTransform;\n#endif\n#ifdef USE_MAP\nuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\nuniform sampler2D alphaMap;\n#endif',
			metalnessmap_fragment:
				'float metalnessFactor=metalness;\n#ifdef USE_METALNESSMAP\nvec4 texelMetalness=texture2D(metalnessMap,vUv);metalnessFactor*=texelMetalness.b;\n#endif',
			metalnessmap_pars_fragment: '#ifdef USE_METALNESSMAP\nuniform sampler2D metalnessMap;\n#endif',
			morphnormal_vertex:
				'#ifdef USE_MORPHNORMALS\nobjectNormal*=morphTargetBaseInfluence;\n#ifdef MORPHTARGETS_TEXTURE\nfor(int i=0;i<MORPHTARGETS_COUNT;i++){if(morphTargetInfluences[i]>0.0)objectNormal+=getMorph(gl_VertexID,i,1,2)*morphTargetInfluences[i];}\n#else\nobjectNormal+=morphNormal0*morphTargetInfluences[0];objectNormal+=morphNormal1*morphTargetInfluences[1];objectNormal+=morphNormal2*morphTargetInfluences[2];objectNormal+=morphNormal3*morphTargetInfluences[3];\n#endif\n#endif',
			morphtarget_pars_vertex:
				'#ifdef USE_MORPHTARGETS\nuniform float morphTargetBaseInfluence;\n#ifdef MORPHTARGETS_TEXTURE\nuniform float morphTargetInfluences[MORPHTARGETS_COUNT];uniform sampler2DArray morphTargetsTexture;uniform vec2 morphTargetsTextureSize;vec3 getMorph(const in int vertexIndex,const in int morphTargetIndex,const in int offset,const in int stride){float texelIndex=float(vertexIndex*stride+offset);float y=floor(texelIndex/morphTargetsTextureSize.x);float x=texelIndex-y*morphTargetsTextureSize.x;vec3 morphUV=vec3((x+0.5)/morphTargetsTextureSize.x,y/morphTargetsTextureSize.y,morphTargetIndex);return texture(morphTargetsTexture,morphUV).xyz;}\n#else\n#ifndef USE_MORPHNORMALS\nuniform float morphTargetInfluences[8];\n#else\nuniform float morphTargetInfluences[4];\n#endif\n#endif\n#endif',
			morphtarget_vertex:
				'#ifdef USE_MORPHTARGETS\ntransformed*=morphTargetBaseInfluence;\n#ifdef MORPHTARGETS_TEXTURE\nfor(int i=0;i<MORPHTARGETS_COUNT;i++){\n#ifndef USE_MORPHNORMALS\nif(morphTargetInfluences[i]>0.0)transformed+=getMorph(gl_VertexID,i,0,1)*morphTargetInfluences[i];\n#else\nif(morphTargetInfluences[i]>0.0)transformed+=getMorph(gl_VertexID,i,0,2)*morphTargetInfluences[i];\n#endif\n}\n#else\ntransformed+=morphTarget0*morphTargetInfluences[0];transformed+=morphTarget1*morphTargetInfluences[1];transformed+=morphTarget2*morphTargetInfluences[2];transformed+=morphTarget3*morphTargetInfluences[3];\n#ifndef USE_MORPHNORMALS\ntransformed+=morphTarget4*morphTargetInfluences[4];transformed+=morphTarget5*morphTargetInfluences[5];transformed+=morphTarget6*morphTargetInfluences[6];transformed+=morphTarget7*morphTargetInfluences[7];\n#endif\n#endif\n#endif',
			normal_fragment_begin:
				'float faceDirection=gl_FrontFacing?1.0:-1.0;\n#ifdef FLAT_SHADED\nvec3 fdx=vec3(dFdx(vViewPosition.x),dFdx(vViewPosition.y),dFdx(vViewPosition.z));vec3 fdy=vec3(dFdy(vViewPosition.x),dFdy(vViewPosition.y),dFdy(vViewPosition.z));vec3 normal=normalize(cross(fdx,fdy));\n#else\nvec3 normal=normalize(vNormal);\n#ifdef DOUBLE_SIDED\nnormal=normal*faceDirection;\n#endif\n#ifdef USE_TANGENT\nvec3 tangent=normalize(vTangent);vec3 bitangent=normalize(vBitangent);\n#ifdef DOUBLE_SIDED\ntangent=tangent*faceDirection;bitangent=bitangent*faceDirection;\n#endif\n#if defined(TANGENTSPACE_NORMALMAP)||defined(USE_CLEARCOAT_NORMALMAP)\nmat3 vTBN=mat3(tangent,bitangent,normal);\n#endif\n#endif\n#endif\nvec3 geometryNormal=normal;',
			normal_fragment_maps:
				'#ifdef OBJECTSPACE_NORMALMAP\nnormal=texture2D(normalMap,vUv).xyz*2.0-1.0;\n#ifdef FLIP_SIDED\nnormal=-normal;\n#endif\n#ifdef DOUBLE_SIDED\nnormal=normal*faceDirection;\n#endif\nnormal=normalize(normalMatrix*normal);\n#elif defined(TANGENTSPACE_NORMALMAP)\nvec3 mapN=texture2D(normalMap,vUv).xyz*2.0-1.0;mapN.xy*=normalScale;\n#ifdef USE_TANGENT\nnormal=normalize(vTBN*mapN);\n#else\nnormal=perturbNormal2Arb(-vViewPosition,normal,mapN,faceDirection);\n#endif\n#elif defined(USE_BUMPMAP)\nnormal=perturbNormalArb(-vViewPosition,normal,dHdxy_fwd(),faceDirection);\n#endif',
			normal_pars_fragment: '#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#ifdef USE_TANGENT\nvarying vec3 vTangent;varying vec3 vBitangent;\n#endif\n#endif',
			normal_pars_vertex: '#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#ifdef USE_TANGENT\nvarying vec3 vTangent;varying vec3 vBitangent;\n#endif\n#endif',
			normal_vertex:
				'#ifndef FLAT_SHADED\nvNormal=normalize(transformedNormal);\n#ifdef USE_TANGENT\nvTangent=normalize(transformedTangent);vBitangent=normalize(cross(vNormal,vTangent)*tangent.w);\n#endif\n#endif',
			normalmap_pars_fragment:
				'#ifdef USE_NORMALMAP\nuniform sampler2D normalMap;uniform vec2 normalScale;\n#endif\n#ifdef OBJECTSPACE_NORMALMAP\nuniform mat3 normalMatrix;\n#endif\n#if !defined(USE_TANGENT)&&(defined(TANGENTSPACE_NORMALMAP)||defined(USE_CLEARCOAT_NORMALMAP))\nvec3 perturbNormal2Arb(vec3 eye_pos,vec3 surf_norm,vec3 mapN,float faceDirection){vec3 q0=vec3(dFdx(eye_pos.x),dFdx(eye_pos.y),dFdx(eye_pos.z));vec3 q1=vec3(dFdy(eye_pos.x),dFdy(eye_pos.y),dFdy(eye_pos.z));vec2 st0=dFdx(vUv.st);vec2 st1=dFdy(vUv.st);vec3 N=surf_norm;vec3 q1perp=cross(q1,N);vec3 q0perp=cross(N,q0);vec3 T=q1perp*st0.x+q0perp*st1.x;vec3 B=q1perp*st0.y+q0perp*st1.y;float det=max(dot(T,T),dot(B,B));float scale=(det==0.0)?0.0:faceDirection*inversesqrt(det);return normalize(T*(mapN.x*scale)+B*(mapN.y*scale)+N*mapN.z);}\n#endif',
			clearcoat_normal_fragment_begin: '#ifdef USE_CLEARCOAT\nvec3 clearcoatNormal=geometryNormal;\n#endif',
			clearcoat_normal_fragment_maps:
				'#ifdef USE_CLEARCOAT_NORMALMAP\nvec3 clearcoatMapN=texture2D(clearcoatNormalMap,vUv).xyz*2.0-1.0;clearcoatMapN.xy*=clearcoatNormalScale;\n#ifdef USE_TANGENT\nclearcoatNormal=normalize(vTBN*clearcoatMapN);\n#else\nclearcoatNormal=perturbNormal2Arb(-vViewPosition,clearcoatNormal,clearcoatMapN,faceDirection);\n#endif\n#endif',
			clearcoat_pars_fragment:
				'#ifdef USE_CLEARCOATMAP\nuniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\nuniform sampler2D clearcoatRoughnessMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\nuniform sampler2D clearcoatNormalMap;uniform vec2 clearcoatNormalScale;\n#endif',
			output_fragment:
				'#ifdef OPAQUE\ndiffuseColor.a=1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a*=transmissionAlpha+0.1;\n#endif\ngl_FragColor=vec4(outgoingLight,diffuseColor.a);',
			packing:
				'vec3 packNormalToRGB(const in vec3 normal){return normalize(normal)*0.5+0.5;}vec3 unpackRGBToNormal(const in vec3 rgb){return 2.0*rgb.xyz-1.0;}const float PackUpscale=256./255.;const float UnpackDownscale=255./256.;const vec3 PackFactors=vec3(256.*256.*256.,256.*256.,256.);const vec4 UnpackFactors=UnpackDownscale/vec4(PackFactors,1.);const float ShiftRight8=1./256.;vec4 packDepthToRGBA(const in float v){vec4 r=vec4(fract(v*PackFactors),v);r.yzw-=r.xyz*ShiftRight8;return r*PackUpscale;}float unpackRGBAToDepth(const in vec4 v){return dot(v,UnpackFactors);}vec4 pack2HalfToRGBA(vec2 v){vec4 r=vec4(v.x,fract(v.x*255.0),v.y,fract(v.y*255.0));return vec4(r.x-r.y/255.0,r.y,r.z-r.w/255.0,r.w);}vec2 unpackRGBATo2Half(vec4 v){return vec2(v.x+(v.y/255.0),v.z+(v.w/255.0));}float viewZToOrthographicDepth(const in float viewZ,const in float near,const in float far){return(viewZ+near)/(near-far);}float orthographicDepthToViewZ(const in float linearClipZ,const in float near,const in float far){return linearClipZ*(near-far)-near;}float viewZToPerspectiveDepth(const in float viewZ,const in float near,const in float far){return((near+viewZ)*far)/((far-near)*viewZ);}float perspectiveDepthToViewZ(const in float invClipZ,const in float near,const in float far){return(near*far)/((far-near)*invClipZ-far);}',
			premultiplied_alpha_fragment: '#ifdef PREMULTIPLIED_ALPHA\ngl_FragColor.rgb*=gl_FragColor.a;\n#endif',
			project_vertex:
				'vec4 mvPosition=vec4(transformed,1.0);\n#ifdef USE_INSTANCING\nmvPosition=instanceMatrix*mvPosition;\n#endif\nmvPosition=modelViewMatrix*mvPosition;gl_Position=projectionMatrix*mvPosition;',
			dithering_fragment: '#ifdef DITHERING\ngl_FragColor.rgb=dithering(gl_FragColor.rgb);\n#endif',
			dithering_pars_fragment:
				'#ifdef DITHERING\nvec3 dithering(vec3 color){float grid_position=rand(gl_FragCoord.xy);vec3 dither_shift_RGB=vec3(0.25/255.0,-0.25/255.0,0.25/255.0);dither_shift_RGB=mix(2.0*dither_shift_RGB,-2.0*dither_shift_RGB,grid_position);return color+dither_shift_RGB;}\n#endif',
			roughnessmap_fragment:
				'float roughnessFactor=roughness;\n#ifdef USE_ROUGHNESSMAP\nvec4 texelRoughness=texture2D(roughnessMap,vUv);roughnessFactor*=texelRoughness.g;\n#endif',
			roughnessmap_pars_fragment: '#ifdef USE_ROUGHNESSMAP\nuniform sampler2D roughnessMap;\n#endif',
			shadowmap_pars_fragment:
				'#ifdef USE_SHADOWMAP\n#if NUM_DIR_LIGHT_SHADOWS>0\nuniform sampler2D directionalShadowMap[NUM_DIR_LIGHT_SHADOWS];varying vec4 vDirectionalShadowCoord[NUM_DIR_LIGHT_SHADOWS];struct DirectionalLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform DirectionalLightShadow directionalLightShadows[NUM_DIR_LIGHT_SHADOWS];\n#endif\n#if NUM_SPOT_LIGHT_SHADOWS>0\nuniform sampler2D spotShadowMap[NUM_SPOT_LIGHT_SHADOWS];varying vec4 vSpotShadowCoord[NUM_SPOT_LIGHT_SHADOWS];struct SpotLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform SpotLightShadow spotLightShadows[NUM_SPOT_LIGHT_SHADOWS];\n#endif\n#if NUM_POINT_LIGHT_SHADOWS>0\nuniform sampler2D pointShadowMap[NUM_POINT_LIGHT_SHADOWS];varying vec4 vPointShadowCoord[NUM_POINT_LIGHT_SHADOWS];struct PointLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;float shadowCameraNear;float shadowCameraFar;};uniform PointLightShadow pointLightShadows[NUM_POINT_LIGHT_SHADOWS];\n#endif\nfloat texture2DCompare(sampler2D depths,vec2 uv,float compare){return step(compare,unpackRGBAToDepth(texture2D(depths,uv)));}vec2 texture2DDistribution(sampler2D shadow,vec2 uv){return unpackRGBATo2Half(texture2D(shadow,uv));}float VSMShadow(sampler2D shadow,vec2 uv,float compare){float occlusion=1.0;vec2 distribution=texture2DDistribution(shadow,uv);float hard_shadow=step(compare,distribution.x);if(hard_shadow!=1.0){float distance=compare-distribution.x;float variance=max(0.00000,distribution.y*distribution.y);float softness_probability=variance/(variance+distance*distance);softness_probability=clamp((softness_probability-0.3)/(0.95-0.3),0.0,1.0);occlusion=clamp(max(hard_shadow,softness_probability),0.0,1.0);}return occlusion;}float getShadow(sampler2D shadowMap,vec2 shadowMapSize,float shadowBias,float shadowRadius,vec4 shadowCoord){float shadow=1.0;shadowCoord.xyz/=shadowCoord.w;shadowCoord.z+=shadowBias;bvec4 inFrustumVec=bvec4(shadowCoord.x>=0.0,shadowCoord.x<=1.0,shadowCoord.y>=0.0,shadowCoord.y<=1.0);bool inFrustum=all(inFrustumVec);bvec2 frustumTestVec=bvec2(inFrustum,shadowCoord.z<=1.0);bool frustumTest=all(frustumTestVec);if(frustumTest){\n#if defined(SHADOWMAP_TYPE_PCF)\nvec2 texelSize=vec2(1.0)/shadowMapSize;float dx0=-texelSize.x*shadowRadius;float dy0=-texelSize.y*shadowRadius;float dx1=+texelSize.x*shadowRadius;float dy1=+texelSize.y*shadowRadius;float dx2=dx0/2.0;float dy2=dy0/2.0;float dx3=dx1/2.0;float dy3=dy1/2.0;shadow=(texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx0,dy0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx1,dy0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx2,dy2),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy2),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx3,dy2),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx0,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx2,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy,shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx3,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx1,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx2,dy3),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy3),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx3,dy3),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx0,dy1),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy1),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx1,dy1),shadowCoord.z))*(1.0/17.0);\n#elif defined(SHADOWMAP_TYPE_PCF_SOFT)\nvec2 texelSize=vec2(1.0)/shadowMapSize;float dx=texelSize.x;float dy=texelSize.y;vec2 uv=shadowCoord.xy;vec2 f=fract(uv*shadowMapSize+0.5);uv-=f*texelSize;shadow=(texture2DCompare(shadowMap,uv,shadowCoord.z)+texture2DCompare(shadowMap,uv+vec2(dx,0.0),shadowCoord.z)+texture2DCompare(shadowMap,uv+vec2(0.0,dy),shadowCoord.z)+texture2DCompare(shadowMap,uv+texelSize,shadowCoord.z)+mix(texture2DCompare(shadowMap,uv+vec2(-dx,0.0),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,0.0),shadowCoord.z),f.x)+mix(texture2DCompare(shadowMap,uv+vec2(-dx,dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,dy),shadowCoord.z),f.x)+mix(texture2DCompare(shadowMap,uv+vec2(0.0,-dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(0.0,2.0*dy),shadowCoord.z),f.y)+mix(texture2DCompare(shadowMap,uv+vec2(dx,-dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(dx,2.0*dy),shadowCoord.z),f.y)+mix(mix(texture2DCompare(shadowMap,uv+vec2(-dx,-dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,-dy),shadowCoord.z),f.x),mix(texture2DCompare(shadowMap,uv+vec2(-dx,2.0*dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,2.0*dy),shadowCoord.z),f.x),f.y))*(1.0/9.0);\n#elif defined(SHADOWMAP_TYPE_VSM)\nshadow=VSMShadow(shadowMap,shadowCoord.xy,shadowCoord.z);\n#else\nshadow=texture2DCompare(shadowMap,shadowCoord.xy,shadowCoord.z);\n#endif\n}return shadow;}vec2 cubeToUV(vec3 v,float texelSizeY){vec3 absV=abs(v);float scaleToCube=1.0/max(absV.x,max(absV.y,absV.z));absV*=scaleToCube;v*=scaleToCube*(1.0-2.0*texelSizeY);vec2 planar=v.xy;float almostATexel=1.5*texelSizeY;float almostOne=1.0-almostATexel;if(absV.z>=almostOne){if(v.z>0.0)planar.x=4.0-v.x;}else if(absV.x>=almostOne){float signX=sign(v.x);planar.x=v.z*signX+2.0*signX;}else if(absV.y>=almostOne){float signY=sign(v.y);planar.x=v.x+2.0*signY+2.0;planar.y=v.z*signY-2.0;}return vec2(0.125,0.25)*planar+vec2(0.375,0.75);}float getPointShadow(sampler2D shadowMap,vec2 shadowMapSize,float shadowBias,float shadowRadius,vec4 shadowCoord,float shadowCameraNear,float shadowCameraFar){vec2 texelSize=vec2(1.0)/(shadowMapSize*vec2(4.0,2.0));vec3 lightToPosition=shadowCoord.xyz;float dp=(length(lightToPosition)-shadowCameraNear)/(shadowCameraFar-shadowCameraNear);dp+=shadowBias;vec3 bd3D=normalize(lightToPosition);\n#if defined(SHADOWMAP_TYPE_PCF)||defined(SHADOWMAP_TYPE_PCF_SOFT)||defined(SHADOWMAP_TYPE_VSM)\nvec2 offset=vec2(-1,1)*shadowRadius*texelSize.y;return(texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xyy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yyy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xyx,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yyx,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xxy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yxy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xxx,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yxx,texelSize.y),dp))*(1.0/9.0);\n#else\nreturn texture2DCompare(shadowMap,cubeToUV(bd3D,texelSize.y),dp);\n#endif\n}\n#endif',
			shadowmap_pars_vertex:
				'#ifdef USE_SHADOWMAP\n#if NUM_DIR_LIGHT_SHADOWS>0\nuniform mat4 directionalShadowMatrix[NUM_DIR_LIGHT_SHADOWS];varying vec4 vDirectionalShadowCoord[NUM_DIR_LIGHT_SHADOWS];struct DirectionalLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform DirectionalLightShadow directionalLightShadows[NUM_DIR_LIGHT_SHADOWS];\n#endif\n#if NUM_SPOT_LIGHT_SHADOWS>0\nuniform mat4 spotShadowMatrix[NUM_SPOT_LIGHT_SHADOWS];varying vec4 vSpotShadowCoord[NUM_SPOT_LIGHT_SHADOWS];struct SpotLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform SpotLightShadow spotLightShadows[NUM_SPOT_LIGHT_SHADOWS];\n#endif\n#if NUM_POINT_LIGHT_SHADOWS>0\nuniform mat4 pointShadowMatrix[NUM_POINT_LIGHT_SHADOWS];varying vec4 vPointShadowCoord[NUM_POINT_LIGHT_SHADOWS];struct PointLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;float shadowCameraNear;float shadowCameraFar;};uniform PointLightShadow pointLightShadows[NUM_POINT_LIGHT_SHADOWS];\n#endif\n#endif',
			shadowmap_vertex:
				'#ifdef USE_SHADOWMAP\n#if NUM_DIR_LIGHT_SHADOWS>0||NUM_SPOT_LIGHT_SHADOWS>0||NUM_POINT_LIGHT_SHADOWS>0\nvec3 shadowWorldNormal=inverseTransformDirection(transformedNormal,viewMatrix);vec4 shadowWorldPosition;\n#endif\n#if NUM_DIR_LIGHT_SHADOWS>0\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_DIR_LIGHT_SHADOWS;i++){shadowWorldPosition=worldPosition+vec4(shadowWorldNormal*directionalLightShadows[i].shadowNormalBias,0);vDirectionalShadowCoord[i]=directionalShadowMatrix[i]*shadowWorldPosition;}\n#pragma unroll_loop_end\n#endif\n#if NUM_SPOT_LIGHT_SHADOWS>0\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_SPOT_LIGHT_SHADOWS;i++){shadowWorldPosition=worldPosition+vec4(shadowWorldNormal*spotLightShadows[i].shadowNormalBias,0);vSpotShadowCoord[i]=spotShadowMatrix[i]*shadowWorldPosition;}\n#pragma unroll_loop_end\n#endif\n#if NUM_POINT_LIGHT_SHADOWS>0\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_POINT_LIGHT_SHADOWS;i++){shadowWorldPosition=worldPosition+vec4(shadowWorldNormal*pointLightShadows[i].shadowNormalBias,0);vPointShadowCoord[i]=pointShadowMatrix[i]*shadowWorldPosition;}\n#pragma unroll_loop_end\n#endif\n#endif',
			shadowmask_pars_fragment:
				'float getShadowMask(){float shadow=1.0;\n#ifdef USE_SHADOWMAP\n#if NUM_DIR_LIGHT_SHADOWS>0\nDirectionalLightShadow directionalLight;\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_DIR_LIGHT_SHADOWS;i++){directionalLight=directionalLightShadows[i];shadow*=receiveShadow?getShadow(directionalShadowMap[i],directionalLight.shadowMapSize,directionalLight.shadowBias,directionalLight.shadowRadius,vDirectionalShadowCoord[i]):1.0;}\n#pragma unroll_loop_end\n#endif\n#if NUM_SPOT_LIGHT_SHADOWS>0\nSpotLightShadow spotLight;\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_SPOT_LIGHT_SHADOWS;i++){spotLight=spotLightShadows[i];shadow*=receiveShadow?getShadow(spotShadowMap[i],spotLight.shadowMapSize,spotLight.shadowBias,spotLight.shadowRadius,vSpotShadowCoord[i]):1.0;}\n#pragma unroll_loop_end\n#endif\n#if NUM_POINT_LIGHT_SHADOWS>0\nPointLightShadow pointLight;\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_POINT_LIGHT_SHADOWS;i++){pointLight=pointLightShadows[i];shadow*=receiveShadow?getPointShadow(pointShadowMap[i],pointLight.shadowMapSize,pointLight.shadowBias,pointLight.shadowRadius,vPointShadowCoord[i],pointLight.shadowCameraNear,pointLight.shadowCameraFar):1.0;}\n#pragma unroll_loop_end\n#endif\n#endif\nreturn shadow;}',
			skinbase_vertex:
				'#ifdef USE_SKINNING\nmat4 boneMatX=getBoneMatrix(skinIndex.x);mat4 boneMatY=getBoneMatrix(skinIndex.y);mat4 boneMatZ=getBoneMatrix(skinIndex.z);mat4 boneMatW=getBoneMatrix(skinIndex.w);\n#endif',
			skinning_pars_vertex:
				'#ifdef USE_SKINNING\nuniform mat4 bindMatrix;uniform mat4 bindMatrixInverse;\n#ifdef BONE_TEXTURE\nuniform highp sampler2D boneTexture;uniform int boneTextureSize;mat4 getBoneMatrix(const in float i){float j=i*4.0;float x=mod(j,float(boneTextureSize));float y=floor(j/float(boneTextureSize));float dx=1.0/float(boneTextureSize);float dy=1.0/float(boneTextureSize);y=dy*(y+0.5);vec4 v1=texture2D(boneTexture,vec2(dx*(x+0.5),y));vec4 v2=texture2D(boneTexture,vec2(dx*(x+1.5),y));vec4 v3=texture2D(boneTexture,vec2(dx*(x+2.5),y));vec4 v4=texture2D(boneTexture,vec2(dx*(x+3.5),y));mat4 bone=mat4(v1,v2,v3,v4);return bone;}\n#else\nuniform mat4 boneMatrices[MAX_BONES];mat4 getBoneMatrix(const in float i){mat4 bone=boneMatrices[int(i)];return bone;}\n#endif\n#endif',
			skinning_vertex:
				'#ifdef USE_SKINNING\nvec4 skinVertex=bindMatrix*vec4(transformed,1.0);vec4 skinned=vec4(0.0);skinned+=boneMatX*skinVertex*skinWeight.x;skinned+=boneMatY*skinVertex*skinWeight.y;skinned+=boneMatZ*skinVertex*skinWeight.z;skinned+=boneMatW*skinVertex*skinWeight.w;transformed=(bindMatrixInverse*skinned).xyz;\n#endif',
			skinnormal_vertex:
				'#ifdef USE_SKINNING\nmat4 skinMatrix=mat4(0.0);skinMatrix+=skinWeight.x*boneMatX;skinMatrix+=skinWeight.y*boneMatY;skinMatrix+=skinWeight.z*boneMatZ;skinMatrix+=skinWeight.w*boneMatW;skinMatrix=bindMatrixInverse*skinMatrix*bindMatrix;objectNormal=vec4(skinMatrix*vec4(objectNormal,0.0)).xyz;\n#ifdef USE_TANGENT\nobjectTangent=vec4(skinMatrix*vec4(objectTangent,0.0)).xyz;\n#endif\n#endif',
			specularmap_fragment:
				'float specularStrength;\n#ifdef USE_SPECULARMAP\nvec4 texelSpecular=texture2D(specularMap,vUv);specularStrength=texelSpecular.r;\n#else\nspecularStrength=1.0;\n#endif',
			specularmap_pars_fragment: '#ifdef USE_SPECULARMAP\nuniform sampler2D specularMap;\n#endif',
			tonemapping_fragment: '#if defined(TONE_MAPPING)\ngl_FragColor.rgb=toneMapping(gl_FragColor.rgb);\n#endif',
			tonemapping_pars_fragment:
				'#ifndef saturate\n#define saturate(a)clamp(a,0.0,1.0)\n#endif\nuniform float toneMappingExposure;vec3 LinearToneMapping(vec3 color){return toneMappingExposure*color;}vec3 ReinhardToneMapping(vec3 color){color*=toneMappingExposure;return saturate(color/(vec3(1.0)+color));}vec3 OptimizedCineonToneMapping(vec3 color){color*=toneMappingExposure;color=max(vec3(0.0),color-0.004);return pow((color*(6.2*color+0.5))/(color*(6.2*color+1.7)+0.06),vec3(2.2));}vec3 RRTAndODTFit(vec3 v){vec3 a=v*(v+0.0245786)-0.000090537;vec3 b=v*(0.983729*v+0.4329510)+0.238081;return a/b;}vec3 ACESFilmicToneMapping(vec3 color){const mat3 ACESInputMat=mat3(vec3(0.59719,0.07600,0.02840),vec3(0.35458,0.90834,0.13383),vec3(0.04823,0.01566,0.83777));const mat3 ACESOutputMat=mat3(vec3(1.60475,-0.10208,-0.00327),vec3(-0.53108,1.10813,-0.07276),vec3(-0.07367,-0.00605,1.07602));color*=toneMappingExposure/0.6;color=ACESInputMat*color;color=RRTAndODTFit(color);color=ACESOutputMat*color;return saturate(color);}vec3 CustomToneMapping(vec3 color){return color;}',
			transmission_fragment:
				'#ifdef USE_TRANSMISSION\nfloat transmissionAlpha=1.0;float transmissionFactor=transmission;float thicknessFactor=thickness;\n#ifdef USE_TRANSMISSIONMAP\ntransmissionFactor*=texture2D(transmissionMap,vUv).r;\n#endif\n#ifdef USE_THICKNESSMAP\nthicknessFactor*=texture2D(thicknessMap,vUv).g;\n#endif\nvec3 pos=vWorldPosition;vec3 v=normalize(cameraPosition-pos);vec3 n=inverseTransformDirection(normal,viewMatrix);vec4 transmission=getIBLVolumeRefraction(n,v,roughnessFactor,material.diffuseColor,material.specularColor,material.specularF90,pos,modelMatrix,viewMatrix,projectionMatrix,ior,thicknessFactor,attenuationColor,attenuationDistance);totalDiffuse=mix(totalDiffuse,transmission.rgb,transmissionFactor);transmissionAlpha=mix(transmissionAlpha,transmission.a,transmissionFactor);\n#endif',
			transmission_pars_fragment:
				'#ifdef USE_TRANSMISSION\nuniform float transmission;uniform float thickness;uniform float attenuationDistance;uniform vec3 attenuationColor;\n#ifdef USE_TRANSMISSIONMAP\nuniform sampler2D transmissionMap;\n#endif\n#ifdef USE_THICKNESSMAP\nuniform sampler2D thicknessMap;\n#endif\nuniform vec2 transmissionSamplerSize;uniform sampler2D transmissionSamplerMap;uniform mat4 modelMatrix;uniform mat4 projectionMatrix;varying vec3 vWorldPosition;vec3 getVolumeTransmissionRay(vec3 n,vec3 v,float thickness,float ior,mat4 modelMatrix){vec3 refractionVector=refract(-v,normalize(n),1.0/ior);vec3 modelScale;modelScale.x=length(vec3(modelMatrix[0].xyz));modelScale.y=length(vec3(modelMatrix[1].xyz));modelScale.z=length(vec3(modelMatrix[2].xyz));return normalize(refractionVector)*thickness*modelScale;}float applyIorToRoughness(float roughness,float ior){return roughness*clamp(ior*2.0-2.0,0.0,1.0);}vec4 getTransmissionSample(vec2 fragCoord,float roughness,float ior){float framebufferLod=log2(transmissionSamplerSize.x)*applyIorToRoughness(roughness,ior);\n#ifdef TEXTURE_LOD_EXT\nreturn texture2DLodEXT(transmissionSamplerMap,fragCoord.xy,framebufferLod);\n#else\nreturn texture2D(transmissionSamplerMap,fragCoord.xy,framebufferLod);\n#endif\n}vec3 applyVolumeAttenuation(vec3 radiance,float transmissionDistance,vec3 attenuationColor,float attenuationDistance){if(attenuationDistance==0.0){return radiance;}else{vec3 attenuationCoefficient=-log(attenuationColor)/attenuationDistance;vec3 transmittance=exp(-attenuationCoefficient*transmissionDistance);return transmittance*radiance;}}vec4 getIBLVolumeRefraction(vec3 n,vec3 v,float roughness,vec3 diffuseColor,vec3 specularColor,float specularF90,vec3 position,mat4 modelMatrix,mat4 viewMatrix,mat4 projMatrix,float ior,float thickness,vec3 attenuationColor,float attenuationDistance){vec3 transmissionRay=getVolumeTransmissionRay(n,v,thickness,ior,modelMatrix);vec3 refractedRayExit=position+transmissionRay;vec4 ndcPos=projMatrix*viewMatrix*vec4(refractedRayExit,1.0);vec2 refractionCoords=ndcPos.xy/ndcPos.w;refractionCoords+=1.0;refractionCoords/=2.0;vec4 transmittedLight=getTransmissionSample(refractionCoords,roughness,ior);vec3 attenuatedColor=applyVolumeAttenuation(transmittedLight.rgb,length(transmissionRay),attenuationColor,attenuationDistance);vec3 F=EnvironmentBRDF(n,v,specularColor,specularF90,roughness);return vec4((1.0-F)*attenuatedColor*diffuseColor,transmittedLight.a);}\n#endif',
			uv_pars_fragment: '#if (defined(USE_UV)&&!defined(UVS_VERTEX_ONLY))\nvarying vec2 vUv;\n#endif',
			uv_pars_vertex: '#ifdef USE_UV\n#ifdef UVS_VERTEX_ONLY\nvec2 vUv;\n#else\nvarying vec2 vUv;\n#endif\nuniform mat3 uvTransform;\n#endif',
			uv_vertex: '#ifdef USE_UV\nvUv=(uvTransform*vec3(uv,1)).xy;\n#endif',
			uv2_pars_fragment: '#if defined(USE_LIGHTMAP)||defined(USE_AOMAP)\nvarying vec2 vUv2;\n#endif',
			uv2_pars_vertex: '#if defined(USE_LIGHTMAP)||defined(USE_AOMAP)\nattribute vec2 uv2;varying vec2 vUv2;uniform mat3 uv2Transform;\n#endif',
			uv2_vertex: '#if defined(USE_LIGHTMAP)||defined(USE_AOMAP)\nvUv2=(uv2Transform*vec3(uv2,1)).xy;\n#endif',
			worldpos_vertex:
				'#if defined(USE_ENVMAP)||defined(DISTANCE)||defined(USE_SHADOWMAP)||defined(USE_TRANSMISSION)\nvec4 worldPosition=vec4(transformed,1.0);\n#ifdef USE_INSTANCING\nworldPosition=instanceMatrix*worldPosition;\n#endif\nworldPosition=modelMatrix*worldPosition;\n#endif',
			background_vert: 'varying vec2 vUv;uniform mat3 uvTransform;void main(){vUv=(uvTransform*vec3(uv,1)).xy;gl_Position=vec4(position.xy,1.0,1.0);}',
			background_frag:
				'uniform sampler2D t2D;varying vec2 vUv;void main(){vec4 texColor=texture2D(t2D,vUv);gl_FragColor=mapTexelToLinear(texColor);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n}',
			cube_vert:
				'varying vec3 vWorldDirection;\n#include <common>\nvoid main(){vWorldDirection=transformDirection(position,modelMatrix);\n#include <begin_vertex>\n#include <project_vertex>\ngl_Position.z=gl_Position.w;}',
			cube_frag:
				'#include <envmap_common_pars_fragment>\nuniform float opacity;varying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main(){vec3 vReflect=vWorldDirection;\n#include <envmap_fragment>\ngl_FragColor=envColor;gl_FragColor.a*=opacity;\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n}',
			depth_vert:
				'#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;void main(){\n#include <uv_vertex>\n#include <skinbase_vertex>\n#ifdef USE_DISPLACEMENTMAP\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinnormal_vertex>\n#endif\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\nvHighPrecisionZW=gl_Position.zw;}',
			depth_frag:
				'#if DEPTH_PACKING==3200\nuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;void main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(1.0);\n#if DEPTH_PACKING==3200\ndiffuseColor.a=opacity;\n#endif\n#include <map_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <logdepthbuf_fragment>\nfloat fragCoordZ=0.5*vHighPrecisionZW[0]/vHighPrecisionZW[1]+0.5;\n#if DEPTH_PACKING==3200\ngl_FragColor=vec4(vec3(1.0-fragCoordZ),opacity);\n#elif DEPTH_PACKING==3201\ngl_FragColor=packDepthToRGBA(fragCoordZ);\n#endif\n}',
			distanceRGBA_vert:
				'#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <skinbase_vertex>\n#ifdef USE_DISPLACEMENTMAP\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinnormal_vertex>\n#endif\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <worldpos_vertex>\n#include <clipping_planes_vertex>\nvWorldPosition=worldPosition.xyz;}',
			distanceRGBA_frag:
				'#define DISTANCE\nuniform vec3 referencePosition;uniform float nearDistance;uniform float farDistance;varying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(1.0);\n#include <map_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\nfloat dist=length(vWorldPosition-referencePosition);dist=(dist-nearDistance)/(farDistance-nearDistance);dist=saturate(dist);gl_FragColor=packDepthToRGBA(dist);}',
			equirect_vert:
				'varying vec3 vWorldDirection;\n#include <common>\nvoid main(){vWorldDirection=transformDirection(position,modelMatrix);\n#include <begin_vertex>\n#include <project_vertex>\n}',
			equirect_frag:
				'uniform sampler2D tEquirect;varying vec3 vWorldDirection;\n#include <common>\nvoid main(){vec3 direction=normalize(vWorldDirection);vec2 sampleUV=equirectUv(direction);vec4 texColor=texture2D(tEquirect,sampleUV);gl_FragColor=mapTexelToLinear(texColor);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n}',
			linedashed_vert:
				'uniform float scale;attribute float lineDistance;varying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){vLineDistance=scale*lineDistance;\n#include <color_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <fog_vertex>\n}',
			linedashed_frag:
				'uniform vec3 diffuse;uniform float opacity;uniform float dashSize;uniform float totalSize;varying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nif(mod(vLineDistance,totalSize)>dashSize){discard;}vec3 outgoingLight=vec3(0.0);vec4 diffuseColor=vec4(diffuse,opacity);\n#include <logdepthbuf_fragment>\n#include <color_fragment>\noutgoingLight=diffuseColor.rgb;\n#include <output_fragment>\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n}',
			meshbasic_vert:
				'#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#if defined(USE_ENVMAP)||defined(USE_SKINNING)\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#endif\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <worldpos_vertex>\n#include <envmap_vertex>\n#include <fog_vertex>\n}',
			meshbasic_frag:
				'uniform vec3 diffuse;uniform float opacity;\n#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(diffuse,opacity);\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <specularmap_fragment>\nReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));\n#ifdef USE_LIGHTMAP\nvec4 lightMapTexel=texture2D(lightMap,vUv2);reflectedLight.indirectDiffuse+=lightMapTexelToLinear(lightMapTexel).rgb*lightMapIntensity;\n#else\nreflectedLight.indirectDiffuse+=vec3(1.0);\n#endif\n#include <aomap_fragment>\nreflectedLight.indirectDiffuse*=diffuseColor.rgb;vec3 outgoingLight=reflectedLight.indirectDiffuse;\n#include <envmap_fragment>\n#include <output_fragment>\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}',
			meshlambert_vert:
				'#define LAMBERT\nvarying vec3 vLightFront;varying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;varying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <worldpos_vertex>\n#include <envmap_vertex>\n#include <lights_lambert_vertex>\n#include <shadowmap_vertex>\n#include <fog_vertex>\n}',
			meshlambert_frag:
				'uniform vec3 diffuse;uniform vec3 emissive;uniform float opacity;varying vec3 vLightFront;varying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;varying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <specularmap_fragment>\n#include <emissivemap_fragment>\n#ifdef DOUBLE_SIDED\nreflectedLight.indirectDiffuse+=(gl_FrontFacing)?vIndirectFront:vIndirectBack;\n#else\nreflectedLight.indirectDiffuse+=vIndirectFront;\n#endif\n#include <lightmap_fragment>\nreflectedLight.indirectDiffuse*=BRDF_Lambert(diffuseColor.rgb);\n#ifdef DOUBLE_SIDED\nreflectedLight.directDiffuse=(gl_FrontFacing)?vLightFront:vLightBack;\n#else\nreflectedLight.directDiffuse=vLightFront;\n#endif\nreflectedLight.directDiffuse*=BRDF_Lambert(diffuseColor.rgb)*getShadowMask();\n#include <aomap_fragment>\nvec3 outgoingLight=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+totalEmissiveRadiance;\n#include <envmap_fragment>\n#include <output_fragment>\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}',
			meshmatcap_vert:
				'#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <color_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#include <normal_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <fog_vertex>\nvViewPosition=-mvPosition.xyz;}',
			meshmatcap_frag:
				'#define MATCAP\nuniform vec3 diffuse;uniform float opacity;uniform sampler2D matcap;varying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(diffuse,opacity);\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <normal_fragment_begin>\n#include <normal_fragment_maps>\nvec3 viewDir=normalize(vViewPosition);vec3 x=normalize(vec3(viewDir.z,0.0,-viewDir.x));vec3 y=cross(viewDir,x);vec2 uv=vec2(dot(x,normal),dot(y,normal))*0.495+0.5;\n#ifdef USE_MATCAP\nvec4 matcapColor=texture2D(matcap,uv);matcapColor=matcapTexelToLinear(matcapColor);\n#else\nvec4 matcapColor=vec4(1.0);\n#endif\nvec3 outgoingLight=diffuseColor.rgb*matcapColor.rgb;\n#include <output_fragment>\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}',
			meshnormal_vert:
				'#define NORMAL\n#if defined(FLAT_SHADED)||defined(USE_BUMPMAP)||defined(TANGENTSPACE_NORMALMAP)\nvarying vec3 vViewPosition;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#include <normal_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#if defined(FLAT_SHADED)||defined(USE_BUMPMAP)||defined(TANGENTSPACE_NORMALMAP)\nvViewPosition=-mvPosition.xyz;\n#endif\n}',
			meshnormal_frag:
				'#define NORMAL\nuniform float opacity;\n#if defined(FLAT_SHADED)||defined(USE_BUMPMAP)||defined(TANGENTSPACE_NORMALMAP)\nvarying vec3 vViewPosition;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\n#include <logdepthbuf_fragment>\n#include <normal_fragment_begin>\n#include <normal_fragment_maps>\ngl_FragColor=vec4(packNormalToRGB(normal),opacity);}',
			meshphong_vert:
				'#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#include <normal_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\nvViewPosition=-mvPosition.xyz;\n#include <worldpos_vertex>\n#include <envmap_vertex>\n#include <shadowmap_vertex>\n#include <fog_vertex>\n}',
			meshphong_frag:
				'#define PHONG\nuniform vec3 diffuse;uniform vec3 emissive;uniform vec3 specular;uniform float shininess;uniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <specularmap_fragment>\n#include <normal_fragment_begin>\n#include <normal_fragment_maps>\n#include <emissivemap_fragment>\n#include <lights_phong_fragment>\n#include <lights_fragment_begin>\n#include <lights_fragment_maps>\n#include <lights_fragment_end>\n#include <aomap_fragment>\nvec3 outgoingLight=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+reflectedLight.directSpecular+reflectedLight.indirectSpecular+totalEmissiveRadiance;\n#include <envmap_fragment>\n#include <output_fragment>\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}',
			meshphysical_vert:
				'#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\nvarying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#include <normal_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\nvViewPosition=-mvPosition.xyz;\n#include <worldpos_vertex>\n#include <shadowmap_vertex>\n#include <fog_vertex>\n#ifdef USE_TRANSMISSION\nvWorldPosition=worldPosition.xyz;\n#endif\n}',
			meshphysical_frag:
				'#define STANDARD\n#ifdef PHYSICAL\n#define IOR\n#define SPECULAR\n#endif\nuniform vec3 diffuse;uniform vec3 emissive;uniform float roughness;uniform float metalness;uniform float opacity;\n#ifdef IOR\nuniform float ior;\n#endif\n#ifdef SPECULAR\nuniform float specularIntensity;uniform vec3 specularColor;\n#ifdef USE_SPECULARINTENSITYMAP\nuniform sampler2D specularIntensityMap;\n#endif\n#ifdef USE_SPECULARCOLORMAP\nuniform sampler2D specularColorMap;\n#endif\n#endif\n#ifdef USE_CLEARCOAT\nuniform float clearcoat;uniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\nuniform vec3 sheenColor;uniform float sheenRoughness;\n#ifdef USE_SHEENCOLORMAP\nuniform sampler2D sheenColorMap;\n#endif\n#ifdef USE_SHEENROUGHNESSMAP\nuniform sampler2D sheenRoughnessMap;\n#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <roughnessmap_fragment>\n#include <metalnessmap_fragment>\n#include <normal_fragment_begin>\n#include <normal_fragment_maps>\n#include <clearcoat_normal_fragment_begin>\n#include <clearcoat_normal_fragment_maps>\n#include <emissivemap_fragment>\n#include <lights_physical_fragment>\n#include <lights_fragment_begin>\n#include <lights_fragment_maps>\n#include <lights_fragment_end>\n#include <aomap_fragment>\nvec3 totalDiffuse=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse;vec3 totalSpecular=reflectedLight.directSpecular+reflectedLight.indirectSpecular;\n#include <transmission_fragment>\nvec3 outgoingLight=totalDiffuse+totalSpecular+totalEmissiveRadiance;\n#ifdef USE_SHEEN\nfloat sheenEnergyComp=1.0-0.157*max3(material.sheenColor);outgoingLight=outgoingLight*sheenEnergyComp+sheenSpecular;\n#endif\n#ifdef USE_CLEARCOAT\nfloat dotNVcc=saturate(dot(geometry.clearcoatNormal,geometry.viewDir));vec3 Fcc=F_Schlick(material.clearcoatF0,material.clearcoatF90,dotNVcc);outgoingLight=outgoingLight*(1.0-material.clearcoat*Fcc)+clearcoatSpecular*material.clearcoat;\n#endif\n#include <output_fragment>\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}',
			meshtoon_vert:
				'#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#include <normal_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\nvViewPosition=-mvPosition.xyz;\n#include <worldpos_vertex>\n#include <shadowmap_vertex>\n#include <fog_vertex>\n}',
			meshtoon_frag:
				'#define TOON\nuniform vec3 diffuse;uniform vec3 emissive;uniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <normal_fragment_begin>\n#include <normal_fragment_maps>\n#include <emissivemap_fragment>\n#include <lights_toon_fragment>\n#include <lights_fragment_begin>\n#include <lights_fragment_maps>\n#include <lights_fragment_end>\n#include <aomap_fragment>\nvec3 outgoingLight=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+totalEmissiveRadiance;\n#include <output_fragment>\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}',
			points_vert:
				'uniform float size;uniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <color_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <project_vertex>\ngl_PointSize=size;\n#ifdef USE_SIZEATTENUATION\nbool isPerspective=isPerspectiveMatrix(projectionMatrix);if(isPerspective)gl_PointSize*=(scale/-mvPosition.z);\n#endif\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <worldpos_vertex>\n#include <fog_vertex>\n}',
			points_frag:
				'uniform vec3 diffuse;uniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec3 outgoingLight=vec3(0.0);vec4 diffuseColor=vec4(diffuse,opacity);\n#include <logdepthbuf_fragment>\n#include <map_particle_fragment>\n#include <color_fragment>\n#include <alphatest_fragment>\noutgoingLight=diffuseColor.rgb;\n#include <output_fragment>\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n}',
			shadow_vert:
				'#include <common>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main(){\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <project_vertex>\n#include <worldpos_vertex>\n#include <shadowmap_vertex>\n#include <fog_vertex>\n}',
			shadow_frag:
				'uniform vec3 color;uniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main(){gl_FragColor=vec4(color,opacity*(1.0-getShadowMask()));\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n}',
			sprite_vert:
				'uniform float rotation;uniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\nvec4 mvPosition=modelViewMatrix*vec4(0.0,0.0,0.0,1.0);vec2 scale;scale.x=length(vec3(modelMatrix[0].x,modelMatrix[0].y,modelMatrix[0].z));scale.y=length(vec3(modelMatrix[1].x,modelMatrix[1].y,modelMatrix[1].z));\n#ifndef USE_SIZEATTENUATION\nbool isPerspective=isPerspectiveMatrix(projectionMatrix);if(isPerspective)scale*=-mvPosition.z;\n#endif\nvec2 alignedPosition=(position.xy-(center-vec2(0.5)))*scale;vec2 rotatedPosition;rotatedPosition.x=cos(rotation)*alignedPosition.x-sin(rotation)*alignedPosition.y;rotatedPosition.y=sin(rotation)*alignedPosition.x+cos(rotation)*alignedPosition.y;mvPosition.xy+=rotatedPosition;gl_Position=projectionMatrix*mvPosition;\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <fog_vertex>\n}',
			sprite_frag:
				'uniform vec3 diffuse;uniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec3 outgoingLight=vec3(0.0);vec4 diffuseColor=vec4(diffuse,opacity);\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\noutgoingLight=diffuseColor.rgb;\n#include <output_fragment>\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n}',
		},
		Ti = {
			common: {
				diffuse: { value: new bt(16777215) },
				opacity: { value: 1 },
				map: { value: null },
				uvTransform: { value: new V() },
				uv2Transform: { value: new V() },
				alphaMap: { value: null },
				alphaTest: { value: 0 },
			},
			specularmap: { specularMap: { value: null } },
			envmap: { envMap: { value: null }, flipEnvMap: { value: -1 }, reflectivity: { value: 1 }, ior: { value: 1.5 }, refractionRatio: { value: 0.98 } },
			aomap: { aoMap: { value: null }, aoMapIntensity: { value: 1 } },
			lightmap: { lightMap: { value: null }, lightMapIntensity: { value: 1 } },
			emissivemap: { emissiveMap: { value: null } },
			bumpmap: { bumpMap: { value: null }, bumpScale: { value: 1 } },
			normalmap: { normalMap: { value: null }, normalScale: { value: new H(1, 1) } },
			displacementmap: { displacementMap: { value: null }, displacementScale: { value: 1 }, displacementBias: { value: 0 } },
			roughnessmap: { roughnessMap: { value: null } },
			metalnessmap: { metalnessMap: { value: null } },
			gradientmap: { gradientMap: { value: null } },
			fog: { fogDensity: { value: 25e-5 }, fogNear: { value: 1 }, fogFar: { value: 2e3 }, fogColor: { value: new bt(16777215) } },
			lights: {
				ambientLightColor: { value: [] },
				lightProbe: { value: [] },
				directionalLights: { value: [], properties: { direction: {}, color: {} } },
				directionalLightShadows: { value: [], properties: { shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } },
				directionalShadowMap: { value: [] },
				directionalShadowMatrix: { value: [] },
				spotLights: { value: [], properties: { color: {}, position: {}, direction: {}, distance: {}, coneCos: {}, penumbraCos: {}, decay: {} } },
				spotLightShadows: { value: [], properties: { shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } },
				spotShadowMap: { value: [] },
				spotShadowMatrix: { value: [] },
				pointLights: { value: [], properties: { color: {}, position: {}, decay: {}, distance: {} } },
				pointLightShadows: {
					value: [],
					properties: { shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {}, shadowCameraNear: {}, shadowCameraFar: {} },
				},
				pointShadowMap: { value: [] },
				pointShadowMatrix: { value: [] },
				hemisphereLights: { value: [], properties: { direction: {}, skyColor: {}, groundColor: {} } },
				rectAreaLights: { value: [], properties: { color: {}, position: {}, width: {}, height: {} } },
				ltc_1: { value: null },
				ltc_2: { value: null },
			},
			points: {
				diffuse: { value: new bt(16777215) },
				opacity: { value: 1 },
				size: { value: 1 },
				scale: { value: 1 },
				map: { value: null },
				alphaMap: { value: null },
				alphaTest: { value: 0 },
				uvTransform: { value: new V() },
			},
			sprite: {
				diffuse: { value: new bt(16777215) },
				opacity: { value: 1 },
				center: { value: new H(0.5, 0.5) },
				rotation: { value: 0 },
				map: { value: null },
				alphaMap: { value: null },
				alphaTest: { value: 0 },
				uvTransform: { value: new V() },
			},
		},
		Ai = {
			basic: {
				uniforms: ai([Ti.common, Ti.specularmap, Ti.envmap, Ti.aomap, Ti.lightmap, Ti.fog]),
				vertexShader: wi.meshbasic_vert,
				fragmentShader: wi.meshbasic_frag,
			},
			lambert: {
				uniforms: ai([Ti.common, Ti.specularmap, Ti.envmap, Ti.aomap, Ti.lightmap, Ti.emissivemap, Ti.fog, Ti.lights, { emissive: { value: new bt(0) } }]),
				vertexShader: wi.meshlambert_vert,
				fragmentShader: wi.meshlambert_frag,
			},
			phong: {
				uniforms: ai([
					Ti.common,
					Ti.specularmap,
					Ti.envmap,
					Ti.aomap,
					Ti.lightmap,
					Ti.emissivemap,
					Ti.bumpmap,
					Ti.normalmap,
					Ti.displacementmap,
					Ti.fog,
					Ti.lights,
					{ emissive: { value: new bt(0) }, specular: { value: new bt(1118481) }, shininess: { value: 30 } },
				]),
				vertexShader: wi.meshphong_vert,
				fragmentShader: wi.meshphong_frag,
			},
			standard: {
				uniforms: ai([
					Ti.common,
					Ti.envmap,
					Ti.aomap,
					Ti.lightmap,
					Ti.emissivemap,
					Ti.bumpmap,
					Ti.normalmap,
					Ti.displacementmap,
					Ti.roughnessmap,
					Ti.metalnessmap,
					Ti.fog,
					Ti.lights,
					{ emissive: { value: new bt(0) }, roughness: { value: 1 }, metalness: { value: 0 }, envMapIntensity: { value: 1 } },
				]),
				vertexShader: wi.meshphysical_vert,
				fragmentShader: wi.meshphysical_frag,
			},
			toon: {
				uniforms: ai([
					Ti.common,
					Ti.aomap,
					Ti.lightmap,
					Ti.emissivemap,
					Ti.bumpmap,
					Ti.normalmap,
					Ti.displacementmap,
					Ti.gradientmap,
					Ti.fog,
					Ti.lights,
					{ emissive: { value: new bt(0) } },
				]),
				vertexShader: wi.meshtoon_vert,
				fragmentShader: wi.meshtoon_frag,
			},
			matcap: {
				uniforms: ai([Ti.common, Ti.bumpmap, Ti.normalmap, Ti.displacementmap, Ti.fog, { matcap: { value: null } }]),
				vertexShader: wi.meshmatcap_vert,
				fragmentShader: wi.meshmatcap_frag,
			},
			points: { uniforms: ai([Ti.points, Ti.fog]), vertexShader: wi.points_vert, fragmentShader: wi.points_frag },
			dashed: {
				uniforms: ai([Ti.common, Ti.fog, { scale: { value: 1 }, dashSize: { value: 1 }, totalSize: { value: 2 } }]),
				vertexShader: wi.linedashed_vert,
				fragmentShader: wi.linedashed_frag,
			},
			depth: { uniforms: ai([Ti.common, Ti.displacementmap]), vertexShader: wi.depth_vert, fragmentShader: wi.depth_frag },
			normal: {
				uniforms: ai([Ti.common, Ti.bumpmap, Ti.normalmap, Ti.displacementmap, { opacity: { value: 1 } }]),
				vertexShader: wi.meshnormal_vert,
				fragmentShader: wi.meshnormal_frag,
			},
			sprite: { uniforms: ai([Ti.sprite, Ti.fog]), vertexShader: wi.sprite_vert, fragmentShader: wi.sprite_frag },
			background: { uniforms: { uvTransform: { value: new V() }, t2D: { value: null } }, vertexShader: wi.background_vert, fragmentShader: wi.background_frag },
			cube: { uniforms: ai([Ti.envmap, { opacity: { value: 1 } }]), vertexShader: wi.cube_vert, fragmentShader: wi.cube_frag },
			equirect: { uniforms: { tEquirect: { value: null } }, vertexShader: wi.equirect_vert, fragmentShader: wi.equirect_frag },
			distanceRGBA: {
				uniforms: ai([Ti.common, Ti.displacementmap, { referencePosition: { value: new ee() }, nearDistance: { value: 1 }, farDistance: { value: 1e3 } }]),
				vertexShader: wi.distanceRGBA_vert,
				fragmentShader: wi.distanceRGBA_frag,
			},
			shadow: {
				uniforms: ai([Ti.lights, Ti.fog, { color: { value: new bt(0) }, opacity: { value: 1 } }]),
				vertexShader: wi.shadow_vert,
				fragmentShader: wi.shadow_frag,
			},
		}
	function Ei(e, t, i, n, r) {
		const a = new bt(0)
		let s,
			o,
			l = 0,
			c = null,
			h = 0,
			d = null
		function p(e, t) {
			i.buffers.color.setClear(e.r, e.g, e.b, t, r)
		}
		return {
			getClearColor: function () {
				return a
			},
			setClearColor: function (e, t = 1) {
				a.set(e), (l = t), p(a, l)
			},
			getClearAlpha: function () {
				return l
			},
			setClearAlpha: function (e) {
				;(l = e), p(a, l)
			},
			render: function (i, r) {
				let f = !1,
					m = !0 === r.isScene ? r.background : null
				m && m.isTexture && (m = t.get(m))
				const g = e.xr,
					x = g.getSession && g.getSession()
				x && 'additive' === x.environmentBlendMode && (m = null),
					null === m ? p(a, l) : m && m.isColor && (p(m, 1), (f = !0)),
					(e.autoClear || f) && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil),
					m && (m.isCubeTexture || m.mapping === u)
						? (void 0 === o &&
								((o = new ti(
									new ni(1, 1, 1),
									new oi({
										name: 'BackgroundCubeMaterial',
										uniforms: ri(Ai.cube.uniforms),
										vertexShader: Ai.cube.vertexShader,
										fragmentShader: Ai.cube.fragmentShader,
										side: 1,
										depthTest: !1,
										depthWrite: !1,
										fog: !1,
									})
								)),
								o.geometry.deleteAttribute('normal'),
								o.geometry.deleteAttribute('uv'),
								(o.onBeforeRender = function (e, t, i) {
									this.matrixWorld.copyPosition(i.matrixWorld)
								}),
								Object.defineProperty(o.material, 'envMap', {
									get: function () {
										return this.uniforms.envMap.value
									},
								}),
								n.update(o)),
						  (o.material.uniforms.envMap.value = m),
						  (o.material.uniforms.flipEnvMap.value = m.isCubeTexture && !1 === m.isRenderTargetTexture ? -1 : 1),
						  (c === m && h === m.version && d === e.toneMapping) || ((o.material.needsUpdate = !0), (c = m), (h = m.version), (d = e.toneMapping)),
						  i.unshift(o, o.geometry, o.material, 0, 0, null))
						: m &&
						  m.isTexture &&
						  (void 0 === s &&
								((s = new ti(
									new Si(2, 2),
									new oi({
										name: 'BackgroundMaterial',
										uniforms: ri(Ai.background.uniforms),
										vertexShader: Ai.background.vertexShader,
										fragmentShader: Ai.background.fragmentShader,
										side: 0,
										depthTest: !1,
										depthWrite: !1,
										fog: !1,
									})
								)),
								s.geometry.deleteAttribute('normal'),
								Object.defineProperty(s.material, 'map', {
									get: function () {
										return this.uniforms.t2D.value
									},
								}),
								n.update(s)),
						  (s.material.uniforms.t2D.value = m),
						  !0 === m.matrixAutoUpdate && m.updateMatrix(),
						  s.material.uniforms.uvTransform.value.copy(m.matrix),
						  (c === m && h === m.version && d === e.toneMapping) || ((s.material.needsUpdate = !0), (c = m), (h = m.version), (d = e.toneMapping)),
						  i.unshift(s, s.geometry, s.material, 0, 0, null))
			},
		}
	}
	function Li(e, t, i, n) {
		const r = e.getParameter(34921),
			a = n.isWebGL2 ? null : t.get('OES_vertex_array_object'),
			s = n.isWebGL2 || null !== a,
			o = {},
			l = u(null)
		let c = l
		function h(t) {
			return n.isWebGL2 ? e.bindVertexArray(t) : a.bindVertexArrayOES(t)
		}
		function d(t) {
			return n.isWebGL2 ? e.deleteVertexArray(t) : a.deleteVertexArrayOES(t)
		}
		function u(e) {
			const t = [],
				i = [],
				n = []
			for (let e = 0; e < r; e++) (t[e] = 0), (i[e] = 0), (n[e] = 0)
			return {
				geometry: null,
				program: null,
				wireframe: !1,
				newAttributes: t,
				enabledAttributes: i,
				attributeDivisors: n,
				object: e,
				attributes: {},
				index: null,
			}
		}
		function p() {
			const e = c.newAttributes
			for (let t = 0, i = e.length; t < i; t++) e[t] = 0
		}
		function f(e) {
			m(e, 0)
		}
		function m(i, r) {
			const a = c.newAttributes,
				s = c.enabledAttributes,
				o = c.attributeDivisors
			if (((a[i] = 1), 0 === s[i] && (e.enableVertexAttribArray(i), (s[i] = 1)), o[i] !== r)) {
				;(n.isWebGL2 ? e : t.get('ANGLE_instanced_arrays'))[n.isWebGL2 ? 'vertexAttribDivisor' : 'vertexAttribDivisorANGLE'](i, r), (o[i] = r)
			}
		}
		function g() {
			const t = c.newAttributes,
				i = c.enabledAttributes
			for (let n = 0, r = i.length; n < r; n++) i[n] !== t[n] && (e.disableVertexAttribArray(n), (i[n] = 0))
		}
		function x(t, i, r, a, s, o) {
			!0 !== n.isWebGL2 || (5124 !== r && 5125 !== r) ? e.vertexAttribPointer(t, i, r, a, s, o) : e.vertexAttribIPointer(t, i, r, s, o)
		}
		function _() {
			v(), c !== l && ((c = l), h(c.object))
		}
		function v() {
			;(l.geometry = null), (l.program = null), (l.wireframe = !1)
		}
		return {
			setup: function (r, l, d, _, v) {
				let y = !1
				if (s) {
					const t = (function (t, i, r) {
						const s = !0 === r.wireframe
						let l = o[t.id]
						void 0 === l && ((l = {}), (o[t.id] = l))
						let c = l[i.id]
						void 0 === c && ((c = {}), (l[i.id] = c))
						let h = c[s]
						void 0 === h && ((h = u(n.isWebGL2 ? e.createVertexArray() : a.createVertexArrayOES())), (c[s] = h))
						return h
					})(_, d, l)
					c !== t && ((c = t), h(c.object)),
						(y = (function (e, t) {
							const i = c.attributes,
								n = e.attributes
							let r = 0
							for (const e in n) {
								const t = i[e],
									a = n[e]
								if (void 0 === t) return !0
								if (t.attribute !== a) return !0
								if (t.data !== a.data) return !0
								r++
							}
							return c.attributesNum !== r || c.index !== t
						})(_, v)),
						y &&
							(function (e, t) {
								const i = {},
									n = e.attributes
								let r = 0
								for (const e in n) {
									const t = n[e],
										a = {}
									;(a.attribute = t), t.data && (a.data = t.data), (i[e] = a), r++
								}
								;(c.attributes = i), (c.attributesNum = r), (c.index = t)
							})(_, v)
				} else {
					const e = !0 === l.wireframe
					;(c.geometry === _.id && c.program === d.id && c.wireframe === e) || ((c.geometry = _.id), (c.program = d.id), (c.wireframe = e), (y = !0))
				}
				!0 === r.isInstancedMesh && (y = !0),
					null !== v && i.update(v, 34963),
					y &&
						(!(function (r, a, s, o) {
							if (!1 === n.isWebGL2 && (r.isInstancedMesh || o.isInstancedBufferGeometry) && null === t.get('ANGLE_instanced_arrays')) return
							p()
							const l = o.attributes,
								c = s.getAttributes(),
								h = a.defaultAttributeValues
							for (const t in c) {
								const n = c[t]
								if (n.location >= 0) {
									let a = l[t]
									if (
										(void 0 === a &&
											('instanceMatrix' === t && r.instanceMatrix && (a = r.instanceMatrix), 'instanceColor' === t && r.instanceColor && (a = r.instanceColor)),
										void 0 !== a)
									) {
										const t = a.normalized,
											s = a.itemSize,
											l = i.get(a)
										if (void 0 === l) continue
										const c = l.buffer,
											h = l.type,
											d = l.bytesPerElement
										if (a.isInterleavedBufferAttribute) {
											const i = a.data,
												l = i.stride,
												u = a.offset
											if (i && i.isInstancedInterleavedBuffer) {
												for (let e = 0; e < n.locationSize; e++) m(n.location + e, i.meshPerAttribute)
												!0 !== r.isInstancedMesh && void 0 === o._maxInstanceCount && (o._maxInstanceCount = i.meshPerAttribute * i.count)
											} else for (let e = 0; e < n.locationSize; e++) f(n.location + e)
											e.bindBuffer(34962, c)
											for (let e = 0; e < n.locationSize; e++) x(n.location + e, s / n.locationSize, h, t, l * d, (u + (s / n.locationSize) * e) * d)
										} else {
											if (a.isInstancedBufferAttribute) {
												for (let e = 0; e < n.locationSize; e++) m(n.location + e, a.meshPerAttribute)
												!0 !== r.isInstancedMesh && void 0 === o._maxInstanceCount && (o._maxInstanceCount = a.meshPerAttribute * a.count)
											} else for (let e = 0; e < n.locationSize; e++) f(n.location + e)
											e.bindBuffer(34962, c)
											for (let e = 0; e < n.locationSize; e++) x(n.location + e, s / n.locationSize, h, t, s * d, (s / n.locationSize) * e * d)
										}
									} else if (void 0 !== h) {
										const i = h[t]
										if (void 0 !== i)
											switch (i.length) {
												case 2:
													e.vertexAttrib2fv(n.location, i)
													break
												case 3:
													e.vertexAttrib3fv(n.location, i)
													break
												case 4:
													e.vertexAttrib4fv(n.location, i)
													break
												default:
													e.vertexAttrib1fv(n.location, i)
											}
									}
								}
							}
							g()
						})(r, l, d, _),
						null !== v && e.bindBuffer(34963, i.get(v).buffer))
			},
			reset: _,
			resetDefaultState: v,
			dispose: function () {
				_()
				for (const e in o) {
					const t = o[e]
					for (const e in t) {
						const i = t[e]
						for (const e in i) d(i[e].object), delete i[e]
						delete t[e]
					}
					delete o[e]
				}
			},
			releaseStatesOfGeometry: function (e) {
				if (void 0 === o[e.id]) return
				const t = o[e.id]
				for (const e in t) {
					const i = t[e]
					for (const e in i) d(i[e].object), delete i[e]
					delete t[e]
				}
				delete o[e.id]
			},
			releaseStatesOfProgram: function (e) {
				for (const t in o) {
					const i = o[t]
					if (void 0 === i[e.id]) continue
					const n = i[e.id]
					for (const e in n) d(n[e].object), delete n[e]
					delete i[e.id]
				}
			},
			initAttributes: p,
			enableAttribute: f,
			disableUnusedAttributes: g,
		}
	}
	function Pi(e, t, i, n) {
		const r = n.isWebGL2
		let a
		;(this.setMode = function (e) {
			a = e
		}),
			(this.render = function (t, n) {
				e.drawArrays(a, t, n), i.update(n, a, 1)
			}),
			(this.renderInstances = function (n, s, o) {
				if (0 === o) return
				let l, c
				if (r) (l = e), (c = 'drawArraysInstanced')
				else if (((l = t.get('ANGLE_instanced_arrays')), (c = 'drawArraysInstancedANGLE'), null === l))
					return void console.error(
						'THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.'
					)
				l[c](a, n, s, o), i.update(s, a, o)
			})
	}
	function Fi(e, t, i) {
		let n
		function r(t) {
			if ('highp' === t) {
				if (e.getShaderPrecisionFormat(35633, 36338).precision > 0 && e.getShaderPrecisionFormat(35632, 36338).precision > 0) return 'highp'
				t = 'mediump'
			}
			return 'mediump' === t && e.getShaderPrecisionFormat(35633, 36337).precision > 0 && e.getShaderPrecisionFormat(35632, 36337).precision > 0
				? 'mediump'
				: 'lowp'
		}
		const a =
			('undefined' != typeof WebGL2RenderingContext && e instanceof WebGL2RenderingContext) ||
			('undefined' != typeof WebGL2ComputeRenderingContext && e instanceof WebGL2ComputeRenderingContext)
		let s = void 0 !== i.precision ? i.precision : 'highp'
		const o = r(s)
		o !== s && (console.warn('THREE.WebGLRenderer:', s, 'not supported, using', o, 'instead.'), (s = o))
		const l = a || t.has('WEBGL_draw_buffers'),
			c = !0 === i.logarithmicDepthBuffer,
			h = e.getParameter(34930),
			d = e.getParameter(35660),
			u = e.getParameter(3379),
			p = e.getParameter(34076),
			f = e.getParameter(34921),
			m = e.getParameter(36347),
			g = e.getParameter(36348),
			x = e.getParameter(36349),
			_ = d > 0,
			v = a || t.has('OES_texture_float')
		return {
			isWebGL2: a,
			drawBuffers: l,
			getMaxAnisotropy: function () {
				if (void 0 !== n) return n
				if (!0 === t.has('EXT_texture_filter_anisotropic')) {
					const i = t.get('EXT_texture_filter_anisotropic')
					n = e.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
				} else n = 0
				return n
			},
			getMaxPrecision: r,
			precision: s,
			logarithmicDepthBuffer: c,
			maxTextures: h,
			maxVertexTextures: d,
			maxTextureSize: u,
			maxCubemapSize: p,
			maxAttributes: f,
			maxVertexUniforms: m,
			maxVaryings: g,
			maxFragmentUniforms: x,
			vertexTextures: _,
			floatFragmentTextures: v,
			floatVertexTextures: _ && v,
			maxSamples: a ? e.getParameter(36183) : 0,
		}
	}
	function Ci(e) {
		const t = this
		let i = null,
			n = 0,
			r = !1,
			a = !1
		const s = new xi(),
			o = new V(),
			l = { value: null, needsUpdate: !1 }
		function c() {
			l.value !== i && ((l.value = i), (l.needsUpdate = n > 0)), (t.numPlanes = n), (t.numIntersection = 0)
		}
		function h(e, i, n, r) {
			const a = null !== e ? e.length : 0
			let c = null
			if (0 !== a) {
				if (((c = l.value), !0 !== r || null === c)) {
					const t = n + 4 * a,
						r = i.matrixWorldInverse
					o.getNormalMatrix(r), (null === c || c.length < t) && (c = new Float32Array(t))
					for (let t = 0, i = n; t !== a; ++t, i += 4) s.copy(e[t]).applyMatrix4(r, o), s.normal.toArray(c, i), (c[i + 3] = s.constant)
				}
				;(l.value = c), (l.needsUpdate = !0)
			}
			return (t.numPlanes = a), (t.numIntersection = 0), c
		}
		;(this.uniform = l),
			(this.numPlanes = 0),
			(this.numIntersection = 0),
			(this.init = function (e, t, a) {
				const s = 0 !== e.length || t || 0 !== n || r
				return (r = t), (i = h(e, a, 0)), (n = e.length), s
			}),
			(this.beginShadows = function () {
				;(a = !0), h(null)
			}),
			(this.endShadows = function () {
				;(a = !1), c()
			}),
			(this.setState = function (t, s, o) {
				const d = t.clippingPlanes,
					u = t.clipIntersection,
					p = t.clipShadows,
					f = e.get(t)
				if (!r || null === d || 0 === d.length || (a && !p)) a ? h(null) : c()
				else {
					const e = a ? 0 : n,
						t = 4 * e
					let r = f.clippingState || null
					;(l.value = r), (r = h(d, s, t, o))
					for (let e = 0; e !== t; ++e) r[e] = i[e]
					;(f.clippingState = r), (this.numIntersection = u ? this.numPlanes : 0), (this.numPlanes += e)
				}
			})
	}
	function Ni(e) {
		let t = new WeakMap()
		function i(e, t) {
			return t === d ? (e.mapping = c) : 304 === t && (e.mapping = h), e
		}
		function n(e) {
			const i = e.target
			i.removeEventListener('dispose', n)
			const r = t.get(i)
			void 0 !== r && (t.delete(i), r.dispose())
		}
		return {
			get: function (r) {
				if (r && r.isTexture && !1 === r.isRenderTargetTexture) {
					const a = r.mapping
					if (a === d || 304 === a) {
						if (t.has(r)) {
							return i(t.get(r).texture, r.mapping)
						}
						{
							const a = r.image
							if (a && a.height > 0) {
								const s = e.getRenderTarget(),
									o = new pi(a.height / 2)
								return o.fromEquirectangularTexture(e, r), t.set(r, o), e.setRenderTarget(s), r.addEventListener('dispose', n), i(o.texture, r.mapping)
							}
							return null
						}
					}
				}
				return r
			},
			dispose: function () {
				t = new WeakMap()
			},
		}
	}
	Ai.physical = {
		uniforms: ai([
			Ai.standard.uniforms,
			{
				clearcoat: { value: 0 },
				clearcoatMap: { value: null },
				clearcoatRoughness: { value: 0 },
				clearcoatRoughnessMap: { value: null },
				clearcoatNormalScale: { value: new H(1, 1) },
				clearcoatNormalMap: { value: null },
				sheen: { value: 0 },
				sheenColor: { value: new bt(0) },
				sheenColorMap: { value: null },
				sheenRoughness: { value: 0 },
				sheenRoughnessMap: { value: null },
				transmission: { value: 0 },
				transmissionMap: { value: null },
				transmissionSamplerSize: { value: new H() },
				transmissionSamplerMap: { value: null },
				thickness: { value: 0 },
				thicknessMap: { value: null },
				attenuationDistance: { value: 0 },
				attenuationColor: { value: new bt(0) },
				specularIntensity: { value: 0 },
				specularIntensityMap: { value: null },
				specularColor: { value: new bt(1, 1, 1) },
				specularColorMap: { value: null },
			},
		]),
		vertexShader: wi.meshphysical_vert,
		fragmentShader: wi.meshphysical_frag,
	}
	class Di extends li {
		constructor(e = -1, t = 1, i = 1, n = -1, r = 0.1, a = 2e3) {
			super(),
				(this.type = 'OrthographicCamera'),
				(this.zoom = 1),
				(this.view = null),
				(this.left = e),
				(this.right = t),
				(this.top = i),
				(this.bottom = n),
				(this.near = r),
				(this.far = a),
				this.updateProjectionMatrix()
		}
		copy(e, t) {
			return (
				super.copy(e, t),
				(this.left = e.left),
				(this.right = e.right),
				(this.top = e.top),
				(this.bottom = e.bottom),
				(this.near = e.near),
				(this.far = e.far),
				(this.zoom = e.zoom),
				(this.view = null === e.view ? null : Object.assign({}, e.view)),
				this
			)
		}
		setViewOffset(e, t, i, n, r, a) {
			null === this.view && (this.view = { enabled: !0, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }),
				(this.view.enabled = !0),
				(this.view.fullWidth = e),
				(this.view.fullHeight = t),
				(this.view.offsetX = i),
				(this.view.offsetY = n),
				(this.view.width = r),
				(this.view.height = a),
				this.updateProjectionMatrix()
		}
		clearViewOffset() {
			null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix()
		}
		updateProjectionMatrix() {
			const e = (this.right - this.left) / (2 * this.zoom),
				t = (this.top - this.bottom) / (2 * this.zoom),
				i = (this.right + this.left) / 2,
				n = (this.top + this.bottom) / 2
			let r = i - e,
				a = i + e,
				s = n + t,
				o = n - t
			if (null !== this.view && this.view.enabled) {
				const e = (this.right - this.left) / this.view.fullWidth / this.zoom,
					t = (this.top - this.bottom) / this.view.fullHeight / this.zoom
				;(r += e * this.view.offsetX), (a = r + e * this.view.width), (s -= t * this.view.offsetY), (o = s - t * this.view.height)
			}
			this.projectionMatrix.makeOrthographic(r, a, s, o, this.near, this.far), this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
		}
		toJSON(e) {
			const t = super.toJSON(e)
			return (
				(t.object.zoom = this.zoom),
				(t.object.left = this.left),
				(t.object.right = this.right),
				(t.object.top = this.top),
				(t.object.bottom = this.bottom),
				(t.object.near = this.near),
				(t.object.far = this.far),
				null !== this.view && (t.object.view = Object.assign({}, this.view)),
				t
			)
		}
	}
	Di.prototype.isOrthographicCamera = !0
	class Ii extends oi {
		constructor(e) {
			super(e), (this.type = 'RawShaderMaterial')
		}
	}
	Ii.prototype.isRawShaderMaterial = !0
	const Ri = Math.pow(2, 8),
		Ui = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582],
		zi = 5 + Ui.length,
		Oi = 20,
		Bi = { [P]: 0, [F]: 1 },
		ki = new Di(),
		{ _lodPlanes: Gi, _sizeLods: Hi, _sigmas: Vi } = Zi(),
		Wi = new bt()
	let Xi = null
	const Yi = (1 + Math.sqrt(5)) / 2,
		ji = 1 / Yi,
		Qi = [
			new ee(1, 1, 1),
			new ee(-1, 1, 1),
			new ee(1, 1, -1),
			new ee(-1, 1, -1),
			new ee(0, Yi, ji),
			new ee(0, Yi, -ji),
			new ee(ji, 0, Yi),
			new ee(-ji, 0, Yi),
			new ee(Yi, ji, 0),
			new ee(-Yi, ji, 0),
		]
	class qi {
		constructor(e) {
			;(this._renderer = e),
				(this._pingPongRenderTarget = null),
				(this._blurMaterial = (function (e) {
					const t = new Float32Array(e),
						i = new ee(0, 1, 0)
					return new Ii({
						name: 'SphericalGaussianBlur',
						defines: { n: e },
						uniforms: {
							envMap: { value: null },
							samples: { value: 1 },
							weights: { value: t },
							latitudinal: { value: !1 },
							dTheta: { value: 0 },
							mipInt: { value: 0 },
							poleAxis: { value: i },
						},
						vertexShader: tn(),
						fragmentShader: `precision mediump float;precision mediump int;varying vec3 vOutputDirection;uniform sampler2D envMap;uniform int samples;uniform float weights[n];uniform bool latitudinal;uniform float dTheta;uniform float mipInt;uniform vec3 poleAxis;\n${nn()}\n#define ENVMAP_TYPE_CUBE_UV\n#include <cube_uv_reflection_fragment>\nvec3 getSample(float theta,vec3 axis){float cosTheta=cos(theta);vec3 sampleDirection=vOutputDirection*cosTheta+cross(axis,vOutputDirection)*sin(theta)+axis*dot(axis,vOutputDirection)*(1.0-cosTheta);return bilinearCubeUV(envMap,sampleDirection,mipInt);}void main(){vec3 axis=latitudinal?poleAxis:cross(poleAxis,vOutputDirection);if(all(equal(axis,vec3(0.0)))){axis=vec3(vOutputDirection.z,0.0,-vOutputDirection.x);}axis=normalize(axis);gl_FragColor=vec4(0.0,0.0,0.0,1.0);gl_FragColor.rgb+=weights[0]*getSample(0.0,axis);for(int i=1;i<n;i++){if(i>=samples){break;}float theta=dTheta*float(i);gl_FragColor.rgb+=weights[i]*getSample(-1.0*theta,axis);gl_FragColor.rgb+=weights[i]*getSample(theta,axis);}}`,
						blending: 0,
						depthTest: !1,
						depthWrite: !1,
					})
				})(Oi)),
				(this._equirectShader = null),
				(this._cubemapShader = null),
				this._compileMaterial(this._blurMaterial)
		}
		fromScene(e, t = 0, i = 0.1, n = 100) {
			Xi = this._renderer.getRenderTarget()
			const r = this._allocateTargets()
			return this._sceneToCubeUV(e, i, n, r), t > 0 && this._blur(r, 0, 0, t), this._applyPMREM(r), this._cleanup(r), r
		}
		fromEquirectangular(e) {
			return this._fromTexture(e)
		}
		fromCubemap(e) {
			return this._fromTexture(e)
		}
		compileCubemapShader() {
			null === this._cubemapShader && ((this._cubemapShader = en()), this._compileMaterial(this._cubemapShader))
		}
		compileEquirectangularShader() {
			null === this._equirectShader && ((this._equirectShader = $i()), this._compileMaterial(this._equirectShader))
		}
		dispose() {
			this._blurMaterial.dispose(),
				null !== this._cubemapShader && this._cubemapShader.dispose(),
				null !== this._equirectShader && this._equirectShader.dispose()
			for (let e = 0; e < Gi.length; e++) Gi[e].dispose()
		}
		_cleanup(e) {
			this._pingPongRenderTarget.dispose(), this._renderer.setRenderTarget(Xi), (e.scissorTest = !1), Ki(e, 0, 0, e.width, e.height)
		}
		_fromTexture(e) {
			Xi = this._renderer.getRenderTarget()
			const t = this._allocateTargets(e)
			return this._textureToCubeUV(e, t), this._applyPMREM(t), this._cleanup(t), t
		}
		_allocateTargets(e) {
			const t = { magFilter: x, minFilter: x, generateMipmaps: !1, type: S, format: A, encoding: P, depthBuffer: !1 },
				i = Ji(t)
			return (i.depthBuffer = !e), (this._pingPongRenderTarget = Ji(t)), i
		}
		_compileMaterial(e) {
			const t = new ti(Gi[0], e)
			this._renderer.compile(t, ki)
		}
		_sceneToCubeUV(e, t, i, n) {
			const r = new ci(90, 1, t, i),
				a = [1, -1, 1, 1, 1, 1],
				s = [1, 1, 1, -1, -1, -1],
				o = this._renderer,
				l = o.autoClear,
				c = o.toneMapping
			o.getClearColor(Wi), (o.toneMapping = 0), (o.autoClear = !1)
			const h = new St({ name: 'PMREM.Background', side: 1, depthWrite: !1, depthTest: !1 }),
				d = new ti(new ni(), h)
			let u = !1
			const p = e.background
			p ? p.isColor && (h.color.copy(p), (e.background = null), (u = !0)) : (h.color.copy(Wi), (u = !0))
			for (let t = 0; t < 6; t++) {
				const i = t % 3
				0 == i
					? (r.up.set(0, a[t], 0), r.lookAt(s[t], 0, 0))
					: 1 == i
					? (r.up.set(0, 0, a[t]), r.lookAt(0, s[t], 0))
					: (r.up.set(0, a[t], 0), r.lookAt(0, 0, s[t])),
					Ki(n, i * Ri, t > 2 ? Ri : 0, Ri, Ri),
					o.setRenderTarget(n),
					u && o.render(d, r),
					o.render(e, r)
			}
			d.geometry.dispose(), d.material.dispose(), (o.toneMapping = c), (o.autoClear = l), (e.background = p)
		}
		_setEncoding(e, t) {
			!0 === this._renderer.capabilities.isWebGL2 && t.format === A && t.type === v && t.encoding === F ? (e.value = Bi[3e3]) : (e.value = Bi[t.encoding])
		}
		_textureToCubeUV(e, t) {
			const i = this._renderer,
				n = e.mapping === c || e.mapping === h
			n ? null == this._cubemapShader && (this._cubemapShader = en()) : null == this._equirectShader && (this._equirectShader = $i())
			const r = n ? this._cubemapShader : this._equirectShader,
				a = new ti(Gi[0], r),
				s = r.uniforms
			;(s.envMap.value = e),
				n || s.texelSize.value.set(1 / e.image.width, 1 / e.image.height),
				this._setEncoding(s.inputEncoding, e),
				Ki(t, 0, 0, 3 * Ri, 2 * Ri),
				i.setRenderTarget(t),
				i.render(a, ki)
		}
		_applyPMREM(e) {
			const t = this._renderer,
				i = t.autoClear
			t.autoClear = !1
			for (let t = 1; t < zi; t++) {
				const i = Math.sqrt(Vi[t] * Vi[t] - Vi[t - 1] * Vi[t - 1]),
					n = Qi[(t - 1) % Qi.length]
				this._blur(e, t - 1, t, i, n)
			}
			t.autoClear = i
		}
		_blur(e, t, i, n, r) {
			const a = this._pingPongRenderTarget
			this._halfBlur(e, a, t, i, n, 'latitudinal', r), this._halfBlur(a, e, i, i, n, 'longitudinal', r)
		}
		_halfBlur(e, t, i, n, r, a, s) {
			const o = this._renderer,
				l = this._blurMaterial
			'latitudinal' !== a && 'longitudinal' !== a && console.error('blur direction must be either latitudinal or longitudinal!')
			const c = new ti(Gi[n], l),
				h = l.uniforms,
				d = Hi[i] - 1,
				u = isFinite(r) ? Math.PI / (2 * d) : (2 * Math.PI) / 39,
				p = r / u,
				f = isFinite(r) ? 1 + Math.floor(3 * p) : Oi
			f > Oi && console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to 20`)
			const m = []
			let g = 0
			for (let e = 0; e < Oi; ++e) {
				const t = e / p,
					i = Math.exp((-t * t) / 2)
				m.push(i), 0 == e ? (g += i) : e < f && (g += 2 * i)
			}
			for (let e = 0; e < m.length; e++) m[e] = m[e] / g
			;(h.envMap.value = e.texture),
				(h.samples.value = f),
				(h.weights.value = m),
				(h.latitudinal.value = 'latitudinal' === a),
				s && (h.poleAxis.value = s),
				(h.dTheta.value = u),
				(h.mipInt.value = 8 - i)
			const x = Hi[n]
			Ki(t, 3 * Math.max(0, Ri - 2 * x), (0 === n ? 0 : 2 * Ri) + 2 * x * (n > 4 ? n - 8 + 4 : 0), 3 * x, 2 * x), o.setRenderTarget(t), o.render(c, ki)
		}
	}
	function Zi() {
		const e = [],
			t = [],
			i = []
		let n = 8
		for (let r = 0; r < zi; r++) {
			const a = Math.pow(2, n)
			t.push(a)
			let s = 1 / a
			r > 4 ? (s = Ui[r - 8 + 4 - 1]) : 0 == r && (s = 0), i.push(s)
			const o = 1 / (a - 1),
				l = -o / 2,
				c = 1 + o / 2,
				h = [l, l, c, l, c, c, l, l, c, c, l, c],
				d = 6,
				u = 6,
				p = 3,
				f = 2,
				m = 1,
				g = new Float32Array(p * u * d),
				x = new Float32Array(f * u * d),
				_ = new Float32Array(m * u * d)
			for (let e = 0; e < d; e++) {
				const t = ((e % 3) * 2) / 3 - 1,
					i = e > 2 ? 0 : -1,
					n = [t, i, 0, t + 2 / 3, i, 0, t + 2 / 3, i + 1, 0, t, i, 0, t + 2 / 3, i + 1, 0, t, i + 1, 0]
				g.set(n, p * u * e), x.set(h, f * u * e)
				const r = [e, e, e, e, e, e]
				_.set(r, m * u * e)
			}
			const v = new zt()
			v.setAttribute('position', new At(g, p)), v.setAttribute('uv', new At(x, f)), v.setAttribute('faceIndex', new At(_, m)), e.push(v), n > 4 && n--
		}
		return { _lodPlanes: e, _sizeLods: t, _sigmas: i }
	}
	function Ji(e) {
		const t = new J(3 * Ri, 3 * Ri, e)
		return (t.texture.mapping = u), (t.texture.name = 'PMREM.cubeUv'), (t.scissorTest = !0), t
	}
	function Ki(e, t, i, n, r) {
		e.viewport.set(t, i, n, r), e.scissor.set(t, i, n, r)
	}
	function $i() {
		const e = new H(1, 1)
		return new Ii({
			name: 'EquirectangularToCubeUV',
			uniforms: { envMap: { value: null }, texelSize: { value: e }, inputEncoding: { value: Bi[3e3] } },
			vertexShader: tn(),
			fragmentShader: `precision mediump float;precision mediump int;varying vec3 vOutputDirection;uniform sampler2D envMap;uniform vec2 texelSize;\n${nn()}\n#include <common>\nvoid main(){gl_FragColor=vec4(0.0,0.0,0.0,1.0);vec3 outputDirection=normalize(vOutputDirection);vec2 uv=equirectUv(outputDirection);vec2 f=fract(uv/texelSize-0.5);uv-=f*texelSize;vec3 tl=envMapTexelToLinear(texture2D(envMap,uv)).rgb;uv.x+=texelSize.x;vec3 tr=envMapTexelToLinear(texture2D(envMap,uv)).rgb;uv.y+=texelSize.y;vec3 br=envMapTexelToLinear(texture2D(envMap,uv)).rgb;uv.x-=texelSize.x;vec3 bl=envMapTexelToLinear(texture2D(envMap,uv)).rgb;vec3 tm=mix(tl,tr,f.x);vec3 bm=mix(bl,br,f.x);gl_FragColor.rgb=mix(tm,bm,f.y);}`,
			blending: 0,
			depthTest: !1,
			depthWrite: !1,
		})
	}
	function en() {
		return new Ii({
			name: 'CubemapToCubeUV',
			uniforms: { envMap: { value: null }, inputEncoding: { value: Bi[3e3] } },
			vertexShader: tn(),
			fragmentShader: `precision mediump float;precision mediump int;varying vec3 vOutputDirection;uniform samplerCube envMap;\n${nn()}\nvoid main(){gl_FragColor=envMapTexelToLinear(textureCube(envMap,vec3(-vOutputDirection.x,vOutputDirection.yz)));}`,
			blending: 0,
			depthTest: !1,
			depthWrite: !1,
		})
	}
	function tn() {
		return 'precision mediump float;precision mediump int;attribute vec3 position;attribute vec2 uv;attribute float faceIndex;varying vec3 vOutputDirection;vec3 getDirection(vec2 uv,float face){uv=2.0*uv-1.0;vec3 direction=vec3(uv,1.0);if(face==0.0){direction=direction.zyx;}else if(face==1.0){direction=direction.xzy;direction.xz*=-1.0;}else if(face==2.0){direction.x*=-1.0;}else if(face==3.0){direction=direction.zyx;direction.xz*=-1.0;}else if(face==4.0){direction=direction.xzy;direction.xy*=-1.0;}else if(face==5.0){direction.z*=-1.0;}return direction;}void main(){vOutputDirection=getDirection(uv,faceIndex);gl_Position=vec4(position,1.0);}'
	}
	function nn() {
		return 'uniform int inputEncoding;\n#include <encodings_pars_fragment>\nvec4 inputTexelToLinear(vec4 value){if(inputEncoding==0){return value;}else{return sRGBToLinear(value);}}vec4 envMapTexelToLinear(vec4 color){return inputTexelToLinear(color);}'
	}
	function rn(e) {
		let t = new WeakMap(),
			i = null
		function n(e) {
			const i = e.target
			i.removeEventListener('dispose', n)
			const r = t.get(i)
			void 0 !== r && (t.delete(i), r.dispose())
		}
		return {
			get: function (r) {
				if (r && r.isTexture && !1 === r.isRenderTargetTexture) {
					const a = r.mapping,
						s = a === d || 304 === a,
						o = a === c || a === h
					if (s || o) {
						if (t.has(r)) return t.get(r).texture
						{
							const a = r.image
							if (
								(s && a && a.height > 0) ||
								(o &&
									a &&
									(function (e) {
										let t = 0
										const i = 6
										for (let n = 0; n < i; n++) void 0 !== e[n] && t++
										return t === i
									})(a))
							) {
								const a = e.getRenderTarget()
								null === i && (i = new qi(e))
								const o = s ? i.fromEquirectangular(r) : i.fromCubemap(r)
								return t.set(r, o), e.setRenderTarget(a), r.addEventListener('dispose', n), o.texture
							}
							return null
						}
					}
				}
				return r
			},
			dispose: function () {
				;(t = new WeakMap()), null !== i && (i.dispose(), (i = null))
			},
		}
	}
	function an(e) {
		const t = {}
		function i(i) {
			if (void 0 !== t[i]) return t[i]
			let n
			switch (i) {
				case 'WEBGL_depth_texture':
					n = e.getExtension('WEBGL_depth_texture') || e.getExtension('MOZ_WEBGL_depth_texture') || e.getExtension('WEBKIT_WEBGL_depth_texture')
					break
				case 'EXT_texture_filter_anisotropic':
					n =
						e.getExtension('EXT_texture_filter_anisotropic') ||
						e.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
						e.getExtension('WEBKIT_EXT_texture_filter_anisotropic')
					break
				case 'WEBGL_compressed_texture_s3tc':
					n =
						e.getExtension('WEBGL_compressed_texture_s3tc') ||
						e.getExtension('MOZ_WEBGL_compressed_texture_s3tc') ||
						e.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc')
					break
				case 'WEBGL_compressed_texture_pvrtc':
					n = e.getExtension('WEBGL_compressed_texture_pvrtc') || e.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc')
					break
				default:
					n = e.getExtension(i)
			}
			return (t[i] = n), n
		}
		return {
			has: function (e) {
				return null !== i(e)
			},
			init: function (e) {
				e.isWebGL2
					? i('EXT_color_buffer_float')
					: (i('WEBGL_depth_texture'),
					  i('OES_texture_float'),
					  i('OES_texture_half_float'),
					  i('OES_texture_half_float_linear'),
					  i('OES_standard_derivatives'),
					  i('OES_element_index_uint'),
					  i('OES_vertex_array_object'),
					  i('ANGLE_instanced_arrays')),
					i('OES_texture_float_linear'),
					i('EXT_color_buffer_half_float'),
					i('WEBGL_multisampled_render_to_texture')
			},
			get: function (e) {
				const t = i(e)
				return null === t && console.warn('THREE.WebGLRenderer: ' + e + ' extension not supported.'), t
			},
		}
	}
	function sn(e, t, i, n) {
		const r = {},
			a = new WeakMap()
		function s(e) {
			const o = e.target
			null !== o.index && t.remove(o.index)
			for (const e in o.attributes) t.remove(o.attributes[e])
			o.removeEventListener('dispose', s), delete r[o.id]
			const l = a.get(o)
			l && (t.remove(l), a.delete(o)), n.releaseStatesOfGeometry(o), !0 === o.isInstancedBufferGeometry && delete o._maxInstanceCount, i.memory.geometries--
		}
		function o(e) {
			const i = [],
				n = e.index,
				r = e.attributes.position
			let s = 0
			if (null !== n) {
				const e = n.array
				s = n.version
				for (let t = 0, n = e.length; t < n; t += 3) {
					const n = e[t + 0],
						r = e[t + 1],
						a = e[t + 2]
					i.push(n, r, r, a, a, n)
				}
			} else {
				const e = r.array
				s = r.version
				for (let t = 0, n = e.length / 3 - 1; t < n; t += 3) {
					const e = t + 0,
						n = t + 1,
						r = t + 2
					i.push(e, n, n, r, r, e)
				}
			}
			const o = new (W(i) > 65535 ? Lt : Et)(i, 1)
			o.version = s
			const l = a.get(e)
			l && t.remove(l), a.set(e, o)
		}
		return {
			get: function (e, t) {
				return !0 === r[t.id] || (t.addEventListener('dispose', s), (r[t.id] = !0), i.memory.geometries++), t
			},
			update: function (e) {
				const i = e.attributes
				for (const e in i) t.update(i[e], 34962)
				const n = e.morphAttributes
				for (const e in n) {
					const i = n[e]
					for (let e = 0, n = i.length; e < n; e++) t.update(i[e], 34962)
				}
			},
			getWireframeAttribute: function (e) {
				const t = a.get(e)
				if (t) {
					const i = e.index
					null !== i && t.version < i.version && o(e)
				} else o(e)
				return a.get(e)
			},
		}
	}
	function on(e, t, i, n) {
		const r = n.isWebGL2
		let a, s, o
		;(this.setMode = function (e) {
			a = e
		}),
			(this.setIndex = function (e) {
				;(s = e.type), (o = e.bytesPerElement)
			}),
			(this.render = function (t, n) {
				e.drawElements(a, n, s, t * o), i.update(n, a, 1)
			}),
			(this.renderInstances = function (n, l, c) {
				if (0 === c) return
				let h, d
				if (r) (h = e), (d = 'drawElementsInstanced')
				else if (((h = t.get('ANGLE_instanced_arrays')), (d = 'drawElementsInstancedANGLE'), null === h))
					return void console.error(
						'THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.'
					)
				h[d](a, l, s, n * o, c), i.update(l, a, c)
			})
	}
	function ln(e) {
		const t = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 }
		return {
			memory: { geometries: 0, textures: 0 },
			render: t,
			programs: null,
			autoReset: !0,
			reset: function () {
				t.frame++, (t.calls = 0), (t.triangles = 0), (t.points = 0), (t.lines = 0)
			},
			update: function (e, i, n) {
				switch ((t.calls++, i)) {
					case 4:
						t.triangles += n * (e / 3)
						break
					case 1:
						t.lines += n * (e / 2)
						break
					case 3:
						t.lines += n * (e - 1)
						break
					case 2:
						t.lines += n * e
						break
					case 0:
						t.points += n * e
						break
					default:
						console.error('THREE.WebGLInfo: Unknown draw mode:', i)
				}
			},
		}
	}
	class cn extends Q {
		constructor(e = null, t = 1, i = 1, n = 1) {
			super(null),
				(this.image = { data: e, width: t, height: i, depth: n }),
				(this.magFilter = g),
				(this.minFilter = g),
				(this.wrapR = f),
				(this.generateMipmaps = !1),
				(this.flipY = !1),
				(this.unpackAlignment = 1)
		}
	}
	function hn(e, t) {
		return e[0] - t[0]
	}
	function dn(e, t) {
		return Math.abs(t[1]) - Math.abs(e[1])
	}
	function un(e, t) {
		let i = 1
		const n = t.isInterleavedBufferAttribute ? t.data.array : t.array
		n instanceof Int8Array
			? (i = 127)
			: n instanceof Int16Array
			? (i = 32767)
			: n instanceof Int32Array
			? (i = 2147483647)
			: console.error('THREE.WebGLMorphtargets: Unsupported morph attribute data type: ', n),
			e.divideScalar(i)
	}
	function pn(e, t, i) {
		const n = {},
			r = new Float32Array(8),
			a = new WeakMap(),
			s = new ee(),
			o = []
		for (let e = 0; e < 8; e++) o[e] = [e, 0]
		return {
			update: function (l, c, h, d) {
				const u = l.morphTargetInfluences
				if (!0 === t.isWebGL2) {
					const n = c.morphAttributes.position.length
					let r = a.get(c)
					if (void 0 === r || r.count !== n) {
						void 0 !== r && r.texture.dispose()
						const e = void 0 !== c.morphAttributes.normal,
							i = c.morphAttributes.position,
							o = c.morphAttributes.normal || [],
							l = !0 === e ? 2 : 1
						let h = c.attributes.position.count * l,
							d = 1
						h > t.maxTextureSize && ((d = Math.ceil(h / t.maxTextureSize)), (h = t.maxTextureSize))
						const u = new Float32Array(h * d * 4 * n),
							p = new cn(u, h, d, n)
						;(p.format = A), (p.type = b), (p.needsUpdate = !0)
						const f = 4 * l
						for (let t = 0; t < n; t++) {
							const n = i[t],
								r = o[t],
								a = h * d * 4 * t
							for (let t = 0; t < n.count; t++) {
								s.fromBufferAttribute(n, t), !0 === n.normalized && un(s, n)
								const i = t * f
								;(u[a + i + 0] = s.x),
									(u[a + i + 1] = s.y),
									(u[a + i + 2] = s.z),
									(u[a + i + 3] = 0),
									!0 === e &&
										(s.fromBufferAttribute(r, t),
										!0 === r.normalized && un(s, r),
										(u[a + i + 4] = s.x),
										(u[a + i + 5] = s.y),
										(u[a + i + 6] = s.z),
										(u[a + i + 7] = 0))
							}
						}
						;(r = { count: n, texture: p, size: new H(h, d) }), a.set(c, r)
					}
					let o = 0
					for (let e = 0; e < u.length; e++) o += u[e]
					const l = c.morphTargetsRelative ? 1 : 1 - o
					d.getUniforms().setValue(e, 'morphTargetBaseInfluence', l),
						d.getUniforms().setValue(e, 'morphTargetInfluences', u),
						d.getUniforms().setValue(e, 'morphTargetsTexture', r.texture, i),
						d.getUniforms().setValue(e, 'morphTargetsTextureSize', r.size)
				} else {
					const t = void 0 === u ? 0 : u.length
					let i = n[c.id]
					if (void 0 === i || i.length !== t) {
						i = []
						for (let e = 0; e < t; e++) i[e] = [e, 0]
						n[c.id] = i
					}
					for (let e = 0; e < t; e++) {
						const t = i[e]
						;(t[0] = e), (t[1] = u[e])
					}
					i.sort(dn)
					for (let e = 0; e < 8; e++) e < t && i[e][1] ? ((o[e][0] = i[e][0]), (o[e][1] = i[e][1])) : ((o[e][0] = Number.MAX_SAFE_INTEGER), (o[e][1] = 0))
					o.sort(hn)
					const a = c.morphAttributes.position,
						s = c.morphAttributes.normal
					let l = 0
					for (let e = 0; e < 8; e++) {
						const t = o[e],
							i = t[0],
							n = t[1]
						i !== Number.MAX_SAFE_INTEGER && n
							? (a && c.getAttribute('morphTarget' + e) !== a[i] && c.setAttribute('morphTarget' + e, a[i]),
							  s && c.getAttribute('morphNormal' + e) !== s[i] && c.setAttribute('morphNormal' + e, s[i]),
							  (r[e] = n),
							  (l += n))
							: (a && !0 === c.hasAttribute('morphTarget' + e) && c.deleteAttribute('morphTarget' + e),
							  s && !0 === c.hasAttribute('morphNormal' + e) && c.deleteAttribute('morphNormal' + e),
							  (r[e] = 0))
					}
					const h = c.morphTargetsRelative ? 1 : 1 - l
					d.getUniforms().setValue(e, 'morphTargetBaseInfluence', h), d.getUniforms().setValue(e, 'morphTargetInfluences', r)
				}
			},
		}
	}
	function fn(e, t, i, n) {
		let r = new WeakMap()
		function a(e) {
			const t = e.target
			t.removeEventListener('dispose', a), i.remove(t.instanceMatrix), null !== t.instanceColor && i.remove(t.instanceColor)
		}
		return {
			update: function (e) {
				const s = n.render.frame,
					o = e.geometry,
					l = t.get(e, o)
				return (
					r.get(l) !== s && (t.update(l), r.set(l, s)),
					e.isInstancedMesh &&
						(!1 === e.hasEventListener('dispose', a) && e.addEventListener('dispose', a),
						i.update(e.instanceMatrix, 34962),
						null !== e.instanceColor && i.update(e.instanceColor, 34962)),
					l
				)
			},
			dispose: function () {
				r = new WeakMap()
			},
		}
	}
	cn.prototype.isDataTexture2DArray = !0
	class mn extends Q {
		constructor(e = null, t = 1, i = 1, n = 1) {
			super(null),
				(this.image = { data: e, width: t, height: i, depth: n }),
				(this.magFilter = g),
				(this.minFilter = g),
				(this.wrapR = f),
				(this.generateMipmaps = !1),
				(this.flipY = !1),
				(this.unpackAlignment = 1)
		}
	}
	mn.prototype.isDataTexture3D = !0
	const gn = new Q(),
		xn = new cn(),
		_n = new mn(),
		vn = new ui(),
		yn = [],
		Mn = [],
		bn = new Float32Array(16),
		Sn = new Float32Array(9),
		wn = new Float32Array(4)
	function Tn(e, t, i) {
		const n = e[0]
		if (n <= 0 || n > 0) return e
		const r = t * i
		let a = yn[r]
		if ((void 0 === a && ((a = new Float32Array(r)), (yn[r] = a)), 0 !== t)) {
			n.toArray(a, 0)
			for (let n = 1, r = 0; n !== t; ++n) (r += i), e[n].toArray(a, r)
		}
		return a
	}
	function An(e, t) {
		if (e.length !== t.length) return !1
		for (let i = 0, n = e.length; i < n; i++) if (e[i] !== t[i]) return !1
		return !0
	}
	function En(e, t) {
		for (let i = 0, n = t.length; i < n; i++) e[i] = t[i]
	}
	function Ln(e, t) {
		let i = Mn[t]
		void 0 === i && ((i = new Int32Array(t)), (Mn[t] = i))
		for (let n = 0; n !== t; ++n) i[n] = e.allocateTextureUnit()
		return i
	}
	function Pn(e, t) {
		const i = this.cache
		i[0] !== t && (e.uniform1f(this.addr, t), (i[0] = t))
	}
	function Fn(e, t) {
		const i = this.cache
		if (void 0 !== t.x) (i[0] === t.x && i[1] === t.y) || (e.uniform2f(this.addr, t.x, t.y), (i[0] = t.x), (i[1] = t.y))
		else {
			if (An(i, t)) return
			e.uniform2fv(this.addr, t), En(i, t)
		}
	}
	function Cn(e, t) {
		const i = this.cache
		if (void 0 !== t.x) (i[0] === t.x && i[1] === t.y && i[2] === t.z) || (e.uniform3f(this.addr, t.x, t.y, t.z), (i[0] = t.x), (i[1] = t.y), (i[2] = t.z))
		else if (void 0 !== t.r) (i[0] === t.r && i[1] === t.g && i[2] === t.b) || (e.uniform3f(this.addr, t.r, t.g, t.b), (i[0] = t.r), (i[1] = t.g), (i[2] = t.b))
		else {
			if (An(i, t)) return
			e.uniform3fv(this.addr, t), En(i, t)
		}
	}
	function Nn(e, t) {
		const i = this.cache
		if (void 0 !== t.x)
			(i[0] === t.x && i[1] === t.y && i[2] === t.z && i[3] === t.w) ||
				(e.uniform4f(this.addr, t.x, t.y, t.z, t.w), (i[0] = t.x), (i[1] = t.y), (i[2] = t.z), (i[3] = t.w))
		else {
			if (An(i, t)) return
			e.uniform4fv(this.addr, t), En(i, t)
		}
	}
	function Dn(e, t) {
		const i = this.cache,
			n = t.elements
		if (void 0 === n) {
			if (An(i, t)) return
			e.uniformMatrix2fv(this.addr, !1, t), En(i, t)
		} else {
			if (An(i, n)) return
			wn.set(n), e.uniformMatrix2fv(this.addr, !1, wn), En(i, n)
		}
	}
	function In(e, t) {
		const i = this.cache,
			n = t.elements
		if (void 0 === n) {
			if (An(i, t)) return
			e.uniformMatrix3fv(this.addr, !1, t), En(i, t)
		} else {
			if (An(i, n)) return
			Sn.set(n), e.uniformMatrix3fv(this.addr, !1, Sn), En(i, n)
		}
	}
	function Rn(e, t) {
		const i = this.cache,
			n = t.elements
		if (void 0 === n) {
			if (An(i, t)) return
			e.uniformMatrix4fv(this.addr, !1, t), En(i, t)
		} else {
			if (An(i, n)) return
			bn.set(n), e.uniformMatrix4fv(this.addr, !1, bn), En(i, n)
		}
	}
	function Un(e, t) {
		const i = this.cache
		i[0] !== t && (e.uniform1i(this.addr, t), (i[0] = t))
	}
	function zn(e, t) {
		const i = this.cache
		An(i, t) || (e.uniform2iv(this.addr, t), En(i, t))
	}
	function On(e, t) {
		const i = this.cache
		An(i, t) || (e.uniform3iv(this.addr, t), En(i, t))
	}
	function Bn(e, t) {
		const i = this.cache
		An(i, t) || (e.uniform4iv(this.addr, t), En(i, t))
	}
	function kn(e, t) {
		const i = this.cache
		i[0] !== t && (e.uniform1ui(this.addr, t), (i[0] = t))
	}
	function Gn(e, t) {
		const i = this.cache
		An(i, t) || (e.uniform2uiv(this.addr, t), En(i, t))
	}
	function Hn(e, t) {
		const i = this.cache
		An(i, t) || (e.uniform3uiv(this.addr, t), En(i, t))
	}
	function Vn(e, t) {
		const i = this.cache
		An(i, t) || (e.uniform4uiv(this.addr, t), En(i, t))
	}
	function Wn(e, t, i) {
		const n = this.cache,
			r = i.allocateTextureUnit()
		n[0] !== r && (e.uniform1i(this.addr, r), (n[0] = r)), i.safeSetTexture2D(t || gn, r)
	}
	function Xn(e, t, i) {
		const n = this.cache,
			r = i.allocateTextureUnit()
		n[0] !== r && (e.uniform1i(this.addr, r), (n[0] = r)), i.setTexture3D(t || _n, r)
	}
	function Yn(e, t, i) {
		const n = this.cache,
			r = i.allocateTextureUnit()
		n[0] !== r && (e.uniform1i(this.addr, r), (n[0] = r)), i.safeSetTextureCube(t || vn, r)
	}
	function jn(e, t, i) {
		const n = this.cache,
			r = i.allocateTextureUnit()
		n[0] !== r && (e.uniform1i(this.addr, r), (n[0] = r)), i.setTexture2DArray(t || xn, r)
	}
	function Qn(e, t) {
		e.uniform1fv(this.addr, t)
	}
	function qn(e, t) {
		const i = Tn(t, this.size, 2)
		e.uniform2fv(this.addr, i)
	}
	function Zn(e, t) {
		const i = Tn(t, this.size, 3)
		e.uniform3fv(this.addr, i)
	}
	function Jn(e, t) {
		const i = Tn(t, this.size, 4)
		e.uniform4fv(this.addr, i)
	}
	function Kn(e, t) {
		const i = Tn(t, this.size, 4)
		e.uniformMatrix2fv(this.addr, !1, i)
	}
	function $n(e, t) {
		const i = Tn(t, this.size, 9)
		e.uniformMatrix3fv(this.addr, !1, i)
	}
	function er(e, t) {
		const i = Tn(t, this.size, 16)
		e.uniformMatrix4fv(this.addr, !1, i)
	}
	function tr(e, t) {
		e.uniform1iv(this.addr, t)
	}
	function ir(e, t) {
		e.uniform2iv(this.addr, t)
	}
	function nr(e, t) {
		e.uniform3iv(this.addr, t)
	}
	function rr(e, t) {
		e.uniform4iv(this.addr, t)
	}
	function ar(e, t) {
		e.uniform1uiv(this.addr, t)
	}
	function sr(e, t) {
		e.uniform2uiv(this.addr, t)
	}
	function or(e, t) {
		e.uniform3uiv(this.addr, t)
	}
	function lr(e, t) {
		e.uniform4uiv(this.addr, t)
	}
	function cr(e, t, i) {
		const n = t.length,
			r = Ln(i, n)
		e.uniform1iv(this.addr, r)
		for (let e = 0; e !== n; ++e) i.safeSetTexture2D(t[e] || gn, r[e])
	}
	function hr(e, t, i) {
		const n = t.length,
			r = Ln(i, n)
		e.uniform1iv(this.addr, r)
		for (let e = 0; e !== n; ++e) i.setTexture3D(t[e] || _n, r[e])
	}
	function dr(e, t, i) {
		const n = t.length,
			r = Ln(i, n)
		e.uniform1iv(this.addr, r)
		for (let e = 0; e !== n; ++e) i.safeSetTextureCube(t[e] || vn, r[e])
	}
	function ur(e, t, i) {
		const n = t.length,
			r = Ln(i, n)
		e.uniform1iv(this.addr, r)
		for (let e = 0; e !== n; ++e) i.setTexture2DArray(t[e] || xn, r[e])
	}
	function pr(e, t, i) {
		;(this.id = e),
			(this.addr = i),
			(this.cache = []),
			(this.setValue = (function (e) {
				switch (e) {
					case 5126:
						return Pn
					case 35664:
						return Fn
					case 35665:
						return Cn
					case 35666:
						return Nn
					case 35674:
						return Dn
					case 35675:
						return In
					case 35676:
						return Rn
					case 5124:
					case 35670:
						return Un
					case 35667:
					case 35671:
						return zn
					case 35668:
					case 35672:
						return On
					case 35669:
					case 35673:
						return Bn
					case 5125:
						return kn
					case 36294:
						return Gn
					case 36295:
						return Hn
					case 36296:
						return Vn
					case 35678:
					case 36198:
					case 36298:
					case 36306:
					case 35682:
						return Wn
					case 35679:
					case 36299:
					case 36307:
						return Xn
					case 35680:
					case 36300:
					case 36308:
					case 36293:
						return Yn
					case 36289:
					case 36303:
					case 36311:
					case 36292:
						return jn
				}
			})(t.type))
	}
	function fr(e, t, i) {
		;(this.id = e),
			(this.addr = i),
			(this.cache = []),
			(this.size = t.size),
			(this.setValue = (function (e) {
				switch (e) {
					case 5126:
						return Qn
					case 35664:
						return qn
					case 35665:
						return Zn
					case 35666:
						return Jn
					case 35674:
						return Kn
					case 35675:
						return $n
					case 35676:
						return er
					case 5124:
					case 35670:
						return tr
					case 35667:
					case 35671:
						return ir
					case 35668:
					case 35672:
						return nr
					case 35669:
					case 35673:
						return rr
					case 5125:
						return ar
					case 36294:
						return sr
					case 36295:
						return or
					case 36296:
						return lr
					case 35678:
					case 36198:
					case 36298:
					case 36306:
					case 35682:
						return cr
					case 35679:
					case 36299:
					case 36307:
						return hr
					case 35680:
					case 36300:
					case 36308:
					case 36293:
						return dr
					case 36289:
					case 36303:
					case 36311:
					case 36292:
						return ur
				}
			})(t.type))
	}
	function mr(e) {
		;(this.id = e), (this.seq = []), (this.map = {})
	}
	;(fr.prototype.updateCache = function (e) {
		const t = this.cache
		e instanceof Float32Array && t.length !== e.length && (this.cache = new Float32Array(e.length)), En(t, e)
	}),
		(mr.prototype.setValue = function (e, t, i) {
			const n = this.seq
			for (let r = 0, a = n.length; r !== a; ++r) {
				const a = n[r]
				a.setValue(e, t[a.id], i)
			}
		})
	const gr = /(\w+)(\])?(\[|\.)?/g
	function xr(e, t) {
		e.seq.push(t), (e.map[t.id] = t)
	}
	function _r(e, t, i) {
		const n = e.name,
			r = n.length
		for (gr.lastIndex = 0; ; ) {
			const a = gr.exec(n),
				s = gr.lastIndex
			let o = a[1]
			const l = ']' === a[2],
				c = a[3]
			if ((l && (o |= 0), void 0 === c || ('[' === c && s + 2 === r))) {
				xr(i, void 0 === c ? new pr(o, e, t) : new fr(o, e, t))
				break
			}
			{
				let e = i.map[o]
				void 0 === e && ((e = new mr(o)), xr(i, e)), (i = e)
			}
		}
	}
	function vr(e, t) {
		;(this.seq = []), (this.map = {})
		const i = e.getProgramParameter(t, 35718)
		for (let n = 0; n < i; ++n) {
			const i = e.getActiveUniform(t, n)
			_r(i, e.getUniformLocation(t, i.name), this)
		}
	}
	function yr(e, t, i) {
		const n = e.createShader(t)
		return e.shaderSource(n, i), e.compileShader(n), n
	}
	;(vr.prototype.setValue = function (e, t, i, n) {
		const r = this.map[t]
		void 0 !== r && r.setValue(e, i, n)
	}),
		(vr.prototype.setOptional = function (e, t, i) {
			const n = t[i]
			void 0 !== n && this.setValue(e, i, n)
		}),
		(vr.upload = function (e, t, i, n) {
			for (let r = 0, a = t.length; r !== a; ++r) {
				const a = t[r],
					s = i[a.id]
				!1 !== s.needsUpdate && a.setValue(e, s.value, n)
			}
		}),
		(vr.seqWithValue = function (e, t) {
			const i = []
			for (let n = 0, r = e.length; n !== r; ++n) {
				const r = e[n]
				r.id in t && i.push(r)
			}
			return i
		})
	let Mr = 0
	function br(e) {
		switch (e) {
			case P:
				return ['Linear', '( value )']
			case F:
				return ['sRGB', '( value )']
			default:
				return console.warn('THREE.WebGLProgram: Unsupported encoding:', e), ['Linear', '( value )']
		}
	}
	function Sr(e, t, i) {
		const n = e.getShaderParameter(t, 35713),
			r = e.getShaderInfoLog(t).trim()
		return n && '' === r
			? ''
			: i.toUpperCase() +
					'\n\n' +
					r +
					'\n\n' +
					(function (e) {
						const t = e.split('\n')
						for (let e = 0; e < t.length; e++) t[e] = e + 1 + ': ' + t[e]
						return t.join('\n')
					})(e.getShaderSource(t))
	}
	function wr(e, t) {
		const i = br(t)
		return 'vec4 ' + e + '( vec4 value ) { return ' + i[0] + 'ToLinear' + i[1] + '; }'
	}
	function Tr(e, t) {
		const i = br(t)
		return 'vec4 ' + e + '( vec4 value ) { return LinearTo' + i[0] + i[1] + '; }'
	}
	function Ar(e, t) {
		let i
		switch (t) {
			case 1:
				i = 'Linear'
				break
			case 2:
				i = 'Reinhard'
				break
			case 3:
				i = 'OptimizedCineon'
				break
			case 4:
				i = 'ACESFilmic'
				break
			case 5:
				i = 'Custom'
				break
			default:
				console.warn('THREE.WebGLProgram: Unsupported toneMapping:', t), (i = 'Linear')
		}
		return 'vec3 ' + e + '( vec3 color ) { return ' + i + 'ToneMapping( color ); }'
	}
	function Er(e) {
		return '' !== e
	}
	function Lr(e, t) {
		return e
			.replace(/NUM_DIR_LIGHTS/g, t.numDirLights)
			.replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights)
			.replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights)
			.replace(/NUM_POINT_LIGHTS/g, t.numPointLights)
			.replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights)
			.replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows)
			.replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows)
			.replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows)
	}
	function Pr(e, t) {
		return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection)
	}
	const Fr = /^[ \t]*#include +<([\w\d./]+)>/gm
	function Cr(e) {
		return e.replace(Fr, Nr)
	}
	function Nr(e, t) {
		const i = wi[t]
		if (void 0 === i) throw new Error('Can not resolve #include <' + t + '>')
		return Cr(i)
	}
	const Dr = /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,
		Ir = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g
	function Rr(e) {
		return e.replace(Ir, zr).replace(Dr, Ur)
	}
	function Ur(e, t, i, n) {
		return console.warn('WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead.'), zr(e, t, i, n)
	}
	function zr(e, t, i, n) {
		let r = ''
		for (let e = parseInt(t); e < parseInt(i); e++) r += n.replace(/\[\s*i\s*\]/g, '[ ' + e + ' ]').replace(/UNROLLED_LOOP_INDEX/g, e)
		return r
	}
	function Or(e) {
		let t = 'precision ' + e.precision + ' float;\nprecision ' + e.precision + ' int;'
		return (
			'highp' === e.precision
				? (t += '\n#define HIGH_PRECISION')
				: 'mediump' === e.precision
				? (t += '\n#define MEDIUM_PRECISION')
				: 'lowp' === e.precision && (t += '\n#define LOW_PRECISION'),
			t
		)
	}
	function Br(e, t, i, n) {
		const r = e.getContext(),
			a = i.defines
		let s = i.vertexShader,
			o = i.fragmentShader
		const l = (function (e) {
				let t = 'SHADOWMAP_TYPE_BASIC'
				return (
					1 === e.shadowMapType
						? (t = 'SHADOWMAP_TYPE_PCF')
						: 2 === e.shadowMapType
						? (t = 'SHADOWMAP_TYPE_PCF_SOFT')
						: 3 === e.shadowMapType && (t = 'SHADOWMAP_TYPE_VSM'),
					t
				)
			})(i),
			d = (function (e) {
				let t = 'ENVMAP_TYPE_CUBE'
				if (e.envMap)
					switch (e.envMapMode) {
						case c:
						case h:
							t = 'ENVMAP_TYPE_CUBE'
							break
						case u:
						case 307:
							t = 'ENVMAP_TYPE_CUBE_UV'
					}
				return t
			})(i),
			p = (function (e) {
				let t = 'ENVMAP_MODE_REFLECTION'
				if (e.envMap)
					switch (e.envMapMode) {
						case h:
						case 307:
							t = 'ENVMAP_MODE_REFRACTION'
					}
				return t
			})(i),
			f = (function (e) {
				let t = 'ENVMAP_BLENDING_NONE'
				if (e.envMap)
					switch (e.combine) {
						case 0:
							t = 'ENVMAP_BLENDING_MULTIPLY'
							break
						case 1:
							t = 'ENVMAP_BLENDING_MIX'
							break
						case 2:
							t = 'ENVMAP_BLENDING_ADD'
					}
				return t
			})(i),
			m = i.isWebGL2
				? ''
				: (function (e) {
						return [
							e.extensionDerivatives ||
							e.envMapCubeUV ||
							e.bumpMap ||
							e.tangentSpaceNormalMap ||
							e.clearcoatNormalMap ||
							e.flatShading ||
							'physical' === e.shaderID
								? '#extension GL_OES_standard_derivatives : enable'
								: '',
							(e.extensionFragDepth || e.logarithmicDepthBuffer) && e.rendererExtensionFragDepth ? '#extension GL_EXT_frag_depth : enable' : '',
							e.extensionDrawBuffers && e.rendererExtensionDrawBuffers ? '#extension GL_EXT_draw_buffers : require' : '',
							(e.extensionShaderTextureLOD || e.envMap || e.transmission) && e.rendererExtensionShaderTextureLod
								? '#extension GL_EXT_shader_texture_lod : enable'
								: '',
						]
							.filter(Er)
							.join('\n')
				  })(i),
			g = (function (e) {
				const t = []
				for (const i in e) {
					const n = e[i]
					!1 !== n && t.push('#define ' + i + ' ' + n)
				}
				return t.join('\n')
			})(a),
			x = r.createProgram()
		let _,
			v,
			y = i.glslVersion ? '#version ' + i.glslVersion + '\n' : ''
		i.isRawShaderMaterial
			? ((_ = [g].filter(Er).join('\n')), _.length > 0 && (_ += '\n'), (v = [m, g].filter(Er).join('\n')), v.length > 0 && (v += '\n'))
			: ((_ = [
					Or(i),
					'#define SHADER_NAME ' + i.shaderName,
					g,
					i.instancing ? '#define USE_INSTANCING' : '',
					i.instancingColor ? '#define USE_INSTANCING_COLOR' : '',
					i.supportsVertexTextures ? '#define VERTEX_TEXTURES' : '',
					'#define MAX_BONES ' + i.maxBones,
					i.useFog && i.fog ? '#define USE_FOG' : '',
					i.useFog && i.fogExp2 ? '#define FOG_EXP2' : '',
					i.map ? '#define USE_MAP' : '',
					i.envMap ? '#define USE_ENVMAP' : '',
					i.envMap ? '#define ' + p : '',
					i.lightMap ? '#define USE_LIGHTMAP' : '',
					i.aoMap ? '#define USE_AOMAP' : '',
					i.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
					i.bumpMap ? '#define USE_BUMPMAP' : '',
					i.normalMap ? '#define USE_NORMALMAP' : '',
					i.normalMap && i.objectSpaceNormalMap ? '#define OBJECTSPACE_NORMALMAP' : '',
					i.normalMap && i.tangentSpaceNormalMap ? '#define TANGENTSPACE_NORMALMAP' : '',
					i.clearcoatMap ? '#define USE_CLEARCOATMAP' : '',
					i.clearcoatRoughnessMap ? '#define USE_CLEARCOAT_ROUGHNESSMAP' : '',
					i.clearcoatNormalMap ? '#define USE_CLEARCOAT_NORMALMAP' : '',
					i.displacementMap && i.supportsVertexTextures ? '#define USE_DISPLACEMENTMAP' : '',
					i.specularMap ? '#define USE_SPECULARMAP' : '',
					i.specularIntensityMap ? '#define USE_SPECULARINTENSITYMAP' : '',
					i.specularColorMap ? '#define USE_SPECULARCOLORMAP' : '',
					i.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
					i.metalnessMap ? '#define USE_METALNESSMAP' : '',
					i.alphaMap ? '#define USE_ALPHAMAP' : '',
					i.transmission ? '#define USE_TRANSMISSION' : '',
					i.transmissionMap ? '#define USE_TRANSMISSIONMAP' : '',
					i.thicknessMap ? '#define USE_THICKNESSMAP' : '',
					i.sheenColorMap ? '#define USE_SHEENCOLORMAP' : '',
					i.sheenRoughnessMap ? '#define USE_SHEENROUGHNESSMAP' : '',
					i.vertexTangents ? '#define USE_TANGENT' : '',
					i.vertexColors ? '#define USE_COLOR' : '',
					i.vertexAlphas ? '#define USE_COLOR_ALPHA' : '',
					i.vertexUvs ? '#define USE_UV' : '',
					i.uvsVertexOnly ? '#define UVS_VERTEX_ONLY' : '',
					i.flatShading ? '#define FLAT_SHADED' : '',
					i.skinning ? '#define USE_SKINNING' : '',
					i.useVertexTexture ? '#define BONE_TEXTURE' : '',
					i.morphTargets ? '#define USE_MORPHTARGETS' : '',
					i.morphNormals && !1 === i.flatShading ? '#define USE_MORPHNORMALS' : '',
					i.morphTargets && i.isWebGL2 ? '#define MORPHTARGETS_TEXTURE' : '',
					i.morphTargets && i.isWebGL2 ? '#define MORPHTARGETS_COUNT ' + i.morphTargetsCount : '',
					i.doubleSided ? '#define DOUBLE_SIDED' : '',
					i.flipSided ? '#define FLIP_SIDED' : '',
					i.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
					i.shadowMapEnabled ? '#define ' + l : '',
					i.sizeAttenuation ? '#define USE_SIZEATTENUATION' : '',
					i.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
					i.logarithmicDepthBuffer && i.rendererExtensionFragDepth ? '#define USE_LOGDEPTHBUF_EXT' : '',
					'uniform mat4 modelMatrix;',
					'uniform mat4 modelViewMatrix;',
					'uniform mat4 projectionMatrix;',
					'uniform mat4 viewMatrix;',
					'uniform mat3 normalMatrix;',
					'uniform vec3 cameraPosition;',
					'uniform bool isOrthographic;',
					'#ifdef USE_INSTANCING',
					'\tattribute mat4 instanceMatrix;',
					'#endif',
					'#ifdef USE_INSTANCING_COLOR',
					'\tattribute vec3 instanceColor;',
					'#endif',
					'attribute vec3 position;',
					'attribute vec3 normal;',
					'attribute vec2 uv;',
					'#ifdef USE_TANGENT',
					'\tattribute vec4 tangent;',
					'#endif',
					'#if defined( USE_COLOR_ALPHA )',
					'\tattribute vec4 color;',
					'#elif defined( USE_COLOR )',
					'\tattribute vec3 color;',
					'#endif',
					'#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )',
					'\tattribute vec3 morphTarget0;',
					'\tattribute vec3 morphTarget1;',
					'\tattribute vec3 morphTarget2;',
					'\tattribute vec3 morphTarget3;',
					'\t#ifdef USE_MORPHNORMALS',
					'\t\tattribute vec3 morphNormal0;',
					'\t\tattribute vec3 morphNormal1;',
					'\t\tattribute vec3 morphNormal2;',
					'\t\tattribute vec3 morphNormal3;',
					'\t#else',
					'\t\tattribute vec3 morphTarget4;',
					'\t\tattribute vec3 morphTarget5;',
					'\t\tattribute vec3 morphTarget6;',
					'\t\tattribute vec3 morphTarget7;',
					'\t#endif',
					'#endif',
					'#ifdef USE_SKINNING',
					'\tattribute vec4 skinIndex;',
					'\tattribute vec4 skinWeight;',
					'#endif',
					'\n',
			  ]
					.filter(Er)
					.join('\n')),
			  (v = [
					m,
					Or(i),
					'#define SHADER_NAME ' + i.shaderName,
					g,
					i.useFog && i.fog ? '#define USE_FOG' : '',
					i.useFog && i.fogExp2 ? '#define FOG_EXP2' : '',
					i.map ? '#define USE_MAP' : '',
					i.matcap ? '#define USE_MATCAP' : '',
					i.envMap ? '#define USE_ENVMAP' : '',
					i.envMap ? '#define ' + d : '',
					i.envMap ? '#define ' + p : '',
					i.envMap ? '#define ' + f : '',
					i.lightMap ? '#define USE_LIGHTMAP' : '',
					i.aoMap ? '#define USE_AOMAP' : '',
					i.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
					i.bumpMap ? '#define USE_BUMPMAP' : '',
					i.normalMap ? '#define USE_NORMALMAP' : '',
					i.normalMap && i.objectSpaceNormalMap ? '#define OBJECTSPACE_NORMALMAP' : '',
					i.normalMap && i.tangentSpaceNormalMap ? '#define TANGENTSPACE_NORMALMAP' : '',
					i.clearcoat ? '#define USE_CLEARCOAT' : '',
					i.clearcoatMap ? '#define USE_CLEARCOATMAP' : '',
					i.clearcoatRoughnessMap ? '#define USE_CLEARCOAT_ROUGHNESSMAP' : '',
					i.clearcoatNormalMap ? '#define USE_CLEARCOAT_NORMALMAP' : '',
					i.specularMap ? '#define USE_SPECULARMAP' : '',
					i.specularIntensityMap ? '#define USE_SPECULARINTENSITYMAP' : '',
					i.specularColorMap ? '#define USE_SPECULARCOLORMAP' : '',
					i.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
					i.metalnessMap ? '#define USE_METALNESSMAP' : '',
					i.alphaMap ? '#define USE_ALPHAMAP' : '',
					i.alphaTest ? '#define USE_ALPHATEST' : '',
					i.sheen ? '#define USE_SHEEN' : '',
					i.sheenColorMap ? '#define USE_SHEENCOLORMAP' : '',
					i.sheenRoughnessMap ? '#define USE_SHEENROUGHNESSMAP' : '',
					i.transmission ? '#define USE_TRANSMISSION' : '',
					i.transmissionMap ? '#define USE_TRANSMISSIONMAP' : '',
					i.thicknessMap ? '#define USE_THICKNESSMAP' : '',
					i.vertexTangents ? '#define USE_TANGENT' : '',
					i.vertexColors || i.instancingColor ? '#define USE_COLOR' : '',
					i.vertexAlphas ? '#define USE_COLOR_ALPHA' : '',
					i.vertexUvs ? '#define USE_UV' : '',
					i.uvsVertexOnly ? '#define UVS_VERTEX_ONLY' : '',
					i.gradientMap ? '#define USE_GRADIENTMAP' : '',
					i.flatShading ? '#define FLAT_SHADED' : '',
					i.doubleSided ? '#define DOUBLE_SIDED' : '',
					i.flipSided ? '#define FLIP_SIDED' : '',
					i.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
					i.shadowMapEnabled ? '#define ' + l : '',
					i.premultipliedAlpha ? '#define PREMULTIPLIED_ALPHA' : '',
					i.physicallyCorrectLights ? '#define PHYSICALLY_CORRECT_LIGHTS' : '',
					i.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
					i.logarithmicDepthBuffer && i.rendererExtensionFragDepth ? '#define USE_LOGDEPTHBUF_EXT' : '',
					(i.extensionShaderTextureLOD || i.envMap) && i.rendererExtensionShaderTextureLod ? '#define TEXTURE_LOD_EXT' : '',
					'uniform mat4 viewMatrix;',
					'uniform vec3 cameraPosition;',
					'uniform bool isOrthographic;',
					0 !== i.toneMapping ? '#define TONE_MAPPING' : '',
					0 !== i.toneMapping ? wi.tonemapping_pars_fragment : '',
					0 !== i.toneMapping ? Ar('toneMapping', i.toneMapping) : '',
					i.dithering ? '#define DITHERING' : '',
					i.format === T ? '#define OPAQUE' : '',
					wi.encodings_pars_fragment,
					i.map ? wr('mapTexelToLinear', i.mapEncoding) : '',
					i.matcap ? wr('matcapTexelToLinear', i.matcapEncoding) : '',
					i.envMap ? wr('envMapTexelToLinear', i.envMapEncoding) : '',
					i.emissiveMap ? wr('emissiveMapTexelToLinear', i.emissiveMapEncoding) : '',
					i.specularColorMap ? wr('specularColorMapTexelToLinear', i.specularColorMapEncoding) : '',
					i.sheenColorMap ? wr('sheenColorMapTexelToLinear', i.sheenColorMapEncoding) : '',
					i.lightMap ? wr('lightMapTexelToLinear', i.lightMapEncoding) : '',
					Tr('linearToOutputTexel', i.outputEncoding),
					i.depthPacking ? '#define DEPTH_PACKING ' + i.depthPacking : '',
					'\n',
			  ]
					.filter(Er)
					.join('\n'))),
			(s = Cr(s)),
			(s = Lr(s, i)),
			(s = Pr(s, i)),
			(o = Cr(o)),
			(o = Lr(o, i)),
			(o = Pr(o, i)),
			(s = Rr(s)),
			(o = Rr(o)),
			i.isWebGL2 &&
				!0 !== i.isRawShaderMaterial &&
				((y = '#version 300 es\n'),
				(_ = ['precision mediump sampler2DArray;', '#define attribute in', '#define varying out', '#define texture2D texture'].join('\n') + '\n' + _),
				(v =
					[
						'#define varying in',
						i.glslVersion === N ? '' : 'layout(location = 0) out highp vec4 pc_fragColor;',
						i.glslVersion === N ? '' : '#define gl_FragColor pc_fragColor',
						'#define gl_FragDepthEXT gl_FragDepth',
						'#define texture2D texture',
						'#define textureCube texture',
						'#define texture2DProj textureProj',
						'#define texture2DLodEXT textureLod',
						'#define texture2DProjLodEXT textureProjLod',
						'#define textureCubeLodEXT textureLod',
						'#define texture2DGradEXT textureGrad',
						'#define texture2DProjGradEXT textureProjGrad',
						'#define textureCubeGradEXT textureGrad',
					].join('\n') +
					'\n' +
					v))
		const M = y + v + o,
			b = yr(r, 35633, y + _ + s),
			S = yr(r, 35632, M)
		if (
			(r.attachShader(x, b),
			r.attachShader(x, S),
			void 0 !== i.index0AttributeName ? r.bindAttribLocation(x, 0, i.index0AttributeName) : !0 === i.morphTargets && r.bindAttribLocation(x, 0, 'position'),
			r.linkProgram(x),
			e.debug.checkShaderErrors)
		) {
			const e = r.getProgramInfoLog(x).trim(),
				t = r.getShaderInfoLog(b).trim(),
				i = r.getShaderInfoLog(S).trim()
			let n = !0,
				a = !0
			if (!1 === r.getProgramParameter(x, 35714)) {
				n = !1
				const t = Sr(r, b, 'vertex'),
					i = Sr(r, S, 'fragment')
				console.error(
					'THREE.WebGLProgram: Shader Error ' +
						r.getError() +
						' - VALIDATE_STATUS ' +
						r.getProgramParameter(x, 35715) +
						'\n\nProgram Info Log: ' +
						e +
						'\n' +
						t +
						'\n' +
						i
				)
			} else '' !== e ? console.warn('THREE.WebGLProgram: Program Info Log:', e) : ('' !== t && '' !== i) || (a = !1)
			a && (this.diagnostics = { runnable: n, programLog: e, vertexShader: { log: t, prefix: _ }, fragmentShader: { log: i, prefix: v } })
		}
		let w, A
		return (
			r.deleteShader(b),
			r.deleteShader(S),
			(this.getUniforms = function () {
				return void 0 === w && (w = new vr(r, x)), w
			}),
			(this.getAttributes = function () {
				return (
					void 0 === A &&
						(A = (function (e, t) {
							const i = {},
								n = e.getProgramParameter(t, 35721)
							for (let r = 0; r < n; r++) {
								const n = e.getActiveAttrib(t, r),
									a = n.name
								let s = 1
								35674 === n.type && (s = 2),
									35675 === n.type && (s = 3),
									35676 === n.type && (s = 4),
									(i[a] = { type: n.type, location: e.getAttribLocation(t, a), locationSize: s })
							}
							return i
						})(r, x)),
					A
				)
			}),
			(this.destroy = function () {
				n.releaseStatesOfProgram(this), r.deleteProgram(x), (this.program = void 0)
			}),
			(this.name = i.shaderName),
			(this.id = Mr++),
			(this.cacheKey = t),
			(this.usedTimes = 1),
			(this.program = x),
			(this.vertexShader = b),
			(this.fragmentShader = S),
			this
		)
	}
	let kr = 0
	class Gr {
		constructor() {
			;(this.shaderCache = new Map()), (this.materialCache = new Map())
		}
		update(e) {
			const t = e.vertexShader,
				i = e.fragmentShader,
				n = this._getShaderStage(t),
				r = this._getShaderStage(i),
				a = this._getShaderCacheForMaterial(e)
			return !1 === a.has(n) && (a.add(n), n.usedTimes++), !1 === a.has(r) && (a.add(r), r.usedTimes++), this
		}
		remove(e) {
			const t = this.materialCache.get(e)
			for (const e of t) e.usedTimes--, 0 === e.usedTimes && this.shaderCache.delete(e)
			return this.materialCache.delete(e), this
		}
		getVertexShaderID(e) {
			return this._getShaderStage(e.vertexShader).id
		}
		getFragmentShaderID(e) {
			return this._getShaderStage(e.fragmentShader).id
		}
		dispose() {
			this.shaderCache.clear(), this.materialCache.clear()
		}
		_getShaderCacheForMaterial(e) {
			const t = this.materialCache
			return !1 === t.has(e) && t.set(e, new Set()), t.get(e)
		}
		_getShaderStage(e) {
			const t = this.shaderCache
			if (!1 === t.has(e)) {
				const i = new Hr()
				t.set(e, i)
			}
			return t.get(e)
		}
	}
	class Hr {
		constructor() {
			;(this.id = kr++), (this.usedTimes = 0)
		}
	}
	function Vr(e, t, i, n, r, a, s) {
		const o = new He(),
			l = new Gr(),
			c = [],
			h = r.isWebGL2,
			d = r.logarithmicDepthBuffer,
			p = r.floatVertexTextures,
			f = r.maxVertexUniforms,
			m = r.vertexTextures
		let g = r.precision
		const x = {
			MeshDepthMaterial: 'depth',
			MeshDistanceMaterial: 'distanceRGBA',
			MeshNormalMaterial: 'normal',
			MeshBasicMaterial: 'basic',
			MeshLambertMaterial: 'lambert',
			MeshPhongMaterial: 'phong',
			MeshToonMaterial: 'toon',
			MeshStandardMaterial: 'physical',
			MeshPhysicalMaterial: 'physical',
			MeshMatcapMaterial: 'matcap',
			LineBasicMaterial: 'basic',
			LineDashedMaterial: 'dashed',
			PointsMaterial: 'points',
			ShadowMaterial: 'shadow',
			SpriteMaterial: 'sprite',
		}
		function _(e) {
			let t
			return (
				e && e.isTexture
					? (t = e.encoding)
					: e && e.isWebGLRenderTarget
					? (console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."),
					  (t = e.texture.encoding))
					: (t = P),
				h && e && e.isTexture && e.format === A && e.type === v && e.encoding === F && (t = P),
				t
			)
		}
		return {
			getParameters: function (a, o, c, v, y) {
				const M = v.fog,
					b = a.isMeshStandardMaterial ? v.environment : null,
					S = (a.isMeshStandardMaterial ? i : t).get(a.envMap || b),
					w = x[a.type],
					T = y.isSkinnedMesh
						? (function (e) {
								const t = e.skeleton.bones
								if (p) return 1024
								{
									const e = f,
										i = Math.floor((e - 20) / 4),
										n = Math.min(i, t.length)
									return n < t.length ? (console.warn('THREE.WebGLRenderer: Skeleton has ' + t.length + ' bones. This GPU supports ' + n + '.'), 0) : n
								}
						  })(y)
						: 0
				let A, E, L, P
				if (
					(null !== a.precision &&
						((g = r.getMaxPrecision(a.precision)),
						g !== a.precision && console.warn('THREE.WebGLProgram.getParameters:', a.precision, 'not supported, using', g, 'instead.')),
					w)
				) {
					const e = Ai[w]
					;(A = e.vertexShader), (E = e.fragmentShader)
				} else (A = a.vertexShader), (E = a.fragmentShader), l.update(a), (L = l.getVertexShaderID(a)), (P = l.getFragmentShaderID(a))
				const F = e.getRenderTarget(),
					C = a.alphaTest > 0,
					N = a.clearcoat > 0
				return {
					isWebGL2: h,
					shaderID: w,
					shaderName: a.type,
					vertexShader: A,
					fragmentShader: E,
					defines: a.defines,
					customVertexShaderID: L,
					customFragmentShaderID: P,
					isRawShaderMaterial: !0 === a.isRawShaderMaterial,
					glslVersion: a.glslVersion,
					precision: g,
					instancing: !0 === y.isInstancedMesh,
					instancingColor: !0 === y.isInstancedMesh && null !== y.instanceColor,
					supportsVertexTextures: m,
					outputEncoding: null !== F ? _(F.texture) : e.outputEncoding,
					map: !!a.map,
					mapEncoding: _(a.map),
					matcap: !!a.matcap,
					matcapEncoding: _(a.matcap),
					envMap: !!S,
					envMapMode: S && S.mapping,
					envMapEncoding: _(S),
					envMapCubeUV: !!S && (S.mapping === u || 307 === S.mapping),
					lightMap: !!a.lightMap,
					lightMapEncoding: _(a.lightMap),
					aoMap: !!a.aoMap,
					emissiveMap: !!a.emissiveMap,
					emissiveMapEncoding: _(a.emissiveMap),
					bumpMap: !!a.bumpMap,
					normalMap: !!a.normalMap,
					objectSpaceNormalMap: 1 === a.normalMapType,
					tangentSpaceNormalMap: 0 === a.normalMapType,
					clearcoat: N,
					clearcoatMap: N && !!a.clearcoatMap,
					clearcoatRoughnessMap: N && !!a.clearcoatRoughnessMap,
					clearcoatNormalMap: N && !!a.clearcoatNormalMap,
					displacementMap: !!a.displacementMap,
					roughnessMap: !!a.roughnessMap,
					metalnessMap: !!a.metalnessMap,
					specularMap: !!a.specularMap,
					specularIntensityMap: !!a.specularIntensityMap,
					specularColorMap: !!a.specularColorMap,
					specularColorMapEncoding: _(a.specularColorMap),
					alphaMap: !!a.alphaMap,
					alphaTest: C,
					gradientMap: !!a.gradientMap,
					sheen: a.sheen > 0,
					sheenColorMap: !!a.sheenColorMap,
					sheenColorMapEncoding: _(a.sheenColorMap),
					sheenRoughnessMap: !!a.sheenRoughnessMap,
					transmission: a.transmission > 0,
					transmissionMap: !!a.transmissionMap,
					thicknessMap: !!a.thicknessMap,
					combine: a.combine,
					vertexTangents: !!a.normalMap && !!y.geometry && !!y.geometry.attributes.tangent,
					vertexColors: a.vertexColors,
					vertexAlphas: !0 === a.vertexColors && !!y.geometry && !!y.geometry.attributes.color && 4 === y.geometry.attributes.color.itemSize,
					vertexUvs: !!(
						a.map ||
						a.bumpMap ||
						a.normalMap ||
						a.specularMap ||
						a.alphaMap ||
						a.emissiveMap ||
						a.roughnessMap ||
						a.metalnessMap ||
						a.clearcoatMap ||
						a.clearcoatRoughnessMap ||
						a.clearcoatNormalMap ||
						a.displacementMap ||
						a.transmissionMap ||
						a.thicknessMap ||
						a.specularIntensityMap ||
						a.specularColorMap ||
						a.sheenColorMap ||
						a.sheenRoughnessMap
					),
					uvsVertexOnly: !(
						a.map ||
						a.bumpMap ||
						a.normalMap ||
						a.specularMap ||
						a.alphaMap ||
						a.emissiveMap ||
						a.roughnessMap ||
						a.metalnessMap ||
						a.clearcoatNormalMap ||
						a.transmission > 0 ||
						a.transmissionMap ||
						a.thicknessMap ||
						a.specularIntensityMap ||
						a.specularColorMap ||
						a.sheen > 0 ||
						a.sheenColorMap ||
						a.sheenRoughnessMap ||
						!a.displacementMap
					),
					fog: !!M,
					useFog: a.fog,
					fogExp2: M && M.isFogExp2,
					flatShading: !!a.flatShading,
					sizeAttenuation: a.sizeAttenuation,
					logarithmicDepthBuffer: d,
					skinning: !0 === y.isSkinnedMesh && T > 0,
					maxBones: T,
					useVertexTexture: p,
					morphTargets: !!y.geometry && !!y.geometry.morphAttributes.position,
					morphNormals: !!y.geometry && !!y.geometry.morphAttributes.normal,
					morphTargetsCount: y.geometry && y.geometry.morphAttributes.position ? y.geometry.morphAttributes.position.length : 0,
					numDirLights: o.directional.length,
					numPointLights: o.point.length,
					numSpotLights: o.spot.length,
					numRectAreaLights: o.rectArea.length,
					numHemiLights: o.hemi.length,
					numDirLightShadows: o.directionalShadowMap.length,
					numPointLightShadows: o.pointShadowMap.length,
					numSpotLightShadows: o.spotShadowMap.length,
					numClippingPlanes: s.numPlanes,
					numClipIntersection: s.numIntersection,
					format: a.format,
					dithering: a.dithering,
					shadowMapEnabled: e.shadowMap.enabled && c.length > 0,
					shadowMapType: e.shadowMap.type,
					toneMapping: a.toneMapped ? e.toneMapping : 0,
					physicallyCorrectLights: e.physicallyCorrectLights,
					premultipliedAlpha: a.premultipliedAlpha,
					doubleSided: 2 === a.side,
					flipSided: 1 === a.side,
					depthPacking: void 0 !== a.depthPacking && a.depthPacking,
					index0AttributeName: a.index0AttributeName,
					extensionDerivatives: a.extensions && a.extensions.derivatives,
					extensionFragDepth: a.extensions && a.extensions.fragDepth,
					extensionDrawBuffers: a.extensions && a.extensions.drawBuffers,
					extensionShaderTextureLOD: a.extensions && a.extensions.shaderTextureLOD,
					rendererExtensionFragDepth: h || n.has('EXT_frag_depth'),
					rendererExtensionDrawBuffers: h || n.has('WEBGL_draw_buffers'),
					rendererExtensionShaderTextureLod: h || n.has('EXT_shader_texture_lod'),
					customProgramCacheKey: a.customProgramCacheKey(),
				}
			},
			getProgramCacheKey: function (t) {
				const i = []
				if ((t.shaderID ? i.push(t.shaderID) : (i.push(t.customVertexShaderID), i.push(t.customFragmentShaderID)), void 0 !== t.defines))
					for (const e in t.defines) i.push(e), i.push(t.defines[e])
				return (
					!1 === t.isRawShaderMaterial &&
						(!(function (e, t) {
							e.push(t.precision),
								e.push(t.outputEncoding),
								e.push(t.mapEncoding),
								e.push(t.matcapEncoding),
								e.push(t.envMapMode),
								e.push(t.envMapEncoding),
								e.push(t.lightMapEncoding),
								e.push(t.emissiveMapEncoding),
								e.push(t.combine),
								e.push(t.vertexUvs),
								e.push(t.fogExp2),
								e.push(t.sizeAttenuation),
								e.push(t.maxBones),
								e.push(t.morphTargetsCount),
								e.push(t.numDirLights),
								e.push(t.numPointLights),
								e.push(t.numSpotLights),
								e.push(t.numHemiLights),
								e.push(t.numRectAreaLights),
								e.push(t.numDirLightShadows),
								e.push(t.numPointLightShadows),
								e.push(t.numSpotLightShadows),
								e.push(t.shadowMapType),
								e.push(t.toneMapping),
								e.push(t.numClippingPlanes),
								e.push(t.numClipIntersection),
								e.push(t.format),
								e.push(t.specularColorMapEncoding),
								e.push(t.sheenColorMapEncoding)
						})(i, t),
						(function (e, t) {
							o.disableAll(), t.isWebGL2 && o.enable(0)
							t.supportsVertexTextures && o.enable(1)
							t.instancing && o.enable(2)
							t.instancingColor && o.enable(3)
							t.map && o.enable(4)
							t.matcap && o.enable(5)
							t.envMap && o.enable(6)
							t.envMapCubeUV && o.enable(7)
							t.lightMap && o.enable(8)
							t.aoMap && o.enable(9)
							t.emissiveMap && o.enable(10)
							t.bumpMap && o.enable(11)
							t.normalMap && o.enable(12)
							t.objectSpaceNormalMap && o.enable(13)
							t.tangentSpaceNormalMap && o.enable(14)
							t.clearcoat && o.enable(15)
							t.clearcoatMap && o.enable(16)
							t.clearcoatRoughnessMap && o.enable(17)
							t.clearcoatNormalMap && o.enable(18)
							t.displacementMap && o.enable(19)
							t.specularMap && o.enable(20)
							t.roughnessMap && o.enable(21)
							t.metalnessMap && o.enable(22)
							t.gradientMap && o.enable(23)
							t.alphaMap && o.enable(24)
							t.alphaTest && o.enable(25)
							t.vertexColors && o.enable(26)
							t.vertexAlphas && o.enable(27)
							t.vertexUvs && o.enable(28)
							t.vertexTangents && o.enable(29)
							t.uvsVertexOnly && o.enable(30)
							t.fog && o.enable(31)
							e.push(o.mask), o.disableAll(), t.useFog && o.enable(0)
							t.flatShading && o.enable(1)
							t.logarithmicDepthBuffer && o.enable(2)
							t.skinning && o.enable(3)
							t.useVertexTexture && o.enable(4)
							t.morphTargets && o.enable(5)
							t.morphNormals && o.enable(6)
							t.premultipliedAlpha && o.enable(7)
							t.shadowMapEnabled && o.enable(8)
							t.physicallyCorrectLights && o.enable(9)
							t.doubleSided && o.enable(10)
							t.flipSided && o.enable(11)
							t.depthPacking && o.enable(12)
							t.dithering && o.enable(13)
							t.specularIntensityMap && o.enable(14)
							t.specularColorMap && o.enable(15)
							t.transmission && o.enable(16)
							t.transmissionMap && o.enable(17)
							t.thicknessMap && o.enable(18)
							t.sheen && o.enable(19)
							t.sheenColorMap && o.enable(20)
							t.sheenRoughnessMap && o.enable(21)
							e.push(o.mask)
						})(i, t),
						i.push(e.outputEncoding)),
					i.push(t.customProgramCacheKey),
					i.join()
				)
			},
			getUniforms: function (e) {
				const t = x[e.type]
				let i
				if (t) {
					const e = Ai[t]
					i = si.clone(e.uniforms)
				} else i = e.uniforms
				return i
			},
			acquireProgram: function (t, i) {
				let n
				for (let e = 0, t = c.length; e < t; e++) {
					const t = c[e]
					if (t.cacheKey === i) {
						;(n = t), ++n.usedTimes
						break
					}
				}
				return void 0 === n && ((n = new Br(e, i, t, a)), c.push(n)), n
			},
			releaseProgram: function (e) {
				if (0 == --e.usedTimes) {
					const t = c.indexOf(e)
					;(c[t] = c[c.length - 1]), c.pop(), e.destroy()
				}
			},
			releaseShaderCache: function (e) {
				l.remove(e)
			},
			programs: c,
			dispose: function () {
				l.dispose()
			},
		}
	}
	function Wr() {
		let e = new WeakMap()
		return {
			get: function (t) {
				let i = e.get(t)
				return void 0 === i && ((i = {}), e.set(t, i)), i
			},
			remove: function (t) {
				e.delete(t)
			},
			update: function (t, i, n) {
				e.get(t)[i] = n
			},
			dispose: function () {
				e = new WeakMap()
			},
		}
	}
	function Xr(e, t) {
		return e.groupOrder !== t.groupOrder
			? e.groupOrder - t.groupOrder
			: e.renderOrder !== t.renderOrder
			? e.renderOrder - t.renderOrder
			: e.material.id !== t.material.id
			? e.material.id - t.material.id
			: e.z !== t.z
			? e.z - t.z
			: e.id - t.id
	}
	function Yr(e, t) {
		return e.groupOrder !== t.groupOrder
			? e.groupOrder - t.groupOrder
			: e.renderOrder !== t.renderOrder
			? e.renderOrder - t.renderOrder
			: e.z !== t.z
			? t.z - e.z
			: e.id - t.id
	}
	function jr() {
		const e = []
		let t = 0
		const i = [],
			n = [],
			r = []
		function a(i, n, r, a, s, o) {
			let l = e[t]
			return (
				void 0 === l
					? ((l = { id: i.id, object: i, geometry: n, material: r, groupOrder: a, renderOrder: i.renderOrder, z: s, group: o }), (e[t] = l))
					: ((l.id = i.id), (l.object = i), (l.geometry = n), (l.material = r), (l.groupOrder = a), (l.renderOrder = i.renderOrder), (l.z = s), (l.group = o)),
				t++,
				l
			)
		}
		return {
			opaque: i,
			transmissive: n,
			transparent: r,
			init: function () {
				;(t = 0), (i.length = 0), (n.length = 0), (r.length = 0)
			},
			push: function (e, t, s, o, l, c) {
				const h = a(e, t, s, o, l, c)
				s.transmission > 0 ? n.push(h) : !0 === s.transparent ? r.push(h) : i.push(h)
			},
			unshift: function (e, t, s, o, l, c) {
				const h = a(e, t, s, o, l, c)
				s.transmission > 0 ? n.unshift(h) : !0 === s.transparent ? r.unshift(h) : i.unshift(h)
			},
			finish: function () {
				for (let i = t, n = e.length; i < n; i++) {
					const t = e[i]
					if (null === t.id) break
					;(t.id = null), (t.object = null), (t.geometry = null), (t.material = null), (t.group = null)
				}
			},
			sort: function (e, t) {
				i.length > 1 && i.sort(e || Xr), n.length > 1 && n.sort(t || Yr), r.length > 1 && r.sort(t || Yr)
			},
		}
	}
	function Qr() {
		let e = new WeakMap()
		return {
			get: function (t, i) {
				let n
				return !1 === e.has(t) ? ((n = new jr()), e.set(t, [n])) : i >= e.get(t).length ? ((n = new jr()), e.get(t).push(n)) : (n = e.get(t)[i]), n
			},
			dispose: function () {
				e = new WeakMap()
			},
		}
	}
	function qr() {
		const e = {}
		return {
			get: function (t) {
				if (void 0 !== e[t.id]) return e[t.id]
				let i
				switch (t.type) {
					case 'DirectionalLight':
						i = { direction: new ee(), color: new bt() }
						break
					case 'SpotLight':
						i = { position: new ee(), direction: new ee(), color: new bt(), distance: 0, coneCos: 0, penumbraCos: 0, decay: 0 }
						break
					case 'PointLight':
						i = { position: new ee(), color: new bt(), distance: 0, decay: 0 }
						break
					case 'HemisphereLight':
						i = { direction: new ee(), skyColor: new bt(), groundColor: new bt() }
						break
					case 'RectAreaLight':
						i = { color: new bt(), position: new ee(), halfWidth: new ee(), halfHeight: new ee() }
				}
				return (e[t.id] = i), i
			},
		}
	}
	let Zr = 0
	function Jr(e, t) {
		return (t.castShadow ? 1 : 0) - (e.castShadow ? 1 : 0)
	}
	function Kr(e, t) {
		const i = new qr(),
			n = (function () {
				const e = {}
				return {
					get: function (t) {
						if (void 0 !== e[t.id]) return e[t.id]
						let i
						switch (t.type) {
							case 'DirectionalLight':
							case 'SpotLight':
								i = { shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new H() }
								break
							case 'PointLight':
								i = { shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new H(), shadowCameraNear: 1, shadowCameraFar: 1e3 }
						}
						return (e[t.id] = i), i
					},
				}
			})(),
			r = {
				version: 0,
				hash: {
					directionalLength: -1,
					pointLength: -1,
					spotLength: -1,
					rectAreaLength: -1,
					hemiLength: -1,
					numDirectionalShadows: -1,
					numPointShadows: -1,
					numSpotShadows: -1,
				},
				ambient: [0, 0, 0],
				probe: [],
				directional: [],
				directionalShadow: [],
				directionalShadowMap: [],
				directionalShadowMatrix: [],
				spot: [],
				spotShadow: [],
				spotShadowMap: [],
				spotShadowMatrix: [],
				rectArea: [],
				rectAreaLTC1: null,
				rectAreaLTC2: null,
				point: [],
				pointShadow: [],
				pointShadowMap: [],
				pointShadowMatrix: [],
				hemi: [],
			}
		for (let e = 0; e < 9; e++) r.probe.push(new ee())
		const a = new ee(),
			s = new Ce(),
			o = new Ce()
		return {
			setup: function (a, s) {
				let o = 0,
					l = 0,
					c = 0
				for (let e = 0; e < 9; e++) r.probe[e].set(0, 0, 0)
				let h = 0,
					d = 0,
					u = 0,
					p = 0,
					f = 0,
					m = 0,
					g = 0,
					x = 0
				a.sort(Jr)
				const _ = !0 !== s ? Math.PI : 1
				for (let e = 0, t = a.length; e < t; e++) {
					const t = a[e],
						s = t.color,
						v = t.intensity,
						y = t.distance,
						M = t.shadow && t.shadow.map ? t.shadow.map.texture : null
					if (t.isAmbientLight) (o += s.r * v * _), (l += s.g * v * _), (c += s.b * v * _)
					else if (t.isLightProbe) for (let e = 0; e < 9; e++) r.probe[e].addScaledVector(t.sh.coefficients[e], v)
					else if (t.isDirectionalLight) {
						const e = i.get(t)
						if ((e.color.copy(t.color).multiplyScalar(t.intensity * _), t.castShadow)) {
							const e = t.shadow,
								i = n.get(t)
							;(i.shadowBias = e.bias),
								(i.shadowNormalBias = e.normalBias),
								(i.shadowRadius = e.radius),
								(i.shadowMapSize = e.mapSize),
								(r.directionalShadow[h] = i),
								(r.directionalShadowMap[h] = M),
								(r.directionalShadowMatrix[h] = t.shadow.matrix),
								m++
						}
						;(r.directional[h] = e), h++
					} else if (t.isSpotLight) {
						const e = i.get(t)
						if (
							(e.position.setFromMatrixPosition(t.matrixWorld),
							e.color.copy(s).multiplyScalar(v * _),
							(e.distance = y),
							(e.coneCos = Math.cos(t.angle)),
							(e.penumbraCos = Math.cos(t.angle * (1 - t.penumbra))),
							(e.decay = t.decay),
							t.castShadow)
						) {
							const e = t.shadow,
								i = n.get(t)
							;(i.shadowBias = e.bias),
								(i.shadowNormalBias = e.normalBias),
								(i.shadowRadius = e.radius),
								(i.shadowMapSize = e.mapSize),
								(r.spotShadow[u] = i),
								(r.spotShadowMap[u] = M),
								(r.spotShadowMatrix[u] = t.shadow.matrix),
								x++
						}
						;(r.spot[u] = e), u++
					} else if (t.isRectAreaLight) {
						const e = i.get(t)
						e.color.copy(s).multiplyScalar(v), e.halfWidth.set(0.5 * t.width, 0, 0), e.halfHeight.set(0, 0.5 * t.height, 0), (r.rectArea[p] = e), p++
					} else if (t.isPointLight) {
						const e = i.get(t)
						if ((e.color.copy(t.color).multiplyScalar(t.intensity * _), (e.distance = t.distance), (e.decay = t.decay), t.castShadow)) {
							const e = t.shadow,
								i = n.get(t)
							;(i.shadowBias = e.bias),
								(i.shadowNormalBias = e.normalBias),
								(i.shadowRadius = e.radius),
								(i.shadowMapSize = e.mapSize),
								(i.shadowCameraNear = e.camera.near),
								(i.shadowCameraFar = e.camera.far),
								(r.pointShadow[d] = i),
								(r.pointShadowMap[d] = M),
								(r.pointShadowMatrix[d] = t.shadow.matrix),
								g++
						}
						;(r.point[d] = e), d++
					} else if (t.isHemisphereLight) {
						const e = i.get(t)
						e.skyColor.copy(t.color).multiplyScalar(v * _), e.groundColor.copy(t.groundColor).multiplyScalar(v * _), (r.hemi[f] = e), f++
					}
				}
				p > 0 &&
					(t.isWebGL2 || !0 === e.has('OES_texture_float_linear')
						? ((r.rectAreaLTC1 = Ti.LTC_FLOAT_1), (r.rectAreaLTC2 = Ti.LTC_FLOAT_2))
						: !0 === e.has('OES_texture_half_float_linear')
						? ((r.rectAreaLTC1 = Ti.LTC_HALF_1), (r.rectAreaLTC2 = Ti.LTC_HALF_2))
						: console.error('THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.')),
					(r.ambient[0] = o),
					(r.ambient[1] = l),
					(r.ambient[2] = c)
				const v = r.hash
				;(v.directionalLength === h &&
					v.pointLength === d &&
					v.spotLength === u &&
					v.rectAreaLength === p &&
					v.hemiLength === f &&
					v.numDirectionalShadows === m &&
					v.numPointShadows === g &&
					v.numSpotShadows === x) ||
					((r.directional.length = h),
					(r.spot.length = u),
					(r.rectArea.length = p),
					(r.point.length = d),
					(r.hemi.length = f),
					(r.directionalShadow.length = m),
					(r.directionalShadowMap.length = m),
					(r.pointShadow.length = g),
					(r.pointShadowMap.length = g),
					(r.spotShadow.length = x),
					(r.spotShadowMap.length = x),
					(r.directionalShadowMatrix.length = m),
					(r.pointShadowMatrix.length = g),
					(r.spotShadowMatrix.length = x),
					(v.directionalLength = h),
					(v.pointLength = d),
					(v.spotLength = u),
					(v.rectAreaLength = p),
					(v.hemiLength = f),
					(v.numDirectionalShadows = m),
					(v.numPointShadows = g),
					(v.numSpotShadows = x),
					(r.version = Zr++))
			},
			setupView: function (e, t) {
				let i = 0,
					n = 0,
					l = 0,
					c = 0,
					h = 0
				const d = t.matrixWorldInverse
				for (let t = 0, u = e.length; t < u; t++) {
					const u = e[t]
					if (u.isDirectionalLight) {
						const e = r.directional[i]
						e.direction.setFromMatrixPosition(u.matrixWorld),
							a.setFromMatrixPosition(u.target.matrixWorld),
							e.direction.sub(a),
							e.direction.transformDirection(d),
							i++
					} else if (u.isSpotLight) {
						const e = r.spot[l]
						e.position.setFromMatrixPosition(u.matrixWorld),
							e.position.applyMatrix4(d),
							e.direction.setFromMatrixPosition(u.matrixWorld),
							a.setFromMatrixPosition(u.target.matrixWorld),
							e.direction.sub(a),
							e.direction.transformDirection(d),
							l++
					} else if (u.isRectAreaLight) {
						const e = r.rectArea[c]
						e.position.setFromMatrixPosition(u.matrixWorld),
							e.position.applyMatrix4(d),
							o.identity(),
							s.copy(u.matrixWorld),
							s.premultiply(d),
							o.extractRotation(s),
							e.halfWidth.set(0.5 * u.width, 0, 0),
							e.halfHeight.set(0, 0.5 * u.height, 0),
							e.halfWidth.applyMatrix4(o),
							e.halfHeight.applyMatrix4(o),
							c++
					} else if (u.isPointLight) {
						const e = r.point[n]
						e.position.setFromMatrixPosition(u.matrixWorld), e.position.applyMatrix4(d), n++
					} else if (u.isHemisphereLight) {
						const e = r.hemi[h]
						e.direction.setFromMatrixPosition(u.matrixWorld), e.direction.transformDirection(d), e.direction.normalize(), h++
					}
				}
			},
			state: r,
		}
	}
	function $r(e, t) {
		const i = new Kr(e, t),
			n = [],
			r = []
		return {
			init: function () {
				;(n.length = 0), (r.length = 0)
			},
			state: { lightsArray: n, shadowsArray: r, lights: i },
			setupLights: function (e) {
				i.setup(n, e)
			},
			setupLightsView: function (e) {
				i.setupView(n, e)
			},
			pushLight: function (e) {
				n.push(e)
			},
			pushShadow: function (e) {
				r.push(e)
			},
		}
	}
	function ea(e, t) {
		let i = new WeakMap()
		return {
			get: function (n, r = 0) {
				let a
				return !1 === i.has(n) ? ((a = new $r(e, t)), i.set(n, [a])) : r >= i.get(n).length ? ((a = new $r(e, t)), i.get(n).push(a)) : (a = i.get(n)[r]), a
			},
			dispose: function () {
				i = new WeakMap()
			},
		}
	}
	class ta extends mt {
		constructor(e) {
			super(),
				(this.type = 'MeshDepthMaterial'),
				(this.depthPacking = 3200),
				(this.map = null),
				(this.alphaMap = null),
				(this.displacementMap = null),
				(this.displacementScale = 1),
				(this.displacementBias = 0),
				(this.wireframe = !1),
				(this.wireframeLinewidth = 1),
				(this.fog = !1),
				this.setValues(e)
		}
		copy(e) {
			return (
				super.copy(e),
				(this.depthPacking = e.depthPacking),
				(this.map = e.map),
				(this.alphaMap = e.alphaMap),
				(this.displacementMap = e.displacementMap),
				(this.displacementScale = e.displacementScale),
				(this.displacementBias = e.displacementBias),
				(this.wireframe = e.wireframe),
				(this.wireframeLinewidth = e.wireframeLinewidth),
				this
			)
		}
	}
	ta.prototype.isMeshDepthMaterial = !0
	class ia extends mt {
		constructor(e) {
			super(),
				(this.type = 'MeshDistanceMaterial'),
				(this.referencePosition = new ee()),
				(this.nearDistance = 1),
				(this.farDistance = 1e3),
				(this.map = null),
				(this.alphaMap = null),
				(this.displacementMap = null),
				(this.displacementScale = 1),
				(this.displacementBias = 0),
				(this.fog = !1),
				this.setValues(e)
		}
		copy(e) {
			return (
				super.copy(e),
				this.referencePosition.copy(e.referencePosition),
				(this.nearDistance = e.nearDistance),
				(this.farDistance = e.farDistance),
				(this.map = e.map),
				(this.alphaMap = e.alphaMap),
				(this.displacementMap = e.displacementMap),
				(this.displacementScale = e.displacementScale),
				(this.displacementBias = e.displacementBias),
				this
			)
		}
	}
	ia.prototype.isMeshDistanceMaterial = !0
	function na(e, t, i) {
		let n = new yi()
		const r = new H(),
			a = new H(),
			s = new Z(),
			o = new ta({ depthPacking: 3201 }),
			l = new ia(),
			c = {},
			h = i.maxTextureSize,
			d = { 0: 1, 1: 0, 2: 2 },
			u = new oi({
				defines: { VSM_SAMPLES: 8 },
				uniforms: { shadow_pass: { value: null }, resolution: { value: new H() }, radius: { value: 4 } },
				vertexShader: 'void main(){gl_Position=vec4(position,1.0);}',
				fragmentShader:
					'uniform sampler2D shadow_pass;uniform vec2 resolution;uniform float radius;\n#include <packing>\nvoid main(){const float samples=float(VSM_SAMPLES);float mean=0.0;float squared_mean=0.0;float uvStride=samples<=1.0?0.0:2.0/(samples-1.0);float uvStart=samples<=1.0?0.0:-1.0;for(float i=0.0;i<samples;i++){float uvOffset=uvStart+i*uvStride;\n#ifdef HORIZONTAL_PASS\nvec2 distribution=unpackRGBATo2Half(texture2D(shadow_pass,(gl_FragCoord.xy+vec2(uvOffset,0.0)*radius)/resolution));mean+=distribution.x;squared_mean+=distribution.y*distribution.y+distribution.x*distribution.x;\n#else\nfloat depth=unpackRGBAToDepth(texture2D(shadow_pass,(gl_FragCoord.xy+vec2(0.0,uvOffset)*radius)/resolution));mean+=depth;squared_mean+=depth*depth;\n#endif\n}mean=mean/samples;squared_mean=squared_mean/samples;float std_dev=sqrt(squared_mean-mean*mean);gl_FragColor=pack2HalfToRGBA(vec2(mean,std_dev));}',
			}),
			p = u.clone()
		p.defines.HORIZONTAL_PASS = 1
		const f = new zt()
		f.setAttribute('position', new At(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3))
		const m = new ti(f, u),
			_ = this
		function v(i, n) {
			const r = t.update(m)
			u.defines.VSM_SAMPLES !== i.blurSamples &&
				((u.defines.VSM_SAMPLES = i.blurSamples), (p.defines.VSM_SAMPLES = i.blurSamples), (u.needsUpdate = !0), (p.needsUpdate = !0)),
				(u.uniforms.shadow_pass.value = i.map.texture),
				(u.uniforms.resolution.value = i.mapSize),
				(u.uniforms.radius.value = i.radius),
				e.setRenderTarget(i.mapPass),
				e.clear(),
				e.renderBufferDirect(n, null, r, u, m, null),
				(p.uniforms.shadow_pass.value = i.mapPass.texture),
				(p.uniforms.resolution.value = i.mapSize),
				(p.uniforms.radius.value = i.radius),
				e.setRenderTarget(i.map),
				e.clear(),
				e.renderBufferDirect(n, null, r, p, m, null)
		}
		function y(t, i, n, r, a, s, h) {
			let u = null
			const p = !0 === r.isPointLight ? t.customDistanceMaterial : t.customDepthMaterial
			if (
				((u = void 0 !== p ? p : !0 === r.isPointLight ? l : o),
				(e.localClippingEnabled && !0 === n.clipShadows && 0 !== n.clippingPlanes.length) ||
					(n.displacementMap && 0 !== n.displacementScale) ||
					(n.alphaMap && n.alphaTest > 0))
			) {
				const e = u.uuid,
					t = n.uuid
				let i = c[e]
				void 0 === i && ((i = {}), (c[e] = i))
				let r = i[t]
				void 0 === r && ((r = u.clone()), (i[t] = r)), (u = r)
			}
			return (
				(u.visible = n.visible),
				(u.wireframe = n.wireframe),
				(u.side = 3 === h ? (null !== n.shadowSide ? n.shadowSide : n.side) : null !== n.shadowSide ? n.shadowSide : d[n.side]),
				(u.alphaMap = n.alphaMap),
				(u.alphaTest = n.alphaTest),
				(u.clipShadows = n.clipShadows),
				(u.clippingPlanes = n.clippingPlanes),
				(u.clipIntersection = n.clipIntersection),
				(u.displacementMap = n.displacementMap),
				(u.displacementScale = n.displacementScale),
				(u.displacementBias = n.displacementBias),
				(u.wireframeLinewidth = n.wireframeLinewidth),
				(u.linewidth = n.linewidth),
				!0 === r.isPointLight &&
					!0 === u.isMeshDistanceMaterial &&
					(u.referencePosition.setFromMatrixPosition(r.matrixWorld), (u.nearDistance = a), (u.farDistance = s)),
				u
			)
		}
		function M(i, r, a, s, o) {
			if (!1 === i.visible) return
			if (
				i.layers.test(r.layers) &&
				(i.isMesh || i.isLine || i.isPoints) &&
				(i.castShadow || (i.receiveShadow && 3 === o)) &&
				(!i.frustumCulled || n.intersectsObject(i))
			) {
				i.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse, i.matrixWorld)
				const n = t.update(i),
					r = i.material
				if (Array.isArray(r)) {
					const t = n.groups
					for (let l = 0, c = t.length; l < c; l++) {
						const c = t[l],
							h = r[c.materialIndex]
						if (h && h.visible) {
							const t = y(i, 0, h, s, a.near, a.far, o)
							e.renderBufferDirect(a, null, n, t, i, c)
						}
					}
				} else if (r.visible) {
					const t = y(i, 0, r, s, a.near, a.far, o)
					e.renderBufferDirect(a, null, n, t, i, null)
				}
			}
			const l = i.children
			for (let e = 0, t = l.length; e < t; e++) M(l[e], r, a, s, o)
		}
		;(this.enabled = !1),
			(this.autoUpdate = !0),
			(this.needsUpdate = !1),
			(this.type = 1),
			(this.render = function (t, i, o) {
				if (!1 === _.enabled) return
				if (!1 === _.autoUpdate && !1 === _.needsUpdate) return
				if (0 === t.length) return
				const l = e.getRenderTarget(),
					c = e.getActiveCubeFace(),
					d = e.getActiveMipmapLevel(),
					u = e.state
				u.setBlending(0), u.buffers.color.setClear(1, 1, 1, 1), u.buffers.depth.setTest(!0), u.setScissorTest(!1)
				for (let l = 0, c = t.length; l < c; l++) {
					const c = t[l],
						d = c.shadow
					if (void 0 === d) {
						console.warn('THREE.WebGLShadowMap:', c, 'has no shadow.')
						continue
					}
					if (!1 === d.autoUpdate && !1 === d.needsUpdate) continue
					r.copy(d.mapSize)
					const p = d.getFrameExtents()
					if (
						(r.multiply(p),
						a.copy(d.mapSize),
						(r.x > h || r.y > h) &&
							(r.x > h && ((a.x = Math.floor(h / p.x)), (r.x = a.x * p.x), (d.mapSize.x = a.x)),
							r.y > h && ((a.y = Math.floor(h / p.y)), (r.y = a.y * p.y), (d.mapSize.y = a.y))),
						null === d.map && !d.isPointLightShadow && 3 === this.type)
					) {
						const e = { minFilter: x, magFilter: x, format: A }
						;(d.map = new J(r.x, r.y, e)), (d.map.texture.name = c.name + '.shadowMap'), (d.mapPass = new J(r.x, r.y, e)), d.camera.updateProjectionMatrix()
					}
					if (null === d.map) {
						const e = { minFilter: g, magFilter: g, format: A }
						;(d.map = new J(r.x, r.y, e)), (d.map.texture.name = c.name + '.shadowMap'), d.camera.updateProjectionMatrix()
					}
					e.setRenderTarget(d.map), e.clear()
					const f = d.getViewportCount()
					for (let e = 0; e < f; e++) {
						const t = d.getViewport(e)
						s.set(a.x * t.x, a.y * t.y, a.x * t.z, a.y * t.w), u.viewport(s), d.updateMatrices(c, e), (n = d.getFrustum()), M(i, o, d.camera, c, this.type)
					}
					d.isPointLightShadow || 3 !== this.type || v(d, o), (d.needsUpdate = !1)
				}
				;(_.needsUpdate = !1), e.setRenderTarget(l, c, d)
			})
	}
	function ra(e, t, i) {
		const n = i.isWebGL2
		const r = new (function () {
				let t = !1
				const i = new Z()
				let n = null
				const r = new Z(0, 0, 0, 0)
				return {
					setMask: function (i) {
						n === i || t || (e.colorMask(i, i, i, i), (n = i))
					},
					setLocked: function (e) {
						t = e
					},
					setClear: function (t, n, a, s, o) {
						!0 === o && ((t *= s), (n *= s), (a *= s)), i.set(t, n, a, s), !1 === r.equals(i) && (e.clearColor(t, n, a, s), r.copy(i))
					},
					reset: function () {
						;(t = !1), (n = null), r.set(-1, 0, 0, 0)
					},
				}
			})(),
			a = new (function () {
				let t = !1,
					i = null,
					n = null,
					r = null
				return {
					setTest: function (e) {
						e ? z(2929) : O(2929)
					},
					setMask: function (n) {
						i === n || t || (e.depthMask(n), (i = n))
					},
					setFunc: function (t) {
						if (n !== t) {
							if (t)
								switch (t) {
									case 0:
										e.depthFunc(512)
										break
									case 1:
										e.depthFunc(519)
										break
									case 2:
										e.depthFunc(513)
										break
									case 3:
										e.depthFunc(515)
										break
									case 4:
										e.depthFunc(514)
										break
									case 5:
										e.depthFunc(518)
										break
									case 6:
										e.depthFunc(516)
										break
									case 7:
										e.depthFunc(517)
										break
									default:
										e.depthFunc(515)
								}
							else e.depthFunc(515)
							n = t
						}
					},
					setLocked: function (e) {
						t = e
					},
					setClear: function (t) {
						r !== t && (e.clearDepth(t), (r = t))
					},
					reset: function () {
						;(t = !1), (i = null), (n = null), (r = null)
					},
				}
			})(),
			s = new (function () {
				let t = !1,
					i = null,
					n = null,
					r = null,
					a = null,
					s = null,
					o = null,
					l = null,
					c = null
				return {
					setTest: function (e) {
						t || (e ? z(2960) : O(2960))
					},
					setMask: function (n) {
						i === n || t || (e.stencilMask(n), (i = n))
					},
					setFunc: function (t, i, s) {
						;(n === t && r === i && a === s) || (e.stencilFunc(t, i, s), (n = t), (r = i), (a = s))
					},
					setOp: function (t, i, n) {
						;(s === t && o === i && l === n) || (e.stencilOp(t, i, n), (s = t), (o = i), (l = n))
					},
					setLocked: function (e) {
						t = e
					},
					setClear: function (t) {
						c !== t && (e.clearStencil(t), (c = t))
					},
					reset: function () {
						;(t = !1), (i = null), (n = null), (r = null), (a = null), (s = null), (o = null), (l = null), (c = null)
					},
				}
			})()
		let o = {},
			c = {},
			h = null,
			d = !1,
			u = null,
			p = null,
			f = null,
			m = null,
			g = null,
			x = null,
			_ = null,
			v = !1,
			y = null,
			M = null,
			b = null,
			S = null,
			w = null
		const T = e.getParameter(35661)
		let A = !1,
			E = 0
		const L = e.getParameter(7938)
		;-1 !== L.indexOf('WebGL')
			? ((E = parseFloat(/^WebGL (\d)/.exec(L)[1])), (A = E >= 1))
			: -1 !== L.indexOf('OpenGL ES') && ((E = parseFloat(/^OpenGL ES (\d)/.exec(L)[1])), (A = E >= 2))
		let P = null,
			F = {}
		const C = e.getParameter(3088),
			N = e.getParameter(2978),
			D = new Z().fromArray(C),
			I = new Z().fromArray(N)
		function R(t, i, n) {
			const r = new Uint8Array(4),
				a = e.createTexture()
			e.bindTexture(t, a), e.texParameteri(t, 10241, 9728), e.texParameteri(t, 10240, 9728)
			for (let t = 0; t < n; t++) e.texImage2D(i + t, 0, 6408, 1, 1, 0, 6408, 5121, r)
			return a
		}
		const U = {}
		function z(t) {
			!0 !== o[t] && (e.enable(t), (o[t] = !0))
		}
		function O(t) {
			!1 !== o[t] && (e.disable(t), (o[t] = !1))
		}
		;(U[3553] = R(3553, 3553, 1)),
			(U[34067] = R(34067, 34069, 6)),
			r.setClear(0, 0, 0, 1),
			a.setClear(1),
			s.setClear(0),
			z(2929),
			a.setFunc(3),
			H(!1),
			V(1),
			z(2884),
			G(0)
		const B = { [l]: 32774, 101: 32778, 102: 32779 }
		if (n) (B[103] = 32775), (B[104] = 32776)
		else {
			const e = t.get('EXT_blend_minmax')
			null !== e && ((B[103] = e.MIN_EXT), (B[104] = e.MAX_EXT))
		}
		const k = { 200: 0, 201: 1, 202: 768, 204: 770, 210: 776, 208: 774, 206: 772, 203: 769, 205: 771, 209: 775, 207: 773 }
		function G(t, i, n, r, a, s, o, c) {
			if (0 !== t) {
				if ((!1 === d && (z(3042), (d = !0)), 5 === t))
					(a = a || i),
						(s = s || n),
						(o = o || r),
						(i === p && a === g) || (e.blendEquationSeparate(B[i], B[a]), (p = i), (g = a)),
						(n === f && r === m && s === x && o === _) || (e.blendFuncSeparate(k[n], k[r], k[s], k[o]), (f = n), (m = r), (x = s), (_ = o)),
						(u = t),
						(v = null)
				else if (t !== u || c !== v) {
					if (((p === l && g === l) || (e.blendEquation(32774), (p = l), (g = l)), c))
						switch (t) {
							case 1:
								e.blendFuncSeparate(1, 771, 1, 771)
								break
							case 2:
								e.blendFunc(1, 1)
								break
							case 3:
								e.blendFuncSeparate(0, 0, 769, 771)
								break
							case 4:
								e.blendFuncSeparate(0, 768, 0, 770)
								break
							default:
								console.error('THREE.WebGLState: Invalid blending: ', t)
						}
					else
						switch (t) {
							case 1:
								e.blendFuncSeparate(770, 771, 1, 771)
								break
							case 2:
								e.blendFunc(770, 1)
								break
							case 3:
								e.blendFunc(0, 769)
								break
							case 4:
								e.blendFunc(0, 768)
								break
							default:
								console.error('THREE.WebGLState: Invalid blending: ', t)
						}
					;(f = null), (m = null), (x = null), (_ = null), (u = t), (v = c)
				}
			} else !0 === d && (O(3042), (d = !1))
		}
		function H(t) {
			y !== t && (t ? e.frontFace(2304) : e.frontFace(2305), (y = t))
		}
		function V(t) {
			0 !== t ? (z(2884), t !== M && (1 === t ? e.cullFace(1029) : 2 === t ? e.cullFace(1028) : e.cullFace(1032))) : O(2884), (M = t)
		}
		function W(t, i, n) {
			t ? (z(32823), (S === i && w === n) || (e.polygonOffset(i, n), (S = i), (w = n))) : O(32823)
		}
		function X(t) {
			void 0 === t && (t = 33984 + T - 1), P !== t && (e.activeTexture(t), (P = t))
		}
		return {
			buffers: { color: r, depth: a, stencil: s },
			enable: z,
			disable: O,
			bindFramebuffer: function (t, i) {
				return c[t] !== i && (e.bindFramebuffer(t, i), (c[t] = i), n && (36009 === t && (c[36160] = i), 36160 === t && (c[36009] = i)), !0)
			},
			useProgram: function (t) {
				return h !== t && (e.useProgram(t), (h = t), !0)
			},
			setBlending: G,
			setMaterial: function (e, t) {
				2 === e.side ? O(2884) : z(2884)
				let i = 1 === e.side
				t && (i = !i),
					H(i),
					1 === e.blending && !1 === e.transparent
						? G(0)
						: G(e.blending, e.blendEquation, e.blendSrc, e.blendDst, e.blendEquationAlpha, e.blendSrcAlpha, e.blendDstAlpha, e.premultipliedAlpha),
					a.setFunc(e.depthFunc),
					a.setTest(e.depthTest),
					a.setMask(e.depthWrite),
					r.setMask(e.colorWrite)
				const n = e.stencilWrite
				s.setTest(n),
					n &&
						(s.setMask(e.stencilWriteMask), s.setFunc(e.stencilFunc, e.stencilRef, e.stencilFuncMask), s.setOp(e.stencilFail, e.stencilZFail, e.stencilZPass)),
					W(e.polygonOffset, e.polygonOffsetFactor, e.polygonOffsetUnits),
					!0 === e.alphaToCoverage ? z(32926) : O(32926)
			},
			setFlipSided: H,
			setCullFace: V,
			setLineWidth: function (t) {
				t !== b && (A && e.lineWidth(t), (b = t))
			},
			setPolygonOffset: W,
			setScissorTest: function (e) {
				e ? z(3089) : O(3089)
			},
			activeTexture: X,
			bindTexture: function (t, i) {
				null === P && X()
				let n = F[P]
				void 0 === n && ((n = { type: void 0, texture: void 0 }), (F[P] = n)),
					(n.type === t && n.texture === i) || (e.bindTexture(t, i || U[t]), (n.type = t), (n.texture = i))
			},
			unbindTexture: function () {
				const t = F[P]
				void 0 !== t && void 0 !== t.type && (e.bindTexture(t.type, null), (t.type = void 0), (t.texture = void 0))
			},
			compressedTexImage2D: function () {
				try {
					e.compressedTexImage2D.apply(e, arguments)
				} catch (e) {
					console.error('THREE.WebGLState:', e)
				}
			},
			texImage2D: function () {
				try {
					e.texImage2D.apply(e, arguments)
				} catch (e) {
					console.error('THREE.WebGLState:', e)
				}
			},
			texImage3D: function () {
				try {
					e.texImage3D.apply(e, arguments)
				} catch (e) {
					console.error('THREE.WebGLState:', e)
				}
			},
			texStorage2D: function () {
				try {
					e.texStorage2D.apply(e, arguments)
				} catch (e) {
					console.error('THREE.WebGLState:', e)
				}
			},
			texStorage3D: function () {
				try {
					e.texStorage3D.apply(e, arguments)
				} catch (e) {
					console.error('THREE.WebGLState:', e)
				}
			},
			texSubImage2D: function () {
				try {
					e.texSubImage2D.apply(e, arguments)
				} catch (e) {
					console.error('THREE.WebGLState:', e)
				}
			},
			texSubImage3D: function () {
				try {
					e.texSubImage3D.apply(e, arguments)
				} catch (e) {
					console.error('THREE.WebGLState:', e)
				}
			},
			compressedTexSubImage2D: function () {
				try {
					e.compressedTexSubImage2D.apply(e, arguments)
				} catch (e) {
					console.error('THREE.WebGLState:', e)
				}
			},
			scissor: function (t) {
				!1 === D.equals(t) && (e.scissor(t.x, t.y, t.z, t.w), D.copy(t))
			},
			viewport: function (t) {
				!1 === I.equals(t) && (e.viewport(t.x, t.y, t.z, t.w), I.copy(t))
			},
			reset: function () {
				e.disable(3042),
					e.disable(2884),
					e.disable(2929),
					e.disable(32823),
					e.disable(3089),
					e.disable(2960),
					e.disable(32926),
					e.blendEquation(32774),
					e.blendFunc(1, 0),
					e.blendFuncSeparate(1, 0, 1, 0),
					e.colorMask(!0, !0, !0, !0),
					e.clearColor(0, 0, 0, 0),
					e.depthMask(!0),
					e.depthFunc(513),
					e.clearDepth(1),
					e.stencilMask(4294967295),
					e.stencilFunc(519, 0, 4294967295),
					e.stencilOp(7680, 7680, 7680),
					e.clearStencil(0),
					e.cullFace(1029),
					e.frontFace(2305),
					e.polygonOffset(0, 0),
					e.activeTexture(33984),
					e.bindFramebuffer(36160, null),
					!0 === n && (e.bindFramebuffer(36009, null), e.bindFramebuffer(36008, null)),
					e.useProgram(null),
					e.lineWidth(1),
					e.scissor(0, 0, e.canvas.width, e.canvas.height),
					e.viewport(0, 0, e.canvas.width, e.canvas.height),
					(o = {}),
					(P = null),
					(F = {}),
					(c = {}),
					(h = null),
					(d = !1),
					(u = null),
					(p = null),
					(f = null),
					(m = null),
					(g = null),
					(x = null),
					(_ = null),
					(v = !1),
					(y = null),
					(M = null),
					(b = null),
					(S = null),
					(w = null),
					D.set(0, 0, e.canvas.width, e.canvas.height),
					I.set(0, 0, e.canvas.width, e.canvas.height),
					r.reset(),
					a.reset(),
					s.reset()
			},
		}
	}
	function aa(e, t, i, n, r, a, s) {
		const o = r.isWebGL2,
			l = r.maxTextures,
			c = r.maxCubemapSize,
			h = r.maxTextureSize,
			d = r.maxSamples,
			u = t.has('WEBGL_multisampled_render_to_texture') ? t.get('WEBGL_multisampled_render_to_texture') : void 0,
			v = new WeakMap()
		let P,
			C = !1
		try {
			C = 'undefined' != typeof OffscreenCanvas && null !== new OffscreenCanvas(1, 1).getContext('2d')
		} catch (e) {}
		function N(e, t) {
			return C ? new OffscreenCanvas(e, t) : X('canvas')
		}
		function D(e, t, i, n) {
			let r = 1
			if (((e.width > n || e.height > n) && (r = n / Math.max(e.width, e.height)), r < 1 || !0 === t)) {
				if (
					('undefined' != typeof HTMLImageElement && e instanceof HTMLImageElement) ||
					('undefined' != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement) ||
					('undefined' != typeof ImageBitmap && e instanceof ImageBitmap)
				) {
					const n = t ? G : Math.floor,
						a = n(r * e.width),
						s = n(r * e.height)
					void 0 === P && (P = N(a, s))
					const o = i ? N(a, s) : P
					;(o.width = a), (o.height = s)
					return (
						o.getContext('2d').drawImage(e, 0, 0, a, s),
						console.warn('THREE.WebGLRenderer: Texture has been resized from (' + e.width + 'x' + e.height + ') to (' + a + 'x' + s + ').'),
						o
					)
				}
				return 'data' in e && console.warn('THREE.WebGLRenderer: Image in DataTexture is too big (' + e.width + 'x' + e.height + ').'), e
			}
			return e
		}
		function I(e) {
			return k(e.width) && k(e.height)
		}
		function R(e, t) {
			return e.generateMipmaps && t && e.minFilter !== g && e.minFilter !== x
		}
		function U(t) {
			e.generateMipmap(t)
		}
		function z(i, n, r, a) {
			if (!1 === o) return n
			if (null !== i) {
				if (void 0 !== e[i]) return e[i]
				console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + i + "'")
			}
			let s = n
			return (
				6403 === n && (5126 === r && (s = 33326), 5131 === r && (s = 33325), 5121 === r && (s = 33321)),
				6407 === n && (5126 === r && (s = 34837), 5131 === r && (s = 34843), 5121 === r && (s = 32849)),
				6408 === n && (5126 === r && (s = 34836), 5131 === r && (s = 34842), 5121 === r && (s = a === F ? 35907 : 32856)),
				(33325 !== s && 33326 !== s && 34842 !== s && 34836 !== s) || t.get('EXT_color_buffer_float'),
				s
			)
		}
		function O(e, t, i) {
			return !0 === R(e, i) || (e.isFramebufferTexture && e.minFilter !== g && e.minFilter !== x)
				? Math.log2(Math.max(t.width, t.height)) + 1
				: void 0 !== e.mipmaps && e.mipmaps.length > 0
				? e.mipmaps.length
				: e.isCompressedTexture && Array.isArray(e.image)
				? t.mipmaps.length
				: 1
		}
		function B(e) {
			return e === g || 1004 === e || 1005 === e ? 9728 : 9729
		}
		function H(t) {
			const i = t.target
			i.removeEventListener('dispose', H),
				(function (t) {
					const i = n.get(t)
					if (void 0 === i.__webglInit) return
					e.deleteTexture(i.__webglTexture), n.remove(t)
				})(i),
				i.isVideoTexture && v.delete(i),
				s.memory.textures--
		}
		function V(t) {
			const i = t.target
			i.removeEventListener('dispose', V),
				(function (t) {
					const i = t.texture,
						r = n.get(t),
						a = n.get(i)
					if (!t) return
					void 0 !== a.__webglTexture && (e.deleteTexture(a.__webglTexture), s.memory.textures--)
					t.depthTexture && t.depthTexture.dispose()
					if (t.isWebGLCubeRenderTarget)
						for (let t = 0; t < 6; t++) e.deleteFramebuffer(r.__webglFramebuffer[t]), r.__webglDepthbuffer && e.deleteRenderbuffer(r.__webglDepthbuffer[t])
					else
						e.deleteFramebuffer(r.__webglFramebuffer),
							r.__webglDepthbuffer && e.deleteRenderbuffer(r.__webglDepthbuffer),
							r.__webglMultisampledFramebuffer && e.deleteFramebuffer(r.__webglMultisampledFramebuffer),
							r.__webglColorRenderbuffer && e.deleteRenderbuffer(r.__webglColorRenderbuffer),
							r.__webglDepthRenderbuffer && e.deleteRenderbuffer(r.__webglDepthRenderbuffer)
					if (t.isWebGLMultipleRenderTargets)
						for (let t = 0, r = i.length; t < r; t++) {
							const r = n.get(i[t])
							r.__webglTexture && (e.deleteTexture(r.__webglTexture), s.memory.textures--), n.remove(i[t])
						}
					n.remove(i), n.remove(t)
				})(i)
		}
		let W = 0
		function Y(e, t) {
			const r = n.get(e)
			if (
				(e.isVideoTexture &&
					(function (e) {
						const t = s.render.frame
						v.get(e) !== t && (v.set(e, t), e.update())
					})(e),
				e.version > 0 && r.__version !== e.version)
			) {
				const i = e.image
				if (void 0 === i) console.warn('THREE.WebGLRenderer: Texture marked for update but image is undefined')
				else {
					if (!1 !== i.complete) return void K(r, e, t)
					console.warn('THREE.WebGLRenderer: Texture marked for update but image is incomplete')
				}
			}
			i.activeTexture(33984 + t), i.bindTexture(3553, r.__webglTexture)
		}
		function j(t, r) {
			const s = n.get(t)
			t.version > 0 && s.__version !== t.version
				? (function (t, n, r) {
						if (6 !== n.image.length) return
						J(t, n),
							i.activeTexture(33984 + r),
							i.bindTexture(34067, t.__webglTexture),
							e.pixelStorei(37440, n.flipY),
							e.pixelStorei(37441, n.premultiplyAlpha),
							e.pixelStorei(3317, n.unpackAlignment),
							e.pixelStorei(37443, 0)
						const s = n && (n.isCompressedTexture || n.image[0].isCompressedTexture),
							l = n.image[0] && n.image[0].isDataTexture,
							h = []
						for (let e = 0; e < 6; e++) h[e] = s || l ? (l ? n.image[e].image : n.image[e]) : D(n.image[e], !1, !0, c)
						const d = h[0],
							u = I(d) || o,
							p = a.convert(n.format),
							f = a.convert(n.type),
							m = z(n.internalFormat, p, f, n.encoding),
							g = o && !0 !== n.isVideoTexture,
							x = void 0 === t.__version
						let _,
							v = O(n, d, u)
						if ((Z(34067, n, u), s)) {
							g && x && i.texStorage2D(34067, v, m, d.width, d.height)
							for (let e = 0; e < 6; e++) {
								_ = h[e].mipmaps
								for (let t = 0; t < _.length; t++) {
									const r = _[t]
									n.format !== A && n.format !== T
										? null !== p
											? g
												? i.compressedTexSubImage2D(34069 + e, t, 0, 0, r.width, r.height, p, r.data)
												: i.compressedTexImage2D(34069 + e, t, m, r.width, r.height, 0, r.data)
											: console.warn('THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()')
										: g
										? i.texSubImage2D(34069 + e, t, 0, 0, r.width, r.height, p, f, r.data)
										: i.texImage2D(34069 + e, t, m, r.width, r.height, 0, p, f, r.data)
								}
							}
						} else {
							;(_ = n.mipmaps), g && x && (_.length > 0 && v++, i.texStorage2D(34067, v, m, h[0].width, h[0].height))
							for (let e = 0; e < 6; e++)
								if (l) {
									g
										? i.texSubImage2D(34069 + e, 0, 0, 0, h[e].width, h[e].height, p, f, h[e].data)
										: i.texImage2D(34069 + e, 0, m, h[e].width, h[e].height, 0, p, f, h[e].data)
									for (let t = 0; t < _.length; t++) {
										const n = _[t].image[e].image
										g
											? i.texSubImage2D(34069 + e, t + 1, 0, 0, n.width, n.height, p, f, n.data)
											: i.texImage2D(34069 + e, t + 1, m, n.width, n.height, 0, p, f, n.data)
									}
								} else {
									g ? i.texSubImage2D(34069 + e, 0, 0, 0, p, f, h[e]) : i.texImage2D(34069 + e, 0, m, p, f, h[e])
									for (let t = 0; t < _.length; t++) {
										const n = _[t]
										g ? i.texSubImage2D(34069 + e, t + 1, 0, 0, p, f, n.image[e]) : i.texImage2D(34069 + e, t + 1, m, p, f, n.image[e])
									}
								}
						}
						R(n, u) && U(34067)
						;(t.__version = n.version), n.onUpdate && n.onUpdate(n)
				  })(s, t, r)
				: (i.activeTexture(33984 + r), i.bindTexture(34067, s.__webglTexture))
		}
		const Q = { [p]: 10497, [f]: 33071, [m]: 33648 },
			q = { [g]: 9728, 1004: 9984, 1005: 9986, [x]: 9729, 1007: 9985, [_]: 9987 }
		function Z(i, a, s) {
			if (
				(s
					? (e.texParameteri(i, 10242, Q[a.wrapS]),
					  e.texParameteri(i, 10243, Q[a.wrapT]),
					  (32879 !== i && 35866 !== i) || e.texParameteri(i, 32882, Q[a.wrapR]),
					  e.texParameteri(i, 10240, q[a.magFilter]),
					  e.texParameteri(i, 10241, q[a.minFilter]))
					: (e.texParameteri(i, 10242, 33071),
					  e.texParameteri(i, 10243, 33071),
					  (32879 !== i && 35866 !== i) || e.texParameteri(i, 32882, 33071),
					  (a.wrapS === f && a.wrapT === f) ||
							console.warn('THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.'),
					  e.texParameteri(i, 10240, B(a.magFilter)),
					  e.texParameteri(i, 10241, B(a.minFilter)),
					  a.minFilter !== g &&
							a.minFilter !== x &&
							console.warn('THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.')),
				!0 === t.has('EXT_texture_filter_anisotropic'))
			) {
				const s = t.get('EXT_texture_filter_anisotropic')
				if (a.type === b && !1 === t.has('OES_texture_float_linear')) return
				if (!1 === o && a.type === S && !1 === t.has('OES_texture_half_float_linear')) return
				;(a.anisotropy > 1 || n.get(a).__currentAnisotropy) &&
					(e.texParameterf(i, s.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(a.anisotropy, r.getMaxAnisotropy())), (n.get(a).__currentAnisotropy = a.anisotropy))
			}
		}
		function J(t, i) {
			void 0 === t.__webglInit && ((t.__webglInit = !0), i.addEventListener('dispose', H), (t.__webglTexture = e.createTexture()), s.memory.textures++)
		}
		function K(t, n, r) {
			let s = 3553
			n.isDataTexture2DArray && (s = 35866),
				n.isDataTexture3D && (s = 32879),
				J(t, n),
				i.activeTexture(33984 + r),
				i.bindTexture(s, t.__webglTexture),
				e.pixelStorei(37440, n.flipY),
				e.pixelStorei(37441, n.premultiplyAlpha),
				e.pixelStorei(3317, n.unpackAlignment),
				e.pixelStorei(37443, 0)
			const l =
					(function (e) {
						return !o && (e.wrapS !== f || e.wrapT !== f || (e.minFilter !== g && e.minFilter !== x))
					})(n) && !1 === I(n.image),
				c = D(n.image, l, !1, h),
				d = I(c) || o,
				u = a.convert(n.format)
			let p,
				m = a.convert(n.type),
				_ = z(n.internalFormat, u, m, n.encoding)
			Z(s, n, d)
			const v = n.mipmaps,
				S = o && !0 !== n.isVideoTexture,
				P = void 0 === t.__version,
				F = O(n, c, d)
			if (n.isDepthTexture)
				(_ = 6402),
					o
						? (_ = n.type === b ? 36012 : n.type === M ? 33190 : n.type === w ? 35056 : 33189)
						: n.type === b && console.error('WebGLRenderer: Floating point depth texture requires WebGL2.'),
					n.format === E &&
						6402 === _ &&
						n.type !== y &&
						n.type !== M &&
						(console.warn('THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture.'),
						(n.type = y),
						(m = a.convert(n.type))),
					n.format === L &&
						6402 === _ &&
						((_ = 34041),
						n.type !== w &&
							(console.warn('THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture.'), (n.type = w), (m = a.convert(n.type)))),
					S && P ? i.texStorage2D(3553, 1, _, c.width, c.height) : i.texImage2D(3553, 0, _, c.width, c.height, 0, u, m, null)
			else if (n.isDataTexture)
				if (v.length > 0 && d) {
					S && P && i.texStorage2D(3553, F, _, v[0].width, v[0].height)
					for (let e = 0, t = v.length; e < t; e++)
						(p = v[e]), S ? i.texSubImage2D(3553, 0, 0, 0, p.width, p.height, u, m, p.data) : i.texImage2D(3553, e, _, p.width, p.height, 0, u, m, p.data)
					n.generateMipmaps = !1
				} else
					S
						? (P && i.texStorage2D(3553, F, _, c.width, c.height), i.texSubImage2D(3553, 0, 0, 0, c.width, c.height, u, m, c.data))
						: i.texImage2D(3553, 0, _, c.width, c.height, 0, u, m, c.data)
			else if (n.isCompressedTexture) {
				S && P && i.texStorage2D(3553, F, _, v[0].width, v[0].height)
				for (let e = 0, t = v.length; e < t; e++)
					(p = v[e]),
						n.format !== A && n.format !== T
							? null !== u
								? S
									? i.compressedTexSubImage2D(3553, e, 0, 0, p.width, p.height, u, p.data)
									: i.compressedTexImage2D(3553, e, _, p.width, p.height, 0, p.data)
								: console.warn('THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()')
							: S
							? i.texSubImage2D(3553, e, 0, 0, p.width, p.height, u, m, p.data)
							: i.texImage2D(3553, e, _, p.width, p.height, 0, u, m, p.data)
			} else if (n.isDataTexture2DArray)
				S
					? (P && i.texStorage3D(35866, F, _, c.width, c.height, c.depth), i.texSubImage3D(35866, 0, 0, 0, 0, c.width, c.height, c.depth, u, m, c.data))
					: i.texImage3D(35866, 0, _, c.width, c.height, c.depth, 0, u, m, c.data)
			else if (n.isDataTexture3D)
				S
					? (P && i.texStorage3D(32879, F, _, c.width, c.height, c.depth), i.texSubImage3D(32879, 0, 0, 0, 0, c.width, c.height, c.depth, u, m, c.data))
					: i.texImage3D(32879, 0, _, c.width, c.height, c.depth, 0, u, m, c.data)
			else if (n.isFramebufferTexture) S && P ? i.texStorage2D(3553, F, _, c.width, c.height) : i.texImage2D(3553, 0, _, c.width, c.height, 0, u, m, null)
			else if (v.length > 0 && d) {
				S && P && i.texStorage2D(3553, F, _, v[0].width, v[0].height)
				for (let e = 0, t = v.length; e < t; e++) (p = v[e]), S ? i.texSubImage2D(3553, e, 0, 0, u, m, p) : i.texImage2D(3553, e, _, u, m, p)
				n.generateMipmaps = !1
			} else S ? (P && i.texStorage2D(3553, F, _, c.width, c.height), i.texSubImage2D(3553, 0, 0, 0, u, m, c)) : i.texImage2D(3553, 0, _, u, m, c)
			R(n, d) && U(s), (t.__version = n.version), n.onUpdate && n.onUpdate(n)
		}
		function $(t, r, s, o, l) {
			const c = a.convert(s.format),
				h = a.convert(s.type),
				d = z(s.internalFormat, c, h, s.encoding)
			n.get(r).__hasExternalTextures ||
				(32879 === l || 35866 === l
					? i.texImage3D(l, 0, d, r.width, r.height, r.depth, 0, c, h, null)
					: i.texImage2D(l, 0, d, r.width, r.height, 0, c, h, null)),
				i.bindFramebuffer(36160, t),
				r.useRenderToTexture
					? u.framebufferTexture2DMultisampleEXT(36160, o, l, n.get(s).__webglTexture, 0, ie(r))
					: e.framebufferTexture2D(36160, o, l, n.get(s).__webglTexture, 0),
				i.bindFramebuffer(36160, null)
		}
		function ee(t, i, n) {
			if ((e.bindRenderbuffer(36161, t), i.depthBuffer && !i.stencilBuffer)) {
				let r = 33189
				if (n || i.useRenderToTexture) {
					const t = i.depthTexture
					t && t.isDepthTexture && (t.type === b ? (r = 36012) : t.type === M && (r = 33190))
					const n = ie(i)
					i.useRenderToTexture
						? u.renderbufferStorageMultisampleEXT(36161, n, r, i.width, i.height)
						: e.renderbufferStorageMultisample(36161, n, r, i.width, i.height)
				} else e.renderbufferStorage(36161, r, i.width, i.height)
				e.framebufferRenderbuffer(36160, 36096, 36161, t)
			} else if (i.depthBuffer && i.stencilBuffer) {
				const r = ie(i)
				n && i.useRenderbuffer
					? e.renderbufferStorageMultisample(36161, r, 35056, i.width, i.height)
					: i.useRenderToTexture
					? u.renderbufferStorageMultisampleEXT(36161, r, 35056, i.width, i.height)
					: e.renderbufferStorage(36161, 34041, i.width, i.height),
					e.framebufferRenderbuffer(36160, 33306, 36161, t)
			} else {
				const t = !0 === i.isWebGLMultipleRenderTargets ? i.texture[0] : i.texture,
					r = a.convert(t.format),
					s = a.convert(t.type),
					o = z(t.internalFormat, r, s, t.encoding),
					l = ie(i)
				n && i.useRenderbuffer
					? e.renderbufferStorageMultisample(36161, l, o, i.width, i.height)
					: i.useRenderToTexture
					? u.renderbufferStorageMultisampleEXT(36161, l, o, i.width, i.height)
					: e.renderbufferStorage(36161, o, i.width, i.height)
			}
			e.bindRenderbuffer(36161, null)
		}
		function te(t) {
			const r = n.get(t),
				a = !0 === t.isWebGLCubeRenderTarget
			if (t.depthTexture && !r.__autoAllocateDepthBuffer) {
				if (a) throw new Error('target.depthTexture not supported in Cube render targets')
				!(function (t, r) {
					if (r && r.isWebGLCubeRenderTarget) throw new Error('Depth Texture with cube render targets is not supported')
					if ((i.bindFramebuffer(36160, t), !r.depthTexture || !r.depthTexture.isDepthTexture))
						throw new Error('renderTarget.depthTexture must be an instance of THREE.DepthTexture')
					;(n.get(r.depthTexture).__webglTexture && r.depthTexture.image.width === r.width && r.depthTexture.image.height === r.height) ||
						((r.depthTexture.image.width = r.width), (r.depthTexture.image.height = r.height), (r.depthTexture.needsUpdate = !0)),
						Y(r.depthTexture, 0)
					const a = n.get(r.depthTexture).__webglTexture,
						s = ie(r)
					if (r.depthTexture.format === E)
						r.useRenderToTexture ? u.framebufferTexture2DMultisampleEXT(36160, 36096, 3553, a, 0, s) : e.framebufferTexture2D(36160, 36096, 3553, a, 0)
					else {
						if (r.depthTexture.format !== L) throw new Error('Unknown depthTexture format')
						r.useRenderToTexture ? u.framebufferTexture2DMultisampleEXT(36160, 33306, 3553, a, 0, s) : e.framebufferTexture2D(36160, 33306, 3553, a, 0)
					}
				})(r.__webglFramebuffer, t)
			} else if (a) {
				r.__webglDepthbuffer = []
				for (let n = 0; n < 6; n++)
					i.bindFramebuffer(36160, r.__webglFramebuffer[n]), (r.__webglDepthbuffer[n] = e.createRenderbuffer()), ee(r.__webglDepthbuffer[n], t, !1)
			} else i.bindFramebuffer(36160, r.__webglFramebuffer), (r.__webglDepthbuffer = e.createRenderbuffer()), ee(r.__webglDepthbuffer, t, !1)
			i.bindFramebuffer(36160, null)
		}
		function ie(e) {
			return o && (e.useRenderbuffer || e.useRenderToTexture) ? Math.min(d, e.samples) : 0
		}
		let ne = !1,
			re = !1
		;(this.allocateTextureUnit = function () {
			const e = W
			return e >= l && console.warn('THREE.WebGLTextures: Trying to use ' + e + ' texture units while this GPU supports only ' + l), (W += 1), e
		}),
			(this.resetTextureUnits = function () {
				W = 0
			}),
			(this.setTexture2D = Y),
			(this.setTexture2DArray = function (e, t) {
				const r = n.get(e)
				e.version > 0 && r.__version !== e.version ? K(r, e, t) : (i.activeTexture(33984 + t), i.bindTexture(35866, r.__webglTexture))
			}),
			(this.setTexture3D = function (e, t) {
				const r = n.get(e)
				e.version > 0 && r.__version !== e.version ? K(r, e, t) : (i.activeTexture(33984 + t), i.bindTexture(32879, r.__webglTexture))
			}),
			(this.setTextureCube = j),
			(this.rebindTextures = function (e, t, i) {
				const r = n.get(e)
				void 0 !== t && $(r.__webglFramebuffer, e, e.texture, 36064, 3553), void 0 !== i && te(e)
			}),
			(this.setupRenderTarget = function (t) {
				const l = t.texture,
					c = n.get(t),
					h = n.get(l)
				t.addEventListener('dispose', V),
					!0 !== t.isWebGLMultipleRenderTargets &&
						(void 0 === h.__webglTexture && (h.__webglTexture = e.createTexture()), (h.__version = l.version), s.memory.textures++)
				const d = !0 === t.isWebGLCubeRenderTarget,
					u = !0 === t.isWebGLMultipleRenderTargets,
					p = l.isDataTexture3D || l.isDataTexture2DArray,
					f = I(t) || o
				if (
					(!o ||
						l.format !== T ||
						(l.type !== b && l.type !== S) ||
						((l.format = A), console.warn('THREE.WebGLRenderer: Rendering to textures with RGB format is not supported. Using RGBA format instead.')),
					d)
				) {
					c.__webglFramebuffer = []
					for (let t = 0; t < 6; t++) c.__webglFramebuffer[t] = e.createFramebuffer()
				} else if (((c.__webglFramebuffer = e.createFramebuffer()), u))
					if (r.drawBuffers) {
						const i = t.texture
						for (let t = 0, r = i.length; t < r; t++) {
							const r = n.get(i[t])
							void 0 === r.__webglTexture && ((r.__webglTexture = e.createTexture()), s.memory.textures++)
						}
					} else console.warn('THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.')
				else if (t.useRenderbuffer)
					if (o) {
						;(c.__webglMultisampledFramebuffer = e.createFramebuffer()),
							(c.__webglColorRenderbuffer = e.createRenderbuffer()),
							e.bindRenderbuffer(36161, c.__webglColorRenderbuffer)
						const n = a.convert(l.format),
							r = a.convert(l.type),
							s = z(l.internalFormat, n, r, l.encoding),
							o = ie(t)
						e.renderbufferStorageMultisample(36161, o, s, t.width, t.height),
							i.bindFramebuffer(36160, c.__webglMultisampledFramebuffer),
							e.framebufferRenderbuffer(36160, 36064, 36161, c.__webglColorRenderbuffer),
							e.bindRenderbuffer(36161, null),
							t.depthBuffer && ((c.__webglDepthRenderbuffer = e.createRenderbuffer()), ee(c.__webglDepthRenderbuffer, t, !0)),
							i.bindFramebuffer(36160, null)
					} else console.warn('THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.')
				if (d) {
					i.bindTexture(34067, h.__webglTexture), Z(34067, l, f)
					for (let e = 0; e < 6; e++) $(c.__webglFramebuffer[e], t, l, 36064, 34069 + e)
					R(l, f) && U(34067), i.unbindTexture()
				} else if (u) {
					const e = t.texture
					for (let r = 0, a = e.length; r < a; r++) {
						const a = e[r],
							s = n.get(a)
						i.bindTexture(3553, s.__webglTexture), Z(3553, a, f), $(c.__webglFramebuffer, t, a, 36064 + r, 3553), R(a, f) && U(3553)
					}
					i.unbindTexture()
				} else {
					let e = 3553
					if (p)
						if (o) {
							e = l.isDataTexture3D ? 32879 : 35866
						} else console.warn('THREE.DataTexture3D and THREE.DataTexture2DArray only supported with WebGL2.')
					i.bindTexture(e, h.__webglTexture), Z(e, l, f), $(c.__webglFramebuffer, t, l, 36064, e), R(l, f) && U(e), i.unbindTexture()
				}
				t.depthBuffer && te(t)
			}),
			(this.updateRenderTargetMipmap = function (e) {
				const t = I(e) || o,
					r = !0 === e.isWebGLMultipleRenderTargets ? e.texture : [e.texture]
				for (let a = 0, s = r.length; a < s; a++) {
					const s = r[a]
					if (R(s, t)) {
						const t = e.isWebGLCubeRenderTarget ? 34067 : 3553,
							r = n.get(s).__webglTexture
						i.bindTexture(t, r), U(t), i.unbindTexture()
					}
				}
			}),
			(this.updateMultisampleRenderTarget = function (t) {
				if (t.useRenderbuffer)
					if (o) {
						const r = t.width,
							a = t.height
						let s = 16384
						const o = [36064],
							l = t.stencilBuffer ? 33306 : 36096
						t.depthBuffer && o.push(l), t.ignoreDepthForMultisampleCopy || (t.depthBuffer && (s |= 256), t.stencilBuffer && (s |= 1024))
						const c = n.get(t)
						i.bindFramebuffer(36008, c.__webglMultisampledFramebuffer),
							i.bindFramebuffer(36009, c.__webglFramebuffer),
							t.ignoreDepthForMultisampleCopy && (e.invalidateFramebuffer(36008, [l]), e.invalidateFramebuffer(36009, [l])),
							e.blitFramebuffer(0, 0, r, a, 0, 0, r, a, s, 9728),
							e.invalidateFramebuffer(36008, o),
							i.bindFramebuffer(36008, null),
							i.bindFramebuffer(36009, c.__webglMultisampledFramebuffer)
					} else console.warn('THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.')
			}),
			(this.setupDepthRenderbuffer = te),
			(this.setupFrameBufferTexture = $),
			(this.safeSetTexture2D = function (e, t) {
				e &&
					e.isWebGLRenderTarget &&
					(!1 === ne &&
						(console.warn("THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead."), (ne = !0)),
					(e = e.texture)),
					Y(e, t)
			}),
			(this.safeSetTextureCube = function (e, t) {
				e &&
					e.isWebGLCubeRenderTarget &&
					(!1 === re &&
						(console.warn("THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead."),
						(re = !0)),
					(e = e.texture)),
					j(e, t)
			})
	}
	function sa(e, t, i) {
		const n = i.isWebGL2
		return {
			convert: function (e) {
				let i
				if (e === v) return 5121
				if (1017 === e) return 32819
				if (1018 === e) return 32820
				if (1019 === e) return 33635
				if (1010 === e) return 5120
				if (1011 === e) return 5122
				if (e === y) return 5123
				if (1013 === e) return 5124
				if (e === M) return 5125
				if (e === b) return 5126
				if (e === S) return n ? 5131 : ((i = t.get('OES_texture_half_float')), null !== i ? i.HALF_FLOAT_OES : null)
				if (1021 === e) return 6406
				if (e === T) return 6407
				if (e === A) return 6408
				if (1024 === e) return 6409
				if (1025 === e) return 6410
				if (e === E) return 6402
				if (e === L) return 34041
				if (1028 === e) return 6403
				if (1029 === e) return 36244
				if (1030 === e) return 33319
				if (1031 === e) return 33320
				if (1032 === e) return 36248
				if (1033 === e) return 36249
				if (33776 === e || 33777 === e || 33778 === e || 33779 === e) {
					if (((i = t.get('WEBGL_compressed_texture_s3tc')), null === i)) return null
					if (33776 === e) return i.COMPRESSED_RGB_S3TC_DXT1_EXT
					if (33777 === e) return i.COMPRESSED_RGBA_S3TC_DXT1_EXT
					if (33778 === e) return i.COMPRESSED_RGBA_S3TC_DXT3_EXT
					if (33779 === e) return i.COMPRESSED_RGBA_S3TC_DXT5_EXT
				}
				if (35840 === e || 35841 === e || 35842 === e || 35843 === e) {
					if (((i = t.get('WEBGL_compressed_texture_pvrtc')), null === i)) return null
					if (35840 === e) return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG
					if (35841 === e) return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG
					if (35842 === e) return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG
					if (35843 === e) return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
				}
				if (36196 === e) return (i = t.get('WEBGL_compressed_texture_etc1')), null !== i ? i.COMPRESSED_RGB_ETC1_WEBGL : null
				if ((37492 === e || 37496 === e) && ((i = t.get('WEBGL_compressed_texture_etc')), null !== i)) {
					if (37492 === e) return i.COMPRESSED_RGB8_ETC2
					if (37496 === e) return i.COMPRESSED_RGBA8_ETC2_EAC
				}
				return 37808 === e ||
					37809 === e ||
					37810 === e ||
					37811 === e ||
					37812 === e ||
					37813 === e ||
					37814 === e ||
					37815 === e ||
					37816 === e ||
					37817 === e ||
					37818 === e ||
					37819 === e ||
					37820 === e ||
					37821 === e ||
					37840 === e ||
					37841 === e ||
					37842 === e ||
					37843 === e ||
					37844 === e ||
					37845 === e ||
					37846 === e ||
					37847 === e ||
					37848 === e ||
					37849 === e ||
					37850 === e ||
					37851 === e ||
					37852 === e ||
					37853 === e
					? ((i = t.get('WEBGL_compressed_texture_astc')), null !== i ? e : null)
					: 36492 === e
					? ((i = t.get('EXT_texture_compression_bptc')), null !== i ? e : null)
					: e === w
					? n
						? 34042
						: ((i = t.get('WEBGL_depth_texture')), null !== i ? i.UNSIGNED_INT_24_8_WEBGL : null)
					: void 0
			},
		}
	}
	class oa extends ci {
		constructor(e = []) {
			super(), (this.cameras = e)
		}
	}
	oa.prototype.isArrayCamera = !0
	class la extends it {
		constructor() {
			super(), (this.type = 'Group')
		}
	}
	la.prototype.isGroup = !0
	const ca = { type: 'move' }
	class ha {
		constructor() {
			;(this._targetRay = null), (this._grip = null), (this._hand = null)
		}
		getHandSpace() {
			return (
				null === this._hand &&
					((this._hand = new la()),
					(this._hand.matrixAutoUpdate = !1),
					(this._hand.visible = !1),
					(this._hand.joints = {}),
					(this._hand.inputState = { pinching: !1 })),
				this._hand
			)
		}
		getTargetRaySpace() {
			return (
				null === this._targetRay &&
					((this._targetRay = new la()),
					(this._targetRay.matrixAutoUpdate = !1),
					(this._targetRay.visible = !1),
					(this._targetRay.hasLinearVelocity = !1),
					(this._targetRay.linearVelocity = new ee()),
					(this._targetRay.hasAngularVelocity = !1),
					(this._targetRay.angularVelocity = new ee())),
				this._targetRay
			)
		}
		getGripSpace() {
			return (
				null === this._grip &&
					((this._grip = new la()),
					(this._grip.matrixAutoUpdate = !1),
					(this._grip.visible = !1),
					(this._grip.hasLinearVelocity = !1),
					(this._grip.linearVelocity = new ee()),
					(this._grip.hasAngularVelocity = !1),
					(this._grip.angularVelocity = new ee())),
				this._grip
			)
		}
		dispatchEvent(e) {
			return (
				null !== this._targetRay && this._targetRay.dispatchEvent(e),
				null !== this._grip && this._grip.dispatchEvent(e),
				null !== this._hand && this._hand.dispatchEvent(e),
				this
			)
		}
		disconnect(e) {
			return (
				this.dispatchEvent({ type: 'disconnected', data: e }),
				null !== this._targetRay && (this._targetRay.visible = !1),
				null !== this._grip && (this._grip.visible = !1),
				null !== this._hand && (this._hand.visible = !1),
				this
			)
		}
		update(e, t, i) {
			let n = null,
				r = null,
				a = null
			const s = this._targetRay,
				o = this._grip,
				l = this._hand
			if (e && 'visible-blurred' !== t.session.visibilityState)
				if (
					(null !== s &&
						((n = t.getPose(e.targetRaySpace, i)),
						null !== n &&
							(s.matrix.fromArray(n.transform.matrix),
							s.matrix.decompose(s.position, s.rotation, s.scale),
							n.linearVelocity ? ((s.hasLinearVelocity = !0), s.linearVelocity.copy(n.linearVelocity)) : (s.hasLinearVelocity = !1),
							n.angularVelocity ? ((s.hasAngularVelocity = !0), s.angularVelocity.copy(n.angularVelocity)) : (s.hasAngularVelocity = !1),
							this.dispatchEvent(ca))),
					l && e.hand)
				) {
					a = !0
					for (const n of e.hand.values()) {
						const e = t.getJointPose(n, i)
						if (void 0 === l.joints[n.jointName]) {
							const e = new la()
							;(e.matrixAutoUpdate = !1), (e.visible = !1), (l.joints[n.jointName] = e), l.add(e)
						}
						const r = l.joints[n.jointName]
						null !== e && (r.matrix.fromArray(e.transform.matrix), r.matrix.decompose(r.position, r.rotation, r.scale), (r.jointRadius = e.radius)),
							(r.visible = null !== e)
					}
					const n = l.joints['index-finger-tip'],
						r = l.joints['thumb-tip'],
						s = n.position.distanceTo(r.position),
						o = 0.02,
						c = 0.005
					l.inputState.pinching && s > o + c
						? ((l.inputState.pinching = !1), this.dispatchEvent({ type: 'pinchend', handedness: e.handedness, target: this }))
						: !l.inputState.pinching &&
						  s <= o - c &&
						  ((l.inputState.pinching = !0), this.dispatchEvent({ type: 'pinchstart', handedness: e.handedness, target: this }))
				} else
					null !== o &&
						e.gripSpace &&
						((r = t.getPose(e.gripSpace, i)),
						null !== r &&
							(o.matrix.fromArray(r.transform.matrix),
							o.matrix.decompose(o.position, o.rotation, o.scale),
							r.linearVelocity ? ((o.hasLinearVelocity = !0), o.linearVelocity.copy(r.linearVelocity)) : (o.hasLinearVelocity = !1),
							r.angularVelocity ? ((o.hasAngularVelocity = !0), o.angularVelocity.copy(r.angularVelocity)) : (o.hasAngularVelocity = !1)))
			return null !== s && (s.visible = null !== n), null !== o && (o.visible = null !== r), null !== l && (l.visible = null !== a), this
		}
	}
	class da extends Q {
		constructor(e, t, i, n, r, a, s, o, l, c) {
			if ((c = void 0 !== c ? c : E) !== E && c !== L) throw new Error('DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat')
			void 0 === i && c === E && (i = y),
				void 0 === i && c === L && (i = w),
				super(null, n, r, a, s, o, c, i, l),
				(this.image = { width: e, height: t }),
				(this.magFilter = void 0 !== s ? s : g),
				(this.minFilter = void 0 !== o ? o : g),
				(this.flipY = !1),
				(this.generateMipmaps = !1)
		}
	}
	da.prototype.isDepthTexture = !0
	class ua extends D {
		constructor(e, t) {
			super()
			const i = this
			let n = null,
				r = 1,
				a = null,
				s = 'local-floor'
			const o = e.extensions.has('WEBGL_multisampled_render_to_texture')
			let l = null,
				c = null,
				h = null,
				d = null,
				u = !1,
				p = null
			const f = t.getContextAttributes()
			let m = null,
				g = null
			const x = [],
				_ = new Map(),
				M = new ci()
			M.layers.enable(1), (M.viewport = new Z())
			const b = new ci()
			b.layers.enable(2), (b.viewport = new Z())
			const S = [M, b],
				P = new oa()
			P.layers.enable(1), P.layers.enable(2)
			let F = null,
				C = null
			function N(e) {
				const t = _.get(e.inputSource)
				t && t.dispatchEvent({ type: e.type, data: e.inputSource })
			}
			function D() {
				_.forEach(function (e, t) {
					e.disconnect(t)
				}),
					_.clear(),
					(F = null),
					(C = null),
					e.setRenderTarget(m),
					(d = null),
					(h = null),
					(c = null),
					(n = null),
					(g = null),
					B.stop(),
					(i.isPresenting = !1),
					i.dispatchEvent({ type: 'sessionend' })
			}
			function I(e) {
				const t = n.inputSources
				for (let e = 0; e < x.length; e++) _.set(t[e], x[e])
				for (let t = 0; t < e.removed.length; t++) {
					const i = e.removed[t],
						n = _.get(i)
					n && (n.dispatchEvent({ type: 'disconnected', data: i }), _.delete(i))
				}
				for (let t = 0; t < e.added.length; t++) {
					const i = e.added[t],
						n = _.get(i)
					n && n.dispatchEvent({ type: 'connected', data: i })
				}
			}
			;(this.cameraAutoUpdate = !0),
				(this.enabled = !1),
				(this.isPresenting = !1),
				(this.getController = function (e) {
					let t = x[e]
					return void 0 === t && ((t = new ha()), (x[e] = t)), t.getTargetRaySpace()
				}),
				(this.getControllerGrip = function (e) {
					let t = x[e]
					return void 0 === t && ((t = new ha()), (x[e] = t)), t.getGripSpace()
				}),
				(this.getHand = function (e) {
					let t = x[e]
					return void 0 === t && ((t = new ha()), (x[e] = t)), t.getHandSpace()
				}),
				(this.setFramebufferScaleFactor = function (e) {
					;(r = e), !0 === i.isPresenting && console.warn('THREE.WebXRManager: Cannot change framebuffer scale while presenting.')
				}),
				(this.setReferenceSpaceType = function (e) {
					;(s = e), !0 === i.isPresenting && console.warn('THREE.WebXRManager: Cannot change reference space type while presenting.')
				}),
				(this.getReferenceSpace = function () {
					return a
				}),
				(this.getBaseLayer = function () {
					return null !== h ? h : d
				}),
				(this.getBinding = function () {
					return c
				}),
				(this.getFrame = function () {
					return p
				}),
				(this.getSession = function () {
					return n
				}),
				(this.setSession = async function (l) {
					if (((n = l), null !== n)) {
						if (
							((m = e.getRenderTarget()),
							n.addEventListener('select', N),
							n.addEventListener('selectstart', N),
							n.addEventListener('selectend', N),
							n.addEventListener('squeeze', N),
							n.addEventListener('squeezestart', N),
							n.addEventListener('squeezeend', N),
							n.addEventListener('end', D),
							n.addEventListener('inputsourceschange', I),
							!0 !== f.xrCompatible && (await t.makeXRCompatible()),
							void 0 === n.renderState.layers || !1 === e.capabilities.isWebGL2)
						) {
							const i = {
								antialias: void 0 !== n.renderState.layers || f.antialias,
								alpha: f.alpha,
								depth: f.depth,
								stencil: f.stencil,
								framebufferScaleFactor: r,
							}
							;(d = new XRWebGLLayer(n, t, i)),
								n.updateRenderState({ baseLayer: d }),
								(g = new J(d.framebufferWidth, d.framebufferHeight, { format: A, type: v, encoding: e.outputEncoding }))
						} else {
							u = f.antialias
							let i = null,
								a = null,
								s = null
							f.depth && ((s = f.stencil ? 35056 : 33190), (i = f.stencil ? L : E), (a = f.stencil ? w : y))
							const l = { colorFormat: f.alpha || u ? 32856 : 32849, depthFormat: s, scaleFactor: r }
							;(c = new XRWebGLBinding(n, t)),
								(h = c.createProjectionLayer(l)),
								n.updateRenderState({ layers: [h] }),
								(g = u
									? new K(h.textureWidth, h.textureHeight, {
											format: A,
											type: v,
											depthTexture: new da(h.textureWidth, h.textureHeight, a, void 0, void 0, void 0, void 0, void 0, void 0, i),
											stencilBuffer: f.stencil,
											ignoreDepth: h.ignoreDepthValues,
											useRenderToTexture: o,
											encoding: e.outputEncoding,
									  })
									: new J(h.textureWidth, h.textureHeight, {
											format: f.alpha ? A : T,
											type: v,
											depthTexture: new da(h.textureWidth, h.textureHeight, a, void 0, void 0, void 0, void 0, void 0, void 0, i),
											stencilBuffer: f.stencil,
											ignoreDepth: h.ignoreDepthValues,
											encoding: e.outputEncoding,
									  }))
						}
						this.setFoveation(1),
							(a = await n.requestReferenceSpace(s)),
							B.setContext(n),
							B.start(),
							(i.isPresenting = !0),
							i.dispatchEvent({ type: 'sessionstart' })
					}
				})
			const R = new ee(),
				U = new ee()
			function z(e, t) {
				null === t ? e.matrixWorld.copy(e.matrix) : e.matrixWorld.multiplyMatrices(t.matrixWorld, e.matrix), e.matrixWorldInverse.copy(e.matrixWorld).invert()
			}
			;(this.updateCamera = function (e) {
				if (null === n) return
				;(P.near = b.near = M.near = e.near),
					(P.far = b.far = M.far = e.far),
					(F === P.near && C === P.far) || (n.updateRenderState({ depthNear: P.near, depthFar: P.far }), (F = P.near), (C = P.far))
				const t = e.parent,
					i = P.cameras
				z(P, t)
				for (let e = 0; e < i.length; e++) z(i[e], t)
				P.matrixWorld.decompose(P.position, P.quaternion, P.scale),
					e.position.copy(P.position),
					e.quaternion.copy(P.quaternion),
					e.scale.copy(P.scale),
					e.matrix.copy(P.matrix),
					e.matrixWorld.copy(P.matrixWorld)
				const r = e.children
				for (let e = 0, t = r.length; e < t; e++) r[e].updateMatrixWorld(!0)
				2 === i.length
					? (function (e, t, i) {
							R.setFromMatrixPosition(t.matrixWorld), U.setFromMatrixPosition(i.matrixWorld)
							const n = R.distanceTo(U),
								r = t.projectionMatrix.elements,
								a = i.projectionMatrix.elements,
								s = r[14] / (r[10] - 1),
								o = r[14] / (r[10] + 1),
								l = (r[9] + 1) / r[5],
								c = (r[9] - 1) / r[5],
								h = (r[8] - 1) / r[0],
								d = (a[8] + 1) / a[0],
								u = s * h,
								p = s * d,
								f = n / (-h + d),
								m = f * -h
							t.matrixWorld.decompose(e.position, e.quaternion, e.scale),
								e.translateX(m),
								e.translateZ(f),
								e.matrixWorld.compose(e.position, e.quaternion, e.scale),
								e.matrixWorldInverse.copy(e.matrixWorld).invert()
							const g = s + f,
								x = o + f,
								_ = u - m,
								v = p + (n - m),
								y = ((l * o) / x) * g,
								M = ((c * o) / x) * g
							e.projectionMatrix.makePerspective(_, v, y, M, g, x)
					  })(P, M, b)
					: P.projectionMatrix.copy(M.projectionMatrix)
			}),
				(this.getCamera = function () {
					return P
				}),
				(this.getFoveation = function () {
					return null !== h ? h.fixedFoveation : null !== d ? d.fixedFoveation : void 0
				}),
				(this.setFoveation = function (e) {
					null !== h && (h.fixedFoveation = e), null !== d && void 0 !== d.fixedFoveation && (d.fixedFoveation = e)
				})
			let O = null
			const B = new Mi()
			B.setAnimationLoop(function (t, i) {
				if (((l = i.getViewerPose(a)), (p = i), null !== l)) {
					const t = l.views
					null !== d && (e.setRenderTargetFramebuffer(g, d.framebuffer), e.setRenderTarget(g))
					let i = !1
					t.length !== P.cameras.length && ((P.cameras.length = 0), (i = !0))
					for (let n = 0; n < t.length; n++) {
						const r = t[n]
						let a = null
						if (null !== d) a = d.getViewport(r)
						else {
							const t = c.getViewSubImage(h, r)
							;(a = t.viewport),
								0 === n && (e.setRenderTargetTextures(g, t.colorTexture, h.ignoreDepthValues ? void 0 : t.depthStencilTexture), e.setRenderTarget(g))
						}
						const s = S[n]
						s.matrix.fromArray(r.transform.matrix),
							s.projectionMatrix.fromArray(r.projectionMatrix),
							s.viewport.set(a.x, a.y, a.width, a.height),
							0 === n && P.matrix.copy(s.matrix),
							!0 === i && P.cameras.push(s)
					}
				}
				const r = n.inputSources
				for (let e = 0; e < x.length; e++) {
					const t = x[e],
						n = r[e]
					t.update(n, i, a)
				}
				O && O(t, i), (p = null)
			}),
				(this.setAnimationLoop = function (e) {
					O = e
				}),
				(this.dispose = function () {})
		}
	}
	function pa(e) {
		function t(t, i) {
			;(t.opacity.value = i.opacity),
				i.color && t.diffuse.value.copy(i.color),
				i.emissive && t.emissive.value.copy(i.emissive).multiplyScalar(i.emissiveIntensity),
				i.map && (t.map.value = i.map),
				i.alphaMap && (t.alphaMap.value = i.alphaMap),
				i.specularMap && (t.specularMap.value = i.specularMap),
				i.alphaTest > 0 && (t.alphaTest.value = i.alphaTest)
			const n = e.get(i).envMap
			let r, a
			n &&
				((t.envMap.value = n),
				(t.flipEnvMap.value = n.isCubeTexture && !1 === n.isRenderTargetTexture ? -1 : 1),
				(t.reflectivity.value = i.reflectivity),
				(t.ior.value = i.ior),
				(t.refractionRatio.value = i.refractionRatio)),
				i.lightMap && ((t.lightMap.value = i.lightMap), (t.lightMapIntensity.value = i.lightMapIntensity)),
				i.aoMap && ((t.aoMap.value = i.aoMap), (t.aoMapIntensity.value = i.aoMapIntensity)),
				i.map
					? (r = i.map)
					: i.specularMap
					? (r = i.specularMap)
					: i.displacementMap
					? (r = i.displacementMap)
					: i.normalMap
					? (r = i.normalMap)
					: i.bumpMap
					? (r = i.bumpMap)
					: i.roughnessMap
					? (r = i.roughnessMap)
					: i.metalnessMap
					? (r = i.metalnessMap)
					: i.alphaMap
					? (r = i.alphaMap)
					: i.emissiveMap
					? (r = i.emissiveMap)
					: i.clearcoatMap
					? (r = i.clearcoatMap)
					: i.clearcoatNormalMap
					? (r = i.clearcoatNormalMap)
					: i.clearcoatRoughnessMap
					? (r = i.clearcoatRoughnessMap)
					: i.specularIntensityMap
					? (r = i.specularIntensityMap)
					: i.specularColorMap
					? (r = i.specularColorMap)
					: i.transmissionMap
					? (r = i.transmissionMap)
					: i.thicknessMap
					? (r = i.thicknessMap)
					: i.sheenColorMap
					? (r = i.sheenColorMap)
					: i.sheenRoughnessMap && (r = i.sheenRoughnessMap),
				void 0 !== r && (r.isWebGLRenderTarget && (r = r.texture), !0 === r.matrixAutoUpdate && r.updateMatrix(), t.uvTransform.value.copy(r.matrix)),
				i.aoMap ? (a = i.aoMap) : i.lightMap && (a = i.lightMap),
				void 0 !== a && (a.isWebGLRenderTarget && (a = a.texture), !0 === a.matrixAutoUpdate && a.updateMatrix(), t.uv2Transform.value.copy(a.matrix))
		}
		function i(t, i) {
			;(t.roughness.value = i.roughness),
				(t.metalness.value = i.metalness),
				i.roughnessMap && (t.roughnessMap.value = i.roughnessMap),
				i.metalnessMap && (t.metalnessMap.value = i.metalnessMap),
				i.emissiveMap && (t.emissiveMap.value = i.emissiveMap),
				i.bumpMap && ((t.bumpMap.value = i.bumpMap), (t.bumpScale.value = i.bumpScale), 1 === i.side && (t.bumpScale.value *= -1)),
				i.normalMap && ((t.normalMap.value = i.normalMap), t.normalScale.value.copy(i.normalScale), 1 === i.side && t.normalScale.value.negate()),
				i.displacementMap &&
					((t.displacementMap.value = i.displacementMap), (t.displacementScale.value = i.displacementScale), (t.displacementBias.value = i.displacementBias))
			e.get(i).envMap && (t.envMapIntensity.value = i.envMapIntensity)
		}
		return {
			refreshFogUniforms: function (e, t) {
				e.fogColor.value.copy(t.color), t.isFog ? ((e.fogNear.value = t.near), (e.fogFar.value = t.far)) : t.isFogExp2 && (e.fogDensity.value = t.density)
			},
			refreshMaterialUniforms: function (e, n, r, a, s) {
				n.isMeshBasicMaterial
					? t(e, n)
					: n.isMeshLambertMaterial
					? (t(e, n),
					  (function (e, t) {
							t.emissiveMap && (e.emissiveMap.value = t.emissiveMap)
					  })(e, n))
					: n.isMeshToonMaterial
					? (t(e, n),
					  (function (e, t) {
							t.gradientMap && (e.gradientMap.value = t.gradientMap)
							t.emissiveMap && (e.emissiveMap.value = t.emissiveMap)
							t.bumpMap && ((e.bumpMap.value = t.bumpMap), (e.bumpScale.value = t.bumpScale), 1 === t.side && (e.bumpScale.value *= -1))
							t.normalMap && ((e.normalMap.value = t.normalMap), e.normalScale.value.copy(t.normalScale), 1 === t.side && e.normalScale.value.negate())
							t.displacementMap &&
								((e.displacementMap.value = t.displacementMap),
								(e.displacementScale.value = t.displacementScale),
								(e.displacementBias.value = t.displacementBias))
					  })(e, n))
					: n.isMeshPhongMaterial
					? (t(e, n),
					  (function (e, t) {
							e.specular.value.copy(t.specular), (e.shininess.value = Math.max(t.shininess, 1e-4)), t.emissiveMap && (e.emissiveMap.value = t.emissiveMap)
							t.bumpMap && ((e.bumpMap.value = t.bumpMap), (e.bumpScale.value = t.bumpScale), 1 === t.side && (e.bumpScale.value *= -1))
							t.normalMap && ((e.normalMap.value = t.normalMap), e.normalScale.value.copy(t.normalScale), 1 === t.side && e.normalScale.value.negate())
							t.displacementMap &&
								((e.displacementMap.value = t.displacementMap),
								(e.displacementScale.value = t.displacementScale),
								(e.displacementBias.value = t.displacementBias))
					  })(e, n))
					: n.isMeshStandardMaterial
					? (t(e, n),
					  n.isMeshPhysicalMaterial
							? (function (e, t, n) {
									i(e, t),
										(e.ior.value = t.ior),
										t.sheen > 0 &&
											(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),
											(e.sheenRoughness.value = t.sheenRoughness),
											t.sheenColorMap && (e.sheenColorMap.value = t.sheenColorMap),
											t.sheenRoughnessMap && (e.sheenRoughnessMap.value = t.sheenRoughnessMap))
									t.clearcoat > 0 &&
										((e.clearcoat.value = t.clearcoat),
										(e.clearcoatRoughness.value = t.clearcoatRoughness),
										t.clearcoatMap && (e.clearcoatMap.value = t.clearcoatMap),
										t.clearcoatRoughnessMap && (e.clearcoatRoughnessMap.value = t.clearcoatRoughnessMap),
										t.clearcoatNormalMap &&
											(e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),
											(e.clearcoatNormalMap.value = t.clearcoatNormalMap),
											1 === t.side && e.clearcoatNormalScale.value.negate()))
									t.transmission > 0 &&
										((e.transmission.value = t.transmission),
										(e.transmissionSamplerMap.value = n.texture),
										e.transmissionSamplerSize.value.set(n.width, n.height),
										t.transmissionMap && (e.transmissionMap.value = t.transmissionMap),
										(e.thickness.value = t.thickness),
										t.thicknessMap && (e.thicknessMap.value = t.thicknessMap),
										(e.attenuationDistance.value = t.attenuationDistance),
										e.attenuationColor.value.copy(t.attenuationColor))
									;(e.specularIntensity.value = t.specularIntensity),
										e.specularColor.value.copy(t.specularColor),
										t.specularIntensityMap && (e.specularIntensityMap.value = t.specularIntensityMap)
									t.specularColorMap && (e.specularColorMap.value = t.specularColorMap)
							  })(e, n, s)
							: i(e, n))
					: n.isMeshMatcapMaterial
					? (t(e, n),
					  (function (e, t) {
							t.matcap && (e.matcap.value = t.matcap)
							t.bumpMap && ((e.bumpMap.value = t.bumpMap), (e.bumpScale.value = t.bumpScale), 1 === t.side && (e.bumpScale.value *= -1))
							t.normalMap && ((e.normalMap.value = t.normalMap), e.normalScale.value.copy(t.normalScale), 1 === t.side && e.normalScale.value.negate())
							t.displacementMap &&
								((e.displacementMap.value = t.displacementMap),
								(e.displacementScale.value = t.displacementScale),
								(e.displacementBias.value = t.displacementBias))
					  })(e, n))
					: n.isMeshDepthMaterial
					? (t(e, n),
					  (function (e, t) {
							t.displacementMap &&
								((e.displacementMap.value = t.displacementMap),
								(e.displacementScale.value = t.displacementScale),
								(e.displacementBias.value = t.displacementBias))
					  })(e, n))
					: n.isMeshDistanceMaterial
					? (t(e, n),
					  (function (e, t) {
							t.displacementMap &&
								((e.displacementMap.value = t.displacementMap),
								(e.displacementScale.value = t.displacementScale),
								(e.displacementBias.value = t.displacementBias))
							e.referencePosition.value.copy(t.referencePosition), (e.nearDistance.value = t.nearDistance), (e.farDistance.value = t.farDistance)
					  })(e, n))
					: n.isMeshNormalMaterial
					? (t(e, n),
					  (function (e, t) {
							t.bumpMap && ((e.bumpMap.value = t.bumpMap), (e.bumpScale.value = t.bumpScale), 1 === t.side && (e.bumpScale.value *= -1))
							t.normalMap && ((e.normalMap.value = t.normalMap), e.normalScale.value.copy(t.normalScale), 1 === t.side && e.normalScale.value.negate())
							t.displacementMap &&
								((e.displacementMap.value = t.displacementMap),
								(e.displacementScale.value = t.displacementScale),
								(e.displacementBias.value = t.displacementBias))
					  })(e, n))
					: n.isLineBasicMaterial
					? ((function (e, t) {
							e.diffuse.value.copy(t.color), (e.opacity.value = t.opacity)
					  })(e, n),
					  n.isLineDashedMaterial &&
							(function (e, t) {
								;(e.dashSize.value = t.dashSize), (e.totalSize.value = t.dashSize + t.gapSize), (e.scale.value = t.scale)
							})(e, n))
					: n.isPointsMaterial
					? (function (e, t, i, n) {
							e.diffuse.value.copy(t.color),
								(e.opacity.value = t.opacity),
								(e.size.value = t.size * i),
								(e.scale.value = 0.5 * n),
								t.map && (e.map.value = t.map)
							t.alphaMap && (e.alphaMap.value = t.alphaMap)
							t.alphaTest > 0 && (e.alphaTest.value = t.alphaTest)
							let r
							t.map ? (r = t.map) : t.alphaMap && (r = t.alphaMap)
							void 0 !== r && (!0 === r.matrixAutoUpdate && r.updateMatrix(), e.uvTransform.value.copy(r.matrix))
					  })(e, n, r, a)
					: n.isSpriteMaterial
					? (function (e, t) {
							e.diffuse.value.copy(t.color), (e.opacity.value = t.opacity), (e.rotation.value = t.rotation), t.map && (e.map.value = t.map)
							t.alphaMap && (e.alphaMap.value = t.alphaMap)
							t.alphaTest > 0 && (e.alphaTest.value = t.alphaTest)
							let i
							t.map ? (i = t.map) : t.alphaMap && (i = t.alphaMap)
							void 0 !== i && (!0 === i.matrixAutoUpdate && i.updateMatrix(), e.uvTransform.value.copy(i.matrix))
					  })(e, n)
					: n.isShadowMaterial
					? (e.color.value.copy(n.color), (e.opacity.value = n.opacity))
					: n.isShaderMaterial && (n.uniformsNeedUpdate = !1)
			},
		}
	}
	function fa(e = {}) {
		const t =
				void 0 !== e.canvas
					? e.canvas
					: (function () {
							const e = X('canvas')
							return (e.style.display = 'block'), e
					  })(),
			i = void 0 !== e.context ? e.context : null,
			n = void 0 !== e.alpha && e.alpha,
			r = void 0 === e.depth || e.depth,
			a = void 0 === e.stencil || e.stencil,
			s = void 0 !== e.antialias && e.antialias,
			o = void 0 === e.premultipliedAlpha || e.premultipliedAlpha,
			l = void 0 !== e.preserveDrawingBuffer && e.preserveDrawingBuffer,
			c = void 0 !== e.powerPreference ? e.powerPreference : 'default',
			h = void 0 !== e.failIfMajorPerformanceCaveat && e.failIfMajorPerformanceCaveat
		let d = null,
			u = null
		const p = [],
			m = []
		;(this.domElement = t),
			(this.debug = { checkShaderErrors: !0 }),
			(this.autoClear = !0),
			(this.autoClearColor = !0),
			(this.autoClearDepth = !0),
			(this.autoClearStencil = !0),
			(this.sortObjects = !0),
			(this.clippingPlanes = []),
			(this.localClippingEnabled = !1),
			(this.outputEncoding = P),
			(this.physicallyCorrectLights = !1),
			(this.toneMapping = 0),
			(this.toneMappingExposure = 1)
		const x = this
		let y = !1,
			M = 0,
			w = 0,
			T = null,
			E = -1,
			L = null
		const F = new Z(),
			C = new Z()
		let N = null,
			D = t.width,
			I = t.height,
			R = 1,
			U = null,
			z = null
		const O = new Z(0, 0, D, I),
			B = new Z(0, 0, D, I)
		let k = !1
		const G = [],
			H = new yi()
		let V = !1,
			W = !1,
			Y = null
		const j = new Ce(),
			Q = new ee(),
			q = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 }
		function $() {
			return null === T ? R : 1
		}
		let te,
			ie,
			ne,
			re,
			ae,
			se,
			oe,
			le,
			ce,
			he,
			de,
			ue,
			pe,
			fe,
			me,
			ge,
			xe,
			_e,
			ve,
			ye,
			Me,
			be,
			Se,
			we = i
		function Te(e, i) {
			for (let n = 0; n < e.length; n++) {
				const r = e[n],
					a = t.getContext(r, i)
				if (null !== a) return a
			}
			return null
		}
		try {
			const e = {
				alpha: n,
				depth: r,
				stencil: a,
				antialias: s,
				premultipliedAlpha: o,
				preserveDrawingBuffer: l,
				powerPreference: c,
				failIfMajorPerformanceCaveat: h,
			}
			if (
				('setAttribute' in t && t.setAttribute('data-engine', 'three.js r136'),
				t.addEventListener('webglcontextlost', Le, !1),
				t.addEventListener('webglcontextrestored', Pe, !1),
				null === we)
			) {
				const t = ['webgl2', 'webgl', 'experimental-webgl']
				if ((!0 === x.isWebGL1Renderer && t.shift(), (we = Te(t, e)), null === we))
					throw Te(t) ? new Error('Error creating WebGL context with your selected attributes.') : new Error('Error creating WebGL context.')
			}
			void 0 === we.getShaderPrecisionFormat &&
				(we.getShaderPrecisionFormat = function () {
					return { rangeMin: 1, rangeMax: 1, precision: 1 }
				})
		} catch (e) {
			throw (console.error('THREE.WebGLRenderer: ' + e.message), e)
		}
		function Ae() {
			;(te = new an(we)),
				(ie = new Fi(we, te, e)),
				te.init(ie),
				(be = new sa(we, te, ie)),
				(ne = new ra(we, te, ie)),
				(G[0] = 1029),
				(re = new ln(we)),
				(ae = new Wr()),
				(se = new aa(we, te, ne, ae, ie, be, re)),
				(oe = new Ni(x)),
				(le = new rn(x)),
				(ce = new bi(we, ie)),
				(Se = new Li(we, te, ce, ie)),
				(he = new sn(we, ce, re, Se)),
				(de = new fn(we, he, ce, re)),
				(ve = new pn(we, ie, se)),
				(ge = new Ci(ae)),
				(ue = new Vr(x, oe, le, te, ie, Se, ge)),
				(pe = new pa(ae)),
				(fe = new Qr()),
				(me = new ea(te, ie)),
				(_e = new Ei(x, oe, ne, de, o)),
				(xe = new na(x, de, ie)),
				(ye = new Pi(we, te, re, ie)),
				(Me = new on(we, te, re, ie)),
				(re.programs = ue.programs),
				(x.capabilities = ie),
				(x.extensions = te),
				(x.properties = ae),
				(x.renderLists = fe),
				(x.shadowMap = xe),
				(x.state = ne),
				(x.info = re)
		}
		Ae()
		const Ee = new ua(x, we)
		function Le(e) {
			e.preventDefault(), console.log('THREE.WebGLRenderer: Context Lost.'), (y = !0)
		}
		function Pe() {
			console.log('THREE.WebGLRenderer: Context Restored.'), (y = !1)
			const e = re.autoReset,
				t = xe.enabled,
				i = xe.autoUpdate,
				n = xe.needsUpdate,
				r = xe.type
			Ae(), (re.autoReset = e), (xe.enabled = t), (xe.autoUpdate = i), (xe.needsUpdate = n), (xe.type = r)
		}
		function Fe(e) {
			const t = e.target
			t.removeEventListener('dispose', Fe),
				(function (e) {
					;(function (e) {
						const t = ae.get(e).programs
						void 0 !== t &&
							(t.forEach(function (e) {
								ue.releaseProgram(e)
							}),
							e.isShaderMaterial && ue.releaseShaderCache(e))
					})(e),
						ae.remove(e)
				})(t)
		}
		;(this.xr = Ee),
			(this.getContext = function () {
				return we
			}),
			(this.getContextAttributes = function () {
				return we.getContextAttributes()
			}),
			(this.forceContextLoss = function () {
				const e = te.get('WEBGL_lose_context')
				e && e.loseContext()
			}),
			(this.forceContextRestore = function () {
				const e = te.get('WEBGL_lose_context')
				e && e.restoreContext()
			}),
			(this.getPixelRatio = function () {
				return R
			}),
			(this.setPixelRatio = function (e) {
				void 0 !== e && ((R = e), this.setSize(D, I, !1))
			}),
			(this.getSize = function (e) {
				return e.set(D, I)
			}),
			(this.setSize = function (e, i, n) {
				Ee.isPresenting
					? console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.")
					: ((D = e),
					  (I = i),
					  (t.width = Math.floor(e * R)),
					  (t.height = Math.floor(i * R)),
					  !1 !== n && ((t.style.width = e + 'px'), (t.style.height = i + 'px')),
					  this.setViewport(0, 0, e, i))
			}),
			(this.getDrawingBufferSize = function (e) {
				return e.set(D * R, I * R).floor()
			}),
			(this.setDrawingBufferSize = function (e, i, n) {
				;(D = e), (I = i), (R = n), (t.width = Math.floor(e * n)), (t.height = Math.floor(i * n)), this.setViewport(0, 0, e, i)
			}),
			(this.getCurrentViewport = function (e) {
				return e.copy(F)
			}),
			(this.getViewport = function (e) {
				return e.copy(O)
			}),
			(this.setViewport = function (e, t, i, n) {
				e.isVector4 ? O.set(e.x, e.y, e.z, e.w) : O.set(e, t, i, n), ne.viewport(F.copy(O).multiplyScalar(R).floor())
			}),
			(this.getScissor = function (e) {
				return e.copy(B)
			}),
			(this.setScissor = function (e, t, i, n) {
				e.isVector4 ? B.set(e.x, e.y, e.z, e.w) : B.set(e, t, i, n), ne.scissor(C.copy(B).multiplyScalar(R).floor())
			}),
			(this.getScissorTest = function () {
				return k
			}),
			(this.setScissorTest = function (e) {
				ne.setScissorTest((k = e))
			}),
			(this.setOpaqueSort = function (e) {
				U = e
			}),
			(this.setTransparentSort = function (e) {
				z = e
			}),
			(this.getClearColor = function (e) {
				return e.copy(_e.getClearColor())
			}),
			(this.setClearColor = function () {
				_e.setClearColor.apply(_e, arguments)
			}),
			(this.getClearAlpha = function () {
				return _e.getClearAlpha()
			}),
			(this.setClearAlpha = function () {
				_e.setClearAlpha.apply(_e, arguments)
			}),
			(this.clear = function (e, t, i) {
				let n = 0
				;(void 0 === e || e) && (n |= 16384), (void 0 === t || t) && (n |= 256), (void 0 === i || i) && (n |= 1024), we.clear(n)
			}),
			(this.clearColor = function () {
				this.clear(!0, !1, !1)
			}),
			(this.clearDepth = function () {
				this.clear(!1, !0, !1)
			}),
			(this.clearStencil = function () {
				this.clear(!1, !1, !0)
			}),
			(this.dispose = function () {
				t.removeEventListener('webglcontextlost', Le, !1),
					t.removeEventListener('webglcontextrestored', Pe, !1),
					fe.dispose(),
					me.dispose(),
					ae.dispose(),
					oe.dispose(),
					le.dispose(),
					de.dispose(),
					Se.dispose(),
					ue.dispose(),
					Ee.dispose(),
					Ee.removeEventListener('sessionstart', De),
					Ee.removeEventListener('sessionend', Ie),
					Y && (Y.dispose(), (Y = null)),
					Re.stop()
			}),
			(this.renderBufferDirect = function (e, t, i, n, r, a) {
				null === t && (t = q)
				const s = r.isMesh && r.matrixWorld.determinant() < 0,
					o = (function (e, t, i, n, r) {
						!0 !== t.isScene && (t = q)
						se.resetTextureUnits()
						const a = t.fog,
							s = n.isMeshStandardMaterial ? t.environment : null,
							o = null === T ? x.outputEncoding : T.texture.encoding,
							l = (n.isMeshStandardMaterial ? le : oe).get(n.envMap || s),
							c = !0 === n.vertexColors && !!i.attributes.color && 4 === i.attributes.color.itemSize,
							h = !!n.normalMap && !!i.attributes.tangent,
							d = !!i.morphAttributes.position,
							p = !!i.morphAttributes.normal,
							f = i.morphAttributes.position ? i.morphAttributes.position.length : 0,
							m = n.toneMapped ? x.toneMapping : 0,
							g = ae.get(n),
							_ = u.state.lights
						if (!0 === V && (!0 === W || e !== L)) {
							const t = e === L && n.id === E
							ge.setState(n, e, t)
						}
						let v = !1
						n.version === g.__version
							? (g.needsLights && g.lightsStateVersion !== _.state.version) || g.outputEncoding !== o || (r.isInstancedMesh && !1 === g.instancing)
								? (v = !0)
								: r.isInstancedMesh || !0 !== g.instancing
								? r.isSkinnedMesh && !1 === g.skinning
									? (v = !0)
									: r.isSkinnedMesh || !0 !== g.skinning
									? g.envMap !== l || (n.fog && g.fog !== a)
										? (v = !0)
										: void 0 === g.numClippingPlanes || (g.numClippingPlanes === ge.numPlanes && g.numIntersection === ge.numIntersection)
										? (g.vertexAlphas !== c ||
												g.vertexTangents !== h ||
												g.morphTargets !== d ||
												g.morphNormals !== p ||
												g.toneMapping !== m ||
												(!0 === ie.isWebGL2 && g.morphTargetsCount !== f)) &&
										  (v = !0)
										: (v = !0)
									: (v = !0)
								: (v = !0)
							: ((v = !0), (g.__version = n.version))
						let y = g.currentProgram
						!0 === v && (y = ke(n, t, r))
						let M = !1,
							b = !1,
							S = !1
						const w = y.getUniforms(),
							A = g.uniforms
						ne.useProgram(y.program) && ((M = !0), (b = !0), (S = !0))
						n.id !== E && ((E = n.id), (b = !0))
						if (M || L !== e) {
							if (
								(w.setValue(we, 'projectionMatrix', e.projectionMatrix),
								ie.logarithmicDepthBuffer && w.setValue(we, 'logDepthBufFC', 2 / (Math.log(e.far + 1) / Math.LN2)),
								L !== e && ((L = e), (b = !0), (S = !0)),
								n.isShaderMaterial || n.isMeshPhongMaterial || n.isMeshToonMaterial || n.isMeshStandardMaterial || n.envMap)
							) {
								const t = w.map.cameraPosition
								void 0 !== t && t.setValue(we, Q.setFromMatrixPosition(e.matrixWorld))
							}
							;(n.isMeshPhongMaterial ||
								n.isMeshToonMaterial ||
								n.isMeshLambertMaterial ||
								n.isMeshBasicMaterial ||
								n.isMeshStandardMaterial ||
								n.isShaderMaterial) &&
								w.setValue(we, 'isOrthographic', !0 === e.isOrthographicCamera),
								(n.isMeshPhongMaterial ||
									n.isMeshToonMaterial ||
									n.isMeshLambertMaterial ||
									n.isMeshBasicMaterial ||
									n.isMeshStandardMaterial ||
									n.isShaderMaterial ||
									n.isShadowMaterial ||
									r.isSkinnedMesh) &&
									w.setValue(we, 'viewMatrix', e.matrixWorldInverse)
						}
						if (r.isSkinnedMesh) {
							w.setOptional(we, r, 'bindMatrix'), w.setOptional(we, r, 'bindMatrixInverse')
							const e = r.skeleton
							e &&
								(ie.floatVertexTextures
									? (null === e.boneTexture && e.computeBoneTexture(),
									  w.setValue(we, 'boneTexture', e.boneTexture, se),
									  w.setValue(we, 'boneTextureSize', e.boneTextureSize))
									: w.setOptional(we, e, 'boneMatrices'))
						}
						!i || (void 0 === i.morphAttributes.position && void 0 === i.morphAttributes.normal) || ve.update(r, i, n, y)
						;(b || g.receiveShadow !== r.receiveShadow) && ((g.receiveShadow = r.receiveShadow), w.setValue(we, 'receiveShadow', r.receiveShadow))
						b &&
							(w.setValue(we, 'toneMappingExposure', x.toneMappingExposure),
							g.needsLights &&
								((F = S),
								((P = A).ambientLightColor.needsUpdate = F),
								(P.lightProbe.needsUpdate = F),
								(P.directionalLights.needsUpdate = F),
								(P.directionalLightShadows.needsUpdate = F),
								(P.pointLights.needsUpdate = F),
								(P.pointLightShadows.needsUpdate = F),
								(P.spotLights.needsUpdate = F),
								(P.spotLightShadows.needsUpdate = F),
								(P.rectAreaLights.needsUpdate = F),
								(P.hemisphereLights.needsUpdate = F)),
							a && n.fog && pe.refreshFogUniforms(A, a),
							pe.refreshMaterialUniforms(A, n, R, I, Y),
							vr.upload(we, g.uniformsList, A, se))
						var P, F
						n.isShaderMaterial && !0 === n.uniformsNeedUpdate && (vr.upload(we, g.uniformsList, A, se), (n.uniformsNeedUpdate = !1))
						n.isSpriteMaterial && w.setValue(we, 'center', r.center)
						return (
							w.setValue(we, 'modelViewMatrix', r.modelViewMatrix),
							w.setValue(we, 'normalMatrix', r.normalMatrix),
							w.setValue(we, 'modelMatrix', r.matrixWorld),
							y
						)
					})(e, t, i, n, r)
				ne.setMaterial(n, s)
				let l = i.index
				const c = i.attributes.position
				if (null === l) {
					if (void 0 === c || 0 === c.count) return
				} else if (0 === l.count) return
				let h,
					d = 1
				!0 === n.wireframe && ((l = he.getWireframeAttribute(i)), (d = 2)), Se.setup(r, n, o, i, l)
				let p = ye
				null !== l && ((h = ce.get(l)), (p = Me), p.setIndex(h))
				const f = null !== l ? l.count : c.count,
					m = i.drawRange.start * d,
					g = i.drawRange.count * d,
					_ = null !== a ? a.start * d : 0,
					v = null !== a ? a.count * d : 1 / 0,
					y = Math.max(m, _),
					M = Math.min(f, m + g, _ + v) - 1,
					b = Math.max(0, M - y + 1)
				if (0 !== b) {
					if (r.isMesh) !0 === n.wireframe ? (ne.setLineWidth(n.wireframeLinewidth * $()), p.setMode(1)) : p.setMode(4)
					else if (r.isLine) {
						let e = n.linewidth
						void 0 === e && (e = 1), ne.setLineWidth(e * $()), r.isLineSegments ? p.setMode(1) : r.isLineLoop ? p.setMode(2) : p.setMode(3)
					} else r.isPoints ? p.setMode(0) : r.isSprite && p.setMode(4)
					if (r.isInstancedMesh) p.renderInstances(y, b, r.count)
					else if (i.isInstancedBufferGeometry) {
						const e = Math.min(i.instanceCount, i._maxInstanceCount)
						p.renderInstances(y, b, e)
					} else p.render(y, b)
				}
			}),
			(this.compile = function (e, t) {
				;(u = me.get(e)),
					u.init(),
					m.push(u),
					e.traverseVisible(function (e) {
						e.isLight && e.layers.test(t.layers) && (u.pushLight(e), e.castShadow && u.pushShadow(e))
					}),
					u.setupLights(x.physicallyCorrectLights),
					e.traverse(function (t) {
						const i = t.material
						if (i)
							if (Array.isArray(i))
								for (let n = 0; n < i.length; n++) {
									ke(i[n], e, t)
								}
							else ke(i, e, t)
					}),
					m.pop(),
					(u = null)
			})
		let Ne = null
		function De() {
			Re.stop()
		}
		function Ie() {
			Re.start()
		}
		const Re = new Mi()
		function Ue(e, t, i, n) {
			if (!1 === e.visible) return
			if (e.layers.test(t.layers))
				if (e.isGroup) i = e.renderOrder
				else if (e.isLOD) !0 === e.autoUpdate && e.update(t)
				else if (e.isLight) u.pushLight(e), e.castShadow && u.pushShadow(e)
				else if (e.isSprite) {
					if (!e.frustumCulled || H.intersectsSprite(e)) {
						n && Q.setFromMatrixPosition(e.matrixWorld).applyMatrix4(j)
						const t = de.update(e),
							r = e.material
						r.visible && d.push(e, t, r, i, Q.z, null)
					}
				} else if (
					(e.isMesh || e.isLine || e.isPoints) &&
					(e.isSkinnedMesh && e.skeleton.frame !== re.render.frame && (e.skeleton.update(), (e.skeleton.frame = re.render.frame)),
					!e.frustumCulled || H.intersectsObject(e))
				) {
					n && Q.setFromMatrixPosition(e.matrixWorld).applyMatrix4(j)
					const t = de.update(e),
						r = e.material
					if (Array.isArray(r)) {
						const n = t.groups
						for (let a = 0, s = n.length; a < s; a++) {
							const s = n[a],
								o = r[s.materialIndex]
							o && o.visible && d.push(e, t, o, i, Q.z, s)
						}
					} else r.visible && d.push(e, t, r, i, Q.z, null)
				}
			const r = e.children
			for (let e = 0, a = r.length; e < a; e++) Ue(r[e], t, i, n)
		}
		function ze(e, t, i, n) {
			const r = e.opaque,
				a = e.transmissive,
				o = e.transparent
			u.setupLightsView(i),
				a.length > 0 &&
					(function (e, t, i) {
						if (null === Y) {
							const e = !0 === s && !0 === ie.isWebGL2
							Y = new (e ? K : J)(1024, 1024, {
								generateMipmaps: !0,
								type: null !== be.convert(S) ? S : v,
								minFilter: _,
								magFilter: g,
								wrapS: f,
								wrapT: f,
								useRenderToTexture: te.has('WEBGL_multisampled_render_to_texture'),
							})
						}
						const n = x.getRenderTarget()
						x.setRenderTarget(Y), x.clear()
						const r = x.toneMapping
						;(x.toneMapping = 0), Oe(e, t, i), (x.toneMapping = r), se.updateMultisampleRenderTarget(Y), se.updateRenderTargetMipmap(Y), x.setRenderTarget(n)
					})(r, t, i),
				n && ne.viewport(F.copy(n)),
				r.length > 0 && Oe(r, t, i),
				a.length > 0 && Oe(a, t, i),
				o.length > 0 && Oe(o, t, i)
		}
		function Oe(e, t, i) {
			const n = !0 === t.isScene ? t.overrideMaterial : null
			for (let r = 0, a = e.length; r < a; r++) {
				const a = e[r],
					s = a.object,
					o = a.geometry,
					l = null === n ? a.material : n,
					c = a.group
				s.layers.test(i.layers) && Be(s, t, i, o, l, c)
			}
		}
		function Be(e, t, i, n, r, a) {
			e.onBeforeRender(x, t, i, n, r, a),
				e.modelViewMatrix.multiplyMatrices(i.matrixWorldInverse, e.matrixWorld),
				e.normalMatrix.getNormalMatrix(e.modelViewMatrix),
				r.onBeforeRender(x, t, i, n, e, a),
				!0 === r.transparent && 2 === r.side
					? ((r.side = 1),
					  (r.needsUpdate = !0),
					  x.renderBufferDirect(i, t, n, r, e, a),
					  (r.side = 0),
					  (r.needsUpdate = !0),
					  x.renderBufferDirect(i, t, n, r, e, a),
					  (r.side = 2))
					: x.renderBufferDirect(i, t, n, r, e, a),
				e.onAfterRender(x, t, i, n, r, a)
		}
		function ke(e, t, i) {
			!0 !== t.isScene && (t = q)
			const n = ae.get(e),
				r = u.state.lights,
				a = u.state.shadowsArray,
				s = r.state.version,
				o = ue.getParameters(e, r.state, a, t, i),
				l = ue.getProgramCacheKey(o)
			let c = n.programs
			;(n.environment = e.isMeshStandardMaterial ? t.environment : null),
				(n.fog = t.fog),
				(n.envMap = (e.isMeshStandardMaterial ? le : oe).get(e.envMap || n.environment)),
				void 0 === c && (e.addEventListener('dispose', Fe), (c = new Map()), (n.programs = c))
			let h = c.get(l)
			if (void 0 !== h) {
				if (n.currentProgram === h && n.lightsStateVersion === s) return Ge(e, o), h
			} else (o.uniforms = ue.getUniforms(e)), e.onBuild(i, o, x), e.onBeforeCompile(o, x), (h = ue.acquireProgram(o, l)), c.set(l, h), (n.uniforms = o.uniforms)
			const d = n.uniforms
			;((e.isShaderMaterial || e.isRawShaderMaterial) && !0 !== e.clipping) || (d.clippingPlanes = ge.uniform),
				Ge(e, o),
				(n.needsLights = (function (e) {
					return (
						e.isMeshLambertMaterial ||
						e.isMeshToonMaterial ||
						e.isMeshPhongMaterial ||
						e.isMeshStandardMaterial ||
						e.isShadowMaterial ||
						(e.isShaderMaterial && !0 === e.lights)
					)
				})(e)),
				(n.lightsStateVersion = s),
				n.needsLights &&
					((d.ambientLightColor.value = r.state.ambient),
					(d.lightProbe.value = r.state.probe),
					(d.directionalLights.value = r.state.directional),
					(d.directionalLightShadows.value = r.state.directionalShadow),
					(d.spotLights.value = r.state.spot),
					(d.spotLightShadows.value = r.state.spotShadow),
					(d.rectAreaLights.value = r.state.rectArea),
					(d.ltc_1.value = r.state.rectAreaLTC1),
					(d.ltc_2.value = r.state.rectAreaLTC2),
					(d.pointLights.value = r.state.point),
					(d.pointLightShadows.value = r.state.pointShadow),
					(d.hemisphereLights.value = r.state.hemi),
					(d.directionalShadowMap.value = r.state.directionalShadowMap),
					(d.directionalShadowMatrix.value = r.state.directionalShadowMatrix),
					(d.spotShadowMap.value = r.state.spotShadowMap),
					(d.spotShadowMatrix.value = r.state.spotShadowMatrix),
					(d.pointShadowMap.value = r.state.pointShadowMap),
					(d.pointShadowMatrix.value = r.state.pointShadowMatrix))
			const p = h.getUniforms(),
				f = vr.seqWithValue(p.seq, d)
			return (n.currentProgram = h), (n.uniformsList = f), h
		}
		function Ge(e, t) {
			const i = ae.get(e)
			;(i.outputEncoding = t.outputEncoding),
				(i.instancing = t.instancing),
				(i.skinning = t.skinning),
				(i.morphTargets = t.morphTargets),
				(i.morphNormals = t.morphNormals),
				(i.morphTargetsCount = t.morphTargetsCount),
				(i.numClippingPlanes = t.numClippingPlanes),
				(i.numIntersection = t.numClipIntersection),
				(i.vertexAlphas = t.vertexAlphas),
				(i.vertexTangents = t.vertexTangents),
				(i.toneMapping = t.toneMapping)
		}
		Re.setAnimationLoop(function (e) {
			Ne && Ne(e)
		}),
			'undefined' != typeof window && Re.setContext(window),
			(this.setAnimationLoop = function (e) {
				;(Ne = e), Ee.setAnimationLoop(e), null === e ? Re.stop() : Re.start()
			}),
			Ee.addEventListener('sessionstart', De),
			Ee.addEventListener('sessionend', Ie),
			(this.render = function (e, t) {
				if (void 0 !== t && !0 !== t.isCamera) return void console.error('THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.')
				if (!0 === y) return
				!0 === e.autoUpdate && e.updateMatrixWorld(),
					null === t.parent && t.updateMatrixWorld(),
					!0 === Ee.enabled && !0 === Ee.isPresenting && (!0 === Ee.cameraAutoUpdate && Ee.updateCamera(t), (t = Ee.getCamera())),
					!0 === e.isScene && e.onBeforeRender(x, e, t, T),
					(u = me.get(e, m.length)),
					u.init(),
					m.push(u),
					j.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse),
					H.setFromProjectionMatrix(j),
					(W = this.localClippingEnabled),
					(V = ge.init(this.clippingPlanes, W, t)),
					(d = fe.get(e, p.length)),
					d.init(),
					p.push(d),
					Ue(e, t, 0, x.sortObjects),
					d.finish(),
					!0 === x.sortObjects && d.sort(U, z),
					!0 === V && ge.beginShadows()
				const i = u.state.shadowsArray
				if (
					(xe.render(i, e, t),
					!0 === V && ge.endShadows(),
					!0 === this.info.autoReset && this.info.reset(),
					_e.render(d, e),
					u.setupLights(x.physicallyCorrectLights),
					t.isArrayCamera)
				) {
					const i = t.cameras
					for (let t = 0, n = i.length; t < n; t++) {
						const n = i[t]
						ze(d, e, n, n.viewport)
					}
				} else ze(d, e, t)
				null !== T && (se.updateMultisampleRenderTarget(T), se.updateRenderTargetMipmap(T)),
					!0 === e.isScene && e.onAfterRender(x, e, t),
					ne.buffers.depth.setTest(!0),
					ne.buffers.depth.setMask(!0),
					ne.buffers.color.setMask(!0),
					ne.setPolygonOffset(!1),
					Se.resetDefaultState(),
					(E = -1),
					(L = null),
					m.pop(),
					(u = m.length > 0 ? m[m.length - 1] : null),
					p.pop(),
					(d = p.length > 0 ? p[p.length - 1] : null)
			}),
			(this.getActiveCubeFace = function () {
				return M
			}),
			(this.getActiveMipmapLevel = function () {
				return w
			}),
			(this.getRenderTarget = function () {
				return T
			}),
			(this.setRenderTargetTextures = function (e, t, i) {
				;(ae.get(e.texture).__webglTexture = t), (ae.get(e.depthTexture).__webglTexture = i)
				const n = ae.get(e)
				;(n.__hasExternalTextures = !0),
					n.__hasExternalTextures &&
						((n.__autoAllocateDepthBuffer = void 0 === i),
						n.__autoAllocateDepthBuffer ||
							(e.useRenderToTexture &&
								(console.warn('render-to-texture extension was disabled because an external texture was provided'),
								(e.useRenderToTexture = !1),
								(e.useRenderbuffer = !0))))
			}),
			(this.setRenderTargetFramebuffer = function (e, t) {
				const i = ae.get(e)
				;(i.__webglFramebuffer = t), (i.__useDefaultFramebuffer = void 0 === t)
			}),
			(this.setRenderTarget = function (e, t = 0, i = 0) {
				;(T = e), (M = t), (w = i)
				let n = !0
				if (e) {
					const t = ae.get(e)
					void 0 !== t.__useDefaultFramebuffer
						? (ne.bindFramebuffer(36160, null), (n = !1))
						: void 0 === t.__webglFramebuffer
						? se.setupRenderTarget(e)
						: t.__hasExternalTextures && se.rebindTextures(e, ae.get(e.texture).__webglTexture, ae.get(e.depthTexture).__webglTexture)
				}
				let r = null,
					a = !1,
					s = !1
				if (e) {
					const i = e.texture
					;(i.isDataTexture3D || i.isDataTexture2DArray) && (s = !0)
					const n = ae.get(e).__webglFramebuffer
					e.isWebGLCubeRenderTarget ? ((r = n[t]), (a = !0)) : (r = e.useRenderbuffer ? ae.get(e).__webglMultisampledFramebuffer : n),
						F.copy(e.viewport),
						C.copy(e.scissor),
						(N = e.scissorTest)
				} else F.copy(O).multiplyScalar(R).floor(), C.copy(B).multiplyScalar(R).floor(), (N = k)
				if (ne.bindFramebuffer(36160, r) && ie.drawBuffers && n) {
					let t = !1
					if (e)
						if (e.isWebGLMultipleRenderTargets) {
							const i = e.texture
							if (G.length !== i.length || 36064 !== G[0]) {
								for (let e = 0, t = i.length; e < t; e++) G[e] = 36064 + e
								;(G.length = i.length), (t = !0)
							}
						} else (1 === G.length && 36064 === G[0]) || ((G[0] = 36064), (G.length = 1), (t = !0))
					else (1 === G.length && 1029 === G[0]) || ((G[0] = 1029), (G.length = 1), (t = !0))
					t && (ie.isWebGL2 ? we.drawBuffers(G) : te.get('WEBGL_draw_buffers').drawBuffersWEBGL(G))
				}
				if ((ne.viewport(F), ne.scissor(C), ne.setScissorTest(N), a)) {
					const n = ae.get(e.texture)
					we.framebufferTexture2D(36160, 36064, 34069 + t, n.__webglTexture, i)
				} else if (s) {
					const n = ae.get(e.texture),
						r = t || 0
					we.framebufferTextureLayer(36160, 36064, n.__webglTexture, i || 0, r)
				}
				E = -1
			}),
			(this.readRenderTargetPixels = function (e, t, i, n, r, a, s) {
				if (!e || !e.isWebGLRenderTarget) return void console.error('THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.')
				let o = ae.get(e).__webglFramebuffer
				if ((e.isWebGLCubeRenderTarget && void 0 !== s && (o = o[s]), o)) {
					ne.bindFramebuffer(36160, o)
					try {
						const s = e.texture,
							o = s.format,
							l = s.type
						if (o !== A && be.convert(o) !== we.getParameter(35739))
							return void console.error('THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.')
						const c = l === S && (te.has('EXT_color_buffer_half_float') || (ie.isWebGL2 && te.has('EXT_color_buffer_float')))
						if (
							!(
								l === v ||
								be.convert(l) === we.getParameter(35738) ||
								(l === b && (ie.isWebGL2 || te.has('OES_texture_float') || te.has('WEBGL_color_buffer_float'))) ||
								c
							)
						)
							return void console.error('THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.')
						36053 === we.checkFramebufferStatus(36160)
							? t >= 0 && t <= e.width - n && i >= 0 && i <= e.height - r && we.readPixels(t, i, n, r, be.convert(o), be.convert(l), a)
							: console.error('THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.')
					} finally {
						const e = null !== T ? ae.get(T).__webglFramebuffer : null
						ne.bindFramebuffer(36160, e)
					}
				}
			}),
			(this.copyFramebufferToTexture = function (e, t, i = 0) {
				if (!0 !== t.isFramebufferTexture)
					return void console.error('THREE.WebGLRenderer: copyFramebufferToTexture() can only be used with FramebufferTexture.')
				const n = Math.pow(2, -i),
					r = Math.floor(t.image.width * n),
					a = Math.floor(t.image.height * n)
				se.setTexture2D(t, 0), we.copyTexSubImage2D(3553, i, 0, 0, e.x, e.y, r, a), ne.unbindTexture()
			}),
			(this.copyTextureToTexture = function (e, t, i, n = 0) {
				const r = t.image.width,
					a = t.image.height,
					s = be.convert(i.format),
					o = be.convert(i.type)
				se.setTexture2D(i, 0),
					we.pixelStorei(37440, i.flipY),
					we.pixelStorei(37441, i.premultiplyAlpha),
					we.pixelStorei(3317, i.unpackAlignment),
					t.isDataTexture
						? we.texSubImage2D(3553, n, e.x, e.y, r, a, s, o, t.image.data)
						: t.isCompressedTexture
						? we.compressedTexSubImage2D(3553, n, e.x, e.y, t.mipmaps[0].width, t.mipmaps[0].height, s, t.mipmaps[0].data)
						: we.texSubImage2D(3553, n, e.x, e.y, s, o, t.image),
					0 === n && i.generateMipmaps && we.generateMipmap(3553),
					ne.unbindTexture()
			}),
			(this.copyTextureToTexture3D = function (e, t, i, n, r = 0) {
				if (x.isWebGL1Renderer) return void console.warn('THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.')
				const a = e.max.x - e.min.x + 1,
					s = e.max.y - e.min.y + 1,
					o = e.max.z - e.min.z + 1,
					l = be.convert(n.format),
					c = be.convert(n.type)
				let h
				if (n.isDataTexture3D) se.setTexture3D(n, 0), (h = 32879)
				else {
					if (!n.isDataTexture2DArray)
						return void console.warn('THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.')
					se.setTexture2DArray(n, 0), (h = 35866)
				}
				we.pixelStorei(37440, n.flipY), we.pixelStorei(37441, n.premultiplyAlpha), we.pixelStorei(3317, n.unpackAlignment)
				const d = we.getParameter(3314),
					u = we.getParameter(32878),
					p = we.getParameter(3316),
					f = we.getParameter(3315),
					m = we.getParameter(32877),
					g = i.isCompressedTexture ? i.mipmaps[0] : i.image
				we.pixelStorei(3314, g.width),
					we.pixelStorei(32878, g.height),
					we.pixelStorei(3316, e.min.x),
					we.pixelStorei(3315, e.min.y),
					we.pixelStorei(32877, e.min.z),
					i.isDataTexture || i.isDataTexture3D
						? we.texSubImage3D(h, r, t.x, t.y, t.z, a, s, o, l, c, g.data)
						: i.isCompressedTexture
						? (console.warn('THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture.'),
						  we.compressedTexSubImage3D(h, r, t.x, t.y, t.z, a, s, o, l, g.data))
						: we.texSubImage3D(h, r, t.x, t.y, t.z, a, s, o, l, c, g),
					we.pixelStorei(3314, d),
					we.pixelStorei(32878, u),
					we.pixelStorei(3316, p),
					we.pixelStorei(3315, f),
					we.pixelStorei(32877, m),
					0 === r && n.generateMipmaps && we.generateMipmap(h),
					ne.unbindTexture()
			}),
			(this.initTexture = function (e) {
				se.setTexture2D(e, 0), ne.unbindTexture()
			}),
			(this.resetState = function () {
				;(M = 0), (w = 0), (T = null), ne.reset(), Se.reset()
			}),
			'undefined' != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe', { detail: this }))
	}
	fa.prototype.isWebGLRenderer = !0
	class ma extends it {
		constructor() {
			super(),
				(this.type = 'Scene'),
				(this.background = null),
				(this.environment = null),
				(this.fog = null),
				(this.overrideMaterial = null),
				(this.autoUpdate = !0),
				'undefined' != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe', { detail: this }))
		}
		copy(e, t) {
			return (
				super.copy(e, t),
				null !== e.background && (this.background = e.background.clone()),
				null !== e.environment && (this.environment = e.environment.clone()),
				null !== e.fog && (this.fog = e.fog.clone()),
				null !== e.overrideMaterial && (this.overrideMaterial = e.overrideMaterial.clone()),
				(this.autoUpdate = e.autoUpdate),
				(this.matrixAutoUpdate = e.matrixAutoUpdate),
				this
			)
		}
		toJSON(e) {
			const t = super.toJSON(e)
			return null !== this.fog && (t.object.fog = this.fog.toJSON()), t
		}
	}
	ma.prototype.isScene = !0
	class ga extends mt {
		constructor(e) {
			super(),
				(this.defines = { STANDARD: '' }),
				(this.type = 'MeshStandardMaterial'),
				(this.color = new bt(16777215)),
				(this.roughness = 1),
				(this.metalness = 0),
				(this.map = null),
				(this.lightMap = null),
				(this.lightMapIntensity = 1),
				(this.aoMap = null),
				(this.aoMapIntensity = 1),
				(this.emissive = new bt(0)),
				(this.emissiveIntensity = 1),
				(this.emissiveMap = null),
				(this.bumpMap = null),
				(this.bumpScale = 1),
				(this.normalMap = null),
				(this.normalMapType = 0),
				(this.normalScale = new H(1, 1)),
				(this.displacementMap = null),
				(this.displacementScale = 1),
				(this.displacementBias = 0),
				(this.roughnessMap = null),
				(this.metalnessMap = null),
				(this.alphaMap = null),
				(this.envMap = null),
				(this.envMapIntensity = 1),
				(this.refractionRatio = 0.98),
				(this.wireframe = !1),
				(this.wireframeLinewidth = 1),
				(this.wireframeLinecap = 'round'),
				(this.wireframeLinejoin = 'round'),
				(this.flatShading = !1),
				this.setValues(e)
		}
		copy(e) {
			return (
				super.copy(e),
				(this.defines = { STANDARD: '' }),
				this.color.copy(e.color),
				(this.roughness = e.roughness),
				(this.metalness = e.metalness),
				(this.map = e.map),
				(this.lightMap = e.lightMap),
				(this.lightMapIntensity = e.lightMapIntensity),
				(this.aoMap = e.aoMap),
				(this.aoMapIntensity = e.aoMapIntensity),
				this.emissive.copy(e.emissive),
				(this.emissiveMap = e.emissiveMap),
				(this.emissiveIntensity = e.emissiveIntensity),
				(this.bumpMap = e.bumpMap),
				(this.bumpScale = e.bumpScale),
				(this.normalMap = e.normalMap),
				(this.normalMapType = e.normalMapType),
				this.normalScale.copy(e.normalScale),
				(this.displacementMap = e.displacementMap),
				(this.displacementScale = e.displacementScale),
				(this.displacementBias = e.displacementBias),
				(this.roughnessMap = e.roughnessMap),
				(this.metalnessMap = e.metalnessMap),
				(this.alphaMap = e.alphaMap),
				(this.envMap = e.envMap),
				(this.envMapIntensity = e.envMapIntensity),
				(this.refractionRatio = e.refractionRatio),
				(this.wireframe = e.wireframe),
				(this.wireframeLinewidth = e.wireframeLinewidth),
				(this.wireframeLinecap = e.wireframeLinecap),
				(this.wireframeLinejoin = e.wireframeLinejoin),
				(this.flatShading = e.flatShading),
				this
			)
		}
	}
	ga.prototype.isMeshStandardMaterial = !0
	class xa extends it {
		constructor(e, t = 1) {
			super(), (this.type = 'Light'), (this.color = new bt(e)), (this.intensity = t)
		}
		dispose() {}
		copy(e) {
			return super.copy(e), this.color.copy(e.color), (this.intensity = e.intensity), this
		}
		toJSON(e) {
			const t = super.toJSON(e)
			return (
				(t.object.color = this.color.getHex()),
				(t.object.intensity = this.intensity),
				void 0 !== this.groundColor && (t.object.groundColor = this.groundColor.getHex()),
				void 0 !== this.distance && (t.object.distance = this.distance),
				void 0 !== this.angle && (t.object.angle = this.angle),
				void 0 !== this.decay && (t.object.decay = this.decay),
				void 0 !== this.penumbra && (t.object.penumbra = this.penumbra),
				void 0 !== this.shadow && (t.object.shadow = this.shadow.toJSON()),
				t
			)
		}
	}
	xa.prototype.isLight = !0
	const _a = new Ce(),
		va = new ee(),
		ya = new ee()
	const Ma = new Ce(),
		ba = new ee(),
		Sa = new ee()
	class wa extends class {
		constructor(e) {
			;(this.camera = e),
				(this.bias = 0),
				(this.normalBias = 0),
				(this.radius = 1),
				(this.blurSamples = 8),
				(this.mapSize = new H(512, 512)),
				(this.map = null),
				(this.mapPass = null),
				(this.matrix = new Ce()),
				(this.autoUpdate = !0),
				(this.needsUpdate = !1),
				(this._frustum = new yi()),
				(this._frameExtents = new H(1, 1)),
				(this._viewportCount = 1),
				(this._viewports = [new Z(0, 0, 1, 1)])
		}
		getViewportCount() {
			return this._viewportCount
		}
		getFrustum() {
			return this._frustum
		}
		updateMatrices(e) {
			const t = this.camera,
				i = this.matrix
			va.setFromMatrixPosition(e.matrixWorld),
				t.position.copy(va),
				ya.setFromMatrixPosition(e.target.matrixWorld),
				t.lookAt(ya),
				t.updateMatrixWorld(),
				_a.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse),
				this._frustum.setFromProjectionMatrix(_a),
				i.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1),
				i.multiply(t.projectionMatrix),
				i.multiply(t.matrixWorldInverse)
		}
		getViewport(e) {
			return this._viewports[e]
		}
		getFrameExtents() {
			return this._frameExtents
		}
		dispose() {
			this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose()
		}
		copy(e) {
			return (this.camera = e.camera.clone()), (this.bias = e.bias), (this.radius = e.radius), this.mapSize.copy(e.mapSize), this
		}
		clone() {
			return new this.constructor().copy(this)
		}
		toJSON() {
			const e = {}
			return (
				0 !== this.bias && (e.bias = this.bias),
				0 !== this.normalBias && (e.normalBias = this.normalBias),
				1 !== this.radius && (e.radius = this.radius),
				(512 === this.mapSize.x && 512 === this.mapSize.y) || (e.mapSize = this.mapSize.toArray()),
				(e.camera = this.camera.toJSON(!1).object),
				delete e.camera.matrix,
				e
			)
		}
	} {
		constructor() {
			super(new ci(90, 1, 0.5, 500)),
				(this._frameExtents = new H(4, 2)),
				(this._viewportCount = 6),
				(this._viewports = [new Z(2, 1, 1, 1), new Z(0, 1, 1, 1), new Z(3, 1, 1, 1), new Z(1, 1, 1, 1), new Z(3, 0, 1, 1), new Z(1, 0, 1, 1)]),
				(this._cubeDirections = [new ee(1, 0, 0), new ee(-1, 0, 0), new ee(0, 0, 1), new ee(0, 0, -1), new ee(0, 1, 0), new ee(0, -1, 0)]),
				(this._cubeUps = [new ee(0, 1, 0), new ee(0, 1, 0), new ee(0, 1, 0), new ee(0, 1, 0), new ee(0, 0, 1), new ee(0, 0, -1)])
		}
		updateMatrices(e, t = 0) {
			const i = this.camera,
				n = this.matrix,
				r = e.distance || i.far
			r !== i.far && ((i.far = r), i.updateProjectionMatrix()),
				ba.setFromMatrixPosition(e.matrixWorld),
				i.position.copy(ba),
				Sa.copy(i.position),
				Sa.add(this._cubeDirections[t]),
				i.up.copy(this._cubeUps[t]),
				i.lookAt(Sa),
				i.updateMatrixWorld(),
				n.makeTranslation(-ba.x, -ba.y, -ba.z),
				Ma.multiplyMatrices(i.projectionMatrix, i.matrixWorldInverse),
				this._frustum.setFromProjectionMatrix(Ma)
		}
	}
	wa.prototype.isPointLightShadow = !0
	class Ta extends xa {
		constructor(e, t, i = 0, n = 1) {
			super(e, t), (this.type = 'PointLight'), (this.distance = i), (this.decay = n), (this.shadow = new wa())
		}
		get power() {
			return 4 * this.intensity * Math.PI
		}
		set power(e) {
			this.intensity = e / (4 * Math.PI)
		}
		dispose() {
			this.shadow.dispose()
		}
		copy(e) {
			return super.copy(e), (this.distance = e.distance), (this.decay = e.decay), (this.shadow = e.shadow.clone()), this
		}
	}
	Ta.prototype.isPointLight = !0
	class Aa extends xa {
		constructor(e, t) {
			super(e, t), (this.type = 'AmbientLight')
		}
	}
	Aa.prototype.isAmbientLight = !0
	class Ea {
		constructor(e = !0) {
			;(this.autoStart = e), (this.startTime = 0), (this.oldTime = 0), (this.elapsedTime = 0), (this.running = !1)
		}
		start() {
			;(this.startTime = La()), (this.oldTime = this.startTime), (this.elapsedTime = 0), (this.running = !0)
		}
		stop() {
			this.getElapsedTime(), (this.running = !1), (this.autoStart = !1)
		}
		getElapsedTime() {
			return this.getDelta(), this.elapsedTime
		}
		getDelta() {
			let e = 0
			if (this.autoStart && !this.running) return this.start(), 0
			if (this.running) {
				const t = La()
				;(e = (t - this.oldTime) / 1e3), (this.oldTime = t), (this.elapsedTime += e)
			}
			return e
		}
	}
	function La() {
		return ('undefined' == typeof performance ? Date : performance).now()
	}
	class Pa {
		constructor(e = 1, t = 0, i = 0) {
			return (this.radius = e), (this.phi = t), (this.theta = i), this
		}
		set(e, t, i) {
			return (this.radius = e), (this.phi = t), (this.theta = i), this
		}
		copy(e) {
			return (this.radius = e.radius), (this.phi = e.phi), (this.theta = e.theta), this
		}
		makeSafe() {
			const e = 1e-6
			return (this.phi = Math.max(e, Math.min(Math.PI - e, this.phi))), this
		}
		setFromVector3(e) {
			return this.setFromCartesianCoords(e.x, e.y, e.z)
		}
		setFromCartesianCoords(e, t, i) {
			return (
				(this.radius = Math.sqrt(e * e + t * t + i * i)),
				0 === this.radius ? ((this.theta = 0), (this.phi = 0)) : ((this.theta = Math.atan2(e, i)), (this.phi = Math.acos(O(t / this.radius, -1, 1)))),
				this
			)
		}
		clone() {
			return new this.constructor().copy(this)
		}
	}
	function Fa(e, t, i, n, r, a, s, o) {
		const l = (e, t, i, n) => [new H(e / s, 1 - n / o), new H(i / s, 1 - n / o), new H(i / s, 1 - t / o), new H(e / s, 1 - t / o)],
			c = l(t + a, i, t + n + a, i + a),
			h = l(t + n + a, i, t + 2 * n + a, i + a),
			d = l(t, i + a, t + a, i + a + r),
			u = l(t + a, i + a, t + n + a, i + a + r),
			p = l(t + n + a, i + a, t + n + 2 * a, i + r + a),
			f = l(t + n + 2 * a, i + a, t + 2 * n + 2 * a, i + r + a),
			m = e.attributes.uv
		m.copyVector2sArray([
			p[3],
			p[2],
			p[0],
			p[1],
			d[3],
			d[2],
			d[0],
			d[1],
			c[3],
			c[2],
			c[0],
			c[1],
			h[0],
			h[1],
			h[3],
			h[2],
			u[3],
			u[2],
			u[0],
			u[1],
			f[3],
			f[2],
			f[0],
			f[1],
		]),
			(m.needsUpdate = !0)
	}
	function Ca(e, t, i, n, r, a) {
		Fa(e, t, i, n, r, a, 64, 64)
	}
	function Na(e, t, i, n, r, a) {
		Fa(e, t, i, n, r, a, 64, 32)
	}
	class Da extends la {
		constructor(e, t) {
			super(), (this.innerLayer = e), (this.outerLayer = t), (e.name = 'inner'), (t.name = 'outer')
		}
	}
	class Ia extends la {
		constructor(e) {
			super(), (this.modelListeners = []), (this.slim = !1)
			const t = new ga({ map: e, side: 0 }),
				i = new ga({ map: e, side: 2, transparent: !0, alphaTest: 1e-5 }),
				n = t.clone()
			;(n.polygonOffset = !0), (n.polygonOffsetFactor = 1), (n.polygonOffsetUnits = 1)
			const r = i.clone()
			;(r.polygonOffset = !0), (r.polygonOffsetFactor = 1), (r.polygonOffsetUnits = 1)
			const a = new ni(8, 8, 8)
			Ca(a, 0, 0, 8, 8, 8)
			const s = new ti(a, t),
				o = new ni(9, 9, 9)
			Ca(o, 32, 0, 8, 8, 8)
			const l = new ti(o, i)
			;(this.head = new Da(s, l)), (this.head.name = 'head'), this.head.add(s, l), (s.position.y = 4), (l.position.y = 4), this.add(this.head)
			const c = new ni(8, 12, 4)
			Ca(c, 16, 16, 8, 12, 4)
			const h = new ti(c, t),
				d = new ni(8.5, 12.5, 4.5)
			Ca(d, 16, 32, 8, 12, 4)
			const u = new ti(d, i)
			;(this.body = new Da(h, u)), (this.body.name = 'body'), this.body.add(h, u), (this.body.position.y = -6), this.add(this.body)
			const p = new ni(),
				f = new ti(p, n)
			this.modelListeners.push(() => {
				;(f.scale.x = this.slim ? 3 : 4), (f.scale.y = 12), (f.scale.z = 4), Ca(p, 40, 16, this.slim ? 3 : 4, 12, 4)
			})
			const m = new ni(),
				g = new ti(m, r)
			this.modelListeners.push(() => {
				;(g.scale.x = this.slim ? 3.5 : 4.5), (g.scale.y = 12.5), (g.scale.z = 4.5), Ca(m, 40, 32, this.slim ? 3 : 4, 12, 4)
			})
			const x = new la()
			x.add(f, g),
				this.modelListeners.push(() => {
					x.position.x = this.slim ? -0.5 : -1
				}),
				(x.position.y = -4),
				(this.rightArm = new Da(f, g)),
				(this.rightArm.name = 'rightArm'),
				this.rightArm.add(x),
				(this.rightArm.position.x = -5),
				(this.rightArm.position.y = -2),
				this.add(this.rightArm)
			const _ = new ni(),
				v = new ti(_, n)
			this.modelListeners.push(() => {
				;(v.scale.x = this.slim ? 3 : 4), (v.scale.y = 12), (v.scale.z = 4), Ca(_, 32, 48, this.slim ? 3 : 4, 12, 4)
			})
			const y = new ni(),
				M = new ti(y, r)
			this.modelListeners.push(() => {
				;(M.scale.x = this.slim ? 3.5 : 4.5), (M.scale.y = 12.5), (M.scale.z = 4.5), Ca(y, 48, 48, this.slim ? 3 : 4, 12, 4)
			})
			const b = new la()
			b.add(v, M),
				this.modelListeners.push(() => {
					b.position.x = this.slim ? 0.5 : 1
				}),
				(b.position.y = -4),
				(this.leftArm = new Da(v, M)),
				(this.leftArm.name = 'leftArm'),
				this.leftArm.add(b),
				(this.leftArm.position.x = 5),
				(this.leftArm.position.y = -2),
				this.add(this.leftArm)
			const S = new ni(4, 12, 4)
			Ca(S, 0, 16, 4, 12, 4)
			const w = new ti(S, n),
				T = new ni(4.5, 12.5, 4.5)
			Ca(T, 0, 32, 4, 12, 4)
			const A = new ti(T, r),
				E = new la()
			E.add(w, A),
				(E.position.y = -6),
				(this.rightLeg = new Da(w, A)),
				(this.rightLeg.name = 'rightLeg'),
				this.rightLeg.add(E),
				(this.rightLeg.position.x = -1.9),
				(this.rightLeg.position.y = -12),
				(this.rightLeg.position.z = -0.1),
				this.add(this.rightLeg)
			const L = new ni(4, 12, 4)
			Ca(L, 16, 48, 4, 12, 4)
			const P = new ti(L, n),
				F = new ni(4.5, 12.5, 4.5)
			Ca(F, 0, 48, 4, 12, 4)
			const C = new ti(F, r),
				N = new la()
			N.add(P, C),
				(N.position.y = -6),
				(this.leftLeg = new Da(P, C)),
				(this.leftLeg.name = 'leftLeg'),
				this.leftLeg.add(N),
				(this.leftLeg.position.x = 1.9),
				(this.leftLeg.position.y = -12),
				(this.leftLeg.position.z = -0.1),
				this.add(this.leftLeg),
				(this.modelType = 'default')
		}
		get modelType() {
			return this.slim ? 'slim' : 'default'
		}
		set modelType(e) {
			;(this.slim = 'slim' === e), this.modelListeners.forEach(e => e())
		}
		getBodyParts() {
			return this.children.filter(e => e instanceof Da)
		}
		setInnerLayerVisible(e) {
			this.getBodyParts().forEach(t => (t.innerLayer.visible = e))
		}
		setOuterLayerVisible(e) {
			this.getBodyParts().forEach(t => (t.outerLayer.visible = e))
		}
	}
	class Ra extends la {
		constructor(e) {
			super()
			const t = new ga({ map: e, side: 2, transparent: !0, alphaTest: 1e-5 }),
				i = new ni(10, 16, 1)
			Na(i, 0, 0, 10, 16, 1), (this.cape = new ti(i, t)), (this.cape.position.y = -8), (this.cape.position.z = 0.5), this.add(this.cape)
		}
	}
	class Ua extends la {
		constructor(e) {
			super()
			const t = new ga({ map: e, side: 2, transparent: !0, alphaTest: 1e-5 }),
				i = new ni(12, 22, 4)
			Na(i, 22, 0, 10, 20, 2)
			const n = new ti(i, t)
			;(n.position.x = -5), (n.position.y = -10), (n.position.z = -1), (this.leftWing = new la()), this.leftWing.add(n), this.add(this.leftWing)
			const r = new ni(12, 22, 4)
			Na(r, 22, 0, 10, 20, 2)
			const a = new ti(r, t)
			;(a.scale.x = -1),
				(a.position.x = 5),
				(a.position.y = -10),
				(a.position.z = -1),
				(this.rightWing = new la()),
				this.rightWing.add(a),
				this.add(this.rightWing),
				(this.leftWing.position.x = 5),
				(this.leftWing.rotation.x = 0.2617994),
				(this.leftWing.rotation.y = 0.01),
				(this.leftWing.rotation.z = 0.2617994),
				this.updateRightWing()
		}
		updateRightWing() {
			;(this.rightWing.position.x = -this.leftWing.position.x),
				(this.rightWing.position.y = this.leftWing.position.y),
				(this.rightWing.rotation.x = this.leftWing.rotation.x),
				(this.rightWing.rotation.y = -this.leftWing.rotation.y),
				(this.rightWing.rotation.z = -this.leftWing.rotation.z)
		}
	}
	class za extends la {
		constructor(e) {
			super()
			const t = new ga({ map: e, side: 0 }),
				i = new ni(8, 8, 4 / 3)
			Fa(i, 0, 0, 6, 6, 1, 14, 7),
				(this.rightEar = new ti(i, t)),
				(this.rightEar.name = 'rightEar'),
				(this.rightEar.position.x = -6),
				this.add(this.rightEar),
				(this.leftEar = new ti(i, t)),
				(this.leftEar.name = 'leftEar'),
				(this.leftEar.position.x = 6),
				this.add(this.leftEar)
		}
	}
	class Oa extends la {
		constructor(e, t, i) {
			super(),
				(this.skin = new Ia(e)),
				(this.skin.name = 'skin'),
				(this.skin.position.y = 8),
				this.add(this.skin),
				(this.cape = new Ra(t)),
				(this.cape.name = 'cape'),
				(this.cape.position.y = 8),
				(this.cape.position.z = -2),
				(this.cape.rotation.x = (10.8 * Math.PI) / 180),
				(this.cape.rotation.y = Math.PI),
				this.add(this.cape),
				(this.elytra = new Ua(t)),
				(this.elytra.name = 'elytra'),
				(this.elytra.position.y = 8),
				(this.elytra.position.z = -2),
				(this.elytra.visible = !1),
				this.add(this.elytra),
				(this.ears = new za(i)),
				(this.ears.name = 'ears'),
				(this.ears.position.y = 10),
				(this.ears.position.z = 2 / 3),
				(this.ears.visible = !1),
				this.skin.head.add(this.ears)
		}
		get backEquipment() {
			return this.cape.visible ? 'cape' : this.elytra.visible ? 'elytra' : null
		}
		set backEquipment(e) {
			;(this.cape.visible = 'cape' === e), (this.elytra.visible = 'elytra' === e)
		}
	}
	function Ba(e) {
		return (
			e instanceof HTMLImageElement ||
			e instanceof HTMLVideoElement ||
			e instanceof HTMLCanvasElement ||
			('undefined' != typeof ImageBitmap && e instanceof ImageBitmap) ||
			('undefined' != typeof OffscreenCanvas && e instanceof OffscreenCanvas)
		)
	}
	function ka(e, t, i, n, r) {
		const a = e.getImageData(t, i, n, r)
		for (let e = 0; e < n; e++)
			for (let t = 0; t < r; t++) {
				const i = 4 * (e + t * n)
				if (255 !== a.data[i + 3]) return !0
			}
		return !1
	}
	function Ga(e) {
		return e / 64
	}
	function Ha(e, t, i) {
		if (i) {
			if (ka(e, 0, 0, t, t)) return
		} else if (ka(e, 0, 0, t, t / 2)) return
		const n = Ga(t),
			r = (t, i, r, a) => e.clearRect(t * n, i * n, r * n, a * n)
		r(40, 0, 8, 8),
			r(48, 0, 8, 8),
			r(32, 8, 8, 8),
			r(40, 8, 8, 8),
			r(48, 8, 8, 8),
			r(56, 8, 8, 8),
			i &&
				(r(4, 32, 4, 4),
				r(8, 32, 4, 4),
				r(0, 36, 4, 12),
				r(4, 36, 4, 12),
				r(8, 36, 4, 12),
				r(12, 36, 4, 12),
				r(20, 32, 8, 4),
				r(28, 32, 8, 4),
				r(16, 36, 4, 12),
				r(20, 36, 8, 12),
				r(28, 36, 4, 12),
				r(32, 36, 8, 12),
				r(44, 32, 4, 4),
				r(48, 32, 4, 4),
				r(40, 36, 4, 12),
				r(44, 36, 4, 12),
				r(48, 36, 4, 12),
				r(52, 36, 12, 12),
				r(4, 48, 4, 4),
				r(8, 48, 4, 4),
				r(0, 52, 4, 12),
				r(4, 52, 4, 12),
				r(8, 52, 4, 12),
				r(12, 52, 4, 12),
				r(52, 48, 4, 4),
				r(56, 48, 4, 4),
				r(48, 52, 4, 12),
				r(52, 52, 4, 12),
				r(56, 52, 4, 12),
				r(60, 52, 4, 12))
	}
	function Va(e, t) {
		let i = !1
		if (t.width !== t.height) {
			if (t.width !== 2 * t.height) throw new Error(`Bad skin size: ${t.width}x${t.height}`)
			i = !0
		}
		const n = e.getContext('2d')
		if (i) {
			const i = t.width
			;(e.width = i),
				(e.height = i),
				n.clearRect(0, 0, i, i),
				n.drawImage(t, 0, 0, i, i / 2),
				(function (e, t) {
					const i = Ga(t),
						n = (t, n, r, a, s, o, l) =>
							(function (e, t, i, n, r, a, s, o) {
								const l = e.getImageData(t, i, n, r)
								if (o)
									for (let e = 0; e < r; e++)
										for (let t = 0; t < n / 2; t++) {
											const i = 4 * (t + e * n),
												r = 4 * (n - t - 1 + e * n),
												a = l.data[i],
												s = l.data[i + 1],
												o = l.data[i + 2],
												c = l.data[i + 3],
												h = l.data[r],
												d = l.data[r + 1],
												u = l.data[r + 2],
												p = l.data[r + 3]
											;(l.data[i] = h),
												(l.data[i + 1] = d),
												(l.data[i + 2] = u),
												(l.data[i + 3] = p),
												(l.data[r] = a),
												(l.data[r + 1] = s),
												(l.data[r + 2] = o),
												(l.data[r + 3] = c)
										}
								e.putImageData(l, a, s)
							})(e, t * i, n * i, r * i, a * i, s * i, o * i, l)
					n(4, 16, 4, 4, 20, 48, !0),
						n(8, 16, 4, 4, 24, 48, !0),
						n(0, 20, 4, 12, 24, 52, !0),
						n(4, 20, 4, 12, 20, 52, !0),
						n(8, 20, 4, 12, 16, 52, !0),
						n(12, 20, 4, 12, 28, 52, !0),
						n(44, 16, 4, 4, 36, 48, !0),
						n(48, 16, 4, 4, 40, 48, !0),
						n(40, 20, 4, 12, 40, 52, !0),
						n(44, 20, 4, 12, 36, 52, !0),
						n(48, 20, 4, 12, 32, 52, !0),
						n(52, 20, 4, 12, 44, 52, !0)
				})(n, i),
				Ha(n, e.width, !1)
		} else (e.width = t.width), (e.height = t.height), n.clearRect(0, 0, t.width, t.height), n.drawImage(t, 0, 0, e.width, e.height), Ha(n, e.width, !0)
	}
	function Wa(e, t) {
		const i = (function (e) {
			if (e.width === 2 * e.height) return e.width / 64
			if (17 * e.width == 22 * e.height) return e.width / 22
			if (11 * e.width == 23 * e.height) return e.width / 46
			throw new Error(`Bad cape size: ${e.width}x${e.height}`)
		})(t)
		;(e.width = 64 * i), (e.height = 32 * i)
		const n = e.getContext('2d')
		n.clearRect(0, 0, e.width, e.height), n.drawImage(t, 0, 0, t.width, t.height)
	}
	function Xa(e, t) {
		const i = (function (e) {
			if (e.width === 2 * e.height && e.height % 7 == 0) return e.height / 7
			throw new Error(`Bad ears size: ${e.width}x${e.height}`)
		})(t)
		;(e.width = 14 * i), (e.height = 7 * i)
		const n = e.getContext('2d')
		n.clearRect(0, 0, e.width, e.height), n.drawImage(t, 0, 0, t.width, t.height)
	}
	function Ya(e, t) {
		if (t.width !== t.height && t.width !== 2 * t.height) throw new Error(`Bad skin size: ${t.width}x${t.height}`)
		const i = Ga(t.width),
			n = 14 * i,
			r = 7 * i
		;(e.width = n), (e.height = r)
		const a = e.getContext('2d')
		a.clearRect(0, 0, n, r), a.drawImage(t, 24 * i, 0, n, r, 0, 0, n, r)
	}
	async function ja(e) {
		const t = document.createElement('img')
		return new Promise((i, n) => {
			;(t.onload = () => i(t)),
				(t.onerror = n),
				(t.crossOrigin = 'anonymous'),
				'string' == typeof e
					? (t.src = e)
					: (void 0 !== e.crossOrigin && (t.crossOrigin = e.crossOrigin), void 0 !== e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy), (t.src = e.src))
		})
	}
	function Qa(e, t, i) {
		e instanceof Function ? e(t, i) : e.play(t, i)
	}
	class qa {
		constructor(e) {
			;(this.speed = 1), (this.paused = !1), (this.progress = 0), (this.lastTime = 0), (this.started = !1), (this.toResetAndRemove = !1), (this.animation = e)
		}
		play(e, t) {
			if (this.toResetAndRemove) return Qa(this.animation, e, 0), void this.remove()
			let i
			this.started ? (i = t - this.lastTime) : ((i = 0), (this.started = !0)),
				(this.lastTime = t),
				this.paused || (this.progress += i * this.speed),
				Qa(this.animation, e, this.progress)
		}
		reset() {
			this.progress = 0
		}
		remove() {}
		resetAndRemove() {
			this.toResetAndRemove = !0
		}
	}
	class Za {
		constructor() {
			this.handles = new Set()
		}
		add(e) {
			const t = new qa(e)
			return (
				(t.remove = () => {
					this.handles.delete(t)
				}),
				this.handles.add(t),
				t
			)
		}
		play(e, t) {
			this.handles.forEach(i => i.play(e, t))
		}
	}
	class Ja extends Za {
		constructor() {
			super(...arguments), (this.speed = 1), (this.progress = 0), (this.clock = new Ea(!0))
		}
		get animation() {
			return this
		}
		get paused() {
			return !this.clock.running
		}
		set paused(e) {
			e ? this.clock.stop() : this.clock.start()
		}
		runAnimationLoop(e) {
			0 !== this.handles.size && ((this.progress += this.clock.getDelta() * this.speed), this.play(e, this.progress))
		}
		reset() {
			this.progress = 0
		}
	}
	class Ka {
		constructor(e = {}) {
			;(this.animations = new Ja()),
				(this.globalLight = new Aa(16777215, 0.4)),
				(this.cameraLight = new Ta(16777215, 0.6)),
				(this.backgroundTexture = null),
				(this._disposed = !1),
				(this._renderPaused = !1),
				(this.canvas = void 0 === e.canvas ? document.createElement('canvas') : e.canvas),
				(this.skinCanvas = document.createElement('canvas')),
				(this.skinTexture = new Q(this.skinCanvas)),
				(this.skinTexture.magFilter = g),
				(this.skinTexture.minFilter = g),
				(this.capeCanvas = document.createElement('canvas')),
				(this.capeTexture = new Q(this.capeCanvas)),
				(this.capeTexture.magFilter = g),
				(this.capeTexture.minFilter = g),
				(this.earsCanvas = document.createElement('canvas')),
				(this.earsTexture = new Q(this.earsCanvas)),
				(this.earsTexture.magFilter = g),
				(this.earsTexture.minFilter = g),
				(this.scene = new ma()),
				(this.camera = new ci()),
				this.camera.add(this.cameraLight),
				this.scene.add(this.camera),
				this.scene.add(this.globalLight),
				(this.renderer = new fa({ canvas: this.canvas, alpha: !1 !== e.alpha, preserveDrawingBuffer: !0 === e.preserveDrawingBuffer })),
				this.renderer.setPixelRatio(window.devicePixelRatio),
				(this.playerObject = new Oa(this.skinTexture, this.capeTexture, this.earsTexture)),
				(this.playerObject.name = 'player'),
				(this.playerObject.skin.visible = !1),
				(this.playerObject.cape.visible = !1),
				(this.playerWrapper = new la()),
				this.playerWrapper.add(this.playerObject),
				this.scene.add(this.playerWrapper),
				void 0 !== e.skin && this.loadSkin(e.skin, { model: e.model, ears: 'current-skin' === e.ears }),
				void 0 !== e.cape && this.loadCape(e.cape),
				void 0 !== e.ears && 'current-skin' !== e.ears && this.loadEars(e.ears.source, { textureType: e.ears.textureType }),
				void 0 !== e.width && (this.width = e.width),
				void 0 !== e.height && (this.height = e.height),
				void 0 !== e.background && (this.background = e.background),
				void 0 !== e.panorama && this.loadPanorama(e.panorama),
				(this.camera.position.z = 1),
				(this._zoom = void 0 === e.zoom ? 0.9 : e.zoom),
				(this.fov = void 0 === e.fov ? 50 : e.fov),
				!0 === e.renderPaused ? ((this._renderPaused = !0), (this.animationID = null)) : (this.animationID = window.requestAnimationFrame(() => this.draw())),
				(this.onContextLost = e => {
					e.preventDefault(), null !== this.animationID && (window.cancelAnimationFrame(this.animationID), (this.animationID = null))
				}),
				(this.onContextRestored = () => {
					this._renderPaused || this._disposed || null !== this.animationID || (this.animationID = window.requestAnimationFrame(() => this.draw()))
				}),
				this.canvas.addEventListener('webglcontextlost', this.onContextLost, !1),
				this.canvas.addEventListener('webglcontextrestored', this.onContextRestored, !1)
		}
		loadSkin(e, t = {}) {
			if (null === e) this.resetSkin()
			else {
				if (!Ba(e)) return ja(e).then(e => this.loadSkin(e, t))
				Va(this.skinCanvas, e),
					(this.skinTexture.needsUpdate = !0),
					void 0 === t.model || 'auto-detect' === t.model
						? (this.playerObject.skin.modelType = (function (e) {
								const t = Ga(e.width),
									i = e.getContext('2d'),
									n = (e, n, r, a) => ka(i, e * t, n * t, r * t, a * t),
									r = (e, n, r, a) =>
										(function (e, t, i, n, r) {
											const a = e.getImageData(t, i, n, r)
											for (let e = 0; e < n; e++)
												for (let t = 0; t < r; t++) {
													const i = 4 * (e + t * n)
													if (0 !== a.data[i + 0] || 0 !== a.data[i + 1] || 0 !== a.data[i + 2] || 255 !== a.data[i + 3]) return !1
												}
											return !0
										})(i, e * t, n * t, r * t, a * t),
									a = (e, n, r, a) =>
										(function (e, t, i, n, r) {
											const a = e.getImageData(t, i, n, r)
											for (let e = 0; e < n; e++)
												for (let t = 0; t < r; t++) {
													const i = 4 * (e + t * n)
													if (255 !== a.data[i + 0] || 255 !== a.data[i + 1] || 255 !== a.data[i + 2] || 255 !== a.data[i + 3]) return !1
												}
											return !0
										})(i, e * t, n * t, r * t, a * t)
								return n(50, 16, 2, 4) ||
									n(54, 20, 2, 12) ||
									n(42, 48, 2, 4) ||
									n(46, 52, 2, 12) ||
									(r(50, 16, 2, 4) && r(54, 20, 2, 12) && r(42, 48, 2, 4) && r(46, 52, 2, 12)) ||
									(a(50, 16, 2, 4) && a(54, 20, 2, 12) && a(42, 48, 2, 4) && a(46, 52, 2, 12))
									? 'slim'
									: 'default'
						  })(this.skinCanvas))
						: (this.playerObject.skin.modelType = t.model),
					!1 !== t.makeVisible && (this.playerObject.skin.visible = !0),
					(!0 !== t.ears && 'load-only' != t.ears) ||
						(Ya(this.earsCanvas, e), (this.earsTexture.needsUpdate = !0), !0 === t.ears && (this.playerObject.ears.visible = !0))
			}
		}
		resetSkin() {
			this.playerObject.skin.visible = !1
		}
		loadCape(e, t = {}) {
			if (null === e) this.resetCape()
			else {
				if (!Ba(e)) return ja(e).then(e => this.loadCape(e, t))
				Wa(this.capeCanvas, e),
					(this.capeTexture.needsUpdate = !0),
					!1 !== t.makeVisible && (this.playerObject.backEquipment = void 0 === t.backEquipment ? 'cape' : t.backEquipment)
			}
		}
		resetCape() {
			this.playerObject.backEquipment = null
		}
		loadEars(e, t = {}) {
			if (null === e) this.resetEars()
			else {
				if (!Ba(e)) return ja(e).then(e => this.loadEars(e, t))
				'skin' === t.textureType ? Ya(this.earsCanvas, e) : Xa(this.earsCanvas, e),
					(this.earsTexture.needsUpdate = !0),
					!1 !== t.makeVisible && (this.playerObject.ears.visible = !0)
			}
		}
		resetEars() {
			this.playerObject.ears.visible = !1
		}
		loadPanorama(e) {
			return this.loadBackground(e, d)
		}
		loadBackground(e, t) {
			if (!Ba(e)) return ja(e).then(e => this.loadBackground(e, t))
			null !== this.backgroundTexture && this.backgroundTexture.dispose(),
				(this.backgroundTexture = new Q()),
				(this.backgroundTexture.image = e),
				void 0 !== t && (this.backgroundTexture.mapping = t),
				(this.backgroundTexture.needsUpdate = !0),
				(this.scene.background = this.backgroundTexture)
		}
		draw() {
			this.animations.runAnimationLoop(this.playerObject), this.render(), (this.animationID = window.requestAnimationFrame(() => this.draw()))
		}
		render() {
			this.renderer.render(this.scene, this.camera)
		}
		setSize(e, t) {
			;(this.camera.aspect = e / t), this.camera.updateProjectionMatrix(), this.renderer.setSize(e, t)
		}
		dispose() {
			;(this._disposed = !0),
				this.canvas.removeEventListener('webglcontextlost', this.onContextLost, !1),
				this.canvas.removeEventListener('webglcontextrestored', this.onContextRestored, !1),
				null !== this.animationID && (window.cancelAnimationFrame(this.animationID), (this.animationID = null)),
				this.renderer.dispose(),
				this.skinTexture.dispose(),
				this.capeTexture.dispose(),
				null !== this.backgroundTexture && (this.backgroundTexture.dispose(), (this.backgroundTexture = null))
		}
		get disposed() {
			return this._disposed
		}
		get renderPaused() {
			return this._renderPaused
		}
		set renderPaused(e) {
			;(this._renderPaused = e),
				this._renderPaused && null !== this.animationID
					? (window.cancelAnimationFrame(this.animationID), (this.animationID = null))
					: this._renderPaused ||
					  this._disposed ||
					  this.renderer.getContext().isContextLost() ||
					  null != this.animationID ||
					  (this.animationID = window.requestAnimationFrame(() => this.draw()))
		}
		get width() {
			return this.renderer.getSize(new H()).width
		}
		set width(e) {
			this.setSize(e, this.height)
		}
		get height() {
			return this.renderer.getSize(new H()).height
		}
		set height(e) {
			this.setSize(this.width, e)
		}
		get background() {
			return this.scene.background
		}
		set background(e) {
			;(this.scene.background = null === e || e instanceof bt || e instanceof Q ? e : new bt(e)),
				null !== this.backgroundTexture && e !== this.backgroundTexture && (this.backgroundTexture.dispose(), (this.backgroundTexture = null))
		}
		adjustCameraDistance() {
			let e = 4.5 + 16.5 / Math.tan(((this.fov / 180) * Math.PI) / 2) / this.zoom
			e < 10 ? (e = 10) : e > 256 && (e = 256), this.camera.position.multiplyScalar(e / this.camera.position.length()), this.camera.updateProjectionMatrix()
		}
		get fov() {
			return this.camera.fov
		}
		set fov(e) {
			;(this.camera.fov = e), this.adjustCameraDistance()
		}
		get zoom() {
			return this._zoom
		}
		set zoom(e) {
			;(this._zoom = e), this.adjustCameraDistance()
		}
	}
	const $a = { type: 'change' },
		es = { type: 'start' },
		ts = { type: 'end' }
	class is extends D {
		constructor(e, l) {
			super(),
				void 0 === l && console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),
				l === document &&
					console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),
				(this.object = e),
				(this.domElement = l),
				(this.domElement.style.touchAction = 'none'),
				(this.enabled = !0),
				(this.target = new ee()),
				(this.minDistance = 0),
				(this.maxDistance = 1 / 0),
				(this.minZoom = 0),
				(this.maxZoom = 1 / 0),
				(this.minPolarAngle = 0),
				(this.maxPolarAngle = Math.PI),
				(this.minAzimuthAngle = -1 / 0),
				(this.maxAzimuthAngle = 1 / 0),
				(this.enableDamping = !1),
				(this.dampingFactor = 0.05),
				(this.enableZoom = !0),
				(this.zoomSpeed = 1),
				(this.enableRotate = !0),
				(this.rotateSpeed = 1),
				(this.enablePan = !0),
				(this.panSpeed = 1),
				(this.screenSpacePanning = !0),
				(this.keyPanSpeed = 7),
				(this.autoRotate = !1),
				(this.autoRotateSpeed = 2),
				(this.keys = { LEFT: 'ArrowLeft', UP: 'ArrowUp', RIGHT: 'ArrowRight', BOTTOM: 'ArrowDown' }),
				(this.mouseButtons = { LEFT: t, MIDDLE: i, RIGHT: n }),
				(this.touches = { ONE: r, TWO: s }),
				(this.target0 = this.target.clone()),
				(this.position0 = this.object.position.clone()),
				(this.zoom0 = this.object.zoom),
				(this._domElementKeyEvents = null),
				(this.getPolarAngle = function () {
					return p.phi
				}),
				(this.getAzimuthalAngle = function () {
					return p.theta
				}),
				(this.getDistance = function () {
					return this.object.position.distanceTo(this.target)
				}),
				(this.listenToKeyEvents = function (e) {
					e.addEventListener('keydown', J), (this._domElementKeyEvents = e)
				}),
				(this.saveState = function () {
					c.target0.copy(c.target), c.position0.copy(c.object.position), (c.zoom0 = c.object.zoom)
				}),
				(this.reset = function () {
					c.target.copy(c.target0),
						c.object.position.copy(c.position0),
						(c.object.zoom = c.zoom0),
						c.object.updateProjectionMatrix(),
						c.dispatchEvent($a),
						c.update(),
						(d = h.NONE)
				}),
				(this.update = (function () {
					const t = new ee(),
						i = new $().setFromUnitVectors(e.up, new ee(0, 1, 0)),
						n = i.clone().invert(),
						r = new ee(),
						a = new $(),
						s = 2 * Math.PI
					return function () {
						const e = c.object.position
						t.copy(e).sub(c.target),
							t.applyQuaternion(i),
							p.setFromVector3(t),
							c.autoRotate && d === h.NONE && F(((2 * Math.PI) / 60 / 60) * c.autoRotateSpeed),
							c.enableDamping ? ((p.theta += f.theta * c.dampingFactor), (p.phi += f.phi * c.dampingFactor)) : ((p.theta += f.theta), (p.phi += f.phi))
						let o = c.minAzimuthAngle,
							l = c.maxAzimuthAngle
						return (
							isFinite(o) &&
								isFinite(l) &&
								(o < -Math.PI ? (o += s) : o > Math.PI && (o -= s),
								l < -Math.PI ? (l += s) : l > Math.PI && (l -= s),
								(p.theta = o <= l ? Math.max(o, Math.min(l, p.theta)) : p.theta > (o + l) / 2 ? Math.max(o, p.theta) : Math.min(l, p.theta))),
							(p.phi = Math.max(c.minPolarAngle, Math.min(c.maxPolarAngle, p.phi))),
							p.makeSafe(),
							(p.radius *= m),
							(p.radius = Math.max(c.minDistance, Math.min(c.maxDistance, p.radius))),
							!0 === c.enableDamping ? c.target.addScaledVector(g, c.dampingFactor) : c.target.add(g),
							t.setFromSpherical(p),
							t.applyQuaternion(n),
							e.copy(c.target).add(t),
							c.object.lookAt(c.target),
							!0 === c.enableDamping
								? ((f.theta *= 1 - c.dampingFactor), (f.phi *= 1 - c.dampingFactor), g.multiplyScalar(1 - c.dampingFactor))
								: (f.set(0, 0, 0), g.set(0, 0, 0)),
							(m = 1),
							!!(x || r.distanceToSquared(c.object.position) > u || 8 * (1 - a.dot(c.object.quaternion)) > u) &&
								(c.dispatchEvent($a), r.copy(c.object.position), a.copy(c.object.quaternion), (x = !1), !0)
						)
					}
				})()),
				(this.dispose = function () {
					c.domElement.removeEventListener('contextmenu', K),
						c.domElement.removeEventListener('pointerdown', Y),
						c.domElement.removeEventListener('pointercancel', q),
						c.domElement.removeEventListener('wheel', Z),
						c.domElement.removeEventListener('pointermove', j),
						c.domElement.removeEventListener('pointerup', Q),
						null !== c._domElementKeyEvents && c._domElementKeyEvents.removeEventListener('keydown', J)
				})
			const c = this,
				h = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_PAN: 4, TOUCH_DOLLY_PAN: 5, TOUCH_DOLLY_ROTATE: 6 }
			let d = h.NONE
			const u = 1e-6,
				p = new Pa(),
				f = new Pa()
			let m = 1
			const g = new ee()
			let x = !1
			const _ = new H(),
				v = new H(),
				y = new H(),
				M = new H(),
				b = new H(),
				S = new H(),
				w = new H(),
				T = new H(),
				A = new H(),
				E = [],
				L = {}
			function P() {
				return Math.pow(0.95, c.zoomSpeed)
			}
			function F(e) {
				f.theta -= e
			}
			function C(e) {
				f.phi -= e
			}
			const N = (function () {
					const e = new ee()
					return function (t, i) {
						e.setFromMatrixColumn(i, 0), e.multiplyScalar(-t), g.add(e)
					}
				})(),
				D = (function () {
					const e = new ee()
					return function (t, i) {
						!0 === c.screenSpacePanning ? e.setFromMatrixColumn(i, 1) : (e.setFromMatrixColumn(i, 0), e.crossVectors(c.object.up, e)),
							e.multiplyScalar(t),
							g.add(e)
					}
				})(),
				I = (function () {
					const e = new ee()
					return function (t, i) {
						const n = c.domElement
						if (c.object.isPerspectiveCamera) {
							const r = c.object.position
							e.copy(r).sub(c.target)
							let a = e.length()
							;(a *= Math.tan(((c.object.fov / 2) * Math.PI) / 180)),
								N((2 * t * a) / n.clientHeight, c.object.matrix),
								D((2 * i * a) / n.clientHeight, c.object.matrix)
						} else
							c.object.isOrthographicCamera
								? (N((t * (c.object.right - c.object.left)) / c.object.zoom / n.clientWidth, c.object.matrix),
								  D((i * (c.object.top - c.object.bottom)) / c.object.zoom / n.clientHeight, c.object.matrix))
								: (console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.'), (c.enablePan = !1))
					}
				})()
			function R(e) {
				c.object.isPerspectiveCamera
					? (m /= e)
					: c.object.isOrthographicCamera
					? ((c.object.zoom = Math.max(c.minZoom, Math.min(c.maxZoom, c.object.zoom * e))), c.object.updateProjectionMatrix(), (x = !0))
					: (console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.'), (c.enableZoom = !1))
			}
			function U(e) {
				c.object.isPerspectiveCamera
					? (m *= e)
					: c.object.isOrthographicCamera
					? ((c.object.zoom = Math.max(c.minZoom, Math.min(c.maxZoom, c.object.zoom / e))), c.object.updateProjectionMatrix(), (x = !0))
					: (console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.'), (c.enableZoom = !1))
			}
			function z(e) {
				_.set(e.clientX, e.clientY)
			}
			function O(e) {
				M.set(e.clientX, e.clientY)
			}
			function B() {
				if (1 === E.length) _.set(E[0].pageX, E[0].pageY)
				else {
					const e = 0.5 * (E[0].pageX + E[1].pageX),
						t = 0.5 * (E[0].pageY + E[1].pageY)
					_.set(e, t)
				}
			}
			function k() {
				if (1 === E.length) M.set(E[0].pageX, E[0].pageY)
				else {
					const e = 0.5 * (E[0].pageX + E[1].pageX),
						t = 0.5 * (E[0].pageY + E[1].pageY)
					M.set(e, t)
				}
			}
			function G() {
				const e = E[0].pageX - E[1].pageX,
					t = E[0].pageY - E[1].pageY,
					i = Math.sqrt(e * e + t * t)
				w.set(0, i)
			}
			function V(e) {
				if (1 == E.length) v.set(e.pageX, e.pageY)
				else {
					const t = ne(e),
						i = 0.5 * (e.pageX + t.x),
						n = 0.5 * (e.pageY + t.y)
					v.set(i, n)
				}
				y.subVectors(v, _).multiplyScalar(c.rotateSpeed)
				const t = c.domElement
				F((2 * Math.PI * y.x) / t.clientHeight), C((2 * Math.PI * y.y) / t.clientHeight), _.copy(v)
			}
			function W(e) {
				if (1 === E.length) b.set(e.pageX, e.pageY)
				else {
					const t = ne(e),
						i = 0.5 * (e.pageX + t.x),
						n = 0.5 * (e.pageY + t.y)
					b.set(i, n)
				}
				S.subVectors(b, M).multiplyScalar(c.panSpeed), I(S.x, S.y), M.copy(b)
			}
			function X(e) {
				const t = ne(e),
					i = e.pageX - t.x,
					n = e.pageY - t.y,
					r = Math.sqrt(i * i + n * n)
				T.set(0, r), A.set(0, Math.pow(T.y / w.y, c.zoomSpeed)), R(A.y), w.copy(T)
			}
			function Y(e) {
				!1 !== c.enabled &&
					(0 === E.length &&
						(c.domElement.setPointerCapture(e.pointerId), c.domElement.addEventListener('pointermove', j), c.domElement.addEventListener('pointerup', Q)),
					(function (e) {
						E.push(e)
					})(e),
					'touch' === e.pointerType
						? (function (e) {
								switch ((ie(e), E.length)) {
									case 1:
										switch (c.touches.ONE) {
											case r:
												if (!1 === c.enableRotate) return
												B(), (d = h.TOUCH_ROTATE)
												break
											case a:
												if (!1 === c.enablePan) return
												k(), (d = h.TOUCH_PAN)
												break
											default:
												d = h.NONE
										}
										break
									case 2:
										switch (c.touches.TWO) {
											case s:
												if (!1 === c.enableZoom && !1 === c.enablePan) return
												c.enableZoom && G(), c.enablePan && k(), (d = h.TOUCH_DOLLY_PAN)
												break
											case o:
												if (!1 === c.enableZoom && !1 === c.enableRotate) return
												c.enableZoom && G(), c.enableRotate && B(), (d = h.TOUCH_DOLLY_ROTATE)
												break
											default:
												d = h.NONE
										}
										break
									default:
										d = h.NONE
								}
								d !== h.NONE && c.dispatchEvent(es)
						  })(e)
						: (function (e) {
								let r
								switch (e.button) {
									case 0:
										r = c.mouseButtons.LEFT
										break
									case 1:
										r = c.mouseButtons.MIDDLE
										break
									case 2:
										r = c.mouseButtons.RIGHT
										break
									default:
										r = -1
								}
								switch (r) {
									case i:
										if (!1 === c.enableZoom) return
										!(function (e) {
											w.set(e.clientX, e.clientY)
										})(e),
											(d = h.DOLLY)
										break
									case t:
										if (e.ctrlKey || e.metaKey || e.shiftKey) {
											if (!1 === c.enablePan) return
											O(e), (d = h.PAN)
										} else {
											if (!1 === c.enableRotate) return
											z(e), (d = h.ROTATE)
										}
										break
									case n:
										if (e.ctrlKey || e.metaKey || e.shiftKey) {
											if (!1 === c.enableRotate) return
											z(e), (d = h.ROTATE)
										} else {
											if (!1 === c.enablePan) return
											O(e), (d = h.PAN)
										}
										break
									default:
										d = h.NONE
								}
								d !== h.NONE && c.dispatchEvent(es)
						  })(e))
			}
			function j(e) {
				!1 !== c.enabled &&
					('touch' === e.pointerType
						? (function (e) {
								switch ((ie(e), d)) {
									case h.TOUCH_ROTATE:
										if (!1 === c.enableRotate) return
										V(e), c.update()
										break
									case h.TOUCH_PAN:
										if (!1 === c.enablePan) return
										W(e), c.update()
										break
									case h.TOUCH_DOLLY_PAN:
										if (!1 === c.enableZoom && !1 === c.enablePan) return
										!(function (e) {
											c.enableZoom && X(e), c.enablePan && W(e)
										})(e),
											c.update()
										break
									case h.TOUCH_DOLLY_ROTATE:
										if (!1 === c.enableZoom && !1 === c.enableRotate) return
										!(function (e) {
											c.enableZoom && X(e), c.enableRotate && V(e)
										})(e),
											c.update()
										break
									default:
										d = h.NONE
								}
						  })(e)
						: (function (e) {
								if (!1 === c.enabled) return
								switch (d) {
									case h.ROTATE:
										if (!1 === c.enableRotate) return
										!(function (e) {
											v.set(e.clientX, e.clientY), y.subVectors(v, _).multiplyScalar(c.rotateSpeed)
											const t = c.domElement
											F((2 * Math.PI * y.x) / t.clientHeight), C((2 * Math.PI * y.y) / t.clientHeight), _.copy(v), c.update()
										})(e)
										break
									case h.DOLLY:
										if (!1 === c.enableZoom) return
										!(function (e) {
											T.set(e.clientX, e.clientY), A.subVectors(T, w), A.y > 0 ? R(P()) : A.y < 0 && U(P()), w.copy(T), c.update()
										})(e)
										break
									case h.PAN:
										if (!1 === c.enablePan) return
										!(function (e) {
											b.set(e.clientX, e.clientY), S.subVectors(b, M).multiplyScalar(c.panSpeed), I(S.x, S.y), M.copy(b), c.update()
										})(e)
								}
						  })(e))
			}
			function Q(e) {
				te(e),
					0 === E.length &&
						(c.domElement.releasePointerCapture(e.pointerId),
						c.domElement.removeEventListener('pointermove', j),
						c.domElement.removeEventListener('pointerup', Q)),
					c.dispatchEvent(ts),
					(d = h.NONE)
			}
			function q(e) {
				te(e)
			}
			function Z(e) {
				!1 !== c.enabled &&
					!1 !== c.enableZoom &&
					d === h.NONE &&
					(e.preventDefault(),
					c.dispatchEvent(es),
					(function (e) {
						e.deltaY < 0 ? U(P()) : e.deltaY > 0 && R(P()), c.update()
					})(e),
					c.dispatchEvent(ts))
			}
			function J(e) {
				!1 !== c.enabled &&
					!1 !== c.enablePan &&
					(function (e) {
						let t = !1
						switch (e.code) {
							case c.keys.UP:
								I(0, c.keyPanSpeed), (t = !0)
								break
							case c.keys.BOTTOM:
								I(0, -c.keyPanSpeed), (t = !0)
								break
							case c.keys.LEFT:
								I(c.keyPanSpeed, 0), (t = !0)
								break
							case c.keys.RIGHT:
								I(-c.keyPanSpeed, 0), (t = !0)
						}
						t && (e.preventDefault(), c.update())
					})(e)
			}
			function K(e) {
				!1 !== c.enabled && e.preventDefault()
			}
			function te(e) {
				delete L[e.pointerId]
				for (let t = 0; t < E.length; t++) if (E[t].pointerId == e.pointerId) return void E.splice(t, 1)
			}
			function ie(e) {
				let t = L[e.pointerId]
				void 0 === t && ((t = new H()), (L[e.pointerId] = t)), t.set(e.pageX, e.pageY)
			}
			function ne(e) {
				const t = e.pointerId === E[0].pointerId ? E[1] : E[0]
				return L[t.pointerId]
			}
			c.domElement.addEventListener('contextmenu', K),
				c.domElement.addEventListener('pointerdown', Y),
				c.domElement.addEventListener('pointercancel', q),
				c.domElement.addEventListener('wheel', Z, { passive: !1 }),
				this.update()
		}
	}
	var ns = {
		uniforms: { tDiffuse: { value: null }, opacity: { value: 1 } },
		vertexShader: 'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
		fragmentShader:
			'uniform float opacity;uniform sampler2D tDiffuse;varying vec2 vUv;void main(){vec4 texel=texture2D(tDiffuse,vUv);gl_FragColor=opacity*texel;}',
	}
	class rs {
		constructor() {
			;(this.enabled = !0), (this.needsSwap = !0), (this.clear = !1), (this.renderToScreen = !1)
		}
		setSize() {}
		render() {
			console.error('THREE.Pass: .render() must be implemented in derived pass.')
		}
	}
	const as = new Di(-1, 1, 1, -1, 0, 1),
		ss = new zt()
	ss.setAttribute('position', new Pt([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), ss.setAttribute('uv', new Pt([0, 2, 0, 0, 2, 0], 2))
	class os {
		constructor(e) {
			this._mesh = new ti(ss, e)
		}
		dispose() {
			this._mesh.geometry.dispose()
		}
		render(e) {
			e.render(this._mesh, as)
		}
		get material() {
			return this._mesh.material
		}
		set material(e) {
			this._mesh.material = e
		}
	}
	class ls extends rs {
		constructor(e, t) {
			super(),
				(this.textureID = void 0 !== t ? t : 'tDiffuse'),
				e instanceof oi
					? ((this.uniforms = e.uniforms), (this.material = e))
					: e &&
					  ((this.uniforms = si.clone(e.uniforms)),
					  (this.material = new oi({
							defines: Object.assign({}, e.defines),
							uniforms: this.uniforms,
							vertexShader: e.vertexShader,
							fragmentShader: e.fragmentShader,
					  }))),
				(this.fsQuad = new os(this.material))
		}
		render(e, t, i) {
			this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = i.texture),
				(this.fsQuad.material = this.material),
				this.renderToScreen
					? (e.setRenderTarget(null), this.fsQuad.render(e))
					: (e.setRenderTarget(t), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this.fsQuad.render(e))
		}
	}
	class cs extends rs {
		constructor(e, t) {
			super(), (this.scene = e), (this.camera = t), (this.clear = !0), (this.needsSwap = !1), (this.inverse = !1)
		}
		render(e, t, i) {
			const n = e.getContext(),
				r = e.state
			let a, s
			r.buffers.color.setMask(!1),
				r.buffers.depth.setMask(!1),
				r.buffers.color.setLocked(!0),
				r.buffers.depth.setLocked(!0),
				this.inverse ? ((a = 0), (s = 1)) : ((a = 1), (s = 0)),
				r.buffers.stencil.setTest(!0),
				r.buffers.stencil.setOp(n.REPLACE, n.REPLACE, n.REPLACE),
				r.buffers.stencil.setFunc(n.ALWAYS, a, 4294967295),
				r.buffers.stencil.setClear(s),
				r.buffers.stencil.setLocked(!0),
				e.setRenderTarget(i),
				this.clear && e.clear(),
				e.render(this.scene, this.camera),
				e.setRenderTarget(t),
				this.clear && e.clear(),
				e.render(this.scene, this.camera),
				r.buffers.color.setLocked(!1),
				r.buffers.depth.setLocked(!1),
				r.buffers.stencil.setLocked(!1),
				r.buffers.stencil.setFunc(n.EQUAL, 1, 4294967295),
				r.buffers.stencil.setOp(n.KEEP, n.KEEP, n.KEEP),
				r.buffers.stencil.setLocked(!0)
		}
	}
	class hs extends rs {
		constructor() {
			super(), (this.needsSwap = !1)
		}
		render(e) {
			e.state.buffers.stencil.setLocked(!1), e.state.buffers.stencil.setTest(!1)
		}
	}
	class ds {
		constructor(e, t) {
			if (((this.renderer = e), void 0 === t)) {
				const i = { minFilter: x, magFilter: x, format: A },
					n = e.getSize(new H())
				;(this._pixelRatio = e.getPixelRatio()),
					(this._width = n.width),
					(this._height = n.height),
					((t = new J(this._width * this._pixelRatio, this._height * this._pixelRatio, i)).texture.name = 'EffectComposer.rt1')
			} else (this._pixelRatio = 1), (this._width = t.width), (this._height = t.height)
			;(this.renderTarget1 = t),
				(this.renderTarget2 = t.clone()),
				(this.renderTarget2.texture.name = 'EffectComposer.rt2'),
				(this.writeBuffer = this.renderTarget1),
				(this.readBuffer = this.renderTarget2),
				(this.renderToScreen = !0),
				(this.passes = []),
				void 0 === ns && console.error('THREE.EffectComposer relies on CopyShader'),
				void 0 === ls && console.error('THREE.EffectComposer relies on ShaderPass'),
				(this.copyPass = new ls(ns)),
				(this.clock = new Ea())
		}
		swapBuffers() {
			const e = this.readBuffer
			;(this.readBuffer = this.writeBuffer), (this.writeBuffer = e)
		}
		addPass(e) {
			this.passes.push(e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio)
		}
		insertPass(e, t) {
			this.passes.splice(t, 0, e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio)
		}
		removePass(e) {
			const t = this.passes.indexOf(e)
			;-1 !== t && this.passes.splice(t, 1)
		}
		isLastEnabledPass(e) {
			for (let t = e + 1; t < this.passes.length; t++) if (this.passes[t].enabled) return !1
			return !0
		}
		render(e) {
			void 0 === e && (e = this.clock.getDelta())
			const t = this.renderer.getRenderTarget()
			let i = !1
			for (let t = 0, n = this.passes.length; t < n; t++) {
				const n = this.passes[t]
				if (!1 !== n.enabled) {
					if (
						((n.renderToScreen = this.renderToScreen && this.isLastEnabledPass(t)),
						n.render(this.renderer, this.writeBuffer, this.readBuffer, e, i),
						n.needsSwap)
					) {
						if (i) {
							const t = this.renderer.getContext(),
								i = this.renderer.state.buffers.stencil
							i.setFunc(t.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e), i.setFunc(t.EQUAL, 1, 4294967295)
						}
						this.swapBuffers()
					}
					void 0 !== cs && (n instanceof cs ? (i = !0) : n instanceof hs && (i = !1))
				}
			}
			this.renderer.setRenderTarget(t)
		}
		reset(e) {
			if (void 0 === e) {
				const t = this.renderer.getSize(new H())
				;(this._pixelRatio = this.renderer.getPixelRatio()),
					(this._width = t.width),
					(this._height = t.height),
					(e = this.renderTarget1.clone()).setSize(this._width * this._pixelRatio, this._height * this._pixelRatio)
			}
			this.renderTarget1.dispose(),
				this.renderTarget2.dispose(),
				(this.renderTarget1 = e),
				(this.renderTarget2 = e.clone()),
				(this.writeBuffer = this.renderTarget1),
				(this.readBuffer = this.renderTarget2)
		}
		setSize(e, t) {
			;(this._width = e), (this._height = t)
			const i = this._width * this._pixelRatio,
				n = this._height * this._pixelRatio
			this.renderTarget1.setSize(i, n), this.renderTarget2.setSize(i, n)
			for (let e = 0; e < this.passes.length; e++) this.passes[e].setSize(i, n)
		}
		setPixelRatio(e) {
			;(this._pixelRatio = e), this.setSize(this._width, this._height)
		}
	}
	new Di(-1, 1, 1, -1, 0, 1)
	const us = new zt()
	us.setAttribute('position', new Pt([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), us.setAttribute('uv', new Pt([0, 2, 0, 0, 2, 0], 2))
	class ps extends rs {
		constructor(e, t, i, n, r) {
			super(),
				(this.scene = e),
				(this.camera = t),
				(this.overrideMaterial = i),
				(this.clearColor = n),
				(this.clearAlpha = void 0 !== r ? r : 0),
				(this.clear = !0),
				(this.clearDepth = !1),
				(this.needsSwap = !1),
				(this._oldClearColor = new bt())
		}
		render(e, t, i) {
			const n = e.autoClear
			let r, a
			;(e.autoClear = !1),
				void 0 !== this.overrideMaterial && ((a = this.scene.overrideMaterial), (this.scene.overrideMaterial = this.overrideMaterial)),
				this.clearColor && (e.getClearColor(this._oldClearColor), (r = e.getClearAlpha()), e.setClearColor(this.clearColor, this.clearAlpha)),
				this.clearDepth && e.clearDepth(),
				e.setRenderTarget(this.renderToScreen ? null : i),
				this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil),
				e.render(this.scene, this.camera),
				this.clearColor && e.setClearColor(this._oldClearColor, r),
				void 0 !== this.overrideMaterial && (this.scene.overrideMaterial = a),
				(e.autoClear = n)
		}
	}
	const fs = {
		uniforms: { tDiffuse: { value: null }, resolution: { value: new H(1 / 1024, 1 / 512) } },
		vertexShader: 'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
		fragmentShader:
			'precision highp float;uniform sampler2D tDiffuse;uniform vec2 resolution;varying vec2 vUv;\n#define FXAA_PC 1\n#define FXAA_GLSL_100 1\n#define FXAA_QUALITY_PRESET 12\n#define FXAA_GREEN_AS_LUMA 1\n#ifndef FXAA_PC_CONSOLE\n#define FXAA_PC_CONSOLE 0\n#endif\n#ifndef FXAA_GLSL_120\n#define FXAA_GLSL_120 0\n#endif\n#ifndef FXAA_GLSL_130\n#define FXAA_GLSL_130 0\n#endif\n#ifndef FXAA_HLSL_3\n#define FXAA_HLSL_3 0\n#endif\n#ifndef FXAA_HLSL_4\n#define FXAA_HLSL_4 0\n#endif\n#ifndef FXAA_HLSL_5\n#define FXAA_HLSL_5 0\n#endif\n#ifndef FXAA_GREEN_AS_LUMA\n#define FXAA_GREEN_AS_LUMA 0\n#endif\n#ifndef FXAA_EARLY_EXIT\n#define FXAA_EARLY_EXIT 1\n#endif\n#ifndef FXAA_DISCARD\n#define FXAA_DISCARD 0\n#endif\n#ifndef FXAA_FAST_PIXEL_OFFSET\n#ifdef GL_EXT_gpu_shader4\n#define FXAA_FAST_PIXEL_OFFSET 1\n#endif\n#ifdef GL_NV_gpu_shader5\n#define FXAA_FAST_PIXEL_OFFSET 1\n#endif\n#ifdef GL_ARB_gpu_shader5\n#define FXAA_FAST_PIXEL_OFFSET 1\n#endif\n#ifndef FXAA_FAST_PIXEL_OFFSET\n#define FXAA_FAST_PIXEL_OFFSET 0\n#endif\n#endif\n#ifndef FXAA_GATHER4_ALPHA\n#if (FXAA_HLSL_5==1)\n#define FXAA_GATHER4_ALPHA 1\n#endif\n#ifdef GL_ARB_gpu_shader5\n#define FXAA_GATHER4_ALPHA 1\n#endif\n#ifdef GL_NV_gpu_shader5\n#define FXAA_GATHER4_ALPHA 1\n#endif\n#ifndef FXAA_GATHER4_ALPHA\n#define FXAA_GATHER4_ALPHA 0\n#endif\n#endif\n#ifndef FXAA_QUALITY_PRESET\n#define FXAA_QUALITY_PRESET 12\n#endif\n#if (FXAA_QUALITY_PRESET==10)\n#define FXAA_QUALITY_PS 3\n#define FXAA_QUALITY_P0 1.5\n#define FXAA_QUALITY_P1 3.0\n#define FXAA_QUALITY_P2 12.0\n#endif\n#if (FXAA_QUALITY_PRESET==11)\n#define FXAA_QUALITY_PS 4\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 3.0\n#define FXAA_QUALITY_P3 12.0\n#endif\n#if (FXAA_QUALITY_PRESET==12)\n#define FXAA_QUALITY_PS 5\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 4.0\n#define FXAA_QUALITY_P4 12.0\n#endif\n#if (FXAA_QUALITY_PRESET==13)\n#define FXAA_QUALITY_PS 6\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 4.0\n#define FXAA_QUALITY_P5 12.0\n#endif\n#if (FXAA_QUALITY_PRESET==14)\n#define FXAA_QUALITY_PS 7\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 4.0\n#define FXAA_QUALITY_P6 12.0\n#endif\n#if (FXAA_QUALITY_PRESET==15)\n#define FXAA_QUALITY_PS 8\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 2.0\n#define FXAA_QUALITY_P6 4.0\n#define FXAA_QUALITY_P7 12.0\n#endif\n#if (FXAA_QUALITY_PRESET==20)\n#define FXAA_QUALITY_PS 3\n#define FXAA_QUALITY_P0 1.5\n#define FXAA_QUALITY_P1 2.0\n#define FXAA_QUALITY_P2 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==21)\n#define FXAA_QUALITY_PS 4\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==22)\n#define FXAA_QUALITY_PS 5\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==23)\n#define FXAA_QUALITY_PS 6\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==24)\n#define FXAA_QUALITY_PS 7\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 3.0\n#define FXAA_QUALITY_P6 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==25)\n#define FXAA_QUALITY_PS 8\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 2.0\n#define FXAA_QUALITY_P6 4.0\n#define FXAA_QUALITY_P7 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==26)\n#define FXAA_QUALITY_PS 9\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 2.0\n#define FXAA_QUALITY_P6 2.0\n#define FXAA_QUALITY_P7 4.0\n#define FXAA_QUALITY_P8 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==27)\n#define FXAA_QUALITY_PS 10\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 2.0\n#define FXAA_QUALITY_P6 2.0\n#define FXAA_QUALITY_P7 2.0\n#define FXAA_QUALITY_P8 4.0\n#define FXAA_QUALITY_P9 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==28)\n#define FXAA_QUALITY_PS 11\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 2.0\n#define FXAA_QUALITY_P6 2.0\n#define FXAA_QUALITY_P7 2.0\n#define FXAA_QUALITY_P8 2.0\n#define FXAA_QUALITY_P9 4.0\n#define FXAA_QUALITY_P10 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==29)\n#define FXAA_QUALITY_PS 12\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 2.0\n#define FXAA_QUALITY_P6 2.0\n#define FXAA_QUALITY_P7 2.0\n#define FXAA_QUALITY_P8 2.0\n#define FXAA_QUALITY_P9 2.0\n#define FXAA_QUALITY_P10 4.0\n#define FXAA_QUALITY_P11 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==39)\n#define FXAA_QUALITY_PS 12\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.0\n#define FXAA_QUALITY_P2 1.0\n#define FXAA_QUALITY_P3 1.0\n#define FXAA_QUALITY_P4 1.0\n#define FXAA_QUALITY_P5 1.5\n#define FXAA_QUALITY_P6 2.0\n#define FXAA_QUALITY_P7 2.0\n#define FXAA_QUALITY_P8 2.0\n#define FXAA_QUALITY_P9 2.0\n#define FXAA_QUALITY_P10 4.0\n#define FXAA_QUALITY_P11 8.0\n#endif\n#if (FXAA_GLSL_100==1)||(FXAA_GLSL_120==1)||(FXAA_GLSL_130==1)\n#define FxaaBool bool\n#define FxaaDiscard discard\n#define FxaaFloat float\n#define FxaaFloat2 vec2\n#define FxaaFloat3 vec3\n#define FxaaFloat4 vec4\n#define FxaaHalf float\n#define FxaaHalf2 vec2\n#define FxaaHalf3 vec3\n#define FxaaHalf4 vec4\n#define FxaaInt2 ivec2\n#define FxaaSat(x)clamp(x,0.0,1.0)\n#define FxaaTex sampler2D\n#else\n#define FxaaBool bool\n#define FxaaDiscard clip(-1)\n#define FxaaFloat float\n#define FxaaFloat2 float2\n#define FxaaFloat3 float3\n#define FxaaFloat4 float4\n#define FxaaHalf half\n#define FxaaHalf2 half2\n#define FxaaHalf3 half3\n#define FxaaHalf4 half4\n#define FxaaSat(x)saturate(x)\n#endif\n#if (FXAA_GLSL_100==1)\n#define FxaaTexTop(t,p)texture2D(t,p,0.0)\n#define FxaaTexOff(t,p,o,r)texture2D(t,p+(o*r),0.0)\n#endif\n#if (FXAA_GLSL_120==1)\n#define FxaaTexTop(t,p)texture2DLod(t,p,0.0)\n#if (FXAA_FAST_PIXEL_OFFSET==1)\n#define FxaaTexOff(t,p,o,r)texture2DLodOffset(t,p,0.0,o)\n#else\n#define FxaaTexOff(t,p,o,r)texture2DLod(t,p+(o*r),0.0)\n#endif\n#if (FXAA_GATHER4_ALPHA==1)\n#define FxaaTexAlpha4(t,p)textureGather(t,p,3)\n#define FxaaTexOffAlpha4(t,p,o)textureGatherOffset(t,p,o,3)\n#define FxaaTexGreen4(t,p)textureGather(t,p,1)\n#define FxaaTexOffGreen4(t,p,o)textureGatherOffset(t,p,o,1)\n#endif\n#endif\n#if (FXAA_GLSL_130==1)\n#define FxaaTexTop(t,p)textureLod(t,p,0.0)\n#define FxaaTexOff(t,p,o,r)textureLodOffset(t,p,0.0,o)\n#if (FXAA_GATHER4_ALPHA==1)\n#define FxaaTexAlpha4(t,p)textureGather(t,p,3)\n#define FxaaTexOffAlpha4(t,p,o)textureGatherOffset(t,p,o,3)\n#define FxaaTexGreen4(t,p)textureGather(t,p,1)\n#define FxaaTexOffGreen4(t,p,o)textureGatherOffset(t,p,o,1)\n#endif\n#endif\n#if (FXAA_HLSL_3==1)\n#define FxaaInt2 float2\n#define FxaaTex sampler2D\n#define FxaaTexTop(t,p)tex2Dlod(t,float4(p,0.0,0.0))\n#define FxaaTexOff(t,p,o,r)tex2Dlod(t,float4(p+(o*r),0,0))\n#endif\n#if (FXAA_HLSL_4==1)\n#define FxaaInt2 int2\nstruct FxaaTex{SamplerState smpl;Texture2D tex;};\n#define FxaaTexTop(t,p)t.tex.SampleLevel(t.smpl,p,0.0)\n#define FxaaTexOff(t,p,o,r)t.tex.SampleLevel(t.smpl,p,0.0,o)\n#endif\n#if (FXAA_HLSL_5==1)\n#define FxaaInt2 int2\nstruct FxaaTex{SamplerState smpl;Texture2D tex;};\n#define FxaaTexTop(t,p)t.tex.SampleLevel(t.smpl,p,0.0)\n#define FxaaTexOff(t,p,o,r)t.tex.SampleLevel(t.smpl,p,0.0,o)\n#define FxaaTexAlpha4(t,p)t.tex.GatherAlpha(t.smpl,p)\n#define FxaaTexOffAlpha4(t,p,o)t.tex.GatherAlpha(t.smpl,p,o)\n#define FxaaTexGreen4(t,p)t.tex.GatherGreen(t.smpl,p)\n#define FxaaTexOffGreen4(t,p,o)t.tex.GatherGreen(t.smpl,p,o)\n#endif\n#if (FXAA_GREEN_AS_LUMA==0)\nFxaaFloat FxaaLuma(FxaaFloat4 rgba){return rgba.w;}\n#else\nFxaaFloat FxaaLuma(FxaaFloat4 rgba){return rgba.y;}\n#endif\n#if (FXAA_PC==1)\nFxaaFloat4 FxaaPixelShader(FxaaFloat2 pos,FxaaFloat4 fxaaConsolePosPos,FxaaTex tex,FxaaTex fxaaConsole360TexExpBiasNegOne,FxaaTex fxaaConsole360TexExpBiasNegTwo,FxaaFloat2 fxaaQualityRcpFrame,FxaaFloat4 fxaaConsoleRcpFrameOpt,FxaaFloat4 fxaaConsoleRcpFrameOpt2,FxaaFloat4 fxaaConsole360RcpFrameOpt2,FxaaFloat fxaaQualitySubpix,FxaaFloat fxaaQualityEdgeThreshold,FxaaFloat fxaaQualityEdgeThresholdMin,FxaaFloat fxaaConsoleEdgeSharpness,FxaaFloat fxaaConsoleEdgeThreshold,FxaaFloat fxaaConsoleEdgeThresholdMin,FxaaFloat4 fxaaConsole360ConstDir){FxaaFloat2 posM;posM.x=pos.x;posM.y=pos.y;\n#if (FXAA_GATHER4_ALPHA==1)\n#if (FXAA_DISCARD==0)\nFxaaFloat4 rgbyM=FxaaTexTop(tex,posM);\n#if (FXAA_GREEN_AS_LUMA==0)\n#define lumaM rgbyM.w\n#else\n#define lumaM rgbyM.y\n#endif\n#endif\n#if (FXAA_GREEN_AS_LUMA==0)\nFxaaFloat4 luma4A=FxaaTexAlpha4(tex,posM);FxaaFloat4 luma4B=FxaaTexOffAlpha4(tex,posM,FxaaInt2(-1,-1));\n#else\nFxaaFloat4 luma4A=FxaaTexGreen4(tex,posM);FxaaFloat4 luma4B=FxaaTexOffGreen4(tex,posM,FxaaInt2(-1,-1));\n#endif\n#if (FXAA_DISCARD==1)\n#define lumaM luma4A.w\n#endif\n#define lumaE luma4A.z\n#define lumaS luma4A.x\n#define lumaSE luma4A.y\n#define lumaNW luma4B.w\n#define lumaN luma4B.z\n#define lumaW luma4B.x\n#else\nFxaaFloat4 rgbyM=FxaaTexTop(tex,posM);\n#if (FXAA_GREEN_AS_LUMA==0)\n#define lumaM rgbyM.w\n#else\n#define lumaM rgbyM.y\n#endif\n#if (FXAA_GLSL_100==1)\nFxaaFloat lumaS=FxaaLuma(FxaaTexOff(tex,posM,FxaaFloat2(0.0,1.0),fxaaQualityRcpFrame.xy));FxaaFloat lumaE=FxaaLuma(FxaaTexOff(tex,posM,FxaaFloat2(1.0,0.0),fxaaQualityRcpFrame.xy));FxaaFloat lumaN=FxaaLuma(FxaaTexOff(tex,posM,FxaaFloat2(0.0,-1.0),fxaaQualityRcpFrame.xy));FxaaFloat lumaW=FxaaLuma(FxaaTexOff(tex,posM,FxaaFloat2(-1.0,0.0),fxaaQualityRcpFrame.xy));\n#else\nFxaaFloat lumaS=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(0,1),fxaaQualityRcpFrame.xy));FxaaFloat lumaE=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(1,0),fxaaQualityRcpFrame.xy));FxaaFloat lumaN=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(0,-1),fxaaQualityRcpFrame.xy));FxaaFloat lumaW=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(-1,0),fxaaQualityRcpFrame.xy));\n#endif\n#endif\nFxaaFloat maxSM=max(lumaS,lumaM);FxaaFloat minSM=min(lumaS,lumaM);FxaaFloat maxESM=max(lumaE,maxSM);FxaaFloat minESM=min(lumaE,minSM);FxaaFloat maxWN=max(lumaN,lumaW);FxaaFloat minWN=min(lumaN,lumaW);FxaaFloat rangeMax=max(maxWN,maxESM);FxaaFloat rangeMin=min(minWN,minESM);FxaaFloat rangeMaxScaled=rangeMax*fxaaQualityEdgeThreshold;FxaaFloat range=rangeMax-rangeMin;FxaaFloat rangeMaxClamped=max(fxaaQualityEdgeThresholdMin,rangeMaxScaled);FxaaBool earlyExit=range<rangeMaxClamped;if(earlyExit)\n#if (FXAA_DISCARD==1)\nFxaaDiscard;\n#else\nreturn rgbyM;\n#endif\n#if (FXAA_GATHER4_ALPHA==0)\n#if (FXAA_GLSL_100==1)\nFxaaFloat lumaNW=FxaaLuma(FxaaTexOff(tex,posM,FxaaFloat2(-1.0,-1.0),fxaaQualityRcpFrame.xy));FxaaFloat lumaSE=FxaaLuma(FxaaTexOff(tex,posM,FxaaFloat2(1.0,1.0),fxaaQualityRcpFrame.xy));FxaaFloat lumaNE=FxaaLuma(FxaaTexOff(tex,posM,FxaaFloat2(1.0,-1.0),fxaaQualityRcpFrame.xy));FxaaFloat lumaSW=FxaaLuma(FxaaTexOff(tex,posM,FxaaFloat2(-1.0,1.0),fxaaQualityRcpFrame.xy));\n#else\nFxaaFloat lumaNW=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(-1,-1),fxaaQualityRcpFrame.xy));FxaaFloat lumaSE=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(1,1),fxaaQualityRcpFrame.xy));FxaaFloat lumaNE=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(1,-1),fxaaQualityRcpFrame.xy));FxaaFloat lumaSW=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(-1,1),fxaaQualityRcpFrame.xy));\n#endif\n#else\nFxaaFloat lumaNE=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(1,-1),fxaaQualityRcpFrame.xy));FxaaFloat lumaSW=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(-1,1),fxaaQualityRcpFrame.xy));\n#endif\nFxaaFloat lumaNS=lumaN+lumaS;FxaaFloat lumaWE=lumaW+lumaE;FxaaFloat subpixRcpRange=1.0/range;FxaaFloat subpixNSWE=lumaNS+lumaWE;FxaaFloat edgeHorz1=(-2.0*lumaM)+lumaNS;FxaaFloat edgeVert1=(-2.0*lumaM)+lumaWE;FxaaFloat lumaNESE=lumaNE+lumaSE;FxaaFloat lumaNWNE=lumaNW+lumaNE;FxaaFloat edgeHorz2=(-2.0*lumaE)+lumaNESE;FxaaFloat edgeVert2=(-2.0*lumaN)+lumaNWNE;FxaaFloat lumaNWSW=lumaNW+lumaSW;FxaaFloat lumaSWSE=lumaSW+lumaSE;FxaaFloat edgeHorz4=(abs(edgeHorz1)*2.0)+abs(edgeHorz2);FxaaFloat edgeVert4=(abs(edgeVert1)*2.0)+abs(edgeVert2);FxaaFloat edgeHorz3=(-2.0*lumaW)+lumaNWSW;FxaaFloat edgeVert3=(-2.0*lumaS)+lumaSWSE;FxaaFloat edgeHorz=abs(edgeHorz3)+edgeHorz4;FxaaFloat edgeVert=abs(edgeVert3)+edgeVert4;FxaaFloat subpixNWSWNESE=lumaNWSW+lumaNESE;FxaaFloat lengthSign=fxaaQualityRcpFrame.x;FxaaBool horzSpan=edgeHorz>=edgeVert;FxaaFloat subpixA=subpixNSWE*2.0+subpixNWSWNESE;if(!horzSpan)lumaN=lumaW;if(!horzSpan)lumaS=lumaE;if(horzSpan)lengthSign=fxaaQualityRcpFrame.y;FxaaFloat subpixB=(subpixA*(1.0/12.0))-lumaM;FxaaFloat gradientN=lumaN-lumaM;FxaaFloat gradientS=lumaS-lumaM;FxaaFloat lumaNN=lumaN+lumaM;FxaaFloat lumaSS=lumaS+lumaM;FxaaBool pairN=abs(gradientN)>=abs(gradientS);FxaaFloat gradient=max(abs(gradientN),abs(gradientS));if(pairN)lengthSign=-lengthSign;FxaaFloat subpixC=FxaaSat(abs(subpixB)*subpixRcpRange);FxaaFloat2 posB;posB.x=posM.x;posB.y=posM.y;FxaaFloat2 offNP;offNP.x=(!horzSpan)?0.0:fxaaQualityRcpFrame.x;offNP.y=(horzSpan)?0.0:fxaaQualityRcpFrame.y;if(!horzSpan)posB.x+=lengthSign*0.5;if(horzSpan)posB.y+=lengthSign*0.5;FxaaFloat2 posN;posN.x=posB.x-offNP.x*FXAA_QUALITY_P0;posN.y=posB.y-offNP.y*FXAA_QUALITY_P0;FxaaFloat2 posP;posP.x=posB.x+offNP.x*FXAA_QUALITY_P0;posP.y=posB.y+offNP.y*FXAA_QUALITY_P0;FxaaFloat subpixD=((-2.0)*subpixC)+3.0;FxaaFloat lumaEndN=FxaaLuma(FxaaTexTop(tex,posN));FxaaFloat subpixE=subpixC*subpixC;FxaaFloat lumaEndP=FxaaLuma(FxaaTexTop(tex,posP));if(!pairN)lumaNN=lumaSS;FxaaFloat gradientScaled=gradient*1.0/4.0;FxaaFloat lumaMM=lumaM-lumaNN*0.5;FxaaFloat subpixF=subpixD*subpixE;FxaaBool lumaMLTZero=lumaMM<0.0;lumaEndN-=lumaNN*0.5;lumaEndP-=lumaNN*0.5;FxaaBool doneN=abs(lumaEndN)>=gradientScaled;FxaaBool doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P1;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P1;FxaaBool doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P1;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P1;if(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P2;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P2;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P2;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P2;\n#if (FXAA_QUALITY_PS>3)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P3;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P3;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P3;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P3;\n#if (FXAA_QUALITY_PS>4)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P4;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P4;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P4;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P4;\n#if (FXAA_QUALITY_PS>5)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P5;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P5;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P5;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P5;\n#if (FXAA_QUALITY_PS>6)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P6;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P6;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P6;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P6;\n#if (FXAA_QUALITY_PS>7)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P7;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P7;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P7;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P7;\n#if (FXAA_QUALITY_PS>8)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P8;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P8;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P8;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P8;\n#if (FXAA_QUALITY_PS>9)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P9;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P9;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P9;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P9;\n#if (FXAA_QUALITY_PS>10)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P10;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P10;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P10;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P10;\n#if (FXAA_QUALITY_PS>11)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P11;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P11;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P11;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P11;\n#if (FXAA_QUALITY_PS>12)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P12;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P12;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P12;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P12;}\n#endif\n}\n#endif\n}\n#endif\n}\n#endif\n}\n#endif\n}\n#endif\n}\n#endif\n}\n#endif\n}\n#endif\n}\n#endif\n}FxaaFloat dstN=posM.x-posN.x;FxaaFloat dstP=posP.x-posM.x;if(!horzSpan)dstN=posM.y-posN.y;if(!horzSpan)dstP=posP.y-posM.y;FxaaBool goodSpanN=(lumaEndN<0.0)!=lumaMLTZero;FxaaFloat spanLength=(dstP+dstN);FxaaBool goodSpanP=(lumaEndP<0.0)!=lumaMLTZero;FxaaFloat spanLengthRcp=1.0/spanLength;FxaaBool directionN=dstN<dstP;FxaaFloat dst=min(dstN,dstP);FxaaBool goodSpan=directionN?goodSpanN:goodSpanP;FxaaFloat subpixG=subpixF*subpixF;FxaaFloat pixelOffset=(dst*(-spanLengthRcp))+0.5;FxaaFloat subpixH=subpixG*fxaaQualitySubpix;FxaaFloat pixelOffsetGood=goodSpan?pixelOffset:0.0;FxaaFloat pixelOffsetSubpix=max(pixelOffsetGood,subpixH);if(!horzSpan)posM.x+=pixelOffsetSubpix*lengthSign;if(horzSpan)posM.y+=pixelOffsetSubpix*lengthSign;\n#if (FXAA_DISCARD==1)\nreturn FxaaTexTop(tex,posM);\n#else\nreturn FxaaFloat4(FxaaTexTop(tex,posM).xyz,lumaM);\n#endif\n}\n#endif\nvoid main(){gl_FragColor=FxaaPixelShader(vUv,vec4(0.0),tDiffuse,tDiffuse,tDiffuse,resolution,vec4(0.0),vec4(0.0),vec4(0.0),0.75,0.166,0.0833,0.0,0.0,0.0,vec4(0.0));gl_FragColor.a=texture2D(tDiffuse,vUv).a;}',
	}
	;(e.BodyPart = Da),
		(e.CapeObject = Ra),
		(e.CompositeAnimation = Za),
		(e.EarsObject = za),
		(e.ElytraObject = Ua),
		(e.FXAASkinViewer = class extends Ka {
			constructor(e) {
				void 0 === e ? (e = { alpha: !1, background: 'white' }) : ((e.alpha = !1), void 0 === e.background && (e.background = 'white')),
					super(e),
					(this.composer = new ds(this.renderer)),
					(this.renderPass = new ps(this.scene, this.camera)),
					(this.fxaaPass = new ls(fs)),
					this.composer.addPass(this.renderPass),
					this.composer.addPass(this.fxaaPass),
					this.updateComposerSize(),
					this.renderer.setClearColor('white')
			}
			setSize(e, t) {
				super.setSize(e, t), void 0 !== this.composer && this.updateComposerSize()
			}
			updateComposerSize() {
				this.composer.setSize(this.width, this.height)
				const e = this.renderer.getPixelRatio()
				this.composer.setPixelRatio(e),
					(this.fxaaPass.material.uniforms.resolution.value.x = 1 / (this.width * e)),
					(this.fxaaPass.material.uniforms.resolution.value.y = 1 / (this.height * e))
			}
			render() {
				this.composer.render()
			}
			dispose() {
				super.dispose(), this.fxaaPass.fsQuad.dispose()
			}
		}),
		(e.FlyingAnimation = (e, t) => {
			t < 0 && (t = 0)
			const i = ((a = 1), (n = ((t *= 20) * t) / 100) <= (r = 0) ? r : n >= a ? a : n)
			var n, r, a
			;(e.rotation.x = (i * Math.PI) / 2), (e.skin.head.rotation.x = i > 0.5 ? Math.PI / 4 - e.rotation.x : 0)
			const s = 0.25 * Math.PI * i
			;(e.skin.leftArm.rotation.z = s), (e.skin.rightArm.rotation.z = -s)
			const o = 0.34906584,
				l = Math.PI / 2,
				c = Math.pow(0.9, t)
			;(e.elytra.leftWing.rotation.x = o + -0.08726644 * c), (e.elytra.leftWing.rotation.z = l + c * (0.2617994 - l)), e.elytra.updateRightWing()
		}),
		(e.IdleAnimation = (e, t) => {
			const i = e.skin
			t *= 2
			const n = 0.02 * Math.PI
			;(i.leftArm.rotation.z = 0.03 * Math.cos(t) + n), (i.rightArm.rotation.z = 0.03 * Math.cos(t + Math.PI) - n)
			const r = 0.06 * Math.PI
			e.cape.rotation.x = 0.01 * Math.sin(t) + r
		}),
		(e.PlayerObject = Oa),
		(e.RootAnimation = Ja),
		(e.RotatingAnimation = (e, t) => {
			e.rotation.y = t
		}),
		(e.RunningAnimation = (e, t) => {
			const i = e.skin
			;(t = 15 * t + 0.5 * Math.PI),
				(i.leftLeg.rotation.x = 1.3 * Math.cos(t + Math.PI)),
				(i.rightLeg.rotation.x = 1.3 * Math.cos(t)),
				(i.leftArm.rotation.x = 1.5 * Math.cos(t)),
				(i.rightArm.rotation.x = 1.5 * Math.cos(t + Math.PI))
			const n = 0.1 * Math.PI
			;(i.leftArm.rotation.z = 0.1 * Math.cos(t) + n),
				(i.rightArm.rotation.z = 0.1 * Math.cos(t + Math.PI) - n),
				(e.position.y = Math.cos(2 * t)),
				(e.position.x = 0.15 * Math.cos(t)),
				(e.rotation.z = 0.01 * Math.cos(t + Math.PI))
			const r = 0.3 * Math.PI
			e.cape.rotation.x = 0.1 * Math.sin(2 * t) + r
		}),
		(e.SkinObject = Ia),
		(e.SkinViewer = Ka),
		(e.WalkingAnimation = (e, t) => {
			const i = e.skin
			;(t *= 8),
				(i.leftLeg.rotation.x = 0.5 * Math.sin(t)),
				(i.rightLeg.rotation.x = 0.5 * Math.sin(t + Math.PI)),
				(i.leftArm.rotation.x = 0.5 * Math.sin(t + Math.PI)),
				(i.rightArm.rotation.x = 0.5 * Math.sin(t))
			const n = 0.02 * Math.PI
			;(i.leftArm.rotation.z = 0.03 * Math.cos(t) + n),
				(i.rightArm.rotation.z = 0.03 * Math.cos(t + Math.PI) - n),
				(i.head.rotation.y = 0.2 * Math.sin(t / 4)),
				(i.head.rotation.x = 0.1 * Math.sin(t / 5))
			const r = 0.06 * Math.PI
			e.cape.rotation.x = 0.06 * Math.sin(t / 1.5) + r
		}),
		(e.createOrbitControls = function (e) {
			const t = new is(e.camera, e.renderer.domElement)
			return (t.enablePan = !1), (t.target = new ee(0, 0, 0)), (t.minDistance = 10), (t.maxDistance = 256), t.update(), t
		}),
		(e.invokeAnimation = Qa),
		Object.defineProperty(e, '__esModule', { value: !0 })
}) //# sourceMappingURL=skinview3d.bundle.js.map
