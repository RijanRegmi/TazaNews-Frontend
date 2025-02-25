// Initialization 
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const sequelize = require('./Database/db')
const userRoute = require('./routes/userRoute')
const prodcutRoute = require('./routes/productRoute')

// app.use('/users', userRoute);
// app.use('/products', prodcutRoute);

// app.listen(PORT, ()=>{
//     console.log(`Server Running on............................... PORT ${PORT}`)
// })

// //creating server 
// const app = express();


// app.get('/',(req,res) =>{
//     res.send("Welcome to webpage")
// })


// app.get('/notice',(req,res) =>{
//     res.send("This is notice")
// })

const express = require('express');
const userRoutes = require('./routes/userRoute');
require('./Database/db'); // Ensure the database is connected

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



// //creating port 
// const PORT = 5000;


// //Creating middleware 
// app.use(cors())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))

// // Running port 
// app.listen(PORT,() => {
//     console.log(`sever starting at port ....... ${PORT}`)
// })