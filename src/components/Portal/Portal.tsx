import { createPortal } from "react-dom";
import usePortal from "../../hooks/usePortal";

/**
 * @example
 * <Portal>
 *   <p>Thinking with portals</p>
 * </Portal>
 */
const Portal = ({ id, children }: any) => {
  const target: any = usePortal(id);
  return createPortal(children, target);
};

export default Portal;
