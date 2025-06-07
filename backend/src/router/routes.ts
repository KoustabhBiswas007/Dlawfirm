import { Request, Response } from "express";
import cors from 'cors';
import express from "express";
import { Accesstoken } from "../controllers/authentication/Accesstoken";
import { Login } from "../controllers/authentication/Login";
export const routes = express.Router();
 
routes.get("/",(req:Request,res:Response)=>{
    res.send("Hello World!");
});
routes.get('/getAccessToken',(req:Request,res:Response)=>{

    const accesstoken = new Accesstoken();
    accesstoken.getAccessToken(req.body).then((result)=>{
        res.status(result.statusCode).send(result);
        
    });
});

routes.get('/getRefreshToken',(req:Request,res:Response)=>{

    const accesstoken = new Accesstoken();
    accesstoken.getRefreshToken(req.body).then((result)=>{
        res.status(result.statusCode).send(result);
        
    });
});

routes.post('/login', (req: Request, res: Response) => {
    const loginObj = new Login();
    loginObj.login(req.body).then((result) => {
        // console.log(result);
        res.status(result.statusCode).send(result);
    });


     
    
})