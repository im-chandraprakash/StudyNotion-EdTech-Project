const Category = require("../models/Category");
const Course = require("../models/Course");
const { errors, success } = require("../utils/responseWrapper");

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};

const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.send(errors(400, "All fields are required"));
        }

        const createdTag = await Category.create({
            name: name,
            description,
            description,
        });

        return res.send(
            success(200, {
                message: "Category created Successfully",
                createdTag,
            })
        );
    } catch (e) {
        return res.send(errors(500, e.messsage));
    }
};

const showAllCategories = async (req, res) => {
    try {
        const getAllTags = await Category.find(
            {},
            { name: true, description: true }
        );
        return res.send(success(200, ("Here is all Tags", getAllTags)));
    } catch (e) {
        return res.send(errors(500, e.messsage));
    }
};

const categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;

        //find selected category
        const selectedCategory = await Category.findById(categoryId).populate({
            path: "courses",
            match: { status: "Published" },
            populate :{
                path : "ratingAndReviews"
            }
        });

        // console.log("category : ", categoryId, selectedCategory);

        const differentCategory = selectedCategory;
        const mostSellingCourses = selectedCategory;
        // if (!selectedCategory) {
        //     return res.send(errors(404, "Category not found"));
        // }

        // if (selectedCategory.courses.length === 0) {
        //     return res.send(
        //         errors(404, "No courses found on the selected Category")
        //     );
        // }

        // //find other categories
        // const differentCategoryExceptSelected = await Category.findOne({
        //     _id: { $ne: categoryId },
        // });

        // const differentCategory = await Category.findOne(
        //     differentCategoryExceptSelected[
        //         getRandomInt(differentCategoryExceptSelected.length)
        //     ]._id
        // )
        //     .populate({
        //         path: "course",
        //         match: { status: "Published" },
        //     })
        //     .exec();

        // //find top selling courses

        // const allCategories = await Category.find()
        //     .populate({
        //         path: "courses",
        //         match: { status: "Published" },
        //         populate: {
        //             path: "instructor",
        //         },
        //     })
        //     .exec();
        // const allCourses = allCategories.flatMap(
        //     (category) => category.courses
        // );
        // const mostSellingCourses = allCourses
        //     .sort((a, b) => b.sold - a.sold)
        //     .slice(0, 10);
        // console.log("mostSellingCourses COURSE", mostSellingCourses)
        res.status(200).json({
            success: true,
            selectedCategory,
            differentCategory,
            mostSellingCourses,
        });
    } catch (e) {
        return res.send(errors(500, e.messsage));
    }
};
module.exports = {
    createCategory,
    showAllCategories,
    categoryPageDetails,
};
