var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var fs = require('fs');

// initialise express app
var app = express();
app.use(express.json());
app.use(bodyParser.json());

// listen on port
var server = app.listen(3000, x => console.log("listening ..."));

// make the folder public the main site
app.use(express.static("public"));


//////////////////////////////////////////////////////////////////////////////////////

// what to do during a POST request
app.post("/upload",(req,res) => {
    upload(req,res, err => {
        if(err) console.log([err,req.files]);
        else {
            getnewdata(req);
            res.end("SUBMISSION COMPLETED ;");
        }
    })
});

app.post("/uploadMod" , (req,res) => {
    upload(req, res , err => {
        if(err) console.log([err]);
        else {
            console.log([req.body, req.files]);
            updatecourses(req);

            res.end("SUBMISSION COMPLETED ;");
        }
    })
})


//////////////////////////////////////////////////////////////////////////////////
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
        titre : req.body.coursename,
        links : []
    }

    var cnt = 0;

    
    if(Array.isArray(req.body.titreli)){
        req.body.titreli.forEach(el => {
            ini.links.push({
                titre : el,
                link : req.body.pathli[cnt]
            })
            cnt += 1;
        });
    }else {
        ini.links.push({
            titre : req.body.titreli,
            link : req.body.pathli
        })
    }

    // pour tout les req.files put them to their index ==> files.nameinpiut

    req.files.forEach(el => {
        // substr(6) to remove public from directory
        ini.links[parseInt(el.fieldname)].link = el.path.substr(6);
    });

    

    newdata.splice(position,0,ini);

    
    fs.writeFileSync(classname,JSON.stringify(newdata));


}



////////////////////////////////////////////////////////////////////////////////////

// get the date recieved in (req) and push it to the appropriate JSON file
function getnewdata(req) {
    var ini = {
        background : "",
        titre : "",
        links : []
    }
    ini.titre = req.body.titre;
    
    req.files.forEach(el => {
        console.log(el);
        if (el.fieldname == "background") ini.background = "url(img/"+el.filename+")";
        else {
            var linkstring = "";
            if(el.mimetype.slice(0,11) == "application") linkstring = "pdf/"+el.filename;
            else linkstring = "uploads/"+el.filename;
            ini.links.push({
                titre : req.body[el.fieldname],
                link : linkstring
            })
        }
    });
        
    
    var classname = "public/listeCours/"+req.body.classname+".JSON";
    var data = JSON.parse(fs.readFileSync(classname));

    data.push(ini);
    fs.writeFileSync(classname,JSON.stringify(data));
}





////////////////////////////////////////////////////////////////////////////////

// Multer setup
var Storage = multer.diskStorage({
    destination: function(req,file,callback) {
        if(file.mimetype.slice(0,5) == "image")
            callback(null,"public/img");    
        else if(file.mimetype.slice(0,11) == "application")
            callback(null,"public/pdf");
        else
            callback(null,"public/uploads");
    },
    filename: function(req, file, callback) {
        callback(null, "date_"+Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage
}).any();
//.single("inputname");
//.array("imgUploader", 3); //Field name and max count
//.any() for what ever you want