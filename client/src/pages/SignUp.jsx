import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setformData] = useState({});
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      seterror(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setloading(false);
      if (data.success == false) {
        seterror(true);
        return;
      }
      navigate("/sign-in");
    } catch (error) {
      setloading(false);
      seterror(true);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-gray-300 p-3 rounded-lg outline-none"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-gray-300 p-3 rounded-lg outline-none"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="******"
          id="password"
          className="bg-gray-300 p-3 rounded-lg outline-none"
          onChange={handleChange}
        />
        <button className="bg-gray-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading...." : " Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went wrong...."}</p>
    </div>
  );
}
