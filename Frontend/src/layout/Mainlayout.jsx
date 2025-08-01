import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import '../App.css';
import '../index.css';

export default function MainLayout(){
    return(
        <>
            <div className="flex min-h-screen  text-white">
                <div className="w-80 p-4 bg-zinc-800">
                    <Sidebar/>
                </div>
                
                <div className="flex-1 flex flex-col">
                    <div className="ml-2 mt-2 w-[1160px]">
                    <Header/>
                    </div>
                <main className="p-4">
                    <Outlet/>
                </main>
            </div>
        </div>
        </>
    )
}