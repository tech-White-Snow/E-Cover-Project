const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')

const app = express();

const bodyParser = require('body-parser');

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3000'
  }));



// Connect Database
connectDB();

// Init Middleware
app.use(express.json ({ extended: false }));


// var PSD = require('psd');
// var psd = PSD.fromFile("./mockupfiles/Laptop 2.psd");
// psd.parse();

// console.log("-fromFile", psd);
// console.log("fromFile --", psd.tree().export());
// //console.log(psd.tree().childrenAtPath('A/B/C')[0].export());

// // You can also use promises syntax for opening and parsing
// PSD.open("./mockupfiles/Laptop 2.psd").then(function (psd) {
//   console.log("Open function", psd);
//   return psd.image.saveAsPng('./output.png');
// }).then(function () {
//   console.log("Finished!");
// });



app.get('/', (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.use('/api/ag-psd', require('./routes/api/ag_psd'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server started on port " , PORT));