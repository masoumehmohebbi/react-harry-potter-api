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
          className="text-white flex items-center text-sm sm:text-base font-black"
        >
          <HiArrowUturnLeft className="mr-2 w-6 h-6 sm:w-8 sm:h-8" />
          Back to Home
        </button>
        <Favourite />
      </Header>
      <Details selectedItem={selectedItem} selectedId={id} />
    </div>
  );
}

export default CharacterDetails;

function Details({ selectedItem, selectedId }) {
  const { setFavourites, Favourites } = useFavourite();

  const handleAddFavourite = (char) => {
    setFavourites((preFav) => [...preFav, char]);
  };

  const isAddedToFavourite = Favourites.map((fav) => fav.id).includes(
    selectedId
  );

  return (
    <section className="flex items-center justify-center mt-9 px-4">
      {selectedItem &&
        selectedItem.map((item) => (
          <div key={item.id} className="grid grid-cols-8 sm:gap-x-7">
            <div className="col-span-3 w-full space-y-3 h-40 sm:h-80 sticky top-0 flex flex-col justify-center">
              <img
                loading="lazy"
                src={
                  item.image
                    ? item.image
                    : "https://o.remove.bg/downloads/aa464b5b-26f3-444a-bc31-1ec7c711253b/avator-removebg-preview.png"
                }
                alt={item.name}
                className="w-full h-full"
              />
              <div className="sm:w-[15rem] pt-2 text-xs sm:text-base">
                {isAddedToFavourite ? (
                  <p className="flex text-xs items-start sm:text-sm font-bold italic pt-[4px]">
                    Already Added To Favourites{" "}
                    <BiSolidCommentCheck className="text-green-600 w-7 h-7 sm:ml-2" />
                  </p>
                ) : (
                  <button
                    onClick={() => handleAddFavourite(item)}
                    className="flex mx-auto justify-center bottom-2 px-2 sm:px-3 py-1 rounded-2xl bg-orange-500 items-center text-white"
                  >
                    Add To Favourite
                  </button>
                )}
              </div>
            </div>
            <ul className="col-span-5 flex flex-col pl-4 gap-y-5 mb-5 text-xs sm:text-base">
              <li className="border-b-2 pb-2 pl-2">
                <span className="font-black text-base sm:text-lg pr-2">
                  Name:
                </span>{" "}
                {item.name}
              </li>
              <li className="border-b-2 pb-2 pl-2">
                <span className="font-black text-base sm:text-lg pr-2">
                  Actor:
                </span>{" "}
                {item.actor}
              </li>
              <li className="border-b-2 pb-2 pl-2">
                <span className="font-black text-base sm:text-lg pr-2">
                  Birthday:
                </span>
                {item.dateOfBirth ? item.dateOfBirth : "---"}
              </li>
              <li className="border-b-2 pb-2 pl-2">
                <span className="font-black text-base sm:text-lg pr-2">
                  Eye Colour:{" "}
                </span>
                {item.eyeColour ? item.eyeColour : "---"}
              </li>
              <li className="border-b-2 pb-2 pl-2">
                <span className="font-black text-base sm:text-lg pr-2">
                  Hair Colour:
                </span>
                {item.hairColour}
              </li>
              <li className="border-b-2 pb-2 pl-2 flex items-center">
                <span className="font-black text-base sm:text-lg pr-2">
                  Wizard:
                </span>
                {item.wizard ? (
                  <IoIosCheckmark className="text-green-600" size={35} />
                ) : (
                  <IoIosClose className="text-red-600" size={34} />
                )}
              </li>
              <li className="border-b-2 pb-2 pl-2">
                <span className="font-black text-base sm:text-lg pr-2">
                  Wood:
                </span>
                {item.wand.wood ? item.wand.wood : "---"}
              </li>
              <li className="border-b-2 pb-2 pl-2 flex items-center">
                <span className="font-black text-base sm:text-lg pr-2">
                  Is Hagwarts Studend?
                </span>
                {item.hogwartsStudent ? (
                  <IoIosCheckmark className="text-green-600" size={35} />
                ) : (
                  <IoIosClose className="text-red-600" size={34} />
                )}
              </li>
              <li className="border-b-2 pb-2 pl-2 flex items-center">
                <span className="font-black text-base sm:text-lg pr-2">
                  Is Hagwarts Staff?
                </span>

                {item.hogwartsStaff ? (
                  <IoIosCheckmark className="text-green-600" size={35} />
                ) : (
                  <IoIosClose className="text-red-600" size={34} />
                )}
              </li>
              <ul className="pb-2 pl-2">
                <span className="font-black text-base sm:text-lg pr-2">
                  Alternate Names:
                </span>

                {item.alternate_names.length
                  ? item.alternate_names.map((i, index) => (
                      <li key={index}>{i}</li>
                    ))
                  : "---"}
              </ul>
            </ul>
          </div>
        ))}
    </section>
  );
}
