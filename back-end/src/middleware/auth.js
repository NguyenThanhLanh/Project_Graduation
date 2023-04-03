const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.sendStatus(401);

    try {
        const tokeDecoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(tokeDecoded);
        
        req.id = tokeDecoded.iat;
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(403)
    }
}

module.exports = verifyToken;