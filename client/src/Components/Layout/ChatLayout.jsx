import React from "react";
import Navbar from "../Navigation/Navbar";
import Chat from "../../pages/Chat";
import { Box } from "@chakra-ui/react";

const ChatLayout = ({ Navitems = [] }) => {
    const navbarHeight = 60;
    return (
        <>
            <Navbar NAV_ITEMS={Navitems} />
            <Box p={7}></Box>
            <Chat />
        </>
    );
};

export default ChatLayout;
