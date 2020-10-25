import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { connect } from "react-redux";
import { Audio } from "expo-av";
import * as Font from "expo-font";
import LottieView from "lottie-react-native";
import Button from "../Button";
import { goToMainMenu, startGameSelection } from "../../actions";
import { scale, moderateScale, verticalScale } from "../../Scaling";
import questionsMockup from "./../../mockups/questions";
// Static assets
const GOOD_ANIMATION = require("../../../assets/animations/677-trophy.json");
const AVERAGE_ANIMATION = require("../../../assets/animations/2144-little-girl-jumping-loader.json");
const BAD_ANIMATION = require("../../../assets/animations/823-crying.json");
const GOOD_SOUND = require("../../../assets/sounds/gameover_good.wav");
const AVERAGE_SOUND = require("../../../assets/sounds/gameover_average.wav");
const BAD_SOUND = require("../../../assets/sounds/gameover_bad.wav");
const BACKGROUND_IMAGE = require("../../../assets/images/game_background.png");
const GAMEOVER_TITLE_FONT = require("../../../assets/fonts/GrinchedRegular.otf");
const GAMEOVER_FONT = require("../../../assets/fonts/BadaboomBB_Reg.ttf");

/**
 * @description	Game Over screen.
 * @constructor
 * @param {Object} props - The props that were defined by the caller of this component.
 * @param {number} props.elapsedTime - Total elapsed time in seconds since start and game over.
 * @param {function} props.goToMainMenu - Callback executed when user clicks back to main menu.
 * @param {string} props.scorePercent - Percent value of the score.
 * @param {string} props.selectedCategory - Quiz category.
 * @param {string} props.selectedDifficulty - Quiz difficulty.
 * @param {function} props.startGameSelection - Callback executed when user clicks play again button.
 * @param {number} props.totalQuestionsNumber - Quiz Total questions number.
 * @param {number} props.totalScore - Game total score.
 */
class GameOver extends React.Component {
  constructor(props) {
    super(props);
    /**
     * @typedef {Object} ComponentState
     * @property {Object[]} fontLoaded - Indicates whether custom fonts already loaded.
     */

    /** @type {ComponentState} */
    this.state = {
      fontLoaded: false,
    };
  }

  /**
   * Load custom fonts when component mount.
   */
  async componentDidMount() {
    const { scorePercent } = this.props;
    // await Font.loadAsync({
    //   "game-over": GAMEOVER_FONT,
    //   "game-over-title": GAMEOVER_TITLE_FONT,
    // });
    this.setState({ fontLoaded: true });

    await Audio.setIsEnabledAsync(true);
    const soundObject = new Audio.Sound();
    try {
      await soundObject.unloadAsync();
      await soundObject.loadAsync(
        scorePercent >= 0.8
          ? GOOD_SOUND
          : scorePercent > 0.5
          ? AVERAGE_SOUND
          : BAD_SOUND
      );
      await soundObject.playAsync();
    } catch (error) {
      // An error occurred!
      console.log(error);
    }
  }

  render() {
    const {
      elapsedTime,
      goToMainMenu,
      scorePercent,
      selectedCategory,
      selectedDifficulty,
      startGameSelection,
      totalQuestionsNumber,
      totalScore,
    } = this.props;

    // Change some game over data based on score percent
    let scoreColor;
    let message;
    let animation;
    if (scorePercent >= 0.8) {
      animation = GOOD_ANIMATION;
      scoreColor = "#14AB00";
      message = "Parabéns, você é demais!";
    } else if (scorePercent > 0.5) {
      animation = AVERAGE_ANIMATION;
      scoreColor = "#8f61f9";
      message = "Não foi ruim!\nMas você consegue ir melhor!";
    } else {
      animation = BAD_ANIMATION;
      message = "Boa sorte na próxima vez!";
      scoreColor = "#FF2020";
    }

    return (
      <View style={styles.container}>
        {this.state.fontLoaded && (
          <SafeAreaView style={styles.gameOverData}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <View style={styles.gameOverInternal}>
                <Text style={styles.gameOverTitle}>Fim de jogo</Text>
                <LottieView
                  style={styles.statusAnimation}
                  source={animation}
                  autoPlay
                  loop
                />
                <Text style={[styles.gameOverMessage, { color: scoreColor }]}>
                  {message}
                </Text>
                <Text style={[styles.gameScoreText, { color: scoreColor }]}>
                  Ranking: {totalScore} de {totalQuestionsNumber}
                </Text>
                <Text style={styles.gameStatusText}>
                  Tempo total: {elapsedTime} segundos
                </Text>
                <Text style={styles.gameStatusText}>
                  Categoria: {selectedCategory}
                </Text>
                <Text style={styles.gameStatusText}>
                  Dificuldade: {selectedDifficulty}
                </Text>
                <Button style={styles.playAgain} onPress={startGameSelection}>
                  Jogar novamente
                </Button>
                <Button style={styles.mainMenuButton} onPress={goToMainMenu}>
                  Voltar para o início
                </Button>
              </View>
            </View>
          </SafeAreaView>
        )}
      </View>
    );
  }
}

/**
 * GameOver component StyleSheet.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DA5F26",
  },
  gameOverData: {
    marginTop: scale(40),
    marginBottom: scale(32),
    alignSelf: "center",
    borderRadius: 8,
  },
  gameOverInternal: {
    alignItems: "center",
    borderColor: "#ffffff",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    minWidth: "100%",
  },
  gameOverMessage: {
    fontSize: moderateScale(28),
    textAlign: "center",
    fontWeight: "900",
  },
  gameOverTitle: {
    color: "#000000",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: scale(10),
    fontSize: moderateScale(78),
    marginBottom: scale(-40),
    zIndex: 9999,
  },
  gameScoreText: {
    fontWeight: "900",
    fontSize: moderateScale(32),
    marginTop: scale(5),
    marginBottom: scale(5),
  },
  gameStatusText: {
    fontSize: moderateScale(24),
    fontWeight: "900",
    color: "#8f61f9",
    marginTop: 2,
    marginBottom: 2,
  },
  playAgain: {
    marginBottom: scale(25),
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5,
  },
  mainMenuButton: {
    marginBottom: scale(25),
    backgroundColor: "#DA5F26",
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5,
  },
  statusAnimation: {
    width: scale(200),
    height: scale(200),
  },
});

const mapStateToProps = ({ trivia }) => {
  const {
    categories,
    endTime,
    questions,
    startTime,
    selectedCategoryId,
    selectedDifficulty,
    totalScore,
  } = trivia;

  // Elapsed time in seconds
  const elapsedTime = Math.round((endTime - startTime) / 1000);

  const totalQuestionsNumber = questionsMockup.length;

  const scorePercent = totalScore / totalQuestionsNumber;

  return {
    selectedCategory: categories.filter((category) => category.value === 0)[0]
      .label,
    elapsedTime,
    scorePercent,
    selectedDifficulty,
    totalQuestionsNumber,
    totalScore,
  };
};

export default connect(mapStateToProps, { startGameSelection, goToMainMenu })(
  GameOver
);
