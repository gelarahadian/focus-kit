'use client'

import { useSearchParams } from 'next/navigation';

const page = () => {
    const searchParams = useSearchParams();
    const success = searchParams.get("success");
  return (
    <div>
         {
      success && <p>Payment Success 🎉</p>
    }page</div>
  )
}

export default page