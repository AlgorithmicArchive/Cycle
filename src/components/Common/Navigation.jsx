import { Outlet } from "react-router-dom";

export const Navigation = () => {
  return (
    <>
      <div
        style={{ backgroundColor: "#1E1E2A", color: "#fff" }}
        className="flex items-center justify-center p-5"
      >
        <p className="text-4xl">Cycle</p>
      </div>
      <Outlet />
    </>
  );
};
