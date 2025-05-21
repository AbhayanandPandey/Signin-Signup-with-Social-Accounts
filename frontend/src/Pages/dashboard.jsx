import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
         const fetchUser = async () => {
            try {
                //"http://localhost:5001/api/auth/user"
                
                const res = await axios.get("https://signin-signup-with-social-accounts.onrender.com/api/auth/user", {
                    withCredentials: true,
                });
                setUser(res.data);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } catch (err) {
                console.error("Error fetching user:", err);
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const onLogout = async () => {
        try {
            await axios.get("https://signin-signup-with-social-accounts.onrender.com/api/auth/logout", { withCredentials: true });
            window.location.replace("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <span className="loading loading-spinner text-error text-9xl"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 text-center space-y-6">
                <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
                />
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                </div>
                <button
                    onClick={onLogout}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md transition cursor-pointer"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
