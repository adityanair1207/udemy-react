import { useDispatch } from "react-redux";
import { campaignActions } from "../store/campaign-slice";
import { useEffect } from "react";

const AddTestCampaigns = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.data === null || props.data === [] || props.data === undefined) {
      return;
    }

    props.data.forEach((campaign) => {
      dispatch(campaignActions.addCampaign(campaign));
    });
  }, [dispatch, props.data]);
};

export default AddTestCampaigns;
