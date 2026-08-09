import { GithubAuthProvider, signInWithPopup } from "firebase/auth";

import api from "./api";
import { auth } from "../firebase";

const provider = new GithubAuthProvider();

// Add GitHub OAuth scopes
provider.addScope("repo");
provider.addScope("read:user");
provider.addScope("user:email");

export const loginWithGithub = async () => {
  const result = await signInWithPopup(auth, provider);

  const credential = GithubAuthProvider.credentialFromResult(result);

  const firebaseToken = await result.user.getIdToken();

  const response = await api.post("/auth/login", {
    firebaseToken,
    githubAccessToken: credential?.accessToken,
  });

  localStorage.setItem("token", response.data.token);

  return response.data;
};
