import { Check, Plus } from 'lucide-react'
import styles from './styles.module.scss'

type TagSize = 'small' | 'large'

interface ClickableTagProps {
  label: string
  isSelected: boolean
  onClick: () => void
  disabled: boolean
  size?: TagSize
}

export const ClickableTag: React.FC<ClickableTagProps> = ({
  label,
  isSelected,
  onClick,
  disabled,
  size = 'large',
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      ${styles.tag}
      ${styles[size]} 
      ${isSelected ? styles.selected : ''}
      ${disabled ? styles.disabled : ''}
    `}
  >
    <span>{label}</span>
    <span className={styles.icon}>{isSelected ? <Check /> : <Plus />}</span>
  </button>
)
