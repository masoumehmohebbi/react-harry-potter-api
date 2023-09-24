import { HiOutlineEye } from "react-icons/hi2";
import { SlUser, SlUserFemale } from "react-icons/sl";
import { TbGrave2 } from "react-icons/tb";
import { LiaHeartbeatSolid } from "react-icons/lia";
import { GiMagicPortal } from "react-icons/gi";
import { PiHouseLineBold } from "react-icons/pi";
import useFetch from "../hooks/useFetch";
import { useQuery } from "../context/QueryContext";
import Loader from "../Components/Loader";
import { useState } from "react";

function CharacterList() {
  // Pagination Config
  const { query } = useQuery();
  const { allData } = useFetch(query);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = allData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(allData.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  // End Of Pagination Config

  if (!query) {
    return (
      <div className="flex flex-col mt-20 gap-y-9 items-center sticky top-0">
        <Loader />
        <h1 className="text-white text-2xl font-bold">Select a Category!</h1>
      </div>
    );
  }
  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center p-5">
        {records.length && (
          <>
            {query !== "spells" &&
              records.map((data) => <Character key={data.id} data={data} />)}

            {query === "spells" &&
              records.map((data) => <Spells key={data.id} item={data} />)}
          </>
        )}
      </section>

      {records.length && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          npage={npage}
          numbers={numbers}
        />
      )}
    </>
  );
}

export default CharacterList;

function Character({ data }) {
  return (
    <div className="grid bg-[#F3DEBA] shadow-lg rounded-md p-1 grid-rows-2 grid-cols-8 justify-items-center">
      <img
        className="rounded-lg object-cover col-span-2 row-span-2"
        src={data.image ? data.image : "/src/assets/Images/avator.png"}
        alt=""
      />

      <div className="row-span-2 col-span-4 flex gap-y-4 justify-center flex-col">
        <span className="flex space-x-4">
          {data.gender === "female" ? (
            <SlUserFemale className="text-pink-600" size={18} />
          ) : (
            <SlUser className="text-blue-600" size={18} />
          )}

          <h2>{data.name}</h2>
        </span>
        <span className="flex space-x-4 items-center">
          <>
            {data.alive ? (
              <LiaHeartbeatSolid className="text-green-600" size={22} />
            ) : (
              <TbGrave2 size={22} />
            )}
          </>

          <h3>
            {data.alive === false ? "Dead" : "Alive"} - {data.species}
          </h3>
        </span>
        <span className="flex space-x-4 items-center">
          <PiHouseLineBold className="text-slate-700" size={18} />
          <h3>{data.house ? data.house : "—"}</h3>
        </span>
      </div>
      <div className="row-span-2 col-span-2 flex items-center">
        <HiOutlineEye className="cursor-pointer text-red-600" size={25} />
      </div>
    </div>
  );
}

function Spells({ item }) {
  return (
    <div className="bg-[#F3DEBA] w-80 shadow-lg rounded-md p-2 flex flex-col">
      <h1 className="flex items-center font-bold mb-3">
        <GiMagicPortal className="text-purple-700 mr-1" /> {item.name}
      </h1>
      <span className="font-semibold">Description:</span>
      <p>{item.description}</p>
    </div>
  );
}

function Pagination({ currentPage, setCurrentPage, npage, numbers }) {
  const changeCPage = (number) => {
    setCurrentPage(number);
  };

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <nav className=" flex w-full items-center justify-center mb-11">
      <ul className="flex gap-x-4 rounded-md items-center border ">
        <li className="border-r p-2">
          <a href="#" onClick={prePage}>
            Prev
          </a>
        </li>

        {numbers.length > 2 ? (
          <>
            {numbers.slice(0, 2).map((number, index) => (
              <li
                key={index}
                className={`${
                  currentPage === number ? "text-blue-600 font-bold" : ""
                }`}
              >
                <a href="#" onClick={() => changeCPage(number)}>
                  {number}
                </a>
              </li>
            ))}
            <span>...</span>
            {numbers.slice(-3).map((number, index) => (
              <li
                key={index}
                className={`${
                  currentPage === number ? "text-blue-600 font-bold" : ""
                }`}
              >
                <a href="#" onClick={() => changeCPage(number)}>
                  {number}
                </a>
              </li>
            ))}
          </>
        ) : (
          numbers.map((number, index) => (
            <li
              key={index}
              className={`currentPage === number ? "text-red" : ""`}
            >
              <a href="#" onClick={() => changeCPage(number)}>
                {number}
              </a>
            </li>
          ))
        )}

        <li className="border-l p-2">
          <a href="#" onClick={nextPage}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}
