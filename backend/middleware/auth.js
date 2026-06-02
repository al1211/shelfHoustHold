import jwt from "jsonwebtoken"
import dotevn from "dotenv"
dotevn.config();
export const middleware=async(req,res,next)=>{
  const token=req.cookies?.token;
  if(!token){
    res.status(401).json({
        message:"access denied"
    })
  };

   try {
        const verified = jwt.verify(token, process.env.PRIVATEKEY);
        req.user = verified; // Attach user payload to the request
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid or expired token' });
    }
 next();
}