import React from "react";
import SupportCenter from "./SupportCenter"
import { headerModalProps } from "../../internal/helpers";

export default {
    title: "Platform/SupportCenter",
    component: SupportCenter,
    parameters: {
      docs: {
        description: {
          component: "Header modal with details on providing SupportCenter to the platform",
        },
      },
    },
  };

  export const Default = (args) => {
    return <SupportCenter {...args} />;
  };
  
  Default.args = {
    platformName: "Boomerang",
    SupportCenter: "https://ibmsf.my.site.com/ibminternalproducts/s/",
    platformOrganization: "IBM",
    ...headerModalProps,
  };