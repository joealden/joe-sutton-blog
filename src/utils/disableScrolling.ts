let isOn = false;
let scrollPosition = 0;

const on = () => {
  if (typeof document === "undefined" || isOn) return;

  scrollPosition = window.pageYOffset;

  document.documentElement.style.width = "100%";
  document.documentElement.style.position = "sticky";
  document.documentElement.style.top = -scrollPosition + "px";
  document.documentElement.style.overflow = "hidden";

  isOn = true;
};

const off = () => {
  if (typeof document === "undefined" || !isOn) return;

  document.documentElement.style.width = "";
  document.documentElement.style.position = "";
  document.documentElement.style.top = "";
  document.documentElement.style.overflow = "";

  window.scroll(0, scrollPosition);
  isOn = false;
};

const toggle = () => (isOn ? off() : on());

export default { off, on, toggle };
