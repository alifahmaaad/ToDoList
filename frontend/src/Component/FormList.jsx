import axios from "axios";
import { useState } from "react";

const FormList = ({ func, refresh }) => {
  const [label, setLabel] = useState([]);
  const [labelValue, setLabelValue] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setLoading(true);
    await axios
      .post("create", {
        task: data.get("task"),
        description: data.get("description"),
        datetime: data.get("datetime"),
        label: label,
      })
      .then((res) => {
        alert(`Berhasil menambahkan task : ${res.data.task}`);
      })
      .catch((e) => alert(e.message))
      .finally(() => {
        func();
        setLoading(false);
        refresh();
      });
  };
  return (
    <section className="h-full w-full rounded-md p-4  lg:w-fit">
      <div className="flex h-full flex-col gap-4 rounded-lg bg-gray-50 p-5 font-mono shadow-md lg:w-[25vw]">
        <div className="flex w-full justify-between">
          <p className="pb-5 text-xl font-bold">Add Tasks to List:</p>
          <button className="pb-5 text-xl font-bold" onClick={() => func()}>
            X
          </button>
        </div>
        <form
          className="flex h-max flex-col justify-center gap-4"
          onSubmit={handleSubmit}
        >
          <label htmlFor="task" className="text-sm">
            Task
          </label>
          <input
            type="text"
            id="task"
            className="flex items-center gap-2 rounded-sm border-b border-t p-2"
            placeholder="Task"
            name="task"
            required
          />
          <label htmlFor="description" className="text-sm">
            Description
          </label>
          <textarea
            type="text"
            id="description"
            className="flex items-center gap-2 rounded-sm border-b border-t p-2"
            placeholder="Description"
            name="description"
          />
          <label htmlFor="date" className="text-sm">
            Date Time
          </label>
          <input
            type="datetime-local"
            id="date"
            className="flex items-center gap-2 rounded-sm border-b border-t p-2"
            name="datetime"
            required
          />
          <label htmlFor="label" className="text-sm">
            Label
          </label>
          <div className="flex w-full justify-between">
            <input
              type="text"
              className="w-full rounded-sm border-b border-t p-2"
              name="label"
              id="label"
              onChange={(e) => setLabelValue(e.target.value)}
              value={labelValue}
            />
            <button
              type="button"
              className="rounded-sm border px-4 text-xs font-semibold"
              onClick={() => {
                if (labelValue != "") {
                  setLabel([...label, labelValue]);
                  setLabelValue("");
                }
              }}
            >
              + Add label
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {label.length != 0 &&
              label.map((val, i) => (
                <button
                  className="w-fit rounded-sm bg-lime-200 px-2 py-1 font-serif text-xs"
                  key={i}
                  onClick={() => {
                    const arr = [...label];
                    arr.splice(i, 1);
                    setLabel(arr);
                  }}
                >
                  {val}
                </button>
              ))}
          </div>
          <button
            type="submit"
            className="border bg-lime-200 py-1 font-semibold"
            disabled={loading}
          >
            {loading ? "Loading..." : "Add Task"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default FormList;
