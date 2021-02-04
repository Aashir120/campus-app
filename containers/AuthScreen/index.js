import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { KeyboardAvoidingView ,StyleSheet } from 'react-native'
import { Image, View } from 'react-native-animatable'
import imgLogo from '../../images/logo.png'

import {signin} from '../../redux/actions/action'
import {signup} from '../../redux/actions/action'

import onBoard from './onBoard'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'

class AuthScreen extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
 }


  render () {
    const { isLoggedIn, isLoading, signup, signinn } = this.props
    const { visibleForm } = this.state

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
          <onBoard
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
    backgroundColor: '#C80000'
  }
})
