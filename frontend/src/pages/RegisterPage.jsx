import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraStream(stream);
      }
    } catch (err) {
      console.error("Camera access failed", err);
      setError("Failed to access the camera.");
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  useEffect(() => {
    if (isFlipped) {
      startCamera();
    } else {
      stopCamera();
    }
    // Clean up when component unmounts
    return stopCamera;
  }, [isFlipped]);

  const handleEnrollFace = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Placeholder logic for enrolling the face
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccess("Face enrolled successfully!");
    } catch (err) {
      setError("Failed to enroll the face. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  // const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await registerUser({ email, password });
      setSuccess("Registration successful! Redirecting ...");
      // Trigger the flip animation
      setIsFlipped(true);

      // Clear input fields after a short delay to show the flip animation
      setTimeout(() => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setSuccess("");
      }, 1000);
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div
        className={`w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition-all duration-1000 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {!isFlipped ? (
          <>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center">
              Create Your Account
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
              Sign up to get started
            </p>
            {error && (
              <div className="mb-4 p-3 text-red-700 bg-red-100 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 text-green-700 bg-green-100 rounded-lg">
                {success}
              </div>
            )}
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                Sign in
              </a>
            </p>
          </>
        ) : (
          <div className="mt-4 text-center transform transition-all duration-1000 rotate-y-180">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Enroll Your Face
            </h2>
            {/* Placeholder for Camera View */}
            <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                width="300"
                style={{ transform: "scaleX(-1)", backgroundColor: "black" }}
                className="w-full h-full object-cover"
              />
            </div>
            {error && (
              <div className="mb-4 p-3 text-red-700 bg-red-100 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 text-green-700 bg-green-100 rounded-lg">
                {success}
              </div>
            )}
            {/* Enroll Button */}
            <button
              onClick={handleEnrollFace}
              className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 ${
                loading ? "opacity-60" : "hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "Enrolling..." : "Enroll Now"}
            </button>

            {/* Instructions */}
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-center text-sm">
              Position your face in front of the camera and click{" "}
              <strong>Enroll Now</strong>.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RegistrationPage;