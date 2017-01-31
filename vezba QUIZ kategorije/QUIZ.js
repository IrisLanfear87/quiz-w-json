function Quiz (questions) {
  this.questions = questions;
  this.score = 0;
  this.currentIndex = 0;
  this.overallScore = 0;
}




Quiz.prototype.getCurrentQuestion = function () {
   return this.questions[this.currentIndex];
};

Quiz.prototype.getCategory = function (category) {
return  this.getCurrentQuestion().category;   //OVO ZNACI EJ KVIZU, DAJ KATEGORIJU OD TRENUTNOG PITANJA
};

Quiz.prototype.checkAnswer = function (answer) {
  if (answer === this.getCurrentQuestion().answer) {
    // ovo this.getCurrentQuestion().answer gore znaci
    // Kvizu.uzmiSvojeAktuelnoPitanje.uzmiNjegovTacanOdg
    // console.log('tacno');
    // PA IDE this.score++;
    // console.log(this);
    // ili DODAS
    // this.getCurrentQuestion().points;
    this.score+=this.getCurrentQuestion().points;
  }
  this.currentIndex++;
};


Quiz.prototype.end = function () {
  if (this.currentIndex === this.questions.length) {
    return true;
  }
  else {
    return false;
  }
};

var quiz = new Quiz(questions);
 // console.log(quiz.questions);
// console.log('bla');
