# Requirements

- Its recommended that uses the node version 14.18.* or higher

# Steps

### 1. Install node version 14.18.* or higher
### 2. Install Google Firebase Tools:

```bash
npm install -g firebase-tools
```

### 3. Do login in Google Firebase

```bash
firebase login
```

### 4. Init Google Firebase configuration and select the options bellow:

```bash
firebase init
```

  <div>
  <span style="color:#00e673">?</span> What do you want to use as your public directory? <span style="color:#3385ff">dist</span>

  <span style="color:#00e673">?</span> Configure as a single-page app (rewrite all urls to /index.html)? <span style="color:#3385ff">Yes</span>

  <span style="color:#00e673">?</span> Set up automatic builds and deploys with GitHub? <span style="color:#3385ff">No</span>

  <span style="color:#00e673">?</span> File dist/index.html already exists. Overwrite? <span style="color:#3385ff">Yes</span>
  </div>

### 5. This will be created two files on root folder directory:

- firebase.json
- .firebaserc

### 6. To configure automatic deploys with github action, run the following command:

```npm
firebase init hosting:github
```

<span style="color:#00e673">?</span> For which GitHub repository would you like to set up a GitHub Workflow? (format: user/repository) <span style="color:#3385ff">BIEMAX/financial-manager-app</span>

<span style="color:#00e673">?</span> Set up the workflow to run a build script before every deploy? (y/N) <span style="color:#3385ff">Yes</span>

<span style="color:#00e673">?</span> What script shoud be run before every deploy? (npm ci && npm run build) <span style="color:#3385ff">npm ci && npm run build</span>

<span style="color:#00e673">?</span> Set up automatic deployment to your site's live channel when a PR is merged? <span style="color:#3385ff">Yes</span>

<span style="color:#00e673">?</span> What is the name of the GitHub branch associated with your site's live channel? (main) <span style="color:#3385ff">(main)</span>

<span style="color:#00e673">+</span>  Firebase initialization complete!