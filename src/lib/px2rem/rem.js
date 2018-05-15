(function (B, A) {
    var z = B.document;
    var y = z.documentElement;
    var x = z.querySelector("meta[name=viewport]");
    var w = z.querySelector("meta[name=H5fit]");
    var v = 0;
    var u = B.devicePixelRatio;
    var t = 0;
    var s;
    var r = A || (A = {});
    if (x) {
        console.warn("根据自定义的meta标签设置缩放");
        var q = x.getAttribute("content").match(/initial\-scale=([\d\.])/);
        if (q) {
            t = parseFloat(q[1]);
            v = parseInt(1 / t)
        }
    } else {
        if (w) {
            var q = w.getAttribute("content");
            if (q) {
                var p = q.match(/initial\-dpr=([\d\.])/);
                var o = q.match(/maximum\-dpr=(\d\.)/);
                if (p) {
                    v = parseFloat(p[1]);
                    t = parseFloat((1 / v).toFixed(2))
                }
                if (o) {
                    v = parseFloat(o[1]) > u ? parseFloat(o[1]) : u;
                    t = parseFloat((1 / v).toFixed(2))
                }
            }
        }
    }
    if (!v && !t) {
        if (u) {
            v = u
        }
        t = 1 / v
    }
    y.setAttribute("data-dpr", v);
    if (!x) {
        x = z.createElement("meta");
        x.setAttribute("name", "viewport");
        x.setAttribute("content", "initial-scale=" + t + ", maximum-scale=" + t + ", minimum-scale=" + t + ", user-scalable=no");
        if (y.firstElementChild) {
            y.firstElementChild.appendChild(x)
        } else {
            var q = z.createElement("div");
            q.appendChild("metaEl");
            z.write(q.innerHTML)
        }
    }
    r.refreshRem = function () {
        var b = y.getBoundingClientRect().width;
        var a = b / 10;
        a = a > 75 ? 75 : a;
        y.style.fontSize = a + "px";
        r.rem = B.rem = a
    };
    r.rem2px = function (b) {
        var a = parseFloat(b) * this.rem;
        if (typeof b === "string" && b.match(/rem$/)) {
            a += "px"
        }
        return a
    };
    r.px2rem = function (b) {
        var a = parseFloat(b) / this.rem;
        if (typeof b === "string" && b.match(/px$/)) {
            a += "rem"
        }
        return a
    };
    B.addEventListener("resize", function () {
        clearTimeout(s);
        s = setTimeout(r.refreshRem, 300)
    }, false);
    B.addEventListener("pageshow", function (a) {
        if (a.persisted) {
            clearTimeout(s);
            s = setTimeout(r.refreshRem, 300)
        }
    }, false);
    if (z.readyState === "complete") {
        z.body.style.fontSize = 12 * v + "px"
    } else {
        z.addEventListener("DOMContentLoaded", function (a) {
            z.body.style.fontSize = 12 * v + "px"
        }, false)
    }
    r.refreshRem();
    r.dpr = B.dpr = v
})(window, window.H5fit || (window.H5fit = {}));