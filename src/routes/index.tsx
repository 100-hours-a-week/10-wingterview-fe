import { RouteObject } from 'react-router-dom'
import { RootLayout } from '@/components/common'
import { HomePage, LoginPage } from '@/pages'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
]

export default routes
