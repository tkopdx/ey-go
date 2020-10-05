const functions = require('firebase-functions');
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path");
const PORT = process.env.PORT || 8081;
const app = express();
const logger = require('morgan');

//ID generator
const uniqid = require('uniqid');

// Imports the Jisho.org API
const JishoApi = require('unofficial-jisho-api');

// Import other required libraries
const fs = require('fs');
const util = require('util');
// Creates a jisho object
const jisho = new JishoApi();

// use morgan for logging requests
app.use(logger("dev"));
// Define middleware here
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const requests = [];


// Send every other request to the React app
// Define any API routes before this runs
// app.get("/mreh", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });
// app.get("/other", (req, res) => {
//     res.sendFile(path.join(__dirname, "./public/other.html"));
// });
app.post("/translation", async function(req, res) {

  function hasNumber(myString) {
    return /\d/.test(myString);
  }

  console.log("requested text:", req.body.text);

  // const id = uniqid();

  // requests.push({
  //   original: req.body.text,
  //   id: id,
  //   translations: []
  // });

  text = req.body.text.replace('?', '').replace(',', '').replace('.', '').replace(';', '').replace(':', '').replace('/', '').toLowerCase();

  try {
    const response = await jisho.searchForPhrase(text);
    const translationsArr = [];

    console.log(response);

    response.data.forEach(translation => {
      if (hasNumber(translation.slug)) {
        translation.slug = 'Error. Sorry!';
      }

      translationsArr.push({original: text, text: translation.slug});
      console.log(`${text} in Japanese is: `, translation.slug)
    });

    res.send({
      translations: translationsArr,
    });

  } catch (err) {
    res.send({error: `${err}`});
    console.log('Oops.', err);
  }
  
 
});

app.listen(PORT, () => {
  console.log(`Our server is now listening on port ${PORT}!`);
});

module.exports = {
  app
}