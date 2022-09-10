const express = require('express');
const app = express();

require('dotenv').config();
const mongoose = require('mongoose');
const cors=require('cors');

app.use(express.json());
app.use(cors());

const User = require('./schema/UserSchema');

//MongoDB connection :TODO: MOngoURI
mongoose.connect(process.env.DB)
.then(()=>{
    console.log('Database Connected')
})
.catch((err)=>{
    console.log(err)
})


//Welcome Route
app.get('/', (req, res) => {
    res.send('Welcome to the Net Banking Server !');
});

//Signup Route
app.post('/signup', async(req, res) => {
    //console.log(req.body);
    try{
        await new User(req.body).save();
        res.status(201).send({ message: "User created successfully" });
    }catch(e){
        res.status(500).send({ message: "Internal Server Error" });
    }

});
app.post("/login",async(req,res,next)=>{
    try{
        const user=await User.findOne({email:req.body.email})
        
        if(!user){
            res.status(401);
            return res.send({message:"No user with this email exists, Please signup"});
           
        }
        if(user.password===req.body.password && user.email===req.body.email){
            res.status(200).send({ data: token, message: "logged in successfully",user });
            next();
        }
    }catch(e){
        console.log(e);
    }
})

const port=process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log('Server started at port:', port);
});