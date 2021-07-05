const ipfsHash = 'QmesVjMTeMw387yiQyxbLwJSpUdZj6mgCefQQe4sCSFdM8';
const folder = '../assets/';
const outputFolder = '../build/rocks/';
const fs = require('fs');
const { create } = require('ipfs-http-client')

const crypto = require('crypto');

const readDirectory = async function(path) {
  return new Promise(function (resolve, reject) {
    try {
      let returnFiles = [];
      fs.readdir(path, (err, files) => {
        files.forEach(file => {
          if (file !== '.DS_Store' && file !== 'Generated' && file !== 'Icon?' && file !== 'TODO List.gsheet') {
            returnFiles.push(file);
          }
        });
        resolve(returnFiles);
      });
    }
    catch (error) {
      reject(error);
    }
  });
};

const prep = async function() {
  const files = await readDirectory(outputFolder + 'json');
  let counter = 1;
  for(let f in files) {
      console.log(f);
      
      const file = files[f];
      const jsonPath = outputFolder + 'json/' + file;

      // Load the existing JSON
      let rawData = fs.readFileSync(jsonPath);
      let fileJson = JSON.parse(rawData);
    
      // Add the cid URL to the JSON file
      fileJson.image = 'ipfs://' + ipfsHash + '/' + file + '.png';
      fileJson.external_url = 'https://stonersrock.com/rocks/' + file;
      
      let data = JSON.stringify(fileJson);
      fs.writeFileSync(jsonPath, data);
  
      console.log(fileJson);
      console.log('--------');
  }

};



prep();
