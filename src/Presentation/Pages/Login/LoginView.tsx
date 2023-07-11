import React, { lazy } from "react";
import { Form } from "antd";
import useViewModel from "./LoginViewModel";
import { Helmet } from "react-helmet-async";
import Button from "@/Presentation/Components/Button/Button";
import InputForm from "@/Presentation/Components/Form/InputForm";
import OpenEye from "@/Presentation/Components/Icons/OpenEye";
import CloseEye from "@/Presentation/Components/Icons/CloseEye";

const LogoApp = lazy(() => import("@/Presentation/Components/Logo/LogoApp"));

export default function LoginView() {
  const { email, setEmail, password, setPassword, login, errors, isLoading } =
    useViewModel();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <Helmet>
        <title>Login | Paniq</title>
      </Helmet>
      <div className="container px-6">
        <h1
          className="font_title20 text-center"
          style={{ marginBottom: "58px", marginTop: "44px" }}
        >
          Login
        </h1>

        <Form>
          <InputForm
            placeholder="Masukan Email..."
            label="Email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            style={{ height: "64px", marginBottom: "24px" }}
            error={errors.email}
          />

          <InputForm
            placeholder="Masukan password ..."
            label="Password"
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            style={{ height: "64px" }}
            icon={
              showPassword ? (
                <OpenEye alt="show password" onClick={handleShowPassword} />
              ) : (
                <CloseEye alt="hidden password" onClick={handleShowPassword} />
              )
            }
            iconPosition="right"
            error={errors.password}
          />
        </Form>
        <Button
          onClick={login}
          disabled={isLoading === "pending" ? true : false}
          style={{
            width: "100%",
            height: "64px",
            marginBottom: "54px",
            marginTop: "54px",
          }}
        >
          Login
        </Button>

        <div className="flex justify-center">
          <LogoApp />
        </div>
      </div>
    </>
  );
}
