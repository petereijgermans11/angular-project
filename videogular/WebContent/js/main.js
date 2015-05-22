'use strict';
angular.module('myApp',
        [
            "ngSanitize",
            "com.2fdevs.videogular",
            "com.2fdevs.videogular.plugins.controls"
        ]
    )

    
    .controller('HomeCtrl',
    	//Strict Contextual Escaping (SCE) is a mode in which AngularJS requires bindings 
    	//in certain contexts to result in a value that is marked as safe to use for that 
        function ($sce) {
    	
    			 
            this.config = {
                preload: "none",
                sources: [
                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"},
                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
                ],
                tracks: [
                    {
                        src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
                        kind: "subtitles",
                        srclang: "en",
                        label: "English"
                        //default: ""
                    }
                ],
                theme: {
                    url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
                },
                plugins: {
                    controls: {
                        autoHide: true,
                        autoHideTime: 2000
                    }
                }
            };
            
            this.video = this.videoData;
            this.quizes = [{
                	      "index": 0,
                	      "showAt": 20,
                	      "correct": "0",
                	      "show": false,
                	      "question": "How much amazing Videogular is?",
                	      "answers": ["Pretty amazing", "Good shit", "Meh..."]
                	      
                	       },
                	    {
                	      "index": 1,
                	      "showAt": 40,
                	      "correct": "1",
                	      "show": false,
                	      "question": "Carl Sagan was...",
                	      "answers": ["A band from 90's",
                	        "An astrophysicist and science communicator", "A Nokia mobile phone"]
                	    }]
                        	    

            this.answers = [];

            this.quiz = this.quizes[0];

            this.onPlayerReady = function onPlayerReady(API) {
                this.API = API;
            };

            this.onUpdateTime = function onUpdateTime(currentTime, totalTime) {
                if (this.quiz && currentTime > this.quiz.showAt) {
                    this.API.pause();

                    this.quiz.show = true;
                }
            };

            this.onSendForm = function onSendForm() {
                if (this.quiz.correct == this.answers[this.answers.length - 1]) {
                    this.API.play();
                    this.quizes.shift();
                    this.quiz = this.quizes[0];
                }
            };
        }
    	
    
    )
    .directive("myStopButton",
        function() {
            return {
                restrict: "E",
                require: "^videogular",
                template: "<div class='iconButton' ng-click='API.stop()'>STOP</div>"
            }
        }
    );

	