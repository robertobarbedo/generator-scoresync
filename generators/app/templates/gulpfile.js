var gulp 		= require('gulp');
var sass 		= require('gulp-ruby-sass');
var extrep 		= require('gulp-ext-replace');
var rename 		= require("gulp-rename");
var bs 			= require('browser-sync').create();
var cache 		= require('gulp-cached');

_website_dest = 'sandbox/<%= pname %>/Areas/';

<% 
for (i in ps) { 
%>
_csh_Src_<%= ps[i].name %> = '<%= ps[i].folder %>/Areas/**/*.cshtml';
_jvs_Src_<%= ps[i].name %> = '<%= ps[i].folder %>/Areas/**/*.js';
_sas_Src_<%= ps[i].name %> = '<%= ps[i].folder %>/Areas/**/*.scss';
_css_Src_<%= ps[i].name %> = '<%= ps[i].folder %>/Areas/*/css/**/*.css';

_dll1_Src_<%= ps[i].name %> = '<%= ps[i].name %>.Data/bin/sandbox/<%= ps[i].name %>.*';
_dll2_Src_<%= ps[i].name %> = '<%= ps[i].name %>.Custom/bin/sandbox/<%= ps[i].name %>.*';
_dll3_Src_<%= ps[i].name %> = '<%= ps[i].name %>.SiteCluster/bin/sandbox/<%= ps[i].name %>.*';
<% 
} 
%>	

<% 
for (i in hosts) { 
%>
gulp.task('browser-sync<%= (hosts.length == 1 ? "" : "-" + hosts[i].name) %>', function() {
    bs.init({ proxy: { target: "<%= hosts[i].url%>",  }, online: true });	
	watchForSync();
});
<% 
} 
%>

gulp.task('watch-copy', function(){
<% 
for (i in ps) { 
%>
	gulp.watch([_csh_Src_<%= ps[i].name %>], ['x-copy-<%= ps[i].name %>-cshtml']);
	gulp.watch([_jvs_Src_<%= ps[i].name %>], ['x-copy-<%= ps[i].name %>-js']);
	gulp.watch([_sas_Src_<%= ps[i].name %>], ['x-compile-<%= ps[i].name %>-scss']);
	gulp.watch([_css_Src_<%= ps[i].name %>], ['x-copy-<%= ps[i].name %>-css']);
	
	gulp.watch([_dll1_Src_<%= ps[i].name %>], ['x-copy-<%= ps[i].name %>-webbin1']);
	gulp.watch([_dll2_Src_<%= ps[i].name %>], ['x-copy-<%= ps[i].name %>-webbin2']);
	gulp.watch([_dll3_Src_<%= ps[i].name %>], ['x-copy-<%= ps[i].name %>-webbin3']);
<% 
} 
%>	
});

function watchForSync(){
<% 
for (i in ps) { 
%>
	gulp.watch([_csh_Src_<%= ps[i].name %>], ['x-browserSync-<%= ps[i].name %>-cshtml']);
	gulp.watch([_jvs_Src_<%= ps[i].name %>], ['x-browserSync-<%= ps[i].name %>-js']);
	gulp.watch([_sas_Src_<%= ps[i].name %>], ['x-compile-<%= ps[i].name %>-scss']);
	gulp.watch([_css_Src_<%= ps[i].name %>], ['x-copy-<%= ps[i].name %>-css']);
<% 
} 
%>
}

//x = auxiliar tasks
<% 
for (i in ps) { 
%>
	gulp.task('x-copy-<%= ps[i].name %>-cshtml', function() {
	  gulp.src(_csh_Src_<%= ps[i].name %>)
		  .pipe(cache('<%= ps[i].name %>-cshtml'))
		  .pipe(gulp.dest(_website_dest));
	});
	
	gulp.task('x-copy-<%= ps[i].name %>-webbin1', function() {
	  gulp.src(_dll1_Src_<%= ps[i].name %>)
		  .pipe(gulp.dest('sandbox/<%= pname %>/bin/'));
	});
	gulp.task('x-copy-<%= ps[i].name %>-webbin2', function() {
	  gulp.src(_dll2_Src_<%= ps[i].name %>)
		  .pipe(gulp.dest('sandbox/<%= pname %>/bin/'));
	});
	gulp.task('x-copy-<%= ps[i].name %>-webbin3', function() {
	  gulp.src(_dll3_Src_<%= ps[i].name %>)
		  .pipe(gulp.dest('sandbox/<%= pname %>/bin/'));
	});
	
	gulp.task('x-browserSync-<%= ps[i].name %>-cshtml', ['x-copy-<%= ps[i].name %>-cshtml'], function(done) {
		bs.reload();
		done();
	});
	
	
	gulp.task('x-copy-<%= ps[i].name %>-js', function() {
	  gulp.src(_jvs_Src_<%= ps[i].name %>)
		  .pipe(cache('<%= ps[i].name %>-js'))
		  .pipe(gulp.dest(_website_dest));
	});
	
	gulp.task('x-browserSync-<%= ps[i].name %>-js', ['x-copy-<%= ps[i].name %>-js'], function (done) {
		bs.reload();
		done();
	});
	
	
	gulp.task('x-compile-<%= ps[i].name %>-scss', function() {
		sass(_sas_Src_<%= ps[i].name %>, { noCache: false, sourceMaps: false })
			.on('error', sass.logError)
			.pipe(rename(function (path) {
				path.dirname = path.dirname.replace('\\scss','\\css');
				path.extname = ".css";
				console.log('Processed file:' + path.basename + path.extname)
			  }))
			.pipe(gulp.dest('<%= ps[i].folder %>/Areas/'))
	});
	
	gulp.task('x-copy-<%= ps[i].name %>-css', function() {
	  gulp.src(_css_Src_<%= ps[i].name %>)
		  .pipe(cache('<%= ps[i].name %>-css'))
		  .pipe(gulp.dest(_website_dest))
		  .pipe(bs.stream());
	});
<% 
} 
%>
