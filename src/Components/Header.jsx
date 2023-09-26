import { BiHeart, BiSearch, BiTrashAlt } from "react-icons/bi";
import Select from "react-select";
import { useQuery } from "../context/QueryContext";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import Modal from "./Modal";
import { Character } from "../pages/CharacterList";

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
      <div className="flex flex-col items-center">
        <h1 className="font-harrypotter text-2xl sm:text-3xl md:text-4xl text-center text-white">
          Welcome to Harry Potter Universe!
        </h1>
        {children[0]}
      </div>

      {/* NumOfResult */}
      <div className="absolute left-0 top-1 pt-1 pl-3 text-white">
        {children[1]}
      </div>
      {/* <Favourites /> */}
      {children[2]}
    </div>
  );
}

export default Header;

export function Search() {
  const { setQuery } = useQuery();
  const handleSelect = (e) => {
    setQuery(e.value);
  };
  return (
    <div className="absolute bottom-2 w-11/12 grid grid-cols-7">
      <Select
        className="col-span-2 mr-[1px]"
        options={options}
        styles={selectStyles}
        placeholder="Category..."
        onChange={(e) => handleSelect(e)}
      />
      <div className="col-span-5 w-full flex items-center justify-center relative">
        <input className="w-full p-2 rounded-r-md outline-none" type="text" />
        <BiSearch className="absolute right-0 w-14 p-1 top-0 h-full text-white bg-red-500 rounded-r-md" />
      </div>
    </div>
  );
}
export function Favourite({ Favourites, setFavourites }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFavRemove = (id) => {
    const filteredFev = Favourites.filter((item) => item.id !== id);
    setFavourites(filteredFev);
  };

  return (
    <>
      <Modal title="List of Favourites" onOpen={setIsOpen} open={isOpen}>
        <main className="mt-2">
          {Favourites &&
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
            ))}
        </main>
      </Modal>
      <div className="absolute right-0 top-1 pr-5">
        <button className="relative" onClick={() => setIsOpen((is) => !is)}>
          <BiHeart size={39} className="text-red-500" />
          <span className="absolute top-0 -right-[6px] h-6 w-6 text-sm rounded-full bg-red-500 flex justify-center items-center">
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
