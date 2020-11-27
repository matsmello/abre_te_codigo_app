import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { scale, moderateScale } from '../Scaling';

const propTypes = {
  optionDescription: PropTypes.string.isRequired,
  onPressItem: PropTypes.func.isRequired,
};
class QuestionOptionItem extends PureComponent {

  _onPress = () => {
    this.props.onPressItem(this.props.optionDescription);
  };

  render() {
    const { optionDescription } = this.props;

    return (
      <TouchableOpacity
        onPress={this._onPress}
      >
        <View style={styles.quizOption}>
          <Text style={styles.quizOptionDescription}>{optionDescription}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  quizOption: {
    flex: 1,
    alignSelf: 'stretch',
    minHeight: 32,
    marginTop: 4,
    marginBottom: 4,
    backgroundColor: '#F4BA18',
    borderRadius: 8,
    shadowColor:'#F9DC0B',
    shadowOffset:{width: 2, height: 2},
    shadowRadius:1,
    shadowOpacity: 1,
    minWidth: Dimensions.get('window').width - 20,
    maxWidth: 380
  },

  quizOptionDescription: {
    flex: 1,
    padding: scale(20),
    color: 'white',
    fontSize: moderateScale(24),
    fontWeight:'bold',
    textAlign: 'left',
    textShadowColor:'#000000',
    textShadowOffset:{width: 1, height: 1},
    textShadowRadius:0,
  },
});

QuestionOptionItem.propTypes = propTypes;

export default QuestionOptionItem;
