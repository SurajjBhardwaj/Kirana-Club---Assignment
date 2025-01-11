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
import DivisionPieChart from "./components/DivisionPieChart"; // Ensure correct import

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
        <Layout.Section>
          <Card>
            <ContestFilters filters={filters} setFilters={setFilters} />
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <ContestList
              contests={filteredContests}
              loading={loading}
              error={error}
            />
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "16px" }}>
              <ButtonGroup segmented>
                <Button onClick={() => setGraphView("bar")}>Bar Chart</Button>
                <Button onClick={() => setGraphView("line")}>Line Chart</Button>
                <Button onClick={() => setGraphView("area")}>Area Chart</Button>
              </ButtonGroup>
            </div>
            {loading ? (
              <SkeletonPage primaryAction>
                <Card sectioned>
                  <SkeletonBodyText />
                </Card>
              </SkeletonPage>
            ) : (
              <ContestGraph contests={filteredContests} view={graphView} />
            )}
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            {loading ? (
              <SkeletonPage primaryAction>
                <Card sectioned>
                  <SkeletonBodyText />
                </Card>
              </SkeletonPage>
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
