// images QmYwc6vwYR2tLyaR1TbQiQpiD5vkU4FCyqLAk37kTMnLZw
// json Qme3X4xgPxgtVABMKXUBA2HKf5pygRaB1BJTg18vNJUfsk

console.log("\n");

const commands = [
  'names',
  'blanks',
  'rocks 100',
  'count',
  'prep',
  'ipfs-images',
  'metadata',
  'ipfs-json'
  
];

const command = process.argv[2];

if(!command) {
  console.log('The following commands are listed in the order you should run them.');
  console.log('Commands:');
  for(let i=0; i<commands.length; i++) {
    console.log('   ' + commands[i]);
  }
  console.log("\n");
  return;
}

const Generator = require('./Generator.js');
const generator = new Generator();

const runCommand = async function(cmd) {
  switch(cmd) {
    case 'names':
      await generator.saveNames();
      break;
      
    case 'blanks':
      await generator.makeBlanks();
      break;
    
    case 'rocks':
      const amount = parseInt(process.argv[3]);
      if(!amount) {
        console.log('Please specify an amount to generate.  (' + amount + ')');
        break;
      }
      console.log(`Generating ${amount} rocks...`);
      await generator.generate(amount);
      break;
    
    case 'count':
      await generator.getGeneratedCounts();
      break;
      
    case 'prep':
      await generator.prep();
      break;
      
    case 'ipfs-images':
      await generator.ipfsUploadImages();
      break;
      
    case 'metadata':
      await generator.metadata();
      break;
      
    case 'ipfs-json':
      await generator.ipfsUploadJson();
      break;
      
    case 'load-names':
      await generator.loadNames();
      break;
  
    default:
      console.log(`Unknown command: ${cmd}`);
      break;
  }
  
  console.log("\n");
};

runCommand(command);

