const { createCanvas, loadImage } = require('node-canvas')
const folder = '../assets/';
const fs = require('fs');
const crypto = require('crypto');

const generateAmount = parseInt(process.argv[2]);

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

const parseFiles = async function() {
  let files = await loadFiles();
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

const getGeneratedCount = async function() {
  const files = await readDirectory(folder + 'Generated');
  return files.length;
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

const makeRandom = async function() {
  let json = {
    "name": generateName(),
    "attributes": []
  };
  const choices = await parseFiles();
  
  let build = {};
  for(let i in choices) {
    const choice = choices[i][Math.floor(Math.random()*choices[i].length)];
    if(choice) {
      let parts = choice.split('.');
  
      // Make custom fixes
      makeChoices(build, i, parts[0]);
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
    let image = await loadImage(folder + b + '/' + build[b]);
    canvas.getContext('2d').drawImage(image, 0, 0);
  }
  const hash = crypto.createHash('sha256').update(canvas.toDataURL()).digest('hex');
  const buffer = canvas.toBuffer('image/png')
  fs.writeFileSync(folder + `Generated/${hash}.png`, buffer);
  
  json.external_url = "https://stonersrock.com/rocks/" + hash;
  json.hash = hash;
  let data = JSON.stringify(json);
  fs.writeFileSync(`${folder}Generated/${hash}.json`, data);
  
  console.log('Generated image', hash);
};

const generate = async function(amount) {
  if(!amount) {
    console.log('Please specify an amount to generate.');
    return;
  }
  console.log('Generating Rocks:', amount);
  for(i=0; i<amount; i++) {
    console.log('Making image', i);
    await makeRandom();
  }
  
  console.log('Generated ' + amount + ' Rocks');
};

const makeChoices = async function(build, category, choice) {
  if(category === '09 Nose' && choice === 'Big') {
      build['07 Mouth'] = 'None.12.png';
  }
  if(category === '06 Accessories' && choice === 'Top Hat') {
    build['03 Hair'] = 'None.80.png';
  }
};

generate(generateAmount);
