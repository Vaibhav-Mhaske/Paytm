// import axios from "axios";
// import { useState } from "react";
import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
// import { useNavigat } from "react-router-dom";


export const Signup = () => {
  const [lastName, setLastName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

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

        < InputBox onChange={(e) => {
          setEmail(e.target.value)
        }} placeholder="Johndoe@gmail.com" label={"Email"} />

        < InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder={"Enter Your Password"} label={"Password"} />

        <div className="pt-2">
          <Button onClick={async () => {
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"You already have an account"} buttonText={"Sign In"} to={"/signin"} />
      </div>
    </div>
  </div>
}
