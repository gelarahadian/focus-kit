'use client'

import { ReactNode } from "react"
import { Toaster } from "sonner"

const Provider = ({children}: {children: ReactNode}) => {
  return (
    <>
    <Toaster/>
    {children}
    </>
  )
}

export default Provider