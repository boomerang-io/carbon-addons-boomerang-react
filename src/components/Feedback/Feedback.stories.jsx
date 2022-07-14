import Component from "./Feedback";

export default {
  title: "Platform/Feedback",
  component: Component,
};

const Template = (args) => <Component {...args} />;

export const Feedback = Template.bind({});
Feedback.args = {
  platformName: "Boomerang",
  sendIdeasUrl: "https://ideas.ibm.com",
  platformOrganization: "IBM",
};