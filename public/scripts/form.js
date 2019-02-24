

// get the html page to insert element into it
var page = document.body;
page.style.cssText = 
      "background-color : white;"
     +"margin : 0;"
     +"height : 100%;"
     +"display : flex;";




/**
 * @desc add an option to a given selector
 * @param {*} name option value and text
 * @param {*} selecteur the selector for the new option
 * @param {*} classID class name of the option
 * @param {*} optionalSelected true :  to make the option the selected one
 */
function addoption(name, selecteur, classID, optionalSelected) {
    var op = document.createElement("option");
    if (optionalSelected) op.selected = "selected";
    op.value = name;
    op.className = classID;
    op.innerHTML = name;
    selecteur.append(op);
}






///////////////////////////////////////////////////////////////////////////////////////////////
//         CREATE NEW COURSE
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * form to create an entire new course
 */
var form = document.createElement("form");
form.style.cssText = 
        "display : flex;"
        +"flex-direction : column;";
form.action = "http://localhost:3000/upload";
form.method = "POST";
form.enctype = "multipart/form-data";


// class name selector
var select = document.createElement("select");
select.name = "classname";
select.innerHTML = " <option disabled selected value> -- select an option -- </option>";
addoption("Fr1_SCI", select , "new");
addoption("Fr2_SCI",select, "new");
addoption("Fr2_Math",select, "new");
addoption("Fr3_SCI",select, "new");
addoption("Fr3_Math",select, "new");
addoption("Fr4_Math",select, "new");

// title of the new course
var input_1 = document.createElement("input");
input_1.name = "titre";
input_1.type = "text";

// get a file for image bg of the new course
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



// submit of the form
var submit = document.createElement("button");
submit.type = "submit";
submit.innerHTML = "SUBMIT"

form.append(select,input_1,input_2, newlink,submit);








///////////////////////////////////////////////////////////////////////////////////////////////
//           UPDATE EXISTING COURSE
///////////////////////////////////////////////////////////////////////////////////////////////


/**
 * form to update existing courses
 */
var formMod = document.createElement("form");
formMod.style.cssText = 
        "display : flex;"
        +"flex-direction : column;";
formMod.action = "http://localhost:3000/uploadMod";
formMod.method = "POST";
formMod.enctype = "multipart/form-data";


// selector for the class name
var select2 = document.createElement("select");
select2.name = "classname";
select2.innerHTML = " <option disabled selected value> -- select an option -- </option>";
addoption("Fr1_SCI", select2, "renew");
addoption("Fr2_SCI",select2, "renew");
addoption("Fr2_Math",select2, "renew");
addoption("Fr3_SCI",select2, "renew");
addoption("Fr3_Math",select2, "renew");
addoption("Fr4_Math",select2, "renew");

// selector for the module of the course
var select3 = document.createElement("select");
select3.innerHTML = " <option disabled selected value> -- select an option -- </option>";
select3.name = "coursename";


/** 
 * the value of the json file requested 
 * (ex : FR1_SCI.JSON formated)
 */
var temp;

// get all the JSON files of the class courses
select2.onchange = () => {
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
}


// display all the data of a selected module
select3.onchange = () => {

    // remove all the "div" of the previously selected module
    document.querySelectorAll('.deletable4').forEach(el => el.remove());

    // the selected module
    var moduleSelected = temp.find(el => el.titre == select3.value);

    // image to change the path
    var imageinput = document.createElement("input");
    imageinput.name = "image";
    imageinput.type = "text";
    imageinput.className = "deletable4";
    imageinput.value = moduleSelected.background;
    formMod.insertBefore(imageinput,submit2);

    // input to hide or not the module
    var inputVisiblediv = document.createElement("select");
    inputVisiblediv.className = "deletable4";
    inputVisiblediv.name = "visibilitydiv";
    addoption("visible",inputVisiblediv,"vc",moduleSelected.visibility == "visible");
    addoption("hidden",inputVisiblediv,"vc", moduleSelected.visibility == "hidden");
    formMod.insertBefore(inputVisiblediv,submit2);

    // display all the chapters of that module
    temp.find(el => el.titre == select3.value).links.forEach((el, index) => {

        // div to group a single chapter info
        var eng = document.createElement("div");
        eng.className = "deletable4";

        // title of the chapter
        var inputTitre = document.createElement("input");
        inputTitre.name = "titreli";
        inputTitre.type = "text";
        inputTitre.value = el.titre;

        // path of the link of that chapter
        var inputPath = document.createElement("input");
        inputPath.name = "pathli";
        inputPath.type = "text";
        inputPath.value = el.link;

        // file to change the link of that chapter
        var inputFile = document.createElement("input");
        inputFile.name = index;
        inputFile.type = "file";

        // hide or not the chapter
        var inputVisible = document.createElement("select");
        inputVisible.name = "visibility";
        addoption("visible",inputVisible,"vc",el.visibility == "visible");
        addoption("hidden",inputVisible,"vc", el.visibility == "hidden");


        eng.append(inputTitre,inputPath,inputFile,inputVisible);
        formMod.insertBefore(eng,submit2);

    });

}

// the submit for the form to update courses
var submit2 = document.createElement("button");
submit2.type = "submit";
submit2.innerHTML = "SUBMIT";

formMod.append(select2,select3,submit2);




///////////////////////////////////////////////////////////////////////////////////////////////
//     END
///////////////////////////////////////////////////////////////////////////////////////////////

// insert everything to the page
page.append(form, formMod);



