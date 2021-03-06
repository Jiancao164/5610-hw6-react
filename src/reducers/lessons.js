import {CREATE_LESSON, DELETE_LESSON, FIND_LESSONS_FOR_MODULE, UPDATE_LESSON} from "../actions/lessonActions";

const lessonReducer = (state = {lessons: []}, action) => {
    switch(action.type) {
        case CREATE_LESSON:
            return {
                lessons: [
                    ...state.lessons,
                    action.lesson
                ]
            };
        case FIND_LESSONS_FOR_MODULE:
            return {
                lessons: action.lessons
            };
        case UPDATE_LESSON:
            return {
                lessons: state.lessons.map(lesson =>
                    lesson.id === action.lessonId ? action.lesson : lesson
                )
            };
        case DELETE_LESSON:
            return {
                lessons: state.lessons.filter(lesson =>
                    lesson.id !== action.lessonId
                )
            };
        default:
            return state
    }
};

export default lessonReducer
