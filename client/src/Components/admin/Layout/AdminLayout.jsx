import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../Navigation/AdminNavbar";
import { Flex } from "@chakra-ui/react";

function AdminLayout({ navItems = [] }) {
    return (
        <div>
            <Flex
                direction={{ base: "column", md: "row" }}  // Column for mobile, row for medium screens and up
                w="100%"
            >
                <AdminNavbar navItems={navItems} />
                <Flex
                    w={{ base: '100%', md: '80%' }}  // Full width on mobile, 80% on medium screens and up
                >
                    <Outlet />
                </Flex>
            </Flex>
        </div>
    );
}

export default AdminLayout;
