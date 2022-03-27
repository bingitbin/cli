const ora = require('ora');
const chalk = require('chalk');
const Metalsmith = require('Metalsmith');
var rimraf = require("rimraf");
const childProcess = require('child_process');

function init(template, projectName) {
    console.log( chalk.yellow(`正在使用模版 ${template.name} 创建项目`) );
    const spinner = ora('正在下载模版...');
    spinner.start();

    childProcess.exec(`git clone ${template.url} ./.u-template/${template.name}`, (err, data) => {
        spinner.stop();
        process.on('exit', () => {
            rimraf.sync(`${process.cwd()}/.u-template`);
        })
        if (err) {
            console.log(chalk.red('模板下载失败 ', err.message));
            return
        }
        const tplPath = `${process.cwd()}/.u-template/${template.name}`;
        const projectPath = `${process.cwd()}/${projectName}`;


        Metalsmith(`${tplPath}`)
            .source('.')
            .destination(`${projectPath}`)
            .ignore('.git')
            .build(function(err) {
                if (err) {
                    console.log(chalk.red('项目生成失败', err));
                }
                console.log(chalk.yellow(' \n 项目已创建'));
            })
    });    
}

module.exports = {
    init 
}