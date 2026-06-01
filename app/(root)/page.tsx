import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/route";

const Page = async () => {
  const session = await auth();
  console.log("🚀 ~ Page ~ session:", session);

  return (
    <>
      <h1 className="h1-bold">Tailwind is fun!!!</h1>

      <form
        className="px-10 pt-25"
        action={async () => {
          "use server";
          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      >
        <Button type="submit">Log out</Button>
      </form>
    </>
  );
};

export default Page;
