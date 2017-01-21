/**
* For fixed navbar
**/

function init() {
  window.addEventListener('scroll', function(e){
    var distanceY = window.pageYOffset || document.documentElement.scrollTop,
      shrinkOn = 125,
      header = document.getElementById('fixed-top-nav');
    if (distanceY > shrinkOn) {
      header.className = "menu-section fixed-nav";
    } else {
      header.className = "menu-section";
    }
  });
  
}
window.onload = init();
