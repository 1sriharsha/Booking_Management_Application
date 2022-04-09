const express = require('express')
const dotenv = require("dotenv")
const connectDB = require('./config/db')
const morgan = require('morgan')
const passport = require('passport')
const cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
const session = require('express-session')
var cors = require('cors')
const middleware = require('./middleware')
const aliveTime = 1000 * 60 * 30

//Load Configurations
dotenv.config({path:'./config/config.env'})

//Passport Configuration
require('./config/passport')(passport)

connectDB()

const app = express()

var origin="https://athlos-ui.herokuapp.com"
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
    origin = "http://localhost:3001"   
}
app.use(cors({credentials:true,origin:origin}))

//Session Middleware
app.use(session({   
    key:'session_id',
    secret:'mySecretKeylxinseqgh21sas98yhb',
    saveUninitialized:false,
    resave:false,
    cookie:{maxAge:aliveTime}
}))
app.use(cookieParser())


//Passport Middle-ware
app.use(passport.initialize())
app.use(passport.session())
app.get("/api", function(req,res){
    console.log('Get Request');
    res.send({name: 'harsha'});
});


app.use(bodyParser.json())
//Routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))
app.use('/users',require('./routes/users'))
app.use('/book',require('./routes/book'))
app.use('/facilities',require('./routes/facilities'))
const PORT  = process.env.PORT || 5000

app.listen(PORT,console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`))  