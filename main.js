//imports
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 4000;


                                        //MongoDB connect
mongoose.connect(process.env.DB_URL, {useNewUrlParser:true, useUnifiedTopology:true});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log("Connected to MongoDB"));

//middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(
    session({
        secret: "my secret key",
        resave: false,
        saveUninitialized: false,
    })
);

app.use((req,res,next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use(express.static('uploads'));

//set template
app.set('view engine', 'ejs');

//routes
app.use('', require('./routes/routes'));




app.get('/', (req, res) => {
    res.send('This is the home page');
});

app.listen(PORT, () =>  {
    console.log(`Server running on port http://localhost:${PORT}`);
});