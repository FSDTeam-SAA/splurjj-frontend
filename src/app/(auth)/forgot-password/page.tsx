import React from "react";
import { ForgotPasswordForm } from "./_components/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div
      className={`h-screen w-full flex flex-col items-center justify-center `}
    >
      <div className="pb-[30px] w-full md:w-[570px]">
        <h1 className=" text-[32px] md:text-[36px] ld:text-[40px] font-semibold leading-[120%] text-black tracking-[0%]">
          Forgot Password
        </h1>
        <p className=" text-base font-normal leading-[150%] text-[#424242] pt-[5px] tracking-[0%]">
          Enter your registered email address. we’ll send you a code to reset
          your password.
        </p>
      </div>
      <div className="w-full md:w-[570px]">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
