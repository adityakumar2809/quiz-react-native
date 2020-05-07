import createDataContext from './createDataContext';

const requestReducer = (state, action) => {
    switch(action.type){
        case 'set_selected_options':
            return { ...state, selected_options: action.payload };
        default:
            return state;
    }
};

let difficulty_data = [{
    label: 'Easy',
    value: 'easy'
}, {
    label: 'Medium',
    value: 'medium'
}, {
    label: 'Hard',
    value: 'hard'
}];

let category_data = [{
    label: 'Animals',
    value: 27
}, {
    label: 'Art',
    value: 25
}, {
    label: 'General Knowledge',
    value: 9
}, {
    label: 'Entertainment: Books',
    value: 10
}, {
    label: 'Entertainment: Film',
    value: 11
}, {
    label: 'Entertainment: Music',
    value: 12
}, {
    label: 'Entertainment: Musicals & Theatres',
    value: 13
}, {
    label: 'Entertainment: Television',
    value: 14
}, {
    label: 'Entertainment: Video Games',
    value: 15
}, {
    label: 'Entertainment: Board Games',
    value: 16
}, {
    label: 'Entertainment: Japanese Anime and Manga',
    value: 31
}, {
    label: 'Entertainment: Cartoon & Animations',
    value: 32
}, {
    label: 'Science & Nature',
    value: 17
}, {
    label: 'Science: Computers',
    value: 18
}]

const setSelectedOptions = (dispatch) => {
    return((difficulty, category) => {
        dispatch({type:'set_selected_options', payload: {difficulty, category}});
    });
}

export const { Provider, Context } = createDataContext(
    requestReducer,
    { setSelectedOptions },
    { difficulty_data, category_data, selected_options: { difficulty: null, category: null } }
);