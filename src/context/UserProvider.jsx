import { createContext, useState } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

const UserProvider = ({ children, initialUser }) => {
  const [userData, setUserData] = useState(initialUser);

  const updateUser = (newData) => {
    setUserData(newData);
  };

  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
  initialUser: PropTypes.object, // Define the prop type for initialUser
};

export default UserProvider;
