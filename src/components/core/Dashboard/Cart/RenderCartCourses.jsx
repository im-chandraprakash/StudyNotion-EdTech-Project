import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStar from "react-rating-stars-component";
import { IoStarSharp } from "react-icons/io5";
import IconBtn from "../../../common/IconBtn";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../../slices/cartSlice";

function RenderCartCourses() {
    const { cart: allCart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    // console.log("cart data : ", allCart);
    return (
        <div className="flex flex-col gap-10">
            {allCart?.map((item, index) => (
                <div
                    key={index}
                    className="flex flex-col justify-between items-start md:items-start sm:gap-10 lg:flex-row lg:items-center border-b-[1px] border-richblack-500 p-5 pb-10 gap-5"
                >
                    <div className="w-[300px] h-[150px] ">
                        <img
                            src={item?.thumbnail}
                            alt={item?.courseName}
                            className="w-full lg:mt-5"
                        />
                    </div>

                    <div className=" mt-5 sm:mt-0 flex w-full gap-5 justify-between sm:flex-row md:w-full sm:justify-between flex-col lg:flex-row items-start md:items-end">
                        <div className="flex flex-col gap-1 text-richblack-300">
                            <h1 className="text-[21px] text-white">
                                {item?.courseName}
                            </h1>
                            <h1 className="text-richblack-300">
                                {item?.category?.name}
                            </h1>
                            <div className="flex items-center gap-3 text-[#ffd700] text-sm">
                                <p className="text-lg">4.5</p>
                                <ReactStar
                                    count={5}
                                    size={17}
                                    emptyIcon={<IoStarSharp />}
                                    filledIcon={<IoStarSharp />}
                                    color="#ffd700"
                                />
                                <p className="text-richblack-300">
                                    {item?.ratingAndReviews.length} Ratings
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2 items-center flex-col">
                            <button
                                text={"Remove"}
                                className={
                                    "flex items-center flex-row-reverse p-3 text-pink-200 bg-richblack-700  gap-3 rounded-lg cursor-pointer "
                                }
                                onClick={() =>
                                    dispatch(removeFromCart(item._id))
                                }
                            >
                                <p>Remove</p>
                                <RiDeleteBin6Line size={20} />
                            </button>
                            <p className=" text-3xl text-yellow-50">
                                {" "}
                                ₹ {item?.price}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RenderCartCourses;
