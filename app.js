
const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const cors       = require('cors');
const session    = require('express-session');
const morgan     = require('morgan');

// Mongodb Connection
// "mongodb://aaa:bbb@ds241065.mlab.com:41065/online_wall_of_messages"

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://aaa:bbb@ds241065.mlab.com:41065/online_wall_of_messages", {useMongoClient: true})
        .then( () => { // check db connection
            console.log('MongoDB has been conneted');
        })
        .catch( err => { //Check for db errors
            console.log(`There is an error: ${err}`);
        });

// Create express server
const app = express();


// Parse posted data - Middelware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// static
app.use(express.static('./public')) ;

// Cross-origin resource sharing - Middelware
app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET','POST', 'DELETE', 'PUT'],
    credentials: true // enable set cookie
}));

// Session - Middelware
app.use(session({resave: true,secret: 'Mt8PxTrm~E{3`9]L',saveUninitialized:true}));

// add morgan for debugging
app.use(morgan('combined'));

// Routes
app.use('/api', require('./controllers/APIcontrol'));
app.use('/apiMessage', require('./controllers/APIcontrolMessage'));
app.use('/*', require('./controllers/react'));


// Listen to port
const port = process.argv[2] || process.env.port || 4000;;
app.listen( port, () => {
    console.log(`Server is listening on ${port}.`);
});
