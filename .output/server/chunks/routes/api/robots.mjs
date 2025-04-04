import { u as useRuntimeConfig, s as setCookie, g as getHeader, d as defineEventHandler, c as createError, r as readBody } from '../../nitro/nitro.mjs';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';

async function fetchWithRetry(req, init) {
  const retries = 3;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fetch(req, init);
    } catch (error) {
      if (init?.signal?.aborted) {
        throw error;
      }
      if (attempt === retries) {
        console.error(`Error fetching request ${req}`, error, init);
        throw error;
      }
      console.warn(`Retrying fetch attempt ${attempt + 1} for request: ${req}`);
    }
  }
  throw new Error("Unreachable code");
}

const serverSupabaseClient = async (event) => {
  if (!event.context._supabaseClient) {
    const {
      supabase: {
        url,
        key,
        cookieOptions,
        clientOptions: { auth = {}, global = {} }
      }
    } = useRuntimeConfig().public;
    event.context._supabaseClient = createServerClient(url, key, {
      auth,
      cookies: {
        getAll: () => parseCookieHeader(getHeader(event, "Cookie") ?? ""),
        setAll: (cookies) => cookies.forEach(({ name, value, options }) => setCookie(event, name, value, options))
      },
      cookieOptions,
      global: {
        fetch: fetchWithRetry,
        ...global
      }
    });
  }
  return event.context._supabaseClient;
};

const robots = defineEventHandler(async (event) => {
  if (event.node.req.method !== "POST") {
    throw createError({
      statusCode: 405,
      message: "Method not allowed"
    });
  }
  try {
    const client = await serverSupabaseClient(event);
    const { data: { user } } = await client.auth.getUser();
    if (!user || user.id !== "d38b6b3e-189c-47ce-b6a6-48187d160ebd") {
      throw createError({
        statusCode: 403,
        message: "Unauthorized"
      });
    }
    const body = await readBody(event);
    const { content } = body;
    if (!content) {
      throw createError({
        statusCode: 400,
        message: "Content is required"
      });
    }
    const lines = content.split("\n");
    const hasUserAgent = lines.some((line) => line.trim().startsWith("User-agent:"));
    const hasDisallow = lines.some((line) => line.trim().startsWith("Disallow:"));
    if (!hasUserAgent || !hasDisallow) {
      throw createError({
        statusCode: 400,
        message: "Invalid robots.txt content. Must contain User-agent and Disallow directives."
      });
    }
    await writeFile(join(process.cwd(), "public", "robots.txt"), content);
    return { success: true };
  } catch (error) {
    console.error("Error updating robots.txt:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Failed to update robots.txt"
    });
  }
});

export { robots as default };
//# sourceMappingURL=robots.mjs.map
