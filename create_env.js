const fs = require('fs');
const path = require('path');
require('dotenv').config();

const dir = "src/environments";

const defaultFile = `${dir}/environment.ts`;
const stgFile = "environment.stg.ts"
const prdFile = "environment.prod.ts"

const content = `${process.env.ENVIRONMENT_CONTENT}`;
const env = `${process.env.ENVIRONMENT}`;

fs.access(dir, fs.constants.F_OK, (err) => {
  if (err) {
    console.log("1. src doesn't exist, creating now", process.cwd());

    //Create src
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) throw err;
    })
  }
  //Now, create file
  try {
    console.log('2. creating default file');
    fs.writeFileSync(defaultFile, content);
    console.log('3. Default file created');

    console.log('4. Enviroment: ', env);
    if (env === 'stg') fs.writeFileSync(`${dir}/${stgFile}`, content);
    else fs.writeFileSync(`${dir}/${prdFile}`, content);

    console.log('5. Files created successfully');

    if (fs.existsSync(defaultFile)) {
      console.log('6. File is created', path.resolve(defaultFile));
      const str = fs.readFileSync(defaultFile).toString();
      console.log('7. File content: ', str);
    }

  }
  catch (err) {
    console.log('8. error when creating file: ', err);
    process.exit(1);
  }
});