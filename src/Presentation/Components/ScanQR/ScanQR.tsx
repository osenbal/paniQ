import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import type { DrawerProps } from "antd";
import { Drawer } from "antd";
import Html5QrcodePlugin from "../Plugins/Html5Qrcode.plugin";
import { elementColor } from "@/Core/config/colors/colors";
import LogoApp from "../Logo/LogoApp";
import IconCloseScanner from "@/Assets/Icons/icon_closeScanner.svg";
// import IconFlashLightOff from "@/Assets/Icons/icon_qrFlash.svg";
import "./ScanQR.modules.css";

export type RefHandlerDrawerQrScanner = {
  openDrawerQrScanner: () => void;
};

const ScanQR = forwardRef<RefHandlerDrawerQrScanner>((props, ref) => {
  const [placement] = useState<DrawerProps["placement"]>("bottom");
  const [showScanner, setShowScanner] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  const onSuccessScanQRCode = (decodedText: string) => {
    setData(decodedText);
  };

  const onErrorScanQRCode = (errorMessage: string) => {
    console.log("errorMessage", errorMessage);
  };

  const closeCam = () => {
    let videoElem: any = document.querySelector("video");
    if (videoElem) {
      let stream = videoElem?.srcObject;
      let tracks = stream?.getTracks();
      tracks?.forEach(function (track: any) {
        track?.stop();
      });
    }
  };

  const onCloseDrawerScanner = () => {
    setShowScanner(false);
    setData(null);
    closeCam();
  };

  useImperativeHandle(ref, () => ({
    openDrawerQrScanner: (): void => {
      setShowScanner(true);
    },
  }));

  // will unmount
  useEffect(() => {
    return () => {
      setShowScanner(false);
      setData(null);
      closeCam();
    };
  }, []);

  return (
    <div>
      <Drawer
        title={
          <div className="flex flex-row justify-center items-center">
            <LogoApp height="68px" width="121px" />
          </div>
        }
        maskClosable={false}
        destroyOnClose={true}
        placement={placement}
        closable={false}
        open={showScanner}
        key={placement}
        onClose={() => setShowScanner(false)}
        height={window.innerHeight / 1.5}
        headerStyle={{
          borderBottom: "none",
          paddingBottom: "0",
          paddingTop: "0",
        }}
        contentWrapperStyle={{ boxShadow: "none" }}
        bodyStyle={{ paddingTop: "6px" }}
        style={{
          backgroundColor: elementColor.button_aqua,
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
          maxWidth: "465px",
          margin: "0 auto",
        }}
      >
        {showScanner ? (
          <div className="relative">
            {data ? (
              <div className="text-center">
                <p>Result success</p>
                <a href={data}>{data}</a>
              </div>
            ) : (
              <div>
                <Html5QrcodePlugin
                  style={{ width: "100%", height: "100%", margin: "0 auto" }}
                  fps={10}
                  qrbox={300}
                  disableFlip={false}
                  aspectRatio={3 / 3}
                  qrCodeSuccessCallback={onSuccessScanQRCode}
                  qrCodeErrorCallback={onErrorScanQRCode}
                />
              </div>
            )}
            {/* <div className="container_controlQr">
              <label
                style={{
                  backgroundColor: "#D9D9D9",
                  borderRadius: "50%",
                  width: "42px",
                  height: "42px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                htmlFor="uploadImage"
              >
                <input
                  id="uploadImage"
                  type="file"
                  style={{ display: "none" }}
                />
                <div className="flex flex-col justify-center align-center items-center">
                  <img src={IconGallery} alt="gallery" width={20} />
                </div>
              </label>
              <Button
                style={{ border: "none", backgroundColor: "#D9D9D9" }}
                shape="circle"
                size="large"
                className="qr_flashLight w-full flex flex-row justify-center items-center"
                icon={<img src={IconFlashLightOff} width={20} alt="on" />}
              ></Button>
            </div> */}
          </div>
        ) : null}

        <div className="flex flex-col justify-center items-center mt-3">
          <img
            onClick={onCloseDrawerScanner}
            width="44px"
            height="44px"
            src={IconCloseScanner}
            alt="close"
          />
          <p style={{ color: elementColor.buttonText_navBlue }}>Close</p>
        </div>
      </Drawer>
    </div>
  );
});

export default ScanQR;
