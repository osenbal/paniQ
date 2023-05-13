import React from "react";
import { FloatButton } from "antd";
import IconPlusFloating from "@/Assets/Icons/icon_plusFloating.svg";
import IconQRCode from "@/Assets/Icons/icon_qrScan.svg";
import IconStaffReturn from "@/Assets/Icons/icon_staffReturn.svg";
import IconImage from "@/Assets/Icons/icon_image.svg";
import IconBookmark from "@/Assets/Icons/icon_bookmark.svg";

import "./Floating.modules.css";

const Floating: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="container_floating ">
      <div className={open ? "floating_overlay" : ""}>
        <FloatButton.Group
          icon={
            <img
              src={IconPlusFloating}
              alt="plus icon"
              aria-label="open menu"
            />
          }
          className="float_button_group"
          shape="circle"
          trigger="click"
          open={open}
          onOpenChange={(open) => setOpen(open)}
        >
          <FloatButton
            tooltip="QR Code"
            icon={<img src={IconQRCode} alt="qr icon" aria-label="scan qr" />}
          />
          <FloatButton
            tooltip="Stuff Return"
            icon={
              <img
                src={IconStaffReturn}
                alt="Stuff Return"
                aria-label="Stuff Return"
              />
            }
          />
          <FloatButton
            tooltip="My Post"
            icon={<img src={IconImage} alt="my post" aria-label="my post" />}
          />
          <FloatButton
            tooltip="Bookmark"
            icon={
              <img
                src={IconBookmark}
                alt="icon bookmark"
                aria-label="bookmark"
              />
            }
          />
        </FloatButton.Group>
      </div>
    </div>
  );
};

export default Floating;
