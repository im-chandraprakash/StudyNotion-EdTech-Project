import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { resetCart } from "../../slices/cartSlice";
// import dotenv from 'dotenv'
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
const {
    SEND_PAYMENT_SUCCESS_EMAIL_API,
    COURSE_VERIFY_API,
    COURSE_PAYMENT_API,
} = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

export async function buyCourse(
    token,
    courses,
    userDetails,
    navigate,
    dispatch
) {
    const toastId = toast.loading("Loading ...");

    try {
        //load script
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            toast.error("Razorpay SDK failed to load");
            return;
        }

        //initiate order
        const orderResponse = await apiConnector(
            "POST",
            COURSE_PAYMENT_API,
            { courses },
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!orderResponse) {
            throw new Error(orderResponse?.data?.result);
        }

        const data = orderResponse?.data?.result;
        console.log("order Response : ", data);

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            amount: data?.amount,
            currency: data?.currency,
            name: "StudyNotion",
            description: "Thank You for purchasing the Course",
            image: rzpLogo,
            order_id: data?.id,
            prefill: {
                name: userDetails?.firstName,
                email: userDetails?.email,
            },
            handler: function (response) {
                console.log("payment response : ", response);
                sendPaymentSuccessfulEmail(response, data?.amount, token);
                verifyPayment(token, navigate, dispatch, {
                    ...response,
                    courses,
                });
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment failed", function (response) {
            toast.error("Oops , payment Failed");
            console.log(response);
        });
    } catch (error) {
        console.log("PAYMENT API ERROR", error);
        toast.error("Could not make payment");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessfulEmail(response, amount, token) {
    try {
        await apiConnector(
            "POST",
            SEND_PAYMENT_SUCCESS_EMAIL_API,
            {
                orderId: response?.razorpay_order_id,
                paymentId: response?.razorpay_payment_id,
                amount,
            },
            {
                Authorization: `Bearer ${token}`,
            }
        );
    } catch (error) {
        console.log("sent Payment Email Failed", error);
        toast.error(error.message);
    }
}

async function verifyPayment(token, navigate, dispatch, bodyData) {
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector(
            "POST",
            COURSE_VERIFY_API,
            bodyData,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        const responseData = response?.data;

        if (responseData.statusCode !== 200) {
            console.log("verify payment error", responseData);
            throw new Error(responseData);
        }

        toast.success("payment Successfull you are Added to the Course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch (error) {
        console.log("verfiy payment error ", error);
    }
    toast.dismiss(toastId);
}
