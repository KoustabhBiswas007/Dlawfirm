import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import { LoginStyles } from './assets/styles/Login';
import { LoginInterface } from './interfaces/LoginInterface';


export const Login = () => {
    const initialData:LoginInterface = {username:'', password:''};
    const [formData, setFormData] = useState<LoginInterface>(initialData);
     
    const handleData = (name:string,value:string) => {
        setFormData({...formData,[name]:value});
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
                        <TextInput placeholder="Enter Password" style={styles.textinput} />
                    </View>
                    <View style={styles.bodyBox}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }} >Sign IN</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </View>
    )
}


