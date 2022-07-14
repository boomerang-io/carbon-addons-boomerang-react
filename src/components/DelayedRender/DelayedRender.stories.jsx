import Component from "./DelayedRender";

export default {
  title: "Components/DelayedRender",
  component: Component,
};

const Template = (args) => <Component {...args} />;

export const DelayedRender = Template.bind({});
DelayedRender.args = {
  delay: 1000,
  children: "Hello, friend"
};

