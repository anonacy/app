
# Contributing

If you would like to contribute, please email me at support@anonacy.com.

***

## Technology
Built using [Vue 3](https://vuejs.org/) with the [Ionic Framework](https://ionicframework.com/). The projects depends on having `@ionic/cli` installed.

`npm install @ionic/cli -g`

## Development

To build the app, first clone the repo and `npm install`
```
git clone https://github.com/anonacy/app.git
cd app/
npm install
```
To run locally:
```
npm start
```

To build distribution:
```
npm run build
```

## Environment
Environment variables are handled by vite, details [here](https://vitejs.dev/guide/env-and-mode). 
Place dev variables in `.env.development` and prod variables in `.env.production`

| Variable | Info |
| -------- | -------- |
| `VITE_ENVIRONMENT`   | `production` or `development`   |
| `VITE_API_URL`   | `url` of `@anonacy/api` instance   |
| `VITE_API_PORT`   | Port of `@anonacy/api` (default `3001`)  |
| `VITE_TEST_API_KEY`   | `api key` to skip login **(dev only)**  |


***

Built by hew🪶