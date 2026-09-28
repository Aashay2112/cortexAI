import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase";
import api from "../../utils/axios";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Home() {
  const {userData}=useSelector(state=>state.user)
  const dispatch=useDispatch()
  console.log(userData)
  const handleLogin = async (token) => {
    try {
      const { data } = await api.post("/api/auth/login", { token });

      dispatch(setUserData(data))
    } catch (error) {
      console.error(
        "Backend Login Error:",
        error.response?.data?.error || error.response?.data?.message || error.message,
      );

      throw error;
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;

      const token = await user.getIdToken();
      const backendUser = await handleLogin(token);

      console.log("User:", backendUser);
      console.log("Logged in successfully!");
    } catch (error) {
      console.error("Google Login Error:", error.code, error.message);
    }
  };

  return (
    <div className="h-screen flex bg-[#0d0f14] text-white overflow-hidden">

      {!userData && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
        <div className="w-[340px] bg-[#13151c] border border-white/0.08 rounded-2xl p-7 flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-[17px] font-semibold text-slate-100 tracking-tight">
              Welcome to CortexAI
            </h2>

            <p className="text-[13px] text-slate-500">
              Please login to continue using the app.
            </p>
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-[11px] rounded-xl text-sm font-medium text-black/90 bg-white hover:bg-gray-200 transition-all duration-150 cursor-pointer" onClick={googleLogin}>
            <FcGoogle size={15} />
            Continue with Google
          </button>
        </div>
      </div>}

      
    </div>
  );
}

export default Home;
