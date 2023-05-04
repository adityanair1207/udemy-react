import Table from "react-bootstrap/Table";
import getUsers from "./UserAPIFetch";
import { useEffect, useState } from "react";
import DateRange from "./DateRange";
import Search from "./Search";

let CAMPAIGN_DATA = [
  {
    id: 1,
    name: "Divavu",
    startDate: "9/19/2021",
    endDate: "3/9/2023",
    Budget: 88377,
    userId: 13,
  },
  {
    id: 2,
    name: "Jaxspan",
    startDate: "11/21/2023",
    endDate: "2/21/2024",
    Budget: 608715,
    userId: 6,
  },
  {
    id: 3,
    name: "Miboo",
    startDate: "11/1/2022",
    endDate: "6/20/2022",
    Budget: 239507,
    userId: 7,
  },
  {
    id: 4,
    name: "Trilith",
    startDate: "8/25/2022",
    endDate: "11/30/2022",
    Budget: 179838,
    userId: 1,
  },
  {
    id: 5,
    name: "Layo",
    startDate: "11/28/2017",
    endDate: "3/10/2023",
    Budget: 837850,
    userId: 9,
  },
  {
    id: 6,
    name: "Photojam",
    startDate: "7/25/2019",
    endDate: "6/23/2021",
    Budget: 858131,
    userId: 3,
  },
  {
    id: 7,
    name: "Blogtag",
    startDate: "6/27/2019",
    endDate: "1/15/2021",
    Budget: 109078,
    userId: 2,
  },
  {
    id: 8,
    name: "Rhyzio",
    startDate: "10/13/2020",
    endDate: "1/25/2022",
    Budget: 272552,
    userId: 4,
  },
  {
    id: 9,
    name: "Zoomcast",
    startDate: "9/6/2021",
    endDate: "11/10/2023",
    Budget: 301919,
    userId: 8,
  },
  {
    id: 10,
    name: "Realbridge",
    startDate: "3/5/2021",
    endDate: "10/2/2026",
    Budget: 505602,
    userId: 5,
  },
];

const active_status = (dateFrom, dateTo) => {
  let dateCheck = new Date();

  if (dateFrom === undefined || dateTo === undefined) {
    return;
  }

  let d1 = dateFrom.split("/");
  let d2 = dateTo.split("/");

  dateFrom = new Date(d1[2], d1[0] - 1, d1[1]);
  dateTo = new Date(d2[2], d2[0] - 1, d2[1]);

  return dateCheck > dateFrom && dateCheck < dateTo;
};

const CampaignList = () => {
  const [users, setUsers] = useState();
  const [displayCampaigns, setDisplayCampaigns] = useState(CAMPAIGN_DATA);

  useEffect(() => {
    async function fetchData() {
      setUsers(await getUserData());
    }
    fetchData();
  }, []);

  const getUserData = async () => {
    const response = await getUsers();
    return response;
  };

  const get_username = (id) => {
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
    console.log(startDate.toString(), endDate.toString());
    if (
      startDate.toString() === "Invalid Date" ||
      endDate.toString() === "Invalid Date"
    ) {
      setDisplayCampaigns(CAMPAIGN_DATA);
      return;
    }

    setDisplayCampaigns(
      CAMPAIGN_DATA.filter((campaign) => {
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
      CAMPAIGN_DATA.filter((campaign) => {
        let name = campaign.name.toLowerCase();
        return name.includes(str);
      })
    );
  };

  return (
    <>
      <header style={{ display: "flex", justifyContent: "space-between" }}>
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
          {displayCampaigns.map((campaign) => {
            return (
              <tr key={campaign.id}>
                <td>{campaign.name}</td>
                <td>{get_username(campaign.userId)}</td>
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
