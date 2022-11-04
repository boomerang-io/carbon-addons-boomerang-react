import Component from "./Feedback";

export default {
  title: "Platform/Feedback",
  component: Component,
  parameters: {
    docs: {
      description: {
        component: "Header menu item that displays modal with details on providing feedback to the platform",
      },
    },
  },
};

const Template = (args: any) => <Component {...args} />;

export const Feedback = Template.bind({});
(Feedback as any).args = {
  platformName: "Boomerang",
  sendIdeasUrl: "https://ideas.ibm.com",
  platformOrganization: "IBM",
};
