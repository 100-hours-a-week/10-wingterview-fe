import React, { useState, useEffect } from 'react'
import {
  ProfileImage,
  ErrorMessage,
  Button,
  KTBOptionToggle,
} from '@/components/ui'
import { jobInterestList, techStackList } from '@/constants/tagList'
import { Pencil } from 'lucide-react'
import styles from './styles.module.scss'
import { useProfileStore } from '@/stores'
import { TagList } from '../TagList/TagList'

interface Props {
  originalProfile: MyProfileData | undefined
  onSubmit: (updatedProfile: ProfileFormData, imageFile?: File | null) => void
}

export const ProfileEditForm: React.FC<Props> = ({
  originalProfile,
  onSubmit,
}) => {
  const { formData, imageURL, imageFile, setImageURL, setImageFile, setIsKTB } =
    useProfileStore()

  const {
    profileImageUrl,
    name,
    nickname,
    curriculum,
    jobInterest,
    techStack,
  } = originalProfile as MyProfileData

  const [isKTB, setIsKTBState] = useState<boolean>(true)
  const [imageError, setImageError] = useState<string>('')
  const [currentData, setCurrentData] = useState({
    name: name || '',
    nickname: nickname || '',
    curriculum: curriculum || '',
  })

  const [selectedJobInterests, setSelectedJobInterests] = useState<string[]>(
    jobInterest || []
  )
  const [selectedTechStacks, setSelectedTechStacks] = useState<string[]>(
    techStack || []
  )

  const curriculums: string[] = ['풀스택', '클라우드', '인공지능']

  useEffect(() => {
    setCurrentData({
      name: name || '',
      nickname: nickname || '',
      curriculum: curriculum || '',
    })
    setSelectedJobInterests(jobInterest || [])
    setSelectedTechStacks(techStack || [])
  }, [name, nickname, curriculum, jobInterest, techStack])

  const toggleJobInterests = (tag: string) => {
    setSelectedJobInterests(prev => {
      if (prev.includes(tag)) return prev.filter(item => item !== tag)
      if (prev.length < 3) return [...prev, tag]
      return prev
    })
  }

  const toggleTechStacks = (tag: string) => {
    setSelectedTechStacks(prev => {
      if (prev.includes(tag)) return prev.filter(item => item !== tag)
      if (prev.length < 3) return [...prev, tag]
      return prev
    })
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      const file = e.target.files[0]

      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          setImageError('5MB 이하의 파일만 업로드가 가능합니다.')
          return
        }

        if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
          setImageError('jpg, jpeg, png만 업로드가 가능합니다.')
          return
        }
      }

      setImageFile(file)

      reader.onload = event => {
        const url = event.target?.result as string
        setImageURL(url)
      }
      reader.readAsDataURL(file)
      setImageError('')
    }
  }

  const handleThumbnailClick = () => {
    const fileInput = document.getElementById(
      'profile-edit-upload'
    ) as HTMLInputElement
    fileInput?.click()
  }

  const handleResetImage = () => {
    setImageURL('')
    setImageFile(null)
    setImageError('')

    const fileInput = document.getElementById(
      'profile-edit-upload'
    ) as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  const handleKTBToggle = (value: boolean) => {
    setIsKTBState(value)
    setIsKTB(value)

    if (!value) {
      setCurrentData(prev => ({
        ...prev,
        curriculum: '',
      }))
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setCurrentData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleRadioChange = (value: string) => {
    setCurrentData(prev => ({
      ...prev,
      curriculum: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const updatedFormData = {
        ...formData,
        ...currentData,
        isKTB,
        jobInterest: selectedJobInterests,
        techStack: selectedTechStacks,
      }

      await onSubmit(updatedFormData, imageFile)
    } catch (error) {
      console.error('프로필 수정 실패:', error)
    }
  }

  return (
    <form className={styles.profileEditForm} onSubmit={handleSubmit}>
      <fieldset className={styles.profileImage}>
        <div className={styles.imageWrapper}>
          <div
            className={styles.thumbnail}
            onClick={handleThumbnailClick}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleThumbnailClick()
              }
            }}
          >
            <ProfileImage url={profileImageUrl || imageURL} size={100} />
          </div>

          <label htmlFor="profile-edit-upload" className={styles.editButton}>
            <Pencil size={16} color="white" />
            <input
              id="profile-edit-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.fileInput}
            />
          </label>
        </div>

        {imageURL && (
          <button
            type="button"
            onClick={handleResetImage}
            className={styles.reset}
          >
            사진 삭제
          </button>
        )}

        {imageError && <ErrorMessage error={imageError} />}
      </fieldset>

      <fieldset className={styles.basicInfo}>
        <h3>기본 정보</h3>

        <KTBOptionToggle isKTB={isKTB} onChange={handleKTBToggle} />

        <div className={styles.container}>
          <div className={styles.inputWrapper}>
            <label htmlFor="nickname" className={styles.label}>
              nickname
            </label>
            <input
              type="text"
              id="nickname"
              value={currentData.nickname}
              onChange={e => handleInputChange('nickname', e.target.value)}
              className={styles.input}
              placeholder="닉네임을 입력해주세요"
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="name" className={styles.label}>
              name
            </label>
            <input
              type="text"
              id="name"
              value={currentData.name}
              onChange={e => handleInputChange('name', e.target.value)}
              className={styles.input}
              placeholder="이름을 입력해주세요"
            />
          </div>

          {isKTB && (
            <div className={styles.inputWrapper}>
              <label className={styles.label}>curriculum</label>
              <div className={styles.radioButtons}>
                {curriculums.map(name => (
                  <label key={name} className={styles.radio}>
                    <input
                      type="radio"
                      name="curriculum"
                      value={name}
                      checked={currentData.curriculum === name}
                      onChange={e => handleRadioChange(e.target.value)}
                    />
                    <span className={styles.text}>{name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </fieldset>

      <fieldset className={styles.jobInterest}>
        <h3>희망 직무 (최대 3개)</h3>
        <TagList
          tags={jobInterestList}
          selected={selectedJobInterests}
          onToggle={toggleJobInterests}
        />
      </fieldset>

      <fieldset className={styles.techStack}>
        <h3>기술 스택 (최대 3개)</h3>
        <TagList
          tags={techStackList}
          selected={selectedTechStacks}
          onToggle={toggleTechStacks}
        />
      </fieldset>

      <div className={styles.submitButton}>
        <Button text="프로필 수정" onClick={() => {}} />
      </div>
    </form>
  )
}
