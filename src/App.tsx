import withAuth from "./helpers/withAuth"
import { useNavigate } from "react-router-dom"

function App () {

  const nav = useNavigate()

  return <div className="page">
    <button onClick={()=>nav("/tester")} className="bg-green-600 text-white rounded-lg px-12 py-4 text-xl font-bold">Let Go</button>
  </div>
}

export default withAuth(App)