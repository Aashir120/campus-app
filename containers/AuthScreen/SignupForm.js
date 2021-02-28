import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet,Picker } from 'react-native'
import { Text, View } from 'react-native-animatable'
import metrics from '../../config/metrics'
import CustomButton from '../../components/CustomButton'
import CustomTextInput from '../../components/CustomTextInput'
import { connect } from 'react-redux';

class SignupForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onSignupPress: PropTypes.func.isRequired,
    onLoginLinkPress: PropTypes.func.isRequired
  }

  state = {
    email: '',
    password: '',
    fullName: '',
    Category:'',
    
  }
  hideForm = async () => {
    if (this.buttonRef && this.formRef && this.linkRef) {
      await Promise.all([
        this.buttonRef.zoomOut(200),
        this.formRef.fadeOut(300),
        this.linkRef.fadeOut(300)
      ])
    }
  }

  render () {
    const { email, password, fullName,Category } = this.state
    const { isLoading, onLoginLinkPress, onSignupPress,nav } = this.props
    const isValid = email !== '' && password !== '' && fullName !== '' && Category !== ''
    return (
      <View style={styles.container}>
        <View style={styles.form} ref={(ref) => this.formRef = ref}>
          <CustomTextInput
            ref={(ref) => this.mobileInputRef = ref}
            placeholder={'Full name'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.emailInputRef.focus()}
            onChangeText={(value) => this.setState({ fullName: value })}
            isEnabled={!isLoading}
          />
          <CustomTextInput
            ref={(ref) => this.emailInputRef = ref}
            placeholder={'Email'}
            keyboardType={'email-address'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.passwordInputRef.focus()}
            onChangeText={(value) => this.setState({ email: value })}
            isEnabled={!isLoading}
          />
          <CustomTextInput
            ref={(ref) => this.passwordInputRef = ref}
            placeholder={'Password'}
            editable={!isLoading}
            returnKeyType={'next'}
            secureTextEntry={true}
            withRef={true}
            onSubmitEditing={() => this.contactInputRef.focus()}
            onChangeText={(value) => this.setState({ password: value })}
            isEnabled={!isLoading}
          />
          <View style = {{marginBottom:20,flexDirection:'row'}}>
          <Text style= {styles.signUpText}>Category:</Text>
        <Picker
          selectedValue={this.state.Category}
          style={{height: 40, width: 150, color:'black'}}
          color='black'
          prompt='Category'
          onValueChange={(itemValue, itemIndex) =>
                this.setState({Category: itemValue})
          }>
            <Picker.Item label="User" value="User" />
            <Picker.Item label="Company" value="Company" />
          </Picker></View>
         
        </View>
        <View style={styles.footer}>
          <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
            <CustomButton
              onPress={() => onSignupPress(email,password,fullName,Category,nav)}
              isEnabled={isValid}
              isLoading={isLoading}
              buttonStyle={styles.createAccountButton}
              textStyle={styles.createAccountButtonText}
              text={'Create Account'}
            />
          </View>
          <Text
            ref={(ref) => this.linkRef = ref}
            style={styles.loginLink}
            onPress={onLoginLinkPress}
            animation={'fadeIn'}
            duration={600}
            delay={400}
          >
            {'Already have an account?'}
          </Text>
        </View>
      </View>
    )
  }
}
function mapstate(state){
  return({
    isLoading:state.basicInfo.isLoading,

  })
}
export default connect(mapstate)(SignupForm)
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1
  },
  form: {
    marginTop: 20
  },
  footer: {
    height: 100,
    justifyContent: 'center'
  },
  createAccountButton: {
    backgroundColor: 'white'
  },
  createAccountButtonText: {
    color: '#3E464D',
    fontWeight: 'bold'
  },
  loginLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20
  },
  signUpText:{
    color:'white'
  }
})
