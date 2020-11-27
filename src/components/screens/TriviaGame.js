import React from "react";
import { View, Text, StyleSheet, Image, Dimensions} from "react-native";
import { connect } from "react-redux";
import { Audio } from "expo-av";
import CountdownCircle from "react-native-countdown-circle";
import AnswerStatus from "../AnswerStatus";
import Button from "../Button";
import Question from "../Question";
import TriviaLoader from "../TriviaLoader";
import * as actions from "../../actions";
import { capitalizeFirstLetter } from "../../Utils";
import { scale, moderateScale } from "../../Scaling";
import questionsMockup from "./../../mockups/questions";
// Sound setup
const AVAILABLE_SOUNDS = {
  correct: require("../../../assets/sounds/correct.wav"),
  incorrect: require("../../../assets/sounds/incorrect.wav"),
  timeout: require("../../../assets/sounds/timeout.wav"),
};

const COUNTDOWN_TIME = 99999;

/**
 * @description	Trivia Game Screen.
 * @constructor
 */
class TriviaGame extends React.Component {
  constructor(props) {
    super(props);
    /**
     * @typedef {Object} ComponentState
     * @property {Object[]} fontLoaded - Indicates whether custom fonts already loaded.
     */

    /** @type {ComponentState} */
    this.state = {
      answerStatus: false,
      answerType: "correct",
      fontLoaded: false,
      countdownTime: COUNTDOWN_TIME,
      soundController: null,
    };
  }

  /**
   * Lifecycle event handler called just after the App loads into the DOM.
   * Call the action to fetch quiz data.
   */
  componentWillMount() {
    const {
      selectedCategoryId,
      selectedDifficulty,
      numberOfQuestions,
    } = this.props;
    this.props.triviaFetch(
      selectedCategoryId,
      selectedDifficulty,
      numberOfQuestions
    );
  }

  async componentDidMount() {
    // Preload sound controller
    await Audio.setIsEnabledAsync(true);
    this.setState({
      soundController: new Audio.Sound(),
    });
  }

  /**
   * Play the correct sound based on answer status type.
   */
  playSound = async (type) => {
    try {
      await this.state.soundController.unloadAsync();
      await this.state.soundController.loadAsync(AVAILABLE_SOUNDS[type]);
      await this.state.soundController.playAsync();
    } catch (error) {
      // An error occurred!
      console.log(error);
    }
  };

  /**
   * @description Call action to move to the next question or end the game.
   * @param {string} questionOption - The text of the selected question option.
   */
  handleAnswerSelection = (questionOption) => {
    // Ignore if already selected (it can be a timeout)
    if (this.state.answerStatus) return;
    const {
      currentQuestionIndex,
      currentQuestion,
      questions,
      nextQuestion,
      totalScore,
    } = this.props;
    // TODO: Lottie  will release a onAnimationFinish event handler, replace later
    const app = this;
    const type =
      questionOption === null
        ? "timeout"
        : questionOption === currentQuestion.correct_answer
        ? "correct"
        : "incorrect";
    this.playSound(type);

    this.setState({ answerStatus: true, answerType: type });
    setTimeout(function () {
      app.setState({ answerStatus: false, countdownTime: COUNTDOWN_TIME });
      nextQuestion(questionOption, currentQuestionIndex, questions, totalScore);
    }, 1500);
  };

  render() {
    const {
      currentQuestionNumber,
      currentQuestion,
      questions,
      totalQuestionsSize,
    } = this.props;

    return (
      <TriviaLoader
        loading={this.props.loading}
        error={this.props.error}
        loadingText="Recebendo as perguntas"
        onRetryPressed={() => this.props.startGame()}
      >
        {this.state.answerStatus && (
          <View style={styles.answerStatus}>
            <AnswerStatus type={this.state.answerType} />
          </View>
        )}
        {questions.length === 0 ? (
          <View style={styles.noDataContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Nenhum quiz disponível</Text>
            </View>
            <Text style={styles.noDataText}>
              No Quiz questions available for "{this.props.selectedCategory}"
              category, "{this.props.selectedDifficulty}" difficulty, and{" "}
              {this.props.numberOfQuestions} questions.
            </Text>
            <Text style={styles.noDataText}>
              NOTE: Sometimes lowering the number of questions for the same
              category and difficulty works.
            </Text>
            <Button onPress={this.props.startGameSelection}>
              Tentar novamente
            </Button>
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <View style={{ flexDirection: "row"}}>
                <Image
                  source={require("./../../../assets/images/question.png")}
                  style={{ width: 15, height: 15, marginRight: 10 }}
                  resizeMode="contain"
                />
                <Text style={styles.headerTitle}>
                  {currentQuestionNumber}/{totalQuestionsSize}
                </Text>
              </View>
              {!this.state.answerStatus && (
                <View style={styles.countdownContainer}>
                  <CountdownCircle
                    seconds={this.state.countdownTime}
                    radius={26}
                    borderWidth={6}
                    color="#DA5F26"
                    bgColor="white"
                    shadowColor="#F4BA18"
                    textStyle={{ fontSize: 20, fontWeight: "bold" }}
                    onTimeElapsed={() => this.handleAnswerSelection(null)}
                  />
                </View>
              )}
              {/* <Text style={styles.categoryText}>
                {this.props.selectedCategory} -{" "}
                {capitalizeFirstLetter(currentQuestion.difficulty)}
              </Text> */}
              <Image
                source={require("./../../../assets/images/points.png")}
                style={{ width: 80, height: 36}}
                resizeMode="contain"
              />
            </View>
            <Question
            image={currentQuestion.image}
              question={currentQuestion.question}
              options={currentQuestion.options}
              type={currentQuestion.type}
              difficulty={currentQuestion.difficulty}
              category={currentQuestion.category}
              onItemSelected={this.handleAnswerSelection}
            />
          </View>
        )}
      </TriviaLoader>
    );
  }
}

/**
 * TriviaScreen component StyleSheet.
 */
const styles = StyleSheet.create({
  countdownContainer: {
    position: "absolute",
    left: (Dimensions.get('window').width / 2) - 30,
  },
  noDataContainer: {
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
  answerStatus: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 9999,
  },
  noDataText: {
    fontSize: moderateScale(20),
    padding: scale(10),
    textAlign: "justify",
  },
  container: {
    flex: 1,
    paddingTop: 0,
  },
  headerContainer: {
    justifyContent: "space-between", alignItems: "center",
    borderWidth: 1,
    flexDirection: "row",
    paddingRight: scale(12),
    paddingLeft: scale(12),
    paddingTop: scale(12),
    paddingBottom: scale(12),
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#ffffff",
    margin: scale(8),
    marginTop: scale(36),
  },
  headerTitle: {
    fontWeight: "300",
    color: "black",
    fontSize: moderateScale(16),
    fontWeight: "500",
  },
  categoryText: {
    fontWeight: "300",
    color: "#ffffff",
    fontSize: moderateScale(18),
    fontWeight: "900",
  },
});

const mapStateToProps = ({ trivia }) => {
  const {
    categories,
    currentQuestionIndex,
    error,
    loading,
    questions,
    totalScore,
    selectedCategoryId,
    selectedDifficulty,
    numberOfQuestions,
  } = trivia;

  return {
    currentQuestion: questionsMockup[currentQuestionIndex],
    currentQuestionNumber: currentQuestionIndex + 1,
    selectedCategory: categories.filter((category) => category.value === 0)[0]
      ?.label,
    totalQuestionsSize: questionsMockup.length,
    currentQuestionIndex,
    error,
    loading,
    numberOfQuestions,
    questions: questionsMockup,
    totalScore,
    selectedCategoryId,
    selectedDifficulty,
  };
};

export default connect(mapStateToProps, actions)(TriviaGame);
