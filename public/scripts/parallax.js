
var fr1 = window.document.getElementById("1fr");

fr1.style.height = "200px";
fr1.style.backgroundImage = "url(img/pharmacie.jpg)";
fr1.style.backgroundPositionY = "50%";
fr1.style.backgroundSize = "cover";



var fr2 = document.getElementById("2fr");

fr2.style.height = "200px";
fr2.style.backgroundImage = "url(img/insect.jpg)";
fr2.style.backgroundPositionY = "50%";
fr2.style.backgroundSize = "cover";

var fr3 = document.getElementById("3fr");

fr3.style.height = "200px";
fr3.style.backgroundImage = "url(img/tuyaux.jpg)";
fr3.style.backgroundPositionY = "50%";
fr3.style.backgroundSize = "cover";


fr1.style.marginBottom = "100px";
fr2.style.marginBottom = "100px";
fr3.style.marginBottom = "100px";
fr1.style.position = "relative"
fr2.style.position = "relative"
fr3.style.position = "relative"


window.onscroll = function() {
    
    //console.log(scrollY);
    fr1.style.backgroundPositionY = "calc( 50% + "+scrollY*0.2+"px)";
    fr2.style.backgroundPositionY = "calc( 50% + "+scrollY*0.5+"px)";
    fr3.style.backgroundPositionY = "calc( 50% + "+scrollY*0.35+"px)";

};





