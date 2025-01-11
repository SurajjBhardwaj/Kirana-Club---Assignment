import React, { useState, useEffect } from "react";
import {
  Page,
  Layout,
  Card,
  SkeletonPage,
  SkeletonBodyText,
  Button,
  ButtonGroup,
} from "@shopify/polaris";
import ContestList from "./components/ContestList";
import { fetchContests } from "./api";
import ContestFilters from "./components/ContestFilters";
import ContestGraph from "./components/ContentGraph";
import DivisionPieChart from "./components/DivisionPieChart";

function App() {
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ type: "", search: "" });
  const [graphView, setGraphView] = useState("bar");

  useEffect(() => {
    const getContests = async () => {
      try {
        const data = await fetchContests();
        setContests(data);
        setFilteredContests(data);
      } catch (err) {
        setError("Failed to fetch contests");
      } finally {
        setLoading(false);
      }
    };

    getContests();
  }, []);

  useEffect(() => {
    const filtered = contests.filter((contest) => {
      const searchRegex = new RegExp(filters.search.replace(/\s+/g, ".*"), "i");
      return (
        (filters.type === "" || contest.type === filters.type) &&
        searchRegex.test(contest.name)
      );
    });
    setFilteredContests(filtered);
  }, [filters, contests]);

  return (
    <Page title="Codeforces Contest Dashboard">
      <Layout>
        {/* Contest Filters Section */}
        <Layout.Section>
          <Card>
            {loading ? (
              <SkeletonPage title="Filters" primaryAction>
                <SkeletonBodyText lines={2} />
              </SkeletonPage>
            ) : (
              <ContestFilters filters={filters} setFilters={setFilters} />
            )}
          </Card>
        </Layout.Section>

        {/* Contest List Section */}
        <Layout.Section>
          <Card>
            {loading ? (
              <SkeletonPage title="Contests" primaryAction>
                <SkeletonBodyText lines={10} />
              </SkeletonPage>
            ) : (
              <ContestList
                contests={filteredContests}
                loading={loading}
                error={error}
              />
            )}
          </Card>
        </Layout.Section>

        {/* Contest Graph Section */}
        <Layout.Section>
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "16px",
              }}
            >
              <ButtonGroup segmented>
                <Button onClick={() => setGraphView("bar")}>Bar Chart</Button>
                <Button onClick={() => setGraphView("line")}>Line Chart</Button>
                <Button onClick={() => setGraphView("area")}>Area Chart</Button>
              </ButtonGroup>
            </div>
            {loading ? (
              <div style={{ padding: "16px" }}>
                {/* Y-Axis skeleton */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "8px",
                  }}
                >
                  {Array.from({ length: 10 }).map((_, index) => (
                    <div
                      key={index}
                      style={{
                        width: "20px",
                        height: `${(index + 1) * 20}px`,
                        backgroundColor: "#f4f6f8",
                        borderRadius: "4px",
                      }}
                    ></div>
                  ))}
                </div>
                <SkeletonBodyText lines={1} />
              </div>
            ) : (
              <ContestGraph contests={filteredContests} view={graphView} />
            )}
          </Card>
        </Layout.Section>

        {/* Division Pie Chart Section */}
        <Layout.Section>
          <Card>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px", // Adjust the height to match your layout
                }}
              >
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    background: "conic-gradient(#f4f6f8 25%, transparent 25%)",
                    border: "8px solid #f4f6f8",
                    animation: "spin 1.5s linear infinite",
                  }}
                />
              </div>
            ) : (
              <DivisionPieChart contests={filteredContests} />
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default App;
