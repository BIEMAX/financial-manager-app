# Financial Manager App

Project to controls personal/profissional costs and receiveds.

## How to Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/electron/electron-quick-start

# Go into the repository
cd financial-manager-app

# Install dependencies
npm install

# Run angular app in "development environment"
npm run dev
<<<<<<< HEAD

# Run angular app in "staging environment"
npm run dev

# Run angular app in "production environment"
npm run prd

# Build the project and run the app with electron
npm run electron
=======
```

## How to build

To build the project, you can just build with `ng build` command, however, we implemented one build for each environment. You can build with the following commands:


```bash
# Default build
ng build

# Run angular app in "development environment"
npm run build-dev

# Run angular app in "staging environment"
npm run build-stg

# Run angular app in "production environment"
npm run build-prd
```


## How to run with electron

Before you run the electron app, certify that you build the project running the upstair commands.

```bash
# Run electron after build
npm run electron-dev

# Build and run electron
npm run electron-prd
>>>>>>> 3e244621ceb2517eaf49a96a130c4bef97e68cc1
```

## Icons

Default icons available on google forms:

[https://fonts.google.com/icons](https://fonts.google.com/icons?selected=Material+Icons)

## License

[CC0 1.0 (Public Domain)](LICENSE.md)