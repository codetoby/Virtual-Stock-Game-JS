module.exports = function isAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        if (authHeader === "Bearer dsfsew234234sdfs7fd9s7f923fsd") {
            next()
        } else {
            res.sendStatus(403)
        }
    } else {
        res.sendStatus(401);
    }
}