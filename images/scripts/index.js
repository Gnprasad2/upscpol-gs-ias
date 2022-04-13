let options = {};

$('.sidenav').sidenav();


document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, options);

});


// var elements = document.getElementsByClassName("mapLinksList");



// for (var i = 0; i < elements.length; i++) {
//     elements[i].addEventListener('click', (event) =>{
//       console.log(event)

//     }, false);
// }
    



// for mobile sidenav

$(document).ready(function () {
  // $('.sidenav').sidenav();
  $('.sidenav').sidenav({

    edge: 'right', // Choose the horizontal origin
    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
  });
});

$('.sidenav li').click(() => {
  console.log('clicked');
  // $('.sidenav').sidenav('close');
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




  
