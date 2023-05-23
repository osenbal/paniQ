import React, { useState, useImperativeHandle, forwardRef } from "react";
import { QRCode, Modal } from "antd";

export type RefHandlerModalQrcode = {
  openModalQrcode: (id: string | number, link: string) => void;
};

const ModalQrcode = forwardRef<RefHandlerModalQrcode>((props, ref) => {
  const [modalQrcodeOpen, setModalQrcodeOpen] = useState<boolean>(false);
  const [id, setId] = useState<string | number>("");
  const [link, setLink] = useState<string>("");

  useImperativeHandle(ref, () => ({
    openModalQrcode: (id: string | number, link: string): void => {
      setModalQrcodeOpen(true);
      setId(id);
      setLink(link);
    },
  }));

  return (
    <Modal
      title={`QRCode - ${id}`}
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
      <QRCode value={link} size={200} />
    </Modal>
  );
});

export default ModalQrcode;
