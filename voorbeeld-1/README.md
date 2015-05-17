# AngularJS Project Buildtools
Angular speeltuin
Dit document gaat over de setup van een nieuw project.

Om een Angular project op te zetten is nodejs en npm nodig.

##npm
Begin met het initialiseren van npm

```
    npm init
```

Vul de gegevens in waar npm om vraagt

```
    name: (voorbeeld-1)
    version: 1.0.0
    description: setup van een nieuw project
    entry point: (index.js) app.js
    test command:  karma start test/resources/karma.conf.js
    git repository: https://github.com/petereijgermans11/angular-project/
    keywords:
    author: <Je naam>
    license: Apache 2.0
```
npm heeft het bestand package.json aangemaakt.
Met dit bestand kan je de dependencies en build beheren.
Voor meer informatie zie: https://docs.npmjs.com/files/package.json

Nu kan package.json worden uitgebreid.

Voor front-end package-management is Bower een veel gebruikte tool naast npm 
(NodeJs package Manager) 
Bower kan het best 'globaal' worden geinstalleerd. (Zie: http://bower.io/)

```
    npm install -g bower
```

De optie '-g' installeert bower in de globale module library van npm.

#TODO: uitleg npm
Hiervoor moet het
bestand package.json worden uitgebreid.

Voeg aan het json bestand de volgende regels toe, (ergens voor de laatste accolade).
```
"devDependencies" : {
    "karma":"^0.12"
}
```
Wat we zojuist hebben gedaan: voor development hebben we een dependency op karma 
toegevoegd. De versie is 'ongeveer gelijk aan' versie 0.12. Andere mogelijkheden 
zijn:

    version, moet extact gelijk zijn
    >version, groter dan
    >=version, enz...
    <version
    <=version
    ~version, "Ongeveer gelijk aan" See semver(7)
    ^version, "Compatible met"
    1.2.x 1.2.0, 1.2.1, etc., maar niet 1.3.0
    *, Elke versie
    "", (Lege string) hetzelfde als *
    version1 - version2, hetzelfde als  >=version1 <=version2.
    range1 || range2, range1 of range2.

Andere mogelijkheden zijn:
    htpp://..., URL's
    git..., een git URL
    user/repo, GitHub URL's
    tag, Een specifieke versie die is getagged, zie npm-tag(1)
    path/path/path, een lokaal pad


## Bower


Nu kunnen we met bower javascript packages installeren, bower zet deze in: bower-components.
```
   bbower install angular#1.3.15
   bower install angular-route#1.3.15
```

Bewaar de configuratie in bower.json:
```
bower init
```

Bower stelt een aantal vragen, let bij de volgende vragen op:
bij 'what types of modules does this package expose', selecteer geen enkele maar ga verder.
bij 'would you like to mark this package as private which prevents...' kies 'y'.


Nu zijn we zover om een angular hello world applicatie te maken.
De maven directory structuur is algemeen bekend, laten we die volgen.

Maak het bestand  'index.html' en en 'app.js' in src/.

Maak het bestand server.js aan met de volgende inhoud:
```
var vertx = require('vertx');

  vertx.createHttpServer().requestHandler(function(req) {
      var file = req.path() === '/' ? 'index.html' : req.path();
      req.response.sendFile('src/' + file);
  }).listen(8080)
```
 
Pas package.json aan om de applicatie te starten:

```
"scripts": {
    "start": "vertx run server.js",
    "test": "karma start test/resources/karma.conf.js"
  },
```

Laten we een eenvoudige angular controller maken. We moeten de dependency op 
angular toevoegen.

##Buildtools

De javascript en css voor productie moet zo klein mogelijk gemaakt worden zodat de html
pagina's snel laden.


Hiervoor zijn allerlei utilities gemaakt die via een buildtool zoals 'gulp' of 'grunt' aangeroepen kunnen worden.
Zowel grunt als gulp zijn prima tools.

##Gulp
Om gulp de installeren:

Installeer globaal
```
npm install --global gulp
```

Installeer gulp in development dependencies.
```
npm install --save-dev gulp
```

Maak een gulp file (gulpfile.js)

```
var gulp = require('gulp');

gulp.task('default', function() {
  // place code for your default task here
});
```

Run

```
gulp
```



Nu gaan we gulp gebruiken om zowel een minified als een nonminified versie van
de javascript te maken.

Hiervoor installeren we gulp-uglify in de development dependencies van dit project.
```
npm install --save-dev gulp-uglify
```

En gulp-rename om  bestanden te hernoemen.
```
npm install --save-dev gulp-rename
```

Voeg aan de gulpfile gulp-uglify en gulp-rename toe en schrijf een task die 
alle javascript bestanden minified en opslaat in de doeldirectory.

```
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var DEST = 'build/';
gulp.task('default', function() {
   return gulp.src('src/*.js')
    // This will output the non-minified version
    .pipe(gulp.dest(DEST))
    // This will minify and rename to foo.min.js
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(DEST));
});
```

Voor css is er gulp-minify-css, deze installeren we in de development 
dependencies van dit project.
```
npm install --save-dev gulp-minify-css
```

Voor minify maken we een nieuwe gulp task:
```
var minifyCss = require('gulp-minify-css');

...

gulp.task('minify-css', function() {
  return gulp.src('src/css/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest(DEST));
});
```

Nu kunnen we de css minify'en met:
```
gulp minify-css
```

Van minify-js kunnen we ook een aparte taak maken en de default taak beide laten 
uitvoeren.
```
var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

var DEST = 'build/';
gulp.task('default', ['minify-js', 'minify-css']);

gulp.task('minify-js', function() {
   return gulp.src('src/*.js')
    .pipe(gulp.dest(DEST))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(DEST))
});


gulp.task('minify-css', function() {
  return gulp.src('src/css/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest(DEST))
});
```

Voor extra opties voor minify-css raadpleeg de documentatie van clean-css. 

Om js en css bestanden in 1 doelbestand te plaatsen kunnen we 'gulp-concat' 
gebruiken.

```
npm install --save-dev gulp-concat
```

Voeg aan de minify-js en minify-css taak de 'concat' operatie toe.

```
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

var DEST = 'build/';
gulp.task('default', ['minify-js', 'minify-css']);

gulp.task('minify-js', function() {
   return gulp.src('src/*.js')
    .pipe(gulp.dest(DEST + 'dev/'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(DEST + 'dev/'))
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest(DEST))
});


gulp.task('minify-css', function() {
  return gulp.src('src/css/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest(DEST + 'dev/'))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest(DEST))
});

```

Om de javascript en css te vervangen door 1 bestand moet de html ook worden 
aangepast. Hiervoor kunnen we een extra taak opnemen in de gulpfile.

Eerst moet de module html-replace worden geinstalleerd in de development dependencies.
```
npm install --save-dev gulp-html-replace
```

In de html moeten we opnemen welke onderdelen vervangen moeten worden.
```
 <!-- build:css -->
         <link rel="stylesheet" href="css/app.css">
<!-- endbuild -->
...
 <!-- build:js -->
        <script src="app.js"></script>            
<!-- endbuild -->
```

Nu kunnen we een gulp task maken die de html aanpast.
```
var htmlreplace = require('gulp-html-replace');
 ...
gulp.task('html-replace-minified', function() {
  gulp.src('index.html')
    .pipe(htmlreplace({
        'css': 'styles.min.css',
        'js': 'js/bundle.min.js'
    }))
    .pipe(gulp.dest(DEST));
});
```
De gulp task kunnen we toevoegen aan de 'default' build.
```
gulp.task('default', ['minify-js', 'minify-css', 'html-replace-minified']);
```

Nu hebben we weliswaar een build maar we moeten nog de vendor bestanden 
toevoegen. Hiervoor maken we een eenvoudige task die de vendor bestanden 
kopieert en voegen deze toe aan de default task.

```
gulp.task('default', ['minify-js', 'minify-css', 'html-replace-minified', 'copy-vendor']);

...

gulp.task('copy-vendor', function() {
  gulp.src('src/vendor/**')
    .pipe(gulp.dest(DEST + 'vendor/'));
});
```

Het zou natuurlijk nog mooier zijn als de minified javascripts uit de 
bower-componenten naar de build gekopieerd kunnen worden.

```
gulp.src('bower_components/**/*.min.js')
  .pipe(flatten())
  .pipe(gulp.dest('build/js'));
```

De verwijzingen naar de bower-componenten moeten dan wel vervangen worden in de
html. Hiervoor maken we een task die alle minified javascripts uit 
bower_components in build/vendor zet en een task die met html-replace 
de scripts tags in de html aanpast.

Met gulp flatten kunnen de bower componenten worden gekopieerd.

```
npm install --save-dev gulp-flatten
```

In de gulp file maken we een task aan die de bestanden uit bower_components
kopieert.

```
var flatten = require('gulp-flatten');

...


gulp.task('flatten-bower-components', function() {
    gulp.src('bower_components/**/*.min.js')
      .pipe(flatten())
      .pipe(gulp.dest(DEST + 'vendor'));
});
```

In de html moeten de bower compenenten worden vervangen met gulp-replace.
```
   <script src="../bower_components/angular/angular.min.js" ></script>        
   <script src="../bower_components/angular/angular-route.min.js" ></script>        

``` 
Hiervoor is gulp-replace nodig.
```
npm install --save-dev gulp-replace
```

In de task worden de verwijzingen naar bower-components vervangen.

```
var replace = require('gulp-replace');

...

gulp.task('replace-bower', function() {
  gulp.src('src/*.html')
        .pipe(replace(/\.\.\/bower_components\/.*?\/(.*\.js)/g, 'vendor/$1'))
        .pipe(gulp.dest(DEST));
});
```

Voordat we een build maken willen we eerst de build folder leegmaken. 
Dit kan met de nodejs module 'del' die meerdere bestanden en globbing 
ondersteund. 
```
npm install --save-dev del
```

En maak een gulp task om de buildfolder leeg te maken.
```
var del = require('del');

...

gulp.task('clean', function (cb) {
  del(DEST + '*', cb);
});
```
Het argument 'cb' is de callback function die aan de taak wordt meegegeven.


Het aantal gulp taken wordt nu wel veel, laten we eens kijken of we dat kunnen 
verbeteren door taken te koppelen. De ene taak kan alleen worden uitgevoerd als 
een andere taak ook is uitgevoerd.

Bij een build willen we 
1. clean
2. minify-js
3. minify-css
4.1 vervang script en css tags in html voor minified versies
4.2 vervang bower_components script tags in de html met vendor.
5. kopieer bower_component naar vendor


Stappen 2-5 mogen asynchroon worden uitgevoerd nadat stap 1 is uitgevoerd. 

Gulp voert de taken niet synchroon uit en om zeker te weten dat een taak alleen
wordt uitgevoerd als de vorige sucesvol was moet er een callback worden 
meegegeven aan een taak. In de clean functie hebben we dit al gedaan.

De overige taken moeten afhankelijk zijn van 'clean'.

```
gulp.task('build', [
    'clean',
    'minify-js', 
    'minify-css', 
    'flatten-bower-components', 
    'process-html',
]);

gulp.task('minify-js',['clean'], function() {

...

});


gulp.task('minify-css',['clean'], function() {

...

});

gulp.task('process-html',['clean'], function() {

...

});


gulp.task('flatten-bower-components',['clean'], function() {

...

});

gulp.task('clean', function (cb) {
    del(DEST + '*', cb);  
});
```

##Testen
Om de applicatie te kunnen testen zou de javascriptcode in meerdere browsers 
getest kunnen worden. Hiervoor is 'karma' de aangewezen tool. 
(Zie: https://www.npmjs.com/package/karma)
Karma wordt bijvoorkeur geinstalleerd in het project zelf. 


In een build moet de applicatie getest worden. In een Angular applicatie is er
sprake van twee soorten testen:

Unit Test (karma/jasmine)
End to End test (protractor/jasmine).

De testen maken we in de directory test. Hier plaatsen we een karma.conf en een
protractor.conf.

De unittesten zetten we onder test/unit en de protractor testen onder test/e2e
 
We maken eerst de configuratie file voor karma.
Karma heeft hiervoor een tool 'karma init' maar eerst moet karma geinstalleerd worden.
```
npm install karma --save-dev
```

Om niet telkens het pad naar de lokale installatie te hoeven opgeven kunnen we 
karma-cli globaal installeren.
```
npm install --global karma-cli
```

We willen angular-mocks gebruiken, dus installeer deze:
```
    bower install angular-mocks
```


Karma heeft een tool om de configfile mee te maken. De config moet in de 
directory 'test' komen dus geven we 'test/karma.conf' mee als argument voor init.

```
$karma init test/karma.conf
```

Karma init stelt een aantal vragen. 
Kies voor het testframework jasmine
Require.js is wel nodig 
Kies voor de browsers Chrome 
Voor de locatie van bron- en testbestanden geef de volgende waarden op:
src/**/*.js
test/unit/**/*.js

Er hoeven geen bestanden uitgesloten te worden
Karma moet de de test draaien bij een wijziging.
En laat karma de bootstrap file voor requirejs maken (test-main.js)
Verplaatst het bestand test-main.js naar test/bootsrap-karma.js en pas de lijst met files aan:

```
 files: [
      'test/bootstrap-karma.js',
      'src/**/*.js',
      {pattern: 'test/unit/**/*Spec.js', included: false}
    ],

```

Uiteindelijk willen we dat de bower components automatisch worden bijgewerkt in 
karma maar voor nu voegen we de dependencies handmatig toe.

```
 files: [
      'test/bootstrap-karma.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'src/**/*.js',
      {pattern: 'test/unit/**/*Spec.js', included: false}
    ],

```

...


Om karma te starten vanuit gulp:

```
var karma = require('karma').server;

...


gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/test/karma.conf',
    singleRun: true
  }, done);
});
```

## End to end test
Voor end to end testen wordt protractor veel gebruikt.

Installeer protractor als een globale module
```
npm install -g protractor
```

Hiermee worden 2 tools geinstalleerd: protractor en webdriver-manager. 
webdriver-manager is een tool waarmee 'eenvoudig' een selenium server gestart 
kan worden.

Download de benodigde files met:
```
webdriver-manager update
```

Maak een protractor config file:

```
exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'e2e/*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  chromeOnly: true,

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
```

Start de website en run de test

```
npm start > log 2>&1 &
protractor test/protractor.conf.js
```

Protractor kan aangeroepen worden vanuit gulp met de gulp plugin 
'gulp-protractor'.

```
npm install --save-dev gulp-angular-protractor
```

Voeg 'gulp-protractor' en een task toe toe aan de gulpfile. 
De e2e test is afhankelijk van de build task omdat de test gestart kan worden
nadat de bestanden in de build directory zijn geplaatst. Ook moet de website
lokaal draaien, wellicht kunnen we daar later nog aanpassingen in maken.

```
var angularProtractor = require('gulp-angular-protractor');

gulp.task('e2e-test',['build'], function() {
    gulp.src(["./test/e2e/*.js"])
    .pipe(angularProtractor({
        'configFile': 'test/protractor.conf.js',
        'args': ['--baseUrl', 'http://127.0.0.1:8000'],
        'autoStartStopServer': true,
        'debug': true
    }))
    .on('error', function(e) { throw e });    
});
```

We kunnen de testen bij elke wijziging starten mbv gulp watch.

```
gulp.task('watch', function() {
    gulp.watch('src/**/*.*', ['e2e-test']);
    gulp.watch('test/unit/**/*Spec.js', ['e2e-test']);
    gulp.watch('test/e2e/**/*.js', ['e2e-test']);
});
```

Om het af te maken voegen we nog een lint task toe

```
npm install --save-dev gulp-jshint 
```

En maak een gulp task.

```
var jshint = require('gulp-jshint');
....

gulp.task('build', [
    'clean',
    'lint',
    'minify-js', 
    'minify-css', 
    'flatten-bower-components', 
    'process-html',
]);

...

gulp.task('lint',['clean'], function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
```

Om lokaal te ontwikkelen is dit 'handig?' misschien wil je niet bij elke
wijziging alle testen draaien. Maar ze handmatig starten.

De volgende stap is om na een commit een build te starten op een build-server
en een deployment te doen als de testen succesvol zijn.





 