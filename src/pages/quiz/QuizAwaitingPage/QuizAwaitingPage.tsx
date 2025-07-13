import { useState } from 'react'
import styles from './styles.module.scss'
import bulbImage from '@assets/bulb.png'
import { Button, LoginButton, Modal } from '@/components/ui'
import { createCSQuiz, getQuizList } from '@/api/quizAPI'
import { useAuthStore, useQuizStore } from '@/stores'
import { useNavigate } from 'react-router-dom'
import { Categories, QuizTypeButtons } from '@/components/features'

export const QuizAwaitingPage: React.FC = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState<'type' | 'category'>('type')
  const [loginModal, setLoginModal] = useState(false)
  const [notFoundModal, setNotFoundModal] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const userId = useAuthStore(state => state.userId)
  const setQuizzes = useQuizStore(state => state.setQuizzes)
  const setCurrentState = useQuizStore(state => state.setCurrentState)
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)

  const startReviewQuiz = async () => {
    if (!isLoggedIn) {
      setLoginModal(true)
      return
    }

    const delay = new Promise(resolve => setTimeout(resolve, 1000))

    try {
      if (userId) {
        const quizzes = await getQuizList(userId, 'review')

        if (!quizzes.length) {
          setNotFoundModal(true)
        } else {
          setIsGenerating(true)
          setQuizzes(quizzes)
          setCurrentState('progress')
          navigate('/quiz/progress')
        }
      }
    } catch (error) {
      console.log(error)
      setNotFoundModal(true)
    }

    await delay
  }

  const goToCategory = async () => {
    if (!isLoggedIn) {
      setLoginModal(true)
      return
    }

    setCurrentStep('category')
  }

  const startCSQuiz = async (category: string) => {
    const delay = new Promise(resolve => setTimeout(resolve, 1000))

    try {
      if (userId) {
        await createCSQuiz(userId, category)
        const quizzes = await getQuizList(userId, 'cs')

        if (!quizzes.length) {
          setNotFoundModal(true)
        } else {
          setIsGenerating(true)
          setQuizzes(quizzes)
          setCurrentState('progress')
          navigate('/quiz/progress')
        }
      }
    } catch (error) {
      console.log(error)
      setNotFoundModal(true)
    }

    await delay
  }

  return (
    <div className={styles.awaitingPage}>
      <div className={styles.container}>
        <div className={styles.guideBoard}>
          <img src={bulbImage} alt="" className={styles.bulbImage} />

          <h1 className={styles.title}>
            <b>W</b>ING <b>Q</b>UIZ
          </h1>

          {currentStep === 'type' && (
            <QuizTypeButtons
              startReviewQuiz={startReviewQuiz}
              onNext={goToCategory}
            />
          )}

          {currentStep === 'category' && (
            <Categories
              onPrev={() => setCurrentStep('type')}
              onStart={startCSQuiz}
            />
          )}
        </div>
      </div>

      <Modal
        isOpen={loginModal}
        style="failed"
        message={['로그인 후 이용가능합니다.']}
        closable
        toggleModal={() => setLoginModal(!loginModal)}
      >
        <LoginButton />
      </Modal>

      <Modal
        isOpen={notFoundModal}
        style="failed"
        message={[
          '모의 면접 데이터를 찾을 수 없습니다.',
          '면접을 먼저 진행해 주세요.',
        ]}
        closable
        toggleModal={() => setNotFoundModal(!notFoundModal)}
      >
        <Button
          text="모의 면접 하러가기"
          onClick={() => navigate('/interview-ai/awaiting')}
        />
      </Modal>

      <Modal
        isOpen={isGenerating && !notFoundModal}
        style="loading"
        message={['퀴즈를 생성하고 있습니다.', '잠시만 기다려주세요.']}
      />
    </div>
  )
}
