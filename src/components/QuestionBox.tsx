import { useNavigate } from 'react-router-dom'
import appService from '../helpers/axiosService'
import { Exam } from '../types/demo.types'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    data: Exam
}

const QuestionBox: React.FC<Props> = ({ data }) => {

    const nav = useNavigate()

    const settings = data.examInfo[0].examQuestions[0].fieldSettings

    const questionAmount = () => {
        let amount = settings.reduce((total, current) => total + current.questionAmount, 0);
        return String(amount)
    }

    const start = async () => {
        const { data: res } = await appService.post("/examAttempts", { examQuestion: data.sections[0] })
        localStorage.setItem("attempt", JSON.stringify(res.attempt))
        nav(`/tester/${data.sections[0]}/${res._id}/0`)
    }

    // const startTime = new Date(data.startTime)
    // const endTime = new Date(data.endTime)
    // const currentTime = new Date()

    // function isCurrentTimeInRange(startTime: Date, endTime: Date, currentTime: Date) {
    //     return startTime <= currentTime && currentTime <= endTime
    // }

    // const isInRange = isCurrentTimeInRange(startTime, endTime, currentTime)

    return <div className="mt-8 bg-white rounded-md pt-4">
        <div className="px-4">
            <p className="title text-blue-800 font-semibold text-lg text-center">{data.name}</p>
        </div>

        <ul className="mt-4 px-4 space-y-3">
            {/*<li>- Thời gian thi: {formatDate(data.startTime)} - {formatDate(data.endTime)}</li>*/}
            <li>- Đề thi gồm {questionAmount()} câu trắc nghiệm</li>
            <li>- Mỗi câu có {settings[0].timeEachQuestion} giây suy nghĩ</li>
            <li>- Mỗi người chỉ được tham gia 1 lần</li>
        </ul>

        <button onClick={start} className='mt-4 w-full rounded-b-md h-10 bg-green-600 text-gray-200 hover:bg-green-500'>Bắt đầu thi</button>
    </div>
}

export default QuestionBox