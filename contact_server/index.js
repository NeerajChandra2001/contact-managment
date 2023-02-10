const express =require('express');

const cors =require('cors');

const app = express();

//import dataservices

const dataservices=require('./Service/dataservices')


app.use(express.json());

app.use(cors({
    origin:'http://localhost:4200'
}))

app.listen(3000,()=>{
    console.log('listening on the port 3000');
})

//login


app.post('/login', (req, res) => {
    dataservices.login(req.body.email, req.body.password).then(
        result => {
            res.status(result.statusCode).json(result)
        }
    )

})



//register request
app.post('/register', (req, res) => {
    dataservices.register(req.body.username, req.body.email, req.body.password).then(
        result => {
            res.status(result.statusCode).json(result)

        }
    )

})


//all user

app.get('/all-contacts',(req,res)=>{
    dataservices.allContacts().then(
        (result)=>{
            res.status(result.statusCode).json(result)
            
        }
    )
})

//view contacts

app.get('/view-contacts/:id',(req,res)=>{
    dataservices.viewContact(req.params.id).then(
        (result)=>{
            res.status(result.statusCode).json(result)
            console.log(result.name);
        }
    )
})


//API call to delete  contact to contacts
app.delete('/delete-Contact/:id', (req, res) => {
    dataservices.deleteContact(req.params.id).then(
       
        result => {
            res.status(result.statusCode).json(result)
        }
    )
})


//register request

app.post('/createContact',(req,res)=>{
    dataservices.create(req.body.id,req.body.name,req.body.photo,req.body.email,req.body.mobile,req.body.company,req.body.title).then(
        result => {
            res.status(result.statusCode).json(result)

        }
    )
})



app.post('/view-contact', (req, res) => {
    dataservices.viewContact(req.body.id).then(
        result => {
            res.status(result.statusCode).json(result)

        }
    )

})



app.patch('/updateContact',(req,res)=>{
    dataservices.updateContact(req.body.id,req.body.name,req.body.photo,req.body.email,req.body.mobile,req.body.company,req.body.title).then(
        result=>{
            res.status(result.statusCode).json(result)
        }
    )
})
