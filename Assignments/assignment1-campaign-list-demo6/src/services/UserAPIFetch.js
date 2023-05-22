const getUsersFromAPI = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error("User data could not be fetched for the campaigns.");
  }

  return await response.json();
};

export default getUsersFromAPI;
