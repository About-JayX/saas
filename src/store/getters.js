const getters = {
  sidebar: (state) => state.app.sidebar,
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  username: (state) => state.user.userInfo.username,
  staffPhoto: (state) => state.user.userInfo.staffPhoto, //用户头像
};
export default getters;
