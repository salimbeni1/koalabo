var no_background = [
    "url(img/noSignal2.png)",
    "url(img/noSignalColor1.png)",
    "url(img/noSignalNoColor1.png)"
];



/**
 * 
 * @param {*} filename 
 * @param {*} mainDivID 
 */
function creazione(filename, mainDivID) {

    var data;

    var request = new XMLHttpRequest();
    request.open('GET', filename, true);

    request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        // Success!
        data = JSON.parse(request.responseText);
        console.log(data.length);


        var mainDiv = document.getElementById(mainDivID);

        mainDiv.id = "englobeur";
    
    
        for (let i = 0; i < data.length; ++i) {
            if(data[i]["visibility"] != "hidden"){
                var sousDiv = document.createElement("div");
                sousDiv.classList.add("sousDivision");
                sousDiv.classList.add("noPadding");
                sousDiv.classList.add("hoverInfo");
        
                // BG 
                
                if(data[i]["background"] == "" || data[i]["background"] == undefined){
                    
                sousDiv.style.background = no_background[Math.floor(Math.random() * Math.floor(no_background.length))]; 
                    
                }else{
                
                sousDiv.style.background = data[i]["background"];}
        
        
        
                var divEnBas = document.createElement("div");
                divEnBas.className = "divEnBas";
                sousDiv.appendChild(divEnBas);
        
        
                var titreDiv = document.createElement("div");
                titreDiv.className = "titreDiv";
        
                // TITRE
                titreDiv.innerHTML = "<br>" + data[i]["titre"];
                sousDiv.appendChild(titreDiv);
        
                partieCache2
        
                var partieCache2 = document.createElement("div");
                partieCache2.className = "partieCache2";
                sousDiv.appendChild(partieCache2);
        
                // LINKS and LINKNAMES
                if(data[i]["links"] != undefined){
                for (let links1 = 0; links1 < data[i]["links"].length; ++links1) {
                    if(data[i]["links"][links1]["visibility"] != "hidden"){
                        var linko = document.createElement("a");
                        linko.href = data[i]["links"][links1]["link"];
                        linko.innerHTML = data[i]["links"][links1]["titre"];
                        partieCache2.appendChild(linko);
                    }
                }
                }
        
        
        
                mainDiv.appendChild(sousDiv);
            }
        }
        






    } else {
        // We reached our target server, but it returned an error

    }
    };

    request.onerror = function() {
    // There was a connection error of some sort
    };

    request.send();



}
