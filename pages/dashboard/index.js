
import Loading from '@/components/common/Loading'
import Card from '@/components/dashboard/Card'
// import RecentCard from '@/components/dashboard/RecentCard'
import StoreLayout from '@/components/layout/StoreLayout'
import { withAuth } from '@/hoc/withAuth'
import {  getAllStats } from '@/services/Path/Path'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'


const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [statsItems, setStatsItems] = useState(null);

  useEffect(() => {
    getAllStatsData()
  }, [])

  const getAllStatsData = async () => {
    setLoading(true)
    try {
      const auth_user = JSON.parse(localStorage.getItem("auth_user"));
      const getToken = auth_user.token
      const resp = await getAllStats(getToken);
      if (resp) {
        setStatsItems(resp);
      }
    } catch (error) {
      setLoading(false)
    } finally { setLoading(false) }
  }

 
  return (
    <main
    // className={` ${inter.className}`}
    >
      <StoreLayout>
        <Loading loading={loading} />
        <Head>
          <title>Mamvo | Dashboard</title>
        </Head>
        <div className=''>
          <h1 className='text-2xl text-secondary font-bold mb-6'>
            Dashboard
          </h1>
          <Card
            totalUsers={statsItems?.totalUsers}
            totalAffiliateUsers={statsItems?.totalAffiliateUsers}
            totalPRUsers={statsItems?.totalPRUsers}
            totalUpcomingEvents={statsItems?.totalUpcomingEvents}
          />
          <div className='my-10 flex sm:flex-nowrap flex-wrap gap-4'>
          </div>

        </div>
      </StoreLayout>
    </main>
  )
}
export default withAuth(Dashboard)

