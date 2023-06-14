//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Welcome to my blog Website. Here you can put your thoughts and See them being published on the website";
const aboutContent = "I created this Website as a practice project to test my skills on NodeJs, Express, EJS Templating and I will be publishing this web app along with MONGODB linkage soon";
const contactContent = "If you have some amazing projects and Opportunities then contact me for full support in Web development";

const app = express();


app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/",function (req,res) {
  res.render("home", {startContent: homeStartingContent ,
  posts: posts
  });


})

app.get("/about",function (req,res) {
  res.render("about",{aboutMe: aboutContent});

})
app.get("/contact",function (req,res) {
  res.render("contact",{contactMe: aboutContent});

})

app.get("/compose",function (req, res) {
  res.render("compose")

})



app.post("/compose",function (req,res) {
   const post = {
title : req.body.composeInput,
content : req.body.composeBox,
  };
posts.push(post)
   res.redirect("/")

})


app.get("/posts/:postName",function (req,res) {

    const requestedTitle = _.lowerCase(req.params.postName) ;

  posts.forEach(function (post) {
      const storedTitle = _.lowerCase(post.title) ;


      if (storedTitle === requestedTitle){
          res.render("post", {
              postedTitle : storedTitle ,
          postContent : post.content })
      }
  });


})






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
