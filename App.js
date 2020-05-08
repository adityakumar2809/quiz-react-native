// LIBRARY IMPORTS
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// LOCAL FILE IMPORTS
import EndScreen from './src/screens/EndScreen';
import StartScreen from './src/screens/StartScreen';
import QuizFormScreen from './src/screens/QuizFormScreen';
import QuestionScreen from './src/screens/QuestionScreen';
import ShowResultScreen from './src/screens/ShowResultScreen';
import { setNavigator } from './src/navigationRef';
import { Provider as RequestProvider } from './src/context/RequestContext';
import { Provider as QuestionProvider } from './src/context/QuestionContext';
import { Provider as GameProvider } from './src/context/GameContext';

const stackNavigator =  createStackNavigator({
  Start: StartScreen,
  QuizForm: QuizFormScreen,
  Question: QuestionScreen,
  End: EndScreen,
  ShowResult: ShowResultScreen
},{
  initialRouteName: 'Start',
  defaultNavigationOptions: {
    title: 'Quiz Trivia',
    headerTitleAlign: 'center',
    headerLeft: () => null,
    headerStyle: {
      backgroundColor: '#30c39e',
      height: 100
    },
    cardStyle: { backgroundColor: '#FAFAFA' },
  }
});

const App =  createAppContainer(stackNavigator);

export default () => {
  return (
    <GameProvider>
      <QuestionProvider>
        <RequestProvider>
          <App ref={(navigator) => { setNavigator(navigator) }}/>
        </RequestProvider>
      </QuestionProvider>
    </GameProvider>
  );
};