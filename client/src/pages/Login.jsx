import axios from "axios";
import { loginWithGithub } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const syncRepos = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:5000/api/repositories/sync",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log(response.data);
  };

  const handleGithubLogin = async () => {
  console.log("1. Login button clicked");

  try {
    const data = await loginWithGithub();

    console.log("2. Login completed");
    console.log(data);

    navigate("/dashboard");
  } catch (error) {
    console.log("Login Error:", error);
  }
};

  return (
    <div>
      <h1>DevLens</h1>

      <button onClick={handleGithubLogin}>Continue with GitHub</button>

      <button onClick={syncRepos}>Sync Repositories</button>
    </div>
  );
};

export default Login;
