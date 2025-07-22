import { Star } from 'lucide-react'
import styles from './styles.module.scss'

interface StarRatingProps {
  score: number
}

export const StarRating: React.FC<StarRatingProps> = ({ score }) => (
  <div className={styles.stars}>
    {[...Array(5)].map((_, idx) => (
      <span key={idx} className={idx < score ? styles.filled : styles.empty}>
        <Star fill={idx < score ? 'currentColor' : 'none'} />
      </span>
    ))}
  </div>
)
