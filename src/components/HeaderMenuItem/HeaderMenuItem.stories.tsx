import HeaderMenuItem from "./HeaderMenuItem"; // Using default export

export default {
  title: "Platform/HeaderMenuItem",
  component: HeaderMenuItem,
  parameters: {
    docs: {
      description: {
        component: "Generic platform header menu item that launches a modal.",
      },
    },
  },
};

export const Default = (args: any) => {
  return (
    <HeaderMenuItem text="Header Menu Modal" iconName="workspace" {...args}>
      {() => (
        <div style={{ height: "20rem", width: "20rem" }}>
          <p>Hello there</p>
        </div>
      )}
    </HeaderMenuItem>
  );
};
