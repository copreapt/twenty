import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { FormRow } from "../components";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const initialState = {
  password:'',
};

const ResetPassword = () => {
    const [values, setValues] = useState(initialState);
    const { isLoading, error, formSubmitted } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const query = useQuery();

    const handleChange = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  setValues({ ...values, [name]: value });
};

const onSubmit = (e) => {
  e.preventDefault();
  const { password } = values;
  if (!password) {
    toast.error("Please fill out the fields");
    return;
  }
  dispatch(
    resetPassword({
      token: query.get("token"),
      email: query.get("email"),
      password: values.password,
    })
  );
};

useEffect(() => {
    if(formSubmitted){
    setTimeout(() => {
      navigate("/login");
    }, 5000); 
    }
},[formSubmitted])

    if (isLoading)
        return (
        <>
            <div className="flex justify-center items-center align-center h-screen">
            <h1 className="text-3xl">Loading...</h1>
            </div>
        </>
        );
    if (error !== "")
        return (
        <>
            <div>
            <div className="flex justify-center items-center align-center h-screen">
                <h1 className="text-3xl">{error}</h1>
            </div>
            </div>
        </>
        );
    return (
      <>
        <div className="h-screen flex flex-col items-center align-center justify-center space-y-20">
          <h1 className="text-semibold text-2xl text-center">
            {formSubmitted
              ? "Succes! Your password has been changed"
              : "Please insert your new password"}
          </h1>
          <form
            className={`flex flex-col gap-4 ${formSubmitted ? "hidden" : ""}`}
            onSubmit={onSubmit}
            action="submit"
          >
            {/* Password */}
            <FormRow
              type="password"
              name="password"
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
                Change Password
              </button>
            </div>
          </form>
        </div>
      </>
    );
};

export default ResetPassword;
