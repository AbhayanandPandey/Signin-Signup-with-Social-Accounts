import React from "react";

const Dashboard = () => {
    const user =
    {
        name: "John Doe",
        email: "bcaabhay2022@gmail.com",
        profilePic: "https://tse4.mm.bing.net/th?id=OIP.hGSCbXlcOjL_9mmzerqAbQHaHa&pid=Api&P=0&h=180"
    }

    const onLogout = () => {
        window.location.pathname="/login";
        console.log("User logged out");
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
