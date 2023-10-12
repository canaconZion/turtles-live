"undefined" != typeof window && function(t, e) { "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.Hls = e() : t.Hls = e() }(this, (() => (() => {
    var t = {
            21: (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, { default: () => u });
                var i = function() {
                        function t(t, e) { this.subtle = void 0, this.aesIV = void 0, this.subtle = t, this.aesIV = e }
                        return t.prototype.decrypt = function(t, e) { return this.subtle.decrypt({ name: "AES-CBC", iv: this.aesIV }, e, t) }, t
                    }(),
                    n = function() {
                        function t(t, e) { this.subtle = void 0, this.key = void 0, this.subtle = t, this.key = e }
                        return t.prototype.expandKey = function() { return this.subtle.importKey("raw", this.key, { name: "AES-CBC" }, !1, ["encrypt", "decrypt"]) }, t
                    }(),
                    a = r(145),
                    s = function() {
                        function t() { this.rcon = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], this.subMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)], this.invSubMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)], this.sBox = new Uint32Array(256), this.invSBox = new Uint32Array(256), this.key = new Uint32Array(0), this.ksRows = 0, this.keySize = 0, this.keySchedule = void 0, this.invKeySchedule = void 0, this.initTable() }
                        var e = t.prototype;
                        return e.uint8ArrayToUint32Array_ = function(t) { for (var e = new DataView(t), r = new Uint32Array(4), i = 0; i < 4; i++) r[i] = e.getUint32(4 * i); return r }, e.initTable = function() {
                            var t = this.sBox,
                                e = this.invSBox,
                                r = this.subMix,
                                i = r[0],
                                n = r[1],
                                a = r[2],
                                s = r[3],
                                o = this.invSubMix,
                                l = o[0],
                                u = o[1],
                                d = o[2],
                                h = o[3],
                                c = new Uint32Array(256),
                                f = 0,
                                g = 0,
                                v = 0;
                            for (v = 0; v < 256; v++) c[v] = v < 128 ? v << 1 : v << 1 ^ 283;
                            for (v = 0; v < 256; v++) {
                                var p = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4;
                                p = p >>> 8 ^ 255 & p ^ 99, t[f] = p, e[p] = f;
                                var m = c[f],
                                    y = c[m],
                                    E = c[y],
                                    T = 257 * c[p] ^ 16843008 * p;
                                i[f] = T << 24 | T >>> 8, n[f] = T << 16 | T >>> 16, a[f] = T << 8 | T >>> 24, s[f] = T, T = 16843009 * E ^ 65537 * y ^ 257 * m ^ 16843008 * f, l[p] = T << 24 | T >>> 8, u[p] = T << 16 | T >>> 16, d[p] = T << 8 | T >>> 24, h[p] = T, f ? (f = m ^ c[c[c[E ^ m]]], g ^= c[c[g]]) : f = g = 1
                            }
                        }, e.expandKey = function(t) {
                            for (var e = this.uint8ArrayToUint32Array_(t), r = !0, i = 0; i < e.length && r;) r = e[i] === this.key[i], i++;
                            if (!r) {
                                this.key = e;
                                var n = this.keySize = e.length;
                                if (4 !== n && 6 !== n && 8 !== n) throw new Error("Invalid aes key size=" + n);
                                var a, s, o, l, u = this.ksRows = 4 * (n + 6 + 1),
                                    d = this.keySchedule = new Uint32Array(u),
                                    h = this.invKeySchedule = new Uint32Array(u),
                                    c = this.sBox,
                                    f = this.rcon,
                                    g = this.invSubMix,
                                    v = g[0],
                                    p = g[1],
                                    m = g[2],
                                    y = g[3];
                                for (a = 0; a < u; a++) a < n ? o = d[a] = e[a] : (l = o, a % n == 0 ? (l = c[(l = l << 8 | l >>> 24) >>> 24] << 24 | c[l >>> 16 & 255] << 16 | c[l >>> 8 & 255] << 8 | c[255 & l], l ^= f[a / n | 0] << 24) : n > 6 && a % n == 4 && (l = c[l >>> 24] << 24 | c[l >>> 16 & 255] << 16 | c[l >>> 8 & 255] << 8 | c[255 & l]), d[a] = o = (d[a - n] ^ l) >>> 0);
                                for (s = 0; s < u; s++) a = u - s, l = 3 & s ? d[a] : d[a - 4], h[s] = s < 4 || a <= 4 ? l : v[c[l >>> 24]] ^ p[c[l >>> 16 & 255]] ^ m[c[l >>> 8 & 255]] ^ y[c[255 & l]], h[s] = h[s] >>> 0
                            }
                        }, e.networkToHostOrderSwap = function(t) { return t << 24 | (65280 & t) << 8 | (16711680 & t) >> 8 | t >>> 24 }, e.decrypt = function(t, e, r) {
                            for (var i, n, a, s, o, l, u, d, h, c, f, g, v, p, m = this.keySize + 6, y = this.invKeySchedule, E = this.invSBox, T = this.invSubMix, S = T[0], b = T[1], L = T[2], A = T[3], D = this.uint8ArrayToUint32Array_(r), k = D[0], R = D[1], I = D[2], w = D[3], C = new Int32Array(t), _ = new Int32Array(C.length), P = this.networkToHostOrderSwap; e < C.length;) {
                                for (h = P(C[e]), c = P(C[e + 1]), f = P(C[e + 2]), g = P(C[e + 3]), o = h ^ y[0], l = g ^ y[1], u = f ^ y[2], d = c ^ y[3], v = 4, p = 1; p < m; p++) i = S[o >>> 24] ^ b[l >> 16 & 255] ^ L[u >> 8 & 255] ^ A[255 & d] ^ y[v], n = S[l >>> 24] ^ b[u >> 16 & 255] ^ L[d >> 8 & 255] ^ A[255 & o] ^ y[v + 1], a = S[u >>> 24] ^ b[d >> 16 & 255] ^ L[o >> 8 & 255] ^ A[255 & l] ^ y[v + 2], s = S[d >>> 24] ^ b[o >> 16 & 255] ^ L[l >> 8 & 255] ^ A[255 & u] ^ y[v + 3], o = i, l = n, u = a, d = s, v += 4;
                                i = E[o >>> 24] << 24 ^ E[l >> 16 & 255] << 16 ^ E[u >> 8 & 255] << 8 ^ E[255 & d] ^ y[v], n = E[l >>> 24] << 24 ^ E[u >> 16 & 255] << 16 ^ E[d >> 8 & 255] << 8 ^ E[255 & o] ^ y[v + 1], a = E[u >>> 24] << 24 ^ E[d >> 16 & 255] << 16 ^ E[o >> 8 & 255] << 8 ^ E[255 & l] ^ y[v + 2], s = E[d >>> 24] << 24 ^ E[o >> 16 & 255] << 16 ^ E[l >> 8 & 255] << 8 ^ E[255 & u] ^ y[v + 3], _[e] = P(i ^ k), _[e + 1] = P(s ^ R), _[e + 2] = P(a ^ I), _[e + 3] = P(n ^ w), k = h, R = c, I = f, w = g, e += 4
                            }
                            return _.buffer
                        }, t
                    }(),
                    o = r(93),
                    l = r(63),
                    u = function() {
                        function t(t, e) {
                            var r = (void 0 === e ? {} : e).removePKCS7Padding,
                                i = void 0 === r || r;
                            if (this.logEnabled = !0, this.removePKCS7Padding = void 0, this.subtle = null, this.softwareDecrypter = null, this.key = null, this.fastAesKey = null, this.remainderData = null, this.currentIV = null, this.currentResult = null, this.useSoftware = void 0, this.useSoftware = t.enableSoftwareAES, this.removePKCS7Padding = i, i) try {
                                var n = self.crypto;
                                n && (this.subtle = n.subtle || n.webkitSubtle)
                            } catch (t) {}
                            null === this.subtle && (this.useSoftware = !0)
                        }
                        var e = t.prototype;
                        return e.destroy = function() { this.subtle = null, this.softwareDecrypter = null, this.key = null, this.fastAesKey = null, this.remainderData = null, this.currentIV = null, this.currentResult = null }, e.isSync = function() { return this.useSoftware }, e.flush = function() {
                            var t = this.currentResult,
                                e = this.remainderData;
                            if (!t || e) return this.reset(), null;
                            var r, i, n, s = new Uint8Array(t);
                            return this.reset(), this.removePKCS7Padding ? (n = (i = (r = s).byteLength) && new DataView(r.buffer).getUint8(i - 1)) ? (0, a.sliceUint8)(r, 0, i - n) : r : s
                        }, e.reset = function() { this.currentResult = null, this.currentIV = null, this.remainderData = null, this.softwareDecrypter && (this.softwareDecrypter = null) }, e.decrypt = function(t, e, r) {
                            var i = this;
                            return this.useSoftware ? new Promise((function(n, a) {
                                i.softwareDecrypt(new Uint8Array(t), e, r);
                                var s = i.flush();
                                s ? n(s.buffer) : a(new Error("[softwareDecrypt] Failed to decrypt data"))
                            })) : this.webCryptoDecrypt(new Uint8Array(t), e, r)
                        }, e.softwareDecrypt = function(t, e, r) {
                            var i = this.currentIV,
                                n = this.currentResult,
                                o = this.remainderData;
                            this.logOnce("JS AES decrypt"), o && (t = (0, l.appendUint8Array)(o, t), this.remainderData = null);
                            var u = this.getValidChunk(t);
                            if (!u.length) return null;
                            i && (r = i);
                            var d = this.softwareDecrypter;
                            d || (d = this.softwareDecrypter = new s), d.expandKey(e);
                            var h = n;
                            return this.currentResult = d.decrypt(u.buffer, 0, r), this.currentIV = (0, a.sliceUint8)(u, -16).buffer, h || null
                        }, e.webCryptoDecrypt = function(t, e, r) {
                            var a = this,
                                s = this.subtle;
                            return this.key === e && this.fastAesKey || (this.key = e, this.fastAesKey = new n(s, e)), this.fastAesKey.expandKey().then((function(e) { return s ? (a.logOnce("WebCrypto AES decrypt"), new i(s, new Uint8Array(r)).decrypt(t.buffer, e)) : Promise.reject(new Error("web crypto not initialized")) })).catch((function(i) { return o.logger.warn("[decrypter]: WebCrypto Error, disable WebCrypto API, " + i.name + ": " + i.message), a.onWebCryptoError(t, e, r) }))
                        }, e.onWebCryptoError = function(t, e, r) { this.useSoftware = !0, this.logEnabled = !0, this.softwareDecrypt(t, e, r); var i = this.flush(); if (i) return i.buffer; throw new Error("WebCrypto and softwareDecrypt: failed to decrypt data") }, e.getValidChunk = function(t) {
                            var e = t,
                                r = t.length - t.length % 16;
                            return r !== t.length && (e = (0, a.sliceUint8)(t, 0, r), this.remainderData = (0, a.sliceUint8)(t, r)), e
                        }, e.logOnce = function(t) { this.logEnabled && (o.logger.log("[decrypter]: " + t), this.logEnabled = !1) }, t
                    }()
            },
            181: (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, { canParse: () => l, decodeFrame: () => f, getID3Data: () => s, getID3Frames: () => c, getTimeStamp: () => u, isFooter: () => a, isHeader: () => n, isTimeStampFrame: () => d, testables: () => E, utf8ArrayToStr: () => y });
                var i, n = function(t, e) { return e + 10 <= t.length && 73 === t[e] && 68 === t[e + 1] && 51 === t[e + 2] && t[e + 3] < 255 && t[e + 4] < 255 && t[e + 6] < 128 && t[e + 7] < 128 && t[e + 8] < 128 && t[e + 9] < 128 },
                    a = function(t, e) { return e + 10 <= t.length && 51 === t[e] && 68 === t[e + 1] && 73 === t[e + 2] && t[e + 3] < 255 && t[e + 4] < 255 && t[e + 6] < 128 && t[e + 7] < 128 && t[e + 8] < 128 && t[e + 9] < 128 },
                    s = function(t, e) { for (var r = e, i = 0; n(t, e);) i += 10, i += o(t, e + 6), a(t, e + 10) && (i += 10), e += i; if (i > 0) return t.subarray(r, r + i) },
                    o = function(t, e) { var r = 0; return r = (127 & t[e]) << 21, r |= (127 & t[e + 1]) << 14, (r |= (127 & t[e + 2]) << 7) | 127 & t[e + 3] },
                    l = function(t, e) { return n(t, e) && o(t, e + 6) + 10 <= t.length - e },
                    u = function(t) { for (var e = c(t), r = 0; r < e.length; r++) { var i = e[r]; if (d(i)) return m(i) } },
                    d = function(t) { return t && "PRIV" === t.key && "com.apple.streaming.transportStreamTimestamp" === t.info },
                    h = function(t) {
                        var e = String.fromCharCode(t[0], t[1], t[2], t[3]),
                            r = o(t, 4);
                        return { type: e, size: r, data: t.subarray(10, 10 + r) }
                    },
                    c = function(t) {
                        for (var e = 0, r = []; n(t, e);) {
                            for (var i = o(t, e + 6), s = (e += 10) + i; e + 8 < s;) {
                                var l = h(t.subarray(e)),
                                    u = f(l);
                                u && r.push(u), e += l.size + 10
                            }
                            a(t, e) && (e += 10)
                        }
                        return r
                    },
                    f = function(t) { return "PRIV" === t.type ? g(t) : "W" === t.type[0] ? p(t) : v(t) },
                    g = function(t) {
                        if (!(t.size < 2)) {
                            var e = y(t.data, !0),
                                r = new Uint8Array(t.data.subarray(e.length + 1));
                            return { key: t.type, info: e, data: r.buffer }
                        }
                    },
                    v = function(t) {
                        if (!(t.size < 2)) {
                            if ("TXXX" === t.type) {
                                var e = 1,
                                    r = y(t.data.subarray(e), !0);
                                e += r.length + 1;
                                var i = y(t.data.subarray(e));
                                return { key: t.type, info: r, data: i }
                            }
                            var n = y(t.data.subarray(1));
                            return { key: t.type, data: n }
                        }
                    },
                    p = function(t) {
                        if ("WXXX" === t.type) {
                            if (t.size < 2) return;
                            var e = 1,
                                r = y(t.data.subarray(e), !0);
                            e += r.length + 1;
                            var i = y(t.data.subarray(e));
                            return { key: t.type, info: r, data: i }
                        }
                        var n = y(t.data);
                        return { key: t.type, data: n }
                    },
                    m = function(t) {
                        if (8 === t.data.byteLength) {
                            var e = new Uint8Array(t.data),
                                r = 1 & e[3],
                                i = (e[4] << 23) + (e[5] << 15) + (e[6] << 7) + e[7];
                            return i /= 45, r && (i += 47721858.84), Math.round(i)
                        }
                    },
                    y = function(t, e) {
                        void 0 === e && (e = !1);
                        var r = T();
                        if (r) { var i = r.decode(t); if (e) { var n = i.indexOf("\0"); return -1 !== n ? i.substring(0, n) : i } return i.replace(/\0/g, "") }
                        for (var a, s, o, l = t.length, u = "", d = 0; d < l;) {
                            if (0 === (a = t[d++]) && e) return u;
                            if (0 !== a && 3 !== a) switch (a >> 4) {
                                case 0:
                                case 1:
                                case 2:
                                case 3:
                                case 4:
                                case 5:
                                case 6:
                                case 7:
                                    u += String.fromCharCode(a);
                                    break;
                                case 12:
                                case 13:
                                    s = t[d++], u += String.fromCharCode((31 & a) << 6 | 63 & s);
                                    break;
                                case 14:
                                    s = t[d++], o = t[d++], u += String.fromCharCode((15 & a) << 12 | (63 & s) << 6 | (63 & o) << 0)
                            }
                        }
                        return u
                    },
                    E = { decodeTextFrame: v };

                function T() { return i || void 0 === self.TextDecoder || (i = new self.TextDecoder("utf-8")), i }
            },
            182: (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, { default: () => l });
                var i = r(544),
                    n = r(851),
                    a = r(93),
                    s = r(729),
                    o = r(973);

                function l(t) {
                    var e = new s.EventEmitter,
                        r = function(e, r) { t.postMessage({ event: e, data: r }) };
                    e.on(n.Events.FRAG_DECRYPTED, r), e.on(n.Events.ERROR, r), t.addEventListener("message", (function(s) {
                        var l = s.data;
                        switch (l.cmd) {
                            case "init":
                                var d = JSON.parse(l.config);
                                t.transmuxer = new i.default(e, l.typeSupported, d, l.vendor, l.id), (0, a.enableLogs)(d.debug, l.id),
                                    function() { var t = function(t) { a.logger[t] = function(e) { r("workerLog", { logType: t, message: e }) } }; for (var e in a.logger) t(e) }(), r("init", null);
                                break;
                            case "configure":
                                t.transmuxer.configure(l.config);
                                break;
                            case "demux":
                                var c = t.transmuxer.push(l.data, l.decryptdata, l.chunkMeta, l.state);
                                (0, i.isPromise)(c) ? (t.transmuxer.async = !0, c.then((function(e) { u(t, e) })).catch((function(t) { r(n.Events.ERROR, { type: o.ErrorTypes.MEDIA_ERROR, details: o.ErrorDetails.FRAG_PARSING_ERROR, chunkMeta: l.chunkMeta, fatal: !1, error: t, err: t, reason: "transmuxer-worker push error" }) }))) : (t.transmuxer.async = !1, u(t, c));
                                break;
                            case "flush":
                                var f = l.chunkMeta,
                                    g = t.transmuxer.flush(f);
                                (0, i.isPromise)(g) || t.transmuxer.async ? ((0, i.isPromise)(g) || (g = Promise.resolve(g)), g.then((function(e) { h(t, e, f) })).catch((function(t) { r(n.Events.ERROR, { type: o.ErrorTypes.MEDIA_ERROR, details: o.ErrorDetails.FRAG_PARSING_ERROR, chunkMeta: l.chunkMeta, fatal: !1, error: t, err: t, reason: "transmuxer-worker flush error" }) }))) : h(t, g, f)
                        }
                    }))
                }

                function u(t, e) {
                    if (!((r = e.remuxResult).audio || r.video || r.text || r.id3 || r.initSegment)) return !1;
                    var r, i = [],
                        n = e.remuxResult,
                        a = n.audio,
                        s = n.video;
                    return a && d(i, a), s && d(i, s), t.postMessage({ event: "transmuxComplete", data: e }, i), !0
                }

                function d(t, e) { e.data1 && t.push(e.data1.buffer), e.data2 && t.push(e.data2.buffer) }

                function h(t, e, r) { e.reduce((function(e, r) { return u(t, r) || e }), !1) || t.postMessage({ event: "transmuxComplete", data: e[0] }), t.postMessage({ event: "flush", data: r }) }
            },
            544: (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, { TransmuxConfig: () => st, TransmuxState: () => ot, default: () => it, isPromise: () => at });
                var i = r(851),
                    n = r(973),
                    a = r(21),
                    s = r(965),
                    o = r(181),
                    l = r(856);

                function u(t, e) { return void 0 === t && (t = ""), void 0 === e && (e = 9e4), { type: t, id: -1, pid: -1, inputTimeScale: e, sequenceNumber: -1, samples: [], dropped: 0 } }
                var d = r(63),
                    h = r(145),
                    c = function() {
                        function t() { this._audioTrack = void 0, this._id3Track = void 0, this.frameIndex = 0, this.cachedData = null, this.basePTS = null, this.initPTS = null, this.lastPTS = null }
                        var e = t.prototype;
                        return e.resetInitSegment = function(t, e, r, i) { this._id3Track = { type: "id3", id: 3, pid: -1, inputTimeScale: 9e4, sequenceNumber: 0, samples: [], dropped: 0 } }, e.resetTimeStamp = function(t) { this.initPTS = t, this.resetContiguity() }, e.resetContiguity = function() { this.basePTS = null, this.lastPTS = null, this.frameIndex = 0 }, e.canParse = function(t, e) { return !1 }, e.appendFrame = function(t, e, r) {}, e.demux = function(t, e) {
                            this.cachedData && (t = (0, d.appendUint8Array)(this.cachedData, t), this.cachedData = null);
                            var r, i = o.getID3Data(t, 0),
                                n = i ? i.length : 0,
                                a = this._audioTrack,
                                c = this._id3Track,
                                g = i ? o.getTimeStamp(i) : void 0,
                                v = t.length;
                            for ((null === this.basePTS || 0 === this.frameIndex && (0, s.isFiniteNumber)(g)) && (this.basePTS = f(g, e, this.initPTS), this.lastPTS = this.basePTS), null === this.lastPTS && (this.lastPTS = this.basePTS), i && i.length > 0 && c.samples.push({ pts: this.lastPTS, dts: this.lastPTS, data: i, type: l.MetadataSchema.audioId3, duration: Number.POSITIVE_INFINITY }); n < v;) {
                                if (this.canParse(t, n)) {
                                    var p = this.appendFrame(a, t, n);
                                    p ? (this.frameIndex++, this.lastPTS = p.sample.pts, r = n += p.length) : n = v
                                } else o.canParse(t, n) ? (i = o.getID3Data(t, n), c.samples.push({ pts: this.lastPTS, dts: this.lastPTS, data: i, type: l.MetadataSchema.audioId3, duration: Number.POSITIVE_INFINITY }), r = n += i.length) : n++;
                                if (n === v && r !== v) {
                                    var m = (0, h.sliceUint8)(t, r);
                                    this.cachedData ? this.cachedData = (0, d.appendUint8Array)(this.cachedData, m) : this.cachedData = m
                                }
                            }
                            return { audioTrack: a, videoTrack: u(), id3Track: c, textTrack: u() }
                        }, e.demuxSampleAes = function(t, e, r) { return Promise.reject(new Error("[" + this + "] This demuxer does not support Sample-AES decryption")) }, e.flush = function(t) { var e = this.cachedData; return e && (this.cachedData = null, this.demux(e, 0)), { audioTrack: this._audioTrack, videoTrack: u(), id3Track: this._id3Track, textTrack: u() } }, e.destroy = function() {}, t
                    }(),
                    f = function(t, e, r) { return (0, s.isFiniteNumber)(t) ? 90 * t : 9e4 * e + (r || 0) };
                const g = c;
                var v = r(93);

                function p(t, e) { return 255 === t[e] && 240 == (246 & t[e + 1]) }

                function m(t, e) { return 1 & t[e + 1] ? 7 : 9 }

                function y(t, e) { return (3 & t[e + 3]) << 11 | t[e + 4] << 3 | (224 & t[e + 5]) >>> 5 }

                function E(t, e) { return e + 1 < t.length && p(t, e) }

                function T(t, e) { if (E(t, e)) { var r = m(t, e); if (e + r >= t.length) return !1; var i = y(t, e); if (i <= r) return !1; var n = e + i; return n === t.length || E(t, n) } return !1 }

                function S(t, e, r, a, s) {
                    if (!t.samplerate) {
                        var o = function(t, e, r, a) {
                            var s, o, l, u, d = navigator.userAgent.toLowerCase(),
                                h = a,
                                c = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350];
                            s = 1 + ((192 & e[r + 2]) >>> 6);
                            var f = (60 & e[r + 2]) >>> 2;
                            if (!(f > c.length - 1)) return l = (1 & e[r + 2]) << 2, l |= (192 & e[r + 3]) >>> 6, v.logger.log("manifest codec:" + a + ", ADTS type:" + s + ", samplingIndex:" + f), /firefox/i.test(d) ? f >= 6 ? (s = 5, u = new Array(4), o = f - 3) : (s = 2, u = new Array(2), o = f) : -1 !== d.indexOf("android") ? (s = 2, u = new Array(2), o = f) : (s = 5, u = new Array(4), a && (-1 !== a.indexOf("mp4a.40.29") || -1 !== a.indexOf("mp4a.40.5")) || !a && f >= 6 ? o = f - 3 : ((a && -1 !== a.indexOf("mp4a.40.2") && (f >= 6 && 1 === l || /vivaldi/i.test(d)) || !a && 1 === l) && (s = 2, u = new Array(2)), o = f)), u[0] = s << 3, u[0] |= (14 & f) >> 1, u[1] |= (1 & f) << 7, u[1] |= l << 3, 5 === s && (u[1] |= (14 & o) >> 1, u[2] = (1 & o) << 7, u[2] |= 8, u[3] = 0), { config: u, samplerate: c[f], channelCount: l, codec: "mp4a.40." + s, manifestCodec: h };
                            t.trigger(i.Events.ERROR, { type: n.ErrorTypes.MEDIA_ERROR, details: n.ErrorDetails.FRAG_PARSING_ERROR, fatal: !0, reason: "invalid ADTS sampling index:" + f })
                        }(e, r, a, s);
                        if (!o) return;
                        t.config = o.config, t.samplerate = o.samplerate, t.channelCount = o.channelCount, t.codec = o.codec, t.manifestCodec = o.manifestCodec, v.logger.log("parsed codec:" + t.codec + ", rate:" + o.samplerate + ", channels:" + o.channelCount)
                    }
                }

                function b(t) { return 9216e4 / t }

                function L(t, e, r, i, n) {
                    var a, s = i + n * b(t.samplerate),
                        o = function(t, e) { var r = m(t, e); if (e + r <= t.length) { var i = y(t, e) - r; if (i > 0) return { headerLength: r, frameLength: i } } }(e, r);
                    if (o) {
                        var l = o.frameLength,
                            u = o.headerLength,
                            d = u + l,
                            h = Math.max(0, r + d - e.length);
                        h ? (a = new Uint8Array(d - u)).set(e.subarray(r + u, e.length), 0) : a = e.subarray(r + u, r + d);
                        var c = { unit: a, pts: s };
                        return h || t.samples.push(c), { sample: c, length: d, missing: h }
                    }
                    var f = e.length - r;
                    return (a = new Uint8Array(f)).set(e.subarray(r, e.length), 0), { sample: { unit: a, pts: s }, length: f, missing: -1 }
                }

                function A(t, e) { return A = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) { return t.__proto__ = e, t }, A(t, e) }
                const D = function(t) {
                    var e, r;

                    function i(e, r) { var i; return (i = t.call(this) || this).observer = void 0, i.config = void 0, i.observer = e, i.config = r, i }
                    r = t, (e = i).prototype = Object.create(r.prototype), e.prototype.constructor = e, A(e, r);
                    var n = i.prototype;
                    return n.resetInitSegment = function(e, r, i, n) { t.prototype.resetInitSegment.call(this, e, r, i, n), this._audioTrack = { container: "audio/adts", type: "audio", id: 2, pid: -1, sequenceNumber: 0, segmentCodec: "aac", samples: [], manifestCodec: r, duration: n, inputTimeScale: 9e4, dropped: 0 } }, i.probe = function(t) {
                        if (!t) return !1;
                        for (var e = (o.getID3Data(t, 0) || []).length, r = t.length; e < r; e++)
                            if (T(t, e)) return v.logger.log("ADTS sync word found !"), !0;
                        return !1
                    }, n.canParse = function(t, e) { return function(t, e) { return function(t, e) { return e + 5 < t.length }(t, e) && p(t, e) && y(t, e) <= t.length - e }(t, e) }, n.appendFrame = function(t, e, r) { S(t, this.observer, e, r, t.manifestCodec); var i = L(t, e, r, this.basePTS, this.frameIndex); if (i && 0 === i.missing) return i }, i
                }(g);
                var k = /\/emsg[-/]ID3/i;
                const R = function() {
                    function t(t, e) { this.remainderData = null, this.timeOffset = 0, this.config = void 0, this.videoTrack = void 0, this.audioTrack = void 0, this.id3Track = void 0, this.txtTrack = void 0, this.config = e }
                    var e = t.prototype;
                    return e.resetTimeStamp = function() {}, e.resetInitSegment = function(t, e, r, i) {
                        var n = this.videoTrack = u("video", 1),
                            a = this.audioTrack = u("audio", 1),
                            s = this.txtTrack = u("text", 1);
                        if (this.id3Track = u("id3", 1), this.timeOffset = 0, t && t.byteLength) {
                            var o = (0, d.parseInitSegment)(t);
                            if (o.video) {
                                var l = o.video,
                                    h = l.id,
                                    c = l.timescale,
                                    f = l.codec;
                                n.id = h, n.timescale = s.timescale = c, n.codec = f
                            }
                            if (o.audio) {
                                var g = o.audio,
                                    v = g.id,
                                    p = g.timescale,
                                    m = g.codec;
                                a.id = v, a.timescale = p, a.codec = m
                            }
                            s.id = d.RemuxerTrackIdConfig.text, n.sampleDuration = 0, n.duration = a.duration = i
                        }
                    }, e.resetContiguity = function() {}, t.probe = function(t) { return t = t.length > 16384 ? t.subarray(0, 16384) : t, (0, d.findBox)(t, ["moof"]).length > 0 }, e.demux = function(t, e) {
                        this.timeOffset = e;
                        var r = t,
                            i = this.videoTrack,
                            n = this.txtTrack;
                        if (this.config.progressive) {
                            this.remainderData && (r = (0, d.appendUint8Array)(this.remainderData, t));
                            var a = (0, d.segmentValidRange)(r);
                            this.remainderData = a.remainder, i.samples = a.valid || new Uint8Array
                        } else i.samples = r;
                        var s = this.extractID3Track(i, e);
                        return n.samples = (0, d.parseSamples)(e, i), { videoTrack: i, audioTrack: this.audioTrack, id3Track: s, textTrack: this.txtTrack }
                    }, e.flush = function() {
                        var t = this.timeOffset,
                            e = this.videoTrack,
                            r = this.txtTrack;
                        e.samples = this.remainderData || new Uint8Array, this.remainderData = null;
                        var i = this.extractID3Track(e, this.timeOffset);
                        return r.samples = (0, d.parseSamples)(t, e), { videoTrack: e, audioTrack: u(), id3Track: i, textTrack: u() }
                    }, e.extractID3Track = function(t, e) {
                        var r = this.id3Track;
                        if (t.samples.length) {
                            var i = (0, d.findBox)(t.samples, ["emsg"]);
                            i && i.forEach((function(t) {
                                var i = (0, d.parseEmsg)(t);
                                if (k.test(i.schemeIdUri)) {
                                    var n = (0, s.isFiniteNumber)(i.presentationTime) ? i.presentationTime / i.timeScale : e + i.presentationTimeDelta / i.timeScale,
                                        a = 4294967295 === i.eventDuration ? Number.POSITIVE_INFINITY : i.eventDuration / i.timeScale;
                                    a <= .001 && (a = Number.POSITIVE_INFINITY);
                                    var o = i.payload;
                                    r.samples.push({ data: o, len: o.byteLength, dts: n, pts: n, type: l.MetadataSchema.emsg, duration: a })
                                }
                            }))
                        }
                        return r
                    }, e.demuxSampleAes = function(t, e, r) { return Promise.reject(new Error("The MP4 demuxer does not support SAMPLE-AES decryption")) }, e.destroy = function() {}, t
                }();
                var I = null,
                    w = [32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160],
                    C = [44100, 48e3, 32e3, 22050, 24e3, 16e3, 11025, 12e3, 8e3],
                    _ = [
                        [0, 72, 144, 12],
                        [0, 0, 0, 0],
                        [0, 72, 144, 12],
                        [0, 144, 144, 12]
                    ],
                    P = [0, 1, 1, 4];

                function O(t, e, r, i, n) {
                    if (!(r + 24 > e.length)) {
                        var a = x(e, r);
                        if (a && r + a.frameLength <= e.length) {
                            var s = i + n * (9e4 * a.samplesPerFrame / a.sampleRate),
                                o = { unit: e.subarray(r, r + a.frameLength), pts: s, dts: s };
                            return t.config = [], t.channelCount = a.channelCount, t.samplerate = a.sampleRate, t.samples.push(o), { sample: o, length: a.frameLength, missing: 0 }
                        }
                    }
                }

                function x(t, e) {
                    var r = t[e + 1] >> 3 & 3,
                        i = t[e + 1] >> 1 & 3,
                        n = t[e + 2] >> 4 & 15,
                        a = t[e + 2] >> 2 & 3;
                    if (1 !== r && 0 !== n && 15 !== n && 3 !== a) {
                        var s = t[e + 2] >> 1 & 1,
                            o = t[e + 3] >> 6,
                            l = 1e3 * w[14 * (3 === r ? 3 - i : 3 === i ? 3 : 4) + n - 1],
                            u = C[3 * (3 === r ? 0 : 2 === r ? 1 : 2) + a],
                            d = 3 === o ? 1 : 2,
                            h = _[r][i],
                            c = P[i],
                            f = 8 * h * c,
                            g = Math.floor(h * l / u + s) * c;
                        if (null === I) {
                            var v = (navigator.userAgent || "").match(/Chrome\/(\d+)/i);
                            I = v ? parseInt(v[1]) : 0
                        }
                        return !!I && I <= 87 && 2 === i && l >= 224e3 && 0 === o && (t[e + 3] = 128 | t[e + 3]), { sampleRate: u, channelCount: d, frameLength: g, samplesPerFrame: f }
                    }
                }

                function F(t, e) { return 255 === t[e] && 224 == (224 & t[e + 1]) && 0 != (6 & t[e + 1]) }

                function M(t, e) { return e + 1 < t.length && F(t, e) }

                function N(t, e) {
                    if (e + 1 < t.length && F(t, e)) {
                        var r = x(t, e),
                            i = 4;
                        null != r && r.frameLength && (i = r.frameLength);
                        var n = e + i;
                        return n === t.length || M(t, n)
                    }
                    return !1
                }
                const U = function() {
                        function t(t) { this.data = void 0, this.bytesAvailable = void 0, this.word = void 0, this.bitsAvailable = void 0, this.data = t, this.bytesAvailable = t.byteLength, this.word = 0, this.bitsAvailable = 0 }
                        var e = t.prototype;
                        return e.loadWord = function() {
                            var t = this.data,
                                e = this.bytesAvailable,
                                r = t.byteLength - e,
                                i = new Uint8Array(4),
                                n = Math.min(4, e);
                            if (0 === n) throw new Error("no bytes available");
                            i.set(t.subarray(r, r + n)), this.word = new DataView(i.buffer).getUint32(0), this.bitsAvailable = 8 * n, this.bytesAvailable -= n
                        }, e.skipBits = function(t) {
                            var e;
                            t = Math.min(t, 8 * this.bytesAvailable + this.bitsAvailable), this.bitsAvailable > t ? (this.word <<= t, this.bitsAvailable -= t) : (t -= this.bitsAvailable, t -= (e = t >> 3) << 3, this.bytesAvailable -= e, this.loadWord(), this.word <<= t, this.bitsAvailable -= t)
                        }, e.readBits = function(t) {
                            var e = Math.min(this.bitsAvailable, t),
                                r = this.word >>> 32 - e;
                            if (t > 32 && v.logger.error("Cannot read more than 32 bits at a time"), this.bitsAvailable -= e, this.bitsAvailable > 0) this.word <<= e;
                            else {
                                if (!(this.bytesAvailable > 0)) throw new Error("no bits available");
                                this.loadWord()
                            }
                            return (e = t - e) > 0 && this.bitsAvailable ? r << e | this.readBits(e) : r
                        }, e.skipLZ = function() {
                            var t;
                            for (t = 0; t < this.bitsAvailable; ++t)
                                if (0 != (this.word & 2147483648 >>> t)) return this.word <<= t, this.bitsAvailable -= t, t;
                            return this.loadWord(), t + this.skipLZ()
                        }, e.skipUEG = function() { this.skipBits(1 + this.skipLZ()) }, e.skipEG = function() { this.skipBits(1 + this.skipLZ()) }, e.readUEG = function() { var t = this.skipLZ(); return this.readBits(t + 1) - 1 }, e.readEG = function() { var t = this.readUEG(); return 1 & t ? 1 + t >>> 1 : -1 * (t >>> 1) }, e.readBoolean = function() { return 1 === this.readBits(1) }, e.readUByte = function() { return this.readBits(8) }, e.readUShort = function() { return this.readBits(16) }, e.readUInt = function() { return this.readBits(32) }, e.skipScalingList = function(t) { for (var e = 8, r = 8, i = 0; i < t; i++) 0 !== r && (r = (e + this.readEG() + 256) % 256), e = 0 === r ? e : r }, e.readSPS = function() {
                            var t, e, r, i = 0,
                                n = 0,
                                a = 0,
                                s = 0,
                                o = this.readUByte.bind(this),
                                l = this.readBits.bind(this),
                                u = this.readUEG.bind(this),
                                d = this.readBoolean.bind(this),
                                h = this.skipBits.bind(this),
                                c = this.skipEG.bind(this),
                                f = this.skipUEG.bind(this),
                                g = this.skipScalingList.bind(this);
                            o();
                            var v = o();
                            if (l(5), h(3), o(), f(), 100 === v || 110 === v || 122 === v || 244 === v || 44 === v || 83 === v || 86 === v || 118 === v || 128 === v) {
                                var p = u();
                                if (3 === p && h(1), f(), f(), h(1), d())
                                    for (e = 3 !== p ? 8 : 12, r = 0; r < e; r++) d() && g(r < 6 ? 16 : 64)
                            }
                            f();
                            var m = u();
                            if (0 === m) u();
                            else if (1 === m)
                                for (h(1), c(), c(), t = u(), r = 0; r < t; r++) c();
                            f(), h(1);
                            var y = u(),
                                E = u(),
                                T = l(1);
                            0 === T && h(1), h(1), d() && (i = u(), n = u(), a = u(), s = u());
                            var S = [1, 1];
                            if (d() && d()) switch (o()) {
                                case 1:
                                    S = [1, 1];
                                    break;
                                case 2:
                                    S = [12, 11];
                                    break;
                                case 3:
                                    S = [10, 11];
                                    break;
                                case 4:
                                    S = [16, 11];
                                    break;
                                case 5:
                                    S = [40, 33];
                                    break;
                                case 6:
                                    S = [24, 11];
                                    break;
                                case 7:
                                    S = [20, 11];
                                    break;
                                case 8:
                                    S = [32, 11];
                                    break;
                                case 9:
                                    S = [80, 33];
                                    break;
                                case 10:
                                    S = [18, 11];
                                    break;
                                case 11:
                                    S = [15, 11];
                                    break;
                                case 12:
                                    S = [64, 33];
                                    break;
                                case 13:
                                    S = [160, 99];
                                    break;
                                case 14:
                                    S = [4, 3];
                                    break;
                                case 15:
                                    S = [3, 2];
                                    break;
                                case 16:
                                    S = [2, 1];
                                    break;
                                case 255:
                                    S = [o() << 8 | o(), o() << 8 | o()]
                            }
                            return { width: Math.ceil(16 * (y + 1) - 2 * i - 2 * n), height: (2 - T) * (E + 1) * 16 - (T ? 2 : 4) * (a + s), pixelRatio: S }
                        }, e.readSliceType = function() { return this.readUByte(), this.readUEG(), this.readUEG() }, t
                    }(),
                    B = function() {
                        function t(t, e, r) { this.keyData = void 0, this.decrypter = void 0, this.keyData = r, this.decrypter = new a.default(e, { removePKCS7Padding: !1 }) }
                        var e = t.prototype;
                        return e.decryptBuffer = function(t) { return this.decrypter.decrypt(t, this.keyData.key.buffer, this.keyData.iv.buffer) }, e.decryptAacSample = function(t, e, r) {
                            var i = this,
                                n = t[e].unit;
                            if (!(n.length <= 16)) {
                                var a = n.subarray(16, n.length - n.length % 16),
                                    s = a.buffer.slice(a.byteOffset, a.byteOffset + a.length);
                                this.decryptBuffer(s).then((function(a) {
                                    var s = new Uint8Array(a);
                                    n.set(s, 16), i.decrypter.isSync() || i.decryptAacSamples(t, e + 1, r)
                                }))
                            }
                        }, e.decryptAacSamples = function(t, e, r) { for (;; e++) { if (e >= t.length) return void r(); if (!(t[e].unit.length < 32 || (this.decryptAacSample(t, e, r), this.decrypter.isSync()))) return } }, e.getAvcEncryptedData = function(t) { for (var e = 16 * Math.floor((t.length - 48) / 160) + 16, r = new Int8Array(e), i = 0, n = 32; n < t.length - 16; n += 160, i += 16) r.set(t.subarray(n, n + 16), i); return r }, e.getAvcDecryptedUnit = function(t, e) { for (var r = new Uint8Array(e), i = 0, n = 32; n < t.length - 16; n += 160, i += 16) t.set(r.subarray(i, i + 16), n); return t }, e.decryptAvcSample = function(t, e, r, i, n) {
                            var a = this,
                                s = (0, d.discardEPB)(n.data),
                                o = this.getAvcEncryptedData(s);
                            this.decryptBuffer(o.buffer).then((function(o) { n.data = a.getAvcDecryptedUnit(s, o), a.decrypter.isSync() || a.decryptAvcSamples(t, e, r + 1, i) }))
                        }, e.decryptAvcSamples = function(t, e, r, i) { if (t instanceof Uint8Array) throw new Error("Cannot decrypt samples of type Uint8Array"); for (;; e++, r = 0) { if (e >= t.length) return void i(); for (var n = t[e].units; !(r >= n.length); r++) { var a = n[r]; if (!(a.data.length <= 48 || 1 !== a.type && 5 !== a.type || (this.decryptAvcSample(t, e, r, i, a), this.decrypter.isSync()))) return } } }, t
                    }();

                function G() { return G = Object.assign ? Object.assign.bind() : function(t) { for (var e = 1; e < arguments.length; e++) { var r = arguments[e]; for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]) } return t }, G.apply(this, arguments) }
                var K = 188;

                function H(t, e, r, i) { return { key: t, frame: !1, pts: e, dts: r, units: [], debug: i, length: 0 } }

                function j(t, e) { return ((31 & t[e + 1]) << 8) + t[e + 2] }

                function V(t, e) { return (31 & t[e + 10]) << 8 | t[e + 11] }

                function Y(t, e, r, i) {
                    var n = { audio: -1, avc: -1, id3: -1, segmentCodec: "aac" },
                        a = e + 3 + ((15 & t[e + 1]) << 8 | t[e + 2]) - 4;
                    for (e += 12 + ((15 & t[e + 10]) << 8 | t[e + 11]); e < a;) {
                        var s = j(t, e);
                        switch (t[e]) {
                            case 207:
                                if (!i) { v.logger.log("ADTS AAC with AES-128-CBC frame encryption found in unencrypted stream"); break }
                            case 15:
                                -1 === n.audio && (n.audio = s);
                                break;
                            case 21:
                                -1 === n.id3 && (n.id3 = s);
                                break;
                            case 219:
                                if (!i) { v.logger.log("H.264 with AES-128-CBC slice encryption found in unencrypted stream"); break }
                            case 27:
                                -1 === n.avc && (n.avc = s);
                                break;
                            case 3:
                            case 4:
                                !0 !== r.mpeg && !0 !== r.mp3 ? v.logger.log("MPEG audio found, not supported in this browser") : -1 === n.audio && (n.audio = s, n.segmentCodec = "mp3");
                                break;
                            case 36:
                                v.logger.warn("Unsupported HEVC stream type found")
                        }
                        e += 5 + ((15 & t[e + 3]) << 8 | t[e + 4])
                    }
                    return n
                }

                function W(t) {
                    var e, r, i, n, a, s = 0,
                        o = t.data;
                    if (!t || 0 === t.size) return null;
                    for (; o[0].length < 19 && o.length > 1;) {
                        var l = new Uint8Array(o[0].length + o[1].length);
                        l.set(o[0]), l.set(o[1], o[0].length), o[0] = l, o.splice(1, 1)
                    }
                    if (1 === ((e = o[0])[0] << 16) + (e[1] << 8) + e[2]) {
                        if ((r = (e[4] << 8) + e[5]) && r > t.size - 6) return null;
                        var u = e[7];
                        192 & u && (n = 536870912 * (14 & e[9]) + 4194304 * (255 & e[10]) + 16384 * (254 & e[11]) + 128 * (255 & e[12]) + (254 & e[13]) / 2, 64 & u ? n - (a = 536870912 * (14 & e[14]) + 4194304 * (255 & e[15]) + 16384 * (254 & e[16]) + 128 * (255 & e[17]) + (254 & e[18]) / 2) > 54e5 && (v.logger.warn(Math.round((n - a) / 9e4) + "s delta between PTS and DTS, align them"), n = a) : a = n);
                        var d = (i = e[8]) + 9;
                        if (t.size <= d) return null;
                        t.size -= d;
                        for (var h = new Uint8Array(t.size), c = 0, f = o.length; c < f; c++) {
                            var g = (e = o[c]).byteLength;
                            if (d) {
                                if (d > g) { d -= g; continue }
                                e = e.subarray(d), g -= d, d = 0
                            }
                            h.set(e, s), s += g
                        }
                        return r && (r -= i + 3), { data: h, pts: n, dts: a, len: r }
                    }
                    return null
                }

                function q(t, e) {
                    if (t.units.length && t.frame) {
                        if (void 0 === t.pts) {
                            var r = e.samples,
                                i = r.length;
                            if (!i) return void e.dropped++;
                            var n = r[i - 1];
                            t.pts = n.pts, t.dts = n.dts
                        }
                        e.samples.push(t)
                    }
                    t.debug.length && v.logger.log(t.pts + "/" + t.dts + ":" + t.debug)
                }
                const X = function() {
                    function t(t, e, r) { this.observer = void 0, this.config = void 0, this.typeSupported = void 0, this.sampleAes = null, this.pmtParsed = !1, this.audioCodec = void 0, this.videoCodec = void 0, this._duration = 0, this._pmtId = -1, this._avcTrack = void 0, this._audioTrack = void 0, this._id3Track = void 0, this._txtTrack = void 0, this.aacOverFlow = null, this.avcSample = null, this.remainderData = null, this.observer = t, this.config = e, this.typeSupported = r }
                    t.probe = function(e) { var r = t.syncOffset(e); return r > 0 && v.logger.warn("MPEG2-TS detected but first sync word found @ offset " + r), -1 !== r }, t.syncOffset = function(t) {
                        for (var e = t.length, r = Math.min(940, t.length - K) + 1, i = 0; i < r;) {
                            for (var n = !1, a = i; a < e && 71 === t[a]; a += K)
                                if (n || 0 !== j(t, a) || (n = !0), n && a + K > r) return i;
                            i++
                        }
                        return -1
                    }, t.createTrack = function(t, e) { return { container: "video" === t || "audio" === t ? "video/mp2t" : void 0, type: t, id: d.RemuxerTrackIdConfig[t], pid: -1, inputTimeScale: 9e4, sequenceNumber: 0, samples: [], dropped: 0, duration: "audio" === t ? e : void 0 } };
                    var e = t.prototype;
                    return e.resetInitSegment = function(e, r, i, n) { this.pmtParsed = !1, this._pmtId = -1, this._avcTrack = t.createTrack("video"), this._audioTrack = t.createTrack("audio", n), this._id3Track = t.createTrack("id3"), this._txtTrack = t.createTrack("text"), this._audioTrack.segmentCodec = "aac", this.aacOverFlow = null, this.avcSample = null, this.remainderData = null, this.audioCodec = r, this.videoCodec = i, this._duration = n }, e.resetTimeStamp = function() {}, e.resetContiguity = function() {
                        var t = this._audioTrack,
                            e = this._avcTrack,
                            r = this._id3Track;
                        t && (t.pesData = null), e && (e.pesData = null), r && (r.pesData = null), this.aacOverFlow = null, this.avcSample = null, this.remainderData = null
                    }, e.demux = function(e, r, a, s) {
                        var o;
                        void 0 === a && (a = !1), void 0 === s && (s = !1), a || (this.sampleAes = null);
                        var l = this._avcTrack,
                            u = this._audioTrack,
                            h = this._id3Track,
                            c = this._txtTrack,
                            f = l.pid,
                            g = l.pesData,
                            p = u.pid,
                            m = h.pid,
                            y = u.pesData,
                            E = h.pesData,
                            T = null,
                            S = this.pmtParsed,
                            b = this._pmtId,
                            L = e.length;
                        if (this.remainderData && (L = (e = (0, d.appendUint8Array)(this.remainderData, e)).length, this.remainderData = null), L < K && !s) return this.remainderData = e, { audioTrack: u, videoTrack: l, id3Track: h, textTrack: c };
                        var A = Math.max(0, t.syncOffset(e));
                        (L -= (L - A) % K) < e.byteLength && !s && (this.remainderData = new Uint8Array(e.buffer, L, e.buffer.byteLength - L));
                        for (var D = 0, k = A; k < L; k += K)
                            if (71 === e[k]) {
                                var R = !!(64 & e[k + 1]),
                                    I = j(e, k),
                                    w = void 0;
                                if ((48 & e[k + 3]) >> 4 > 1) { if ((w = k + 5 + e[k + 4]) === k + K) continue } else w = k + 4;
                                switch (I) {
                                    case f:
                                        R && (g && (o = W(g)) && this.parseAVCPES(l, c, o, !1), g = { data: [], size: 0 }), g && (g.data.push(e.subarray(w, k + K)), g.size += k + K - w);
                                        break;
                                    case p:
                                        if (R) {
                                            if (y && (o = W(y))) switch (u.segmentCodec) {
                                                case "aac":
                                                    this.parseAACPES(u, o);
                                                    break;
                                                case "mp3":
                                                    this.parseMPEGPES(u, o)
                                            }
                                            y = { data: [], size: 0 }
                                        }
                                        y && (y.data.push(e.subarray(w, k + K)), y.size += k + K - w);
                                        break;
                                    case m:
                                        R && (E && (o = W(E)) && this.parseID3PES(h, o), E = { data: [], size: 0 }), E && (E.data.push(e.subarray(w, k + K)), E.size += k + K - w);
                                        break;
                                    case 0:
                                        R && (w += e[w] + 1), b = this._pmtId = V(e, w);
                                        break;
                                    case b:
                                        R && (w += e[w] + 1);
                                        var C = Y(e, w, this.typeSupported, a);
                                        (f = C.avc) > 0 && (l.pid = f), (p = C.audio) > 0 && (u.pid = p, u.segmentCodec = C.segmentCodec), (m = C.id3) > 0 && (h.pid = m), null === T || S || (v.logger.warn("MPEG-TS PMT found at " + k + " after unknown PID '" + T + "'. Backtracking to sync byte @" + A + " to parse all TS packets."), T = null, k = A - 188), S = this.pmtParsed = !0;
                                        break;
                                    case 17:
                                    case 8191:
                                        break;
                                    default:
                                        T = I
                                }
                            } else D++;
                        D > 0 && this.observer.emit(i.Events.ERROR, i.Events.ERROR, { type: n.ErrorTypes.MEDIA_ERROR, details: n.ErrorDetails.FRAG_PARSING_ERROR, fatal: !1, reason: "Found " + D + " TS packet/s that do not start with 0x47" }), l.pesData = g, u.pesData = y, h.pesData = E;
                        var _ = { audioTrack: u, videoTrack: l, id3Track: h, textTrack: c };
                        return s && this.extractRemainingSamples(_), _
                    }, e.flush = function() { var t, e = this.remainderData; return this.remainderData = null, t = e ? this.demux(e, -1, !1, !0) : { videoTrack: this._avcTrack, audioTrack: this._audioTrack, id3Track: this._id3Track, textTrack: this._txtTrack }, this.extractRemainingSamples(t), this.sampleAes ? this.decrypt(t, this.sampleAes) : t }, e.extractRemainingSamples = function(t) {
                        var e, r = t.audioTrack,
                            i = t.videoTrack,
                            n = t.id3Track,
                            a = t.textTrack,
                            s = i.pesData,
                            o = r.pesData,
                            l = n.pesData;
                        if (s && (e = W(s)) ? (this.parseAVCPES(i, a, e, !0), i.pesData = null) : i.pesData = s, o && (e = W(o))) {
                            switch (r.segmentCodec) {
                                case "aac":
                                    this.parseAACPES(r, e);
                                    break;
                                case "mp3":
                                    this.parseMPEGPES(r, e)
                            }
                            r.pesData = null
                        } else null != o && o.size && v.logger.log("last AAC PES packet truncated,might overlap between fragments"), r.pesData = o;
                        l && (e = W(l)) ? (this.parseID3PES(n, e), n.pesData = null) : n.pesData = l
                    }, e.demuxSampleAes = function(t, e, r) {
                        var i = this.demux(t, r, !0, !this.config.progressive),
                            n = this.sampleAes = new B(this.observer, this.config, e);
                        return this.decrypt(i, n)
                    }, e.decrypt = function(t, e) {
                        return new Promise((function(r) {
                            var i = t.audioTrack,
                                n = t.videoTrack;
                            i.samples && "aac" === i.segmentCodec ? e.decryptAacSamples(i.samples, 0, (function() { n.samples ? e.decryptAvcSamples(n.samples, 0, 0, (function() { r(t) })) : r(t) })) : n.samples && e.decryptAvcSamples(n.samples, 0, 0, (function() { r(t) }))
                        }))
                    }, e.destroy = function() { this._duration = 0 }, e.parseAVCPES = function(t, e, r, i) {
                        var n, a = this,
                            s = this.parseAVCNALu(t, r.data),
                            o = this.avcSample,
                            l = !1;
                        r.data = null, o && s.length && !t.audFound && (q(o, t), o = this.avcSample = H(!1, r.pts, r.dts, "")), s.forEach((function(i) {
                            switch (i.type) {
                                case 1:
                                    n = !0, o || (o = a.avcSample = H(!0, r.pts, r.dts, "")), o.frame = !0;
                                    var s = i.data;
                                    if (l && s.length > 4) {
                                        var u = new U(s).readSliceType();
                                        2 !== u && 4 !== u && 7 !== u && 9 !== u || (o.key = !0)
                                    }
                                    break;
                                case 5:
                                    n = !0, o || (o = a.avcSample = H(!0, r.pts, r.dts, "")), o.key = !0, o.frame = !0;
                                    break;
                                case 6:
                                    n = !0, (0, d.parseSEIMessageFromNALu)(i.data, 1, r.pts, e.samples);
                                    break;
                                case 7:
                                    if (n = !0, l = !0, !t.sps) {
                                        var h = new U(i.data).readSPS();
                                        t.width = h.width, t.height = h.height, t.pixelRatio = h.pixelRatio, t.sps = [i.data], t.duration = a._duration;
                                        for (var c = i.data.subarray(1, 4), f = "avc1.", g = 0; g < 3; g++) {
                                            var v = c[g].toString(16);
                                            v.length < 2 && (v = "0" + v), f += v
                                        }
                                        t.codec = f
                                    }
                                    break;
                                case 8:
                                    n = !0, t.pps || (t.pps = [i.data]);
                                    break;
                                case 9:
                                    n = !1, t.audFound = !0, o && q(o, t), o = a.avcSample = H(!1, r.pts, r.dts, "");
                                    break;
                                case 12:
                                    n = !0;
                                    break;
                                default:
                                    n = !1, o && (o.debug += "unknown NAL " + i.type + " ")
                            }
                            o && n && o.units.push(i)
                        })), i && o && (q(o, t), this.avcSample = null)
                    }, e.getLastNalUnit = function(t) {
                        var e, r, i = this.avcSample;
                        if (i && 0 !== i.units.length || (i = t[t.length - 1]), null !== (e = i) && void 0 !== e && e.units) {
                            var n = i.units;
                            r = n[n.length - 1]
                        }
                        return r
                    }, e.parseAVCNALu = function(t, e) {
                        var r, i, n = e.byteLength,
                            a = t.naluState || 0,
                            s = a,
                            o = [],
                            l = 0,
                            u = -1,
                            d = 0;
                        for (-1 === a && (u = 0, d = 31 & e[0], a = 0, l = 1); l < n;)
                            if (r = e[l++], a)
                                if (1 !== a)
                                    if (r)
                                        if (1 === r) {
                                            if (u >= 0) {
                                                var h = { data: e.subarray(u, l - a - 1), type: d };
                                                o.push(h)
                                            } else {
                                                var c = this.getLastNalUnit(t.samples);
                                                if (c && (s && l <= 4 - s && c.state && (c.data = c.data.subarray(0, c.data.byteLength - s)), (i = l - a - 1) > 0)) {
                                                    var f = new Uint8Array(c.data.byteLength + i);
                                                    f.set(c.data, 0), f.set(e.subarray(0, i), c.data.byteLength), c.data = f, c.state = 0
                                                }
                                            }
                                            l < n ? (u = l, d = 31 & e[l], a = 0) : a = -1
                                        } else a = 0;
                        else a = 3;
                        else a = r ? 0 : 2;
                        else a = r ? 0 : 1;
                        if (u >= 0 && a >= 0) {
                            var g = { data: e.subarray(u, n), type: d, state: a };
                            o.push(g)
                        }
                        if (0 === o.length) {
                            var v = this.getLastNalUnit(t.samples);
                            if (v) {
                                var p = new Uint8Array(v.data.byteLength + e.byteLength);
                                p.set(v.data, 0), p.set(e, v.data.byteLength), v.data = p
                            }
                        }
                        return t.naluState = a, o
                    }, e.parseAACPES = function(t, e) {
                        var r, a, s, o, l, u = 0,
                            d = this.aacOverFlow,
                            h = e.data;
                        if (d) {
                            this.aacOverFlow = null;
                            var c = d.missing,
                                f = d.sample.unit.byteLength;
                            if (-1 === c) {
                                var g = new Uint8Array(f + h.byteLength);
                                g.set(d.sample.unit, 0), g.set(h, f), h = g
                            } else {
                                var p = f - c;
                                d.sample.unit.set(h.subarray(0, c), p), t.samples.push(d.sample), u = d.missing
                            }
                        }
                        for (r = u, a = h.length; r < a - 1 && !E(h, r); r++);
                        if (r === u || (r < a - 1 ? (s = "AAC PES did not start with ADTS header,offset:" + r, o = !1) : (s = "no ADTS header found in AAC PES", o = !0), v.logger.warn("parsing error:" + s), this.observer.emit(i.Events.ERROR, i.Events.ERROR, { type: n.ErrorTypes.MEDIA_ERROR, details: n.ErrorDetails.FRAG_PARSING_ERROR, fatal: o, reason: s }), !o)) {
                            if (S(t, this.observer, h, r, this.audioCodec), void 0 !== e.pts) l = e.pts;
                            else {
                                if (!d) return void v.logger.warn("[tsdemuxer]: AAC PES unknown PTS");
                                var m = b(t.samplerate);
                                l = d.sample.pts + m
                            }
                            for (var y, T = 0; r < a;) { if (r += (y = L(t, h, r, l, T)).length, y.missing) { this.aacOverFlow = y; break } for (T++; r < a - 1 && !E(h, r); r++); }
                        }
                    }, e.parseMPEGPES = function(t, e) {
                        var r = e.data,
                            i = r.length,
                            n = 0,
                            a = 0,
                            s = e.pts;
                        if (void 0 !== s)
                            for (; a < i;)
                                if (M(r, a)) {
                                    var o = O(t, r, a, s, n);
                                    if (!o) break;
                                    a += o.length, n++
                                } else a++;
                        else v.logger.warn("[tsdemuxer]: MPEG PES unknown PTS")
                    }, e.parseID3PES = function(t, e) {
                        if (void 0 !== e.pts) {
                            var r = G({}, e, { type: this._avcTrack ? l.MetadataSchema.emsg : l.MetadataSchema.audioId3, duration: Number.POSITIVE_INFINITY });
                            t.samples.push(r)
                        } else v.logger.warn("[tsdemuxer]: ID3 PES unknown PTS")
                    }, t
                }();

                function z(t, e) { return z = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) { return t.__proto__ = e, t }, z(t, e) }
                const Q = function(t) {
                    var e, r;

                    function i() { return t.apply(this, arguments) || this }
                    r = t, (e = i).prototype = Object.create(r.prototype), e.prototype.constructor = e, z(e, r);
                    var n = i.prototype;
                    return n.resetInitSegment = function(e, r, i, n) { t.prototype.resetInitSegment.call(this, e, r, i, n), this._audioTrack = { container: "audio/mpeg", type: "audio", id: 2, pid: -1, sequenceNumber: 0, segmentCodec: "mp3", samples: [], manifestCodec: r, duration: n, inputTimeScale: 9e4, dropped: 0 } }, i.probe = function(t) {
                        if (!t) return !1;
                        for (var e = (o.getID3Data(t, 0) || []).length, r = t.length; e < r; e++)
                            if (N(t, e)) return v.logger.log("MPEG Audio sync word found !"), !0;
                        return !1
                    }, n.canParse = function(t, e) { return function(t, e) { return F(t, e) && 4 <= t.length - e }(t, e) }, n.appendFrame = function(t, e, r) { if (null !== this.basePTS) return O(t, e, r, this.basePTS, this.frameIndex) }, i
                }(g);
                var $ = r(524),
                    J = r(923);

                function Z(t, e) { var r = null == t ? void 0 : t.codec; return r && r.length > 4 ? r : "hvc1" === r || "hev1" === r ? "hvc1.1.c.L120.90" : "av01" === r ? "av01.0.04M.08" : "avc1" === r || e === J.ElementaryStreamTypes.VIDEO ? "avc1.42e01e" : "mp4a.40.5" }
                const tt = function() {
                    function t() { this.emitInitSegment = !1, this.audioCodec = void 0, this.videoCodec = void 0, this.initData = void 0, this.initPTS = void 0, this.initTracks = void 0, this.lastEndTime = null }
                    var e = t.prototype;
                    return e.destroy = function() {}, e.resetTimeStamp = function(t) { this.initPTS = t, this.lastEndTime = null }, e.resetNextTimestamp = function() { this.lastEndTime = null }, e.resetInitSegment = function(t, e, r, i) { this.audioCodec = e, this.videoCodec = r, this.generateInitSegment((0, d.patchEncyptionData)(t, i)), this.emitInitSegment = !0 }, e.generateInitSegment = function(t) {
                        var e = this.audioCodec,
                            r = this.videoCodec;
                        if (!t || !t.byteLength) return this.initTracks = void 0, void(this.initData = void 0);
                        var i = this.initData = (0, d.parseInitSegment)(t);
                        e || (e = Z(i.audio, J.ElementaryStreamTypes.AUDIO)), r || (r = Z(i.video, J.ElementaryStreamTypes.VIDEO));
                        var n = {};
                        i.audio && i.video ? n.audiovideo = { container: "video/mp4", codec: e + "," + r, initSegment: t, id: "main" } : i.audio ? n.audio = { container: "audio/mp4", codec: e, initSegment: t, id: "audio" } : i.video ? n.video = { container: "video/mp4", codec: r, initSegment: t, id: "main" } : v.logger.warn("[passthrough-remuxer.ts]: initSegment does not contain moov or trak boxes."), this.initTracks = n
                    }, e.remux = function(t, e, r, i, n) {
                        var a, o = this.initPTS,
                            l = this.lastEndTime,
                            u = { audio: void 0, video: void 0, text: i, id3: r, initSegment: void 0 };
                        (0, s.isFiniteNumber)(l) || (l = this.lastEndTime = n || 0);
                        var h = e.samples;
                        if (!h || !h.length) return u;
                        var c = { initPTS: void 0, timescale: 1 },
                            f = this.initData;
                        if (f && f.length || (this.generateInitSegment(h), f = this.initData), !f || !f.length) return v.logger.warn("[passthrough-remuxer.ts]: Failed to generate initSegment."), u;
                        this.emitInitSegment && (c.tracks = this.initTracks, this.emitInitSegment = !1);
                        var g = (0, d.getStartDTS)(f, h);
                        (0, s.isFiniteNumber)(o) || (this.initPTS = c.initPTS = o = g - n);
                        var p = (0, d.getDuration)(h, f),
                            m = t ? g - o : l,
                            y = m + p;
                        (0, d.offsetStartDTS)(f, h, o), p > 0 ? this.lastEndTime = y : (v.logger.warn("Duration parsed from mp4 should be greater than zero"), this.resetNextTimestamp());
                        var E = !!f.audio,
                            T = !!f.video,
                            S = "";
                        E && (S += "audio"), T && (S += "video");
                        var b = { data1: h, startPTS: m, startDTS: m, endPTS: y, endDTS: y, type: S, hasAudio: E, hasVideo: T, nb: 1, dropped: 0 };
                        u.audio = "audio" === b.type ? b : void 0, u.video = "audio" !== b.type ? b : void 0, u.initSegment = c;
                        var L = null != (a = this.initPTS) ? a : 0;
                        return u.id3 = (0, $.flushTextTrackMetadataCueSamples)(r, n, L, L), i.samples.length && (u.text = (0, $.flushTextTrackUserdataCueSamples)(i, n, L)), u
                    }, t
                }();
                var et;
                try { et = self.performance.now.bind(self.performance) } catch (t) { v.logger.debug("Unable to use Performance API on this environment"), et = self.Date.now }
                var rt = [{ demux: R, remux: tt }, { demux: X, remux: $.default }, { demux: D, remux: $.default }, { demux: Q, remux: $.default }],
                    it = function() {
                        function t(t, e, r, i, n) { this.async = !1, this.observer = void 0, this.typeSupported = void 0, this.config = void 0, this.vendor = void 0, this.id = void 0, this.demuxer = void 0, this.remuxer = void 0, this.decrypter = void 0, this.probe = void 0, this.decryptionPromise = null, this.transmuxConfig = void 0, this.currentTransmuxState = void 0, this.observer = t, this.typeSupported = e, this.config = r, this.vendor = i, this.id = n }
                        var e = t.prototype;
                        return e.configure = function(t) { this.transmuxConfig = t, this.decrypter && this.decrypter.reset() }, e.push = function(t, e, r, i) {
                            var n = this,
                                a = r.transmuxing;
                            a.executeStart = et();
                            var s = new Uint8Array(t),
                                o = this.currentTransmuxState,
                                l = this.transmuxConfig;
                            i && (this.currentTransmuxState = i);
                            var u = i || o,
                                d = u.contiguous,
                                h = u.discontinuity,
                                c = u.trackSwitch,
                                f = u.accurateTimeOffset,
                                g = u.timeOffset,
                                v = u.initSegmentChange,
                                p = l.audioCodec,
                                m = l.videoCodec,
                                y = l.defaultInitPts,
                                E = l.duration,
                                T = l.initSegmentData,
                                S = function(t, e) { var r = null; return t.byteLength > 0 && null != e && null != e.key && null !== e.iv && null != e.method && (r = e), r }(s, e);
                            if (S && "AES-128" === S.method) {
                                var b = this.getDecrypter();
                                if (!b.isSync()) return this.decryptionPromise = b.webCryptoDecrypt(s, S.key.buffer, S.iv.buffer).then((function(t) { var e = n.push(t, null, r); return n.decryptionPromise = null, e })), this.decryptionPromise;
                                var L = b.softwareDecrypt(s, S.key.buffer, S.iv.buffer);
                                if (r.part > -1 && (L = b.flush()), !L) return a.executeEnd = et(), nt(r);
                                s = new Uint8Array(L)
                            }
                            var A = this.needsProbing(h, c);
                            A && this.configureTransmuxer(s), (h || c || v || A) && this.resetInitSegment(T, p, m, E, e), (h || v || A) && this.resetInitialTimestamp(y), d || this.resetContiguity();
                            var D = this.transmux(s, S, g, f, r),
                                k = this.currentTransmuxState;
                            return k.contiguous = !0, k.discontinuity = !1, k.trackSwitch = !1, a.executeEnd = et(), D
                        }, e.flush = function(t) {
                            var e = this,
                                r = t.transmuxing;
                            r.executeStart = et();
                            var a = this.decrypter,
                                s = this.currentTransmuxState,
                                o = this.decryptionPromise;
                            if (o) return o.then((function() { return e.flush(t) }));
                            var l = [],
                                u = s.timeOffset;
                            if (a) {
                                var d = a.flush();
                                d && l.push(this.push(d, null, t))
                            }
                            var h = this.demuxer,
                                c = this.remuxer;
                            if (!h || !c) return this.observer.emit(i.Events.ERROR, i.Events.ERROR, { type: n.ErrorTypes.MEDIA_ERROR, details: n.ErrorDetails.FRAG_PARSING_ERROR, fatal: !0, reason: "no demux matching with content found" }), r.executeEnd = et(), [nt(t)];
                            var f = h.flush(u);
                            return at(f) ? f.then((function(r) { return e.flushRemux(l, r, t), l })) : (this.flushRemux(l, f, t), l)
                        }, e.flushRemux = function(t, e, r) {
                            var i = e.audioTrack,
                                n = e.videoTrack,
                                a = e.id3Track,
                                s = e.textTrack,
                                o = this.currentTransmuxState,
                                l = o.accurateTimeOffset,
                                u = o.timeOffset;
                            v.logger.log("[transmuxer.ts]: Flushed fragment " + r.sn + (r.part > -1 ? " p: " + r.part : "") + " of level " + r.level);
                            var d = this.remuxer.remux(i, n, a, s, u, l, !0, this.id);
                            t.push({ remuxResult: d, chunkMeta: r }), r.transmuxing.executeEnd = et()
                        }, e.resetInitialTimestamp = function(t) {
                            var e = this.demuxer,
                                r = this.remuxer;
                            e && r && (e.resetTimeStamp(t), r.resetTimeStamp(t))
                        }, e.resetContiguity = function() {
                            var t = this.demuxer,
                                e = this.remuxer;
                            t && e && (t.resetContiguity(), e.resetNextTimestamp())
                        }, e.resetInitSegment = function(t, e, r, i, n) {
                            var a = this.demuxer,
                                s = this.remuxer;
                            a && s && (a.resetInitSegment(t, e, r, i), s.resetInitSegment(t, e, r, n))
                        }, e.destroy = function() { this.demuxer && (this.demuxer.destroy(), this.demuxer = void 0), this.remuxer && (this.remuxer.destroy(), this.remuxer = void 0) }, e.transmux = function(t, e, r, i, n) { return e && "SAMPLE-AES" === e.method ? this.transmuxSampleAes(t, e, r, i, n) : this.transmuxUnencrypted(t, r, i, n) }, e.transmuxUnencrypted = function(t, e, r, i) {
                            var n = this.demuxer.demux(t, e, !1, !this.config.progressive),
                                a = n.audioTrack,
                                s = n.videoTrack,
                                o = n.id3Track,
                                l = n.textTrack;
                            return { remuxResult: this.remuxer.remux(a, s, o, l, e, r, !1, this.id), chunkMeta: i }
                        }, e.transmuxSampleAes = function(t, e, r, i, n) { var a = this; return this.demuxer.demuxSampleAes(t, e, r).then((function(t) { return { remuxResult: a.remuxer.remux(t.audioTrack, t.videoTrack, t.id3Track, t.textTrack, r, i, !1, a.id), chunkMeta: n } })) }, e.configureTransmuxer = function(t) {
                            for (var e, r = this.config, i = this.observer, n = this.typeSupported, a = this.vendor, s = 0, o = rt.length; s < o; s++)
                                if (rt[s].demux.probe(t)) { e = rt[s]; break }
                            e || (v.logger.warn("Failed to find demuxer by probing frag, treating as mp4 passthrough"), e = { demux: R, remux: tt });
                            var l = this.demuxer,
                                u = this.remuxer,
                                d = e.remux,
                                h = e.demux;
                            u && u instanceof d || (this.remuxer = new d(i, r, n, a)), l && l instanceof h || (this.demuxer = new h(i, r, n), this.probe = h.probe)
                        }, e.needsProbing = function(t, e) { return !this.demuxer || !this.remuxer || t || e }, e.getDecrypter = function() { var t = this.decrypter; return t || (t = this.decrypter = new a.default(this.config)), t }, t
                    }(),
                    nt = function(t) { return { remuxResult: {}, chunkMeta: t } };

                function at(t) { return "then" in t && t.then instanceof Function }
                var st = function(t, e, r, i, n) { this.audioCodec = void 0, this.videoCodec = void 0, this.initSegmentData = void 0, this.duration = void 0, this.defaultInitPts = void 0, this.audioCodec = t, this.videoCodec = e, this.initSegmentData = r, this.duration = i, this.defaultInitPts = n },
                    ot = function(t, e, r, i, n, a) { this.discontinuity = void 0, this.contiguous = void 0, this.accurateTimeOffset = void 0, this.trackSwitch = void 0, this.timeOffset = void 0, this.initSegmentChange = void 0, this.discontinuity = t, this.contiguous = e, this.accurateTimeOffset = r, this.trackSwitch = i, this.timeOffset = n, this.initSegmentChange = a }
            },
            973: (t, e, r) => {
                "use strict";
                var i, n;
                r.r(e), r.d(e, { ErrorDetails: () => n, ErrorTypes: () => i }),
                    function(t) { t.NETWORK_ERROR = "networkError", t.MEDIA_ERROR = "mediaError", t.KEY_SYSTEM_ERROR = "keySystemError", t.MUX_ERROR = "muxError", t.OTHER_ERROR = "otherError" }(i || (i = {})),
                    function(t) { t.KEY_SYSTEM_NO_KEYS = "keySystemNoKeys", t.KEY_SYSTEM_NO_ACCESS = "keySystemNoAccess", t.KEY_SYSTEM_NO_SESSION = "keySystemNoSession", t.KEY_SYSTEM_NO_CONFIGURED_LICENSE = "keySystemNoConfiguredLicense", t.KEY_SYSTEM_LICENSE_REQUEST_FAILED = "keySystemLicenseRequestFailed", t.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED = "keySystemServerCertificateRequestFailed", t.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED = "keySystemServerCertificateUpdateFailed", t.KEY_SYSTEM_SESSION_UPDATE_FAILED = "keySystemSessionUpdateFailed", t.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED = "keySystemStatusOutputRestricted", t.KEY_SYSTEM_STATUS_INTERNAL_ERROR = "keySystemStatusInternalError", t.MANIFEST_LOAD_ERROR = "manifestLoadError", t.MANIFEST_LOAD_TIMEOUT = "manifestLoadTimeOut", t.MANIFEST_PARSING_ERROR = "manifestParsingError", t.MANIFEST_INCOMPATIBLE_CODECS_ERROR = "manifestIncompatibleCodecsError", t.LEVEL_EMPTY_ERROR = "levelEmptyError", t.LEVEL_LOAD_ERROR = "levelLoadError", t.LEVEL_LOAD_TIMEOUT = "levelLoadTimeOut", t.LEVEL_SWITCH_ERROR = "levelSwitchError", t.AUDIO_TRACK_LOAD_ERROR = "audioTrackLoadError", t.AUDIO_TRACK_LOAD_TIMEOUT = "audioTrackLoadTimeOut", t.SUBTITLE_LOAD_ERROR = "subtitleTrackLoadError", t.SUBTITLE_TRACK_LOAD_TIMEOUT = "subtitleTrackLoadTimeOut", t.FRAG_LOAD_ERROR = "fragLoadError", t.FRAG_LOAD_TIMEOUT = "fragLoadTimeOut", t.FRAG_DECRYPT_ERROR = "fragDecryptError", t.FRAG_PARSING_ERROR = "fragParsingError", t.REMUX_ALLOC_ERROR = "remuxAllocError", t.KEY_LOAD_ERROR = "keyLoadError", t.KEY_LOAD_TIMEOUT = "keyLoadTimeOut", t.BUFFER_ADD_CODEC_ERROR = "bufferAddCodecError", t.BUFFER_INCOMPATIBLE_CODECS_ERROR = "bufferIncompatibleCodecsError", t.BUFFER_APPEND_ERROR = "bufferAppendError", t.BUFFER_APPENDING_ERROR = "bufferAppendingError", t.BUFFER_STALLED_ERROR = "bufferStalledError", t.BUFFER_FULL_ERROR = "bufferFullError", t.BUFFER_SEEK_OVER_HOLE = "bufferSeekOverHole", t.BUFFER_NUDGE_ON_STALL = "bufferNudgeOnStall", t.INTERNAL_EXCEPTION = "internalException", t.INTERNAL_ABORTED = "aborted", t.UNKNOWN = "unknown" }(n || (n = {}))
            },
            851: (t, e, r) => {
                "use strict";
                var i;
                r.r(e), r.d(e, { Events: () => i }),
                    function(t) { t.MEDIA_ATTACHING = "hlsMediaAttaching", t.MEDIA_ATTACHED = "hlsMediaAttached", t.MEDIA_DETACHING = "hlsMediaDetaching", t.MEDIA_DETACHED = "hlsMediaDetached", t.BUFFER_RESET = "hlsBufferReset", t.BUFFER_CODECS = "hlsBufferCodecs", t.BUFFER_CREATED = "hlsBufferCreated", t.BUFFER_APPENDING = "hlsBufferAppending", t.BUFFER_APPENDED = "hlsBufferAppended", t.BUFFER_EOS = "hlsBufferEos", t.BUFFER_FLUSHING = "hlsBufferFlushing", t.BUFFER_FLUSHED = "hlsBufferFlushed", t.MANIFEST_LOADING = "hlsManifestLoading", t.MANIFEST_LOADED = "hlsManifestLoaded", t.MANIFEST_PARSED = "hlsManifestParsed", t.LEVEL_SWITCHING = "hlsLevelSwitching", t.LEVEL_SWITCHED = "hlsLevelSwitched", t.LEVEL_LOADING = "hlsLevelLoading", t.LEVEL_LOADED = "hlsLevelLoaded", t.LEVEL_UPDATED = "hlsLevelUpdated", t.LEVEL_PTS_UPDATED = "hlsLevelPtsUpdated", t.LEVELS_UPDATED = "hlsLevelsUpdated", t.AUDIO_TRACKS_UPDATED = "hlsAudioTracksUpdated", t.AUDIO_TRACK_SWITCHING = "hlsAudioTrackSwitching", t.AUDIO_TRACK_SWITCHED = "hlsAudioTrackSwitched", t.AUDIO_TRACK_LOADING = "hlsAudioTrackLoading", t.AUDIO_TRACK_LOADED = "hlsAudioTrackLoaded", t.SUBTITLE_TRACKS_UPDATED = "hlsSubtitleTracksUpdated", t.SUBTITLE_TRACKS_CLEARED = "hlsSubtitleTracksCleared", t.SUBTITLE_TRACK_SWITCH = "hlsSubtitleTrackSwitch", t.SUBTITLE_TRACK_LOADING = "hlsSubtitleTrackLoading", t.SUBTITLE_TRACK_LOADED = "hlsSubtitleTrackLoaded", t.SUBTITLE_FRAG_PROCESSED = "hlsSubtitleFragProcessed", t.CUES_PARSED = "hlsCuesParsed", t.NON_NATIVE_TEXT_TRACKS_FOUND = "hlsNonNativeTextTracksFound", t.INIT_PTS_FOUND = "hlsInitPtsFound", t.FRAG_LOADING = "hlsFragLoading", t.FRAG_LOAD_EMERGENCY_ABORTED = "hlsFragLoadEmergencyAborted", t.FRAG_LOADED = "hlsFragLoaded", t.FRAG_DECRYPTED = "hlsFragDecrypted", t.FRAG_PARSING_INIT_SEGMENT = "hlsFragParsingInitSegment", t.FRAG_PARSING_USERDATA = "hlsFragParsingUserdata", t.FRAG_PARSING_METADATA = "hlsFragParsingMetadata", t.FRAG_PARSED = "hlsFragParsed", t.FRAG_BUFFERED = "hlsFragBuffered", t.FRAG_CHANGED = "hlsFragChanged", t.FPS_DROP = "hlsFpsDrop", t.FPS_DROP_LEVEL_CAPPING = "hlsFpsDropLevelCapping", t.ERROR = "hlsError", t.DESTROYING = "hlsDestroying", t.KEY_LOADING = "hlsKeyLoading", t.KEY_LOADED = "hlsKeyLoaded", t.LIVE_BACK_BUFFER_REACHED = "hlsLiveBackBufferReached", t.BACK_BUFFER_REACHED = "hlsBackBufferReached" }(i || (i = {}))
            },
            76: (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, { default: () => Bi });
                var i, n = r(945),
                    a = r(965),
                    s = r(851),
                    o = r(973),
                    l = r(93),
                    u = /^(\d+)x(\d+)$/,
                    d = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g,
                    h = function() {
                        function t(e) { for (var r in "string" == typeof e && (e = t.parseAttrList(e)), e) e.hasOwnProperty(r) && (this[r] = e[r]) }
                        var e = t.prototype;
                        return e.decimalInteger = function(t) { var e = parseInt(this[t], 10); return e > Number.MAX_SAFE_INTEGER ? 1 / 0 : e }, e.hexadecimalInteger = function(t) {
                            if (this[t]) {
                                var e = (this[t] || "0x").slice(2);
                                e = (1 & e.length ? "0" : "") + e;
                                for (var r = new Uint8Array(e.length / 2), i = 0; i < e.length / 2; i++) r[i] = parseInt(e.slice(2 * i, 2 * i + 2), 16);
                                return r
                            }
                            return null
                        }, e.hexadecimalIntegerAsNumber = function(t) { var e = parseInt(this[t], 16); return e > Number.MAX_SAFE_INTEGER ? 1 / 0 : e }, e.decimalFloatingPoint = function(t) { return parseFloat(this[t]) }, e.optionalFloat = function(t, e) { var r = this[t]; return r ? parseFloat(r) : e }, e.enumeratedString = function(t) { return this[t] }, e.bool = function(t) { return "YES" === this[t] }, e.decimalResolution = function(t) { var e = u.exec(this[t]); if (null !== e) return { width: parseInt(e[1], 10), height: parseInt(e[2], 10) } }, t.parseAttrList = function(t) {
                            var e, r = {};
                            for (d.lastIndex = 0; null !== (e = d.exec(t));) {
                                var i = e[2];
                                0 === i.indexOf('"') && i.lastIndexOf('"') === i.length - 1 && (i = i.slice(1, -1)), r[e[1]] = i
                            }
                            return r
                        }, t
                    }();

                function c() { return c = Object.assign ? Object.assign.bind() : function(t) { for (var e = 1; e < arguments.length; e++) { var r = arguments[e]; for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]) } return t }, c.apply(this, arguments) }

                function f(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var i = e[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, (void 0, "symbol" == typeof(n = function(t, e) { if ("object" != typeof t || null === t) return t; var r = t[Symbol.toPrimitive]; if (void 0 !== r) { var i = r.call(t, e); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value.") } return String(t) }(i.key, "string")) ? n : String(n)), i)
                    }
                    var n
                }! function(t) { t.ID = "ID", t.CLASS = "CLASS", t.START_DATE = "START-DATE", t.DURATION = "DURATION", t.END_DATE = "END-DATE", t.END_ON_NEXT = "END-ON-NEXT", t.PLANNED_DURATION = "PLANNED-DURATION", t.SCTE35_OUT = "SCTE35-OUT", t.SCTE35_IN = "SCTE35-IN" }(i || (i = {}));
                var g = function() {
                        function t(t, e) {
                            if (this.attr = void 0, this._startDate = void 0, this._endDate = void 0, this._badValueForSameId = void 0, e) {
                                var r = e.attr;
                                for (var n in r)
                                    if (Object.prototype.hasOwnProperty.call(t, n) && t[n] !== r[n]) { l.logger.warn('DATERANGE tag attribute: "' + n + '" does not match for tags with ID: "' + t.ID + '"'), this._badValueForSameId = n; break }
                                t = c(new h({}), r, t)
                            }
                            if (this.attr = t, this._startDate = new Date(t[i.START_DATE]), i.END_DATE in this.attr) {
                                var s = new Date(this.attr[i.END_DATE]);
                                (0, a.isFiniteNumber)(s.getTime()) && (this._endDate = s)
                            }
                        }
                        var e, r;
                        return e = t, (r = [{ key: "id", get: function() { return this.attr.ID } }, { key: "class", get: function() { return this.attr.CLASS } }, { key: "startDate", get: function() { return this._startDate } }, { key: "endDate", get: function() { if (this._endDate) return this._endDate; var t = this.duration; return null !== t ? new Date(this._startDate.getTime() + 1e3 * t) : null } }, { key: "duration", get: function() { if (i.DURATION in this.attr) { var t = this.attr.decimalFloatingPoint(i.DURATION); if ((0, a.isFiniteNumber)(t)) return t } else if (this._endDate) return (this._endDate.getTime() - this._startDate.getTime()) / 1e3; return null } }, { key: "plannedDuration", get: function() { return i.PLANNED_DURATION in this.attr ? this.attr.decimalFloatingPoint(i.PLANNED_DURATION) : null } }, { key: "endOnNext", get: function() { return this.attr.bool(i.END_ON_NEXT) } }, { key: "isValid", get: function() { return !!this.id && !this._badValueForSameId && (0, a.isFiniteNumber)(this.startDate.getTime()) && (null === this.duration || this.duration >= 0) && (!this.endOnNext || !!this.class) } }]) && f(e.prototype, r), Object.defineProperty(e, "prototype", { writable: !1 }), t
                    }(),
                    v = r(923);

                function p(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var i = e[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, (void 0, "symbol" == typeof(n = function(t, e) { if ("object" != typeof t || null === t) return t; var r = t[Symbol.toPrimitive]; if (void 0 !== r) { var i = r.call(t, e); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value.") } return String(t) }(i.key, "string")) ? n : String(n)), i)
                    }
                    var n
                }
                var m, y, E, T = function() {
                    function t(t) { this.PTSKnown = !1, this.alignedSliding = !1, this.averagetargetduration = void 0, this.endCC = 0, this.endSN = 0, this.fragments = void 0, this.fragmentHint = void 0, this.partList = null, this.dateRanges = void 0, this.live = !0, this.ageHeader = 0, this.advancedDateTime = void 0, this.updated = !0, this.advanced = !0, this.availabilityDelay = void 0, this.misses = 0, this.startCC = 0, this.startSN = 0, this.startTimeOffset = null, this.targetduration = 0, this.totalduration = 0, this.type = null, this.url = void 0, this.m3u8 = "", this.version = null, this.canBlockReload = !1, this.canSkipUntil = 0, this.canSkipDateRanges = !1, this.skippedSegments = 0, this.recentlyRemovedDateranges = void 0, this.partHoldBack = 0, this.holdBack = 0, this.partTarget = 0, this.preloadHint = void 0, this.renditionReports = void 0, this.tuneInGoal = 0, this.deltaUpdateFailed = void 0, this.driftStartTime = 0, this.driftEndTime = 0, this.driftStart = 0, this.driftEnd = 0, this.encryptedFragments = void 0, this.fragments = [], this.encryptedFragments = [], this.dateRanges = {}, this.url = t }
                    var e, r;
                    return t.prototype.reloaded = function(t) {
                        if (!t) return this.advanced = !0, void(this.updated = !0);
                        var e = this.lastPartSn - t.lastPartSn,
                            r = this.lastPartIndex - t.lastPartIndex;
                        this.updated = this.endSN !== t.endSN || !!r || !!e, this.advanced = this.endSN > t.endSN || e > 0 || 0 === e && r > 0, this.updated || this.advanced ? this.misses = Math.floor(.6 * t.misses) : this.misses = t.misses + 1, this.availabilityDelay = t.availabilityDelay
                    }, e = t, (r = [{ key: "hasProgramDateTime", get: function() { return !!this.fragments.length && (0, a.isFiniteNumber)(this.fragments[this.fragments.length - 1].programDateTime) } }, { key: "levelTargetDuration", get: function() { return this.averagetargetduration || this.targetduration || 10 } }, { key: "drift", get: function() { var t = this.driftEndTime - this.driftStartTime; return t > 0 ? 1e3 * (this.driftEnd - this.driftStart) / t : 1 } }, { key: "edge", get: function() { return this.partEnd || this.fragmentEnd } }, { key: "partEnd", get: function() { var t; return null !== (t = this.partList) && void 0 !== t && t.length ? this.partList[this.partList.length - 1].end : this.fragmentEnd } }, { key: "fragmentEnd", get: function() { var t; return null !== (t = this.fragments) && void 0 !== t && t.length ? this.fragments[this.fragments.length - 1].end : 0 } }, { key: "age", get: function() { return this.advancedDateTime ? Math.max(Date.now() - this.advancedDateTime, 0) / 1e3 : 0 } }, { key: "lastPartIndex", get: function() { var t; return null !== (t = this.partList) && void 0 !== t && t.length ? this.partList[this.partList.length - 1].index : -1 } }, { key: "lastPartSn", get: function() { var t; return null !== (t = this.partList) && void 0 !== t && t.length ? this.partList[this.partList.length - 1].fragment.sn : this.endSN } }]) && p(e.prototype, r), Object.defineProperty(e, "prototype", { writable: !1 }), t
                }();

                function S(t) { return Uint8Array.from(atob(t), (function(t) { return t.charCodeAt(0) })) }

                function b(t) { return Uint8Array.from(unescape(encodeURIComponent(t)), (function(t) { return t.charCodeAt(0) })) }

                function L(t) {
                    switch (t) {
                        case y.FAIRPLAY:
                            return m.FAIRPLAY;
                        case y.PLAYREADY:
                            return m.PLAYREADY;
                        case y.WIDEVINE:
                            return m.WIDEVINE;
                        case y.CLEARKEY:
                            return m.CLEARKEY
                    }
                }

                function A(t) {
                    switch (t) {
                        case m.FAIRPLAY:
                            return y.FAIRPLAY;
                        case m.PLAYREADY:
                            return y.PLAYREADY;
                        case m.WIDEVINE:
                            return y.WIDEVINE;
                        case m.CLEARKEY:
                            return y.CLEARKEY
                    }
                }

                function D(t) {
                    var e = t.drmSystems,
                        r = t.widevineLicenseUrl,
                        i = e ? [m.FAIRPLAY, m.WIDEVINE, m.PLAYREADY, m.CLEARKEY].filter((function(t) { return !!e[t] })) : [];
                    return !i[m.WIDEVINE] && r && i.push(m.WIDEVINE), i
                }! function(t) { t.CLEARKEY = "org.w3.clearkey", t.FAIRPLAY = "com.apple.fps", t.PLAYREADY = "com.microsoft.playready", t.WIDEVINE = "com.widevine.alpha" }(m || (m = {})),
                function(t) { t.CLEARKEY = "org.w3.clearkey", t.FAIRPLAY = "com.apple.streamingkeydelivery", t.PLAYREADY = "com.microsoft.playready", t.WIDEVINE = "urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed" }(y || (y = {})),
                function(t) { t.WIDEVINE = "edef8ba979d64acea3c827dcd51d21ed" }(E || (E = {}));
                var k = "undefined" != typeof self && self.navigator && self.navigator.requestMediaKeySystemAccess ? self.navigator.requestMediaKeySystemAccess.bind(self.navigator) : null,
                    R = r(63),
                    I = {},
                    w = function() {
                        function t(t, e, r, i, n) { void 0 === i && (i = [1]), void 0 === n && (n = null), this.uri = void 0, this.method = void 0, this.keyFormat = void 0, this.keyFormatVersions = void 0, this.encrypted = void 0, this.isCommonEncryption = void 0, this.iv = null, this.key = null, this.keyId = null, this.pssh = null, this.method = t, this.uri = e, this.keyFormat = r, this.keyFormatVersions = i, this.iv = n, this.encrypted = !!t && "NONE" !== t, this.isCommonEncryption = this.encrypted && "AES-128" !== t }
                        t.clearKeyUriToKeyIdMap = function() { I = {} };
                        var e = t.prototype;
                        return e.isSupported = function() {
                            if (this.method) {
                                if ("AES-128" === this.method || "NONE" === this.method) return !0;
                                switch (this.keyFormat) {
                                    case "identity":
                                        return "SAMPLE-AES" === this.method;
                                    case y.FAIRPLAY:
                                    case y.WIDEVINE:
                                    case y.PLAYREADY:
                                    case y.CLEARKEY:
                                        return -1 !== ["ISO-23001-7", "SAMPLE-AES", "SAMPLE-AES-CENC", "SAMPLE-AES-CTR"].indexOf(this.method)
                                }
                            }
                            return !1
                        }, e.getDecryptData = function(e) {
                            if (!this.encrypted || !this.uri) return null;
                            if ("AES-128" === this.method && this.uri && !this.iv) { "number" != typeof e && ("AES-128" !== this.method || this.iv || l.logger.warn('missing IV for initialization segment with method="' + this.method + '" - compliance issue'), e = 0); var r = function(t) { for (var e = new Uint8Array(16), r = 12; r < 16; r++) e[r] = t >> 8 * (15 - r) & 255; return e }(e); return new t(this.method, this.uri, "identity", this.keyFormatVersions, r) }
                            var i = function(t) {
                                var e, r, i = t.split(":"),
                                    n = null;
                                if ("data" === i[0] && 2 === i.length) {
                                    var a = i[1].split(";"),
                                        s = a[a.length - 1].split(",");
                                    if (2 === s.length) {
                                        var o = "base64" === s[0],
                                            l = s[1];
                                        o ? (a.splice(-1, 1), n = S(l)) : (e = b(l).subarray(0, 16), (r = new Uint8Array(16)).set(e, 16 - e.length), n = r)
                                    }
                                }
                                return n
                            }(this.uri);
                            if (i) switch (this.keyFormat) {
                                case y.WIDEVINE:
                                    this.pssh = i, i.length >= 22 && (this.keyId = i.subarray(i.length - 22, i.length - 6));
                                    break;
                                case y.PLAYREADY:
                                    var n = new Uint8Array([154, 4, 240, 121, 152, 64, 66, 134, 171, 146, 230, 91, 224, 136, 95, 149]);
                                    this.pssh = (0, R.mp4pssh)(n, null, i);
                                    var a = new Uint16Array(i.buffer, i.byteOffset, i.byteLength / 2),
                                        s = String.fromCharCode.apply(null, Array.from(a)),
                                        o = s.substring(s.indexOf("<"), s.length),
                                        u = (new DOMParser).parseFromString(o, "text/xml").getElementsByTagName("KID")[0];
                                    if (u) {
                                        var d = u.childNodes[0] ? u.childNodes[0].nodeValue : u.getAttribute("VALUE");
                                        if (d) {
                                            var h = S(d).subarray(0, 16);
                                            ! function(t) {
                                                var e = function(t, e, r) {
                                                    var i = t[e];
                                                    t[e] = t[r], t[r] = i
                                                };
                                                e(t, 0, 3), e(t, 1, 2), e(t, 4, 5), e(t, 6, 7)
                                            }(h), this.keyId = h
                                        }
                                    }
                                    break;
                                default:
                                    var c = i.subarray(0, 16);
                                    if (16 !== c.length) {
                                        var f = new Uint8Array(16);
                                        f.set(c, 16 - c.length), c = f
                                    }
                                    this.keyId = c
                            }
                            if (!this.keyId || 16 !== this.keyId.byteLength) {
                                var g = I[this.uri];
                                if (!g) {
                                    var v = Object.keys(I).length % Number.MAX_SAFE_INTEGER;
                                    g = new Uint8Array(16), new DataView(g.buffer, 12, 4).setUint32(0, v), I[this.uri] = g
                                }
                                this.keyId = g
                            }
                            return this
                        }, t
                    }(),
                    C = { audio: { a3ds: !0, "ac-3": !0, "ac-4": !0, alac: !0, alaw: !0, dra1: !0, "dts+": !0, "dts-": !0, dtsc: !0, dtse: !0, dtsh: !0, "ec-3": !0, enca: !0, g719: !0, g726: !0, m4ae: !0, mha1: !0, mha2: !0, mhm1: !0, mhm2: !0, mlpa: !0, mp4a: !0, "raw ": !0, Opus: !0, opus: !0, samr: !0, sawb: !0, sawp: !0, sevc: !0, sqcp: !0, ssmv: !0, twos: !0, ulaw: !0 }, video: { avc1: !0, avc2: !0, avc3: !0, avc4: !0, avcp: !0, av01: !0, drac: !0, dva1: !0, dvav: !0, dvh1: !0, dvhe: !0, encv: !0, hev1: !0, hvc1: !0, mjp2: !0, mp4v: !0, mvc1: !0, mvc2: !0, mvc3: !0, mvc4: !0, resv: !0, rv60: !0, s263: !0, svc1: !0, svc2: !0, "vc-1": !0, vp08: !0, vp09: !0 }, text: { stpp: !0, wvtt: !0 } };

                function _(t, e) { return MediaSource.isTypeSupported((e || "video") + '/mp4;codecs="' + t + '"') }

                function P() { return P = Object.assign ? Object.assign.bind() : function(t) { for (var e = 1; e < arguments.length; e++) { var r = arguments[e]; for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]) } return t }, P.apply(this, arguments) }
                var O = /#EXT-X-STREAM-INF:([^\r\n]*)(?:[\r\n](?:#[^\r\n]*)?)*([^\r\n]+)|#EXT-X-SESSION-DATA:([^\r\n]*)[\r\n]+|#EXT-X-SESSION-KEY:([^\n\r]*)[\r\n]+/g,
                    x = /#EXT-X-MEDIA:(.*)/g,
                    F = new RegExp([/#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source, /(?!#) *(\S[\S ]*)/.source, /#EXT-X-BYTERANGE:*(.+)/.source, /#EXT-X-PROGRAM-DATE-TIME:(.+)/.source, /#.*/.source].join("|"), "g"),
                    M = new RegExp([/#(EXTM3U)/.source, /#EXT-X-(DATERANGE|KEY|MAP|PART|PART-INF|PLAYLIST-TYPE|PRELOAD-HINT|RENDITION-REPORT|SERVER-CONTROL|SKIP|START):(.+)/.source, /#EXT-X-(BITRATE|DISCONTINUITY-SEQUENCE|MEDIA-SEQUENCE|TARGETDURATION|VERSION): *(\d+)/.source, /#EXT-X-(DISCONTINUITY|ENDLIST|GAP)/.source, /(#)([^:]*):(.*)/.source, /(#)(.*)(?:.*)\r?\n?/.source].join("|")),
                    N = function() {
                        function t() {}
                        return t.findGroup = function(t, e) { for (var r = 0; r < t.length; r++) { var i = t[r]; if (i.id === e) return i } }, t.convertAVC1ToAVCOTI = function(t) { var e = t.split("."); if (e.length > 2) { var r = e.shift() + "."; return (r += parseInt(e.shift()).toString(16)) + ("000" + parseInt(e.shift()).toString(16)).slice(-4) } return t }, t.resolve = function(t, e) { return (0, n.buildAbsoluteURL)(e, t, { alwaysNormalize: !0 }) }, t.parseMasterPlaylist = function(e, r) {
                            var i, n = [],
                                a = [],
                                s = {},
                                o = [],
                                u = !1;
                            for (O.lastIndex = 0; null != (i = O.exec(e));)
                                if (i[1]) {
                                    var d, c = new h(i[1]),
                                        f = { attrs: c, bitrate: c.decimalInteger("AVERAGE-BANDWIDTH") || c.decimalInteger("BANDWIDTH"), name: c.NAME, url: t.resolve(i[2], r) },
                                        g = c.decimalResolution("RESOLUTION");
                                    g && (f.width = g.width, f.height = g.height), B((c.CODECS || "").split(/[ ,]+/).filter((function(t) { return t })), f), f.videoCodec && -1 !== f.videoCodec.indexOf("avc1") && (f.videoCodec = t.convertAVC1ToAVCOTI(f.videoCodec)), null !== (d = f.unknownCodecs) && void 0 !== d && d.length || a.push(f), n.push(f)
                                } else if (i[3]) {
                                var v = new h(i[3]);
                                v["DATA-ID"] && (u = !0, s[v["DATA-ID"]] = v)
                            } else if (i[4]) {
                                var p = i[4],
                                    m = U(p, r);
                                m.encrypted && m.isSupported() ? o.push(m) : l.logger.warn('[Keys] Ignoring invalid EXT-X-SESSION-KEY tag: "' + p + '"')
                            }
                            return { levels: a.length > 0 && a.length < n.length ? a : n, sessionData: u ? s : null, sessionKeys: o.length ? o : null }
                        }, t.parseMasterPlaylistMedia = function(e, r, i, n) {
                            var a;
                            void 0 === n && (n = []);
                            var s = [],
                                o = 0;
                            for (x.lastIndex = 0; null !== (a = x.exec(e));) {
                                var l = new h(a[1]);
                                if (l.TYPE === i) {
                                    var u = { attrs: l, bitrate: 0, id: o++, groupId: l["GROUP-ID"], instreamId: l["INSTREAM-ID"], name: l.NAME || l.LANGUAGE || "", type: i, default: l.bool("DEFAULT"), autoselect: l.bool("AUTOSELECT"), forced: l.bool("FORCED"), lang: l.LANGUAGE, url: l.URI ? t.resolve(l.URI, r) : "" };
                                    if (n.length) {
                                        var d = t.findGroup(n, u.groupId) || n[0];
                                        G(u, d, "audioCodec"), G(u, d, "textCodec")
                                    }
                                    s.push(u)
                                }
                            }
                            return s
                        }, t.parseLevelPlaylist = function(t, e, r, i, n) {
                            var s, o, u, d = new T(e),
                                c = d.fragments,
                                f = null,
                                p = 0,
                                m = 0,
                                y = 0,
                                E = 0,
                                S = null,
                                b = new v.Fragment(i, e),
                                L = -1,
                                A = !1;
                            for (F.lastIndex = 0, d.m3u8 = t; null !== (s = F.exec(t));) {
                                A && (A = !1, (b = new v.Fragment(i, e)).start = y, b.sn = p, b.cc = E, b.level = r, f && (b.initSegment = f, b.rawProgramDateTime = f.rawProgramDateTime, f.rawProgramDateTime = null));
                                var D = s[1];
                                if (D) {
                                    b.duration = parseFloat(D);
                                    var k = (" " + s[2]).slice(1);
                                    b.title = k || null, b.tagList.push(k ? ["INF", D, k] : ["INF", D])
                                } else if (s[3])(0, a.isFiniteNumber)(b.duration) && (b.start = y, u && j(b, u, d), b.sn = p, b.level = r, b.cc = E, b.urlId = n, c.push(b), b.relurl = (" " + s[3]).slice(1), K(b, S), S = b, y += b.duration, p++, m = 0, A = !0);
                                else if (s[4]) {
                                    var R = (" " + s[4]).slice(1);
                                    S ? b.setByteRange(R, S) : b.setByteRange(R)
                                } else if (s[5]) b.rawProgramDateTime = (" " + s[5]).slice(1), b.tagList.push(["PROGRAM-DATE-TIME", b.rawProgramDateTime]), -1 === L && (L = c.length);
                                else {
                                    if (!(s = s[0].match(M))) { l.logger.warn("No matches on slow regex match for level playlist!"); continue }
                                    for (o = 1; o < s.length && void 0 === s[o]; o++);
                                    var I = (" " + s[o]).slice(1),
                                        w = (" " + s[o + 1]).slice(1),
                                        C = s[o + 2] ? (" " + s[o + 2]).slice(1) : "";
                                    switch (I) {
                                        case "PLAYLIST-TYPE":
                                            d.type = w.toUpperCase();
                                            break;
                                        case "MEDIA-SEQUENCE":
                                            p = d.startSN = parseInt(w);
                                            break;
                                        case "SKIP":
                                            var _ = new h(w),
                                                O = _.decimalInteger("SKIPPED-SEGMENTS");
                                            if ((0, a.isFiniteNumber)(O)) {
                                                d.skippedSegments = O;
                                                for (var x = O; x--;) c.unshift(null);
                                                p += O
                                            }
                                            var N = _.enumeratedString("RECENTLY-REMOVED-DATERANGES");
                                            N && (d.recentlyRemovedDateranges = N.split("\t"));
                                            break;
                                        case "TARGETDURATION":
                                            d.targetduration = parseFloat(w);
                                            break;
                                        case "VERSION":
                                            d.version = parseInt(w);
                                            break;
                                        case "EXTM3U":
                                            break;
                                        case "ENDLIST":
                                            d.live = !1;
                                            break;
                                        case "#":
                                            (w || C) && b.tagList.push(C ? [w, C] : [w]);
                                            break;
                                        case "DISCONTINUITY":
                                            E++, b.tagList.push(["DIS"]);
                                            break;
                                        case "GAP":
                                            b.tagList.push([I]);
                                            break;
                                        case "BITRATE":
                                            b.tagList.push([I, w]);
                                            break;
                                        case "DATERANGE":
                                            var B = new h(w),
                                                G = new g(B, d.dateRanges[B.ID]);
                                            G.isValid || d.skippedSegments ? d.dateRanges[G.id] = G : l.logger.warn('Ignoring invalid DATERANGE tag: "' + w + '"'), b.tagList.push(["EXT-X-DATERANGE", w]);
                                            break;
                                        case "DISCONTINUITY-SEQUENCE":
                                            E = parseInt(w);
                                            break;
                                        case "KEY":
                                            var V = U(w, e);
                                            if (V.isSupported()) {
                                                if ("NONE" === V.method) { u = void 0; break }
                                                u || (u = {}), u[V.keyFormat] && (u = P({}, u)), u[V.keyFormat] = V
                                            } else l.logger.warn('[Keys] Ignoring invalid EXT-X-KEY tag: "' + w + '"');
                                            break;
                                        case "START":
                                            var Y = new h(w).decimalFloatingPoint("TIME-OFFSET");
                                            (0, a.isFiniteNumber)(Y) && (d.startTimeOffset = Y);
                                            break;
                                        case "MAP":
                                            var W = new h(w);
                                            if (b.duration) {
                                                var q = new v.Fragment(i, e);
                                                H(q, W, r, u), f = q, b.initSegment = f, f.rawProgramDateTime && !b.rawProgramDateTime && (b.rawProgramDateTime = f.rawProgramDateTime)
                                            } else H(b, W, r, u), f = b, A = !0;
                                            break;
                                        case "SERVER-CONTROL":
                                            var X = new h(w);
                                            d.canBlockReload = X.bool("CAN-BLOCK-RELOAD"), d.canSkipUntil = X.optionalFloat("CAN-SKIP-UNTIL", 0), d.canSkipDateRanges = d.canSkipUntil > 0 && X.bool("CAN-SKIP-DATERANGES"), d.partHoldBack = X.optionalFloat("PART-HOLD-BACK", 0), d.holdBack = X.optionalFloat("HOLD-BACK", 0);
                                            break;
                                        case "PART-INF":
                                            var z = new h(w);
                                            d.partTarget = z.decimalFloatingPoint("PART-TARGET");
                                            break;
                                        case "PART":
                                            var Q = d.partList;
                                            Q || (Q = d.partList = []);
                                            var $ = m > 0 ? Q[Q.length - 1] : void 0,
                                                J = m++,
                                                Z = new v.Part(new h(w), b, e, J, $);
                                            Q.push(Z), b.duration += Z.duration;
                                            break;
                                        case "PRELOAD-HINT":
                                            var tt = new h(w);
                                            d.preloadHint = tt;
                                            break;
                                        case "RENDITION-REPORT":
                                            var et = new h(w);
                                            d.renditionReports = d.renditionReports || [], d.renditionReports.push(et);
                                            break;
                                        default:
                                            l.logger.warn("line parsed but not handled: " + s)
                                    }
                                }
                            }
                            S && !S.relurl ? (c.pop(), y -= S.duration, d.partList && (d.fragmentHint = S)) : d.partList && (K(b, S), b.cc = E, d.fragmentHint = b, u && j(b, u, d));
                            var rt = c.length,
                                it = c[0],
                                nt = c[rt - 1];
                            if ((y += d.skippedSegments * d.targetduration) > 0 && rt && nt) {
                                d.averagetargetduration = y / rt;
                                var at = nt.sn;
                                d.endSN = "initSegment" !== at ? at : 0, d.live || (nt.endList = !0), it && (d.startCC = it.cc)
                            } else d.endSN = 0, d.startCC = 0;
                            return d.fragmentHint && (y += d.fragmentHint.duration), d.totalduration = y, d.endCC = E, L > 0 && function(t, e) {
                                for (var r = t[e], i = e; i--;) {
                                    var n = t[i];
                                    if (!n) return;
                                    n.programDateTime = r.programDateTime - 1e3 * n.duration, r = n
                                }
                            }(c, L), d
                        }, t
                    }();

                function U(t, e) {
                    var r, i, n = new h(t),
                        a = null != (r = n.enumeratedString("METHOD")) ? r : "",
                        s = n.URI,
                        o = n.hexadecimalInteger("IV"),
                        u = n.enumeratedString("KEYFORMATVERSIONS"),
                        d = null != (i = n.enumeratedString("KEYFORMAT")) ? i : "identity";
                    s && n.IV && !o && l.logger.error("Invalid IV: " + n.IV);
                    var c = s ? N.resolve(s, e) : "",
                        f = (u || "1").split("/").map(Number).filter(Number.isFinite);
                    return new w(a, c, d, f, o)
                }

                function B(t, e) {
                    ["video", "audio", "text"].forEach((function(r) {
                        var i = t.filter((function(t) { return function(t, e) { var r = C[e]; return !!r && !0 === r[t.slice(0, 4)] }(t, r) }));
                        if (i.length) {
                            var n = i.filter((function(t) { return 0 === t.lastIndexOf("avc1", 0) || 0 === t.lastIndexOf("mp4a", 0) }));
                            e[r + "Codec"] = n.length > 0 ? n[0] : i[0], t = t.filter((function(t) { return -1 === i.indexOf(t) }))
                        }
                    })), e.unknownCodecs = t
                }

                function G(t, e, r) {
                    var i = e[r];
                    i && (t[r] = i)
                }

                function K(t, e) { t.rawProgramDateTime ? t.programDateTime = Date.parse(t.rawProgramDateTime) : null != e && e.programDateTime && (t.programDateTime = e.endProgramDateTime), (0, a.isFiniteNumber)(t.programDateTime) || (t.programDateTime = null, t.rawProgramDateTime = null) }

                function H(t, e, r, i) { t.relurl = e.URI, e.BYTERANGE && t.setByteRange(e.BYTERANGE), t.level = r, t.sn = "initSegment", i && (t.levelkeys = i), t.initSegment = null }

                function j(t, e, r) {
                    t.levelkeys = e;
                    var i = r.encryptedFragments;
                    i.length && i[i.length - 1].levelkeys === e || !Object.keys(e).some((function(t) { return e[t].isCommonEncryption })) || i.push(t)
                }
                var V = r(308);

                function Y(t, e) { var r = t.url; return void 0 !== r && 0 !== r.indexOf("data:") || (r = e.url), r }
                const W = function() {
                    function t(t) { this.hls = void 0, this.loaders = Object.create(null), this.hls = t, this.registerListeners() }
                    var e = t.prototype;
                    return e.startLoad = function(t) {}, e.stopLoad = function() { this.destroyInternalLoaders() }, e.registerListeners = function() {
                        var t = this.hls;
                        t.on(s.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.on(s.Events.LEVEL_LOADING, this.onLevelLoading, this), t.on(s.Events.AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this), t.on(s.Events.SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this)
                    }, e.unregisterListeners = function() {
                        var t = this.hls;
                        t.off(s.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.off(s.Events.LEVEL_LOADING, this.onLevelLoading, this), t.off(s.Events.AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this), t.off(s.Events.SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this)
                    }, e.createInternalLoader = function(t) {
                        var e = this.hls.config,
                            r = e.pLoader,
                            i = e.loader,
                            n = new(r || i)(e);
                        return t.loader = n, this.loaders[t.type] = n, n
                    }, e.getInternalLoader = function(t) { return this.loaders[t.type] }, e.resetInternalLoader = function(t) { this.loaders[t] && delete this.loaders[t] }, e.destroyInternalLoaders = function() {
                        for (var t in this.loaders) {
                            var e = this.loaders[t];
                            e && e.destroy(), this.resetInternalLoader(t)
                        }
                    }, e.destroy = function() { this.unregisterListeners(), this.destroyInternalLoaders() }, e.onManifestLoading = function(t, e) {
                        var r = e.url;
                        this.load({ id: null, groupId: null, level: 0, responseType: "text", type: V.PlaylistContextType.MANIFEST, url: r, deliveryDirectives: null })
                    }, e.onLevelLoading = function(t, e) {
                        var r = e.id,
                            i = e.level,
                            n = e.url,
                            a = e.deliveryDirectives;
                        this.load({ id: r, groupId: null, level: i, responseType: "text", type: V.PlaylistContextType.LEVEL, url: n, deliveryDirectives: a })
                    }, e.onAudioTrackLoading = function(t, e) {
                        var r = e.id,
                            i = e.groupId,
                            n = e.url,
                            a = e.deliveryDirectives;
                        this.load({ id: r, groupId: i, level: null, responseType: "text", type: V.PlaylistContextType.AUDIO_TRACK, url: n, deliveryDirectives: a })
                    }, e.onSubtitleTrackLoading = function(t, e) {
                        var r = e.id,
                            i = e.groupId,
                            n = e.url,
                            a = e.deliveryDirectives;
                        this.load({ id: r, groupId: i, level: null, responseType: "text", type: V.PlaylistContextType.SUBTITLE_TRACK, url: n, deliveryDirectives: a })
                    }, e.load = function(t) {
                        var e, r, i, n, a, s, o = this.hls.config,
                            u = this.getInternalLoader(t);
                        if (u) {
                            var d = u.context;
                            if (d && d.url === t.url) return void l.logger.trace("[playlist-loader]: playlist request ongoing");
                            l.logger.log("[playlist-loader]: aborting previous loader for type: " + t.type), u.abort()
                        }
                        switch (t.type) {
                            case V.PlaylistContextType.MANIFEST:
                                r = o.manifestLoadingMaxRetry, i = o.manifestLoadingTimeOut, n = o.manifestLoadingRetryDelay, a = o.manifestLoadingMaxRetryTimeout;
                                break;
                            case V.PlaylistContextType.LEVEL:
                            case V.PlaylistContextType.AUDIO_TRACK:
                            case V.PlaylistContextType.SUBTITLE_TRACK:
                                r = 0, i = o.levelLoadingTimeOut;
                                break;
                            default:
                                r = o.levelLoadingMaxRetry, i = o.levelLoadingTimeOut, n = o.levelLoadingRetryDelay, a = o.levelLoadingMaxRetryTimeout
                        }
                        if (u = this.createInternalLoader(t), null !== (e = t.deliveryDirectives) && void 0 !== e && e.part && (t.type === V.PlaylistContextType.LEVEL && null !== t.level ? s = this.hls.levels[t.level].details : t.type === V.PlaylistContextType.AUDIO_TRACK && null !== t.id ? s = this.hls.audioTracks[t.id].details : t.type === V.PlaylistContextType.SUBTITLE_TRACK && null !== t.id && (s = this.hls.subtitleTracks[t.id].details), s)) {
                            var h = s.partTarget,
                                c = s.targetduration;
                            h && c && (i = Math.min(1e3 * Math.max(3 * h, .8 * c), i))
                        }
                        var f = { timeout: i, maxRetry: r, retryDelay: n, maxRetryDelay: a, highWaterMark: 0 },
                            g = { onSuccess: this.loadsuccess.bind(this), onError: this.loaderror.bind(this), onTimeout: this.loadtimeout.bind(this) };
                        u.load(t, f, g)
                    }, e.loadsuccess = function(t, e, r, i) {
                        void 0 === i && (i = null), this.resetInternalLoader(r.type);
                        var n = t.data;
                        0 === n.indexOf("#EXTM3U") ? (e.parsing.start = performance.now(), n.indexOf("#EXTINF:") > 0 || n.indexOf("#EXT-X-TARGETDURATION:") > 0 ? this.handleTrackOrLevelPlaylist(t, e, r, i) : this.handleMasterPlaylist(t, e, r, i)) : this.handleManifestParsingError(t, r, "no EXTM3U delimiter", i)
                    }, e.loaderror = function(t, e, r) { void 0 === r && (r = null), this.handleNetworkError(e, r, !1, t) }, e.loadtimeout = function(t, e, r) { void 0 === r && (r = null), this.handleNetworkError(e, r, !0) }, e.handleMasterPlaylist = function(t, e, r, i) {
                        var n = this.hls,
                            a = t.data,
                            o = Y(t, r),
                            u = N.parseMasterPlaylist(a, o),
                            d = u.levels,
                            c = u.sessionData,
                            f = u.sessionKeys;
                        if (d.length) {
                            var g = d.map((function(t) { return { id: t.attrs.AUDIO, audioCodec: t.audioCodec } })),
                                v = d.map((function(t) { return { id: t.attrs.SUBTITLES, textCodec: t.textCodec } })),
                                p = N.parseMasterPlaylistMedia(a, o, "AUDIO", g),
                                m = N.parseMasterPlaylistMedia(a, o, "SUBTITLES", v),
                                y = N.parseMasterPlaylistMedia(a, o, "CLOSED-CAPTIONS");
                            p.length && (p.some((function(t) { return !t.url })) || !d[0].audioCodec || d[0].attrs.AUDIO || (l.logger.log("[playlist-loader]: audio codec signaled in quality level, but no embedded audio track signaled, create one"), p.unshift({ type: "main", name: "main", default: !1, autoselect: !1, forced: !1, id: -1, attrs: new h({}), bitrate: 0, url: "" }))), n.trigger(s.Events.MANIFEST_LOADED, { levels: d, audioTracks: p, subtitles: m, captions: y, url: o, stats: e, networkDetails: i, sessionData: c, sessionKeys: f })
                        } else this.handleManifestParsingError(t, r, "no level found in manifest", i)
                    }, e.handleTrackOrLevelPlaylist = function(t, e, r, i) {
                        var n = this.hls,
                            l = r.id,
                            u = r.level,
                            d = r.type,
                            c = Y(t, r),
                            f = (0, a.isFiniteNumber)(l) ? l : 0,
                            g = (0, a.isFiniteNumber)(u) ? u : f,
                            v = function(t) {
                                switch (t.type) {
                                    case V.PlaylistContextType.AUDIO_TRACK:
                                        return V.PlaylistLevelType.AUDIO;
                                    case V.PlaylistContextType.SUBTITLE_TRACK:
                                        return V.PlaylistLevelType.SUBTITLE;
                                    default:
                                        return V.PlaylistLevelType.MAIN
                                }
                            }(r),
                            p = N.parseLevelPlaylist(t.data, c, g, v, f);
                        if (p.fragments.length) {
                            if (d === V.PlaylistContextType.MANIFEST) {
                                var m = { attrs: new h({}), bitrate: 0, details: p, name: "", url: c };
                                n.trigger(s.Events.MANIFEST_LOADED, { levels: [m], audioTracks: [], url: c, stats: e, networkDetails: i, sessionData: null, sessionKeys: null })
                            }
                            e.parsing.end = performance.now(), r.levelDetails = p, this.handlePlaylistLoaded(t, e, r, i)
                        } else n.trigger(s.Events.ERROR, { type: o.ErrorTypes.NETWORK_ERROR, details: o.ErrorDetails.LEVEL_EMPTY_ERROR, fatal: !1, url: c, reason: "no fragments found in level", level: "number" == typeof r.level ? r.level : void 0 })
                    }, e.handleManifestParsingError = function(t, e, r, i) { this.hls.trigger(s.Events.ERROR, { type: o.ErrorTypes.NETWORK_ERROR, details: o.ErrorDetails.MANIFEST_PARSING_ERROR, fatal: e.type === V.PlaylistContextType.MANIFEST, url: t.url, reason: r, response: t, context: e, networkDetails: i }) }, e.handleNetworkError = function(t, e, r, i) {
                        void 0 === r && (r = !1), l.logger.warn("[playlist-loader]: A network " + (r ? "timeout" : "error") + " occurred while loading " + t.type + " level: " + t.level + " id: " + t.id + ' group-id: "' + t.groupId + '"');
                        var n = o.ErrorDetails.UNKNOWN,
                            a = !1,
                            u = this.getInternalLoader(t);
                        switch (t.type) {
                            case V.PlaylistContextType.MANIFEST:
                                n = r ? o.ErrorDetails.MANIFEST_LOAD_TIMEOUT : o.ErrorDetails.MANIFEST_LOAD_ERROR, a = !0;
                                break;
                            case V.PlaylistContextType.LEVEL:
                                n = r ? o.ErrorDetails.LEVEL_LOAD_TIMEOUT : o.ErrorDetails.LEVEL_LOAD_ERROR, a = !1;
                                break;
                            case V.PlaylistContextType.AUDIO_TRACK:
                                n = r ? o.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT : o.ErrorDetails.AUDIO_TRACK_LOAD_ERROR, a = !1;
                                break;
                            case V.PlaylistContextType.SUBTITLE_TRACK:
                                n = r ? o.ErrorDetails.SUBTITLE_TRACK_LOAD_TIMEOUT : o.ErrorDetails.SUBTITLE_LOAD_ERROR, a = !1
                        }
                        u && this.resetInternalLoader(t.type);
                        var d = { type: o.ErrorTypes.NETWORK_ERROR, details: n, fatal: a, url: t.url, loader: u, context: t, networkDetails: e };
                        i && (d.response = i), this.hls.trigger(s.Events.ERROR, d)
                    }, e.handlePlaylistLoaded = function(t, e, r, i) {
                        var n = r.type,
                            a = r.level,
                            o = r.id,
                            l = r.groupId,
                            u = r.loader,
                            d = r.levelDetails,
                            h = r.deliveryDirectives;
                        if (null != d && d.targetduration) {
                            if (u) switch (d.live && (u.getCacheAge && (d.ageHeader = u.getCacheAge() || 0), u.getCacheAge && !isNaN(d.ageHeader) || (d.ageHeader = 0)), n) {
                                case V.PlaylistContextType.MANIFEST:
                                case V.PlaylistContextType.LEVEL:
                                    this.hls.trigger(s.Events.LEVEL_LOADED, { details: d, level: a || 0, id: o || 0, stats: e, networkDetails: i, deliveryDirectives: h });
                                    break;
                                case V.PlaylistContextType.AUDIO_TRACK:
                                    this.hls.trigger(s.Events.AUDIO_TRACK_LOADED, { details: d, id: o || 0, groupId: l || "", stats: e, networkDetails: i, deliveryDirectives: h });
                                    break;
                                case V.PlaylistContextType.SUBTITLE_TRACK:
                                    this.hls.trigger(s.Events.SUBTITLE_TRACK_LOADED, { details: d, id: o || 0, groupId: l || "", stats: e, networkDetails: i, deliveryDirectives: h })
                            }
                        } else this.handleManifestParsingError(t, r, "invalid target duration", i)
                    }, t
                }();

                function q(t, e) {
                    var r;
                    try { r = new Event("addtrack") } catch (t) {
                        (r = document.createEvent("Event")).initEvent("addtrack", !1, !1)
                    }
                    r.track = t, e.dispatchEvent(r)
                }

                function X(t, e) {
                    var r = t.mode;
                    if ("disabled" === r && (t.mode = "hidden"), t.cues && !t.cues.getCueById(e.id)) try { if (t.addCue(e), !t.cues.getCueById(e.id)) throw new Error("addCue is failed for: " + e) } catch (r) {
                        l.logger.debug("[texttrack-utils]: " + r);
                        var i = new self.TextTrackCue(e.startTime, e.endTime, e.text);
                        i.id = e.id, t.addCue(i)
                    }
                    "disabled" === r && (t.mode = r)
                }

                function z(t) {
                    var e = t.mode;
                    if ("disabled" === e && (t.mode = "hidden"), t.cues)
                        for (var r = t.cues.length; r--;) t.removeCue(t.cues[r]);
                    "disabled" === e && (t.mode = e)
                }

                function Q(t, e, r, i) {
                    var n = t.mode;
                    if ("disabled" === n && (t.mode = "hidden"), t.cues && t.cues.length > 0)
                        for (var a = function(t, e, r) {
                                var i = [],
                                    n = function(t, e) {
                                        if (e < t[0].startTime) return 0;
                                        var r = t.length - 1;
                                        if (e > t[r].endTime) return -1;
                                        for (var i = 0, n = r; i <= n;) {
                                            var a = Math.floor((n + i) / 2);
                                            if (e < t[a].startTime) n = a - 1;
                                            else {
                                                if (!(e > t[a].startTime && i < r)) return a;
                                                i = a + 1
                                            }
                                        }
                                        return t[i].startTime - e < e - t[n].startTime ? i : n
                                    }(t, e);
                                if (n > -1)
                                    for (var a = n, s = t.length; a < s; a++) {
                                        var o = t[a];
                                        if (o.startTime >= e && o.endTime <= r) i.push(o);
                                        else if (o.startTime > r) return i
                                    }
                                return i
                            }(t.cues, e, r), s = 0; s < a.length; s++) i && !i(a[s]) || t.removeCue(a[s]);
                    "disabled" === n && (t.mode = n)
                }
                var $ = r(181),
                    J = r(856);

                function Z() { return self.WebKitDataCue || self.VTTCue || self.TextTrackCue }
                var tt = function() { var t = Z(); try { new t(0, Number.POSITIVE_INFINITY, "") } catch (t) { return Number.MAX_VALUE } return Number.POSITIVE_INFINITY }();

                function et(t, e) { return t.getTime() / 1e3 - e }
                const rt = function() {
                    function t(t) { this.hls = void 0, this.id3Track = null, this.media = null, this.dateRangeCuesAppended = {}, this.hls = t, this._registerListeners() }
                    var e = t.prototype;
                    return e.destroy = function() { this._unregisterListeners(), this.id3Track = null, this.media = null, this.dateRangeCuesAppended = {}, this.hls = null }, e._registerListeners = function() {
                        var t = this.hls;
                        t.on(s.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.on(s.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(s.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.on(s.Events.FRAG_PARSING_METADATA, this.onFragParsingMetadata, this), t.on(s.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), t.on(s.Events.LEVEL_UPDATED, this.onLevelUpdated, this)
                    }, e._unregisterListeners = function() {
                        var t = this.hls;
                        t.off(s.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.off(s.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(s.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.off(s.Events.FRAG_PARSING_METADATA, this.onFragParsingMetadata, this), t.off(s.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), t.off(s.Events.LEVEL_UPDATED, this.onLevelUpdated, this)
                    }, e.onMediaAttached = function(t, e) { this.media = e.media }, e.onMediaDetaching = function() { this.id3Track && (z(this.id3Track), this.id3Track = null, this.media = null, this.dateRangeCuesAppended = {}) }, e.onManifestLoading = function() { this.dateRangeCuesAppended = {} }, e.createTrack = function(t) { var e = this.getID3Track(t.textTracks); return e.mode = "hidden", e }, e.getID3Track = function(t) { if (this.media) { for (var e = 0; e < t.length; e++) { var r = t[e]; if ("metadata" === r.kind && "id3" === r.label) return q(r, this.media), r } return this.media.addTextTrack("metadata", "id3") } }, e.onFragParsingMetadata = function(t, e) {
                        if (this.media) {
                            var r = this.hls.config,
                                i = r.enableEmsgMetadataCues,
                                n = r.enableID3MetadataCues;
                            if (i || n) {
                                var a = e.samples;
                                this.id3Track || (this.id3Track = this.createTrack(this.media));
                                for (var s = Z(), o = 0; o < a.length; o++) {
                                    var l = a[o].type;
                                    if ((l !== J.MetadataSchema.emsg || i) && n) {
                                        var u = $.getID3Frames(a[o].data);
                                        if (u) {
                                            var d = a[o].pts,
                                                h = d + a[o].duration;
                                            h > tt && (h = tt), h - d <= 0 && (h = d + .25);
                                            for (var c = 0; c < u.length; c++) {
                                                var f = u[c];
                                                if (!$.isTimeStampFrame(f)) {
                                                    this.updateId3CueEnds(d);
                                                    var g = new s(d, h, "");
                                                    g.value = f, l && (g.type = l), this.id3Track.addCue(g)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }, e.updateId3CueEnds = function(t) {
                        var e, r = null === (e = this.id3Track) || void 0 === e ? void 0 : e.cues;
                        if (r)
                            for (var i = r.length; i--;) {
                                var n = r[i];
                                n.startTime < t && n.endTime === tt && (n.endTime = t)
                            }
                    }, e.onBufferFlushing = function(t, e) {
                        var r = e.startOffset,
                            i = e.endOffset,
                            n = e.type,
                            a = this.id3Track,
                            s = this.hls;
                        if (s) {
                            var o = s.config,
                                l = o.enableEmsgMetadataCues,
                                u = o.enableID3MetadataCues;
                            a && (l || u) && Q(a, r, i, "audio" === n ? function(t) { return t.type === J.MetadataSchema.audioId3 && u } : "video" === n ? function(t) { return t.type === J.MetadataSchema.emsg && l } : function(t) { return t.type === J.MetadataSchema.audioId3 && u || t.type === J.MetadataSchema.emsg && l })
                        }
                    }, e.onLevelUpdated = function(t, e) {
                        var r = this,
                            n = e.details;
                        if (this.media && n.hasProgramDateTime && this.hls.config.enableDateRangeMetadataCues) {
                            var s = this.dateRangeCuesAppended,
                                o = this.id3Track,
                                l = n.dateRanges,
                                u = Object.keys(l);
                            if (o)
                                for (var d = Object.keys(s).filter((function(t) { return !u.includes(t) })), h = function(t) {
                                        var e = d[t];
                                        Object.keys(s[e].cues).forEach((function(t) { o.removeCue(s[e].cues[t]) })), delete s[e]
                                    }, c = d.length; c--;) h(c);
                            var f = n.fragments[n.fragments.length - 1];
                            if (0 !== u.length && (0, a.isFiniteNumber)(null == f ? void 0 : f.programDateTime)) {
                                this.id3Track || (this.id3Track = this.createTrack(this.media));
                                for (var g = f.programDateTime / 1e3 - f.start, v = Z(), p = function(t) {
                                        var e = u[t],
                                            n = l[e],
                                            a = s[e],
                                            o = (null == a ? void 0 : a.cues) || {},
                                            d = (null == a ? void 0 : a.durationKnown) || !1,
                                            h = et(n.startDate, g),
                                            c = tt,
                                            f = n.endDate;
                                        if (f) c = et(f, g), d = !0;
                                        else if (n.endOnNext && !d) {
                                            var p = u.reduce((function(t, e) { var r = l[e]; return r.class === n.class && r.id !== e && r.startDate > n.startDate && t.push(r), t }), []).sort((function(t, e) { return t.startDate.getTime() - e.startDate.getTime() }))[0];
                                            p && (c = et(p.startDate, g), d = !0)
                                        }
                                        for (var m, y = Object.keys(n.attr), E = 0; E < y.length; E++) {
                                            var T = y[E];
                                            if (T !== i.ID && T !== i.CLASS && T !== i.START_DATE && T !== i.DURATION && T !== i.END_DATE && T !== i.END_ON_NEXT) {
                                                var S = o[T];
                                                if (S) d && !a.durationKnown && (S.endTime = c);
                                                else {
                                                    var b = n.attr[T];
                                                    S = new v(h, c, ""), T !== i.SCTE35_OUT && T !== i.SCTE35_IN || (m = b, b = Uint8Array.from(m.replace(/^0x/, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")).buffer), S.value = { key: T, data: b }, S.type = J.MetadataSchema.dateRange, r.id3Track.addCue(S), o[T] = S
                                                }
                                            }
                                        }
                                        s[e] = { cues: o, dateRange: n, durationKnown: d }
                                    }, m = 0; m < u.length; m++) p(m)
                            }
                        }
                    }, t
                }();

                function it(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var i = e[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, (void 0, "symbol" == typeof(n = function(t, e) { if ("object" != typeof t || null === t) return t; var r = t[Symbol.toPrimitive]; if (void 0 !== r) { var i = r.call(t, e); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value.") } return String(t) }(i.key, "string")) ? n : String(n)), i)
                    }
                    var n
                }
                var nt = function() {
                    function t(t) {
                        var e = this;
                        this.hls = void 0, this.config = void 0, this.media = null, this.levelDetails = null, this.currentTime = 0, this.stallCount = 0, this._latency = null, this.timeupdateHandler = function() { return e.timeupdate() }, this.hls = t, this.config = t.config, this.registerListeners()
                    }
                    var e, r, i = t.prototype;
                    return i.destroy = function() { this.unregisterListeners(), this.onMediaDetaching(), this.levelDetails = null, this.hls = this.timeupdateHandler = null }, i.registerListeners = function() { this.hls.on(s.Events.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.on(s.Events.MEDIA_DETACHING, this.onMediaDetaching, this), this.hls.on(s.Events.MANIFEST_LOADING, this.onManifestLoading, this), this.hls.on(s.Events.LEVEL_UPDATED, this.onLevelUpdated, this), this.hls.on(s.Events.ERROR, this.onError, this) }, i.unregisterListeners = function() { this.hls.off(s.Events.MEDIA_ATTACHED, this.onMediaAttached), this.hls.off(s.Events.MEDIA_DETACHING, this.onMediaDetaching), this.hls.off(s.Events.MANIFEST_LOADING, this.onManifestLoading), this.hls.off(s.Events.LEVEL_UPDATED, this.onLevelUpdated), this.hls.off(s.Events.ERROR, this.onError) }, i.onMediaAttached = function(t, e) { this.media = e.media, this.media.addEventListener("timeupdate", this.timeupdateHandler) }, i.onMediaDetaching = function() { this.media && (this.media.removeEventListener("timeupdate", this.timeupdateHandler), this.media = null) }, i.onManifestLoading = function() { this.levelDetails = null, this._latency = null, this.stallCount = 0 }, i.onLevelUpdated = function(t, e) {
                        var r = e.details;
                        this.levelDetails = r, r.advanced && this.timeupdate(), !r.live && this.media && this.media.removeEventListener("timeupdate", this.timeupdateHandler)
                    }, i.onError = function(t, e) { e.details === o.ErrorDetails.BUFFER_STALLED_ERROR && (this.stallCount++, l.logger.warn("[playback-rate-controller]: Stall detected, adjusting target latency")) }, i.timeupdate = function() {
                        var t = this.media,
                            e = this.levelDetails;
                        if (t && e) {
                            this.currentTime = t.currentTime;
                            var r = this.computeLatency();
                            if (null !== r) {
                                this._latency = r;
                                var i = this.config,
                                    n = i.lowLatencyMode,
                                    a = i.maxLiveSyncPlaybackRate;
                                if (n && 1 !== a) {
                                    var s = this.targetLatency;
                                    if (null !== s) {
                                        var o = r - s,
                                            l = o < Math.min(this.maxLatency, s + e.targetduration);
                                        if (e.live && l && o > .05 && this.forwardBufferLength > 1) {
                                            var u = Math.min(2, Math.max(1, a)),
                                                d = Math.round(2 / (1 + Math.exp(-.75 * o - this.edgeStalled)) * 20) / 20;
                                            t.playbackRate = Math.min(u, Math.max(1, d))
                                        } else 1 !== t.playbackRate && 0 !== t.playbackRate && (t.playbackRate = 1)
                                    }
                                }
                            }
                        }
                    }, i.estimateLiveEdge = function() { var t = this.levelDetails; return null === t ? null : t.edge + t.age }, i.computeLatency = function() { var t = this.estimateLiveEdge(); return null === t ? null : t - this.currentTime }, e = t, (r = [{ key: "latency", get: function() { return this._latency || 0 } }, {
                        key: "maxLatency",
                        get: function() {
                            var t = this.config,
                                e = this.levelDetails;
                            return void 0 !== t.liveMaxLatencyDuration ? t.liveMaxLatencyDuration : e ? t.liveMaxLatencyDurationCount * e.targetduration : 0
                        }
                    }, {
                        key: "targetLatency",
                        get: function() {
                            var t = this.levelDetails;
                            if (null === t) return null;
                            var e = t.holdBack,
                                r = t.partHoldBack,
                                i = t.targetduration,
                                n = this.config,
                                a = n.liveSyncDuration,
                                s = n.liveSyncDurationCount,
                                o = n.lowLatencyMode,
                                l = this.hls.userConfig,
                                u = o && r || e;
                            (l.liveSyncDuration || l.liveSyncDurationCount || 0 === u) && (u = void 0 !== a ? a : s * i);
                            var d = i;
                            return u + Math.min(1 * this.stallCount, d)
                        }
                    }, {
                        key: "liveSyncPosition",
                        get: function() {
                            var t = this.estimateLiveEdge(),
                                e = this.targetLatency,
                                r = this.levelDetails;
                            if (null === t || null === e || null === r) return null;
                            var i = r.edge,
                                n = t - e - this.edgeStalled,
                                a = i - r.totalduration,
                                s = i - (this.config.lowLatencyMode && r.partTarget || r.targetduration);
                            return Math.min(Math.max(a, n), s)
                        }
                    }, { key: "drift", get: function() { var t = this.levelDetails; return null === t ? 1 : t.drift } }, { key: "edgeStalled", get: function() { var t = this.levelDetails; if (null === t) return 0; var e = 3 * (this.config.lowLatencyMode && t.partTarget || t.targetduration); return Math.max(t.age - e, 0) } }, {
                        key: "forwardBufferLength",
                        get: function() {
                            var t = this.media,
                                e = this.levelDetails;
                            if (!t || !e) return 0;
                            var r = t.buffered.length;
                            return (r ? t.buffered.end(r - 1) : e.edge) - this.currentTime
                        }
                    }]) && it(e.prototype, r), Object.defineProperty(e, "prototype", { writable: !1 }), t
                }();

                function at(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var i = e[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, (void 0, "symbol" == typeof(n = function(t, e) { if ("object" != typeof t || null === t) return t; var r = t[Symbol.toPrimitive]; if (void 0 !== r) { var i = r.call(t, e); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value.") } return String(t) }(i.key, "string")) ? n : String(n)), i)
                    }
                    var n
                }
                var st, ot = ["NONE", "TYPE-0", "TYPE-1", "TYPE-2", null];
                ! function(t) { t.No = "", t.Yes = "YES", t.v2 = "v2" }(st || (st = {}));
                var lt = function() {
                        function t(t, e, r) { this.msn = void 0, this.part = void 0, this.skip = void 0, this.msn = t, this.part = e, this.skip = r }
                        return t.prototype.addDirectives = function(t) { var e = new self.URL(t); return void 0 !== this.msn && e.searchParams.set("_HLS_msn", this.msn.toString()), void 0 !== this.part && e.searchParams.set("_HLS_part", this.part.toString()), this.skip && e.searchParams.set("_HLS_skip", this.skip), e.href }, t
                    }(),
                    ut = function() {
                        function t(t) { this.attrs = void 0, this.audioCodec = void 0, this.bitrate = void 0, this.codecSet = void 0, this.height = void 0, this.id = void 0, this.name = void 0, this.videoCodec = void 0, this.width = void 0, this.unknownCodecs = void 0, this.audioGroupIds = void 0, this.details = void 0, this.fragmentError = 0, this.loadError = 0, this.loaded = void 0, this.realBitrate = 0, this.textGroupIds = void 0, this.url = void 0, this._urlId = 0, this.url = [t.url], this.attrs = t.attrs, this.bitrate = t.bitrate, t.details && (this.details = t.details), this.id = t.id || 0, this.name = t.name, this.width = t.width || 0, this.height = t.height || 0, this.audioCodec = t.audioCodec, this.videoCodec = t.videoCodec, this.unknownCodecs = t.unknownCodecs, this.codecSet = [t.videoCodec, t.audioCodec].filter((function(t) { return t })).join(",").replace(/\.[^.,]+/g, "") }
                        var e, r;
                        return e = t, (r = [{ key: "maxBitrate", get: function() { return Math.max(this.realBitrate, this.bitrate) } }, { key: "uri", get: function() { return this.url[this._urlId] || "" } }, {
                            key: "urlId",
                            get: function() { return this._urlId },
                            set: function(t) {
                                var e = t % this.url.length;
                                this._urlId !== e && (this.details = void 0, this._urlId = e)
                            }
                        }]) && at(e.prototype, r), Object.defineProperty(e, "prototype", { writable: !1 }), t
                    }();

                function dt() { return dt = Object.assign ? Object.assign.bind() : function(t) { for (var e = 1; e < arguments.length; e++) { var r = arguments[e]; for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]) } return t }, dt.apply(this, arguments) }

                function ht(t, e, r) {
                    switch (e) {
                        case "audio":
                            t.audioGroupIds || (t.audioGroupIds = []), t.audioGroupIds.push(r);
                            break;
                        case "text":
                            t.textGroupIds || (t.textGroupIds = []), t.textGroupIds.push(r)
                    }
                }

                function ct(t) {
                    var e = {};
                    t.forEach((function(t) {
                        var r = t.groupId || "";
                        t.id = e[r] = e[r] || 0, e[r]++
                    }))
                }

                function ft(t, e) {
                    var r = e.startPTS;
                    if ((0, a.isFiniteNumber)(r)) {
                        var i, n = 0;
                        e.sn > t.sn ? (n = r - t.start, i = t) : (n = t.start - r, i = e), i.duration !== n && (i.duration = n)
                    } else e.sn > t.sn ? t.cc === e.cc && t.minEndPTS ? e.start = t.start + (t.minEndPTS - t.start) : e.start = t.start + t.duration : e.start = Math.max(t.start - e.duration, 0)
                }

                function gt(t, e, r, i, n, s) {
                    i - r <= 0 && (l.logger.warn("Fragment should have a positive duration", e), i = r + e.duration, s = n + e.duration);
                    var o = r,
                        u = i,
                        d = e.startPTS,
                        h = e.endPTS;
                    if ((0, a.isFiniteNumber)(d)) {
                        var c = Math.abs(d - r);
                        (0, a.isFiniteNumber)(e.deltaPTS) ? e.deltaPTS = Math.max(c, e.deltaPTS): e.deltaPTS = c, o = Math.max(r, d), r = Math.min(r, d), n = Math.min(n, e.startDTS), u = Math.min(i, h), i = Math.max(i, h), s = Math.max(s, e.endDTS)
                    }
                    e.duration = i - r;
                    var f = r - e.start;
                    e.start = e.startPTS = r, e.maxStartPTS = o, e.startDTS = n, e.endPTS = i, e.minEndPTS = u, e.endDTS = s;
                    var g, v = e.sn;
                    if (!t || v < t.startSN || v > t.endSN) return 0;
                    var p = v - t.startSN,
                        m = t.fragments;
                    for (m[p] = e, g = p; g > 0; g--) ft(m[g], m[g - 1]);
                    for (g = p; g < m.length - 1; g++) ft(m[g], m[g + 1]);
                    return t.fragmentHint && ft(m[m.length - 1], t.fragmentHint), t.PTSKnown = t.alignedSliding = !0, f
                }

                function vt(t, e) {
                    var r = e.startSN + e.skippedSegments - t.startSN,
                        i = t.fragments;
                    r < 0 || r >= i.length || pt(e, i[r].start)
                }

                function pt(t, e) {
                    if (e) {
                        for (var r = t.fragments, i = t.skippedSegments; i < r.length; i++) r[i].start += e;
                        t.fragmentHint && (t.fragmentHint.start += e)
                    }
                }
                var mt = function() {
                    function t(t, e) { this.hls = void 0, this.timer = -1, this.requestScheduled = -1, this.canLoad = !1, this.retryCount = 0, this.log = void 0, this.warn = void 0, this.log = l.logger.log.bind(l.logger, e + ":"), this.warn = l.logger.warn.bind(l.logger, e + ":"), this.hls = t }
                    var e = t.prototype;
                    return e.destroy = function() { this.clearTimer(), this.hls = this.log = this.warn = null }, e.onError = function(t, e) {!e.fatal || e.type !== o.ErrorTypes.NETWORK_ERROR && e.type !== o.ErrorTypes.KEY_SYSTEM_ERROR || this.stopLoad() }, e.clearTimer = function() { clearTimeout(this.timer), this.timer = -1 }, e.startLoad = function() { this.canLoad = !0, this.retryCount = 0, this.requestScheduled = -1, this.loadPlaylist() }, e.stopLoad = function() { this.canLoad = !1, this.clearTimer() }, e.switchParams = function(t, e) {
                        var r = null == e ? void 0 : e.renditionReports;
                        if (r)
                            for (var i = 0; i < r.length; i++) {
                                var n = r[i],
                                    a = void 0;
                                try { a = new self.URL(n.URI, e.url).href } catch (t) { l.logger.warn("Could not construct new URL for Rendition Report: " + t), a = n.URI || "" }
                                if (a === t.slice(-a.length)) {
                                    var s = parseInt(n["LAST-MSN"]) || (null == e ? void 0 : e.lastPartSn),
                                        o = parseInt(n["LAST-PART"]) || (null == e ? void 0 : e.lastPartIndex);
                                    if (this.hls.config.lowLatencyMode) {
                                        var u = Math.min(e.age - e.partTarget, e.targetduration);
                                        o >= 0 && u > e.partTarget && (o += 1)
                                    }
                                    return new lt(s, o >= 0 ? o : void 0, st.No)
                                }
                            }
                    }, e.loadPlaylist = function(t) {-1 === this.requestScheduled && (this.requestScheduled = self.performance.now()) }, e.shouldLoadTrack = function(t) { return this.canLoad && t && !!t.url && (!t.details || t.details.live) }, e.playlistLoaded = function(t, e, r) {
                        var i = this,
                            n = e.details,
                            s = e.stats,
                            o = self.performance.now(),
                            u = s.loading.first ? Math.max(0, o - s.loading.first) : 0;
                        if (n.advancedDateTime = Date.now() - u, n.live || null != r && r.live) {
                            if (n.reloaded(r), r && this.log("live playlist " + t + " " + (n.advanced ? "REFRESHED " + n.lastPartSn + "-" + n.lastPartIndex : "MISSED")), r && n.fragments.length > 0 && function(t, e) {
                                    for (var r = null, i = t.fragments, n = i.length - 1; n >= 0; n--) { var s = i[n].initSegment; if (s) { r = s; break } }
                                    t.fragmentHint && delete t.fragmentHint.endPTS;
                                    var o, u, d, h, c, f = 0;
                                    if (function(t, e, r) {
                                            for (var i = e.skippedSegments, n = Math.max(t.startSN, e.startSN) - e.startSN, a = (t.fragmentHint ? 1 : 0) + (i ? e.endSN : Math.min(t.endSN, e.endSN)) - e.startSN, s = e.startSN - t.startSN, o = e.fragmentHint ? e.fragments.concat(e.fragmentHint) : e.fragments, l = t.fragmentHint ? t.fragments.concat(t.fragmentHint) : t.fragments, u = n; u <= a; u++) {
                                                var d = l[s + u],
                                                    h = o[u];
                                                i && !h && u < i && (h = e.fragments[u] = d), d && h && r(d, h)
                                            }
                                        }(t, e, (function(t, i) { t.relurl && (f = t.cc - i.cc), (0, a.isFiniteNumber)(t.startPTS) && (0, a.isFiniteNumber)(t.endPTS) && (i.start = i.startPTS = t.startPTS, i.startDTS = t.startDTS, i.appendedPTS = t.appendedPTS, i.maxStartPTS = t.maxStartPTS, i.endPTS = t.endPTS, i.endDTS = t.endDTS, i.minEndPTS = t.minEndPTS, i.duration = t.endPTS - t.startPTS, i.duration && (o = i), e.PTSKnown = e.alignedSliding = !0), i.elementaryStreams = t.elementaryStreams, i.loader = t.loader, i.stats = t.stats, i.urlId = t.urlId, t.initSegment && (i.initSegment = t.initSegment, r = t.initSegment) })), r && (e.fragmentHint ? e.fragments.concat(e.fragmentHint) : e.fragments).forEach((function(t) {
                                            var e;
                                            t.initSegment && t.initSegment.relurl !== (null === (e = r) || void 0 === e ? void 0 : e.relurl) || (t.initSegment = r)
                                        })), e.skippedSegments)
                                        if (e.deltaUpdateFailed = e.fragments.some((function(t) { return !t })), e.deltaUpdateFailed) {
                                            l.logger.warn("[level-helper] Previous playlist missing segments skipped in delta playlist");
                                            for (var v = e.skippedSegments; v--;) e.fragments.shift();
                                            e.startSN = e.fragments[0].sn, e.startCC = e.fragments[0].cc
                                        } else e.canSkipDateRanges && (e.dateRanges = (u = t.dateRanges, d = e.dateRanges, h = e.recentlyRemovedDateranges, c = dt({}, u), h && h.forEach((function(t) { delete c[t] })), Object.keys(d).forEach((function(t) {
                                            var e = new g(d[t].attr, c[t]);
                                            e.isValid ? c[t] = e : l.logger.warn('Ignoring invalid Playlist Delta Update DATERANGE tag: "' + JSON.stringify(d[t].attr) + '"')
                                        })), c));
                                    var p = e.fragments;
                                    if (f) { l.logger.warn("discontinuity sliding from playlist, take drift into account"); for (var m = 0; m < p.length; m++) p[m].cc += f }
                                    e.skippedSegments && (e.startCC = e.fragments[0].cc),
                                        function(t, e, r) {
                                            if (t && e)
                                                for (var i = 0, n = 0, a = t.length; n <= a; n++) {
                                                    var s = t[n],
                                                        o = e[n + i];
                                                    s && o && s.index === o.index && s.fragment.sn === o.fragment.sn ? (l = s, (u = o).elementaryStreams = l.elementaryStreams, u.stats = l.stats) : i--
                                                }
                                            var l, u
                                        }(t.partList, e.partList), o ? gt(e, o, o.startPTS, o.endPTS, o.startDTS, o.endDTS) : vt(t, e), p.length && (e.totalduration = e.edge - p[0].start), e.driftStartTime = t.driftStartTime, e.driftStart = t.driftStart;
                                    var y = e.advancedDateTime;
                                    if (e.advanced && y) {
                                        var E = e.edge;
                                        e.driftStart || (e.driftStartTime = y, e.driftStart = E), e.driftEndTime = y, e.driftEnd = E
                                    } else e.driftEndTime = t.driftEndTime, e.driftEnd = t.driftEnd, e.advancedDateTime = t.advancedDateTime
                                }(r, n), !this.canLoad || !n.live) return;
                            var d, h = void 0,
                                c = void 0;
                            if (n.canBlockReload && n.endSN && n.advanced) {
                                var f = this.hls.config.lowLatencyMode,
                                    v = n.lastPartSn,
                                    p = n.endSN,
                                    m = n.lastPartIndex,
                                    y = v === p; - 1 !== m ? (h = y ? p + 1 : v, c = y ? f ? 0 : m : m + 1) : h = p + 1;
                                var E = n.age,
                                    T = E + n.ageHeader,
                                    S = Math.min(T - n.partTarget, 1.5 * n.targetduration);
                                if (S > 0) {
                                    if (r && S > r.tuneInGoal) this.warn("CDN Tune-in goal increased from: " + r.tuneInGoal + " to: " + S + " with playlist age: " + n.age), S = 0;
                                    else {
                                        var b = Math.floor(S / n.targetduration);
                                        h += b, void 0 !== c && (c += Math.round(S % n.targetduration / n.partTarget)), this.log("CDN Tune-in age: " + n.ageHeader + "s last advanced " + E.toFixed(2) + "s goal: " + S + " skip sn " + b + " to part " + c)
                                    }
                                    n.tuneInGoal = S
                                }
                                if (d = this.getDeliveryDirectives(n, e.deliveryDirectives, h, c), f || !y) return void this.loadPlaylist(d)
                            } else d = this.getDeliveryDirectives(n, e.deliveryDirectives, h, c);
                            var L = this.hls.mainForwardBufferInfo,
                                A = L ? L.end - L.len : 0,
                                D = function(t, e) {
                                    void 0 === e && (e = 1 / 0);
                                    var r = 1e3 * t.targetduration;
                                    if (t.updated) {
                                        var i = t.fragments;
                                        if (i.length && 4 * r > e) {
                                            var n = 1e3 * i[i.length - 1].duration;
                                            n < r && (r = n)
                                        }
                                    } else r /= 2;
                                    return Math.round(r)
                                }(n, 1e3 * (n.edge - A));
                            n.updated ? o > this.requestScheduled + D && (this.requestScheduled = s.loading.start) : this.requestScheduled = -1, void 0 !== h && n.canBlockReload ? this.requestScheduled = s.loading.first + D - (1e3 * n.partTarget || 1e3) : this.requestScheduled = (-1 === this.requestScheduled ? o : this.requestScheduled) + D;
                            var k = this.requestScheduled - o;
                            k = Math.max(0, k), this.log("reload live playlist " + t + " in " + Math.round(k) + " ms"), this.timer = self.setTimeout((function() { return i.loadPlaylist(d) }), k)
                        } else this.clearTimer()
                    }, e.getDeliveryDirectives = function(t, e, r, i) {
                        var n = function(t, e) {
                            var r = t.canSkipUntil,
                                i = t.canSkipDateRanges,
                                n = t.endSN;
                            return r && (void 0 !== e ? e - n : 0) < r ? i ? st.v2 : st.Yes : st.No
                        }(t, r);
                        return null != e && e.skip && t.deltaUpdateFailed && (r = e.msn, i = e.part, n = st.No), new lt(r, i, n)
                    }, e.retryLoadingOrFail = function(t) {
                        var e, r = this,
                            i = this.hls.config,
                            n = this.retryCount < i.levelLoadingMaxRetry;
                        if (n)
                            if (this.requestScheduled = -1, this.retryCount++, t.details.indexOf("LoadTimeOut") > -1 && null !== (e = t.context) && void 0 !== e && e.deliveryDirectives) this.warn("retry playlist loading #" + this.retryCount + ' after "' + t.details + '"'), this.loadPlaylist();
                            else {
                                var a = Math.min(Math.pow(2, this.retryCount) * i.levelLoadingRetryDelay, i.levelLoadingMaxRetryTimeout);
                                this.timer = self.setTimeout((function() { return r.loadPlaylist() }), a), this.warn("retry playlist loading #" + this.retryCount + " in " + a + ' ms after "' + t.details + '"')
                            }
                        else this.warn('cannot recover from error "' + t.details + '"'), this.clearTimer(), t.fatal = !0;
                        return n
                    }, t
                }();

                function yt() { return yt = Object.assign ? Object.assign.bind() : function(t) { for (var e = 1; e < arguments.length; e++) { var r = arguments[e]; for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]) } return t }, yt.apply(this, arguments) }

                function Et(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var i = e[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, (void 0, "symbol" == typeof(n = function(t, e) { if ("object" != typeof t || null === t) return t; var r = t[Symbol.toPrimitive]; if (void 0 !== r) { var i = r.call(t, e); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value.") } return String(t) }(i.key, "string")) ? n : String(n)), i)
                    }
                    var n
                }

                function Tt(t, e) { return Tt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) { return t.__proto__ = e, t }, Tt(t, e) }
                var St, bt = /chrome|firefox/.test(navigator.userAgent.toLowerCase()),
                    Lt = function(t) {
                        var e, r;

                        function i(e) { var r; return (r = t.call(this, e, "[level-controller]") || this)._levels = [], r._firstLevel = -1, r._startLevel = void 0, r.currentLevelIndex = -1, r.manualLevelIndex = -1, r.onParsedComplete = void 0, r._registerListeners(), r }
                        r = t, (e = i).prototype = Object.create(r.prototype), e.prototype.constructor = e, Tt(e, r);
                        var n, a, l = i.prototype;
                        return l._registerListeners = function() {
                            var t = this.hls;
                            t.on(s.Events.MANIFEST_LOADED, this.onManifestLoaded, this), t.on(s.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.on(s.Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), t.on(s.Events.FRAG_LOADED, this.onFragLoaded, this), t.on(s.Events.ERROR, this.onError, this)
                        }, l._unregisterListeners = function() {
                            var t = this.hls;
                            t.off(s.Events.MANIFEST_LOADED, this.onManifestLoaded, this), t.off(s.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.off(s.Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), t.off(s.Events.FRAG_LOADED, this.onFragLoaded, this), t.off(s.Events.ERROR, this.onError, this)
                        }, l.destroy = function() { this._unregisterListeners(), this.manualLevelIndex = -1, this._levels.length = 0, t.prototype.destroy.call(this) }, l.startLoad = function() { this._levels.forEach((function(t) { t.loadError = 0 })), t.prototype.startLoad.call(this) }, l.onManifestLoaded = function(t, e) {
                            var r, i, n = [],
                                a = [],
                                l = [],
                                u = {},
                                d = !1,
                                h = !1,
                                c = !1;
                            if (e.levels.forEach((function(t) {
                                    var e = t.attrs;
                                    d = d || !(!t.width || !t.height), h = h || !!t.videoCodec, c = c || !!t.audioCodec, bt && t.audioCodec && -1 !== t.audioCodec.indexOf("mp4a.40.34") && (t.audioCodec = void 0);
                                    var r = t.bitrate + "-" + t.attrs.RESOLUTION + "-" + t.attrs.CODECS;
                                    (i = u[r]) ? i.url.push(t.url): (i = new ut(t), u[r] = i, n.push(i)), e && (e.AUDIO && ht(i, "audio", e.AUDIO), e.SUBTITLES && ht(i, "text", e.SUBTITLES))
                                })), (d || h) && c && (n = n.filter((function(t) {
                                    var e = t.videoCodec,
                                        r = t.width,
                                        i = t.height;
                                    return !!e || !(!r || !i)
                                }))), n = n.filter((function(t) {
                                    var e = t.audioCodec,
                                        r = t.videoCodec;
                                    return (!e || _(e, "audio")) && (!r || _(r, "video"))
                                })), e.audioTracks && ct(a = e.audioTracks.filter((function(t) { return !t.audioCodec || _(t.audioCodec, "audio") }))), e.subtitles && ct(l = e.subtitles), n.length > 0) {
                                r = n[0].bitrate, n.sort((function(t, e) { return t.attrs["HDCP-LEVEL"] !== e.attrs["HDCP-LEVEL"] ? (t.attrs["HDCP-LEVEL"] || "") > (e.attrs["HDCP-LEVEL"] || "") ? 1 : -1 : t.bitrate !== e.bitrate ? t.bitrate - e.bitrate : t.attrs.SCORE !== e.attrs.SCORE ? t.attrs.decimalFloatingPoint("SCORE") - e.attrs.decimalFloatingPoint("SCORE") : d && t.height !== e.height ? t.height - e.height : 0 })), this._levels = n;
                                for (var f = 0; f < n.length; f++)
                                    if (n[f].bitrate === r) { this._firstLevel = f, this.log("manifest loaded, " + n.length + " level(s) found, first bitrate: " + r); break }
                                var g = c && !h,
                                    v = { levels: n, audioTracks: a, subtitleTracks: l, sessionData: e.sessionData, sessionKeys: e.sessionKeys, firstLevel: this._firstLevel, stats: e.stats, audio: c, video: h, altAudio: !g && a.some((function(t) { return !!t.url })) };
                                this.hls.trigger(s.Events.MANIFEST_PARSED, v), (this.hls.config.autoStartLoad || this.hls.forceStartLoad) && this.hls.startLoad(this.hls.config.startPosition)
                            } else this.hls.trigger(s.Events.ERROR, { type: o.ErrorTypes.MEDIA_ERROR, details: o.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR, fatal: !0, url: e.url, reason: "no level with compatible codecs found in manifest" })
                        }, l.onError = function(e, r) {
                            var i, n;
                            if (t.prototype.onError.call(this, e, r), !r.fatal) {
                                var a = r.context,
                                    s = this._levels[this.currentLevelIndex];
                                if (a && (a.type === V.PlaylistContextType.AUDIO_TRACK && s.audioGroupIds && a.groupId === s.audioGroupIds[s.urlId] || a.type === V.PlaylistContextType.SUBTITLE_TRACK && s.textGroupIds && a.groupId === s.textGroupIds[s.urlId])) this.redundantFailover(this.currentLevelIndex);
                                else {
                                    var l, u = !1,
                                        d = !0;
                                    switch (r.details) {
                                        case o.ErrorDetails.FRAG_LOAD_ERROR:
                                        case o.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                        case o.ErrorDetails.KEY_LOAD_ERROR:
                                        case o.ErrorDetails.KEY_LOAD_TIMEOUT:
                                            if (r.frag) {
                                                var h = r.frag.type === V.PlaylistLevelType.MAIN ? r.frag.level : this.currentLevelIndex,
                                                    c = this._levels[h];
                                                c ? (c.fragmentError++, c.fragmentError > this.hls.config.fragLoadingMaxRetry && (l = h)) : l = h
                                            }
                                            break;
                                        case o.ErrorDetails.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED:
                                            var f = s.attrs["HDCP-LEVEL"];
                                            f && (this.hls.maxHdcpLevel = ot[ot.indexOf(f) - 1], this.warn('Restricting playback to HDCP-LEVEL of "' + this.hls.maxHdcpLevel + '" or lower'));
                                        case o.ErrorDetails.FRAG_PARSING_ERROR:
                                        case o.ErrorDetails.KEY_SYSTEM_NO_SESSION:
                                            l = (null === (i = r.frag) || void 0 === i ? void 0 : i.type) === V.PlaylistLevelType.MAIN ? r.frag.level : this.currentLevelIndex, r.levelRetry = !1;
                                            break;
                                        case o.ErrorDetails.LEVEL_LOAD_ERROR:
                                        case o.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                                            a && (a.deliveryDirectives && (d = !1), l = a.level), u = !0;
                                            break;
                                        case o.ErrorDetails.REMUX_ALLOC_ERROR:
                                            l = null != (n = r.level) ? n : this.currentLevelIndex, u = !0
                                    }
                                    void 0 !== l && this.recoverLevel(r, l, u, d)
                                }
                            }
                        }, l.recoverLevel = function(t, e, r, i) {
                            var n = t.details,
                                a = this._levels[e];
                            if (a.loadError++, r) {
                                if (!this.retryLoadingOrFail(t)) return void(this.currentLevelIndex = -1);
                                t.levelRetry = !0
                            }
                            if (i) {
                                var s = a.url.length;
                                if (s > 1 && a.loadError < s) t.levelRetry = !0, this.redundantFailover(e);
                                else if (-1 === this.manualLevelIndex) {
                                    for (var o = -1, l = this._levels, u = l.length; u--;) { var d = (u + this.currentLevelIndex) % l.length; if (d !== this.currentLevelIndex && 0 === l[d].loadError) { o = d; break } }
                                    o > -1 && this.currentLevelIndex !== o ? (this.warn(n + ": switch to " + o), t.levelRetry = !0, this.hls.nextAutoLevel = o) : !1 === t.levelRetry && (t.fatal = !0)
                                }
                            }
                        }, l.redundantFailover = function(t) {
                            var e = this._levels[t],
                                r = e.url.length;
                            if (r > 1) {
                                var i = (e.urlId + 1) % r;
                                this.warn("Switching to redundant URL-id " + i), this._levels.forEach((function(t) { t.urlId = i })), this.level = t
                            }
                        }, l.onFragLoaded = function(t, e) {
                            var r = e.frag;
                            if (void 0 !== r && r.type === V.PlaylistLevelType.MAIN) {
                                var i = this._levels[r.level];
                                void 0 !== i && (i.fragmentError = 0, i.loadError = 0)
                            }
                        }, l.onLevelLoaded = function(t, e) {
                            var r, i, n = e.level,
                                a = e.details,
                                s = this._levels[n];
                            if (!s) return this.warn("Invalid level index " + n), void(null !== (i = e.deliveryDirectives) && void 0 !== i && i.skip && (a.deltaUpdateFailed = !0));
                            n === this.currentLevelIndex ? (0 === s.fragmentError && (s.loadError = 0, this.retryCount = 0), this.playlistLoaded(n, e, s.details)) : null !== (r = e.deliveryDirectives) && void 0 !== r && r.skip && (a.deltaUpdateFailed = !0)
                        }, l.onAudioTrackSwitched = function(t, e) {
                            var r = this.hls.levels[this.currentLevelIndex];
                            if (r && r.audioGroupIds) {
                                for (var i = -1, n = this.hls.audioTracks[e.id].groupId, a = 0; a < r.audioGroupIds.length; a++)
                                    if (r.audioGroupIds[a] === n) { i = a; break }
                                i !== r.urlId && (r.urlId = i, this.startLoad())
                            }
                        }, l.loadPlaylist = function(e) {
                            t.prototype.loadPlaylist.call(this);
                            var r = this.currentLevelIndex,
                                i = this._levels[r];
                            if (this.canLoad && i && i.url.length > 0) {
                                var n = i.urlId,
                                    a = i.url[n];
                                if (e) try { a = e.addDirectives(a) } catch (t) { this.warn("Could not construct new URL with HLS Delivery Directives: " + t) }
                                this.log("Attempt loading level index " + r + (void 0 !== (null == e ? void 0 : e.msn) ? " at sn " + e.msn + " part " + e.part : "") + " with URL-id " + n + " " + a), this.clearTimer(), this.hls.trigger(s.Events.LEVEL_LOADING, { url: a, level: r, id: n, deliveryDirectives: e || null })
                            }
                        }, l.removeLevel = function(t, e) {
                            var r = function(t, r) { return r !== e },
                                i = this._levels.filter((function(i, n) { return n !== t || i.url.length > 1 && void 0 !== e && (i.url = i.url.filter(r), i.audioGroupIds && (i.audioGroupIds = i.audioGroupIds.filter(r)), i.textGroupIds && (i.textGroupIds = i.textGroupIds.filter(r)), i.urlId = 0, !0) })).map((function(t, e) { var r = t.details; return null != r && r.fragments && r.fragments.forEach((function(t) { t.level = e })), t }));
                            this._levels = i, this.hls.trigger(s.Events.LEVELS_UPDATED, { levels: i })
                        }, n = i, (a = [{ key: "levels", get: function() { return 0 === this._levels.length ? null : this._levels } }, {
                            key: "level",
                            get: function() { return this.currentLevelIndex },
                            set: function(t) {
                                var e, r = this._levels;
                                if (0 !== r.length && (this.currentLevelIndex !== t || null === (e = r[t]) || void 0 === e || !e.details)) {
                                    if (t < 0 || t >= r.length) {
                                        var i = t < 0;
                                        if (this.hls.trigger(s.Events.ERROR, { type: o.ErrorTypes.OTHER_ERROR, details: o.ErrorDetails.LEVEL_SWITCH_ERROR, level: t, fatal: i, reason: "invalid level idx" }), i) return;
                                        t = Math.min(t, r.length - 1)
                                    }
                                    this.clearTimer();
                                    var n = this.currentLevelIndex,
                                        a = r[n],
                                        l = r[t];
                                    this.log("switching to level " + t + " from " + n), this.currentLevelIndex = t;
                                    var u = yt({}, l, { level: t, maxBitrate: l.maxBitrate, uri: l.uri, urlId: l.urlId });
                                    delete u._urlId, this.hls.trigger(s.Events.LEVEL_SWITCHING, u);
                                    var d = l.details;
                                    if (!d || d.live) {
                                        var h = this.switchParams(l.uri, null == a ? void 0 : a.details);
                                        this.loadPlaylist(h)
                                    }
                                }
                            }
                        }, { key: "manualLevel", get: function() { return this.manualLevelIndex }, set: function(t) { this.manualLevelIndex = t, void 0 === this._startLevel && (this._startLevel = t), -1 !== t && (this.level = t) } }, { key: "firstLevel", get: function() { return this._firstLevel }, set: function(t) { this._firstLevel = t } }, { key: "startLevel", get: function() { if (void 0 === this._startLevel) { var t = this.hls.config.startLevel; return void 0 !== t ? t : this._firstLevel } return this._startLevel }, set: function(t) { this._startLevel = t } }, { key: "nextLoadLevel", get: function() { return -1 !== this.manualLevelIndex ? this.manualLevelIndex : this.hls.nextAutoLevel }, set: function(t) { this.level = t, -1 === this.manualLevelIndex && (this.hls.nextAutoLevel = t) } }]) && Et(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), i
                    }(mt);
                ! function(t) { t.NOT_LOADED = "NOT_LOADED", t.APPENDING = "APPENDING", t.PARTIAL = "PARTIAL", t.OK = "OK" }(St || (St = {}));
                var At = function() {
                    function t(t) { this.activeFragment = null, this.activeParts = null, this.endListFragments = Object.create(null), this.fragments = Object.create(null), this.timeRanges = Object.create(null), this.bufferPadding = .2, this.hls = void 0, this.hls = t, this._registerListeners() }
                    var e = t.prototype;
                    return e._registerListeners = function() {
                        var t = this.hls;
                        t.on(s.Events.BUFFER_APPENDED, this.onBufferAppended, this), t.on(s.Events.FRAG_BUFFERED, this.onFragBuffered, this), t.on(s.Events.FRAG_LOADED, this.onFragLoaded, this)
                    }, e._unregisterListeners = function() {
                        var t = this.hls;
                        t.off(s.Events.BUFFER_APPENDED, this.onBufferAppended, this), t.off(s.Events.FRAG_BUFFERED, this.onFragBuffered, this), t.off(s.Events.FRAG_LOADED, this.onFragLoaded, this)
                    }, e.destroy = function() { this._unregisterListeners(), this.fragments = this.endListFragments = this.timeRanges = this.activeFragment = this.activeParts = null }, e.getAppendedFrag = function(t, e) {
                        if (e === V.PlaylistLevelType.MAIN) {
                            var r = this.activeFragment,
                                i = this.activeParts;
                            if (!r) return null;
                            if (i)
                                for (var n = i.length; n--;) {
                                    var a = i[n],
                                        s = a ? a.end : r.appendedPTS;
                                    if (a.start <= t && void 0 !== s && t <= s) return n > 9 && (this.activeParts = i.slice(n - 9)), a
                                } else if (r.start <= t && void 0 !== r.appendedPTS && t <= r.appendedPTS) return r
                        }
                        return this.getBufferedFrag(t, e)
                    }, e.getBufferedFrag = function(t, e) { for (var r = this.fragments, i = Object.keys(r), n = i.length; n--;) { var a = r[i[n]]; if ((null == a ? void 0 : a.body.type) === e && a.buffered) { var s = a.body; if (s.start <= t && t <= s.end) return s } } return null }, e.detectEvictedFragments = function(t, e, r) {
                        var i = this;
                        this.timeRanges && (this.timeRanges[t] = e), Object.keys(this.fragments).forEach((function(n) {
                            var a = i.fragments[n];
                            if (a)
                                if (a.buffered || a.loaded) {
                                    var s = a.range[t];
                                    s && s.time.some((function(t) { var r = !i.isTimeBuffered(t.startPTS, t.endPTS, e); return r && i.removeFragment(a.body), r }))
                                } else a.body.type === r && i.removeFragment(a.body)
                        }))
                    }, e.detectPartialFragments = function(t) {
                        var e = this,
                            r = this.timeRanges,
                            i = t.frag,
                            n = t.part;
                        if (r && "initSegment" !== i.sn) {
                            var a = kt(i),
                                s = this.fragments[a];
                            s && (Object.keys(r).forEach((function(t) {
                                var a = i.elementaryStreams[t];
                                if (a) {
                                    var o = r[t],
                                        l = null !== n || !0 === a.partial;
                                    s.range[t] = e.getBufferedTimes(i, n, l, o)
                                }
                            })), s.loaded = null, Object.keys(s.range).length ? (s.buffered = !0, s.body.endList && (this.endListFragments[s.body.type] = s)) : this.removeFragment(s.body))
                        }
                    }, e.fragBuffered = function(t) {
                        var e = kt(t),
                            r = this.fragments[e];
                        r && (r.loaded = null, r.buffered = !0)
                    }, e.getBufferedTimes = function(t, e, r, i) {
                        for (var n = { time: [], partial: r }, a = e ? e.start : t.start, s = e ? e.end : t.end, o = t.minEndPTS || s, l = t.maxStartPTS || a, u = 0; u < i.length; u++) {
                            var d = i.start(u) - this.bufferPadding,
                                h = i.end(u) + this.bufferPadding;
                            if (l >= d && o <= h) { n.time.push({ startPTS: Math.max(a, i.start(u)), endPTS: Math.min(s, i.end(u)) }); break }
                            if (a < h && s > d) n.partial = !0, n.time.push({ startPTS: Math.max(a, i.start(u)), endPTS: Math.min(s, i.end(u)) });
                            else if (s <= d) break
                        }
                        return n
                    }, e.getPartialFragment = function(t) {
                        var e, r, i, n = null,
                            a = 0,
                            s = this.bufferPadding,
                            o = this.fragments;
                        return Object.keys(o).forEach((function(l) {
                            var u = o[l];
                            u && Dt(u) && (r = u.body.start - s, i = u.body.end + s, t >= r && t <= i && (e = Math.min(t - r, i - t), a <= e && (n = u.body, a = e)))
                        })), n
                    }, e.isEndListAppended = function(t) { var e = this.endListFragments[t]; return void 0 !== e && (e.buffered || Dt(e)) }, e.getState = function(t) {
                        var e = kt(t),
                            r = this.fragments[e];
                        return r ? r.buffered ? Dt(r) ? St.PARTIAL : St.OK : St.APPENDING : St.NOT_LOADED
                    }, e.isTimeBuffered = function(t, e, r) { for (var i, n, a = 0; a < r.length; a++) { if (i = r.start(a) - this.bufferPadding, n = r.end(a) + this.bufferPadding, t >= i && e <= n) return !0; if (e <= i) return !1 } return !1 }, e.onFragLoaded = function(t, e) {
                        var r = e.frag,
                            i = e.part;
                        if ("initSegment" !== r.sn && !r.bitrateTest && !i) {
                            var n = kt(r);
                            this.fragments[n] = { body: r, loaded: e, buffered: !1, range: Object.create(null) }
                        }
                    }, e.onBufferAppended = function(t, e) {
                        var r = this,
                            i = e.frag,
                            n = e.part,
                            a = e.timeRanges;
                        if (i.type === V.PlaylistLevelType.MAIN)
                            if (this.activeFragment !== i && (this.activeFragment = i, i.appendedPTS = void 0), n) {
                                var s = this.activeParts;
                                s || (this.activeParts = s = []), s.push(n)
                            } else this.activeParts = null;
                        this.timeRanges = a, Object.keys(a).forEach((function(t) {
                            var e = a[t];
                            if (r.detectEvictedFragments(t, e), !n && i.type === V.PlaylistLevelType.MAIN) {
                                var s = i.elementaryStreams[t];
                                if (!s) return;
                                for (var o = 0; o < e.length; o++) {
                                    var l = e.end(o);
                                    l <= s.endPTS && l > s.startPTS ? i.appendedPTS = Math.max(l, i.appendedPTS || 0) : i.appendedPTS = s.endPTS
                                }
                            }
                        }))
                    }, e.onFragBuffered = function(t, e) { this.detectPartialFragments(e) }, e.hasFragment = function(t) { var e = kt(t); return !!this.fragments[e] }, e.removeFragmentsInRange = function(t, e, r) {
                        var i = this;
                        Object.keys(this.fragments).forEach((function(n) {
                            var a = i.fragments[n];
                            if (a && a.buffered) {
                                var s = a.body;
                                s.type === r && s.start < e && s.end > t && i.removeFragment(s)
                            }
                        }))
                    }, e.removeFragment = function(t) {
                        var e = kt(t);
                        t.stats.loaded = 0, t.clearElementaryStreamInfo(), t.appendedPTS = void 0, delete this.fragments[e], t.endList && delete this.endListFragments[t.type]
                    }, e.removeAllFragments = function() { this.fragments = Object.create(null), this.endListFragments = Object.create(null), this.activeFragment = null, this.activeParts = null }, t
                }();

                function Dt(t) { var e, r; return t.buffered && ((null === (e = t.range.video) || void 0 === e ? void 0 : e.partial) || (null === (r = t.range.audio) || void 0 === r ? void 0 : r.partial)) }

                function kt(t) { return t.type + "_" + t.level + "_" + t.urlId + "_" + t.sn }

                function Rt(t) {
                    var e = "function" == typeof Map ? new Map : void 0;
                    return Rt = function(t) {
                        if (null === t || (r = t, -1 === Function.toString.call(r).indexOf("[native code]"))) return t;
                        var r;
                        if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
                        if (void 0 !== e) {
                            if (e.has(t)) return e.get(t);
                            e.set(t, i)
                        }

                        function i() { return It(t, arguments, _t(this).constructor) }
                        return i.prototype = Object.create(t.prototype, { constructor: { value: i, enumerable: !1, writable: !0, configurable: !0 } }), Ct(i, t)
                    }, Rt(t)
                }

                function It(t, e, r) {
                    return It = wt() ? Reflect.construct.bind() : function(t, e, r) {
                        var i = [null];
                        i.push.apply(i, e);
                        var n = new(Function.bind.apply(t, i));
                        return r && Ct(n, r.prototype), n
                    }, It.apply(null, arguments)
                }

                function wt() { if ("undefined" == typeof Reflect || !Reflect.construct) return !1; if (Reflect.construct.sham) return !1; if ("function" == typeof Proxy) return !0; try { return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0 } catch (t) { return !1 } }

                function Ct(t, e) { return Ct = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) { return t.__proto__ = e, t }, Ct(t, e) }

                function _t(t) { return _t = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) { return t.__proto__ || Object.getPrototypeOf(t) }, _t(t) }
                var Pt = Math.pow(2, 17),
                    Ot = function() {
                        function t(t) { this.config = void 0, this.loader = null, this.partLoadTimeout = -1, this.config = t }
                        var e = t.prototype;
                        return e.destroy = function() { this.loader && (this.loader.destroy(), this.loader = null) }, e.abort = function() { this.loader && this.loader.abort() }, e.load = function(t, e) {
                            var r = this,
                                i = t.url;
                            if (!i) return Promise.reject(new Ft({ type: o.ErrorTypes.NETWORK_ERROR, details: o.ErrorDetails.FRAG_LOAD_ERROR, fatal: !1, frag: t, networkDetails: null }, "Fragment does not have a " + (i ? "part list" : "url")));
                            this.abort();
                            var n = this.config,
                                a = n.fLoader,
                                s = n.loader;
                            return new Promise((function(i, l) {
                                r.loader && r.loader.destroy();
                                var u = r.loader = t.loader = a ? new a(n) : new s(n),
                                    d = xt(t),
                                    h = { timeout: n.fragLoadingTimeOut, maxRetry: 0, retryDelay: 0, maxRetryDelay: n.fragLoadingMaxRetryTimeout, highWaterMark: "initSegment" === t.sn ? 1 / 0 : Pt };
                                t.stats = u.stats, u.load(d, h, {
                                    onSuccess: function(e, n, a, s) {
                                        r.resetLoader(t, u);
                                        var o = e.data;
                                        a.resetIV && t.decryptdata && (t.decryptdata.iv = new Uint8Array(o.slice(0, 16)), o = o.slice(16)), i({ frag: t, part: null, payload: o, networkDetails: s })
                                    },
                                    onError: function(e, i, n) { r.resetLoader(t, u), l(new Ft({ type: o.ErrorTypes.NETWORK_ERROR, details: o.ErrorDetails.FRAG_LOAD_ERROR, fatal: !1, frag: t, response: e, networkDetails: n })) },
                                    onAbort: function(e, i, n) { r.resetLoader(t, u), l(new Ft({ type: o.ErrorTypes.NETWORK_ERROR, details: o.ErrorDetails.INTERNAL_ABORTED, fatal: !1, frag: t, networkDetails: n })) },
                                    onTimeout: function(e, i, n) { r.resetLoader(t, u), l(new Ft({ type: o.ErrorTypes.NETWORK_ERROR, details: o.ErrorDetails.FRAG_LOAD_TIMEOUT, fatal: !1, frag: t, networkDetails: n })) },
                                    onProgress: function(r, i, n, a) { e && e({ frag: t, part: null, payload: n, networkDetails: a }) }
                                })
                            }))
                        }, e.loadPart = function(t, e, r) {
                            var i = this;
                            this.abort();
                            var n = this.config,
                                a = n.fLoader,
                                s = n.loader;
                            return new Promise((function(l, u) {
                                i.loader && i.loader.destroy();
                                var d = i.loader = t.loader = a ? new a(n) : new s(n),
                                    h = xt(t, e),
                                    c = { timeout: n.fragLoadingTimeOut, maxRetry: 0, retryDelay: 0, maxRetryDelay: n.fragLoadingMaxRetryTimeout, highWaterMark: Pt };
                                e.stats = d.stats, d.load(h, c, {
                                    onSuccess: function(n, a, s, o) {
                                        i.resetLoader(t, d), i.updateStatsFromPart(t, e);
                                        var u = { frag: t, part: e, payload: n.data, networkDetails: o };
                                        r(u), l(u)
                                    },
                                    onError: function(r, n, a) { i.resetLoader(t, d), u(new Ft({ type: o.ErrorTypes.NETWORK_ERROR, details: o.ErrorDetails.FRAG_LOAD_ERROR, fatal: !1, frag: t, part: e, response: r, networkDetails: a })) },
                                    onAbort: function(r, n, a) { t.stats.aborted = e.stats.aborted, i.resetLoader(t, d), u(new Ft({ type: o.ErrorTypes.NETWORK_ERROR, details: o.ErrorDetails.INTERNAL_ABORTED, fatal: !1, frag: t, part: e, networkDetails: a })) },
                                    onTimeout: function(r, n, a) { i.resetLoader(t, d), u(new Ft({ type: o.ErrorTypes.NETWORK_ERROR, details: o.ErrorDetails.FRAG_LOAD_TIMEOUT, fatal: !1, frag: t, part: e, networkDetails: a })) }
                                })
                            }))
                        }, e.updateStatsFromPart = function(t, e) {
                            var r = t.stats,
                                i = e.stats,
                                n = i.total;
                            if (r.loaded += i.loaded, n) {
                                var a = Math.round(t.duration / e.duration),
                                    s = Math.min(Math.round(r.loaded / n), a),
                                    o = (a - s) * Math.round(r.loaded / s);
                                r.total = r.loaded + o
                            } else r.total = Math.max(r.loaded, r.total);
                            var l = r.loading,
                                u = i.loading;
                            l.start ? l.first += u.first - u.start : (l.start = u.start, l.first = u.first), l.end = u.end
                        }, e.resetLoader = function(t, e) { t.loader = null, this.loader === e && (self.clearTimeout(this.partLoadTimeout), this.loader = null), e.destroy() }, t
                    }();

                function xt(t, e) {
                    void 0 === e && (e = null);
                    var r = e || t,
                        i = { frag: t, part: e, responseType: "arraybuffer", url: r.url, headers: {}, rangeStart: 0, rangeEnd: 0 },
                        n = r.byteRangeStartOffset,
                        s = r.byteRangeEndOffset;
                    if ((0, a.isFiniteNumber)(n) && (0, a.isFiniteNumber)(s)) {
                        var o, l = n,
                            u = s;
                        if ("initSegment" === t.sn && "AES-128" === (null === (o = t.decryptdata) || void 0 === o ? void 0 : o.method)) {
                            var d = s - n;
                            d % 16 && (u = s + (16 - d % 16)), 0 !== n && (i.resetIV = !0, l = n - 16)
                        }
                        i.rangeStart = l, i.rangeEnd = u
                    }
                    return i
                }
                var Ft = function(t) {
                        var e, r;

                        function i(e) { for (var r, i = arguments.length, n = new Array(i > 1 ? i - 1 : 0), a = 1; a < i; a++) n[a - 1] = arguments[a]; return (r = t.call.apply(t, [this].concat(n)) || this).data = void 0, r.data = e, r }
                        return r = t, (e = i).prototype = Object.create(r.prototype), e.prototype.constructor = e, Ct(e, r), i
                    }(Rt(Error)),
                    Mt = function() {
                        function t(t) { this.config = void 0, this.keyUriToKeyInfo = {}, this.emeController = null, this.config = t }
                        var e = t.prototype;
                        return e.abort = function() {
                            for (var t in this.keyUriToKeyInfo) {
                                var e = this.keyUriToKeyInfo[t].loader;
                                e && e.abort()
                            }
                        }, e.detach = function() {
                            for (var t in this.keyUriToKeyInfo) {
                                var e = this.keyUriToKeyInfo[t];
                                (e.mediaKeySessionContext || e.decryptdata.isCommonEncryption) && delete this.keyUriToKeyInfo[t]
                            }
                        }, e.destroy = function() {
                            for (var t in this.detach(), this.keyUriToKeyInfo) {
                                var e = this.keyUriToKeyInfo[t].loader;
                                e && e.destroy()
                            }
                            this.keyUriToKeyInfo = {}
                        }, e.createKeyLoadError = function(t, e, r, i) { return void 0 === e && (e = o.ErrorDetails.KEY_LOAD_ERROR), new Ft({ type: o.ErrorTypes.NETWORK_ERROR, details: e, fatal: !1, frag: t, networkDetails: r }) }, e.loadClear = function(t, e) {
                            var r = this;
                            if (this.emeController && this.config.emeEnabled)
                                for (var i = t.sn, n = t.cc, a = function(t) { var a = e[t]; if (n <= a.cc && ("initSegment" === i || i < a.sn)) return r.emeController.selectKeySystemFormat(a).then((function(t) { a.setKeyFormat(t) })), "break" }, s = 0; s < e.length && "break" !== a(s); s++);
                        }, e.load = function(t) { var e = this; return !t.decryptdata && t.encrypted && this.emeController ? this.emeController.selectKeySystemFormat(t).then((function(r) { return e.loadInternal(t, r) })) : this.loadInternal(t) }, e.loadInternal = function(t, e) {
                            var r, i;
                            e && t.setKeyFormat(e);
                            var n = t.decryptdata;
                            if (!n) { var a = e ? "Expected frag.decryptdata to be defined after setting format " + e : "Missing decryption data on fragment in onKeyLoading"; return Promise.reject(this.createKeyLoadError(t, o.ErrorDetails.KEY_LOAD_ERROR, null, a)) }
                            var s = n.uri;
                            if (!s) return Promise.reject(this.createKeyLoadError(t, o.ErrorDetails.KEY_LOAD_ERROR, null, 'Invalid key URI: "' + s + '"'));
                            var l, u = this.keyUriToKeyInfo[s];
                            if (null !== (r = u) && void 0 !== r && r.decryptdata.key) return n.key = u.decryptdata.key, Promise.resolve({ frag: t, keyInfo: u });
                            if (null !== (i = u) && void 0 !== i && i.keyLoadPromise) switch (null === (l = u.mediaKeySessionContext) || void 0 === l ? void 0 : l.keyStatus) {
                                case void 0:
                                case "status-pending":
                                case "usable":
                                case "usable-in-future":
                                    return u.keyLoadPromise.then((function(e) { return n.key = e.keyInfo.decryptdata.key, { frag: t, keyInfo: u } }))
                            }
                            switch (u = this.keyUriToKeyInfo[s] = { decryptdata: n, keyLoadPromise: null, loader: null, mediaKeySessionContext: null }, n.method) {
                                case "ISO-23001-7":
                                case "SAMPLE-AES":
                                case "SAMPLE-AES-CENC":
                                case "SAMPLE-AES-CTR":
                                    return "identity" === n.keyFormat ? this.loadKeyHTTP(u, t) : this.loadKeyEME(u, t);
                                case "AES-128":
                                    return this.loadKeyHTTP(u, t);
                                default:
                                    return Promise.reject(this.createKeyLoadError(t, o.ErrorDetails.KEY_LOAD_ERROR, null, 'Key supplied with unsupported METHOD: "' + n.method + '"'))
                            }
                        }, e.loadKeyEME = function(t, e) { var r = { frag: e, keyInfo: t }; if (this.emeController && this.config.emeEnabled) { var i = this.emeController.loadKey(r); if (i) return (t.keyLoadPromise = i.then((function(e) { return t.mediaKeySessionContext = e, r }))).catch((function(e) { throw t.keyLoadPromise = null, e })) } return Promise.resolve(r) }, e.loadKeyHTTP = function(t, e) {
                            var r = this,
                                i = this.config,
                                n = new(0, i.loader)(i);
                            return e.keyLoader = t.loader = n, t.keyLoadPromise = new Promise((function(a, s) {
                                var l = { keyInfo: t, frag: e, responseType: "arraybuffer", url: t.decryptdata.uri },
                                    u = { timeout: i.fragLoadingTimeOut, maxRetry: 0, retryDelay: i.fragLoadingRetryDelay, maxRetryDelay: i.fragLoadingMaxRetryTimeout, highWaterMark: 0 },
                                    d = {
                                        onSuccess: function(t, e, i, n) {
                                            var l = i.frag,
                                                u = i.keyInfo,
                                                d = i.url;
                                            if (!l.decryptdata || u !== r.keyUriToKeyInfo[d]) return s(r.createKeyLoadError(l, o.ErrorDetails.KEY_LOAD_ERROR, n, "after key load, decryptdata unset or changed"));
                                            u.decryptdata.key = l.decryptdata.key = new Uint8Array(t.data), l.keyLoader = null, u.loader = null, a({ frag: l, keyInfo: u })
                                        },
                                        onError: function(t, i, n) { r.resetLoader(i), s(r.createKeyLoadError(e, o.ErrorDetails.KEY_LOAD_ERROR, n)) },
                                        onTimeout: function(t, i, n) { r.resetLoader(i), s(r.createKeyLoadError(e, o.ErrorDetails.KEY_LOAD_TIMEOUT, n)) },
                                        onAbort: function(t, i, n) { r.resetLoader(i), s(r.createKeyLoadError(e, o.ErrorDetails.INTERNAL_ABORTED, n)) }
                                    };
                                n.load(l, u, d)
                            }))
                        }, e.resetLoader = function(t) {
                            var e = t.frag,
                                r = t.keyInfo,
                                i = t.url,
                                n = r.loader;
                            e.keyLoader === n && (e.keyLoader = null, r.loader = null), delete this.keyUriToKeyInfo[i], n && n.destroy()
                        }, t
                    }(),
                    Nt = function() {
                        function t() { this._boundTick = void 0, this._tickTimer = null, this._tickInterval = null, this._tickCallCount = 0, this._boundTick = this.tick.bind(this) }
                        var e = t.prototype;
                        return e.destroy = function() { this.onHandlerDestroying(), this.onHandlerDestroyed() }, e.onHandlerDestroying = function() { this.clearNextTick(), this.clearInterval() }, e.onHandlerDestroyed = function() {}, e.hasInterval = function() { return !!this._tickInterval }, e.hasNextTick = function() { return !!this._tickTimer }, e.setInterval = function(t) { return !this._tickInterval && (this._tickInterval = self.setInterval(this._boundTick, t), !0) }, e.clearInterval = function() { return !!this._tickInterval && (self.clearInterval(this._tickInterval), this._tickInterval = null, !0) }, e.clearNextTick = function() { return !!this._tickTimer && (self.clearTimeout(this._tickTimer), this._tickTimer = null, !0) }, e.tick = function() { this._tickCallCount++, 1 === this._tickCallCount && (this.doTick(), this._tickCallCount > 1 && this.tickImmediate(), this._tickCallCount = 0) }, e.tickImmediate = function() { this.clearNextTick(), this._tickTimer = self.setTimeout(this._boundTick, 0) }, e.doTick = function() {}, t
                    }(),
                    Ut = { length: 0, start: function() { return 0 }, end: function() { return 0 } },
                    Bt = function() {
                        function t() {}
                        return t.isBuffered = function(e, r) {
                            try {
                                if (e)
                                    for (var i = t.getBuffered(e), n = 0; n < i.length; n++)
                                        if (r >= i.start(n) && r <= i.end(n)) return !0
                            } catch (t) {}
                            return !1
                        }, t.bufferInfo = function(e, r, i) {
                            try {
                                if (e) {
                                    var n, a = t.getBuffered(e),
                                        s = [];
                                    for (n = 0; n < a.length; n++) s.push({ start: a.start(n), end: a.end(n) });
                                    return this.bufferedInfo(s, r, i)
                                }
                            } catch (t) {}
                            return { len: 0, start: r, end: r, nextStart: void 0 }
                        }, t.bufferedInfo = function(t, e, r) {
                            e = Math.max(0, e), t.sort((function(t, e) { return t.start - e.start || e.end - t.end }));
                            var i = [];
                            if (r)
                                for (var n = 0; n < t.length; n++) {
                                    var a = i.length;
                                    if (a) {
                                        var s = i[a - 1].end;
                                        t[n].start - s < r ? t[n].end > s && (i[a - 1].end = t[n].end) : i.push(t[n])
                                    } else i.push(t[n])
                                } else i = t;
                            for (var o, l = 0, u = e, d = e, h = 0; h < i.length; h++) {
                                var c = i[h].start,
                                    f = i[h].end;
                                if (e + r >= c && e < f) u = c, l = (d = f) - e;
                                else if (e + r < c) { o = c; break }
                            }
                            return { len: l, start: u || 0, end: d || 0, nextStart: o }
                        }, t.getBuffered = function(t) { try { return t.buffered } catch (t) { return l.logger.log("failed to get media.buffered", t), Ut } }, t
                    }(),
                    Gt = function(t, e, r, i, n, a) { void 0 === i && (i = 0), void 0 === n && (n = -1), void 0 === a && (a = !1), this.level = void 0, this.sn = void 0, this.part = void 0, this.id = void 0, this.size = void 0, this.partial = void 0, this.transmuxing = { start: 0, executeStart: 0, executeEnd: 0, end: 0 }, this.buffering = { audio: { start: 0, executeStart: 0, executeEnd: 0, end: 0 }, video: { start: 0, executeStart: 0, executeEnd: 0, end: 0 }, audiovideo: { start: 0, executeStart: 0, executeEnd: 0, end: 0 } }, this.level = t, this.sn = e, this.id = r, this.size = i, this.part = n, this.partial = a };

                function Kt(t, e) { for (var r = null, i = 0, n = t.length; i < n; i++) { var a = t[i]; if (a && a.cc === e) { r = a; break } } return r }

                function Ht(t, e) {
                    if (t) {
                        var r = t.start + e;
                        t.start = t.startPTS = r, t.endPTS = r + t.duration
                    }
                }

                function jt(t, e) {
                    for (var r = e.fragments, i = 0, n = r.length; i < n; i++) Ht(r[i], t);
                    e.fragmentHint && Ht(e.fragmentHint, t), e.alignedSliding = !0
                }

                function Vt(t, e) {
                    if (t.hasProgramDateTime && e.hasProgramDateTime) {
                        var r = t.fragments,
                            i = e.fragments;
                        if (r.length && i.length) {
                            var n = i[Math.round(i.length / 2) - 1],
                                a = Kt(r, n.cc) || r[Math.round(r.length / 2) - 1],
                                s = n.programDateTime,
                                o = a.programDateTime;
                            null !== s && null !== o && jt((o - s) / 1e3 - (a.start - n.start), t)
                        }
                    }
                }
                const Yt = function(t, e) {
                    for (var r = 0, i = t.length - 1, n = null, a = null; r <= i;) {
                        var s = e(a = t[n = (r + i) / 2 | 0]);
                        if (s > 0) r = n + 1;
                        else {
                            if (!(s < 0)) return a;
                            i = n - 1
                        }
                    }
                    return null
                };

                function Wt(t, e, r, i) { void 0 === r && (r = 0), void 0 === i && (i = 0); var n = null; if (t ? n = e[t.sn - e[0].sn + 1] || null : 0 === r && 0 === e[0].start && (n = e[0]), n && 0 === qt(r, i, n)) return n; var a = Yt(e, qt.bind(null, r, i)); return !a || a === t && n ? n : a }

                function qt(t, e, r) { if (void 0 === t && (t = 0), void 0 === e && (e = 0), r.start <= t && r.start + r.duration > t) return 0; var i = Math.min(e, r.duration + (r.deltaPTS ? r.deltaPTS : 0)); return r.start + r.duration - i <= t ? 1 : r.start - i > t && r.start ? -1 : 0 }

                function Xt(t, e, r) { var i = 1e3 * Math.min(e, r.duration + (r.deltaPTS ? r.deltaPTS : 0)); return (r.endProgramDateTime || 0) - i > t }
                var zt = r(21);
                const Qt = function(t) { for (var e = "", r = t.length, i = 0; i < r; i++) e += "[" + t.start(i).toFixed(3) + "-" + t.end(i).toFixed(3) + "]"; return e };

                function $t(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var i = e[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, (void 0, "symbol" == typeof(n = function(t, e) { if ("object" != typeof t || null === t) return t; var r = t[Symbol.toPrimitive]; if (void 0 !== r) { var i = r.call(t, e); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value.") } return String(t) }(i.key, "string")) ? n : String(n)), i)
                    }
                    var n
                }

                function Jt(t, e) { return Jt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) { return t.__proto__ = e, t }, Jt(t, e) }
                var Zt = "STOPPED",
                    te = "IDLE",
                    ee = "KEY_LOADING",
                    re = "FRAG_LOADING",
                    ie = "FRAG_LOADING_WAITING_RETRY",
                    ne = "WAITING_TRACK",
                    ae = "PARSING",
                    se = "PARSED",
                    oe = "ENDED",
                    le = "ERROR",
                    ue = "WAITING_INIT_PTS",
                    de = "WAITING_LEVEL",
                    he = function(t) {
                        var e, r;

                        function i(e, r, i, n) { var a; return (a = t.call(this) || this).hls = void 0, a.fragPrevious = null, a.fragCurrent = null, a.fragmentTracker = void 0, a.transmuxer = null, a._state = Zt, a.media = null, a.mediaBuffer = null, a.config = void 0, a.bitrateTest = !1, a.lastCurrentTime = 0, a.nextLoadPosition = 0, a.startPosition = 0, a.loadedmetadata = !1, a.fragLoadError = 0, a.retryDate = 0, a.levels = null, a.fragmentLoader = void 0, a.keyLoader = void 0, a.levelLastLoaded = null, a.startFragRequested = !1, a.decrypter = void 0, a.initPTS = [], a.onvseeking = null, a.onvended = null, a.logPrefix = "", a.log = void 0, a.warn = void 0, a.logPrefix = n, a.log = l.logger.log.bind(l.logger, n + ":"), a.warn = l.logger.warn.bind(l.logger, n + ":"), a.hls = e, a.fragmentLoader = new Ot(e.config), a.keyLoader = i, a.fragmentTracker = r, a.config = e.config, a.decrypter = new zt.default(e.config), e.on(s.Events.LEVEL_SWITCHING, a.onLevelSwitching, function(t) { if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return t }(a)), a }
                        r = t, (e = i).prototype = Object.create(r.prototype), e.prototype.constructor = e, Jt(e, r);
                        var n, u, d = i.prototype;
                        return d.doTick = function() { this.onTickEnd() }, d.onTickEnd = function() {}, d.startLoad = function(t) {}, d.stopLoad = function() {
                            this.fragmentLoader.abort(), this.keyLoader.abort();
                            var t = this.fragCurrent;
                            t && (t.abortRequests(), this.fragmentTracker.removeFragment(t)), this.resetTransmuxer(), this.fragCurrent = null, this.fragPrevious = null, this.clearInterval(), this.clearNextTick(), this.state = Zt
                        }, d._streamEnded = function(t, e) { if (e.live || t.nextStart || !t.end || !this.media) return !1; var r = e.partList; if (null != r && r.length) { var i = r[r.length - 1]; return Bt.isBuffered(this.media, i.start + i.duration / 2) } var n = e.fragments[e.fragments.length - 1].type; return this.fragmentTracker.isEndListAppended(n) }, d.getLevelDetails = function() { var t; if (this.levels && null !== this.levelLastLoaded) return null === (t = this.levels[this.levelLastLoaded]) || void 0 === t ? void 0 : t.details }, d.onMediaAttached = function(t, e) {
                            var r = this.media = this.mediaBuffer = e.media;
                            this.onvseeking = this.onMediaSeeking.bind(this), this.onvended = this.onMediaEnded.bind(this), r.addEventListener("seeking", this.onvseeking), r.addEventListener("ended", this.onvended);
                            var i = this.config;
                            this.levels && i.autoStartLoad && this.state === Zt && this.startLoad(i.startPosition)
                        }, d.onMediaDetaching = function() {
                            var t = this.media;
                            null != t && t.ended && (this.log("MSE detaching and video ended, reset startPosition"), this.startPosition = this.lastCurrentTime = 0), t && this.onvseeking && this.onvended && (t.removeEventListener("seeking", this.onvseeking), t.removeEventListener("ended", this.onvended), this.onvseeking = this.onvended = null), this.keyLoader && this.keyLoader.detach(), this.media = this.mediaBuffer = null, this.loadedmetadata = !1, this.fragmentTracker.removeAllFragments(), this.stopLoad()
                        }, d.onMediaSeeking = function() {
                            var t = this.config,
                                e = this.fragCurrent,
                                r = this.media,
                                i = this.mediaBuffer,
                                n = this.state,
                                s = r ? r.currentTime : 0,
                                o = Bt.bufferInfo(i || r, s, t.maxBufferHole);
                            if (this.log("media seeking to " + ((0, a.isFiniteNumber)(s) ? s.toFixed(3) : s) + ", state: " + n), this.state === oe) this.resetLoadingState();
                            else if (e) {
                                var l = t.maxFragLookUpTolerance,
                                    u = e.start - l,
                                    d = e.start + e.duration + l;
                                if (!o.len || d < o.start || u > o.end) {
                                    var h = s > d;
                                    (s < u || h) && (h && e.loader && (this.log("seeking outside of buffer while fragment load in progress, cancel fragment load"), e.abortRequests()), this.resetLoadingState())
                                }
                            }
                            r && (this.lastCurrentTime = s), this.loadedmetadata || o.len || (this.nextLoadPosition = this.startPosition = s), this.tickImmediate()
                        }, d.onMediaEnded = function() { this.startPosition = this.lastCurrentTime = 0 }, d.onLevelSwitching = function(t, e) { this.fragLoadError = 0 }, d.onHandlerDestroying = function() { this.stopLoad(), t.prototype.onHandlerDestroying.call(this) }, d.onHandlerDestroyed = function() { this.state = Zt, this.hls.off(s.Events.LEVEL_SWITCHING, this.onLevelSwitching, this), this.fragmentLoader && this.fragmentLoader.destroy(), this.keyLoader && this.keyLoader.destroy(), this.decrypter && this.decrypter.destroy(), this.hls = this.log = this.warn = this.decrypter = this.keyLoader = this.fragmentLoader = this.fragmentTracker = null, t.prototype.onHandlerDestroyed.call(this) }, d.loadFragment = function(t, e, r) { this._loadFragForPlayback(t, e, r) }, d._loadFragForPlayback = function(t, e, r) {
                            var i = this;
                            this._doFragLoad(t, e, r, (function(e) {
                                if (i.fragContextChanged(t)) return i.warn("Fragment " + t.sn + (e.part ? " p: " + e.part.index : "") + " of level " + t.level + " was dropped during download."), void i.fragmentTracker.removeFragment(t);
                                t.stats.chunkCount++, i._handleFragmentLoadProgress(e)
                            })).then((function(e) {
                                if (e) {
                                    i.fragLoadError = 0;
                                    var r = i.state;
                                    i.fragContextChanged(t) ? (r === re || !i.fragCurrent && r === ae) && (i.fragmentTracker.removeFragment(t), i.state = te) : ("payload" in e && (i.log("Loaded fragment " + t.sn + " of level " + t.level), i.hls.trigger(s.Events.FRAG_LOADED, e)), i._handleFragmentLoadComplete(e))
                                }
                            })).catch((function(e) { i.state !== Zt && i.state !== le && (i.warn(e), i.resetFragmentLoading(t)) }))
                        }, d.flushMainBuffer = function(t, e, r) {
                            if (void 0 === r && (r = null), t - e) {
                                var i = { startOffset: t, endOffset: e, type: r };
                                this.fragLoadError = 0, this.hls.trigger(s.Events.BUFFER_FLUSHING, i)
                            }
                        }, d._loadInitSegment = function(t, e) {
                            var r = this;
                            this._doFragLoad(t, e).then((function(e) { if (!e || r.fragContextChanged(t) || !r.levels) throw new Error("init load aborted"); return e })).then((function(e) {
                                var i = r.hls,
                                    n = e.payload,
                                    a = t.decryptdata;
                                if (n && n.byteLength > 0 && a && a.key && a.iv && "AES-128" === a.method) { var o = self.performance.now(); return r.decrypter.decrypt(new Uint8Array(n), a.key.buffer, a.iv.buffer).then((function(r) { var n = self.performance.now(); return i.trigger(s.Events.FRAG_DECRYPTED, { frag: t, payload: r, stats: { tstart: o, tdecrypt: n } }), e.payload = r, e })) }
                                return e
                            })).then((function(e) {
                                var i = r.fragCurrent,
                                    n = r.hls,
                                    a = r.levels;
                                if (!a) throw new Error("init load aborted, missing levels");
                                a[t.level].details;
                                var o = t.stats;
                                r.state = te, r.fragLoadError = 0, t.data = new Uint8Array(e.payload), o.parsing.start = o.buffering.start = self.performance.now(), o.parsing.end = o.buffering.end = self.performance.now(), e.frag === i && n.trigger(s.Events.FRAG_BUFFERED, { stats: o, frag: i, part: null, id: t.type }), r.tick()
                            })).catch((function(e) { r.state !== Zt && r.state !== le && (r.warn(e), r.resetFragmentLoading(t)) }))
                        }, d.fragContextChanged = function(t) { var e = this.fragCurrent; return !t || !e || t.level !== e.level || t.sn !== e.sn || t.urlId !== e.urlId }, d.fragBufferedComplete = function(t, e) {
                            var r, i, n, a, s = this.mediaBuffer ? this.mediaBuffer : this.media;
                            this.log("Buffered " + t.type + " sn: " + t.sn + (e ? " part: " + e.index : "") + " of " + ("[stream-controller]" === this.logPrefix ? "level" : "track") + " " + t.level + " (frag:[" + (null != (r = t.startPTS) ? r : NaN).toFixed(3) + "-" + (null != (i = t.endPTS) ? i : NaN).toFixed(3) + "] > buffer:" + (s ? Qt(Bt.getBuffered(s)) : "(detached)") + ")"), this.state = te, s && (!this.loadedmetadata && t.type == V.PlaylistLevelType.MAIN && s.buffered.length && (null === (n = this.fragCurrent) || void 0 === n ? void 0 : n.sn) === (null === (a = this.fragPrevious) || void 0 === a ? void 0 : a.sn) && (this.loadedmetadata = !0, this.seekToStartPos()), this.tick())
                        }, d.seekToStartPos = function() {}, d._handleFragmentLoadComplete = function(t) {
                            var e = this.transmuxer;
                            if (e) {
                                var r = t.frag,
                                    i = t.part,
                                    n = t.partsLoaded,
                                    a = !n || 0 === n.length || n.some((function(t) { return !t })),
                                    s = new Gt(r.level, r.sn, r.stats.chunkCount + 1, 0, i ? i.index : -1, !a);
                                e.flush(s)
                            }
                        }, d._handleFragmentLoadProgress = function(t) {}, d._doFragLoad = function(t, e, r, i) {
                            var n, o = this;
                            if (void 0 === r && (r = null), !this.levels) throw new Error("frag load aborted, missing levels");
                            var l = null;
                            if (!t.encrypted || null !== (n = t.decryptdata) && void 0 !== n && n.key ? !t.encrypted && e.encryptedFragments.length && this.keyLoader.loadClear(t, e.encryptedFragments) : (this.log("Loading key for " + t.sn + " of [" + e.startSN + "-" + e.endSN + "], " + ("[stream-controller]" === this.logPrefix ? "level" : "track") + " " + t.level), this.state = ee, this.fragCurrent = t, l = this.keyLoader.load(t).then((function(t) { if (!o.fragContextChanged(t.frag)) return o.hls.trigger(s.Events.KEY_LOADED, t), o.state === ee && (o.state = te), t })), this.hls.trigger(s.Events.KEY_LOADING, { frag: t }), this.throwIfFragContextChanged("KEY_LOADING")), r = Math.max(t.start, r || 0), this.config.lowLatencyMode && e) { var u = e.partList; if (u && i) { r > t.end && e.fragmentHint && (t = e.fragmentHint); var d = this.getNextPart(u, t, r); if (d > -1) { var h = u[d]; return this.log("Loading part sn: " + t.sn + " p: " + h.index + " cc: " + t.cc + " of playlist [" + e.startSN + "-" + e.endSN + "] parts [0-" + d + "-" + (u.length - 1) + "] " + ("[stream-controller]" === this.logPrefix ? "level" : "track") + ": " + t.level + ", target: " + parseFloat(r.toFixed(3))), this.nextLoadPosition = h.start + h.duration, this.state = re, this.hls.trigger(s.Events.FRAG_LOADING, { frag: t, part: u[d], targetBufferTime: r }), this.throwIfFragContextChanged("FRAG_LOADING parts"), l ? l.then((function(e) { return !e || o.fragContextChanged(e.frag) ? null : o.doFragPartsLoad(t, u, d, i) })).catch((function(t) { return o.handleFragLoadError(t) })) : this.doFragPartsLoad(t, u, d, i).catch((function(t) { return o.handleFragLoadError(t) })) } if (!t.url || this.loadedEndOfParts(u, r)) return Promise.resolve(null) } }
                            this.log("Loading fragment " + t.sn + " cc: " + t.cc + " " + (e ? "of [" + e.startSN + "-" + e.endSN + "] " : "") + ("[stream-controller]" === this.logPrefix ? "level" : "track") + ": " + t.level + ", target: " + parseFloat(r.toFixed(3))), (0, a.isFiniteNumber)(t.sn) && !this.bitrateTest && (this.nextLoadPosition = t.start + t.duration), this.state = re, this.hls.trigger(s.Events.FRAG_LOADING, { frag: t, targetBufferTime: r }), this.throwIfFragContextChanged("FRAG_LOADING");
                            var c = this.config.progressive;
                            return c && l ? l.then((function(e) { return !e || o.fragContextChanged(null == e ? void 0 : e.frag) ? null : o.fragmentLoader.load(t, i) })).catch((function(t) { return o.handleFragLoadError(t) })) : Promise.all([this.fragmentLoader.load(t, c ? i : void 0), l]).then((function(t) { var e = t[0]; return !c && e && i && i(e), e })).catch((function(t) { return o.handleFragLoadError(t) }))
                        }, d.throwIfFragContextChanged = function(t) { if (null === this.fragCurrent) throw new Error("frag load aborted, context changed in " + t) }, d.doFragPartsLoad = function(t, e, r, i) {
                            var n = this;
                            return new Promise((function(a, o) {
                                var l = [];
                                ! function r(u) {
                                    var d = e[u];
                                    n.fragmentLoader.loadPart(t, d, i).then((function(i) {
                                        l[d.index] = i;
                                        var o = i.part;
                                        n.hls.trigger(s.Events.FRAG_LOADED, i);
                                        var h = e[u + 1];
                                        if (!h || h.fragment !== t) return a({ frag: t, part: o, partsLoaded: l });
                                        r(u + 1)
                                    })).catch(o)
                                }(r)
                            }))
                        }, d.handleFragLoadError = function(t) {
                            if ("data" in t) {
                                var e = t.data;
                                t.data && e.details === o.ErrorDetails.INTERNAL_ABORTED ? this.handleFragLoadAborted(e.frag, e.part) : this.hls.trigger(s.Events.ERROR, e)
                            } else this.hls.trigger(s.Events.ERROR, { type: o.ErrorTypes.OTHER_ERROR, details: o.ErrorDetails.INTERNAL_EXCEPTION, err: t, fatal: !0 });
                            return null
                        }, d._handleTransmuxerFlush = function(t) {
                            var e = this.getCurrentContext(t);
                            if (e && this.state === ae) {
                                var r = e.frag,
                                    i = e.part,
                                    n = e.level,
                                    a = self.performance.now();
                                r.stats.parsing.end = a, i && (i.stats.parsing.end = a), this.updateLevelTiming(r, i, n, t.partial)
                            } else this.fragCurrent || this.state === Zt || this.state === le || (this.state = te)
                        }, d.getCurrentContext = function(t) {
                            var e = this.levels,
                                r = t.level,
                                i = t.sn,
                                n = t.part;
                            if (!e || !e[r]) return this.warn("Levels object was unset while buffering fragment " + i + " of level " + r + ". The current chunk will not be buffered."), null;
                            var a = e[r],
                                s = n > -1 ? function(t, e, r) {
                                    if (!t || !t.details) return null;
                                    var i = t.details.partList;
                                    if (i)
                                        for (var n = i.length; n--;) { var a = i[n]; if (a.index === r && a.fragment.sn === e) return a }
                                    return null
                                }(a, i, n) : null,
                                o = s ? s.fragment : function(t, e, r) {
                                    if (!t || !t.details) return null;
                                    var i = t.details,
                                        n = i.fragments[e - i.startSN];
                                    return n || ((n = i.fragmentHint) && n.sn === e ? n : e < i.startSN && r && r.sn === e ? r : null)
                                }(a, i, this.fragCurrent);
                            return o ? { frag: o, part: s, level: a } : null
                        }, d.bufferFragmentData = function(t, e, r, i) {
                            if (t && this.state === ae) {
                                var n = t.data1,
                                    a = t.data2,
                                    o = n;
                                if (n && a && (o = (0, R.appendUint8Array)(n, a)), o && o.length) {
                                    var l = { type: t.type, frag: e, part: r, chunkMeta: i, parent: e.type, data: o };
                                    this.hls.trigger(s.Events.BUFFER_APPENDING, l), t.dropped && t.independent && !r && this.flushBufferGap(e)
                                }
                            }
                        }, d.flushBufferGap = function(t) {
                            var e = this.media;
                            if (e)
                                if (Bt.isBuffered(e, e.currentTime)) {
                                    var r = e.currentTime,
                                        i = Bt.bufferInfo(e, r, 0),
                                        n = t.duration,
                                        a = Math.min(2 * this.config.maxFragLookUpTolerance, .25 * n),
                                        s = Math.max(Math.min(t.start - a, i.end - a), r + a);
                                    t.start - s > a && this.flushMainBuffer(s, t.start)
                                } else this.flushMainBuffer(0, t.start)
                        }, d.getFwdBufferInfo = function(t, e) {
                            var r = this.config,
                                i = this.getLoadPosition();
                            if (!(0, a.isFiniteNumber)(i)) return null;
                            var n = Bt.bufferInfo(t, i, r.maxBufferHole);
                            if (0 === n.len && void 0 !== n.nextStart) { var s = this.fragmentTracker.getBufferedFrag(i, e); if (s && n.nextStart < s.end) return Bt.bufferInfo(t, i, Math.max(n.nextStart, r.maxBufferHole)) }
                            return n
                        }, d.getMaxBufferLength = function(t) { var e, r = this.config; return e = t ? Math.max(8 * r.maxBufferSize / t, r.maxBufferLength) : r.maxBufferLength, Math.min(e, r.maxMaxBufferLength) }, d.reduceMaxBufferLength = function(t) {
                            var e = this.config,
                                r = t || e.maxBufferLength;
                            return e.maxMaxBufferLength >= r && (e.maxMaxBufferLength /= 2, this.warn("Reduce max buffer length to " + e.maxMaxBufferLength + "s"), !0)
                        }, d.getNextFragment = function(t, e) {
                            var r = e.fragments,
                                i = r.length;
                            if (!i) return null;
                            var n, a = this.config,
                                s = r[0].start;
                            if (e.live) {
                                var o = a.initialLiveManifestSize;
                                if (i < o) return this.warn("Not enough fragments to start playback (have: " + i + ", need: " + o + ")"), null;
                                e.PTSKnown || this.startFragRequested || -1 !== this.startPosition || (n = this.getInitialLiveFragment(e, r), this.startPosition = n ? this.hls.liveSyncPosition || n.start : t)
                            } else t <= s && (n = r[0]);
                            if (!n) {
                                var l = a.lowLatencyMode ? e.partEnd : e.fragmentEnd;
                                n = this.getFragmentAtPosition(t, l, e)
                            }
                            return this.mapToInitFragWhenRequired(n)
                        }, d.mapToInitFragWhenRequired = function(t) { return null == t || !t.initSegment || null != t && t.initSegment.data || this.bitrateTest ? t : t.initSegment }, d.getNextPart = function(t, e, r) {
                            for (var i = -1, n = !1, a = !0, s = 0, o = t.length; s < o; s++) {
                                var l = t[s];
                                if (a = a && !l.independent, i > -1 && r < l.start) break;
                                var u = l.loaded;
                                u ? i = -1 : (n || l.independent || a) && l.fragment === e && (i = s), n = u
                            }
                            return i
                        }, d.loadedEndOfParts = function(t, e) { var r = t[t.length - 1]; return r && e > r.start && r.loaded }, d.getInitialLiveFragment = function(t, e) {
                            var r = this.fragPrevious,
                                i = null;
                            if (r) {
                                if (t.hasProgramDateTime && (this.log("Live playlist, switching playlist, load frag with same PDT: " + r.programDateTime), i = function(t, e, r) {
                                        if (null === e || !Array.isArray(t) || !t.length || !(0, a.isFiniteNumber)(e)) return null;
                                        if (e < (t[0].programDateTime || 0)) return null;
                                        if (e >= (t[t.length - 1].endProgramDateTime || 0)) return null;
                                        r = r || 0;
                                        for (var i = 0; i < t.length; ++i) { var n = t[i]; if (Xt(e, r, n)) return n }
                                        return null
                                    }(e, r.endProgramDateTime, this.config.maxFragLookUpTolerance)), !i) {
                                    var n = r.sn + 1;
                                    if (n >= t.startSN && n <= t.endSN) {
                                        var s = e[n - t.startSN];
                                        r.cc === s.cc && (i = s, this.log("Live playlist, switching playlist, load frag with next SN: " + i.sn))
                                    }
                                    i || (i = function(t, e) { return Yt(t, (function(t) { return t.cc < e ? 1 : t.cc > e ? -1 : 0 })) }(e, r.cc), i && this.log("Live playlist, switching playlist, load frag with same CC: " + i.sn))
                                }
                            } else {
                                var o = this.hls.liveSyncPosition;
                                null !== o && (i = this.getFragmentAtPosition(o, this.bitrateTest ? t.fragmentEnd : t.edge, t))
                            }
                            return i
                        }, d.getFragmentAtPosition = function(t, e, r) {
                            var i, n = this.config,
                                a = this.fragPrevious,
                                s = r.fragments,
                                o = r.endSN,
                                l = r.fragmentHint,
                                u = n.maxFragLookUpTolerance,
                                d = !!(n.lowLatencyMode && r.partList && l);
                            if (d && l && !this.bitrateTest && (s = s.concat(l), o = l.sn), i = t < e ? Wt(a, s, t, t > e - u ? 0 : u) : s[s.length - 1]) {
                                var h = i.sn - r.startSN;
                                if (this.fragmentTracker.getState(i) === St.OK && (a = i), a && i.sn === a.sn && !d && a && i.level === a.level) {
                                    var c = s[h + 1];
                                    i.sn < o && this.fragmentTracker.getState(c) !== St.OK ? (this.log("SN " + i.sn + " just loaded, load next one: " + c.sn), i = c) : i = null
                                }
                            }
                            return i
                        }, d.synchronizeToLiveEdge = function(t) {
                            var e = this.config,
                                r = this.media;
                            if (r) {
                                var i = this.hls.liveSyncPosition,
                                    n = r.currentTime,
                                    a = t.fragments[0].start,
                                    s = t.edge,
                                    o = n >= a - e.maxFragLookUpTolerance && n <= s;
                                if (null !== i && r.duration > i && (n < i || !o)) {
                                    var l = void 0 !== e.liveMaxLatencyDuration ? e.liveMaxLatencyDuration : e.liveMaxLatencyDurationCount * t.targetduration;
                                    (!o && r.readyState < 4 || n < s - l) && (this.loadedmetadata || (this.nextLoadPosition = i), r.readyState && (this.warn("Playback: " + n.toFixed(3) + " is located too far from the end of live sliding playlist: " + s + ", reset currentTime to : " + i.toFixed(3)), r.currentTime = i))
                                }
                            }
                        }, d.alignPlaylists = function(t, e) {
                            var r = this.levels,
                                i = this.levelLastLoaded,
                                n = this.fragPrevious,
                                s = null !== i ? r[i] : null,
                                o = t.fragments.length;
                            if (!o) return this.warn("No fragments in live playlist"), 0;
                            var u = t.fragments[0].start,
                                d = !e,
                                h = t.alignedSliding && (0, a.isFiniteNumber)(u);
                            if (d || !h && !u) {
                                ! function(t, e, r) {
                                    e && (function(t, e, r) {
                                        if (function(t, e, r) { return !(!e.details || !(r.endCC > r.startCC || t && t.cc < r.startCC)) }(t, r, e)) {
                                            var i = function(t, e, r) {
                                                void 0 === r && (r = 0);
                                                var i = t.fragments,
                                                    n = e.fragments;
                                                if (n.length && i.length) {
                                                    var a = Kt(i, n[0].cc);
                                                    if (a && (!a || a.startPTS)) return a;
                                                    l.logger.log("No frag in previous level to align on")
                                                } else l.logger.log("No fragments to align")
                                            }(r.details, e);
                                            i && (0, a.isFiniteNumber)(i.start) && (l.logger.log("Adjusting PTS using last level due to CC increase within current level " + e.url), jt(i.start, e))
                                        }
                                    }(t, r, e), !r.alignedSliding && e.details && function(t, e) {
                                        if (e.fragments.length && t.hasProgramDateTime && e.hasProgramDateTime) {
                                            var r = e.fragments[0].programDateTime,
                                                i = t.fragments[0].programDateTime,
                                                n = (i - r) / 1e3 + e.fragments[0].start;
                                            n && (0, a.isFiniteNumber)(n) && (l.logger.log("Adjusting PTS using programDateTime delta " + (i - r) + "ms, sliding:" + n.toFixed(3) + " " + t.url + " "), jt(n, t))
                                        }
                                    }(r, e.details), r.alignedSliding || !e.details || r.skippedSegments || vt(e.details, r))
                                }(n, s, t);
                                var c = t.fragments[0].start;
                                return this.log("Live playlist sliding: " + c.toFixed(2) + " start-sn: " + (e ? e.startSN : "na") + "->" + t.startSN + " prev-sn: " + (n ? n.sn : "na") + " fragments: " + o), c
                            }
                            return u
                        }, d.waitForCdnTuneIn = function(t) { return t.live && t.canBlockReload && t.partTarget && t.tuneInGoal > Math.max(t.partHoldBack, 3 * t.partTarget) }, d.setStartPosition = function(t, e) {
                            var r = this.startPosition;
                            if (r < e && (r = -1), -1 === r || -1 === this.lastCurrentTime) {
                                var i = t.startTimeOffset;
                                (0, a.isFiniteNumber)(i) ? (r = e + i, i < 0 && (r += t.totalduration), r = Math.min(Math.max(e, r), e + t.totalduration), this.log("Start time offset " + i + " found in playlist, adjust startPosition to " + r), this.startPosition = r) : t.live ? r = this.hls.liveSyncPosition || e : this.startPosition = r = 0, this.lastCurrentTime = r
                            }
                            this.nextLoadPosition = r
                        }, d.getLoadPosition = function() {
                            var t = this.media,
                                e = 0;
                            return this.loadedmetadata && t ? e = t.currentTime : this.nextLoadPosition && (e = this.nextLoadPosition), e
                        }, d.handleFragLoadAborted = function(t, e) { this.transmuxer && "initSegment" !== t.sn && t.stats.aborted && (this.warn("Fragment " + t.sn + (e ? " part" + e.index : "") + " of level " + t.level + " was aborted"), this.resetFragmentLoading(t)) }, d.resetFragmentLoading = function(t) { this.fragCurrent && (this.fragContextChanged(t) || this.state === ie) || (this.state = te) }, d.onFragmentOrKeyLoadError = function(t, e) {
                            if (e.fatal) return this.stopLoad(), void(this.state = le);
                            var r = this.config;
                            if (e.chunkMeta) {
                                var i = this.getCurrentContext(e.chunkMeta);
                                i && (e.frag = i.frag, e.levelRetry = !0, this.fragLoadError = r.fragLoadingMaxRetry)
                            }
                            var n = e.frag;
                            if (n && n.type === t)
                                if (this.fragCurrent, this.fragLoadError + 1 <= r.fragLoadingMaxRetry) {
                                    this.loadedmetadata || (this.startFragRequested = !1, this.nextLoadPosition = this.startPosition);
                                    var a = Math.min(Math.pow(2, this.fragLoadError) * r.fragLoadingRetryDelay, r.fragLoadingMaxRetryTimeout);
                                    this.warn("Fragment " + n.sn + " of " + t + " " + n.level + " failed to load, retrying in " + a + "ms"), this.retryDate = self.performance.now() + a, this.fragLoadError++, this.state = ie
                                } else e.levelRetry ? (t === V.PlaylistLevelType.AUDIO && (this.fragCurrent = null), this.fragLoadError = 0, this.state = te) : (l.logger.error(e.details + " reaches max retry, redispatch as fatal ..."), e.fatal = !0, this.hls.stopLoad(), this.state = le)
                        }, d.afterBufferFlushed = function(t, e, r) {
                            if (t) {
                                var i = Bt.getBuffered(t);
                                this.fragmentTracker.detectEvictedFragments(e, i, r), this.state === oe && this.resetLoadingState()
                            }
                        }, d.resetLoadingState = function() { this.log("Reset loading state"), this.fragCurrent = null, this.fragPrevious = null, this.state = te }, d.resetStartWhenNotLoaded = function(t) {
                            if (!this.loadedmetadata) {
                                this.startFragRequested = !1;
                                var e = this.levels ? this.levels[t].details : null;
                                null != e && e.live ? (this.startPosition = -1, this.setStartPosition(e, 0), this.resetLoadingState()) : this.nextLoadPosition = this.startPosition
                            }
                        }, d.updateLevelTiming = function(t, e, r, i) {
                            var n = this,
                                a = r.details;
                            Object.keys(t.elementaryStreams).reduce((function(e, o) { var l = t.elementaryStreams[o]; if (l) { var u = l.endPTS - l.startPTS; if (u <= 0) return n.warn("Could not parse fragment " + t.sn + " " + o + " duration reliably (" + u + ")"), e || !1; var d = i ? 0 : gt(a, t, l.startPTS, l.endPTS, l.startDTS, l.endDTS); return n.hls.trigger(s.Events.LEVEL_PTS_UPDATED, { details: a, level: r, drift: d, type: o, frag: t, start: l.startPTS, end: l.endPTS }), !0 } return e }), !1) || (this.warn("Found no media in fragment " + t.sn + " of level " + r.id + " resetting transmuxer to fallback to playlist timing"), this.resetTransmuxer()), this.state = se, this.hls.trigger(s.Events.FRAG_PARSED, { frag: t, part: e })
                        }, d.resetTransmuxer = function() { this.transmuxer && (this.transmuxer.destroy(), this.transmuxer = null) }, n = i, (u = [{
                            key: "state",
                            get: function() { return this._state },
                            set: function(t) {
                                var e = this._state;
                                e !== t && (this._state = t, this.log(e + "->" + t))
                            }
                        }]) && $t(n.prototype, u), Object.defineProperty(n, "prototype", { writable: !1 }), i
                    }(Nt);

                function ce() { return self.MediaSource || self.WebKitMediaSource }

                function fe() { return self.SourceBuffer || self.WebKitSourceBuffer }
                var ge = function() {
                        var t = ENTRY_MODULE,
                            e = {},
                            r = function r(i) { var n = e[i]; if (void 0 !== n) return n.exports; var a = e[i] = { exports: {} }; return t[i].call(a.exports, a, a.exports, r), a.exports };
                        r.m = t, r.n = function(t) { var e = t && t.__esModule ? function() { return t.default } : function() { return t }; return r.d(e, { a: e }), e }, r.d = function(t, e) { for (var i in e) r.o(e, i) && !r.o(t, i) && Object.defineProperty(t, i, { enumerable: !0, get: e[i] }) }, r.o = function(t, e) { return Object.prototype.hasOwnProperty.call(t, e) }, r.r = function(t) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 }) };
                        var i = r(ENTRY_MODULE);
                        return i.default || i
                    }.toString().split("ENTRY_MODULE"),
                    ve = "\\(\\s*(/\\*.*?\\*/)?\\s*.*?([\\.|\\-|\\+|\\w|/|@]+).*?\\)";

                function pe(t) { return (t + "").replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&") }

                function me(t, e, i) {
                    var n = {};
                    n[i] = [];
                    var a = e.toString().replace(/^"[^"]+"/, "function"),
                        s = a.match(/^function\s?\w*\(\w+,\s*\w+,\s*(\w+)\)/) || a.match(/^\(\w+,\s*\w+,\s*(\w+)\)\s?\=\s?\>/);
                    if (!s) return n;
                    for (var o, l = s[1], u = new RegExp("(\\\\n|\\W)" + pe(l) + ve, "g"); o = u.exec(a);) "dll-reference" !== o[3] && n[i].push(o[3]);
                    for (u = new RegExp("\\(" + pe(l) + '\\("(dll-reference\\s([\\.|\\-|\\+|\\w|/|@]+))"\\)\\)' + ve, "g"); o = u.exec(a);) t[o[2]] || (n[i].push(o[1]), t[o[2]] = r(o[1]).m), n[o[2]] = n[o[2]] || [], n[o[2]].push(o[4]);
                    for (var d, h = Object.keys(n), c = 0; c < h.length; c++)
                        for (var f = 0; f < n[h[c]].length; f++) d = n[h[c]][f], isNaN(1 * d) || (n[h[c]][f] = 1 * n[h[c]][f]);
                    return n
                }

                function ye(t) { return Object.keys(t).reduce((function(e, r) { return e || t[r].length > 0 }), !1) }

                function Ee(t, e, r, i) { var n = t[i].map((function(t) { return '"' + t + '": ' + e[i][t].toString().replace(/^"[^"]+"/, "function") })).join(","); return ge[0] + "{" + n + "}" + ge[1] + '"' + r + '"' + ge[2] }
                var Te = r(544),
                    Se = r(729),
                    be = r.n(Se),
                    Le = ce() || { isTypeSupported: function() { return !1 } },
                    Ae = function() {
                        function t(t, e, i, n) {
                            var a = this;
                            this.hls = void 0, this.id = void 0, this.observer = void 0, this.frag = null, this.part = null, this.useWorker = void 0, this.worker = void 0, this.onwmsg = void 0, this.transmuxer = null, this.onTransmuxComplete = void 0, this.onFlush = void 0;
                            var u = t.config;
                            this.hls = t, this.id = e, this.useWorker = !!u.enableWorker, this.onTransmuxComplete = i, this.onFlush = n;
                            var d = function(t, e) {
                                (e = e || {}).frag = a.frag, e.id = a.id, a.hls.trigger(t, e)
                            };
                            this.observer = new Se.EventEmitter, this.observer.on(s.Events.FRAG_DECRYPTED, d), this.observer.on(s.Events.ERROR, d);
                            var h = { mp4: Le.isTypeSupported("video/mp4"), mpeg: Le.isTypeSupported("audio/mpeg"), mp3: Le.isTypeSupported('audio/mp4; codecs="mp3"') },
                                c = navigator.vendor;
                            if (this.useWorker && "undefined" != typeof Worker) {
                                var f;
                                l.logger.log("demuxing in webworker");
                                try {
                                    f = this.worker = function(t, e) {
                                        e = e || {};
                                        var i = { main: r.m },
                                            n = e.all ? { main: Object.keys(i.main) } : function(t, e) {
                                                for (var r = { main: [e] }, i = { main: [] }, n = { main: {} }; ye(r);)
                                                    for (var a = Object.keys(r), s = 0; s < a.length; s++) {
                                                        var o = a[s],
                                                            l = r[o].pop();
                                                        if (n[o] = n[o] || {}, !n[o][l] && t[o][l]) { n[o][l] = !0, i[o] = i[o] || [], i[o].push(l); for (var u = me(t, t[o][l], o), d = Object.keys(u), h = 0; h < d.length; h++) r[d[h]] = r[d[h]] || [], r[d[h]] = r[d[h]].concat(u[d[h]]) }
                                                    }
                                                return i
                                            }(i, t),
                                            a = "";
                                        Object.keys(n).filter((function(t) { return "main" !== t })).forEach((function(t) {
                                            for (var e = 0; n[t][e];) e++;
                                            n[t].push(e), i[t][e] = "(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })", a = a + "var " + t + " = (" + Ee(n, i, e, modules) + ")();\n"
                                        })), a = a + "new ((" + Ee(n, i, t, "main") + ")())(self);";
                                        var s = new window.Blob([a], { type: "text/javascript" }),
                                            o = (window.URL || window.webkitURL || window.mozURL || window.msURL).createObjectURL(s),
                                            l = new window.Worker(o);
                                        return l.objectURL = o, l
                                    }(182), this.onwmsg = this.onWorkerMessage.bind(this), f.addEventListener("message", this.onwmsg), f.onerror = function(t) { a.useWorker = !1, l.logger.warn("Exception in webworker, fallback to inline"), a.hls.trigger(s.Events.ERROR, { type: o.ErrorTypes.OTHER_ERROR, details: o.ErrorDetails.INTERNAL_EXCEPTION, fatal: !1, event: "demuxerWorker", error: new Error(t.message + "  (" + t.filename + ":" + t.lineno + ")") }) }, f.postMessage({ cmd: "init", typeSupported: h, vendor: c, id: e, config: JSON.stringify(u) })
                                } catch (t) { l.logger.warn("Error in worker:", t), l.logger.error("Error while initializing DemuxerWorker, fallback to inline"), f && self.URL.revokeObjectURL(f.objectURL), this.transmuxer = new Te.default(this.observer, h, u, c, e), this.worker = null }
                            } else this.transmuxer = new Te.default(this.observer, h, u, c, e)
                        }
                        var e = t.prototype;
                        return e.destroy = function() {
                            var t = this.worker;
                            if (t) t.removeEventListener("message", this.onwmsg), t.terminate(), this.worker = null, this.onwmsg = void 0;
                            else {
                                var e = this.transmuxer;
                                e && (e.destroy(), this.transmuxer = null)
                            }
                            var r = this.observer;
                            r && r.removeAllListeners(), this.frag = null, this.observer = null, this.hls = null
                        }, e.push = function(t, e, r, i, n, a, s, o, u, d) {
                            var h, c, f = this;
                            u.transmuxing.start = self.performance.now();
                            var g = this.transmuxer,
                                v = this.worker,
                                p = a ? a.start : n.start,
                                m = n.decryptdata,
                                y = this.frag,
                                E = !(y && n.cc === y.cc),
                                T = !(y && u.level === y.level),
                                S = y ? u.sn - y.sn : -1,
                                b = this.part ? u.part - this.part.index : -1,
                                L = 0 === S && u.id > 1 && u.id === (null == y ? void 0 : y.stats.chunkCount),
                                A = !T && (1 === S || 0 === S && (1 === b || L && b <= 0)),
                                D = self.performance.now();
                            (T || S || 0 === n.stats.parsing.start) && (n.stats.parsing.start = D), !a || !b && A || (a.stats.parsing.start = D);
                            var k = !(y && (null === (h = n.initSegment) || void 0 === h ? void 0 : h.url) === (null === (c = y.initSegment) || void 0 === c ? void 0 : c.url)),
                                R = new Te.TransmuxState(E, A, o, T, p, k);
                            if (!A || E || k) {
                                l.logger.log("[transmuxer-interface, " + n.type + "]: Starting new transmux session for sn: " + u.sn + " p: " + u.part + " level: " + u.level + " id: " + u.id + "\n        discontinuity: " + E + "\n        trackSwitch: " + T + "\n        contiguous: " + A + "\n        accurateTimeOffset: " + o + "\n        timeOffset: " + p + "\n        initSegmentChange: " + k);
                                var I = new Te.TransmuxConfig(r, i, e, s, d);
                                this.configureTransmuxer(I)
                            }
                            if (this.frag = n, this.part = a, v) v.postMessage({ cmd: "demux", data: t, decryptdata: m, chunkMeta: u, state: R }, t instanceof ArrayBuffer ? [t] : []);
                            else if (g) {
                                var w = g.push(t, m, u, R);
                                (0, Te.isPromise)(w) ? (g.async = !0, w.then((function(t) { f.handleTransmuxComplete(t) })).catch((function(t) { f.transmuxerError(t, u, "transmuxer-interface push error") }))) : (g.async = !1, this.handleTransmuxComplete(w))
                            }
                        }, e.flush = function(t) {
                            var e = this;
                            t.transmuxing.start = self.performance.now();
                            var r = this.transmuxer,
                                i = this.worker;
                            if (i) i.postMessage({ cmd: "flush", chunkMeta: t });
                            else if (r) {
                                var n = r.flush(t);
                                (0, Te.isPromise)(n) || r.async ? ((0, Te.isPromise)(n) || (n = Promise.resolve(n)), n.then((function(r) { e.handleFlushResult(r, t) })).catch((function(r) { e.transmuxerError(r, t, "transmuxer-interface flush error") }))) : this.handleFlushResult(n, t)
                            }
                        }, e.transmuxerError = function(t, e, r) { this.hls && this.hls.trigger(s.Events.ERROR, { type: o.ErrorTypes.MEDIA_ERROR, details: o.ErrorDetails.FRAG_PARSING_ERROR, chunkMeta: e, fatal: !1, error: t, err: t, reason: r }) }, e.handleFlushResult = function(t, e) {
                            var r = this;
                            t.forEach((function(t) { r.handleTransmuxComplete(t) })), this.onFlush(e)
                        }, e.onWorkerMessage = function(t) {
                            var e = t.data,
                                r = this.hls;
                            switch (e.event) {
                                case "init":
                                    self.URL.revokeObjectURL(this.worker.objectURL);
                                    break;
                                case "transmuxComplete":
                                    this.handleTransmuxComplete(e.data);
                                    break;
                                case "flush":
                                    this.onFlush(e.data);
                                    break;
                                case "workerLog":
                                    l.logger[e.data.logType] && l.logger[e.data.logType](e.data.message);
                                    break;
                                default:
                                    e.data = e.data || {}, e.data.frag = this.frag, e.data.id = this.id, r.trigger(e.event, e.data)
                            }
                        }, e.configureTransmuxer = function(t) {
                            var e = this.worker,
                                r = this.transmuxer;
                            e ? e.postMessage({ cmd: "configure", config: t }) : r && r.configure(t)
                        }, e.handleTransmuxComplete = function(t) { t.chunkMeta.transmuxing.end = self.performance.now(), this.onTransmuxComplete(t) }, t
                    }(),
                    De = function() {
                        function t(t, e, r, i) { this.config = void 0, this.media = null, this.fragmentTracker = void 0, this.hls = void 0, this.nudgeRetry = 0, this.stallReported = !1, this.stalled = null, this.moved = !1, this.seeking = !1, this.config = t, this.media = e, this.fragmentTracker = r, this.hls = i }
                        var e = t.prototype;
                        return e.destroy = function() { this.media = null, this.hls = this.fragmentTracker = null }, e.poll = function(t, e) {
                            var r = this.config,
                                i = this.media,
                                n = this.stalled;
                            if (null !== i) {
                                var a = i.currentTime,
                                    s = i.seeking,
                                    o = this.seeking && !s,
                                    u = !this.seeking && s;
                                if (this.seeking = s, a === t) {
                                    if ((u || o) && (this.stalled = null), !(i.paused && !s || i.ended || 0 === i.playbackRate) && Bt.getBuffered(i).length) {
                                        var d = Bt.bufferInfo(i, a, 0),
                                            h = d.len > 0,
                                            c = d.nextStart || 0;
                                        if (h || c) {
                                            if (s) {
                                                var f = d.len > 2,
                                                    g = !c || e && e.start <= a || c - a > 2 && !this.fragmentTracker.getPartialFragment(a);
                                                if (f || g) return;
                                                this.moved = !1
                                            }
                                            if (!this.moved && null !== this.stalled) {
                                                var v, p = Math.max(c, d.start || 0) - a,
                                                    m = this.hls.levels ? this.hls.levels[this.hls.currentLevel] : null,
                                                    y = (null == m || null === (v = m.details) || void 0 === v ? void 0 : v.live) ? 2 * m.details.targetduration : 2;
                                                if (p > 0 && p <= y) return void this._trySkipBufferHole(null)
                                            }
                                            var E = self.performance.now();
                                            if (null !== n) {
                                                var T = E - n;
                                                if (s || !(T >= 250) || (this._reportStall(d), this.media)) {
                                                    var S = Bt.bufferInfo(i, a, r.maxBufferHole);
                                                    this._tryFixBufferStall(S, T)
                                                }
                                            } else this.stalled = E
                                        }
                                    }
                                } else if (this.moved = !0, null !== n) {
                                    if (this.stallReported) {
                                        var b = self.performance.now() - n;
                                        l.logger.warn("playback not stuck anymore @" + a + ", after " + Math.round(b) + "ms"), this.stallReported = !1
                                    }
                                    this.stalled = null, this.nudgeRetry = 0
                                }
                            }
                        }, e._tryFixBufferStall = function(t, e) {
                            var r = this.config,
                                i = this.fragmentTracker,
                                n = this.media;
                            if (null !== n) {
                                var a = n.currentTime,
                                    s = i.getPartialFragment(a);
                                if (s && (this._trySkipBufferHole(s) || !this.media)) return;
                                t.len > r.maxBufferHole && e > 1e3 * r.highBufferWatchdogPeriod && (l.logger.warn("Trying to nudge playhead over buffer-hole"), this.stalled = null, this._tryNudgeBuffer())
                            }
                        }, e._reportStall = function(t) {
                            var e = this.hls,
                                r = this.media;
                            !this.stallReported && r && (this.stallReported = !0, l.logger.warn("Playback stalling at @" + r.currentTime + " due to low buffer (" + JSON.stringify(t) + ")"), e.trigger(s.Events.ERROR, { type: o.ErrorTypes.MEDIA_ERROR, details: o.ErrorDetails.BUFFER_STALLED_ERROR, fatal: !1, buffer: t.len }))
                        }, e._trySkipBufferHole = function(t) {
                            var e = this.config,
                                r = this.hls,
                                i = this.media;
                            if (null === i) return 0;
                            for (var n = i.currentTime, a = 0, u = Bt.getBuffered(i), d = 0; d < u.length; d++) {
                                var h = u.start(d);
                                if (n + e.maxBufferHole >= a && n < h) { var c = Math.max(h + .05, i.currentTime + .1); return l.logger.warn("skipping hole, adjusting currentTime from " + n + " to " + c), this.moved = !0, this.stalled = null, i.currentTime = c, t && r.trigger(s.Events.ERROR, { type: o.ErrorTypes.MEDIA_ERROR, details: o.ErrorDetails.BUFFER_SEEK_OVER_HOLE, fatal: !1, reason: "fragment loaded with buffer holes, seeking from " + n + " to " + c, frag: t }), c }
                                a = u.end(d)
                            }
                            return 0
                        }, e._tryNudgeBuffer = function() {
                            var t = this.config,
                                e = this.hls,
                                r = this.media,
                                i = this.nudgeRetry;
                            if (null !== r) {
                                var n = r.currentTime;
                                if (this.nudgeRetry++, i < t.nudgeMaxRetry) {
                                    var a = n + (i + 1) * t.nudgeOffset;
                                    l.logger.warn("Nudging 'currentTime' from " + n + " to " + a), r.currentTime = a, e.trigger(s.Events.ERROR, { type: o.ErrorTypes.MEDIA_ERROR, details: o.ErrorDetails.BUFFER_NUDGE_ON_STALL, fatal: !1 })
                                } else l.logger.error("Playhead still not moving while enough data buffered @" + n + " after " + t.nudgeMaxRetry + " nudges"), e.trigger(s.Events.ERROR, { type: o.ErrorTypes.MEDIA_ERROR, details: o.ErrorDetails.BUFFER_STALLED_ERROR, fatal: !0 })
                            }
                        }, t
                    }();

                function ke(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var i = e[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, (void 0, "symbol" == typeof(n = function(t, e) { if ("object" != typeof t || null === t) return t; var r = t[Symbol.toPrimitive]; if (void 0 !== r) { var i = r.call(t, e); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value.") } return String(t) }(i.key, "string")) ? n : String(n)), i)
                    }
                    var n
                }

                function Re(t, e) { return Re = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) { return t.__proto__ = e, t }, Re(t, e) }
                var Ie = function(t) {
                    var e, r;

                    function i(e, r, i) { var n; return (n = t.call(this, e, r, i, "[stream-controller]") || this).audioCodecSwap = !1, n.gapController = null, n.level = -1, n._forceStartLoad = !1, n.altAudio = !1, n.audioOnly = !1, n.fragPlaying = null, n.onvplaying = null, n.onvseeked = null, n.fragLastKbps = 0, n.couldBacktrack = !1, n.backtrackFragment = null, n.audioCodecSwitch = !1, n.videoBuffer = null, n._registerListeners(), n }
                    r = t, (e = i).prototype = Object.create(r.prototype), e.prototype.constructor = e, Re(e, r);
                    var n, l, u = i.prototype;
                    return u._registerListeners = function() {
                        var t = this.hls;
                        t.on(s.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.on(s.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(s.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.on(s.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.on(s.Events.LEVEL_LOADING, this.onLevelLoading, this), t.on(s.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.on(s.Events.FRAG_LOAD_EMERGENCY_ABORTED, this.onFragLoadEmergencyAborted, this), t.on(s.Events.ERROR, this.onError, this), t.on(s.Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), t.on(s.Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), t.on(s.Events.BUFFER_CREATED, this.onBufferCreated, this), t.on(s.Events.BUFFER_FLUSHED, this.onBufferFlushed, this), t.on(s.Events.LEVELS_UPDATED, this.onLevelsUpdated, this), t.on(s.Events.FRAG_BUFFERED, this.onFragBuffered, this)
                    }, u._unregisterListeners = function() {
                        var t = this.hls;
                        t.off(s.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.off(s.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(s.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.off(s.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.off(s.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.off(s.Events.FRAG_LOAD_EMERGENCY_ABORTED, this.onFragLoadEmergencyAborted, this), t.off(s.Events.ERROR, this.onError, this), t.off(s.Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), t.off(s.Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), t.off(s.Events.BUFFER_CREATED, this.onBufferCreated, this), t.off(s.Events.BUFFER_FLUSHED, this.onBufferFlushed, this), t.off(s.Events.LEVELS_UPDATED, this.onLevelsUpdated, this), t.off(s.Events.FRAG_BUFFERED, this.onFragBuffered, this)
                    }, u.onHandlerDestroying = function() { this._unregisterListeners(), this.onMediaDetaching() }, u.startLoad = function(t) {
                        if (this.levels) {
                            var e = this.lastCurrentTime,
                                r = this.hls;
                            if (this.stopLoad(), this.setInterval(100), this.level = -1, this.fragLoadError = 0, !this.startFragRequested) { var i = r.startLevel; - 1 === i && (r.config.testBandwidth && this.levels.length > 1 ? (i = 0, this.bitrateTest = !0) : i = r.nextAutoLevel), this.level = r.nextLoadLevel = i, this.loadedmetadata = !1 }
                            e > 0 && -1 === t && (this.log("Override startPosition with lastCurrentTime @" + e.toFixed(3)), t = e), this.state = te, this.nextLoadPosition = this.startPosition = this.lastCurrentTime = t, this.tick()
                        } else this._forceStartLoad = !0, this.state = Zt
                    }, u.stopLoad = function() { this._forceStartLoad = !1, t.prototype.stopLoad.call(this) }, u.doTick = function() {
                        switch (this.state) {
                            case te:
                                this.doTickIdle();
                                break;
                            case de:
                                var t, e = this.levels,
                                    r = this.level,
                                    i = null == e || null === (t = e[r]) || void 0 === t ? void 0 : t.details;
                                if (i && (!i.live || this.levelLastLoaded === this.level)) {
                                    if (this.waitForCdnTuneIn(i)) break;
                                    this.state = te;
                                    break
                                }
                                break;
                            case ie:
                                var n, a = self.performance.now(),
                                    s = this.retryDate;
                                (!s || a >= s || null !== (n = this.media) && void 0 !== n && n.seeking) && (this.log("retryDate reached, switch back to IDLE state"), this.resetStartWhenNotLoaded(this.level), this.state = te)
                        }
                        this.onTickEnd()
                    }, u.onTickEnd = function() { t.prototype.onTickEnd.call(this), this.checkBuffer(), this.checkFragmentChanged() }, u.doTickIdle = function() {
                        var t = this.hls,
                            e = this.levelLastLoaded,
                            r = this.levels,
                            i = this.media,
                            n = t.config,
                            a = t.nextLoadLevel;
                        if (null !== e && (i || !this.startFragRequested && n.startFragPrefetch) && (!this.altAudio || !this.audioOnly) && r && r[a]) {
                            var o = r[a],
                                l = this.getMainFwdBufferInfo();
                            if (null !== l) {
                                var u = this.getLevelDetails();
                                if (u && this._streamEnded(l, u)) { var d = {}; return this.altAudio && (d.type = "video"), this.hls.trigger(s.Events.BUFFER_EOS, d), void(this.state = oe) }
                                this.level = t.nextLoadLevel = a;
                                var h = o.details;
                                if (!h || this.state === de || h.live && this.levelLastLoaded !== a) return this.level = a, void(this.state = de);
                                if (!(l.len >= this.getMaxBufferLength(o.maxBitrate))) {
                                    this.backtrackFragment && this.backtrackFragment.start > l.end && (this.backtrackFragment = null);
                                    var c = this.backtrackFragment ? this.backtrackFragment.start : l.end,
                                        f = this.getNextFragment(c, h);
                                    if (this.couldBacktrack && !this.fragPrevious && f && "initSegment" !== f.sn && this.fragmentTracker.getState(f) !== St.OK) {
                                        var g, p = (null != (g = this.backtrackFragment) ? g : f).sn - h.startSN,
                                            m = h.fragments[p - 1];
                                        m && f.cc === m.cc && (f = m, this.fragmentTracker.removeFragment(m))
                                    } else this.backtrackFragment && l.len && (this.backtrackFragment = null);
                                    if (f && this.fragmentTracker.getState(f) === St.OK && this.nextLoadPosition > c) {
                                        var y = this.audioOnly && !this.altAudio ? v.ElementaryStreamTypes.AUDIO : v.ElementaryStreamTypes.VIDEO,
                                            E = (y === v.ElementaryStreamTypes.VIDEO ? this.videoBuffer : this.mediaBuffer) || this.media;
                                        E && this.afterBufferFlushed(E, y, V.PlaylistLevelType.MAIN), f = this.getNextFragment(this.nextLoadPosition, h)
                                    }
                                    f && (!f.initSegment || f.initSegment.data || this.bitrateTest || (f = f.initSegment), this.loadFragment(f, h, c))
                                }
                            }
                        }
                    }, u.loadFragment = function(e, r, i) {
                        var n, a = this.fragmentTracker.getState(e);
                        this.fragCurrent = e, a === St.NOT_LOADED ? "initSegment" === e.sn ? this._loadInitSegment(e, r) : this.bitrateTest ? (this.log("Fragment " + e.sn + " of level " + e.level + " is being downloaded to test bitrate and will not be buffered"), this._loadBitrateTestFrag(e, r)) : (this.startFragRequested = !0, t.prototype.loadFragment.call(this, e, r, i)) : a === St.APPENDING ? this.reduceMaxBufferLength(e.duration) && this.fragmentTracker.removeFragment(e) : 0 === (null === (n = this.media) || void 0 === n ? void 0 : n.buffered.length) && this.fragmentTracker.removeAllFragments()
                    }, u.getAppendedFrag = function(t) { var e = this.fragmentTracker.getAppendedFrag(t, V.PlaylistLevelType.MAIN); return e && "fragment" in e ? e.fragment : e }, u.getBufferedFrag = function(t) { return this.fragmentTracker.getBufferedFrag(t, V.PlaylistLevelType.MAIN) }, u.followingBufferedFrag = function(t) { return t ? this.getBufferedFrag(t.end + .5) : null }, u.immediateLevelSwitch = function() { this.abortCurrentFrag(), this.flushMainBuffer(0, Number.POSITIVE_INFINITY) }, u.nextLevelSwitch = function() {
                        var t = this.levels,
                            e = this.media;
                        if (null != e && e.readyState) {
                            var r, i = this.getAppendedFrag(e.currentTime);
                            if (i && i.start > 1 && this.flushMainBuffer(0, i.start - 1), !e.paused && t) {
                                var n = t[this.hls.nextLoadLevel],
                                    a = this.fragLastKbps;
                                r = a && this.fragCurrent ? this.fragCurrent.duration * n.maxBitrate / (1e3 * a) + 1 : 0
                            } else r = 0;
                            var s = this.getBufferedFrag(e.currentTime + r);
                            if (s) {
                                var o = this.followingBufferedFrag(s);
                                if (o) {
                                    this.abortCurrentFrag();
                                    var l = o.maxStartPTS ? o.maxStartPTS : o.start,
                                        u = o.duration,
                                        d = Math.max(s.end, l + Math.min(Math.max(u - this.config.maxFragLookUpTolerance, .5 * u), .75 * u));
                                    this.flushMainBuffer(d, Number.POSITIVE_INFINITY)
                                }
                            }
                        }
                    }, u.abortCurrentFrag = function() {
                        var t = this.fragCurrent;
                        switch (this.fragCurrent = null, this.backtrackFragment = null, t && t.abortRequests(), this.state) {
                            case ee:
                            case re:
                            case ie:
                            case ae:
                            case se:
                                this.state = te
                        }
                        this.nextLoadPosition = this.getLoadPosition()
                    }, u.flushMainBuffer = function(e, r) { t.prototype.flushMainBuffer.call(this, e, r, this.altAudio ? "video" : null) }, u.onMediaAttached = function(e, r) {
                        t.prototype.onMediaAttached.call(this, e, r);
                        var i = r.media;
                        this.onvplaying = this.onMediaPlaying.bind(this), this.onvseeked = this.onMediaSeeked.bind(this), i.addEventListener("playing", this.onvplaying), i.addEventListener("seeked", this.onvseeked), this.gapController = new De(this.config, i, this.fragmentTracker, this.hls)
                    }, u.onMediaDetaching = function() {
                        var e = this.media;
                        e && this.onvplaying && this.onvseeked && (e.removeEventListener("playing", this.onvplaying), e.removeEventListener("seeked", this.onvseeked), this.onvplaying = this.onvseeked = null, this.videoBuffer = null), this.fragPlaying = null, this.gapController && (this.gapController.destroy(), this.gapController = null), t.prototype.onMediaDetaching.call(this)
                    }, u.onMediaPlaying = function() { this.tick() }, u.onMediaSeeked = function() {
                        var t = this.media,
                            e = t ? t.currentTime : null;
                        (0, a.isFiniteNumber)(e) && this.log("Media seeked to " + e.toFixed(3)), this.tick()
                    }, u.onManifestLoading = function() { this.log("Trigger BUFFER_RESET"), this.hls.trigger(s.Events.BUFFER_RESET, void 0), this.fragmentTracker.removeAllFragments(), this.couldBacktrack = !1, this.startPosition = this.lastCurrentTime = 0, this.fragPlaying = null, this.backtrackFragment = null }, u.onManifestParsed = function(t, e) {
                        var r, i, n, a = !1,
                            s = !1;
                        e.levels.forEach((function(t) {
                            (r = t.audioCodec) && (-1 !== r.indexOf("mp4a.40.2") && (a = !0), -1 !== r.indexOf("mp4a.40.5") && (s = !0))
                        })), this.audioCodecSwitch = a && s && !("function" == typeof(null == (n = fe()) || null === (i = n.prototype) || void 0 === i ? void 0 : i.changeType)), this.audioCodecSwitch && this.log("Both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"), this.levels = e.levels, this.startFragRequested = !1
                    }, u.onLevelLoading = function(t, e) {
                        var r = this.levels;
                        if (r && this.state === te) {
                            var i = r[e.level];
                            (!i.details || i.details.live && this.levelLastLoaded !== e.level || this.waitForCdnTuneIn(i.details)) && (this.state = de)
                        }
                    }, u.onLevelLoaded = function(t, e) {
                        var r, i = this.levels,
                            n = e.level,
                            a = e.details,
                            o = a.totalduration;
                        if (i) {
                            this.log("Level " + n + " loaded [" + a.startSN + "," + a.endSN + "], cc [" + a.startCC + ", " + a.endCC + "] duration:" + o);
                            var l = this.fragCurrent;
                            !l || this.state !== re && this.state !== ie || l.level !== e.level && l.loader && (this.state = te, this.backtrackFragment = null, l.abortRequests());
                            var u = i[n],
                                d = 0;
                            if (a.live || null !== (r = u.details) && void 0 !== r && r.live) {
                                if (a.fragments[0] || (a.deltaUpdateFailed = !0), a.deltaUpdateFailed) return;
                                d = this.alignPlaylists(a, u.details)
                            }
                            if (u.details = a, this.levelLastLoaded = n, this.hls.trigger(s.Events.LEVEL_UPDATED, { details: a, level: n }), this.state === de) {
                                if (this.waitForCdnTuneIn(a)) return;
                                this.state = te
                            }
                            this.startFragRequested ? a.live && this.synchronizeToLiveEdge(a) : this.setStartPosition(a, d), this.tick()
                        } else this.warn("Levels were reset while loading level " + n)
                    }, u._handleFragmentLoadProgress = function(t) {
                        var e, r = t.frag,
                            i = t.part,
                            n = t.payload,
                            a = this.levels;
                        if (a) {
                            var s = a[r.level],
                                o = s.details;
                            if (o) {
                                var l = s.videoCodec,
                                    u = o.PTSKnown || !o.live,
                                    d = null === (e = r.initSegment) || void 0 === e ? void 0 : e.data,
                                    h = this._getAudioCodec(s),
                                    c = this.transmuxer = this.transmuxer || new Ae(this.hls, V.PlaylistLevelType.MAIN, this._handleTransmuxComplete.bind(this), this._handleTransmuxerFlush.bind(this)),
                                    f = i ? i.index : -1,
                                    g = -1 !== f,
                                    v = new Gt(r.level, r.sn, r.stats.chunkCount, n.byteLength, f, g),
                                    p = this.initPTS[r.cc];
                                c.push(n, d, h, l, r, i, o.totalduration, u, v, p)
                            } else this.warn("Dropping fragment " + r.sn + " of level " + r.level + " after level details were reset")
                        } else this.warn("Levels were reset while fragment load was in progress. Fragment " + r.sn + " of level " + r.level + " will not be buffered")
                    }, u.onAudioTrackSwitching = function(t, e) {
                        var r = this.altAudio,
                            i = !!e.url,
                            n = e.id;
                        if (!i) {
                            if (this.mediaBuffer !== this.media) {
                                this.log("Switching on main audio, use media.buffered to schedule main fragment loading"), this.mediaBuffer = this.media;
                                var a = this.fragCurrent;
                                a && (this.log("Switching to main audio track, cancel main fragment load"), a.abortRequests()), this.resetTransmuxer(), this.resetLoadingState()
                            } else this.audioOnly && this.resetTransmuxer();
                            var o = this.hls;
                            r && o.trigger(s.Events.BUFFER_FLUSHING, { startOffset: 0, endOffset: Number.POSITIVE_INFINITY, type: "audio" }), o.trigger(s.Events.AUDIO_TRACK_SWITCHED, { id: n })
                        }
                    }, u.onAudioTrackSwitched = function(t, e) {
                        var r = e.id,
                            i = !!this.hls.audioTracks[r].url;
                        if (i) {
                            var n = this.videoBuffer;
                            n && this.mediaBuffer !== n && (this.log("Switching on alternate audio, use video.buffered to schedule main fragment loading"), this.mediaBuffer = n)
                        }
                        this.altAudio = i, this.tick()
                    }, u.onBufferCreated = function(t, e) {
                        var r, i, n = e.tracks,
                            a = !1;
                        for (var s in n) {
                            var o = n[s];
                            if ("main" === o.id) {
                                if (i = s, r = o, "video" === s) {
                                    var l = n[s];
                                    l && (this.videoBuffer = l.buffer)
                                }
                            } else a = !0
                        }
                        a && r ? (this.log("Alternate track found, use " + i + ".buffered to schedule main fragment loading"), this.mediaBuffer = r.buffer) : this.mediaBuffer = this.media
                    }, u.onFragBuffered = function(t, e) {
                        var r = e.frag,
                            i = e.part;
                        if (!r || r.type === V.PlaylistLevelType.MAIN) {
                            if (this.fragContextChanged(r)) return this.warn("Fragment " + r.sn + (i ? " p: " + i.index : "") + " of level " + r.level + " finished buffering, but was aborted. state: " + this.state), void(this.state === se && (this.state = te));
                            var n = i ? i.stats : r.stats;
                            this.fragLastKbps = Math.round(8 * n.total / (n.buffering.end - n.loading.first)), "initSegment" !== r.sn && (this.fragPrevious = r), this.fragBufferedComplete(r, i)
                        }
                    }, u.onError = function(t, e) {
                        if (e.type !== o.ErrorTypes.KEY_SYSTEM_ERROR) switch (e.details) {
                            case o.ErrorDetails.FRAG_LOAD_ERROR:
                            case o.ErrorDetails.FRAG_LOAD_TIMEOUT:
                            case o.ErrorDetails.FRAG_PARSING_ERROR:
                            case o.ErrorDetails.KEY_LOAD_ERROR:
                            case o.ErrorDetails.KEY_LOAD_TIMEOUT:
                                this.onFragmentOrKeyLoadError(V.PlaylistLevelType.MAIN, e);
                                break;
                            case o.ErrorDetails.LEVEL_LOAD_ERROR:
                            case o.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                                this.state !== le && (e.fatal ? (this.warn("" + e.details), this.state = le) : e.levelRetry || this.state !== de || (this.state = te));
                                break;
                            case o.ErrorDetails.BUFFER_FULL_ERROR:
                                if ("main" === e.parent && (this.state === ae || this.state === se)) {
                                    var r = !0,
                                        i = this.getFwdBufferInfo(this.media, V.PlaylistLevelType.MAIN);
                                    i && i.len > .5 && (r = !this.reduceMaxBufferLength(i.len)), r && (this.warn("buffer full error also media.currentTime is not buffered, flush main"), this.immediateLevelSwitch()), this.resetLoadingState()
                                }
                        } else this.onFragmentOrKeyLoadError(V.PlaylistLevelType.MAIN, e)
                    }, u.checkBuffer = function() {
                        var t = this.media,
                            e = this.gapController;
                        if (t && e && t.readyState) {
                            if (this.loadedmetadata || !Bt.getBuffered(t).length) {
                                var r = this.state !== te ? this.fragCurrent : null;
                                e.poll(this.lastCurrentTime, r)
                            }
                            this.lastCurrentTime = t.currentTime
                        }
                    }, u.onFragLoadEmergencyAborted = function() { this.state = te, this.loadedmetadata || (this.startFragRequested = !1, this.nextLoadPosition = this.startPosition), this.tickImmediate() }, u.onBufferFlushed = function(t, e) {
                        var r = e.type;
                        if (r !== v.ElementaryStreamTypes.AUDIO || this.audioOnly && !this.altAudio) {
                            var i = (r === v.ElementaryStreamTypes.VIDEO ? this.videoBuffer : this.mediaBuffer) || this.media;
                            this.afterBufferFlushed(i, r, V.PlaylistLevelType.MAIN)
                        }
                    }, u.onLevelsUpdated = function(t, e) { this.levels = e.levels }, u.swapAudioCodec = function() { this.audioCodecSwap = !this.audioCodecSwap }, u.seekToStartPos = function() {
                        var t = this.media;
                        if (t) {
                            var e = t.currentTime,
                                r = this.startPosition;
                            if (r >= 0 && e < r) {
                                if (t.seeking) return void this.log("could not seek to " + r + ", already seeking at " + e);
                                var i = Bt.getBuffered(t),
                                    n = (i.length ? i.start(0) : 0) - r;
                                n > 0 && (n < this.config.maxBufferHole || n < this.config.maxFragLookUpTolerance) && (this.log("adjusting start position by " + n + " to match buffer start"), r += n, this.startPosition = r), this.log("seek to target start position " + r + " from current time " + e), t.currentTime = r
                            }
                        }
                    }, u._getAudioCodec = function(t) { var e = this.config.defaultAudioCodec || t.audioCodec; return this.audioCodecSwap && e && (this.log("Swapping audio codec"), e = -1 !== e.indexOf("mp4a.40.5") ? "mp4a.40.2" : "mp4a.40.5"), e }, u._loadBitrateTestFrag = function(t, e) {
                        var r = this;
                        t.bitrateTest = !0, this._doFragLoad(t, e).then((function(e) {
                            var i = r.hls;
                            if (e && !r.fragContextChanged(t)) {
                                r.fragLoadError = 0, r.state = te, r.startFragRequested = !1, r.bitrateTest = !1;
                                var n = t.stats;
                                n.parsing.start = n.parsing.end = n.buffering.start = n.buffering.end = self.performance.now(), i.trigger(s.Events.FRAG_LOADED, e), t.bitrateTest = !1
                            }
                        }))
                    }, u._handleTransmuxComplete = function(t) {
                        var e, r = "main",
                            i = this.hls,
                            n = t.remuxResult,
                            o = t.chunkMeta,
                            l = this.getCurrentContext(o);
                        if (!l) return this.warn("The loading context changed while buffering fragment " + o.sn + " of level " + o.level + ". This chunk will not be buffered."), void this.resetStartWhenNotLoaded(o.level);
                        var u = l.frag,
                            d = l.part,
                            h = l.level,
                            c = n.video,
                            f = n.text,
                            g = n.id3,
                            p = n.initSegment,
                            m = h.details,
                            y = this.altAudio ? void 0 : n.audio;
                        if (!this.fragContextChanged(u)) {
                            if (this.state = ae, p) {
                                p.tracks && (this._bufferInitSegment(h, p.tracks, u, o), i.trigger(s.Events.FRAG_PARSING_INIT_SEGMENT, { frag: u, id: r, tracks: p.tracks }));
                                var E = p.initPTS,
                                    T = p.timescale;
                                (0, a.isFiniteNumber)(E) && (this.initPTS[u.cc] = E, i.trigger(s.Events.INIT_PTS_FOUND, { frag: u, id: r, initPTS: E, timescale: T }))
                            }
                            if (c && !1 !== n.independent) {
                                if (m) {
                                    var S = c.startPTS,
                                        b = c.endPTS,
                                        L = c.startDTS,
                                        A = c.endDTS;
                                    if (d) d.elementaryStreams[c.type] = { startPTS: S, endPTS: b, startDTS: L, endDTS: A };
                                    else if (c.firstKeyFrame && c.independent && 1 === o.id && (this.couldBacktrack = !0), c.dropped && c.independent) {
                                        var D = this.getMainFwdBufferInfo();
                                        if ((D ? D.end : this.getLoadPosition()) + this.config.maxBufferHole < (c.firstKeyFramePTS ? c.firstKeyFramePTS : S) - this.config.maxBufferHole) return void this.backtrack(u);
                                        u.setElementaryStreamInfo(c.type, u.start, b, u.start, A, !0)
                                    }
                                    u.setElementaryStreamInfo(c.type, S, b, L, A), this.backtrackFragment && (this.backtrackFragment = u), this.bufferFragmentData(c, u, d, o)
                                }
                            } else if (!1 === n.independent) return void this.backtrack(u);
                            if (y) {
                                var k = y.startPTS,
                                    R = y.endPTS,
                                    I = y.startDTS,
                                    w = y.endDTS;
                                d && (d.elementaryStreams[v.ElementaryStreamTypes.AUDIO] = { startPTS: k, endPTS: R, startDTS: I, endDTS: w }), u.setElementaryStreamInfo(v.ElementaryStreamTypes.AUDIO, k, R, I, w), this.bufferFragmentData(y, u, d, o)
                            }
                            if (m && null != g && null !== (e = g.samples) && void 0 !== e && e.length) {
                                var C = { id: r, frag: u, details: m, samples: g.samples };
                                i.trigger(s.Events.FRAG_PARSING_METADATA, C)
                            }
                            if (m && f) {
                                var _ = { id: r, frag: u, details: m, samples: f.samples };
                                i.trigger(s.Events.FRAG_PARSING_USERDATA, _)
                            }
                        }
                    }, u._bufferInitSegment = function(t, e, r, i) {
                        var n = this;
                        if (this.state === ae) {
                            this.audioOnly = !!e.audio && !e.video, this.altAudio && !this.audioOnly && delete e.audio;
                            var a = e.audio,
                                o = e.video,
                                l = e.audiovideo;
                            if (a) {
                                var u = t.audioCodec,
                                    d = navigator.userAgent.toLowerCase();
                                this.audioCodecSwitch && (u && (u = -1 !== u.indexOf("mp4a.40.5") ? "mp4a.40.2" : "mp4a.40.5"), 1 !== a.metadata.channelCount && -1 === d.indexOf("firefox") && (u = "mp4a.40.5")), -1 !== d.indexOf("android") && "audio/mpeg" !== a.container && (u = "mp4a.40.2", this.log("Android: force audio codec to " + u)), t.audioCodec && t.audioCodec !== u && this.log('Swapping manifest audio codec "' + t.audioCodec + '" for "' + u + '"'), a.levelCodec = u, a.id = "main", this.log("Init audio buffer, container:" + a.container + ", codecs[selected/level/parsed]=[" + (u || "") + "/" + (t.audioCodec || "") + "/" + a.codec + "]")
                            }
                            o && (o.levelCodec = t.videoCodec, o.id = "main", this.log("Init video buffer, container:" + o.container + ", codecs[level/parsed]=[" + (t.videoCodec || "") + "/" + o.codec + "]")), l && this.log("Init audiovideo buffer, container:" + l.container + ", codecs[level/parsed]=[" + (t.attrs.CODECS || "") + "/" + l.codec + "]"), this.hls.trigger(s.Events.BUFFER_CODECS, e), Object.keys(e).forEach((function(t) {
                                var a = e[t].initSegment;
                                null != a && a.byteLength && n.hls.trigger(s.Events.BUFFER_APPENDING, { type: t, data: a, frag: r, part: null, chunkMeta: i, parent: r.type })
                            })), this.tick()
                        }
                    }, u.getMainFwdBufferInfo = function() { return this.getFwdBufferInfo(this.mediaBuffer ? this.mediaBuffer : this.media, V.PlaylistLevelType.MAIN) }, u.backtrack = function(t) { this.couldBacktrack = !0, this.backtrackFragment = t, this.resetTransmuxer(), this.flushBufferGap(t), this.fragmentTracker.removeFragment(t), this.fragPrevious = null, this.nextLoadPosition = t.start, this.state = te }, u.checkFragmentChanged = function() {
                        var t = this.media,
                            e = null;
                        if (t && t.readyState > 1 && !1 === t.seeking) {
                            var r = t.currentTime;
                            if (Bt.isBuffered(t, r) ? e = this.getAppendedFrag(r) : Bt.isBuffered(t, r + .1) && (e = this.getAppendedFrag(r + .1)), e) {
                                this.backtrackFragment = null;
                                var i = this.fragPlaying,
                                    n = e.level;
                                i && e.sn === i.sn && i.level === n && e.urlId === i.urlId || (this.fragPlaying = e, this.hls.trigger(s.Events.FRAG_CHANGED, { frag: e }), i && i.level === n || this.hls.trigger(s.Events.LEVEL_SWITCHED, { level: n }))
                            }
                        }
                    }, n = i, (l = [{ key: "nextLevel", get: function() { var t = this.nextBufferedFrag; return t ? t.level : -1 } }, { key: "currentFrag", get: function() { var t = this.media; return t ? this.fragPlaying || this.getAppendedFrag(t.currentTime) : null } }, {
                        key: "currentProgramDateTime",
                        get: function() {
                            var t = this.media;
                            if (t) {
                                var e = t.currentTime,
                                    r = this.currentFrag;
                                if (r && (0, a.isFiniteNumber)(e) && (0, a.isFiniteNumber)(r.programDateTime)) { var i = r.programDateTime + 1e3 * (e - r.start); return new Date(i) }
                            }
                            return null
                        }
                    }, { key: "currentLevel", get: function() { var t = this.currentFrag; return t ? t.level : -1 } }, { key: "nextBufferedFrag", get: function() { var t = this.currentFrag; return t ? this.followingBufferedFrag(t) : null } }, { key: "forceStartLoad", get: function() { return this._forceStartLoad } }]) && ke(n.prototype, l), Object.defineProperty(n, "prototype", { writable: !1 }), i
                }(he);
                const we = function() {
                        function t(t, e, r) { void 0 === e && (e = 0), void 0 === r && (r = 0), this.halfLife = void 0, this.alpha_ = void 0, this.estimate_ = void 0, this.totalWeight_ = void 0, this.halfLife = t, this.alpha_ = t ? Math.exp(Math.log(.5) / t) : 0, this.estimate_ = e, this.totalWeight_ = r }
                        var e = t.prototype;
                        return e.sample = function(t, e) {
                            var r = Math.pow(this.alpha_, t);
                            this.estimate_ = e * (1 - r) + r * this.estimate_, this.totalWeight_ += t
                        }, e.getTotalWeight = function() { return this.totalWeight_ }, e.getEstimate = function() { if (this.alpha_) { var t = 1 - Math.pow(this.alpha_, this.totalWeight_); if (t) return this.estimate_ / t } return this.estimate_ }, t
                    }(),
                    Ce = function() {
                        function t(t, e, r) { this.defaultEstimate_ = void 0, this.minWeight_ = void 0, this.minDelayMs_ = void 0, this.slow_ = void 0, this.fast_ = void 0, this.defaultEstimate_ = r, this.minWeight_ = .001, this.minDelayMs_ = 50, this.slow_ = new we(t), this.fast_ = new we(e) }
                        var e = t.prototype;
                        return e.update = function(t, e) {
                            var r = this.slow_,
                                i = this.fast_;
                            this.slow_.halfLife !== t && (this.slow_ = new we(t, r.getEstimate(), r.getTotalWeight())), this.fast_.halfLife !== e && (this.fast_ = new we(e, i.getEstimate(), i.getTotalWeight()))
                        }, e.sample = function(t, e) {
                            var r = (t = Math.max(t, this.minDelayMs_)) / 1e3,
                                i = 8 * e / r;
                            this.fast_.sample(r, i), this.slow_.sample(r, i)
                        }, e.canEstimate = function() { var t = this.fast_; return t && t.getTotalWeight() >= this.minWeight_ }, e.getEstimate = function() { return this.canEstimate() ? Math.min(this.fast_.getEstimate(), this.slow_.getEstimate()) : this.defaultEstimate_ }, e.destroy = function() {}, t
                    }();

                function _e(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var i = e[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, (void 0, "symbol" == typeof(n = function(t, e) { if ("object" != typeof t || null === t) return t; var r = t[Symbol.toPrimitive]; if (void 0 !== r) { var i = r.call(t, e); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value.") } return String(t) }(i.key, "string")) ? n : String(n)), i)
                    }
                    var n
                }
                const Pe = function() {
                    function t(t) {
                        this.hls = void 0, this.lastLoadedFragLevel = 0, this._nextAutoLevel = -1, this.timer = void 0, this.onCheck = this._abandonRulesCheck.bind(this), this.fragCurrent = null, this.partCurrent = null, this.bitrateTestDelay = 0, this.bwEstimator = void 0, this.hls = t;
                        var e = t.config;
                        this.bwEstimator = new Ce(e.abrEwmaSlowVoD, e.abrEwmaFastVoD, e.abrEwmaDefaultEstimate), this.registerListeners()
                    }
                    var e, r, i = t.prototype;
                    return i.registerListeners = function() {
                        var t = this.hls;
                        t.on(s.Events.FRAG_LOADING, this.onFragLoading, this), t.on(s.Events.FRAG_LOADED, this.onFragLoaded, this), t.on(s.Events.FRAG_BUFFERED, this.onFragBuffered, this), t.on(s.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.on(s.Events.ERROR, this.onError, this)
                    }, i.unregisterListeners = function() {
                        var t = this.hls;
                        t.off(s.Events.FRAG_LOADING, this.onFragLoading, this), t.off(s.Events.FRAG_LOADED, this.onFragLoaded, this), t.off(s.Events.FRAG_BUFFERED, this.onFragBuffered, this), t.off(s.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.off(s.Events.ERROR, this.onError, this)
                    }, i.destroy = function() { this.unregisterListeners(), this.clearTimer(), this.hls = this.onCheck = null, this.fragCurrent = this.partCurrent = null }, i.onFragLoading = function(t, e) {
                        var r, i = e.frag;
                        i.type === V.PlaylistLevelType.MAIN && (this.timer || (this.fragCurrent = i, this.partCurrent = null != (r = e.part) ? r : null, this.timer = self.setInterval(this.onCheck, 100)))
                    }, i.onLevelLoaded = function(t, e) {
                        var r = this.hls.config;
                        e.details.live ? this.bwEstimator.update(r.abrEwmaSlowLive, r.abrEwmaFastLive) : this.bwEstimator.update(r.abrEwmaSlowVoD, r.abrEwmaFastVoD)
                    }, i._abandonRulesCheck = function() {
                        var t = this.fragCurrent,
                            e = this.partCurrent,
                            r = this.hls,
                            i = r.autoLevelEnabled,
                            n = r.media;
                        if (t && n) {
                            var o = e ? e.stats : t.stats,
                                u = e ? e.duration : t.duration;
                            if (o.aborted || o.loaded && o.loaded === o.total || 0 === t.level) return this.clearTimer(), void(this._nextAutoLevel = -1);
                            if (i && !n.paused && n.playbackRate && n.readyState) {
                                var d = r.mainForwardBufferInfo;
                                if (null !== d) {
                                    var h = performance.now() - o.loading.start,
                                        c = Math.abs(n.playbackRate);
                                    if (!(h <= 500 * u / c)) {
                                        var f = o.loaded && o.loading.first,
                                            g = this.bwEstimator.getEstimate(),
                                            v = r.levels,
                                            p = r.minAutoLevel,
                                            m = v[t.level],
                                            y = o.total || Math.max(o.loaded, Math.round(u * m.maxBitrate / 8)),
                                            E = f ? 1e3 * o.loaded / h : 0,
                                            T = E ? (y - o.loaded) / E : 8 * y / g,
                                            S = d.len / c;
                                        if (!(T <= S)) {
                                            var b, L = Number.POSITIVE_INFINITY;
                                            for (b = t.level - 1; b > p; b--) { var A = v[b].maxBitrate; if ((L = E ? u * A / (6.4 * E) : u * A / g) < S) break }
                                            L >= T || (l.logger.warn("Fragment " + t.sn + (e ? " part " + e.index : "") + " of level " + t.level + " is loading too slowly and will cause an underbuffer; aborting and switching to level " + b + "\n      Current BW estimate: " + ((0, a.isFiniteNumber)(g) ? (g / 1024).toFixed(3) : "Unknown") + " Kb/s\n      Estimated load time for current fragment: " + T.toFixed(3) + " s\n      Estimated load time for the next fragment: " + L.toFixed(3) + " s\n      Time to underbuffer: " + S.toFixed(3) + " s"), r.nextLoadLevel = b, f && this.bwEstimator.sample(h, o.loaded), this.clearTimer(), (t.loader || t.keyLoader) && (this.fragCurrent = this.partCurrent = null, t.abortRequests()), r.trigger(s.Events.FRAG_LOAD_EMERGENCY_ABORTED, { frag: t, part: e, stats: o }))
                                        }
                                    }
                                }
                            }
                        }
                    }, i.onFragLoaded = function(t, e) {
                        var r = e.frag,
                            i = e.part;
                        if (r.type === V.PlaylistLevelType.MAIN && (0, a.isFiniteNumber)(r.sn)) {
                            var n = i ? i.stats : r.stats,
                                o = i ? i.duration : r.duration;
                            if (this.clearTimer(), this.lastLoadedFragLevel = r.level, this._nextAutoLevel = -1, this.hls.config.abrMaxWithRealBitrate) {
                                var l = this.hls.levels[r.level],
                                    u = (l.loaded ? l.loaded.bytes : 0) + n.loaded,
                                    d = (l.loaded ? l.loaded.duration : 0) + o;
                                l.loaded = { bytes: u, duration: d }, l.realBitrate = Math.round(8 * u / d)
                            }
                            if (r.bitrateTest) {
                                var h = { stats: n, frag: r, part: i, id: r.type };
                                this.onFragBuffered(s.Events.FRAG_BUFFERED, h)
                            }
                        }
                    }, i.onFragBuffered = function(t, e) {
                        var r = e.frag,
                            i = e.part,
                            n = i ? i.stats : r.stats;
                        if (!n.aborted && r.type === V.PlaylistLevelType.MAIN && "initSegment" !== r.sn) {
                            var a = n.parsing.end - n.loading.start;
                            this.bwEstimator.sample(a, n.loaded), n.bwEstimate = this.bwEstimator.getEstimate(), r.bitrateTest ? this.bitrateTestDelay = a / 1e3 : this.bitrateTestDelay = 0
                        }
                    }, i.onError = function(t, e) {
                        var r;
                        if ((null === (r = e.frag) || void 0 === r ? void 0 : r.type) === V.PlaylistLevelType.MAIN) {
                            if (e.type === o.ErrorTypes.KEY_SYSTEM_ERROR) return void this.clearTimer();
                            switch (e.details) {
                                case o.ErrorDetails.FRAG_LOAD_ERROR:
                                case o.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                case o.ErrorDetails.KEY_LOAD_ERROR:
                                case o.ErrorDetails.KEY_LOAD_TIMEOUT:
                                    this.clearTimer()
                            }
                        }
                    }, i.clearTimer = function() { self.clearInterval(this.timer), this.timer = void 0 }, i.getNextABRAutoLevel = function() {
                        var t = this.fragCurrent,
                            e = this.partCurrent,
                            r = this.hls,
                            i = r.maxAutoLevel,
                            n = r.config,
                            a = r.minAutoLevel,
                            s = r.media,
                            o = e ? e.duration : t ? t.duration : 0,
                            u = s && 0 !== s.playbackRate ? Math.abs(s.playbackRate) : 1,
                            d = this.bwEstimator ? this.bwEstimator.getEstimate() : n.abrEwmaDefaultEstimate,
                            h = r.mainForwardBufferInfo,
                            c = (h ? h.len : 0) / u,
                            f = this.findBestLevel(d, a, i, c, n.abrBandWidthFactor, n.abrBandWidthUpFactor);
                        if (f >= 0) return f;
                        l.logger.trace((c ? "rebuffering expected" : "buffer is empty") + ", finding optimal quality level");
                        var g = o ? Math.min(o, n.maxStarvationDelay) : n.maxStarvationDelay,
                            v = n.abrBandWidthFactor,
                            p = n.abrBandWidthUpFactor;
                        if (!c) {
                            var m = this.bitrateTestDelay;
                            m && (g = (o ? Math.min(o, n.maxLoadingDelay) : n.maxLoadingDelay) - m, l.logger.trace("bitrate test took " + Math.round(1e3 * m) + "ms, set first fragment max fetchDuration to " + Math.round(1e3 * g) + " ms"), v = p = 1)
                        }
                        return f = this.findBestLevel(d, a, i, c + g, v, p), Math.max(f, 0)
                    }, i.findBestLevel = function(t, e, r, i, n, s) {
                        for (var o, u = this.fragCurrent, d = this.partCurrent, h = this.lastLoadedFragLevel, c = this.hls.levels, f = c[h], g = !(null == f || null === (o = f.details) || void 0 === o || !o.live), v = null == f ? void 0 : f.codecSet, p = d ? d.duration : u ? u.duration : 0, m = r; m >= e; m--) {
                            var y = c[m];
                            if (y && (!v || y.codecSet === v)) {
                                var E, T = y.details,
                                    S = (d ? null == T ? void 0 : T.partTarget : null == T ? void 0 : T.averagetargetduration) || p;
                                E = m <= h ? n * t : s * t;
                                var b = c[m].maxBitrate,
                                    L = b * S / E;
                                if (l.logger.trace("level/adjustedbw/bitrate/avgDuration/maxFetchDuration/fetchDuration: " + m + "/" + Math.round(E) + "/" + b + "/" + S + "/" + i + "/" + L), E > b && (0 === L || !(0, a.isFiniteNumber)(L) || g && !this.bitrateTestDelay || L < i)) return m
                            }
                        }
                        return -1
                    }, e = t, (r = [{
                        key: "nextAutoLevel",
                        get: function() {
                            var t = this._nextAutoLevel,
                                e = this.bwEstimator;
                            if (-1 !== t && !e.canEstimate()) return t;
                            var r = this.getNextABRAutoLevel();
                            return -1 !== t && this.hls.levels[r].loadError ? t : (-1 !== t && (r = Math.min(t, r)), r)
                        },
                        set: function(t) { this._nextAutoLevel = t }
                    }]) && _e(e.prototype, r), Object.defineProperty(e, "prototype", { writable: !1 }), t
                }();
                var Oe = function() {
                    function t() { this.chunks = [], this.dataLength = 0 }
                    var e = t.prototype;
                    return e.push = function(t) { this.chunks.push(t), this.dataLength += t.length }, e.flush = function() {
                        var t, e = this.chunks,
                            r = this.dataLength;
                        return e.length ? (t = 1 === e.length ? e[0] : function(t, e) {
                            for (var r = new Uint8Array(e), i = 0, n = 0; n < t.length; n++) {
                                var a = t[n];
                                r.set(a, i), i += a.length
                            }
                            return r
                        }(e, r), this.reset(), t) : new Uint8Array(0)
                    }, e.reset = function() { this.chunks.length = 0, this.dataLength = 0 }, t
                }();

                function xe() { return xe = Object.assign ? Object.assign.bind() : function(t) { for (var e = 1; e < arguments.length; e++) { var r = arguments[e]; for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]) } return t }, xe.apply(this, arguments) }

                function Fe(t, e) { return Fe = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) { return t.__proto__ = e, t }, Fe(t, e) }
                var Me = function(t) {
                    var e, r;

                    function i(e, r, i) { var n; return (n = t.call(this, e, r, i, "[audio-stream-controller]") || this).videoBuffer = null, n.videoTrackCC = -1, n.waitingVideoCC = -1, n.audioSwitch = !1, n.trackId = -1, n.waitingData = null, n.mainDetails = null, n.bufferFlushed = !1, n.cachedTrackLoadedData = null, n._registerListeners(), n }
                    r = t, (e = i).prototype = Object.create(r.prototype), e.prototype.constructor = e, Fe(e, r);
                    var n = i.prototype;
                    return n.onHandlerDestroying = function() { this._unregisterListeners(), this.mainDetails = null }, n._registerListeners = function() {
                        var t = this.hls;
                        t.on(s.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.on(s.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(s.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.on(s.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.on(s.Events.AUDIO_TRACKS_UPDATED, this.onAudioTracksUpdated, this), t.on(s.Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), t.on(s.Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), t.on(s.Events.ERROR, this.onError, this), t.on(s.Events.BUFFER_RESET, this.onBufferReset, this), t.on(s.Events.BUFFER_CREATED, this.onBufferCreated, this), t.on(s.Events.BUFFER_FLUSHED, this.onBufferFlushed, this), t.on(s.Events.INIT_PTS_FOUND, this.onInitPtsFound, this), t.on(s.Events.FRAG_BUFFERED, this.onFragBuffered, this)
                    }, n._unregisterListeners = function() {
                        var t = this.hls;
                        t.off(s.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.off(s.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(s.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.off(s.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.off(s.Events.AUDIO_TRACKS_UPDATED, this.onAudioTracksUpdated, this), t.off(s.Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), t.off(s.Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), t.off(s.Events.ERROR, this.onError, this), t.off(s.Events.BUFFER_RESET, this.onBufferReset, this), t.off(s.Events.BUFFER_CREATED, this.onBufferCreated, this), t.off(s.Events.BUFFER_FLUSHED, this.onBufferFlushed, this), t.off(s.Events.INIT_PTS_FOUND, this.onInitPtsFound, this), t.off(s.Events.FRAG_BUFFERED, this.onFragBuffered, this)
                    }, n.onInitPtsFound = function(t, e) {
                        var r = e.frag,
                            i = e.id,
                            n = e.initPTS;
                        if ("main" === i) {
                            var a = r.cc;
                            this.initPTS[r.cc] = n, this.log("InitPTS for cc: " + a + " found from main: " + n), this.videoTrackCC = a, this.state === ue && this.tick()
                        }
                    }, n.startLoad = function(t) {
                        if (!this.levels) return this.startPosition = t, void(this.state = Zt);
                        var e = this.lastCurrentTime;
                        this.stopLoad(), this.setInterval(100), this.fragLoadError = 0, e > 0 && -1 === t ? (this.log("Override startPosition with lastCurrentTime @" + e.toFixed(3)), t = e, this.state = te) : (this.loadedmetadata = !1, this.state = ne), this.nextLoadPosition = this.startPosition = this.lastCurrentTime = t, this.tick()
                    }, n.doTick = function() {
                        switch (this.state) {
                            case te:
                                this.doTickIdle();
                                break;
                            case ne:
                                var e, r = this.levels,
                                    i = this.trackId,
                                    n = null == r || null === (e = r[i]) || void 0 === e ? void 0 : e.details;
                                if (n) {
                                    if (this.waitForCdnTuneIn(n)) break;
                                    this.state = ue
                                }
                                break;
                            case ie:
                                var a, s = performance.now(),
                                    o = this.retryDate;
                                (!o || s >= o || null !== (a = this.media) && void 0 !== a && a.seeking) && (this.log("RetryDate reached, switch back to IDLE state"), this.resetStartWhenNotLoaded(this.trackId), this.state = te);
                                break;
                            case ue:
                                var l = this.waitingData;
                                if (l) {
                                    var u = l.frag,
                                        d = l.part,
                                        h = l.cache,
                                        c = l.complete;
                                    if (void 0 !== this.initPTS[u.cc]) {
                                        this.waitingData = null, this.waitingVideoCC = -1, this.state = re;
                                        var f = { frag: u, part: d, payload: h.flush(), networkDetails: null };
                                        this._handleFragmentLoadProgress(f), c && t.prototype._handleFragmentLoadComplete.call(this, f)
                                    } else if (this.videoTrackCC !== this.waitingVideoCC) this.log("Waiting fragment cc (" + u.cc + ") cancelled because video is at cc " + this.videoTrackCC), this.clearWaitingFragment();
                                    else {
                                        var g = this.getLoadPosition(),
                                            v = Bt.bufferInfo(this.mediaBuffer, g, this.config.maxBufferHole);
                                        qt(v.end, this.config.maxFragLookUpTolerance, u) < 0 && (this.log("Waiting fragment cc (" + u.cc + ") @ " + u.start + " cancelled because another fragment at " + v.end + " is needed"), this.clearWaitingFragment())
                                    }
                                } else this.state = te
                        }
                        this.onTickEnd()
                    }, n.clearWaitingFragment = function() {
                        var t = this.waitingData;
                        t && (this.fragmentTracker.removeFragment(t.frag), this.waitingData = null, this.waitingVideoCC = -1, this.state = te)
                    }, n.resetLoadingState = function() { this.clearWaitingFragment(), t.prototype.resetLoadingState.call(this) }, n.onTickEnd = function() {
                        var t = this.media;
                        t && t.readyState && (this.lastCurrentTime = t.currentTime)
                    }, n.doTickIdle = function() {
                        var t = this.hls,
                            e = this.levels,
                            r = this.media,
                            i = this.trackId,
                            n = t.config;
                        if (e && e[i] && (r || !this.startFragRequested && n.startFragPrefetch)) {
                            var a = e[i].details;
                            if (!a || a.live && this.levelLastLoaded !== i || this.waitForCdnTuneIn(a)) this.state = ne;
                            else {
                                var o = this.mediaBuffer ? this.mediaBuffer : this.media;
                                this.bufferFlushed && o && (this.bufferFlushed = !1, this.afterBufferFlushed(o, v.ElementaryStreamTypes.AUDIO, V.PlaylistLevelType.AUDIO));
                                var l = this.getFwdBufferInfo(o, V.PlaylistLevelType.AUDIO);
                                if (null !== l) {
                                    var u = this.audioSwitch;
                                    if (!u && this._streamEnded(l, a)) return t.trigger(s.Events.BUFFER_EOS, { type: "audio" }), void(this.state = oe);
                                    var d = this.getFwdBufferInfo(this.videoBuffer ? this.videoBuffer : this.media, V.PlaylistLevelType.MAIN);
                                    if (!(l.len >= this.getMaxBufferLength(null == d ? void 0 : d.len)) || u) {
                                        var h = a.fragments[0].start,
                                            c = l.end;
                                        if (u && r) {
                                            var f = this.getLoadPosition();
                                            c = f, a.PTSKnown && f < h && (l.end > h || l.nextStart) && (this.log("Alt audio track ahead of main track, seek to start of alt audio track"), r.currentTime = h + .05)
                                        }
                                        if (!(d && c > d.end + a.targetduration) && (d && d.len || !l.len)) {
                                            var g = this.getNextFragment(c, a);
                                            g ? this.loadFragment(g, a, c) : this.bufferFlushed = !0
                                        }
                                    }
                                }
                            }
                        }
                    }, n.getMaxBufferLength = function(e) { var r = t.prototype.getMaxBufferLength.call(this); return e ? Math.max(r, e) : r }, n.onMediaDetaching = function() { this.videoBuffer = null, t.prototype.onMediaDetaching.call(this) }, n.onAudioTracksUpdated = function(t, e) {
                        var r = e.audioTracks;
                        this.resetTransmuxer(), this.levels = r.map((function(t) { return new ut(t) }))
                    }, n.onAudioTrackSwitching = function(t, e) {
                        var r = !!e.url;
                        this.trackId = e.id;
                        var i = this.fragCurrent;
                        i && i.abortRequests(), this.fragCurrent = null, this.clearWaitingFragment(), r ? this.setInterval(100) : this.resetTransmuxer(), r ? (this.audioSwitch = !0, this.state = te) : this.state = Zt, this.tick()
                    }, n.onManifestLoading = function() { this.mainDetails = null, this.fragmentTracker.removeAllFragments(), this.startPosition = this.lastCurrentTime = 0, this.bufferFlushed = !1 }, n.onLevelLoaded = function(t, e) { this.mainDetails = e.details, null !== this.cachedTrackLoadedData && (this.hls.trigger(s.Events.AUDIO_TRACK_LOADED, this.cachedTrackLoadedData), this.cachedTrackLoadedData = null) }, n.onAudioTrackLoaded = function(t, e) {
                        var r;
                        if (null != this.mainDetails) {
                            var i = this.levels,
                                n = e.details,
                                a = e.id;
                            if (i) {
                                this.log("Track " + a + " loaded [" + n.startSN + "," + n.endSN + "],duration:" + n.totalduration);
                                var s = i[a],
                                    o = 0;
                                if (n.live || null !== (r = s.details) && void 0 !== r && r.live) { var l = this.mainDetails; if (n.fragments[0] || (n.deltaUpdateFailed = !0), n.deltaUpdateFailed || !l) return;!s.details && n.hasProgramDateTime && l.hasProgramDateTime ? (Vt(n, l), o = n.fragments[0].start) : o = this.alignPlaylists(n, s.details) }
                                s.details = n, this.levelLastLoaded = a, this.startFragRequested || !this.mainDetails && n.live || this.setStartPosition(s.details, o), this.state !== ne || this.waitForCdnTuneIn(n) || (this.state = te), this.tick()
                            } else this.warn("Audio tracks were reset while loading level " + a)
                        } else this.cachedTrackLoadedData = e
                    }, n._handleFragmentLoadProgress = function(t) {
                        var e, r = t.frag,
                            i = t.part,
                            n = t.payload,
                            a = this.config,
                            s = this.trackId,
                            o = this.levels;
                        if (o) {
                            var l = o[s],
                                u = l.details,
                                d = a.defaultAudioCodec || l.audioCodec || "mp4a.40.2",
                                h = this.transmuxer;
                            h || (h = this.transmuxer = new Ae(this.hls, V.PlaylistLevelType.AUDIO, this._handleTransmuxComplete.bind(this), this._handleTransmuxerFlush.bind(this)));
                            var c = this.initPTS[r.cc],
                                f = null === (e = r.initSegment) || void 0 === e ? void 0 : e.data;
                            if (void 0 !== c) {
                                var g = i ? i.index : -1,
                                    v = -1 !== g,
                                    p = new Gt(r.level, r.sn, r.stats.chunkCount, n.byteLength, g, v);
                                h.push(n, f, d, "", r, i, u.totalduration, !1, p, c)
                            } else this.log("Unknown video PTS for cc " + r.cc + ", waiting for video PTS before demuxing audio frag " + r.sn + " of [" + u.startSN + " ," + u.endSN + "],track " + s), (this.waitingData = this.waitingData || { frag: r, part: i, cache: new Oe, complete: !1 }).cache.push(new Uint8Array(n)), this.waitingVideoCC = this.videoTrackCC, this.state = ue
                        } else this.warn("Audio tracks were reset while fragment load was in progress. Fragment " + r.sn + " of level " + r.level + " will not be buffered")
                    }, n._handleFragmentLoadComplete = function(e) { this.waitingData ? this.waitingData.complete = !0 : t.prototype._handleFragmentLoadComplete.call(this, e) }, n.onBufferReset = function() { this.mediaBuffer = this.videoBuffer = null, this.loadedmetadata = !1 }, n.onBufferCreated = function(t, e) {
                        var r = e.tracks.audio;
                        r && (this.mediaBuffer = r.buffer || null), e.tracks.video && (this.videoBuffer = e.tracks.video.buffer || null)
                    }, n.onFragBuffered = function(t, e) {
                        var r, i = e.frag,
                            n = e.part;
                        i.type === V.PlaylistLevelType.AUDIO ? this.fragContextChanged(i) ? this.warn("Fragment " + i.sn + (n ? " p: " + n.index : "") + " of level " + i.level + " finished buffering, but was aborted. state: " + this.state + ", audioSwitch: " + this.audioSwitch) : ("initSegment" !== i.sn && (this.fragPrevious = i, this.audioSwitch && (this.audioSwitch = !1, this.hls.trigger(s.Events.AUDIO_TRACK_SWITCHED, { id: this.trackId }))), this.fragBufferedComplete(i, n)) : this.loadedmetadata || i.type !== V.PlaylistLevelType.MAIN || null !== (r = this.videoBuffer || this.media) && void 0 !== r && r.buffered.length && (this.loadedmetadata = !0)
                    }, n.onError = function(e, r) {
                        if (r.type !== o.ErrorTypes.KEY_SYSTEM_ERROR) switch (r.details) {
                            case o.ErrorDetails.FRAG_LOAD_ERROR:
                            case o.ErrorDetails.FRAG_LOAD_TIMEOUT:
                            case o.ErrorDetails.FRAG_PARSING_ERROR:
                            case o.ErrorDetails.KEY_LOAD_ERROR:
                            case o.ErrorDetails.KEY_LOAD_TIMEOUT:
                                this.onFragmentOrKeyLoadError(V.PlaylistLevelType.AUDIO, r);
                                break;
                            case o.ErrorDetails.AUDIO_TRACK_LOAD_ERROR:
                            case o.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT:
                                this.state !== le && this.state !== Zt && (this.state = r.fatal ? le : te, this.warn(r.details + " while loading frag, switching to " + this.state + " state"));
                                break;
                            case o.ErrorDetails.BUFFER_FULL_ERROR:
                                if ("audio" === r.parent && (this.state === ae || this.state === se)) {
                                    var i = !0,
                                        n = this.getFwdBufferInfo(this.mediaBuffer, V.PlaylistLevelType.AUDIO);
                                    n && n.len > .5 && (i = !this.reduceMaxBufferLength(n.len)), i && (this.warn("Buffer full error also media.currentTime is not buffered, flush audio buffer"), this.fragCurrent = null, t.prototype.flushMainBuffer.call(this, 0, Number.POSITIVE_INFINITY, "audio")), this.resetLoadingState()
                                }
                        } else this.onFragmentOrKeyLoadError(V.PlaylistLevelType.AUDIO, r)
                    }, n.onBufferFlushed = function(t, e) { e.type === v.ElementaryStreamTypes.AUDIO && (this.bufferFlushed = !0, this.state === oe && (this.state = te)) }, n._handleTransmuxComplete = function(t) {
                        var e, r = "audio",
                            i = this.hls,
                            n = t.remuxResult,
                            a = t.chunkMeta,
                            o = this.getCurrentContext(a);
                        if (!o) return this.warn("The loading context changed while buffering fragment " + a.sn + " of level " + a.level + ". This chunk will not be buffered."), void this.resetStartWhenNotLoaded(a.level);
                        var l = o.frag,
                            u = o.part,
                            d = o.level.details,
                            h = n.audio,
                            c = n.text,
                            f = n.id3,
                            g = n.initSegment;
                        if (!this.fragContextChanged(l) && d) {
                            if (this.state = ae, this.audioSwitch && h && this.completeAudioSwitch(), null != g && g.tracks && (this._bufferInitSegment(g.tracks, l, a), i.trigger(s.Events.FRAG_PARSING_INIT_SEGMENT, { frag: l, id: r, tracks: g.tracks })), h) {
                                var p = h.startPTS,
                                    m = h.endPTS,
                                    y = h.startDTS,
                                    E = h.endDTS;
                                u && (u.elementaryStreams[v.ElementaryStreamTypes.AUDIO] = { startPTS: p, endPTS: m, startDTS: y, endDTS: E }), l.setElementaryStreamInfo(v.ElementaryStreamTypes.AUDIO, p, m, y, E), this.bufferFragmentData(h, l, u, a)
                            }
                            if (null != f && null !== (e = f.samples) && void 0 !== e && e.length) {
                                var T = xe({ id: r, frag: l, details: d }, f);
                                i.trigger(s.Events.FRAG_PARSING_METADATA, T)
                            }
                            if (c) {
                                var S = xe({ id: r, frag: l, details: d }, c);
                                i.trigger(s.Events.FRAG_PARSING_USERDATA, S)
                            }
                        }
                    }, n._bufferInitSegment = function(t, e, r) {
                        if (this.state === ae) {
                            t.video && delete t.video;
                            var i = t.audio;
                            if (i) {
                                i.levelCodec = i.codec, i.id = "audio", this.log("Init audio buffer, container:" + i.container + ", codecs[parsed]=[" + i.codec + "]"), this.hls.trigger(s.Events.BUFFER_CODECS, t);
                                var n = i.initSegment;
                                if (null != n && n.byteLength) {
                                    var a = { type: "audio", frag: e, part: null, chunkMeta: r, parent: e.type, data: n };
                                    this.hls.trigger(s.Events.BUFFER_APPENDING, a)
                                }
                                this.tick()
                            }
                        }
                    }, n.loadFragment = function(e, r, i) {
                        var n = this.fragmentTracker.getState(e);
                        this.fragCurrent = e, (this.audioSwitch || n === St.NOT_LOADED || n === St.PARTIAL) && ("initSegment" === e.sn ? this._loadInitSegment(e, r) : r.live && !(0, a.isFiniteNumber)(this.initPTS[e.cc]) ? (this.log("Waiting for video PTS in continuity counter " + e.cc + " of live stream before loading audio fragment " + e.sn + " of level " + this.trackId), this.state = ue) : (this.startFragRequested = !0, t.prototype.loadFragment.call(this, e, r, i)))
                    }, n.completeAudioSwitch = function() {
                        var e = this.hls,
                            r = this.media,
                            i = this.trackId;
                        r && (this.log("Switching audio track : flushing all audio"), t.prototype.flushMainBuffer.call(this, 0, Number.POSITIVE_INFINITY, "audio")), this.audioSwitch = !1, e.trigger(s.Events.AUDIO_TRACK_SWITCHED, { id: i })
                    }, i
                }(he);
                const Ne = Me;

                function Ue(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var i = e[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, (void 0, "symbol" == typeof(n = function(t, e) { if ("object" != typeof t || null === t) return t; var r = t[Symbol.toPrimitive]; if (void 0 !== r) { var i = r.call(t, e); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value.") } return String(t) }(i.key, "string")) ? n : String(n)), i)
                    }
                    var n
                }

                function Be(t, e) { return Be = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) { return t.__proto__ = e, t }, Be(t, e) }
                const Ge = function(t) {
                    var e, r;

                    function i(e) { var r; return (r = t.call(this, e, "[audio-track-controller]") || this).tracks = [], r.groupId = null, r.tracksInGroup = [], r.trackId = -1, r.trackName = "", r.selectDefaultTrack = !0, r.registerListeners(), r }
                    r = t, (e = i).prototype = Object.create(r.prototype), e.prototype.constructor = e, Be(e, r);
                    var n, a, l = i.prototype;
                    return l.registerListeners = function() {
                        var t = this.hls;
                        t.on(s.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.on(s.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.on(s.Events.LEVEL_LOADING, this.onLevelLoading, this), t.on(s.Events.LEVEL_SWITCHING, this.onLevelSwitching, this), t.on(s.Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), t.on(s.Events.ERROR, this.onError, this)
                    }, l.unregisterListeners = function() {
                        var t = this.hls;
                        t.off(s.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.off(s.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.off(s.Events.LEVEL_LOADING, this.onLevelLoading, this), t.off(s.Events.LEVEL_SWITCHING, this.onLevelSwitching, this), t.off(s.Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), t.off(s.Events.ERROR, this.onError, this)
                    }, l.destroy = function() { this.unregisterListeners(), this.tracks.length = 0, this.tracksInGroup.length = 0, t.prototype.destroy.call(this) }, l.onManifestLoading = function() { this.tracks = [], this.groupId = null, this.tracksInGroup = [], this.trackId = -1, this.trackName = "", this.selectDefaultTrack = !0 }, l.onManifestParsed = function(t, e) { this.tracks = e.audioTracks || [] }, l.onAudioTrackLoaded = function(t, e) {
                        var r = e.id,
                            i = e.details,
                            n = this.tracksInGroup[r];
                        if (n) {
                            var a = n.details;
                            n.details = e.details, this.log("audioTrack " + r + " loaded [" + i.startSN + "-" + i.endSN + "]"), r === this.trackId && (this.retryCount = 0, this.playlistLoaded(r, e, a))
                        } else this.warn("Invalid audio track id " + r)
                    }, l.onLevelLoading = function(t, e) { this.switchLevel(e.level) }, l.onLevelSwitching = function(t, e) { this.switchLevel(e.level) }, l.switchLevel = function(t) {
                        var e = this.hls.levels[t];
                        if (null != e && e.audioGroupIds) {
                            var r = e.audioGroupIds[e.urlId];
                            if (this.groupId !== r) {
                                this.groupId = r;
                                var i = this.tracks.filter((function(t) { return !r || t.groupId === r }));
                                this.selectDefaultTrack && !i.some((function(t) { return t.default })) && (this.selectDefaultTrack = !1), this.tracksInGroup = i;
                                var n = { audioTracks: i };
                                this.log("Updating audio tracks, " + i.length + ' track(s) found in "' + r + '" group-id'), this.hls.trigger(s.Events.AUDIO_TRACKS_UPDATED, n), this.selectInitialTrack()
                            }
                        }
                    }, l.onError = function(e, r) { t.prototype.onError.call(this, e, r), !r.fatal && r.context && r.context.type === V.PlaylistContextType.AUDIO_TRACK && r.context.id === this.trackId && r.context.groupId === this.groupId && this.retryLoadingOrFail(r) }, l.setAudioTrack = function(t) {
                        var e = this.tracksInGroup;
                        if (t < 0 || t >= e.length) this.warn("Invalid id passed to audio-track controller");
                        else {
                            this.clearTimer();
                            var r = e[this.trackId];
                            this.log("Now switching to audio-track index " + t);
                            var i = e[t],
                                n = i.id,
                                a = i.groupId,
                                o = void 0 === a ? "" : a,
                                l = i.name,
                                u = i.type,
                                d = i.url;
                            if (this.trackId = t, this.trackName = l, this.selectDefaultTrack = !1, this.hls.trigger(s.Events.AUDIO_TRACK_SWITCHING, { id: n, groupId: o, name: l, type: u, url: d }), !i.details || i.details.live) {
                                var h = this.switchParams(i.url, null == r ? void 0 : r.details);
                                this.loadPlaylist(h)
                            }
                        }
                    }, l.selectInitialTrack = function() {
                        this.tracksInGroup;
                        var t = this.trackName,
                            e = this.findTrackId(t) || this.findTrackId(); - 1 !== e ? this.setAudioTrack(e) : (this.warn("No track found for running audio group-ID: " + this.groupId), this.hls.trigger(s.Events.ERROR, { type: o.ErrorTypes.MEDIA_ERROR, details: o.ErrorDetails.AUDIO_TRACK_LOAD_ERROR, fatal: !0 }))
                    }, l.findTrackId = function(t) { for (var e = this.tracksInGroup, r = 0; r < e.length; r++) { var i = e[r]; if ((!this.selectDefaultTrack || i.default) && (!t || t === i.name)) return i.id } return -1 }, l.loadPlaylist = function(e) {
                        t.prototype.loadPlaylist.call(this);
                        var r = this.tracksInGroup[this.trackId];
                        if (this.shouldLoadTrack(r)) {
                            var i = r.id,
                                n = r.groupId,
                                a = r.url;
                            if (e) try { a = e.addDirectives(a) } catch (t) { this.warn("Could not construct new URL with HLS Delivery Directives: " + t) }
                            this.log("loading audio-track playlist for id: " + i), this.clearTimer(), this.hls.trigger(s.Events.AUDIO_TRACK_LOADING, { url: a, id: i, groupId: n, deliveryDirectives: e || null })
                        }
                    }, n = i, (a = [{ key: "audioTracks", get: function() { return this.tracksInGroup } }, { key: "audioTrack", get: function() { return this.trackId }, set: function(t) { this.selectDefaultTrack = !1, this.setAudioTrack(t) } }]) && Ue(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), i
                }(mt);

                function Ke(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var i = e[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, (void 0, "symbol" == typeof(n = function(t, e) { if ("object" != typeof t || null === t) return t; var r = t[Symbol.toPrimitive]; if (void 0 !== r) { var i = r.call(t, e); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value.") } return String(t) }(i.key, "string")) ? n : String(n)), i)
                    }
                    var n
                }

                function He(t, e) { return He = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) { return t.__proto__ = e, t }, He(t, e) }
                var je = function(t) {
                        var e, r;

                        function i(e, r, i) { var n; return (n = t.call(this, e, r, i, "[subtitle-stream-controller]") || this).levels = [], n.currentTrackId = -1, n.tracksBuffered = [], n.mainDetails = null, n._registerListeners(), n }
                        r = t, (e = i).prototype = Object.create(r.prototype), e.prototype.constructor = e, He(e, r);
                        var n, a, o = i.prototype;
                        return o.onHandlerDestroying = function() { this._unregisterListeners(), this.mainDetails = null }, o._registerListeners = function() {
                            var t = this.hls;
                            t.on(s.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.on(s.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(s.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.on(s.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.on(s.Events.ERROR, this.onError, this), t.on(s.Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), t.on(s.Events.SUBTITLE_TRACK_SWITCH, this.onSubtitleTrackSwitch, this), t.on(s.Events.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), t.on(s.Events.SUBTITLE_FRAG_PROCESSED, this.onSubtitleFragProcessed, this), t.on(s.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), t.on(s.Events.FRAG_BUFFERED, this.onFragBuffered, this)
                        }, o._unregisterListeners = function() {
                            var t = this.hls;
                            t.off(s.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.off(s.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(s.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.off(s.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.off(s.Events.ERROR, this.onError, this), t.off(s.Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), t.off(s.Events.SUBTITLE_TRACK_SWITCH, this.onSubtitleTrackSwitch, this), t.off(s.Events.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), t.off(s.Events.SUBTITLE_FRAG_PROCESSED, this.onSubtitleFragProcessed, this), t.off(s.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), t.off(s.Events.FRAG_BUFFERED, this.onFragBuffered, this)
                        }, o.startLoad = function(t) { this.stopLoad(), this.state = te, this.setInterval(500), this.nextLoadPosition = this.startPosition = this.lastCurrentTime = t, this.tick() }, o.onManifestLoading = function() { this.mainDetails = null, this.fragmentTracker.removeAllFragments() }, o.onLevelLoaded = function(t, e) { this.mainDetails = e.details }, o.onSubtitleFragProcessed = function(t, e) {
                            var r = e.frag,
                                i = e.success;
                            if (this.fragPrevious = r, this.state = te, i) {
                                var n = this.tracksBuffered[this.currentTrackId];
                                if (n) {
                                    for (var a, s = r.start, o = 0; o < n.length; o++)
                                        if (s >= n[o].start && s <= n[o].end) { a = n[o]; break }
                                    var l = r.start + r.duration;
                                    a ? a.end = l : (a = { start: s, end: l }, n.push(a)), this.fragmentTracker.fragBuffered(r)
                                }
                            }
                        }, o.onBufferFlushing = function(t, e) {
                            var r = e.startOffset,
                                i = e.endOffset;
                            if (0 === r && i !== Number.POSITIVE_INFINITY) {
                                var n = this.currentTrackId,
                                    a = this.levels;
                                if (!a.length || !a[n] || !a[n].details) return;
                                var s = i - a[n].details.targetduration;
                                if (s <= 0) return;
                                e.endOffsetSubtitles = Math.max(0, s), this.tracksBuffered.forEach((function(t) {
                                    for (var e = 0; e < t.length;)
                                        if (t[e].end <= s) t.shift();
                                        else {
                                            if (!(t[e].start < s)) break;
                                            t[e].start = s, e++
                                        }
                                })), this.fragmentTracker.removeFragmentsInRange(r, s, V.PlaylistLevelType.SUBTITLE)
                            }
                        }, o.onFragBuffered = function(t, e) {
                            var r;
                            this.loadedmetadata || e.frag.type !== V.PlaylistLevelType.MAIN || null !== (r = this.media) && void 0 !== r && r.buffered.length && (this.loadedmetadata = !0)
                        }, o.onError = function(t, e) {
                            var r = e.frag;
                            r && r.type === V.PlaylistLevelType.SUBTITLE && (this.fragCurrent && this.fragCurrent.abortRequests(), this.state = te)
                        }, o.onSubtitleTracksUpdated = function(t, e) {
                            var r = this,
                                i = e.subtitleTracks;
                            this.tracksBuffered = [], this.levels = i.map((function(t) { return new ut(t) })), this.fragmentTracker.removeAllFragments(), this.fragPrevious = null, this.levels.forEach((function(t) { r.tracksBuffered[t.id] = [] })), this.mediaBuffer = null
                        }, o.onSubtitleTrackSwitch = function(t, e) {
                            if (this.currentTrackId = e.id, this.levels.length && -1 !== this.currentTrackId) {
                                var r = this.levels[this.currentTrackId];
                                null != r && r.details ? this.mediaBuffer = this.mediaBufferTimeRanges : this.mediaBuffer = null, r && this.setInterval(500)
                            } else this.clearInterval()
                        }, o.onSubtitleTrackLoaded = function(t, e) {
                            var r, i = e.details,
                                n = e.id,
                                a = this.currentTrackId,
                                s = this.levels;
                            if (s.length) {
                                var o = s[a];
                                if (!(n >= s.length || n !== a) && o) {
                                    this.mediaBuffer = this.mediaBufferTimeRanges;
                                    var l = 0;
                                    if (i.live || null !== (r = o.details) && void 0 !== r && r.live) {
                                        var u = this.mainDetails;
                                        if (i.deltaUpdateFailed || !u) return;
                                        var d = u.fragments[0];
                                        o.details ? 0 === (l = this.alignPlaylists(i, o.details)) && d && pt(i, l = d.start) : i.hasProgramDateTime && u.hasProgramDateTime ? (Vt(i, u), l = i.fragments[0].start) : d && pt(i, l = d.start)
                                    }
                                    o.details = i, this.levelLastLoaded = n, this.startFragRequested || !this.mainDetails && i.live || this.setStartPosition(o.details, l), this.tick(), i.live && !this.fragCurrent && this.media && this.state === te && (Wt(null, i.fragments, this.media.currentTime, 0) || (this.warn("Subtitle playlist not aligned with playback"), o.details = void 0))
                                }
                            }
                        }, o._handleFragmentLoadComplete = function(t) {
                            var e = this,
                                r = t.frag,
                                i = t.payload,
                                n = r.decryptdata,
                                a = this.hls;
                            if (!this.fragContextChanged(r) && i && i.byteLength > 0 && n && n.key && n.iv && "AES-128" === n.method) {
                                var o = performance.now();
                                this.decrypter.decrypt(new Uint8Array(i), n.key.buffer, n.iv.buffer).then((function(t) {
                                    var e = performance.now();
                                    a.trigger(s.Events.FRAG_DECRYPTED, { frag: r, payload: t, stats: { tstart: o, tdecrypt: e } })
                                })).catch((function(t) { e.warn(t.name + ": " + t.message), e.state = te }))
                            }
                        }, o.doTick = function() {
                            if (this.media) {
                                if (this.state === te) {
                                    var t = this.currentTrackId,
                                        e = this.levels;
                                    if (!e.length || !e[t] || !e[t].details) return;
                                    var r = e[t].details,
                                        i = r.targetduration,
                                        n = this.config,
                                        a = this.getLoadPosition(),
                                        s = Bt.bufferedInfo(this.tracksBuffered[this.currentTrackId] || [], a - i, n.maxBufferHole),
                                        o = s.end,
                                        l = s.len,
                                        u = this.getFwdBufferInfo(this.media, V.PlaylistLevelType.MAIN);
                                    if (l > this.getMaxBufferLength(null == u ? void 0 : u.len) + i) return;
                                    var d = r.fragments,
                                        h = d.length,
                                        c = r.edge,
                                        f = null,
                                        g = this.fragPrevious;
                                    if (o < c) { var v = n.maxFragLookUpTolerance;!(f = Wt(g, d, Math.max(d[0].start, o), v)) && g && g.start < d[0].start && (f = d[0]) } else f = d[h - 1];
                                    if (!f) return;
                                    f = this.mapToInitFragWhenRequired(f), this.fragmentTracker.getState(f) === St.NOT_LOADED && this.loadFragment(f, r, o)
                                }
                            } else this.state = te
                        }, o.getMaxBufferLength = function(e) { var r = t.prototype.getMaxBufferLength.call(this); return e ? Math.max(r, e) : r }, o.loadFragment = function(e, r, i) { this.fragCurrent = e, "initSegment" === e.sn ? this._loadInitSegment(e, r) : (this.startFragRequested = !0, t.prototype.loadFragment.call(this, e, r, i)) }, n = i, (a = [{ key: "mediaBufferTimeRanges", get: function() { return new Ve(this.tracksBuffered[this.currentTrackId] || []) } }]) && Ke(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), i
                    }(he),
                    Ve = function(t) {
                        this.buffered = void 0;
                        var e = function(e, r, i) { if ((r >>>= 0) > i - 1) throw new DOMException("Failed to execute '" + e + "' on 'TimeRanges': The index provided (" + r + ") is greater than the maximum bound (" + i + ")"); return t[r][e] };
                        this.buffered = {get length() { return t.length }, end: function(r) { return e("end", r, t.length) }, start: function(r) { return e("start", r, t.length) } }
                    };

                function Ye(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var i = e[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, (void 0, "symbol" == typeof(n = function(t, e) { if ("object" != typeof t || null === t) return t; var r = t[Symbol.toPrimitive]; if (void 0 !== r) { var i = r.call(t, e); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value.") } return String(t) }(i.key, "string")) ? n : String(n)), i)
                    }
                    var n
                }

                function We(t, e) { return We = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) { return t.__proto__ = e, t }, We(t, e) }

                function qe(t) { for (var e = [], r = 0; r < t.length; r++) { var i = t[r]; "subtitles" !== i.kind && "captions" !== i.kind || !i.label || e.push(t[r]) } return e }
                const Xe = function(t) {
                    var e, r;

                    function i(e) { var r; return (r = t.call(this, e, "[subtitle-track-controller]") || this).media = null, r.tracks = [], r.groupId = null, r.tracksInGroup = [], r.trackId = -1, r.selectDefaultTrack = !0, r.queuedDefaultTrack = -1, r.trackChangeListener = function() { return r.onTextTracksChanged() }, r.asyncPollTrackChange = function() { return r.pollTrackChange(0) }, r.useTextTrackPolling = !1, r.subtitlePollingInterval = -1, r._subtitleDisplay = !0, r.registerListeners(), r }
                    r = t, (e = i).prototype = Object.create(r.prototype), e.prototype.constructor = e, We(e, r);
                    var n, a, o = i.prototype;
                    return o.destroy = function() { this.unregisterListeners(), this.tracks.length = 0, this.tracksInGroup.length = 0, this.trackChangeListener = this.asyncPollTrackChange = null, t.prototype.destroy.call(this) }, o.registerListeners = function() {
                        var t = this.hls;
                        t.on(s.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.on(s.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(s.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.on(s.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.on(s.Events.LEVEL_LOADING, this.onLevelLoading, this), t.on(s.Events.LEVEL_SWITCHING, this.onLevelSwitching, this), t.on(s.Events.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), t.on(s.Events.ERROR, this.onError, this)
                    }, o.unregisterListeners = function() {
                        var t = this.hls;
                        t.off(s.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.off(s.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(s.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.off(s.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.off(s.Events.LEVEL_LOADING, this.onLevelLoading, this), t.off(s.Events.LEVEL_SWITCHING, this.onLevelSwitching, this), t.off(s.Events.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), t.off(s.Events.ERROR, this.onError, this)
                    }, o.onMediaAttached = function(t, e) { this.media = e.media, this.media && (this.queuedDefaultTrack > -1 && (this.subtitleTrack = this.queuedDefaultTrack, this.queuedDefaultTrack = -1), this.useTextTrackPolling = !(this.media.textTracks && "onchange" in this.media.textTracks), this.useTextTrackPolling ? this.pollTrackChange(500) : this.media.textTracks.addEventListener("change", this.asyncPollTrackChange)) }, o.pollTrackChange = function(t) { self.clearInterval(this.subtitlePollingInterval), this.subtitlePollingInterval = self.setInterval(this.trackChangeListener, t) }, o.onMediaDetaching = function() { this.media && (self.clearInterval(this.subtitlePollingInterval), this.useTextTrackPolling || this.media.textTracks.removeEventListener("change", this.asyncPollTrackChange), this.trackId > -1 && (this.queuedDefaultTrack = this.trackId), qe(this.media.textTracks).forEach((function(t) { z(t) })), this.subtitleTrack = -1, this.media = null) }, o.onManifestLoading = function() { this.tracks = [], this.groupId = null, this.tracksInGroup = [], this.trackId = -1, this.selectDefaultTrack = !0 }, o.onManifestParsed = function(t, e) { this.tracks = e.subtitleTracks }, o.onSubtitleTrackLoaded = function(t, e) {
                        var r = e.id,
                            i = e.details,
                            n = this.trackId,
                            a = this.tracksInGroup[n];
                        if (a) {
                            var s = a.details;
                            a.details = e.details, this.log("subtitle track " + r + " loaded [" + i.startSN + "-" + i.endSN + "]"), r === this.trackId && (this.retryCount = 0, this.playlistLoaded(r, e, s))
                        } else this.warn("Invalid subtitle track id " + r)
                    }, o.onLevelLoading = function(t, e) { this.switchLevel(e.level) }, o.onLevelSwitching = function(t, e) { this.switchLevel(e.level) }, o.switchLevel = function(t) {
                        var e = this.hls.levels[t];
                        if (null != e && e.textGroupIds) {
                            var r = e.textGroupIds[e.urlId];
                            if (this.groupId !== r) {
                                var i = this.tracksInGroup ? this.tracksInGroup[this.trackId] : void 0,
                                    n = this.tracks.filter((function(t) { return !r || t.groupId === r }));
                                this.tracksInGroup = n;
                                var a = this.findTrackId(null == i ? void 0 : i.name) || this.findTrackId();
                                this.groupId = r;
                                var o = { subtitleTracks: n };
                                this.log("Updating subtitle tracks, " + n.length + ' track(s) found in "' + r + '" group-id'), this.hls.trigger(s.Events.SUBTITLE_TRACKS_UPDATED, o), -1 !== a && this.setSubtitleTrack(a, i)
                            }
                        }
                    }, o.findTrackId = function(t) { for (var e = this.tracksInGroup, r = 0; r < e.length; r++) { var i = e[r]; if ((!this.selectDefaultTrack || i.default) && (!t || t === i.name)) return i.id } return -1 }, o.onError = function(e, r) { t.prototype.onError.call(this, e, r), !r.fatal && r.context && r.context.type === V.PlaylistContextType.SUBTITLE_TRACK && r.context.id === this.trackId && r.context.groupId === this.groupId && this.retryLoadingOrFail(r) }, o.loadPlaylist = function(e) {
                        t.prototype.loadPlaylist.call(this);
                        var r = this.tracksInGroup[this.trackId];
                        if (this.shouldLoadTrack(r)) {
                            var i = r.id,
                                n = r.groupId,
                                a = r.url;
                            if (e) try { a = e.addDirectives(a) } catch (t) { this.warn("Could not construct new URL with HLS Delivery Directives: " + t) }
                            this.log("Loading subtitle playlist for id " + i), this.hls.trigger(s.Events.SUBTITLE_TRACK_LOADING, { url: a, id: i, groupId: n, deliveryDirectives: e || null })
                        }
                    }, o.toggleTrackModes = function(t) {
                        var e = this,
                            r = this.media,
                            i = this.trackId;
                        if (r) {
                            var n = qe(r.textTracks),
                                a = n.filter((function(t) { return t.groupId === e.groupId }));
                            if (-1 === t)[].slice.call(n).forEach((function(t) { t.mode = "disabled" }));
                            else {
                                var s = a[i];
                                s && (s.mode = "disabled")
                            }
                            var o = a[t];
                            o && (o.mode = this.subtitleDisplay ? "showing" : "hidden")
                        }
                    }, o.setSubtitleTrack = function(t, e) {
                        var r, i = this.tracksInGroup;
                        if (this.media) {
                            if (this.trackId !== t && this.toggleTrackModes(t), !(this.trackId === t && (-1 === t || null !== (r = i[t]) && void 0 !== r && r.details) || t < -1 || t >= i.length)) {
                                this.clearTimer();
                                var n = i[t];
                                if (this.log("Switching to subtitle track " + t), this.trackId = t, n) {
                                    var a = n.id,
                                        o = n.groupId,
                                        l = void 0 === o ? "" : o,
                                        u = n.name,
                                        d = n.type,
                                        h = n.url;
                                    this.hls.trigger(s.Events.SUBTITLE_TRACK_SWITCH, { id: a, groupId: l, name: u, type: d, url: h });
                                    var c = this.switchParams(n.url, null == e ? void 0 : e.details);
                                    this.loadPlaylist(c)
                                } else this.hls.trigger(s.Events.SUBTITLE_TRACK_SWITCH, { id: t })
                            }
                        } else this.queuedDefaultTrack = t
                    }, o.onTextTracksChanged = function() {
                        if (this.useTextTrackPolling || self.clearInterval(this.subtitlePollingInterval), this.media && this.hls.config.renderTextTracksNatively) {
                            for (var t = -1, e = qe(this.media.textTracks), r = 0; r < e.length; r++)
                                if ("hidden" === e[r].mode) t = r;
                                else if ("showing" === e[r].mode) { t = r; break }
                            this.subtitleTrack !== t && (this.subtitleTrack = t)
                        }
                    }, n = i, (a = [{ key: "subtitleDisplay", get: function() { return this._subtitleDisplay }, set: function(t) { this._subtitleDisplay = t, this.trackId > -1 && this.toggleTrackModes(this.trackId) } }, { key: "subtitleTracks", get: function() { return this.tracksInGroup } }, {
                        key: "subtitleTrack",
                        get: function() { return this.trackId },
                        set: function(t) {
                            this.selectDefaultTrack = !1;
                            var e = this.tracksInGroup ? this.tracksInGroup[this.trackId] : void 0;
                            this.setSubtitleTrack(t, e)
                        }
                    }]) && Ye(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), i
                }(mt);
                var ze, Qe = function() {
                        function t(t) { this.buffers = void 0, this.queues = { video: [], audio: [], audiovideo: [] }, this.buffers = t }
                        var e = t.prototype;
                        return e.append = function(t, e) {
                            var r = this.queues[e];
                            r.push(t), 1 === r.length && this.buffers[e] && this.executeNext(e)
                        }, e.insertAbort = function(t, e) { this.queues[e].unshift(t), this.executeNext(e) }, e.appendBlocker = function(t) {
                            var e, r = new Promise((function(t) { e = t })),
                                i = { execute: e, onStart: function() {}, onComplete: function() {}, onError: function() {} };
                            return this.append(i, t), r
                        }, e.executeNext = function(t) {
                            var e = this.buffers,
                                r = this.queues,
                                i = e[t],
                                n = r[t];
                            if (n.length) { var a = n[0]; try { a.execute() } catch (e) { l.logger.warn("[buffer-operation-queue]: Unhandled exception executing the current operation"), a.onError(e), i && i.updating || (n.shift(), this.executeNext(t)) } }
                        }, e.shiftAndExecuteNext = function(t) { this.queues[t].shift(), this.executeNext(t) }, e.current = function(t) { return this.queues[t][0] }, t
                    }(),
                    $e = ce(),
                    Je = /([ha]vc.)(?:\.[^.,]+)+/,
                    Ze = function() {
                        function t(t) {
                            var e = this;
                            this.details = null, this._objectUrl = null, this.operationQueue = void 0, this.listeners = void 0, this.hls = void 0, this.bufferCodecEventsExpected = 0, this._bufferCodecEventsTotal = 0, this.media = null, this.mediaSource = null, this.lastMpegAudioChunk = null, this.appendError = 0, this.tracks = {}, this.pendingTracks = {}, this.sourceBuffer = void 0, this._onMediaSourceOpen = function() {
                                var t = e.media,
                                    r = e.mediaSource;
                                l.logger.log("[buffer-controller]: Media source opened"), t && (t.removeEventListener("emptied", e._onMediaEmptied), e.updateMediaElementDuration(), e.hls.trigger(s.Events.MEDIA_ATTACHED, { media: t })), r && r.removeEventListener("sourceopen", e._onMediaSourceOpen), e.checkPendingTracks()
                            }, this._onMediaSourceClose = function() { l.logger.log("[buffer-controller]: Media source closed") }, this._onMediaSourceEnded = function() { l.logger.log("[buffer-controller]: Media source ended") }, this._onMediaEmptied = function() {
                                var t = e.media,
                                    r = e._objectUrl;
                                t && t.src !== r && l.logger.error("Media element src was set while attaching MediaSource (" + r + " > " + t.src + ")")
                            }, this.hls = t, this._initSourceBuffer(), this.registerListeners()
                        }
                        var e = t.prototype;
                        return e.hasSourceTypes = function() { return this.getSourceBufferTypes().length > 0 || Object.keys(this.pendingTracks).length > 0 }, e.destroy = function() { this.unregisterListeners(), this.details = null, this.lastMpegAudioChunk = null }, e.registerListeners = function() {
                            var t = this.hls;
                            t.on(s.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), t.on(s.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(s.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.on(s.Events.BUFFER_RESET, this.onBufferReset, this), t.on(s.Events.BUFFER_APPENDING, this.onBufferAppending, this), t.on(s.Events.BUFFER_CODECS, this.onBufferCodecs, this), t.on(s.Events.BUFFER_EOS, this.onBufferEos, this), t.on(s.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), t.on(s.Events.LEVEL_UPDATED, this.onLevelUpdated, this), t.on(s.Events.FRAG_PARSED, this.onFragParsed, this), t.on(s.Events.FRAG_CHANGED, this.onFragChanged, this)
                        }, e.unregisterListeners = function() {
                            var t = this.hls;
                            t.off(s.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), t.off(s.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(s.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.off(s.Events.BUFFER_RESET, this.onBufferReset, this), t.off(s.Events.BUFFER_APPENDING, this.onBufferAppending, this), t.off(s.Events.BUFFER_CODECS, this.onBufferCodecs, this), t.off(s.Events.BUFFER_EOS, this.onBufferEos, this), t.off(s.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), t.off(s.Events.LEVEL_UPDATED, this.onLevelUpdated, this), t.off(s.Events.FRAG_PARSED, this.onFragParsed, this), t.off(s.Events.FRAG_CHANGED, this.onFragChanged, this)
                        }, e._initSourceBuffer = function() { this.sourceBuffer = {}, this.operationQueue = new Qe(this.sourceBuffer), this.listeners = { audio: [], video: [], audiovideo: [] }, this.lastMpegAudioChunk = null }, e.onManifestParsed = function(t, e) {
                            var r = 2;
                            (e.audio && !e.video || !e.altAudio) && (r = 1), this.bufferCodecEventsExpected = this._bufferCodecEventsTotal = r, this.details = null, l.logger.log(this.bufferCodecEventsExpected + " bufferCodec event(s) expected")
                        }, e.onMediaAttaching = function(t, e) {
                            var r = this.media = e.media;
                            if (r && $e) {
                                var i = this.mediaSource = new $e;
                                i.addEventListener("sourceopen", this._onMediaSourceOpen), i.addEventListener("sourceended", this._onMediaSourceEnded), i.addEventListener("sourceclose", this._onMediaSourceClose), r.src = self.URL.createObjectURL(i), this._objectUrl = r.src, r.addEventListener("emptied", this._onMediaEmptied)
                            }
                        }, e.onMediaDetaching = function() {
                            var t = this.media,
                                e = this.mediaSource,
                                r = this._objectUrl;
                            if (e) {
                                if (l.logger.log("[buffer-controller]: media source detaching"), "open" === e.readyState) try { e.endOfStream() } catch (t) { l.logger.warn("[buffer-controller]: onMediaDetaching: " + t.message + " while calling endOfStream") }
                                this.onBufferReset(), e.removeEventListener("sourceopen", this._onMediaSourceOpen), e.removeEventListener("sourceended", this._onMediaSourceEnded), e.removeEventListener("sourceclose", this._onMediaSourceClose), t && (t.removeEventListener("emptied", this._onMediaEmptied), r && self.URL.revokeObjectURL(r), t.src === r ? (t.removeAttribute("src"), t.load()) : l.logger.warn("[buffer-controller]: media.src was changed by a third party - skip cleanup")), this.mediaSource = null, this.media = null, this._objectUrl = null, this.bufferCodecEventsExpected = this._bufferCodecEventsTotal, this.pendingTracks = {}, this.tracks = {}
                            }
                            this.hls.trigger(s.Events.MEDIA_DETACHED, void 0)
                        }, e.onBufferReset = function() {
                            var t = this;
                            this.getSourceBufferTypes().forEach((function(e) { var r = t.sourceBuffer[e]; try { r && (t.removeBufferListeners(e), t.mediaSource && t.mediaSource.removeSourceBuffer(r), t.sourceBuffer[e] = void 0) } catch (t) { l.logger.warn("[buffer-controller]: Failed to reset the " + e + " buffer", t) } })), this._initSourceBuffer()
                        }, e.onBufferCodecs = function(t, e) {
                            var r = this,
                                i = this.getSourceBufferTypes().length;
                            Object.keys(e).forEach((function(t) {
                                if (i) {
                                    var n = r.tracks[t];
                                    if (n && "function" == typeof n.buffer.changeType) {
                                        var a = e[t],
                                            s = a.id,
                                            o = a.codec,
                                            u = a.levelCodec,
                                            d = a.container,
                                            h = a.metadata,
                                            c = (n.levelCodec || n.codec).replace(Je, "$1"),
                                            f = (u || o).replace(Je, "$1");
                                        if (c !== f) {
                                            var g = d + ";codecs=" + (u || o);
                                            r.appendChangeType(t, g), l.logger.log("[buffer-controller]: switching codec " + c + " to " + f), r.tracks[t] = { buffer: n.buffer, codec: o, container: d, levelCodec: u, metadata: h, id: s }
                                        }
                                    }
                                } else r.pendingTracks[t] = e[t]
                            })), i || (this.bufferCodecEventsExpected = Math.max(this.bufferCodecEventsExpected - 1, 0), this.mediaSource && "open" === this.mediaSource.readyState && this.checkPendingTracks())
                        }, e.appendChangeType = function(t, e) {
                            var r = this,
                                i = this.operationQueue,
                                n = {
                                    execute: function() {
                                        var n = r.sourceBuffer[t];
                                        n && (l.logger.log("[buffer-controller]: changing " + t + " sourceBuffer type to " + e), n.changeType(e)), i.shiftAndExecuteNext(t)
                                    },
                                    onStart: function() {},
                                    onComplete: function() {},
                                    onError: function(e) { l.logger.warn("[buffer-controller]: Failed to change " + t + " SourceBuffer type", e) }
                                };
                            i.append(n, t)
                        }, e.onBufferAppending = function(t, e) {
                            var r = this,
                                i = this.hls,
                                n = this.operationQueue,
                                a = this.tracks,
                                u = e.data,
                                d = e.type,
                                h = e.frag,
                                c = e.part,
                                f = e.chunkMeta,
                                g = f.buffering[d],
                                v = self.performance.now();
                            g.start = v;
                            var p = h.stats.buffering,
                                m = c ? c.stats.buffering : null;
                            0 === p.start && (p.start = v), m && 0 === m.start && (m.start = v);
                            var y = a.audio,
                                E = !1;
                            "audio" === d && "audio/mpeg" === (null == y ? void 0 : y.container) && (E = !this.lastMpegAudioChunk || 1 === f.id || this.lastMpegAudioChunk.sn !== f.sn, this.lastMpegAudioChunk = f);
                            var T = h.start,
                                S = {
                                    execute: function() {
                                        if (g.executeStart = self.performance.now(), E) {
                                            var t = r.sourceBuffer[d];
                                            if (t) {
                                                var e = T - t.timestampOffset;
                                                Math.abs(e) >= .1 && (l.logger.log("[buffer-controller]: Updating audio SourceBuffer timestampOffset to " + T + " (delta: " + e + ") sn: " + h.sn + ")"), t.timestampOffset = T)
                                            }
                                        }
                                        r.appendExecutor(u, d)
                                    },
                                    onStart: function() {},
                                    onComplete: function() {
                                        var t = self.performance.now();
                                        g.executeEnd = g.end = t, 0 === p.first && (p.first = t), m && 0 === m.first && (m.first = t);
                                        var e = r.sourceBuffer,
                                            i = {};
                                        for (var n in e) i[n] = Bt.getBuffered(e[n]);
                                        r.appendError = 0, r.hls.trigger(s.Events.BUFFER_APPENDED, { type: d, frag: h, part: c, chunkMeta: f, parent: h.type, timeRanges: i })
                                    },
                                    onError: function(t) {
                                        l.logger.error("[buffer-controller]: Error encountered while trying to append to the " + d + " SourceBuffer", t);
                                        var e = { type: o.ErrorTypes.MEDIA_ERROR, parent: h.type, details: o.ErrorDetails.BUFFER_APPEND_ERROR, err: t, fatal: !1 };
                                        t.code === DOMException.QUOTA_EXCEEDED_ERR ? e.details = o.ErrorDetails.BUFFER_FULL_ERROR : (r.appendError++, e.details = o.ErrorDetails.BUFFER_APPEND_ERROR, r.appendError > i.config.appendErrorMaxRetry && (l.logger.error("[buffer-controller]: Failed " + i.config.appendErrorMaxRetry + " times to append segment in sourceBuffer"), e.fatal = !0, i.stopLoad())), i.trigger(s.Events.ERROR, e)
                                    }
                                };
                            n.append(S, d)
                        }, e.onBufferFlushing = function(t, e) {
                            var r = this,
                                i = this.operationQueue,
                                n = function(t) { return { execute: r.removeExecutor.bind(r, t, e.startOffset, e.endOffset), onStart: function() {}, onComplete: function() { r.hls.trigger(s.Events.BUFFER_FLUSHED, { type: t }) }, onError: function(e) { l.logger.warn("[buffer-controller]: Failed to remove from " + t + " SourceBuffer", e) } } };
                            e.type ? i.append(n(e.type), e.type) : this.getSourceBufferTypes().forEach((function(t) { i.append(n(t), t) }))
                        }, e.onFragParsed = function(t, e) {
                            var r = this,
                                i = e.frag,
                                n = e.part,
                                a = [],
                                o = n ? n.elementaryStreams : i.elementaryStreams;
                            o[v.ElementaryStreamTypes.AUDIOVIDEO] ? a.push("audiovideo") : (o[v.ElementaryStreamTypes.AUDIO] && a.push("audio"), o[v.ElementaryStreamTypes.VIDEO] && a.push("video")), 0 === a.length && l.logger.warn("Fragments must have at least one ElementaryStreamType set. type: " + i.type + " level: " + i.level + " sn: " + i.sn), this.blockBuffers((function() {
                                var t = self.performance.now();
                                i.stats.buffering.end = t, n && (n.stats.buffering.end = t);
                                var e = n ? n.stats : i.stats;
                                r.hls.trigger(s.Events.FRAG_BUFFERED, { frag: i, part: n, stats: e, id: i.type })
                            }), a)
                        }, e.onFragChanged = function(t, e) { this.flushBackBuffer() }, e.onBufferEos = function(t, e) {
                            var r = this;
                            this.getSourceBufferTypes().reduce((function(t, i) { var n = r.sourceBuffer[i]; return !n || e.type && e.type !== i || (n.ending = !0, n.ended || (n.ended = !0, l.logger.log("[buffer-controller]: " + i + " sourceBuffer now EOS"))), t && !(n && !n.ended) }), !0) && (l.logger.log("[buffer-controller]: Queueing mediaSource.endOfStream()"), this.blockBuffers((function() {
                                r.getSourceBufferTypes().forEach((function(t) {
                                    var e = r.sourceBuffer[t];
                                    e && (e.ending = !1)
                                }));
                                var t = r.mediaSource;
                                t && "open" === t.readyState ? (l.logger.log("[buffer-controller]: Calling mediaSource.endOfStream()"), t.endOfStream()) : t && l.logger.info("[buffer-controller]: Could not call mediaSource.endOfStream(). mediaSource.readyState: " + t.readyState)
                            })))
                        }, e.onLevelUpdated = function(t, e) {
                            var r = e.details;
                            r.fragments.length && (this.details = r, this.getSourceBufferTypes().length ? this.blockBuffers(this.updateMediaElementDuration.bind(this)) : this.updateMediaElementDuration())
                        }, e.flushBackBuffer = function() {
                            var t = this.hls,
                                e = this.details,
                                r = this.media,
                                i = this.sourceBuffer;
                            if (r && null !== e) {
                                var n = this.getSourceBufferTypes();
                                if (n.length) {
                                    var o = e.live && null !== t.config.liveBackBufferLength ? t.config.liveBackBufferLength : t.config.backBufferLength;
                                    if ((0, a.isFiniteNumber)(o) && !(o < 0)) {
                                        var u = r.currentTime,
                                            d = e.levelTargetDuration,
                                            h = Math.max(o, d),
                                            c = Math.floor(u / d) * d - h;
                                        n.forEach((function(r) {
                                            var n = i[r];
                                            if (n) {
                                                var a = Bt.getBuffered(n);
                                                if (a.length > 0 && c > a.start(0)) {
                                                    if (t.trigger(s.Events.BACK_BUFFER_REACHED, { bufferEnd: c }), e.live) t.trigger(s.Events.LIVE_BACK_BUFFER_REACHED, { bufferEnd: c });
                                                    else if (n.ended && a.end(a.length - 1) - u < 2 * d) return void l.logger.info("[buffer-controller]: Cannot flush " + r + " back buffer while SourceBuffer is in ended state");
                                                    t.trigger(s.Events.BUFFER_FLUSHING, { startOffset: 0, endOffset: c, type: r })
                                                }
                                            }
                                        }))
                                    }
                                }
                            }
                        }, e.updateMediaElementDuration = function() {
                            if (this.details && this.media && this.mediaSource && "open" === this.mediaSource.readyState) {
                                var t = this.details,
                                    e = this.hls,
                                    r = this.media,
                                    i = this.mediaSource,
                                    n = t.fragments[0].start + t.totalduration,
                                    s = r.duration,
                                    o = (0, a.isFiniteNumber)(i.duration) ? i.duration : 0;
                                t.live && e.config.liveDurationInfinity ? (l.logger.log("[buffer-controller]: Media Source duration is set to Infinity"), i.duration = 1 / 0, this.updateSeekableRange(t)) : (n > o && n > s || !(0, a.isFiniteNumber)(s)) && (l.logger.log("[buffer-controller]: Updating Media Source duration to " + n.toFixed(3)), i.duration = n)
                            }
                        }, e.updateSeekableRange = function(t) {
                            var e = this.mediaSource,
                                r = t.fragments;
                            if (r.length && t.live && null != e && e.setLiveSeekableRange) {
                                var i = Math.max(0, r[0].start),
                                    n = Math.max(i, i + t.totalduration);
                                e.setLiveSeekableRange(i, n)
                            }
                        }, e.checkPendingTracks = function() {
                            var t = this.bufferCodecEventsExpected,
                                e = this.operationQueue,
                                r = this.pendingTracks,
                                i = Object.keys(r).length;
                            if (i && !t || 2 === i) {
                                this.createSourceBuffers(r), this.pendingTracks = {};
                                var n = this.getSourceBufferTypes();
                                if (0 === n.length) return void this.hls.trigger(s.Events.ERROR, { type: o.ErrorTypes.MEDIA_ERROR, details: o.ErrorDetails.BUFFER_INCOMPATIBLE_CODECS_ERROR, fatal: !0, reason: "could not create source buffer for media codec(s)" });
                                n.forEach((function(t) { e.executeNext(t) }))
                            }
                        }, e.createSourceBuffers = function(t) {
                            var e = this.sourceBuffer,
                                r = this.mediaSource;
                            if (!r) throw Error("createSourceBuffers called when mediaSource was null");
                            var i = 0;
                            for (var n in t)
                                if (!e[n]) {
                                    var a = t[n];
                                    if (!a) throw Error("source buffer exists for track " + n + ", however track does not");
                                    var u = a.levelCodec || a.codec,
                                        d = a.container + ";codecs=" + u;
                                    l.logger.log("[buffer-controller]: creating sourceBuffer(" + d + ")");
                                    try {
                                        var h = e[n] = r.addSourceBuffer(d),
                                            c = n;
                                        this.addBufferListener(c, "updatestart", this._onSBUpdateStart), this.addBufferListener(c, "updateend", this._onSBUpdateEnd), this.addBufferListener(c, "error", this._onSBUpdateError), this.tracks[n] = { buffer: h, codec: u, container: a.container, levelCodec: a.levelCodec, metadata: a.metadata, id: a.id }, i++
                                    } catch (t) { l.logger.error("[buffer-controller]: error while trying to add sourceBuffer: " + t.message), this.hls.trigger(s.Events.ERROR, { type: o.ErrorTypes.MEDIA_ERROR, details: o.ErrorDetails.BUFFER_ADD_CODEC_ERROR, fatal: !1, error: t, mimeType: d }) }
                                }
                            i && this.hls.trigger(s.Events.BUFFER_CREATED, { tracks: this.tracks })
                        }, e._onSBUpdateStart = function(t) { this.operationQueue.current(t).onStart() }, e._onSBUpdateEnd = function(t) {
                            var e = this.operationQueue;
                            e.current(t).onComplete(), e.shiftAndExecuteNext(t)
                        }, e._onSBUpdateError = function(t, e) {
                            l.logger.error("[buffer-controller]: " + t + " SourceBuffer error", e), this.hls.trigger(s.Events.ERROR, { type: o.ErrorTypes.MEDIA_ERROR, details: o.ErrorDetails.BUFFER_APPENDING_ERROR, fatal: !1 });
                            var r = this.operationQueue.current(t);
                            r && r.onError(e)
                        }, e.removeExecutor = function(t, e, r) {
                            var i = this.media,
                                n = this.mediaSource,
                                s = this.operationQueue,
                                o = this.sourceBuffer[t];
                            if (!i || !n || !o) return l.logger.warn("[buffer-controller]: Attempting to remove from the " + t + " SourceBuffer, but it does not exist"), void s.shiftAndExecuteNext(t);
                            var u = (0, a.isFiniteNumber)(i.duration) ? i.duration : 1 / 0,
                                d = (0, a.isFiniteNumber)(n.duration) ? n.duration : 1 / 0,
                                h = Math.max(0, e),
                                c = Math.min(r, u, d);
                            c > h && !o.ending ? (o.ended = !1, l.logger.log("[buffer-controller]: Removing [" + h + "," + c + "] from the " + t + " SourceBuffer"), o.remove(h, c)) : s.shiftAndExecuteNext(t)
                        }, e.appendExecutor = function(t, e) {
                            var r = this.operationQueue,
                                i = this.sourceBuffer[e];
                            if (!i) return l.logger.warn("[buffer-controller]: Attempting to append to the " + e + " SourceBuffer, but it does not exist"), void r.shiftAndExecuteNext(e);
                            i.ended = !1, i.appendBuffer(t)
                        }, e.blockBuffers = function(t, e) {
                            var r = this;
                            if (void 0 === e && (e = this.getSourceBufferTypes()), !e.length) return l.logger.log("[buffer-controller]: Blocking operation requested, but no SourceBuffers exist"), void Promise.resolve().then(t);
                            var i = this.operationQueue,
                                n = e.map((function(t) { return i.appendBlocker(t) }));
                            Promise.all(n).then((function() {
                                t(), e.forEach((function(t) {
                                    var e = r.sourceBuffer[t];
                                    e && e.updating || i.shiftAndExecuteNext(t)
                                }))
                            }))
                        }, e.getSourceBufferTypes = function() { return Object.keys(this.sourceBuffer) }, e.addBufferListener = function(t, e, r) {
                            var i = this.sourceBuffer[t];
                            if (i) {
                                var n = r.bind(this, t);
                                this.listeners[t].push({ event: e, listener: n }), i.addEventListener(e, n)
                            }
                        }, e.removeBufferListeners = function(t) {
                            var e = this.sourceBuffer[t];
                            e && this.listeners[t].forEach((function(t) { e.removeEventListener(t.event, t.listener) }))
                        }, t
                    }(),
                    tr = { 42: 225, 92: 233, 94: 237, 95: 243, 96: 250, 123: 231, 124: 247, 125: 209, 126: 241, 127: 9608, 128: 174, 129: 176, 130: 189, 131: 191, 132: 8482, 133: 162, 134: 163, 135: 9834, 136: 224, 137: 32, 138: 232, 139: 226, 140: 234, 141: 238, 142: 244, 143: 251, 144: 193, 145: 201, 146: 211, 147: 218, 148: 220, 149: 252, 150: 8216, 151: 161, 152: 42, 153: 8217, 154: 9473, 155: 169, 156: 8480, 157: 8226, 158: 8220, 159: 8221, 160: 192, 161: 194, 162: 199, 163: 200, 164: 202, 165: 203, 166: 235, 167: 206, 168: 207, 169: 239, 170: 212, 171: 217, 172: 249, 173: 219, 174: 171, 175: 187, 176: 195, 177: 227, 178: 205, 179: 204, 180: 236, 181: 210, 182: 242, 183: 213, 184: 245, 185: 123, 186: 125, 187: 92, 188: 94, 189: 95, 190: 124, 191: 8764, 192: 196, 193: 228, 194: 214, 195: 246, 196: 223, 197: 165, 198: 164, 199: 9475, 200: 197, 201: 229, 202: 216, 203: 248, 204: 9487, 205: 9491, 206: 9495, 207: 9499 },
                    er = function(t) { var e = t; return tr.hasOwnProperty(t) && (e = tr[t]), String.fromCharCode(e) },
                    rr = 15,
                    ir = 100,
                    nr = { 17: 1, 18: 3, 21: 5, 22: 7, 23: 9, 16: 11, 19: 12, 20: 14 },
                    ar = { 17: 2, 18: 4, 21: 6, 22: 8, 23: 10, 19: 13, 20: 15 },
                    sr = { 25: 1, 26: 3, 29: 5, 30: 7, 31: 9, 24: 11, 27: 12, 28: 14 },
                    or = { 25: 2, 26: 4, 29: 6, 30: 8, 31: 10, 27: 13, 28: 15 },
                    lr = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "black", "transparent"];
                ! function(t) { t[t.ERROR = 0] = "ERROR", t[t.TEXT = 1] = "TEXT", t[t.WARNING = 2] = "WARNING", t[t.INFO = 2] = "INFO", t[t.DEBUG = 3] = "DEBUG", t[t.DATA = 3] = "DATA" }(ze || (ze = {}));
                var ur = function() {
                        function t() { this.time = null, this.verboseLevel = ze.ERROR }
                        return t.prototype.log = function(t, e) {
                            if (this.verboseLevel >= t) {
                                var r = "function" == typeof e ? e() : e;
                                l.logger.log(this.time + " [" + t + "] " + r)
                            }
                        }, t
                    }(),
                    dr = function(t) { for (var e = [], r = 0; r < t.length; r++) e.push(t[r].toString(16)); return e },
                    hr = function() {
                        function t(t, e, r, i, n) { this.foreground = void 0, this.underline = void 0, this.italics = void 0, this.background = void 0, this.flash = void 0, this.foreground = t || "white", this.underline = e || !1, this.italics = r || !1, this.background = i || "black", this.flash = n || !1 }
                        var e = t.prototype;
                        return e.reset = function() { this.foreground = "white", this.underline = !1, this.italics = !1, this.background = "black", this.flash = !1 }, e.setStyles = function(t) {
                            for (var e = ["foreground", "underline", "italics", "background", "flash"], r = 0; r < e.length; r++) {
                                var i = e[r];
                                t.hasOwnProperty(i) && (this[i] = t[i])
                            }
                        }, e.isDefault = function() { return "white" === this.foreground && !this.underline && !this.italics && "black" === this.background && !this.flash }, e.equals = function(t) { return this.foreground === t.foreground && this.underline === t.underline && this.italics === t.italics && this.background === t.background && this.flash === t.flash }, e.copy = function(t) { this.foreground = t.foreground, this.underline = t.underline, this.italics = t.italics, this.background = t.background, this.flash = t.flash }, e.toString = function() { return "color=" + this.foreground + ", underline=" + this.underline + ", italics=" + this.italics + ", background=" + this.background + ", flash=" + this.flash }, t
                    }(),
                    cr = function() {
                        function t(t, e, r, i, n, a) { this.uchar = void 0, this.penState = void 0, this.uchar = t || " ", this.penState = new hr(e, r, i, n, a) }
                        var e = t.prototype;
                        return e.reset = function() { this.uchar = " ", this.penState.reset() }, e.setChar = function(t, e) { this.uchar = t, this.penState.copy(e) }, e.setPenState = function(t) { this.penState.copy(t) }, e.equals = function(t) { return this.uchar === t.uchar && this.penState.equals(t.penState) }, e.copy = function(t) { this.uchar = t.uchar, this.penState.copy(t.penState) }, e.isEmpty = function() { return " " === this.uchar && this.penState.isDefault() }, t
                    }(),
                    fr = function() {
                        function t(t) {
                            this.chars = void 0, this.pos = void 0, this.currPenState = void 0, this.cueStartTime = void 0, this.logger = void 0, this.chars = [];
                            for (var e = 0; e < ir; e++) this.chars.push(new cr);
                            this.logger = t, this.pos = 0, this.currPenState = new hr
                        }
                        var e = t.prototype;
                        return e.equals = function(t) {
                            for (var e = !0, r = 0; r < ir; r++)
                                if (!this.chars[r].equals(t.chars[r])) { e = !1; break }
                            return e
                        }, e.copy = function(t) { for (var e = 0; e < ir; e++) this.chars[e].copy(t.chars[e]) }, e.isEmpty = function() {
                            for (var t = !0, e = 0; e < ir; e++)
                                if (!this.chars[e].isEmpty()) { t = !1; break }
                            return t
                        }, e.setCursor = function(t) { this.pos !== t && (this.pos = t), this.pos < 0 ? (this.logger.log(ze.DEBUG, "Negative cursor position " + this.pos), this.pos = 0) : this.pos > ir && (this.logger.log(ze.DEBUG, "Too large cursor position " + this.pos), this.pos = ir) }, e.moveCursor = function(t) {
                            var e = this.pos + t;
                            if (t > 1)
                                for (var r = this.pos + 1; r < e + 1; r++) this.chars[r].setPenState(this.currPenState);
                            this.setCursor(e)
                        }, e.backSpace = function() { this.moveCursor(-1), this.chars[this.pos].setChar(" ", this.currPenState) }, e.insertChar = function(t) {
                            var e = this;
                            t >= 144 && this.backSpace();
                            var r = er(t);
                            this.pos >= ir ? this.logger.log(ze.ERROR, (function() { return "Cannot insert " + t.toString(16) + " (" + r + ") at position " + e.pos + ". Skipping it!" })) : (this.chars[this.pos].setChar(r, this.currPenState), this.moveCursor(1))
                        }, e.clearFromPos = function(t) { var e; for (e = t; e < ir; e++) this.chars[e].reset() }, e.clear = function() { this.clearFromPos(0), this.pos = 0, this.currPenState.reset() }, e.clearToEndOfRow = function() { this.clearFromPos(this.pos) }, e.getTextString = function() { for (var t = [], e = !0, r = 0; r < ir; r++) { var i = this.chars[r].uchar; " " !== i && (e = !1), t.push(i) } return e ? "" : t.join("") }, e.setPenStyles = function(t) { this.currPenState.setStyles(t), this.chars[this.pos].setPenState(this.currPenState) }, t
                    }(),
                    gr = function() {
                        function t(t) {
                            this.rows = void 0, this.currRow = void 0, this.nrRollUpRows = void 0, this.lastOutputScreen = void 0, this.logger = void 0, this.rows = [];
                            for (var e = 0; e < rr; e++) this.rows.push(new fr(t));
                            this.logger = t, this.currRow = 14, this.nrRollUpRows = null, this.lastOutputScreen = null, this.reset()
                        }
                        var e = t.prototype;
                        return e.reset = function() {
                            for (var t = 0; t < rr; t++) this.rows[t].clear();
                            this.currRow = 14
                        }, e.equals = function(t) {
                            for (var e = !0, r = 0; r < rr; r++)
                                if (!this.rows[r].equals(t.rows[r])) { e = !1; break }
                            return e
                        }, e.copy = function(t) { for (var e = 0; e < rr; e++) this.rows[e].copy(t.rows[e]) }, e.isEmpty = function() {
                            for (var t = !0, e = 0; e < rr; e++)
                                if (!this.rows[e].isEmpty()) { t = !1; break }
                            return t
                        }, e.backSpace = function() { this.rows[this.currRow].backSpace() }, e.clearToEndOfRow = function() { this.rows[this.currRow].clearToEndOfRow() }, e.insertChar = function(t) { this.rows[this.currRow].insertChar(t) }, e.setPen = function(t) { this.rows[this.currRow].setPenStyles(t) }, e.moveCursor = function(t) { this.rows[this.currRow].moveCursor(t) }, e.setCursor = function(t) { this.logger.log(ze.INFO, "setCursor: " + t), this.rows[this.currRow].setCursor(t) }, e.setPAC = function(t) {
                            this.logger.log(ze.INFO, (function() { return "pacData = " + JSON.stringify(t) }));
                            var e = t.row - 1;
                            if (this.nrRollUpRows && e < this.nrRollUpRows - 1 && (e = this.nrRollUpRows - 1), this.nrRollUpRows && this.currRow !== e) {
                                for (var r = 0; r < rr; r++) this.rows[r].clear();
                                var i = this.currRow + 1 - this.nrRollUpRows,
                                    n = this.lastOutputScreen;
                                if (n) {
                                    var a = n.rows[i].cueStartTime,
                                        s = this.logger.time;
                                    if (a && null !== s && a < s)
                                        for (var o = 0; o < this.nrRollUpRows; o++) this.rows[e - this.nrRollUpRows + o + 1].copy(n.rows[i + o])
                                }
                            }
                            this.currRow = e;
                            var l = this.rows[this.currRow];
                            if (null !== t.indent) {
                                var u = t.indent,
                                    d = Math.max(u - 1, 0);
                                l.setCursor(t.indent), t.color = l.chars[d].penState.foreground
                            }
                            var h = { foreground: t.color, underline: t.underline, italics: t.italics, background: "black", flash: !1 };
                            this.setPen(h)
                        }, e.setBkgData = function(t) { this.logger.log(ze.INFO, (function() { return "bkgData = " + JSON.stringify(t) })), this.backSpace(), this.setPen(t), this.insertChar(32) }, e.setRollUpRows = function(t) { this.nrRollUpRows = t }, e.rollUp = function() {
                            var t = this;
                            if (null !== this.nrRollUpRows) {
                                this.logger.log(ze.TEXT, (function() { return t.getDisplayText() }));
                                var e = this.currRow + 1 - this.nrRollUpRows,
                                    r = this.rows.splice(e, 1)[0];
                                r.clear(), this.rows.splice(this.currRow, 0, r), this.logger.log(ze.INFO, "Rolling up")
                            } else this.logger.log(ze.DEBUG, "roll_up but nrRollUpRows not set yet")
                        }, e.getDisplayText = function(t) {
                            t = t || !1;
                            for (var e = [], r = "", i = -1, n = 0; n < rr; n++) {
                                var a = this.rows[n].getTextString();
                                a && (i = n + 1, t ? e.push("Row " + i + ": '" + a + "'") : e.push(a.trim()))
                            }
                            return e.length > 0 && (r = t ? "[" + e.join(" | ") + "]" : e.join("\n")), r
                        }, e.getTextAndFormat = function() { return this.rows }, t
                    }(),
                    vr = function() {
                        function t(t, e, r) { this.chNr = void 0, this.outputFilter = void 0, this.mode = void 0, this.verbose = void 0, this.displayedMemory = void 0, this.nonDisplayedMemory = void 0, this.lastOutputScreen = void 0, this.currRollUpRow = void 0, this.writeScreen = void 0, this.cueStartTime = void 0, this.logger = void 0, this.chNr = t, this.outputFilter = e, this.mode = null, this.verbose = 0, this.displayedMemory = new gr(r), this.nonDisplayedMemory = new gr(r), this.lastOutputScreen = new gr(r), this.currRollUpRow = this.displayedMemory.rows[14], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null, this.logger = r }
                        var e = t.prototype;
                        return e.reset = function() { this.mode = null, this.displayedMemory.reset(), this.nonDisplayedMemory.reset(), this.lastOutputScreen.reset(), this.outputFilter.reset(), this.currRollUpRow = this.displayedMemory.rows[14], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null }, e.getHandler = function() { return this.outputFilter }, e.setHandler = function(t) { this.outputFilter = t }, e.setPAC = function(t) { this.writeScreen.setPAC(t) }, e.setBkgData = function(t) { this.writeScreen.setBkgData(t) }, e.setMode = function(t) { t !== this.mode && (this.mode = t, this.logger.log(ze.INFO, (function() { return "MODE=" + t })), "MODE_POP-ON" === this.mode ? this.writeScreen = this.nonDisplayedMemory : (this.writeScreen = this.displayedMemory, this.writeScreen.reset()), "MODE_ROLL-UP" !== this.mode && (this.displayedMemory.nrRollUpRows = null, this.nonDisplayedMemory.nrRollUpRows = null), this.mode = t) }, e.insertChars = function(t) {
                            for (var e = this, r = 0; r < t.length; r++) this.writeScreen.insertChar(t[r]);
                            var i = this.writeScreen === this.displayedMemory ? "DISP" : "NON_DISP";
                            this.logger.log(ze.INFO, (function() { return i + ": " + e.writeScreen.getDisplayText(!0) })), "MODE_PAINT-ON" !== this.mode && "MODE_ROLL-UP" !== this.mode || (this.logger.log(ze.TEXT, (function() { return "DISPLAYED: " + e.displayedMemory.getDisplayText(!0) })), this.outputDataUpdate())
                        }, e.ccRCL = function() { this.logger.log(ze.INFO, "RCL - Resume Caption Loading"), this.setMode("MODE_POP-ON") }, e.ccBS = function() { this.logger.log(ze.INFO, "BS - BackSpace"), "MODE_TEXT" !== this.mode && (this.writeScreen.backSpace(), this.writeScreen === this.displayedMemory && this.outputDataUpdate()) }, e.ccAOF = function() {}, e.ccAON = function() {}, e.ccDER = function() { this.logger.log(ze.INFO, "DER- Delete to End of Row"), this.writeScreen.clearToEndOfRow(), this.outputDataUpdate() }, e.ccRU = function(t) { this.logger.log(ze.INFO, "RU(" + t + ") - Roll Up"), this.writeScreen = this.displayedMemory, this.setMode("MODE_ROLL-UP"), this.writeScreen.setRollUpRows(t) }, e.ccFON = function() { this.logger.log(ze.INFO, "FON - Flash On"), this.writeScreen.setPen({ flash: !0 }) }, e.ccRDC = function() { this.logger.log(ze.INFO, "RDC - Resume Direct Captioning"), this.setMode("MODE_PAINT-ON") }, e.ccTR = function() { this.logger.log(ze.INFO, "TR"), this.setMode("MODE_TEXT") }, e.ccRTD = function() { this.logger.log(ze.INFO, "RTD"), this.setMode("MODE_TEXT") }, e.ccEDM = function() { this.logger.log(ze.INFO, "EDM - Erase Displayed Memory"), this.displayedMemory.reset(), this.outputDataUpdate(!0) }, e.ccCR = function() { this.logger.log(ze.INFO, "CR - Carriage Return"), this.writeScreen.rollUp(), this.outputDataUpdate(!0) }, e.ccENM = function() { this.logger.log(ze.INFO, "ENM - Erase Non-displayed Memory"), this.nonDisplayedMemory.reset() }, e.ccEOC = function() {
                            var t = this;
                            if (this.logger.log(ze.INFO, "EOC - End Of Caption"), "MODE_POP-ON" === this.mode) {
                                var e = this.displayedMemory;
                                this.displayedMemory = this.nonDisplayedMemory, this.nonDisplayedMemory = e, this.writeScreen = this.nonDisplayedMemory, this.logger.log(ze.TEXT, (function() { return "DISP: " + t.displayedMemory.getDisplayText() }))
                            }
                            this.outputDataUpdate(!0)
                        }, e.ccTO = function(t) { this.logger.log(ze.INFO, "TO(" + t + ") - Tab Offset"), this.writeScreen.moveCursor(t) }, e.ccMIDROW = function(t) {
                            var e = { flash: !1 };
                            if (e.underline = t % 2 == 1, e.italics = t >= 46, e.italics) e.foreground = "white";
                            else {
                                var r = Math.floor(t / 2) - 16;
                                e.foreground = ["white", "green", "blue", "cyan", "red", "yellow", "magenta"][r]
                            }
                            this.logger.log(ze.INFO, "MIDROW: " + JSON.stringify(e)), this.writeScreen.setPen(e)
                        }, e.outputDataUpdate = function(t) {
                            void 0 === t && (t = !1);
                            var e = this.logger.time;
                            null !== e && this.outputFilter && (null !== this.cueStartTime || this.displayedMemory.isEmpty() ? this.displayedMemory.equals(this.lastOutputScreen) || (this.outputFilter.newCue(this.cueStartTime, e, this.lastOutputScreen), t && this.outputFilter.dispatchCue && this.outputFilter.dispatchCue(), this.cueStartTime = this.displayedMemory.isEmpty() ? null : e) : this.cueStartTime = e, this.lastOutputScreen.copy(this.displayedMemory))
                        }, e.cueSplitAtTime = function(t) { this.outputFilter && (this.displayedMemory.isEmpty() || (this.outputFilter.newCue && this.outputFilter.newCue(this.cueStartTime, t, this.displayedMemory), this.cueStartTime = t)) }, t
                    }(),
                    pr = function() {
                        function t(t, e, r) {
                            this.channels = void 0, this.currentChannel = 0, this.cmdHistory = void 0, this.logger = void 0;
                            var i = new ur;
                            this.channels = [null, new vr(t, e, i), new vr(t + 1, r, i)], this.cmdHistory = { a: null, b: null }, this.logger = i
                        }
                        var e = t.prototype;
                        return e.getHandler = function(t) { return this.channels[t].getHandler() }, e.setHandler = function(t, e) { this.channels[t].setHandler(e) }, e.addData = function(t, e) {
                            var r, i, n, a = !1;
                            this.logger.time = t;
                            for (var s = 0; s < e.length; s += 2)
                                if (i = 127 & e[s], n = 127 & e[s + 1], 0 !== i || 0 !== n) {
                                    if (this.logger.log(ze.DATA, "[" + dr([e[s], e[s + 1]]) + "] -> (" + dr([i, n]) + ")"), (r = this.parseCmd(i, n)) || (r = this.parseMidrow(i, n)), r || (r = this.parsePAC(i, n)), r || (r = this.parseBackgroundAttributes(i, n)), !r && (a = this.parseChars(i, n))) {
                                        var o = this.currentChannel;
                                        o && o > 0 ? this.channels[o].insertChars(a) : this.logger.log(ze.WARNING, "No channel found yet. TEXT-MODE?")
                                    }
                                    r || a || this.logger.log(ze.WARNING, "Couldn't parse cleaned data " + dr([i, n]) + " orig: " + dr([e[s], e[s + 1]]))
                                }
                        }, e.parseCmd = function(t, e) {
                            var r = this.cmdHistory;
                            if (!((20 === t || 28 === t || 21 === t || 29 === t) && e >= 32 && e <= 47 || (23 === t || 31 === t) && e >= 33 && e <= 35)) return !1;
                            if (yr(t, e, r)) return mr(null, null, r), this.logger.log(ze.DEBUG, "Repeated command (" + dr([t, e]) + ") is dropped"), !0;
                            var i = 20 === t || 21 === t || 23 === t ? 1 : 2,
                                n = this.channels[i];
                            return 20 === t || 21 === t || 28 === t || 29 === t ? 32 === e ? n.ccRCL() : 33 === e ? n.ccBS() : 34 === e ? n.ccAOF() : 35 === e ? n.ccAON() : 36 === e ? n.ccDER() : 37 === e ? n.ccRU(2) : 38 === e ? n.ccRU(3) : 39 === e ? n.ccRU(4) : 40 === e ? n.ccFON() : 41 === e ? n.ccRDC() : 42 === e ? n.ccTR() : 43 === e ? n.ccRTD() : 44 === e ? n.ccEDM() : 45 === e ? n.ccCR() : 46 === e ? n.ccENM() : 47 === e && n.ccEOC() : n.ccTO(e - 32), mr(t, e, r), this.currentChannel = i, !0
                        }, e.parseMidrow = function(t, e) { var r = 0; if ((17 === t || 25 === t) && e >= 32 && e <= 47) { if ((r = 17 === t ? 1 : 2) !== this.currentChannel) return this.logger.log(ze.ERROR, "Mismatch channel in midrow parsing"), !1; var i = this.channels[r]; return !!i && (i.ccMIDROW(e), this.logger.log(ze.DEBUG, "MIDROW (" + dr([t, e]) + ")"), !0) } return !1 }, e.parsePAC = function(t, e) {
                            var r, i = this.cmdHistory;
                            if (!((t >= 17 && t <= 23 || t >= 25 && t <= 31) && e >= 64 && e <= 127 || (16 === t || 24 === t) && e >= 64 && e <= 95)) return !1;
                            if (yr(t, e, i)) return mr(null, null, i), !0;
                            var n = t <= 23 ? 1 : 2;
                            r = e >= 64 && e <= 95 ? 1 === n ? nr[t] : sr[t] : 1 === n ? ar[t] : or[t];
                            var a = this.channels[n];
                            return !!a && (a.setPAC(this.interpretPAC(r, e)), mr(t, e, i), this.currentChannel = n, !0)
                        }, e.interpretPAC = function(t, e) { var r, i = { color: null, italics: !1, indent: null, underline: !1, row: t }; return r = e > 95 ? e - 96 : e - 64, i.underline = 1 == (1 & r), r <= 13 ? i.color = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "white"][Math.floor(r / 2)] : r <= 15 ? (i.italics = !0, i.color = "white") : i.indent = 4 * Math.floor((r - 16) / 2), i }, e.parseChars = function(t, e) {
                            var r, i, n = null,
                                a = null;
                            if (t >= 25 ? (r = 2, a = t - 8) : (r = 1, a = t), a >= 17 && a <= 19 ? (i = 17 === a ? e + 80 : 18 === a ? e + 112 : e + 144, this.logger.log(ze.INFO, "Special char '" + er(i) + "' in channel " + r), n = [i]) : t >= 32 && t <= 127 && (n = 0 === e ? [t] : [t, e]), n) {
                                var s = dr(n);
                                this.logger.log(ze.DEBUG, "Char codes =  " + s.join(",")), mr(t, e, this.cmdHistory)
                            }
                            return n
                        }, e.parseBackgroundAttributes = function(t, e) {
                            var r;
                            if (!((16 === t || 24 === t) && e >= 32 && e <= 47 || (23 === t || 31 === t) && e >= 45 && e <= 47)) return !1;
                            var i = {};
                            16 === t || 24 === t ? (r = Math.floor((e - 32) / 2), i.background = lr[r], e % 2 == 1 && (i.background = i.background + "_semi")) : 45 === e ? i.background = "transparent" : (i.foreground = "black", 47 === e && (i.underline = !0));
                            var n = t <= 23 ? 1 : 2;
                            return this.channels[n].setBkgData(i), mr(t, e, this.cmdHistory), !0
                        }, e.reset = function() {
                            for (var t = 0; t < Object.keys(this.channels).length; t++) {
                                var e = this.channels[t];
                                e && e.reset()
                            }
                            this.cmdHistory = { a: null, b: null }
                        }, e.cueSplitAtTime = function(t) {
                            for (var e = 0; e < this.channels.length; e++) {
                                var r = this.channels[e];
                                r && r.cueSplitAtTime(t)
                            }
                        }, t
                    }();

                function mr(t, e, r) { r.a = t, r.b = e }

                function yr(t, e, r) { return r.a === t && r.b === e }
                const Er = pr;
                var Tr = function() {
                    function t(t, e) { this.timelineController = void 0, this.cueRanges = [], this.trackName = void 0, this.startTime = null, this.endTime = null, this.screen = null, this.timelineController = t, this.trackName = e }
                    var e = t.prototype;
                    return e.dispatchCue = function() { null !== this.startTime && (this.timelineController.addCues(this.trackName, this.startTime, this.endTime, this.screen, this.cueRanges), this.startTime = null) }, e.newCue = function(t, e, r) {
                        (null === this.startTime || this.startTime > t) && (this.startTime = t), this.endTime = e, this.screen = r, this.timelineController.createCaptionsTrack(this.trackName)
                    }, e.reset = function() { this.cueRanges = [], this.startTime = null }, t
                }();
                const Sr = function() {
                    if ("undefined" != typeof self && self.VTTCue) return self.VTTCue;
                    var t = ["", "lr", "rl"],
                        e = ["start", "middle", "end", "left", "right"];

                    function r(t, e) { if ("string" != typeof e) return !1; if (!Array.isArray(t)) return !1; var r = e.toLowerCase(); return !!~t.indexOf(r) && r }

                    function i(t) { return r(e, t) }

                    function n(t) { for (var e = arguments.length, r = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++) r[i - 1] = arguments[i]; for (var n = 1; n < arguments.length; n++) { var a = arguments[n]; for (var s in a) t[s] = a[s] } return t }

                    function a(e, a, s) {
                        var o = this,
                            l = { enumerable: !0 };
                        o.hasBeenReset = !1;
                        var u = "",
                            d = !1,
                            h = e,
                            c = a,
                            f = s,
                            g = null,
                            v = "",
                            p = !0,
                            m = "auto",
                            y = "start",
                            E = 50,
                            T = "middle",
                            S = 50,
                            b = "middle";
                        Object.defineProperty(o, "id", n({}, l, { get: function() { return u }, set: function(t) { u = "" + t } })), Object.defineProperty(o, "pauseOnExit", n({}, l, { get: function() { return d }, set: function(t) { d = !!t } })), Object.defineProperty(o, "startTime", n({}, l, {
                            get: function() { return h },
                            set: function(t) {
                                if ("number" != typeof t) throw new TypeError("Start time must be set to a number.");
                                h = t, this.hasBeenReset = !0
                            }
                        })), Object.defineProperty(o, "endTime", n({}, l, {
                            get: function() { return c },
                            set: function(t) {
                                if ("number" != typeof t) throw new TypeError("End time must be set to a number.");
                                c = t, this.hasBeenReset = !0
                            }
                        })), Object.defineProperty(o, "text", n({}, l, { get: function() { return f }, set: function(t) { f = "" + t, this.hasBeenReset = !0 } })), Object.defineProperty(o, "region", n({}, l, { get: function() { return g }, set: function(t) { g = t, this.hasBeenReset = !0 } })), Object.defineProperty(o, "vertical", n({}, l, {
                            get: function() { return v },
                            set: function(e) {
                                var i = function(e) { return r(t, e) }(e);
                                if (!1 === i) throw new SyntaxError("An invalid or illegal string was specified.");
                                v = i, this.hasBeenReset = !0
                            }
                        })), Object.defineProperty(o, "snapToLines", n({}, l, { get: function() { return p }, set: function(t) { p = !!t, this.hasBeenReset = !0 } })), Object.defineProperty(o, "line", n({}, l, {
                            get: function() { return m },
                            set: function(t) {
                                if ("number" != typeof t && "auto" !== t) throw new SyntaxError("An invalid number or illegal string was specified.");
                                m = t, this.hasBeenReset = !0
                            }
                        })), Object.defineProperty(o, "lineAlign", n({}, l, {
                            get: function() { return y },
                            set: function(t) {
                                var e = i(t);
                                if (!e) throw new SyntaxError("An invalid or illegal string was specified.");
                                y = e, this.hasBeenReset = !0
                            }
                        })), Object.defineProperty(o, "position", n({}, l, {
                            get: function() { return E },
                            set: function(t) {
                                if (t < 0 || t > 100) throw new Error("Position must be between 0 and 100.");
                                E = t, this.hasBeenReset = !0
                            }
                        })), Object.defineProperty(o, "positionAlign", n({}, l, {
                            get: function() { return T },
                            set: function(t) {
                                var e = i(t);
                                if (!e) throw new SyntaxError("An invalid or illegal string was specified.");
                                T = e, this.hasBeenReset = !0
                            }
                        })), Object.defineProperty(o, "size", n({}, l, {
                            get: function() { return S },
                            set: function(t) {
                                if (t < 0 || t > 100) throw new Error("Size must be between 0 and 100.");
                                S = t, this.hasBeenReset = !0
                            }
                        })), Object.defineProperty(o, "align", n({}, l, {
                            get: function() { return b },
                            set: function(t) {
                                var e = i(t);
                                if (!e) throw new SyntaxError("An invalid or illegal string was specified.");
                                b = e, this.hasBeenReset = !0
                            }
                        })), o.displayState = void 0
                    }
                    return a.prototype.getCueAsHTML = function() { return self.WebVTT.convertCueToDOMTree(self, this.text) }, a
                }();
                var br = function() {
                    function t() {}
                    return t.prototype.decode = function(t, e) { if (!t) return ""; if ("string" != typeof t) throw new Error("Error - expected string data."); return decodeURIComponent(encodeURIComponent(t)) }, t
                }();

                function Lr(t) {
                    function e(t, e, r, i) { return 3600 * (0 | t) + 60 * (0 | e) + (0 | r) + parseFloat(i || 0) }
                    var r = t.match(/^(?:(\d+):)?(\d{2}):(\d{2})(\.\d+)?/);
                    return r ? parseFloat(r[2]) > 59 ? e(r[2], r[3], 0, r[4]) : e(r[1], r[2], r[3], r[4]) : null
                }
                var Ar = function() {
                    function t() { this.values = Object.create(null) }
                    var e = t.prototype;
                    return e.set = function(t, e) { this.get(t) || "" === e || (this.values[t] = e) }, e.get = function(t, e, r) { return r ? this.has(t) ? this.values[t] : e[r] : this.has(t) ? this.values[t] : e }, e.has = function(t) { return t in this.values }, e.alt = function(t, e, r) {
                        for (var i = 0; i < r.length; ++i)
                            if (e === r[i]) { this.set(t, e); break }
                    }, e.integer = function(t, e) { /^-?\d+$/.test(e) && this.set(t, parseInt(e, 10)) }, e.percent = function(t, e) { if (/^([\d]{1,3})(\.[\d]*)?%$/.test(e)) { var r = parseFloat(e); if (r >= 0 && r <= 100) return this.set(t, r), !0 } return !1 }, t
                }();

                function Dr(t, e, r, i) {
                    var n = i ? t.split(i) : [t];
                    for (var a in n)
                        if ("string" == typeof n[a]) {
                            var s = n[a].split(r);
                            2 === s.length && e(s[0], s[1])
                        }
                }
                var kr = new Sr(0, 0, ""),
                    Rr = "middle" === kr.align ? "middle" : "center";

                function Ir(t, e, r) {
                    var i = t;

                    function n() { var e = Lr(t); if (null === e) throw new Error("Malformed timestamp: " + i); return t = t.replace(/^[^\sa-zA-Z-]+/, ""), e }

                    function a() { t = t.replace(/^\s+/, "") }
                    if (a(), e.startTime = n(), a(), "--\x3e" !== t.slice(0, 3)) throw new Error("Malformed time stamp (time stamps must be separated by '--\x3e'): " + i);
                    t = t.slice(3), a(), e.endTime = n(), a(),
                        function(t, e) {
                            var i = new Ar;
                            Dr(t, (function(t, e) {
                                var n;
                                switch (t) {
                                    case "region":
                                        for (var a = r.length - 1; a >= 0; a--)
                                            if (r[a].id === e) { i.set(t, r[a].region); break }
                                        break;
                                    case "vertical":
                                        i.alt(t, e, ["rl", "lr"]);
                                        break;
                                    case "line":
                                        n = e.split(","), i.integer(t, n[0]), i.percent(t, n[0]) && i.set("snapToLines", !1), i.alt(t, n[0], ["auto"]), 2 === n.length && i.alt("lineAlign", n[1], ["start", Rr, "end"]);
                                        break;
                                    case "position":
                                        n = e.split(","), i.percent(t, n[0]), 2 === n.length && i.alt("positionAlign", n[1], ["start", Rr, "end", "line-left", "line-right", "auto"]);
                                        break;
                                    case "size":
                                        i.percent(t, e);
                                        break;
                                    case "align":
                                        i.alt(t, e, ["start", Rr, "end", "left", "right"])
                                }
                            }), /:/, /\s/), e.region = i.get("region", null), e.vertical = i.get("vertical", "");
                            var n = i.get("line", "auto");
                            "auto" === n && -1 === kr.line && (n = -1), e.line = n, e.lineAlign = i.get("lineAlign", "start"), e.snapToLines = i.get("snapToLines", !0), e.size = i.get("size", 100), e.align = i.get("align", Rr);
                            var a = i.get("position", "auto");
                            "auto" === a && 50 === kr.position && (a = "start" === e.align || "left" === e.align ? 0 : "end" === e.align || "right" === e.align ? 100 : 50), e.position = a
                        }(t, e)
                }

                function wr(t) { return t.replace(/<br(?: \/)?>/gi, "\n") }
                var Cr = function() {
                        function t() { this.state = "INITIAL", this.buffer = "", this.decoder = new br, this.regionList = [], this.cue = null, this.oncue = void 0, this.onparsingerror = void 0, this.onflush = void 0 }
                        var e = t.prototype;
                        return e.parse = function(t) {
                            var e = this;

                            function r() {
                                var t = e.buffer,
                                    r = 0;
                                for (t = wr(t); r < t.length && "\r" !== t[r] && "\n" !== t[r];) ++r;
                                var i = t.slice(0, r);
                                return "\r" === t[r] && ++r, "\n" === t[r] && ++r, e.buffer = t.slice(r), i
                            }
                            t && (e.buffer += e.decoder.decode(t, { stream: !0 }));
                            try {
                                var i = "";
                                if ("INITIAL" === e.state) {
                                    if (!/\r\n|\n/.test(e.buffer)) return this;
                                    var n = (i = r()).match(/^(ï»¿)?WEBVTT([ \t].*)?$/);
                                    if (!n || !n[0]) throw new Error("Malformed WebVTT signature.");
                                    e.state = "HEADER"
                                }
                                for (var a = !1; e.buffer;) {
                                    if (!/\r\n|\n/.test(e.buffer)) return this;
                                    switch (a ? a = !1 : i = r(), e.state) {
                                        case "HEADER":
                                            /:/.test(i) ? Dr(i, (function(t, e) {}), /:/) : i || (e.state = "ID");
                                            continue;
                                        case "NOTE":
                                            i || (e.state = "ID");
                                            continue;
                                        case "ID":
                                            if (/^NOTE($|[ \t])/.test(i)) { e.state = "NOTE"; break }
                                            if (!i) continue;
                                            if (e.cue = new Sr(0, 0, ""), e.state = "CUE", -1 === i.indexOf("--\x3e")) { e.cue.id = i; continue }
                                        case "CUE":
                                            if (!e.cue) { e.state = "BADCUE"; continue }
                                            try { Ir(i, e.cue, e.regionList) } catch (t) { e.cue = null, e.state = "BADCUE"; continue }
                                            e.state = "CUETEXT";
                                            continue;
                                        case "CUETEXT":
                                            var s = -1 !== i.indexOf("--\x3e");
                                            if (!i || s && (a = !0)) { e.oncue && e.cue && e.oncue(e.cue), e.cue = null, e.state = "ID"; continue }
                                            if (null === e.cue) continue;
                                            e.cue.text && (e.cue.text += "\n"), e.cue.text += i;
                                            continue;
                                        case "BADCUE":
                                            i || (e.state = "ID")
                                    }
                                }
                            } catch (t) { "CUETEXT" === e.state && e.cue && e.oncue && e.oncue(e.cue), e.cue = null, e.state = "INITIAL" === e.state ? "BADWEBVTT" : "BADCUE" }
                            return this
                        }, e.flush = function() { var t = this; try { if ((t.cue || "HEADER" === t.state) && (t.buffer += "\n\n", t.parse()), "INITIAL" === t.state || "BADWEBVTT" === t.state) throw new Error("Malformed WebVTT signature.") } catch (e) { t.onparsingerror && t.onparsingerror(e) } return t.onflush && t.onflush(), this }, t
                    }(),
                    _r = r(673),
                    Pr = r(524),
                    Or = /\r\n|\n\r|\n|\r/g,
                    xr = function(t, e, r) { return void 0 === r && (r = 0), t.slice(r, r + e.length) === e },
                    Fr = function(t) { for (var e = 5381, r = t.length; r;) e = 33 * e ^ t.charCodeAt(--r); return (e >>> 0).toString() };

                function Mr(t, e, r) { return Fr(t.toString()) + Fr(e.toString()) + Fr(r) }

                function Nr() { return Nr = Object.assign ? Object.assign.bind() : function(t) { for (var e = 1; e < arguments.length; e++) { var r = arguments[e]; for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]) } return t }, Nr.apply(this, arguments) }
                var Ur = "stpp.ttml.im1t",
                    Br = /^(\d{2,}):(\d{2}):(\d{2}):(\d{2})\.?(\d+)?$/,
                    Gr = /^(\d*(?:\.\d*)?)(h|m|s|ms|f|t)$/,
                    Kr = { left: "start", center: "center", right: "end", start: "start", end: "end" };

                function Hr(t, e, r, i, n) {
                    var a = (0, R.findBox)(new Uint8Array(t), ["mdat"]);
                    if (0 !== a.length) {
                        var s = a.map((function(t) { return (0, $.utf8ArrayToStr)(t) })),
                            o = (0, _r.toTimescaleFromScale)(e, 1, r);
                        try {
                            s.forEach((function(t) {
                                return i(function(t, e) {
                                    var r = (new DOMParser).parseFromString(t, "text/xml").getElementsByTagName("tt")[0];
                                    if (!r) throw new Error("Invalid ttml");
                                    var i = { frameRate: 30, subFrameRate: 1, frameRateMultiplier: 0, tickRate: 0 },
                                        n = Object.keys(i).reduce((function(t, e) { return t[e] = r.getAttribute("ttp:" + e) || i[e], t }), {}),
                                        a = "preserve" !== r.getAttribute("xml:space"),
                                        s = Vr(jr(r, "styling", "style")),
                                        o = Vr(jr(r, "layout", "region")),
                                        l = jr(r, "body", "[begin]");
                                    return [].map.call(l, (function(t) {
                                        var r = Yr(t, a);
                                        if (!r || !t.hasAttribute("begin")) return null;
                                        var i = Xr(t.getAttribute("begin"), n),
                                            l = Xr(t.getAttribute("dur"), n),
                                            u = Xr(t.getAttribute("end"), n);
                                        if (null === i) throw qr(t);
                                        if (null === u) {
                                            if (null === l) throw qr(t);
                                            u = i + l
                                        }
                                        var d = new Sr(i - e, u - e, r);
                                        d.id = Mr(d.startTime, d.endTime, d.text);
                                        var h = function(t, e, r) {
                                                var i = "http://www.w3.org/ns/ttml#styling",
                                                    n = null,
                                                    a = null != t && t.hasAttribute("style") ? t.getAttribute("style") : null;
                                                return a && r.hasOwnProperty(a) && (n = r[a]), ["displayAlign", "textAlign", "color", "backgroundColor", "fontSize", "fontFamily"].reduce((function(r, a) { var s = Wr(e, i, a) || Wr(t, i, a) || Wr(n, i, a); return s && (r[a] = s), r }), {})
                                            }(o[t.getAttribute("region")], s[t.getAttribute("style")], s),
                                            c = h.textAlign;
                                        if (c) {
                                            var f = Kr[c];
                                            f && (d.lineAlign = f), d.align = c
                                        }
                                        return Nr(d, h), d
                                    })).filter((function(t) { return null !== t }))
                                }(t, o))
                            }))
                        } catch (t) { n(t) }
                    } else n(new Error("Could not parse IMSC1 mdat"))
                }

                function jr(t, e, r) { var i = t.getElementsByTagName(e)[0]; return i ? [].slice.call(i.querySelectorAll(r)) : [] }

                function Vr(t) { return t.reduce((function(t, e) { var r = e.getAttribute("xml:id"); return r && (t[r] = e), t }), {}) }

                function Yr(t, e) { return [].slice.call(t.childNodes).reduce((function(t, r, i) { var n; return "br" === r.nodeName && i ? t + "\n" : null !== (n = r.childNodes) && void 0 !== n && n.length ? Yr(r, e) : e ? t + r.textContent.trim().replace(/\s+/g, " ") : t + r.textContent }), "") }

                function Wr(t, e, r) { return t && t.hasAttributeNS(e, r) ? t.getAttributeNS(e, r) : null }

                function qr(t) { return new Error("Could not parse ttml timestamp " + t) }

                function Xr(t, e) {
                    if (!t) return null;
                    var r = Lr(t);
                    return null === r && (Br.test(t) ? r = function(t, e) {
                        var r = Br.exec(t),
                            i = (0 | r[4]) + (0 | r[5]) / e.subFrameRate;
                        return 3600 * (0 | r[1]) + 60 * (0 | r[2]) + (0 | r[3]) + i / e.frameRate
                    }(t, e) : Gr.test(t) && (r = function(t, e) {
                        var r = Gr.exec(t),
                            i = Number(r[1]);
                        switch (r[2]) {
                            case "h":
                                return 3600 * i;
                            case "m":
                                return 60 * i;
                            case "ms":
                                return 1e3 * i;
                            case "f":
                                return i / e.frameRate;
                            case "t":
                                return i / e.tickRate
                        }
                        return i
                    }(t, e))), r
                }
                var zr = function() {
                    function t(t) {
                        if (this.hls = void 0, this.media = null, this.config = void 0, this.enabled = !0, this.Cues = void 0, this.textTracks = [], this.tracks = [], this.initPTS = [], this.timescale = [], this.unparsedVttFrags = [], this.captionsTracks = {}, this.nonNativeCaptionsTracks = {}, this.cea608Parser1 = void 0, this.cea608Parser2 = void 0, this.lastSn = -1, this.lastPartIndex = -1, this.prevCC = -1, this.vttCCs = { ccOffset: 0, presentationOffset: 0, 0: { start: 0, prevCC: -1, new: !0 } }, this.captionsProperties = void 0, this.hls = t, this.config = t.config, this.Cues = t.config.cueHandler, this.captionsProperties = { textTrack1: { label: this.config.captionsTextTrack1Label, languageCode: this.config.captionsTextTrack1LanguageCode }, textTrack2: { label: this.config.captionsTextTrack2Label, languageCode: this.config.captionsTextTrack2LanguageCode }, textTrack3: { label: this.config.captionsTextTrack3Label, languageCode: this.config.captionsTextTrack3LanguageCode }, textTrack4: { label: this.config.captionsTextTrack4Label, languageCode: this.config.captionsTextTrack4LanguageCode } }, this.config.enableCEA708Captions) {
                            var e = new Tr(this, "textTrack1"),
                                r = new Tr(this, "textTrack2"),
                                i = new Tr(this, "textTrack3"),
                                n = new Tr(this, "textTrack4");
                            this.cea608Parser1 = new Er(1, e, r), this.cea608Parser2 = new Er(3, i, n)
                        }
                        t.on(s.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), t.on(s.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(s.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.on(s.Events.MANIFEST_LOADED, this.onManifestLoaded, this), t.on(s.Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), t.on(s.Events.FRAG_LOADING, this.onFragLoading, this), t.on(s.Events.FRAG_LOADED, this.onFragLoaded, this), t.on(s.Events.FRAG_PARSING_USERDATA, this.onFragParsingUserdata, this), t.on(s.Events.FRAG_DECRYPTED, this.onFragDecrypted, this), t.on(s.Events.INIT_PTS_FOUND, this.onInitPtsFound, this), t.on(s.Events.SUBTITLE_TRACKS_CLEARED, this.onSubtitleTracksCleared, this), t.on(s.Events.BUFFER_FLUSHING, this.onBufferFlushing, this)
                    }
                    var e = t.prototype;
                    return e.destroy = function() {
                        var t = this.hls;
                        t.off(s.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), t.off(s.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(s.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.off(s.Events.MANIFEST_LOADED, this.onManifestLoaded, this), t.off(s.Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), t.off(s.Events.FRAG_LOADING, this.onFragLoading, this), t.off(s.Events.FRAG_LOADED, this.onFragLoaded, this), t.off(s.Events.FRAG_PARSING_USERDATA, this.onFragParsingUserdata, this), t.off(s.Events.FRAG_DECRYPTED, this.onFragDecrypted, this), t.off(s.Events.INIT_PTS_FOUND, this.onInitPtsFound, this), t.off(s.Events.SUBTITLE_TRACKS_CLEARED, this.onSubtitleTracksCleared, this), t.off(s.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), this.hls = this.config = this.cea608Parser1 = this.cea608Parser2 = null
                    }, e.addCues = function(t, e, r, i, n) {
                        for (var a, o, l, u, d = !1, h = n.length; h--;) {
                            var c = n[h],
                                f = (a = c[0], o = c[1], l = e, u = r, Math.min(o, u) - Math.max(a, l));
                            if (f >= 0 && (c[0] = Math.min(c[0], e), c[1] = Math.max(c[1], r), d = !0, f / (r - e) > .5)) return
                        }
                        if (d || n.push([e, r]), this.config.renderTextTracksNatively) {
                            var g = this.captionsTracks[t];
                            this.Cues.newCue(g, e, r, i)
                        } else {
                            var v = this.Cues.newCue(null, e, r, i);
                            this.hls.trigger(s.Events.CUES_PARSED, { type: "captions", cues: v, track: t })
                        }
                    }, e.onInitPtsFound = function(t, e) {
                        var r = this,
                            i = e.frag,
                            n = e.id,
                            a = e.initPTS,
                            o = e.timescale,
                            l = this.unparsedVttFrags;
                        "main" === n && (this.initPTS[i.cc] = a, this.timescale[i.cc] = o), l.length && (this.unparsedVttFrags = [], l.forEach((function(t) { r.onFragLoaded(s.Events.FRAG_LOADED, t) })))
                    }, e.getExistingTrack = function(t) {
                        var e = this.media;
                        if (e)
                            for (var r = 0; r < e.textTracks.length; r++) { var i = e.textTracks[r]; if (i[t]) return i }
                        return null
                    }, e.createCaptionsTrack = function(t) { this.config.renderTextTracksNatively ? this.createNativeTrack(t) : this.createNonNativeTrack(t) }, e.createNativeTrack = function(t) {
                        if (!this.captionsTracks[t]) {
                            var e = this.captionsProperties,
                                r = this.captionsTracks,
                                i = this.media,
                                n = e[t],
                                a = n.label,
                                s = n.languageCode,
                                o = this.getExistingTrack(t);
                            if (o) r[t] = o, z(r[t]), q(r[t], i);
                            else {
                                var l = this.createTextTrack("captions", a, s);
                                l && (l[t] = !0, r[t] = l)
                            }
                        }
                    }, e.createNonNativeTrack = function(t) {
                        if (!this.nonNativeCaptionsTracks[t]) {
                            var e = this.captionsProperties[t];
                            if (e) {
                                var r = { _id: t, label: e.label, kind: "captions", default: !!e.media && !!e.media.default, closedCaptions: e.media };
                                this.nonNativeCaptionsTracks[t] = r, this.hls.trigger(s.Events.NON_NATIVE_TEXT_TRACKS_FOUND, { tracks: [r] })
                            }
                        }
                    }, e.createTextTrack = function(t, e, r) { var i = this.media; if (i) return i.addTextTrack(t, e, r) }, e.onMediaAttaching = function(t, e) { this.media = e.media, this._cleanTracks() }, e.onMediaDetaching = function() {
                        var t = this.captionsTracks;
                        Object.keys(t).forEach((function(e) { z(t[e]), delete t[e] })), this.nonNativeCaptionsTracks = {}
                    }, e.onManifestLoading = function() { this.lastSn = -1, this.lastPartIndex = -1, this.prevCC = -1, this.vttCCs = { ccOffset: 0, presentationOffset: 0, 0: { start: 0, prevCC: -1, new: !0 } }, this._cleanTracks(), this.tracks = [], this.captionsTracks = {}, this.nonNativeCaptionsTracks = {}, this.textTracks = [], this.unparsedVttFrags = this.unparsedVttFrags || [], this.initPTS = [], this.timescale = [], this.cea608Parser1 && this.cea608Parser2 && (this.cea608Parser1.reset(), this.cea608Parser2.reset()) }, e._cleanTracks = function() {
                        var t = this.media;
                        if (t) {
                            var e = t.textTracks;
                            if (e)
                                for (var r = 0; r < e.length; r++) z(e[r])
                        }
                    }, e.onSubtitleTracksUpdated = function(t, e) {
                        var r = this;
                        this.textTracks = [];
                        var i = e.subtitleTracks || [],
                            n = i.some((function(t) { return t.textCodec === Ur }));
                        if (this.config.enableWebVTT || n && this.config.enableIMSC1) {
                            var a = this.tracks && i && this.tracks.length === i.length;
                            if (this.tracks = i || [], this.config.renderTextTracksNatively) {
                                var o = this.media ? this.media.textTracks : [];
                                this.tracks.forEach((function(t, e) {
                                    var i;
                                    if (e < o.length) {
                                        for (var n = null, a = 0; a < o.length; a++)
                                            if (Qr(o[a], t)) { n = o[a]; break }
                                        n && (i = n)
                                    }
                                    if (i) z(i);
                                    else {
                                        var s = r._captionsOrSubtitlesFromCharacteristics(t);
                                        (i = r.createTextTrack(s, t.name, t.lang)) && (i.mode = "disabled")
                                    }
                                    i && (i.groupId = t.groupId, r.textTracks.push(i))
                                }))
                            } else if (!a && this.tracks && this.tracks.length) {
                                var l = this.tracks.map((function(t) { return { label: t.name, kind: t.type.toLowerCase(), default: t.default, subtitleTrack: t } }));
                                this.hls.trigger(s.Events.NON_NATIVE_TEXT_TRACKS_FOUND, { tracks: l })
                            }
                        }
                    }, e._captionsOrSubtitlesFromCharacteristics = function(t) {
                        var e;
                        if (null !== (e = t.attrs) && void 0 !== e && e.CHARACTERISTICS) {
                            var r = /transcribes-spoken-dialog/gi.test(t.attrs.CHARACTERISTICS),
                                i = /describes-music-and-sound/gi.test(t.attrs.CHARACTERISTICS);
                            if (r && i) return "captions"
                        }
                        return "subtitles"
                    }, e.onManifestLoaded = function(t, e) {
                        var r = this;
                        this.config.enableCEA708Captions && e.captions && e.captions.forEach((function(t) {
                            var e = /(?:CC|SERVICE)([1-4])/.exec(t.instreamId);
                            if (e) {
                                var i = "textTrack" + e[1],
                                    n = r.captionsProperties[i];
                                n && (n.label = t.name, t.lang && (n.languageCode = t.lang), n.media = t)
                            }
                        }))
                    }, e.closedCaptionsForLevel = function(t) { var e = this.hls.levels[t.level]; return null == e ? void 0 : e.attrs["CLOSED-CAPTIONS"] }, e.onFragLoading = function(t, e) {
                        var r = this.cea608Parser1,
                            i = this.cea608Parser2,
                            n = this.lastSn,
                            a = this.lastPartIndex;
                        if (this.enabled && r && i && e.frag.type === V.PlaylistLevelType.MAIN) {
                            var s, o, l = e.frag.sn,
                                u = null != (s = null == e || null === (o = e.part) || void 0 === o ? void 0 : o.index) ? s : -1;
                            l === n + 1 || l === n && u === a + 1 || (r.reset(), i.reset()), this.lastSn = l, this.lastPartIndex = u
                        }
                    }, e.onFragLoaded = function(t, e) {
                        var r = e.frag,
                            i = e.payload,
                            n = this.initPTS,
                            o = this.unparsedVttFrags;
                        if (r.type === V.PlaylistLevelType.SUBTITLE)
                            if (i.byteLength) {
                                if (!(0, a.isFiniteNumber)(n[r.cc])) return o.push(e), void(n.length && this.hls.trigger(s.Events.SUBTITLE_FRAG_PROCESSED, { success: !1, frag: r, error: new Error("Missing initial subtitle PTS") }));
                                var l = r.decryptdata,
                                    u = "stats" in e;
                                if (null == l || !l.encrypted || u) {
                                    var d = this.tracks[r.level],
                                        h = this.vttCCs;
                                    h[r.cc] || (h[r.cc] = { start: r.start, prevCC: this.prevCC, new: !0 }, this.prevCC = r.cc), d && d.textCodec === Ur ? this._parseIMSC1(r, i) : this._parseVTTs(r, i, h)
                                }
                            } else this.hls.trigger(s.Events.SUBTITLE_FRAG_PROCESSED, { success: !1, frag: r, error: new Error("Empty subtitle payload") })
                    }, e._parseIMSC1 = function(t, e) {
                        var r = this,
                            i = this.hls;
                        Hr(e, this.initPTS[t.cc], this.timescale[t.cc], (function(e) { r._appendCues(e, t.level), i.trigger(s.Events.SUBTITLE_FRAG_PROCESSED, { success: !0, frag: t }) }), (function(e) { l.logger.log("Failed to parse IMSC1: " + e), i.trigger(s.Events.SUBTITLE_FRAG_PROCESSED, { success: !1, frag: t, error: e }) }))
                    }, e._parseVTTs = function(t, e, r) {
                        var i, n = this,
                            o = this.hls;
                        ! function(t, e, r, i, n, s, o, l) {
                            var u, d = new Cr,
                                h = (0, $.utf8ArrayToStr)(new Uint8Array(t)).trim().replace(Or, "\n").split("\n"),
                                c = [],
                                f = (0, _r.toMpegTsClockFromTimescale)(e, r),
                                g = "00:00.000",
                                v = 0,
                                p = 0,
                                m = !0;
                            d.oncue = function(t) {
                                var e = i[n],
                                    r = i.ccOffset,
                                    a = (v - f) / 9e4;
                                null != e && e.new && (void 0 !== p ? r = i.ccOffset = e.start : function(t, e, r) {
                                    var i = t[e],
                                        n = t[i.prevCC];
                                    if (!n || !n.new && i.new) return t.ccOffset = t.presentationOffset = i.start, void(i.new = !1);
                                    for (; null !== (a = n) && void 0 !== a && a.new;) {
                                        var a;
                                        t.ccOffset += i.start - n.start, i.new = !1, n = t[(i = n).prevCC]
                                    }
                                    t.presentationOffset = r
                                }(i, n, a)), a && (r = a - i.presentationOffset);
                                var o = t.endTime - t.startTime,
                                    l = (0, Pr.normalizePts)(9e4 * (t.startTime + r - p), 9e4 * s) / 9e4;
                                t.startTime = Math.max(l, 0), t.endTime = Math.max(l + o, 0);
                                var u = t.text.trim();
                                t.text = decodeURIComponent(encodeURIComponent(u)), t.id || (t.id = Mr(t.startTime, t.endTime, u)), t.endTime > 0 && c.push(t)
                            }, d.onparsingerror = function(t) { u = t }, d.onflush = function() { u ? l(u) : o(c) }, h.forEach((function(t) {
                                if (m) {
                                    if (xr(t, "X-TIMESTAMP-MAP=")) {
                                        m = !1, t.slice(16).split(",").forEach((function(t) { xr(t, "LOCAL:") ? g = t.slice(6) : xr(t, "MPEGTS:") && (v = parseInt(t.slice(7))) }));
                                        try {
                                            p = function(t) {
                                                var e = parseInt(t.slice(-3)),
                                                    r = parseInt(t.slice(-6, -4)),
                                                    i = parseInt(t.slice(-9, -7)),
                                                    n = t.length > 9 ? parseInt(t.substring(0, t.indexOf(":"))) : 0;
                                                if (!((0, a.isFiniteNumber)(e) && (0, a.isFiniteNumber)(r) && (0, a.isFiniteNumber)(i) && (0, a.isFiniteNumber)(n))) throw Error("Malformed X-TIMESTAMP-MAP: Local:" + t);
                                                return e += 1e3 * r, (e += 6e4 * i) + 36e5 * n
                                            }(g) / 1e3
                                        } catch (t) { u = t }
                                        return
                                    }
                                    "" === t && (m = !1)
                                }
                                d.parse(t + "\n")
                            })), d.flush()
                        }(null !== (i = t.initSegment) && void 0 !== i && i.data ? (0, R.appendUint8Array)(t.initSegment.data, new Uint8Array(e)) : e, this.initPTS[t.cc], this.timescale[t.cc], r, t.cc, t.start, (function(e) { n._appendCues(e, t.level), o.trigger(s.Events.SUBTITLE_FRAG_PROCESSED, { success: !0, frag: t }) }), (function(r) { n._fallbackToIMSC1(t, e), l.logger.log("Failed to parse VTT cue: " + r), o.trigger(s.Events.SUBTITLE_FRAG_PROCESSED, { success: !1, frag: t, error: r }) }))
                    }, e._fallbackToIMSC1 = function(t, e) {
                        var r = this,
                            i = this.tracks[t.level];
                        i.textCodec || Hr(e, this.initPTS[t.cc], this.timescale[t.cc], (function() { i.textCodec = Ur, r._parseIMSC1(t, e) }), (function() { i.textCodec = "wvtt" }))
                    }, e._appendCues = function(t, e) {
                        var r = this.hls;
                        if (this.config.renderTextTracksNatively) {
                            var i = this.textTracks[e];
                            if (!i || "disabled" === i.mode) return;
                            t.forEach((function(t) { return X(i, t) }))
                        } else {
                            var n = this.tracks[e];
                            if (!n) return;
                            var a = n.default ? "default" : "subtitles" + e;
                            r.trigger(s.Events.CUES_PARSED, { type: "subtitles", cues: t, track: a })
                        }
                    }, e.onFragDecrypted = function(t, e) {
                        var r = e.frag;
                        if (r.type === V.PlaylistLevelType.SUBTITLE) {
                            if (!(0, a.isFiniteNumber)(this.initPTS[r.cc])) return void this.unparsedVttFrags.push(e);
                            this.onFragLoaded(s.Events.FRAG_LOADED, e)
                        }
                    }, e.onSubtitleTracksCleared = function() { this.tracks = [], this.captionsTracks = {} }, e.onFragParsingUserdata = function(t, e) {
                        var r = this.cea608Parser1,
                            i = this.cea608Parser2;
                        if (this.enabled && r && i) {
                            var n = e.frag,
                                a = e.samples;
                            if (n.type !== V.PlaylistLevelType.MAIN || "NONE" !== this.closedCaptionsForLevel(n))
                                for (var s = 0; s < a.length; s++) {
                                    var o = a[s].bytes;
                                    if (o) {
                                        var l = this.extractCea608Data(o);
                                        r.addData(a[s].pts, l[0]), i.addData(a[s].pts, l[1])
                                    }
                                }
                        }
                    }, e.onBufferFlushing = function(t, e) {
                        var r = e.startOffset,
                            i = e.endOffset,
                            n = e.endOffsetSubtitles,
                            a = e.type,
                            s = this.media;
                        if (s && !(s.currentTime < i)) {
                            if (!a || "video" === a) {
                                var o = this.captionsTracks;
                                Object.keys(o).forEach((function(t) { return Q(o[t], r, i) }))
                            }
                            if (this.config.renderTextTracksNatively && 0 === r && void 0 !== n) {
                                var l = this.textTracks;
                                Object.keys(l).forEach((function(t) { return Q(l[t], r, n) }))
                            }
                        }
                    }, e.extractCea608Data = function(t) {
                        for (var e = [
                                [],
                                []
                            ], r = 31 & t[0], i = 2, n = 0; n < r; n++) {
                            var a = t[i++],
                                s = 127 & t[i++],
                                o = 127 & t[i++];
                            if ((0 !== s || 0 !== o) && 0 != (4 & a)) {
                                var l = 3 & a;
                                0 !== l && 1 !== l || (e[l].push(s), e[l].push(o))
                            }
                        }
                        return e
                    }, t
                }();

                function Qr(t, e) { return t && t.label === e.name && !(t.textTrack1 || t.textTrack2) }

                function $r(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var i = e[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, (void 0, "symbol" == typeof(n = function(t, e) { if ("object" != typeof t || null === t) return t; var r = t[Symbol.toPrimitive]; if (void 0 !== r) { var i = r.call(t, e); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value.") } return String(t) }(i.key, "string")) ? n : String(n)), i)
                    }
                    var n
                }
                const Jr = function() {
                        function t(t) { this.autoLevelCapping = void 0, this.firstLevel = void 0, this.media = void 0, this.restrictedLevels = void 0, this.timer = void 0, this.hls = void 0, this.streamController = void 0, this.clientRect = void 0, this.hls = t, this.autoLevelCapping = Number.POSITIVE_INFINITY, this.firstLevel = -1, this.media = null, this.restrictedLevels = [], this.timer = void 0, this.clientRect = null, this.registerListeners() }
                        var e, r, i = t.prototype;
                        return i.setStreamController = function(t) { this.streamController = t }, i.destroy = function() { this.unregisterListener(), this.hls.config.capLevelToPlayerSize && this.stopCapping(), this.media = null, this.clientRect = null, this.hls = this.streamController = null }, i.registerListeners = function() {
                            var t = this.hls;
                            t.on(s.Events.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this), t.on(s.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), t.on(s.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.on(s.Events.BUFFER_CODECS, this.onBufferCodecs, this), t.on(s.Events.MEDIA_DETACHING, this.onMediaDetaching, this)
                        }, i.unregisterListener = function() {
                            var t = this.hls;
                            t.off(s.Events.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this), t.off(s.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), t.off(s.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.off(s.Events.BUFFER_CODECS, this.onBufferCodecs, this), t.off(s.Events.MEDIA_DETACHING, this.onMediaDetaching, this)
                        }, i.onFpsDropLevelCapping = function(e, r) { t.isLevelAllowed(r.droppedLevel, this.restrictedLevels) && this.restrictedLevels.push(r.droppedLevel) }, i.onMediaAttaching = function(t, e) { this.media = e.media instanceof HTMLVideoElement ? e.media : null, this.clientRect = null }, i.onManifestParsed = function(t, e) {
                            var r = this.hls;
                            this.restrictedLevels = [], this.firstLevel = e.firstLevel, r.config.capLevelToPlayerSize && e.video && this.startCapping()
                        }, i.onBufferCodecs = function(t, e) { this.hls.config.capLevelToPlayerSize && e.video && this.startCapping() }, i.onMediaDetaching = function() { this.stopCapping() }, i.detectPlayerSize = function() {
                            if (this.media && this.mediaHeight > 0 && this.mediaWidth > 0) {
                                var t = this.hls.levels;
                                if (t.length) {
                                    var e = this.hls;
                                    e.autoLevelCapping = this.getMaxLevel(t.length - 1), e.autoLevelCapping > this.autoLevelCapping && this.streamController && this.streamController.nextLevelSwitch(), this.autoLevelCapping = e.autoLevelCapping
                                }
                            }
                        }, i.getMaxLevel = function(e) {
                            var r = this,
                                i = this.hls.levels;
                            if (!i.length) return -1;
                            var n = i.filter((function(i, n) { return t.isLevelAllowed(n, r.restrictedLevels) && n <= e }));
                            return this.clientRect = null, t.getMaxLevelByMediaSize(n, this.mediaWidth, this.mediaHeight)
                        }, i.startCapping = function() { this.timer || (this.autoLevelCapping = Number.POSITIVE_INFINITY, this.hls.firstLevel = this.getMaxLevel(this.firstLevel), self.clearInterval(this.timer), this.timer = self.setInterval(this.detectPlayerSize.bind(this), 1e3), this.detectPlayerSize()) }, i.stopCapping = function() { this.restrictedLevels = [], this.firstLevel = -1, this.autoLevelCapping = Number.POSITIVE_INFINITY, this.timer && (self.clearInterval(this.timer), this.timer = void 0) }, i.getDimensions = function() {
                            if (this.clientRect) return this.clientRect;
                            var t = this.media,
                                e = { width: 0, height: 0 };
                            if (t) {
                                var r = t.getBoundingClientRect();
                                e.width = r.width, e.height = r.height, e.width || e.height || (e.width = r.right - r.left || t.width || 0, e.height = r.bottom - r.top || t.height || 0)
                            }
                            return this.clientRect = e, e
                        }, t.isLevelAllowed = function(t, e) { return void 0 === e && (e = []), -1 === e.indexOf(t) }, t.getMaxLevelByMediaSize = function(t, e, r) { if (!t || !t.length) return -1; for (var i, n, a = t.length - 1, s = 0; s < t.length; s += 1) { var o = t[s]; if ((o.width >= e || o.height >= r) && (i = o, !(n = t[s + 1]) || i.width !== n.width || i.height !== n.height)) { a = s; break } } return a }, e = t, (r = [{ key: "mediaWidth", get: function() { return this.getDimensions().width * this.contentScaleFactor } }, { key: "mediaHeight", get: function() { return this.getDimensions().height * this.contentScaleFactor } }, {
                            key: "contentScaleFactor",
                            get: function() {
                                var t = 1;
                                if (!this.hls.config.ignoreDevicePixelRatio) try { t = self.devicePixelRatio } catch (t) {}
                                return t
                            }
                        }]) && $r(e.prototype, r), Object.defineProperty(e, "prototype", { writable: !1 }), t
                    }(),
                    Zr = function() {
                        function t(t) { this.hls = void 0, this.isVideoPlaybackQualityAvailable = !1, this.timer = void 0, this.media = null, this.lastTime = void 0, this.lastDroppedFrames = 0, this.lastDecodedFrames = 0, this.streamController = void 0, this.hls = t, this.registerListeners() }
                        var e = t.prototype;
                        return e.setStreamController = function(t) { this.streamController = t }, e.registerListeners = function() { this.hls.on(s.Events.MEDIA_ATTACHING, this.onMediaAttaching, this) }, e.unregisterListeners = function() { this.hls.off(s.Events.MEDIA_ATTACHING, this.onMediaAttaching) }, e.destroy = function() { this.timer && clearInterval(this.timer), this.unregisterListeners(), this.isVideoPlaybackQualityAvailable = !1, this.media = null }, e.onMediaAttaching = function(t, e) {
                            var r = this.hls.config;
                            if (r.capLevelOnFPSDrop) {
                                var i = e.media instanceof self.HTMLVideoElement ? e.media : null;
                                this.media = i, i && "function" == typeof i.getVideoPlaybackQuality && (this.isVideoPlaybackQualityAvailable = !0), self.clearInterval(this.timer), this.timer = self.setInterval(this.checkFPSInterval.bind(this), r.fpsDroppedMonitoringPeriod)
                            }
                        }, e.checkFPS = function(t, e, r) {
                            var i = performance.now();
                            if (e) {
                                if (this.lastTime) {
                                    var n = i - this.lastTime,
                                        a = r - this.lastDroppedFrames,
                                        o = e - this.lastDecodedFrames,
                                        u = 1e3 * a / n,
                                        d = this.hls;
                                    if (d.trigger(s.Events.FPS_DROP, { currentDropped: a, currentDecoded: o, totalDroppedFrames: r }), u > 0 && a > d.config.fpsDroppedMonitoringThreshold * o) {
                                        var h = d.currentLevel;
                                        l.logger.warn("drop FPS ratio greater than max allowed value for currentLevel: " + h), h > 0 && (-1 === d.autoLevelCapping || d.autoLevelCapping >= h) && (h -= 1, d.trigger(s.Events.FPS_DROP_LEVEL_CAPPING, { level: h, droppedLevel: d.currentLevel }), d.autoLevelCapping = h, this.streamController.nextLevelSwitch())
                                    }
                                }
                                this.lastTime = i, this.lastDroppedFrames = r, this.lastDecodedFrames = e
                            }
                        }, e.checkFPSInterval = function() {
                            var t = this.media;
                            if (t)
                                if (this.isVideoPlaybackQualityAvailable) {
                                    var e = t.getVideoPlaybackQuality();
                                    this.checkFPS(t, e.totalVideoFrames, e.droppedVideoFrames)
                                } else this.checkFPS(t, t.webkitDecodedFrameCount, t.webkitDroppedFrameCount)
                        }, t
                    }();
                var ti = r(300);

                function ei(t) {
                    var e = "function" == typeof Map ? new Map : void 0;
                    return ei = function(t) {
                        if (null === t || (r = t, -1 === Function.toString.call(r).indexOf("[native code]"))) return t;
                        var r;
                        if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
                        if (void 0 !== e) {
                            if (e.has(t)) return e.get(t);
                            e.set(t, i)
                        }

                        function i() { return ri(t, arguments, ai(this).constructor) }
                        return i.prototype = Object.create(t.prototype, { constructor: { value: i, enumerable: !1, writable: !0, configurable: !0 } }), ni(i, t)
                    }, ei(t)
                }

                function ri(t, e, r) {
                    return ri = ii() ? Reflect.construct.bind() : function(t, e, r) {
                        var i = [null];
                        i.push.apply(i, e);
                        var n = new(Function.bind.apply(t, i));
                        return r && ni(n, r.prototype), n
                    }, ri.apply(null, arguments)
                }

                function ii() { if ("undefined" == typeof Reflect || !Reflect.construct) return !1; if (Reflect.construct.sham) return !1; if ("function" == typeof Proxy) return !0; try { return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0 } catch (t) { return !1 } }

                function ni(t, e) { return ni = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) { return t.__proto__ = e, t }, ni(t, e) }

                function ai(t) { return ai = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) { return t.__proto__ || Object.getPrototypeOf(t) }, ai(t) }
                var si = "[eme]",
                    oi = function() {
                        function t(e) { this.hls = void 0, this.config = void 0, this.media = null, this.keyFormatPromise = null, this.keySystemAccessPromises = {}, this._requestLicenseFailureCount = 0, this.mediaKeySessions = [], this.keyIdToKeySessionPromise = {}, this.setMediaKeysQueue = t.CDMCleanupPromise ? [t.CDMCleanupPromise] : [], this.onMediaEncrypted = this._onMediaEncrypted.bind(this), this.onWaitingForKey = this._onWaitingForKey.bind(this), this.debug = l.logger.debug.bind(l.logger, si), this.log = l.logger.log.bind(l.logger, si), this.warn = l.logger.warn.bind(l.logger, si), this.error = l.logger.error.bind(l.logger, si), this.hls = e, this.config = e.config, this.registerListeners() }
                        var e = t.prototype;
                        return e.destroy = function() { this.unregisterListeners(), this.onMediaDetached(), this.hls = this.onMediaEncrypted = this.onWaitingForKey = this.keyIdToKeySessionPromise = null }, e.registerListeners = function() { this.hls.on(s.Events.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.on(s.Events.MEDIA_DETACHED, this.onMediaDetached, this), this.hls.on(s.Events.MANIFEST_LOADED, this.onManifestLoaded, this) }, e.unregisterListeners = function() { this.hls.off(s.Events.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.off(s.Events.MEDIA_DETACHED, this.onMediaDetached, this), this.hls.off(s.Events.MANIFEST_LOADED, this.onManifestLoaded, this) }, e.getLicenseServerUrl = function(t) {
                            var e = this.config,
                                r = e.drmSystems,
                                i = e.widevineLicenseUrl,
                                n = r[t];
                            if (n) return n.licenseUrl;
                            if (t === m.WIDEVINE && i) return i;
                            throw new Error('no license server URL configured for key-system "' + t + '"')
                        }, e.getServerCertificateUrl = function(t) {
                            var e = this.config.drmSystems[t];
                            if (e) return e.serverCertificateUrl;
                            this.log('No Server Certificate in config.drmSystems["' + t + '"]')
                        }, e.attemptKeySystemAccess = function(t) {
                            var e = this,
                                r = this.hls.levels,
                                i = function(t, e, r) { return !!t && r.indexOf(t) === e },
                                n = r.map((function(t) { return t.audioCodec })).filter(i),
                                a = r.map((function(t) { return t.videoCodec })).filter(i);
                            return n.length + a.length === 0 && a.push("avc1.42e01e"), new Promise((function(r, i) {
                                ! function t(s) {
                                    var l = s.shift();
                                    e.getMediaKeysPromise(l, n, a).then((function(t) { return r({ keySystem: l, mediaKeys: t }) })).catch((function(e) { s.length ? t(s) : i(e instanceof li ? e : new li({ type: o.ErrorTypes.KEY_SYSTEM_ERROR, details: o.ErrorDetails.KEY_SYSTEM_NO_ACCESS, error: e, fatal: !0 }, e.message)) }))
                                }(t)
                            }))
                        }, e.requestMediaKeySystemAccess = function(t, e) { var r = this.config.requestMediaKeySystemAccessFunc; if ("function" != typeof r) { var i = "Configured requestMediaKeySystemAccess is not a function " + r; return null === k && "http:" === self.location.protocol && (i = "navigator.requestMediaKeySystemAccess is not available over insecure protocol " + location.protocol), Promise.reject(new Error(i)) } return r(t, e) }, e.getMediaKeysPromise = function(t, e, r) {
                            var i = this,
                                n = function(t, e, r, i) {
                                    var n;
                                    switch (t) {
                                        case m.FAIRPLAY:
                                            n = ["cenc", "sinf"];
                                            break;
                                        case m.WIDEVINE:
                                        case m.PLAYREADY:
                                            n = ["cenc"];
                                            break;
                                        case m.CLEARKEY:
                                            n = ["cenc", "keyids"];
                                            break;
                                        default:
                                            throw new Error("Unknown key-system: " + t)
                                    }
                                    return function(t, e, r, i) { return [{ initDataTypes: t, persistentState: i.persistentState || "not-allowed", distinctiveIdentifier: i.distinctiveIdentifier || "not-allowed", sessionTypes: i.sessionTypes || [i.sessionType || "temporary"], audioCapabilities: e.map((function(t) { return { contentType: 'audio/mp4; codecs="' + t + '"', robustness: i.audioRobustness || "", encryptionScheme: i.audioEncryptionScheme || null } })), videoCapabilities: r.map((function(t) { return { contentType: 'video/mp4; codecs="' + t + '"', robustness: i.videoRobustness || "", encryptionScheme: i.videoEncryptionScheme || null } })) }] }(n, e, r, i)
                                }(t, e, r, this.config.drmSystemOptions),
                                a = this.keySystemAccessPromises[t],
                                s = null == a ? void 0 : a.keySystemAccess;
                            if (!s) { this.log('Requesting encrypted media "' + t + '" key-system access with config: ' + JSON.stringify(n)), s = this.requestMediaKeySystemAccess(t, n); var o = this.keySystemAccessPromises[t] = { keySystemAccess: s }; return s.catch((function(e) { i.log('Failed to obtain access to key-system "' + t + '": ' + e) })), s.then((function(e) { i.log('Access for key-system "' + e.keySystem + '" obtained'); var r = i.fetchServerCertificate(t); return i.log('Create media-keys for "' + t + '"'), o.mediaKeys = e.createMediaKeys().then((function(e) { return i.log('Media-keys created for "' + t + '"'), r.then((function(r) { return r ? i.setMediaKeysServerCertificate(e, t, r) : e })) })), o.mediaKeys.catch((function(e) { i.error('Failed to create media-keys for "' + t + '"}: ' + e) })), o.mediaKeys })) }
                            return s.then((function() { return a.mediaKeys }))
                        }, e.createMediaKeySessionContext = function(t) {
                            var e = t.decryptdata,
                                r = t.keySystem,
                                i = t.mediaKeys;
                            this.log('Creating key-system session "' + r + '" keyId: ' + ti.default.hexDump(e.keyId || []));
                            var n = i.createSession(),
                                a = { decryptdata: e, keySystem: r, mediaKeys: i, mediaKeysSession: n, keyStatus: "status-pending" };
                            return this.mediaKeySessions.push(a), a
                        }, e.renewKeySession = function(t) {
                            var e = t.decryptdata;
                            if (e.pssh) {
                                var r = this.createMediaKeySessionContext(t),
                                    i = this.getKeyIdString(e);
                                this.keyIdToKeySessionPromise[i] = this.generateRequestWithPreferredKeySession(r, "cenc", e.pssh, "expired")
                            } else this.warn("Could not renew expired session. Missing pssh initData.");
                            this.removeSession(t)
                        }, e.getKeyIdString = function(t) { if (!t) throw new Error("Could not read keyId of undefined decryptdata"); if (null === t.keyId) throw new Error("keyId is null"); return ti.default.hexDump(t.keyId) }, e.updateKeySession = function(t, e) { var r, i = t.mediaKeysSession; return this.log('Updating key-session "' + i.sessionId + '" for keyID ' + ti.default.hexDump((null === (r = t.decryptdata) || void 0 === r ? void 0 : r.keyId) || []) + "\n      } (data length: " + (e ? e.byteLength : e) + ")"), i.update(e) }, e.selectKeySystemFormat = function(t) { var e = Object.keys(t.levelkeys || {}); return this.keyFormatPromise || (this.log("Selecting key-system from fragment (sn: " + t.sn + " " + t.type + ": " + t.level + ") key formats " + e.join(", ")), this.keyFormatPromise = this.getKeyFormatPromise(e)), this.keyFormatPromise }, e.getKeyFormatPromise = function(t) {
                            var e = this;
                            return new Promise((function(r, i) {
                                var n = D(e.config),
                                    a = t.map(L).filter((function(t) { return !!t && -1 !== n.indexOf(t) }));
                                return e.getKeySystemSelectionPromise(a).then((function(t) {
                                    var e = t.keySystem,
                                        n = A(e);
                                    n ? r(n) : i(new Error('Unable to find format for key-system "' + e + '"'))
                                })).catch(i)
                            }))
                        }, e.loadKey = function(t) {
                            var e = this,
                                r = t.keyInfo.decryptdata,
                                i = this.getKeyIdString(r),
                                n = "(keyId: " + i + ' format: "' + r.keyFormat + '" method: ' + r.method + " uri: " + r.uri + ")";
                            this.log("Starting session for key " + n);
                            var a = this.keyIdToKeySessionPromise[i];
                            return a || (a = this.keyIdToKeySessionPromise[i] = this.getKeySystemForKeyPromise(r).then((function(i) {
                                var a = i.keySystem,
                                    s = i.mediaKeys;
                                return e.throwIfDestroyed(), e.log("Handle encrypted media sn: " + t.frag.sn + " " + t.frag.type + ": " + t.frag.level + " using key " + n), e.attemptSetMediaKeys(a, s).then((function() { e.throwIfDestroyed(); var t = e.createMediaKeySessionContext({ keySystem: a, mediaKeys: s, decryptdata: r }); return e.generateRequestWithPreferredKeySession(t, "cenc", r.pssh, "playlist-key") }))
                            }))).catch((function(t) { return e.handleError(t) })), a
                        }, e.throwIfDestroyed = function(t) { if (void 0 === t && (t = "Invalid state"), !this.hls) throw new Error("invalid state") }, e.handleError = function(t) { this.hls && (this.error(t.message), t instanceof li ? this.hls.trigger(s.Events.ERROR, t.data) : this.hls.trigger(s.Events.ERROR, { type: o.ErrorTypes.KEY_SYSTEM_ERROR, details: o.ErrorDetails.KEY_SYSTEM_NO_KEYS, error: t, fatal: !0 })) }, e.getKeySystemForKeyPromise = function(t) {
                            var e = this.getKeyIdString(t),
                                r = this.keyIdToKeySessionPromise[e];
                            if (!r) {
                                var i = L(t.keyFormat),
                                    n = i ? [i] : D(this.config);
                                return this.attemptKeySystemAccess(n)
                            }
                            return r
                        }, e.getKeySystemSelectionPromise = function(t) { if (t.length || (t = D(this.config)), 0 === t.length) throw new li({ type: o.ErrorTypes.KEY_SYSTEM_ERROR, details: o.ErrorDetails.KEY_SYSTEM_NO_CONFIGURED_LICENSE, fatal: !0 }, "Missing key-system license configuration options " + JSON.stringify({ drmSystems: this.config.drmSystems })); return this.attemptKeySystemAccess(t) }, e._onMediaEncrypted = function(t) {
                            var e = this,
                                r = t.initDataType,
                                i = t.initData;
                            if (this.debug('"' + t.type + '" event: init data type: "' + r + '"'), null !== i) {
                                var n, a;
                                if ("sinf" === r && this.config.drmSystems[m.FAIRPLAY]) {
                                    var s = (0, R.bin2str)(new Uint8Array(i));
                                    try {
                                        var o = S(JSON.parse(s).sinf),
                                            l = (0, R.parseSinf)(new Uint8Array(o));
                                        if (!l) return;
                                        n = l.subarray(8, 24), a = m.FAIRPLAY
                                    } catch (t) { return void this.warn('Failed to parse sinf "encrypted" event message initData') }
                                } else {
                                    var u = (0, R.parsePssh)(i);
                                    if (null === u) return;
                                    0 === u.version && u.systemId === E.WIDEVINE && u.data && (n = u.data.subarray(8, 24)), a = function(t) { if (t === E.WIDEVINE) return m.WIDEVINE }(u.systemId)
                                }
                                if (a && n) {
                                    for (var d = ti.default.hexDump(n), h = this.keyIdToKeySessionPromise, c = this.mediaKeySessions, f = h[d], g = function(t) {
                                            var a = c[t],
                                                s = a.decryptdata;
                                            if (s.pssh || !s.keyId) return "continue";
                                            var o = ti.default.hexDump(s.keyId);
                                            return d === o || -1 !== s.uri.replace(/-/g, "").indexOf(d) ? (f = h[o], delete h[o], s.pssh = new Uint8Array(i), s.keyId = n, f = h[d] = f.then((function() { return e.generateRequestWithPreferredKeySession(a, r, i, "encrypted-event-key-match") })), "break") : void 0
                                        }, v = 0; v < c.length; v++) { var p = g(v); if ("continue" !== p && "break" === p) break }
                                    f || (f = h[d] = this.getKeySystemSelectionPromise([a]).then((function(t) {
                                        var a, s = t.keySystem,
                                            o = t.mediaKeys;
                                        e.throwIfDestroyed();
                                        var l = new w("ISO-23001-7", d, null != (a = A(s)) ? a : "");
                                        return l.pssh = new Uint8Array(i), l.keyId = n, e.attemptSetMediaKeys(s, o).then((function() { e.throwIfDestroyed(); var t = e.createMediaKeySessionContext({ decryptdata: l, keySystem: s, mediaKeys: o }); return e.generateRequestWithPreferredKeySession(t, r, i, "encrypted-event-no-match") }))
                                    }))), f.catch((function(t) { return e.handleError(t) }))
                                }
                            }
                        }, e._onWaitingForKey = function(t) { this.log('"' + t.type + '" event') }, e.attemptSetMediaKeys = function(t, e) {
                            var r = this,
                                i = this.setMediaKeysQueue.slice();
                            this.log('Setting media-keys for "' + t + '"');
                            var n = Promise.all(i).then((function() { if (!r.media) throw new Error("Attempted to set mediaKeys without media element attached"); return r.media.setMediaKeys(e) }));
                            return this.setMediaKeysQueue.push(n), n.then((function() { r.log('Media-keys set for "' + t + '"'), i.push(n), r.setMediaKeysQueue = r.setMediaKeysQueue.filter((function(t) { return -1 === i.indexOf(t) })) }))
                        }, e.generateRequestWithPreferredKeySession = function(t, e, r, i) {
                            var n, a, s = this,
                                l = null === (n = this.config.drmSystems) || void 0 === n || null === (a = n[t.keySystem]) || void 0 === a ? void 0 : a.generateRequest;
                            if (l) try {
                                var u = l.call(this.hls, e, r, t);
                                if (!u) throw new Error("Invalid response from configured generateRequest filter");
                                e = u.initDataType, r = t.decryptdata.pssh = u.initData ? new Uint8Array(u.initData) : null
                            } catch (t) { var d; if (this.warn(t.message), null !== (d = this.hls) && void 0 !== d && d.config.debug) throw t }
                            if (null === r) return this.log('Skipping key-session request for "' + i + '" (no initData)'), Promise.resolve(t);
                            var h = this.getKeyIdString(t.decryptdata);
                            this.log('Generating key-session request for "' + i + '": ' + h + " (init data type: " + e + " length: " + (r ? r.byteLength : null) + ")");
                            var c = new(be());
                            t.mediaKeysSession.onmessage = function(e) {
                                var r = t.mediaKeysSession;
                                if (r) {
                                    var i = e.messageType,
                                        n = e.message;
                                    s.log('"' + i + '" message event for session "' + r.sessionId + '" message size: ' + n.byteLength), "license-request" === i || "license-renewal" === i ? s.renewLicense(t, n).catch((function(t) { s.handleError(t), c.emit("error", t) })) : "license-release" === i ? t.keySystem === m.FAIRPLAY && (s.updateKeySession(t, b("acknowledged")), s.removeSession(t)) : s.warn('unhandled media key message type "' + i + '"')
                                } else c.emit("error", new Error("invalid state"))
                            }, t.mediaKeysSession.onkeystatuseschange = function(e) {
                                if (t.mediaKeysSession) {
                                    s.onKeyStatusChange(t);
                                    var r = t.keyStatus;
                                    c.emit("keyStatus", r), "expired" === r && (s.warn(t.keySystem + " expired for key " + h), s.renewKeySession(t))
                                } else c.emit("error", new Error("invalid state"))
                            };
                            var f = new Promise((function(t, e) { c.on("error", e), c.on("keyStatus", (function(r) { r.startsWith("usable") ? t() : "output-restricted" === r ? e(new li({ type: o.ErrorTypes.KEY_SYSTEM_ERROR, details: o.ErrorDetails.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED, fatal: !1 }, "HDCP level output restricted")) : "internal-error" === r ? e(new li({ type: o.ErrorTypes.KEY_SYSTEM_ERROR, details: o.ErrorDetails.KEY_SYSTEM_STATUS_INTERNAL_ERROR, fatal: !0 }, 'key status changed to "' + r + '"')) : "expired" === r ? e(new Error("key expired while generating request")) : s.warn('unhandled key status change "' + r + '"') })) }));
                            return t.mediaKeysSession.generateRequest(e, r).then((function() {
                                var e;
                                s.log('Request generated for key-session "' + (null === (e = t.mediaKeysSession) || void 0 === e ? void 0 : e.sessionId) + '" keyId: ' + h)
                            })).catch((function(t) { throw new li({ type: o.ErrorTypes.KEY_SYSTEM_ERROR, details: o.ErrorDetails.KEY_SYSTEM_NO_SESSION, error: t, fatal: !1 }, "Error generating key-session request: " + t) })).then((function() { return f })).catch((function(e) { throw c.removeAllListeners(), s.removeSession(t), e })).then((function() { return c.removeAllListeners(), t }))
                        }, e.onKeyStatusChange = function(t) {
                            var e = this;
                            t.mediaKeysSession.keyStatuses.forEach((function(r, i) { e.log('key status change "' + r + '" for keyStatuses keyId: ' + ti.default.hexDump("buffer" in i ? new Uint8Array(i.buffer, i.byteOffset, i.byteLength) : new Uint8Array(i)) + " session keyId: " + ti.default.hexDump(new Uint8Array(t.decryptdata.keyId || [])) + " uri: " + t.decryptdata.uri), t.keyStatus = r }))
                        }, e.fetchServerCertificate = function(t) {
                            var e = this;
                            return new Promise((function(r, i) {
                                var n = e.getServerCertificateUrl(t);
                                if (!n) return r();
                                e.log('Fetching serverCertificate for "' + t + '"');
                                var a = new XMLHttpRequest;
                                a.open("GET", n, !0), a.responseType = "arraybuffer", a.onreadystatechange = function() { a.readyState === XMLHttpRequest.DONE && (200 === a.status ? r(a.response) : i(new li({ type: o.ErrorTypes.KEY_SYSTEM_ERROR, details: o.ErrorDetails.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED, fatal: !0, networkDetails: a }, '"' + t + '" certificate request XHR failed (' + n + "). Status: " + a.status + " (" + a.statusText + ")"))) }, a.send()
                            }))
                        }, e.setMediaKeysServerCertificate = function(t, e, r) { var i = this; return new Promise((function(n, a) { t.setServerCertificate(r).then((function(a) { i.log("setServerCertificate " + (a ? "success" : "not supported by CDM") + " (" + (null == r ? void 0 : r.byteLength) + ') on "' + e + '"'), n(t) })).catch((function(t) { a(new li({ type: o.ErrorTypes.KEY_SYSTEM_ERROR, details: o.ErrorDetails.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED, error: t, fatal: !0 }, t.message)) })) })) }, e.renewLicense = function(t, e) { var r = this; return this.requestLicense(t, new Uint8Array(e)).then((function(e) { return r.updateKeySession(t, new Uint8Array(e)).catch((function(t) { throw new li({ type: o.ErrorTypes.KEY_SYSTEM_ERROR, details: o.ErrorDetails.KEY_SYSTEM_SESSION_UPDATE_FAILED, error: t, fatal: !0 }, t.message) })) })) }, e.setupLicenseXHR = function(t, e, r, i) {
                            var n = this,
                                a = this.config.licenseXhrSetup;
                            return a ? Promise.resolve().then((function() { if (!r.decryptdata) throw new Error("Key removed"); return a.call(n.hls, t, e, r, i) })).catch((function(s) { if (!r.decryptdata) throw s; return t.open("POST", e, !0), a.call(n.hls, t, e, r, i) })).then((function(r) { return t.readyState || t.open("POST", e, !0), { xhr: t, licenseChallenge: r || i } })) : (t.open("POST", e, !0), Promise.resolve({ xhr: t, licenseChallenge: i }))
                        }, e.requestLicense = function(t, e) {
                            var r = this;
                            return new Promise((function(i, n) {
                                var a = r.getLicenseServerUrl(t.keySystem);
                                r.log("Sending license request to URL: " + a);
                                var s = new XMLHttpRequest;
                                s.responseType = "arraybuffer", s.onreadystatechange = function() {
                                    if (!r.hls || !t.mediaKeysSession) return n(new Error("invalid state"));
                                    if (4 === s.readyState)
                                        if (200 === s.status) {
                                            r._requestLicenseFailureCount = 0;
                                            var l = s.response;
                                            r.log("License received " + (l instanceof ArrayBuffer ? l.byteLength : l));
                                            var u = r.config.licenseResponseCallback;
                                            if (u) try { l = u.call(r.hls, s, a, t) } catch (t) { r.error(t) }
                                            i(l)
                                        } else if (r._requestLicenseFailureCount++, r._requestLicenseFailureCount > 3 || s.status >= 400 && s.status < 500) n(new li({ type: o.ErrorTypes.KEY_SYSTEM_ERROR, details: o.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED, fatal: !0, networkDetails: s }, "License Request XHR failed (" + a + "). Status: " + s.status + " (" + s.statusText + ")"));
                                    else {
                                        var d = 3 - r._requestLicenseFailureCount + 1;
                                        r.warn("Retrying license request, " + d + " attempts left"), r.requestLicense(t, e).then(i, n)
                                    }
                                }, t.licenseXhr && t.licenseXhr.readyState !== XMLHttpRequest.DONE && t.licenseXhr.abort(), t.licenseXhr = s, r.setupLicenseXHR(s, a, t, e).then((function(t) {
                                    var e = t.xhr,
                                        r = t.licenseChallenge;
                                    e.send(r)
                                }))
                            }))
                        }, e.onMediaAttached = function(t, e) {
                            if (this.config.emeEnabled) {
                                var r = e.media;
                                this.media = r, r.addEventListener("encrypted", this.onMediaEncrypted), r.addEventListener("waitingforkey", this.onWaitingForKey)
                            }
                        }, e.onMediaDetached = function() {
                            var e = this,
                                r = this.media,
                                i = this.mediaKeySessions;
                            r && (r.removeEventListener("encrypted", this.onMediaEncrypted), r.removeEventListener("waitingforkey", this.onWaitingForKey), this.media = null), this._requestLicenseFailureCount = 0, this.setMediaKeysQueue = [], this.mediaKeySessions = [], this.keyIdToKeySessionPromise = {}, w.clearKeyUriToKeyIdMap();
                            var n = i.length;
                            t.CDMCleanupPromise = Promise.all(i.map((function(t) { return e.removeSession(t) })).concat(null == r ? void 0 : r.setMediaKeys(null).catch((function(t) { e.log("Could not clear media keys: " + t + ". media.src: " + (null == r ? void 0 : r.src)) })))).then((function() { n && (e.log("finished closing key sessions and clearing media keys"), i.length = 0) })).catch((function(t) { e.log("Could not close sessions and clear media keys: " + t + ". media.src: " + (null == r ? void 0 : r.src)) }))
                        }, e.onManifestLoaded = function(t, e) {
                            var r = e.sessionKeys;
                            if (r && this.config.emeEnabled && !this.keyFormatPromise) {
                                var i = r.reduce((function(t, e) { return -1 === t.indexOf(e.keyFormat) && t.push(e.keyFormat), t }), []);
                                this.log("Selecting key-system from session-keys " + i.join(", ")), this.keyFormatPromise = this.getKeyFormatPromise(i)
                            }
                        }, e.removeSession = function(t) {
                            var e = this,
                                r = t.mediaKeysSession,
                                i = t.licenseXhr;
                            if (r) { this.log("Remove licenses and keys and close session " + r.sessionId), r.onmessage = null, r.onkeystatuseschange = null, i && i.readyState !== XMLHttpRequest.DONE && i.abort(), t.mediaKeysSession = t.decryptdata = t.licenseXhr = void 0; var n = this.mediaKeySessions.indexOf(t); return n > -1 && this.mediaKeySessions.splice(n, 1), r.remove().catch((function(t) { e.log("Could not remove session: " + t) })).then((function() { return r.close() })).catch((function(t) { e.log("Could not close session: " + t) })) }
                        }, t
                    }();
                oi.CDMCleanupPromise = void 0;
                var li = function(t) {
                    var e, r;

                    function i(e, r) { var i; return (i = t.call(this, r) || this).data = void 0, i.data = e, e.err = e.error, i }
                    return r = t, (e = i).prototype = Object.create(r.prototype), e.prototype.constructor = e, ni(e, r), i
                }(ei(Error));
                const ui = oi;
                var di, hi, ci;

                function fi(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var i = e[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, (void 0, "symbol" == typeof(n = function(t, e) { if ("object" != typeof t || null === t) return t; var r = t[Symbol.toPrimitive]; if (void 0 !== r) { var i = r.call(t, e); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value.") } return String(t) }(i.key, "string")) ? n : String(n)), i)
                    }
                    var n
                }

                function gi(t, e, r) { return e && fi(t.prototype, e), r && fi(t, r), Object.defineProperty(t, "prototype", { writable: !1 }), t }

                function vi(t, e) { var r = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"]; if (r) return (r = r.call(t)).next.bind(r); if (Array.isArray(t) || (r = function(t, e) { if (t) { if ("string" == typeof t) return pi(t, e); var r = Object.prototype.toString.call(t).slice(8, -1); return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? pi(t, e) : void 0 } }(t)) || e && t && "number" == typeof t.length) { r && (t = r); var i = 0; return function() { return i >= t.length ? { done: !0 } : { done: !1, value: t[i++] } } } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") }

                function pi(t, e) {
                    (null == e || e > t.length) && (e = t.length);
                    for (var r = 0, i = new Array(e); r < e; r++) i[r] = t[r];
                    return i
                }

                function mi() { return mi = Object.assign ? Object.assign.bind() : function(t) { for (var e = 1; e < arguments.length; e++) { var r = arguments[e]; for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]) } return t }, mi.apply(this, arguments) }! function(t) { t.MANIFEST = "m", t.AUDIO = "a", t.VIDEO = "v", t.MUXED = "av", t.INIT = "i", t.CAPTION = "c", t.TIMED_TEXT = "tt", t.KEY = "k", t.OTHER = "o" }(di || (di = {})),
                function(t) { t.DASH = "d", t.HLS = "h", t.SMOOTH = "s", t.OTHER = "o" }(hi || (hi = {})),
                function(t) { t.VOD = "v", t.LIVE = "l" }(ci || (ci = {}));
                var yi = function() {
                        function t(e) {
                            var r = this;
                            this.hls = void 0, this.config = void 0, this.media = void 0, this.sid = void 0, this.cid = void 0, this.useHeaders = !1, this.initialized = !1, this.starved = !1, this.buffering = !0, this.audioBuffer = void 0, this.videoBuffer = void 0, this.onWaiting = function() { r.initialized && (r.starved = !0), r.buffering = !0 }, this.onPlaying = function() { r.initialized || (r.initialized = !0), r.buffering = !1 }, this.applyPlaylistData = function(t) { try { r.apply(t, { ot: di.MANIFEST, su: !r.initialized }) } catch (t) { l.logger.warn("Could not generate manifest CMCD data.", t) } }, this.applyFragmentData = function(t) {
                                try {
                                    var e = t.frag,
                                        i = r.hls.levels[e.level],
                                        n = r.getObjectType(e),
                                        a = { d: 1e3 * e.duration, ot: n };
                                    n !== di.VIDEO && n !== di.AUDIO && n != di.MUXED || (a.br = i.bitrate / 1e3, a.tb = r.getTopBandwidth(n) / 1e3, a.bl = r.getBufferLength(n)), r.apply(t, a)
                                } catch (t) { l.logger.warn("Could not generate segment CMCD data.", t) }
                            }, this.hls = e;
                            var i = this.config = e.config,
                                n = i.cmcd;
                            null != n && (i.pLoader = this.createPlaylistLoader(), i.fLoader = this.createFragmentLoader(), this.sid = n.sessionId || t.uuid(), this.cid = n.contentId, this.useHeaders = !0 === n.useHeaders, this.registerListeners())
                        }
                        var e = t.prototype;
                        return e.registerListeners = function() {
                            var t = this.hls;
                            t.on(s.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.on(s.Events.MEDIA_DETACHED, this.onMediaDetached, this), t.on(s.Events.BUFFER_CREATED, this.onBufferCreated, this)
                        }, e.unregisterListeners = function() {
                            var t = this.hls;
                            t.off(s.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.off(s.Events.MEDIA_DETACHED, this.onMediaDetached, this), t.off(s.Events.BUFFER_CREATED, this.onBufferCreated, this), this.onMediaDetached()
                        }, e.destroy = function() { this.unregisterListeners(), this.hls = this.config = this.audioBuffer = this.videoBuffer = null }, e.onMediaAttached = function(t, e) { this.media = e.media, this.media.addEventListener("waiting", this.onWaiting), this.media.addEventListener("playing", this.onPlaying) }, e.onMediaDetached = function() { this.media && (this.media.removeEventListener("waiting", this.onWaiting), this.media.removeEventListener("playing", this.onPlaying), this.media = null) }, e.onBufferCreated = function(t, e) {
                            var r, i;
                            this.audioBuffer = null === (r = e.tracks.audio) || void 0 === r ? void 0 : r.buffer, this.videoBuffer = null === (i = e.tracks.video) || void 0 === i ? void 0 : i.buffer
                        }, e.createData = function() { var t; return { v: 1, sf: hi.HLS, sid: this.sid, cid: this.cid, pr: null === (t = this.media) || void 0 === t ? void 0 : t.playbackRate, mtp: this.hls.bandwidthEstimate / 1e3 } }, e.apply = function(e, r) {
                            void 0 === r && (r = {}), mi(r, this.createData());
                            var i = r.ot === di.INIT || r.ot === di.VIDEO || r.ot === di.MUXED;
                            if (this.starved && i && (r.bs = !0, r.su = !0, this.starved = !1), null == r.su && (r.su = this.buffering), this.useHeaders) {
                                var n = t.toHeaders(r);
                                if (!Object.keys(n).length) return;
                                e.headers || (e.headers = {}), mi(e.headers, n)
                            } else {
                                var a = t.toQuery(r);
                                if (!a) return;
                                e.url = t.appendQueryToUri(e.url, a)
                            }
                        }, e.getObjectType = function(t) { var e = t.type; return "subtitle" === e ? di.TIMED_TEXT : "initSegment" === t.sn ? di.INIT : "audio" === e ? di.AUDIO : "main" === e ? this.hls.audioTracks.length ? di.VIDEO : di.MUXED : void 0 }, e.getTopBandwidth = function(t) {
                            var e, r = 0,
                                i = this.hls;
                            if (t === di.AUDIO) e = i.audioTracks;
                            else {
                                var n = i.maxAutoLevel,
                                    a = n > -1 ? n + 1 : i.levels.length;
                                e = i.levels.slice(0, a)
                            }
                            for (var s, o = vi(e); !(s = o()).done;) {
                                var l = s.value;
                                l.bitrate > r && (r = l.bitrate)
                            }
                            return r > 0 ? r : NaN
                        }, e.getBufferLength = function(t) {
                            var e = this.hls.media,
                                r = t === di.AUDIO ? this.audioBuffer : this.videoBuffer;
                            return r && e ? 1e3 * Bt.bufferInfo(r, e.currentTime, this.config.maxBufferHole).len : NaN
                        }, e.createPlaylistLoader = function() {
                            var t = this.config.pLoader,
                                e = this.applyPlaylistData,
                                r = t || this.config.loader;
                            return function() {
                                function t(t) { this.loader = void 0, this.loader = new r(t) }
                                var i = t.prototype;
                                return i.destroy = function() { this.loader.destroy() }, i.abort = function() { this.loader.abort() }, i.load = function(t, r, i) { e(t), this.loader.load(t, r, i) }, gi(t, [{ key: "stats", get: function() { return this.loader.stats } }, { key: "context", get: function() { return this.loader.context } }]), t
                            }()
                        }, e.createFragmentLoader = function() {
                            var t = this.config.fLoader,
                                e = this.applyFragmentData,
                                r = t || this.config.loader;
                            return function() {
                                function t(t) { this.loader = void 0, this.loader = new r(t) }
                                var i = t.prototype;
                                return i.destroy = function() { this.loader.destroy() }, i.abort = function() { this.loader.abort() }, i.load = function(t, r, i) { e(t), this.loader.load(t, r, i) }, gi(t, [{ key: "stats", get: function() { return this.loader.stats } }, { key: "context", get: function() { return this.loader.context } }]), t
                            }()
                        }, t.uuid = function() {
                            var t = URL.createObjectURL(new Blob),
                                e = t.toString();
                            return URL.revokeObjectURL(t), e.slice(e.lastIndexOf("/") + 1)
                        }, t.serialize = function(t) {
                            for (var e, r = [], i = function(t) { return !Number.isNaN(t) && null != t && "" !== t && !1 !== t }, n = function(t) { return Math.round(t) }, a = function(t) { return 100 * n(t / 100) }, s = { br: n, d: n, bl: a, dl: a, mtp: a, nor: function(t) { return encodeURIComponent(t) }, rtp: a, tb: n }, o = vi(Object.keys(t || {}).sort()); !(e = o()).done;) {
                                var l = e.value,
                                    u = t[l];
                                if (i(u) && !("v" === l && 1 === u || "pr" == l && 1 === u)) {
                                    var d = s[l];
                                    d && (u = d(u));
                                    var h, c = typeof u;
                                    h = "ot" === l || "sf" === l || "st" === l ? l + "=" + u : "boolean" === c ? l : "number" === c ? l + "=" + u : l + "=" + JSON.stringify(u), r.push(h)
                                }
                            }
                            return r.join(",")
                        }, t.toHeaders = function(e) {
                            for (var r = {}, i = ["Object", "Request", "Session", "Status"], n = [{}, {}, {}, {}], a = { br: 0, d: 0, ot: 0, tb: 0, bl: 1, dl: 1, mtp: 1, nor: 1, nrr: 1, su: 1, cid: 2, pr: 2, sf: 2, sid: 2, st: 2, v: 2, bs: 3, rtp: 3 }, s = 0, o = Object.keys(e); s < o.length; s++) {
                                var l = o[s];
                                n[null != a[l] ? a[l] : 1][l] = e[l]
                            }
                            for (var u = 0; u < n.length; u++) {
                                var d = t.serialize(n[u]);
                                d && (r["CMCD-" + i[u]] = d)
                            }
                            return r
                        }, t.toQuery = function(e) { return "CMCD=" + encodeURIComponent(t.serialize(e)) }, t.appendQueryToUri = function(t, e) { if (!e) return t; var r = t.includes("?") ? "&" : "?"; return "" + t + r + e }, t
                    }(),
                    Ei = r(408),
                    Ti = /^age:\s*[\d.]+\s*$/m;
                const Si = function() {
                    function t(t) { this.xhrSetup = void 0, this.requestTimeout = void 0, this.retryTimeout = void 0, this.retryDelay = void 0, this.config = null, this.callbacks = null, this.context = void 0, this.loader = null, this.stats = void 0, this.xhrSetup = t ? t.xhrSetup : null, this.stats = new Ei.LoadStats, this.retryDelay = 0 }
                    var e = t.prototype;
                    return e.destroy = function() { this.callbacks = null, this.abortInternal(), this.loader = null, this.config = null }, e.abortInternal = function() {
                        var t = this.loader;
                        self.clearTimeout(this.requestTimeout), self.clearTimeout(this.retryTimeout), t && (t.onreadystatechange = null, t.onprogress = null, 4 !== t.readyState && (this.stats.aborted = !0, t.abort()))
                    }, e.abort = function() {
                        var t;
                        this.abortInternal(), null !== (t = this.callbacks) && void 0 !== t && t.onAbort && this.callbacks.onAbort(this.stats, this.context, this.loader)
                    }, e.load = function(t, e, r) {
                        if (this.stats.loading.start) throw new Error("Loader can only be used once.");
                        this.stats.loading.start = self.performance.now(), this.context = t, this.config = e, this.callbacks = r, this.retryDelay = e.retryDelay, this.loadInternal()
                    }, e.loadInternal = function() {
                        var t = this.config,
                            e = this.context;
                        if (t) {
                            var r = this.loader = new self.XMLHttpRequest,
                                i = this.stats;
                            i.loading.first = 0, i.loaded = 0;
                            var n = this.xhrSetup;
                            try {
                                if (n) try { n(r, e.url) } catch (t) { r.open("GET", e.url, !0), n(r, e.url) }
                                r.readyState || r.open("GET", e.url, !0);
                                var a = this.context.headers;
                                if (a)
                                    for (var s in a) r.setRequestHeader(s, a[s])
                            } catch (t) { return void this.callbacks.onError({ code: r.status, text: t.message }, e, r) }
                            e.rangeEnd && r.setRequestHeader("Range", "bytes=" + e.rangeStart + "-" + (e.rangeEnd - 1)), r.onreadystatechange = this.readystatechange.bind(this), r.onprogress = this.loadprogress.bind(this), r.responseType = e.responseType, self.clearTimeout(this.requestTimeout), this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), t.timeout), r.send()
                        }
                    }, e.readystatechange = function() {
                        var t = this.context,
                            e = this.loader,
                            r = this.stats;
                        if (t && e) {
                            var i = e.readyState,
                                n = this.config;
                            if (!r.aborted && i >= 2)
                                if (self.clearTimeout(this.requestTimeout), 0 === r.loading.first && (r.loading.first = Math.max(self.performance.now(), r.loading.start)), 4 === i) {
                                    e.onreadystatechange = null, e.onprogress = null;
                                    var a = e.status,
                                        s = "arraybuffer" === e.responseType;
                                    if (a >= 200 && a < 300 && (s && e.response || null !== e.responseText)) {
                                        var o, u;
                                        if (r.loading.end = Math.max(self.performance.now(), r.loading.first), u = s ? (o = e.response).byteLength : (o = e.responseText).length, r.loaded = r.total = u, !this.callbacks) return;
                                        var d = this.callbacks.onProgress;
                                        if (d && d(r, t, o, e), !this.callbacks) return;
                                        var h = { url: e.responseURL, data: o };
                                        this.callbacks.onSuccess(h, r, t, e)
                                    } else r.retry >= n.maxRetry || a >= 400 && a < 499 ? (l.logger.error(a + " while loading " + t.url), this.callbacks.onError({ code: a, text: e.statusText }, t, e)) : (l.logger.warn(a + " while loading " + t.url + ", retrying in " + this.retryDelay + "..."), this.abortInternal(), this.loader = null, self.clearTimeout(this.retryTimeout), this.retryTimeout = self.setTimeout(this.loadInternal.bind(this), this.retryDelay), this.retryDelay = Math.min(2 * this.retryDelay, n.maxRetryDelay), r.retry++)
                                } else self.clearTimeout(this.requestTimeout), this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), n.timeout)
                        }
                    }, e.loadtimeout = function() {
                        l.logger.warn("timeout while loading " + this.context.url);
                        var t = this.callbacks;
                        t && (this.abortInternal(), t.onTimeout(this.stats, this.context, this.loader))
                    }, e.loadprogress = function(t) {
                        var e = this.stats;
                        e.loaded = t.loaded, t.lengthComputable && (e.total = t.total)
                    }, e.getCacheAge = function() {
                        var t = null;
                        if (this.loader && Ti.test(this.loader.getAllResponseHeaders())) {
                            var e = this.loader.getResponseHeader("age");
                            t = e ? parseFloat(e) : null
                        }
                        return t
                    }, t
                }();

                function bi(t) {
                    var e = "function" == typeof Map ? new Map : void 0;
                    return bi = function(t) {
                        if (null === t || (r = t, -1 === Function.toString.call(r).indexOf("[native code]"))) return t;
                        var r;
                        if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
                        if (void 0 !== e) {
                            if (e.has(t)) return e.get(t);
                            e.set(t, i)
                        }

                        function i() { return Li(t, arguments, ki(this).constructor) }
                        return i.prototype = Object.create(t.prototype, { constructor: { value: i, enumerable: !1, writable: !0, configurable: !0 } }), Di(i, t)
                    }, bi(t)
                }

                function Li(t, e, r) {
                    return Li = Ai() ? Reflect.construct.bind() : function(t, e, r) {
                        var i = [null];
                        i.push.apply(i, e);
                        var n = new(Function.bind.apply(t, i));
                        return r && Di(n, r.prototype), n
                    }, Li.apply(null, arguments)
                }

                function Ai() { if ("undefined" == typeof Reflect || !Reflect.construct) return !1; if (Reflect.construct.sham) return !1; if ("function" == typeof Proxy) return !0; try { return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0 } catch (t) { return !1 } }

                function Di(t, e) { return Di = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) { return t.__proto__ = e, t }, Di(t, e) }

                function ki(t) { return ki = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) { return t.__proto__ || Object.getPrototypeOf(t) }, ki(t) }

                function Ri() { return Ri = Object.assign ? Object.assign.bind() : function(t) { for (var e = 1; e < arguments.length; e++) { var r = arguments[e]; for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]) } return t }, Ri.apply(this, arguments) }
                var Ii = function() {
                    function t(t) { this.fetchSetup = void 0, this.requestTimeout = void 0, this.request = void 0, this.response = void 0, this.controller = void 0, this.context = void 0, this.config = null, this.callbacks = null, this.stats = void 0, this.loader = null, this.fetchSetup = t.fetchSetup || wi, this.controller = new self.AbortController, this.stats = new Ei.LoadStats }
                    var e = t.prototype;
                    return e.destroy = function() { this.loader = this.callbacks = null, this.abortInternal() }, e.abortInternal = function() {
                        var t = this.response;
                        t && t.ok || (this.stats.aborted = !0, this.controller.abort())
                    }, e.abort = function() {
                        var t;
                        this.abortInternal(), null !== (t = this.callbacks) && void 0 !== t && t.onAbort && this.callbacks.onAbort(this.stats, this.context, this.response)
                    }, e.load = function(t, e, r) {
                        var i = this,
                            n = this.stats;
                        if (n.loading.start) throw new Error("Loader can only be used once.");
                        n.loading.start = self.performance.now();
                        var s = function(t, e) { var r = { method: "GET", mode: "cors", credentials: "same-origin", signal: e, headers: new self.Headers(Ri({}, t.headers)) }; return t.rangeEnd && r.headers.set("Range", "bytes=" + t.rangeStart + "-" + String(t.rangeEnd - 1)), r }(t, this.controller.signal),
                            o = r.onProgress,
                            l = "arraybuffer" === t.responseType,
                            u = l ? "byteLength" : "length";
                        this.context = t, this.config = e, this.callbacks = r, this.request = this.fetchSetup(t, s), self.clearTimeout(this.requestTimeout), this.requestTimeout = self.setTimeout((function() { i.abortInternal(), r.onTimeout(n, t, i.response) }), e.timeout), self.fetch(this.request).then((function(r) {
                            if (i.response = i.loader = r, !r.ok) {
                                var s = r.status,
                                    u = r.statusText;
                                throw new Ci(u || "fetch, bad network response", s, r)
                            }
                            return n.loading.first = Math.max(self.performance.now(), n.loading.start), n.total = parseInt(r.headers.get("Content-Length") || "0"), o && (0, a.isFiniteNumber)(e.highWaterMark) ? i.loadProgressively(r, n, t, e.highWaterMark, o) : l ? r.arrayBuffer() : r.text()
                        })).then((function(s) {
                            var l = i.response;
                            self.clearTimeout(i.requestTimeout), n.loading.end = Math.max(self.performance.now(), n.loading.first);
                            var d = s[u];
                            d && (n.loaded = n.total = d);
                            var h = { url: l.url, data: s };
                            o && !(0, a.isFiniteNumber)(e.highWaterMark) && o(n, t, s, l), r.onSuccess(h, n, t, l)
                        })).catch((function(e) {
                            if (self.clearTimeout(i.requestTimeout), !n.aborted) {
                                var a = e && e.code || 0,
                                    s = e ? e.message : null;
                                r.onError({ code: a, text: s }, t, e ? e.details : null)
                            }
                        }))
                    }, e.getCacheAge = function() {
                        var t = null;
                        if (this.response) {
                            var e = this.response.headers.get("age");
                            t = e ? parseFloat(e) : null
                        }
                        return t
                    }, e.loadProgressively = function(t, e, r, i, n) {
                        void 0 === i && (i = 0);
                        var a = new Oe,
                            s = t.body.getReader();
                        return function o() {
                            return s.read().then((function(s) {
                                if (s.done) return a.dataLength && n(e, r, a.flush(), t), Promise.resolve(new ArrayBuffer(0));
                                var l = s.value,
                                    u = l.length;
                                return e.loaded += u, u < i || a.dataLength ? (a.push(l), a.dataLength >= i && n(e, r, a.flush(), t)) : n(e, r, l, t), o()
                            })).catch((function() { return Promise.reject() }))
                        }()
                    }, t
                }();

                function wi(t, e) { return new self.Request(t.url, e) }
                var Ci = function(t) {
                    var e, r;

                    function i(e, r, i) { var n; return (n = t.call(this, e) || this).code = void 0, n.details = void 0, n.code = r, n.details = i, n }
                    return r = t, (e = i).prototype = Object.create(r.prototype), e.prototype.constructor = e, Di(e, r), i
                }(bi(Error));
                const _i = Ii;
                var Pi = /\s/;

                function Oi() { return Oi = Object.assign ? Object.assign.bind() : function(t) { for (var e = 1; e < arguments.length; e++) { var r = arguments[e]; for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]) } return t }, Oi.apply(this, arguments) }

                function xi(t, e) {
                    var r = Object.keys(t);
                    if (Object.getOwnPropertySymbols) {
                        var i = Object.getOwnPropertySymbols(t);
                        e && (i = i.filter((function(e) { return Object.getOwnPropertyDescriptor(t, e).enumerable }))), r.push.apply(r, i)
                    }
                    return r
                }

                function Fi(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var r = null != arguments[e] ? arguments[e] : {};
                        e % 2 ? xi(Object(r), !0).forEach((function(e) { Mi(t, e, r[e]) })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : xi(Object(r)).forEach((function(e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e)) }))
                    }
                    return t
                }

                function Mi(t, e, r) { return (e = function(t) { var e = function(t, e) { if ("object" != typeof t || null === t) return t; var r = t[Symbol.toPrimitive]; if (void 0 !== r) { var i = r.call(t, e); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value.") } return String(t) }(t, "string"); return "symbol" == typeof e ? e : String(e) }(e)) in t ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = r, t }
                var Ni = Fi(Fi({ autoStartLoad: !0, startPosition: -1, defaultAudioCodec: void 0, debug: !1, capLevelOnFPSDrop: !1, capLevelToPlayerSize: !1, ignoreDevicePixelRatio: !1, initialLiveManifestSize: 1, maxBufferLength: 30, backBufferLength: 1 / 0, maxBufferSize: 6e7, maxBufferHole: .1, highBufferWatchdogPeriod: 2, nudgeOffset: .1, nudgeMaxRetry: 3, maxFragLookUpTolerance: .25, liveSyncDurationCount: 3, liveMaxLatencyDurationCount: 1 / 0, liveSyncDuration: void 0, liveMaxLatencyDuration: void 0, maxLiveSyncPlaybackRate: 1, liveDurationInfinity: !1, liveBackBufferLength: null, maxMaxBufferLength: 600, enableWorker: !0, enableSoftwareAES: !0, manifestLoadingTimeOut: 1e4, manifestLoadingMaxRetry: 1, manifestLoadingRetryDelay: 1e3, manifestLoadingMaxRetryTimeout: 64e3, startLevel: void 0, levelLoadingTimeOut: 1e4, levelLoadingMaxRetry: 4, levelLoadingRetryDelay: 1e3, levelLoadingMaxRetryTimeout: 64e3, fragLoadingTimeOut: 2e4, fragLoadingMaxRetry: 6, fragLoadingRetryDelay: 1e3, fragLoadingMaxRetryTimeout: 64e3, startFragPrefetch: !1, fpsDroppedMonitoringPeriod: 5e3, fpsDroppedMonitoringThreshold: .2, appendErrorMaxRetry: 3, loader: Si, fLoader: void 0, pLoader: void 0, xhrSetup: void 0, licenseXhrSetup: void 0, licenseResponseCallback: void 0, abrController: Pe, bufferController: Ze, capLevelController: Jr, fpsController: Zr, stretchShortVideoTrack: !1, maxAudioFramesDrift: 1, forceKeyFrameOnDiscontinuity: !0, abrEwmaFastLive: 3, abrEwmaSlowLive: 9, abrEwmaFastVoD: 3, abrEwmaSlowVoD: 9, abrEwmaDefaultEstimate: 5e5, abrBandWidthFactor: .95, abrBandWidthUpFactor: .7, abrMaxWithRealBitrate: !1, maxStarvationDelay: 4, maxLoadingDelay: 4, minAutoBitrate: 0, emeEnabled: !1, widevineLicenseUrl: void 0, drmSystems: {}, drmSystemOptions: {}, requestMediaKeySystemAccessFunc: k, testBandwidth: !0, progressive: !1, lowLatencyMode: !0, cmcd: void 0, enableDateRangeMetadataCues: !0, enableEmsgMetadataCues: !0, enableID3MetadataCues: !0 }, {
                    cueHandler: {
                        newCue: function(t, e, r, i) {
                            for (var n, a, s, o, l, u = [], d = self.VTTCue || self.TextTrackCue, h = 0; h < i.rows.length; h++)
                                if (s = !0, o = 0, l = "", !(n = i.rows[h]).isEmpty()) {
                                    for (var c = 0; c < n.chars.length; c++) Pi.test(n.chars[c].uchar) && s ? o++ : (l += n.chars[c].uchar, s = !1);
                                    n.cueStartTime = e, e === r && (r += 1e-4), o >= 16 ? o-- : o++;
                                    var f = wr(l.trim()),
                                        g = Mr(e, r, f);
                                    t && t.cues && t.cues.getCueById(g) || ((a = new d(e, r, f)).id = g, a.line = h + 1, a.align = "left", a.position = 10 + Math.min(80, 10 * Math.floor(8 * o / 32)), u.push(a))
                                }
                            return t && u.length && (u.sort((function(t, e) { return "auto" === t.line || "auto" === e.line ? 0 : t.line > 8 && e.line > 8 ? e.line - t.line : t.line - e.line })), u.forEach((function(e) { return X(t, e) }))), u
                        }
                    },
                    enableWebVTT: !0,
                    enableIMSC1: !0,
                    enableCEA708Captions: !0,
                    captionsTextTrack1Label: "English",
                    captionsTextTrack1LanguageCode: "en",
                    captionsTextTrack2Label: "Spanish",
                    captionsTextTrack2LanguageCode: "es",
                    captionsTextTrack3Label: "Unknown CC",
                    captionsTextTrack3LanguageCode: "",
                    captionsTextTrack4Label: "Unknown CC",
                    captionsTextTrack4LanguageCode: "",
                    renderTextTracksNatively: !0
                }), {}, { subtitleStreamController: je, subtitleTrackController: Xe, timelineController: zr, audioStreamController: Ne, audioTrackController: Ge, emeController: ui, cmcdController: yi });

                function Ui(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var i = e[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, (void 0, "symbol" == typeof(n = function(t, e) { if ("object" != typeof t || null === t) return t; var r = t[Symbol.toPrimitive]; if (void 0 !== r) { var i = r.call(t, e); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value.") } return String(t) }(i.key, "string")) ? n : String(n)), i)
                    }
                    var n
                }
                var Bi = function() {
                    function t(e) {
                        void 0 === e && (e = {}), this.config = void 0, this.userConfig = void 0, this.coreComponents = void 0, this.networkControllers = void 0, this._emitter = new Se.EventEmitter, this._autoLevelCapping = void 0, this._maxHdcpLevel = null, this.abrController = void 0, this.bufferController = void 0, this.capLevelController = void 0, this.latencyController = void 0, this.levelController = void 0, this.streamController = void 0, this.audioTrackController = void 0, this.subtitleTrackController = void 0, this.emeController = void 0, this.cmcdController = void 0, this._media = null, this.url = null;
                        var r = this.config = function(t, e) { if ((e.liveSyncDurationCount || e.liveMaxLatencyDurationCount) && (e.liveSyncDuration || e.liveMaxLatencyDuration)) throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration"); if (void 0 !== e.liveMaxLatencyDurationCount && (void 0 === e.liveSyncDurationCount || e.liveMaxLatencyDurationCount <= e.liveSyncDurationCount)) throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be greater than "liveSyncDurationCount"'); if (void 0 !== e.liveMaxLatencyDuration && (void 0 === e.liveSyncDuration || e.liveMaxLatencyDuration <= e.liveSyncDuration)) throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be greater than "liveSyncDuration"'); return Oi({}, t, e) }(t.DefaultConfig, e);
                        this.userConfig = e, (0, l.enableLogs)(r.debug, "Hls instance"), this._autoLevelCapping = -1, r.progressive && function(t) {
                            var e = t.loader;
                            e !== _i && e !== Si ? (l.logger.log("[config]: Custom loader detected, cannot enable progressive streaming"), t.progressive = !1) : function() {
                                if (self.fetch && self.AbortController && self.ReadableStream && self.Request) try { return new self.ReadableStream({}), !0 } catch (t) {}
                                return !1
                            }() && (t.loader = _i, t.progressive = !0, t.enableSoftwareAES = !0, l.logger.log("[config]: Progressive streaming enabled, using FetchLoader"))
                        }(r);
                        var i = r.abrController,
                            n = r.bufferController,
                            a = r.capLevelController,
                            s = r.fpsController,
                            o = this.abrController = new i(this),
                            u = this.bufferController = new n(this),
                            d = this.capLevelController = new a(this),
                            h = new s(this),
                            c = new W(this),
                            f = new rt(this),
                            g = this.levelController = new Lt(this),
                            v = new At(this),
                            p = new Mt(this.config),
                            m = this.streamController = new Ie(this, v, p);
                        d.setStreamController(m), h.setStreamController(m);
                        var y = [c, g, m];
                        this.networkControllers = y;
                        var E = [o, u, d, h, f, v];
                        this.audioTrackController = this.createController(r.audioTrackController, y);
                        var T = r.audioStreamController;
                        T && y.push(new T(this, v, p)), this.subtitleTrackController = this.createController(r.subtitleTrackController, y);
                        var S = r.subtitleStreamController;
                        S && y.push(new S(this, v, p)), this.createController(r.timelineController, E), p.emeController = this.emeController = this.createController(r.emeController, E), this.cmcdController = this.createController(r.cmcdController, E), this.latencyController = this.createController(nt, E), this.coreComponents = E
                    }
                    t.isSupported = function() {
                        return function() {
                            var t = ce();
                            if (!t) return !1;
                            var e = fe(),
                                r = t && "function" == typeof t.isTypeSupported && t.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'),
                                i = !e || e.prototype && "function" == typeof e.prototype.appendBuffer && "function" == typeof e.prototype.remove;
                            return !!r && !!i
                        }()
                    };
                    var e, r, i, a = t.prototype;
                    return a.createController = function(t, e) { if (t) { var r = new t(this); return e && e.push(r), r } return null }, a.on = function(t, e, r) { void 0 === r && (r = this), this._emitter.on(t, e, r) }, a.once = function(t, e, r) { void 0 === r && (r = this), this._emitter.once(t, e, r) }, a.removeAllListeners = function(t) { this._emitter.removeAllListeners(t) }, a.off = function(t, e, r, i) { void 0 === r && (r = this), this._emitter.off(t, e, r, i) }, a.listeners = function(t) { return this._emitter.listeners(t) }, a.emit = function(t, e, r) { return this._emitter.emit(t, e, r) }, a.trigger = function(t, e) { if (this.config.debug) return this.emit(t, t, e); try { return this.emit(t, t, e) } catch (e) { l.logger.error("An internal error happened while handling event " + t + '. Error message: "' + e.message + '". Here is a stacktrace:', e), this.trigger(s.Events.ERROR, { type: o.ErrorTypes.OTHER_ERROR, details: o.ErrorDetails.INTERNAL_EXCEPTION, fatal: !1, event: t, error: e }) } return !1 }, a.listenerCount = function(t) { return this._emitter.listenerCount(t) }, a.destroy = function() { l.logger.log("destroy"), this.trigger(s.Events.DESTROYING, void 0), this.detachMedia(), this.removeAllListeners(), this._autoLevelCapping = -1, this.url = null, this.networkControllers.forEach((function(t) { return t.destroy() })), this.networkControllers.length = 0, this.coreComponents.forEach((function(t) { return t.destroy() })), this.coreComponents.length = 0 }, a.attachMedia = function(t) { l.logger.log("attachMedia"), this._media = t, this.trigger(s.Events.MEDIA_ATTACHING, { media: t }) }, a.detachMedia = function() { l.logger.log("detachMedia"), this.trigger(s.Events.MEDIA_DETACHING, void 0), this._media = null }, a.loadSource = function(t) {
                        this.stopLoad();
                        var e = this.media,
                            r = this.url,
                            i = this.url = n.buildAbsoluteURL(self.location.href, t, { alwaysNormalize: !0 });
                        l.logger.log("loadSource:" + i), e && r && r !== i && this.bufferController.hasSourceTypes() && (this.detachMedia(), this.attachMedia(e)), this.trigger(s.Events.MANIFEST_LOADING, { url: t })
                    }, a.startLoad = function(t) { void 0 === t && (t = -1), l.logger.log("startLoad(" + t + ")"), this.networkControllers.forEach((function(e) { e.startLoad(t) })) }, a.stopLoad = function() { l.logger.log("stopLoad"), this.networkControllers.forEach((function(t) { t.stopLoad() })) }, a.swapAudioCodec = function() { l.logger.log("swapAudioCodec"), this.streamController.swapAudioCodec() }, a.recoverMediaError = function() {
                        l.logger.log("recoverMediaError");
                        var t = this._media;
                        this.detachMedia(), t && this.attachMedia(t)
                    }, a.removeLevel = function(t, e) { void 0 === e && (e = 0), this.levelController.removeLevel(t, e) }, e = t, i = [{ key: "version", get: function() { return "1.3.5" } }, { key: "Events", get: function() { return s.Events } }, { key: "ErrorTypes", get: function() { return o.ErrorTypes } }, { key: "ErrorDetails", get: function() { return o.ErrorDetails } }, { key: "DefaultConfig", get: function() { return t.defaultConfig ? t.defaultConfig : Ni }, set: function(e) { t.defaultConfig = e } }], (r = [{ key: "levels", get: function() { return this.levelController.levels || [] } }, { key: "currentLevel", get: function() { return this.streamController.currentLevel }, set: function(t) { l.logger.log("set currentLevel:" + t), this.loadLevel = t, this.abrController.clearTimer(), this.streamController.immediateLevelSwitch() } }, { key: "nextLevel", get: function() { return this.streamController.nextLevel }, set: function(t) { l.logger.log("set nextLevel:" + t), this.levelController.manualLevel = t, this.streamController.nextLevelSwitch() } }, { key: "loadLevel", get: function() { return this.levelController.level }, set: function(t) { l.logger.log("set loadLevel:" + t), this.levelController.manualLevel = t } }, { key: "nextLoadLevel", get: function() { return this.levelController.nextLoadLevel }, set: function(t) { this.levelController.nextLoadLevel = t } }, { key: "firstLevel", get: function() { return Math.max(this.levelController.firstLevel, this.minAutoLevel) }, set: function(t) { l.logger.log("set firstLevel:" + t), this.levelController.firstLevel = t } }, { key: "startLevel", get: function() { return this.levelController.startLevel }, set: function(t) { l.logger.log("set startLevel:" + t), -1 !== t && (t = Math.max(t, this.minAutoLevel)), this.levelController.startLevel = t } }, {
                        key: "capLevelToPlayerSize",
                        get: function() { return this.config.capLevelToPlayerSize },
                        set: function(t) {
                            var e = !!t;
                            e !== this.config.capLevelToPlayerSize && (e ? this.capLevelController.startCapping() : (this.capLevelController.stopCapping(), this.autoLevelCapping = -1, this.streamController.nextLevelSwitch()), this.config.capLevelToPlayerSize = e)
                        }
                    }, { key: "autoLevelCapping", get: function() { return this._autoLevelCapping }, set: function(t) { this._autoLevelCapping !== t && (l.logger.log("set autoLevelCapping:" + t), this._autoLevelCapping = t) } }, { key: "bandwidthEstimate", get: function() { var t = this.abrController.bwEstimator; return t ? t.getEstimate() : NaN } }, { key: "maxHdcpLevel", get: function() { return this._maxHdcpLevel }, set: function(t) { ot.indexOf(t) > -1 && (this._maxHdcpLevel = t) } }, { key: "autoLevelEnabled", get: function() { return -1 === this.levelController.manualLevel } }, { key: "manualLevel", get: function() { return this.levelController.manualLevel } }, {
                        key: "minAutoLevel",
                        get: function() {
                            var t = this.levels,
                                e = this.config.minAutoBitrate;
                            if (!t) return 0;
                            for (var r = t.length, i = 0; i < r; i++)
                                if (t[i].maxBitrate >= e) return i;
                            return 0
                        }
                    }, {
                        key: "maxAutoLevel",
                        get: function() {
                            var t, e = this.levels,
                                r = this.autoLevelCapping,
                                i = this.maxHdcpLevel;
                            if (t = -1 === r && e && e.length ? e.length - 1 : r, i)
                                for (var n = t; n--;) { var a = e[n].attrs["HDCP-LEVEL"]; if (a && a <= i) return n }
                            return t
                        }
                    }, { key: "nextAutoLevel", get: function() { return Math.min(Math.max(this.abrController.nextAutoLevel, this.minAutoLevel), this.maxAutoLevel) }, set: function(t) { this.abrController.nextAutoLevel = Math.max(this.minAutoLevel, t) } }, { key: "playingDate", get: function() { return this.streamController.currentProgramDateTime } }, { key: "mainForwardBufferInfo", get: function() { return this.streamController.getMainFwdBufferInfo() } }, { key: "audioTracks", get: function() { var t = this.audioTrackController; return t ? t.audioTracks : [] } }, {
                        key: "audioTrack",
                        get: function() { var t = this.audioTrackController; return t ? t.audioTrack : -1 },
                        set: function(t) {
                            var e = this.audioTrackController;
                            e && (e.audioTrack = t)
                        }
                    }, { key: "subtitleTracks", get: function() { var t = this.subtitleTrackController; return t ? t.subtitleTracks : [] } }, {
                        key: "subtitleTrack",
                        get: function() { var t = this.subtitleTrackController; return t ? t.subtitleTrack : -1 },
                        set: function(t) {
                            var e = this.subtitleTrackController;
                            e && (e.subtitleTrack = t)
                        }
                    }, { key: "media", get: function() { return this._media } }, {
                        key: "subtitleDisplay",
                        get: function() { var t = this.subtitleTrackController; return !!t && t.subtitleDisplay },
                        set: function(t) {
                            var e = this.subtitleTrackController;
                            e && (e.subtitleDisplay = t)
                        }
                    }, { key: "lowLatencyMode", get: function() { return this.config.lowLatencyMode }, set: function(t) { this.config.lowLatencyMode = t } }, { key: "liveSyncPosition", get: function() { return this.latencyController.liveSyncPosition } }, { key: "latency", get: function() { return this.latencyController.latency } }, { key: "maxLatency", get: function() { return this.latencyController.maxLatency } }, { key: "targetLatency", get: function() { return this.latencyController.targetLatency } }, { key: "drift", get: function() { return this.latencyController.drift } }, { key: "forceStartLoad", get: function() { return this.streamController.forceStartLoad } }]) && Ui(e.prototype, r), i && Ui(e, i), Object.defineProperty(e, "prototype", { writable: !1 }), t
                }();
                Bi.defaultConfig = void 0
            },
            923: (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, { BaseSegment: () => h, ElementaryStreamTypes: () => i, Fragment: () => c, Part: () => f });
                var i, n = r(965),
                    a = r(945),
                    s = r(408);

                function o(t, e) { t.prototype = Object.create(e.prototype), t.prototype.constructor = t, l(t, e) }

                function l(t, e) { return l = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) { return t.__proto__ = e, t }, l(t, e) }

                function u(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var i = e[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, (void 0, "symbol" == typeof(n = function(t, e) { if ("object" != typeof t || null === t) return t; var r = t[Symbol.toPrimitive]; if (void 0 !== r) { var i = r.call(t, e); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value.") } return String(t) }(i.key, "string")) ? n : String(n)), i)
                    }
                    var n
                }

                function d(t, e, r) { return e && u(t.prototype, e), r && u(t, r), Object.defineProperty(t, "prototype", { writable: !1 }), t }! function(t) { t.AUDIO = "audio", t.VIDEO = "video", t.AUDIOVIDEO = "audiovideo" }(i || (i = {}));
                var h = function() {
                        function t(t) {
                            var e;
                            this._byteRange = null, this._url = null, this.baseurl = void 0, this.relurl = void 0, this.elementaryStreams = ((e = {})[i.AUDIO] = null, e[i.VIDEO] = null, e[i.AUDIOVIDEO] = null, e), this.baseurl = t
                        }
                        return t.prototype.setByteRange = function(t, e) {
                            var r = t.split("@", 2),
                                i = [];
                            1 === r.length ? i[0] = e ? e.byteRangeEndOffset : 0 : i[0] = parseInt(r[1]), i[1] = parseInt(r[0]) + i[0], this._byteRange = i
                        }, d(t, [{ key: "byteRange", get: function() { return this._byteRange ? this._byteRange : [] } }, { key: "byteRangeStartOffset", get: function() { return this.byteRange[0] } }, { key: "byteRangeEndOffset", get: function() { return this.byteRange[1] } }, { key: "url", get: function() { return !this._url && this.baseurl && this.relurl && (this._url = (0, a.buildAbsoluteURL)(this.baseurl, this.relurl, { alwaysNormalize: !0 })), this._url || "" }, set: function(t) { this._url = t } }]), t
                    }(),
                    c = function(t) {
                        function e(e, r) { var i; return (i = t.call(this, r) || this)._decryptdata = null, i.rawProgramDateTime = null, i.programDateTime = null, i.tagList = [], i.duration = 0, i.sn = 0, i.levelkeys = void 0, i.type = void 0, i.loader = null, i.keyLoader = null, i.level = -1, i.cc = 0, i.startPTS = void 0, i.endPTS = void 0, i.appendedPTS = void 0, i.startDTS = void 0, i.endDTS = void 0, i.start = 0, i.deltaPTS = void 0, i.maxStartPTS = void 0, i.minEndPTS = void 0, i.stats = new s.LoadStats, i.urlId = 0, i.data = void 0, i.bitrateTest = !1, i.title = null, i.initSegment = null, i.endList = void 0, i.type = e, i }
                        o(e, t);
                        var r = e.prototype;
                        return r.setKeyFormat = function(t) {
                            if (this.levelkeys) {
                                var e = this.levelkeys[t];
                                e && !this._decryptdata && (this._decryptdata = e.getDecryptData(this.sn))
                            }
                        }, r.abortRequests = function() {
                            var t, e;
                            null === (t = this.loader) || void 0 === t || t.abort(), null === (e = this.keyLoader) || void 0 === e || e.abort()
                        }, r.setElementaryStreamInfo = function(t, e, r, i, n, a) {
                            void 0 === a && (a = !1);
                            var s = this.elementaryStreams,
                                o = s[t];
                            o ? (o.startPTS = Math.min(o.startPTS, e), o.endPTS = Math.max(o.endPTS, r), o.startDTS = Math.min(o.startDTS, i), o.endDTS = Math.max(o.endDTS, n)) : s[t] = { startPTS: e, endPTS: r, startDTS: i, endDTS: n, partial: a }
                        }, r.clearElementaryStreamInfo = function() {
                            var t = this.elementaryStreams;
                            t[i.AUDIO] = null, t[i.VIDEO] = null, t[i.AUDIOVIDEO] = null
                        }, d(e, [{
                            key: "decryptdata",
                            get: function() {
                                if (!this.levelkeys && !this._decryptdata) return null;
                                if (!this._decryptdata && this.levelkeys && !this.levelkeys.NONE) {
                                    var t = this.levelkeys.identity;
                                    if (t) this._decryptdata = t.getDecryptData(this.sn);
                                    else { var e = Object.keys(this.levelkeys); if (1 === e.length) return this._decryptdata = this.levelkeys[e[0]].getDecryptData(this.sn) }
                                }
                                return this._decryptdata
                            }
                        }, { key: "end", get: function() { return this.start + this.duration } }, { key: "endProgramDateTime", get: function() { if (null === this.programDateTime) return null; if (!(0, n.isFiniteNumber)(this.programDateTime)) return null; var t = (0, n.isFiniteNumber)(this.duration) ? this.duration : 0; return this.programDateTime + 1e3 * t } }, {
                            key: "encrypted",
                            get: function() {
                                var t;
                                if (null !== (t = this._decryptdata) && void 0 !== t && t.encrypted) return !0;
                                if (this.levelkeys) {
                                    var e = Object.keys(this.levelkeys),
                                        r = e.length;
                                    if (r > 1 || 1 === r && this.levelkeys[e[0]].encrypted) return !0
                                }
                                return !1
                            }
                        }]), e
                    }(h),
                    f = function(t) {
                        function e(e, r, i, n, a) {
                            var o;
                            (o = t.call(this, i) || this).fragOffset = 0, o.duration = 0, o.gap = !1, o.independent = !1, o.relurl = void 0, o.fragment = void 0, o.index = void 0, o.stats = new s.LoadStats, o.duration = e.decimalFloatingPoint("DURATION"), o.gap = e.bool("GAP"), o.independent = e.bool("INDEPENDENT"), o.relurl = e.enumeratedString("URI"), o.fragment = r, o.index = n;
                            var l = e.enumeratedString("BYTERANGE");
                            return l && o.setByteRange(l, a), a && (o.fragOffset = a.fragOffset + a.duration), o
                        }
                        return o(e, t), d(e, [{ key: "start", get: function() { return this.fragment.start + this.fragOffset } }, { key: "end", get: function() { return this.start + this.duration } }, { key: "loaded", get: function() { var t = this.elementaryStreams; return !!(t.audio || t.video || t.audiovideo) } }]), e
                    }(h)
            },
            408: (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, { LoadStats: () => i });
                var i = function() { this.aborted = !1, this.loaded = 0, this.retry = 0, this.total = 0, this.chunkCount = 0, this.bwEstimate = 0, this.loading = { start: 0, first: 0, end: 0 }, this.parsing = { start: 0, end: 0 }, this.buffering = { start: 0, first: 0, end: 0 } }
            },
            965: (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, { MAX_SAFE_INTEGER: () => n, isFiniteNumber: () => i });
                var i = Number.isFinite || function(t) { return "number" == typeof t && isFinite(t) },
                    n = Number.MAX_SAFE_INTEGER || 9007199254740991
            },
            524: (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, { default: () => p, flushTextTrackMetadataCueSamples: () => y, flushTextTrackUserdataCueSamples: () => E, normalizePts: () => m });
                var i = r(965);
                const n = function() {
                    function t() {}
                    return t.getSilentFrame = function(t, e) { if ("mp4a.40.2" === t) { if (1 === e) return new Uint8Array([0, 200, 0, 128, 35, 128]); if (2 === e) return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]); if (3 === e) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]); if (4 === e) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]); if (5 === e) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]); if (6 === e) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]) } else { if (1 === e) return new Uint8Array([1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]); if (2 === e) return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]); if (3 === e) return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]) } }, t
                }();
                var a = Math.pow(2, 32) - 1,
                    s = function() {
                        function t() {}
                        return t.init = function() {
                            var e;
                            for (e in t.types = { avc1: [], avcC: [], btrt: [], dinf: [], dref: [], esds: [], ftyp: [], hdlr: [], mdat: [], mdhd: [], mdia: [], mfhd: [], minf: [], moof: [], moov: [], mp4a: [], ".mp3": [], mvex: [], mvhd: [], pasp: [], sdtp: [], stbl: [], stco: [], stsc: [], stsd: [], stsz: [], stts: [], tfdt: [], tfhd: [], traf: [], trak: [], trun: [], trex: [], tkhd: [], vmhd: [], smhd: [] }, t.types) t.types.hasOwnProperty(e) && (t.types[e] = [e.charCodeAt(0), e.charCodeAt(1), e.charCodeAt(2), e.charCodeAt(3)]);
                            var r = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0]),
                                i = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]);
                            t.HDLR_TYPES = { video: r, audio: i };
                            var n = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1]),
                                a = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
                            t.STTS = t.STSC = t.STCO = a, t.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), t.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]), t.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), t.STSD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);
                            var s = new Uint8Array([105, 115, 111, 109]),
                                o = new Uint8Array([97, 118, 99, 49]),
                                l = new Uint8Array([0, 0, 0, 1]);
                            t.FTYP = t.box(t.types.ftyp, s, l, s, o), t.DINF = t.box(t.types.dinf, t.box(t.types.dref, n))
                        }, t.box = function(t) { for (var e = 8, r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++) i[n - 1] = arguments[n]; for (var a = i.length, s = a; a--;) e += i[a].byteLength; var o = new Uint8Array(e); for (o[0] = e >> 24 & 255, o[1] = e >> 16 & 255, o[2] = e >> 8 & 255, o[3] = 255 & e, o.set(t, 4), a = 0, e = 8; a < s; a++) o.set(i[a], e), e += i[a].byteLength; return o }, t.hdlr = function(e) { return t.box(t.types.hdlr, t.HDLR_TYPES[e]) }, t.mdat = function(e) { return t.box(t.types.mdat, e) }, t.mdhd = function(e, r) {
                            r *= e;
                            var i = Math.floor(r / (a + 1)),
                                n = Math.floor(r % (a + 1));
                            return t.box(t.types.mdhd, new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e, i >> 24, i >> 16 & 255, i >> 8 & 255, 255 & i, n >> 24, n >> 16 & 255, n >> 8 & 255, 255 & n, 85, 196, 0, 0]))
                        }, t.mdia = function(e) { return t.box(t.types.mdia, t.mdhd(e.timescale, e.duration), t.hdlr(e.type), t.minf(e)) }, t.mfhd = function(e) { return t.box(t.types.mfhd, new Uint8Array([0, 0, 0, 0, e >> 24, e >> 16 & 255, e >> 8 & 255, 255 & e])) }, t.minf = function(e) { return "audio" === e.type ? t.box(t.types.minf, t.box(t.types.smhd, t.SMHD), t.DINF, t.stbl(e)) : t.box(t.types.minf, t.box(t.types.vmhd, t.VMHD), t.DINF, t.stbl(e)) }, t.moof = function(e, r, i) { return t.box(t.types.moof, t.mfhd(e), t.traf(i, r)) }, t.moov = function(e) { for (var r = e.length, i = []; r--;) i[r] = t.trak(e[r]); return t.box.apply(null, [t.types.moov, t.mvhd(e[0].timescale, e[0].duration)].concat(i).concat(t.mvex(e))) }, t.mvex = function(e) { for (var r = e.length, i = []; r--;) i[r] = t.trex(e[r]); return t.box.apply(null, [t.types.mvex].concat(i)) }, t.mvhd = function(e, r) {
                            r *= e;
                            var i = Math.floor(r / (a + 1)),
                                n = Math.floor(r % (a + 1)),
                                s = new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e, i >> 24, i >> 16 & 255, i >> 8 & 255, 255 & i, n >> 24, n >> 16 & 255, n >> 8 & 255, 255 & n, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]);
                            return t.box(t.types.mvhd, s)
                        }, t.sdtp = function(e) {
                            var r, i, n = e.samples || [],
                                a = new Uint8Array(4 + n.length);
                            for (r = 0; r < n.length; r++) i = n[r].flags, a[r + 4] = i.dependsOn << 4 | i.isDependedOn << 2 | i.hasRedundancy;
                            return t.box(t.types.sdtp, a)
                        }, t.stbl = function(e) { return t.box(t.types.stbl, t.stsd(e), t.box(t.types.stts, t.STTS), t.box(t.types.stsc, t.STSC), t.box(t.types.stsz, t.STSZ), t.box(t.types.stco, t.STCO)) }, t.avc1 = function(e) {
                            var r, i, n, a = [],
                                s = [];
                            for (r = 0; r < e.sps.length; r++) n = (i = e.sps[r]).byteLength, a.push(n >>> 8 & 255), a.push(255 & n), a = a.concat(Array.prototype.slice.call(i));
                            for (r = 0; r < e.pps.length; r++) n = (i = e.pps[r]).byteLength, s.push(n >>> 8 & 255), s.push(255 & n), s = s.concat(Array.prototype.slice.call(i));
                            var o = t.box(t.types.avcC, new Uint8Array([1, a[3], a[4], a[5], 255, 224 | e.sps.length].concat(a).concat([e.pps.length]).concat(s))),
                                l = e.width,
                                u = e.height,
                                d = e.pixelRatio[0],
                                h = e.pixelRatio[1];
                            return t.box(t.types.avc1, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l >> 8 & 255, 255 & l, u >> 8 & 255, 255 & u, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 18, 100, 97, 105, 108, 121, 109, 111, 116, 105, 111, 110, 47, 104, 108, 115, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 17, 17]), o, t.box(t.types.btrt, new Uint8Array([0, 28, 156, 128, 0, 45, 198, 192, 0, 45, 198, 192])), t.box(t.types.pasp, new Uint8Array([d >> 24, d >> 16 & 255, d >> 8 & 255, 255 & d, h >> 24, h >> 16 & 255, h >> 8 & 255, 255 & h])))
                        }, t.esds = function(t) { var e = t.config.length; return new Uint8Array([0, 0, 0, 0, 3, 23 + e, 0, 1, 0, 4, 15 + e, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([e]).concat(t.config).concat([6, 1, 2])) }, t.mp4a = function(e) { var r = e.samplerate; return t.box(t.types.mp4a, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, e.channelCount, 0, 16, 0, 0, 0, 0, r >> 8 & 255, 255 & r, 0, 0]), t.box(t.types.esds, t.esds(e))) }, t.mp3 = function(e) { var r = e.samplerate; return t.box(t.types[".mp3"], new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, e.channelCount, 0, 16, 0, 0, 0, 0, r >> 8 & 255, 255 & r, 0, 0])) }, t.stsd = function(e) { return "audio" === e.type ? "mp3" === e.segmentCodec && "mp3" === e.codec ? t.box(t.types.stsd, t.STSD, t.mp3(e)) : t.box(t.types.stsd, t.STSD, t.mp4a(e)) : t.box(t.types.stsd, t.STSD, t.avc1(e)) }, t.tkhd = function(e) {
                            var r = e.id,
                                i = e.duration * e.timescale,
                                n = e.width,
                                s = e.height,
                                o = Math.floor(i / (a + 1)),
                                l = Math.floor(i % (a + 1));
                            return t.box(t.types.tkhd, new Uint8Array([1, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, 255 & r, 0, 0, 0, 0, o >> 24, o >> 16 & 255, o >> 8 & 255, 255 & o, l >> 24, l >> 16 & 255, l >> 8 & 255, 255 & l, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, n >> 8 & 255, 255 & n, 0, 0, s >> 8 & 255, 255 & s, 0, 0]))
                        }, t.traf = function(e, r) {
                            var i = t.sdtp(e),
                                n = e.id,
                                s = Math.floor(r / (a + 1)),
                                o = Math.floor(r % (a + 1));
                            return t.box(t.types.traf, t.box(t.types.tfhd, new Uint8Array([0, 0, 0, 0, n >> 24, n >> 16 & 255, n >> 8 & 255, 255 & n])), t.box(t.types.tfdt, new Uint8Array([1, 0, 0, 0, s >> 24, s >> 16 & 255, s >> 8 & 255, 255 & s, o >> 24, o >> 16 & 255, o >> 8 & 255, 255 & o])), t.trun(e, i.length + 16 + 20 + 8 + 16 + 8 + 8), i)
                        }, t.trak = function(e) { return e.duration = e.duration || 4294967295, t.box(t.types.trak, t.tkhd(e), t.mdia(e)) }, t.trex = function(e) { var r = e.id; return t.box(t.types.trex, new Uint8Array([0, 0, 0, 0, r >> 24, r >> 16 & 255, r >> 8 & 255, 255 & r, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1])) }, t.trun = function(e, r) {
                            var i, n, a, s, o, l, u = e.samples || [],
                                d = u.length,
                                h = 12 + 16 * d,
                                c = new Uint8Array(h);
                            for (r += 8 + h, c.set(["video" === e.type ? 1 : 0, 0, 15, 1, d >>> 24 & 255, d >>> 16 & 255, d >>> 8 & 255, 255 & d, r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, 255 & r], 0), i = 0; i < d; i++) a = (n = u[i]).duration, s = n.size, o = n.flags, l = n.cts, c.set([a >>> 24 & 255, a >>> 16 & 255, a >>> 8 & 255, 255 & a, s >>> 24 & 255, s >>> 16 & 255, s >>> 8 & 255, 255 & s, o.isLeading << 2 | o.dependsOn, o.isDependedOn << 6 | o.hasRedundancy << 4 | o.paddingValue << 1 | o.isNonSync, 61440 & o.degradPrio, 15 & o.degradPrio, l >>> 24 & 255, l >>> 16 & 255, l >>> 8 & 255, 255 & l], 12 + 16 * i);
                            return t.box(t.types.trun, c)
                        }, t.initSegment = function(e) {
                            t.types || t.init();
                            var r = t.moov(e),
                                i = new Uint8Array(t.FTYP.byteLength + r.byteLength);
                            return i.set(t.FTYP), i.set(r, t.FTYP.byteLength), i
                        }, t
                    }();
                s.types = void 0, s.HDLR_TYPES = void 0, s.STTS = void 0, s.STSC = void 0, s.STCO = void 0, s.STSZ = void 0, s.VMHD = void 0, s.SMHD = void 0, s.STSD = void 0, s.FTYP = void 0, s.DINF = void 0;
                const o = s;
                var l = r(851),
                    u = r(973),
                    d = r(93),
                    h = r(308),
                    c = r(673);

                function f() { return f = Object.assign ? Object.assign.bind() : function(t) { for (var e = 1; e < arguments.length; e++) { var r = arguments[e]; for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]) } return t }, f.apply(this, arguments) }
                var g = null,
                    v = null,
                    p = function() {
                        function t(t, e, r, i) {
                            if (void 0 === i && (i = ""), this.observer = void 0, this.config = void 0, this.typeSupported = void 0, this.ISGenerated = !1, this._initPTS = void 0, this._initDTS = void 0, this.nextAvcDts = null, this.nextAudioPts = null, this.videoSampleDuration = null, this.isAudioContiguous = !1, this.isVideoContiguous = !1, this.observer = t, this.config = e, this.typeSupported = r, this.ISGenerated = !1, null === g) {
                                var n = (navigator.userAgent || "").match(/Chrome\/(\d+)/i);
                                g = n ? parseInt(n[1]) : 0
                            }
                            if (null === v) {
                                var a = navigator.userAgent.match(/Safari\/(\d+)/i);
                                v = a ? parseInt(a[1]) : 0
                            }
                        }
                        var e = t.prototype;
                        return e.destroy = function() {}, e.resetTimeStamp = function(t) { d.logger.log("[mp4-remuxer]: initPTS & initDTS reset"), this._initPTS = this._initDTS = t }, e.resetNextTimestamp = function() { d.logger.log("[mp4-remuxer]: reset next timestamp"), this.isVideoContiguous = !1, this.isAudioContiguous = !1 }, e.resetInitSegment = function() { d.logger.log("[mp4-remuxer]: ISGenerated flag reset"), this.ISGenerated = !1 }, e.getVideoStartPts = function(t) {
                            var e = !1,
                                r = t.reduce((function(t, r) { var i = r.pts - t; return i < -4294967296 ? (e = !0, m(t, r.pts)) : i > 0 ? t : r.pts }), t[0].pts);
                            return e && d.logger.debug("PTS rollover detected"), r
                        }, e.remux = function(t, e, r, i, n, a, s, o) {
                            var l, u, c, f, g, v, p = n,
                                T = n,
                                S = t.pid > -1,
                                b = e.pid > -1,
                                L = e.samples.length,
                                A = t.samples.length > 0,
                                D = s && L > 0 || L > 1;
                            if ((!S || A) && (!b || D) || this.ISGenerated || s) {
                                this.ISGenerated || (c = this.generateIS(t, e, n));
                                var k, R = this.isVideoContiguous,
                                    I = -1;
                                if (D && (I = function(t) {
                                        for (var e = 0; e < t.length; e++)
                                            if (t[e].key) return e;
                                        return -1
                                    }(e.samples), !R && this.config.forceKeyFrameOnDiscontinuity))
                                    if (v = !0, I > 0) {
                                        d.logger.warn("[mp4-remuxer]: Dropped " + I + " out of " + L + " video samples due to a missing keyframe");
                                        var w = this.getVideoStartPts(e.samples);
                                        e.samples = e.samples.slice(I), e.dropped += I, k = T += (e.samples[0].pts - w) / e.inputTimeScale
                                    } else -1 === I && (d.logger.warn("[mp4-remuxer]: No keyframe found out of " + L + " video samples"), v = !1);
                                if (this.ISGenerated) {
                                    if (A && D) {
                                        var C = this.getVideoStartPts(e.samples),
                                            _ = (m(t.samples[0].pts, C) - C) / e.inputTimeScale;
                                        p += Math.max(0, _), T += Math.max(0, -_)
                                    }
                                    if (A) {
                                        if (t.samplerate || (d.logger.warn("[mp4-remuxer]: regenerate InitSegment as audio detected"), c = this.generateIS(t, e, n)), u = this.remuxAudio(t, p, this.isAudioContiguous, a, b || D || o === h.PlaylistLevelType.AUDIO ? T : void 0), D) {
                                            var P = u ? u.endPTS - u.startPTS : 0;
                                            e.inputTimeScale || (d.logger.warn("[mp4-remuxer]: regenerate InitSegment as video detected"), c = this.generateIS(t, e, n)), l = this.remuxVideo(e, T, R, P)
                                        }
                                    } else D && (l = this.remuxVideo(e, T, R, 0));
                                    l && (l.firstKeyFrame = I, l.independent = -1 !== I, l.firstKeyFramePTS = k)
                                }
                            }
                            return this.ISGenerated && (r.samples.length && (g = y(r, n, this._initPTS, this._initDTS)), i.samples.length && (f = E(i, n, this._initPTS))), { audio: u, video: l, initSegment: c, independent: v, text: f, id3: g }
                        }, e.generateIS = function(t, e, r) {
                            var n, a, s, l = t.samples,
                                u = e.samples,
                                d = this.typeSupported,
                                h = {},
                                c = !(0, i.isFiniteNumber)(this._initPTS),
                                f = "audio/mp4";
                            if (c && (n = a = 1 / 0), t.config && l.length && (t.timescale = t.samplerate, "mp3" === t.segmentCodec && (d.mpeg ? (f = "audio/mpeg", t.codec = "") : d.mp3 && (t.codec = "mp3")), h.audio = { id: "audio", container: f, codec: t.codec, initSegment: "mp3" === t.segmentCodec && d.mpeg ? new Uint8Array(0) : o.initSegment([t]), metadata: { channelCount: t.channelCount } }, c && (s = t.inputTimeScale, n = a = l[0].pts - Math.round(s * r))), e.sps && e.pps && u.length && (e.timescale = e.inputTimeScale, h.video = { id: "main", container: "video/mp4", codec: e.codec, initSegment: o.initSegment([e]), metadata: { width: e.width, height: e.height } }, c)) {
                                s = e.inputTimeScale;
                                var g = this.getVideoStartPts(u),
                                    v = Math.round(s * r);
                                a = Math.min(a, m(u[0].dts, g) - v), n = Math.min(n, g - v)
                            }
                            if (Object.keys(h).length) return this.ISGenerated = !0, c && (this._initPTS = n, this._initDTS = a), { tracks: h, initPTS: n, timescale: s }
                        }, e.remuxVideo = function(t, e, r, i) {
                            var n, a, s = t.inputTimeScale,
                                h = t.samples,
                                p = [],
                                y = h.length,
                                E = this._initPTS,
                                S = this.nextAvcDts,
                                b = 8,
                                L = this.videoSampleDuration,
                                A = Number.POSITIVE_INFINITY,
                                D = Number.NEGATIVE_INFINITY,
                                k = !1;
                            r && null !== S || (S = e * s - (h[0].pts - m(h[0].dts, h[0].pts)));
                            for (var R = 0; R < y; R++) {
                                var I = h[R];
                                I.pts = m(I.pts - E, S), I.dts = m(I.dts - E, S), I.dts < h[R > 0 ? R - 1 : R].dts && (k = !0)
                            }
                            k && h.sort((function(t, e) {
                                var r = t.dts - e.dts,
                                    i = t.pts - e.pts;
                                return r || i
                            })), n = h[0].dts;
                            var w = h[h.length - 1].dts - n,
                                C = w ? Math.round(w / (y - 1)) : L || t.inputTimeScale / 30;
                            if (r) {
                                var _ = n - S,
                                    P = _ > C,
                                    O = _ < -1;
                                if ((P || O) && (P ? d.logger.warn("AVC: " + (0, c.toMsFromMpegTsClock)(_, !0) + " ms (" + _ + "dts) hole between fragments detected, filling it") : d.logger.warn("AVC: " + (0, c.toMsFromMpegTsClock)(-_, !0) + " ms (" + _ + "dts) overlapping between fragments detected"), !O || S > h[0].pts)) {
                                    n = S;
                                    var x = h[0].pts - _;
                                    h[0].dts = n, h[0].pts = x, d.logger.log("Video: First PTS/DTS adjusted: " + (0, c.toMsFromMpegTsClock)(x, !0) + "/" + (0, c.toMsFromMpegTsClock)(n, !0) + ", delta: " + (0, c.toMsFromMpegTsClock)(_, !0) + " ms")
                                }
                            }
                            n = Math.max(0, n);
                            for (var F = 0, M = 0, N = 0; N < y; N++) {
                                for (var U = h[N], B = U.units, G = B.length, K = 0, H = 0; H < G; H++) K += B[H].data.length;
                                M += K, F += G, U.length = K, U.dts = Math.max(U.dts, n), A = Math.min(U.pts, A), D = Math.max(U.pts, D)
                            }
                            a = h[y - 1].dts;
                            var j, V = M + 4 * F + 8;
                            try { j = new Uint8Array(V) } catch (t) { return void this.observer.emit(l.Events.ERROR, l.Events.ERROR, { type: u.ErrorTypes.MUX_ERROR, details: u.ErrorDetails.REMUX_ALLOC_ERROR, fatal: !1, bytes: V, reason: "fail allocating video mdat " + V }) }
                            var Y = new DataView(j.buffer);
                            Y.setUint32(0, V), j.set(o.types.mdat, 4);
                            for (var W = !1, q = Number.POSITIVE_INFINITY, X = Number.POSITIVE_INFINITY, z = Number.NEGATIVE_INFINITY, Q = Number.NEGATIVE_INFINITY, $ = 0; $ < y; $++) {
                                for (var J = h[$], Z = J.units, tt = 0, et = 0, rt = Z.length; et < rt; et++) {
                                    var it = Z[et],
                                        nt = it.data,
                                        at = it.data.byteLength;
                                    Y.setUint32(b, at), b += 4, j.set(nt, b), b += at, tt += 4 + at
                                }
                                var st = void 0;
                                if ($ < y - 1) L = h[$ + 1].dts - J.dts, st = h[$ + 1].pts - J.pts;
                                else {
                                    var ot = this.config,
                                        lt = $ > 0 ? J.dts - h[$ - 1].dts : C;
                                    if (st = $ > 0 ? J.pts - h[$ - 1].pts : C, ot.stretchShortVideoTrack && null !== this.nextAudioPts) {
                                        var ut = Math.floor(ot.maxBufferHole * s),
                                            dt = (i ? A + i * s : this.nextAudioPts) - J.pts;
                                        dt > ut ? ((L = dt - lt) < 0 ? L = lt : W = !0, d.logger.log("[mp4-remuxer]: It is approximately " + dt / 90 + " ms to the next segment; using duration " + L / 90 + " ms for the last video frame.")) : L = lt
                                    } else L = lt
                                }
                                var ht = Math.round(J.pts - J.dts);
                                q = Math.min(q, L), z = Math.max(z, L), X = Math.min(X, st), Q = Math.max(Q, st), p.push(new T(J.key, L, tt, ht))
                            }
                            if (p.length)
                                if (g) {
                                    if (g < 70) {
                                        var ct = p[0].flags;
                                        ct.dependsOn = 2, ct.isNonSync = 0
                                    }
                                } else if (v && Q - X < z - q && C / z < .025 && 0 === p[0].cts) {
                                d.logger.warn("Found irregular gaps in sample duration. Using PTS instead of DTS to determine MP4 sample duration.");
                                for (var ft = n, gt = 0, vt = p.length; gt < vt; gt++) {
                                    var pt = ft + p[gt].duration,
                                        mt = ft + p[gt].cts;
                                    if (gt < vt - 1) {
                                        var yt = pt + p[gt + 1].cts;
                                        p[gt].duration = yt - mt
                                    } else p[gt].duration = gt ? p[gt - 1].duration : C;
                                    p[gt].cts = 0, ft = pt
                                }
                            }
                            L = W || !L ? C : L, this.nextAvcDts = S = a + L, this.videoSampleDuration = L, this.isVideoContiguous = !0;
                            var Et = { data1: o.moof(t.sequenceNumber++, n, f({}, t, { samples: p })), data2: j, startPTS: A / s, endPTS: (D + L) / s, startDTS: n / s, endDTS: S / s, type: "video", hasAudio: !1, hasVideo: !0, nb: p.length, dropped: t.dropped };
                            return t.samples = [], t.dropped = 0, Et
                        }, e.remuxAudio = function(t, e, r, i, a) {
                            var s = t.inputTimeScale,
                                h = s / (t.samplerate ? t.samplerate : s),
                                c = "aac" === t.segmentCodec ? 1024 : 1152,
                                g = c * h,
                                v = this._initPTS,
                                p = "mp3" === t.segmentCodec && this.typeSupported.mpeg,
                                y = [],
                                E = void 0 !== a,
                                S = t.samples,
                                b = p ? 0 : 8,
                                L = this.nextAudioPts || -1,
                                A = e * s;
                            if (this.isAudioContiguous = r = r || S.length && L > 0 && (i && Math.abs(A - L) < 9e3 || Math.abs(m(S[0].pts - v, A) - L) < 20 * g), S.forEach((function(t) { t.pts = m(t.pts - v, A) })), !r || L < 0) {
                                if (S = S.filter((function(t) { return t.pts >= 0 })), !S.length) return;
                                L = 0 === a ? 0 : i && !E ? Math.max(0, A) : S[0].pts
                            }
                            if ("aac" === t.segmentCodec)
                                for (var D = this.config.maxAudioFramesDrift, k = 0, R = L; k < S.length; k++) {
                                    var I = S[k],
                                        w = I.pts,
                                        C = w - R,
                                        _ = Math.abs(1e3 * C / s);
                                    if (C <= -D * g && E) 0 === k && (d.logger.warn("Audio frame @ " + (w / s).toFixed(3) + "s overlaps nextAudioPts by " + Math.round(1e3 * C / s) + " ms."), this.nextAudioPts = L = R = w);
                                    else if (C >= D * g && _ < 1e4 && E) {
                                        var P = Math.round(C / g);
                                        (R = w - P * g) < 0 && (P--, R += g), 0 === k && (this.nextAudioPts = L = R), d.logger.warn("[mp4-remuxer]: Injecting " + P + " audio frame @ " + (R / s).toFixed(3) + "s due to " + Math.round(1e3 * C / s) + " ms gap.");
                                        for (var O = 0; O < P; O++) {
                                            var x = Math.max(R, 0),
                                                F = n.getSilentFrame(t.manifestCodec || t.codec, t.channelCount);
                                            F || (d.logger.log("[mp4-remuxer]: Unable to get silent frame for given audio codec; duplicating last frame instead."), F = I.unit.subarray()), S.splice(k, 0, { unit: F, pts: x }), R += g, k++
                                        }
                                    }
                                    I.pts = R, R += g
                                }
                            for (var M, N = null, U = null, B = 0, G = S.length; G--;) B += S[G].unit.byteLength;
                            for (var K = 0, H = S.length; K < H; K++) {
                                var j = S[K],
                                    V = j.unit,
                                    Y = j.pts;
                                if (null !== U) y[K - 1].duration = Math.round((Y - U) / h);
                                else {
                                    if (r && "aac" === t.segmentCodec && (Y = L), N = Y, !(B > 0)) return;
                                    B += b;
                                    try { M = new Uint8Array(B) } catch (t) { return void this.observer.emit(l.Events.ERROR, l.Events.ERROR, { type: u.ErrorTypes.MUX_ERROR, details: u.ErrorDetails.REMUX_ALLOC_ERROR, fatal: !1, bytes: B, reason: "fail allocating audio mdat " + B }) }
                                    p || (new DataView(M.buffer).setUint32(0, B), M.set(o.types.mdat, 4))
                                }
                                M.set(V, b);
                                var W = V.byteLength;
                                b += W, y.push(new T(!0, c, W, 0)), U = Y
                            }
                            var q = y.length;
                            if (q) {
                                var X = y[y.length - 1];
                                this.nextAudioPts = L = U + h * X.duration;
                                var z = p ? new Uint8Array(0) : o.moof(t.sequenceNumber++, N / h, f({}, t, { samples: y }));
                                t.samples = [];
                                var Q = N / s,
                                    $ = L / s,
                                    J = { data1: z, data2: M, startPTS: Q, endPTS: $, startDTS: Q, endDTS: $, type: "audio", hasAudio: !0, hasVideo: !1, nb: q };
                                return this.isAudioContiguous = !0, J
                            }
                        }, e.remuxEmptyAudio = function(t, e, r, i) {
                            var a = t.inputTimeScale,
                                s = a / (t.samplerate ? t.samplerate : a),
                                o = this.nextAudioPts,
                                l = (null !== o ? o : i.startDTS * a) + this._initDTS,
                                u = i.endDTS * a + this._initDTS,
                                h = 1024 * s,
                                c = Math.ceil((u - l) / h),
                                f = n.getSilentFrame(t.manifestCodec || t.codec, t.channelCount);
                            if (d.logger.warn("[mp4-remuxer]: remux empty Audio"), f) {
                                for (var g = [], v = 0; v < c; v++) {
                                    var p = l + v * h;
                                    g.push({ unit: f, pts: p, dts: p })
                                }
                                return t.samples = g, this.remuxAudio(t, e, r, !1)
                            }
                            d.logger.trace("[mp4-remuxer]: Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec")
                        }, t
                    }();

                function m(t, e) { var r; if (null === e) return t; for (r = e < t ? -8589934592 : 8589934592; Math.abs(t - e) > 4294967296;) t += r; return t }

                function y(t, e, r, i) {
                    var n = t.samples.length;
                    if (n) {
                        for (var a = t.inputTimeScale, s = 0; s < n; s++) {
                            var o = t.samples[s];
                            o.pts = m(o.pts - r, e * a) / a, o.dts = m(o.dts - i, e * a) / a
                        }
                        var l = t.samples;
                        return t.samples = [], { samples: l }
                    }
                }

                function E(t, e, r) {
                    var i = t.samples.length;
                    if (i) {
                        for (var n = t.inputTimeScale, a = 0; a < i; a++) {
                            var s = t.samples[a];
                            s.pts = m(s.pts - r, e * n) / n
                        }
                        t.samples.sort((function(t, e) { return t.pts - e.pts }));
                        var o = t.samples;
                        return t.samples = [], { samples: o }
                    }
                }
                var T = function(t, e, r, i) { this.size = void 0, this.duration = void 0, this.cts = void 0, this.flags = void 0, this.duration = e, this.size = r, this.cts = i, this.flags = new S(t) },
                    S = function(t) { this.isLeading = 0, this.isDependedOn = 0, this.hasRedundancy = 0, this.degradPrio = 0, this.dependsOn = 1, this.isNonSync = 1, this.dependsOn = t ? 2 : 1, this.isNonSync = t ? 0 : 1 }
            },
            856: (t, e, r) => {
                "use strict";
                var i;
                r.r(e), r.d(e, { MetadataSchema: () => i }),
                    function(t) { t.audioId3 = "org.id3", t.dateRange = "com.apple.quicktime.HLS", t.emsg = "https://aomedia.org/emsg/ID3" }(i || (i = {}))
            },
            308: (t, e, r) => {
                "use strict";
                var i, n;
                r.r(e), r.d(e, { PlaylistContextType: () => i, PlaylistLevelType: () => n }),
                    function(t) { t.MANIFEST = "manifest", t.LEVEL = "level", t.AUDIO_TRACK = "audioTrack", t.SUBTITLE_TRACK = "subtitleTrack" }(i || (i = {})),
                    function(t) { t.MAIN = "main", t.AUDIO = "audio", t.SUBTITLE = "subtitle" }(n || (n = {}))
            },
            300: (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, { default: () => i });
                const i = {
                    hexDump: function(t) {
                        for (var e = "", r = 0; r < t.length; r++) {
                            var i = t[r].toString(16);
                            i.length < 2 && (i = "0" + i), e += i
                        }
                        return e
                    }
                }
            },
            93: (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, { enableLogs: () => o, logger: () => l });
                var i = function() {},
                    n = { trace: i, debug: i, log: i, warn: i, info: i, error: i },
                    a = n;

                function s(t) { var e = self.console[t]; return e ? e.bind(self.console, "[" + t + "] >") : i }

                function o(t, e) {
                    if (self.console && !0 === t || "object" == typeof t) {
                        ! function(t) {
                            for (var e = arguments.length, r = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++) r[i - 1] = arguments[i];
                            r.forEach((function(e) { a[e] = t[e] ? t[e].bind(t) : s(e) }))
                        }(t, "debug", "log", "info", "warn", "error");
                        try { a.log('Debug logs enabled for "' + e + '"') } catch (t) { a = n }
                    } else a = n
                }
                var l = n
            },
            63: (t, e, r) => {
                "use strict";
                r.r(e), r.d(e, { RemuxerTrackIdConfig: () => d, appendUint8Array: () => k, bin2str: () => h, computeRawDurationFromSamples: () => L, discardEPB: () => C, findBox: () => p, getDuration: () => b, getStartDTS: () => S, mp4Box: () => P, mp4pssh: () => O, offsetStartDTS: () => A, parseEmsg: () => _, parseInitSegment: () => y, parsePssh: () => x, parseSEIMessageFromNALu: () => w, parseSamples: () => R, parseSegmentIndex: () => m, parseSinf: () => T, patchEncyptionData: () => E, readSint32: () => g, readUint16: () => c, readUint32: () => f, segmentValidRange: () => D, writeUint32: () => v });
                var i = r(923),
                    n = r(145),
                    a = r(181),
                    s = r(93),
                    o = r(300),
                    l = Math.pow(2, 32) - 1,
                    u = [].push,
                    d = { video: 1, audio: 2, id3: 3, text: 4 };

                function h(t) { return String.fromCharCode.apply(null, t) }

                function c(t, e) { var r = t[e] << 8 | t[e + 1]; return r < 0 ? 65536 + r : r }

                function f(t, e) { var r = g(t, e); return r < 0 ? 4294967296 + r : r }

                function g(t, e) { return t[e] << 24 | t[e + 1] << 16 | t[e + 2] << 8 | t[e + 3] }

                function v(t, e, r) { t[e] = r >> 24, t[e + 1] = r >> 16 & 255, t[e + 2] = r >> 8 & 255, t[e + 3] = 255 & r }

                function p(t, e) {
                    var r = [];
                    if (!e.length) return r;
                    for (var i = t.byteLength, n = 0; n < i;) {
                        var a = f(t, n),
                            s = a > 1 ? n + a : i;
                        if (h(t.subarray(n + 4, n + 8)) === e[0])
                            if (1 === e.length) r.push(t.subarray(n + 8, s));
                            else {
                                var o = p(t.subarray(n + 8, s), e.slice(1));
                                o.length && u.apply(r, o)
                            }
                        n = s
                    }
                    return r
                }

                function m(t) {
                    var e = [],
                        r = t[0],
                        i = 8,
                        n = f(t, i);
                    i += 4, i += 0 === r ? 8 : 16, i += 2;
                    var a = t.length + 0,
                        s = c(t, i);
                    i += 2;
                    for (var o = 0; o < s; o++) {
                        var l = i,
                            u = f(t, l);
                        l += 4;
                        var d = 2147483647 & u;
                        if (1 == (2147483648 & u) >>> 31) return console.warn("SIDX has hierarchical references (not supported)"), null;
                        var h = f(t, l);
                        l += 4, e.push({ referenceSize: d, subsegmentDuration: h, info: { duration: h / n, start: a, end: a + d - 1 } }), a += d, i = l += 4
                    }
                    return { earliestPresentationTime: 0, timescale: n, version: r, referencesCount: s, references: e }
                }

                function y(t) {
                    for (var e = [], r = p(t, ["moov", "trak"]), n = 0; n < r.length; n++) {
                        var a = r[n],
                            s = p(a, ["tkhd"])[0];
                        if (s) {
                            var o = s[0],
                                l = 0 === o ? 12 : 20,
                                u = f(s, l),
                                d = p(a, ["mdia", "mdhd"])[0];
                            if (d) {
                                var c = f(d, l = 0 === (o = d[0]) ? 12 : 20),
                                    g = p(a, ["mdia", "hdlr"])[0];
                                if (g) {
                                    var v = h(g.subarray(8, 12)),
                                        m = { soun: i.ElementaryStreamTypes.AUDIO, vide: i.ElementaryStreamTypes.VIDEO }[v];
                                    if (m) {
                                        var y = p(a, ["mdia", "minf", "stbl", "stsd"])[0],
                                            E = void 0;
                                        y && (E = h(y.subarray(12, 16))), e[u] = { timescale: c, type: m }, e[m] = { timescale: c, id: u, codec: E }
                                    }
                                }
                            }
                        }
                    }
                    return p(t, ["moov", "mvex", "trex"]).forEach((function(t) {
                        var r = f(t, 4),
                            i = e[r];
                        i && (i.default = { duration: f(t, 12), flags: f(t, 20) })
                    })), e
                }

                function E(t, e) {
                    if (!t || !e) return t;
                    var r = e.keyId;
                    return r && e.isCommonEncryption && p(t, ["moov", "trak"]).forEach((function(t) {
                        var e = p(t, ["mdia", "minf", "stbl", "stsd"])[0].subarray(8),
                            i = p(e, ["enca"]),
                            n = i.length > 0;
                        n || (i = p(e, ["encv"])), i.forEach((function(t) {
                            p(n ? t.subarray(28) : t.subarray(78), ["sinf"]).forEach((function(t) {
                                var e = T(t);
                                if (e) {
                                    var i = e.subarray(8, 24);
                                    i.some((function(t) { return 0 !== t })) || (s.logger.log("[eme] Patching keyId in 'enc" + (n ? "a" : "v") + ">sinf>>tenc' box: " + o.default.hexDump(i) + " -> " + o.default.hexDump(r)), e.set(r, 8))
                                }
                            }))
                        }))
                    })), t
                }

                function T(t) { var e = p(t, ["schm"])[0]; if (e) { var r = h(e.subarray(4, 8)); if ("cbcs" === r || "cenc" === r) return p(t, ["schi", "tenc"])[0] } return s.logger.error("[eme] missing 'schm' box"), null }

                function S(t, e) {
                    return p(e, ["moof", "traf"]).reduce((function(e, r) {
                        var i = p(r, ["tfdt"])[0],
                            n = i[0],
                            a = p(r, ["tfhd"]).reduce((function(e, r) {
                                var a = f(r, 4),
                                    s = t[a];
                                if (s) {
                                    var o = f(i, 4);
                                    1 === n && (o *= Math.pow(2, 32), o += f(i, 8));
                                    var l = o / (s.timescale || 9e4);
                                    if (isFinite(l) && (null === e || l < e)) return l
                                }
                                return e
                            }), null);
                        return null !== a && isFinite(a) && (null === e || a < e) ? a : e
                    }), null) || 0
                }

                function b(t, e) {
                    for (var r = 0, n = 0, a = 0, s = p(t, ["moof", "traf"]), o = 0; o < s.length; o++) {
                        var l = s[o],
                            u = p(l, ["tfhd"])[0],
                            d = e[f(u, 4)];
                        if (d) {
                            var h = d.default,
                                c = f(u, 0) | (null == h ? void 0 : h.flags),
                                g = null == h ? void 0 : h.duration;
                            8 & c && (g = f(u, 2 & c ? 12 : 8));
                            for (var v = d.timescale || 9e4, y = p(l, ["trun"]), E = 0; E < y.length; E++) !(r = L(y[E])) && g && (r = g * f(y[E], 4)), d.type === i.ElementaryStreamTypes.VIDEO ? n += r / v : d.type === i.ElementaryStreamTypes.AUDIO && (a += r / v)
                        }
                    }
                    if (0 === n && 0 === a) {
                        for (var T = 0, S = p(t, ["sidx"]), b = 0; b < S.length; b++) {
                            var A = m(S[b]);
                            null != A && A.references && (T += A.references.reduce((function(t, e) { return t + e.info.duration || 0 }), 0))
                        }
                        return T
                    }
                    return n || a
                }

                function L(t) {
                    var e = f(t, 0),
                        r = 8;
                    1 & e && (r += 4), 4 & e && (r += 4);
                    for (var i = 0, n = f(t, 4), a = 0; a < n; a++) 256 & e && (i += f(t, r), r += 4), 512 & e && (r += 4), 1024 & e && (r += 4), 2048 & e && (r += 4);
                    return i
                }

                function A(t, e, r) {
                    p(e, ["moof", "traf"]).forEach((function(e) {
                        p(e, ["tfhd"]).forEach((function(i) {
                            var n = f(i, 4),
                                a = t[n];
                            if (a) {
                                var s = a.timescale || 9e4;
                                p(e, ["tfdt"]).forEach((function(t) {
                                    var e = t[0],
                                        i = f(t, 4);
                                    if (0 === e) i -= r * s, v(t, 4, i = Math.max(i, 0));
                                    else {
                                        i *= Math.pow(2, 32), i += f(t, 8), i -= r * s, i = Math.max(i, 0);
                                        var n = Math.floor(i / (l + 1)),
                                            a = Math.floor(i % (l + 1));
                                        v(t, 4, n), v(t, 8, a)
                                    }
                                }))
                            }
                        }))
                    }))
                }

                function D(t) {
                    var e = { valid: null, remainder: null },
                        r = p(t, ["moof"]);
                    if (!r) return e;
                    if (r.length < 2) return e.remainder = t, e;
                    var i = r[r.length - 1];
                    return e.valid = (0, n.sliceUint8)(t, 0, i.byteOffset - 8), e.remainder = (0, n.sliceUint8)(t, i.byteOffset - 8), e
                }

                function k(t, e) { var r = new Uint8Array(t.length + e.length); return r.set(t), r.set(e, t.length), r }

                function R(t, e) {
                    var r = [],
                        n = e.samples,
                        a = e.timescale,
                        s = e.id,
                        o = !1;
                    return p(n, ["moof"]).map((function(l) {
                        var u = l.byteOffset - 8;
                        p(l, ["traf"]).map((function(l) {
                            var d = p(l, ["tfdt"]).map((function(t) {
                                var e = t[0],
                                    r = f(t, 4);
                                return 1 === e && (r *= Math.pow(2, 32), r += f(t, 8)), r / a
                            }))[0];
                            return void 0 !== d && (t = d), p(l, ["tfhd"]).map((function(d) {
                                var h = f(d, 4),
                                    c = 16777215 & f(d, 0),
                                    v = 0,
                                    m = 0 != (16 & c),
                                    y = 0,
                                    E = 0 != (32 & c),
                                    T = 8;
                                h === s && (0 != (1 & c) && (T += 8), 0 != (2 & c) && (T += 4), 0 != (8 & c) && (v = f(d, T), T += 4), m && (y = f(d, T), T += 4), E && (T += 4), "video" === e.type && (o = function(t) {
                                    if (!t) return !1;
                                    var e = t.indexOf("."),
                                        r = e < 0 ? t : t.substring(0, e);
                                    return "hvc1" === r || "hev1" === r || "dvh1" === r || "dvhe" === r
                                }(e.codec)), p(l, ["trun"]).map((function(s) {
                                    var l = s[0],
                                        d = 16777215 & f(s, 0),
                                        h = 0 != (1 & d),
                                        c = 0,
                                        p = 0 != (4 & d),
                                        m = 0 != (256 & d),
                                        E = 0,
                                        T = 0 != (512 & d),
                                        S = 0,
                                        b = 0 != (1024 & d),
                                        L = 0 != (2048 & d),
                                        A = 0,
                                        D = f(s, 4),
                                        k = 8;
                                    h && (c = f(s, k), k += 4), p && (k += 4);
                                    for (var R = c + u, C = 0; C < D; C++) {
                                        if (m ? (E = f(s, k), k += 4) : E = v, T ? (S = f(s, k), k += 4) : S = y, b && (k += 4), L && (A = 0 === l ? f(s, k) : g(s, k), k += 4), e.type === i.ElementaryStreamTypes.VIDEO)
                                            for (var _ = 0; _ < S;) {
                                                var P = f(n, R);
                                                I(o, n[R += 4]) && w(n.subarray(R, R + P), o ? 2 : 1, t + A / a, r), R += P, _ += P + 4
                                            }
                                        t += E / a
                                    }
                                })))
                            }))
                        }))
                    })), r
                }

                function I(t, e) { if (t) { var r = e >> 1 & 63; return 39 === r || 40 === r } return 6 == (31 & e) }

                function w(t, e, r, i) {
                    var n = C(t),
                        s = 0;
                    s += e;
                    for (var o = 0, l = 0, u = !1, d = 0; s < n.length;) {
                        o = 0;
                        do {
                            if (s >= n.length) break;
                            o += d = n[s++]
                        } while (255 === d);
                        l = 0;
                        do {
                            if (s >= n.length) break;
                            l += d = n[s++]
                        } while (255 === d);
                        var h = n.length - s;
                        if (!u && 4 === o && s < n.length) {
                            if (u = !0, 181 === n[s++]) {
                                var g = c(n, s);
                                if (s += 2, 49 === g) {
                                    var v = f(n, s);
                                    if (s += 4, 1195456820 === v) {
                                        var p = n[s++];
                                        if (3 === p) {
                                            var m = n[s++],
                                                y = 64 & m,
                                                E = y ? 2 + 3 * (31 & m) : 0,
                                                T = new Uint8Array(E);
                                            if (y) { T[0] = m; for (var S = 1; S < E; S++) T[S] = n[s++] }
                                            i.push({ type: p, payloadType: o, pts: r, bytes: T })
                                        }
                                    }
                                }
                            }
                        } else if (5 === o && l < h) {
                            if (u = !0, l > 16) {
                                for (var b = [], L = 0; L < 16; L++) {
                                    var A = n[s++].toString(16);
                                    b.push(1 == A.length ? "0" + A : A), 3 !== L && 5 !== L && 7 !== L && 9 !== L || b.push("-")
                                }
                                for (var D = l - 16, k = new Uint8Array(D), R = 0; R < D; R++) k[R] = n[s++];
                                i.push({ payloadType: o, pts: r, uuid: b.join(""), userData: (0, a.utf8ArrayToStr)(k), userDataBytes: k })
                            }
                        } else if (l < h) s += l;
                        else if (l > h) break
                    }
                }

                function C(t) {
                    for (var e = t.byteLength, r = [], i = 1; i < e - 2;) 0 === t[i] && 0 === t[i + 1] && 3 === t[i + 2] ? (r.push(i + 2), i += 2) : i++;
                    if (0 === r.length) return t;
                    var n = e - r.length,
                        a = new Uint8Array(n),
                        s = 0;
                    for (i = 0; i < n; s++, i++) s === r[0] && (s++, r.shift()), a[i] = t[s];
                    return a
                }

                function _(t) {
                    var e = t[0],
                        r = "",
                        i = "",
                        n = 0,
                        a = 0,
                        s = 0,
                        o = 0,
                        l = 0,
                        u = 0;
                    if (0 === e) {
                        for (;
                            "\0" !== h(t.subarray(u, u + 1));) r += h(t.subarray(u, u + 1)), u += 1;
                        for (r += h(t.subarray(u, u + 1)), u += 1;
                            "\0" !== h(t.subarray(u, u + 1));) i += h(t.subarray(u, u + 1)), u += 1;
                        i += h(t.subarray(u, u + 1)), u += 1, n = f(t, 12), a = f(t, 16), o = f(t, 20), l = f(t, 24), u = 28
                    } else if (1 === e) {
                        n = f(t, u += 4);
                        var d = f(t, u += 4),
                            c = f(t, u += 4);
                        for (u += 4, s = Math.pow(2, 32) * d + c, Number.isSafeInteger(s) || (s = Number.MAX_SAFE_INTEGER, console.warn("Presentation time exceeds safe integer limit and wrapped to max safe integer in parsing emsg box")), o = f(t, u), l = f(t, u += 4), u += 4;
                            "\0" !== h(t.subarray(u, u + 1));) r += h(t.subarray(u, u + 1)), u += 1;
                        for (r += h(t.subarray(u, u + 1)), u += 1;
                            "\0" !== h(t.subarray(u, u + 1));) i += h(t.subarray(u, u + 1)), u += 1;
                        i += h(t.subarray(u, u + 1)), u += 1
                    }
                    return { schemeIdUri: r, value: i, timeScale: n, presentationTime: s, presentationTimeDelta: a, eventDuration: o, id: l, payload: t.subarray(u, t.byteLength) }
                }

                function P(t) { for (var e = arguments.length, r = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++) r[i - 1] = arguments[i]; for (var n = r.length, a = 8, s = n; s--;) a += r[s].byteLength; var o = new Uint8Array(a); for (o[0] = a >> 24 & 255, o[1] = a >> 16 & 255, o[2] = a >> 8 & 255, o[3] = 255 & a, o.set(t, 4), s = 0, a = 8; s < n; s++) o.set(r[s], a), a += r[s].byteLength; return o }

                function O(t, e, r) {
                    if (16 !== t.byteLength) throw new RangeError("Invalid system id");
                    var i, n, a;
                    if (e) {
                        i = 1, n = new Uint8Array(16 * e.length);
                        for (var s = 0; s < e.length; s++) {
                            var o = e[s];
                            if (16 !== o.byteLength) throw new RangeError("Invalid key");
                            n.set(o, 16 * s)
                        }
                    } else i = 0, n = new Uint8Array;
                    i > 0 ? (a = new Uint8Array(4), e.length > 0 && new DataView(a.buffer).setUint32(0, e.length, !1)) : a = new Uint8Array;
                    var l = new Uint8Array(4);
                    return r && r.byteLength > 0 && new DataView(l.buffer).setUint32(0, r.byteLength, !1), P([112, 115, 115, 104], new Uint8Array([i, 0, 0, 0]), t, a, n, l, r || new Uint8Array)
                }

                function x(t) {
                    if (!(t instanceof ArrayBuffer) || t.byteLength < 32) return null;
                    var e = { version: 0, systemId: "", kids: null, data: null },
                        r = new DataView(t),
                        i = r.getUint32(0);
                    if (t.byteLength !== i && i > 44) return null;
                    if (1886614376 !== r.getUint32(4)) return null;
                    if (e.version = r.getUint32(8) >>> 24, e.version > 1) return null;
                    e.systemId = o.default.hexDump(new Uint8Array(t, 12, 16));
                    var n = r.getUint32(28);
                    if (0 === e.version) {
                        if (i - 32 < n) return null;
                        e.data = new Uint8Array(t, 32, n)
                    } else if (1 === e.version) { e.kids = []; for (var a = 0; a < n; a++) e.kids.push(new Uint8Array(t, 32 + 16 * a, 16)) }
                    return e
                }
            },
            673: (t, e, r) => {
                "use strict";

                function i(t, e, r, i) { void 0 === r && (r = 1), void 0 === i && (i = !1); var n = t * e * r; return i ? Math.round(n) : n }

                function n(t, e, r, n) { return void 0 === r && (r = 1), void 0 === n && (n = !1), i(t, e, 1 / r, n) }

                function a(t, e) { return void 0 === e && (e = !1), i(t, 1e3, 1 / 9e4, e) }

                function s(t, e) { return void 0 === e && (e = 1), i(t, 9e4, 1 / e) }
                r.r(e), r.d(e, { toMpegTsClockFromTimescale: () => s, toMsFromMpegTsClock: () => a, toTimescaleFromBase: () => i, toTimescaleFromScale: () => n })
            },
            145: (t, e, r) => {
                "use strict";

                function i(t, e, r) { return Uint8Array.prototype.slice ? t.slice(e, r) : new Uint8Array(Array.prototype.slice.call(t, e, r)) }
                r.r(e), r.d(e, { sliceUint8: () => i })
            },
            729: t => {
                "use strict";
                var e = Object.prototype.hasOwnProperty,
                    r = "~";

                function i() {}

                function n(t, e, r) { this.fn = t, this.context = e, this.once = r || !1 }

                function a(t, e, i, a, s) {
                    if ("function" != typeof i) throw new TypeError("The listener must be a function");
                    var o = new n(i, a || t, s),
                        l = r ? r + e : e;
                    return t._events[l] ? t._events[l].fn ? t._events[l] = [t._events[l], o] : t._events[l].push(o) : (t._events[l] = o, t._eventsCount++), t
                }

                function s(t, e) { 0 == --t._eventsCount ? t._events = new i : delete t._events[e] }

                function o() { this._events = new i, this._eventsCount = 0 }
                Object.create && (i.prototype = Object.create(null), (new i).__proto__ || (r = !1)), o.prototype.eventNames = function() { var t, i, n = []; if (0 === this._eventsCount) return n; for (i in t = this._events) e.call(t, i) && n.push(r ? i.slice(1) : i); return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(t)) : n }, o.prototype.listeners = function(t) {
                    var e = r ? r + t : t,
                        i = this._events[e];
                    if (!i) return [];
                    if (i.fn) return [i.fn];
                    for (var n = 0, a = i.length, s = new Array(a); n < a; n++) s[n] = i[n].fn;
                    return s
                }, o.prototype.listenerCount = function(t) {
                    var e = r ? r + t : t,
                        i = this._events[e];
                    return i ? i.fn ? 1 : i.length : 0
                }, o.prototype.emit = function(t, e, i, n, a, s) {
                    var o = r ? r + t : t;
                    if (!this._events[o]) return !1;
                    var l, u, d = this._events[o],
                        h = arguments.length;
                    if (d.fn) {
                        switch (d.once && this.removeListener(t, d.fn, void 0, !0), h) {
                            case 1:
                                return d.fn.call(d.context), !0;
                            case 2:
                                return d.fn.call(d.context, e), !0;
                            case 3:
                                return d.fn.call(d.context, e, i), !0;
                            case 4:
                                return d.fn.call(d.context, e, i, n), !0;
                            case 5:
                                return d.fn.call(d.context, e, i, n, a), !0;
                            case 6:
                                return d.fn.call(d.context, e, i, n, a, s), !0
                        }
                        for (u = 1, l = new Array(h - 1); u < h; u++) l[u - 1] = arguments[u];
                        d.fn.apply(d.context, l)
                    } else {
                        var c, f = d.length;
                        for (u = 0; u < f; u++) switch (d[u].once && this.removeListener(t, d[u].fn, void 0, !0), h) {
                            case 1:
                                d[u].fn.call(d[u].context);
                                break;
                            case 2:
                                d[u].fn.call(d[u].context, e);
                                break;
                            case 3:
                                d[u].fn.call(d[u].context, e, i);
                                break;
                            case 4:
                                d[u].fn.call(d[u].context, e, i, n);
                                break;
                            default:
                                if (!l)
                                    for (c = 1, l = new Array(h - 1); c < h; c++) l[c - 1] = arguments[c];
                                d[u].fn.apply(d[u].context, l)
                        }
                    }
                    return !0
                }, o.prototype.on = function(t, e, r) { return a(this, t, e, r, !1) }, o.prototype.once = function(t, e, r) { return a(this, t, e, r, !0) }, o.prototype.removeListener = function(t, e, i, n) {
                    var a = r ? r + t : t;
                    if (!this._events[a]) return this;
                    if (!e) return s(this, a), this;
                    var o = this._events[a];
                    if (o.fn) o.fn !== e || n && !o.once || i && o.context !== i || s(this, a);
                    else {
                        for (var l = 0, u = [], d = o.length; l < d; l++)(o[l].fn !== e || n && !o[l].once || i && o[l].context !== i) && u.push(o[l]);
                        u.length ? this._events[a] = 1 === u.length ? u[0] : u : s(this, a)
                    }
                    return this
                }, o.prototype.removeAllListeners = function(t) { var e; return t ? (e = r ? r + t : t, this._events[e] && s(this, e)) : (this._events = new i, this._eventsCount = 0), this }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = r, o.EventEmitter = o, t.exports = o
            },
            945: function(t) {
                var e, r, i, n, a;
                e = /^(?=((?:[a-zA-Z0-9+\-.]+:)?))\1(?=((?:\/\/[^\/?#]*)?))\2(?=((?:(?:[^?#\/]*\/)*[^;?#\/]*)?))\3((?:;[^?#]*)?)(\?[^#]*)?(#[^]*)?$/, r = /^(?=([^\/?#]*))\1([^]*)$/, i = /(?:\/|^)\.(?=\/)/g, n = /(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g, a = {
                    buildAbsoluteURL: function(t, e, i) {
                        if (i = i || {}, t = t.trim(), !(e = e.trim())) { if (!i.alwaysNormalize) return t; var n = a.parseURL(t); if (!n) throw new Error("Error trying to parse base URL."); return n.path = a.normalizePath(n.path), a.buildURLFromParts(n) }
                        var s = a.parseURL(e);
                        if (!s) throw new Error("Error trying to parse relative URL.");
                        if (s.scheme) return i.alwaysNormalize ? (s.path = a.normalizePath(s.path), a.buildURLFromParts(s)) : e;
                        var o = a.parseURL(t);
                        if (!o) throw new Error("Error trying to parse base URL.");
                        if (!o.netLoc && o.path && "/" !== o.path[0]) {
                            var l = r.exec(o.path);
                            o.netLoc = l[1], o.path = l[2]
                        }
                        o.netLoc && !o.path && (o.path = "/");
                        var u = { scheme: o.scheme, netLoc: s.netLoc, path: null, params: s.params, query: s.query, fragment: s.fragment };
                        if (!s.netLoc && (u.netLoc = o.netLoc, "/" !== s.path[0]))
                            if (s.path) {
                                var d = o.path,
                                    h = d.substring(0, d.lastIndexOf("/") + 1) + s.path;
                                u.path = a.normalizePath(h)
                            } else u.path = o.path, s.params || (u.params = o.params, s.query || (u.query = o.query));
                        return null === u.path && (u.path = i.alwaysNormalize ? a.normalizePath(s.path) : s.path), a.buildURLFromParts(u)
                    },
                    parseURL: function(t) { var r = e.exec(t); return r ? { scheme: r[1] || "", netLoc: r[2] || "", path: r[3] || "", params: r[4] || "", query: r[5] || "", fragment: r[6] || "" } : null },
                    normalizePath: function(t) { for (t = t.split("").reverse().join("").replace(i, ""); t.length !== (t = t.replace(n, "")).length;); return t.split("").reverse().join("") },
                    buildURLFromParts: function(t) { return t.scheme + t.netLoc + t.path + t.params + t.query + t.fragment }
                }, t.exports = a
            }
        },
        e = {};

    function r(i) { var n = e[i]; if (void 0 !== n) return n.exports; var a = e[i] = { exports: {} }; return t[i].call(a.exports, a, a.exports, r), a.exports }
    r.m = t, r.n = t => { var e = t && t.__esModule ? () => t.default : () => t; return r.d(e, { a: e }), e }, r.d = (t, e) => { for (var i in e) r.o(e, i) && !r.o(t, i) && Object.defineProperty(t, i, { enumerable: !0, get: e[i] }) }, r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e), r.r = t => { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 }) };
    var i = r(76);
    return i.default
})()));
//# sourceMappingURL=hls.min.js.map