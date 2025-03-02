// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // Begin from Tina Visual Editing PoC
  runtimeConfig: {
    TINA_TOKEN: process.env.TINA_TOKEN,
    public: {
      PUBLIC_TINA_CLIENT_ID: process.env.PUBLIC_TINA_CLIENT_ID,
    },
  },

  routeRules: {
    "/admin": {
      // Temporary redirect using a 307 status code
      redirect: "/admin/index.html",
    },
  },
  
  hooks: {
    async "prerender:routes"(ctx) {
      // Fetch all post slugs at build time
      const { client } = await import("./tina/__generated__/client");
      const postsResponse = await client.queries.postConnection();

      // Extract slugs
      const postSlugs = postsResponse?.data?.postConnection?.edges
        ?.map((post) => post?.node?._sys.filename)
        .filter(Boolean); // Ensure no undefined values

      // Register dynamic routes for pre-rendering
      if (postSlugs) {
        for (const slug of postSlugs) {
          ctx.routes.add(`/posts/${slug}`);
        }
      }
    },
  },
  // End from Tina Visual Editing PoC
})
