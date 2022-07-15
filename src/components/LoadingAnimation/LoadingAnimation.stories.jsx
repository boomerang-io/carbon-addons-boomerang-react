import LoadingAnimation from "./LoadingAnimation";

export default {
  title: "Deprecated/LoadingAnimation",
  component: LoadingAnimation,
};

export const Default = () => {
  return <LoadingAnimation />;
};

export const CustomMessage = () => {
  return <LoadingAnimation message="I don't like the aussie loading messages" />;
};

export const RenderAfter2Seconds = () => {
  return <LoadingAnimation wait={2000} />;
};

export const Centered = () => {
  return <LoadingAnimation centered />;
};
