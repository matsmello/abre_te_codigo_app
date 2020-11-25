import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { connect } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import SegmentedControlTab from "react-native-segmented-control-tab";
import Button from "../Button";
import TriviaLoader from "../TriviaLoader";
import * as actions from "../../actions";
import { scale, moderateScale } from "../../Scaling";
import { Ionicons } from "@expo/vector-icons";

const DIFFICULTY_OPTIONS = ["Mix", "Fácil", "Médio", "Difícil"];
const NUMBER_OF_QUESTIONS = ["10", "20"];

class TriviaSelection extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedCategoryId: -1,
      selectedDifficulty: 0,
      selectedQuestion: 0,
      fontLoaded: false,
    };
  }

  componentWillMount() {
    this.props.triviaCategoryFetch();
  }

  async componentDidMount() {
    this.setState({ fontLoaded: true });
  }

  handleCategorySelect = (value) => {
    this.setState({ selectedCategoryId: value });
  };

  handleQuestionSelect = (index) => {
    this.setState({ selectedQuestion: index });
  };

  handleDifficultySelect = (index) => {
    this.setState({ selectedDifficulty: index });
  };

  handleStartGame = () => {
    const {
      selectedCategoryId,
      selectedDifficulty,
      selectedQuestion,
    } = this.state;
    this.props.startGame(
      selectedCategoryId,
      DIFFICULTY_OPTIONS[selectedDifficulty],
      NUMBER_OF_QUESTIONS[selectedQuestion]
    );
  };

  render() {
    return (
      this.state.fontLoaded && (
        <TriviaLoader
          loading={this.props.loading}
          error={this.props.error}
          loadingText="Carregando"
          onRetryPressed={() => this.props.startGameSelection()}
        >
          <SafeAreaView style={styles.container}>
            <View style={styles.gameTitleContainer}>
              <Text style={styles.gameTitle}>Selecione seu desafio</Text>
            </View>
            <View style={styles.Separator} />
            <Text style={styles.headerText}>Categorias</Text>
            <RNPickerSelect
              onDownArrow
              style={pickerSelectStyles}
              placeholder={{}}
              value={this.state.selectedCategoryId}
              items={this.props.categories}
              onValueChange={this.handleCategorySelect}
              Icon={() => (
                <Ionicons name="ios-arrow-down" size={24} color="black" />
              )}
            />
            <View style={styles.Separator} />
            <Text style={styles.headerText}>Dificuldade</Text>
            <SegmentedControlTab
              selectedIndex={this.state.selectedDifficulty}
              values={DIFFICULTY_OPTIONS}
              tabStyle={styles.tabStyle}
              tabsContainerStyle={styles.tabsContainerStyle}
              activeTabStyle={styles.activeTabStyle}
              onTabPress={this.handleDifficultySelect}
              tabTextStyle={{ fontSize: 20, color: "black" }}
              activeTabTextStyle={{ color: "white", fontWeight: "bold" }}
            />
            <View style={styles.Separator} />
            <Text style={styles.headerText}>Número de Perguntas</Text>
            <SegmentedControlTab
              selectedIndex={this.state.selectedQuestion}
              values={NUMBER_OF_QUESTIONS}
              onTabPress={this.handleQuestionSelect}
              tabStyle={styles.tabStyleQuestion}
              tabsContainerStyle={styles.tabsContainerStyle}
              tabTextStyle={{ fontSize: 20, color: "black" }}
              activeTabTextStyle={{ color: "white", fontWeight: "bold" }}
            />
            <View style={styles.Separator} />
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <Button onPress={this.handleStartGame}>Começar a jogar</Button>
            </View>
          </SafeAreaView>
        </TriviaLoader>
      )
    );
  }
}

const styles = StyleSheet.create({
  gameTitle: {
    color: "#000000",
    fontSize: moderateScale(40),
  },
  gameTitleContainer: {
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFFDD",
    width: "100%",
    height: "100%",
  },
  parentContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  tabViewText: {
    color: "#444444",
    fontWeight: "bold",
    marginTop: scale(50),
    fontSize: moderateScale(18),
  },
  titleText: {
    color: "#444444",
    padding: scale(20),
    fontSize: moderateScale(14),
    fontWeight: "500",
  },
  headerText: {
    padding: scale(8),
    fontSize: moderateScale(24),
    color: "#444444",
  },
  tabContent: {
    color: "#444444",
    fontSize: scale(18),
    margin: scale(24),
  },
  Separator: {
    marginHorizontal: scale(-10),
    alignSelf: "stretch",
    marginTop: scale(24),
  },
  tabStyle: {
    borderColor: "#D52C43",
    height: 45,
    maxWidth: 100,
    borderRadius: 20,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomStartRadius: 20,
    borderTopStartRadius: 20,
    borderWidth: 1,
    borderEndWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderStartWidth: 1,
    borderBottomWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
  },
  tabsContainerStyle: {
    justifyContent: "space-evenly",
  },
  tabStyleQuestion: {
    paddingHorizontal: scale(10),
    height: 45,
    maxWidth: 100,
    borderRadius: 20,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomStartRadius: 20,
    borderTopStartRadius: 20,
    borderWidth: 1,
    borderEndWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderStartWidth: 1,
    borderBottomWidth: 1,
  },
  activeTabStyle: {
    backgroundColor: "#D52C43",
  },
  tabTextStyle: {
    color: "#D52C43",
  },
});

/* RNPickerSelect StyleSheet */
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: scale(24),
    fontWeight: "900",
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    right: 30,
    top: 12,
  },
  modalViewTop: {},
  modalViewBottom: {},
  modalViewTop: {},
  inputAndroid: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  viewContainer: {},
});

const mapStateToProps = ({ trivia }) => {
  const { error, loading, categories } = trivia;

  return {
    error,
    loading,
    categories,
  };
};

export default connect(mapStateToProps, actions)(TriviaSelection);
