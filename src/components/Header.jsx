import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
// import userSvg from "../../assets/user.svg";
function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  function logout() {
    auth.signOut();
    navigate("/SignIn");
  }

  useEffect(() => {
    if (!user) {
      navigate("/signIn");  // Redirect to home if not logged in
    } else if (window.location.pathname === "/dashboard") {
      navigate("/dashboard");  // Only navigate if already on home
    }
  }, [user, navigate]);
  

  return (
    <div className="bg-blue-500 flex h-[50px] justify-between px-2 items-center">
      <p className="font-extrabold text-white">Financly.</p>
      {user ? (
        <p className="cursor-pointer font-extrabold text-white" onClick={logout}>
          {/* <span style={{ marginRight: "1rem" }}>
            <img
              src={user.photoURL ? user.photoURL : userSvg}
              width={user.photoURL ? "32" : "24"}
              style={{ borderRadius: "50%" }}
            />
          </span> */}
          Logout
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Header;


