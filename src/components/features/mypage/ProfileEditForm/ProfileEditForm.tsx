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
import {
  validateBasicInfo,
  validateJobInterest,
  validateTechStack,
} from '@/utils/validators'
import { parseSeatPosition } from '@/utils/parseSeatPosition'
import { useNavigate } from 'react-router-dom'

interface Props {
  originalProfile: MyProfileData | undefined
  onSubmit: () => void
}

export const ProfileEditForm: React.FC<Props> = ({
  originalProfile,
  onSubmit,
}) => {
  const {
    imageURL,
    setImageURL,
    setImageFile,
    updateBasicInfo,
    updateJobInterest,
    updateTechStack,
    updateProfileImage,
    setIsKTB,
    formErrors,
    setFormErrors,
  } = useProfileStore()

  const {
    profileImageUrl,
    name,
    nickname,
    curriculum,
    jobInterest,
    techStack,
    isKTB,
  } = originalProfile as MyProfileData

  const navigate = useNavigate()

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

  const [showValidationErrors, setShowValidationErrors] = useState(false)

  const curriculums: string[] = ['풀스택', '클라우드', '인공지능']

  useEffect(() => {
    setCurrentData({
      name: name || '',
      nickname: nickname || '',
      curriculum: curriculum || '',
    })
    setSelectedJobInterests(jobInterest || [])
    setSelectedTechStacks(techStack || [])

    setFormErrors({})
    setShowValidationErrors(false)
  }, [name, nickname, curriculum, jobInterest, techStack, setFormErrors])

  const toggleJobInterests = (tag: string) => {
    setSelectedJobInterests(prev => {
      if (prev.includes(tag)) return prev.filter(item => item !== tag)
      if (prev.length < 3) return [...prev, tag]
      return prev
    })

    if (showValidationErrors && formErrors.jobInterest) {
      const { ...rest } = formErrors
      setFormErrors(rest)
    }
  }

  const toggleTechStacks = (tag: string) => {
    setSelectedTechStacks(prev => {
      if (prev.includes(tag)) return prev.filter(item => item !== tag)
      if (prev.length < 3) return [...prev, tag]
      return prev
    })

    if (showValidationErrors && formErrors.techStack) {
      const { ...rest } = formErrors
      setFormErrors(rest)
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      const file = e.target.files[0]

      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          setFormErrors({
            ...formErrors,
            imageError: '5MB 이하의 파일만 업로드가 가능합니다.',
          })
          setShowValidationErrors(true)
          return
        }

        if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
          setFormErrors({
            ...formErrors,
            imageError: 'jpg, jpeg, png만 업로드가 가능합니다.',
          })
          setShowValidationErrors(true)
          return
        }
      }

      setImageFile(file)

      reader.onload = event => {
        const url = event.target?.result as string
        setImageURL(url)
      }
      reader.readAsDataURL(file)

      if (formErrors.imageError) {
        const { ...rest } = formErrors
        setFormErrors(rest)
      }
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

    if (formErrors.imageError) {
      const { ...rest } = formErrors
      setFormErrors(rest)
    }

    const fileInput = document.getElementById(
      'profile-edit-upload'
    ) as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  const handleKTBToggle = (value: boolean) => {
    setIsKTB(value)

    if (!value) {
      setCurrentData(prev => ({
        ...prev,
        curriculum: '',
      }))
    }

    if (showValidationErrors && formErrors.curriculum) {
      const { ...rest } = formErrors
      setFormErrors(rest)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setCurrentData(prev => ({
      ...prev,
      [field]: value,
    }))

    if (showValidationErrors && formErrors[field]) {
      const { ...rest } = formErrors
      setFormErrors(rest)
    }
  }

  const handleRadioChange = (value: string) => {
    setCurrentData(prev => ({
      ...prev,
      curriculum: value,
    }))

    if (showValidationErrors && formErrors.curriculum) {
      const { ...rest } = formErrors
      setFormErrors(rest)
    }
  }

  const seatCode = originalProfile?.seatCode ? originalProfile?.seatCode : ''

  const validateForm = (): boolean => {
    const formData = {
      name: currentData.name,
      nickname: currentData.nickname,
      curriculum: isKTB ? currentData.curriculum : '',
      jobInterest: selectedJobInterests,
      techStack: selectedTechStacks,
      profileImageName: '',
      seatPosition: parseSeatPosition(seatCode),
      isKTB,
    }

    const basicInfoValidation = validateBasicInfo(formData)
    const jobInterestValidation = validateJobInterest(formData)
    const techStackValidation = validateTechStack(formData)

    const allErrors = {
      ...basicInfoValidation.errors,
      ...jobInterestValidation.errors,
      ...techStackValidation.errors,
    }

    if (formErrors.imageError) {
      allErrors.imageError = formErrors.imageError
    }

    setFormErrors(allErrors)

    return (
      basicInfoValidation.isValid &&
      jobInterestValidation.isValid &&
      techStackValidation.isValid &&
      !formErrors.imageError
    )
  }

  const getValidationErrors = (): string[] => {
    return Object.entries(formErrors)
      .filter(([, value]) => value)
      .map(([, value]) => value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setShowValidationErrors(true)

    if (!validateForm()) {
      return
    }

    try {
      updateBasicInfo(
        currentData.name,
        currentData.nickname,
        isKTB ? currentData.curriculum : ''
      )
      updateJobInterest(selectedJobInterests)
      updateTechStack(selectedTechStacks)
      setIsKTB(isKTB)

      if (imageURL && imageURL !== profileImageUrl) {
        updateProfileImage(`profile_${Date.now()}`)
      }

      await onSubmit()
      navigate('mypage')
    } catch (error) {
      console.error('프로필 수정 실패:', error)
    }
  }

  const validationErrors = getValidationErrors()

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

        {imageURL && imageURL !== profileImageUrl && (
          <button
            type="button"
            onClick={handleResetImage}
            className={styles.reset}
          >
            사진 삭제
          </button>
        )}
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

      {showValidationErrors && validationErrors.length > 0 && (
        <div className={styles.validationErrors}>
          <ul>
            {validationErrors.map((error, index) => (
              <li key={index}>
                <ErrorMessage error={error} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.submitButton}>
        <Button text={'프로필 수정'} onClick={() => {}} />
      </div>
    </form>
  )
}
