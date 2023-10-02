const AddList = ({ func }) => {
  return (
    <button
      className="min-h-10 flex h-fit w-full items-center gap-2 border-2 p-2 px-8"
      onClick={() => func()}
    >
      <p className="-translate-y-0.5 text-xl">+</p>
      <p className="font-mono">Add List</p>
    </button>
  );
};

export default AddList;
