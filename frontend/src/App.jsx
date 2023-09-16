import AddList from "./Component/AddList";
import Sidebar from "./Component/Sidebar";
import TodolistCard from "./Component/TodolistCard";

function App() {
  return (
    <div className="flex h-full w-full items-center md:justify-between">
      <Sidebar />
      <div className="flex h-full flex-col items-center gap-2 p-10">
        <h1 className="font-mono text-2xl font-bold">Today List</h1>
        <AddList />
        <TodolistCard />
        <TodolistCard />
        <TodolistCard />
        <TodolistCard />
      </div>
      <Sidebar />
    </div>
  );
}

export default App;
