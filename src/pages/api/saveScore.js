import { supabase } from "../../utils/supabaseClient";

export default async function handler(req, res) {
  const { score } = req.body;

  const { error } = await supabase.from("scores").insert([{ score }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ success: true });
}
