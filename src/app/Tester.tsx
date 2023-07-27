import { useEffect, useState } from "react"
import { useAuth } from "../contexts/Auth"
import withAuth from "../helpers/withAuth"
import appService from "../helpers/axiosService"
import QuestionBox from "../components/QuestionBox"
import SignOutButton from "../components/SignOutButton"
import { Exam } from "../types/demo.types"

function Tester() {

    const { auth } = useAuth()
    const [exams, $exams] = useState<Exam[]>([])

    useEffect(() => {
        const getter = async () => {
            let { data } = await appService.get("/sectionGroups/examInfo")
            const soup = data.results.filter((i: any) => i.code.includes("TN")) as Exam[]

            console.log(soup)

            $exams(soup)
        }; getter()
    }, [])

    return <div className="page bg-black">

        <div className="min-h-screen w-[24rem]" style={{ backgroundImage: "url(/bg1.jpg)" }}>
            <div className="header-bar px-8 py-6 flex justify-between items-center bg-[#FCC829] w-full h-[80px]">
                <div>
                    <p className="text-lg font-semibold uppercase">{auth?.user.name}</p>
                    <p className="text-gray-600 text-sm">SDT: {auth?.user.phone}</p>
                </div>
                <SignOutButton />
            </div>

            <div className="tester p-4 h-auto">
                <p className="text-center text-2xl font-bold text-gray-200">Trắc Nghiệm</p>

                {exams.length > 0 ?
                    exams.map(i => <QuestionBox key={i.id} data={i} />)
                    : <p>Empty</p>
                }

            </div>
        </div>
    </div>
}

export default withAuth(Tester)