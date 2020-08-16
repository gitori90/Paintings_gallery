
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require('fs');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb+srv://armage:armage1990@cluster0.8id6c.mongodb.net/paintingsDB',
{useNewUrlParser: true});


const paintingDataSchema = {
  painting_description: String,
  painting_path: String
};
const Painting = mongoose.model("Painting", paintingDataSchema);

async function getData()
{
  let itemsFound = [];
  let found = await Painting.find({}, function(err, items)
    {
      if (err)
      {
        console.log(err);
      }
      else
      {
        itemsFound = items;
      }
    });
  // console.log(itemsFound);

  // console.log(itemsFound[0]);
  return itemsFound;
}

app.route("/")
.get(function(req, res)
{


  res.render("index");
})
.post(function(req, res)
{

});

app.route("/gallery")
.get(async function(req, res)
{
  var paintingsData = await getData();

  res.render("gallery", {
    paintingsData : paintingsData
  });
})
.post(function(req, res)
{
  res.redirect("/reservationPage");
});

app.listen(process.env.PORT || 3000, function() {});
