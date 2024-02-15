import React from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

const UsersList = (props) => {
  const userSearchText = useSelector((state) => state.search.userSearchText);
  const locationSearchText = useSelector(
    (state) => state.search.locationSearchText
  );

  console.log("userinfo: ", userSearchText, locationSearchText);

  const filteredUsers = props.usersInfo.filter((eachUserInfo) => {
    if (userSearchText && !locationSearchText) {
      return eachUserInfo?.name
        ?.toLowerCase()
        .includes(userSearchText.toLowerCase());
    } else if (!userSearchText && locationSearchText) {
      return eachUserInfo?.location
        ?.toLowerCase()
        .includes(locationSearchText.toLowerCase());
    } else {
      return (
        eachUserInfo?.name
          ?.toLowerCase()
          .includes(userSearchText.toLowerCase()) &&
        eachUserInfo?.location
          ?.toLowerCase()
          .includes(locationSearchText.toLowerCase())
      );
    }
  });

  console.log("filteredUsers: ", filteredUsers);

  return filteredUsers.map((eachUserInfo) => (
    <UserCard key={eachUserInfo.id} userInfo={eachUserInfo} />
  ));
};

export default UsersList;
