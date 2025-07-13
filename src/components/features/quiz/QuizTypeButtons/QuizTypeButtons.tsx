import { ArrowRight, Clock, Check } from 'lucide-react'
import styles from './styles.module.scss'

interface Props {
  startCSQuiz: () => void
  startReviewQuiz: () => void
}

export const QuizTypeButtons: React.FC<Props> = ({
  startCSQuiz,
  startReviewQuiz,
}) => {
  return (
    <div className={styles.quizOptions}>
      <div className={styles.optionCard} onClick={startReviewQuiz}>
        <div className={styles.wrapper}>
          <h3>모의면접 복습 퀴즈</h3>
          <p>
            하루 한번, Mr.윙과의 면접을 복습해보세요 <br />
            (문제 생성 시간 : 매일 오후 1시)
          </p>

          <ul className={styles.features}>
            <li>
              <Check size={16} />
              <span>개인 맞춤형</span>
            </li>
            <li>
              <Clock size={16} />
              <span>하루 한번</span>
            </li>
          </ul>
        </div>

        <div className={styles.startButton}>
          <span>시작하기</span>
          <ArrowRight size={18} />
        </div>
      </div>

      <div className={styles.optionCard} onClick={startCSQuiz}>
        <div className={styles.wrapper}>
          <h3>주제별 CS 퀴즈</h3>
          <p>다양한 주제의 CS 문제로 실력을 점검하세요</p>

          <ul className={styles.features}>
            <li>
              <Check size={16} />
              <span>9가지 카테고리</span>
            </li>
            <li>
              <Clock size={16} />
              <span>언제든지</span>
            </li>
          </ul>
        </div>

        <div className={styles.startButton}>
          <span>시작하기</span>
          <ArrowRight size={18} />
        </div>
      </div>
    </div>
  )
}
