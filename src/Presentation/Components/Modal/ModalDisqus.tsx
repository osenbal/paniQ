import React, { forwardRef, useImperativeHandle, useLayoutEffect } from "react";
import { Drawer } from "antd";
import type { DrawerProps } from "antd/es/drawer";
import { useRefModalContext } from "@/Domain/Context/RefModal.context";
import { DiscussionEmbed } from "disqus-react";

// import { useAppDispatch } from "@/Domain/Store/hooks";

export type RefHandlerModalDisqus = {
  openDrawerDisqus: (post_id: number | string) => void;
  closeDrawerDisqus: () => void;
};

type Props = {
  position: DrawerProps["placement"];
};

const DISQUS_SHORTNAME = "paniq-1";
const DISQUS_CONFIG_URL = process.env.PUBLIC_URL;

const ModalDisqus = forwardRef<RefHandlerModalDisqus, Props>(
  ({ position: placement }: Props, ref) => {
    const [modalDisqusOpen, setModalDisqusOpen] =
      React.useState<boolean>(false);
    const [idPost, setIdPost] = React.useState<string>("");

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
      openDrawerDisqus: (post_id): void => {
        setIdPost(String(post_id));
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
          zIndex={1003}
          className="modal-disqus"
          placement={placement}
          style={{ maxWidth: "768px", margin: "0 auto" }}
          height={window.innerHeight}
          onClose={() => setModalDisqusOpen(false)}
          open={modalDisqusOpen}
        >
          <DiscussionEmbed
            shortname={DISQUS_SHORTNAME}
            config={{
              url: DISQUS_CONFIG_URL,
              identifier: idPost,
              language: "en",
            }}
          />
        </Drawer>
      </>
    );
  }
);

export default ModalDisqus;
