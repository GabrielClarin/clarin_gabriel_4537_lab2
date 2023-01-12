const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');
const app = express(); 
const cors = require('cors');

var jsonParser= bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended : false});

app.use(cors());
app.use(urlencodedParser);
app.use(jsonParser);
app.use(express.static(path.join(__dirname, '../Frontend')));



app.get('/', function(req, res) {
	let reqPath = path.join(__dirname, '../Frontend/index.html');
	res.sendFile(reqPath);
});


app.post('/chatbot', (req, res) => {
	const message = req.body.message;
	const number = message.match(/\d+/);
	if (number) {
		fetch(`http://numbersapi.com/${number}?type=trivia`).then(response => response.text()).then(data => {
			res.json({
				text: data
			});
		}).catch(error => {
			res.json({
				text: "Sorry, I couldn't find any information about that number."
			});
		});
	}
});

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});