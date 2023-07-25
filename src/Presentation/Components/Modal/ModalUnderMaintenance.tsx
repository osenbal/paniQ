import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useLayoutEffect,
} from "react";
import { Modal } from "antd";
import { useRefModalContext } from "@/Domain/Context/RefModal.context";

export type RefHandlerModalUnderMaintenance = {
  openModalUnderMaintenance: (message: string) => void;
  closeDrawerPostDetail: () => void;
};

type Props = {};

const ModalUnderMaintenance = forwardRef<
  RefHandlerModalUnderMaintenance,
  Props
>((props, ref) => {
  const { setState: setModalContext } = useRefModalContext();
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useLayoutEffect(() => {
    setModalContext((prevState) => ({
      ...prevState,
      modalUnderMaintenanceRef:
        ref as React.MutableRefObject<RefHandlerModalUnderMaintenance>,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(ref, () => ({
    openModalUnderMaintenance: (message): void => {
      setMessage(message);
      setOpen(true);
    },
    closeDrawerPostDetail: (): void => {
      setOpen(false);
    },
  }));

  return (
    <Modal
      zIndex={2000}
      title="Warning"
      centered
      open={open}
      cancelText="Close"
      okButtonProps={{ style: { display: "none" } }}
      onCancel={() => setOpen(false)}
    >
      <p>{message || "Web Under Maintenance"}</p>
    </Modal>
  );
});

export default ModalUnderMaintenance;
