import { useForm } from "react-hook-form";
//import { Link } from "react-router-dom";

interface LoginInputs {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginInputs) => void;
  errors?: string[];
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, errors = [] }) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<LoginInputs>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-center">
      {errors.length > 0 && (
        <div className="alert alert-danger">
          {errors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
      )}
      <div className="form-group p-2">
        <input
          {...register("email", { 
            required: "El email es requerido",
            pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "El email no es válido",
          },
          })}
          type="email"
          className="form-control"
          placeholder="Correo electrónico"
        />
        {formErrors.email && (
          <span className="text-danger">{formErrors.email.message}</span>
        )}
      </div>
      <div className="form-group p-2">
        <input
          {...register("password", { required: "La contraseña es requerida" })}
          type="password"
          className="form-control"
          placeholder="Contraseña"
        />
        {formErrors.password && (
          <span className="text-danger">{formErrors.password.message}</span>
        )}
      </div>
      <button type="submit" className="btn btn-danger btn-block mt-3 w-100">
        Iniciar Sesión
      </button>
      {/*
      <p className="text-center mt-3">
        ¿No tienes una cuenta?{" "}
        <Link to="/register" className="text-warning">
          Regístrate
        </Link>
      </p>
        */}
    </form>
  );
};

export default LoginForm;
