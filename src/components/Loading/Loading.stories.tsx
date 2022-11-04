import Loading from "./Loading";

export default {
  title: "Components/Loading",
  component: Loading,
  parameters: {
    docs: {
      inlineStories: false,
      description: {
        component:
          "Light wrapper around the Carbon loading component that includes optional delayed rendering to help prevent a waterfalls of spinners.",
      },
    },
  },
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
