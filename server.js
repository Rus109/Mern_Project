const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

//app.get('/', (req, res) => res.send('API Running'));



//app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); 

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/sample");
var nameSchema = new mongoose.Schema({
 firstName: String,
 lastName: String,
 age: String
});

var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
 res.sendFile(__dirname + "/index.html");
});

app.post("/addname", (req, res) => {
 var myData = new User(req.body);
 myData.save()
 .then(item => {
 res.send("item saved to database");
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });
});

app.listen(PORT, () => {
 console.log("Server listening on port " + PORT);
});
