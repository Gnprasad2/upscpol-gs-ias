

document.addEventListener('contextmenu', function (ev) {
  ev.preventDefault();
  return false;
}, false);



window.onload = (event) => {

 
  if(window.location == window.top.location){
    document.getElementById("gsias2").classList.remove('noDisplay');
    document.getElementById("gsias1").classList.remove('noDisplay');
  }

  M.AutoInit();

  setTimeout(() => {
    if (window.location == window.top.location) {
      //    //  window.location = "https://app.gs-ias.com/#qr";
    }
           

 }, 300000);

 


  var slider = document.createElement("input");
  slider.type = 'range';
      slider.value = 25;
  slider.min = 15;
  slider.max = 30;   
  slider.step = 0.1;
  slider.id = "slider";


  slider.oninput = function () {
    let body = document.getElementsByTagName('body')[0];
    let html = document.getElementsByTagName('html')[0];
    body.style.fontSize = this.value + 'px';
    html.style.fontSize = this.value + 'px';
    
    
  }

  // Get a reference to the parent node
  
  let parentDiv = document.getElementsByClassName("top_nav")[0].parentNode;
  // let parentDiv = document.getElementById("google_translate_element").parentNode

  // Begin test case [ 1 ] : Existing childElement (all works correctly)
  let sp2 =  document.getElementsByClassName("top_nav")[0] || "undefined";
  parentDiv.insertBefore(slider, sp2);


 

}






