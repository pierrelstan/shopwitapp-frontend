export const loadState = () => {
  try {
    const serialzedState = localStorage.getItem("state");
    if (serialzedState === null) {
      return undefined;
    }
    return JSON.parse(serialzedState);
  } catch (err) {
    return undefined;
  }
};
export const saveState = (state) => {
  try {
    const serialzedState = JSON.stringify(state);
    localStorage.setItem("state", serialzedState);
  } catch (err) {
    console.log(err);
  }
};
