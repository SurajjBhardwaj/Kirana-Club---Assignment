import React, { useState, useEffect } from "react";
import { Select, TextField } from "@shopify/polaris";

function ContestFilters({ filters, setFilters }) {
  const handleTypeChange = (value) => setFilters({ ...filters, type: value });
  const [searchValue, setSearchValue] = useState(filters.search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchValue }));
    }, 1000); // Delay of 1 second

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, setFilters]);

  const handleSearchChange = (value) => {
    setSearchValue(value); // Set the search value immediately
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "16px",
      }}
    >
      <Select
        label="Contest Type"
        options={[
          { label: "All", value: "" },
          { label: "CF", value: "CF" },
          { label: "ICPC", value: "ICPC" },
        ]}
        onChange={handleTypeChange}
        value={filters.type}
      />
      <TextField
        label="Search Contests"
        onChange={handleSearchChange} // Update onChange handler
        placeholder="Enter contest name"
        value={searchValue} // Use searchValue state
      />
    </div>
  );
}

export default ContestFilters;
