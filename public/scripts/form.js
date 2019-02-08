var page = document.body;
page.style.cssText = 
      "background-color : white;"
     +"margin : 0;"
     +"height : 100%;"
     +"display : flex;";

var form = document.createElement("form");
form.style.cssText = 
        "display : flex;"
        +"flex-direction : column;";
form.action = "http://localhost:3000/upload";
form.method = "POST";
form.enctype = "multipart/form-data";

var select = document.createElement("select");
select.name = "classname";
select.innerHTML = " <option disabled selected value> -- select an option -- </option>";
addoption("Fr1_SCI", select , "new");
addoption("Fr2_SCI",select, "new");
addoption("Fr2_Math",select, "new");
addoption("Fr3_SCI",select, "new");
addoption("Fr3_Math",select, "new");
addoption("Fr4_Math",select, "new");

function addoption(name, selecteur ,classID) {
    var op = document.createElement("option");
    op.value = name;
    op.className = classID;
    op.innerHTML = name;
    selecteur.append(op);
}

var input_1 = document.createElement("input");
input_1.name = "titre";
input_1.type = "text";

var input_2 = document.createElement("input");
input_2.name = "background";
input_2.type = "file";

//links
var nblinks = 0;

var newlink = document.createElement("button");
newlink.innerHTML = "NEW LINK";
newlink.type = "button"; 
newlink.onclick = () => {
    var input_titre = document.createElement("input");
    input_titre.name = "link"+nblinks;
    input_titre.type = "text"; 
    var input_x = document.createElement("input");
    input_x.name = "link"+nblinks;
    nblinks += 1;
    input_x.type = "file";
    var groupeur = document.createElement("div");
    groupeur.append(input_titre,input_x);
    form.insertBefore(groupeur,submit); 
};


var submit = document.createElement("button");
submit.type = "submit";
submit.innerHTML = "SUBMIT"

form.append(select,input_1,input_2, newlink,submit);


var formMod = document.createElement("form");
formMod.style.cssText = 
        "display : flex;"
        +"flex-direction : column;";
formMod.action = "http://localhost:3000/uploadMod";
formMod.method = "POST";
formMod.enctype = "multipart/form-data";


var select2 = document.createElement("select");
select2.name = "classname";
select2.innerHTML = " <option disabled selected value> -- select an option -- </option>";
addoption("Fr1_SCI", select2, "renew");
addoption("Fr2_SCI",select2, "renew");
addoption("Fr2_Math",select2, "renew");
addoption("Fr3_SCI",select2, "renew");
addoption("Fr3_Math",select2, "renew");
addoption("Fr4_Math",select2, "renew");

var select3 = document.createElement("select");
select3.innerHTML = " <option disabled selected value> -- select an option -- </option>";
select3.name = "coursename";

var temp;

select2.onchange = () => {

    /// get all the JSON files of the class courses ///////

    var request = new XMLHttpRequest();
    request.open('GET', '/listeCours/'+select2.value+".JSON", true);

    request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        temp = data;
        console.log(data);
        document.querySelectorAll('.deletable3').forEach(option => option.remove());

        data.forEach(el => {
            addoption(el["titre"],select3,"deletable3");
        });

    } else {
        // We reached our target server, but it returned an error
        console.log("errorino");

    }
    };

    request.onerror = function() {
    // There was a connection error of some sort
    };

    request.send();


    ///////////////////////////////////////////////////////

}


select3.onchange = () => {

    document.querySelectorAll('.deletable4').forEach(el => el.remove());

    var imageinput = document.createElement("input");
    imageinput.name = "image";
    imageinput.type = "text";
    imageinput.className = "deletable4";
    console.log(temp.find(el => el.titre == select3.value));
    imageinput.value = temp.find(el => el.titre == select3.value)["background"];
    formMod.insertBefore(imageinput,submit2);
    

    // display all the links of that course

    temp.find(el => el.titre == select3.value).links.forEach(el => {

        var eng = document.createElement("div");
        eng.className = "deletable4";

        var inputTitre = document.createElement("input");
        inputTitre.name = "titreli";
        inputTitre.type = "text";
        inputTitre.value = el.titre;

        var inputPath = document.createElement("input");
        inputPath.name = "pathli";
        inputPath.type = "text";
        inputPath.value = el.link;

        var inputFile = document.createElement("input");
        inputFile.name = "fileli";
        inputFile.type = "file";


        eng.append(inputTitre,inputPath,inputFile);
        formMod.insertBefore(eng,submit2);

    });

}





var submit2 = document.createElement("button");
submit2.type = "submit";
submit2.innerHTML = "SUBMIT"


formMod.append(select2,select3,submit2);


page.append(form, formMod);



