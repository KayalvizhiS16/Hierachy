import axios from "axios";
import React, { createContext } from "react";
import { useContext } from "react";
import AuthContext from "./AuthContext";

const UserContext = createContext();

const UserContextProvider = (props) => {
  const { loggedIn } = useContext(AuthContext);
  const [userData, setUserData] = React.useState([]);
  //username
  const userToken = localStorage.getItem("token");
  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/loggedin", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        const { foundUser } = response.data || {};
        setUserData(foundUser);
      } catch (error) {
        console.error("Error on fetch user:", error);
      }
    };

    if (loggedIn === true && userToken) {
      fetchUser();
    }
  }, [loggedIn, userToken]);

  return (
    <UserContext.Provider value={{ userData }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
export { UserContextProvider };
