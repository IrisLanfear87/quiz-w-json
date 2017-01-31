// console.log(quiz);

var startBtn = document.getElementById('start');
startBtn.addEventListener('click', pocniQuiz);
var questionText = document.getElementsByTagName('h2')[0];
var optionsBtn = document.getElementsByClassName('option');
var footer = document.getElementsByTagName('footer')[0];
var optionDiv = document.getElementsByClassName('options')[0];
var kategDiv = document.getElementsByClassName('kategorije')[0];
// var checkBox = document.querySelectorAll('input[type="checkbox"]');

var stiklirano = [];  //DAJE NIZ U KOM SU SAMO KATEGORIJE KOJE SU STIKLIRANE

var pitanja = [];   //DAJE NIZ SVIH PITANJA U ZAVISNOSTI OD ODABRANIH KATEGORIJA, OVAJ NIZ SE
                  //STVARA TEK KAD SE STIKLIRAJU KATEGORIJE I KLIKNE START DUGME

var kolicinaPitanja = []; //OVO JE ARRAY KOJI U SEBI SADRZI IZVUCENE I STRPANE KATEGORIJE U VIDU STRINGOVA IZ SVIH PITANJA KOJA CEMO DOBITI KAD SE ODLUCIMO ZA NEKE OD KATEGORIJA, POSTO SE IMENA KATEGORIJA  PONAVLJAJU U OVOM NIZU ON NAM ZAPRAVO SLUZI DA IZVUCEMO KOLIKO IMA PITANJA U SVAKOJ OD ODABRANIH KATEGORIJA STO KORISTIMO DA PRIKAZEMO KOLIKO U SVAKOJ OD KAT IMA PITANJA NA SAMOM POCETKU KVIZA KAO I TO DA PRIKAZEMO KOLIKO IMAMO PITANJA DA ODGOVORIMO (KAD SE SABERE ONO STO SMO ODABRALI) I NA KOM SMO TRENUTNO PITANJU OD KOLIKO


// ------------------------OPERACIJE KOJE SE DESAVAJU KAD SE UCITA STRANICA,A PRE NEGO STO SE KLIKNE START-------------------------


for (var i in quiz.questions) {
  console.log(quiz.questions[i]);
}

for (var i = 0; i < quiz.questions.length; i++) {
console.log(quiz.questions[i]);
console.log('blaaaa');
}

for (var i = 0; i < quiz.questions.length; i++) {      //OVA PETLJA PRODJE KROZ SVA PITANJA U KVIZU, POKUPI NJIHOVE
  kolicinaPitanja.push(quiz.questions[i].category);   //KATEGORIJE I SVE IH REDOM STRPA U NIZ  kolicinaPitanja
  // console.log(quiz.questions[i].category);
}
// console.log(kolicinaPitanja);



var result = {};  //OVAJ OBJEKAT CE U SEBI IMATI IMENA KATEGORIJA KAO PROPERTIJE I BROJ PITANJA KOJI SVAKA KATEGORIJA SADRZI KAO VREDNOSTI
for(var i = 0; i < kolicinaPitanja.length; i++) {  //OVA PETLJA PROLAZI KROZ NIZ SA POBROJANIM KATEGORIJAMA SVIH ODABRANIH PITANJA I RADI SLEDECE:
    if(!result[kolicinaPitanja[i]])              //AKO U OBJEKTU RESULT NEMA PROPERTY KOJI SE ZOVE KAO KATEGORIJA, NAPRAVI TAJ PROPERTY I DAJE MU VALUE 1, AKO GA NADJES
        result[kolicinaPitanja[i]] = 0;         //OPET POVECAVAJ VALUE ZA JEDAN I TAKO DO KRAJA NIZA SA IMENIMA KATEGORIJA
        result[kolicinaPitanja[i]]++;         //OVAJ FAZON SAM NASLA NA NETU KAD SAM HTELA DA PRONADJEM KAKO DA POBROJIM KOLIKO SE PUTA ISTI PODATAK JAVLJA U
  }                                         // NEKOM NIZU, BILO KOJEG TIPA DA JE TAJ PODATAK
// console.log(result);

kategDiv.innerHTML = `<h3>Categories</h3>
<input type="checkbox" id="sveee" name="category" value="sve"> sve (${result.programming+result.brojevi+result.boje})&nbsp;&nbsp;
<input type="checkbox" name="category" value="programming"> programming (${result.programming})&nbsp;&nbsp;
<input type="checkbox" name="category" value="brojevi"> brojevi (${result.brojevi})&nbsp;&nbsp;
<input type="checkbox" name="category" value="boje"> boje (${result.boje})&nbsp;&nbsp;`

var checkBox = document.querySelectorAll('input[type="checkbox"]');   // OVO JE ARRAY SA INPUT ELEMENTIMA
var sveDugme = document.getElementById('sveee');

// -----------------------------KRAJ GOREPOMENUTIH OPERACIJA------------------------------------------


function pocniQuiz() {        // FUNKCIJA pocniQuiz JE VEZANA ZA START DUGME I
  if (sveDugme.checked) {     // PRVO PROVERAVA DA LI JE CEKIRANO POLJE KOJIM SE ODABIRAJU SVA PITANJA PA STARTUJE KVIZ ILI
    startQuiz();              // SU CEKIRANE SAMO ODREDJENE KATEGORIJE PA PRVO POSTAVLJA CEKIRANE KATEGORIJE I TEK ONDA STARTUJE KVIZ
  }
  else {
  postaviKategorije();
  startQuiz();
  }
}


function postaviKategorije () {          //VRLO BITNA FUNKCIJA, MENJA SAM NIZ questions IZ JS FAJLA S PITANJIMA U SKLADU S KATEGORIJAMA KOJE SMO ODABRALI, PA KAZE:
    for (var i = 0; i < checkBox.length; i++) {  // FUNKCIJO, PRODJI KROZ CEO ARRAY SA INPUT ELEMENTIMA
          if (checkBox[i].checked) {             //AKO JE ELEMENT CEKIRAN (KAD JE SAMO IF(checkBox[i].checked) TO ZNACI DA ODMA PITAJO JEL TRUE TJ. CEKIRANO)
               stiklirano[stiklirano.length]= checkBox[i].value;  //STRPAJ GA U ARRAY TJ NIZ STIKLIRANO KOJI SADRZI SAMO PO JEDNOM NAVEDENE STIKLIRANE KATEGORIJE
             }
          }
          // console.log(stiklirano);            //PA ONDA KAZE:
  stiklirano.forEach(function (element) {           // ZA SVAKI ELEMENT U NIZU ZVANOM STIKLIRANO (KOJI JE STRING SA IMENOM KATEGORIJE), PRODJI KROZ SVA PITANJA U NIZU
       for (var i = 0; i < quiz.questions.length; i++) {      //ZVANOM questions (QUESTIONS.JS FAJL)
         if (quiz.questions[i].category===element) {         // I AKO NAIDJES NA PITANJE KOJE IMA TU KATEGORIJU
           pitanja.push(quiz.questions[i]);                  // IZVUCI GA I SMESTI U NOVI ARRAY ZVANI pitanja
         }
       }
   })
    // console.log(pitanja);
    quiz.questions=pitanja;                     //  I SAD ONAJ ARRAY KOJI JE IMAO SVA MOGUCA PITANJA PRETVORI U ARRAY KOJI IMA SAMO ODABRANA PITANJA
    // console.log(quiz.questions);
  }

function startQuiz() {    // OVA FUNKCIJA POCINJE KVIZ ISTO ONAKO KAKO SMO GA RADILI NA CASU
    if (quiz.end()) {
        endOfQuiz();
      }
    else {
        kategDiv.style.display = 'none';
        startBtn.style.display = 'none';
        questionText.innerHTML = quiz.getCurrentQuestion().text;
        var myArr =[];
        var myArr2 = myArr.concat(quiz.getCurrentQuestion().options);
        for (var i = 0; i < optionsBtn.length; i++) {
          var rand = Math.floor(Math.random()*myArr2.length);
          // optionsBtn[i].innerHTML = quiz.getCurrentQuestion().options[i];
          optionsBtn[i].innerHTML =myArr2[rand];
          optionsBtn[i].addEventListener('click',userAnswer);
          myArr2.splice(rand,1);
        }
        footer.innerHTML = '<h3>Question '+(quiz.currentIndex+1)+' of '+quiz.questions.length+'</h3>'
        quiz.overallScore += quiz.getCurrentQuestion().points;   // OVDE SE POVECAVA UKUPAN MOGUCI SKOR U ZAVISNOSTI OD KATEGORIJE I TRENUTNOG PITANJA
        // console.log(quiz.overallScore);                        // JER SVA PITANJA IMAJU RAZLICIT BROJ POENA
    }
}


function userAnswer() {
  quiz.checkAnswer(this.innerHTML);
  startQuiz();
}


function endOfQuiz() {
  questionText.innerHTML = 'Quiz ended !!';
  var procenat = Math.round(quiz.score*100/quiz.overallScore);
  optionDiv.innerHTML = `<h1>points score:  ${quiz.score} out of ${quiz.overallScore} = ${procenat}%</h1>`;
}
