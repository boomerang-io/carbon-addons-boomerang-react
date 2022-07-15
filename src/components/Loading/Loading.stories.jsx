import Loading from "./Loading";

export default {
  title: "Components/Loading",
  component: Loading,
};

export const Default = () => {
  return <Loading />;
};

export const DelayRender2Seconds = () => {
  return <Loading delay={2000} />;
};

export const WithoutOverlay = () => {
  return <Loading withOverlay={false} />;
};
