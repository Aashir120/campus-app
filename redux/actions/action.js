import firebase from 'firebase';
require("firebase/firestore");
import {ToastAndroid} from 'react-native';

var firebaseConfig = {
    apiKey: "AIzaSyBwGPSZkKsJdKXuzVI2onNehfQ1MR736QM",
    authDomain: "campus-app-f6954.firebaseapp.com",
    databaseURL: "https://campus-app-f6954-default-rtdb.firebaseio.com",
    projectId: "campus-app-f6954",
    storageBucket: "campus-app-f6954.appspot.com",
    messagingSenderId: "999992734339",
    appId: "1:999992734339:web:9226f4e27bc398916221b6"
  };
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export function signup(email,password,fullname,Category,nav) {
    return (dispatch) => {
        dispatch({ type: 'CHANGE_LOADING_STATE' })
        console.log("cccccccccccc")
        console.log(email, password,Category,nav);
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            console.log(user);
                
                db.collection("users").add({
                    email,password,fullname,Category,
                    uid : user.user.uid,
                }).then(function (docRef) {
                    dispatch({ type: 'LOGGEDIN_USER', payload: { email,password,fullname,Category}})
                    dispatch({ type: 'CHANGE_LOADING_STATE' });
                    dispatch(getstudents())
                    dispatch(getcompanies())
                    location.reload()
                })
                
            })
            .catch(error=>{ 
                alert(error);
                dispatch({ type: 'CHANGE_LOADING_STATE' });
            })
        }
}



export function signin(email, password,nav) {
    return (dispatch) => {
        dispatch({ type: 'CHANGE_LOADING_STATE' })
        console.log("cccccccccccc")
        
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            
            console.log("cccccccccccc")
            db.collection("users").where("uid", "==", user.user.uid)
            .get()
            .then(function (userSnapshot) {
                            userSnapshot.forEach(function (userDoc) {
                                var  { email,password,fullname,Category} = userDoc.data()
                                dispatch({ type: 'LOGGEDIN_USER', payload: { email,password,fullname,Category}});
                                dispatch({ type: 'CHANGE_LOADING_STATE' });
                                dispatch(getstudents())
                                dispatch(getcompanies())
                                nav.navigate('App')
                                
                            });
                        })
            })
            .catch(error=>{
                alert(error);
                dispatch({ type: 'CHANGE_LOADING_STATE' });
            })
        
    }
}


var allstudents =[]
function getstudents(){
return(dispatch) =>{
 
    
   firebase.firestore().collection("Students").get().then(snapshot => {
       snapshot.docs.forEach(doc => {
        
         const comment = doc.data()
         allstudents.push(comment)
        })
        
        dispatch({type:'LIST_STUDENTS' , payload:allstudents})
        allstudents =[]
    })
    console.log("all",allstudents)
   console.log("dispatched")
}
}
var allcompanies =[]
function getcompanies(){
return(dispatch) =>{
 
    
   firebase.firestore().collection("Companies").get().then(snapshot => {
       snapshot.docs.forEach(doc => {
        
         const comment = doc.data()
         allcompanies.push(comment)
        })
        
        dispatch({type:'LIST_COMPANIES' , payload:allcompanies})
        allcompanies =[]
    })
    console.log("all",allcompanies)
   console.log("dispatched")
}
}
 export function addpic(fullName , contact , address,age,Department,uri,nav){

            return async (dispatch)=>    { 
                dispatch({ type: 'CHANGE_LOADING_STATE' });
                console.log("[[[")
                console.log("uploadAsFile", uri)
                 const response = await fetch(uri);
                 const blob = await response.blob();
               
                 var metadata = {
                   contentType: 'image/jpeg',
                 };
               
                 let name = new Date().getTime() + "-media.jpg"
                 const stref = firebase
                   .storage()
                   .ref()
                   .child('assets/' + name)
               
                 stref.put(blob, metadata)
               .then(function(imageSnapshot) {
                 imageSnapshot.ref.getDownloadURL()
                 .then((downloadURL)=>{
                   console.log('File available at', downloadURL);
                   
                  
                         firebase.firestore().collection("Students").add({
                             fullName,
                             contact , address,age,Department,
                             url:downloadURL,
                             
                             
                         }).then(function (docRef) {
                             dispatch({ type: 'CHANGE_LOADING_STATE' });
                             
                            ToastAndroid.show('Student added', ToastAndroid.SHORT);
                             
                             nav.navigate('Home')
                             dispatch(getstudents());
                             dispatch({type:'URI', payload:''})
                            })
                            .catch((e)=>{
                                dispatch({type:'URI', payload:''})
                                dispatch({ type: 'CHANGE_LOADING_STATE' });
                                dispatch({type:'Error', payload:e})
                                
                         })
                     })
                     
              })}
             }
export function addpic2(company_name , timing , salary,city,exp,uri,nav){

return async (dispatch)=>    { 
    dispatch({ type: 'CHANGE_LOADING_STATE' });
    console.log("[[[")
    console.log("uploadAsFile", uri)
        const response = await fetch(uri);
        const blob = await response.blob();
    
        var metadata = {
        contentType: 'image/jpeg',
        };
    
        let name = new Date().getTime() + "-media.jpg"
        const stref = firebase
        .storage()
        .ref()
        .child('assets/' + name)
    
        stref.put(blob, metadata)
    .then(function(imageSnapshot) {
        imageSnapshot.ref.getDownloadURL()
        .then((downloadURL)=>{
        console.log('File available at', downloadURL);
        
        
                firebase.firestore().collection("Companies").add({
                    company_name,
                    timing , salary,city,exp,
                    url:downloadURL,
                    
                    
                }).then(function (docRef) {
                    dispatch({ type: 'CHANGE_LOADING_STATE' });
                    
                ToastAndroid.show('Company added', ToastAndroid.SHORT);
                    
                    nav.navigate('Home')
                    dispatch(getcompanies());
                    dispatch({type:'URI', payload:''})
                })
                .catch((e)=>{
                    dispatch({type:'URI', payload:''})
                    dispatch({ type: 'CHANGE_LOADING_STATE' });
                    dispatch({type:'Error', payload:e})
                    
                })
            })
    })}
    }
       