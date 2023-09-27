import { BiHeart, BiSearch, BiTrashAlt } from "react-icons/bi";
import Select from "react-select";
import { useQuery } from "../context/QueryContext";
import { Toaster } from "react-hot-toast";
import Modal from "./Modal";
import { Character } from "../pages/CharacterList";
import { useFavourite } from "../context/FavouritesContext";
import useSetLocalStorage from "../hooks/useSetLocalStorage";
import { useState } from "react";
import { useSearch } from "../context/SearchContext";

const options = [
  { value: "characters", label: "Characters" },
  { value: "characters/staff", label: "Staff" },
  { value: "spells", label: "Spells" },
];
const selectStyles = {
  control: (base) => ({
    ...base,
    borderRadius: "6px 0px 0px 6px",
    padding: "1.6px",
    boxShadow: "none",
    "&:focus": {
      border: "0 !important",
    },
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#fed7aa !important",
    color: "white",

    "&:hover": {
      backgroundColor: "#fed7aa !important",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#fed7aa" : "white",
    color: state.isFocused ? "#111827" : "#374151",
    "&:hover": {
      backgroundColor: "#fed7aa",
    },
  }),
};

function Header({ children }) {
  return (
    <div className="flex flex-col justify-center relative bg-[url('./assets/images/header.jpg')] h-52 bg-top">
      <Toaster />
      <div className="flex flex-col items-center ">
        <h1 className="font-harrypotter text-2xl sm:text-3xl md:text-4xl text-center text-white">
          Welcome to Harry Potter Universe!
        </h1>
        {children[0]}
      </div>
      <div className="absolute left-0 top-1 pt-1 pl-3 text-white">
        {children[1]}
      </div>
      {children[2]}
    </div>
  );
}

export default Header;

export function Search() {
  const { setQuery } = useQuery();
  const { setSearch } = useSearch();

  const handleSelect = (e) => {
    setQuery(e.value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="absolute bottom-2 w-11/12 grid grid-cols-8">
      <Select
        className="col-span-3 sm:col-span-2 mr-[1px] font-semibold capitalize text-xs sm:text-base"
        options={options}
        styles={selectStyles}
        placeholder="Category..."
        onChange={(e) => handleSelect(e)}
      />
      <div className="col-span-5 sm:col-span-6 w-full flex items-center justify-center relative">
        <input
          onChange={(e) => handleSearch(e)}
          className="w-full p-2 rounded-r-md outline-none capitalize"
          type="text"
        />
        <BiSearch className="absolute right-0 w-9 sm:w-14 p-1 top-0 h-full text-white bg-red-500 rounded-r-md" />
      </div>
    </div>
  );
}
export function Favourite() {
  const [isOpen, setIsOpen] = useState(false);

  const { Favourites, setFavourites } = useFavourite();

  useSetLocalStorage("FAVOURITES", Favourites);

  const handleFavRemove = (id) => {
    const filteredFev = Favourites.filter((item) => item.id !== id);
    setFavourites(filteredFev);
  };

  return (
    <>
      <Modal title="List of Favourites" onOpen={setIsOpen} open={isOpen}>
        <main className="mt-2">
          {Favourites.length ? (
            Favourites.map((item) => (
              <div key={item.id} className="px-5 py-2">
                <Character data={item}>
                  <button
                    onClick={() => handleFavRemove(item.id)}
                    className="text-red-600 text-2xl"
                  >
                    <BiTrashAlt />
                  </button>
                </Character>
              </div>
            ))
          ) : (
            <p className="text-center font-medium py-5">
              There is no added yet!
            </p>
          )}
        </main>
      </Modal>
      <div className="absolute right-0 top-1 pr-5">
        <button className="relative" onClick={() => setIsOpen((is) => !is)}>
          <BiHeart className="text-red-500 w-9 h-9 sm:w-10 sm:h-10" />
          <span className="absolute top-0 -right-[6px] h-5 w-5 sm:h-6 sm:w-6 text-sm rounded-full bg-red-500 flex justify-center items-center">
            {Favourites.length}
          </span>
        </button>
      </div>
    </>
  );
}
export function NumOfresult({ allData }) {
  return (
    <p className="text-center">
      Found <span className="font-bold">{allData.length}</span> Result
    </p>
  );
}
