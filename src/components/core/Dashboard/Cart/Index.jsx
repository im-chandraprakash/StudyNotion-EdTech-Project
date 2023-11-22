import React from "react";
import { useSelector } from "react-redux";
import RenderCartAmount from "./RenderCartAmount";
import RenderCartCourses from "./RenderCartCourses";

function Cart() {
    const cartList = useSelector((state) => state.cart.cart);
    return (
        <div className="text-white">
            <h1 className="text-4xl">Cart</h1>

            <p className="mt-7 font-semibold text-richblack-400 pb-3 border-b-[1px] border-b-richblack-400">
                {cartList?.length} Courses in Cart
            </p>
            {cartList?.length ? (
                <div className="text-white">
                    <div className="flex-full flex flex-col-reverse lg:flex-row justify-center mt-10 gap-10  ">
                        <div className="w-full bg-richblack-800 rounded-lg lg:w-[68%]">
                            <RenderCartCourses />
                        </div>
                        <div className="flex-1 mt-4 md:w-[80%] lg:w-[60%]">
                            <RenderCartAmount allCourses={cartList} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid place-items-center text-3xl mt-10 text-richblack-200">
                    <p>Your cart is empty</p>
                </div>
            )}
        </div>
    );
}

export default Cart;
