
// import App from "../client_side/my-app/src/components/App.js";
// import path from 'path';
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);
const app = express();
mongoose.connect('mongodb+srv://armage:armage1990@cluster0.8id6c.mongodb.net/paintingsDB',
{useNewUrlParser: true});


const paintingDataSchema = {
  painting_description: String,
  painting_path: String
};
const Painting = mongoose.model("Painting", paintingDataSchema);

async function getData() {

  var found = await Painting.find({}, function(err, items)
    {
      if (err)
      {
        console.log(err);
      }
      else
      {
        console.log(items);
      }
    });

  return found;
}


// ReactDOM.render(
//   <React.StrictMode>
//   <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

app.route("/")
.get(function(req, res)
{
  getData();

  res.render("index");
})
.post(function(req, res)
{

});

app.listen(process.env.PORT || 3000, function() {});

// console.log("the query object:");
// console.log(getData());
// console.log("------");
