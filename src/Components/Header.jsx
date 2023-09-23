import { BiHeart, BiSearch } from "react-icons/bi";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
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
function Header() {
  return (
    <div className="flex flex-col justify-center relative bg-[url('./assets/images/header.jpg')] h-48 bg-top">
      <div className="flex flex-col items-center">
        <h1 className="font-harrypotter text-4xl text-center text-white">
          Welcome to Harry Potter Universe!
        </h1>
        {/* Search */}
        <div className="absolute bottom-2 w-11/12 grid grid-cols-7">
          <Select
            className="col-span-2 mr-[1px]"
            options={options}
            styles={selectStyles}
            placeholder="Select a category..."
          />
          <div className="col-span-5 w-full flex items-center justify-center relative">
            <input
              className="w-full p-2 rounded-r-md outline-none"
              type="text"
            />
            <BiSearch className="absolute right-0 w-14 p-1 top-0 h-full text-white bg-red-500 rounded-r-md" />
          </div>
        </div>
      </div>
      {/* Found result */}
      <div className="absolute left-0 top-1 pr-5 text-white">
        <p>Found X Result</p>
      </div>
      {/* Favourites */}
      <div className="absolute right-0 top-1 pr-5">
        <button className="relative">
          <BiHeart size={39} className="text-red-500" />
          <span className="absolute top-0 -right-[6px] h-6 w-6 text-sm rounded-full bg-red-500 flex justify-center items-center">
            0
          </span>
        </button>
      </div>
    </div>
  );
}

export default Header;
