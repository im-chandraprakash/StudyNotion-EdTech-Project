import React from "react";
import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import ChangePassword from "../../../../pages/ChangePassword";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";

function Index() {
    return (
        <div>
            <ChangeProfilePicture />

            <EditProfile />

            <UpdatePassword />

            <DeleteAccount />
        </div>
    );
}

export default Index;
