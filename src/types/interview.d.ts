type InterviewPhase = 'PENDING' | 'PROGRESS' | 'FEEDBACK' | 'COMPLETE'

interface InterviewStatusData {
  currentRound: number
  currentPhase: InterviewPhase
}

interface QuestionListData {
  questions: string[]
}

interface RequestQuestionBody {
  question: string | null
  keywords: string | null
}

interface InterviewData {
  interviewId: string
  currentRound: number
  currentPhase: InterviewPhase
  isInterviewer: boolean
  partner: BaseProfile
  questionIdx: number
  selectedQuestion: string
  isAiInterview: boolean
  questionOption: string[] | null
  timeRemain: number
}

interface AIInterviewData {
  interviewId: string
  timeRemain: number
  currentPhase: InterviewPhase
  isAiInterview: boolean
  questionIdx: number
  question: string
}

interface HistoryListData {
  id: string
  createdAt: string
  firstQuestion: string
  questionCount: number
  duration: number
  hasFeedback: boolean
  isFeedbackRequested: boolean
}

interface FeedbackPageData {
  createdAt: string
  duration: number
  recordingUrl: string
  feedback: Feedback[]
}

interface Feedback {
  segmentId: string
  question: string
  modelAnswer: string
  score: number
  goodPoints: string
  improvements: string
  details: string
  startAt: number
  endAt: number
}

interface HistoryResponse {
  history: HistoryListData[]
  hasNext: boolean
  nextCursor: string
}
