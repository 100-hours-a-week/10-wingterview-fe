import React, { useState, useEffect } from 'react'
import { ClickableTag, ErrorMessage } from '@/components/ui'
import { useProfileStore } from '@/stores/profileStore'
import styles from './styles.module.scss'
import { techStackList } from '@/constants/tagList'

export const TechStackStep: React.FC = React.memo(() => {
  const { updateTechStack, formErrors, formData } = useProfileStore()
  const [selected, setSelected] = useState<string[]>(formData.techStack)

  const toggleTag = (tag: string): void => {
    if (selected.includes(tag)) {
      setSelected(selected.filter(item => item !== tag))
    } else if (selected.length < 3) {
      setSelected([...selected, tag])
    }
  }

  const isMaxTagsSelected: boolean = selected.length >= 3

  useEffect(() => {
    updateTechStack(selected)
  }, [selected, updateTechStack])

  return (
    <div className={styles.container}>
      <div className={styles.instruction}>
        {formErrors.techStack ? (
          <ErrorMessage error={formErrors.techStack} />
        ) : (
          <span>최대 3개까지 선택 가능합니다.</span>
        )}
      </div>
      <div className={styles.tagList}>
        {techStackList.map(name => (
          <ClickableTag
            key={name}
            label={name}
            onClick={() => toggleTag(name)}
            isSelected={selected.includes(name)}
            disabled={isMaxTagsSelected && !selected.includes(name)}
          />
        ))}
      </div>
    </div>
  )
})
