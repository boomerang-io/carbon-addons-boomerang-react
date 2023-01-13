export const headerModalProps = {
  closeModal: () => void 0,
  isOpen: true,
};

export function isType(
  elem: any,
  type: "undefined" | "object" | "boolean" | "number" | "bigint" | "string" | "symbol" | "function"
) {
  return typeof elem === type;
}

export const USE_BOOMERANG_URL = "https://useboomerang.io";
