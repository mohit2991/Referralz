import React, { createContext, useContext, useState } from 'react';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const [todayActivityData, setTodayActivityData] = useState(null);
    const [leadData, setLeadData] = useState(null);
    const [dashboardFilter, setDashboardFilter] = useState('');
    return (
        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData, setUserData, dashboardData, setDashboardData, dashboardFilter, setDashboardFilter, todayActivityData, setTodayActivityData, leadData, setLeadData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
