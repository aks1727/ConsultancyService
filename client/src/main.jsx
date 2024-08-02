import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
    Feed,
    Home,
    Mentorship,
    Roadmaps,
    BecomeMentor,
    Search,
} from "./pages/index.js";

import {
    AccountControlForm,
    AchievementsForms,
    EducationForm,
    ExperienceForm,
    ProfileForm,
    SkillsForm,
} from "./Components/Forms/index.js";

import { ChakraProvider, Flex } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Signup from "./Components/Signup/Signup.jsx";
import Login from "./Components/Login/Login.jsx";
import Layoutone from "./Components/Layout/Layoutone.jsx";
import NotFound from "./LandingPage/NotFound.jsx";
import { FaUserEdit, FaTools, FaGraduationCap, FaBriefcase, FaUserCog, FaTrophy } from "react-icons/fa";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/",
                element: <Layoutone />, // Layout wrapper for nested routes
                children: [
                    {
                        path: "feed",
                        element: <Feed />,
                    },
                    {
                        path: "mentorship",
                        element: <Mentorship />,
                    },
                    {
                        path: "roadmaps",
                        element: <Roadmaps />,
                    },
                    {
                        path: "become-mentor",
                        element: <BecomeMentor />,
                    },
                    {
                        path: "search",
                        element: <Search />,
                    },
                ],
            },
            {
                path: "/update-details",
                element: (
                    <Layoutone
                    VNavItems={[
                            {
                                label: "Edit Profile",
                                href: "edit-profile",
                                icon: FaUserEdit,
                            },
                            {
                                label: "Edit Skills",
                                href: "edit-skills",
                                icon: FaTools,
                            },
                            {
                                label: "Edit Education",
                                href: "edit-education",
                                icon: FaGraduationCap,
                            },
                            {
                                label: "Edit Experience",
                                href: "edit-experience",
                                icon: FaBriefcase,
                            },
                            {
                                label: "Edit Achievements",
                                href: "edit-achievements",
                                icon: FaTrophy,
                            },
                            {
                                label: "Account Control",
                                href: "account-control",
                                icon: FaUserCog,
                            },
                        ]}
                    />
                ),
                children: [
                    {
                        path: "edit-profile",
                        element: <ProfileForm />,
                    },
                    {
                        path: "edit-skills",
                        element: <SkillsForm />,
                    },
                    {
                        path: "edit-education",
                        element: <EducationForm />,
                    },
                    {
                        path: "edit-experience",
                        element: <ExperienceForm />,
                    },
                    {
                        path: "edit-achievements",
                        element: <AchievementsForms />,
                    },
                    {
                        path: "account-control",
                        element: <AccountControlForm />,
                    },
                    {
                        path: "",
                        element: <Navigate to="edit-profile" replace />,
                    },
                ],
            },
            {
                path: "signup",
                element: <Signup />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ChakraProvider>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </ChakraProvider>
    </React.StrictMode>
);
