import Link from "next/link"
import Image from "next/image"

function Footer() {
  return (
    <footer className='border-t'>
      <div className="wrapper flex flex-center flex-between gap-4 flex-col p-5 sm:flex-row text-center">
        <Link href='/'>
          <Image
            src='/assets/images/logo.svg'
            alt='evently logo'
            width={128}
            height={38}
          />
        </Link>
        
        <p className='p-medium-12'>
          Coded By <Link href='https://github.com/ememVII'
          target='_blank'
          className='text-primary-500'>
            Mahmoud Magdy
            </Link> {' '}
          &copy; All rights reserved to <Link
          href='https://www.youtube.com/@javascriptmastery'
          target='_blank'
          className='text-primary-500'>JavaScript Mastery</Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer