import React from "react";
import VNavbar from "../Navigation/VNavBar.jsx";
import Navbar from "../Navigation/Navbar.jsx";
import { Box,Text, Flex, useBreakpointValue, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function Layoutone({Navitems =[] ,VNavItems =[] }) {
    const navbarHeight = 60; // Adjust based on the height of Navbar
    const vNavWidth = 250; // Width of VNavbar in desktop mode
    const rightBoxWidth = 300; // Width of the right-hand side box

    const isDesktop = useBreakpointValue({ base: false, lg: true });

    return (
        <>
            <Navbar NAV_ITEMS={Navitems} />
            <Flex direction={isDesktop ? "row" : "column"}>
                {isDesktop && (
                    <Box
                        position="fixed"
                        top={navbarHeight}
                        left="0"
                        width={`${vNavWidth}px`}
                        height={`calc(100vh - ${navbarHeight}px)`}
                    >
                        <VNavbar navItems={VNavItems} />
                    </Box>
                )}

                <Box
                    flex="1"
                    marginTop={`${navbarHeight}px`}
                    marginLeft={isDesktop ? `${vNavWidth}px` : "0"}
                    overflowY="auto"
                    height={`calc(100vh - ${navbarHeight}px)`}
                    p="4"
                >
                    {/* Main Content */}
                    <Outlet></Outlet>
                </Box>

                {!isDesktop && (
                    <Box
                        position="fixed"
                        bottom="0"
                        left="0"
                        width="100%"
                        bg="gray.100"
                    >
                        <VNavbar navItems={VNavItems} />
                    </Box>
                )}
            </Flex>
        </>
    );
}

export default Layoutone;
