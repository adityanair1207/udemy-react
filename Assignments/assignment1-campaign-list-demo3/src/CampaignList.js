import Table from "react-bootstrap/Table";
import getUsersFromAPI from "./UserAPIFetch";
import { useEffect, useState } from "react";
import DateRange, { active_status } from "./DateRange";
import Search from "./Search";
import { useSelector } from "react-redux";

const CampaignList = () => {
  const campaignData = useSelector((state) => state.campaignData);

  const [users, setUsers] = useState();
  const [displayCampaigns, setDisplayCampaigns] = useState(campaignData);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      setUsers(
        await getUsersFromAPI().catch((error) => {
          setError(error.message);
        })
      );
      setLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    setDisplayCampaigns(campaignData);
  }, [campaignData]);

  const getUsername = (id) => {
    if (users === undefined) {
      return;
    }

    let user = users.find((user) => user.id === id);
    if (user === undefined) {
      return "Unknown User";
    }
    return user.name;
  };

  const submittedDateRange = (startDate, endDate) => {
    if (
      startDate.toString() === "Invalid Date" ||
      endDate.toString() === "Invalid Date"
    ) {
      setDisplayCampaigns(campaignData);
      return;
    }

    setDisplayCampaigns(
      campaignData.filter((campaign) => {
        let dateFrom = campaign.startDate;
        let dateTo = campaign.endDate;

        let d1 = dateFrom.split("/");
        let d2 = dateTo.split("/");

        dateFrom = new Date(d1[2], d1[0] - 1, d1[1]);
        dateTo = new Date(d2[2], d2[0] - 1, d2[1]);

        if (
          (dateFrom >= startDate && dateFrom <= endDate) ||
          (dateTo >= startDate && dateTo <= endDate)
        ) {
          return true;
        }
        return false;
      })
    );
  };

  const searchActive = (str) => {
    setDisplayCampaigns(
      campaignData.filter((campaign) => {
        let name = campaign.name.toLowerCase();
        str = str.toLowerCase();
        return name.includes(str);
      })
    );
  };

  return (
    <>
      <header
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "4px",
        }}
      >
        <DateRange onDateSubmit={submittedDateRange} />
        <Search onSearchChange={searchActive} />
      </header>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Campaign Name</th>
            <th>User Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Budget</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr style={{ textAlign: "center" }}>
              <td colSpan={6}>Fetching data...</td>
            </tr>
          )}
          {displayCampaigns.length === 0 && (
            <tr style={{ textAlign: "center" }}>
              <td colSpan={6}>No matches found.</td>
            </tr>
          )}
          {!loading && error && (
            <tr style={{ color: "red", textAlign: "center" }}>
              <td colSpan={6}>{error}</td>
            </tr>
          )}
          {!loading &&
            !error &&
            displayCampaigns.map((campaign) => {
              return (
                <tr key={campaign.id}>
                  <td>{campaign.name}</td>
                  <td>{getUsername(campaign.userId)}</td>
                  <td>{campaign.startDate}</td>
                  <td>{campaign.endDate}</td>
                  <td>
                    {active_status(campaign.startDate, campaign.endDate) ? (
                      <span style={{ color: "green" }}>Active</span>
                    ) : (
                      <span style={{ color: "red" }}>Inactive</span>
                    )}
                  </td>
                  <td>{campaign.Budget}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default CampaignList;