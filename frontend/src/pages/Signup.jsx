// import axios from "axios";
// import { useState } from "react";
// import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

// import { useNavigat } from "react-router-dom";


export const Signup = () => {
  const [lastName, setLastName] = useState("")
  const [firstName, setFirstName] = useState("")
  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign Up"} />
        <SubHeading label={"Enter Your Information to Create an Account"} />
        <InputBox onChange={(e) => {
          setFirstName(e.target.value);
        }} placeholder="John" label={"First Name"} />
        <InputBox OnChange={(e) => {
          setLastName(e.target.value)
        }} placeholder="Doe" label={"Last Name"} />
      </div>
    </div>
  </div>
}