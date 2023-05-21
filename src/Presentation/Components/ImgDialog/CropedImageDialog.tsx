import React, { useState } from "react";
import type { DrawerProps } from "antd";
import { Drawer, Space, Button } from "antd";

type Props = {
  onClose: () => void;
  position: DrawerProps["placement"];
  img: any;
};

const CropedImageDialog: React.FC<Props> = ({ position, onClose, img }) => {
  const [placement] = useState<DrawerProps["placement"]>(position);

  return (
    <>
      <Drawer
        height={window.innerHeight}
        title="Post Image"
        placement={placement}
        closable={false}
        onClose={onClose}
        open={!!img}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <img style={{ width: "100%" }} src={img} alt="cropped" />
      </Drawer>
    </>
  );
};

export default CropedImageDialog;
