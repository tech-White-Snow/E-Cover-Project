const express = require('express');
const connectDB = require('./config/db');

const app = express();

const bodyParser = require('body-parser');

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies
app.use(bodyParser.json());



// Connect Database
connectDB();

// Init Middleware
app.use(express.json ({ extended: false }));



app.get('/', (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.use('/api/ag-psd', require('./routes/api/ag_psd'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server started on port " , PORT));