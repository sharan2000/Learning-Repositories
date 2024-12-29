import { redirect } from "react-router-dom";

export function getExpirationDuration() {
  const storedExpirationTime = new Date(localStorage.getItem("expirationTime"));
  let now = new Date();
  let duration = storedExpirationTime.getTime() - now.getTime();
  return duration;
}

export function getToken() {
  let token = localStorage.getItem("token");

  if(!token) {
    return null;
  }

  let duration = getExpirationDuration();
  if(duration < 0) {
    return "EXPIRED";
  }

  return token;
}

export function rootLoader() {
  return getToken();
}

export function checkAuthLoader() {
  let token = getToken();

  if(!token) {
    return redirect("/auth");
  }
  return null;
}