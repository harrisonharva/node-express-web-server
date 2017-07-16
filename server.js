const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+"/views/partials");
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var logMessage = `${now}:${req.method} ${req.url}`;
	console.log(logMessage);
	fs.appendFile('server_access.log', logMessage+'\n', (err) => {
		if(err) {
			console.log("Unable to append to the server log.");
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs', {
// 		pageTitle: "We'll be right back",
// 	});
// });

app.use(express.static(__dirname+"/public/"));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: "Home page",
		welcomeMessage: "Welcome to my website xyz.",
	});
});

app.get('/about',(req, res) => {
	res.render('about.hbs', {
		pageTitle: "About page",
	});
});


app.get('/bad',(req, res) => {
	res.send({
		errorMessage:"Unable to handle request"
	});
});

app.listen(port, () => {
	console.log(`Express server started at port:${port}`);
});
