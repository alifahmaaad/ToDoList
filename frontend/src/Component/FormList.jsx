const FormList = ({ func }) => {
  return (
    <section className="h-full w-full rounded-md p-4  lg:w-fit">
      <div className="flex h-full flex-col gap-4 rounded-lg bg-gray-50 p-5 font-mono shadow-md lg:w-[25vw]">
        <div className="flex w-full justify-between">
          <p className="pb-5 text-xl font-bold">Add Tasks to List:</p>
          <button className="pb-5 text-xl font-bold" onClick={() => func()}>
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
          />
          <label htmlFor="description" className="text-sm">
            Description
          </label>
          <textarea
            type="text"
            className="flex items-center gap-2 rounded-sm border-b border-t p-2"
            placeholder="Description"
            name="description"
          />
          <label htmlFor="date" className="text-sm">
            Date
          </label>
          <input
            type="date"
            className="flex items-center gap-2 rounded-sm border-b border-t p-2"
            name="date"
          />
          <label htmlFor="time" className="text-sm">
            Time
          </label>
          <input
            type="time"
            className="flex items-center gap-2 rounded-sm border-b border-t p-2"
            name="time"
          />
          <button
            type="submit"
            className="border bg-lime-200 py-1 font-semibold"
          >
            Add Task
          </button>
        </form>
      </div>
    </section>
  );
};

export default FormList;
