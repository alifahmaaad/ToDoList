import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);
  useEffect(() => {
    setTimeout(() => navigate("/"), 6000);
  }, []);
  useEffect(() => {
    setTimeout(() => setCount(count - 1), 1000);
  }, [count]);
  return (
    <div className="flex h-full w-full items-center justify-center text-center font-mono font-bold">
      404 Not Found
      <br /> Automatic redirect to Home in {count} seconds...
    </div>
  );
};

export default NotFoundPage;
