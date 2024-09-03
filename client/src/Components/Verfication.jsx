import React, { useEffect, useId, useState } from "react";
import { useParams } from "react-router-dom";
import conf from "../conf/conf";

const Verification = () => {
    const { data } = useParams();

    const checkIfTenMinutesPassed = (timestampString) => {
        const timestampDate = new Date(timestampString);

        if (isNaN(timestampDate.getTime())) {
            console.error("Invalid date format");
            return false;
        }

        const currentDate = new Date();
        const differenceInMilliseconds = currentDate - timestampDate;
        const differenceInMinutes = differenceInMilliseconds / (1000 * 60);

        return differenceInMinutes >= 10;
    };

    const [response, setResponse] = useState("");

    const updateVerified = async (userId) => {
        try {
            const res = await fetch(`${conf.backendUser}/updateVerified`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: userId }),
                credentials: "include", // Correctly set the credentials once
            });

            const { msg } = await res.json();
            setResponse(msg)
        } catch (error) {
            console.error("Error updating verification status:", error);
        }
    };

    useEffect(() => {
        const parts = data.split("-");
        
        
        
        const timestampString = parts.slice(1).join("-").trim();
        
        if (checkIfTenMinutesPassed(timestampString)) {
            setResponse(
                "Link has expired. Try re-verification through your profile page."
            );
        } else {
            const extractedUserId = parts[0].trim();
            updateVerified(extractedUserId);
        }
    }, [data]);

    return <>{response}</>;
};

export default Verification;
