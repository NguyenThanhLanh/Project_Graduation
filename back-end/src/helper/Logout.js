function logout(req, res) {
    res.cookie("jwtToken", '', {
        maxAge: 0
    });

    return res.send({ message: "success"})
}

module.exports = logout;