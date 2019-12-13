import { createGlobalState } from "react-hooks-global-state";
const {
  GlobalStateProvider,
  setGlobalState,
  useGlobalState
} = createGlobalState({
  user: null
});
export const setUser = u => {
  setGlobalState("user", u);
};
export { GlobalStateProvider, useGlobalState };
