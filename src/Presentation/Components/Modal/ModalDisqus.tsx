import React, { forwardRef, useImperativeHandle, useLayoutEffect } from "react";
import { Drawer } from "antd";
import type { DrawerProps } from "antd/es/drawer";
// import { useAppDispatch } from "@/Domain/Store/hooks";
import { useRefModalContext } from "@/Domain/Context/RefModal.context";

export type RefHandlerModalDisqus = {
  openDrawerDisqus: () => void;
  closeDrawerDisqus: () => void;
};

type Props = {
  position: DrawerProps["placement"];
};

const ModalDisqus = forwardRef<RefHandlerModalDisqus, Props>(
  ({ position: placement }: Props, ref) => {
    const [modalDisqusOpen, setModalDisqusOpen] =
      React.useState<boolean>(false);

    const { setState } = useRefModalContext();

    useLayoutEffect(() => {
      setState((prevState) => ({
        ...prevState,
        modalDisqusRef: ref as React.MutableRefObject<RefHandlerModalDisqus>,
      }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useImperativeHandle to expose a ref to parent component
    useImperativeHandle(ref, () => ({
      openDrawerDisqus: (): void => {
        setModalDisqusOpen(true);
      },
      closeDrawerDisqus: (): void => {
        setModalDisqusOpen(false);
      },
    }));

    // const dispatch = useAppDispatch();

    return (
      <>
        <Drawer
          className="modal-disqus"
          placement={placement}
          style={{ maxWidth: "768px", margin: "0 auto" }}
          height={window.innerHeight}
          onClose={() => setModalDisqusOpen(false)}
          open={modalDisqusOpen}
        >
          DISQUS
        </Drawer>
      </>
    );
  }
);

export default ModalDisqus;
