"use server";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { log } from "console";
import { signOut } from "../auth/actions";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  const { data: countries } = await supabase.from("countries").select();
  return (
    <>
      <p>Hello {data.user.email}</p>
      <div>{JSON.stringify(countries, null, 2)}</div>
      <form>
        <button formAction={signOut}>logout</button>
      </form>
    </>
  );
}
