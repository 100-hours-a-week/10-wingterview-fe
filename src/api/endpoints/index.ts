export const API = {
  LOGIN: {
    KAKAO: '/auth/oauth/kakao',
  },
  PROFILE: {
    SUBMIT: '/user',
    ME: '/user/me',
    EDIT: (userId: string) => `/user/${userId}`,
  },
  SEAT: {
    ALL: '/user/seats',
    EACH: (seatId: string) => `/user/seats/${seatId}`,
  },
  MATCH: {
    ENQUEUE: '/matching/enqueue',
    STAT: '/matching/statistics',
    RESULT: '/matching/result',
  },
  QUIZ: {
    REVIEW: (userId: string) => `/today-quiz/${userId}`,
    CS: (userId: string) => `/quiz/cs-quiz/${userId}`,
    CS_CREATE: (userId: string, category: string) =>
      `/quiz/cs-quiz/${userId}?category=${category}`,
    CS_RESULT: (userId: string) => `/quiz/cs-quiz/${userId}`,
    STAT: (userId: string) => `/user/${userId}/quiz-stats`,
    HISTORY: (userId: string, wrong: boolean, limit: number, cursor?: string) =>
      `/user/${userId}/quizzes?wrong=${wrong}&limit=${limit}${cursor ? `&cursor=${cursor}` : ''}`,
  },
  INTERVIEW: {
    STATUS: `/interview/status`,
    CHANGE_STATUS: (interviewId: string) =>
      `/interview/${interviewId}/status/next`,
    GET_QUESTIONS: (interviewId: string) =>
      `/interview/${interviewId}/question`,
    PICK_QUESTION: (interviewId: string) =>
      `/interview/${interviewId}/selection`,
  },
  AI_INTERVIEW: {
    ID: '/interview/ai',
    OLD: (myId: string) => `/interview/${myId}`,
    TIME: (interviewId: string) => `/interview/ai/${interviewId}/time`,
    END: (interviewId: string) => `/interview/${interviewId}`,
    QUESTION: (interviewId: string) => `/interview/${interviewId}/question`,
    SAVE_RECODING: (filename?: string) =>
      `/s3/presigned-url/recording?filename=${filename}`,
    HISTORY: (userId: string, limit: number, cursor?: string) =>
      `/user/${userId}/interview?limit=${limit}${cursor ? `&cursor=${cursor}` : ''}`,
    FEEDBACK_LIST: (userId: string, interviewId: string) =>
      `/user/${userId}/interview/${interviewId}`,
    FEEDBACK_REQUEST: (userId: string) => `/interview/${userId}/stt/feedback`,
  },
  PRESIGNED_URL: (filename?: string) =>
    `/s3/presigned-url?filename=${filename}`,
  BOARD: {
    LIST: (orderBy: string, limit: number, cursor?: string) =>
      `/board?orderBy=${orderBy}&limit=${limit}${cursor ? `&cursor=${cursor}` : ''}`,
    DETAIL: (boardId: string) => `/board/${boardId}`,
    SHARE: (segmentId: string) => `/board/${segmentId}`,
  },
}
