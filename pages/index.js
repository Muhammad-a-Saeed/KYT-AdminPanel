// import Image from 'next/image'
// import { Inter } from 'next/font/google'
import StoreLayout from '@/components/layout/StoreLayout'
import { withAuth } from '@/hoc/withAuth'
import React from 'react'

const Home = () => {
  return (
    <main
    // className={` ${inter.className}`}
    >
      <StoreLayout>
      </StoreLayout>
    </main>
  )
}

export default withAuth(Home)
