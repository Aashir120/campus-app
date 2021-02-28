import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {Platform, KeyboardAvoidingView,LayoutAnimation ,StyleSheet,UIManager } from 'react-native'
import { Image, View } from 'react-native-animatable'
import imgLogo from '../../images/logomain.png'
import metrics from '../../config/metrics'
import {signin} from '../../redux/actions/action'
import {signup} from '../../redux/actions/action'

import Opening from './Opening'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.8

if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental(true)

class AuthScreen extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
 }

 state = {
  visibleForm: null // Can be: null | SIGNUP | LOGIN
}

// componentWillUpdate (nextProps) {
//   // If the user has logged/signed up succesfully start the hide animation
//   if (!this.props.isLoggedIn && nextProps.isLoggedIn) {
//     this._hideAuthScreen()
//   }
// }
// _hideAuthScreen = async () => {
//   // 1. Slide out the form container
//   await this._setVisibleForm(null)
//   // 2. Fade out the logo
//   await this.logoImgRef.fadeOut(800)
//   // 3. Tell the container (app.js) that the animation has completed
//   this.props.navigation.navigate('App')
// }

_setVisibleForm = async (visibleForm) => {
  // 1. Hide the current form (if any)
  if (this.state.visibleForm && this.formRef && this.formRef.hideForm) {
    await this.formRef.hideForm()
  }
  // 2. Configure a spring animation for the next step
  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  // 3. Set the new visible form
  this.setState({ visibleForm })
}

  render () {
    const { isLoggedIn, isLoading, signup, signinn } = this.props
    const { visibleForm } = this.state
    const formStyle = (!visibleForm) ? { height: 0 } : { marginTop: 0 }

    return (
      <View style={styles.container}>
        <Image
          animation={'bounceIn'}
          duration={1200}
          delay={200}
          ref={(ref) => this.logoImgRef = ref}
          style={styles.logoImg}
          source={imgLogo}
        />
        {(!visibleForm && !isLoggedIn) && (
          <Opening
            onCreateAccountPress={() => this._setVisibleForm('SIGNUP')}
            onSignInPress={() => this._setVisibleForm('LOGIN')}
          />
        )}
        <KeyboardAvoidingView
          behavior={'padding'}
          style={[formStyle, styles.bottom]}
        >
          {(visibleForm === 'SIGNUP') && (
            <SignupForm
              ref={(ref) => this.formRef = ref}
              onLoginLinkPress={() => this._setVisibleForm('LOGIN')}
              onSignupPress={signup}
              isLoading={isLoading}
              nav={this.props.navigation}
            />
          )}
          {(visibleForm === 'LOGIN') && (
            <LoginForm
              ref={(ref) => this.formRef = ref}
              onSignupLinkPress={() => this._setVisibleForm('SIGNUP')}
              onLoginPress={signinn}
              isLoading={isLoading}
              nav={this.props.navigation}
            />
          )}
        </KeyboardAvoidingView>
      </View>
    )
  }
}
function mapStateToProps(states) {
  return ({
      isLoading: states.basicInfo.isLoading,
      isLoggedIn: states.basicInfo.isLoggedIn
  })
}
function mapDispatchToProps(dispatch) {
return ({
  signinn: (email,pass,nav) => {
    dispatch(signin(email,pass,nav))
  },
  signup: (email,password,fullname,nav ) => {
    dispatch(signup(email,password,fullname,nav))
  }
})
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT,
    paddingTop: 24,
    backgroundColor: 'white'
  },
  logoImg: {
    flex: 1,
    height: null,
    width: IMAGE_WIDTH,
    alignSelf: 'center',
    resizeMode: 'contain',
    // marginVertical: 5
  },
  bottom: {
    backgroundColor: 'blue'
  }
})
