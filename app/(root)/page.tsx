import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/route";

const Page = async () => {
  const session = await auth();

  return (
    <>
      <h1 className="h1-bold">Tailwind is fun!!!</h1>
    </>
  );
};

export default Page;
