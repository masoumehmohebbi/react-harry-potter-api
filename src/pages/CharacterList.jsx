function CharacterList() {
  return (
    <div className="grid grid-cols-3 justify-items-center p-5 ">
      <div className="flex bg-blue-200 items-center">
        <div className="h-40">
          <img
            className="rounded-lg h-full object-cover"
            src="https://ik.imagekit.io/hpapi/harry.jpg"
            alt=""
          />
        </div>

        <div>1</div>
        <div>2</div>
      </div>
      <div className="flex bg-blue-200">
        <img
          className="rounded-lg"
          src="https://ik.imagekit.io/hpapi/harry.jpg"
          alt=""
        />
        <div>1</div>
        <div>2</div>
      </div>{" "}
      <div className="flex bg-blue-200">
        <img
          className="rounded-lg"
          src="https://ik.imagekit.io/hpapi/harry.jpg"
          alt=""
        />
        <div>1</div>
        <div>2</div>
      </div>
    </div>
  );
}

export default CharacterList;
