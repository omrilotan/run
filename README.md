# `$ run`
## 👟 runs npm scripts interactively [![](https://img.shields.io/npm/v/@lets/run.svg)](https://www.npmjs.com/package/@lets/run) [![](https://github.com/omrilotan/run/workflows/Publish/badge.svg)](https://github.com/omrilotan/run/actions) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/run)

![](https://user-images.githubusercontent.com/516342/68541500-02d39b00-03a9-11ea-9df6-fd0d880af441.gif)

```
$ npm i -g @lets/run
```

## Simply run. You'll get an interactive menu.
```
$ run
```

## Pass arguments. Arguments will be forwarded to the selected script
```
run --color
```

Otherwise you will get a chance to add in arguments after selecting the script to run

## You can also run dependencies executables:

![](https://user-images.githubusercontent.com/516342/69226314-9e72c180-0b88-11ea-8fc2-fd5ff3aac71f.gif)

## Create descriptive entries using package.json property: `scripts:descriptions`

> You can hide scripts by explicitly setting the description to null
```json
{
  "name": "package",
  "version": "1.0.0",
  "scripts": {
    "lint": "eslint '**/*.js'",
    "prestart": "echo \"prepare things\"",
    "start": "./bin.js"
  },
  "scripts:descriptions": {
    "lint": "Check code syntax",
    "prestart": null
  }
}
```

![](https://user-images.githubusercontent.com/516342/69716427-a4314f80-1112-11ea-957f-3385b9e0155a.png)

## Replace `npm start`

```json
{
  "name": "package",
  "version": "1.0.0",
  "scripts": {
    "start": "run --color",
    "build": "...",
    "test": "..."
  },
  "scripts:descriptions": {
    "build": "Prepare application files"
  },
  "devDependencies": {
    "@lets/run": "latest"
  }
}
```

### aliases

run, lets-run
