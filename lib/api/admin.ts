import { supabase } from "../supabaseClient";

/**
 * Fetches the calculated stats from our SQL View.
 */
export async function getAdminStats() {
  // Adding 'as any' here bypasses the strict check on the View's return type
  const { data, error } = await (supabase
    .from('admin_dashboard_stats')
    .select('*')
    .single() as any);

  if (error) {
    console.error("Error fetching admin stats:", error);
    return null;
  }
  return data;
}



export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, first_name, last_name, email, role, status, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Supabase Error:", error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error("System Error:", err);
    return [];
  }
};


export const deleteUser = async (userId: string) => {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId);

  if (error) {
    console.error("Delete failed:", error.message);
    return false;
  }
  return true;
};