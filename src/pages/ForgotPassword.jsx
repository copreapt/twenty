import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { forgotPassword } from "../features/user/userSlice";
import { FormRow } from "../components";


const initialState = {
  email:'',
};

const ForgotPassword = () => {


const [values, setValues] = useState(initialState);

const {isLoading, formSubmitted } = useSelector((store) => store.user);
const dispatch = useDispatch();

const handleChange = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  setValues({ ...values, [name]: value });
};

const onSubmit = (e) => {
  e.preventDefault();
  const { email } = values;
  if (!email) {
    toast.error("Please fill out the fields");
    return;
  }
  dispatch(forgotPassword({ email }));
};

  return (
    <div className="h-screen flex flex-col items-center align-center justify-center space-y-20">
      <h1 className="text-semibold text-2xl text-center">
        {formSubmitted
          ? "Please check your email for reset password link"
          : "Please insert your email to reset the password"}
      </h1>
      <form
        className={`"flex flex-col gap-4" ${formSubmitted ? "hidden" : ""}`}
        onSubmit={onSubmit}
        action="submit"
      >
        {/* Email */}
        <FormRow
          type="email"
          name="email"
          value={values.name}
          handleChange={handleChange}
        />
        {/* submit button */}
        <div className="text-center mt-5">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-cyan-300 w-full rounded-sm p-1 hover:bg-cyan-700 hover:text-white ease-in-out duration-700"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
