export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/p.js") {
      const res = await fetch("https://ap.byseansingh.com/js/pa-a9UwcZuxVjEy0J3Gvn1Ah.js");
      const headers = new Headers(res.headers);
      headers.set("Cache-Control", "public, max-age=86400");
      return new Response(res.body, { status: res.status, headers });
    }

    if (url.pathname === "/u.js") {
      const res = await fetch("https://au.byseansingh.com/script.js");
      const headers = new Headers(res.headers);
      headers.set("Cache-Control", "public, max-age=86400");
      return new Response(res.body, { status: res.status, headers });
    }

    if (url.pathname === "/cdn/u") {
      const headers = new Headers(request.headers);
      headers.set("X-Forwarded-For", request.headers.get("CF-Connecting-IP") || "");
      headers.delete("host");

      return fetch("https://au.byseansingh.com/api/send", {
        method: request.method,
        headers,
        body: request.body,
      });
    }

    return env.ASSETS.fetch(request);
  },
};
