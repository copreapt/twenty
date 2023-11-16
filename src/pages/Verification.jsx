import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { verifyEmail } from "../features/user/userSlice";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Verification = () => {
  const { isLoading, error } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const query = useQuery();

  useEffect(() => {
      dispatch(
        verifyEmail({
          verificationToken: query.get("token"),
          email: query.get("email"),
        })
      );
  },[])

if(isLoading) return (
  <>
    <div className="flex justify-center items-center align-center h-screen">
      <h1 className="text-3xl">Loading...</h1>
    </div>
  </>
);
if(error !== '') return (
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
      <div>
        <div className="flex justify-center items-center align-center h-screen flex-col space-y-20">
          <h1 className="text-3xl">Account Confirmed</h1>
          <Link
            to="/login"
            className="text-xl bg-cyan-400 text-white py-2 px-10 cursor-pointer hover:bg-cyan-700 ease-in-out duration-500"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
}

export default Verification