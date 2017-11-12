'use strict';
const Generator 	= require('yeoman-generator');
const chalk 		= require('chalk');
const yosay 		= require('yosay');
const fs 			= require('fs')
const path 			= require('path')
const shell 		= require('node-powershell');

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
			var f = '';
			dirs().forEach(function(dir){
				
				if (fs.existsSync(path.join('./', dir + '/Areas')) && fs.existsSync(path.join('./', dir + '/web.config'))){
					f += dir + ';';
				}
			});
			//remove ending commas
			f = f.replace(/;\s*$/, "");
			
			return f;
		}else{
			return "";
		}
	}
  
    const prompts = [
	{
      type: 'input',
      name: 'projects',
      message: '\rI shall need to know where are your projects. Have I got it right? Otherwise, where are they - semicolon separated please:\r',
      default: guessWebProjects()
    }
	];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
	//use powershell to find the host names
	this.fs.copy(
      this.templatePath('bs__printhosts.ps1'),
      this.destinationPath('bs__printhosts.ps1')
    );
	var getHosts = function(objThis, done){
		let ps = new shell({
		  executionPolicy: 'Bypass',
		  noProfile: true
		});
		 
		ps.addCommand('.\\bs__printhosts.ps1')
		ps.invoke()
			.then(output => {
			  console.log(output);
			  ps.dispose();
			  done(objThis);
			})
			.catch(err => {
			  console.log(err);
			  ps.dispose();
			  done(objThis);
			});
	}
	
	getHosts(this, function(objThis){
	
		//mount project name/folder objects
		var arrayProjects = [];  
		objThis.props.projects.split(';').forEach(function(dir){
			arrayProjects.push({
				folder: dir,
				name: dir.replace(/\.Web/g, '').replace(/\./g, '').replace(/-/g, '')
			});
		});
		
		//read hosts
		var hostsString = fs.readFileSync('./bs__hosts.yml', 'utf-8').toString();
		var hostsArray = [];
		if (hostsString && hostsString != ""){
			hostsArray = JSON.parse(hostsString);
		}
		
		console.log("Hosts found:");
		console.log(hostsArray);
		
		//run the templates
		objThis.fs.copyTpl(
		  objThis.templatePath('gulpfile.js'),
		  objThis.destinationPath('gulpfile.js'),
		  {
			  ps: arrayProjects,
			  hosts: hostsArray
		  }
		);
		objThis.fs.copyTpl(
		  objThis.templatePath('package.json'),
		  objThis.destinationPath('package.json'),
		  {
			  ps: arrayProjects,
			  hosts: hostsArray
		  }
		);
		
		//cleanup
		fs.unlinkSync('./bs__printhosts.ps1');
		fs.unlinkSync('./bs__hosts.yml');
	});
	
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }
  
};
