import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useLayoutEffect,
} from "react";
import { Modal, Skeleton, Image } from "antd";
import { useAppDispatch } from "@/Domain/Store/hooks";
import { useRefModalContext } from "@/Domain/Context/RefModal.context";
import { requestValidatePost } from "@/Domain/Reducer/postSlice";
// import "./SkeletonCardPost.modules.css";

export type RefHandlerModalQrcode = {
  openModalQrcode: (post_id: string) => void;
  closeDrawerPostDetail: () => void;
};

const ModalQrcode = forwardRef<RefHandlerModalQrcode>((props, ref) => {
  const dispatch = useAppDispatch();
  const { setState: setModalContext } = useRefModalContext();

  const [modalQrcodeOpen, setModalQrcodeOpen] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useLayoutEffect(() => {
    setModalContext((prevState) => ({
      ...prevState,
      modalQrcodeRef: ref as React.MutableRefObject<RefHandlerModalQrcode>,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(ref, () => ({
    openModalQrcode: (post_id: string): void => {
      handleOpenModalQrcode(post_id);
    },
    closeDrawerPostDetail: (): void => {
      setModalQrcodeOpen(false);
    },
  }));

  const handleOpenModalQrcode = async (post_id: string) => {
    try {
      // unwrap() is a utility function that extracts the value of a fulfilled promise.
      dispatch(requestValidatePost(post_id))
        .unwrap()
        .then((response) => {
          // show modal qrcode
          setLink(response.qr_code_url);
          setModalQrcodeOpen(true);
        });
    } catch (error) {
      console.log("error : ", error);
    }
  };

  return (
    <Modal
      zIndex={1003}
      title={<p className="text-center">Scan Here</p>}
      centered
      open={modalQrcodeOpen}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      onCancel={() => setModalQrcodeOpen(false)}
      closable={false}
      width={250}
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoading ? (
        <Skeleton.Image
          className="mt-2"
          active
          style={{ width: "200px", height: "200px" }}
        />
      ) : null}
      <Image src={link} onLoad={() => setIsLoading(false)} />
      {/* <img src={link} alt="QRCode" /> */}
      {/* <QRCode value={link} size={200} /> */}
    </Modal>
  );
});

export default ModalQrcode;
