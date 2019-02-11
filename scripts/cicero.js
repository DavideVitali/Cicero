(function($) {
  var BarWidth;
	var BarWidthPerStep;
	var TotalSteps;
	var CurrentStep = 1;

	$.fn.cicero = function(options) {

		var settings = $.extend({
			titles: ['Step 1', 'Step 2','Step 3'],
			subtitles: ['sub 1', 'sub 2', 'sub 3']
		}, options);

		TotalSteps = settings.titles.length;
		BarWidthPerStep = Math.round((100 / Number(TotalSteps)) * 100) / 100;
		BarWidth = BarWidthPerStep / 2;

		// NAVIGATION
		$("<div id='CiceroNav'></div>").appendTo('#Cicero');
		// TITLES
		$("<div id='CiceroTitles' class='cicero-title'></div>").appendTo('#CiceroNav');
		for (var i = 0; i <= TotalSteps - 1; ++i)
		{
			$("<div class='col-sm'>" + settings.titles[i] + "</div>").appendTo('#CiceroTitles');
		}
		// BULLETS
		$("<div id='CiceroBullets' class='cicero-bullets'></div>").appendTo('#CiceroNav');
		
		// FIRST BULLET - ACTIVE BY DEFAULT
		$("<div id='Step1' class='col-sm cicero-bullet-item active'></div>").appendTo('#CiceroBullets');
		$("<span id='Bullet1' class='fa-stack fa-1x'></span>").appendTo('#Step1');
		$("<i id='OuterBullet' class='fas fa-circle fa-stack-2x'></i>").appendTo('#Bullet1');
		$("<i id='InnerBullet' class='fas fa-circle fa-stack-1x active'></i>").appendTo('#Bullet1');
		
		// NEXT BULLETS - INACTIVE BY DEFAULT
		for (var i = 2; i <= TotalSteps; ++i)
		{
			currentStepID = '#Step' + i;
			currentBulletID = '#Bullet' + i;
			$("<div id='Step" + i + "' class='col-sm cicero-bullet-item'></div>").appendTo("#CiceroBullets");
			$("<span id='Bullet" + i + "' class='fa-stack fa-1x'></span>").appendTo(currentStepID);
			$("<i id='OuterBullet' class='fas fa-circle fa-stack-2x'></i>").appendTo(currentBulletID);
			$("<i id='InnerBullet' class='fas fa-circle fa-stack-1x inactive'></i>").appendTo(currentBulletID);
		}	

		// SUBTITLES
		$("<div id='CiceroSubtitles' class='cicero-subtitle'></div>").appendTo('#CiceroNav');
		for (var i = 0; i <= TotalSteps - 1; ++i)
		{
			$("<div class='col-sm'>" + settings.subtitles[i] + "</div>").appendTo('#CiceroSubtitles');
		}

		// PROGRESSBAR
		$("<div id='CiceroProgressBarContainer' class='progress cicero-progressbar'></div>").appendTo('#CiceroNav');
		$("<div id='CiceroProgressBar' class='progress-bar progressed' style='width: " + BarWidth + "%'></div>").appendTo('#CiceroProgressBarContainer');
		
		// BODY
		$("<div id='CiceroBody' class='cicero-body'></div>").appendTo('#Cicero');
    $("<div id='CiceroPrevStep'><i class='fas fa-chevron-left fa-5x'></i></div>").appendTo('#CiceroBody');
		$("<div id='CiceroBodyContent' style='margin: auto'></div>").appendTo('#CiceroBody');
		$("<div id='CiceroNextStep'><i class='fas fa-chevron-right fa-5x'></i></div>").appendTo('#CiceroBody');


		$('#CiceroNextStep').on("click", function() {
			if (CurrentStep < TotalSteps) {
				var ciceroBar = $('#CiceroProgressBar');
				BarWidth += BarWidthPerStep;
				ciceroBar.css('width', BarWidth + '%');
				
				let stepID = '#Step' + CurrentStep;
				let nextStepID = '#Step' + Number(CurrentStep + 1);

				var bulletstep = $(stepID).children();
				var innerbullet = bulletstep.children('#InnerBullet');
				
				$(innerbullet).removeClass("fa-circle");
				$(innerbullet).addClass("fa-check");
				
				setTimeout(function() { 
				$(nextStepID).addClass("active");
				}, 500);
				
				CurrentStep += 1;
			}
		});
		
		$('#CiceroPrevStep').on("click", function() {
			if (CurrentStep > 1) {
				var ciceroBar = $('#CiceroProgressBar');
				BarWidth -= BarWidthPerStep;
				ciceroBar.css('width', BarWidth + '%');
				
				let stepID = '#Step' + CurrentStep;
				let previousStepID = '#Step' +  Number(CurrentStep - 1);
				
				var bulletstep = $(previousStepID).children();
				var innerbullet = bulletstep.children('#InnerBullet');
				
				$(innerbullet).removeClass("fa-check");
				$(innerbullet).addClass("fa-circle");
				
				$(stepID).toggleClass("active");
				
				CurrentStep -= 1;
			}
		});
	};
}(jQuery));

