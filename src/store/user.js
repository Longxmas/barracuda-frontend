const user = {
    namespaced: true,
    state: {
        id: '',
        username: '',
        nickname: '',
        email: '',
        role: '',
        avatar: '',
        islogin: '',
    },
    getters: {
        id: (state) => state.id,
        username: (state) => state.username,
        nickname: (state) => state.nickname,
        email: (state) => state.email,
        role: (state) => state.role,
        avatar: (state) => state.avatar,
        islogin: (state) => state.islogin,
    },
    mutations: {
        setId(state, data) {
            state.id = data;
        },
        setUsername(state, data) {
            state.username = data;
        },
        setNickname(state, data) {
            state.nickname = data;
        },
        setEmail(state, data) {
            state.email = data;
        },
        setRole(state, data) {
            state.role = data;
        },
        setAvatar(state, data) {
            state.avatar = data;
        },
        setIslogin(state, data) {
            state.islogin = data;
        }
    },
    actions: {}
};

export default user;
