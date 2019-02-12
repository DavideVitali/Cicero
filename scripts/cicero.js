(function($) {
  var BarWidth;
	var BarWidthPerStep;
	var TotalSteps;
	var CurrentStep = 1;

	$.fn.cicero = function(options) {

		var settings = $.extend({
			titles: ['Step 1', 'Step 2','Step 3'],
			subtitles: null
		}, options);

		TotalSteps = settings.titles.length;
		BarWidthPerStep = Math.round((100 / Number(TotalSteps)) * 100) / 100;
		BarWidth = BarWidthPerStep / 2;

		// MAIN NAVIGATION CONTAINER
		$("<div id='CiceroNav'></div>").appendTo('#Cicero');
		
		// TITLES
		$("<div id='CiceroTitles' class='cicero-title'></div>").appendTo('#CiceroNav');
		for (var i = 0; i <= TotalSteps - 1; ++i)
		{
			$("<div class='col-sm'>" + settings.titles[i] + "</div>").appendTo('#CiceroTitles');
		}
		// MAIN BULLETS CONTAINER
		$("<div id='CiceroBullets' class='cicero-bullets'></div>").appendTo('#CiceroNav');
		
		// FIRST BULLET - ACTIVE BY DEFAULT
		$("<div id='Step1Bullet' class='col-sm cicero-bullet-item active'></div>").appendTo('#CiceroBullets');
		$("<span id='Bullet1' class='fa-stack fa-1x'></span>").appendTo('#Step1Bullet');
		$("<i id='OuterBullet' class='fas fa-circle fa-stack-2x'></i>").appendTo('#Bullet1');
		$("<i id='InnerBullet' class='fas fa-circle fa-stack-1x active'></i>").appendTo('#Bullet1');
		
		// NEXT BULLETS - INACTIVE BY DEFAULT
		for (var i = 2; i <= TotalSteps; ++i)
		{
			currentStepID = '#Step' + i + 'Bullet';
			currentBulletID = '#Bullet' + i;
			$("<div id='Step" + i + "Bullet' class='col-sm cicero-bullet-item'></div>").appendTo("#CiceroBullets");
			$("<span id='Bullet" + i + "' class='fa-stack fa-1x'></span>").appendTo(currentStepID);
			$("<i id='OuterBullet' class='fas fa-circle fa-stack-2x'></i>").appendTo(currentBulletID);
			$("<i id='InnerBullet' class='fas fa-circle fa-stack-1x inactive'></i>").appendTo(currentBulletID);
		}	

		// PROGRESSBAR
		$("<div id='CiceroProgressBarContainer' class='progress cicero-progressbar'></div>").appendTo('#CiceroNav');
		$("<div id='CiceroProgressBar' class='progress-bar progressed' style='width: " + BarWidth + "%'></div>").appendTo('#CiceroProgressBarContainer');
		
		// SUBTITLES
		if (settings.subtitles != null) {
			$("<div id='CiceroSubtitles' class='cicero-subtitle'></div>").appendTo('#CiceroNav');
			for (var i = 0; i <= TotalSteps - 1; ++i)
			{
				$("<div class='col-sm'>" + settings.subtitles[i] + "</div>").appendTo('#CiceroSubtitles');
			}
		}
		
		// BODY
		$("<div id='CiceroBody' class='cicero-body'></div>").appendTo('#Cicero');
        $("<div id='CiceroPrevStep'><i class='fas fa-chevron-left fa-5x'></i></div>").appendTo('#CiceroBody');
		$("<div id='CiceroBodyContent' style='margin: auto'></div>").appendTo('#CiceroBody');
		$("<div id='CiceroNextStep'><i class='fas fa-chevron-right fa-5x'></i></div>").appendTo('#CiceroBody');

		// IMPORT THE USER CONTAINER
		$('#CiceroContent').appendTo('#CiceroBodyContent').children(":not(:first-child)").addClass('invisible');

		$('#CiceroNextStep').on("click", function() {
			if (CurrentStep < TotalSteps) {
				var ciceroBar = $('#CiceroProgressBar');
				BarWidth += BarWidthPerStep;
				ciceroBar.css('width', BarWidth + '%');
				
				let stepID = '#Step' + CurrentStep + 'Bullet';
				let nextStepID = '#Step' + Number(CurrentStep + 1) + 'Bullet';

				var bulletstep = $(stepID).children();
				var innerbullet = bulletstep.children('#InnerBullet');
				
				$(innerbullet).removeClass("fa-circle");
				$(innerbullet).addClass("fa-check");
				
				setTimeout(function() { 
				$(nextStepID).addClass("active");
				}, 500);
				
				toggleStepContent(CurrentStep + 1, CurrentStep);
				CurrentStep += 1;
			}
		});
		
		$('#CiceroPrevStep').on("click", function() {
			if (CurrentStep > 1) {
				var ciceroBar = $('#CiceroProgressBar');
				BarWidth -= BarWidthPerStep;
				ciceroBar.css('width', BarWidth + '%');
				
				let stepID = '#Step' + CurrentStep + 'Bullet';
				let previousStepID = '#Step' +  Number(CurrentStep - 1) + 'Bullet';
				
				var bulletstep = $(previousStepID).children();
				var innerbullet = bulletstep.children('#InnerBullet');
				
				$(innerbullet).removeClass("fa-check");
				$(innerbullet).addClass("fa-circle");
				$(stepID).toggleClass("active");
				
				toggleStepContent(CurrentStep - 1, CurrentStep);
				CurrentStep -= 1;
			}
		});

		function toggleStepContent(showStepID, hideStepID) {
			let showElement = '#Step' + showStepID + 'Content';
			let hideElement = '#Step' + hideStepID + 'Content';
			$(showElement).removeClass("invisible");
			$(hideElement).addClass("invisible");
		}
	};
}(jQuery));

