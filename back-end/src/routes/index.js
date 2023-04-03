const product = require('./productRouter');
const jwt = require('jsonwebtoken');

const author = require('../middleware/auth');


const users = [
    {
        name: "thanhlanh"
    },
    {
        name: "thanhlanh2"
    },
    {
        name: "thanhlanh3"
    },
];

function route(app){
      
    app.use('/search', (req, res) => {
        res.send("Trang tìm kiếm");
    })

    app.use('/product', product);
    
    app.post('/login', (req, res)=>{
        const username = req.body.name;
        const user = users.find(user => user.name === username)
        if(!user) return res.sendStatus(403);

        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        res.send({token});
    })
    
    app.use('/', (req, res) => {
        res.send("Trang chủ");
    })
}

module.exports = route;
