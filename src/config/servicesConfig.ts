import axios from "axios";
import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  // @ts-expect-error TS(2322): Type '{ throwOnError: true; }' is not assignable t... Remove this comment to see the full error message
  defaultOptions: { queries: { refetchOnWindowFocus: false }, mutations: { throwOnError: true } },
});

export const serviceUrl = {
  getLaunchpadUser: ({ baseServiceUrl }: any) => `${baseServiceUrl}/launchpad/user`,
  getStatement: ({ baseServiceUrl }: any) => `${baseServiceUrl}/users/consents`,
  getTeamServices: ({ baseServiceUrl, teamId }: any) => `${baseServiceUrl}/launchpad/teams/${teamId}/services`,
  getUserTeams: ({ baseServiceUrl }: any) => `${baseServiceUrl}/users/teams`,
  resourceUserConsent: ({ baseServiceUrl }: any) => `${baseServiceUrl}/users/consent`,
  resourceUserProfile: ({ baseServiceUrl }: any) => `${baseServiceUrl}/users/profile`,
};

export const resolver = {
  query: (url: any, config: any) => () => axios.get(url, config).then((response) => response.data),
  patchUserProfile: ({ baseServiceUrl, body }: any) =>
    axios.patch(serviceUrl.resourceUserProfile({ baseServiceUrl }), body),
  putUserConsent: ({ baseServiceUrl, body }: any) =>
    axios.put(serviceUrl.resourceUserConsent({ baseServiceUrl }), body),
};
