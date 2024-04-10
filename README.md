## @anonacy/app

### About
This ionic vue3 app is for managing email alias identities with the v2 @anonacy/api. It allows you to view, edit, create, and delete aliases, domains, endpoints & more.

### Uses

The app will contain a UI for the full functionality of the v2 @anonacy/api

### Authorization
As of now, the app uses simple api key authorization. Using an API credential from the underlying @anonacy/api postal server. The api key is automatically scoped to the org & server it is assigned to in postal.

### Documentation

Full api documentation can be found here:
https://api2.anonacy.com/docs/

### Environment
Environment variables are handles by vite.
See https://vitejs.dev/guide/env-and-mode for details.
Place dev variables in `.env.development` and prod variables in `.env.production`. Currently, the only used variable is `VITE_ANONACY_API_URL`, which points to the api.