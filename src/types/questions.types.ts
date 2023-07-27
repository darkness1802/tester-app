export interface QuestionsResponse {
    page: number, 
    limit: number, 
    totalPages: number, 
    totalResults: number,
    results: Array<Question>
}

export interface Question {
    options: Options
    uiSettings: UiSettings
    status: string
    section: string
    startTime: string
    endTime: string
    fieldSettings: FieldSetting[]
    id: string
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
  