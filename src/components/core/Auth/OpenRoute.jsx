const { useSelector } = require("react-redux");
const { Navigate } = require("react-router-dom");

function OpenRoute({ children }) {
    const { token } = useSelector((state) => state.auth);

    if (token === null) {
        return children;
    } else {
        return <Navigate to={"/dashboard/my-profile"} />;
    }
}
export default OpenRoute;
