const app = {
  namespaced: true,
  state: {
    // 多语言
    language: localStorage.getItem('language') || 'en',
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language;
      localStorage.setItem('language', language);
    },
  },
  actions: {
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language);
    },
  },
};

export default app;
