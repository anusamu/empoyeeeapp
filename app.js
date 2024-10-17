const express = require('express');
const app =new express(); 
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Body-parser middleware to handle form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Method override middleware to support PUT and DELETE in forms

app.use(methodOverride('_method'));
app.use(morgan('dev'));
require('dotenv').config();
const PORT =process.env.PORT;
app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.use(express.static('public'))
require('./db/connection')

const nav=[
    {
        link:'/employee',name:'Home'
    },
    {
        link:'/employee/addemployee',name:'ADD employee'
    }
    
]

const eRoute = require('./route/employeeRoute')(nav);//;
app.use('/employee', eRoute);
require('./db/connection')

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
