import Link from 'next/link'
import React from 'react'

const NavLink = ({href,Children}:{href:string,Children:React.ReactNode}) => {
  return (
    <Link href={href} className='transition-colors text-sm duration-200 text-gray-600 hover:text-rose-500'>
      {Children}
    </Link>
  )
}

export default NavLink
