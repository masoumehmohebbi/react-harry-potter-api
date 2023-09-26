function Modal({ title, onOpen, open, children }) {
  if (!open) return null;
  return (
    <section className="flex items-center justify-center z-50">
      <div
        onClick={() => onOpen(false)}
        className="fixed inset-0 bg-black bg-opacity-80 w-screen h-screen"
      ></div>
      <div className="rounded-md flex flex-col p-2 bg-[#b79b48ce] absolute h-fit -translate-x-1/2  top-11 left-1/2 w-11/12 md:w-[30rem] shadow-lg">
        <header className="flex justify-between items-center border-b-2 pb-2">
          <h1 className="capitalize text-lg font-bold pl-2">{title}</h1>
          <button
            onClick={() => onOpen(false)}
            className="text-xl font-black p-1 text-red-600 border-2 flex items-center justify-center border-red-600 rounded-full w-6 h-6"
          >
            X
          </button>
        </header>
        {children}
      </div>
    </section>
  );
}

export default Modal;
