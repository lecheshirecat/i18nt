/**
 * A lightweight internationalization plugin
 *
 * @version 1.0.0
 * @author Charlie LEDUC <contact@graphique.io>
 * @license ISC
 */

export interface i18nJSON {
    [key: string]: string | undefined
}

export interface i18nTranslation {
    [lang: string]: i18nJSON | undefined
}

export interface i18nParameters {
    locale?: string
    tokens?: any[]
    count?: number
    reversed?: boolean
}

export interface i18nOptions {
    default: string
    locales: i18nTranslation
}

const _I18NT_LOCALE_KEY_: string = 'locale'
const _I18NT_TRANSLATIONS_: i18nTranslation = {}
const _I18NT_SUPPORTED_LOCALES_: string[] = ['en']

export function getLocale(): string {
    const defaultLocale: string = _I18NT_SUPPORTED_LOCALES_[0]
    var storageLocale: any = localStorage.getItem(_I18NT_LOCALE_KEY_)

    var locale = storageLocale ?? window.navigator.language ?? defaultLocale
    if (locale === 'default') {
        locale = window.navigator.language
    }
    if (locale.length > 2) {
        locale = locale.substr(0, 2)
    }

    if (_I18NT_SUPPORTED_LOCALES_.indexOf(locale) > -1) {
        localStorage.setItem(_I18NT_LOCALE_KEY_, locale)
        return locale
    }

    localStorage.setItem(_I18NT_LOCALE_KEY_, defaultLocale)
    return defaultLocale
}

export function setLocale(locale?: string | null): void {
    localStorage.removeItem(_I18NT_LOCALE_KEY_)
    if ((locale ?? '').length > 0) {
        localStorage.setItem(_I18NT_LOCALE_KEY_, locale ?? 'default')
    }
}

export function addTranslation(locale: string, translation?: i18nJSON): void {
    if (!(locale ?? '').length) {
        return
    }
    _I18NT_SUPPORTED_LOCALES_.push(locale)
    _I18NT_TRANSLATIONS_[locale] = translation
}

export function getSupportedLocales(): string[] {
    return _I18NT_SUPPORTED_LOCALES_
}

export function _t(message: string, params?: i18nParameters): string {
    const locale = params?.locale ?? getLocale()
    const translation = _I18NT_TRANSLATIONS_[locale] ?? null
    if (!translation) {
        return message
    }

    if (params?.reversed === true) {
        return Object.keys(translation).find((key) => translation[key] === message) ?? message
    }

    const tokens = params?.tokens ?? []
    var output: string | null | undefined = translation[message] ?? message ?? ''
    if (output && output?.indexOf('|') > -1) {
        const count = params?.count ?? 0
        const parts = output.split('|')
        if (parts.length) {
            output = count < parts.length ? parts[count].trim() : parts[parts.length - 1].trim()
        }
    }
    for (let i = 0; i < tokens.length; i++) {
        output = output.replace(/%s/u, tokens[i])
    }
    return output
}
