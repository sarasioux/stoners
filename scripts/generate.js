// images QmYwc6vwYR2tLyaR1TbQiQpiD5vkU4FCyqLAk37kTMnLZw
// json Qme3X4xgPxgtVABMKXUBA2HKf5pygRaB1BJTg18vNJUfsk

console.log("\n");

const commands = [
  'blanks',
  'rocks 100',
  'count',
  'prep',
  'ipfs-images',
  'metadata QmYwc6vwYR2tLyaR1TbQiQpiD5vkU4FCyqLAk37kTMnLZw',
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
      console.log('Run the following command, and save its CID for input into the next command:');
      console.log("\n");
      console.log('ipfs add -r ../build/rocks/image');
      break;
      
    case 'metadata':
      const cid = process.argv[3];
      if(!cid) {
        console.log('Please specify a cid to continue.  (' + cid+ ')');
        break;
      }
      await generator.metadata(cid);
      break;
      
    case 'ipfs-json':
      console.log('Run the following command, and save its CID for input into the smart contract:');
      console.log("\n");
      console.log('ipfs add -r ../build/rocks/json');
      break;
  
  
    default:
      console.log(`Unknown command: ${cmd}`);
      break;
  }
  
  console.log("\n");
};

runCommand(command);

