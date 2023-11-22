const success = (statusCode, result) => {
    return {
        status: "ok",
        statusCode,
        result,
    };
};

const errors = (statusCode, result) => {
    return {
        status: "error",
        statusCode,
        result,
    };
};

module.exports = {
    success,
    errors,
};
