import { useEffect, useState } from "react"

export default function useTimer(section: string, index: string, limit: number, onOver:(time: number) => void) {

    const [count, setCount] = useState<number>(0)
    
    // loading remain time on question be changed by user (reload, close and re-open, ...)
    useEffect(() => {
        setCount(Number(localStorage.getItem(`Q/time/${section}/${index}`)))
    }, [index])

    // increase and stop increase effect 
    useEffect(() => {
        const itv = setInterval(() => {
            setCount(prevCount => prevCount + 1)
        }, 1000)

        if (count >= limit) {
            setCount(0)
            clearInterval(itv)
        }

    }, [])

    useEffect(() => {

        localStorage.setItem(`Q/time/${section}/${index}`, String(count))

        // expires effect
        if (count >= limit) {
            setCount(0)
            onOver(count)
        }
    }, [count, index]);

    return { count }
}