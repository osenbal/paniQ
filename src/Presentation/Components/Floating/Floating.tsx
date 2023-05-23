import React from "react";
import { FloatButton } from "antd";
import { useNavigate } from "react-router-dom";
import IconPlusFloating from "@/Assets/Icons/icon_plusFloating.svg";
import IconQRCode from "@/Assets/Icons/icon_qrScan.svg";
import IconStaffReturn from "@/Assets/Icons/icon_staffReturn.svg";
import IconImage from "@/Assets/Icons/icon_image.svg";
import IconBookmark from "@/Assets/Icons/icon_bookmark.svg";

import "./Floating.modules.css";

type Props = {
  showQrScanner: () => void;
};

const Floating: React.FC<Props> = ({ showQrScanner }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <div className="container_floating">
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
            onClick={showQrScanner}
            tooltip="QR Code"
            icon={<img src={IconQRCode} alt="qr icon" aria-label="scan qr" />}
          />
          <FloatButton
            onClick={() => navigate("/post/?tab=staff-return")}
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
            onClick={() => navigate("/post/?tab=my-post")}
            tooltip="My Post"
            icon={<img src={IconImage} alt="my post" aria-label="my post" />}
          />
          <FloatButton
            onClick={() => navigate("/post/?tab=bookmark")}
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
