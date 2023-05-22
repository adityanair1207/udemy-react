import { useEffect, useState } from "react";
import DateRange, { active_status } from "../UI/DateRange";
import Search from "../UI/Search";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CampaignList.module.css";
import Header from "../UI/Header";
import DateConverter from "./DateConverter";
import { getUsersFromAPI } from "../store/users-actions";

const CampaignList = () => {
  const campaignData = useSelector((state) => state.campaignData);
  const users = useSelector((state) => state.usersData);
  const error = useSelector((state) => state.usersFetchingError);
  const loading = useSelector((state) => state.loadingData);
  const dispatch = useDispatch();
  const [displayCampaigns, setDisplayCampaigns] = useState(campaignData);

  useEffect(() => {
    dispatch(getUsersFromAPI());
  }, [dispatch]);

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
      <Header>
        <DateRange onDateSubmit={submittedDateRange} />
        <Search onSearchChange={searchActive} />
      </Header>

      <table className={styles.table}>
        <thead>
          <tr className={styles.tableRow}>
            <th>Campaign Name</th>
            <th>User Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Budget (in $USD)</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={6}>Fetching data...</td>
            </tr>
          )}
          {displayCampaigns.length === 0 && !error && (
            <tr>
              <td colSpan={6}>No campaigns found.</td>
            </tr>
          )}
          {!loading && error && (
            <tr style={{ color: "red" }}>
              <td colSpan={6}>{error}</td>
            </tr>
          )}
          {!loading &&
            !error &&
            users !== [] &&
            displayCampaigns.map((campaign) => {
              return (
                <tr key={campaign.id} className={styles.tableRow}>
                  <td>{campaign.name}</td>
                  <td>{getUsername(campaign.userId)}</td>
                  <td>{DateConverter(campaign.startDate)}</td>
                  <td>{DateConverter(campaign.endDate)}</td>
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
      </table>
    </>
  );
};

export default CampaignList;
