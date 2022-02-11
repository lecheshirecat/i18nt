"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._t = exports.getSupportedLocales = exports.addTranslation = exports.setLocale = exports.getLocale = void 0;
const _I18NT_LOCALE_KEY_ = 'locale';
const _I18NT_TRANSLATIONS_ = {};
const _I18NT_SUPPORTED_LOCALES_ = ['en'];
function getLocale() {
    var _a;
    const defaultLocale = _I18NT_SUPPORTED_LOCALES_[0];
    let storageLocale = localStorage.getItem(_I18NT_LOCALE_KEY_);
    let locale = (_a = storageLocale !== null && storageLocale !== void 0 ? storageLocale : window.navigator.language) !== null && _a !== void 0 ? _a : defaultLocale;
    if (locale === 'default') {
        locale = window.navigator.language;
    }
    if (locale.length > 2) {
        locale = locale.substr(0, 2);
    }
    return _I18NT_SUPPORTED_LOCALES_.indexOf(locale) > -1 ? locale : defaultLocale;
}
exports.getLocale = getLocale;
function setLocale(locale) {
    localStorage.removeItem(_I18NT_LOCALE_KEY_);
    if ((locale !== null && locale !== void 0 ? locale : '').length > 0) {
        localStorage.setItem(_I18NT_LOCALE_KEY_, locale !== null && locale !== void 0 ? locale : 'default');
    }
}
exports.setLocale = setLocale;
function addTranslation(locale, translation) {
    if (!(locale !== null && locale !== void 0 ? locale : '').length) {
        return;
    }
    if (_I18NT_SUPPORTED_LOCALES_.indexOf(locale) < 0) {
        _I18NT_SUPPORTED_LOCALES_.push(locale);
    }
    _I18NT_TRANSLATIONS_[locale] = translation;
}
exports.addTranslation = addTranslation;
function getSupportedLocales() {
    return _I18NT_SUPPORTED_LOCALES_;
}
exports.getSupportedLocales = getSupportedLocales;
function _t(message, params) {
    var _a, _b, _c, _d, _e, _f, _g;
    const locale = (_a = params === null || params === void 0 ? void 0 : params.locale) !== null && _a !== void 0 ? _a : getLocale();
    const translation = (_b = _I18NT_TRANSLATIONS_[locale]) !== null && _b !== void 0 ? _b : null;
    if (!translation) {
        return message;
    }
    if ((params === null || params === void 0 ? void 0 : params.reversed) === true) {
        return (_c = Object.keys(translation).find((key) => translation[key] === message)) !== null && _c !== void 0 ? _c : message;
    }
    const tokens = (_d = params === null || params === void 0 ? void 0 : params.tokens) !== null && _d !== void 0 ? _d : [];
    var output = (_f = (_e = translation[message]) !== null && _e !== void 0 ? _e : message) !== null && _f !== void 0 ? _f : '';
    if (output && (output === null || output === void 0 ? void 0 : output.indexOf('|')) > -1) {
        const count = (_g = params === null || params === void 0 ? void 0 : params.count) !== null && _g !== void 0 ? _g : 0;
        const parts = output.split('|');
        if (parts.length) {
            output = count < parts.length ? parts[count].trim() : parts[parts.length - 1].trim();
        }
    }
    for (let i = 0; i < tokens.length; i++) {
        output = output.replace(/%s/u, tokens[i]);
    }
    return output;
}
exports._t = _t;
