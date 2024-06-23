import React, { createContext, useContext, useState } from 'react';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const [dashboardFilter, setDashboardFilter] = useState('');
    return (
        <UserContext.Provider value={{ userData, setUserData, dashboardData, setDashboardData, dashboardFilter, setDashboardFilter }}>
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
