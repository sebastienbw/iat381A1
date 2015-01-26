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
				scope.getQuestion();
				scope.bgClass = "resting";
				scope.nextQuestion = "nextQuestionHidden";
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				scope.bgClass = "resting";
				scope.nextQuestion = "nextQuestionHidden";
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					//scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function(clicked) {
				var correctAns = scope.options[scope.answer];
				if (clicked == correctAns) {
					console.log("Correct!");
					scope.result = true;
				} else {
					console.log("Wrong!");
					scope.result = false;
				}
				scope.givenAnswer();
			}

			scope.givenAnswer = function() {
				if (scope.result == true) {
					scope.bgClass = "correct";
				} else {
					scope.bgClass = "wrong";
				}
				scope.nextQuestion = "nextQuestionVisible";
			}

			scope.swapQuestion = function() {
				console.log("yup");
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
});

app.factory('quizFactory', function() {
	var questions = [
		{
			question: "Question 1",
			options: ["Answer1", "Answer2", "Answer3", "Answer4"],
			answer: 2
		},
		{
			question: "Question 2",
			options: ["Answer1", "Answer2", "Answer3", "Answer4"],
			answer: 2
		},
		{
			question: "Question 3",
			options: ["Answer1", "Answer2", "Answer3", "Answer4"],
			answer: 2
		},
		{
			question: "Question 4",
			options: ["Answer1", "Answer2", "Answer3", "Answer4"],
			answer: 2
		},
		{	
			question: "Question 5",
			options: ["Answer1", "Answer2", "Answer3", "Answer4"],
			answer: 2
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