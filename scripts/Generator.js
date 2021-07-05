/*
    Generator module.
    
    Handles all of the auto-generation and composition functions previously found in scripts.
*/

const { createCanvas, loadImage } = require('node-canvas')
const fs = require('fs');
const crypto = require('crypto');

const Generator = function() {
  
  let _this = this;
  
  this.inputFolder = '../build/google/';
  this.outputFolder = '../build/';
  
  this.makeChoices = async function(build, category, choice) {
    if(category === 'Nose' && choice === 'Big') {
      build['07 Mouth'] = 'None.12.png';
    }
    if(category === 'Accessories' && choice === 'Top Hat') {
      build['03 Hair'] = 'None.80.png';
    }
  };
  
  // Set environment variables
  this.readDirectory = async function(path) {
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
  
  this.loadFiles = async function() {
    let returnFiles = {};
    const files = await this.readDirectory(this.inputFolder);
    for(let i in files) {
      returnFiles[files[i]] = await this.readDirectory(this.inputFolder + files[i]);
    }
    return returnFiles;
  };
  
  this.parseChoices = async function() {
    let files = await this.loadFiles();
    let choices = {};
    for(let i in files) {
      choices[i] = [];
      for(let k in files[i]) {
        const parts = files[i][k].split('.');
        for(let p=0; p<parts[1]; p++) {
          choices[i].push(files[i][k]);
        }
      }
    }
    return choices;
  };
  
  this.generateName = function() {
    const namePrefix = [
      'OG',
      'Purple',
      'Grand Daddy',
      'Sour',
      'Lemon',
      'Orange',
      'Girl Scout',
      'Wedding',
      'Mr.',
      'Blue',
      'White',
      'Ice Cream',
      'Jack',
      'Green',
      'Northern',
      'Bubba',
      'Cherry',
      'Strawberry',
      'Lava',
      'Super Sour',
      'Super Lemon',
      'Forbidden',
      'Super Silver',
      'Silver',
      'Jet',
      'Maui',
      'Platinum',
      'Fire',
      'Headband',
      'Mango',
      'Alaskan',
      'Blueberry',
      'Pink',
      'Blackberry',
      'God\'s',
      'Pineapple',
      'Super',
      'Cookies and',
      'Peanut Butter',
      'Grease',
      'Grape',
      'Tropicana',
      'Birthday',
      'Ghost Train',
      'Master',
      'Golden',
      'Lilac',
      'Black',
      'Monster',
      'Critical',
      'Alien',
      'Agent',
      'Truffle',
      'Apple',
      'Papaya',
      'Dream',
      'Sugar',
      'Mint',
      'Laughing'
    
    ];
    const nameSuffix = [
      'Kush',
      'Crush',
      'Cake',
      'Cookies',
      'Dream',
      'Widow',
      'Punch',
      'Gelato',
      'Runtz',
      'Sherbert',
      'Express',
      'Herer',
      'Crack',
      'Lights',
      'Pie',
      'Cough',
      'Haze',
      'Fruit',
      'Trainwreck',
      'OG',
      'Cheese',
      'Fuel',
      'Diamond',
      'Wowie',
      'Thunder',
      'Rhino',
      'Muffins',
      'Skunk',
      'Lemonaide',
      'Creamsicle',
      'Tangle',
      'Indica',
      'Sativa',
      'Hybrid',
      'Slurricane',
      'Biscotti',
      'Gushers',
      'Breath',
      'Cream',
      'Jack',
      'Diesel',
      'Skywalker',
      'Orange',
      'Butter',
      'Cheesecake',
      'Queen',
      'Dawg'
    ];
    return namePrefix[Math.floor(Math.random()*namePrefix.length)] + ' ' + nameSuffix[Math.floor(Math.random()*nameSuffix.length)];
  };
  
  this.makeOne = async function(build, json) {
    const canvas = createCanvas(600, 600);
    for(let b in build) {
      let image = await loadImage(this.inputFolder + b + '/' + build[b]);
      canvas.getContext('2d').drawImage(image, 0, 0);
    }
    const hash = crypto.createHash('sha256').update(canvas.toDataURL()).digest('hex');
    const buffer = canvas.toBuffer('image/png')
    let data = JSON.stringify(json);
    fs.writeFileSync(this.inputFolder + `Generated/${hash}.png`, buffer);
    fs.writeFileSync(this.inputFolder + `Generated/${hash}.json`, data);
    
    console.log('Generated file', hash);
  };
  
  
  this.makeBlanks = async function() {
    let json = {
      "attributes": []
    };
    const choices = await this.loadFiles();
    let build = {};
    for(let c in choices['01 Color']) {
      build['01 Color'] = choices['01 Color'][c];
      build['05 Rock'] = choices['05 Rock'][c];
      json.name = this.generateName();
      let bgParts = build['01 Color'].split('.');
      json.attributes.push({
        "trait_type": 'Color',
        "value":bgParts[0]
      });
      let rockParts = build['05 Rock'].split('.');
      json.attributes.push({
        "trait_type": 'Rock',
        "value":rockParts[0]
      });
      json.attributes.push({
        "trait_type": 'Blank',
        "value": "True"
      });
      await this.makeOne(build, json);
      build = {};
      json.attributes = [];
    }
  };
  
  this.makeRandom = async function() {
    let json = {
      "name": this.generateName(),
      "attributes": []
    };
    const choices = await this.parseChoices();
    
    let build = {};
    for(let i in choices) {
      const choice = choices[i][Math.floor(Math.random()*choices[i].length)];
      if(choice) {
        let parts = choice.split('.');
        
        // Make custom fixes
        this.makeChoices(build, i.substr(3), parts[0]);
        build[i] = choice;
      }
    }
    
    for(let k in build) {
      let typeParts = k.split(' ');
      let valueParts = build[k].split('.');
      if(valueParts[0] !== 'None') {
        json.attributes.push({
          "trait_type": typeParts[1],
          "value": valueParts[0]
        });
      }
    }
    
    const canvas = createCanvas(600, 600);
    for(let b in build) {
      let image = await loadImage(this.inputFolder + b + '/' + build[b]);
      canvas.getContext('2d').drawImage(image, 0, 0);
    }
    const hash = crypto.createHash('sha256').update(canvas.toDataURL()).digest('hex');
    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync(this.inputFolder + `Generated/${hash}.png`, buffer);
    
    json.external_url = "https://stonersrock.com/rocks/" + hash;
    json.hash = hash;
    let data = JSON.stringify(json);
    fs.writeFileSync(this.inputFolder + `Generated/${hash}.json`, data);
    
    console.log('Generated image', hash);
  };
  
  this.generate = async function(amount) {
    if(!amount) {
      console.log('Please specify an amount to generate.');
      return;
    }
    console.log('Generating Rocks:', amount);
    for(i=0; i<amount; i++) {
      console.log('Making image', i);
      await this.makeRandom();
    }
    
    console.log('Generated ' + amount + ' Rocks');
  };
  
  this.getGeneratedCounts = async function() {
    const files = await this.readDirectory(this.inputFolder + 'Generated');
    console.log('Total Files:             ', files.length);
    
    let imageCount = 0;
    let sigs = 0;
    for(f in files) {
      let parts = files[f].split('.');
      if(parts[1] === 'png') {
        imageCount++;
      } else {
        // read the file for other counts
        let rawData = fs.readFileSync(this.inputFolder + 'Generated/' + files[f]);
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
  
  this.copy = async function(src, dst) {
    fs.copyFile(src, dst, (err) => {
      if (err) {
        console.log("Error Found:", err);
      } else {
        return true;
      }
    });
  }
  
  this.prep = async function() {
    const files = await this.readDirectory(this.inputFolder + 'Generated');
    let counter = 1;
    for(let f in files) {
      if(files[f].substr(-3) === 'png') {
        let hash = files[f].substr(0, files[f].length-4);
        console.log('image hash', hash);
        
        
        
        await this.copy(this.inputFolder + 'Generated/' + hash + '.png', this.outputFolder + 'rocks/image/' + counter + '.png');
        await this.copy(this.inputFolder + 'Generated/' + hash + '.json', this.outputFolder + 'rocks/json/' + counter);
        counter++;
        console.log('--------');
      }
    }
    
  };
  
  
  this.metadata = async function(ipfsHash) {
    const files = await this.readDirectory(this.outputFolder + 'rocks/json');
    let counter = 1;
    for(let f in files) {
      console.log(f);
      
      const file = files[f];
      const jsonPath = this.outputFolder + 'rocks/json/' + file;
      
      // Load the existing JSON
      let rawData = fs.readFileSync(jsonPath);
      let fileJson = JSON.parse(rawData);
      
      // Add the cid URL to the JSON file
      fileJson.image = 'ipfs://' + ipfsHash + '/' + file + '.png';
      fileJson.external_url = 'https://stonersrock.com/rock/' + file;
      
      let data = JSON.stringify(fileJson);
      fs.writeFileSync(jsonPath, data);
      
      console.log(fileJson);
      console.log('--------');
    }
    
  };
  
};

module.exports = Generator;
