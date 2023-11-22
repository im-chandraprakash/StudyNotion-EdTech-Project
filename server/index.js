const express = require("express");
const Database = require("./config/Database.js");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routers/UserRouter.js");
const profileRouter = require("./routers/ProfileRouter.js");
const paymentRouter = require("./routers/PaymentRouter.js");
const courseRouter = require("./routers/CourseRouter.js");

const { cloudinaryConnect } = require("./config/cloudinary.js");
const { success } = require("./utils/responseWrapper.js");
const midware = require("./middlewares/auth");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(morgan("common"));
app.use(express.json({limit : "100mb"}));
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
);
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

cloudinaryConnect();


app.use("/api/v1/auth", userRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/payment", paymentRouter);

app.get("/", (req, res) => {
    res.send(success(200, "Ok from server"));
});

const Port = process.env.SERVER_LOCALHOST || 4001;
Database.connect();
app.listen(Port, () => {
    console.log(`Server is running at localhost ${Port}`);
});
