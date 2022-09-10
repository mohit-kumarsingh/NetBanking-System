const express = require('express');
const app = express();

require('dotenv').config();
const mongoose = require('mongoose');
const cors=require('cors');

app.use(express.json());
app.use(cors());

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
app.post('/signup', (req, res) => {
    console.log(req.body);
});

const port=process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log('Server started at port:', port);
});