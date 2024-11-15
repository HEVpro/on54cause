"use client";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { CoolMode } from "@/components/ui/cool-mode";
import NumberTicker from "@/components/ui/number-ticker";
import { RainbowButton } from "@/components/ui/rainbow-button";
import ShimmerButton from "@/components/ui/shimmer-button";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ConfettiButton from "@/components/ui/confetti";

export default function Home() {
  return (
    <>
      <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
          )}
        />

        <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
          <NumberTicker value={23} decimalPlaces={0} />
        </p>
        <div className="z-10 flex gap-12 min-h-64 items-center justify-center">
          <ShimmerButton className="shadow-2xl" borderRadius="10px">
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Shimmer Button
            </span>
          </ShimmerButton>
          <RainbowButton>Get Unlimited Access</RainbowButton>
          <CoolMode>
            <Button>Click Me!</Button>
          </CoolMode>

          <ConfettiButton>Confetti 🎉</ConfettiButton>
        </div>
      </div>
    </>
  );
}
