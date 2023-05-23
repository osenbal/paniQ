import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

const qrcodeRegionId = "qrScanner";

type Props = {
  fps?: number;
  qrbox?: number;
  aspectRatio?: number;
  disableFlip?: boolean;
  verbose?: boolean;
  style?: any;
  qrCodeSuccessCallback: (decodedText: string) => void;
  qrCodeErrorCallback: (errorMessage: string) => void;
};

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props: Props) => {
  let config: any = {};

  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

const Html5QrcodePlugin: React.FC<Props> = (props) => {
  // eslint-disable-next-line
  let html5QrcodeScanner: Html5QrcodeScanner;

  useEffect(() => {
    // when component mounts
    const config = createConfig(props);
    const verbose = props.verbose === true;

    // eslint-disable-next-line
    if (!html5QrcodeScanner?.getState()) {
      // eslint-disable-next-line
      html5QrcodeScanner = new Html5QrcodeScanner(
        qrcodeRegionId,
        config,
        verbose
      );
      // eslint-disable-next-line
      html5QrcodeScanner.render(
        props.qrCodeSuccessCallback,
        props.qrCodeErrorCallback
      );
    }

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch((error: any) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  return <div style={props.style} id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;
