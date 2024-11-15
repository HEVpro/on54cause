import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
      <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden bg-background p-20">
        <div className="z-50 space-y-4">
          <h1 className="z-10 whitespace-pre-wrap text-center text-6xl font-medium tracking-tighter text-black dark:text-white">
            Make a Difference, One Link at a Time!{" "}
          </h1>
          <p className="text-3xl mx-auto max-w-[44ch] text-center">
            Join forces with charities, smash your fundraising goals, and take
            part in events you love—all while changing lives.
          </p>
          <Button></Button>
        </div>

        <AnimatedGridPattern
          numSquares={50}
          maxOpacity={0.4}
          duration={1}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          )}
        />
      </div>
      <div></div>
    </>
  );
}
