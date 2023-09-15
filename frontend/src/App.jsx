import AddList from "./Component/AddList";
import TodolistCard from "./Component/TodolistCard";

function App() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-10">
      <AddList />
      <TodolistCard />
      <TodolistCard />
      <TodolistCard />
      <TodolistCard />
    </div>
  );
}

export default App;
