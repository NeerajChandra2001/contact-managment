const mongoose =require('mongoose');


//define connection string

mongoose.connect('mongodb://localhost:27017/contact', ()=>{
    console.log('connected to mongodb');
})

//create model 

const User = mongoose.model('User',{
    //create schema

    id:Number,
    name:String,
    photo:String,
    email:String,
    mobile:Number,
    company:String,
    title:String,
    


})

const Admin =mongoose.model('Admin',{
    username:String,
    email:String,
    password:String
})

module.exports={
    User,
    Admin
}