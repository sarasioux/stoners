/*
    Generator module.
    
    Handles all of the auto-generation and composition functions previously found in scripts.
*/

const { createCanvas, loadImage } = require('node-canvas')
const folder = '../assets/';
const fs = require('fs');
const crypto = require('crypto');

const Generator = function() {
  
  let _this = this;
  
  this.inputFolder = '../build/google/';
  this.outputFolder = '../public/rocks/';
  
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
      let image = await loadImage(folder + b + '/' + build[b]);
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
    const choices = await loadFiles();
    let build = {};
    for(let c in choices['01 Color']) {
      build['01 Color'] = choices['01 Color'][c];
      build['05 Rock'] = choices['05 Rock'][c];
      json.name = generateName();
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
      await makeOne(build, json);
      build = {};
      json.attributes = [];
    }
  };
  
};

module.exports = Generator;
