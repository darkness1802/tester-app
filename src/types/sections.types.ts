export interface Root {
    sections: string[]
    code: string
    name: string
    des: string
    icon: string
    id: string
    examInfo: ExamInfo[]
  }
  
  export interface ExamInfo {
    section: Section
    examQuestions: ExamQuestion[]
    attempts: any[]
  }
  
  export interface Section {
    _id: string
    fields: string[]
    year: number
    code: string
    name: string
    isShowSide: boolean
    questionType: string
    answerType: string
    des: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface ExamQuestion {
    _id: string
    options: Options
    uiSettings: UiSettings
    status: string
    section: string
    startTime: string
    endTime: string
    fieldSettings: FieldSetting[]
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface Options {
    isFieldShuffle: boolean
    isQuestionShuffleAll: boolean
    isKeepPosAcrossField: boolean
  }
  
  export interface UiSettings {
    bkgImg: string
    bkgColor: string
    textColor: string
    bkgMusic: string
  }
  
  export interface FieldSetting {
    field: string
    isRandomOptions: boolean
    isQuestionShuffle: boolean
    isAnswerInOrder: boolean
    attachQuestion: number
    _id: string
    questionAmount: number
    timeEachQuestion: number
    pointEachQuestion: number
  }