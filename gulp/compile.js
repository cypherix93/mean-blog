"use strict";

var streamqueue = require("streamqueue");
var typescript = require("typescript");

module.exports = function (gulp, plugins, paths)
{
    // Compile everything
    gulp.task("compile", ["compile-server", "compile-client"]);

    // Compile Server files
    gulp.task("compile-server",
        function ()
        {
            var tsFilter = plugins.filter("**/*.ts", {restore: true});

            return gulp.src(paths.project + "server/**")
                .pipe(tsFilter)
                .pipe(plugins.typescript({
                    typescript: typescript,
                    target: "ES6",
                    module: "commonjs",
                    experimentalAsyncFunctions: true,
                    experimentalDecorators: true,
                    removeComments: true
                }))
                .pipe(plugins.debug({title: "[server] compiled:"}))
                .pipe(tsFilter.restore)
                .pipe(gulp.dest(paths.build + "server/"));
        });

    // Compile Client files
    gulp.task("compile-client", ["bundle-ng-files", "compile-sass"],
        function ()
        {
            return gulp.src(paths.public + "**")
                .pipe(plugins.debug({title: "[web] copied:"}))
                .pipe(gulp.dest(paths.build + "public/"));
        });

    // Bundle AngularJS files
    gulp.task("bundle-ng-files",
        function ()
        {
            var angularScripts = [
                paths.angular + "angular-app.js",
                paths.angular + "startup/**/*.js",
                paths.angular + "services/**/*.js",
                paths.angular + "filters/**/*.js",
                paths.angular + "directives/**/*.js",
                paths.angular + "controllers/**/*.js"
            ];

            var angularTemplates = paths.angular + "templates/**/*.html";

            var angularDest = paths.public + "js/angular/";

            var scripts = gulp.src(angularScripts)
                .pipe(plugins.debug({title: "angular app:"}))
                .pipe(plugins.concat("angular-scripts.js"))
                .pipe(plugins.ngAnnotate());

            var templates = gulp.src(angularTemplates)
                .pipe(plugins.debug({title: "angular templates:"}))
                .pipe(plugins.htmlmin())
                .pipe(plugins.angularTemplatecache("angular-templates.js",
                    {
                        module: "MainApp",
                        root: "templates/",
                        templateHeader: "<%= module %>.run([\"$templateCache\", function($templateCache) {"
                    }));

            var bundle = new streamqueue({objectMode: true})
                .queue(scripts)
                .queue(templates)
                .done()
                .pipe(plugins.concat("angular-bundle.js"))
                .pipe(gulp.dest(angularDest))
                .pipe(plugins.uglify())
                .pipe(plugins.rename({
                    suffix: ".min"
                }))
                .pipe(gulp.dest(angularDest));

            return bundle;
        });

    // Compile SASS files
    gulp.task("compile-sass",
        function ()
        {
            var cssDir = paths.public + "css/";

            return gulp.src(paths.sass + "main.scss")
                .pipe(plugins.debug({title: "compiling sass:"}))
                .pipe(plugins.plumber())
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.sassGlob())
                .pipe(plugins.sass())
                .pipe(gulp.dest(cssDir))

                .pipe(plugins.cleanCss())
                .pipe(plugins.rename({suffix: ".min"}))
                .pipe(plugins.sourcemaps.write("./"))
                .pipe(gulp.dest(cssDir));
        });
};