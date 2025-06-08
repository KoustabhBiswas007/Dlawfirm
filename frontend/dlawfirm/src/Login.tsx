import React from 'react'
import { StyleSheet, Text, TextInput, useWindowDimensions, View,Button, TouchableOpacity } from 'react-native'

export const Login = () => {
    const { width, height } = useWindowDimensions();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FBFBFE',
        },
        box: {

            width: width * 0.9,
            height: height * 0.4,
            backgroundColor: 'blue',
            borderRadius: 10,

        },
        header: {
            flex: 0.13,
            flexDirection: 'row',
            backgroundColor: '#0597c1',

            alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10

        },
        headerText: {
            fontWeight: 'bold',
            fontSize: 20,
            color: 'white',
        },
        body: {
            flex: 0.9,
            flexDirection: 'column',
            backgroundColor: 'white',
            boxShadow: '5px 7px 30px grey',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            padding: 10,
        },
        bodyBox:{
            width: '100%',
            marginBottom: 30
        },
        textinput: {
            width: '100%',
            borderWidth: 1,
            borderColor: '#0597c1',
            borderStyle: 'dotted',
            borderRadius: 5,
        },
        button:{
            backgroundColor: '#0597c1',
            padding: 10, 
            alignItems: 'center',
        
        }

    })
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Login</Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.bodyBox}>
                        <TextInput placeholder="Enter Username" style={styles.textinput} />
                    </View>
                    <View style={styles.bodyBox}> 
                        <TextInput placeholder="Enter Password" style={styles.textinput} />
                    </View>
                    <View style={styles.bodyBox}>
                        <TouchableOpacity style={styles.button}> 
                            <Text style={{color: 'white',fontWeight:'bold'}} >Sign IN</Text>
                        </TouchableOpacity>
                         
                    </View>
                </View>
            </View>
        </View>
    )
}


