import React, { Dispatch, SetStateAction, useActionState, useState } from "react";
import Input from "../Input";
import {
  isValidEmail,
  matchPassword,
  isNotEmpty,
  hasMinLength,
} from "../../utils/useHandleValidation";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth-actions";
import { AppDispatch, RootState } from "../../redux/store";
import { setError } from "../../redux/todoListSlice";

interface FormState {
  errors: string[] | null;
  enteredValue?: {
    name:String,
    email: string;
    password: string;
    confirmPassword: string
  };
}

interface SignUpProps {
  actionType: string;
  setActionType: Dispatch<SetStateAction<string>>
}


const SignUp:React.FC<SignUpProps> = ({actionType,setActionType}) => {
  const dispatch = useDispatch<AppDispatch>();
  const errorState = useSelector((state: RootState)=> state.todoList.error )
  const [userSignUpMessage,setUserSignUpMessage ] = useState('')

  async function signUpAction(prevState:FormState, formdata:FormData) {
    const name = formdata.get("name") as string;
    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;
    const confirmPassword = formdata.get("confirm-password") as string;

    let errors = [];

    if (!isNotEmpty(name) || !hasMinLength(name, 3)) {
      errors.push("You must enter name with minimun 3 characters");
    }

    if (!isValidEmail(email)) {
      errors.push("Invalid Email Address.");
    }

    if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
      errors.push("You must provide a password with at least six charcters.");
    }

    if (!matchPassword(password, confirmPassword)) {
      errors.push("Password and Confirm Password should be same.");
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValue: {
          name,
          email,
          password,
          confirmPassword,
        },
      };
    }

    if (errors.length === 0) {
      setActionType('sign-up')
      await dispatch(register({ name, email, password }));
      setUserSignUpMessage("Registered Successfull! Please login with credentials")
      setTimeout(()=> {
        setUserSignUpMessage('')
        dispatch(setError(''))
      },5000)
    }


    return {
      errors: null,
    };
  }

  const [formState, formAction] = useActionState(signUpAction, {
    errors: null,
  });
  

  return (
    <form action={formAction}>
      <div className="sign-up">
        {userSignUpMessage && errorState.length === 0&&<p className="success">{userSignUpMessage}</p>}
        <h1>SignUp</h1>
        {errorState.length > 1 && actionType==='sign-up'&& (<p className="error">Failed with {errorState}</p>) }        
        <Input
          id="name"
          label="Name"
          type="text"
          name="name"
          defaultValue={formState.enteredValue?.email}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          name="email"
          defaultValue={formState.enteredValue?.email}
        />
        <Input id="password" label="Password" type="password" name="password" />
        <Input
          id="confirm-password"
          label="Confirm-Password"
          type="password"
          name="confirm-password"
        />
        <p className="submit-button">
          <button className="button">SignUp</button>
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

export default SignUp
  