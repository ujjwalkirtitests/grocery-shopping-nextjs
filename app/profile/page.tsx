import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function ProfilePage() {
  const session = await getServerSession();
  if (!session || !session?.user) {
    redirect(process.env.DOMAIN + "/api/auth/signin");
  }
  return (
    <div>ProfilePage</div>
  )
}

export default ProfilePage
