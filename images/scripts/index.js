let options = {};
const startingColourofButtons = "white-text";


const imagesHis = {
  'ancient India 500BC': './history/1. ancient India 500BC.jpg',
  'pre-partition map of India before 1947': './history/2. pre-partition map of India before 1947.jpg',
  'India struggle for Independence 1857-1947': './history/3. India struggle for Independence 1857-1947.jpg',
  'British Empire': './history/British Empire.jpg',
  'Mughal Empire':'./history/Mughal Empire.jpg',
  'Chalukya Dynasty': './history/Chalukya Dynasty.jpg',
  'Chera Kingdom 5th Century BCE': './history/Chera Kingdom 5th Century BCE.jpg',
  'Chola Empire 848-1279 AD': './history/Chola Empire 848-1279 AD.jpg',
  'Delhi in 1857': './history/Delhi in 1857.jpg',
  'Empire of Shersha Suri 1540-1545':'./history/Empire of Shersha Suri 1540-1545.jpg',
  'India 1956': './history/India 1956.jpg',
  'India Dandi March': './history/India Dandi March.jpg',
  'Kalinga 265 BCE':'./history/Kalinga 265 BCE.jpg',
  'Khilji Dynasty 1290-1320': './history/Khilji Dynasty 1290-1320.jpg',
  'Kuru Dynasty Iron Age': './history/Kuru Dynasty Iron Age.jpg',
  'Lodi Dynasty 1321-1398': './history/Lodi Dynasty 1321-1398.jpg',
  'Mahajanapadas': './history/Mahajanapadas.jpg',
  'Maurya 265 BCE': './history/Maurya 265 BCE.jpg',
  'Mongol Empire 1206-1368': './history/Mongol Empire 1206-1368.jpg',
  'Pallava Territories 645 AD': './history/Pallava Territories 645 AD.jpg',
  'Pandyan Empire Before 500 BCE - 1250 AD': './history/Pandyan Empire Before 500 BCE - 1250 AD.jpg',
  'Sikh Emire 1799-1849':'./history/Sikh Emire 1799-1849.jpg',
  'Rashtrakuta Dynasty 753-983 CE': './history/Rashtrakuta Dynasty 753-983 CE.jpg',
  'Slave Dynasty 1206-1290': './history/Slave Dynasty 1206-1290.jpg',
  'Stone Age':'./history/Stone Age.jpg',
  'Tuglaq Dynasty 1321-1398': './history/Tuglaq Dynasty 1321-1398.jpg',
  'Vijayanagara Empire 1446-1520': './history/Vijayanagara Empire 1446-1520.jpg',
  'outline map of India': './history/outline map of India.jpg'
}





const imagesGeo = {
  'political map of India': './India/1. political map of india-map1.jpg',
  'physical map': './India/1a. physical-map-india2.jpg',
  'topography': './India/1c. topography3.jpg',
  'hill regions and rivers': './India/21. hill regions and rivers.jpg',
  'western Himalayas': './India/1d. western himalayas4.gif',
  'eastern Himalayas': './India/1e. eastern himalayas5.gif',
  'major rivers': './India/2. major rivers6.gif',
  'major rivers 2020': './India/2a. major rivers7.jpg',
  'population': './India/3. population8.jpg',
  'population density': './India/3a. population density9.jpg',
  'highest population states': './India/3b highest population states10.jpg',
  'climatic regions': './India/4. climatic regions11.jpg',
  'mean monthly temp jan': './India/4a2. mean monthly temperatures jan13.gif',
  'mean monthly temp july': './India/4a1. mean monthly temp july12.gif',
  'south west monsoon': './India/5. southwest monsoon14.gif',
  'pressure winds jan': './India/5a3. pressure winds jan17.gif',
  'pressure and surface winds july': './India/5b. pressure and surface winds july18.gif',
  'seasonal rainfall june-sep': './India/5c. seasonal rainfall june-sep19.gif',
  'annual rainfall': './India/5d. annual rainfall20.gif',
  'average annual rainfall': './India/5e average annual rain fall21.png',
  'variability of annual rainfall': './India/5e. variability of annual rain fall22.gif',
  'climatic regions': './India/5f. climatic regions23.gif',
  'cyclone hazard zones': './India/5g. cyclone hazard zones24.gif',
  'drought prone areas': './India/5h. drought prone areas25.gif',
  'natural vegetation': './India/6. natural vegetation26.gif',
  'biosphere resrves': './India/7. biosphere reserves27.gif',
  'major soil types': './India/8. major soil types28.gif',
  'major soils 2020': './India/8a major soils29.jpg',
  'water drainage': './India/9. water drainage30.png',
  'ganga and its tributaries': './India/9a ganga and its tributaries31.gif',
  'river basin': './India/9a river basin32.gif',
  'flood hazard zone': './India/9b. flood hazard zone33.gif',
  'earthquake hazard zone': './India/10. earthquake hazard zones34.gif',
  'water ways': './India/11. waterways35.png',
  'rice': './India/13. rice40.gif',
  'wheat': './India/13a wheat41.gif',
  'cotton and jute': './India/13b cotton and jute42.gif',
  'sugarcane': './India/13c sugarcane43.gif',
  'tea and coffee': './India/13d tea and coffee44.gif',
  'minerals': './India/14 minerals45.jpg',
  'ferrous': './India/14a ferrous46.gif',
  'non-ferrous': './India/14a1 non-ferrous47.gif',
  'energy sources': './India/15 energy sources48.gif',
  'major industrial regions': './India/15a major industrial regions49.gif',
  'oil refiniries': './India/15a oil refiniries50.gif',
  'iron and steel': './India/15b1 iron and steel51.png',
  'cotton and textile': './India/15c cotton and textile52.gif',
  'textiles': './India/15c textile53.jpg',
  'chemical industries': './India/15c2 chemical industries54.jpg',
  'software technology parks': './India/15d software technology parks55.gif',
  'major ports': './India/17a major ports57.jpg',
  'air routes': './India/17a2 air routes.gif',
  'administrative divisions old': './India/17b. administrative divisions old.gif',
  'India outline map': './India/20. india-outline-map-big56.gif',


};

function imageRefGenerator(listId="", imagesObj={}, functionName) {



  for (let key in imagesObj) {
    // console.log(key);

    let ul = document.getElementById(listId);
    // let listElement = document.createElement("li");


    // listElement.innerHTML = `><a href="#!>${key}</a>`;
    var listElement = document.createElement("BUTTON");
    listElement.innerHTML = `<li class="questionButtonList"><b>${key}</b></li>`;
    listElement.value = `${key}`;


    // console.log(listElement);
    ul.appendChild(listElement);
    listElement.classList.add('btn');
    listElement.classList.add('waves-effect');
    listElement.classList.add('waves-light');
    listElement.classList.add('sidenav-close');
    listElement.classList.add('circle');
    // listElement.classList.add("qbtn");
    listElement.classList.add(startingColourofButtons);
    listElement.classList.add('cyan');
    listElement.addEventListener("click", functionName);


  }



}

function hisRender() {

  //  console.log(this.value) ;
  //  console.log(imagesGeo[this.value]);
  if(document.getElementById("imageText").classList.contains('text-block-color')) {
    document.getElementById("imageText").classList.remove('text-block-color');
  }
  if(!document.getElementById("imageText").classList.contains('text-block-his')) {
    document.getElementById("imageText").classList.add('text-block-his');
  }



  let href = imagesHis[this.value];
  // console.log(href);
  document.getElementById("imageP").src = href;

  document.getElementById('imageText').textContent = this.value;


  //  document.getElementById('imageP').src = imagesGeo[this.value];


}


function geoRender() {

  //  console.log(this.value) ;
  //  console.log(imagesGeo[this.value]);
  if(document.getElementById("imageText").classList.contains('text-block-his')) {
    document.getElementById("imageText").classList.remove('text-block-his');
  }
  if(!document.getElementById("imageText").classList.contains('text-block-color')) {
    document.getElementById("imageText").classList.add('text-block-color');
  }

  let href = imagesGeo[this.value];
  // console.log(href);
  document.getElementById("imageP").src = href;

  document.getElementById('imageText').textContent = this.value;
  //  document.getElementById('imageP').src = imagesGeo[this.value];


}


function imageclick() {
  console.log('image clicked');
}



document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, options);
  var elemsC = document.querySelectorAll('.collapsible');
  var instancesC = M.Collapsible.init(elemsC, options);
  imageRefGenerator("historyUl", imagesHis, hisRender);
  imageRefGenerator("geographyUl", imagesGeo, geoRender);
  

});






// for mobile sidenav

$(document).ready(function () {
  // $('.sidenav').sidenav();
  $('.sidenav').sidenav({

    menuWidth: 300,

    edge: 'right', // Choose the horizontal origin
    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor

  });
});










window.onload = (event) => {


  // M.AutoInit();

  setTimeout(() => {
    if (window.location == window.top.location) {
      window.location = "https://app.gs-ias.com";
    }
   
  }, 1000);

};





document.addEventListener('contextmenu', function (ev) {
  ev.preventDefault();
  return false;
}, false);






