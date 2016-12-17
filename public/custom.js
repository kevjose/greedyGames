const SPEED = 0;
const DISTANCE = 1;
var optimizeBy = SPEED;
const graph = [
    ["S", "T"],
    ["S", "X"],
    ["T", "X"],
    ["T", "V"],
    ["U", "S"],
    ["U", "T"],
    ["V", "U"],
    ["X", "V"],
    ["X", "W"],
    ["W", "V"],
    ["W", "S"]
];

const graphObj = {
  "S": {
    "T": [
      5,
      7
    ],
    "X": [
      4,
      4
    ]
  },
  "T": {
    "X": [
      3,
      1
    ],
    "V": [
      5,
      2
    ]
  },
  "U": {
    "S": [
      7,
      2
    ],
    "T": [
      4,
      6
    ]
  },
  "V": {
    "U": [
      4,
      5
    ]
  },
  "X": {
    "V": [
      2,
      1
    ],
    "W": [
      5,
      3
    ]
  },
  "W": {
    "U": [
      7,
      5
    ],
    "S": [
      8,
      3
    ]
  }
};

function callPaths(){
  var from = document.getElementById('sel1').value;
  var to  = document.getElementById('sel2').value;
  if(!from || !to) {
    alert("select source and destination!");
    return;
  }
  clearButton('btnS');
  clearButton('btnT');
  clearButton('btnU');
  clearButton('btnV');
  clearButton('btnW');
  clearButton('btnX');
  fromBtn = document.getElementById('btn'+from);
  addClass(fromBtn,'btn-warning');

  toBtn = document.getElementById('btn'+to);
  addClass(toBtn,'btn-warning');

  document.getElementById("allPathList").innerHTML = "";
  var allpaths = paths({
    graph,
    from:from,
    to:to
  });

  var allPathList = document.getElementById("allPathList");
  for(var i=0; i<allpaths.length; i++){
    var item = allpaths[i];
    var elem = document.createElement("li");
    elem.setAttribute("class","list-group-item");
    elem.innerHTML = graphJoin(item);
    allPathList.appendChild(elem);
  }
  console.log(allpaths);
  if(optimizeBy == 0)
    optimizeByText = "Speed";
  else
    optimizeByText = "Distance";
  document.getElementById("optimizeBy").innerHTML = "<em>List of paths by "+optimizeByText+"</em>";
}

function graphJoin(itemArr){
  var str = "";
  for(var i=0; i<itemArr.length; i++){

    str += itemArr[i];
    if(i == (itemArr.length-1))
      return str;
    if(itemArr[i+1] && graphObj[itemArr[i]][itemArr[i+1]] )
      var param = graphObj[itemArr[i]][itemArr[i+1]][optimizeBy];
      if(param)
        str += "-- ("+param +") -->";
  }
  return str;
}


/** add or remove classes **/
function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}
var source = 0;
var destination = 0;

function sourceDest(id,value){
  if(source == 0 || destination == 0){
    var el = document.getElementById(id);
    if(source == 0){
      addClass(el, 'btn-warning');
      document.getElementById('sel1').value = value;
      source = 1;
      return;
    }
    if(destination == 0){
      addClass(el, 'btn-warning');
      document.getElementById('sel2').value = value;
      destination = 1;
      if(source && destination)
      callPaths();
      return;
    }
  }
  if(source ==1 && destination ==1){
    clearSourceDest();
    alert("please select source and destination to view the paths");
  }

}

function clearSourceDest (){
  source =0;
  destination = 0;
  document.getElementById('sel1').value ="";
  document.getElementById('sel2').value ="";
  document.getElementById("allPathList").innerHTML = "";
  clearButton('btnS');
  clearButton('btnT');
  clearButton('btnU');
  clearButton('btnV');
  clearButton('btnW');
  clearButton('btnX');
  return ;
}

function clearButton (btnId){
 var btnId  = document.getElementById(btnId)
 removeClass(btnId,'btn-warning');
}

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
