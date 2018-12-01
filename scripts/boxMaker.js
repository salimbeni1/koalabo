var no_background = [
    "url(img/noSignal2.png)",
    "url(img/noSignalColor1.png)",
    "url(img/noSignalNoColor1.png)"
];


function creazione(fileName, mainDivID) {


    var mainDiv = document.getElementById(mainDivID);

    mainDiv.id = "englobeur";


    for (let i = 0; i < fileName.length; ++i) {
        var sousDiv = document.createElement("div");
        sousDiv.classList.add("sousDivision");
        sousDiv.classList.add("noPadding");
        sousDiv.classList.add("hoverInfo");

        // BG 
        
        if(fileName[i]["background"] == "" || fileName[i]["background"] == undefined){
            
           sousDiv.style.background = no_background[Math.floor(Math.random() * Math.floor(no_background.length))]; 
            
        }else{
        
        sousDiv.style.background = fileName[i]["background"];}



        var divEnBas = document.createElement("div");
        divEnBas.className = "divEnBas";
        sousDiv.appendChild(divEnBas);


        var titreDiv = document.createElement("div");
        titreDiv.className = "titreDiv";

        // TITRE
        titreDiv.innerHTML = "<br>" + fileName[i]["titre"];
        sousDiv.appendChild(titreDiv);

        partieCache2

        var partieCache2 = document.createElement("div");
        partieCache2.className = "partieCache2";
        sousDiv.appendChild(partieCache2);

        // LINKS and LINKNAMES
        if(fileName[i]["links"] != undefined){
        for (let links1 = 0; links1 < fileName[i]["links"].length; ++links1) {
            var linko = document.createElement("a");
            linko.href = fileName[i]["links"][links1]["link"];
            linko.innerHTML = fileName[i]["links"][links1]["titre"];;
            partieCache2.appendChild(linko);
        }
        }



        mainDiv.appendChild(sousDiv);
    }


}
