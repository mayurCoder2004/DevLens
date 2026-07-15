import { GithubAuthProvider, signInWithPopup } from "firebase/auth";

import api from "./api";
import { auth } from "../firebase";

const provider = new GithubAuthProvider();

// Add GitHub OAuth scopes
provider.addScope("repo");
provider.addScope("read:user");
provider.addScope("user:email");

export const loginWithGithub = async () => {
  console.log("A");

  const result = await signInWithPopup(auth, provider);

  console.log("B");

  const credential = GithubAuthProvider.credentialFromResult(result);

  console.log("Credential:", credential);

  console.log("Access Token:", credential?.accessToken);

  const firebaseToken = await result.user.getIdToken();

  console.log("C");

  const response = await api.post("/auth/login", {
    firebaseToken,
    githubAccessToken: credential?.accessToken,
  });

  console.log("D");

  localStorage.setItem("token", response.data.token);

  return response.data;
};