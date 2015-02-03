var app = angular.module('catApp', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'template.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.answered = false;
				scope.imageBorder = "image-border-idle";
				scope.getQuestion();
				scope.resetButtons();
				scope.bgClass = "resting";
				scope.nextQuestion = "nextQuestionHidden";
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}

			scope.resetButtons = function() {
				scope.btn = [3];
				for (var i = 0; i < scope.options.length; i++) {
					scope.btn[i] = null;
				}
			}

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				scope.bgClass = "resting";
				scope.nextQuestion = "nextQuestionHidden";
				scope.imageBorder = "image-border-idle";
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.image = q.image;
					scope.solution = q.solution;
					//scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function(clicked) {
				for (var i = 0; i < scope.options.length; i++) {
					if (clicked == scope.options[i]) {
						console.log("yeha!");
						scope.btn[i] = scope.btn[i] + " selected"
					}
				}
				if (!scope.answered) {
					scope.image = scope.solution;
					var correctAns = scope.options[scope.answer];
					if (clicked == correctAns) {
						console.log("Correct!");
						scope.result = true;
						scope.score++
					} else {
						console.log("Wrong!");
						scope.result = false;
					}
					scope.givenAnswer();
					scope.answered = true;
				}
			}

			scope.givenAnswer = function() {

				if (scope.result == true) {
					scope.bgClass = "correct";
					scope.imageBorder = "image-border-correct";
				} else {
					scope.bgClass = "wrong";
					scope.imageBorder = "image-border-wrong";
				}
				scope.answerAnimation();
				scope.nextQuestion = "nextQuestionVisible";
			}

			scope.answerAnimation = function() {
				console.log(scope.options.length);
				for (var i = 0; i < scope.options.length; i++) {
					console.log(scope.options.length);
					if (i == scope.answer) {
						scope.btn[i] = scope.btn[i] + " correct";
						console.log("yup");
					} else {
						scope.btn[i] = scope.btn[i] + " wrong";
					}
				}
			}

			scope.swapQuestion = function() {
				console.log("yup");
				scope.id++;
				scope.getQuestion();
				scope.answered = false;
				scope.resetButtons();
			}

			scope.reset();
		}
	}
});

app.factory('quizFactory', function() {
	var questions = [
		{
			question: "Does cat make the jump?",
			options: ["Nailed It!", "Not Even Close", "Gives Up", "CATastrophe!"],
			answer: 1,
			image: "img/question1.gif",
			solution: "img/solution1.gif"
		},
		{
			question: "Question 2",
			options: ["Answer1", "Answer2", "Answer3", "Answer4"],
			answer: 3,
			image: "img/testgif1.gif",
			solution: "img/kitten.jpg"
		},
		{
			question: "Question 3",
			options: ["Answer1", "Answer2", "Answer3", "Answer4"],
			answer: 0,
			image: "img/testgif1.gif",
			solution: "img/kitten.jpg"
		},
		{
			question: "Question 4",
			options: ["Answer1", "Answer2", "Answer3", "Answer4"],
			answer: 2,
			image: "img/testgif1.gif",
			solution: "img/kitten.jpg"
		},
		{	
			question: "Question 5",
			options: ["Answer1", "Answer2", "Answer3", "Answer4"],
			answer: 1,
			image: "img/testgif1.gif",
			solution: "img/kitten.jpg"
		}
	];

	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});