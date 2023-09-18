const UpdateList = () => {
  return (
    <section className="absolute h-full w-full rounded-md p-4 lg:relative lg:w-fit">
      <div className="flex h-full flex-col gap-4 rounded-lg bg-gray-50 p-5 font-mono shadow-md lg:w-[25vw]">
        <div className="flex justify-between">
          <p className="pb-5 text-xl font-bold">Update Task:</p>
          <button className="pb-5 text-xl font-bold" onClick={""}>
            X
          </button>
        </div>
        <form className="flex h-max flex-col justify-center gap-4">
          <label htmlFor="task" className="text-sm">
            Task
          </label>
          <input
            type="text"
            className="flex items-center gap-2 rounded-sm border-b border-t p-2"
            placeholder="Task"
            name="task"
            defaultValue={""}
          />
          <label htmlFor="description" className="text-sm">
            Description
          </label>
          <textarea
            type="text"
            className="flex items-center gap-2 rounded-sm border-b border-t p-2"
            placeholder="Description"
            name="description"
            defaultValue={""}
          />
          <label htmlFor="date" className="text-sm">
            Date
          </label>
          <input
            type="date"
            className="flex items-center gap-2 rounded-sm border-b border-t p-2"
            name="date"
            defaultValue={""}
          />
          <label htmlFor="time" className="text-sm">
            Time
          </label>
          <input
            type="time"
            className="flex items-center gap-2 rounded-sm border-b border-t p-2"
            name="time"
            defaultValue={""}
          />
          <div className="flex justify-between px-10 py-2">
            <button type="button" className="border px-5 py-1 font-semibold">
              Delete Task
            </button>
            <button
              type="submit"
              className=" bg-lime-200 px-5 py-1 font-semibold"
            >
              Save Change
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateList;
