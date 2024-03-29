var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const { graphqlUploadExpress  } = require("graphql-upload");
const { GraphQLUpload } = require("graphql-upload");
const mongoose = require('mongoose');
const cors = require('cors')
const fs = require('fs');
const path = require('path');

require('dotenv').config()

const MONGO_DB_URL = "mongodb"
// const MONGO_DB_URL = "localhost"
// const MONGO_DB_URL = "0.0.0.0"

console.log("WELCOME TO THE GRAPHQL MONGODB SERVER")

var app = express();
app.use(cors())

async function connectToMongoDB() {
  let mongo_url = 'mongodb://'+process.env.KOALABODB_NAME+':'+process.env.KOALABODB_PWD+'@'+MONGO_DB_URL+':27017/koalabodb'
  await mongoose.connect(mongo_url).then(
    (  ) => { 
      console.log("db successfull connection"); 
      app.emit('ready')}
  ).catch( e => console.log("db error "+mongo_url+" : " + e) )
}

connectToMongoDB();

const courseSchema = new mongoose.Schema( {
  index: Number,
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

const Kcollections = {
  "sci1fr" : mongoose.model("sci1fr" , courseSchema),
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
    index: Int
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
    index: Int
    state: String
    title: String!
    links: [CourseLinkI]!
    bg: String!
  } 

  type Query {
    hello: String
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

  listCourses: ({className}) => {
    if (!Kcollections[className]) {
      Kcollections[className] = mongoose.model(className, courseSchema);
    }
    return Kcollections[className].find()
  },

  addNewCourse : async ( {className , course} ) => {
    console.log(`${className} + ${1}`);
    if (!Kcollections[className]) {
      Kcollections[className] = mongoose.model(className, courseSchema);
    }
    await new Kcollections[className](course).save()
    return true;
  },

  delCourse : async ({className , courseID}) => {
    if (!Kcollections[className]) {
      Kcollections[className] = mongoose.model(className, courseSchema);
    }
    await Kcollections[className].deleteOne({ _id: courseID })
    return true;
  },

  updateCourse : async ({className , courseID , course}) => {
    console.log(`${className} + ${courseID}`);
    if (!Kcollections[className]) {
      Kcollections[className] = mongoose.model(className, courseSchema);
    }
    await Kcollections[className].updateOne({ _id: courseID } , {$set: course})
    return true;
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

app.get('/kcollections', (req, res) => {
  const collectionNames = Object.keys(Kcollections);
  res.json(collectionNames);
});


function listFilesStructured(dir, baseDir = dir) {
  const result = {};
  const files = fs.readdirSync(dir);
  files.forEach(file => {
      const filePath = path.join(dir, file);
      const relativePath = path.relative(baseDir, filePath);

      if (fs.statSync(filePath).isDirectory()) {
          result[file] = listFilesStructured(filePath, baseDir);
      } else {
          if (!result['files']) {
              result['files'] = [];
          }
          result['files'].push(relativePath);
      }
  });
  return result;
}

app.get('/downloadedfiles', (req, res) => {
    const publicDir = path.join(__dirname, 'public');
    try {
        const fileListStructured = listFilesStructured(publicDir);
        res.json(fileListStructured);
    } catch (error) {
        res.status(500).send('Error reading files');
    }
});

app.use(express.static('public'));

app.on('ready' , () => {
  //addTestCourse() ;
  app.listen(4000);
})
console.log('Running a GraphQL API server at http://localhost:4000/graphql');