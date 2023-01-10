import React, { ReactNode } from 'react'
import Navbar from 'src/components/Navbar'

type AppLayoutProps = {
  children: ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div>
      <Navbar />
      <div className="relative mx-auto flex flex-col items-start px-6 pt-4 pb-16 lg:max-w-screen-lg xl:max-w-screen-xl">
        {children}
      </div>
    </div>
  )
}

export default AppLayout
