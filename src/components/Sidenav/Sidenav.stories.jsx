import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import SidenavComponent from "./index";

export default {
  title: "Deprecated/Sidenav",
  component: SidenavComponent,
};

export const Default = () => {
  return (
    <BrowserRouter>
      <SidenavComponent navItems={navItems} />
    </BrowserRouter>
  );
};

export const WithTitle = () => {
  return (
    <BrowserRouter>
      <SidenavComponent header={header} navItems={navItems} />
    </BrowserRouter>
  );
};

WithTitle.story = {
  name: "with title",
};

export const WithTitleFooter = () => {
  return (
    <BrowserRouter>
      <SidenavComponent
        header={header}
        navItems={navItems}
        footer={() => <SidenavOutstandingTeams outstandingTeamRequests={outstandingTeamRequests} />}
      />
    </BrowserRouter>
  );
};

WithTitleFooter.story = {
  name: "with title & footer",
};

export const OnlyTitleFooter = () => {
  return (
    <BrowserRouter>
      <SidenavComponent
        header={header}
        footer={() => <SidenavOutstandingTeams outstandingTeamRequests={outstandingTeamRequests} />}
      />
    </BrowserRouter>
  );
};

OnlyTitleFooter.story = {
  name: "only title & footer",
};

export const WithContent = () => {
  return (
    <BrowserRouter>
      <SidenavComponent
        header={header}
        navItems={navItems}
        content={() => <div style={{ color: "white" }}>test content</div>}
      />
    </BrowserRouter>
  );
};

WithContent.story = {
  name: "with content",
};

// Helpers

const header = () => <div style={{ fontSize: "5rem", color: "#047cc0" }}>title</div>;

const SidenavOutstandingTeams = ({ outstandingTeamRequests }) => {
  const numberOfOutstandingTeamRequests = outstandingTeamRequests.length;

  if (numberOfOutstandingTeamRequests === 0) {
    return null;
  }

  return (
    <Fragment>
      <div
        style={{
          height: "5rem",
          color: "black",
          textAlign: "center",
          marginTop: "1rem",
        }}
        data-tip
        data-for="outstandingTeamRequests"
      >{`${numberOfOutstandingTeamRequests} ${
        numberOfOutstandingTeamRequests === 1 ? "REQUEST" : "REQUESTS"
      } PENDING`}</div>
    </Fragment>
  );
};

const outstandingTeamRequests = [
  {
    id: "59e5720c0aa79f128e639448",
    groupName: "Pending Test Team",
  },
];

const navItems = [
  {
    dateCreated: "2017-08-28T18:10:11Z",
    id: "59a45c83b0756d1fa0c26ffb",
    isActive: true,
    text: "Demo team 1",
    ownerEmail: "tester@us.ibm.com",
    ownerId: "59a45e60b0756d1fa0c27825",
    ownerName: "Test user",
    purpose: "Testing",
    path: "/admin/home",
    exact: true,
  },
  {
    dateCreated: "2017-08-28T18:10:11Z",
    id: "59a45c83b0756d1fa0c26ffb",
    isActive: false,
    text: "Demo team 21",
    ownerEmail: "tester@us.ibm.com",
    ownerId: "59a45e60b0756d1fa0c27825",
    ownerName: "Test user",
    purpose: "Testing",
    path: "/admin/home1",
    exact: false,
  },
  {
    dateCreated: "2017-08-28T18:10:11Z",
    id: "59a45c83b0756d1fa0c26ffb",
    isActive: false,
    text: "Demo team 223",
    ownerEmail: "tester@us.ibm.com",
    ownerId: "59a45e60b0756d1fa0c27825",
    ownerName: "Test user",
    purpose: "Testing",
    path: "/admin/home2",
    exact: false,
  },
  {
    dateCreated: "2017-08-28T18:10:11Z",
    id: "59a45c83b0756d1fa0c26ffb",
    isActive: false,
    text: "Demo team 243",
    ownerEmail: "tester@us.ibm.com",
    ownerId: "59a45e60b0756d1fa0c27825",
    ownerName: "Test user",
    purpose: "Testing",
    path: "/admin/home3",
    exact: false,
  },
  {
    dateCreated: "2017-08-28T18:10:11Z",
    id: "59a45c83b0756d1fa0c26ffb",
    isActive: false,
    text: "Demo team 254657",
    ownerEmail: "tester@us.ibm.com",
    ownerId: "59a45e60b0756d1fa0c27825",
    ownerName: "Test user",
    purpose: "Testing",
    path: "/admin/home4",
    exact: false,
  },
  {
    dateCreated: "2017-08-28T18:10:11Z",
    id: "59a45c83b0756d1fa0c26ffb",
    isActive: false,
    text: "Demo team 2345345",
    ownerEmail: "tester@us.ibm.com",
    ownerId: "59a45e60b0756d1fa0c27825",
    ownerName: "Test user",
    purpose: "Testing",
    path: "/admin/home5",
    exact: false,
  },
  {
    dateCreated: "2017-08-28T18:10:11Z",
    id: "59a45c83b0756d1fa0c26ffb",
    isActive: false,
    text: "Demo team 2334533",
    ownerEmail: "tester@us.ibm.com",
    ownerId: "59a45e60b0756d1fa0c27825",
    ownerName: "Test user",
    purpose: "Testing",
    path: "/admin/home6",
    exact: false,
  },
  {
    dateCreated: "2017-08-28T18:10:11Z",
    id: "59a45c83b0756d1fa0c26ffb",
    isActive: false,
    text: "Demo team 24345345345345",
    ownerEmail: "tester@us.ibm.com",
    ownerId: "59a45e60b0756d1fa0c27825",
    ownerName: "Test user",
    purpose: "Testing",
    path: "/admin/home7",
    exact: false,
  },
  {
    dateCreated: "2017-08-28T18:10:11Z",
    id: "59a45c83b0756d1fa0c26ffb",
    isActive: false,
    text: "Demo team 2334535345345345",
    ownerEmail: "tester@us.ibm.com",
    ownerId: "59a45e60b0756d1fa0c27825",
    ownerName: "Test user",
    purpose: "Testing",
    path: "/admin/home8",
    exact: false,
  },
  {
    dateCreated: "2017-08-28T18:10:11Z",
    id: "59a45c83b0756d1fa0c26ffb",
    isActive: false,
    text: "Demo team 256657657653424786783323",
    ownerEmail: "tester@us.ibm.com",
    ownerId: "59a45e60b0756d1fa0c27825",
    ownerName: "Test user",
    purpose: "Testing",
    path: "/admin/home9",
    exact: false,
  },
  {
    dateCreated: "2017-08-28T18:10:11Z",
    id: "59a45c83b0756d1fa0c26ffb",
    isActive: false,
    text: "Demo team 2",
    ownerEmail: "tester@us.ibm.com",
    ownerId: "59a45e60b0756d1fa0c27825",
    ownerName: "Test user",
    purpose: "Testing",
    path: "/admin/home10",
    exact: false,
  },
  {
    dateCreated: "2017-08-28T18:10:11Z",
    id: "59a45c83b0756d1fa0c26ffb",
    isActive: false,
    text: "Demo team 2",
    ownerEmail: "tester@us.ibm.com",
    ownerId: "59a45e60b0756d1fa0c27825",
    ownerName: "Test user",
    purpose: "Testing",
    path: "/admin/home11",
    exact: false,
  },
  {
    dateCreated: "2017-08-28T18:10:11Z",
    id: "59a45c83b0756d1fa0c26ffb",
    isActive: false,
    text: "Demo team 2",
    ownerEmail: "tester@us.ibm.com",
    ownerId: "59a45e60b0756d1fa0c27825",
    ownerName: "Test user",
    purpose: "Testing",
    path: "/admin/home12",
    exact: false,
  },
  {
    dateCreated: "2017-08-28T18:10:11Z",
    id: "59a45c83b0756d1fa0c26ffb",
    isActive: false,
    text: "Demo team 2",
    ownerEmail: "tester@us.ibm.com",
    ownerId: "59a45e60b0756d1fa0c27825",
    ownerName: "Test user",
    purpose: "Testing",
    path: "/admin/home13",
    exact: false,
  },
  {
    dateCreated: "2017-08-28T18:10:11Z",
    id: "59a45c83b0756d1fa0c26ffb",
    isActive: false,
    text: "Demo team 2",
    ownerEmail: "tester@us.ibm.com",
    ownerId: "59a45e60b0756d1fa0c27825",
    ownerName: "Test user",
    purpose: "Testing",
    path: "/admin/home14",
    exact: false,
  },
  {
    dateCreated: "2017-08-28T18:10:11Z",
    id: "59a45c83b0756d1fa0c26ffb",
    isActive: false,
    text: "Demo team 2",
    ownerEmail: "tester@us.ibm.com",
    ownerId: "59a45e60b0756d1fa0c27825",
    ownerName: "Test user",
    purpose: "Testing",
    path: "/admin/home15",
    exact: false,
  },
  {
    dateCreated: "2017-08-28T18:10:11Z",
    id: "59a45c83b0756d1fa0c26ffb",
    isActive: false,
    text: "Demo team 2",
    ownerEmail: "tester@us.ibm.com",
    ownerId: "59a45e60b0756d1fa0c27825",
    ownerName: "Test user",
    purpose: "Testing",
    path: "/admin/home1",
    exact: false,
  },
  {
    dateCreated: "2017-08-28T18:10:11Z",
    id: "59a45c83b0756d1fa0c26ffb",
    isActive: false,
    text: "Demo team 2",
    ownerEmail: "tester@us.ibm.com",
    ownerId: "59a45e60b0756d1fa0c27825",
    ownerName: "Test user",
    purpose: "Testing",
    path: "/admin/home16",
    exact: false,
  },
  {
    dateCreated: "2017-08-28T18:10:11Z",
    id: "59a45c83b0756d1fa0c26ffb",
    isActive: false,
    text: "Demo team 2",
    ownerEmail: "tester@us.ibm.com",
    ownerId: "59a45e60b0756d1fa0c27825",
    ownerName: "Test user",
    purpose: "Testing",
    path: "/admin/home17",
    exact: false,
  },
  {
    dateCreated: "2017-08-28T18:10:11Z",
    id: "59a45c83b0756d1fa0c26ffb",
    isActive: false,
    text: "Demo team 2",
    ownerEmail: "tester@us.ibm.com",
    ownerId: "59a45e60b0756d1fa0c27825",
    ownerName: "Test user",
    purpose: "Testing",
    path: "/admin/home18",
    exact: false,
  },
];
