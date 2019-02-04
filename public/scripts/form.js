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
addoption("Fr1_SCI");
addoption("Fr2_SCI");
addoption("Fr2_Math");
addoption("Fr3_SCI");
addoption("Fr3_Math");
addoption("Fr4_Math");

function addoption(name) {
    var op = document.createElement("option");
    op.value = name;
    op.innerHTML = name;
    select.append(op);
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


page.append(form);



