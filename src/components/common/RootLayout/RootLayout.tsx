import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './RootLayout.module.scss'

export const RootLayout: React.FC = () => {
  return (
    <div className={styles.appContainer}>
      <div className={styles.desktopView}>
        <div className={styles.container}>
          <img
            src="https://github.com/user-attachments/assets/fcbe381a-189e-4d70-ac82-722e12acfd9c"
            alt="img"
          />
          <h1>WINGTERVIEW</h1>
          <p>윙터뷰, 면접에 날개를 달자!</p>
        </div>
      </div>
      <main className={styles.mobileView}>
        <Outlet />
      </main>
    </div>
  )
}
