import MemberBar from "./index";

export default {
  title: "Components/MemberBar",
  component: MemberBar,
};

export const Default = () => {
  return (
    <ul style={{ listStyle: "none", width: "30rem" }}>
      <MemberBar name="Panda Black White" email="panda@email.com" isPartner />
      {/* @ts-expect-error TS(2322): Type 'boolean' is not assignable to type '(...args... Remove this comment to see the full error message */}
      <MemberBar name="Mico Leao Dourado" email="mico@email.com" removeUser />
      {/* @ts-expect-error TS(2322): Type 'boolean' is not assignable to type '(...args... Remove this comment to see the full error message */}
      <MemberBar name="Coruja Owl" email="owl@email.com" isPartner removeUser />
      <MemberBar name="Gato Neko" email="neko@email.com" isUserNotAllowed addUser={() => console.log("yay")} />
    </ul>
  );
};
