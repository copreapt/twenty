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
    dispatch(verifyEmail({verificationToken: query.get('token'), email: query.get('email')}))
  },[])

if(isLoading) return <h1>Loading...</h1>
if(error !== '') return <h1>There was an error, please check your verification link</h1>
  return (
    <>
      <h1>Account Confirmed</h1>
      <Link to="/login">Login</Link>
    </>
  );
}

export default Verification