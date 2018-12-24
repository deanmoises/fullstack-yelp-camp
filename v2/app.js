var express     = require("express"),
    app         = express(), 
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Granite Hill", 
// 		image:"https://farm5.staticflickr.com/4116/4913012040_3c7d8f7cd8.jpg",
// 		description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
// 	}, 
// 	function(err, campground){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log("Newly Created Campground");
// 		console.log(campground);
// 	}
// });

// Landing Page
app.get("/", (req, res) => {
	res.render("landing");
});

// INDEX ROUTE - shows all the existing campgrounds
app.get("/campgrounds", (req, res) => {
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("index", {campgrounds: allCampgrounds});
		}
	});
});

// CREATE ROUTE - add new campgrounds to db
app.post("/campgrounds", (req, res) => {
	// Test this out using POSTMAN
	// res.send("You Hit the post Route");
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	// Create a new campground and save to db
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			// redirect back to campgrounds page 
			// this includes the newly added campground
			res.redirect("/campgrounds");
		}
	});
});

// NEW ROUTE - show form to create new campground
app.get("/campgrounds/new", (req, res) => {
	res.render("new.ejs");
});

// SHOW ROUTE - shows more info about one campground
app.get("/campgrounds/:id", function(req,res){
	// find the campground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			// render show template with that campground
			res.render("show",{ campground: foundCampground});
		}
	});
});

// Server Start
app.listen(3000, () => {
	console.log("Server Host Connected! YelpCamp Started!")
});

// at 5:11 mark - adds a row div with an h3 that says: "Our Most Popular Campgrounds"
// at 5:19 mark - this is gone
// You can leave the h3 element in there or remove it if you like.