import React from 'react';
import { Text, View, TouchableOpacity ,StyleSheet,Image} from 'react-native';
import Member from '../../images/member.png'
import data from '../../images/data.png'
class Home extends React.Component {

render() {
        return (
         
          <View style={styles.container}>
            <View style={{flexDirection:'row', marginBottom:20}}>
          <View style={{flex :1,paddingLeft:20}} >
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('ViewDonor')}>
                     <View><View style={{justifyContent:'center',alignSelf:'center',borderColor:'blue',borderWidth:2,height:80,width:80,borderRadius:80}}><Image style={{width:50,height:50, alignSelf : 'center'}} source={data}/></View><Text style={{alignSelf:'center'}}>View All Data</Text></View>
              </TouchableOpacity>
          </View>
          </View>
          <View style={{flexDirection:'row'}}>
          <View style={{flex:1, justifyContent:'center'}} >
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('BeMember')}>
                      <View><Image style={{height:80,width:80,borderRadius:80,borderColor:'blue',borderWidth:2, alignSelf : 'center'}} source = {Member}/><Text style={{alignSelf:'center'}}>Be a Member</Text></View>
            </TouchableOpacity>
            </View>
         
            </View>
            <View style={{flex: 1,width:360}}>
<View style={styles.footer}><Text style={styles.footerText}>copyright ℗ Syed Aashir Majeed</Text></View>
</View>
              
          </View>
        )
    }
}




export default Home;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems : 'center',
        marginTop:120,
        justifyContent: 'center',
      },
       footer:{
    position: 'absolute',
    left: 0,
    right: 0,
    color:'#fff',
    bottom: 0,
    backgroundColor:'blue'
  },
  footerText:{
    color:'#fff',
    textAlign:'center',
    fontFamily:'sans-serif',
    fontWeight:'bold',
    justifyContent:'center'
  },
   
})
















