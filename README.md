# Utility library for directus

Brings some missing utility functions for directus.

## Available functions

### `exportDefaultPreset`

Exports default preset for given collection to a JSON file.

#### Params

* **directus** (`IDirectus<TypeMap>`): Authenticated directus instance.
* **collection** (`string`): Name of the collection.
* **targetFile** (`string`): Target filename (incl. path) where preset should be exported.

### `importDefaultPreset`

Imports default preset for given collection from a JSON file.
If there is already a default preset for the given collection it will be updated otherwise it will be created.

#### Params

* **directus** (`IDirectus<TypeMap>`): Authenticated directus instance.
* **collection** (`string`): Name of the collection.
* **sourceFile** (`string`): Filename of the previously exported JSON file.

### `exportPublicPermissions`

Exports public permissions to a JSON file.

#### Params

* **directus** (`IDirectus<TypeMap>`): Authenticated directus instance.
* **targetFile** (`string`): Target filename (incl. path) where permissions should be exported.

### `importPublicPermissions`

Imports public permissions from a JSON file.
Creates a new permission entry for a collection which didn't have a public permission yet.
Updates an existing permission for a collection when there is already a public permission defined.
Deletes public permissions for collections which aren't available in the JSON file anymore.

#### Params

* **directus** (`IDirectus<TypeMap>`): Authenticated directus instance.
* **sourceFile** (`string`): Filename of the previously exported JSON file.

### `exportPermissionsByRolename`

Exports permissions for a given role  to a JSON file.

#### Params

* **directus** (`IDirectus<TypeMap>`): Authenticated directus instance.
* **rolename** (`string`): Name of the role.
* **targetFile** (`string`): Target filename (incl. path) where permissions should be exported.

### `importPermissionsByRolename`

Imports permissions for a given role from a JSON file.
Creates a new permission entry if the role didn't have that permission yet.
Updates an existing permission if the role already had such a permission defined.
Deletes permissions for the role if they aren't available in the JSON file anymore.

#### Params

* **directus** (`IDirectus<TypeMap>`): Authenticated directus instance.
* **rolename** (`string`): Name of the role.
* **sourceFile** (`string`): Filename of the previously exported JSON file.

## Usage

### How to create an authenticated directus instance

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

### Examples

```js
// Export default preset
const { Directus } = require('@directus/sdk');
const { exportDefaultPreset } = require('../directus-utilities/dist/index.js');

const run = async () => {
  const directus = new Directus('http://localhost:8055', {
    auth: {
        staticToken: 'STATIC_TOKEN',
    },
  });

  await exportDefaultPreset(directus, 'products', './presets/products-preset.json');
};

run().then(() => {
  process.exit();
});
```

```js
// Import default preset
const { Directus } = require('@directus/sdk');
const { importDefaultPreset } = require('../directus-utilities/dist/index.js');

const run = async () => {
  const directus = new Directus('http://localhost:8055', {
    auth: {
        staticToken: 'STATIC_TOKEN',
    },
  });

  await importDefaultPreset(directus, 'products', './presets/products-preset.json');
};

run().then(() => {
  process.exit();
});

```
