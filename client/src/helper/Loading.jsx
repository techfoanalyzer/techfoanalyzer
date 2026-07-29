import loadingSpinner from "@/assets/images/infinite-spinner.svg"
import Image from 'next/image'

const LoadingPage = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-transparent'>
 
      <Image src={loadingSpinner} alt="Loading..." width={160} height={160} className='w-40' />
    </div>
  )
}

export default LoadingPage;