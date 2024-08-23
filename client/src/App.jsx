import { useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { login} from "./store/authSlice";
import { useEffect, useState } from "react";
import conf from "./conf/conf";
import Loader from "./Components/Loader/Loader.jsx"
function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isloader, setIsloader] = useState(false)
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
                if (data.data.isMentor == 'yes') {
                    navigate(`/mentor/${data.data.username}`);
                }
                
            } else {
                console.log("Invalid data structure:", data);
            }
        } catch (error) {
            console.log("Fetch error:", error);
        }
    };

    useEffect(() => {
        setIsloader(true)
        getUser();
        setTimeout(() => {
            setIsloader(false)
        }, 1000);
    }, []);

    return isloader ? (<Loader/>) : (
        <>
            <Outlet />
        </>
    );
}

export default App;
