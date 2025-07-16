import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  return (
    <>
      <nav className="lg:pr-2 flex justify-between items-center p-1 ">
        <Link to="/">
          <img src="/logo.png" className="h-16 lg:w-36 bg-transparent" alt="Hirrd Logo" />
        </Link>

        <div className="flex gap-6 mx-2">
          <SignedOut>
            <Button className="bg-cyan-400 text-black hover:bg-cyan-500 rounded-full lg:w-32" onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <Button variant="destructive" className="rounded-full text-[8px] sm:text-base">
                  <PenBox  className="mr-1 sm:mr-2 size-3 sm:size-5" />
                  Post a Job
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[999] flex justify-center items-center"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
