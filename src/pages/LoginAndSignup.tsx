import { useState } from "react";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";

export default function LoginAndSignup() {
  const [actionType, setActionType ] = useState('')
  return (
    <div className="login-signup">
      <Login actionType={actionType} setActionType={setActionType} />
      <SignUp actionType={actionType} setActionType={setActionType} />
    </div>
  );
}
