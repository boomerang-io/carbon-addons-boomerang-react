import HeaderMenuLink from "./index"; // Using default export

export default {
  title: "Platform/HeaderMenuLink",
  component: HeaderMenuLink,
  parameters: {
    docs: {
      description: {
        component: "Platform header menu item that functions as a link. Useful for linking externally in the header.",
      },
    },
  },
};

export const Default = (args: any) => {
  return <HeaderMenuLink text="Navigate from Platform" iconName="workspace" href="https://www.ibm.com" {...args} />;
};
