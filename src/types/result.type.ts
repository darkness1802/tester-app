export interface ResultData {
    totalScore: number
    totalTime: number
    status: string
    _id: string
    code: string
    examQuestion: string
    examinee: string
    startTime: string
    attempt: Attempt[]
    createdAt: string
    updatedAt: string
    __v: number
    completeTime: string
  }
  
  export interface Attempt {
    answer: string[]
    _id: string
    question: Question
    field: string
    answerScore: number
    timeLimit: number
    startTime: string
    consumeTime: number
    scored: number
    orders: any[]
    answerLength: number
  }
  
  export interface Question {
    _id: string
    field: string
    questionType: string
    answerType: string
    isKeepOption: boolean
    failProcess: string
    options: Option[][]
    section: string
    content: string
    isHaveOption: boolean
    updatedAt: string
  }
  
  export interface Option {
    code: string
    content: string
  }
  