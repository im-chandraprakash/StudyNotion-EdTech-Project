import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteMyAccount } from "../../../../services/operations/SettingsAPI";

function DeleteAccount() {
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteProfile = () => {
        try {
            dispatch( deleteMyAccount(token, navigate));
        } catch (error) {
            console.log("delete Account : ", error.message);
        }
    };
    return (
        <div className="my-10 flex flex-row gap-6 rounded-md border-[1px] border-pink-400 p-8 px-12 bg-pink-900 text-white ">
            <div className="rounded-full w-[60px] bg-pink-700 h-[60px] flex justify-center items-center">
                <RiDeleteBin6Line className="text-3xl text-pink-100 " />
            </div>
            <div className="text-[16px">
                <h1 className="text-xl font-bold">Delete Account</h1>

                <div className="text-pink-50 w-[50%] mt-2">
                    <p>Would you like to delete account?</p>
                    <p>
                        This account may contain Paid Courses. Deleting your
                        account is permanent and will remove all the contain
                        associated with it.
                    </p>
                    <p
                        className="text-pink-300 italic mt-3 cursor-pointer"
                        onClick={deleteProfile}
                    >
                        I want to delete my account.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default DeleteAccount;
