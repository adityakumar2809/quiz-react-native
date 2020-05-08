import createDataContext from './createDataContext';
import triviaApi from '../api/trivia';
import { navigate } from '../navigationRef';

const questionReducer = (state, action) => {
    switch(action.type){
        case 'get_questions':
            return action.payload;
        default:
            return state;
    }
};

const getQuestions = (dispatch) => {
    return( async (difficulty, category, setIsLoading) => {
        const response = await triviaApi.get('/api.php', { 
            params: {
                amount: '10', 
                category: category, 
                difficulty: difficulty, 
                type: 'multiple',
                encode: 'url3986'
            }
        });
        setIsLoading(false);
        if(response.data.response_code != 0){
            navigate('QuizForm', {err: 'Data for given choice is unavailable. Kindly select a different setting'})
            return;
        }
        dispatch({type: 'get_questions', payload: response.data.results});
        navigate('Question', null);  
    })
};


export const { Provider, Context } = createDataContext(
    questionReducer,
    { getQuestions },
    []    
);