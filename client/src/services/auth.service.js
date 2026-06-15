import axios from "axios";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "../firebase";

const provider = new GithubAuthProvider();

export const loginWithGithub = async () => {
  const result = await signInWithPopup(auth, provider);

  const credential = GithubAuthProvider.credentialFromResult(result);

  console.log("Credential:", credential);

  console.log("Access Token:", credential?.accessToken);

  const firebaseToken = await result.user.getIdToken();

  const response = await axios.post("http://localhost:5000/api/auth/login", {
    firebaseToken,
    githubAccessToken: credential?.accessToken,
  });

  localStorage.setItem("token", response.data.token);

  return response.data;
};
