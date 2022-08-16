import HeaderMenuUser from "./HeaderMenuUser";

const styleProp = {
  minHeight: "57px",
  backgroundColor: "#50565b",
  width: "200px",
};

export default {
  title: "Platform/HeaderMenuUser",
  component: HeaderMenuUser,
};

export const Default = () => {
  return (
    <div style={styleProp}>
      <HeaderMenuUser
        src={"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"}
        userName={"Gravatar User"}
      >
        {() => null}
      </HeaderMenuUser>
    </div>
  );
};
