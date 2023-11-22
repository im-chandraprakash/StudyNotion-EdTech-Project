import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";
import { setToken } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";
const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
} = settingsEndpoints;

export function updateDisplayPicture(token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading ...");
        try {
            const response = await apiConnector(
                "PUT",
                UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            );

            const data = response.data;

            console.log("update api Call : ", data?.result?.data);

            if (data.statusCode !== 200) {
                throw new Error(data.message);
            }

            toast.success("Profile Image Updated successfully ");
            dispatch(setUser(data?.result?.data));
        } catch (error) {
            console.log("error while updating image : ", error.message);
        }

        toast.dismiss(toastId);
    };
}

export function UpdateProfile(token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector(
                "PUT",
                UPDATE_PROFILE_API,
                formData,
                {
                    Authorization: `Bearer ${token}`,
                }
            );

            console.log("response : ", response);

            const data = response?.data;

            if (data?.statusCode !== 200) {
                throw new Error(data.message);
            }

            toast.success("Profile Updated Successffully");
            dispatch(setUser(data?.result?.data));
        } catch (error) {}
        toast.dismiss(toastId);
    };
}

export function ChangePassword(token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");

        try {
            const response = await apiConnector(
                "POST",
                CHANGE_PASSWORD_API,
                formData,
                {
                    Authorization: `Bearer ${token}`,
                }
            );
            console.log("change password :", response);
            const data = response.data;

            if (data.statusCode !== 200) {
                throw new Error(data?.result);
            }
            toast.success("password Changed Successfully");
        } catch (error) {
            console.log("Change password : ", error.message);
            toast.error(error.message);
        }
        toast.dismiss(toastId);
    };
}

export function deleteMyAccount(token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading ...");
        try {
            const response = await apiConnector(
                "DELETE",
                DELETE_PROFILE_API,
                "",
                {
                    Authorization: `Bearer ${token}`,
                }
            );

            console.log("response", response);

            const responseData = response?.data;

            if (responseData?.statusCode != 200) {
                throw new Error(responseData.message);
            }
            toast.success("Deleted Account Succefully");

            dispatch(setToken(null));
            dispatch(setUser(null));
            dispatch(resetCart());

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            navigate("/");
        } catch (error) {
            console.log("delete Account Error", error);
        }
        toast.dismiss(toastId);
    };
}
