import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import appService from "../helpers/axiosService"
import { ResultData } from "../types/result.type"
import { Auth } from "../types/auth.types"
import SignOutButton from "../components/SignOutButton"
import withAuth from "../helpers/withAuth"
import { formatDate } from "../helpers/dateTime"

function Result(props: Auth) {

    const { exam } = useParams()
    const nav = useNavigate()

    const [result, $result] = useState<ResultData>()

    useEffect(() => {
        const getResultData = async () => {
            try {
                const { data } = await appService.post("/examAttempts", { examQuestion: exam })
                $result(data)
            } catch (err) {
                console.log(err)
                nav("/tester")
            }
        }; getResultData()
    }, [])

    return <div className="page bg-black">
        <div className="relative flex flex-col justify-between min-h-screen w-[24rem] bg-white">
            <div>
                <div className="header-bar shadow-xl drop-shadow-md px-8 py-6 flex justify-between items-center bg-[#FCC829] w-full h-[80px]">
                    <div>
                        <p className="text-lg font-semibold uppercase">{props.user.name}</p>
                        <p className="text-gray-600 text-sm">SDT: {props.user.phone}</p>
                    </div>
                    <SignOutButton />
                </div>

                <div className="p-4 w-full flex flex-col items-center">
                    <p className="mt-4 uppercase text-[#6E6601] text-lg font-semibold">Thông tin kết quả</p>

                    <div className="mt-4 w-[80%] space-y-3">
                        <div className="flex w-full space-x-6">
                            <p>Ngày tham gia thi:</p>
                            <p>{formatDate(result?.startTime as string)}</p>
                        </div>
                        <div className="flex w-full space-x-6">
                            <p>Tổng thời gian làm bài thi:</p>
                            <p>{result?.totalTime} giây</p>
                        </div>
                        <div className="flex w-full space-x-6">
                            <p>Tổng số câu hỏi:</p>
                            <p>{result?.attempt.length}</p>
                        </div>
                        <div className="flex w-full space-x-6">
                            <p>Tổng số điểm đạt được:</p>
                            <p>{result?.totalScore}</p>
                        </div>
                    </div>
                </div>

            </div>
            <button onClick={()=>nav("/tester")} className="bg-red-600 hover:bg-red-500 w-full py-3 text-white">
                Quay lại
            </button>
        </div>
    </div>
}

export default withAuth(Result)