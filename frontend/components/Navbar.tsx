import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import ShimmerButton from "./ui/shimmer-button";

export default function Navbar() {
  return (
    <div className="flex h-16 w-full bg-white/70 z-[9999] items-center justify-between backdrop-blur-md px-4 py-2 mx-auto sticky top-0">
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
        <p className="text-lg pt-4 text-custom-green-500">Already registerd?</p>
        {/* TODO: link to signup */}
        <Link href={"/onboarding"}>
          <ShimmerButton
            borderRadius="15px"
            className="mt-4 h-12 pr-2 text-lg overflow-hidden hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center"
            shimmerColor="#53b3cb"
            shimmerSize="0.2em"
            background="#f97f70"
          >
            Click
            <Image
              src="/glasses/glasses-square-teal.png"
              alt="nouns-glasses"
              width={250} // Increase the width
              height={250} // Increase the height
              className="w-24 h-24 p-0  pt-3" // Adjust the className to match the new size
            />
          </ShimmerButton>
        </Link>
      </div>
    </div>
  );
}
