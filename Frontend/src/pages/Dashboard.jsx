import Card from "../components/Card";
import Header from "../layout/Header";
import SideBar from "../layout/Sidebar";

export default function Dashboard() {
  return (
    <>
      <div>

        <div className="bg-zinc-900">    
         <div className="text-white px-6 py-4 flex flex-col space-y-1 mt-4 ml-10">
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            👋 Hello, <span className="text-green-400">Sathiya</span>!
          </h1>
          <p className="text-sm text-gray-400">Welcome back to your dashboard 👇</p>
        </div>

          <div className="px-4 mt-4">
            <Card />
          </div>
        </div>
      </div>
    </>
  );
}
