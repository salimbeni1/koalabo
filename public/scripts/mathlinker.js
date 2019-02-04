var body = document.body;
body.style.cssText = 
    "display : flex;"
    +"flex-direction : row;"
    +"justify-content : space-between;";


function makelink(text, link) {
    var fr2 = document.createElement("a");
    fr2.href = link;
    fr2.innerHTML =  text ;
    fr2.style.cssText =
        "display : block;"
        +"height : 100px;"
        +"width : 100px;"
        +"background-color : red;"
 return fr2   
}


body.append(makelink("2fr","math2fr.html"),
           makelink("3fr","math3fr.html"),
           makelink("4fr","math4fr.html"));