module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'web/js3rdparty/angular.js',
	    'web/js3rdparty/angular-mocks.js',
	    'web/js3rdparty/sockjs-min-0.3.4.js',
      'web/js/**/*.js',
	    'test/unittest/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
