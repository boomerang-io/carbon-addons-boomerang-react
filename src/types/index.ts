import React from "react";
export type DynamicInput = FormInput & InputGovernor;

export type FormInput = {
  acceptsUserInput?: boolean;
  conditionallyRender?: boolean;
  customComponent?: React.FC<any>;
  defaultValues?: any[];
  id?: string;
  invalid?: boolean;
  invalidText?: string;
  invalidValues?: any[];
  governingOptions?: any[];
  governingDisabled?: boolean;
  minValueLength?: string;
  maxValueLength?: string;
  name?: string;
  onBlur?: (...args: any[]) => any;
  onChange?: (...args: any[]) => any;
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
  government?: InputGovernor;
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
};

export type InputGovernor = {
  governingJson: string;
  governingJsonKey: string;
  jsonKey: string;
  jsonLabel: string;
  governingKey: string;
  governing: boolean;
  governed: boolean;
  isGoverning: boolean;
  isGoverned: boolean;
};

export type LowerLevelGroup = {
  id: string;
  name?: string;
  displayName?: string;
  userProperties: any[];
  visible: boolean;
};

export type ModalTrigger = (props: { openModal: () => void }) => React.ReactNode;

export type ModalFunctionChildrenProps = {
  closeModal: () => void;
};

export type SimpleIdNameMap = {
  id: string;
  name: string;
  isTeamMember?: boolean;
  privateTeam?: boolean;
  displayName?: string;
};

export type SimpleTeamService = {
  name: string;
  url: string;
};

export interface SideNavTeam extends SimpleIdNameMap {
  services:Array<SimpleTeamService>;
  isPersonal?: boolean;
}
export interface SideNavAccount extends SimpleIdNameMap {
  projectTeams:Array<SimpleIdNameMap>
}
export type Team = {
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
  unassignedCatalogItems: UnassignedCatalogItems;
};

export type TeamStatement = {
  id: number;
  name: string;
  jobTitle: string;
  content: string;
  image: {
    id: string;
    name: string;
  };
};

export type TeamOwner = {
  ownerId: string;
  ownerEmail: string;
  ownerName: string;
};

export type FavouriteCatalogItem = {
  catalogItemId: string;
  order: number;
};

export type EmailPreferences = {
  receiveRequestLeaveTeam: boolean;
  receiveJoinTeamApproved: boolean;
  receiveNewMemberInvite: boolean;
  receiveCoOwnerAddMember: boolean;
};

export type Owner = {
  ownerId: string;
  ownerEmail: string;
  ownerName: string;
};

export type Option = {
  key: string;
  value: string;
};

export type Label = {
  required: boolean;
  placeholder: string;
  language?: any;
  disabled?: any;
  defaultValue?: any;
  defaultOptionLabel?: any;
  value: string;
  values?: any;
  readOnly: boolean;
  dateFormat?: any;
  pattern?: any;
  patternInvalidText?: any;
  government?: InputGovernor;
  description: string;
  key: string;
  label: string;
  type: string;
  min: string;
  max: string;
  options: Option[];
  helperText: string;
  isDefaultLabel: boolean;
};

export type Service = {
  id: string;
  name?: any;
  order?: number;
};

export type Group = {
  name: string;
  description: string;
  services: Service[];
  order?: number;
  linkedResource?: any;
};

export type UnassignedCatalogItems = {
  name: string;
  description: string;
  services: Service[];
  order?: any;
  linkedResource?: any;
};

export type RequestSummary = {
  requireUserAction: number;
  submittedByUser: number;
};

export type User = {
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
  approvedDate?: string;
  launchpadTutorialState: null | -1 | 0 | 1 | 2 | 3;
  isTeamOwner?: boolean;
  isAllowToRemove?: boolean;
  lowerLevelGroups: [
    {
      id: string;
      userProperties: [any];
      visible: boolean;
    }
  ];
  name: string;
  displayName?: string;
  notificationSettings: any;
  personalizations: any;
  projects: null | any;
  requestSummary: {
    requireUserAction: number;
    submittedByUser: number;
  };
  pendingLeaveRequests?: any[];
  pendingRemoveToolRequests?: any[];
  status: "active" | "inactive" | "pending_deletion" | "deleted" | "archived" | "pending_invite";
  teams: any[];
  type: string;
  inviter?: {
    id: string;
    name: string;
  };
  approver?: {
    id: string;
    name: string;
  };
  hasPersonalTeam?: boolean;
  hasOpenPersonalTeamRequest?: boolean;
  personalTeamAssistantsAccess?: boolean;
  personalTeamAssistantsAccessRequested?: boolean;
};

export type UserTeams = {
  accountTeams: {
    id: string;
    name: string;
    isAccountTeamMember: boolean;
    projectTeams: SimpleIdNameMap[];
  }[];
  standardTeams: SimpleIdNameMap[];
};

export type PlatformNotification = {
  creator: string;
  date: string;
  detail: string;
  eventId: string;
  id: string;
  priority: string;
  read: boolean;
  severity: string;
  target: string;
  title: string;
  type: string;
  userId: string;
};

export type NavLink = {
  name: string;
  url: string;
};
