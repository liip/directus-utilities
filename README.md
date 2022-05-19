# Utility library for directus

Brings some missing utility functions for directus.

## Available functions

### `exportDefaultPreset`

Exports default preset for given collection to a JSON file with the following name: `preset-<collection>.json`

#### Params

* **directus** (`IDirectus<TypeMap>`): Authenticated directus instance.
* **collection** (`string`): Name of the collection.
* **target?** (`string`): Target folder where exported preset should be saved (Default: not set).

### `importDefaultPreset`

Imports default preset for given collection from a JSON file.
If there is already a default preset for the given collection it will be updated otherwise it will be created.

#### Params

* **directus** (`IDirectus<TypeMap>`): Authenticated directus instance.
* **collection** (`string`): Name of the collection.
* **sourceFile** (`string`): File name of the previously exported JSON file.

## How to create an authenticated directus instance

```js
const { Directus } = require('@directus/sdk');

const directus = new Directus('http://localhost:8055', {
    auth: {
        staticToken: 'STATIC_TOKEN',
    },
});
```

If you want to use email and password. You should remove the staticToken above and use the following line.

```js
await directus.auth.login({ email, password })
```
