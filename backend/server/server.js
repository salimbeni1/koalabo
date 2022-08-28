var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const { graphqlUploadExpress  } = require("graphql-upload");
const { GraphQLUpload } = require("graphql-upload");
const mongoose = require('mongoose');
const cors = require('cors')
const fs = require('fs');

require('dotenv').config()


console.log("WELCOME TO THE GRAPHQL MONGODB SERVER")

var app = express();
app.use(cors())

mongoose.connect('mongodb://'+process.env.KOALABODB_NAME+':'+process.env.KOALABODB_PWD+'@mongodb:27017/koalabodb' , 
(e) => {
  if (e) console.log("db error : " + e);
  else {
    console.log("db successfull connection"); 
    app.emit('ready'); 
  }
} );


const courseSchema = new mongoose.Schema( {
  state: String,
  title : String,
  links : [
            {
              state: String,
              name : String,
              link : String
            }
          ],
  bg : String
} );



const sci1fr = mongoose.model("sci1fr" , courseSchema)
const Kcollections = {
  "sci1fr" : sci1fr,
  "sci2fr" : mongoose.model("sci2fr" , courseSchema),
  "sci3fr" : mongoose.model("sci3fr" , courseSchema),
  "math1fr" : mongoose.model("math1fr" , courseSchema),
  "math2fr" : mongoose.model("math2fr" , courseSchema),
  "math3fr" : mongoose.model("math3fr" , courseSchema),
}


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`

  scalar FileUpload

  type CourseLink {
    state: String
    name: String
    link: String
    _id: String
  }

  type Course  {
    state: String
    title: String
    links: [CourseLink]
    bg: String
    _id: String
  } 

  input CourseLinkI {
    state: String
    name: String!
    link: String!
  }

  input CourseI  {
    state: String
    title: String!
    links: [CourseLinkI]!
    bg: String!
  } 

  type Query {
    hello: String
    sci1frs: [Course]
    listCourses(className: String): [Course]
  }

  type Mutation {
    addNewCourse(className: String, course: CourseI): Boolean
    delCourse(className: String, courseID: String): Boolean
    updateCourse(className: String, courseID: String , course: CourseI): Boolean

    uploadFile(sectionType: String, file: FileUpload): String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {

  FileUpload: GraphQLUpload ,

  hello: () => {
    return 'Hello world!';
  },

  sci1frs: () => {
    return sci1fr.find();
  },

  listCourses: ({className}) => {
    return Kcollections[className].find()
  },

  addNewCourse : async ( {className , course} ) => {
    console.log(`${className} + ${1}`);
    if(className.match("sci|math")){
      await new Kcollections[className](course).save()
      return true;
    }
    return false;
  },

  delCourse : async ({className , courseID}) => {
    if(className.match("sci|math")){
      await Kcollections[className].deleteOne({ _id: courseID })
      return true;
    }
    return false;
  },

  updateCourse : async ({className , courseID , course}) => {
    console.log(`${className} + ${courseID}`);
    if(className.match("sci|math")){
      await Kcollections[className].updateOne({ _id: courseID } , {$set: course})
      return true;
    }
    return false;
  }, 

  uploadFile: async ({sectionType, file}) => {
    console.log({sectionType, file});
    const { filename, mimetype, createReadStream } = await file.file;

    console.log(filename)
    const stream = createReadStream();

    const path = `${sectionType}/${filename}`
    const ws = fs.createWriteStream(`./public/${path}`)
    stream.pipe(ws)

    console.log(stream)


    return path
  }
};

app.use('/graphql',
 graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
 graphqlHTTP({
  schema:  schema ,
  rootValue: root ,
  graphiql:  true ,
}));

app.use(express.static('public'));

app.on('ready' , () => {
  //addTestCourse() ;
  app.listen(4000);
})
console.log('Running a GraphQL API server at http://localhost:4000/graphql');