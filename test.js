var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  var e, t = _gsScope.document, p = t.defaultView ? t.defaultView.getComputedStyle : function () {
    }, g = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
    _ = -1 !== ((_gsScope.navigator || {}).userAgent || "").indexOf("Edge"), C = "DrawSVGPlugin",
    S = String.fromCharCode(103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109), // greensock.com
    m = String.fromCharCode(47, 114, 101, 113, 117, 105, 114, 101, 115, 45, 109, 101, 109, 98, 101, 114, 115, 104, 105, 112, 47),
    w = true;

  function l(e, t, r, o, i, s) {
    return r = (parseFloat(r || 0) - parseFloat(e || 0)) * i, o = (parseFloat(o || 0) - parseFloat(t || 0)) * s, Math.sqrt(r * r + o * o)
  }

  function c(e) {
    return "string" != typeof e && e.nodeType || (e = _gsScope.TweenLite.selector(e)).length && (e = e[0]), e
  }

  function y(e) {
    if (!e) return 0;
    var t, r, o, i, s, n, a, h = (e = c(e)).tagName.toLowerCase(), f = 1, d = 1;
    "non-scaling-stroke" === e.getAttribute("vector-effect") && (d = e.getScreenCTM(), f = Math.sqrt(d.a * d.a + d.b * d.b), d = Math.sqrt(d.d * d.d + d.c * d.c));
    try {
      r = e.getBBox()
    } catch (e) {
    }
    if (r && (r.width || r.height) || "rect" !== h && "circle" !== h && "ellipse" !== h || (r = {
      width: parseFloat(e.getAttribute("rect" === h ? "width" : "circle" === h ? "r" : "rx")),
      height: parseFloat(e.getAttribute("rect" === h ? "height" : "circle" === h ? "r" : "ry"))
    }, "rect" !== h && (r.width *= 2, r.height *= 2)), "path" === h) i = e.style.strokeDasharray, e.style.strokeDasharray = "none", t = e.getTotalLength() || 0, f !== d && console.log("Warning: <path> length cannot be measured accurately when vector-effect is non-scaling-stroke and the element isn't proportionally scaled."), t *= (f + d) / 2, e.style.strokeDasharray = i; else if ("rect" === h) t = 2 * r.width * f + 2 * r.height * d; else if ("line" === h) t = l(r.x, r.y, r.x + r.width, r.y + r.height, f, d); else if ("polyline" === h || "polygon" === h) for (o = e.getAttribute("points").match(g) || [], "polygon" === h && o.push(o[0], o[1]), t = 0, s = 2; s < o.length; s += 2) t += l(o[s - 2], o[s - 1], o[s], o[s + 1], f, d) || 0; else "circle" !== h && "ellipse" !== h || (n = r.width / 2 * f, a = r.height / 2 * d, t = Math.PI * (3 * (n + a) - Math.sqrt((3 * n + a) * (n + 3 * a))));
    return t || 0
  }

  function x(e, t) {
    if (!e) return [0, 0];
    e = c(e), t = t || y(e) + 1;
    var r = p(e), o = r.strokeDasharray || "", i = parseFloat(r.strokeDashoffset), s = o.indexOf(",");
    return s < 0 && (s = o.indexOf(" ")), t < (o = s < 0 ? t : parseFloat(o.substr(0, s)) || 1e-5) && (o = t), [Math.max(0, -i), Math.max(0, o - i)]
  }

  (e = _gsScope._gsDefine.plugin({
    propName: "drawSVG",
    API: 2,
    version: "0.2.0",
    global: !0,
    overwriteProps: ["drawSVG"],
    init: function (e, t, r, o) {
      if (!e.getBBox) return !1;
      if (!w) return window.location.href = "http://" + S + m + "?plugin=" + C + "&source=codepen", !1;
      var i, s, n, a, h, f, d, g, l, c, u = y(e) + 1;
      return this._style = e.style, this._target = e, "function" == typeof t && (t = t(o, e)), !0 === t || "true" === t ? t = "0 100%" : t ? -1 === (t + "").indexOf(" ") && (t = "0 " + t) : t = "0 0", i = x(e, u), h = t, f = u, d = i[0], -1 === (c = h.indexOf(" ")) ? (g = void 0 !== d ? d + "" : h, l = h) : (g = h.substr(0, c), l = h.substr(c + 1)), g = -1 !== g.indexOf("%") ? parseFloat(g) / 100 * f : parseFloat(g), s = (l = -1 !== l.indexOf("%") ? parseFloat(l) / 100 * f : parseFloat(l)) < g ? [l, g] : [g, l], this._length = u + 10, 0 === i[0] && 0 === s[0] ? (n = Math.max(1e-5, s[1] - u), this._dash = u + n, this._offset = u - i[1] + n, this._offsetPT = this._addTween(this, "_offset", this._offset, u - s[1] + n, "drawSVG")) : (this._dash = i[1] - i[0] || 1e-6, this._offset = -i[0], this._dashPT = this._addTween(this, "_dash", this._dash, s[1] - s[0] || 1e-5, "drawSVG"), this._offsetPT = this._addTween(this, "_offset", this._offset, -s[0], "drawSVG")), _ && (a = p(e)).strokeLinecap !== a.strokeLinejoin && (s = parseFloat(a.strokeMiterlimit), this._addTween(e.style, "strokeMiterlimit", s, s + 1e-4, "strokeMiterlimit")), this._isNonScaling = "non-scaling-stroke" === e.getAttribute("vector-effect"), !0
    },
    set: function (e) {
      if (this._firstPT) {
        if (this._isNonScaling) {
          var t, r = y(this._target) + 11;
          r !== this._length && (t = r / this._length, this._length = r, this._offsetPT.s *= t, this._offsetPT.c *= t, this._dashPT ? (this._dashPT.s *= t, this._dashPT.c *= t) : this._dash *= t)
        }
        this._super.setRatio.call(this, e), this._style.strokeDashoffset = this._offset, this._style.strokeDasharray = 1 === e || 0 === e ? this._offset < .001 && this._length - this._dash <= 10 ? "none" : this._offset === this._dash ? "0px, 999999px" : this._dash + "px," + this._length + "px" : this._dash + "px," + this._length + "px"
      }
    }
  })).getLength = y, e.getPosition = x
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function (e) {
  "use strict";
  var t = function () {
    return (_gsScope.GreenSockGlobals || _gsScope).DrawSVGPlugin
  };
  "undefined" != typeof module && module.exports ? (require("../TweenLite.js"), module.exports = t()) : "function" == typeof define && define.amd && define(["TweenLite"], t)
}();
