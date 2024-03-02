import useKeydown from "./useKeydown";

function useEscapeKey(callback: () => void) {
  useKeydown("Escape", callback);
}

export default useEscapeKey;
