import createDataContext from './createDataContext';
import { navigate } from '../navigationRef';

const gameReducer = (state, action) => {
    switch(action.type){
        case 'clean_game_data':
            return { index: -1, question: '', options: [], answer: '', responses: [] };
        case 'get_next_question':
            let options_arr = [...action.payload.question_object.incorrect_answers, action.payload.question_object.correct_answer];
            for (let i = options_arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [options_arr[i], options_arr[j]] = [options_arr[j], options_arr[i]];
            }
            return {
                index: action.payload.index,
                question: action.payload.question_object.question,
                options: options_arr,
                answer: action.payload.question_object.correct_answer,
                responses: [...state.responses, '']
            }
        case 'update_responses':
            let arr = state.responses;
            arr[action.payload.question_index] = state.options[action.payload.optioniIndex];
            return {...state, responses: arr}
        default:
            return state;
    }
};

const cleanGameData = (dispatch) => {
    return( () => {
        dispatch({type: 'clean_game_data'});
    })
};

const getNextQuestion = (dispatch) => {
    return( (questions, counter) => {
        dispatch({type: 'get_next_question', payload: {question_object: questions[counter+1], index: counter + 1}});
    })
};


const updateResponses = (dispatch) => {
    return ((question_index ,optioniIndex) => {
        dispatch({type: 'update_responses', payload: {question_index, optioniIndex}});
    })
};


export const { Provider, Context } = createDataContext(
    gameReducer,
    { cleanGameData, getNextQuestion, updateResponses },
    {
        index: -1,
        question: '',
        options: [],
        answer: '',
        responses: []
    }    
);