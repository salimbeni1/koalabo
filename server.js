var express = require('express');
var multer = require('multer');
var vhost = require('vhost');
var bodyParser = require('body-parser');
var fs = require('fs');

// initialise express koalaboApp
var koalaboApp = express();

koalaboApp.use(express.json());
koalaboApp.use(bodyParser.json());



// make the folder public the main site
koalaboApp.use(express.static("public"));



var masterApp = express();
var fantaLolApp = express();

fantaLolApp.get("*" , function(req , res) {
    res.end("33");
})


masterApp.use( vhost("www.koalabo.eu" , koalaboApp) );
masterApp.use( vhost("www.fantalol.com" , fantaLolApp) );

// listen on port
var server = masterApp.listen(80, x => console.log("listening ..."));



// what to do during a POST request :


koalaboApp.post("/upload",(req,res) => {
    upload(req,res, err => {
        if(err) console.log([err,req.files]);
        else {

            try{
            console.log([req.body, req.files]);
            getnewdata(req);

        }catch(error){
            res.end("NO REASONS TO WORRY ABOUT -> EROOR : "+error);
        }
            res.end("SUBMISSION COMPLETED ;");
        }
    })
});


koalaboApp.post("/uploadMod" , (req,res) => {
    upload(req, res , err => {
        if(err) console.log([err]);
        else {

            try{
            console.log([req.body, req.files]);

            if(req.body.coursename == undefined){
                throw "no course to update";
            }
            
            updatecourses(req);

            }catch(error){
                res.end("NO REASONS TO WORRY ABOUT -> EROOR : "+error);
            }

            res.end("SUBMISSION COMPLETED ;");
        }
    })
})




////////////////////////////////////////////////////////////////////////////////
//       UPDATE EXISTING COURSE
////////////////////////////////////////////////////////////////////////////////

// update the json files that need to be modified
function updatecourses(req){
   

    console.log("updating");
    var classname = "public/listeCours/"+req.body.classname+".JSON";
    
   
    var data = JSON.parse(fs.readFileSync(classname));


    var position = 0;
    position = data.findIndex(el => el.titre == req.body.coursename);
    
    var newdata = data.filter(el => el.titre != req.body.coursename);

    var ini = {
        background : req.body.image,
        titre : req.body.newTitre,
        visibility : req.body.visibilitydiv,
        links : []
    }

    var cnt = 0;

    
    if(Array.isArray(req.body.titreli)){
        req.body.titreli.forEach(el => {
            ini.links.push({
                titre : el,
                link : req.body.pathli[cnt],
                visibility : req.body.visibility[cnt]
            })
            cnt += 1;
        });
    }else {
        ini.links.push({
            titre : req.body.titreli,
            link : req.body.pathli,
            visibility : req.body.visibility
        })
    }

    // pour tout les req.files put them to their index ==> files.nameinpiut
    // et pour le background

    req.files.forEach(el => {
        
        if(el.fieldname == "imageFile"){
            ini.background = "url(img/"+el.filename+")";
        }
        else{
        // substr(6) to remove public from directory
        ini.links[parseInt(el.fieldname)].link = el.path.substr(6);
        }
    });

    
    if(req.body.supprimerBloc == "YES"){
        // supprimer le bloc
    }else{
    newdata.splice(position,0,ini);
    }

    
    fs.writeFileSync(classname,JSON.stringify(newdata));

    


}






////////////////////////////////////////////////////////////////////////////////
//        CREATE NEW COURSE
////////////////////////////////////////////////////////////////////////////////

// get the data recieved in (req) and push it to the koalaboAppropriate JSON file
function getnewdata(req) {

    
    


    var ini = {
        background : "",
        titre : "",
        visibility : "visible",
        links : []
    }
    ini.titre = req.body.titre;
    
    for (var prop in req.body) {
        if(prop == "classname" || prop == "titre"){}
        else{
            ini.links.push({
                titre : req.body[prop],
                link : "",
                visibility : ""
            });
        }
      
    }


    req.files.forEach(el => {
        //console.log(el);
        if (el.fieldname == "background") ini.background = "url(img/"+el.filename+")";
        else {
            var linkstring = "";
            if(el.mimetype.slice(0,11) == "koalaboApplication") linkstring = "pdf/"+el.filename;
            else linkstring = "uploads/"+el.filename;


            var theIndex = el.fieldname.slice(4);
            ini.links[theIndex].link = linkstring;
            ini.links[theIndex].visibility = "visible";

            /*
            ini.links.push({
                titre : req.body[el.fieldname],
                link : linkstring,
                visibility : "visible"
            });*/
        }
    });

    
        
    
    var classname = "public/listeCours/"+req.body.classname+".JSON";
    var data = JSON.parse(fs.readFileSync(classname));

    data.push(ini);
    fs.writeFileSync(classname,JSON.stringify(data));
    

    
}





////////////////////////////////////////////////////////////////////////////////
//    MULTER SETUP
////////////////////////////////////////////////////////////////////////////////


// where to store files when they are send by POST
var Storage = multer.diskStorage({
    destination: function(req,file,callback) {
        if(file.mimetype.slice(0,5) == "image")
            callback(null,"public/img");    
        else if(file.mimetype.slice(0,11) == "koalaboApplication")
            callback(null,"public/pdf");
        else
            callback(null,"public/uploads");
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});

var upload = multer({
    storage: Storage
}).any();
//.single("inputname");
//.array("imgUploader", 3); //Field name and max count
//.any() for what ever you want
