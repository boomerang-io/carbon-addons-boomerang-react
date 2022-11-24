import { useCallback, useState } from "react";

const useSetState = (initialState = {}) => {
  const [state, set] = useState<any>(initialState);
  const setState = useCallback(
    (patch) => {
      set((prevState: any) => Object.assign({}, prevState, patch instanceof Function ? patch(prevState) : patch));
    },
    [set]
  );
  return [state, setState];
};
export default useSetState;
