
class NewController {
    RenderNew(req, res){
        res.send("Trang thông tin");
    }

    ShowSlug(req, res){
        res.send("Test slug: " )
    }
}

module.exports = new NewController;
