import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES, MESSAGES } from "@constants";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema } from "@/utils/validationSchemas";
import { Button, Input } from "@/components/ui";
import Alert from "@/components/ui/Alert";
import { useToast } from "@/hooks/useToast";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginOrRegister, loginWithGoogle } = useAuth();

  const { showSuccess, showError } = useToast();

  const [showNotification, setShowNotification] = useState({
    message: "",
    type: "" as "success" | "error" | "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGoogleSuccess = (credentialResponse: any) => {
    try {
      // Decode JWT token dari Google
      type GoogleJwtPayload = {
        email: string;
        name: string;
        picture: string;
        [key: string]: any;
      };
      const decoded = jwtDecode<GoogleJwtPayload>(
        credentialResponse.credential,
      );

      const googleUser = {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
      };

      const result = loginWithGoogle(googleUser);

      if (result.success) {
        const message = result.isNewUser
          ? "Akun berhasil dibuat dengan Google!"
          : "Login dengan Google berhasil!";
        showSuccess(message);
        navigate(ROUTES.TODOS);
      }
    } catch (error) {
      console.error("Google login error:", error);
      showError(MESSAGES.LOGIN_ERROR);
    }
  };

  const onSubmit = async (data: { email: string; password: string }) => {
    const result = loginOrRegister(data.email, data.password);

    if (result.success) {
      showSuccess(MESSAGES.LOGIN_SUCCESS);
      setTimeout(() => {
        navigate(ROUTES.TODOS);
      }, 500);
    } else {
      showError(result.error || MESSAGES.LOGIN_ERROR);
      setShowNotification({
        message: result.error || MESSAGES.LOGIN_ERROR,
        type: "error",
      });
    }
  };

  const handleGoogleError = () => {
    showError(MESSAGES.LOGIN_ERROR);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-[#F8FAFF] items-center justify-center">
        <div className="w-full max-w-4xl">
          <img
            src="./login-illustration.png"
            alt="Login Illustration"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative overflow-hidden">
        {/* Top Right Float */}
        <div className="absolute -top-5 right-3 h-50 wh-50 lg:w-52 lg:h-52 pointer-events-none">
          <img
            src="./float-element.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        {/* Bottom Left Float */}
        <div className="absolute -bottom-10 -left-10 h-42 wh-42 lg:w-52 lg:h-52 pointer-events-none">
          <img
            src="./float-element-left.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        {/* Form Content */}
        <div className="w-full max-w-xl relative z-10">
          {showNotification.message && (
            <Alert
              className="mb-3"
              variant={
                showNotification.type === "success" ? "success" : "error"
              }
              onClose={() => setShowNotification({ message: "", type: "" })}
            >
              {showNotification.message}
            </Alert>
          )}
          {/* Greeting */}
          <h1 className="text-4xl font-semibold text-gray-900 mb-5">
            Welcome back
          </h1>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <Input
              label="Email"
              type="email"
              placeholder="name@example.com"
              error={errors.email?.message}
              required
              {...register("email")}
            />

            {/* Password Input */}
            <div className="relative">
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                error={errors.password?.message}
                required
                {...register("password")}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="md"
              isLoading={isSubmitting}
            >
              Sign in
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or</span>
              </div>
            </div>

            {/* Social Login */}
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              text="continue_with"
              shape="rectangular"
              size="large"
              width="100%"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
