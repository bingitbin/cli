const chalk = require('chalk');
const templateJson = require(`${__dirname}/template.json`);

function list (){
  Object.keys(templateJson).forEach( item => {
      let tplData = templateJson[item];
      
      console.log('  ' + 
            chalk.yellow('★') + 
            '  ' + chalk.yellow(tplData.name) + 
            ' - ' + tplData.description + 
            ' - ' + chalk.red(`  ${tplData.url}`));
  })
}


function get(name){
  const template = templateJson[name];
  return template
}


module.exports = {
    list,
    get
}