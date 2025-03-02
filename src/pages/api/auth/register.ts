import type { APIRoute } from "astro";
import { getAuth } from "firebase-admin/auth";
import { app } from "@/firebase/server";

export const POST: APIRoute = async ({ request, redirect }) => {
  const auth = getAuth(app);

  console.log("Request Headers:", request.headers);
  console.log("Content-Type:", request.headers.get("Content-Type"));

  let email, password, name;

  try {
    const contentType = request.headers.get("Content-Type") || "";

    if (contentType.includes("application/json")) {
      const body = await request.json();
      email = body.email?.toString();
      password = body.password?.toString();
      name = body.name?.toString();
    } else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      email = formData.get("email")?.toString();
      password = formData.get("password")?.toString();
      name = formData.get("name")?.toString();
    } else {
      throw new Error("Unsupported Content-Type");
    }
  } catch (error) {
    console.error("Error parsing request:", error);
    return new Response("Invalid request format", { status: 400 });
  }

  if (!email || !password || !name) {
    return new Response("Missing form data", { status: 400 });
  }

  try {
    console.log("Creating user with:");
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Name:", name);

    const userRecord = await auth.createUser({ email, password, displayName: name });
    console.log("✅ User Created:", userRecord.uid);
  } catch (error: any) {
    console.error("❌ Firebase Auth Error:", error.code, error.message);
    return new Response(`Firebase Auth Error: ${error.message}`, { status: 400 });
  }

  return redirect("/signin");
};