import { Navigate } from "react-router-dom";

const HomePage = (props) => {
    // Dummy component to navigate to the users page
    Navigate({ to: '/users'});
}

export default HomePage