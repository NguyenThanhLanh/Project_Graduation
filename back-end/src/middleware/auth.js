const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // const token = authHeader && authHeader.split(' ')[1];
    const loginToken = req.cookies.jwtToken;
    if(!loginToken) return res.sendStatus(401);

    // return res.send(loginToken);
    try {
        const tokeDecoded = jwt.verify(loginToken, process.env.ACCESS_TOKEN_SECRET);
        console.log(tokeDecoded);
        
        req.id = tokeDecoded.iat;
        console.log(req.id);
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(403)
    }
}

module.exports = verifyToken;