import RegisterForm from "@/app/(auth)/register/register-form";

const RegisterPage = () => {
  return (
    <>
      <h1 className="text-xl font-semibold text-center">Đăng ký</h1>
      <div className="flex justify-center">
        <RegisterForm />
      </div>
    </>
  );
};

export default RegisterPage;
