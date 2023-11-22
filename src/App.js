import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ChangePassword from "./pages/ChangePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Myprofile from "./components/core/Dashboard/Myprofile";
import Index from "./components/core/Dashboard/Settings/Index";
import Dashboard from "./pages/Dashboard";
import Cart from "./components/core/Dashboard/Cart/Index";
import CourseEnrolled from "./components/core/Dashboard/CourseEnrolled";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/Add Course/Index";
import MyCourse from "./components/core/Dashboard/MyCourse";
import EditCourse from "./components/core/Dashboard/Add Course/EditCourse/Index";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import InstructorDashboard from "./components/core/Dashboard/InstructorDashboard/InstructorDashboard";

function App() {
    const { user } = useSelector((state) => state.profile);

    return (
        <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/login"
                    element={
                        <OpenRoute>
                            <Login />
                        </OpenRoute>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <OpenRoute>
                            <Signup />
                        </OpenRoute>
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <OpenRoute>
                            <ForgotPassword />
                        </OpenRoute>
                    }
                />
                <Route
                    path="/reset-password/:id"
                    element={
                        <OpenRoute>
                            <ChangePassword />
                        </OpenRoute>
                    }
                />
                <Route
                    path="/verify-email"
                    element={
                        <OpenRoute>
                            <VerifyEmail />
                        </OpenRoute>
                    }
                />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/catalog/:catalogName" element={<Catalog />} />
                <Route path="/courses/:courseId" element={<CourseDetails />} />

                <Route element={<Dashboard />}>
                    <Route
                        path="dashboard/my-profile"
                        element={<Myprofile />}
                    />
                    <Route path="dashboard/settings" element={<Index />} />

                    {user?.accountType === ACCOUNT_TYPE.STUDENT ? (
                        <>
                            <Route path="dashboard/cart" element={<Cart />} />

                            <Route
                                path="dashboard/enrolled-courses"
                                element={<CourseEnrolled />}
                            />
                        </>
                    ) : (
                        <>
                            <Route
                                path={"/dashboard/instructor"}
                                element={<InstructorDashboard />}
                            />

                            <Route
                                path="dashboard/my-courses"
                                element={<MyCourse />}
                            />

                            <Route
                                path="dashboard/edit-Course/:courseId"
                                element={<EditCourse />}
                            />
                            <Route
                                path="dashboard/add-course"
                                element={<AddCourse />}
                            />
                        </>
                    )}
                </Route>

                <Route
                    element={
                        <PrivateRoute>
                            <ViewCourse />
                        </PrivateRoute>
                    }
                >
                    {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                        <>
                            <Route
                                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                                element={<VideoDetails />}
                            ></Route>
                        </>
                    )}
                </Route>
            </Routes>
        </div>
    );
}

export default App;
