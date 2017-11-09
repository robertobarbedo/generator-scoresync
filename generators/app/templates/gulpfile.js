var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var extrep = require('gulp-ext-replace');
var rename = require("gulp-rename");

//watch - main task
gulp.task('watch', function(){
<% 
var pns = folderNames.split(';');
for (pn in pns) { 
%>
	gulp.watch(['<%= pns[pn] %>/Areas/*/**/*.cshtml'], ['x-copy-<%= pns[pn] %>-cshtml']);
	gulp.watch(['<%= pns[pn] %>/Areas/*/**/*.js'], ['x-copy-<%= pns[pn] %>-js']);
	gulp.watch(['<%= pns[pn] %>/Areas/**/*.scss'], ['x-compile-<%= pns[pn] %>-scss']);
	gulp.watch(['<%= pns[pn] %>/Areas/*/css/**/*.css'], ['x-copy-<%= pns[pn] %>-css']);
<% 
} 
%>	
});


//copy and compile assets - auxiliar tasks
<% 
var pns = folderNames.split(';');
for (pn in pns) { 
%>
	gulp.task('x-copy-<%=pns[pn]%>-cshtml', function() {
	  gulp.src('<%=pns[pn]%>/Areas/*/**/*.cshtml')
		  .pipe(gulp.dest('sandbox/Website/Areas/'));
	});
	
	gulp.task('x-copy-<%=pns[pn]%>-js', function() {
	  gulp.src('<%=pns[pn]%>/Areas/*/**/*.js')
		  .pipe(gulp.dest('sandbox/Website/Areas/'));
	});
	
	gulp.task('x-compile-<%=pns[pn]%>-scss', function() {
		sass('<%=pns[pn]%>/Areas/**/*.scss')
			.on('error', sass.logError)
			.pipe(rename(function (path) {
				path.dirname = path.dirname.replace('\\scss','\\css');
				path.extname = ".css";
				console.log('Processed file:' + path.basename + path.extname)
			  }))
			.pipe(gulp.dest('<%=pns[pn]%>/Areas/'))
	});
	
	gulp.task('x-copy-<%=pns[pn]%>-css', function() {
	  gulp.src('<%=pns[pn]%>/Areas/*/css/**/*.css')
		  .pipe(gulp.dest('sandbox/Website/Areas/'));
	});
<% 
} 
%>




