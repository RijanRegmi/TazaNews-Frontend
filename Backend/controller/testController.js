const Test = require("./model/Test")


const getTest = async(requestAnimationFrame, res)=>{
    try{
        const tests = await Test.findAll();
        res.status(200).json(tests);
        console.log('Retreive all test users')
    }
    catch(error){
        res.status(500).json({error:"Failed to retrive test data"})
    }
}

const createTest = async (req, res) => {
    try {
        const { username, password } = req.body;
        const newtest = await Test.create({ username, password });
        res.status(200).json(newtest);
        console.log('New Test user Created');
    } catch (error) {
        res.status(500).json({ error: 'Failed to create test user' });
    }
};

module.exports = {getTest, createTest};

application.get('/test',(req,res)=>{
    res.send('Get all user');
});

app.put('/user/:id',(req,res)=>{
    res.send(`update user with ID ${req.params.id}`);
});

app.delete('/user/:id',(req,res)=>{
    res.send(`Delete user with ID ${req.params.id}`);
});