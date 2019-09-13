

// get the html page to insert element into it
var page = document.body;





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
var form = document.getElementById("createDiv");
//form.action = "http://koalabo.eu:80/upload";
form.action = "/upload";
form.method = "POST";
form.enctype = "multipart/form-data";


// class name selector
var select = document.getElementById("classNameSelector");
addoption("Fr1_SCI", select , "new");
addoption("Fr2_SCI",select, "new");
addoption("Fr2_Math",select, "new");
addoption("Fr3_SCI",select, "new");
addoption("Fr3_Math",select, "new");
addoption("Fr1_Math",select, "new");



//links
var nblinks = 0;
var newlink = document.getElementById("buttonNewLink");
newlink.onclick = () => {

    console.log(nblinks);
    if(nblinks >= 6){ // pas plus de 6 lien par bloc
        newlink.innerHTML = "! MAX 6 LIENS !";
    }
    else{

    var input_titre_label = document.createElement("label");
    input_titre_label.innerHTML = "titre : ";
    var input_titre = document.createElement("input");
    input_titre.name = "link"+nblinks;
    input_titre.type = "text"; 

    var input_x_label = document.createElement("label");
    input_x_label.innerHTML = " importer : ";
    var input_x = document.createElement("input");
    input_x.name = "link"+nblinks;
    nblinks += 1;
    input_x.type = "file";

    var groupeur = document.createElement("div");
    groupeur.append(input_titre_label,input_titre,input_x_label,input_x);
    form.insertBefore(groupeur,document.getElementById("submit1")); 
    }
};



///////////////////////////////////////////////////////////////////////////////////////////////
//           UPDATE EXISTING COURSE
///////////////////////////////////////////////////////////////////////////////////////////////


/**
 * form to update existing courses
 */
var formMod = document.getElementById("updateDiv");
//formMod.action = "http://koalabo.eu:80/uploadMod";
formMod.action = "/uploadMod";
formMod.method = "POST";
formMod.enctype = "multipart/form-data";


// selector for the class name
var select2 = document.getElementById("classNameSelectorUpdate");
addoption("Fr1_SCI", select2, "renew");
addoption("Fr2_SCI",select2, "renew");
addoption("Fr2_Math",select2, "renew");
addoption("Fr3_SCI",select2, "renew");
addoption("Fr3_Math",select2, "renew");
addoption("Fr1_Math",select2, "renew");

// selector for the module of the course
var select3 = document.getElementById("courseNameSelector");
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


    // change name of the bloc
    var nameBlocInputLabel = document.createElement("label");
    nameBlocInputLabel.innerHTML = " changer le nom du bloc : ";
    nameBlocInputLabel.className = "deletable4";
    var nameBlocInput = document.createElement("input");
    nameBlocInput.type = "text";
    nameBlocInput.value = moduleSelected.titre;
    nameBlocInput.className = "deletable4";
    nameBlocInput.name = "newTitre";
    
    formMod.insertBefore(nameBlocInput,document.getElementById("submit2"));
    formMod.insertBefore(nameBlocInputLabel,nameBlocInput);

    // image to change the path
    var imageInputLabel = document.createElement("label");
    imageInputLabel.innerHTML = " image : ";
    imageInputLabel.className = "deletable4";
    var imageinput = document.createElement("input");
    imageinput.name = "image";
    imageinput.type = "text";
    imageinput.className = "deletable4";
    imageinput.value = moduleSelected.background;
    
    var imageFileInput = document.createElement("input");
    imageFileInput.type = "file";
    imageFileInput.name = "imageFile";
    imageFileInput.className = "deletable4";

    var tempImageDiv = document.createElement("div");
    tempImageDiv.append(imageInputLabel,imageinput,imageFileInput);
    formMod.insertBefore(tempImageDiv,document.getElementById("submit2"));
    





    // input to hide or not the module
    var inputVisibledivLabel = document.createElement("label");
    inputVisibledivLabel.innerHTML = " cacher le bloc : ";
    inputVisibledivLabel.className = "deletable4";
    var inputVisiblediv = document.createElement("select");
    inputVisiblediv.className = "deletable4";
    inputVisiblediv.name = "visibilitydiv";
    addoption("visible",inputVisiblediv,"vc",moduleSelected.visibility == "visible");
    addoption("hidden",inputVisiblediv,"vc", moduleSelected.visibility == "hidden");
    
    // delete button
    var deleteButtonLabel = document.createElement("label");
    deleteButtonLabel.innerHTML = " supprimer le bloc : ";
    deleteButtonLabel.className = "deletable4";
    var deleteButton = document.createElement("button");
    deleteButton.name = "supprimer";
    deleteButton.type = "button";
    deleteButton.innerHTML = "SUPPRIMER";
    deleteButton.className = "deletable4";

    // hidden input to delete
    var hiddenDelete = document.createElement("input");
    hiddenDelete.name = "supprimerBloc";
    hiddenDelete.value = "NO";
    hiddenDelete.type = "text";
    hiddenDelete.style.display = "none";
    hiddenDelete.className = "deletable4";

    formMod.append(hiddenDelete);

    deleteButton.onclick = () => {
        
        if(hiddenDelete.value == "NO") {
            hiddenDelete.value = "YES";
            formMod.style.backgroundColor = "red"; 
        }else{
            hiddenDelete.value = "NO";
            formMod.style.backgroundColor = "rgba(55, 209, 89, 0.746)"; 
        }
          
    }


    var grouppeur = document.createElement("div");
    grouppeur.append(inputVisibledivLabel,inputVisiblediv,deleteButtonLabel,deleteButton) 
    
    formMod.insertBefore(grouppeur,document.getElementById("submit2"));
    

    


    // display all the chapters of that module
    temp.find(el => el.titre == select3.value).links.forEach((el, index) => {

        // div to group a single chapter info
        var eng = document.createElement("div");
        eng.className = "deletable4 singleChapt";

        if(el.visibility == "hidden"){
            eng.style.backgroundColor = "rgba(41, 41, 41, 0.562)";
        }else{
            eng.style.backgroundColor = "rgba(41, 41, 41, 0.062)";
        }

        // title of the chapter
        var inputTitreLabel = document.createElement("label");
        inputTitreLabel.innerHTML = " titre : ";
        var inputTitre = document.createElement("input");
        inputTitre.name = "titreli";
        inputTitre.type = "text";
        inputTitre.value = el.titre;

        // path of the link of that chapter
        var inputPathLabel = document.createElement("label");
        inputPathLabel.innerHTML = " lien : ";
        var inputPath = document.createElement("input");
        inputPath.name = "pathli";
        inputPath.type = "text";
        inputPath.value = el.link;

        // file to change the link of that chapter
        var inputFileLabel = document.createElement("label");
        inputFileLabel.innerHTML = " importer : ";
        var inputFile = document.createElement("input");
        inputFile.name = index;
        inputFile.type = "file";

        // hide or not the chapter
        var inputVisible = document.createElement("select");
        inputVisible.name = "visibility";
        addoption("visible",inputVisible,"vc",el.visibility == "visible");
        addoption("hidden",inputVisible,"vc", el.visibility == "hidden");

        inputVisible.onchange = () => {
            if(inputVisible.value == "hidden"){
                eng.style.backgroundColor = "rgba(41, 41, 41, 0.562)";
            }else{
                eng.style.backgroundColor = "rgba(41, 41, 41, 0.062)";
            }
        };


        eng.append(inputTitreLabel,inputTitre,inputPathLabel,inputPath,inputFileLabel,inputFile,inputVisible);
        formMod.insertBefore(eng,document.getElementById("submit2"));

    });

}





///////////////////////////////////////////////////////////////////////////////////////////////
//     END
///////////////////////////////////////////////////////////////////////////////////////////////

// insert everything to the page
page.append(form, formMod);



