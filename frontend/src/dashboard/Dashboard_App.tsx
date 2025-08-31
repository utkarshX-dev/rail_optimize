import userContext from "../context/userContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function DashboardApp() {
    const navigate = useNavigate();
    const {user} = useContext(userContext)!;
    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div>
            <h1>Dashboard</h1>
            
        </div>
    );
}

export default DashboardApp;