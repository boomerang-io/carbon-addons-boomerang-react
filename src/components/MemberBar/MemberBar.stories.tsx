/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import MemberBar from "./index";

export default {
  title: "Components/MemberBar",
  component: MemberBar,
};

export const Default = () => {
  return (
    <ul style={{ listStyle: "none", width: "30rem" }}>
      <MemberBar id="panda@email.com" name="Panda Black White" email="panda@email.com" isPartner />
      <MemberBar id="mico@email.com" name="Mico Leao Dourado" email="mico@email.com" removeUser={() => {}} />
      <MemberBar id="owl@email.com" name="Coruja Owl" email="owl@email.com" isPartner removeUser={() => {}} />
      <MemberBar
        id="neko@email.com"
        name="Gato Neko"
        email="neko@email.com"
        isUserNotAllowed
        addUser={() => console.log("yay")}
      />
    </ul>
  );
};
