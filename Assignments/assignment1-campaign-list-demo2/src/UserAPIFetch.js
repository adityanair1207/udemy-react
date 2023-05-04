const getUsersFromAPI = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const responseData = await response.json();
  return responseData;
};

export default getUsersFromAPI;
