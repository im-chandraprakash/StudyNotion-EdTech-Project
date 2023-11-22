import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { endpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";
const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
} = endpoints;

export function sendOtp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true,
            });

            // console.log(response.status)
            // console.log("SENDOTP API RESPONSE ............", response);
            // console.log(response.data.success);

            if (response.data.statusCode !== 200) {
                throw new Error(response.data.result);
            }
            // console.log("OTP Sent Successfully");
            navigate("/verify-email");
        } catch (error) {
            console.log("SENDOTP API ERROR ........", error);
            toast.error(error.message);
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading ......");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                accountType,
                otp,
            });

            console.log("Signup Response : ", response.data);

            toast.success("Signup Successful");
            navigate("/login");
        } catch (error) {
            toast.error("Signup Failed");
            console.log("signup failed", error);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading ....");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            });

            // console.log("login response :", response);
            // console.log("status :", response.data.success);

            if (response.data.statusCode !== 200) {
                throw new Error(response.data.result);
                return;
            }

            toast.success("login Successfull");
            // console.log(response.data.result.user.firstName);
            dispatch(setToken(response.data.result.user.token));

            const userImage = response.data?.result?.user?.image
                ? response.data.result.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.result.user.firstName} ${response.data.result.user.lastName}`;

            dispatch(
                setUser({ ...response.data.result.user, image: userImage })
            );
            localStorage.setItem(
                "token",
                JSON.stringify(response.data.result.user.token)
            );
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.result.user)
            );
            navigate("/dashboard/my-profile");
        } catch (error) {
            console.log("login API Error ", error);
            toast.error("login failed");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading ....");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("Post", RESETPASSTOKEN_API, {
                email,
            });

            toast.success("Reset Email Sent");
            // console.log("reset link response : ", response.data);
            setEmailSent(true);
        } catch (error) {
            console.log("get Reset Password Token failed ", error);
            // toast.error(error);
            toast.error("Failed and something went wrong");
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    };
}

export function resetPassword(password, confirmPassword, token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading ...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, {
                password,
                confirmPassword,
                token,
            });

            // console.log("resetPassword response ", response.data);

            toast.success("Password Reset Successfully");
            navigate("/login");
        } catch (error) {
            console.log("reset password : ", error);
        }

        toast.dismiss(toastId);
        dispatch(setLoading(false));
    };
}

export function logout(navigate) {
    return async (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.success("Logged Out");
        navigate("/");
    };
}
