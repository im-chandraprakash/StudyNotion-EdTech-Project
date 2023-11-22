import React from "react";
import { FaShareSquare } from "react-icons/fa";
import IconBtn from "../../common/IconBtn";
import { useDispatch, useSelector } from "react-redux";
import { buyCourse } from "../../../services/operations/studentFeaturesAPI";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { BsFillCaretRightFill } from "react-icons/bs";
import { addToCart } from "../../../slices/cartSlice";
import { useState } from "react";
import { useEffect } from "react";

function CourseDetailsCard({
    image,
    name,
    description,
    price,
    instructions,
    course,
}) {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const [isPurchased, setIsPurchased] = useState(false);
    const { courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    console.log("hello ji", user , isPurchased);
    const handlePayment = () => {
        console.log("userId", courseId);
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
        }
    };

    const addToCartCourse = () => {
        dispatch(addToCart(course));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(
            "http://localhost:3000" + location.pathname
        );
        toast.success("Link copied to Clipboard");
    };

    const isCoursePurchased = () => {
        if (user) {
            console.log("hello dost ");
            if (user?.courses?.includes(courseId)) {
                setIsPurchased(true);
            }
        }
    };
    useEffect(() => {
        isCoursePurchased();
    }, []);
    return (
        <div className="w-full h-fit lg:-mt-[220px] max-w-[700px] lg:max-w-none object-cover lg:absolute lg:w-[410px]  lg:bg-richblack-700 rounded-lg py-5 px-0 flex justify-center gap-2 flex-col">
            <div className="w-[600px] h-[400px] lg:h-full lg:w-full flex justify-center">
                <img
                    src={image}
                    alt={`${name} Image`}
                    className="w-[90%] h-full lg:h-[270px]  object-cover lg:rounded-xl"
                />
            </div>
            <div className=" gap-3 flex-col mx-5 hidden lg:flex">
                <p className="text-2xl font-bold"> Rs. {price}</p>
                <div className="flex flex-col gap-4">
                    <div onClick={!isPurchased ? (handlePayment) : (()=> {navigate("/dashboard/enrolled-courses")})}>
                        <IconBtn
                            text={!isPurchased ? "Buy Now" : "Go to Course" }
                            customClasses={"w-full flex justify-center "}
                        />
                    </div>

                    <button
                        className="p-2 bg-richblack-800 text-white rounded-lg"
                        onClick={addToCartCourse}
                    >
                        Add to Cart
                    </button>
                </div>
                <p className="text-sm text-richblack-100 text-center">
                    30-Day Money-Back Guarantee
                </p>

                <div className={``}>
                    <p className={`my-2 text-xl font-semibold `}>
                        This Course Includes :
                    </p>
                    <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
                        {instructions?.map((item, i) => {
                            return (
                                <p className={`flex gap-2`} key={i}>
                                    <BsFillCaretRightFill />
                                    <span>{item}</span>
                                </p>
                            );
                        })}
                    </div>
                </div>

                <button
                    className="text-yellow-50 text-center mx-auto flex gap-1 items-center"
                    onClick={() => {
                        copyToClipboard();
                    }}
                >
                    <FaShareSquare size={18} /> <span>share</span>
                </button>
            </div>
        </div>
    );
}

export default CourseDetailsCard;
