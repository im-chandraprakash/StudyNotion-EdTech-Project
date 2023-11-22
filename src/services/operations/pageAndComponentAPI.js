import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogData } from "../apis";

export async function getCategoryPageDetails(token, data) {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector(
            "POST",
            catalogData.CATALOGPAGEDATA_API,
            data
        );

        const responseData = response?.data;
        // console.log("response data : ", responseData);

        if (!responseData?.success) {
            console.log("error", responseData);
            throw new Error(responseData.result);
        }

        result = responseData;
    } catch (error) {
        console.log("error during getCategoryPageDetails", error);
    }

    toast.dismiss(toastId);
    return result;
}
