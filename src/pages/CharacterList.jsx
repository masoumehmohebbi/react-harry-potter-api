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
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

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

  // if (!records.length) {
  //   return (
  //     <div className="flex flex-col mt-20 gap-y-9 items-center sticky top-0">
  //       <Loader />
  //       <h1 className="text-white text-2xl font-bold">
  //         Select a Category ! ! !
  //       </h1>
  //     </div>
  //   );
  // }
  return (
    <>
      <Header />
      {records.length ? (
        <>
          <section className="grid grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center p-5">
            {query !== "spells" &&
              records.map((data) => (
                <Character key={data.id} data={data} id={data.id} />
              ))}

            {query === "spells" &&
              records.map((data) => <Spells key={data.id} item={data} />)}
          </section>

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            npage={npage}
            numbers={numbers}
          />
        </>
      ) : (
        <div className="flex flex-col mt-20 gap-y-9 items-center sticky top-0">
          <Loader />
          <h1 className="text-white text-2xl font-bold">
            Select a Category ! ! !
          </h1>
        </div>
      )}
    </>
  );
}

export default CharacterList;

function Character({ data, id }) {
  const navigate = useNavigate();
  return (
    <div className="grid bg-[#F3DEBA] shadow-lg rounded-md p-1 grid-rows-2 grid-cols-8 justify-items-center">
      <img
        className="rounded-lg object-cover col-span-2 row-span-2"
        src={data.image ? data.image : "/src/assets/Images/avator.png"}
        alt=""
      />

      <div className="row-span-2 text-xs md:text-base col-span-5 flex gap-y-4 justify-center flex-col">
        <span className="flex space-x-4">
          {data.gender === "female" ? (
            <SlUserFemale className="text-pink-700 w-4 h-4 md:w-6 md:h-6" />
          ) : (
            <SlUser className="text-blue-700 w-4 h-4 md:w-6 md:h-6" />
          )}

          <h2>{data.name}</h2>
        </span>
        <span className="flex space-x-4 items-center">
          <>
            {data.alive ? (
              <LiaHeartbeatSolid className="text-green-600 w-5 h-5 md:w-7 md:h-7" />
            ) : (
              <TbGrave2 className="text-[#92400e] w-5 h-5 md:w-7 md:h-7" />
            )}
          </>

          <h3>
            {data.alive === false ? "Dead" : "Alive"} - {data.species}
          </h3>
        </span>
        <span className="flex space-x-4 items-center">
          <PiHouseLineBold className="text-[#eab308] w-5 h-5 md:w-6 md:h-6" />
          <h3>{data.house ? data.house : "—"}</h3>
        </span>
      </div>
      <div className="row-span-2 col-span-1 flex items-center pr-2">
        <HiOutlineEye
          onClick={() => navigate(`character/${id}`)}
          className="cursor-pointer text-red-600 w-5 h-5 md:w-6 md:h-6"
        />
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
    <nav className=" flex w-full items-center justify-center mt-9 mb-11">
      <ul className="flex gap-x-2 rounded-md items-center text-lg">
        {/* Prev Bn */}
        <li className="py-[3px] text-center border border-slate-700 text-slate-700 w-9 rounded-md">
          <a href="#" onClick={prePage} className="text-xl">
            &#x3c;
          </a>
        </li>

        {numbers.length > 3 ? (
          <>
            {numbers.slice(0, 1).map((number, index) => (
              <li
                key={index}
                className={` w-9 py-1 text-center border border-slate-700 rounded-md ${
                  currentPage === number
                    ? "bg-slate-600 text-white"
                    : "text-slate-700"
                }`}
              >
                <a href="#" onClick={() => changeCPage(number)}>
                  {number}
                </a>
              </li>
            ))}
            <span className="w-9 py-1 text-center border border-slate-700 text-slate-700 font-bold rounded-md">
              &#8943;
            </span>
            {numbers.slice(-3).map((number, index) => (
              <li
                key={index}
                className={`w-9 py-1 text-center border border-slate-700 rounded-md ${
                  currentPage === number
                    ? "bg-slate-600 text-white"
                    : "text-slate-700 "
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
              className={`w-9 py-1 text-center border border-slate-700 rounded-md ${
                currentPage === number
                  ? "bg-slate-600 text-white"
                  : "text-slate-700 "
              }`}
            >
              <a href="#" onClick={() => changeCPage(number)}>
                {number}
              </a>
            </li>
          ))
        )}
        {/* Next Btn */}
        <li className="py-[3px] text-center border border-slate-700 text-slate-700 w-9 rounded-md">
          <a href="#" onClick={nextPage} className="text-xl">
            &#x3e;
          </a>
        </li>
      </ul>
    </nav>
  );
}
