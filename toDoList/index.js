const express = require('express');
const path = require('path');
const port = 80;

const db = require('./config/mongoose');
const TODO = require('./models/toDo');



const app = express();

app.set('view engine','ejs');                          // we need to tell express that ejs is view engine
app.set('views',path.join(__dirname, 'views'));        // if we have given whole path instead of __dirname then every team member
app.use(express.urlencoded());                         // //Add parsel it parse data to our contactList, It's a middleware
app.use(express.static('assets'));                     // middleware for Accessing static files, assets is a folder



// just a variable with data, it won't be used when we will use Data Base

var todo_list = [
    {
        description:"Go to play football early morning",
        category:"Important",
        dateAndTime:"12/5/2022"
    },
    {
        description:"Buy grocery when returning from office",
        category:"Office",
        dateAndTime:"13/5/2022"
    }
]




app.get('/', function(req,res){
    
    TODO.find({},function(error, todo){                       // {}-> this is empty because we want every contact
        if(error){
            console.log("Error in fetching from db");
            return;
        }else{
            return res.render('toDoHome',{
                title:"Let's make a ToDo List",
                TODO_LIST:todo/*todo_list*/
            });
        }
    })

    
});


//using post because we used post method in html
app.post('/create-todo', function(req, res){
    TODO.create({
        //defined them in schema.
        description:req.body.description,
        category:req.body.category,
        dateAndTime:req.body.dateAndTime
    }, function(error, newTODO){
        if(error){
            console.log('error in creating a ToDo List');
            return;
        }else{
            console.log('****************',newTODO);
            return res.redirect('back');

        }
    });
});

/*********************************For deleting a contact************************ */


app.get('/delete-toDo', function(req,res){
    console.log(req.query);
    let id = req.query.id;


    TODO.findByIdAndDelete(id, function(error){                          //find the contact in the database using id and delete
        if(error){
            console.log('error in deleting an object from database');
            return;
        }else{
            return res.redirect('back');
        }
    });
});




app.listen(port, function(error){
    if(error){
        console.log('error in running the server', error);
    }else{
        console.log('Yup! server is up and running on',port);
    }
});