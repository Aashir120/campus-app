import React from 'react';
import { Text, View, FlatList,StyleSheet,Image,Picker} from 'react-native';
import noPhotoAvailable from './assets/noPhotoAvailable.png'
import { connect } from 'react-redux';

class ViewPresent extends React.Component {
    state={
        Category:'user',
        fullName:'a',
          contact:'11',
          address:'aaa',
          age:'22',
          Department:'BSCS',
          company_name:'hello',
          timing:'full-time',
          salary:'45k',
          tity:'karachi',
          exp:'2 years'
      }

render() {
        return (
            <View style={styles.modalcontainer}>
            <View style = {{marginBottom:10,flexDirection:'row'}}>
            <Text style= {styles.signUpText}>Category:</Text>
          <Picker
            selectedValue={this.state.Category}
            style={{height: 50, width: 150, color:'white'}}
            color=''
            prompt='Catergory'
            onValueChange={(itemValue, itemIndex) =>
                  this.setState({Category: itemValue})
            }>
              <Picker.Item label="select role" value="" />
              <Picker.Item label="user" value="user" />
              <Picker.Item label="company" value="company" />
            </Picker></View>
            {(this.state.Category === "user") ?( 
          <View style={styles.container}>
          <FlatList
                data = {this.props.allstudents}
                renderItem = {({item})=>( <View style={{ flex: 1 }}>
                
                   <View  style={{ backgroundColor:'#F5F5F5',flexDirection:'row', borderColor :'black', borderWidth: 1 , flexWrap : 'wrap', padding: 2,justifyContent : 'space-between' }} >
                <View style = {{flexDirection : 'row', }}>
                        <View style={{justifyContent:'center'}} >
                            {(item.url !== undefined && item.url !== null && item.url !== '')
                        ?<Image style={{width: 120,height:120, alignSelf:'center', borderRadius:120}} source={{uri:item.url}}/>
                    :<Image style={{width: 120,height:120, alignSelf:'center', borderRadius:120}} source={noPhotoAvailable}/>}
                        </View>
                        <View style={{padding:2, marginLeft:10}}>
                    <Text style={{ fontSize:22 }}>{item.fullName}</Text>
                    <View style={{flexDirection:'row'}}><Text>Contact: </Text><Text style={{ fontSize:17 }}>{item.contact}</Text></View>
                    <View style={{flexDirection:'row'}}><Text>Age: </Text><Text style={{ fontSize:17 }}>{item.age}</Text></View>
                    <View style={{flexDirection:'row'}}><Text>Department: </Text><Text style={{ fontSize:17,fontStyle:'italic',color:'blue' }}>{item.Department}</Text></View>
                    <Text style={{ fontSize:12,fontStyle:'italic',color:'grey' }}>{item.address}</Text>
                    </View></View>
                   </View>
                </View>)}
                />                  
          </View>):(
              <View style={styles.container}>
              <FlatList
                    data = {this.props.allcompanies}
                    renderItem = {({item})=>( <View style={{ flex: 1 }}>
                    
                       <View  style={{ backgroundColor:'#F5F5F5',flexDirection:'row', borderColor :'black', borderWidth: 1 , flexWrap : 'wrap', padding: 2,justifyContent : 'space-between' }} >
                    <View style = {{flexDirection : 'row', }}>
                            <View style={{justifyContent:'center'}} >
                                {(item.url !== undefined && item.url !== null && item.url !== '')
                            ?<Image style={{width: 120,height:120, alignSelf:'center', borderRadius:120}} source={{uri:item.url}}/>
                        :<Image style={{width: 120,height:120, alignSelf:'center', borderRadius:120}} source={noPhotoAvailable}/>}
                            </View>
                            <View style={{padding:2, marginLeft:10}}>
                        <Text style={{ fontSize:22 }}>{item.company_name}</Text>
                        <View style={{flexDirection:'row'}}><Text>Timing: </Text><Text style={{ fontSize:17 }}>{item.timing}</Text></View>
                        <View style={{flexDirection:'row'}}><Text>Salary: </Text><Text style={{ fontSize:17 }}>{item.salary}</Text></View>
                        <View style={{flexDirection:'row'}}><Text>City: </Text><Text style={{ fontSize:17,fontStyle:'italic',color:'blue' }}>{item.city}</Text></View>
                        <View style={{flexDirection:'row'}}><Text>Experience in year: </Text><Text style={{ fontSize:17,fontStyle:'italic',color:'blue' }}>{item.exp}</Text></View>
                        </View>
                        </View>
                       </View>
                    </View>)}
                    />
                    </View>)} 
          )
          </View>
        )
    }
}


function mapStateToProps(state){
    return({
        allstudents: state.basicInfo.allstudents,
        allcompanies:state.basicInfo.allcompanies
    })
}
function mapDispatchToProps(dispatch){
    return({

    })
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewPresent);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',    
      },
   
})
















