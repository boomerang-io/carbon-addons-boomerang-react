import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import MockAdapter from "axios-mock-adapter";
import PrivacyStatement from "./PrivacyStatement";
import { PRIVACY_DATA } from "./constants";

const mock = new MockAdapter(axios);

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false }, mutations: { throwOnError: true } },
});

const props = () => ({
  baseServiceUrl: "http://ibm.com",
});

export default {
  title: "Platform/PrivacyStatement",
  component: PrivacyStatement,
};

export const Default = () => {
  mock.onGet("http://ibm.com/users/consents").reply(200, PRIVACY_DATA);
  return (
    <QueryClientProvider client={queryClient}>
      <PrivacyStatement {...props()} />
    </QueryClientProvider>
  );
};

Default.story = {
  name: "default",

  parameters: {
    info: {
      text: `
Privacy statement component is for displaying the user agreement form and allowing the user to delete their account from the Boomerang platform. 
          `,
    },
  },
};
