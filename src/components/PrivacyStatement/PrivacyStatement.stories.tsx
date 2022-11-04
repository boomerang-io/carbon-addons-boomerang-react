import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import MockAdapter from "axios-mock-adapter";
import PrivacyStatement from "./PrivacyStatement";
import { PRIVACY_DATA } from "./constants";
import { serviceUrl } from "../../config/servicesConfig";

const queryClient = new QueryClient({
  // @ts-expect-error TS(2322): Type '{ throwOnError: true; }' is not assignable t... Remove this comment to see the full error message
  defaultOptions: { queries: { refetchOnWindowFocus: false }, mutations: { throwOnError: true } },
});
const baseServiceUrl = "https://boomerang.com";

export default {
  title: "Platform/PrivacyStatement",
  component: PrivacyStatement,
};

export const Default = () => {
  const mock = new MockAdapter(axios);
  mock.onGet(serviceUrl.getStatement({ baseServiceUrl})).reply(200, PRIVACY_DATA);
  mock.onPut(serviceUrl.resourceUserConsent({ baseServiceUrl})).reply(200);
  return (
    <QueryClientProvider client={queryClient}>
      <PrivacyStatement baseServiceUrl={baseServiceUrl} />
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
