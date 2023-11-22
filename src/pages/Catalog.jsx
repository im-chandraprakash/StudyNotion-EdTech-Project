import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/apis";
import { getCategoryPageDetails } from "../services/operations/pageAndComponentAPI";
import { useSelector } from "react-redux";
import CourseCard from "../components/core/Catalog/CourseCard";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Footer from "../components/common/Footer";

function Catalog() {
    const [catalogData, setCatalogData] = useState(null);
    const [categoryId, setCategoryId] = useState();
    const [active, setActive] = useState(1);
    const { catalogName } = useParams();

    const [selectedCategoryData, setSelectedCategoryData] = useState();
    const [differentCategoryData, setDifferentCategoryData] = useState();
    const [mostSellingCategoryData, setMostSellingCategoryData] = useState();

    const { token } = useSelector((state) => state.auth);
    const fetchData = async () => {
        // console.log("catalogName : " , catalogName);
        const response = await apiConnector("GET", categories.CATEGORIES_API);
        const result = response?.data?.result;

        // console.log("category result " , result);
        const id = result.filter(
            (category) =>
                category.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]._id;
        // console.log("id" , id);
        setCategoryId(id);
    };

    const getCategoryPageData = async () => {
        const result = await getCategoryPageDetails(token, {
            categoryId: categoryId,
        });

        console.log("result : ", result);

        if (result) {
            setSelectedCategoryData(result?.selectedCategory);
            setDifferentCategoryData(result?.differentCategory);
            setMostSellingCategoryData(result?.mostSellingCourses);
        }
    };

    useEffect(() => {
        fetchData();
    }, [catalogName]);

    useEffect(() => {
        getCategoryPageData();
    }, [categoryId]);

    return (
        <div className="text-white">
            {/* sectin 1 */}

            <div className=" box-content bg-richblack-800 px-4">
                <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                    <p className="text-sm text-richblack-300">
                        {`Home / Catalog / `}
                        <span className="text-yellow-25">
                            {selectedCategoryData?.name}
                        </span>
                    </p>
                    <p className="text-3xl text-richblack-5">
                        {selectedCategoryData?.name}
                    </p>
                    <p className="max-w-[870px] text-richblack-200">
                        {selectedCategoryData?.description}
                    </p>
                </div>
            </div>
            {/* sectin 2 */}

            <div className="w-full max-w-maxContent mx-auto">
                <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                    <div className="section_heading">
                        Courses to get you started
                    </div>
                    <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                        <p
                            className={`px-4 py-2 ${
                                active === 1
                                    ? "border-b border-b-yellow-25 text-yellow-25"
                                    : "text-richblack-50"
                            } cursor-pointer`}
                            onClick={() => setActive(1)}
                        >
                            Most Populer
                        </p>
                        <p
                            className={`px-4 py-2 ${
                                active === 2
                                    ? "border-b border-b-yellow-25 text-yellow-25"
                                    : "text-richblack-50"
                            } cursor-pointer`}
                            onClick={() => setActive(2)}
                        >
                            New
                        </p>
                    </div>
                    <div>
                        <CourseSlider
                            Courses={selectedCategoryData?.courses}
                            auto="true"
                        />
                    </div>
                </div>

                <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                    <div className="section_heading">
                        Top courses in {differentCategoryData?.name}
                    </div>
                    <div className="py-8">
                        <CourseSlider
                            Courses={differentCategoryData?.courses}
                        />
                    </div>
                </div>

                {/* sectin 4 */}

                <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                    <div className="section_heading">Frequently Bought</div>
                    <div className="py-8">
                        <div className=" w-[90%] grid grid-cols-2 grid-rows-2 gap-7 gap-x-12">
                            {mostSellingCategoryData?.courses.map(
                                (item, index) => (
                                    <CourseCard
                                        course={item}
                                        key={index}
                                        Height={"h-[400px]"}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default Catalog;
