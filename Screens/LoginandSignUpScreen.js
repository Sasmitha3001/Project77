import React, { Component } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import {Header} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import firebase from 'firebase';
import db from '../config'



export default class LoginAndSignUpScreen extends Component{
  constructor(){
    super()
    this.state={
      email:"",
      password:"",
      username:"",
      firstName:"",
      lastName:"",
      isModalVisible:'false'
    }
  }
  userSignUp=(email,password)=>{
    console.log("signupfunction")
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(()=>{
      db.collection('users').add({
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      email:this.state.email,
      password:this.state.password,
      username:this.state.username 
      })
     alert("User added successfully")

    })

    
    .catch((error)=>{
      var errorCode=error.code
      var errorMessage=error.message

      return Alert.alert(errorMessage)
    })
  }

  userLogin=(email,password)=>{
    firebase.auth().signInUserWithEmailAndPassword(email,password)
    .then(()=>{
     
    })

    .catch((error)=>{
      var errosCode=error.code
      var errorMessage=error.message
      
      return Alert.alert(errorMessage)
    })
  }
  showModal=()=>{
    <Modal
    style={styles.modal}
    visible={this.state.isModalVisible}
    >
    <KeyboardAvoidingView>
    <TextInput
        style={styles.inputEmail}
        placeholder={"Enter email id"}
        onChangeText={(text)=>{this.setState({
          email:text
        })}}/>

        <TextInput
        style={styles.inputpassword}
        placeholder={"Enter password"}
        onChangeText={(text)=>{this.setState({
          password:text
        })}}/>

        <TouchableOpacity
        style={styles.login}
        onPress={()=>this.userLogin(email,password)}
        >
          <Text>Login</Text>
        </TouchableOpacity>

    </KeyboardAvoidingView>
    </Modal>

  }
  
  render(){
    return(
      <SafeAreaProvider>
        <View style={styles.container}>

        <Text style={styles.header}>Barter System</Text>

        <TextInput
        style={styles.inputFirstName}
        placeholder={"Enter First Name"}
        maxLength={8}
        onChangeText={(text)=>{this.setState({
          firstName:text
        })}}/>

      <TextInput
        style={styles.inputLastName}
        placeholder={"Enter Last Name "}
        maxLength={10}
        onChangeText={(text)=>{this.setState({
          lastName:text
        })}}/>

        <TextInput
        style={styles.inputEmail}
        placeholder={"Enter email id"}
        keyboardType={'email-address'}
        onChangeText={(text)=>{this.setState({
          email:text
        })}}/>

        <TextInput
        style={styles.inputpassword}
        placeholder={"Enter password"}
        secureTextEntry={true}
        onChangeText={(text)=>{this.setState({
          password:text
        })}}/>

        <TextInput
        style={styles.inputUsername}
        placeholder={"Enter username"}
        onChangeText={(text)=>{this.setState({
          username:text
        })}}/>

      <TouchableOpacity 
      style={styles.signInButton}
      onPress={()=>{this.userSignUp(this.state.email,this.state.password)}}
      >
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.message}>Already have an account ?</Text>

      <TouchableOpacity
      style={styles.loginButton}
      onPress={()=>{this.setState({isModalVisible:"true"})}}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      </View>
      </SafeAreaProvider>
      

    )
  }
}

const styles=StyleSheet.create({
  inputUsername:{
    height:25,
    width:350,
    alignItems:'center',
    borderBottomWidth:1,
    marginTop:50,
    alignSelf:'center'
  },
  inputpassword:{
    height:25,
    width:350,
    alignItems:'center',
    borderBottomWidth:1,
    marginTop:50,
    alignSelf:'center'
  },
  inputFirstName:{
    height:25,
    width:350,
    alignItems:'center',
    borderBottomWidth:1,
    alignSelf:'center',
    marginTop:50
   
  },
  inputEmail:{
    height:25,
    width:350,
    alignItems:'center',
    borderBottomWidth:1,
    marginTop:50,
    alignSelf:'center'

  },
  inputLastName:{
    height:25,
    width:350,
    alignItems:'center',
    borderBottomWidth:1,
    marginTop:50,
    alignSelf:'center'
  },
  signInButton:{
    width:150,
    height:35,
    borderRadius:25,
    backgroundColor:'#0099FF',
    alignSelf:'center',
    marginTop:25
  },
  loginButton:{
    width:100,
    height:35,
    borderRadius:25,
    backgroundColor:'#0099FF',
    alignSelf:'center',
    marginTop:10
  },
  modal:{
    flex:1,
    justifyContent:'center',
  },
  container:{
    flex:1,
    justifyContent:'center'
  },
  message:{
    alignSelf:'center',
    marginTop:70,
    color:'red',
    fontSize:20,
  },
  signInButtonText:{
    alignSelf:'center',
    color:'white',
    fontSize:20,
    marginTop:2
  },
  loginButtonText:{
    alignSelf:'center',
    color:'white',
    fontSize:20,
    marginTop:2

  },
  header:{
    color:'#682CBF',
    alignSelf:'center',
    fontSize:72,
    fontFamily:'Comic-Sans'
  }

})