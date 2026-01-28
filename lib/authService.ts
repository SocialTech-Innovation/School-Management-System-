import { supabase } from "./supabaseClient";


export const handleLogin = async (email: string, password: string) => {
const { data, error: authError } = await supabase.auth.signInWithPassword({ 
  email, 
  password 
});

if (authError || !data?.user) {
  if (authError?.message.includes("Invalid login credentials")) {
    return { error: "Yo, that email or password isn't right. Try again!" };
  }
  return { error: authError?.message || "Login failed" };
}

const { data: profiles, error: profileError } = await supabase
  .from("users")
  .select("role, first_name")
  .eq("id", data.user.id)
  .limit(1);

if (profileError || !profiles || profiles.length === 0) {
  return { error: "Account setup incomplete. Please contact the Admin." };
}

const profile = profiles[0];
return { user: profile, role: profile.role };
};
