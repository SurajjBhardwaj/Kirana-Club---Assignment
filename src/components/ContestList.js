import React, { useState } from "react";
import {
  DataTable,
  Pagination,
  SkeletonPage,
  SkeletonBodyText,
  Card,
  SkeletonDisplayText,
} from "@shopify/polaris";

function ContestList({ contests, loading, error }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  if (loading) {
    return (
      <SkeletonPage title="Contest List" primaryAction>
        <Card sectioned>
          <SkeletonDisplayText size="medium" />
          <SkeletonBodyText lines={3} />
        </Card>
        <Card>
          <div style={{ padding: "16px" }}>
            <SkeletonBodyText lines={1} />
            {Array.from({ length: pageSize }).map((_, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: "1px solid #f4f6f8",
                }}
              >
                <SkeletonBodyText lines={1} style={{ width: "15%" }} />
                <SkeletonBodyText lines={1} style={{ width: "30%" }} />
                <SkeletonBodyText lines={1} style={{ width: "20%" }} />
                <SkeletonBodyText lines={1} style={{ width: "15%" }} />
                <SkeletonBodyText lines={1} style={{ width: "20%" }} />
              </div>
            ))}
          </div>
        </Card>
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <SkeletonBodyText lines={1} style={{ width: "100px" }} />
        </div>
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
