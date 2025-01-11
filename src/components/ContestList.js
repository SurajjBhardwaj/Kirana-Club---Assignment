import React, { useState } from "react";
import {
  DataTable,
  Pagination,
  SkeletonPage,
  SkeletonBodyText,
  Card,
} from "@shopify/polaris";

function ContestList({ contests, loading, error }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  if (loading) {
    return (
      <SkeletonPage primaryAction>
        <Card sectioned>
          <SkeletonBodyText />
        </Card>
      </SkeletonPage>
    );
  }

  if (error) return <p>{error}</p>;

  const totalPages = Math.ceil(contests.length / pageSize);
  const paginatedContests = contests.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const rows = paginatedContests.map((contest) => [
    contest.id,
    contest.name,
    contest.type,
    contest.phase,
    new Date(contest.startTimeSeconds * 1000).toLocaleString(),
  ]);

  return (
    <>
      <DataTable
        columnContentTypes={["numeric", "text", "text", "text", "text"]}
        headings={["ID", "Name", "Type", "Phase", "Start Time"]}
        rows={rows}
      />
      <Pagination
        hasPrevious={currentPage > 1}
        onPrevious={() => setCurrentPage(currentPage - 1)}
        hasNext={currentPage < totalPages}
        onNext={() => setCurrentPage(currentPage + 1)}
      />
    </>
  );
}

export default ContestList;
