'use client'

import { useSearchParams } from 'next/navigation';
import React from 'react'

const PaymentCanceled = () => {
  const searchParams = useSearchParams();

  const canceled = searchParams.get("canceled");


  return <> {canceled && <p>Payment canceled</p>}</>;
}

export default PaymentCanceled