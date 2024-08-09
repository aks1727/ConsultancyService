import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import conf from "../../conf/conf.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice.js";
import { adminBaseUrl } from "./AdminConstant.js";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
function AdminBase() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        getCurrentAdmin();
    }, []);

    return <Outlet />;
}

export default AdminBase;
