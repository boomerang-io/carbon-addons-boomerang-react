import React from "react";
export type DynamicInput = FormInput & InputGovernor;

export interface FormInput {
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
}

export interface InputGovernor {
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

export type ModalTrigger = (props: { openModal: () => void }) => React.ReactNode;

export interface ModalFunctionChildrenProps {
  closeModal: () => void;
}

export interface SimpleIdNameMap {
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
  unassignedCatalogItems: UnassignedCatalogItems;
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

export interface FavouriteCatalogItem {
  catalogItemId: string;
  order: number;
}

export interface EmailPreferences {
  receiveRequestLeaveTeam: boolean;
  receiveJoinTeamApproved: boolean;
  receiveNewMemberInvite: boolean;
  receiveCoOwnerAddMember: boolean;
}

export interface Owner {
  ownerId: string;
  ownerEmail: string;
  ownerName: string;
}

export interface Option {
  key: string;
  value: string;
}

export interface Label {
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
}

export interface Service {
  id: string;
  name?: any;
  order?: number;
}

export interface Group {
  name: string;
  description: string;
  services: Service[];
  order?: number;
  linkedResource?: any;
}

export interface UnassignedCatalogItems {
  name: string;
  description: string;
  services: Service[];
  order?: any;
  linkedResource?: any;
}

export interface RequestSummary {
  requireUserAction: number;
  submittedByUser: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isFirstVisit?: any;
  type: string;
  isShowHelp: boolean;
  firstLoginDate: Date;
  lastLoginDate: Date;
  lowerLevelGroups: LowerLevelGroup[];
  personalizations?: any;
  notificationSettings?: any;
  favouriteCatalogItems: FavouriteCatalogItem[];
  emailPreferences: EmailPreferences;
  status: string;
  globalServices: any[];
  launchpadTutorialState: number;
  projects?: any;
  teams: Team[];
  hasConsented: boolean;
  requestSummary: RequestSummary;
}

export interface UserTeams {
  accountTeams: {
    id: string;
    name: string;
    isAccountTeamMember: boolean;
    projectTeams: SimpleIdNameMap[];
  }[];
  standardTeams: SimpleIdNameMap[];
}
