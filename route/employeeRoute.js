const express = require('express');
const router = express.Router();
const employeeModel = require('../model/employeeData');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
router.use(methodOverride('_method'));


router.use(cors());
router.use(bodyParser.json());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


function userroute(nav) {

    // GET operation
    router.get('/', async (req, res) => {
        try {
            const data = await employeeModel.find();  // Corrected model name
            res.render("home", {data,
                nav,

            });
        } catch (error) {
            console.error(error); // Log error for debugging
            res.render('not found');
        }
        
    });
    router.get('/addemployee', async (req, res) => {
        try {
            const data = await employeeModel.find();  // Corrected model name
            res.render("addemployee", {data,
                nav,

            });
        } catch (error) {
            console.error(error); // Log error for debugging
            res.render('not found');
        }
    });

    // POST operation
    router.post('/addemployee', async (req, res) => {
        try {
            const item = req.body;  // Get the form data from the request body
            const data1 = new employeeModel(item);  // Create a new instance of the employee model
            const main=await data1.save();  // Save the new employee to the database
            
            res.redirect("/employee");  // Redirect to a list of employees after successful addition
        } catch (error) {
            console.error('Error saving employee:', error.message);  // Log detailed error
            res.status(400).send('Post unsuccessful');  // Send a 400 error response
        }
    }); 



router.get('/edit/:id', async (req, res) => {
    try {
        const itemId = req.params.id;  // Correct: Get the ID from URL parameters
        const data = await employeeModel.findById(itemId);  // Find employee by ID

        if (!data) {
            return res.status(404).render('notfound');  // Render notfound view if no employee is found
        }

        res.render('editemployee', {
            data,
            nav,
        });
    } catch (error) {
        console.error(error);  // Log error for debugging
        res.status(500).render('error', { error: 'Internal Server Error' });  // Render a general error view
    }
});

// put operation


// PUT route to update employee data
router.post('/edit/:id', async (req, res) => {
    const empUpdate=req.body
    console.log( empUpdate)
    const data= await employeeModel.findByIdAndUpdate(req.params.id, {
                EmployeeName:req.body.EmployeeName,
                EmployeeDesignation:req.body.EmployeeDesignation,
                EmployeeLocation:req.body.EmployeeLocation,
                Salary: req.body.Salary
    });
    console.log(data)
    res.redirect('/employee');
});




//delete operation
router.post('/delete/:id', async (req, res) => {
    const data=await employeeModel.findByIdAndDelete(req.params.id);
    res.redirect('/employee');
});

















































    return router;
}

module.exports =userroute;
