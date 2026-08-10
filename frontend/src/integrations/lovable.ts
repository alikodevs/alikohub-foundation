export const lovable = {
  auth: {
    signInWithOAuth: async (_provider: string, _options?: unknown) => {
      return { error: new Error("OAuth integration is not configured.") };
    },
  },
};
