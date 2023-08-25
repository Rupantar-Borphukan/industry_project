import React from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

const Template = ({ title, formtype, setIsLoggedIn }) => {
  return (
    <div className="flex justify-center">
      <div className="w-11/12 max-w-[450px]">
        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
          {title}
        </h1>
        {formtype === "signup" ? (
          <SignupForm setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
        )}
      </div>
    </div>
  );
};

export default Template;
