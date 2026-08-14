window.LGBS_SUPABASE = {
  url: "https://olfumplrjgrrctjyxpef.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sZnVtcGxyamdycmN0anl4cGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3MDg0NzUsImV4cCI6MjEwMjI4NDQ3NX0.XCtKEc6r6QmJwb9S1X_g2c005An_Eg9QOtxoeRwtcaY"
};
window.lgbsSupabaseReady = function () {
  return true;
};
window.lgbsCreateClient = function () {
  if (typeof supabase === "undefined") return null;
  return supabase.createClient(window.LGBS_SUPABASE.url, window.LGBS_SUPABASE.anonKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storage: window.localStorage }
  });
};
