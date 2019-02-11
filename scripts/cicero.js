var CompletamentoBarra;
var StepTotali = 3;
var Step = 1;

function ProgressBarAvanti() {
  var barra = document.getElementById('CiceroProgressBar');
  if (Step < StepTotali) {
	  CompletamentoBarra = Number(barra.style.width.substring(0, barra.style.width.length - 1));
	  CompletamentoBarra += Math.round((100 / Number(StepTotali)) * 100) / 100;
	  barra.style.width = CompletamentoBarra + '%';
	  
	  let stepID = 'Step' + Step;
	  let nextStepID = 'Step' + Number(Step + 1);
	  var outerbullet = document.getElementById(nextStepID);
	  var innerbullet = document.getElementById(stepID).childNodes[1].childNodes[3];
	  
	  $(innerbullet).removeClass("fa-circle");
	  $(innerbullet).addClass("fa-check");
	  
	  setTimeout(function() { 
		$(outerbullet).addClass("active");
	  }, 500);
	  
	  Step += 1;
  }
}

 function ProgressBarIndietro() {
  var barra = document.getElementById('CiceroProgressBar');
  
  if (Step > 1) {
	  CompletamentoBarra = Number(barra.style.width.substring(0, barra.style.width.length - 1));
	  CompletamentoBarra -= Math.round((100 / Number(StepTotali)) * 100) / 100;
	  barra.style.width = CompletamentoBarra + '%';
	  
	  let stepID = 'Step' + Step;
	  previousStepID = 'Step' +  Number(Step - 1);
	  var outerbullet = document.getElementById(stepID);
	  var innerbullet = document.getElementById(previousStepID).childNodes[1].childNodes[3];
	  
	  $(innerbullet).removeClass("fa-check");
	  $(innerbullet).addClass("fa-circle");
	  
	  $(outerbullet).toggleClass("active");
	  
	  Step -= 1;
  }
}
