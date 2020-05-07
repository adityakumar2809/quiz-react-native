// LIBRARY IMPORTS
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// LOCAL FILE IMPORTS
import EndScreen from './src/screens/EndScreen';
import StartScreen from './src/screens/StartScreen';
import QuizFormScreen from './src/screens/QuizFormScreen';
import QuestionScreen from './src/screens/EndScreen';
import ShowResultScreen from './src/screens/ShowResultScreen';

const stackNavigator =  createStackNavigator({
  Start: StartScreen,
  QuizForm: QuizFormScreen,
  Question: QuestionScreen,
  End: EndScreen,
  ShowResult: ShowResultScreen
},{
  initialRouteName: 'Start',
  defaultNavigationOptions: {
    title: 'Quiz Mania',
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: '#30c39e',
      height: 100
    },
  }
});

export default createAppContainer(stackNavigator);