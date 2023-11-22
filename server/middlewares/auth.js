const dotenv = require("dotenv");
const { errors } = require("../utils/responseWrapper");
const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
    try {
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization").replace("Bearer ", "");

        // If JWT is missing, return 401 Unauthorized response

        console.log("token is ", token);

        if (!token) {
            return res.send(errors(401, "Token is missing"));
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            console.log("decoded value is ", decode);
        } catch (e) {
            return res.send(errors(401, ("token is not valid", e.message)));
        }

        console.log("middleware is calling");
        next();
    } catch (e) {
        return res.send(
            errors(401, "something is missing during validating token" , e)
        );
    }
};

exports.isStudent = (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.send(errors(401, "Route is protected for Student only"));
        }
        next();
    } catch (e) {
        return res.send(
            errors(401, "User role can not be varified, please try again")
        );
    }
};

exports.isInstructor = (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.send(
                errors(401, "Route is protected for Instructor only")
            );
        }
        next();
    } catch (e) {
        return res.send(
            errors(401, "User role can not be varified, please try again")
        );
    }
};

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.send(errors(401, "Route is protected for Admin only"));
        }
        next();
    } catch (e) {
        return res.send(
            errors(401, "User role can not be varified, please try again")
        );
    }
};
