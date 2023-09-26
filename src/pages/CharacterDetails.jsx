import { useNavigate, useParams } from "react-router-dom";
import Header, { Favourite } from "../Components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { BiSolidCommentCheck } from "react-icons/bi";
import { useFavourite } from "../context/FavouritesContext";

function CharacterDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddToFavourite, setIsAddToFavourite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://hp-api.onrender.com/api/character/${id}`
        );
        setSelectedItem(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    <p>loading.........</p>;
  }
  return (
    <div>
      <Header>
        {/* <button className="absolute flex justify-center bottom-2 px-3 py-1 rounded-2xl bg-purple-300 items-center text-white">
          Add To Favourite
        </button> */}
        <span></span>
        <button
          onClick={() => navigate("/")}
          className="text-white flex items-center font-black"
        >
          <HiArrowUturnLeft size={30} className="mr-2" />
          Back to Home
        </button>
        <Favourite setIsAddToFavourite={setIsAddToFavourite} />
      </Header>
      <Details
        selectedItem={selectedItem}
        isAddToFavourite={isAddToFavourite}
        setIsAddToFavourite={setIsAddToFavourite}
      />
    </div>
  );
}

export default CharacterDetails;

function Details({ selectedItem, isAddToFavourite, setIsAddToFavourite }) {
  const { setFavourites } = useFavourite();

  const handleAddFavourite = (char) => {
    setFavourites((preFav) => [...preFav, char]);
    setIsAddToFavourite((is) => !is);
  };

  return (
    <section className="flex items-center justify-center mt-9 px-4">
      {selectedItem &&
        selectedItem.map((item) => (
          <div key={item.key} className="grid grid-cols-8 sm:gap-x-7">
            <div className="col-span-3 w-full space-y-3 h-40 sm:h-80 sticky top-0 flex flex-col justify-center">
              <img
                src={item.image ? item.image : "/src/assets/Images/avator.png"}
                alt={item.name}
                className="w-full h-full"
              />
              <div className="w-[15rem] pt-2 ">
                {isAddToFavourite ? (
                  <p className="flex text-sm items-end font-bold italic pt-[4px]">
                    Already Added To Favourites{" "}
                    <BiSolidCommentCheck className="text-green-600 w-7 h-7 ml-2" />
                  </p>
                ) : (
                  <button
                    onClick={() => handleAddFavourite(item)}
                    className="flex mx-auto justify-center bottom-2 px-3 py-1 rounded-2xl bg-orange-500 items-center text-white"
                  >
                    Add To Favourite
                  </button>
                )}
              </div>
            </div>
            <ul className="col-span-5 flex flex-col pl-4 gap-y-5 mb-5">
              <li className="border-b-2 pb-2 pl-2">
                <span className="font-black text-lg pr-2">Name:</span>{" "}
                {item.name}
              </li>
              <li className="border-b-2 pb-2 pl-2">
                <span className="font-black text-lg pr-2">Actor:</span>{" "}
                {item.actor}
              </li>
              <li className="border-b-2 pb-2 pl-2">
                <span className="font-black text-lg pr-2">Birthday:</span>
                {item.dateOfBirth ? item.dateOfBirth : "---"}
              </li>
              <li className="border-b-2 pb-2 pl-2">
                <span className="font-black text-lg pr-2">Eye Colour: </span>
                {item.eyeColour ? item.eyeColour : "---"}
              </li>
              <li className="border-b-2 pb-2 pl-2">
                <span className="font-black text-lg pr-2">Hair Colour:</span>
                {item.hairColour}
              </li>
              <li className="border-b-2 pb-2 pl-2 flex items-center">
                <span className="font-black text-lg pr-2">Wizard:</span>
                {item.wizard ? (
                  <IoIosCheckmark className="text-green-600" size={35} />
                ) : (
                  <IoIosClose className="text-red-600" size={34} />
                )}
              </li>
              <li className="border-b-2 pb-2 pl-2">
                <span className="font-black text-lg pr-2">Wood:</span>
                {item.wand.wood ? item.wand.wood : "---"}
              </li>
              <li className="border-b-2 pb-2 pl-2 flex items-center">
                <span className="font-black text-lg pr-2">
                  Is Hagwarts Studend?
                </span>
                {item.hogwartsStudent ? (
                  <IoIosCheckmark className="text-green-600" size={35} />
                ) : (
                  <IoIosClose className="text-red-600" size={34} />
                )}
              </li>
              <li className="border-b-2 pb-2 pl-2 flex items-center">
                <span className="font-black text-lg pr-2">
                  Is Hagwarts Staff?
                </span>

                {item.hogwartsStaff ? (
                  <IoIosCheckmark className="text-green-600" size={35} />
                ) : (
                  <IoIosClose className="text-red-600" size={34} />
                )}
              </li>
              <li className="pb-2 pl-2">
                <span className="font-black text-lg pr-2">
                  Alternate Names:
                </span>

                {item.alternate_names.length
                  ? item.alternate_names.map((i, index) => (
                      <li key={index}>{i}</li>
                    ))
                  : "---"}
              </li>
            </ul>
          </div>
        ))}
    </section>
  );
}
