# scaffolding

Voor scaffolding ( een webapp genereren ) kan yeoman gebruikt worden.
Yeoman gebruikt meerdere tools: yo (scaffolds een nieuwe applicatie), grunt of 
gulp (build system) en bower en of npm (package managers).

Installeer de benodigde tools

```
npm install -g yo bower grunt-cli gulp
```

Om een webapp te maken is de webapp-generator nodig:

```
npm install -g generator-webapp
```

Genereer een nieuwe webapp

```
yo webapp
```

Yo vraagt om extra's:

Bootstrap, een javascript start bestand
Sass, (css with superpowers... zie: http://sass-lang.com)
Modernizer, html5/css feature detection

libsass, maakt een koppeling met nodejs mogelijk.

Voor sass moet ruby geinstalleerd zijn en sass:

```
gem install sass
```

#generators

Behalve webapp zijn er nog andere generators

angular, AngularJS The Yeoman Team
angular-fullstack, AngularJS with an Express server Tyler Henkel
jhipster, Hipster stack for Java developers. + Maven + Spring + AngularJS in one handy generator	Julien Dubois	2151
gulp-angular, angular gulp

Deze kan je uitproberen door eerst de generator te installeren en daarna aan te 
roepen.

```
npm install -g angualar-generate
```

En daarna de applicatie te genereren

```
yo angular
```

Het kan zijn dat 'compass' geinstalleerd moet worden.

```
gem install compass
```

Om te genereren:
```
yo angular
```

Om te draaien:
```
grunt serve
```







