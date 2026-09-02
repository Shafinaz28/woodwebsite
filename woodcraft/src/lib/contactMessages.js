import { isSupabaseConfigured, supabase } from "./supabase";

const LOCAL_KEY = "arileon_contacts";

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeLocal(list) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
}

function fingerprint(row) {
  return `${row.email || ""}|${row.name || ""}|${row.message || ""}`
    .toLowerCase()
    .trim();
}

function dedupeMessages(list = []) {
  const seen = new Set();
  const out = [];
  for (const item of list) {
    const key = fingerprint(item);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

export async function submitContactMessage({
  name,
  email,
  phone,
  subject,
  message,
}) {
  const row = {
    name: String(name || "").trim(),
    email: String(email || "").trim(),
    phone: String(phone || "").trim(),
    subject: String(subject || "").trim(),
    message: String(message || "").trim(),
  };

  if (!row.name || !row.email || !row.message) {
    throw new Error("Please fill in your name, email, and message.");
  }

  const saved = {
    id: `local-${Date.now()}`,
    created_at: new Date().toISOString(),
    ...row,
  };
  writeLocal(dedupeMessages([saved, ...readLocal()]));

  if (!isSupabaseConfigured) return;

  const { error } = await supabase.from("contact_messages").insert(row);
  if (error) {
    console.warn("Contact save (Supabase):", error.message);
  }
}

export async function fetchContactMessages() {
  const local = readLocal();

  if (!isSupabaseConfigured) return local;

  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("Contact messages:", error.message);
    return local;
  }

  return dedupeMessages([...(data || []), ...local]);
}

export async function deleteContactMessage(id) {
  if (String(id).startsWith("local-")) {
    writeLocal(readLocal().filter((item) => String(item.id) !== String(id)));
    return;
  }

  writeLocal(readLocal().filter((item) => String(item.id) !== String(id)));

  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);
    if (error) throw error;
  }
}
