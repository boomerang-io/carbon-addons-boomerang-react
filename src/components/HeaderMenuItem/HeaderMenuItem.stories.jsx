import HeaderMenuItem from "./HeaderMenuItem"; // Using default export

export default {
  title: "Platform/HeaderMenuItem",
  component: HeaderMenuItem,
};

export const Default = () => {
  return (
    <HeaderMenuItem text="Header Menu Modal" iconName="workspace">
      {() => (
        <div style={{ height: "20rem", width: "20rem" }}>
          <p>Hello there</p>
        </div>
      )}
    </HeaderMenuItem>
  );
};
