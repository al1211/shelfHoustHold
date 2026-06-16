import jwt from "jsonwebtoken"
import dotevn from "dotenv"
dotevn.config();
export const middleware=async(req,res,next)=>{
  const token= req.headers.authorization?.split(' ')[1];
  if(!token){
    res.status(401).json({
        message:"access denied"
    })
    return;
  };

   try {
        const verified = jwt.verify(token, process.env.PRIVATEKEY);
        req.user = verified; // Attach user payload to the request
        
    } catch (err) {
      return  res.status(403).json({ error: 'Invalid or expired token' });
    }
 next();
}