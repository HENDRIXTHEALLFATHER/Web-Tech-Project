const express = require("express")
const app = express()
const fs = require("fs")
const PORT = 5000

let users;

fs.readFile("users.json","utf8",(error,data)=>{
    if(error){
        console.log("Unable to read from file")
    }

    users = JSON.parse(data)
})

app.get('/',(req,res)=>{
    res.send("Welcome to my server")
})

app.get('/users',(req,res)=>{
    if(!users){
        console.log("User list is empty")
        return res.status(404).send("User list is empty")
    }

    res.status(200).send(users)
})

app.get('/users/:id',(req,res)=>{
    const user_array = Object.values(users)
    const user_found = user_array.find(user => user.id === parseInt(req.params.id))
    if(!user_found){
        console.log(`User with id ${req.params.id} not found`)
        return res.status(404).send(`User with id ${req.params.id} not found`)
    }
    res.status(200).send(user_found)
})

app.get('/users/profession/:profession',(req,res)=>{
    const user_array = Object.values(users)
    const user_found = user_array.find(user => user.profession === req.params.profession)
    if(!user_found){
        console.log(`User with profession ${req.params.profession} not found`)
        return res.status(404).send(`User with profession ${req.params.profession} not found`)
    }
    res.status(200).send(user_found)
})

app.get('/users/name/:name',(req,res)=>{
    const user_array = Object.values(users)
    const user_found = user_array.find(user => user.name === req.params.name)
    if(!user_found){
        console.log(`User with name ${req.params.name} not found`)
        return res.status(404).send(`User with name ${req.params.name} not found`)
    }
    res.status(200).send(user_found)
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})