import Image from "next/image";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="flex h-16 w-full items-center justify-between bg-background backdrop-blur-md px-4 py-2 mx-auto sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Image
          src="/icon.png"
          alt="logo"
          width={100}
          height={100}
          className="h-10 w-10"
        />
        <p className="text-2xl font-bold">On54Cause</p>
      </div>
      <div className="w-fit flex items-center gap-4">
        <p>Are you alread registered?</p>
        <Button variant={"outline"}>Click</Button>
      </div>
    </div>
  );
}
