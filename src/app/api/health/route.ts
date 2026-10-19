export const dynamic = "force-dynamic";

export async function GET() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    return Response.json({ ok: false, reason: "SUPABASE_URL not configured" }, { status: 500 });
  }
  try {
    // A lightweight health check: try reaching the Supabase project root URL
    const res = await fetch(supabaseUrl, { method: "HEAD" });
    return Response.json({ ok: res.ok });
  } catch (err) {
    return Response.json({ ok: false, reason: "unreachable" }, { status: 500 });
  }
}
