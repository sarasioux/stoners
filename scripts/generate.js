const commands = [
  'blanks'
];

const command = parseInt(process.argv[2]);

if(!command) {
  console.log('Commands:');
  for(let i=0; i<commands.length; i++) {
    console.log('   ' + commands[i]);
  }
}
