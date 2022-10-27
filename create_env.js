const fs = require('fs');
const path = require('path');
require('dotenv').config();

const dir = "./src/environments";

const defaultFile = `${dir}/environment.ts`;
const stgFile = "environment.stg.ts";
const prdFile = "environment.prd.ts";

const content = `${process.env.ENVIRONMENT_CONTENT}`;
const env = `${process.env.ENVIRONMENT}`;

fs.access(dir, fs.constants.F_OK, (err) => {
  if (err) {
    console.log("1. src doesn't exist, creating now", process.cwd());

    //Create src
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) console.log('  1.1 error when creating default folder: ', err);
    })
  }
  //Now, create file
  try {
    console.log('2. creating default file');
    console.log('  2.1 current folder: ', __dirname);

    fs.writeFileSync(defaultFile, content);

    console.log('3. Default env file created');
    console.log('  3.1 content length: ', content.length);
    console.log('  3.1 env length: ', env.length);

    console.log('4. Enviroment: ', env);
    console.log('  4.1 Creating stg file');
    fs.writeFileSync(`${dir}/${stgFile}`, content);

    console.log('  4.2 Creating prd file');
    fs.writeFileSync(`${dir}/${prdFile}`, content);

    console.log('5. Files created successfully');

    if (fs.existsSync(defaultFile)) {
      console.log('6. Files created: ')
      console.log('  6.1 default file: ', path.resolve(defaultFile));
      console.log('  6.2 stg file: ', path.resolve(`${dir}/${stgFile}`));
      console.log('  6.3 prd file: ', path.resolve(`${dir}/${prdFile}`));
      const str = fs.readFileSync(defaultFile).toString();
      console.log('7. File content: ', str);
    }

  }
  catch (err) {
    console.log('8. error when creating file: ', err);
    process.exit(1);
  }
});