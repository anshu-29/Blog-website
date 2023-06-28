const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")
const _ = require('lodash');

const homeStartingContent = "Welcome to my blog Website. Here you can put your thoughts and See them being published on the website";
const aboutContent = "I created this Website as a practice project to test my skills on NodeJs, Express, EJS Templating and I will be publishing this web app along with MONGODB linkage soon";
const contactContent = "If you have some amazing projects and Opportunities then contact me for full support in Web development";

const app = express();


app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

 mongoose.connect("mongodb://127.0.0.1:27017/blogDB",{useNewUrlParser:true})
const postSchema = {
    title: String,
    content:String
}
const Post = mongoose.model("Post",postSchema)





app.get("/", async function (req, res) {
    try {
        const posts = await Post.find({});
        res.render("home", {
            startContent: homeStartingContent,
            posts: posts
        });
    } catch (err) {
        console.log(err);
    }
});


app.get("/about",function (req,res) {
    res.render("about",{aboutMe: aboutContent});

})
app.get("/contact",function (req,res) {
    res.render("contact",{contactMe: contactContent});

})

app.get("/compose",function (req, res) {
    res.render("compose")

})



app.post("/compose",function (req,res) {


    const post = new Post ({
        title : req.body.composeInput,
        content : req.body.composeBox,
    });
post.save().then(r=>{
    res.redirect("/");
});


});


app.get("/posts/:postId", async function (req, res) {
    const requestedId = req.params.postId;

    try {
        const post = await Post.find({ _id: requestedId });
        res.render("post", {
            postedTitle: post[0].title,
            postContent: post[0].content
        });
    } catch (err) {
        console.log(err);
    }
});
app.listen(3000, function() {
    console.log("Server started on port 3000");
});