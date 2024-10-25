import React from "react";
import ReactModal from "react-modal";
import { Button } from "@carbon/react"
import { Close } from "@carbon/react/icons";
import Modal from "../Modal";
import cx from "classnames";
import { prefix } from "../../internal/settings";

export type Props = Omit<ReactModal.Props, "appElement"> & {
  appElement?: string;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  imageClassName?: string;
  isOpen?: boolean;
  modalProps?: any;
  imageProps?: any;
  imageSrc?: string;
};

export function ImageModal(props: Props) {
  const { appElement = "#app", className, containerClassName, modalProps, imageClassName, imageProps, imageSrc } = props;
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  return (
    <div className={cx(`${prefix}--bmrg-image-modal-container`, containerClassName)}>
      <Modal
        appElement={appElement}
        containerClassName={`${prefix}--bmrg-image-modal`}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        {...modalProps}
      >
        <Button
          kind="ghost"
          size="lg"
          hasIconOnly
          renderIcon={Close}
          className={`${prefix}--bmrg-image-modal__close`}
          onClick={() => setIsModalOpen(false)}
        />
        <img className={`${prefix}--bmrg-image-modal__open-image`} alt="modal-content" src={imageSrc}/>
      </Modal>
      <button 
        tabIndex={0}
        onClick={handleOpenModal}
        className={cx(`${prefix}--bmrg-image-modal__trigger`, className)}
      >
        <img
          className={cx(`${prefix}--bmrg-image-modal__image`, imageClassName)}
          alt="trigger"
          src={imageSrc}
          {...imageProps}
        />
      </button>
    </div>
  );
}

export default ImageModal;
