import createDataContext from './createDataContext';
import { navigate } from '../navigationRef';

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'clean_game_data':
            return { index: -1, question: '', options: [], answer: '', responses: [] };
        case 'get_next_question':
            return {
                index: action.payload.index,
                question: action.payload.question_object.question,
                options: action.payload.options_array,
                answer: action.payload.question_object.correct_answer,
                responses: [...state.responses, '']
            }
        case 'update_responses':
            let arr = state.responses;
            if(action.payload.optionIndex != -1){
                arr[action.payload.question_index] = state.options[action.payload.optionIndex];
            } else {
                arr[action.payload.question_index] = `undefined_${action.payload.question_index}`;
            }
            return { ...state, responses: arr }
        default:
            return state;
    }
};

const cleanGameData = (dispatch) => {
    return (() => {
        dispatch({ type: 'clean_game_data' });
    })
};

const getNextQuestion = (dispatch) => {
    return ((questions, counter) => {

        let options_arr = [...questions[counter + 1].incorrect_answers, questions[counter + 1].correct_answer];
        for (let i = options_arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options_arr[i], options_arr[j]] = [options_arr[j], options_arr[i]];
        }

        dispatch({ type: 'get_next_question', payload: { question_object: questions[counter + 1], index: counter + 1, options_array: options_arr } });
    })
};


const updateResponses = (dispatch) => {
    return ((question_index, optionIndex) => {
        dispatch({ type: 'update_responses', payload: { question_index, optionIndex } });
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