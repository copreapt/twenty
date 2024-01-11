import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { FormRow } from "../components";

import { setThemeLocalStorage, setUserLocalStorage } from "../utils/utils";
import { emptyPostsArray } from "../features/posts/postSlice";


const initialState = {
  email: "",
  password: "",
};


const Login = () => {
const [values, setValues] = useState(initialState);

const { user, isLoading } = useSelector((store) => store.user);
const dispatch = useDispatch();
const navigate = useNavigate();

const handleChange = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  setValues({ ...values, [name]: value });
};

const onSubmit = (e) => {
  e.preventDefault();
  const { email, password } = values;
  if (!email || !password ) {
    toast.error("Please fill out the fields");
    return;
  }
    dispatch(loginUser({ email: email, password: password }));
    dispatch(emptyPostsArray());
    return;
};

useEffect(() => {
  if (user) {
    setUserLocalStorage(user);
    // console.log(user)
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }
}, [user]);

useEffect(() => {
  setThemeLocalStorage("white");
},[])


useEffect(() => {
  async function autoLogin() {
    const response = await fetch("/api/v1/auth/autoLogin", {
      method: "GET",
      credentials: "include",
    });
    if (response.status === 200) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }
  autoLogin();
}, []);

  return (
    <>
      <main>
        {/* container */}
        <div className="center-div border border-gray-400 py-20">
          <div className="flex flex-col align-center items-center">
            <h1 className="text-2xl text-black text-center">Twenty</h1>
            <form
              className="pt-10 flex flex-col px-10 gap-10"
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
                  ype="submit"
                  disabled={isLoading}
                  className="bg-cyan-300 w-full rounded-sm p-1 hover:bg-cyan-700 hover:text-white ease-in-out duration-700"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          {/* register and forgot password */}
          <div className="pt-10 text-center space-y-3">
            {/* register */}
            <div>
              <span>New to Twenty?</span>{" "}
              <Link
                to={"/register"}
                className="font-medium text-cyan-700 hover:text-cyan-400 ease-in-out duration-700"
              >
                Register Here
              </Link>
            </div>
            {/* forgot password */}
            <div>
              <span>Forgot Password?</span>{" "}
              <Link
                to={"/forgot-password"}
                className="font-medium text-cyan-700 hover:text-cyan-400 ease-in-out duration-700"
              >
                Reset Password
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
