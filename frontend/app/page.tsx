import { HowItWorks } from '@/components/HowItWorks'
import { DescriptionFlow } from '@/components/ProcessBeam'
import AnimatedGridPattern from '@/components/ui/animated-grid-pattern'
import ShimmerButton from '@/components/ui/shimmer-button'
import TypingAnimation from '@/components/ui/typing-animation'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
    return (
        <div className="pb-20">
            <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden bg-background p-20">
                <div className="z-50 flex flex-col items-center justify-center">
                    <div className=" z-10 mb-4 whitespace-pre-wrap text-center text-6xl font-medium tracking-tighter  ">
                        <TypingAnimation
                            className="text-5xl font-bold text-custom-green-500"
                            text="Make a Difference, One Link at a Time!"
                        />
                    </div>
                    <p className="text-3xl mx-auto max-w-[44ch] text-center mb-8">
                        Join forces with charities, smash your fundraising
                        goals, and take part in events you love—all while
                        changing lives.
                    </p>
                    <Link href={'/onboarding'}>
                        <ShimmerButton
                            borderRadius="15px"
                            className="mt-4 h-12 pr-2 pl-8 text-lg overflow-hidden hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center"
                            shimmerColor="#f15946"
                            shimmerSize="0.2em"
                            background="#2d92ad"
                        >
                            Start to contribute now
                            <Image
                                src="/glasses/glasses-square-pink-purple-multi.png"
                                alt="nouns-glasses"
                                width={250} // Increase the width
                                height={250} // Increase the height
                                className="w-24 h-24 p-0  pt-3" // Adjust the className to match the new size
                            />
                        </ShimmerButton>
                    </Link>
                </div>

                <AnimatedGridPattern
                    numSquares={75}
                    maxOpacity={0.6}
                    duration={0.8}
                    repeatDelay={0.5}
                    className={cn(
                        '[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]',
                        'inset-x-0 inset-y-[-30%] h-[200%] skew-y-12'
                    )}
                />
            </div>
            <div className="w-full flex items-center justify-center -translate-y-10 z-20 bg-white px-8">
                <div className="w-1/2 h-auto flex flex-col items-start justify-between ">
                    <h2 className="text-4xl font-bold mb-4 text-custom-yellow-500">
                        On Chain 4 Cause
                    </h2>
                    <p className="text-lg text-gray-800 mb-4">
                        Is where passion meets purpose. Whether you're running a
                        marathon, attending a concert, or participating in any
                        event with a fee, this platform empowers you to
                        fundraise for charities while achieving your personal
                        goals.
                    </p>
                    <ul className="list-disc pl-5 text-base text-gray-700">
                        <li className="mb-2">
                            Charities showcase the events they support.
                        </li>
                        <li className="mb-2">
                            You create a unique fundraising link to share.
                        </li>
                        <li className="mb-2">
                            Reach your goal (e.g., 250 USDC), and the charity
                            covers your fee. Any extra funds go straight to the
                            cause!
                        </li>
                    </ul>
                    <p className="mt-2 text-lg font-bold text-custom-green-400">
                        Transparency is key: charities show exactly where the
                        donations go. Together, we create impact.
                    </p>
                </div>
                <DescriptionFlow />
            </div>
            <div className="w-full flex flex-col items-end justify-between px-8 space-y-4">
                <h2 className="text-4xl font-bold mb-4 text-custom-red-500">
                    How it works?
                </h2>
                <HowItWorks />
            </div>
            <div className="w-full flex items-end justify-between px-8">
                <div>
                    <h2 className="text-4xl font-bold mb-4 text-custom-orange-500">
                        Why On Chain?{' '}
                    </h2>
                    <p className="text-lg text-gray-800 mb-4 max-w-xl">
                        Built on blockchain for total transparency, you can
                        trust every donation is accounted for, ensuring funds
                        make the biggest impact possible.
                    </p>
                </div>
                <div className="w-fit flex flex-col items-center justify-between pb-4">
                    <p className="text-lg font-bold mb-2 text-custom-green-500">
                        Are you ready?
                    </p>
                    <Link href={'/onboarding'}>
                        <ShimmerButton
                            borderRadius="15px"
                            className="h-12 pr-2 text-lg overflow-hidden hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center"
                            shimmerColor="#287692"
                            shimmerSize="0.2em"
                            background="#c01043"
                        >
                            I'm ready!
                            <Image
                                src="/glasses/glasses-square-yellow-orange-multi.png"
                                alt="nouns-glasses"
                                width={250} // Increase the width
                                height={250} // Increase the height
                                className="w-24 h-24 p-0  pt-3" // Adjust the className to match the new size
                            />
                        </ShimmerButton>
                    </Link>
                </div>
            </div>
        </div>
    )
}
