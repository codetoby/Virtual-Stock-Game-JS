module.exports = {
    isAuthenticated: function (req, res, next)  {
        return req.user ? 
        res.send({success: true})
        : 
        res.send({success: false})
}}