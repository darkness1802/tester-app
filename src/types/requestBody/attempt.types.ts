export interface AttemptPayload {
    attempt: Attempt[]
}

export interface Attempt {
    _id: string
    answer: string[]
    startTime?: string
    consumeTime?: number
}