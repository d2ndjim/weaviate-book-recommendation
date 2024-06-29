import { Loader2 } from "lucide-react";
import { HeaderLogo } from "./header-logo";
import { WelcomeMsg } from "./welcome-message";

export const Header = () => {
  return (
    <header className="bg-[#A0FFA4] px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
          </div>
        </div>
        <WelcomeMsg />
      </div>
    </header>
  );
};
