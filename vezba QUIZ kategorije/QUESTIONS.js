function Question (text,options,answer,points,category) {
  this.text = text;
  this.options = options;
  this.answer = answer;
  this.points = points;
  this.category = category;
}


// var globals = {};
var questions= [];

window.addEventListener('load', loadQuestions);


function loadQuestions() {

  var json = new XMLHttpRequest();
  json.addEventListener('readystatechange', function () {
    if (json.status === 200 && json.readyState === 4) {
      getData(json);

      console.log(questions);
      
    }
  });

  json.open('GET','https://danilovesovic.github.io/allInOne/pitanja.json');
  json.send();

console.log(questions);

}



function getData(json) {
  var data = json.responseText;
  var root = JSON.parse(data);
  for (var i = 0; i < root.length; i++) {
    questions.push(new Question(root[i].text, root[i].options, root[i].answer, root[i].points, root[i].category));
  }
}












// console.log(questions);

// var questions = [
// new Question('programming: OOP jezik je?',['JS','CSS','AJAX','C'],'JS',5,'programming'),
// new Question('programming: Array je u prevodu?',['nit','niz','klasa','objekat'],'niz',7,'programming'),
// new Question('brojevi: prvi savrsen broj',['1','3','4','6'],'6',10,'brojevi'),
// new Question('boje: boja neba',['zuta','bela','plava','zelena'],'plava',5,'boje'),
// new Question('programming: OOP jezik je?',['fortran','PHP','basic','pascal'],'PHP',10,'programming'),
// new Question('brojevi: prvi dvocifren broj',['10','3','4','6'],'10',5,'brojevi'),
// new Question('boje: boja trave',['zuta','bela','plava','zelena'],'zelena',10,'boje'),
// new Question('boje: boja zemlje',['zuta','crvena','braon','zelena'],'braon',5,'boje')
// ];

// var questions=[];
