import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseSectionData: [],
    courseEntireData: [],
    completedLectures: [],
    totalNoOfLectures: 0,
};

const viewCourseSlice = createSlice({
    name: "viewCourseSlice",
    initialState: initialState,
    reducers: {
        setCourseSectionData: (state, action) => {
            state.courseSectionData = action.payload;
        },
        setCourseEntireData: (state, action) => {
            state.courseEntireData = action.payload;
        },
        setCompletedLectures: (state, action) => {
            if (action.payload.length !== 0) {
                state.completedLectures = action.payload;
            }
        },
        setTotalNoOfLectures: (state, action) => {
            state.totalNoOfLectures = action.payload;
        },
        setUpdatedCompletedLectures: (state, action) => {
            state.completedLectures = [
                ...state.completedLectures,
                action.payload,
            ];
        },
    },
});

export const {
    setCourseEntireData,
    setCourseSectionData,
    setCompletedLectures,
    setTotalNoOfLectures,
} = viewCourseSlice.actions;
export default viewCourseSlice.reducer;
