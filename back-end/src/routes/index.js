const jwt = require('jsonwebtoken');
const product = require('./productRouter');
const user = require('./userRouter');
const suppiler = require('./suppilerRouter');
const role = require('./roleRouter');

const author = require('../middleware/auth');

function router(app){
      
    app.use('/search', (req, res) => {
        res.send("Trang tìm kiếm");
    })

    app.use('/user', user)
    app.use('/product', product);
    app.use('/suppiler', suppiler);
    app.use('/role', role)
    app.use('/', (req, res) => {
        res.send("Trang chủ");
    })

    app.post('/login', (req, res)=>{
        const username = req.body.name;
        const user = users.find(user => user.name === username)
        if(!user) return res.sendStatus(403);

        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        res.send({token});
    })
}

module.exports = router;
