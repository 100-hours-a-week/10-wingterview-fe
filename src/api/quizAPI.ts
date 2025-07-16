import apiClient from '@/api/apiClient'
import { API } from './endpoints'

export const createCSQuiz = async (userId: string, category: string) => {
  await apiClient.post(API.QUIZ.CS_CREATE(userId, category))
}

export const getQuizList = async (myId: string, type: 'review' | 'cs') => {
  try {
    const response = await apiClient.get<ApiResponse<{ quizList: QuizData[] }>>(
      type === 'review' ? API.QUIZ.REVIEW(myId) : API.QUIZ.CS(myId)
    )
    return response.data.data.quizList
  } catch (error) {
    // @ts-expect-error remove type error
    if (error.response?.data?.message === 'QUIZ_NOT_FOUND') {
      return []
    } else {
      throw error
    }
  }
}

export const sendCSQuizResult = async (
  myId: string,
  result: UserAnswerData[]
) => {
  try {
    await apiClient.put<ApiResponse<null>>(API.QUIZ.CS(myId), {
      quizzes: result,
    })
  } catch (error) {
    console.error('퀴즈 결과 전송 실패:', error)
    throw error
  }
}

export const sendQuizResult = async (
  myId: string,
  result: UserAnswerData[]
) => {
  try {
    await apiClient.post<ApiResponse<null>>(API.QUIZ.REVIEW(myId), {
      quizzes: result,
    })
  } catch (error) {
    console.error('퀴즈 결과 전송 실패:', error)
    throw error
  }
}

export const getQuizStatistic = async (myId: string) => {
  try {
    const response = await apiClient.get<ApiResponse<{ correctRate: number }>>(
      API.QUIZ.STAT(myId)
    )
    return response.data.data.correctRate
  } catch (error) {
    console.error('퀴즈 통계 조회 실패:', error)
    throw error
  }
}

export const getQuizHistory = async (
  userId: string,
  wrong: boolean,
  limit: number = 10,
  cursor?: string
) => {
  try {
    const response = await apiClient.get<ApiResponse<QuizHistoryResponse>>(
      API.QUIZ.HISTORY(userId, wrong, limit, cursor)
    )
    return response.data.data
  } catch (error) {
    console.error('나의 퀴즈 조회 실패:', error)
    throw error
  }
}
