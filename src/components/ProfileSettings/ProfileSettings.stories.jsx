import axios from "axios";
import ProfileSettings from "./ProfileSettings";
import MockAdapter from "axios-mock-adapter";
import { PROFILE_SETTINGS_DATA } from "./constants";

const mock = new MockAdapter(axios);
mock.onGet("https://ibm.com/launchpad/user").reply(200, PROFILE_SETTINGS_DATA);
mock.onPatch("https://ibm.com/users/profile").reply(200);

export default {
  title: "Platform/ProfileSettings",
  component: ProfileSettings,
};

export const Default = () => {
  return (
    <div style={{ width: "16rem", background: "#061727" }}>
      <ProfileSettings
        baseServiceUrl="https://ibm.com"
        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
        userName="Boomerang Ada"
      />
    </div>
  );
};
