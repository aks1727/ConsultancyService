import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { login, updateEducation, updateExperience } from "./store/authSlice";
import { useEffect } from "react";
import conf from "./conf/conf";

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const response = await fetch(`${conf.backendUser}/currentUser`, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                console.log("Entered wrong place")
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data && data.data) {
                dispatch(login(data.data));
                
            } else {
                console.log("Invalid data structure:", data);
            }
        } catch (error) {
            console.log("Fetch error:", error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <Outlet />
        </>
    );
}

export default App;
