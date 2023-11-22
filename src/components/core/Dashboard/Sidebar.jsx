import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import { VscSignOut } from "react-icons/vsc";
import setConfirmationModel from "../../common/ConfirmationModel";
import { logout } from "../../../services/operations/authAPI";
import ConfirmationModel from "../../common/ConfirmationModel";

function Sidebar() {
    const { user } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [confirmationModal, setConfirmationModal] = useState(null);

    if (authLoading || profileLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <div className="text-white">
            <div className="flex min-w-[120px] lg:min-w-[222px] flex-col border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10">
                <div className="flex flex-col">
                    {sidebarLinks?.map((link) => {
                        if (link.type && user.accountType !== link.type)
                            return null;
                        return (
                            <SidebarLink
                                key={link.id}
                                link={link}
                                iconName={link.icon}
                            />
                        );
                    })}
                </div>

                <div className="mx-auto mt-6 mb-6 h-[1px] border-b-richblack-600"></div>

                <div className="flex flex-col">
                    <SidebarLink
                        iconName={"VscSettingsGear"}
                        link={{ name: "Settings", path: "/dashboard/settings" }}
                    />

                    <button
                        onClick={() =>
                            setConfirmationModal({
                                text1: "Are You Sure ?",
                                text2: "You will be logged out of  your Account",
                                btn1Text: "Logout",
                                btn2Text: "Cancel",
                                btn1Handler: () => dispatch(logout(navigate)),
                                btn2Handler: () => setConfirmationModal(null),
                            })
                        }
                        className="text-sm font-[15px]  text-richblack-100 ml-8 mt-2"
                    >
                        <div className="flex items-center gap-x-2 ">
                            <VscSignOut className="text-xl " />
                            <span>Logout</span>
                        </div>
                    </button>
                </div>
            </div>

            {confirmationModal && (
                <ConfirmationModel modalData={confirmationModal}  />
            )}
        </div>
    );
}

export default Sidebar;
