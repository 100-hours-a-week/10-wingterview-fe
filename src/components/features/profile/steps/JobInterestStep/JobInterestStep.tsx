import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { ClickableTag, ErrorMessage } from '@/components/ui'
import { useProfileStore } from '@/stores/profileStore'
import { jobInterestList } from '@/constants/tagList'

export const JobInterestStep: React.FC = React.memo(() => {
  const { updateJobInterest, formErrors, formData } = useProfileStore()
  const [selected, setSelected] = useState<string[]>(formData.jobInterest)

  const toggleTag = (tag: string): void => {
    if (selected.includes(tag)) {
      setSelected(selected.filter(item => item !== tag))
    } else if (selected.length < 3) {
      setSelected([...selected, tag])
    }
  }

  const isMaxTagsSelected: boolean = selected.length >= 3

  useEffect(() => {
    updateJobInterest(selected)
  }, [selected, updateJobInterest])

  return (
    <div className={styles.container}>
      <div className={styles.instruction}>
        {formErrors.jobInterest ? (
          <ErrorMessage error={formErrors.jobInterest} />
        ) : (
          <span>최대 3개까지 선택 가능합니다.</span>
        )}
      </div>
      <div className={styles.tagList}>
        {jobInterestList.map(name => (
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
