const { createCanvas, loadImage } = require('node-canvas')
const folder = '../assets/';
const fs = require('fs');
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

const loadFiles = async function() {
  let returnFiles = {};
  const files = await readDirectory(folder);
  for(let i in files) {
    returnFiles[files[i]] = await readDirectory(folder + files[i]);
  }
  return returnFiles;
};

const generateName = function() {
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

const makeOne = async function(build, json) {
  const canvas = createCanvas(600, 600);
  for(let b in build) {
    let image = await loadImage(folder + b + '/' + build[b]);
    canvas.getContext('2d').drawImage(image, 0, 0);
  }
  const hash = crypto.createHash('sha256').update(canvas.toDataURL()).digest('hex');
  const buffer = canvas.toBuffer('image/png')
  fs.writeFileSync(folder + `Generated/${hash}.png`, buffer);
  
  json.external_url = "https://stonersrock.com/rocks/" + hash;
  let data = JSON.stringify(json);
  fs.writeFileSync(`${folder}Generated/${hash}.json`, data);
  
  console.log('Generated file', hash);
};

const makeBlanks = async function() {
  let json = {
    "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",
    "attributes": []
  };
  const choices = await loadFiles();
  let build = {};
  for(let c in choices['01 Background Color']) {
    console.log('Background color', choices['01 Background Color'][c]);
    console.log('Rock', choices['05 Rocks'][c]);
    build['01 Background Color'] = choices['01 Background Color'][c];
    build['05 Rocks'] = choices['05 Rocks'][c];
    json.name = generateName();
    let bgParts = build['01 Background Color'].split('.');
    json.attributes.push({
      "trait_type": 'Background Color',
      "value":bgParts[0]
    });
    let rockParts = build['05 Rocks'].split('.');
    json.attributes.push({
      "trait_type": 'Rocks',
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

makeBlanks();
