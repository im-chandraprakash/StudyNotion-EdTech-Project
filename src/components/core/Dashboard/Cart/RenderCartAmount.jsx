import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI";
import { useNavigate } from "react-router-dom";

function RenderCartAmount({ allCourses }) {
    const { cart: allCarts } = useSelector((state) => state.cart);
    const { total: totalAmount } = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [courseList, setCourseList] = useState();

    const handlePayment = async () => {
        await buyCourse(token, courseList, user, navigate, dispatch);
    };

    const filterCourseList = () => {
        const list = allCourses?.map((course) => course._id);

        // console.log("list is", list);
        if (list.length !== 0) {
            setCourseList(list);
        }
    };
    useEffect(() => {
        filterCourseList();
    }, []);

    return (
        <div className="w-[100%] text-richblack-300 p-6 rounded-lg bg-richblack-800 border-[1px] border-richblack-600 py-8 ">
            <p>Total :</p>
            <p className="text-3xl text-yellow-50">₹ {totalAmount}</p>
            <div className="w-[100%] mt-3" onClick={handlePayment}>
                <IconBtn
                    text={"Buy Now"}
                    customClasses={"w-full flex justify-center items-center"}
                />
            </div>
        </div>
    );
}

export default RenderCartAmount;
