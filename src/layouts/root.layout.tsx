import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <main className="container mx-auto py-12">
      <div className="px-6 sm:p-12 rounded-md bg-opacity-5 bg-black">
        <Outlet />
      </div>
    </main>
  );
}
