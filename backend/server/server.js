var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const cors = require('cors')

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
  title : String,
  links : [
            {
              name : String,
              link : String
            }
          ],
  bg : String
} );

const sci1fr = mongoose.model("sci1fr" , courseSchema)


const addTestCourse = async () => { 
  const testCourse = new sci1fr({
    title : "je sais pas",
    links : [
              {
                  name : "quoi",
                  link : "ecrire"
              }
          ],
    bg : "pour tester"
  });
  await testCourse.save()
}


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type CourseLink {
    name: String
    link: String
  }

  type Course  {
    title: String
    links: [CourseLink]
    bg: String
  } 

  type Query {
    hello: String
    sci1frs: [Course]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },

  sci1frs: () => {
    return sci1fr.find();
  }
};

app.use('/graphql', graphqlHTTP({
  schema:  schema ,
  rootValue: root ,
  graphiql:  true ,
}));
app.on('ready' , () => {
  addTestCourse() ;
  app.listen(4000);
})
console.log('Running a GraphQL API server at http://localhost:4000/graphql');