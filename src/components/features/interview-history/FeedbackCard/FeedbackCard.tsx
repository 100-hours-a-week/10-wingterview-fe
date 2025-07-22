import { timeFormatter } from '@/utils'
import { useAudioStore } from '@/stores'
import { Share2, Play } from 'lucide-react'
import { useState } from 'react'
import styles from './styles.module.scss'
import { ShareModal } from '../../board/ShareModal/ShareModal'
import { StarRating } from '@/components/ui/StarRating/StarRating'

interface Props {
  feedback: Feedback
  idx: number
}

export const FeedbackCard: React.FC<Props> = ({ feedback, idx }) => {
  const { segmentId, question, modelAnswer, score, details, startAt, endAt } =
    feedback
  const { jumpTo } = useAudioStore()
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  const toggleShareModal = () => {
    setIsShareModalOpen(!isShareModalOpen)
  }

  return (
    <div className={styles.feedbackCard}>
      <div className={styles.cardHeader}>
        {endAt && (
          <div className={styles.timestamp}>
            <Play size={14} />
            <span onClick={() => jumpTo(startAt)} title="이 시간으로 이동">
              {timeFormatter(startAt)}
            </span>
            ~
            <span onClick={() => jumpTo(endAt)} title="이 시간으로 이동">
              {timeFormatter(endAt)}
            </span>
          </div>
        )}

        {modelAnswer && (
          <button className={styles.shareButton} onClick={toggleShareModal}>
            <Share2 size={18} />
            <span>공유하기</span>
          </button>
        )}
      </div>

      <h2 className={styles.question}>
        Q{idx + 1}. {question}
      </h2>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Mr.Wing의 피드백
          <div className={styles.stars}>
            <StarRating score={score} />
          </div>
        </h3>

        <p>{details}</p>
      </section>

      <div className={styles.answer}>
        {modelAnswer && (
          <div className={styles.modelAnswer}>
            <h4>모범 답안</h4>
            <p>{modelAnswer}</p>
          </div>
        )}
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        toggleModal={toggleShareModal}
        question={question}
        segmentId={segmentId}
      />
    </div>
  )
}
