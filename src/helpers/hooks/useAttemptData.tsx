import { Attempt } from "../../types/q.types";

export default function useAttemptData (index: number) {
    const all = JSON.parse(localStorage.getItem("attempt")!) as Attempt[]
    
    return { currentAttempt: all[index], attempts: all }
}