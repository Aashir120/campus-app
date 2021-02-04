import firebase from 'firebase';
require("firebase/firestore");
import {ToastAndroid} from 'react-native';

var firebaseConfig = {
    apiKey: "AIzaSyBwGPSZkKsJdKXuzVI2onNehfQ1MR736QM",
    authDomain: "blood-bank-app-f6954.firebaseapp.com",
    databaseURL: "https://blood-bank-app-f6954-default-rtdb.firebaseio.com",
    projectId: "blood-bank-app-f6954",
    storageBucket: "blood-bank-app-f6954.appspot.com",
    messagingSenderId: "999992734339",
    appId: "1:999992734339:web:9226f4e27bc398916221b6"
  };
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export function signup(email,password,fullname,nav) {
    return (dispatch) => {
        console.log(email, password);
        dispatch({ type: 'CHANGE_LOADING_STATE' })
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            console.log(user);
                
                db.collection("users").add({
                    email,password,fullname,
                    uid : user.user.uid,
                }).then(function (docRef) {
                    dispatch({ type: 'LOGGEDIN_USER', payload: { email,password,fullname}})
                    dispatch({ type: 'CHANGE_LOADING_STATE' });
                    dispatch(getdonors())
                    nav.navigate('App')
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
                                var  { email,password,fullname} = userDoc.data()
                                dispatch({ type: 'LOGGEDIN_USER', payload: { email,password,fullname}});
                                dispatch({ type: 'CHANGE_LOADING_STATE' });
                                dispatch(getdonors())
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




var alldonors =[]
function getdonors(){
return(dispatch) =>{
 
    
   firebase.firestore().collection("Donors").get().then(snapshot => {
       snapshot.docs.forEach(doc => {
        
         const comment = doc.data()
         alldonors.push(comment)
        })
        
        dispatch({type:'LIST_DONORS' , payload:alldonors})
        alldonors =[]
    })
    console.log("all",alldonors)
   console.log("dispatched")
}
}
 export function addpic(fullName , contact , address,age,bloodType,uri,nav){

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
                   
                  
                         firebase.firestore().collection("Donors").add({
                             fullName,
                             contact , address,age,bloodType,
                             url:downloadURL,
                             
                             
                         }).then(function (docRef) {
                             dispatch({ type: 'CHANGE_LOADING_STATE' });
                             
                            ToastAndroid.show('Donor added', ToastAndroid.SHORT);
                             
                             nav.navigate('Home')
                             dispatch(getdonors());
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
       