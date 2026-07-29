const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({ status:"error", message:"Token Missing" });
        }
        const token = authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({ status:"error", message:"Invalid Token Format" });
        }
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({ status:"error", message:"Token Expired or Invalid" });
    }
}