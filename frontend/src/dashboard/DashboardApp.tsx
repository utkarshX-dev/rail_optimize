import userContext from "../context/userContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
export default function DashboardApp() {
    // const navigate = useNavigate();
    // const {token} = useContext(userContext)!;
    // useEffect(() => {
    //     if (!token) {
    //         navigate("/");
    //     }
    // }, [navigate]);

    return (
        <div>
            <Navbar />
            <h1>Dashboard</h1>
        </div>
    );
}

