//import db
const { application } = require('express');
const mongoose = require('mongoose');
const db = require('./db')



//login

const login =(email,password)=>{
    return db.Admin.findOne({email,password}).then(
        user=>{
            if(user){
                return {
                    status: true,
                    statusCode: 200,
                    message: "login successful",
                    currentUser:user.email,
                    currentPassword:password
                  
                  }
            }else{
                return {
                    status: false,
                    statusCode: 401,
                    message: "invalid userdetails"
                  }
            }
        }
    )
}


//register


const register = (username,email, password) => {
    return db.Admin.findOne({ email }).then(//asynchronous call
      user => {
        if (user) {
          return {
            status: false,
            statusCode: 401,
            message: "user already exist"
          }
        }
        else {
          const newUser = new db.Admin({
            email: email,
            username: username,
            password: password,
           
          })
          newUser.save()  //to save new data to mongodb
          return {
            status: true,
            statusCode: 200,
            message: "register successful"
          }
        }
      }
    )
  }
  














const allContacts = () => {
    return db.User.find().then(
        (result) => {
            if (result) {
                return {
                    statusCode: 200,
                    user: result,
                    id: result.id
                }
            }
            else {
                return {
                    statusCode: 404,
                    message: "No Data is Present"
                }
            }
        }
    )
}





const viewContact = (id) => {
    return db.User.findOne({id}).then(
        (result) => {
            if (result) {
                return {
                    status:true,
                    statusCode: 200,
                    user: result,
                    
                }
            }
            else {
                return {
                    status:false,
                    statusCode:401,
                    message: "No Data is Present"
                }
            }
        }
    )
}




const deleteContact = (id) => {
    return db.User.deleteOne({ id }).then(
        (result) => {
            if (result) {
                return {
                    status: true,
                    statusCode: 200,
                    message: "contact removed successfully",

                }
            }
            else {
                return {
                    status: false,
                    statusCode: 401,
                    message: "Not found",
                }
            }
        }
    )
}


// add contacts
const create = (id, name, photo, email, mobile, company, title) => {
    return db.User.findOne({ id }).then(
        user => {
            if (user) {
                return {
                    status: false,
                    statusCode: 401,
                    message: 'contact already exist'
                }
            } else {
                const newContact = new db.User({
                    id: id,
                    name: name,
                    photo: photo,
                    email: email,
                    mobile: mobile,
                    company: company,
                    title: title,


                })
                newContact.save()
                return {
                    status: true,
                    statusCode: 200,
                    message: 'contact created successfully'
                }
            }
        }
    )
}




const updateContact=(id,name,photo,email,mobile,company,title)=>{
    return db.User.findOneAndUpdate({id:id},{$set:{name:name,photo:photo,email:email,mobile:mobile,company:company,title:title}}).then(
        user=>{
            if(user){
         
             return{ 
              status:true,
                  statusCode:200,
                      message:"update successful" 
            }
            }
            else{    
            return{
                status:false,
                statusCode:401,
                message:"error"
            }
              }
        }
    )
}




module.exports = {
    allContacts,
    viewContact,
    deleteContact,
    create,
    login,
    register,
    updateContact
}