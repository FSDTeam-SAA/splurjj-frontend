import React from "react";
import { SignUpForm } from "./_components/SignUpForm";


const Signup = () => {
  return (
    <div
      className={`h-screen w-full flex flex-col items-center justify-center `}
    >
      <div className="pb-[30px] w-full md:w-[570px]">
        <h1 className="font-manrope text-[32px] md:text-[36px] ld:text-[40px] font-semibold leading-[120%] text-[#131313] tracking-[0%]">
          Create New Account
        </h1>
        <p className="font-manrope text-base font-normal leading-[150%] text-[#424242] pt-[5px] tracking-[0%]">
          Please enter details
        </p>
      </div>
      <div className="w-full md:w-[570px]">
        <SignUpForm />
      </div>
    </div>
  );
};

export default Signup;
