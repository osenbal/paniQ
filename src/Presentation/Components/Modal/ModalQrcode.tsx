import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Modal, Skeleton, Image } from "antd";
// import "./SkeletonCardPost.modules.css";

export type RefHandlerModalQrcode = {
  openModalQrcode: (id: string | number, link: string) => void;
};

const ModalQrcode = forwardRef<RefHandlerModalQrcode>((props, ref) => {
  const [modalQrcodeOpen, setModalQrcodeOpen] = useState<boolean>(false);
  const [id, setId] = useState<string | number>("");
  const [link, setLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useImperativeHandle(ref, () => ({
    openModalQrcode: (id: string | number, link: string): void => {
      setModalQrcodeOpen(true);
      setId(id);
      setLink(link);
    },
  }));

  return (
    <Modal
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
          style={{ width: "100vw", height: "200px" }}
        />
      ) : null}
      <Image src={link} onLoad={() => setIsLoading(false)} />
      {/* <img src={link} alt="QRCode" /> */}
      {/* <QRCode value={link} size={200} /> */}
    </Modal>
  );
});

export default ModalQrcode;
