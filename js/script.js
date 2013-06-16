slidePrefix            = "slide-";
slideControlPrefix     = "slide-control-";
slideHighlightClass    = "highlight";
slidesContainerID      = "slides";
slidesControlsID       = "slide-controls";
slideDelay             = 3000;
slideAnimationInterval = 20;
slideTransitionSteps   = 10;

setUpSlideShow();

function setUpSlideShow()
{
    // collect the slides and the controls
    slidesCollection = document.getElementById(slidesContainerID).children;
    slidesControllersCollection = document.getElementById(slidesControlsID).children;
 
    totalSlides = slidesCollection.length;
 
    if (totalSlides < 2) return;
 
    //go through all slides
    for (var i=0; i < slidesCollection.length; i++)
    {
        // give IDs to slides and controls
        slidesCollection[i].id = slidePrefix+(i+1);
        slidesControllersCollection[i].id = slideControlPrefix+(i+1);
 
        // attach onclick handlers to controls, highlight the first control
        slidesControllersCollection[i].onclick = function(){clickSlide(this);};
 
        //hide all slides except the first
        if (i > 0)
            slidesCollection[i].style.display = "none";
        else
            slidesControllersCollection[i].className = slideHighlightClass;
    }
 
    // initialize vars
    slideTransStep= 0;
    transTimeout  = 0;
    crtSlideIndex = 1;
 
    // show the next slide
    showSlide(2);
}

function showSlide(slideNo, immediate)
{
	// don't do any action while a transition is in progress
    if (slideTransStep != 0 || slideNo == crtSlideIndex)
        return;
 
    clearTimeout(transTimeout);
 
	// get references to the current slide and to the one to be shown next
    nextSlideIndex = slideNo;
    crtSlide = document.getElementById(slidePrefix + crtSlideIndex);
    nextSlide = document.getElementById(slidePrefix + nextSlideIndex);
    slideTransStep = 0;
 
    // start the transition now upon request or after a delay (default)
    if (immediate == true)
        transSlide();
    else
        transTimeout = setTimeout("transSlide()", slideDelay);
}

function clickSlide(control)
{
    showSlide(Number(control.id.substr(control.id.lastIndexOf("-")+1)),true);
}


 
function transSlide(){

    // complete
    crtSlide.style.display = "none";

    // make sure the next slide is visible (albeit transparent)
    nextSlide.style.display = "block";
 
    transComplete();
 
}   

function transComplete()
{
    slideTransStep = 0;
    crtSlideIndex = nextSlideIndex;
 
    // for IE filters, removing filters reenables cleartype
    if (nextSlide.style.removeAttribute)
        nextSlide.style.removeAttribute("filter");
 
    // show next slide
    showSlide((crtSlideIndex >= totalSlides) ? 1 : crtSlideIndex + 1);
 
    //unhighlight all controls
      for (var i=0; i < slidesControllersCollection.length; i++)
        slidesControllersCollection[i].className = "";
 
    // highlight the control for the next slide
    document.getElementById("slide-control-" + crtSlideIndex).className = slideHighlightClass;
}

/****/
var isOpenVar = document.getElementsByClassName('is-open');
var currentHour = new Date().getHours(),
    closingHour = 20,
    openingHour = 8,
    day = new Date().getDay();

isOpen();

function isOpen(){

	switch(day){
    	case 0: // Sunday
    		closingHour = 18;
            openingHour = 10;
    		break;
    	case 5: // Friday
    		closingHour = 22;
    		break;
    	case 6: // Saturday
    		closingHour = 22;
    		break;
  	}

  	if(currentHour >= closingHour || openingHour >= currentHour){
		isOpenVar[0].innerHTML = "Sorry, We're Closed";
		isOpenVar[0].setAttribute("data-state", "closed");
	}else{
		isOpenVar[0].innerHTML = "We're still open!";
		isOpenVar[0].setAttribute("data-state", "open");
	}
}