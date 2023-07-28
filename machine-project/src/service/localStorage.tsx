const ACCESS_TOKEN = "accessToken";

const getToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};
const setToken = (data: string) => {
  localStorage.setItem(ACCESS_TOKEN, data);
};
const deleteToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};

export { getToken, setToken, deleteToken };
