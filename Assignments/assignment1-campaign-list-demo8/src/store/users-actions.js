import { campaignActions } from "./campaign-slice";

export const getUsersFromAPI = () => {
  return async (dispatch) => {
    const fetchUsersData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        dispatch(campaignActions.changeLoading());
        throw new Error();
      }

      return await response.json();
    };

    try {
      dispatch(campaignActions.changeLoading());

      const usersData = await fetchUsersData();
      dispatch(campaignActions.addUsers(usersData));

      dispatch(campaignActions.changeLoading());
    } catch (error) {
      dispatch(
        campaignActions.addError(
          "User data could not be fetched for the campaigns."
        )
      );
    }
  };
};
