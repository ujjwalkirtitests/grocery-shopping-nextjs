import {
  FacebookIcon,
  HomeIcon,
  InstagramIcon,
  LinkIcon,
  MailIcon,
  PhoneIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="p-3 border border-t bg-gray-200 mt-10">
      <div className="w-full lg:w-4/5 lg:mx-auto flex flex-col gap-7">
        <div className="flex flex-col">
          <p className="text-2xl font-bold  mr-4 ">Groceriess</p>
          <div className="text-sm flex items-center gap-2">
            <p>© {new Date().getFullYear()}</p>
            <p>All rights reserved.</p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2">
          <p className="text-xl font-bold">About Company</p>
          <div className="flex flex-col md:flex-row items-start justify-between w-full gap-6">
            <Link
              className="flex items-center gap-2 font-semibold"
              href={"/about-us"}
            >
              About Us <LinkIcon />
            </Link>
            <div className="">
              {" "}
              <p className=" font-semibold">Contact Us</p>
              <p className="flex items-center gap-2">
                <PhoneIcon /> +91-9876543210
              </p>
            </div>
            <div>
              <p className="flex items-center gap-2 font-semibold">
                <HomeIcon /> Address
              </p>
              <p>Address Line 1</p>
              <p>Address Line 2</p>
              <p>City, State, Country</p>
              <p>Zip Code</p>
            </div>
            <p className="flex items-center gap-2">
              <MailIcon /> instant_order@gmail.com
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center w-full gap-4 mb-10 lg:mb-0 z-30">
          <Link href={"#"}>
            <FacebookIcon />
          </Link>
          <Link href={"#"}>
            <InstagramIcon />
          </Link>
          <Link href={"#"}>
            <TwitterIcon />
          </Link>
          | <p>Made with ❤️, by Ujjwal.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
