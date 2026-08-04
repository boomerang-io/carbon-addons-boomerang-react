/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2026
*/


export const isAccessibleEvent = (evt: any) => {
  return evt.which === 13 || evt.which === 32 || evt.type === "click";
};
