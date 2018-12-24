var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.set("view engine", "ejs");

var campgrounds = [
		{name: "Salmon Creek", image:"https://farm4.staticflickr.com/3888/15016796272_18ba446fc0.jpg"},
		{name: "Granite Hill", image:"https://farm5.staticflickr.com/4116/4913012040_3c7d8f7cd8.jpg"},
		{name: "Mountain Goat's Rest", image:"https://farm7.staticflickr.com/6077/6159611298_85fbb90c73.jpg"},
		{name: "Salmon Creek", image:"https://farm4.staticflickr.com/3888/15016796272_18ba446fc0.jpg"},
		{name: "Granite Hill", image:"https://farm5.staticflickr.com/4116/4913012040_3c7d8f7cd8.jpg"},
		{name: "Mountain Goat's Rest", image:"https://farm7.staticflickr.com/6077/6159611298_85fbb90c73.jpg"},
		{name: "Salmon Creek", image:"https://farm4.staticflickr.com/3888/15016796272_18ba446fc0.jpg"},
		{name: "Granite Hill", image:"https://farm5.staticflickr.com/4116/4913012040_3c7d8f7cd8.jpg"},
		{name: "Mountain Goat's Rest", image:"https://farm7.staticflickr.com/6077/6159611298_85fbb90c73.jpg"},
		{name: "Salmon Creek", image:"https://farm4.staticflickr.com/3888/15016796272_18ba446fc0.jpg"},
		{name: "Granite Hill", image:"https://farm5.staticflickr.com/4116/4913012040_3c7d8f7cd8.jpg"},
		{name: "Mountain Goat's Rest", image:"https://farm7.staticflickr.com/6077/6159611298_85fbb90c73.jpg"}
	];

app.get("/", (req, res) => {
	res.render("landing");
});

app.get("/campgrounds", (req, res) => {
	res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", (req, res) => {
  var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
	res.render("new.ejs");
});

app.listen(3000, () => {
	console.log("Server Host Connected! YelpCamp Started!")
});
