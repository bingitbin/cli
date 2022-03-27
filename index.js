#!/usr/bin/env node

var commander = require('commander');
var pkg = require('./package.json');
const template = require('./template');

commander.version(pkg.version, '-v, --version');

commander.command('list')
         .description('display all templates')
         .action(template.list);


commander.command('init <template-name> <project-name>')
         .description('generate the initial project structure')
         .action(function(templateName, projectName){
            const tpl = template.get(templateName) 
            require('./download').init(tpl, projectName);
         }); 


commander.parse(process.argv);