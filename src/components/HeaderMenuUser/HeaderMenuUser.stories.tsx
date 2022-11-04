import HeaderMenuUser from "./HeaderMenuUser";

const styleProp = {
  minHeight: "57px",
  backgroundColor: "#50565b",
  width: "200px",
};

export default {
  title: "Platform/HeaderMenuUser",
  component: HeaderMenuUser,
  parameters: {
    docs: {
      description: {
        component: "Platform header menu item that displays user and launches a modal.",
      },
    },
  },
};

export const Default = () => {
  return (
    <div style={styleProp}>
      {/* @ts-expect-error TS(2322): Type '{ children: () => Element; src: string; user... Remove this comment to see the full error message */}
      <HeaderMenuUser
        src={"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"}
        userName={"Gravatar User"}
      >
        {() => (
          <div style={{ height: "20rem", width: "20rem" }}>
            <p>User!</p>
          </div>
        )}
      </HeaderMenuUser>
    </div>
  );
};
