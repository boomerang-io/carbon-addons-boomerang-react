import React from "react";
import Error404Component from "./index";

export default {
  title: "Errors/Error404",
  component: Error404Component,
  parameters: {
    docs: {
      description: {
        component: "Customizable 404 page component for Core and Boomerang themes",
      },
    },
  },
};

export const Default = (args) => {
  return <Error404Component {...args} />;
};

export const CustomText = (args) => {
  return <Error404Component header={"Header"} title={"Title"} message={"Message"} {...args} />;
};

export const NoText = (args) => {
  return <Error404Component header={null} title={null} message={null} {...args} />;
};

export const Boomerang = (args) => {
  return <Error404Component theme="boomerang" {...args} />;
};
