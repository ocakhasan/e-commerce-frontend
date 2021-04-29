import { Box } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";

const Profile = ({ user, setUser }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLocal, setUserLocal] = useState(false);

  useEffect(() => {
    const logged = window.localStorage.getItem("logged");
    if (logged) {
      setProfileData(JSON.parse(logged));
      setLoading(false);
      setUserLocal(true);
    } else {
      setUserLocal(false);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div>
        <Alert severity="infor">Loading Profile Page</Alert>
        <CircularProgress />
      </div>
    );
  } else if (!loading && !userLocal) {
    return (
      <div>
        <Alert severity="info">
          First you need to login to have a profile page. You can login from{" "}
          <Link to="/login">here</Link>
        </Alert>
      </div>
    );
  } else if (!loading && !profileData) {
    return <Alert severity="error">There is a problem</Alert>;
  } else {
    return (
      <Box>
        <ProfileCard profile={profileData} user={user} setUser={setUser} />
      </Box>
    );
  }
};

export default Profile;
