import React from "react";
import VNavbar from "../Navigation/VNavBar.jsx";
import Navbar from "../Navigation/Navbar.jsx";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function Layoutone({ Navitems = [], VNavItems = [] }) {
    const navbarHeight = 60; // Adjust based on the height of Navbar
    const vNavWidth = useBreakpointValue({
        base: "100%",
        md: "250px",
        lg: "250px",
    });

    // Determine if the screen is large enough for desktop layout
    const isDesktop = useBreakpointValue({ base: false, md: true });

    return (
        <>
            <Navbar NAV_ITEMS={Navitems} />
            <Flex direction={isDesktop ? "row" : "column"}>
                {isDesktop && (
                    <Box
                        width={vNavWidth}
                        height={`calc(100vh - ${navbarHeight}px)`}
                    >
                        <VNavbar navItems={VNavItems} />
                    </Box>
                )}

                <Box
                    flex="1"
                    marginTop={`${navbarHeight}px`}
                    overflowY="auto"
                    height={`calc(100vh - ${navbarHeight}px)`}
                    p={{ base: "2", md: "4" }}
                >
                    {/* Main Content */}
                    <Outlet />
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
