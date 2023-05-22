import React, { useState } from "react";
import CampaignList from "./CampaignList/CampaignList";
import CampaignForm from "./CampaignForm/CampaignForm";
import AddTestCampaigns from "./Test/AddTestCampaigns";

function App() {
  const [data, setData] = useState(null);

  const AddCampaigns = (data) => {
    setData(data);

    if (data === undefined) {
      return 0 + " campaigns added.";
    }

    return data.length + " campaigns added.";
  };

  window.AddCampaigns = AddCampaigns;

  return (
    <>
      <CampaignList />
      <CampaignForm />
      <AddTestCampaigns data={data} />
    </>
  );
}

export default App;
