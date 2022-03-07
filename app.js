const express = require('express')
const dotenv = require("dotenv")
const connectDB = require('./config/db')
const morgan = require('morgan')
const passport = require('passport')
var bodyParser = require('body-parser');
const session = require('express-session')

//Load Configurations
dotenv.config({path:'./config/config.env'})

//Passport Configuration
require('./config/passport')(passport)

connectDB()

const app = express()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}


//Session Middleware
app.use(session({   
    secret:'athlos-secret',
    resave:false,
    saveUninitialized:false
}))

//Passport Middle-ware
app.use(passport.initialize())
app.use(passport.session())


app.use(bodyParser.json())
//Routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))


const PORT  = process.env.PORT || 5000

app.listen(PORT,console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`))  