import { useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export const Dashboard = () => {
    const [filter, setFilter] = useState("")

    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={"10,100"} />
            <Users />
        </div>
    </div>
}