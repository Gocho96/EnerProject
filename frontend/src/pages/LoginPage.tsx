import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { login } from "../services/AuthService";
import LoginForm from "../components/forms/LoginForm";

interface LoginInputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { errors: signinErrors } = useAuth();

  const handleLogin = async (data: LoginInputs) => {
    try {
      const response = await login(data);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Usuario y/o contraseña incorrecta");
      console.error(error);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
          <LoginForm onSubmit={handleLogin} errors={signinErrors} />
    </div>
  );
};

export default LoginPage;
