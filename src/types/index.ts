import React from "react";
export interface DynamicInput extends FormInput, Government {}

export interface FormInput {
  conditionallyRender?: boolean;
  customComponent?: Function | React.ReactElement;
  defaultValues?: any[];
  id?: string;
  invalid?: boolean;
  invalidText?: string;
  invalidValues?: any[];
  governingOptions?: any[];
  governingDisabled?: boolean;
  minValueLength?: string;
  maxValueLength?: string;
  onBlur?: Function;
  onChange?: Function;
  requiredForKey?: string;
  requiredValueOf?: string[];
  required?: boolean;
  placeholder?: string;
  language?: string;
  disabled?: boolean;
  defaultValue?: any;
  defaultOptionLabel?: any;
  value?: any;
  values?: any[];
  readOnly?: boolean;
  dateFormat?: string;
  pattern?: string;
  patternInvalidText?: string;
  government?: Government;
  description?: string;
  key: string;
  label?: string;
  type: string;
  min?: string;
  max?: string;
  options?: { key: string; value: string }[];
  helperText?: string;
  helperTextOff?: string;
  isDefaultLabel?: boolean;
  cannotEditLabel?: boolean;
}

export interface Government {
  governingJson: string;
  governingJsonKey: string;
  jsonKey: string;
  jsonLabel: string;
  governingKey: string;
  governing: boolean;
  governed: boolean;
  isGoverning: boolean;
  isGoverned: boolean;
}

export interface LowerLevelGroup {
  id: string;
  name?: string;
  userProperties: any[];
  visible: boolean;
}

export interface ModalFunctionChildrenProps {
  closeModal: () => void;
}

export interface SimpleIdNameObj {
  id: string;
  name: string;
}

export interface SimpleTeamService {
  name: string;
  url: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  owners: TeamOwner[];
  purpose: string;
  dateCreated: string;
  isActive: boolean;
  newRelicRestApiKey: string;
  newRelicQueryKey: string;
  newRelicAccountId: string;
  autoApproveRequests: boolean;
  privateTeam: boolean;
  ldapName: string;
  labels: FormInput[];
  description: string;
  logo: {
    id: string;
    name: string;
  };
  restrictInvitationByDomain: boolean;
  domains: string[];
  allowInvitationToPartner: boolean;
  userProperties: FormInput[];
  displayName: string;
  sidebarSelectedKey: string;
  pendingRemoval: boolean;
  pendingRemovalDate: string;
  pendingRemovalRequestIds: string[];
  copyTeamOwners: boolean;
  customInviteMessage: string;
  type: string;
  organizationId: string;
  subhead: string;
  accountTeamId: string;
  hero: {
    id: string;
    name: string;
  };
  statements: TeamStatement[];
  allowMembersCreateProjectTeam: boolean;
  canLeaveTeam: boolean;
}

export interface TeamStatement {
  id: number;
  name: string;
  jobTitle: string;
  content: string;
  image: {
    id: string;
    name: string;
  };
}

export interface TeamOwner {
  ownerId: string;
  ownerEmail: string;
  ownerName: string;
}

export interface User {
  email: string;
  emailPreferences: {
    receiveCoOwnerAddMember: boolean;
    receiveJoinTeamApproved: boolean;
    receiveNewMemberInvite: boolean;
    receiveRequestLeaveTeam: boolean;
  };
  favouriteCatalogItems: [
    {
      catalogItemId: string;
      order: number;
    }
  ];
  firstLoginDate: string;
  globalServices?: [any];
  hasConsented: boolean;
  id: string;
  isFirstVisit: boolean | null;
  isShowHelp: boolean | null;
  lastLoginDate: string;
  approvedDate: string;
  launchpadTutorialState: null | -1 | 0 | 1 | 2 | 3;
  isTeamOwner: boolean;
  isAllowToRemove: boolean;
  lowerLevelGroups: LowerLevelGroup[];
  name: string;
  notificationSettings: any;
  personalizations: any;
  projects: null | any;
  requestSummary: {
    requireUserAction: number;
    submittedByUser: number;
  };
  pendingLeaveRequests: any[];
  status: string;
  teams: Team[];
  type: string;
  inviter: {
    id: string;
    name: string;
  };
  approver: {
    id: string;
    name: string;
  };
}

export interface UserTeams {
  accountTeams: {
    id: string;
    name: string;
    isAccountTeamMember: boolean;
    projectTeams: SimpleIdNameObj[];
  }[];
  standardTeams: SimpleIdNameObj[];
}
