import React, { lazy } from "react";
import useViewModel from "./LoginViewModel";
import Button from "@/Presentation/Components/Button/Button";
import InputForm from "@/Presentation/Components/Form/InputForm";
import OpenEye from "@/Presentation/Components/Icons/OpenEye";
import CloseEye from "@/Presentation/Components/Icons/CloseEye";
import Meta from "@/Presentation/Components/Meta/Meta";

const LogoApp = lazy(() => import("@/Presentation/Components/Logo/LogoApp"));

export default function LoginView() {
  const { nim, setNim, password, setPassword, login } = useViewModel();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <Meta>
        <title>Login | PaniQ</title>
      </Meta>
      <div className="container px-6">
        <h1
          className="font_title20 text-center"
          style={{ marginBottom: "58px", marginTop: "44px" }}
        >
          Login
        </h1>

        <InputForm
          placeholder="Masukan NIM / NIP..."
          label="NIM / NIP"
          value={nim}
          onChange={(e) => setNim(e.target.value)}
          style={{ marginBottom: "20px", height: "64px" }}
        />

        <InputForm
          placeholder="Masukan password ..."
          label="Password"
          value={password}
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "64px", height: "64px" }}
          icon={
            showPassword ? (
              <OpenEye alt="show password" onClick={handleShowPassword} />
            ) : (
              <CloseEye alt="hidden password" onClick={handleShowPassword} />
            )
          }
          iconPosition="right"
        />

        <Button
          onClick={login}
          style={{ width: "100%", height: "64px", marginBottom: "54px" }}
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
