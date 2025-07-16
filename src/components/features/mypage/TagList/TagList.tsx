import { ClickableTag } from '@/components/ui'
import styles from './styles.module.scss'

interface TagListProps {
  tags: string[]
  selected: string[]
  onToggle: (tag: string) => void
}

export const TagList: React.FC<TagListProps> = ({
  tags,
  selected,
  onToggle,
}) => {
  return (
    <div className={styles.tagList}>
      {tags.map(name => (
        <ClickableTag
          key={name}
          label={name}
          isSelected={selected.includes(name)}
          disabled={!selected.includes(name) && selected.length >= 3}
          onClick={() => onToggle(name)}
          size="small"
        />
      ))}
    </div>
  )
}
