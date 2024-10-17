import LoginForm from "@/app/(auth)/login/login-form";

const LoginPage = () => {
  return (
    <>
      <h1 className="text-xl font-semibold text-center">Đăng nhập</h1>
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
