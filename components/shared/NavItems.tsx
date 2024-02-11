'use client'

import { headerLinks } from "@/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NavItems = () => {
  const pathName = usePathname()
  
  return (
    <ul className='w-full flex flex-col items-start md:flex-between md:flex-row gap-6'>
      {headerLinks.map((navLink) => {
        const isActive = pathName === navLink.route;
        
        return (
          <li key={navLink.route}
          className={`${isActive && 'text-primary-500'} flex-center p-medium-16 whitespace-nowrap`}
          >
            <Link href={navLink.route}>{navLink.title}</Link>
            </li>
        )
      })}
    </ul>
  )
}

export default NavItems