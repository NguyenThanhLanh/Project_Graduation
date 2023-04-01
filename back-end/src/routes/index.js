
function route(app){
      
    app.use('/search', (req, res) => {
        res.send("Trang tìm kiếm");
    })

    app.use('/', (req, res) => {
        res.send("Trang chủ");
    })

}

module.exports = route;
