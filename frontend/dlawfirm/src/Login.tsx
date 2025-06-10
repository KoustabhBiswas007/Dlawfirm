import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import { LoginStyles } from './assets/styles/Login';
import { LoginInterface } from './interfaces/LoginInterface';
import { LoginApi } from './apis/Login';
import RNSimpleCrypto from 'react-native-simple-crypto';


export const Login = () => {
    const initialData:LoginInterface = {username:'', password:''};
    const [formData, setFormData] = useState<LoginInterface>(initialData);
     
    const handleData = (name:string,value:string) => {
        setFormData({...formData,[name]:value});
        console.log(formData);
    }
    const handleSubmit = async () => {
        // const password =await  RNSimpleCrypto.SHA.sha256(formData.password);
        console.log(formData.password);
        console.log("TEST");
        const loginApiObj = new LoginApi();
        console.log("TEST1");
        loginApiObj.validateUser(formData).then((resp)=>{
            console.log(resp.data);
        }).catch(error=>{
            console.log(error);
        });
        console.log("TEST3");
        // console.log(formData);
        // console.log(resp);
    }
    

    const styles = LoginStyles();
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Login</Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.bodyBox}>
                        <TextInput placeholder="Enter Username" style={styles.textinput} onChangeText={(text)=>handleData('username',text)}/>
                    </View>
                    <View style={styles.bodyBox}>
                        <TextInput placeholder="Enter Password" style={styles.textinput} onChangeText={(text)=>handleData('password',text)}/>
                    </View>
                    <View style={styles.bodyBox}>
                        <TouchableOpacity style={styles.button} onPress={()=>{handleSubmit()}}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }} >Sign IN</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </View>
    )
}


