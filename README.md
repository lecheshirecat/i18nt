# i18nt

A lightweight internationalization module with TypeScript support

## Installation

```javascript
npm install @cheshirecat/i18nt --save
```

## How to use

Default use in your main.js project

```typescript
import { addTranslation } from '@cheshirecat/i18nt'

import en from './assets/locales/en.json'
import fr from './assets/locales/fr.json'
...
addTranslation('en', en)
addTranslation('fr', fr)
...
```

You can set / get the current language globally as follows:

```javascript
import { setLocale } from '@cheshirecat/i18nt'
/* 'default' would set locale to your browser default language */
setLocale('default')
```

The JSON files consist of key-value pairs where the key is the first argument passed to the main translation function, like:

```javascript
/* json */
{
  "msg1": "Message traduit en français",
  "msg2": "Ceci est un autre message",
  "greetings": "Bonjour!"
}
```

## Basic usage

You can import the _t translation function from i18nt module to localize texts in the HTML template (Vue, React, Svelte, etc.)

```javascript
import { _t } from '@cheshirecat/i18nt'
```
```html
<div>
  <p>{_t('msg1')}</p>
</div>
```

The result would be translated in the browser:

```html
<div>
  <p>Message traduit en français</p>
</div>
```

## Advanced usage

You can pass an optional object with the following properties:
- `locale`: to force translation with a locale parameter
- `tokens`: an array to replace the %s token with the indexed string
- `count`: a Number to output a specific translated count

### Interpolation

The i18nt module supports string interpolation, with `%s` as placeholder in your translation files

```html
<div>
  <p>{_t('greetings', { locale: 'en', tokens: ['Svelte'] })}</p>
</div>
```

```javascript
/* json */
{
  "greetings": "Hello %s !"
}
```

It would be rendered in the browser:

```html
<div>
  <p>Hello Svelte !</p>
</div>
```

### Pluralization

The i18nt module also supports pluralization, with `|` as a separator for none / one / many elements

```html
<select>
  <option value="0">{_t('crows', { count: 0 })}</option>
  <option value="1">{_t('crows', { count: 1 })}</option>
  <option value="10">{_t('crows', { count: 10 })}</option>
</select>
```

```javascript
{
  "crows": "None | A crow | Murder of Crows"
}
```

As a result:

```html
<select>
  <option value="0">None</option>
  <option value="1">A crow</option>
  <option value="10">Murder of Crows</option>
</select>
```

## Global parameters

`getLocale`: to access the global language variable
`setLocale`: to set the global language variable

```typescript
import { getLocale, setLocale } from '@cheshirecat/i18nt'

export default {
  name: 'MyComponent',

  computed: {
    locale(): string {
      return getLocale()
    }
  },

  methods: {
    changeLanguage(lang: string): void {
      setLocale(lang)
    }
  }
}
```

## License

[ISC](https://opensource.org/licenses/ISC)
