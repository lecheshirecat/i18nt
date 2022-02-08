export interface i18nJSON {
    [key: string]: string | undefined;
}
export interface i18nTranslation {
    [lang: string]: i18nJSON | undefined;
}
export interface i18nParameters {
    locale?: string;
    tokens?: any[];
    count?: number;
    reversed?: boolean;
}
export interface i18nOptions {
    default: string;
    locales: i18nTranslation;
}
export declare function getLocale(): string;
export declare function setLocale(locale?: string | null): void;
export declare function addTranslation(locale: string, translation?: i18nJSON): void;
export declare function getSupportedLocales(): string[];
export declare function _t(message: string, params?: i18nParameters): string;
