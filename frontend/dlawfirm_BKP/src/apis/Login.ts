import axios from "axios";
import { LoginInterface } from "../interfaces/LoginInterface";

export class LoginApi{
     validateUser(data:LoginInterface)
    {
        console.log("Data" + JSON.stringify(data));
       return axios.post("http://192.168.150.223:3000/login",{"email":data.username, "password":data.password},{
            headers:{
                'Content-Type':'application/json'
            }
        }); 
    }
}