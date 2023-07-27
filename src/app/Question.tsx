import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import type { RadioChangeEvent } from 'antd'
import { Radio, Space } from 'antd'
import { useAuth } from "../contexts/Auth"
import useAttemptData from "../helpers/hooks/useAttemptData"
import useTimer from "../helpers/hooks/useTimer"
import appService from "../helpers/axiosService"
import { AttemptPayload } from "../types/requestBody/attempt.types"
import withAuth from "../helpers/withAuth"
import SignOutButton from "../components/SignOutButton"

function Question() {

    const { exam, section, idx } = useParams()
    const nav = useNavigate()
    const [value, setValue] = useState<number>(
        JSON.parse(localStorage.getItem(`Q/answer/${section}/${idx}`)!)?.answer
        || 1
    )

    const [percentage, $percentage] = useState<number>(0)
    const { auth } = useAuth()
    const { currentAttempt, attempts } = useAttemptData(Number(idx))

    const nextQuestion = () => {
        nav(`/tester/${exam}/${section}/${Number(Number(idx) + 1)}`)
    }

    const showResult = () => {
        nav(`/result/${exam}/${section}`)
    }

    useEffect(() => {
        $percentage((Number(Number(idx) + 1)/ 20) * 100)
        // check if the question is finished
        let storage = JSON.parse(localStorage.getItem(`Q/answer/${section}/${idx}`)!)
        if (storage?.isStop) {
            // stop testing if next question is not exist
            if (!attempts[Number(Number(idx) + 1)]) {
                storageCleaner()
                showResult()
            } else {
                nextQuestion()
            }
        }
    }, [idx])

    const storageCleaner = () => {
        for (let i = 0; i < attempts.length; i++) {
            localStorage.removeItem(`Q/time/${section}/${i}`)
            localStorage.removeItem(`Q/answer/${section}/${i}`)
        }
    }

    const timer = useTimer(String(section), String(idx), currentAttempt.timeLimit, () => {
        if (!attempts[Number(Number(idx) + 1)]) {
            // test ending, remove localStorage
            storageCleaner()
            showResult()
        } else {
            nextQuestion()
        }
    })

    const onChange = (e: RadioChangeEvent) => {
        localStorage.setItem(`Q/answer/${section}/${idx}`, JSON.stringify({
            answer: e.target.value,
            isStop: false
        }))
        setValue(e.target.value)
    }

    const sendAnswer = async () => {
        try {
            localStorage.setItem(`Q/answer/${section}/${idx}`, JSON.stringify({
                answer: value,
                isStop: true
            }))

            const startTime = new Date()

            const payload: AttemptPayload = {
                attempt: [{
                    _id: currentAttempt._id,
                    answer: [`${idx}:${value}`],
                    startTime: startTime.toISOString(),
                    consumeTime: timer.count,
                }]
            }

            let req = await appService.post(`/examAttempts/part/${section}`, payload)

            console.log(req)

            if (!attempts[Number(Number(idx) + 1)]) {
                // test ending, remove localStorage
                storageCleaner()
                showResult()
            } else {
                nextQuestion()
            }

        } catch (err) {
            console.log(err)
        }

    }

    const answersPrefix = ['A', 'B', 'C', 'D']

    return <div className="page bg-black">
        <div className="relative flex flex-col justify-between min-h-screen w-[24rem] bg-white">

            <div>
                <div className="header-bar shadow-xl drop-shadow-md px-8 py-6 flex justify-between items-center bg-[#FCC829] w-full h-[80px]">
                    <div>
                        <p className="text-lg font-semibold uppercase">{auth?.user.name}</p>
                        <p className="text-gray-600 text-sm">SDT: {auth?.user.phone}</p>
                    </div>
                    <SignOutButton />
                </div>

                <div className="flex items-center justify-between w-full h-10 px-8 bg-[#FDD82B]">
                    <p>Trắc Nghiệm</p>
                    <p className="text-lg font-semibold text-red-600">00:{timer.count < 10 ? "0" + timer.count:timer.count}</p>
                </div>
                <div className="p-6">

                    <div className="flex mb-4 items-center justify-center space-x-3 h-6">
                        <div className="progress bg-gray-300 w-full h-6 rounded-md">
                            <div style={{ width: `${percentage}%`}} className={`rounded-md bg-green-500 h-6`}></div>
                        </div>
                        <p className="text-lg font-semibold h-6">{String(Number(idx) + 1)}/{attempts.length}</p>
                    </div>

                    <h3><span className="font-bold text-lime-800">Câu {String(Number(idx) + 1)}:</span> {currentAttempt.question.content}</h3>

                    <h3 className="font-bold text-lime-800 my-2">Đáp án:</h3>

                    <Radio.Group onChange={onChange} value={value}>
                        <Space direction="vertical">
                            {currentAttempt.question.options[0].map((i, index) => <Radio key={i.code} value={index + 1}>
                                <p>{answersPrefix[index] + ". " + i.content}</p>
                            </Radio>)}
                        </Space>
                    </Radio.Group>
                </div>
            </div>

            <button onClick={sendAnswer} className="bg-[#FDD82B] w-full py-3">Trả lời</button>
        </div>
    </div>
}

export default withAuth(Question)