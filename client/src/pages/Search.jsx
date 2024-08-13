import React from "react";
import { useSearchParams } from "react-router-dom";

function Search() {
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");

    return (
        <div>
            <h1>Search Results for: {category}</h1>
            {/* Implement logic to fetch and display mentors based on the category */}
        </div>
    );
}

export default Search;
