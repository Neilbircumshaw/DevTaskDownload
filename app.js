const express = require("express");
const app = express();
app.listen(3000);


app.get("/", (req,res) => {
  res.sendFile(__dirname + '/views/index.html')
});

//app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));
