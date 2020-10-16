export const isAccessibleEvent = (evt) => {
  return evt.which === 13 || evt.which === 32 || evt.type === 'click';
};
