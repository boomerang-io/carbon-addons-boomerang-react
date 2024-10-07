import axios from "axios";
import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export const serviceUrl = {
  getLaunchpadUser: ({ baseServicesUrl }: any) => `${baseServicesUrl}/launchpad/user`,
  getStatement: ({ baseServicesUrl }: any) => `${baseServicesUrl}/users/consents`,
  getTeamServices: ({ baseServicesUrl, teamId }: any) => `${baseServicesUrl}/launchpad/teams/${teamId}/services`,
  getUserTeamsServices: ({ baseServicesUrl }: any) => `${baseServicesUrl}/users/teams/services`,
  resourceUserConsent: ({ baseServicesUrl }: any) => `${baseServicesUrl}/users/consent`,
  resourceUserProfile: ({ baseServicesUrl }: any) => `${baseServicesUrl}/users/profile`,
};

export const resolver = {
  query: (url: any, config?: any) => () => axios.get(url, config).then((response) => response.data),
  patchUserProfile: ({ baseServicesUrl, body }: any) =>
    axios.patch(serviceUrl.resourceUserProfile({ baseServicesUrl }), body),
  putUserConsent: ({ baseServicesUrl, body }: any) =>
    axios.put(serviceUrl.resourceUserConsent({ baseServicesUrl }), body),
};
