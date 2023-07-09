import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Modal } from "antd";
import "./ModalConfirmation.modules.css";

export type RefHandlerModalConfirmation = {
  openModalConfirmation: () => void;
  closeModalConfirmation: () => void;
};

type Props = {
  onYes: () => void;
  onNo?: () => void;
  message: string;
  children?: React.ReactNode;
};

const ModalConfirmation = forwardRef<RefHandlerModalConfirmation, Props>(
  (props: Props, ref) => {
    const [modalShowConfirmation, setModalShowConfirmation] =
      useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      openModalConfirmation: (): void => {
        setModalShowConfirmation(true);
      },
      closeModalConfirmation: (): void => {
        setModalShowConfirmation(false);
      },
    }));

    return (
      <Modal
        wrapClassName="modal_confirmation"
        centered
        maskClosable={false}
        open={modalShowConfirmation}
        zIndex={1000000000}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => setModalShowConfirmation(false)}
        closable={false}
        style={{ maxWidth: "270px" }}
        footer={
          <>
            <div
              className="flex flex-row justify-around items-center mt-4"
              style={{ height: "44px" }}
            >
              <button
                onClick={() => {
                  props.onNo && props.onNo();
                  setModalShowConfirmation(false);
                }}
                className="btn_modal_confirmation w-full h-full border-r-2 border-t-2 border-gray-300"
              >
                No
              </button>
              <button
                onClick={props.onYes}
                className="btn_modal_confirmation w-full h-full font-bold border-t-2 border-gray-300"
              >
                Yes
              </button>
            </div>
          </>
        }
      >
        <div className="px-5">
          {props.children}
          <p className="text-center">{props.message}</p>
        </div>
      </Modal>
    );
  }
);

export default ModalConfirmation;
