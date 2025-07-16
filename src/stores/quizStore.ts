import { create } from 'zustand'
import { persist, StorageValue } from 'zustand/middleware'

export type QuizState = 'awaiting' | 'progress' | 'result'
export type QuizType = 'review' | 'cs'

interface QuizStore {
  quizzes: QuizData[]
  currentIndex: number
  userAnswers: number[]
  currentState: QuizState
  quizType: QuizType

  setQuizzes: (quizzes: QuizData[]) => void
  setCurrentIndex: (index: number) => void
  setUserAnswer: (index: number, answerIdx: number) => void
  setCurrentState: (state: QuizState) => void
  setQuizType: (type: QuizType) => void

  resetQuiz: () => void
}

export const useQuizStore = create<QuizStore>()(
  persist(
    set => ({
      quizzes: [],
      currentIndex: 0,
      userAnswers: Array(10).fill(-1),
      currentState: 'awaiting',
      quizType: 'review',

      setQuizzes: quizzes => set({ quizzes }),

      setQuizType: type => set({ quizType: type }),
      setCurrentIndex: index => set({ currentIndex: index }),
      setCurrentState: state => set({ currentState: state }),
      setUserAnswer: (index, answerIdx) =>
        set(state => {
          const newAnswers = [...state.userAnswers]
          newAnswers[index] = answerIdx
          return { userAnswers: newAnswers }
        }),

      resetQuiz: () => {
        set(state => ({
          currentIndex: 0,
          userAnswers: Array(state.quizzes.length).fill(-1),
          currentState: 'awaiting',
        }))
        sessionStorage.removeItem('quiz-storage')
      },
    }),
    {
      name: 'quiz-storage',
      storage: {
        getItem: (key: string) => {
          const value = sessionStorage.getItem(key)
          return value ? (JSON.parse(value) as StorageValue<QuizStore>) : null
        },
        setItem: (key: string, value: unknown) => {
          sessionStorage.setItem(key, JSON.stringify(value))
        },
        removeItem: (key: string) => {
          sessionStorage.removeItem(key)
        },
      },
    }
  )
)
