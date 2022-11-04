import NoDisplayComponent from "./index";

export default {
  title: "Deprecated/NoDisplay",
  component: NoDisplayComponent,
};

export const Default = () => {
  return (
    <div style={{ background: "#fff" }}>
      <NoDisplayComponent />
    </div>
  );
};

export const Message = () => {
  return <NoDisplayComponent text="Looks like you need to add some repos." />;
};
