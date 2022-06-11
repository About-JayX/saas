export default {
  imgerr: {
    inserted: (el, opt) => {
      el.onerror = function () {
        el.src = opt.value;
      };
    },
  },
  abc:{}
};
