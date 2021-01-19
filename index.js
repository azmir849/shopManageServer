const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oeaxh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express()
app.use(bodyParser.json());
app.use(cors());

client.connect(err => {
    const Services = client.db("shop").collection("shopManage");  

  
  //shop information from client
    app.post('/shop', (req, res) => {
      const service = req.body;
      console.log(service)
      Services.insertOne(service)
        .then(result => {
          console.log(result);
        })
    })

  //Receive data from database
  app.get('/info', (req, res) => {
    Services.find({})
      .toArray((err, documents) => {
        res.send(documents);
        console.log(documents);
      })
  })

  //Server working status
    app.get('/', (req, res) => {
      res.send('Server site working')
    })
  
  });

app.listen(5000)