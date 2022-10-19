import axios from "axios";
import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false }, mutations: { throwOnError: true } },
});

export const serviceUrl = {
  getLaunchpadUser: ({ baseServiceUrl }) => `${baseServiceUrl}/launchpad/user`,
  getStatement: ({ baseServiceUrl }) => `${baseServiceUrl}/users/consents`,
  getTeamServices: ({ baseServiceUrl, teamId }) => `${baseServiceUrl}/launchpad/teams/${teamId}/services`,
  getUserTeams: ({ baseServiceUrl }) => `${baseServiceUrl}/users/teams`,
  resourceUserConsent: ({ baseServiceUrl }) => `${baseServiceUrl}/users/consent`,
  resourceUserProfile: ({ baseServiceUrl }) => `${baseServiceUrl}/users/profile`,
}

export const resolver = {
  query: (url, config) => () => axios.get(url, config).then((response) => response.data),
  patchUserProfile: ({ baseServiceUrl, body }) => axios.patch(serviceUrl.resourceUserProfile({ baseServiceUrl }), body),
  putUserConsent: ({ baseServiceUrl, body }) => axios.put(serviceUrl.resourceUserConsent({ baseServiceUrl }), body),
}