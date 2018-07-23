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
	
	var guessProjectName = function(){
		const dirs = p => fs.readdirSync('./sandbox/').filter(
			f => fs.statSync(path.join('./sandbox/', f)).isDirectory()
		);

		if (dirs)
		{
			var f = '';
			dirs().forEach(function(dir){
				
				if (fs.existsSync(path.join('./sandbox/', dir + '/Areas')) && fs.existsSync(path.join('./sandbox/', dir + '/web.config'))){
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
      name: 'projname',
      message: '\rIn your sandbox, your sitecore site is under the "' + guessProjectName() + '" folder? \r If yes, press enter to confirm.',
      default: guessProjectName()
    },
	{
      type: 'input',
      name: 'projects',
      message: '\rAnd I guess "' + guessWebProjects() + '" is your Web project?\r If yes, press enter to confirm.',
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
		 
		ps.addCommand('.\\bs__printhosts.ps1 ' + objThis.props.projname)
		ps.invoke()
			.then(output => {
			  console.log(output);
			  ps.dispose();
			  done(objThis);
			})
			.catch(err => {
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
		var hostsArray = [];
		try{
			var hostsString = fs.readFileSync('./bs__hosts.yml', 'utf-8').toString();
			var hostsArray = [];
			if (hostsString && hostsString != ""){
				hostsArray = JSON.parse(hostsString);
			}
			
			console.log("Hosts found:");
			console.log(hostsArray);
		}catch(err){
			var hostsArray = [{"name":"SiteName","url":"http://YOUR_HOST_HERE"}];
			console.log("Hosts not found:");
			console.log("\x1b[37m%s\x1b[0m", "......");
		    console.log("\x1b[43m%s\x1b[0m", "Hey, you, here!!!");
		    console.log("\x1b[37m%s\x1b[0m", "I could not detect your HOST name. Possible reasons:");
			console.log("\x1b[33m%s\x1b[0m", " - You are not running as Administrator.");
			console.log("\x1b[32m%s\x1b[0m", " - You don`t have a site in the standard SCORE sandbox location.");
			console.log("\x1b[36m%s\x1b[0m", " - Your IIS doesn`t have configure the binding.");
		    console.log("\x1b[37m%s\x1b[0m", "......");
		}
		
		//run the templates
		objThis.fs.copyTpl(
		  objThis.templatePath('gulpfile.js'),
		  objThis.destinationPath('gulpfile.js'),
		  {
			  ps: arrayProjects,
			  hosts: hostsArray, 
			  pname: objThis.props.projname
		  }
		);
		objThis.fs.copyTpl(
		  objThis.templatePath('package.json'),
		  objThis.destinationPath('package.json'),
		  {
			  ps: arrayProjects,
			  hosts: hostsArray, 
			  pname: objThis.props.projname
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
