import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h1>Home Page</h1>
      <div>WELCOME TO CHESS</div>
      <div>PLAY WITH YOUR FRIENDS</div>
      <Link href={"/game"} >
        <button className="bg-green-300 px-3 py-1.5 hover:shadow-md rounded-md border border-black ">
          Play Chess Online
        </button>
      </Link>
    </div>
  );
}
