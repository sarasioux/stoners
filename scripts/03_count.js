const folder = '../assets/';
const fs = require('fs');

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

const getGeneratedCounts = async function() {
  const files = await readDirectory(folder + 'Generated');
  console.log('Total Files:             ', files.length);
  
  let imageCount = 0;
  let sigs = 0;
  for(f in files) {
    let parts = files[f].split('.');
    if(parts[1] === 'png') {
      imageCount++;
    } else {
      // read the file for other counts
      let rawData = fs.readFileSync(folder + 'Generated/' + files[f]);
      let fileJson = JSON.parse(rawData);
      for(t in fileJson.attributes) {
        let trait = fileJson.attributes[t];
        if(trait.trait_type === 'Signature' && trait.value === 'Sig') {
          sigs++;
        }
      }
    }
  }
  
  console.log('Total Images:            ', imageCount);
  console.log('Total Expected Files:    ', imageCount*2);
  console.log('Total Signatures:        ', sigs);
};


getGeneratedCounts();
