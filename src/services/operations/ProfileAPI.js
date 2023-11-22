import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";
const { GET_USER_ENROLLED_COURSES_API } = profileEndpoints;

export async function getUserEnrolledCourses(token) {
    let result = [];
    // const toastId = toast.loading("Loading");
    try {
        const response = await apiConnector(
            "GET",
            GET_USER_ENROLLED_COURSES_API,

            "",
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (response.data?.statusCode !== 200) {
            console.log("error : ", response.data);
            throw new Error(response?.data?.message);
        }

        console.log("final enrolled data : ", response);
        result = response.data.result;
    } catch (error) {
        console.log("Error ", error);
    }
    // toast.dismiss(toastId);
    return result;
}

export async function getInstructorDataAPI(token) {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const instructorDataResponse = await apiConnector(
            "GET",
            profileEndpoints.GET_INSTRUCTOR_DATA,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        const data = instructorDataResponse?.data;
        if (data.statusCode !== 200) {
            console.log("error : ", instructorDataResponse?.data);
            throw new Error(instructorDataResponse?.data);
        }

        result = data?.result;
    } catch (error) {
        console.log("instructor error : ", error);
    }

    toast.dismiss(toastId);
    return result;
}
