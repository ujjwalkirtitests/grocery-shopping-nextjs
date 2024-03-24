import CustomisedButton from "@/components/shared/CustomisedButton";
import { addUser, getCurrentUser } from "@/lib/actions/user";
import { UserRole } from "@/types";
import { HomeIcon, MailIcon, PhoneCallIcon, UserIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function ProfilePage() {
  const session = await getServerSession();
  if (!session || !session?.user) {
    redirect(process.env.DOMAIN + "/api/auth/signin");
  }
  let currentUser = await getCurrentUser(session.user.email as string);

  if (!currentUser) {
    currentUser = await addUser({
      email: session.user.email as string,
      username: session.user.name as string,
      profile_pic: session.user.image as string,
      role: UserRole.CUSTOMER,
    });
  }

  let userDetailStyle =
    "flex items-center gap-3 bg-white w-full p-2 rounded-md hover:shadow-md cursor-pointer text-sm";
  return (
    <div className="px-3 flex flex-col items-start gap-5 my-5">
      {/* profile picture */}
      <Image
        src={currentUser?.profile_pic as string}
        alt={`${currentUser?.username}'s profile picture`}
        height={100}
        width={100}
        className="rounded-full object-contain mx-auto"
      />
      {/* username */}
      <div className={userDetailStyle}>
        <UserIcon />
        <p>{currentUser?.username}</p>
      </div>
      {/* email */}
      <div className={userDetailStyle}>
        <MailIcon />
        <p>{currentUser?.email}</p>
      </div>
      {/* phone number */}
      <div className={userDetailStyle}>
        <PhoneCallIcon />
        <p>
          {currentUser?.phone
            ? currentUser?.phone
            : "No phone number added to profile"}
        </p>
      </div>
      {/* address */}
      <div className={userDetailStyle}>
        <HomeIcon />
        <p>
          {currentUser?.address
            ? currentUser?.address
            : "No address added to profile"}{" "}
        </p>
      </div>
      <div className="flex justify-center w-full">
        <CustomisedButton asChild>
          <Link href={`/profile/edit`}>Edit Profile</Link>
        </CustomisedButton>
      </div>
    </div>
  );
}

export default ProfilePage;
