import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';



class Preview extends React.Component {
  

  render() {
      return(
      <View style={{flex:1}}>
         <View  style={{flex:5}}><Image style={{flex:1}} source={{uri:this.props.imageUri}}/></View> 
         <View style={{flex:3, flexDirection:'row',justifyContent:'space-around', alignItems:'center'}}>
         <TouchableOpacity onPress={()=>{this.props.cancel;this.props.navigation.navigate('CameraExample'); }}>
             <AntDesign
             name='closecircle'
             size={50}
             /></TouchableOpacity>

            <TouchableOpacity onPress={()=>{this.props.sendUri;this.props.navigation.navigate('BeDonor'); }}>
             <AntDesign
             name='checkcircle'
             size={50}
             
             /></TouchableOpacity>

             </View> 
      
      </View>
      )
  }
}

export default Preview;