import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;


export const authAction = async ({request}) => {
  const searchParams = new URL(request.url).searchParams;
  let mode = searchParams.get("mode") || "login";

  if(mode !== "login" && mode !== "signup") {
    mode = "login"
  }

  let data = await request.formData();
  const body = {
    email: data.get("email"),
    password: data.get("password"),
  }

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(body)
  })

  if(response.status === 422 || response.status === 401) {
    return response.json()
  }

  if(!response.ok) {
    throw new Response(JSON.stringify({"message": "Authentication failed."}), {status: 500})
  }

  // handle the token
  data = await response.json();
  localStorage.setItem("token", data.token);
  let now = new Date();
  now.setHours(now.getHours() + 1);
  localStorage.setItem("expirationTime", now);

  return redirect("/");
} 