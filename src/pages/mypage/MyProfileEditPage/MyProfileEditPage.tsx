import { SubPageHeader } from '@/components/ui'
import styles from './styles.module.scss'
import { ProfileEditForm } from '@/components/features'
import { useProfile } from '@/hooks'

export const MyProfileEditPage: React.FC = () => {
  const { myData } = useProfile('get')
  const { mutate: editProfile } = useProfile('edit', myData?.myId)

  return (
    <div className={styles.profileEditPage}>
      <SubPageHeader name="프로필 편집" backTo="/mypage" />

      <div className={styles.container}>
        <ProfileEditForm originalProfile={myData} onSubmit={editProfile} />
      </div>
    </div>
  )
}
