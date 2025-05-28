import React, { useState } from "react";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleNext = () => {
    if (email) {
      setStep(2);
    } else {
      alert("Please enter your email");
    }
  };

  const handleSave = () => {
    if (newPassword) {
      alert(`Password for ${email} updated successfully!`);
      setStep(1);
      setEmail("");
      setNewPassword("");
    } else {
      alert("Please enter a new password");
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-6">
        <h2 className="text-xl font-semibold text-center">Forgot Password</h2>

        {step === 1 && (
          <>
            <label className="block text-sm font-medium text-gray-700">
              Enter your email
            </label>
            <input
              type="email"
              className="input input-bordered w-full mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <div className="flex justify-between mt-4">
              <button onClick={handleBack} className="btn btn-outline">
                Back
              </button>
              <button onClick={handleNext} className="btn btn-primary">
                Next
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-sm text-gray-600 mb-0">
              Set a new password for <span className="font-medium">{email}</span>
            </p>
            <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
              Enter OTP 
            </label>
            <input
              type="text"
              className="input input-bordered w-full mt-1 mb-2"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              className="input input-bordered w-full mt-1"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
            />
            <div className="flex justify-between mt-4">
              <button onClick={handleBack} className="btn btn-outline">
                Back
              </button>
              <button onClick={handleSave} className="btn btn-success">
                Save Password
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
