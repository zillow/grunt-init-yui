
module.exports = function (grunt) {
    'use strict';

    var cli = grunt.cli;
{% if (yui_release) { %}
    cli.optlist['release-version'] = {
        info: 'Release Version',
        type: String
    };

    cli.optlist['release-build'] = {
        info: 'Release Build',
        type: String
    };
{% } %}
    cli.optlist['cache-build'] = {
        info: 'Cache the build',
        type: Boolean
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        version: grunt.option('release-version'),
        build: grunt.option('release-build'),
        buildtag: '{%= project_title || project_name %} <%= version %> (build <%= build %>)',
        copyright: 'Copyright <%= grunt.template.today("yyyy") %> {%= copyright_owner %} All rights reserved.',
        license: 'Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>'{% if (yui_release) { %},
        compress: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'release/<%= version %>/dist/',
                        src: ['**'],
                        dest: 'yui/'
                    }
                ],
                options: {
                    pretty: true,
                    archive: 'release/<%= version %>/archives/yui_<%= version %>.zip',
                    mode: 'zip',
                    level: 3,
                    zlib: {
                        chunkSize: 12 * 1024
                    }
                }
            },
            cdn: {
                files: [
                    {
                        expand: true,
                        cwd: 'release/<%= version %>/cdn/',
                        dest: '<%= version %>/',
                        src: ['**']
                    }
                ],
                options: {
                    pretty: true,
                    archive: 'release/<%= version %>/archives/akamai_<%= version %>.zip',
                    mode: 'zip',
                    level: 3,
                    zlib: {
                        chunkSize: 12 * 1024
                    }
                }
            },
            'cdn-ssl': {
                files: [
                    {
                        expand: true,
                        cwd: 'release/<%= version %>/cdn-ssl/',
                        dest: '<%= version %>/',
                        src: ['**']
                    }
                ],
                options: {
                    pretty: true,
                    archive: 'release/<%= version %>/archives/akamaissl_<%= version %>.zip',
                    mode: 'zip',
                    level: 3,
                    zlib: {
                        chunkSize: 12 * 1024
                    }
                }
            }
        }{% } %}{% if (clean_build) { %},
        clean: {
            files: ['build']
        }{% } %}
    });
{% if (clean_build) { %}
    grunt.loadNpmTasks('grunt-contrib-clean');{% } %}{% if (yui_release) { %}
    grunt.loadNpmTasks('grunt-contrib-compress');{% } %}
    grunt.loadNpmTasks('grunt-yui-contrib');

    grunt.registerTask('default', ['boot']);
};
