import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import QuestionOptionItem from "./QuestionOptionItem";
import { scale, moderateScale, verticalScale } from "../Scaling";
import LottieView from "lottie-react-native";
const LOADING_ANIMATION = require("../../assets/animations/2151-loading-hamster.json");

const propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["boolean", "multiple"]).isRequired,
  difficulty: PropTypes.oneOf(["easy", "medium", "hard"]).isRequired,
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const defaultProps = {
  onItemSelected: () => {},
};

function Question(props) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000)
  }, [])

  return (
    <View style={styles.questionDataContainer}>
      <View style={styles.questionData}>
        <Text style={styles.questionDescription}>{props.question}</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          alignContent: "center",
          width: Dimensions.get("window").width,
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View
          style={{
            alignSelf: "center",
            alignItems: "center",
          }}
        > 
          {props.image && loading ? ( <View style={styles.loaderContainer}>
              <LottieView
                style={styles.loaderAnimation}
                source={LOADING_ANIMATION}
                autoPlay
                loop
              />
            </View>) : null}
          {props.image && !loading ? (
            <Image
              source={{ uri: props.image }}
              resizeMode="cover"
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "white",
                backgroundColor: "white",
                height: Dimensions.get("window").width - 30,
                width: Dimensions.get("window").width - 30,
                maxWidth: 400,
                maxHeight: 400,
                margin: 20,
              }}
            />
          ) : null}

          <FlatList
            style={styles.questionOptions}
            data={props.options}
            contentContainerStyle={styles.questionOptionsContainer}
            renderItem={({ item }) => (
              <QuestionOptionItem
                optionDescription={item}
                onPressItem={props.onItemSelected}
              />
            )}
            keyExtractor={(item, index) => `${index}-${item}`}
            onPressItem={props.onItemSelected}
            scrollEnabled={true}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    paddingTop: 0,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  loaderAnimation: {
    width: moderateScale(200),
    height: verticalScale(200),
  },
  questionDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: scale(16),
    marginRight: scale(16),
  },

  questionData: {
    alignSelf: "stretch",
    maxHeight: verticalScale(280),
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#ffffff",
    justifyContent: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },

  questionDescription: {
    color: "#000",
    fontSize: moderateScale(22),
    fontWeight: "bold",
  },

  questionOptions: {
    width: "100%",
  },
  questionOptionsContainer: {
    marginTop: 0,
  },
});

// Type checking the props of the component
Question.propTypes = propTypes;
// Assign default values to the optional props
Question.defaultProps = defaultProps;

export default Question;
