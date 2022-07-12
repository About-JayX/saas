export default {
  imgerr: {
    inserted: (el, opt) => {
      el.src = el.src || opt.value;
      el.onerror = function () {
        el.src = opt.value;
      };
    },
    componentUpdated(el, opt) {
      el.src = el.src || opt.value;
    },
  },
  abc: {},
};
