import loadingSpinner from "@/assets/images/infinite-spinner.svg";
import Image from 'next/image';

const Loading = () => {
  return (
    <div className="w-full min-h-[80vh] flex justify-center items-center">
      <Image src={loadingSpinner} alt="Loading..." priority className="w-40" />
    </div>
  );
};

export default Loading;