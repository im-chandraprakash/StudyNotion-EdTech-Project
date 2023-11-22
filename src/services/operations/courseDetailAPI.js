import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apis";
const {
    DELETE_SECTION_API,
    COURSE_CATEGORIES_API,
    CREATE_COURSE_API,
    DELETE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    UPDATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    COURSE_DETAILS_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
} = courseEndpoints;

export async function getInstructorCourseAPI(token) {
    const toastId = toast.loading("Loading ...");
    let result = null;

    try {
        const response = await apiConnector(
            "GET",
            GET_ALL_INSTRUCTOR_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        const responseData = response?.data;

        if (responseData.statusCode !== 200) {
            console.log("get intructor course failed : ", responseData);
            throw new Error(responseData.message);
        }

        result = responseData?.result?.courses;
    } catch (error) {
        console.log("get intructor course failed ", error);
    }
    toast.dismiss(toastId);
    return result;
}

export async function getCourseCategoryData(token) {
    // const toastId = toast.loading("Loading ...");
    let result = [];
    try {
        const response = await apiConnector(
            "GET",
            COURSE_CATEGORIES_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        const responseData = response?.data;

        if (responseData?.statusCode !== 200) {
            throw new Error(responseData?.message);
        }

        result = responseData?.result;
    } catch (error) {
        console.log("course Category api ", error);
    }
    // toast.dismiss(toastId);
    return result;
}

export async function createCourseAPI(token, formData) {
    const toastId = toast.loading("Loading ...");

    let result = null;
    try {
        const response = await apiConnector(
            "POST",
            CREATE_COURSE_API,
            formData,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        const data = response.data;
        // console.log("response : ", data);

        if (data.statusCode !== 200) {
            console.log(data);
            throw new Error(data);
        }

        toast.success("Course Created Succefully");
        result = data.result.data;
    } catch (error) {
        console.log("create Course Error : ", error);
    }
    toast.dismiss(toastId);

    return result;
}

export async function deleteCourseAPI(token, courseId) {
    const toastId = toast.loading("Loading ...");

    try {
        const response = await apiConnector(
            "DELETE",
            DELETE_COURSE_API,
            courseId,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        const responseData = response?.data;

        if (responseData.statusCode !== 200) {
            console.log("error", responseData);
            throw new Error(responseData.message);
        }

        toast.success("course Deleted Successfully");
    } catch (error) {
        console.log(error);
    }
    toast.dismiss(toastId);
}

export async function editCourseDetailsAPI(token, formData) {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector("POST", EDIT_COURSE_API, formData, {
            Authorization: `Bearer ${token}`,
        });

        const responseData = response?.data;

        if (responseData.statusCode != 200) {
            console.log("course edit errror", responseData);
            throw new Error(responseData?.message);
        }

        toast.success("save changed Succefully");

        result = responseData.result;
    } catch (error) {
        console.log("course edit error ", error);
    }
    toast.dismiss(toastId);
    return result;
}

export async function createSectionAPI(token, sectionData) {
    const toastId = toast.loading("Loading ...");
    let result = null;
    try {
        const response = await apiConnector(
            "POST",
            CREATE_SECTION_API,
            sectionData,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        const responseData = response?.data;

        if (responseData.statusCode !== 200) {
            console.log("response error", responseData);
            throw new Error(responseData);
        }

        result = responseData?.result?.updatedCourse;
        // console.log("response ", responseData);
    } catch (error) {
        console.log(error);
    }
    toast.dismiss(toastId);

    return result;
}

export async function editSectionNameAPI(token, data) {
    const toastId = toast.loading("Loading ...");
    let result = null;

    try {
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });

        const responseData = response.data;

        if (responseData.statusCode !== 200) {
            console.log("section : ", response);
            throw new Error(responseData);
        }

        toast.success("Section Updated Succefully", responseData);
        result = responseData?.result?.data;
    } catch (error) {
        console.log("update Section name error : ", error);
    }

    toast.dismiss(toastId);
    return result;
}

export async function deleteSectionAPI(token, data) {
    const toastId = toast.loading("Loading ...");
    let result = null;

    try {
        const response = await apiConnector("POST", DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });

        const responseData = response?.data;

        if (responseData.statusCode !== 200) {
            console.log("error : ", responseData);
            throw new Error(responseData);
        }

        result = responseData?.result?.data;
    } catch (error) {
        console.log("delete Section errror", error);
    }
    toast.dismiss(toastId);
    return result;
}

export async function createSubSectionAPI(token, formData) {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector(
            "POST",
            CREATE_SUBSECTION_API,
            formData,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        const responseData = response?.data;

        if (responseData.statusCode !== 200) {
            console.log("error : ", responseData);
            throw new Error(responseData.message);
        }

        console.log("success subsection : ", responseData?.result);
        result = responseData?.result?.data;
    } catch (error) {
        console.log("create subsection error : ", error);
    }

    toast.dismiss(toastId);
    return result;
}

export async function updateSubSectionAPI(token, formData) {
    const toastId = toast.loading("Loading");
    let result;

    console.log("formdata", formData);
    try {
        const response = await apiConnector(
            "POST",
            UPDATE_SUBSECTION_API,
            formData,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        const responseData = response?.data;

        if (responseData.statusCode !== 200) {
            console.log("error : ", responseData);
            throw new Error(responseData.message);
        }

        // console.log("changed data" , responseData);

        result = responseData?.result?.data;
    } catch (error) {
        console.log("create SubSection Error", error);
    }
    toast.dismiss(toastId);
    return result;
}

export async function deleteSubSectionAPI(token, formData) {
    const toastId = toast.loading("Loading ...");

    console.log("delete data : ", formData);
    let result = null;

    try {
        const response = await apiConnector(
            "POST",
            DELETE_SUBSECTION_API,
            formData,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        console.log("delete response data", response);

        const responseData = response?.data;

        if (responseData.statusCode !== 200) {
            console.log("error", responseData);
            throw new Error(responseData.message);
        }

        result = responseData?.result?.data;
    } catch (error) {
        console.log(error);
    }
    toast.dismiss(toastId);
    return result;
}

export async function getCourseDetailsAPI(token, data) {
    const toastId = toast.loading("Loading...");

    let result = null;
    try {
        const response = await apiConnector("GET", COURSE_DETAILS_API, data, {
            Authorization: `Bearer ${token}`,
        });

        const responseData = response.data;

        if (responseData.statusCode !== 200) {
            console.log("error : ", responseData);
            throw new Error(responseData.message);
        }

        console.log("complete info ", responseData);
    } catch (error) {
        console.log("course full details error ", error);
    }

    toast.dismiss(toastId);
    return result;
}

export async function getFullCourseDetailsAPI(token, data, view) {
    const toastId = toast.loading("Loading...");

    let result = null;
    try {
        const response = await apiConnector(
            "POST",
            GET_FULL_COURSE_DETAILS_AUTHENTICATED,
            data,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        const responseData = response.data;

        if (responseData.statusCode !== 200) {
            console.log("error : ", responseData);
            throw new Error(responseData.message);
        }

        // console.log("complete info ", responseData);

        if (view) {
            result = responseData?.result;
        } else {
            result = responseData?.result?.data;
        }
    } catch (error) {
        console.log("course full details error ", error);
    }

    toast.dismiss(toastId);
    return result;
}

export async function createRatingAPI(token, data) {
    const toastId = toast.loading("Loading ...");
    try {
        const response = await apiConnector("POST", CREATE_RATING_API, data, {
            Authorization: `Bearer ${token}`,
        });

        const responseData = response.data;

        if (responseData.statusCode !== 200) {
            console.log("error", responseData);
            throw new Error(responseData?.result);
        }

        toast.success("review created Successfully");
    } catch (error) {
        console.log("create rating failed ", error);
    }

    toast.dismiss(toastId);
}

export async function completeLectureAPI(token, data) {
    const toastId = toast.loading("Loading ...");
    let result = false;
    try {
        const response = await apiConnector(
            "POST",
            courseEndpoints.LECTURE_COMPLETION_API,
            data,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        const responseData = response?.data;

        if (responseData.statusCode !== 200) {
            console.log("error", responseData);
            throw new Error(responseData?.result);
        }

        toast.success("Lecture Completed Successfully");

        result = true;
    } catch (error) {
        console.log("error : ", error);
    }
    toast.dismiss(toastId);
    return result;
}
