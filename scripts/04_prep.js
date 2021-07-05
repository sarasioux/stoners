const ipfsUrl = 'http://127.0.0.1:5001';
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
  const files = await readDirectory(folder + 'Generated');
  let counter = 1;
  for(let f in files) {
    if(files[f].substr(-3) === 'png') {
      let hash = files[f].substr(0, files[f].length-4);
      console.log('image hash', hash);
      

  
      await copy(folder + 'Generated/' + hash + '.png', outputFolder + 'image/' + counter + '.png');
      await copy(folder + 'Generated/' + hash + '.json', outputFolder + 'json/' + counter);
      counter++;
      console.log('--------');
    }
  }

};

const copy = async function(src, dst) {
  fs.copyFile(src, dst, (err) => {
    if (err) {
      console.log("Error Found:", err);
    } else {
      return true;
    }
  });
}


prep();
