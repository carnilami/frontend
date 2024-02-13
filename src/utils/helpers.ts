import Cookies from "js-cookie";

export const validateAuthCookies = () => {
  const sessionID = Cookies.get("connect.sid");
  return sessionID
    ? {
        Cookie: `connect.sid=${sessionID}`,
      }
    : false;
};