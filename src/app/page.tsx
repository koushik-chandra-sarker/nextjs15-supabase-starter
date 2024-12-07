import { createClient } from "@/lib/supabase/server";

export default async function Countries() {
  const supabase = await createClient();
  const { data: countries } = await supabase.from("countries").select();

  return <div>{JSON.stringify(countries, null, 2)}</div>;
}
