import React from "react";
import {
  ImageBackground,
  Linking,
  StyleSheet,
  View,
  Image,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import Button from "../Button";
import { startGameSelection } from "../../actions";
import { scale, moderateScale } from "../../Scaling";
import { FontAwesome } from "@expo/vector-icons";

// Game background image
const BACKGROUND_IMAGE = require("../../../assets/images/background.png");

const GITHUB_URL =
  "https://github.com/computationalcore/react-native-trivia-quiz";

class MainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    this.setState({ fontLoaded: true });
  }

  renderCardGame = () => {
    return <View></View>;
  };

  handleGithubClick = () => {
    Linking.canOpenURL(GITHUB_URL).then((supported) => {
      if (supported) {
        Linking.openURL(GITHUB_URL);
      } else {
        console.log("Don't know how to open URI: " + GITHUB_URL);
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          source={BACKGROUND_IMAGE}
          resizeMode="contain"
        />
        <View style={styles.gameTitleContainer}>
          <Image
            source={require("./../../../assets/images/logo_trans.png")}
            style={{ width: 300, height: 200, borderRadius: 40 }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            marginBottom: 30,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            style={styles.playButton}
            onPress={this.props.startGameSelection}
          >
            Jogar
          </Button>
          <Button
            style={{ ...styles.playButton, ...{ maxWidth: 100 } }}
            onPress={this.props.startGameSelection}
          >
            <FontAwesome name="search" size={24} color="white" />
          </Button>
        </View>
        {this.renderCardGame()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  gameTitleContainer: {
    flex: 1,
    marginTop: scale(100),
    alignSelf: "center",
    justifyContent: "flex-start",
  },
  gameTitle: {
    color: "#000000",
    fontSize: moderateScale(50),
  },
  playButton: {
    marginBottom: scale(25),
    backgroundColor: "#DA5F26",
    elevation: 5,
    maxWidth: 150,
    width: "100%",
  },
  githubButton: {
    marginBottom: scale(50),
    backgroundColor: "#DC143C",
  },
  imageBackground: {
    flex: 1,
    height: "100%",
    width: "100%",
    maxHeight: ((Dimensions.get("window").height + 120) * 720) / 1130,
    maxWidth: Dimensions.get("window").width,
    justifyContent: "flex-end",
    position: "absolute",
    bottom: 0,
  },
});

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { startGameSelection })(MainMenu);
