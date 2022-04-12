
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}



  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, {
        fullWidth: true,
        indicators: true
      });
    

  })


  window.onload = (event) => {
  
    // M.AutoInit();

    setTimeout(() => {
      if (window.location == window.top.location) {
        window.location = "https://app.gs-ias.com";
      }
      let domain = window.top.location.href;
      if(!domain.includes('gs-ias.com')){
        window.location = "https://app.gs-ias.com";
      }
  
    }, 600000);
  
  };
  
  
  
  
  
  document.addEventListener('contextmenu', function (ev) {
    ev.preventDefault();
    return false;
  }, false);


  
