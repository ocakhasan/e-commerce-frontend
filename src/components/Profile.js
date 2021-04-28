import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom'

const Profile = () => {

    const [profileData, setProfileData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(false)

    useEffect(() => {
        const logged = window.localStorage.getItem('logged')
        if (logged) {
            setProfileData(JSON.parse(logged))
            setLoading(false)
            setUser(true)
        } else {
            setUser(false)
            setLoading(false)
        }
    }, [])

    if (loading) {
        return (
            <div>
                <Alert severity="infor">Loading Profile Page</Alert>
                <CircularProgress />
            </div>
        )
    } else if (!loading && !user) {
        return (
            <div>
                <Alert severity="info">First you need to login to have a profile page. You can login from <Link to="/login">here</Link></Alert>
            </div>
        )
    } else if (!loading && !profileData) {
        return (
            <Alert severity="error">There is a problem</Alert>
        )
    } else {
        return (
            <Box>
                <Box>
                    <h1>{profileData.username}</h1>
                </Box>
            </Box>
        )

    }

}

export default Profile