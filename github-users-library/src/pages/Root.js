import React from "react";
import { Outlet } from "react-router-dom";

const Root = (props) => {
    return <>
        {/* TODO - add header navigation here  */}
        <p>Header</p>
        <Outlet />
    </>
}

export default Root;