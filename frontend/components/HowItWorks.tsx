import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";
import { BentoCard, BentoGrid } from "./ui/bento-grid";
import {
  BlocksIcon,
  HandCoinsIcon,
  HandHeartIcon,
  LightbulbIcon,
  LinkIcon,
} from "lucide-react";
import Image from "next/image";

const features = [
  {
    Icon: LightbulbIcon,
    name: "1. Pick Your Cause",
    description:
      "Browse events from amazing charities like Save the Children or World Wildlife Fund.",
    background: (
      <Image
        src={"/glasses/glasses-square-red.png"}
        alt="nouns-red-glasses"
        width={350}
        height={350}
        className="absolute left-2 top-0 opacity-60"
      />
    ),
    className:
      "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3 border-2 border-custom-red-600 text-custom-red-600",
    titleColor: "text-custom-red-600",
    strokeIcon: "stroke-custom-red-800",
  },
  {
    Icon: LinkIcon,
    name: "2. Create Your Event Link",
    description:
      "Generate a custom fundraising link to share with friends, family, and your network.",
    background: (
      <Image
        src={"/avatars/head-beer.png"}
        alt="nouns-beer"
        width={75}
        height={75}
        className="absolute right-4 top-6 opacity-60"
      />
    ),
    className:
      "lg:col-start-2 lg:col-end-2 lg:row-start-1 lg:row-end-2 border-2 border-custom-yellow-200",
    titleColor: "text-custom-yellow-500",
    strokeIcon: "stroke-custom-yellow-700",
  },
  {
    Icon: HandCoinsIcon,
    name: "3. Raise Funds",
    description: "Work towards your goal—the registration fee for your event",
    background: (
      <Image
        src={"/avatars/head-heart.png"}
        alt="nouns-beer"
        width={75}
        height={75}
        className="absolute right-4 top-6 opacity-60"
      />
    ),
    className:
      "lg:col-start-2 lg:col-end-2 lg:row-start-2 lg:row-end-2 border-2 border-custom-green-400",
    titleColor: "text-custom-green-400",
    strokeIcon: "stroke-custom-green-800",
  },
  {
    Icon: HandHeartIcon,
    name: "4. Achieve & Donate",
    description:
      "When you hit your target, the charity pays your fee, and everything extra goes to their cause.",
    background: (
      <Image
        src={"/avatars/head-earth.png"}
        alt="nouns-beer"
        width={250}
        height={250}
        className="absolute right-4 top-6 opacity-60"
      />
    ),
    className:
      "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-3 border-2 border-custom-orange-400",
    titleColor: "text-custom-orange-400",
    strokeIcon: "stroke-custom-orange-800",
  },
];

export async function HowItWorks() {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}
