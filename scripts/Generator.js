/*
    Generator module.
    
    Handles all of the auto-generation and composition functions previously found in scripts.
*/

const { createCanvas, loadImage } = require('node-canvas');
const { create, globSource } = require('ipfs-http-client');

const fs = require('fs');
const crypto = require('crypto');

const ipfsHost = 'ipfs.infura.io';
const ipfsPort = 5001;
const ipfsProtocol = 'https';
const ipfsProjectId = process.env.PROJECT_ID;
const ipfsProjectSecret = process.env.PROJECT_SECRET;

const Generator = function() {
  
  this.inputFolder = '../build/google/';
  this.outputFolder = '../build/';
  
  this.makeChoices = async function(build, category, choice) {
    
    if(category === '09 Nose' && choice === 'Big') {
      build['06 Mouth'] = 'None.0.png';
      console.log('RULE:  Big Nose No Mouth');
    }
    if(choice === 'Top Hat') {
      build['03 Hair'] = 'None.89.png';
      console.log('RULE:  Top Hat No Hair');
    }
    if(category === '05 Accessories' && (build['03 Hair'] === 'Mohawk.4.png' || build['03 Hair'] === 'Clown.7.png')) {
      build['05 Accessories'] = 'None.29.png';
      console.log('RULE:  Mohawk/Clown No Accessories');
    }
    if(category === '08 Eyes' && (build['05 Accessories'] === 'Trucker 420.6.png' || build['05 Accessories'] === 'Trucker Rock.1.png')) {
      build['05 Accessories'] = 'None.29.png';
      console.log('RULE:  No trucker hats with eyebrows.');
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
      'Laughing',
      'Sensi',
      'Cream',
      'Gelato',
      'Gorilla',
      'Turbo',
      'Dirty',
      'Night',
      'Guava',
      'Sunset',
      'Secret',
      'Bubble',
      'Chunky'
    
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
      'Dawg',
      'Ape',
      'Star',
      'Soda',
      'Picasso',
      'Banana',
      'Glue',
      'Mintz',
      'Shade',
      'Taxi',
      'Mimosa',
      'Monkey',
      'Cone',
      'Sigh'
    ];
    return namePrefix[Math.floor(Math.random()*namePrefix.length)] + ' ' + nameSuffix[Math.floor(Math.random()*nameSuffix.length)];
  };
  
  this.generateNames = async function() {
    const namePrefix = [
        'OG' ,
        'Purple' ,
        'Grand Daddy' ,
        'Sour' ,
        'Lemon' ,
        'Orange' ,
        'Girl Scout' ,
        'Wedding' ,
        'Mr.' ,
        'Blue' ,
        'White' ,
        'Ice Cream' ,
        'Jack' ,
        'Green' ,
        'Northern' ,
        'Bubba' ,
        'Cherry' ,
        'Strawberry' ,
        'Lava' ,
        'Super Sour' ,
        'Super Lemon' ,
        'Forbidden' ,
        'Super Silver' ,
        'Silver' ,
        'Jet' ,
        'Maui' ,
        'Platinum' ,
        'Fire' ,
        'Headband' ,
        'Mango' ,
        'Alaskan' ,
        'Blueberry' ,
        'Pink' ,
        'Blackberry' ,
        'God\'s' ,
        'Pineapple' ,
        'Super' ,
        'Cookies and' ,
        'Peanut Butter' ,
        'Grease' ,
        'Grape' ,
        'Tropicana' ,
        'Birthday' ,
        'Ghost Train' ,
        'Master' ,
        'Golden' ,
        'Lilac' ,
        'Black' ,
        'Monster' ,
        'Critical' ,
        'Alien' ,
        'Agent' ,
        'Truffle' ,
        'Apple' ,
        'Papaya' ,
        'Dream' ,
        'Sugar' ,
        'Mint' ,
        'Laughing' ,
        'Sensi' ,
        'Cream' ,
        'Gelato' ,
        'Gorilla' ,
        'Turbo' ,
        'Dirty' ,
        'Night' ,
        'Guava' ,
        'Sunset' ,
        'Secret' ,
        'Bubble' ,
        'Chunky' ,
        'Dank' ,
        'Do-si' ,
        'Sundae' ,
        'Watermelon' ,
        'GMO' ,
        'Durban' ,
        'Miracle' ,
        'Cereal' ,
        'Amnesia' ,
        'Mendo' ,
        'Bruce' ,
        'AK' ,
        'Animal' ,
        'Candy' ,
        'Motor' ,
        'King' ,
        'Mandarin' ,
        'Jungle' ,
        'NYC' ,
        'Vanilla' ,
        'Khalifa' ,
        '9lb' ,
        'Death' ,
        'Georgia' ,
        'Juicy' ,
        'Lucky' ,
        'Cali' ,
        'Deadhead' ,
        'Goji' ,
        'Magic' ,
        'Sweet' ,
        'Power' ,
        'Gummy' ,
        'Grandpa\'s' ,
        'Space' ,
        'Incredible' ,
        'Honey' ,
        'Lavender' ,
        'Red' ,
        'Rainbow' ,
        'Sticky' ,
        'Royal' ,
        'Tropic' ,
        'Scooby' ,
        'Cookie' ,
        'Jelly' ,
        'Lime' ,
        'LA'
  
    ];
    const nameSuffix = [
      'Kush' ,
      'Crush' ,
      'Cake' ,
      'Cookies' ,
      'Dream' ,
      'Widow' ,
      'Punch' ,
      'Gelato' ,
      'Runtz' ,
      'Sherbert' ,
      'Express' ,
      'Herer' ,
      'Crack' ,
      'Lights' ,
      'Pie' ,
      'Cough' ,
      'Haze' ,
      'Fruit' ,
      'Trainwreck' ,
      'OG' ,
      'Cheese' ,
      'Fuel' ,
      'Diamond' ,
      'Wowie' ,
      'Thunder' ,
      'Rhino' ,
      'Muffins' ,
      'Skunk' ,
      'Lemonaide' ,
      'Creamsicle' ,
      'Tangle' ,
      'Indica' ,
      'Sativa' ,
      'Hybrid' ,
      'Slurricane' ,
      'Biscotti' ,
      'Gushers' ,
      'Breath' ,
      'Cream' ,
      'Jack' ,
      'Diesel' ,
      'Skywalker' ,
      'Orange' ,
      'Butter' ,
      'Cheesecake' ,
      'Queen' ,
      'Dawg' ,
      'Ape' ,
      'Star' ,
      'Soda' ,
      'Picasso' ,
      'Banana' ,
      'Glue' ,
      'Mintz' ,
      'Shade' ,
      'Taxi' ,
      'Mimosa' ,
      'Monkey' ,
      'Cone' ,
      'Sigh' ,
      'Zkittlez' ,
      'Do' ,
      'Driver' ,
      'Poison' ,
      'Milk' ,
      'Banner' ,
      'Fritter' ,
      'Land' ,
      'Louis' ,
      'Goat' ,
      'Hammer' ,
      'Rozay' ,
      'Mamba' ,
      'Frosting' ,
      'Mass' ,
      'Charms' ,
      'Melon' ,
      'Stomper' ,
      'Tooth' ,
      'Plant' ,
      'Bears' ,
      'Stash' ,
      'Hulk' ,
      'Panties' ,
      'Bun' ,
      'Starburst' ,
      'Dragon' ,
      'Chip' ,
      'Rock Candy' ,
      'Buns' ,
      'Highness' ,
      'Snacks' ,
      'Monster' ,
      'Caramel' ,
      'Goblin'
    ];
    let names = [];
    for(let i in namePrefix) {
      for(let k in nameSuffix) {
        names.push(namePrefix[i] + ' ' + nameSuffix[k]);
      }
    }
    return names;
  };
  
  this.saveNames = async function() {
    const names = await this.generateNames();
    console.log('names', names);
    const writeNames = names.join("\n");
    fs.writeFileSync(this.outputFolder + 'names.txt', writeNames);
  };
  
  this.loadNames = async function() {
    let rawData = fs.readFileSync(this.outputFolder + 'names-shuffled.txt', 'utf8');
    const text = rawData.trim();
    const names = text.split('\n');
    return names;
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
      build['04 Rock'] = choices['04 Rock'][c];
      let bgParts = build['01 Color'].split('.');
      json.attributes.push({
        "trait_type": 'Color',
        "value":bgParts[0]
      });
      let rockParts = build['04 Rock'].split('.');
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
      "attributes": []
    };
    const choices = await this.parseChoices();
    
    let build = {};
    for(let i in choices) {
      const choice = choices[i][Math.floor(Math.random()*choices[i].length)];
      if(choice) {
        let parts = choice.split('.');
        
        // Make custom fixes
        build[i] = choice;
        this.makeChoices(build, i, parts[0]);
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
  };
  
  this.prep = async function() {
    const files = await this.readDirectory(this.inputFolder + 'Generated');
    let counter = 1;
    for(let f in files) {
      if(files[f].substr(-3) === 'png') {
        let hash = files[f].substr(0, files[f].length-4);
        await this.copy(this.inputFolder + 'Generated/' + hash + '.png', this.outputFolder + 'rocks/image/' + hash + '.png');
        await this.copy(this.inputFolder + 'Generated/' + hash + '.json', this.outputFolder + 'rocks/json/' + counter);
        counter++;
        console.log(hash);
      }
    }
    
  };
  
  
  this.metadata = async function() {
    const data = fs.readFileSync(this.outputFolder + 'imagecid.json');
    const json = JSON.parse(data);
    const ipfsHash = json.cid;
    const names = await this.loadNames();
    
    const files = await this.readDirectory(this.outputFolder + 'rocks/json');
    for(let f in files) {
      console.log(f);
      
      const file = files[f];
      const jsonPath = this.outputFolder + 'rocks/json/' + file;
      
      // Load the existing JSON
      let rawData = fs.readFileSync(jsonPath);
      let fileJson = JSON.parse(rawData);
      
      // Add the cid URL to the JSON file
      fileJson.name = names[file];
      fileJson.image = 'ipfs://' + ipfsHash + '/image/' + fileJson.hash + '.png';
      fileJson.external_url = 'https://stonersrock.com/rock/' + file;
      
      let data = JSON.stringify(fileJson);
      fs.writeFileSync(jsonPath, data);
      
      console.log(fileJson);
      console.log('--------');
    }
    
  };
  
  this.ipfsUpload = async function(path) {
    if(!ipfsProjectId || !ipfsProjectSecret) {
      console.log('Please set PROJECT_ID and PROJECT_SECRET in your shell.');
      return;
    }
    const auth = 'Basic ' + Buffer.from(ipfsProjectId + ':' + ipfsProjectSecret).toString('base64')
    const ipfs = await create({
      host: ipfsHost,
      port: ipfsPort,
      protocol: ipfsProtocol,
      headers: {
        authorization: auth
      },
      timeout: '20m'
    });
    const globSourceOptions = {
      recursive: true
    };
    const addOptions = {
      wrapWithDirectory: true,
    };
    let cid;
    for await (const file of ipfs.addAll(globSource(path, globSourceOptions), addOptions)) {
      console.log(`${file.path}: ${file.cid}`);
      cid = file.cid;
    }
    return cid;
  };
  
  this.ipfsUploadImages = async function() {
    let cid = String(await this.ipfsUpload(this.outputFolder + 'rocks/image/'));
    const json = {cid: cid};
    const data = JSON.stringify(json);
    fs.writeFileSync(this.outputFolder + 'imagecid.json', data);
  };
  
  this.ipfsUploadJson = async function() {
    let cid = String(await this.ipfsUpload(this.outputFolder + 'rocks/json/'));
    const json = {cid: cid};
    const data = JSON.stringify(json);
    fs.writeFileSync(this.outputFolder + 'jsoncid.json', data);
  };
  
};

module.exports = Generator;
