import useMovie from "@/hooks/useMovie";
import usePoster from "@/hooks/usePoster";
import { BsFillPlayFill } from 'react-icons/bs';

interface RecomCardProps {
  id: number;
  onClick: () => void;
}

const RecomCard: React.FC<RecomCardProps> = ({ id, onClick }) => {
  const { data, error, isLoading } = useMovie(id);
  const { path, perror } = usePoster(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading Recommendation.</div>;
  if (perror) return <div>Error loading poster.</div>;

  return (
    <div className="group bg-zinc-900 col-span relative " onClick={onClick}>
      
      <img
        className="
          cursor-pointer
          object-cover
          transition
          duration
          shadow-xl
          rounded-md
          group-hover:opacity-90
          sm:group-hover:opacity-0
          delay-300
          w-full
          
        "
        src={path}
        alt="Thumbnail"
      />
      <div
        className="
          opacity-0
          absolute
          top-0
          transition
          duration-200
          z-10
          invisible
          sm:visible
          delay-300
          w-full
          scale-0
          group-hover:scale-110
          group-hover-translate-y-[6vw]
          group-hover:translate-x-[2vw]
          group-hover:opacity-100
        "
      >
        <img
          className="
            cursor-pointer
            object-cover
            transition
            duration
            shadow-xl
            rounded-t-md
            w-full
            
          "
          src={path}
          alt="Thumbnail"
        />
        <div
          className="
            z-10
            bg-zinc-800
            p-2
            lg:p-4
            absolute
            w-full
            transition
            shadow-md
            rounded-b-md
          "
        >
          <div className="flex flex-row items-center">
            <div
              className="
                cursor-pointer
                w-6
                h-6
                lg:w-10
                lg:h-10
                bg-white
                rounded-full
                flex
                justify-center
                items-center
                transition
                hover:bg-neutral-300
              "
            >
              <BsFillPlayFill size={30} />
            </div>
          </div>
          <p className="text-green-400 font-semibold ">
            <span className="text-white">{data?.title}</span>
          </p>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-{10px} lg:text-sm">Duration</p>
          </div>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-{10px} lg:text-sm">Genre</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecomCard;
