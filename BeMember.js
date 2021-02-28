import React from 'react';
import { Text, View, TouchableHighlight ,StyleSheet,Platform,Image,Picker} from 'react-native';
import { connect } from 'react-redux';
import {TextInput} from 'react-native-gesture-handler'
import {AntDesign} from '@expo/vector-icons'
import CameraExample from './Camera'
import ImaagePickerExample from './ImagePicker'
import {addpic,addpic2} from './redux/actions/action'
const IS_ANDROID = Platform.OS === 'android'
require("firebase/firestore");

class BeMember extends React.Component {
  state={
    Category:'user'
  }
  render() {
           return(
             <View style={styles.modalcontainer}>
            <View style = {{marginBottom:10,flexDirection:'row'}}>
            <Text style= {styles.signUpText}>Category:</Text>
          <Picker
            selectedValue={this.state.Category}
            style={{height: 50, width: 150, color:'white'}}
            color=''
            prompt='Category Type'
            onValueChange={(itemValue, itemIndex) =>
                  this.setState({Category: itemValue})
            }>
              <Picker.Item label="select role" value="" />
              <Picker.Item label="user" value="user" />
              <Picker.Item label="company" value="company" />
            </Picker></View>
            {(this.state.Category === "user") ?( 
           <View style={styles.modalcontainer}>
        <View style={{marginBottom:10}}>
          {(this.props.imageUri === '')
          ?(<View style={{flexDirection:'row',justifyContent:'space-evenly'}}><View  style={{backgroundColor:'black', height:80,width:80,justifyContent:'center',borderRadius: 80,alignItems:'center', marginRight:10}}><AntDesign name='camera' size={50} color ='white' onPress={()=>this.props.navigation.navigate('CameraExample')}/></View><ImaagePickerExample/></View>)
           :   <Image style={{width:150,height:150,borderRadius:150}} source ={{uri:this.props.imageUri}}/>}
        </View>
            <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Full name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(fullName) => this.setState({fullName})}/>
        </View>
              <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/material-rounded/96/000000/phone--v1.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Contact"
              keyboardType="phone-pad"
              underlineColorAndroid='transparent'
              onChangeText={(contact) => this.setState({contact})}/>
        </View>
              <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ios-filled/100/000000/address.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Address"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(address) => this.setState({address})}/>
        </View>
              <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/material-rounded/192/000000/age.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Age"
              keyboardType="phone-pad"
              underlineColorAndroid='transparent'
              onChangeText={(age) => this.setState({age})}/>
        </View>
        <View style = {{marginBottom:20,flexDirection:'row'}}>
          <Text style= {styles.signUpText}>Department:</Text>
        <Picker
          selectedValue={this.state.Department}
          style={{height: 50, width: 80, color:'black'}}
          color='black'
          prompt='Department'
          onValueChange={(itemValue, itemIndex) =>
                this.setState({Department: itemValue})
          }>
            <Picker.Item label="BSCS" value="BSCS" />
            <Picker.Item label="BSSE" value="BSSE" />
            <Picker.Item label="BEEE" value="BEEE" />
            <Picker.Item label="BASA" value="BASA" />
            <Picker.Item label="BECE" value="BECE" />
            <Picker.Item label="BABC" value="BABC" />
            <Picker.Item label="BMCH" value="BMCH" />
          </Picker></View>
            
            
<View style={{flexDirection:'row', 
        justifyContent: 'space-around',}}>
              <TouchableHighlight style={[styles.buttonContainer, styles.signupButton,{marginRight:10}]}
                onPress={()=>{
                  this.props.addStudent(this.state.fullName,this.state.contact,this.state.address,this.state.age,this.state.Department,this.props.imageUri,this.props.navigation)
                }}>
                <Text>Add Student</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]}
                onPress={() => {
                 this.props.navigation.navigate('Home');
                }}>
                <Text>Cancel</Text>
              </TouchableHighlight>
</View>
{(this.props.loader === true)?(
                      <View style={{alignItems:'center'}}>
                      <Image source={Loader} style={{height:50,width:50,alignSelf:'center'}}/>
                    </View>): null
        }
          </View>):(
          <View style={styles.modalcontainer}>
          <View style={{marginBottom:20}}>
            {(this.props.imageUri === '')
            ?(<View style={{flexDirection:'row',justifyContent:'space-evenly'}}><View  style={{backgroundColor:'black', height:80,width:80,justifyContent:'center',borderRadius: 80,alignItems:'center', marginRight:10}}><AntDesign name='camera' size={50} color ='white' onPress={()=>this.props.navigation.navigate('CameraExample')}/></View><ImaagePickerExample/></View>)
             :   <Image style={{width:150,height:150,borderRadius:150}} source ={{uri:this.props.imageUri}}/>}
          </View>
              <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>
            <TextInput style={styles.inputs}
                placeholder="Company Name"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(company_name) => this.setState({company_name})}/>
          </View>
                <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/material-rounded/96/000000/phone--v1.png'}}/>
            <TextInput style={styles.inputs}
                placeholder="timing"
                keyboardType="text"
                underlineColorAndroid='transparent'
                onChangeText={(timing) => this.setState({timing})}/>
          </View>
                <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ios-filled/100/000000/address.png'}}/>
            <TextInput style={styles.inputs}
                placeholder="salary"
                keyboardType="phone-pad"
                underlineColorAndroid='transparent'
                onChangeText={(salary) => this.setState({salary})}/>
          </View>
                <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/material-rounded/192/000000/age.png'}}/>
            <TextInput style={styles.inputs}
                placeholder="City"
                keyboardType="text"
                underlineColorAndroid='transparent'
                onChangeText={(city) => this.setState({city})}/>
          </View>
          <View style = {{marginBottom:20,flexDirection:'row'}}>
            <Text style= {styles.signUpText}>Experience:</Text>
          <Picker
            selectedValue={this.state.exp}
            style={{height: 50, width: 80, color:'black'}}
            color='black'
            prompt='Experience in year'
            onValueChange={(itemValue, itemIndex) =>
                  this.setState({exp: itemValue})
            }>
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
            </Picker></View>
              
              
  <View style={{flexDirection:'row', 
          justifyContent: 'space-around',}}>
                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton,{marginRight:10}]}
                  onPress={()=>{
                    this.props.addCompany(this.state.company_name,this.state.timing,this.state.salary,this.state.city,this.state.exp,this.props.imageUri,this.props.navigation)
                  }}>
                  <Text>Add Company</Text>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]}
                  onPress={() => {
                   this.props.navigation.navigate('Home');
                  }}>
                  <Text>Cancel</Text>
                </TouchableHighlight>
  </View>
  {(this.props.loader === true)?(
                        <View style={{alignItems:'center'}}>
                        <Image source={Loader} style={{height:50,width:50,alignSelf:'center'}}/>
                      </View>): null
          }
            </View>)}
          </View>
           )
            }
        }




function mapStateToProps(state){
    return({
imageUri : state.basicInfo.uri,
    })
}
function mapDispatchToProps(dispatch){
            return({
                addStudent :(fullName , contact , address,age,Department,url,nav)=> {
                 
                    dispatch(addpic(fullName , contact , address,age,Department,url,nav))},
                addCompany :(company_name , timing , salary,city,exp,url,nav)=> {
    
                  dispatch(addpic2(company_name , timing , salary,city,exp,url,nav))
                  }
                }
                
            )
          }
          

export default connect(mapStateToProps,mapDispatchToProps)(BeMember)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
        backgroundColor: 'blue',
      },
    buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:100,
        borderRadius:30,
      },
      inputContainer: {
        backgroundColor: 'blue',
        width:250,
        flexDirection: 'row',
        alignItems:'center',
        height: 45,
    marginBottom: 12,
    
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1
    },
    inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
      },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
        margin: IS_ANDROID ? -1 : 0,
    height: 38,
    padding: 7
    },
      signupButton: {
        backgroundColor: "#ffffff",
      },
      signUpText: {
        color: 'black',
        marginTop:10
      }
})


