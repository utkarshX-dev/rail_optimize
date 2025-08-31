import userContext from "../context/userContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function DashboardApp() {
    const navigate = useNavigate();
    const {token} = useContext(userContext)!;
    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}

