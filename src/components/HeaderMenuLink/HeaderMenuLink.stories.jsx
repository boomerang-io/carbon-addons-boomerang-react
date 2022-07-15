import HeaderMenuLink from "./index"; // Using default export

export default {
  title: "Platform/HeaderMenuLink",
  component: HeaderMenuLink,
};

export const Default = () => {
  return <HeaderMenuLink text="Navigate from Platform" iconName="workspace" href="https://www.ibm.com" />;
};
