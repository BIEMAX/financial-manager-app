[![Deploy to Staging](https://github.com/BIEMAX/financial-manager-app/actions/workflows/firebase-deploy.yml/badge.svg?branch=develop)](https://github.com/BIEMAX/financial-manager-app/actions/workflows/firebase-deploy.yml)


# Introduction

This project is a frontend software for [financial-manager-api](https://github.com/BIEMAX/financial-manager-api), 
that consists in:

- Manage your personal and professional costs
- Control bills close to overdue ou already overdue
- View your money (spend, save and remaining) in charts

If you want to test it, you can access our demo accessing the link [financial-manager-staging.web.app](https://financial-manager-staging.web.app).

Some features that this application have:
- Automatic deploys via Heroku
- Code quality and tests
- CI/CD for staging and production environments


# Available languages

Currently, we only have support to *portuguese*, but we're of necessity of implement other languages.


# Roadmap

![imagem](./docs/img/timeline_financial-manager-app.png)


# Requirements

1. [Financial-manager-api](https://github.com/BIEMAX/financial-manager-api) running on your machine
2. MongoDB connection (set in configuration file in `financial-manager-api`)
3. Web or mobile device


# How to run in localhost

1. Create following files in folder `src/environments`:
- environment.dev.ts
- environment.ts

> **Note:** Don't commit changes in these files, or this will break our pipelines.

2. Configure the files created before with the following content:
```typescript
export const environment = {
  production: false,
  applicationName: 'Financial Manager',
  //Version to show in title
  applicationVersion: 'v1.2.5',
  //Your backend url (without slash at the end)
  apiUrl: 'http://localhost:8080',
  //Version of your endpoints (without slash at the end)
  apiVersion: 'v1',
  //Field 'secret' from 'Authorization' collection in MongoDB
  apiSecret: '<YOUR_API_SECRET>',
  //Field 'clientId' from 'Authorization' collection in MongoDB
  apiClientId: '<YOUR_CLIENT_ID>',
  //True to log all errors/exceptions in browser console.
  logInfo: true,
};

/**
 * The colors can be: primary (purple), accent (pink) or warn (orange).
 */
export const ui = {
  color: "primary",
};

/**
 * Default user to login (for tests only)
 */
export const user = {
  login: '<DEFAULT_USER>',
  password: '<DEFAULT_PASSWORD>'
}
```

> **Note:** The 'apiSecret' parameter is used to new users registration
> and the 'apiClientId' parameter is used to other endpoints.

3. After create configuration files, we need to install dependencies:
```bash
npm install
```

4. To run the project in localhost, run in terminal:
```bash
npm run dev
```

5. Access the web app in your browser with the following link:

```bash
http://localhost:4200
```