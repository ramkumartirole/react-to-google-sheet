import { useState, useEffect } from "react";
import SubmitButton from "./components/button/submitButton";
import { IoHomeOutline } from "react-icons/io5";
import { GoSignIn } from "react-icons/go";
import { BsPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Logout } from "./services/logout";
import MainBody from "./components/mainBody/index.js";
import Profile from "./components/profile/index.js";
import Signup from "./components/auth/signup.js"
import { clearEditUser } from "./redux/slice/Edit.js";
import { useDispatch } from "react-redux";
import ModelMain from "./components/modelMain/index.js";

export default function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [token, setToken] = useState(null)
  const [value, setValue] = useState("Home")
  const [signVal, setSignVal] = useState(false)



  useEffect(() => {
    const token = localStorage.getItem("token")
    setToken(token)

  }, [])

  return (
    <>

<div className="min-h-screen bg-gray-100 flex flex-col">
  {/* Top Navbar */}
  <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold text-blue-600">Dashboard</h1>
    <nav>
      <ul className="flex space-x-6">
        <li
          onClick={() => setValue("Home")}
          className="cursor-pointer font-medium text-gray-700 hover:text-blue-600"
        >
          Home
        </li>
        <li
          onClick={() => setValue("Profile")}
          className="cursor-pointer font-medium text-gray-700 hover:text-blue-600"
        >
          Profile
        </li>
        <li
          onClick={() => setValue("Model")}
          className="cursor-pointer font-medium text-gray-700 hover:text-blue-600"
        >
          Model
        </li>
        <li
          onClick={() => {
            setValue("Signup");
            setSignVal(true);
            dispatch(clearEditUser());
          }}
          className="cursor-pointer font-medium text-gray-700 hover:text-blue-600"
        >
          Register User
        </li>
        <li>
          {token ? (
            <SubmitButton
              onClick={() => Logout(navigate)}
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg transition"
            >
              Logout
            </SubmitButton>
          ) : (
            <SubmitButton
              onClick={() => navigate('/')}
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg transition"
            >
              Login
            </SubmitButton>
          )}
        </li>
      </ul>
    </nav>
  </header>

  {/* Main Content */}
  <main className="flex-1 p-6 overflow-y-auto">
    {value === "Profile" ? (
      <Profile />
    ) : value === "Home" ? (
      <MainBody />
    ) : value === "Signup" ? (
      <Signup signVal={signVal} setValue={setValue} />
    ) : value === "Model" ? (
      <ModelMain />
    ) : (
      <MainBody />
    )}
  </main>
</div>


    </>
  );
};
