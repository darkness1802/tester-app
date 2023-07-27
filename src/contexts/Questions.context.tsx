import { useContext, createContext, useState } from "react"
import { Attempt } from "../types/q.types"

const QuestionsContext = createContext<{
    attempt?: Attempt[]
    setAttempt?: React.Dispatch<React.SetStateAction<Attempt[] | undefined>>
}>({})

export const useQuestions = () => useContext(QuestionsContext)

export default function QuestionsProvider(props: { children: React.ReactNode }) {

    const [attempt, setAttempt] = useState<Attempt[]>()

    
    return <QuestionsContext.Provider value={{attempt, setAttempt}}>
        { props.children }
    </QuestionsContext.Provider>
}