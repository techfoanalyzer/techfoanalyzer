import loadingSpinner from "@/assets/images/infinite-spinner.svg"
import Image from 'next/image'

const Loading = () => {
  return (
   <div className='fixed inset-0 z-50 flex justify-center items-center bg-transparent'>
    <Image src={loadingSpinner} alt="Loading..." priority className='w-40' />
</div>
  )
}

export default Loading