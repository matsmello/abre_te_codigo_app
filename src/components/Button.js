import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { scale, moderateScale } from "../Scaling";

const defaultProps = {
  style: {},
  onPress: () => {},
};

const Button = ({ onPress, children, style }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    flex: 1,
    padding: scale(12),
    color: "#ffffff",
    fontSize: moderateScale(24),
    fontWeight: "normal",
    textAlign: "center",
    textShadowColor: "#000000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  buttonStyle: {
    height: moderateScale(60),
    alignSelf: "stretch",
    minHeight: moderateScale(32),
    margin: scale(10),
    backgroundColor: "rgba(64, 64, 255, 0.8)",
    borderRadius: 8,
  },
};

// Assign default values to the optional props
Button.defaultProps = defaultProps;

export default Button;
