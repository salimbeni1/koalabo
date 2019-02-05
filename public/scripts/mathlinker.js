var body = document.body;
body.style.cssText = 
    "background-color : #D5A64E";

var eng = document.createElement("div")
eng.style.cssText = 
    "display : flex;"
    +"flex-direction : row;"
    +"justify-content : space-around;"
    +"background-color : trasparent";

function makelink(text, link) {
    var fr2 = document.createElement("a");
    fr2.href = link;
    fr2.innerHTML =  text ;
    fr2.style.cssText =
        "display : block;"
        +"height : auto;"
        +"width : auto;"
        +"background-color : #12662F;"
        +"border-radius : 10px;"
        +"text-align : center;"
        +"font-size : 100px;"
        +"padding : 20px;"
        +"border-style: solid;"
        +"color : black;"
        +"border-width: 5px;"
        +"margin-top : 10%;"
 return fr2   
}


eng.append(makelink("2fr","math2fr.html"),
           makelink("3fr","math3fr.html"),
           makelink("4fr","math4fr.html"));

body.append(eng);