import { Button } from "@/components/ui/button";
import { socialMediaIconsMapper } from "@/lib/social-media-icons-mapper";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import team from "../../assets/About/young-doctors-with-cardiogram-hospital 1 (1).png";

const features = {
  feature1:
    "AI-powered drug identification through image scanning and text recognition",
  feature2:
    "Comprehensive drug interaction checker to ensure medication safety",
  feature3:
    "Real-time pharmacy locator with availability and contact information",
  feature4: "Extensive medication database with detailed drug information",
  feature5: "Dosage guidance and side effect warnings for informed decisions",
  feature6: "Alternative medication suggestions when needed",
  feature7: "Integration with healthcare providers and prescription services",
  feature8: "Mobile and web platform for accessible healthcare management",
};

export default function Page() {
  return (
    <div className="mx-auto my-16 flex max-w-screen-lg flex-col gap-16 p-4">
      <div className="relative flex h-fit w-full rounded-2xl bg-gray-50/80 p-4 px-8 bg-dot-black/[0.35] dark:bg-black dark:bg-dot-white/[0.2]">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
            "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
          )}
        />

        <h1 className="relative py-8 text-7xl z-50 font-semibold bg-gradient-to-r from-[#AA4870] via-[#C53A54] to-[#5B71C1] bg-clip-text text-transparent lg:text-9xl">
          DrugKit
        </h1>
      </div>

      <div className="flex justify-between gap-8 max-md:flex-col">
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium text-gray-800 md:text-2xl">
            About DrugKit
          </h2>

          <div className="space-y-6">
            <p className="text-sm text-gray-600 md:text-base">
              DrugKit is an innovative AI-powered platform designed to make
              medication management simple, safe, and accessible. We bridge the
              gap between people and the medications they need through
              cutting-edge technology and comprehensive healthcare solutions.
            </p>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800 md:text-xl">
                What We Offer
              </h3>
              <ul className="space-y-2 pl-4">
                {Object.values(features).map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-baseline gap-2 text-sm text-gray-600 md:text-base"
                  >
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-600"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-gray-600 md:text-base">
              Our mission is to democratize access to medication information and
              healthcare resources, ensuring that everyone can make informed
              decisions about their health with confidence and ease.
            </p>
          </div>
        </div>

        <div className="shrink-0 grow-0 basis-72 space-y-4">
          <div className="flex justify-center mb-6">
            <div className="aspect-[4/3] w-full max-w-sm overflow-hidden rounded-lg shadow-lg bg-gray-100">
              <img
                src={team}
                alt="Our Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-800">Connect With Us</h3>
          <div className="flex gap-0.5">
            <Button variant="secondary" className="group-round" asChild>
              <Link to="https://www.facebook.com/DrugKit">
                {socialMediaIconsMapper("facebook")}
              </Link>
            </Button>

            <Button variant="secondary" className="group-round" asChild>
              <Link to="https://www.instagram.com/drugkit">
                {socialMediaIconsMapper("instagram")}
              </Link>
            </Button>

            <Button variant="secondary" className="group-round" asChild>
              <Link to="https://www.youtube.com/@DrugKit">
                {socialMediaIconsMapper("youtube")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
