module.exports = {
    showHome: showHome
};

function showHome(req, res) {
    const sess = req.session;
    if (sess.currentUser) {
        res.render('pages/home');
    } else {
        res.render('pages/login');
    }
}
