import { useState } from 'react'
import { LoginButton, Logo, Modal } from '@/components/ui'
import { FeatureCard, MyProfileCard } from '@/components/features'
import { useAuthStore } from '@/stores'
import { SquarePen } from 'lucide-react'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'

export const MyPage: React.FC = () => {
  const navigate = useNavigate()
  const [notReady, setNotReady] = useState(false)
  const [toggleModal, setToggleModal] = useState(false)
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)

  const linkTo = (link: string) => {
    if (!isLoggedIn) {
      setToggleModal(true)
      return
    }
    navigate(link)
  }

  return (
    <div className={styles.myPage}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>MY PROFILE</h1>
        <button className={styles.editButton} onClick={() => linkTo('edit')}>
          <SquarePen />
        </button>
      </div>

      <div className={styles.pageContent}>
        <section className={styles.profile}>
          <MyProfileCard isLoggedIn={isLoggedIn} />
        </section>

        <Logo width={170} />

        <section className={styles.features}>
          <FeatureCard linkTo={linkTo} />
        </section>
      </div>

      <Modal
        isOpen={notReady}
        style="failed"
        message={['서비스 준비 중 입니다.', '조금만 기다려주세요!']}
        closable
        toggleModal={() => setNotReady(!notReady)}
      />

      <Modal
        isOpen={toggleModal}
        style="failed"
        message={['로그인 후 이용가능합니다.']}
        closable
        toggleModal={() => setToggleModal(!toggleModal)}
      >
        <LoginButton />
      </Modal>
    </div>
  )
}
