import React from 'react'
import { View, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types';

const TouchableView = ({ isRippleDisabled, rippleColor, children, style, ...props }) => {
  if (IS_RIPPLE_EFFECT_SUPPORTED && !isRippleDisabled) {
    const background = TouchableNativeFeedback.Ripple('#FFF')
    return (
      <TouchableNativeFeedback {...props} background={background}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    )
  } else {
    return (
      <TouchableOpacity {...props} style={style}>
        {children}
      </TouchableOpacity>
    )
  }
}

TouchableView.propTypes = {
  isRippleDisabled: PropTypes.bool,
  rippleColor: PropTypes.string,
  children: PropTypes.any,
}

export default TouchableView
