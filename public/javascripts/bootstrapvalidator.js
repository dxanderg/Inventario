/**
 * BootstrapValidator (http://bootstrapvalidator.com)
 *
 * The best jQuery plugin to validate form fields. Designed to use with Bootstrap 3
 *
 * @version     v0.4.5
 * @author      https://twitter.com/nghuuphuoc
 * @copyright   (c) 2013 - 2014 Nguyen Huu Phuoc
 * @license     MIT
 */

! function(a) {
    var b = function(c, d) {
        this.$form = a(c), this.options = a.extend({}, b.DEFAULT_OPTIONS, d), this.$invalidField = null, this.$submitButton = null, this.STATUS_NOT_VALIDATED = "NOT_VALIDATED", this.STATUS_VALIDATING = "VALIDATING", this.STATUS_INVALID = "INVALID", this.STATUS_VALID = "VALID";
        var e = function() {
                for (var a = 3, b = document.createElement("div"), c = b.all || []; b.innerHTML = "<!--[if gt IE " + ++a + "]><br><![endif]-->", c[0];);
                return a > 4 ? a : !a
            }(),
            f = document.createElement("div");
        this._changeEvent = 9 !== e && "oninput" in f ? "input" : "keyup", this._submitIfValid = null, this._init()
    };
    b.DEFAULT_OPTIONS = {
        elementClass: "bv-form",
        message: "Este valor es invalido",
        threshold: null,
        excluded: [":disabled", ":hidden", ":not(:visible)"],
        feedbackIcons: {
            valid: null,
            invalid: null,
            validating: null
        },
        submitButtons: '[type="submit"]',
        submitHandler: null,
        live: "enabled",
        fields: null
    }, b.prototype = {
        constructor: b,
        _init: function() {
            var b, c, d, e, f, g, h, i = this,
                j = {
                    excluded: this.$form.attr("data-bv-excluded"),
                    trigger: this.$form.attr("data-bv-trigger"),
                    message: this.$form.attr("data-bv-message"),
                    submitButtons: this.$form.attr("data-bv-submitbuttons"),
                    threshold: this.$form.attr("data-bv-threshold"),
                    live: this.$form.attr("data-bv-live"),
                    fields: {},
                    feedbackIcons: {
                        valid: this.$form.attr("data-bv-feedbackicons-valid"),
                        invalid: this.$form.attr("data-bv-feedbackicons-invalid"),
                        validating: this.$form.attr("data-bv-feedbackicons-validating")
                    }
                };
            this.$form.attr("novalidate", "novalidate").addClass(this.options.elementClass).on("submit.bv", function(a) {
                a.preventDefault(), i.validate()
            }).on("click", this.options.submitButtons, function() {
                i.$submitButton = a(this), i._submitIfValid = !0
            }).find("[name], [data-bv-field]").each(function() {
                var k = a(this);
                if (!i._isExcluded(k)) {
                    var l = k.attr("name") || k.attr("data-bv-field"),
                        m = {};
                    for (c in a.fn.bootstrapValidator.validators)
                        if (b = a.fn.bootstrapValidator.validators[c], d = k.attr("data-bv-" + c.toLowerCase()) + "", h = "function" == typeof b.enableByHtml5 ? b.enableByHtml5(a(this)) : null, h && "false" != d || h !== !0 && ("" == d || "true" == d)) {
                            b.html5Attributes = b.html5Attributes || {
                                message: "message"
                            }, m[c] = a.extend({}, 1 == h ? {} : h, m[c]);
                            for (g in b.html5Attributes) e = b.html5Attributes[g], f = k.attr("data-bv-" + c.toLowerCase() + "-" + g), f && ("true" == f ? f = !0 : "false" == f && (f = !1), m[c][e] = f)
                        }
                    var n = {
                        trigger: k.attr("data-bv-trigger"),
                        message: k.attr("data-bv-message"),
                        container: k.attr("data-bv-container"),
                        selector: k.attr("data-bv-selector"),
                        threshold: k.attr("data-bv-threshold"),
                        validators: m
                    };
                    a.isEmptyObject(n.validators) || a.isEmptyObject(n) || (k.attr("data-bv-field", l), j.fields[l] = a.extend({}, n, j.fields[l]))
                }
            }).end().find(this.options.submitButtons).each(function() {
                a("<input/>").attr("type", "hidden").attr("name", a(this).attr("name")).val(a(this).val()).appendTo(i.$form)
            }), this.options = a.extend(!0, this.options, j);
            for (var k in this.options.fields) this._initField(k);
            this.setLiveMode(this.options.live)
        },
        _initField: function(b) {
            if (null != this.options.fields[b] && null != this.options.fields[b].validators) {
                var c = this.getFieldElements(b);
                if (null == c) return void delete this.options.fields[b];
                for (var d in this.options.fields[b].validators) a.fn.bootstrapValidator.validators[d] || delete this.options.fields[b].validators[d];
                for (var e = this, f = c.attr("type"), g = "radio" == f || "checkbox" == f || "file" == f || "SELECT" == c[0].tagName ? "change" : e._changeEvent, h = c.length, i = 1 == h || "radio" == f || "checkbox" == f, j = 0; h > j; j++) {
                    var k = a(c[j]),
                        l = k.parents(".form-group"),
                        m = this.options.fields[b].container ? l.find(this.options.fields[b].container) : this._getMessageContainer(k);
                    k.attr("data-bv-field") || k.attr("data-bv-field", b), k.on(g + ".update.bv", function() {
                        e._submitIfValid = !1, i ? e.updateStatus(b, e.STATUS_NOT_VALIDATED, null) : e.updateElementStatus(a(this), e.STATUS_NOT_VALIDATED, null)
                    }), k.data("bv.messages", m);
                    for (d in this.options.fields[b].validators) k.data("bv.result." + d, this.STATUS_NOT_VALIDATED), i && j != h - 1 || a("<small/>").css("display", "none").attr("data-bv-validator", d).attr("data-bv-validator-for", b).html(this.options.fields[b].validators[d].message || this.options.fields[b].message || this.options.message).addClass("alert-danger").appendTo(m);
                    if (this.options.feedbackIcons && this.options.feedbackIcons.validating && this.options.feedbackIcons.invalid && this.options.feedbackIcons.valid && (!i || j == h - 1)) {
                        l.addClass("has-feedback");
                        var n = a("<i/>").css("display", "none").addClass("form-control-feedback").attr("data-bv-icon-for", b).insertAfter(k);
                        0 == l.find("label").length && n.css("top", 0)
                    }
                }
                null == this.options.fields[b].enabled && (this.options.fields[b].enabled = !0)
            }
        },
        _getMessageContainer: function(a) {
            var b = a.parent();
            if (b.hasClass("form-group")) return b;
            var c = b.attr("class");
            if (!c) return this._getMessageContainer(b);
            c = c.split(" ");
            for (var d = c.length, e = 0; d > e; e++)
                if (/^col-(xs|sm|md|lg)-\d+$/.test(c[e]) || /^col-(xs|sm|md|lg)-offset-\d+$/.test(c[e])) return b;
            return this._getMessageContainer(b)
        },
        _submit: function() {
            if (this.isValid()) this.options.submitHandler && "function" == typeof this.options.submitHandler ? this.options.submitHandler.call(this, this, this.$form, this.$submitButton) : this.disableSubmitButtons(!0).defaultSubmit();
            else if ("submitted" == this.options.live && this.setLiveMode("enabled"), this.$invalidField) {
                var b, c = this.$invalidField.parents(".tab-pane");
                c && (b = c.attr("id")) && a('a[href="#' + b + '"][data-toggle="tab"]').trigger("click.bs.tab.data-api"), this.$invalidField.focus()
            }
        },
        _isExcluded: function(b) {
            if (this.options.excluded) {
                "string" == typeof this.options.excluded && (this.options.excluded = a.map(this.options.excluded.split(","), function(b) {
                    return a.trim(b)
                }));
                for (var c = this.options.excluded.length, d = 0; c > d; d++)
                    if ("string" == typeof this.options.excluded[d] && b.is(this.options.excluded[d]) || "function" == typeof this.options.excluded[d] && 1 == this.options.excluded[d].call(this, b, this)) return !0
            }
            return !1
        },
        _exceedThreshold: function(a) {
            var b = a.attr("data-bv-field"),
                c = this.options.fields[b].threshold || this.options.threshold;
            if (!c) return !0;
            var d = a.attr("type"),
                e = -1 != ["button", "checkbox", "file", "hidden", "image", "radio", "reset", "submit"].indexOf(d);
            return e || a.val().length >= c
        },
        getFieldElements: function(b) {
            var c = this.options.fields[b].selector ? a(this.options.fields[b].selector) : this.$form.find('[name="' + b + '"]');
            return 0 == c.length ? null : c
        },
        setLiveMode: function(b) {
            if (this.options.live = b, "submitted" == b) return this;
            var c = this;
            for (var d in this.options.fields) ! function(e) {
                var f = c.getFieldElements(e);
                if (f)
                    for (var g = f.attr("type"), h = f.length, i = 1 == h || "radio" == g || "checkbox" == g, j = c.options.fields[d].trigger || c.options.trigger || ("radio" == g || "checkbox" == g || "file" == g || "SELECT" == f[0].tagName ? "change" : c._changeEvent), k = a.map(j.split(" "), function(a) {
                            return a + ".live.bv"
                        }).join(" "), l = 0; h > l; l++) "enabled" == b ? a(f[l]).on(k, function() {
                        c._exceedThreshold(a(this)) && (i ? c.validateField(e) : c.validateFieldElement(a(this), !1))
                    }) : a(f[l]).off(k)
            }(d);
            return this
        },
        disableSubmitButtons: function(a) {
            return a ? "disabled" != this.options.live && this.$form.find(this.options.submitButtons).attr("disabled", "disabled") : this.$form.find(this.options.submitButtons).removeAttr("disabled"), this
        },
        validate: function() {
            if (!this.options.fields) return this;
            this.disableSubmitButtons(!0);
            for (var a in this.options.fields) this.validateField(a);
            return this.$submitButton && this._submit(), this
        },
        validateField: function(b) {
            for (var c = this.getFieldElements(b), d = c.attr("type"), e = "radio" == d || "checkbox" == d ? 1 : c.length, f = 0; e > f; f++) this.validateFieldElement(a(c[f]), 1 == e);
            return this
        },
        validateFieldElement: function(b, c) {
            var d, e, f = this,
                g = b.attr("data-bv-field"),
                h = this.options.fields[g].validators;
            if (!this.options.fields[g].enabled || this._isExcluded(b)) return this;
            for (d in h) {
                b.data("bv.dfs." + d) && b.data("bv.dfs." + d).reject();
                var i = b.data("bv.result." + d);
                i != this.STATUS_VALID && i != this.STATUS_INVALID && (b.data("bv.result." + d, this.STATUS_VALIDATING), e = a.fn.bootstrapValidator.validators[d].validate(this, b, h[d]), "object" == typeof e ? (c ? this.updateStatus(g, this.STATUS_VALIDATING, d) : this.updateElementStatus(b, this.STATUS_VALIDATING, d), b.data("bv.dfs." + d, e), e.done(function(a, b, d) {
                    a.removeData("bv.dfs." + b), c ? f.updateStatus(a.attr("data-bv-field"), d ? f.STATUS_VALID : f.STATUS_INVALID, b) : f.updateElementStatus(a, d ? f.STATUS_VALID : f.STATUS_INVALID, b), d && 1 == f._submitIfValid && f._submit()
                })) : "boolean" == typeof e && (c ? this.updateStatus(g, e ? this.STATUS_VALID : this.STATUS_INVALID, d) : this.updateElementStatus(b, e ? this.STATUS_VALID : this.STATUS_INVALID, d)))
            }
            return this
        },
        updateStatus: function(b, c, d) {
            for (var e = this.getFieldElements(b), f = e.attr("type"), g = "radio" == f || "checkbox" == f ? 1 : e.length, h = 0; g > h; h++) this.updateElementStatus(a(e[h]), c, d);
            return this
        },
        updateElementStatus: function(b, c, d) {
            var e = this,
                f = b.attr("data-bv-field"),
                g = b.parents(".form-group"),
                h = b.data("bv.messages"),
                i = h.find(".alert-danger[data-bv-validator]"),
                j = g.find('.form-control-feedback[data-bv-icon-for="' + f + '"]');
            if (d) b.data("bv.result." + d, c);
            else
                for (var k in this.options.fields[f].validators) b.data("bv.result." + k, c);
            var l, m, n = b.parents(".tab-pane");
            switch (n && (l = n.attr("id")) && (m = a('a[href="#' + l + '"][data-toggle="tab"]').parent()), c) {
                case this.STATUS_VALIDATING:
                    this.disableSubmitButtons(!0), g.removeClass("has-success").removeClass("has-error"), d ? i.filter('.alert-danger[data-bv-validator="' + d + '"]').hide() : i.hide(), j && j.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.invalid).addClass(this.options.feedbackIcons.validating).show(), m && m.removeClass("bv-tab-success").removeClass("bv-tab-error");
                    break;
                case this.STATUS_INVALID:
                    this.disableSubmitButtons(!0), g.removeClass("has-success").addClass("has-error"), d ? i.filter('[data-bv-validator="' + d + '"]').show() : i.show(), j && j.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.validating).addClass(this.options.feedbackIcons.invalid).show(), m && m.removeClass("bv-tab-success").addClass("bv-tab-error");
                    break;
                case this.STATUS_VALID:
                    d ? i.filter('[data-bv-validator="' + d + '"]').hide() : i.hide();
                    var o = 0 == i.filter(function() {
                        var c = a(this).css("display"),
                            d = a(this).attr("data-bv-validator");
                        return "block" == c || b.data("bv.result." + d) != e.STATUS_VALID
                    }).length;
                    this.disableSubmitButtons(!o), j && j.removeClass(this.options.feedbackIcons.invalid).removeClass(this.options.feedbackIcons.validating).removeClass(this.options.feedbackIcons.valid).addClass(o ? this.options.feedbackIcons.valid : this.options.feedbackIcons.invalid).show();
                    var p = function(c) {
                        return 0 == c.find(".alert-danger[data-bv-validator]").filter(function() {
                            var c = a(this).css("display"),
                                d = a(this).attr("data-bv-validator");
                            return "block" == c || b.data("bv.result." + d) && b.data("bv.result." + d) != e.STATUS_VALID
                        }).length
                    };
                    g.removeClass("has-error has-success").addClass(p(g) ? "has-success" : "has-error"), m && m.removeClass("bv-tab-success").removeClass("bv-tab-error").addClass(p(n) ? "bv-tab-success" : "bv-tab-error");
                    break;
                case this.STATUS_NOT_VALIDATED:
                default:
                    this.disableSubmitButtons(!1), g.removeClass("has-success").removeClass("has-error"), d ? i.filter('.alert-danger[data-bv-validator="' + d + '"]').hide() : i.hide(), j && j.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.invalid).removeClass(this.options.feedbackIcons.validating).hide(), m && m.removeClass("bv-tab-success").removeClass("bv-tab-error")
            }
            return this
        },
        isValid: function() {
            var b, c, d, e, f, g, h, i;
            for (c in this.options.fields)
                if (null != this.options.fields[c] && this.options.fields[c].enabled)
                    for (b = this.getFieldElements(c), e = b.attr("type"), h = "radio" == e || "checkbox" == e ? 1 : b.length, i = 0; h > i; i++)
                        if (d = a(b[i]), !this._isExcluded(d))
                            for (g in this.options.fields[c].validators) {
                                if (f = d.data("bv.result." + g), f == this.STATUS_NOT_VALIDATED || f == this.STATUS_VALIDATING) return !1;
                                if (f == this.STATUS_INVALID) return this.$invalidField = d, !1
                            }
                        return !0
        },
        defaultSubmit: function() {
            this.$form.off("submit.bv").submit()
        },
        resetForm: function(b) {
            var c, d, e, f, g;
            for (c in this.options.fields) {
                d = this.getFieldElements(c), e = d.length;
                for (var h = 0; e > h; h++)
                    for (g in this.options.fields[c].validators) a(d[h]).removeData("bv.dfs." + g);
                this.updateStatus(c, this.STATUS_NOT_VALIDATED, null), b && (f = d.attr("type"), "radio" == f || "checkbox" == f ? d.removeAttr("checked").removeAttr("selected") : d.val(""))
            }
            return this.$invalidField = null, this.$submitButton = null, this.disableSubmitButtons(!1), this
        },
        enableFieldValidators: function(a, b) {
            return this.options.fields[a].enabled = b, this.updateStatus(a, this.STATUS_NOT_VALIDATED, null), this
        }
    }, a.fn.bootstrapValidator = function(c) {
        var d = arguments;
        return this.each(function() {
            var e = a(this),
                f = e.data("bootstrapValidator"),
                g = "object" == typeof c && c;
            f || (f = new b(this, g), e.data("bootstrapValidator", f)), "string" == typeof c && f[c].apply(f, Array.prototype.slice.call(d, 1))
        })
    }, a.fn.bootstrapValidator.validators = {}, a.fn.bootstrapValidator.Constructor = b, a.fn.bootstrapValidator.helpers = {
        date: function(a, b, c, d) {
            if (1e3 > a || a > 9999 || 0 == b || b > 12) return !1;
            var e = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if ((a % 400 == 0 || a % 100 != 0 && a % 4 == 0) && (e[1] = 29), 0 > c || c > e[b - 1]) return !1;
            if (d === !0) {
                var f = new Date,
                    g = f.getFullYear(),
                    h = f.getMonth(),
                    i = f.getDate();
                return g > a || a == g && h > b - 1 || a == g && b - 1 == h && i > c
            }
            return !0
        },
        luhn: function(a) {
            for (var b = a.length, c = 0, d = [
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                    [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
                ], e = 0; b--;) e += d[c][parseInt(a.charAt(b), 10)], c ^= 1;
            return e % 10 === 0 && e > 0
        },
        mod_11_10: function(a) {
            for (var b = 5, c = a.length, d = 0; c > d; d++) b = (2 * (b || 10) % 11 + parseInt(a.charAt(d), 10)) % 10;
            return 1 == b
        },
        mod_37_36: function(a, b) {
            b = b || "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            for (var c = b.length, d = a.length, e = Math.floor(c / 2), f = 0; d > f; f++) e = (2 * (e || c) % (c + 1) + b.indexOf(a.charAt(f))) % c;
            return 1 == e
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.base64 = {
        validate: function(a, b) {
            var c = b.val();
            return "" == c ? !0 : /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(c)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.between = {
        html5Attributes: {
            message: "message",
            min: "min",
            max: "max",
            inclusive: "inclusive"
        },
        enableByHtml5: function(a) {
            return "range" == a.attr("type") ? {
                min: a.attr("min"),
                max: a.attr("max")
            } : !1
        },
        validate: function(a, b, c) {
            var d = b.val();
            return "" == d ? !0 : (d = parseFloat(d), c.inclusive === !0 ? d > c.min && d < c.max : d >= c.min && d <= c.max)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.callback = {
        validate: function(b, c, d) {
            var e = c.val();
            if (d.callback && "function" == typeof d.callback) {
                var f = new a.Deferred;
                return f.resolve(c, "callback", d.callback.call(this, e, b)), f
            }
            return !0
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.choice = {
        html5Attributes: {
            message: "message",
            min: "min",
            max: "max"
        },
        validate: function(a, b, c) {
            var d = b.is("select") ? a.getFieldElements(b.attr("data-bv-field")).find("option").filter(":selected").length : a.getFieldElements(b.attr("data-bv-field")).filter(":checked").length;
            return c.min && d < c.min || c.max && d > c.max ? !1 : !0
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.creditCard = {
        validate: function(b, c) {
            var d = c.val();
            if ("" == d) return !0;
            if (/[^0-9-\s]+/.test(d)) return !1;
            if (d = d.replace(/\D/g, ""), !a.fn.bootstrapValidator.helpers.luhn(d)) return !1;
            var e, f, g = {
                AMERICAN_EXPRESS: {
                    length: [15],
                    prefix: ["34", "37"]
                },
                DINERS_CLUB: {
                    length: [14],
                    prefix: ["300", "301", "302", "303", "304", "305", "36"]
                },
                DINERS_CLUB_US: {
                    length: [16],
                    prefix: ["54", "55"]
                },
                DISCOVER: {
                    length: [16],
                    prefix: ["6011", "622126", "622127", "622128", "622129", "62213", "62214", "62215", "62216", "62217", "62218", "62219", "6222", "6223", "6224", "6225", "6226", "6227", "6228", "62290", "62291", "622920", "622921", "622922", "622923", "622924", "622925", "644", "645", "646", "647", "648", "649", "65"]
                },
                JCB: {
                    length: [16],
                    prefix: ["3528", "3529", "353", "354", "355", "356", "357", "358"]
                },
                LASER: {
                    length: [16, 17, 18, 19],
                    prefix: ["6304", "6706", "6771", "6709"]
                },
                MAESTRO: {
                    length: [12, 13, 14, 15, 16, 17, 18, 19],
                    prefix: ["5018", "5020", "5038", "6304", "6759", "6761", "6762", "6763", "6764", "6765", "6766"]
                },
                MASTERCARD: {
                    length: [16],
                    prefix: ["51", "52", "53", "54", "55"]
                },
                SOLO: {
                    length: [16, 18, 19],
                    prefix: ["6334", "6767"]
                },
                UNIONPAY: {
                    length: [16, 17, 18, 19],
                    prefix: ["622126", "622127", "622128", "622129", "62213", "62214", "62215", "62216", "62217", "62218", "62219", "6222", "6223", "6224", "6225", "6226", "6227", "6228", "62290", "62291", "622920", "622921", "622922", "622923", "622924", "622925"]
                },
                VISA: {
                    length: [16],
                    prefix: ["4"]
                }
            };
            for (e in g)
                for (f in g[e].prefix)
                    if (d.substr(0, g[e].prefix[f].length) == g[e].prefix[f] && -1 != g[e].length.indexOf(d.length)) return !0;
            return !1
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.cusip = {
        validate: function(b, c) {
            var d = c.val();
            if ("" == d) return !0;
            if (d = d.toUpperCase(), !/^[0-9A-Z]{9}$/.test(d)) return !1;
            for (var e = a.map(d.split(""), function(a) {
                    var b = a.charCodeAt(0);
                    return b >= "A".charCodeAt(0) && b <= "Z".charCodeAt(0) ? b - "A".charCodeAt(0) + 10 : a
                }), f = e.length, g = 0, h = 0; f - 1 > h; h++) {
                var i = parseInt(e[h]);
                h % 2 != 0 && (i *= 2), i > 9 && (i -= 9), g += i
            }
            return g = (10 - g % 10) % 10, g == e[f - 1]
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.cvv = {
        html5Attributes: {
            message: "message",
            ccfield: "creditCardField"
        },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" == d) return !0;
            if (!/^[0-9]{3,4}$/.test(d)) return !1;
            if (!c.creditCardField) return !0;
            var e = a.getFieldElements(c.creditCardField).val();
            if ("" == e) return !0;
            e = e.replace(/\D/g, "");
            var f, g, h = {
                    AMERICAN_EXPRESS: {
                        length: [15],
                        prefix: ["34", "37"]
                    },
                    DINERS_CLUB: {
                        length: [14],
                        prefix: ["300", "301", "302", "303", "304", "305", "36"]
                    },
                    DINERS_CLUB_US: {
                        length: [16],
                        prefix: ["54", "55"]
                    },
                    DISCOVER: {
                        length: [16],
                        prefix: ["6011", "622126", "622127", "622128", "622129", "62213", "62214", "62215", "62216", "62217", "62218", "62219", "6222", "6223", "6224", "6225", "6226", "6227", "6228", "62290", "62291", "622920", "622921", "622922", "622923", "622924", "622925", "644", "645", "646", "647", "648", "649", "65"]
                    },
                    JCB: {
                        length: [16],
                        prefix: ["3528", "3529", "353", "354", "355", "356", "357", "358"]
                    },
                    LASER: {
                        length: [16, 17, 18, 19],
                        prefix: ["6304", "6706", "6771", "6709"]
                    },
                    MAESTRO: {
                        length: [12, 13, 14, 15, 16, 17, 18, 19],
                        prefix: ["5018", "5020", "5038", "6304", "6759", "6761", "6762", "6763", "6764", "6765", "6766"]
                    },
                    MASTERCARD: {
                        length: [16],
                        prefix: ["51", "52", "53", "54", "55"]
                    },
                    SOLO: {
                        length: [16, 18, 19],
                        prefix: ["6334", "6767"]
                    },
                    UNIONPAY: {
                        length: [16, 17, 18, 19],
                        prefix: ["622126", "622127", "622128", "622129", "62213", "62214", "62215", "62216", "62217", "62218", "62219", "6222", "6223", "6224", "6225", "6226", "6227", "6228", "62290", "62291", "622920", "622921", "622922", "622923", "622924", "622925"]
                    },
                    VISA: {
                        length: [16],
                        prefix: ["4"]
                    }
                },
                i = null;
            for (f in h)
                for (g in h[f].prefix)
                    if (e.substr(0, h[f].prefix[g].length) == h[f].prefix[g] && -1 != h[f].length.indexOf(e.length)) {
                        i = f;
                        break
                    }
            return null == i ? !1 : "AMERICAN_EXPRESS" == i ? 4 == d.length : 3 == d.length
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.date = {
        html5Attributes: {
            message: "message",
            format: "format"
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" == e) return !0;
            d.format = d.format || "MM/DD/YYYY";
            var f = d.format.split(" "),
                g = f[0],
                h = f.length > 1 ? f[1] : null,
                i = f.length > 2 ? f[2] : null,
                j = e.split(" "),
                k = j[0],
                l = j.length > 1 ? j[1] : null;
            if (f.length != j.length) return !1;
            var m = -1 != k.indexOf("/") ? "/" : -1 != k.indexOf("-") ? "-" : null;
            if (null == m) return !1;
            k = k.split(m), g = g.split(m);
            var n = k[g.indexOf("YYYY")],
                o = k[g.indexOf("MM")],
                p = k[g.indexOf("DD")],
                q = null,
                r = null,
                s = null;
            if (h) {
                if (h = h.split(":"), l = l.split(":"), h.length != l.length) return !1;
                if (r = l.length > 0 ? l[0] : null, q = l.length > 1 ? l[1] : null, s = l.length > 2 ? l[2] : null, s && (s = parseInt(s, 10), 0 > s || s > 60)) return !1;
                if (r && (r = parseInt(r, 10), 0 > r || r >= 24 || i && r > 12)) return !1;
                if (q && (q = parseInt(q, 10), 0 > q || q > 59)) return !1
            }
            return p = parseInt(p, 10), o = parseInt(o, 10), n = parseInt(n, 10), a.fn.bootstrapValidator.helpers.date(n, o, p)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.different = {
        html5Attributes: {
            message: "message",
            field: "field"
        },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" == d) return !0;
            var e = a.getFieldElements(c.field);
            return null == e ? !0 : d != e.val() ? (a.updateStatus(c.field, a.STATUS_VALID, "different"), !0) : !1
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.digits = {
        validate: function(a, b) {
            var c = b.val();
            return "" == c ? !0 : /^\d+$/.test(c)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.ean = {
        validate: function(a, b) {
            var c = b.val();
            if ("" == c) return !0;
            if (!/^(\d{8}|\d{12}|\d{13})$/.test(c)) return !1;
            for (var d = c.length, e = 0, f = 8 == d ? [3, 1] : [1, 3], g = 0; d - 1 > g; g++) e += parseInt(c.charAt(g)) * f[g % 2];
            return e = 10 - e % 10, e == c.charAt(d - 1)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.emailAddress = {
        enableByHtml5: function(a) {
            return "email" == a.attr("type")
        },
        validate: function(a, b) {
            var c = b.val();
            if ("" == c) return !0;
            var d = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return d.test(c)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.file = {
        html5Attributes: {
            extension: "extension",
            maxsize: "maxSize",
            message: "message",
            type: "type"
        },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" == d) return !0;
            var e, f = c.extension ? c.extension.split(",") : null,
                g = c.type ? c.type.split(",") : null,
                h = window.File && window.FileList && window.FileReader;
            if (h)
                for (var i = b.get(0).files, j = i.length, k = 0; j > k; k++) {
                    if (c.maxSize && i[k].size > parseInt(c.maxSize)) return !1;
                    if (e = i[k].name.substr(i[k].name.lastIndexOf(".") + 1), f && -1 == f.indexOf(e)) return !1;
                    if (g && -1 == g.indexOf(i[k].type)) return !1
                } else if (e = d.substr(d.lastIndexOf(".") + 1), f && -1 == f.indexOf(e)) return !1;
            return !0
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.greaterThan = {
        html5Attributes: {
            message: "message",
            value: "value",
            inclusive: "inclusive"
        },
        enableByHtml5: function(a) {
            var b = a.attr("min");
            return b ? {
                value: b
            } : !1
        },
        validate: function(a, b, c) {
            var d = b.val();
            return "" == d ? !0 : (d = parseFloat(d), c.inclusive === !0 ? d > c.value : d >= c.value)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.grid = {
        validate: function(b, c) {
            var d = c.val();
            return "" == d ? !0 : (d = d.toUpperCase(), /^[GRID:]*([0-9A-Z]{2})[-\s]*([0-9A-Z]{5})[-\s]*([0-9A-Z]{10})[-\s]*([0-9A-Z]{1})$/g.test(d) ? (d = d.replace(/\s/g, "").replace(/-/g, ""), "GRID:" == d.substr(0, 5) && (d = d.substr(5)), a.fn.bootstrapValidator.helpers.mod_37_36(d)) : !1)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.hex = {
        validate: function(a, b) {
            var c = b.val();
            return "" == c ? !0 : /^[0-9a-fA-F]+$/.test(c)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.hexColor = {
        enableByHtml5: function(a) {
            return "color" == a.attr("type")
        },
        validate: function(a, b) {
            var c = b.val();
            return "" == c ? !0 : /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(c)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.iban = {
        html5Attributes: {
            message: "message",
            country: "country"
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" == e) return !0;
            var f = {
                AD: "AD[0-9]{2}[0-9]{4}[0-9]{4}[A-Z0-9]{12}",
                AE: "AE[0-9]{2}[0-9]{3}[0-9]{16}",
                AL: "AL[0-9]{2}[0-9]{8}[A-Z0-9]{16}",
                AO: "AO[0-9]{2}[0-9]{21}",
                AT: "AT[0-9]{2}[0-9]{5}[0-9]{11}",
                AZ: "AZ[0-9]{2}[A-Z]{4}[A-Z0-9]{20}",
                BA: "BA[0-9]{2}[0-9]{3}[0-9]{3}[0-9]{8}[0-9]{2}",
                BE: "BE[0-9]{2}[0-9]{3}[0-9]{7}[0-9]{2}",
                BF: "BF[0-9]{2}[0-9]{23}",
                BG: "BG[0-9]{2}[A-Z]{4}[0-9]{4}[0-9]{2}[A-Z0-9]{8}",
                BH: "BH[0-9]{2}[A-Z]{4}[A-Z0-9]{14}",
                BI: "BI[0-9]{2}[0-9]{12}",
                BJ: "BJ[0-9]{2}[A-Z]{1}[0-9]{23}",
                BR: "BR[0-9]{2}[0-9]{8}[0-9]{5}[0-9]{10}[A-Z][A-Z0-9]",
                CH: "CH[0-9]{2}[0-9]{5}[A-Z0-9]{12}",
                CI: "CI[0-9]{2}[A-Z]{1}[0-9]{23}",
                CM: "CM[0-9]{2}[0-9]{23}",
                CR: "CR[0-9]{2}[0-9]{3}[0-9]{14}",
                CV: "CV[0-9]{2}[0-9]{21}",
                CY: "CY[0-9]{2}[0-9]{3}[0-9]{5}[A-Z0-9]{16}",
                CZ: "CZ[0-9]{2}[0-9]{20}",
                DE: "DE[0-9]{2}[0-9]{8}[0-9]{10}",
                DK: "DK[0-9]{2}[0-9]{14}",
                DO: "DO[0-9]{2}[A-Z0-9]{4}[0-9]{20}",
                DZ: "DZ[0-9]{2}[0-9]{20}",
                EE: "EE[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{11}[0-9]{1}",
                ES: "ES[0-9]{2}[0-9]{4}[0-9]{4}[0-9]{1}[0-9]{1}[0-9]{10}",
                FI: "FI[0-9]{2}[0-9]{6}[0-9]{7}[0-9]{1}",
                FO: "FO[0-9]{2}[0-9]{4}[0-9]{9}[0-9]{1}",
                FR: "FR[0-9]{2}[0-9]{5}[0-9]{5}[A-Z0-9]{11}[0-9]{2}",
                GB: "GB[0-9]{2}[A-Z]{4}[0-9]{6}[0-9]{8}",
                GE: "GE[0-9]{2}[A-Z]{2}[0-9]{16}",
                GI: "GI[0-9]{2}[A-Z]{4}[A-Z0-9]{15}",
                GL: "GL[0-9]{2}[0-9]{4}[0-9]{9}[0-9]{1}",
                GR: "GR[0-9]{2}[0-9]{3}[0-9]{4}[A-Z0-9]{16}",
                GT: "GT[0-9]{2}[A-Z0-9]{4}[A-Z0-9]{20}",
                HR: "HR[0-9]{2}[0-9]{7}[0-9]{10}",
                HU: "HU[0-9]{2}[0-9]{3}[0-9]{4}[0-9]{1}[0-9]{15}[0-9]{1}",
                IE: "IE[0-9]{2}[A-Z]{4}[0-9]{6}[0-9]{8}",
                IL: "IL[0-9]{2}[0-9]{3}[0-9]{3}[0-9]{13}",
                IR: "IR[0-9]{2}[0-9]{22}",
                IS: "IS[0-9]{2}[0-9]{4}[0-9]{2}[0-9]{6}[0-9]{10}",
                IT: "IT[0-9]{2}[A-Z]{1}[0-9]{5}[0-9]{5}[A-Z0-9]{12}",
                JO: "JO[0-9]{2}[A-Z]{4}[0-9]{4}[0]{8}[A-Z0-9]{10}",
                KW: "KW[0-9]{2}[A-Z]{4}[0-9]{22}",
                KZ: "KZ[0-9]{2}[0-9]{3}[A-Z0-9]{13}",
                LB: "LB[0-9]{2}[0-9]{4}[A-Z0-9]{20}",
                LI: "LI[0-9]{2}[0-9]{5}[A-Z0-9]{12}",
                LT: "LT[0-9]{2}[0-9]{5}[0-9]{11}",
                LU: "LU[0-9]{2}[0-9]{3}[A-Z0-9]{13}",
                LV: "LV[0-9]{2}[A-Z]{4}[A-Z0-9]{13}",
                MC: "MC[0-9]{2}[0-9]{5}[0-9]{5}[A-Z0-9]{11}[0-9]{2}",
                MD: "MD[0-9]{2}[A-Z0-9]{20}",
                ME: "ME[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}",
                MG: "MG[0-9]{2}[0-9]{23}",
                MK: "MK[0-9]{2}[0-9]{3}[A-Z0-9]{10}[0-9]{2}",
                ML: "ML[0-9]{2}[A-Z]{1}[0-9]{23}",
                MR: "MR13[0-9]{5}[0-9]{5}[0-9]{11}[0-9]{2}",
                MT: "MT[0-9]{2}[A-Z]{4}[0-9]{5}[A-Z0-9]{18}",
                MU: "MU[0-9]{2}[A-Z]{4}[0-9]{2}[0-9]{2}[0-9]{12}[0-9]{3}[A-Z]{3}",
                MZ: "MZ[0-9]{2}[0-9]{21}",
                NL: "NL[0-9]{2}[A-Z]{4}[0-9]{10}",
                NO: "NO[0-9]{2}[0-9]{4}[0-9]{6}[0-9]{1}",
                PK: "PK[0-9]{2}[A-Z]{4}[A-Z0-9]{16}",
                PL: "PL[0-9]{2}[0-9]{8}[0-9]{16}",
                PS: "PS[0-9]{2}[A-Z]{4}[A-Z0-9]{21}",
                PT: "PT[0-9]{2}[0-9]{4}[0-9]{4}[0-9]{11}[0-9]{2}",
                QA: "QA[0-9]{2}[A-Z]{4}[A-Z0-9]{21}",
                RO: "RO[0-9]{2}[A-Z]{4}[A-Z0-9]{16}",
                RS: "RS[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}",
                SA: "SA[0-9]{2}[0-9]{2}[A-Z0-9]{18}",
                SE: "SE[0-9]{2}[0-9]{3}[0-9]{16}[0-9]{1}",
                SI: "SI[0-9]{2}[0-9]{5}[0-9]{8}[0-9]{2}",
                SK: "SK[0-9]{2}[0-9]{4}[0-9]{6}[0-9]{10}",
                SM: "SM[0-9]{2}[A-Z]{1}[0-9]{5}[0-9]{5}[A-Z0-9]{12}",
                SN: "SN[0-9]{2}[A-Z]{1}[0-9]{23}",
                TN: "TN59[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}",
                TR: "TR[0-9]{2}[0-9]{5}[A-Z0-9]{1}[A-Z0-9]{16}",
                VG: "VG[0-9]{2}[A-Z]{4}[0-9]{16}"
            };
            e = e.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
            var g = d.country || e.substr(0, 2);
            if (!f[g]) return !1;
            if (!new RegExp("^" + f[g] + "$").test(e)) return !1;
            e = e.substr(4) + e.substr(0, 4), e = a.map(e.split(""), function(a) {
                var b = a.charCodeAt(0);
                return b >= "A".charCodeAt(0) && b <= "Z".charCodeAt(0) ? b - "A".charCodeAt(0) + 10 : a
            }), e = e.join("");
            for (var h = parseInt(e.substr(0, 1), 10), i = e.length, j = 1; i > j; ++j) h = (10 * h + parseInt(e.substr(j, 1), 10)) % 97;
            return 1 == h
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.id = {
        html5Attributes: {
            message: "message",
            country: "country"
        },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" == d) return !0;
            var e = c.country || d.substr(0, 2),
                f = ["_", e.toLowerCase()].join("");
            return this[f] && "function" == typeof this[f] ? this[f](d) : !0
        },
        _validateJMBG: function(a, b) {
            if (!/^\d{13}$/.test(a)) return !1;
            var c = parseInt(a.substr(0, 2), 10),
                d = parseInt(a.substr(2, 2), 10),
                e = (parseInt(a.substr(4, 3), 10), parseInt(a.substr(7, 2), 10)),
                f = parseInt(a.substr(12, 1), 10);
            if (c > 31 || d > 12) return !1;
            for (var g = 0, h = 0; 6 > h; h++) g += (7 - h) * (parseInt(a.charAt(h)) + parseInt(a.charAt(h + 6)));
            if (g = 11 - g % 11, (10 == g || 11 == g) && (g = 0), g != f) return !1;
            switch (b.toUpperCase()) {
                case "BA":
                    return e >= 10 && 19 >= e;
                case "MK":
                    return e >= 41 && 49 >= e;
                case "ME":
                    return e >= 20 && 29 >= e;
                case "RS":
                    return e >= 70 && 99 >= e;
                case "SI":
                    return e >= 50 && 59 >= e;
                default:
                    return !0
            }
        },
        _ba: function(a) {
            return this._validateJMBG(a, "BA")
        },
        _mk: function(a) {
            return this._validateJMBG(a, "MK")
        },
        _me: function(a) {
            return this._validateJMBG(a, "ME")
        },
        _rs: function(a) {
            return this._validateJMBG(a, "RS")
        },
        _si: function(a) {
            return this._validateJMBG(a, "SI")
        },
        _bg: function(b) {
            if (!/^\d{10}$/.test(b) && !/^\d{6}\s\d{3}\s\d{1}$/.test(b)) return !1;
            b = b.replace(/\s/g, "");
            var c = parseInt(b.substr(0, 2), 10) + 1900,
                d = parseInt(b.substr(2, 2), 10),
                e = parseInt(b.substr(4, 2), 10);
            if (d > 40 ? (c += 100, d -= 40) : d > 20 && (c -= 100, d -= 20), !a.fn.bootstrapValidator.helpers.date(c, d, e)) return !1;
            for (var f = 0, g = [2, 4, 8, 5, 10, 9, 7, 3, 6], h = 0; 9 > h; h++) f += parseInt(b.charAt(h)) * g[h];
            return f = f % 11 % 10, f == b.substr(9, 1)
        },
        _br: function(a) {
            if (/^1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11}|0{11}$/.test(a)) return !1;
            if (!/^\d{11}$/.test(a) && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(a)) return !1;
            a = a.replace(/\./g, "").replace(/-/g, "");
            for (var b = 0, c = 0; 9 > c; c++) b += (10 - c) * parseInt(a.charAt(c));
            if (b = 11 - b % 11, (10 == b || 11 == b) && (b = 0), b != a.charAt(9)) return !1;
            var d = 0;
            for (c = 0; 10 > c; c++) d += (11 - c) * parseInt(a.charAt(c));
            return d = 11 - d % 11, (10 == d || 11 == d) && (d = 0), d == a.charAt(10)
        },
        _ch: function(a) {
            if (!/^756[\.]{0,1}[0-9]{4}[\.]{0,1}[0-9]{4}[\.]{0,1}[0-9]{2}$/.test(a)) return !1;
            a = a.replace(/\D/g, "").substr(3);
            for (var b = a.length, c = 0, d = 8 == b ? [3, 1] : [1, 3], e = 0; b - 1 > e; e++) c += parseInt(a.charAt(e)) * d[e % 2];
            return c = 10 - c % 10, c == a.charAt(b - 1)
        },
        _cl: function(a) {
            if (!/^\d{7,8}[-]{0,1}[0-9K]$/.test(a)) return !1;
            for (a = a.replace(/\D/g, ""); a.length < 9;) a = "0" + a;
            for (var b = 0, c = [3, 2, 7, 6, 5, 4, 3, 2], d = 0; 8 > d; d++) b += parseInt(a.charAt(d)) * c[d];
            return b = 11 - b % 11, 11 == b ? b = 0 : 10 == b && (b = "K"), b == a.charAt(8)
        },
        _cz: function(b) {
            if (!/^\d{9,10}$/.test(b)) return !1;
            var c = 1900 + parseInt(b.substr(0, 2)),
                d = parseInt(b.substr(2, 2)) % 50 % 20,
                e = parseInt(b.substr(4, 2));
            if (9 == b.length) {
                if (c >= 1980 && (c -= 100), c > 1953) return !1
            } else 1954 > c && (c += 100);
            if (!a.fn.bootstrapValidator.helpers.date(c, d, e)) return !1;
            if (10 == b.length) {
                var f = parseInt(b.substr(0, 9), 10) % 11;
                return 1985 > c && (f %= 10), f == b.substr(9, 1)
            }
            return !0
        },
        _dk: function(b) {
            if (!/^[0-9]{6}[-]{0,1}[0-9]{4}$/.test(b)) return !1;
            b = b.replace(/-/g, "");
            var c = parseInt(b.substr(0, 2), 10),
                d = parseInt(b.substr(2, 2), 10),
                e = parseInt(b.substr(4, 2), 10);
            switch (!0) {
                case -1 != "5678".indexOf(b.charAt(6)) && e >= 58:
                    e += 1800;
                    break;
                case -1 != "0123".indexOf(b.charAt(6)):
                case -1 != "49".indexOf(b.charAt(6)) && e >= 37:
                    e += 1900;
                    break;
                default:
                    e += 2e3
            }
            return a.fn.bootstrapValidator.helpers.date(e, d, c)
        },
        _ee: function(a) {
            return this._lt(a)
        },
        _es: function(a) {
            if (!/^[0-9A-Z]{8}[-]{0,1}[0-9A-Z]$/.test(a) && !/^[XYZ][-]{0,1}[0-9]{7}[-]{0,1}[0-9A-Z]$/.test(a)) return !1;
            a = a.replace(/-/g, "");
            var b = "XYZ".indexOf(a.charAt(0)); - 1 != b && (a = b + a.substr(1) + "");
            var c = parseInt(a.substr(0, 8), 10);
            return c = "TRWAGMYFPDXBNJZSQVHLCKE" [c % 23], c == a.substr(8, 1)
        },
        _fi: function(b) {
            if (!/^[0-9]{6}[-+A][0-9]{3}[0-9ABCDEFHJKLMNPRSTUVWXY]$/.test(b)) return !1;
            var c = parseInt(b.substr(0, 2), 10),
                d = parseInt(b.substr(2, 2), 10),
                e = parseInt(b.substr(4, 2), 10),
                f = {
                    "+": 1800,
                    "-": 1900,
                    A: 2e3
                };
            if (e = f[b.charAt(6)] + e, !a.fn.bootstrapValidator.helpers.date(e, d, c)) return !1;
            var g = parseInt(b.substr(7, 3));
            if (2 > g) return !1;
            var h = b.substr(0, 6) + b.substr(7, 3) + "";
            return h = parseInt(h), "0123456789ABCDEFHJKLMNPRSTUVWXY".charAt(h % 31) == b.charAt(10)
        },
        _hr: function(b) {
            return /^[0-9]{11}$/.test(b) ? a.fn.bootstrapValidator.helpers.mod_11_10(b) : !1
        },
        _ie: function(a) {
            if (!/^\d{7}[A-W][AHWTX]?$/.test(a)) return !1;
            var b = function(a) {
                for (; a.length < 7;) a = "0" + a;
                for (var b = "WABCDEFGHIJKLMNOPQRSTUV", c = 0, d = 0; 7 > d; d++) c += parseInt(a.charAt(d)) * (8 - d);
                return c += 9 * b.indexOf(a.substr(7)), b[c % 23]
            };
            return 9 != a.length || "A" != a.charAt(8) && "H" != a.charAt(8) ? a.charAt(7) == b(a.substr(0, 7)) : a.charAt(7) == b(a.substr(0, 7) + a.substr(8) + "")
        },
        _is: function(b) {
            if (!/^[0-9]{6}[-]{0,1}[0-9]{4}$/.test(b)) return !1;
            b = b.replace(/-/g, "");
            var c = parseInt(b.substr(0, 2), 10),
                d = parseInt(b.substr(2, 2), 10),
                e = parseInt(b.substr(4, 2), 10),
                f = parseInt(b.charAt(9));
            if (e = 9 == f ? 1900 + e : 100 * (20 + f) + e, !a.fn.bootstrapValidator.helpers.date(e, d, c, !0)) return !1;
            for (var g = 0, h = [3, 2, 7, 6, 5, 4, 3, 2], i = 0; 8 > i; i++) g += parseInt(b.charAt(i)) * h[i];
            return g = 11 - g % 11, g == b.charAt(8)
        },
        _lt: function(b) {
            if (!/^[0-9]{11}$/.test(b)) return !1;
            var c = parseInt(b.charAt(0)),
                d = parseInt(b.substr(1, 2), 10),
                e = parseInt(b.substr(3, 2), 10),
                f = parseInt(b.substr(5, 2), 10),
                g = c % 2 == 0 ? 17 + c / 2 : 17 + (c + 1) / 2;
            if (d = 100 * g + d, !a.fn.bootstrapValidator.helpers.date(d, e, f, !0)) return !1;
            for (var h = 0, i = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1], j = 0; 10 > j; j++) h += parseInt(b.charAt(j)) * i[j];
            if (h %= 11, 10 != h) return h == b.charAt(10);
            for (h = 0, i = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3], j = 0; 10 > j; j++) h += parseInt(b.charAt(j)) * i[j];
            return h %= 11, 10 == h && (h = 0), h == b.charAt(10)
        },
        _lv: function(b) {
            if (!/^[0-9]{6}[-]{0,1}[0-9]{5}$/.test(b)) return !1;
            b = b.replace(/\D/g, "");
            var c = parseInt(b.substr(0, 2)),
                d = parseInt(b.substr(2, 2)),
                e = parseInt(b.substr(4, 2));
            if (e = e + 1800 + 100 * parseInt(b.charAt(6)), !a.fn.bootstrapValidator.helpers.date(e, d, c, !0)) return !1;
            for (var f = 0, g = [10, 5, 8, 4, 2, 1, 6, 3, 7, 9], h = 0; 10 > h; h++) f += parseInt(b.charAt(h)) * g[h];
            return f = (f + 1) % 11 % 10, f == b.charAt(10)
        },
        _nl: function(a) {
            for (; a.length < 9;) a = "0" + a;
            if (!/^[0-9]{4}[.]{0,1}[0-9]{2}[.]{0,1}[0-9]{3}$/.test(a)) return !1;
            if (a = a.replace(/\./g, ""), 0 == parseInt(a, 10)) return !1;
            for (var b = 0, c = a.length, d = 0; c - 1 > d; d++) b += (9 - d) * parseInt(a.charAt(d));
            return b %= 11, 10 == b && (b = 0), b == a.charAt(c - 1)
        },
        _ro: function(b) {
            if (!/^[0-9]{13}$/.test(b)) return !1;
            var c = parseInt(b.charAt(0));
            if (0 == c || 7 == c || 8 == c) return !1;
            var d = parseInt(b.substr(1, 2), 10),
                e = parseInt(b.substr(3, 2), 10),
                f = parseInt(b.substr(5, 2), 10),
                g = {
                    1: 1900,
                    2: 1900,
                    3: 1800,
                    4: 1800,
                    5: 2e3,
                    6: 2e3
                };
            if (f > 31 && e > 12) return !1;
            if (9 != c && (d = g[c + ""] + d, !a.fn.bootstrapValidator.helpers.date(d, e, f))) return !1;
            for (var h = 0, i = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9], j = b.length, k = 0; j - 1 > k; k++) h += parseInt(b.charAt(k)) * i[k];
            return h %= 11, 10 == h && (h = 1), h == b.charAt(j - 1)
        },
        _se: function(b) {
            if (!/^[0-9]{10}$/.test(b) && !/^[0-9]{6}[-|+][0-9]{4}$/.test(b)) return !1;
            b = b.replace(/[^0-9]/g, "");
            var c = parseInt(b.substr(0, 2)) + 1900,
                d = parseInt(b.substr(2, 2)),
                e = parseInt(b.substr(4, 2));
            return a.fn.bootstrapValidator.helpers.date(c, d, e) ? a.fn.bootstrapValidator.helpers.luhn(b) : !1
        },
        _sk: function(a) {
            return this._cz(a)
        },
        _sm: function(a) {
            return /^\d{5}$/.test(a)
        },
        _za: function(b) {
            if (!/^[0-9]{10}[0|1][8|9][0-9]$/.test(b)) return !1;
            var c = parseInt(b.substr(0, 2)),
                d = (new Date).getFullYear() % 100,
                e = parseInt(b.substr(2, 2)),
                f = parseInt(b.substr(4, 2));
            return c = c >= d ? c + 1900 : c + 2e3, a.fn.bootstrapValidator.helpers.date(c, e, f) ? a.fn.bootstrapValidator.helpers.luhn(b) : !1
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.identical = {
        html5Attributes: {
            message: "message",
            field: "field"
        },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" == d) return !0;
            var e = a.getFieldElements(c.field);
            return null == e ? !0 : d == e.val() ? (a.updateStatus(c.field, a.STATUS_VALID, "identical"), !0) : !1
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.imei = {
        validate: function(b, c) {
            var d = c.val();
            if ("" == d) return !0;
            switch (!0) {
                case /^\d{15}$/.test(d):
                case /^\d{2}-\d{6}-\d{6}-\d{1}$/.test(d):
                case /^\d{2}\s\d{6}\s\d{6}\s\d{1}$/.test(d):
                    return d = d.replace(/[^0-9]/g, ""), a.fn.bootstrapValidator.helpers.luhn(d);
                case /^\d{14}$/.test(d):
                case /^\d{16}$/.test(d):
                case /^\d{2}-\d{6}-\d{6}(|-\d{2})$/.test(d):
                case /^\d{2}\s\d{6}\s\d{6}(|\s\d{2})$/.test(d):
                    return !0;
                default:
                    return !1
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.integer = {
        enableByHtml5: function(a) {
            return "number" == a.attr("type")
        },
        validate: function(a, b) {
            var c = b.val();
            return "" == c ? !0 : /^(?:-?(?:0|[1-9][0-9]*))$/.test(c)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.ip = {
        html5Attributes: {
            message: "message",
            ipv4: "ipv4",
            ipv6: "ipv6"
        },
        validate: function(b, c, d) {
            var e = c.val();
            return "" == e ? !0 : (d = a.extend({}, {
                ipv4: !0,
                ipv6: !0
            }, d), d.ipv4 ? /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(e) : d.ipv6 ? /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(str) : !1)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.isbn = {
        validate: function(a, b) {
            var c = b.val();
            if ("" == c) return !0;
            var d;
            switch (!0) {
                case /^\d{9}[\dX]$/.test(c):
                case 13 == c.length && /^(\d+)-(\d+)-(\d+)-([\dX])$/.test(c):
                case 13 == c.length && /^(\d+)\s(\d+)\s(\d+)\s([\dX])$/.test(c):
                    d = "ISBN10";
                    break;
                case /^(978|979)\d{9}[\dX]$/.test(c):
                case 17 == c.length && /^(978|979)-(\d+)-(\d+)-(\d+)-([\dX])$/.test(c):
                case 17 == c.length && /^(978|979)\s(\d+)\s(\d+)\s(\d+)\s([\dX])$/.test(c):
                    d = "ISBN13";
                    break;
                default:
                    return !1
            }
            c = c.replace(/[^0-9X]/gi, "");
            var e, f = c.split(""),
                g = f.length,
                h = 0;
            switch (d) {
                case "ISBN10":
                    h = 0;
                    for (var i = 0; g - 1 > i; i++) h += (10 - i) * parseInt(f[i]);
                    return e = 11 - h % 11, 11 == e ? e = 0 : 10 == e && (e = "X"), e + "" == f[g - 1];
                case "ISBN13":
                    h = 0;
                    for (var i = 0; g - 1 > i; i++) h += i % 2 == 0 ? parseInt(f[i]) : 3 * parseInt(f[i]);
                    return e = 10 - h % 10, 10 == e && (e = "0"), e + "" == f[g - 1];
                default:
                    return !1
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.isin = {
        COUNTRY_CODES: "AF|AX|AL|DZ|AS|AD|AO|AI|AQ|AG|AR|AM|AW|AU|AT|AZ|BS|BH|BD|BB|BY|BE|BZ|BJ|BM|BT|BO|BQ|BA|BW|BV|BR|IO|BN|BG|BF|BI|KH|CM|CA|CV|KY|CF|TD|CL|CN|CX|CC|CO|KM|CG|CD|CK|CR|CI|HR|CU|CW|CY|CZ|DK|DJ|DM|DO|EC|EG|SV|GQ|ER|EE|ET|FK|FO|FJ|FI|FR|GF|PF|TF|GA|GM|GE|DE|GH|GI|GR|GL|GD|GP|GU|GT|GG|GN|GW|GY|HT|HM|VA|HN|HK|HU|IS|IN|ID|IR|IQ|IE|IM|IL|IT|JM|JP|JE|JO|KZ|KE|KI|KP|KR|KW|KG|LA|LV|LB|LS|LR|LY|LI|LT|LU|MO|MK|MG|MW|MY|MV|ML|MT|MH|MQ|MR|MU|YT|MX|FM|MD|MC|MN|ME|MS|MA|MZ|MM|NA|NR|NP|NL|NC|NZ|NI|NE|NG|NU|NF|MP|NO|OM|PK|PW|PS|PA|PG|PY|PE|PH|PN|PL|PT|PR|QA|RE|RO|RU|RW|BL|SH|KN|LC|MF|PM|VC|WS|SM|ST|SA|SN|RS|SC|SL|SG|SX|SK|SI|SB|SO|ZA|GS|SS|ES|LK|SD|SR|SJ|SZ|SE|CH|SY|TW|TJ|TZ|TH|TL|TG|TK|TO|TT|TN|TR|TM|TC|TV|UG|UA|AE|GB|US|UM|UY|UZ|VU|VE|VN|VG|VI|WF|EH|YE|ZM|ZW",
        validate: function(a, b) {
            var c = b.val();
            if ("" == c) return !0;
            c = c.toUpperCase();
            var d = new RegExp("^(" + this.COUNTRY_CODES + ")[0-9A-Z]{10}$");
            if (!d.test(c)) return !1;
            for (var e = "", f = c.length, g = 0; f - 1 > g; g++) {
                var h = c.charCodeAt(g);
                e += h > 57 ? (h - 55).toString() : c.charAt(g)
            }
            var i = "",
                j = e.length,
                k = j % 2 != 0 ? 0 : 1;
            for (g = 0; j > g; g++) i += parseInt(e[g]) * (g % 2 == k ? 2 : 1) + "";
            var l = 0;
            for (g = 0; g < i.length; g++) l += parseInt(i.charAt(g));
            return l = (10 - l % 10) % 10, l == c.charAt(f - 1)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.ismn = {
        validate: function(a, b) {
            var c = b.val();
            if ("" == c) return !0;
            var d;
            switch (!0) {
                case /^M\d{9}$/.test(c):
                case /^M-\d{4}-\d{4}-\d{1}$/.test(c):
                case /^M\s\d{4}\s\d{4}\s\d{1}$/.test(c):
                    d = "ISMN10";
                    break;
                case /^9790\d{9}$/.test(c):
                case /^979-0-\d{4}-\d{4}-\d{1}$/.test(c):
                case /^979\s0\s\d{4}\s\d{4}\s\d{1}$/.test(c):
                    d = "ISMN13";
                    break;
                default:
                    return !1
            }
            "ISMN10" == d && (c = "9790" + c.substr(1)), c = c.replace(/[^0-9]/gi, "");
            for (var e = c.length, f = 0, g = [1, 3], h = 0; e - 1 > h; h++) f += parseInt(c.charAt(h)) * g[h % 2];
            return f = 10 - f % 10, f == c.charAt(e - 1)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.issn = {
        validate: function(a, b) {
            var c = b.val();
            if ("" == c) return !0;
            if (!/^\d{4}\-\d{3}[\dX]$/.test(c)) return !1;
            c = c.replace(/[^0-9X]/gi, "");
            var d = c.split(""),
                e = d.length,
                f = 0;
            "X" == d[7] && (d[7] = 10);
            for (var g = 0; e > g; g++) f += (8 - g) * parseInt(d[g]);
            return f % 11 == 0
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.lessThan = {
        html5Attributes: {
            message: "message",
            value: "value",
            inclusive: "inclusive"
        },
        enableByHtml5: function(a) {
            var b = a.attr("max");
            return b ? {
                value: b
            } : !1
        },
        validate: function(a, b, c) {
            var d = b.val();
            return "" == d ? !0 : (d = parseFloat(d), c.inclusive === !1 ? d <= c.value : d < c.value)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.mac = {
        validate: function(a, b) {
            var c = b.val();
            return "" == c ? !0 : /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/.test(c)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.notEmpty = {
        enableByHtml5: function(a) {
            var b = a.attr("required") + "";
            return "required" == b || "true" == b
        },
        validate: function(b, c) {
            var d = c.attr("type");
            return "radio" == d || "checkbox" == d ? b.getFieldElements(c.attr("data-bv-field")).filter(":checked").length > 0 : "" != a.trim(c.val())
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.numeric = {
        html5Attributes: {
            message: "message",
            separator: "separator"
        },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" == d) return !0;
            var e = c.separator || ".";
            return "." != e && (d = d.replace(e, ".")), !isNaN(parseFloat(d)) && isFinite(d)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.phone = {
        html5Attributes: {
            message: "message",
            country: "country"
        },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" == d) return !0;
            var e = (c.country || "US").toUpperCase();
            switch (e) {
                case "US":
                default:
                    return d = d.replace(/\D/g, ""), /^(?:(1\-?)|(\+1 ?))?\(?(\d{3})[\)\-\.]?(\d{3})[\-\.]?(\d{4})$/.test(d) && 10 == d.length
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.regexp = {
        html5Attributes: {
            message: "message",
            regexp: "regexp"
        },
        enableByHtml5: function(a) {
            var b = a.attr("pattern");
            return b ? {
                regexp: b
            } : !1
        },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" == d) return !0;
            var e = "string" == typeof c.regexp ? new RegExp(c.regexp) : c.regexp;
            return e.test(d)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.remote = {
        html5Attributes: {
            message: "message",
            url: "url",
            name: "name"
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" == e) return !0;
            var f = c.attr("data-bv-field"),
                g = d.data;
            null == g && (g = {}), "function" == typeof g && (g = g.call(this, b)), g[d.name || f] = e;
            var h = new a.Deferred,
                i = a.ajax({
                    type: "POST",
                    url: d.url,
                    dataType: "json",
                    data: g
                });
            return i.then(function(a) {
                h.resolve(c, "remote", a.valid === !0 || "true" === a.valid)
            }), h.fail(function() {
                i.abort()
            }), h
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.rtn = {
        validate: function(a, b) {
            var c = b.val();
            if ("" == c) return !0;
            if (!/^\d{9}$/.test(c)) return !1;
            for (var d = 0, e = 0; e < c.length; e += 3) d += 3 * parseInt(c.charAt(e), 10) + 7 * parseInt(c.charAt(e + 1), 10) + parseInt(c.charAt(e + 2), 10);
            return 0 != d && d % 10 == 0
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.sedol = {
        validate: function(a, b) {
            var c = b.val();
            if ("" == c) return !0;
            if (c = c.toUpperCase(), !/^[0-9A-Z]{7}$/.test(c)) return !1;
            for (var d = 0, e = [1, 3, 1, 7, 3, 9, 1], f = c.length, g = 0; f - 1 > g; g++) d += e[g] * parseInt(c.charAt(g), 36);
            return d = (10 - d % 10) % 10, d == c.charAt(f - 1)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.siren = {
        validate: function(b, c) {
            var d = c.val();
            return "" == d ? !0 : /^\d{9}$/.test(d) ? a.fn.bootstrapValidator.helpers.luhn(d) : !1
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.siret = {
        validate: function(a, b) {
            var c = b.val();
            if ("" == c) return !0;
            for (var d, e = 0, f = c.length, g = 0; f > g; g++) d = parseInt(c.charAt(g), 10), g % 2 == 0 && (d = 2 * d, d > 9 && (d -= 9)), e += d;
            return e % 10 == 0
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.step = {
        html5Attributes: {
            message: "message",
            base: "baseValue",
            step: "step"
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" == e) return !0;
            if (d = a.extend({}, {
                    baseValue: 0,
                    step: 1
                }, d), e = parseFloat(e), isNaN(e) || !isFinite(e)) return !1;
            var f = function(a, b) {
                    var c = Math.pow(10, b);
                    a *= c;
                    var d = a > 0 | -(0 > a),
                        e = a % 1 === .5 * d;
                    return e ? (Math.floor(a) + (d > 0)) / c : Math.round(a) / c
                },
                g = function(a, b) {
                    if (0 == b) return 1;
                    var c = (a + "").split("."),
                        d = (b + "").split("."),
                        e = (1 == c.length ? 0 : c[1].length) + (1 == d.length ? 0 : d[1].length);
                    return f(a - b * Math.floor(a / b), e)
                },
                h = g(e - d.baseValue, d.step);
            return 0 == h || h == d.step
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.stringCase = {
        html5Attributes: {
            message: "message",
            "case": "case"
        },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" == d) return !0;
            var e = (c["case"] || "lower").toLowerCase();
            switch (e) {
                case "upper":
                    return d === d.toUpperCase();
                case "lower":
                default:
                    return d === d.toLowerCase()
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.stringLength = {
        html5Attributes: {
            message: "message",
            min: "min",
            max: "max"
        },
        enableByHtml5: function(a) {
            var b = a.attr("maxlength");
            return b ? {
                max: parseInt(b, 10)
            } : !1
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" == e) return !0;
            var f = a.trim(e).length;
            return d.min && f < d.min || d.max && f > d.max ? !1 : !0
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.uri = {
        enableByHtml5: function(a) {
            return "url" == a.attr("type")
        },
        validate: function(a, b) {
            var c = b.val();
            if ("" == c) return !0;
            var d = new RegExp("^(?:(?:https?|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?!10(?:\\.\\d{1,3}){3})(?!127(?:\\.\\d{1,3}){3})(?!169\\.254(?:\\.\\d{1,3}){2})(?!192\\.168(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/[^\\s]*)?$", "i");
            return d.test(c)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.uuid = {
        html5Attributes: {
            message: "message",
            version: "version"
        },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" == d) return !0;
            var e = {
                    3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
                    4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
                    5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
                    all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
                },
                f = c.version ? c.version + "" : "all";
            return null == e[f] ? !0 : e[f].test(d)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.vat = {
        html5Attributes: {
            message: "message",
            country: "country"
        },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" == d) return !0;
            var e = c.country || d.substr(0, 2),
                f = ["_", e.toLowerCase()].join("");
            return this[f] && "function" == typeof this[f] ? this[f](d) : !0
        },
        _at: function(a) {
            if (!/^ATU[0-9]{8}$/.test(a)) return !1;
            a = a.substr(3);
            for (var b = 0, c = [1, 2, 1, 2, 1, 2, 1], d = 0, e = 0; 7 > e; e++) d = parseInt(a.charAt(e)) * c[e], d > 9 && (d = Math.floor(d / 10) + d % 10), b += d;
            return b = 10 - (b + 4) % 10, 10 == b && (b = 0), b == a.substr(7, 1)
        },
        _be: function(a) {
            if (!/^BE[0]{0,1}[0-9]{9}$/.test(a)) return !1;
            if (a = a.substr(2), 9 == a.length && (a = "0" + a), 0 == a.substr(1, 1)) return !1;
            var b = parseInt(a.substr(0, 8), 10) + parseInt(a.substr(8, 2), 10);
            return b % 97 == 0
        },
        _bg: function(b) {
            if (!/^BG[0-9]{9,10}$/.test(b)) return !1;
            b = b.substr(2);
            var c = 0,
                d = 0;
            if (9 == b.length) {
                for (d = 0; 8 > d; d++) c += parseInt(b.charAt(d)) * (d + 1);
                if (c %= 11, 10 == c)
                    for (c = 0, d = 0; 8 > d; d++) c += parseInt(b.charAt(d)) * (d + 3);
                return c %= 10, c == b.substr(8)
            }
            if (10 == b.length) {
                var e = function(b) {
                        var c = parseInt(b.substr(0, 2), 10) + 1900,
                            d = parseInt(b.substr(2, 2), 10),
                            e = parseInt(b.substr(4, 2), 10);
                        if (d > 40 ? (c += 100, d -= 40) : d > 20 && (c -= 100, d -= 20), !a.fn.bootstrapValidator.helpers.date(c, d, e)) return !1;
                        for (var f = 0, g = [2, 4, 8, 5, 10, 9, 7, 3, 6], h = 0; 9 > h; h++) f += parseInt(b.charAt(h)) * g[h];
                        return f = f % 11 % 10, f == b.substr(9, 1)
                    },
                    f = function(a) {
                        for (var b = 0, c = [21, 19, 17, 13, 11, 9, 7, 3, 1], d = 0; 9 > d; d++) b += parseInt(a.charAt(d)) * c[d];
                        return b %= 10, b == a.substr(9, 1)
                    },
                    g = function(a) {
                        for (var b = 0, c = [4, 3, 2, 7, 6, 5, 4, 3, 2], d = 0; 9 > d; d++) b += parseInt(a.charAt(d)) * c[d];
                        return b = 11 - b % 11, 10 == b ? !1 : (11 == b && (b = 0), b == a.substr(9, 1))
                    };
                return e(b) || f(b) || g(b)
            }
            return !1
        },
        _ch: function(a) {
            if (!/^CHE[0-9]{9}(MWST)?$/.test(a)) return !1;
            a = a.substr(3);
            for (var b = 0, c = [5, 4, 3, 2, 7, 6, 5, 4], d = 0; 8 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b = 11 - b % 11, 10 == b ? !1 : (11 == b && (b = 0), b == a.substr(8, 1))
        },
        _cy: function(a) {
            if (!/^CY[0-5|9]{1}[0-9]{7}[A-Z]{1}$/.test(a)) return !1;
            if (a = a.substr(2), "12" == a.substr(0, 2)) return !1;
            for (var b = 0, c = {
                    0: 1,
                    1: 0,
                    2: 5,
                    3: 7,
                    4: 9,
                    5: 13,
                    6: 15,
                    7: 17,
                    8: 19,
                    9: 21
                }, d = 0; 8 > d; d++) {
                var e = parseInt(a.charAt(d), 10);
                d % 2 == 0 && (e = c[e + ""]), b += e
            }
            return b = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" [b % 26], b == a.substr(8, 1)
        },
        _cz: function(b) {
            if (!/^CZ[0-9]{8,10}$/.test(b)) return !1;
            b = b.substr(2);
            var c = 0,
                d = 0;
            if (8 == b.length) {
                if (b.charAt(0) + "" == "9") return !1;
                for (c = 0, d = 0; 7 > d; d++) c += parseInt(b.charAt(d), 10) * (8 - d);
                return c = 11 - c % 11, 10 == c && (c = 0), 11 == c && (c = 1), c == b.substr(7, 1)
            }
            if (9 == b.length && b.charAt(0) + "" == "6") {
                for (c = 0, d = 0; 7 > d; d++) c += parseInt(b.charAt(d + 1), 10) * (8 - d);
                return c = 11 - c % 11, 10 == c && (c = 0), 11 == c && (c = 1), c = [8, 7, 6, 5, 4, 3, 2, 1, 0, 9, 10][c - 1], c == b.substr(8, 1)
            }
            if (9 == b.length || 10 == b.length) {
                var e = 1900 + parseInt(b.substr(0, 2)),
                    f = parseInt(b.substr(2, 2)) % 50 % 20,
                    g = parseInt(b.substr(4, 2));
                if (9 == b.length) {
                    if (e >= 1980 && (e -= 100), e > 1953) return !1
                } else 1954 > e && (e += 100);
                if (!a.fn.bootstrapValidator.helpers.date(e, f, g)) return !1;
                if (10 == b.length) {
                    var h = parseInt(b.substr(0, 9), 10) % 11;
                    return 1985 > e && (h %= 10), h == b.substr(9, 1)
                }
                return !0
            }
            return !1
        },
        _de: function(b) {
            return /^DE[0-9]{9}$/.test(b) ? (b = b.substr(2), a.fn.bootstrapValidator.helpers.mod_11_10(b)) : !1
        },
        _dk: function(a) {
            if (!/^DK[0-9]{8}$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = 0, c = [2, 7, 6, 5, 4, 3, 2, 1], d = 0; 8 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b % 11 == 0
        },
        _ee: function(a) {
            if (!/^EE[0-9]{9}$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = 0, c = [3, 7, 1, 3, 7, 1, 3, 7, 1], d = 0; 9 > d; d++) b += parseInt(a.charAt(d)) * c[d];
            return b % 10 == 0
        },
        _es: function(a) {
            if (!/^ES[0-9A-Z][0-9]{7}[0-9A-Z]$/.test(a)) return !1;
            a = a.substr(2);
            var b = function(a) {
                    var b = parseInt(a.substr(0, 8), 10);
                    return b = "TRWAGMYFPDXBNJZSQVHLCKE" [b % 23], b == a.substr(8, 1)
                },
                c = function(a) {
                    var b = ["XYZ".indexOf(a.charAt(0)), a.substr(1)].join("");
                    return b = parseInt(b, 10), b = "TRWAGMYFPDXBNJZSQVHLCKE" [b % 23], b == a.substr(8, 1)
                },
                d = function(a) {
                    var b, c = a.charAt(0);
                    if (-1 != "KLM".indexOf(c)) return b = parseInt(a.substr(1, 8), 10), b = "TRWAGMYFPDXBNJZSQVHLCKE" [b % 23], b == a.substr(8, 1);
                    if (-1 != "ABCDEFGHJNPQRSUVW".indexOf(c)) {
                        for (var d = 0, e = [2, 1, 2, 1, 2, 1, 2], f = 0, g = 0; 7 > g; g++) f = parseInt(a.charAt(g + 1)) * e[g], f > 9 && (f = Math.floor(f / 10) + f % 10), d += f;
                        return d = 10 - d % 10, d == a.substr(8, 1) || "JABCDEFGHI" [d] == a.substr(8, 1)
                    }
                    return !1
                },
                e = a.charAt(0);
            return /^[0-9]$/.test(e) ? b(a) : /^[XYZ]$/.test(e) ? c(a) : d(a)
        },
        _fi: function(a) {
            if (!/^FI[0-9]{8}$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = 0, c = [7, 9, 10, 5, 8, 4, 2, 1], d = 0; 8 > d; d++) b += parseInt(a.charAt(d)) * c[d];
            return b % 11 == 0
        },
        _fr: function(b) {
            if (!/^FR[0-9A-Z]{2}[0-9]{9}$/.test(b)) return !1;
            if (b = b.substr(2), !a.fn.bootstrapValidator.helpers.luhn(b.substr(2))) return !1;
            if (/^[0-9]{2}$/.test(b.substr(0, 2))) return b.substr(0, 2) == parseInt(b.substr(2) + "12", 10) % 97;
            var c, d = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
            return c = /^[0-9]{1}$/.test(b.charAt(0)) ? 24 * d.indexOf(b.charAt(0)) + d.indexOf(b.charAt(1)) - 10 : 34 * d.indexOf(b.charAt(0)) + d.indexOf(b.charAt(1)) - 100, (parseInt(b.substr(2), 10) + 1 + Math.floor(c / 11)) % 11 == c % 11
        },
        _gb: function(a) {
            if (!(/^GB[0-9]{9}$/.test(a) || /^GB[0-9]{12}$/.test(a) || /^GBGD[0-9]{3}$/.test(a) || /^GBHA[0-9]{3}$/.test(a) || /^GB(GD|HA)8888[0-9]{5}$/.test(a))) return !1;
            a = a.substr(2);
            var b = a.length;
            if (5 == b) {
                var c = a.substr(0, 2),
                    d = parseInt(a.substr(2));
                return "GD" == c && 500 > d || "HA" == c && d >= 500
            }
            if (11 == b && ("GD8888" == a.substr(0, 6) || "HA8888" == a.substr(0, 6))) return "GD" == a.substr(0, 2) && parseInt(a.substr(6, 3)) >= 500 || "HA" == a.substr(0, 2) && parseInt(a.substr(6, 3)) < 500 ? !1 : parseInt(a.substr(6, 3)) % 97 == parseInt(a.substr(9, 2));
            if (9 == b || 12 == b) {
                for (var e = 0, f = [8, 7, 6, 5, 4, 3, 2, 10, 1], g = 0; 9 > g; g++) e += parseInt(a.charAt(g)) * f[g];
                return e %= 97, parseInt(a.substr(0, 3)) >= 100 ? 0 == e || 42 == e || 55 == e : 0 == e
            }
            return !0
        },
        _gr: function(a) {
            if (!/^GR[0-9]{9}$/.test(a)) return !1;
            a = a.substr(2), 8 == a.length && (a = "0" + a);
            for (var b = 0, c = [256, 128, 64, 32, 16, 8, 4, 2], d = 0; 8 > d; d++) b += parseInt(a.charAt(d)) * c[d];
            return b = b % 11 % 10, b == a.substr(8, 1)
        },
        _el: function(a) {
            return /^EL[0-9]{9}$/.test(a) ? (a = "GR" + a.substr(2), this._gr(a)) : !1
        },
        _hu: function(a) {
            if (!/^HU[0-9]{8}$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = 0, c = [9, 7, 3, 1, 9, 7, 3, 1], d = 0; 8 > d; d++) b += parseInt(a.charAt(d)) * c[d];
            return b % 10 == 0
        },
        _hr: function(b) {
            return /^HR[0-9]{11}$/.test(b) ? (b = b.substr(2), a.fn.bootstrapValidator.helpers.mod_11_10(b)) : !1
        },
        _ie: function(a) {
            if (!/^IE[0-9]{1}[0-9A-Z\*\+]{1}[0-9]{5}[A-Z]{1,2}$/.test(a)) return !1;
            a = a.substr(2);
            var b = function(a) {
                for (; a.length < 7;) a = "0" + a;
                for (var b = "WABCDEFGHIJKLMNOPQRSTUV", c = 0, d = 0; 7 > d; d++) c += parseInt(a.charAt(d)) * (8 - d);
                return c += 9 * b.indexOf(a.substr(7)), b[c % 23]
            };
            return /^[0-9]+$/.test(a.substr(0, 7)) ? a.charAt(7) == b(a.substr(0, 7) + a.substr(8) + "") : -1 != "ABCDEFGHIJKLMNOPQRSTUVWXYZ+*".indexOf(a.charAt(1)) ? a.charAt(7) == b(a.substr(2, 5) + a.substr(0, 1) + "") : !0
        },
        _it: function(b) {
            if (!/^IT[0-9]{11}$/.test(b)) return !1;
            if (b = b.substr(2), 0 == parseInt(b.substr(0, 7))) return !1;
            var c = parseInt(b.substr(7, 3));
            return 1 > c || c > 201 && 999 != c && 888 != c ? !1 : a.fn.bootstrapValidator.helpers.luhn(b)
        },
        _lt: function(a) {
            if (!/^LT([0-9]{7}1[0-9]{1}|[0-9]{10}1[0-9]{1})$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = a.length, c = 0, d = 0; b - 1 > d; d++) c += parseInt(a.charAt(d)) * (1 + d % 9);
            var e = c % 11;
            if (10 == e) {
                c = 0;
                for (var d = 0; b - 1 > d; d++) c += parseInt(a.charAt(d)) * (1 + (d + 2) % 9)
            }
            return e = e % 11 % 10, e == a.charAt(b - 1)
        },
        _lu: function(a) {
            return /^LU[0-9]{8}$/.test(a) ? (a = a.substr(2), a.substr(0, 6) % 89 == a.substr(6, 2)) : !1
        },
        _lv: function(b) {
            if (!/^LV[0-9]{11}$/.test(b)) return !1;
            b = b.substr(2);
            var c = parseInt(b.charAt(0)),
                d = 0,
                e = [],
                f = 0,
                g = b.length;
            if (c > 3) {
                for (d = 0, e = [9, 1, 4, 8, 3, 10, 2, 5, 7, 6, 1], f = 0; g > f; f++) d += parseInt(b.charAt(f)) * e[f];
                return d %= 11, 3 == d
            }
            var h = parseInt(b.substr(0, 2)),
                i = parseInt(b.substr(2, 2)),
                j = parseInt(b.substr(4, 2));
            if (j = j + 1800 + 100 * parseInt(b.charAt(6)), !a.fn.bootstrapValidator.helpers.date(j, i, h)) return !1;
            for (d = 0, e = [10, 5, 8, 4, 2, 1, 6, 3, 7, 9], f = 0; g - 1 > f; f++) d += parseInt(b.charAt(f)) * e[f];
            return d = (d + 1) % 11 % 10, d == b.charAt(g - 1)
        },
        _mt: function(a) {
            if (!/^MT[0-9]{8}$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = 0, c = [3, 4, 6, 7, 8, 9, 10, 1], d = 0; 8 > d; d++) b += parseInt(a.charAt(d)) * c[d];
            return b % 37 == 0
        },
        _nl: function(a) {
            if (!/^NL[0-9]{9}B[0-9]{2}$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = 0, c = [9, 8, 7, 6, 5, 4, 3, 2], d = 0; 8 > d; d++) b += parseInt(a.charAt(d)) * c[d];
            return b %= 11, b > 9 && (b = 0), b == a.substr(8, 1)
        },
        _no: function(a) {
            if (!/^NO[0-9]{9}$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = 0, c = [3, 2, 7, 6, 5, 4, 3, 2], d = 0; 8 > d; d++) b += parseInt(a.charAt(d)) * c[d];
            return b = 11 - b % 11, 11 == b && (b = 0), b == a.substr(8, 1)
        },
        _pl: function(a) {
            if (!/^PL[0-9]{10}$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = 0, c = [6, 5, 7, 2, 3, 4, 5, 6, 7, -1], d = 0; 10 > d; d++) b += parseInt(a.charAt(d)) * c[d];
            return b % 11 == 0
        },
        _pt: function(a) {
            if (!/^PT[0-9]{9}$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = 0, c = [9, 8, 7, 6, 5, 4, 3, 2], d = 0; 8 > d; d++) b += parseInt(a.charAt(d)) * c[d];
            return b = 11 - b % 11, b > 9 && (b = 0), b == a.substr(8, 1)
        },
        _ro: function(a) {
            if (!/^RO[1-9][0-9]{1,9}$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = a.length, c = [7, 5, 3, 2, 1, 7, 5, 3, 2].slice(10 - b), d = 0, e = 0; b - 1 > e; e++) d += parseInt(a.charAt(e)) * c[e];
            return d = 10 * d % 11 % 10, d == a.substr(b - 1, 1)
        },
        _ru: function(a) {
            if (!/^RU([0-9]{9}|[0-9]{12})$/.test(a)) return !1;
            if (a = a.substr(2), 10 == a.length) {
                for (var b = 0, c = [2, 4, 10, 3, 5, 9, 4, 6, 8, 0], d = 0; 10 > d; d++) b += parseInt(a.charAt(d)) * c[d];
                return b %= 11, b > 9 && (b %= 10), b == a.substr(9, 1)
            }
            if (12 == a.length) {
                for (var e = 0, f = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8, 0], g = 0, h = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8, 0], d = 0; 11 > d; d++) e += parseInt(a.charAt(d)) * f[d], g += parseInt(a.charAt(d)) * h[d];
                return e %= 11, e > 9 && (e %= 10), g %= 11, g > 9 && (g %= 10), e == a.substr(10, 1) && g == a.substr(11, 1)
            }
            return !1
        },
        _rs: function(a) {
            if (!/^RS[0-9]{9}$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = 10, c = 0, d = 0; 8 > d; d++) c = (parseInt(a.charAt(d)) + b) % 10, 0 == c && (c = 10), b = 2 * c % 11;
            return (b + parseInt(a.substr(8, 1))) % 10 == 1
        },
        _se: function(b) {
            return /^SE[0-9]{10}01$/.test(b) ? (b = b.substr(2, 10), a.fn.bootstrapValidator.helpers.luhn(b)) : !1
        },
        _si: function(a) {
            if (!/^SI[0-9]{8}$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = 0, c = [8, 7, 6, 5, 4, 3, 2], d = 0; 7 > d; d++) b += parseInt(a.charAt(d)) * c[d];
            return b = 11 - b % 11, 10 == b && (b = 0), b == a.substr(7, 1)
        },
        _sk: function(a) {
            return /^SK[1-9][0-9][(2-4)|(6-9)][0-9]{7}$/.test(a) ? (a = a.substr(2), a % 11 == 0) : !1
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.vin = {
        validate: function(a, b) {
            var c = b.val();
            if ("" == c) return !0;
            if (!/^[a-hj-npr-z0-9]{8}[0-9xX][a-hj-npr-z0-9]{8}$/i.test(c)) return !1;
            c = c.toUpperCase();
            for (var d = {
                    A: 1,
                    B: 2,
                    C: 3,
                    D: 4,
                    E: 5,
                    F: 6,
                    G: 7,
                    H: 8,
                    J: 1,
                    K: 2,
                    L: 3,
                    M: 4,
                    N: 5,
                    P: 7,
                    R: 9,
                    S: 2,
                    T: 3,
                    U: 4,
                    V: 5,
                    W: 6,
                    X: 7,
                    Y: 8,
                    Z: 9,
                    1: 1,
                    2: 2,
                    3: 3,
                    4: 4,
                    5: 5,
                    6: 6,
                    7: 7,
                    8: 8,
                    9: 9,
                    0: 0
                }, e = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2], f = 0, g = c.length, h = 0; g > h; h++) f += d[c.charAt(h) + ""] * e[h];
            var i = f % 11;
            return 10 == i && (i = "X"), i == c.charAt(8)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.zipCode = {
        html5Attributes: {
            message: "message",
            country: "country"
        },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" == d || !c.country) return !0;
            var e = (c.country || "US").toUpperCase();
            switch (e) {
                case "CA":
                    return /(?:A|B|C|E|G|J|K|L|M|N|P|R|S|T|V|X|Y){1}[0-9]{1}(?:A|B|C|E|G|J|K|L|M|N|P|R|S|T|V|X|Y){1}\s?[0-9]{1}(?:A|B|C|E|G|J|K|L|M|N|P|R|S|T|V|X|Y){1}[0-9]{1}/i.test(d);
                case "DK":
                    return /^(DK(-|\s)?)?\d{4}$/i.test(d);
                case "GB":
                    return this._gb(d);
                case "IT":
                    return /^(I-|IT-)?\d{5}$/i.test(d);
                case "NL":
                    return /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i.test(d);
                case "SE":
                    return /^(S-)?\d{3}\s?\d{2}$/i.test(d);
                case "US":
                default:
                    return /^\d{4,5}([\-]\d{4})?$/.test(d)
            }
        },
        _gb: function(a) {
            for (var b = "[ABCDEFGHIJKLMNOPRSTUWYZ]", c = "[ABCDEFGHKLMNOPQRSTUVWXY]", d = "[ABCDEFGHJKPMNRSTUVWXY]", e = "[ABEHMNPRVWXY]", f = "[ABDEFGHJLNPQRSTUWXYZ]", g = [new RegExp("^(" + b + "{1}" + c + "?[0-9]{1,2})(\\s*)([0-9]{1}" + f + "{2})$", "i"), new RegExp("^(" + b + "{1}[0-9]{1}" + d + "{1})(\\s*)([0-9]{1}" + f + "{2})$", "i"), new RegExp("^(" + b + "{1}" + c + "{1}?[0-9]{1}" + e + "{1})(\\s*)([0-9]{1}" + f + "{2})$", "i"), new RegExp("^(BF1)(\\s*)([0-6]{1}[ABDEFGHJLNPQRST]{1}[ABDEFGHJLNPQRSTUWZYZ]{1})$", "i"), /^(GIR)(\s*)(0AA)$/i, /^(BFPO)(\s*)([0-9]{1,4})$/i, /^(BFPO)(\s*)(c\/o\s*[0-9]{1,3})$/i, /^([A-Z]{4})(\s*)(1ZZ)$/i, /^(AI-2640)$/i], h = 0; h < g.length; h++)
                if (g[h].test(a)) return !0;
            return !1
        }
    }
}(window.jQuery);