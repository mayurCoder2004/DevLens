import { loginWithGithub } from "../services/auth.service";

const Login = () => {

  const handleGithubLogin = async () => {
    try {

      const data =
        await loginWithGithub();

      console.log(data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div>
      <h1>DevLens</h1>

      <button
        onClick={handleGithubLogin}
      >
        Continue with GitHub
      </button>
    </div>
  );
};

export default Login;