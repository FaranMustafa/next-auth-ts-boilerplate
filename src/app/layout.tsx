import type { Metadata } from 'next'
import AuthProvider from './context/AuthProvider'
import { Inter } from 'next/font/google'

import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

import * as AppConstant from '../utils/constants/app-constants'

interface RootLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export const metadata: Metadata = AppConstant.metaData

const RootLayout: React.FC<RootLayoutProps> = (props) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{props.children}</AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
