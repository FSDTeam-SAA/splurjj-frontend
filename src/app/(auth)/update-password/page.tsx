import React, { Suspense } from "react";
import UpdatePasswordForm from "./_components/UpdatePasswordForm";

const UpdatePassword = () => {
  return (
    <div
      className={`h-screen w-full flex flex-col items-center justify-center `}
    >
      <div className="pb-[30px] w-full md:w-[570px]">
        <h1 className=" text-[32px] md:text-[36px] ld:text-[40px] font-bold leading-[120%] text-black tracking-[0%]">
          Reset Password
        </h1>
        <p className=" text-base font-normal leading-[150%] text-[#424242] pt-[5px] tracking-[0%]">
          Create your new password
        </p>
      </div>
      <div className="w-full md:w-[570px]">
        <Suspense fallback={<div>Loading...</div>}>
          <UpdatePasswordForm />
        </Suspense>
      </div>
    </div>
  );
};

export default UpdatePassword;
