import { useState } from "react";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { updateUserPassword } from "../features/user/userSlice";
import { FormRow } from "../components";


const initialState = {
  newPassword:'',
  oldPassword:'',
};

const ForgotPassword = () => {


const [values, setValues] = useState(initialState);

const {isLoading } = useSelector((store) => store.user);
const dispatch = useDispatch();

const handleChange = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  setValues({ ...values, [name]: value });
};

const onSubmit = (e) => {
  e.preventDefault();
  const { newPassword, oldPassword } = values;
  if (!newPassword || !oldPassword) {
    toast.error("Please fill out the fields");
    return;
  }
  dispatch(updateUserPassword({ newPassword, oldPassword}));
};

  return (
    <form
      className="pt-10 flex flex-col px-10 gap-4"
      onSubmit={onSubmit}
      action="submit"
    >
      {/* Password */}
      <FormRow
        type="password"
        name="newPassword"
        value={values.name}
        handleChange={handleChange}
      />
      {/* Password */}
      <FormRow
        type="password"
        name="oldPassword"
        value={values.name}
        handleChange={handleChange}
      />
      {/* submit button */}
      <div className="text-center">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-cyan-300 w-full rounded-sm p-1 hover:bg-cyan-700 hover:text-white ease-in-out duration-700"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;
