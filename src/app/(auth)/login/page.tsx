import React from "react";
import { LogingForm } from "./_components/LoginForm";

const Login = () => {
  return (
    <div
      className={`h-screen w-full flex flex-col items-center justify-center `}
    >
      <div className="pb-[30px] w-full md:w-[570px]">
        <h1 className=" text-[32px] md:text-[36px] ld:text-[40px] font-bold leading-[120%] text-[#131313] tracking-[0%]">
          Welcome 👋
        </h1>
        <p className=" text-base font-bold leading-[150%] text-[#424242] pt-[5px] tracking-[0%]">
          Please login here
        </p>
      </div>
      <div className="w-full md:w-[570px]">
        <LogingForm />
      </div>
    </div>
  );
};

export default Login;
