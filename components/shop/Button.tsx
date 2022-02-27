import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
} from "react-native";

const CButton = ({ title, onPress, color }: any) => {
  const { container, text } = styles;
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={[container, { backgroundColor: color }]}>
        <Text style={text}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default CButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 40,
    width: 120,
    overflow:'hidden'
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
