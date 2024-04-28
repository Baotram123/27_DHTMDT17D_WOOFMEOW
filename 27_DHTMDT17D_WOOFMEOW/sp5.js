var slideIndex = 0;
showSlidesnb1();

function plusSlidesnb1(n) {
  slideIndex += n;
  showSlidesnb1();
}

function currentSlidenb1(n) {
  slideIndex = n - 1;
  showSlidesnb1();
}

function showSlidesnb1() {
  var i;
  var slides = document.getElementsByClassName("mySlidesnb1");
  var dots = document.getElementsByClassName("dot");
  
  // Make sure slideIndex is within the correct range
  if (slideIndex >= slides.length - 3) {
    slideIndex = 0;
  } else if (slideIndex < 0) {
    slideIndex = slides.length - 4;
  }
  
  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    if(dots[i]) dots[i].className = dots[i].className.replace(" active", "");
  }
  
  // Show four slides
  for (i = 0; i < 4; i++) {
    slides[slideIndex + i].style.display = "block";
    if(dots[slideIndex + i]) dots[slideIndex + i].className += " active";
  }
}