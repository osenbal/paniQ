import React, { useEffect } from "react";
import { FloatButton } from "antd";
import { useNavigate } from "react-router-dom";
import IconPlusFloating from "@/Assets/Icons/icon_plusFloating.svg";
import IconQRCode from "@/Assets/Icons/icon_qrScan.svg";
import IconStaffReturn from "@/Assets/Icons/icon_staffReturn.svg";
import IconImage from "@/Assets/Icons/icon_image.svg";
import IconBookmark from "@/Assets/Icons/icon_bookmark.svg";
import LocalStorage from "@/Data/DataSource/LocalStorage/LocalStorage";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

import "./Floating.modules.css";

type Props = {
  showQrScanner: () => void;
};

const Floating: React.FC<Props> = ({ showQrScanner }) => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [isTourOpen, setIsTourOpen] = React.useState(false);

  const steps: Step[] = [
    {
      target: ".step-first-floating",
      content:
        "Scan QR Code disini, untuk mengkonfirmasi barang anda yang sudah ditemukan",
    },

    {
      target: ".step-second-floating",
      content: "Anda bisa melihat barang orang yang sudah anda kembalikan",
    },

    {
      target: ".step-thrid-floating",
      content: "Lihat barang anda yang hilang disini",
    },
    {
      target: ".step-forth-floating",
      content: "Lihat postingan yang anda simpan disini",
    },
  ];

  const closeTour = () => {
    setIsTourOpen(false);
    LocalStorage.set("@tourFloatDone", "done");
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      closeTour();
    }
  };

  useEffect(() => {
    if (LocalStorage.get("@tourFloatDone") !== "done" && open === true) {
      setIsTourOpen(true);
    }
  }, [open]);

  return (
    <>
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
            trigger={isTourOpen ? undefined : "click"}
            open={open}
            onOpenChange={(open) => setOpen(open)}
          >
            <FloatButton
              className="step-first-floating"
              onClick={showQrScanner}
              tooltip="QR Code"
              icon={<img src={IconQRCode} alt="qr icon" aria-label="scan qr" />}
            />
            <FloatButton
              className="step-second-floating"
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
              className="step-thrid-floating"
              onClick={() => navigate("/post/?tab=my-post")}
              tooltip="My Post"
              icon={<img src={IconImage} alt="my post" aria-label="my post" />}
            />
            <FloatButton
              className="step-forth-floating"
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

      <Joyride
        steps={steps}
        run={isTourOpen}
        callback={handleJoyrideCallback}
        continuous
        hideCloseButton
        scrollToFirstStep
        showProgress
        showSkipButton
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
    </>
  );
};

export default Floating;
