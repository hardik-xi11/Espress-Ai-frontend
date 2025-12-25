export default {
  async fetchXZ(request, env) {
    // Serve static assets from the ASSETS binding
    return env.ASSETS.fetch(request);
  },
  async fetch(request, env, ctx) {
      if(env.ASSETS){
          return await env.ASSETS.fetch(request);
      }
    return new Response('Not Found', { status: 404 });
  }
};
