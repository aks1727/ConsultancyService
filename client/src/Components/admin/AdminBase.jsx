import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import conf from "../../conf/conf.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice.js";
import { adminBaseUrl } from "./AdminConstant.js";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Loader from "../Loader/Loader.jsx";

function AdminBase() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isloader, setIsloader] = useState(false)
    useGSAP(() => {
        gsap.to("#welcome", {
            duration: 2,
            x:100,
            repeat: -1,
            yoyo: true,
            delay: 1,
        });
    });
    const getCurrentAdmin = async () => {
        try {
            const res = await fetch(`${conf.backendAdmin}/getAdmin`, {
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                navigate(`${adminBaseUrl}/admin-login`);
                return;
            }
            const data = await res.json();
            dispatch(login(data.data));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setIsloader(true);
        getCurrentAdmin();
        setTimeout(() => {
            setIsloader(false);
        }, 1000);
    }, []);

    return isloader? <Loader/>:<Outlet />;
}

export default AdminBase;
