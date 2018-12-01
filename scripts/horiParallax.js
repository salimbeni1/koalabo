var page = document.body;
page.style.cssText = 
      "background-color : black;"
     +"margin : 0;"
     +"height : 100%;"
     +"display : flex;";


var wh = window.innerHeight;
var ww = window.innerWidth;
var pt = wh/2;
var pl = ww/4;

function createSep(color="white") {
    var sep1 = document.createElement("div");
    sep1.style.cssText = 
         "width :"+ww/2+"px;"
        +"height : "+wh+"px;"
        +"background-color : "+color+";"
        +"position : relative;"
        +"overflow : hidden;";
    return sep1;
}

function createMovable(color="white",h=200,w=200,t=pt,l=pl) {
    var newDiv = document.createElement("div");
    newDiv.style.cssText = 
        "position : absolute;"
        +"top : "+t+"px;"
        +"left : "+l+"px;"
        +"background-color : "+color+";"
        +"height : "+h+"px;"
        +"width : "+w+"px;s";
    return newDiv;
}

var test = createMovable("red",100,100,0,0);
var test2 = createMovable("blue");
var test3 = createMovable("yellow");
var sep1 = createSep("green");
var sep2 = createSep("violet");
var tes2t = createMovable("red");
var test22 = createMovable("blue");
var test23 = createMovable("yellow");



window.addEventListener("mousemove", function(e) {
    
    test.style.top = ""+(pt+0.1*(e.clientY-pt))+"px";
    test.style.left = ""+(pl+0.1*(e.clientX-pl))+"px";
    
    test2.style.top = ""+(pt+0.12*(e.clientY-pt))+"px";
    test2.style.left = ""+(pl+0.12*(e.clientX-pl))+"px";
    
    test3.style.top = ""+(pt+0.14*(e.clientY-pt))+"px";
    test3.style.left = ""+(pl+0.14*(e.clientX-pl))+"px";
    
    
    tes2t.style.top = ""+(pt+0.1*(e.clientY-pt))+"px";
    tes2t.style.left = ""+(pl+0.1*(e.clientX-pl))+"px";
    
    test22.style.top = ""+(pt+0.12*(e.clientY-pt))+"px";
    test22.style.left = ""+(pl+0.12*(e.clientX-pl))+"px";
    
    test23.style.top = ""+(pt+0.14*(e.clientY-pt))+"px";
    test23.style.left = ""+(pl+0.14*(e.clientX-pl))+"px";
})




page.append(sep1,sep2);
sep1.append(test,test2,test3);
sep2.append(tes2t,test22,test23);


