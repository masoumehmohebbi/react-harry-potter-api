import { HiOutlineEye } from "react-icons/hi2";
import { SlUser } from "react-icons/sl";
import { GiGraveFlowers } from "react-icons/gi";
// import { PiHouseLineBold } from "react-icons/pi";
function CharacterList() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center p-5">
      <Character />
    </section>
  );
}

export default CharacterList;

function Character() {
  return (
    <div className="grid bg-[#F3DEBA] shadow-lg rounded-md p-1 grid-rows-2 grid-cols-8 justify-items-center">
      <img
        className="rounded-lg object-cover col-span-2 row-span-2"
        src="https://ik.imagekit.io/hpapi/harry.jpg"
        alt=""
      />

      <div className="row-span-2 col-span-4 flex gap-y-4 justify-center flex-col">
        {/* <SlUserFemale/> */}
        <span className="flex space-x-4">
          <SlUser size={18} />
          <h2>harry potter</h2>
        </span>
        <span className="flex space-x-4">
          <GiGraveFlowers size={18} />
          {/* <LiaHeartbeatSolid /> */}
          <h3>Dead - Human</h3>
        </span>
        {/* <span className="flex space-x-4">
          <PiHouseLineBold size={18} />
          <h3>Gryffindor</h3>
        </span> */}
      </div>
      <div className="row-span-2 col-span-2 flex items-center">
        <HiOutlineEye className="cursor-pointer" size={25} />
      </div>
    </div>
  );
}
