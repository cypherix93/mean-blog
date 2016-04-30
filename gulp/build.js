"use strict";

var del = require("del");
var merge = require("merge-stream");
var runSequence = require("run-sequence");

module.exports = function (gulp, plugins, paths)
{    
    // Deploy App
    gulp.task("deploy", ["build"],
        function ()
        {
            var server = gulp.src(paths.build + "server/**")
                .pipe(plugins.zip("server.zip", {compress: true}))
                .pipe(gulp.dest(paths.deploy));
            
            var client = gulp.src(paths.build + "client-web/**")
                .pipe(plugins.zip("client.zip", {compress: true}))
                .pipe(gulp.dest(paths.deploy));
            
            merge(server, client);
        });
    
    // Build App
    gulp.task("build", function (callback)
    {
        runSequence(
            "clean",
            ["compile-server", "compile-client"],
            callback
        );
    });
    
    // Clean Directories
    gulp.task("clean",
        function (callback)
        {
            return del([
                    paths.build + "**",
                    paths.deploy + "**"
                ],
                {force: true}, callback);
        });
};