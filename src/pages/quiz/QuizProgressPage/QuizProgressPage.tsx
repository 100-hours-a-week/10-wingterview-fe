import { useState, useEffect } from 'react'
import { QuizWithChoices } from '@/components/features'
import { useAuthStore, useQuizStore } from '@/stores'
import { useNavigate } from 'react-router-dom'
import wingLeft from '@/assets/wing-l.png'
import wingRight from '@/assets/wing-r.png'
import styles from './styles.module.scss'
import { Button, Modal } from '@/components/ui'
import { sendCSQuizResult, sendQuizResult } from '@/api/quizAPI'

export const QuizProgressPage = () => {
  const navigate = useNavigate()
  const [toggleModal, setToggleModal] = useState(false)
  const [isFinishing, setIsFinishing] = useState(false)

  const userId = useAuthStore(state => state.userId)

  const {
    quizzes,
    currentIndex,
    userAnswers,
    setCurrentIndex,
    setCurrentState,
    resetQuiz,
    quizType,
  } = useQuizStore()

  const isDone = userAnswers[9] && userAnswers[9] !== -1

  const handleNext = () => {
    if (currentIndex === quizzes.length - 1) {
      setCurrentState('result')
      navigate('/quiz/result')
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleStop = () => {
    resetQuiz()
    navigate('/quiz/awaiting')
  }

  const handleEnd = async () => {
    setIsFinishing(true)
    const delay = new Promise(resolve => setTimeout(resolve, 1500))

    if (userId) {
      const result = quizzes.map((quiz, idx) => {
        const selectedIdx = userAnswers[idx]
        return {
          quizIdx: idx + 1,
          userSelection: selectedIdx,
          isCorrect: quiz.answerIdx === selectedIdx,
        }
      })

      if (quizType === 'review') {
        await sendQuizResult(userId, result)
      } else if (quizType === 'cs') {
        await sendCSQuizResult(userId, result)
      }
    }

    await delay

    setIsFinishing(false)
    setCurrentState('result')
    navigate('/quiz/result')
  }

  useEffect(() => {
    if (quizzes.length > 0) {
      const isAlreadyDone = quizzes[0].userAnswer !== null
      if (isAlreadyDone) {
        setCurrentState('result')
        navigate('/quiz/result')
      }
    }
  }, [quizzes, navigate, setCurrentState])

  return (
    <div className={styles.progressPage}>
      <div className={styles.container}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${((currentIndex + 1) / quizzes.length) * 100}%` }}
          />
        </div>

        {quizzes.length > 0 && <QuizWithChoices quiz={quizzes[currentIndex]} />}

        <div className={styles.buttons}>
          <button onClick={handlePrev} disabled={currentIndex === 0}>
            <img src={wingLeft} alt="이전 버튼" />
          </button>

          {!isDone ? (
            <span
              className={styles.stopButton}
              onClick={() => setToggleModal(true)}
            >
              퀴즈 종료
            </span>
          ) : (
            <span className={styles.gradeButton} onClick={handleEnd}>
              채점하기
            </span>
          )}

          <button
            onClick={isDone ? handleEnd : handleNext}
            disabled={userAnswers[currentIndex] === -1}
          >
            <img src={wingRight} alt="다음 버튼" />
          </button>
        </div>
      </div>

      <Modal
        isOpen={toggleModal}
        style="failed"
        message={['진행 중인 퀴즈는 저장되지 않습니다.', '그래도 종료 할까요?']}
        closable
        toggleModal={() => setToggleModal(!toggleModal)}
      >
        <Button text="네, 종료할게요!" onClick={handleStop} />
      </Modal>

      <Modal
        isOpen={isFinishing}
        style="loading"
        message={['퀴즈를 채점하고 있습니다.', '잠시만 기다려주세요.']}
      />
    </div>
  )
}
