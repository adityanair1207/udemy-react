import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export const action = async ({ request, params }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login"; // if mode is undefined, it will be login by default

  if (mode !== "login" && mode !== "signup") {
    // to protect against user entering invalid mode in address bar
    throw json(
      {
        message: "Invalid mode",
      },
      { status: 422 }
    );
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    // validation errors (422) and invalid credentials (401)
    return response; // react-router will automatically extract data from the response
  }

  if (!response.ok) {
    throw json(
      {
        message: "Could not authenticate user.",
      },
      { status: 500 }
    );
  }

  // manage the token
  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("token", token);

  return redirect("/"); // once signed in/logged in the user is redirected to the home page
};
