import createDataContext from './createDataContext';

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'clean_game_data':
            if (state.intervalId) {
                clearInterval(state.intervalId);
            }
            return { index: -1, question: '', options: [], answer: '', responses: [], timer: 0, intervalId: null, gameTimedOut: null };
        case 'set_timer':
            return { ...state, timer: action.payload };
        case 'start_timer':
            if (state.timer == 0) {
                clearInterval(state.intervalId);

                let arr1 = state.responses;
                arr1[state.index] = `missing_${state.index}`
                for (let i = 0; i < (10 - state.index - 1); i++) {
                    arr1 = [...arr1, `missing_${state.index + i + 1}`]
                }
                return { ...state, timer: 0, intervalId: null, responses: arr1, gameTimedOut: true };
            }
            return { ...state, timer: state.timer - 1, intervalId: action.payload }
        case 'stop_timer':
            clearInterval(state.intervalId);
            return { ...state, timer: 0, intervalId: null };
        case 'get_next_question':
            return {
                ...state,
                index: action.payload.index,
                question: action.payload.question_object.question,
                options: action.payload.options_array,
                answer: action.payload.question_object.correct_answer,
                responses: [...state.responses, '']
            };
        case 'update_responses':
            let arr = state.responses;
            if (action.payload.optionIndex != -1) {
                arr[action.payload.question_index] = state.options[action.payload.optionIndex];
            } else {
                arr[action.payload.question_index] = `undefined_${action.payload.question_index}`;
            }
            return { ...state, responses: arr };
        default:
            return state;
    }
};

const startTimer = (dispatch) => {
    return (() => {
        const intervalId = setInterval(() => {
            dispatch({ type: 'start_timer', payload: intervalId });
        }, 1000);
    })
};

const stopTimer = (dispatch) => {
    return (() => {
        dispatch({ type: 'stop_timer' })
    })
};

const setTimer = (dispatch) => {
    return ((interval) => {
        dispatch({ type: 'set_timer', payload: interval });
    })
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
    { setTimer, startTimer, stopTimer, cleanGameData, getNextQuestion, updateResponses },
    {
        index: -1,
        question: '',
        options: [],
        answer: '',
        responses: [],
        timer: 0,
        intervalId: null,
        gameTimedOut: null
    }
);