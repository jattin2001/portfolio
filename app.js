const express = require("express")
const bodyParser = require("body-parser")
const request = require('request');
const ejs = require("ejs")
const mongoose = require("mongoose")
mongoose.set('strictQuery', false);

const app = express()
app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public', {
    setHeaders: (res, path, stat) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    }
  }));
  

app.get("/", (req,res)=>{
    res.render("home", {popup:false})
})
app.get("/projects", (req,res)=>{
  const projects = [
    {
      name: 'Password Generator',
      imageUrl: '/img/p1.png',
      description: 'This is a random strong password generator app made using JavaScript.',
      link: 'https://dazzling-selkie-87c1e2.netlify.app'
    },
    {
      name: 'Restaurant App -- Frontend',
      imageUrl: '/img/2.png',
      description: 'This is frontend of Restaurant App made using HTML, CSS, JavaScript',
      link: 'https://jk-restaurant-app.netlify.app'
    },
    {
      name: 'Tinder for Dog',
      imageUrl: '/img/p3.png',
      description: 'This is frontend project made using HTML, CSS, JavaScript',
      link: 'https://tinderdogbyjk.netlify.app'
    },
    {
      name: 'Dice Game',
      imageUrl: '/img/p4.png',
      description: 'This is a game project made using Js',
      link: 'https://dice-game-jk.netlify.app'
    }
    
  ];

    res.render("projects", {
      projects: projects
    })
})

app.post('/', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const address = req.body.address;
  const address2 = req.body.address2;
  const city = req.body.city;
  const state = req.body.state;

  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
          MOBILE: mobile,
          ADDRESS: address,
          ADDRESS2: address2,
          CITY: city,
          STATE: state
        }
      }
    ]
  };

  const postData = JSON.stringify(data);

  const options = {
    url: 'https://us21.api.mailchimp.com/3.0/lists/069a260cac',
    method: 'POST',
    headers: {
      Authorization: 'auth 3e9d1ee77b44d56a39ffd830d1fd1b3e-us21'
    },
    body: postData
  };

  request(options, (error, response, body) => {
    if (error) {
      res.send('There was an error, try again');
    } else {
      res.render("home", {popup:true});
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});