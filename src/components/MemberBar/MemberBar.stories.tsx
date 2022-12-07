import React from "react";
import MemberBar from "./index";

export default {
  title: "Components/MemberBar",
  component: MemberBar,
};

export const Default = () => {
  return (
    <ul style={{ listStyle: "none", width: "30rem" }}>
      <MemberBar name="Panda Black White" email="panda@email.com" isPartner />
      <MemberBar name="Mico Leao Dourado" email="mico@email.com" removeUser={() => {}} />
      <MemberBar name="Coruja Owl" email="owl@email.com" isPartner removeUser={() => {}} />
      <MemberBar name="Gato Neko" email="neko@email.com" isUserNotAllowed addUser={() => console.log("yay")} />
    </ul>
  );
};
