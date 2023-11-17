import {useState} from 'react';
import {toast} from "react-toastify";
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import { registerUser } from '../features/user/userSlice';
import { FormRow } from '../components';

const initialState = {
  fullName: '',
  email: '',
  username: '',
  password: '',
}


const Register = () => {

  const [values, setValues] = useState(initialState);

  const {formSubmitted, isLoading} = useSelector(store => store.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({...values, [name]: value})
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const {fullName, email, password, username} = values
    if(!email || !password || !fullName || !username){
      toast.error('Please fill out the fields');
      return;
    }
    dispatch(registerUser({fullName, email, password, username}))
  }



  return (
    <>
      <main>
        {/* container */}
        <div
          className={`${
            formSubmitted ? "center-div py-20" : "center-div border border-gray-400 py-20"
          }`}
        >
          <div className="flex flex-col align-center items-center">
            <h1 className="text-2xl text-black text-center">
              {formSubmitted
                ? "Account Created! Please check your email to verify the account"
                : "Register to Twenty"}
            </h1>
            <form
              className={`pt-10 flex flex-col px-10 gap-4 ${
                formSubmitted ? "hidden" : ""
              }`}
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
              {/* Full Name */}
              <FormRow
                type="text"
                name="fullName"
                value={values.name}
                handleChange={handleChange}
                labelText="full name"
              />
              {/* Username */}
              <FormRow
                type="text"
                name="username"
                value={values.name}
                handleChange={handleChange}
              />
              {/* Password */}
              <FormRow
                type="password"
                name="password"
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
          </div>
          {/* register and forgot password */}
          <div
            className={`"pt-10 text-center space-y-3" ${
              formSubmitted ? "hidden" : ""
            }`}
          >
            {/* Login */}
            <div>
              <span>Already have an account?</span>{" "}
              <Link
                to={"/login"}
                className="font-medium text-cyan-700 hover:text-cyan-400 ease-in-out duration-700"
              >
                Login Here
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Register