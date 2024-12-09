import React from "react";
import ImageModal from "./index";

export default {
  title: "Components/ImageModal",
  component: ImageModal,
  parameters: {
    docs: {
      description: {
        component: "Base modal used to display images in higher resolutions",
      },
    },
  },
};

export const Default = () => {
  return (
    <div id="root">
      <ImageModal appElement="#root" imageProps={{style: {maxWidth: "10rem", maxHeight: "10rem"}}} imageSrc="https://animal.law.harvard.edu/wp-content/uploads/Manatee-2-850x475.jpg"/>
      <ImageModal appElement="#root" imageProps={{style: {maxWidth: "10rem", maxHeight: "10rem"}}} imageSrc="https://images.unsplash.com/photo-1462803966231-b88ec09ff42a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D
https://images.unsplash.com/photo-1462803966231-b88ec09ff42a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D"/>
    </div>
  );
};
