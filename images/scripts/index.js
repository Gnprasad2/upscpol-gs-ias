let options = {};
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, options);
});







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




  
