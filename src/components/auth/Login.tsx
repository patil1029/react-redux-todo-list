import React, { Dispatch, SetStateAction, useActionState } from "react";
import Input from "../Input";
import { isValidEmail } from "../../utils/useHandleValidation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth-actions";
import { redirect } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { setError } from "../../redux/todoListSlice";

interface FormState {
  errors: string[] | null;
  enteredValue?: {
    email: string;
    password: string;
  };
}

interface LoginProps {
  actionType: string;
  setActionType: Dispatch<SetStateAction<string>>
}

const Login:React.FC<LoginProps> = ({actionType, setActionType}) => {
  const dispatch = useDispatch<AppDispatch>();
  const errorState = useSelector((state: RootState)=> state.todoList.error )
  function loginAction(prevState:FormState, formdata:FormData) {
    const email = formdata.get("login-email") as string;
    const password = formdata.get("login-password") as string;

    let errors = [];

    if (!isValidEmail(email)) {
      errors.push("Invalid Email Address.");
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValue: {
          email,
          password,
        },
      };
    }

    if (errors.length === 0) {
      setActionType('login')
      dispatch(login({ email, password }));
      setTimeout(()=> {
        dispatch(setError(''))
      },5000)
      redirect("/");
    }

    return {
      errors: null,
    };
  }

  const [formState, formAction] = useActionState(loginAction, {
    errors: null,
  });

  return (
    <form action={formAction}>
      <div className="login">
        <h1>Login</h1>
        {errorState.length > 1 && actionType==='login'&& (<p className="error">{errorState}</p>) }
        <Input
          id="login-email"
          label="Email"
          type="email"
          name="login-email"
          defaultValue={formState.enteredValue?.email}
        />
        <Input
          id="login-password"
          label="Password"
          type="password"
          name="login-password"
        />
        <p className="submit-button">
          <button className="button">Login</button>
        </p>
        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}

export default Login