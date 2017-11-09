'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs')
const path = require('path')

module.exports = class extends Generator {
  
  

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the priceless ' + chalk.red('generator-scoresync') + ' generator!'
    ));
	
  var guessWebProjects = function(){
	const dirs = p => fs.readdirSync('./').filter(
		f => fs.statSync(path.join('./', f)).isDirectory()
	);
	
	if (dirs)
	{
		var folders = '';
		dirs().forEach(function(dir){
			
			if (fs.existsSync(path.join('./', dir + '/Areas')) && fs.existsSync(path.join('./', dir + '/web.config'))){
				folders += dir + ';';
			}
		});
		//remove ending commas
		folders = folders.replace(/;\s*$/, "");
	
		return folders;
	}else{
		return "";
	}
  }
	

    const prompts = [
	{
      type: 'input',
      name: 'folderNames',
      message: '\rI shall need to know where are your web project folders. Have I guessed it right? Otherwise, where are they - semicolon separated please:\r',
      default: guessWebProjects()
    }
	];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'),
	  {
		  folderNames: this.props.folderNames
	  }
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
	  {
		  folderNames: this.props.folderNames
	  }
    );
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }
  
};
