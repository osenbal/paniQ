import React from "react";
import { useNavigate } from "react-router-dom";
import WebCam from "react-webcam";
import getCroppedImg from "@/utils/cropImage";
import { ICreateNewPostRequest } from "@/Contracts/Requests/IPostRequest";
import PostUseCaseImpl from "@/Domain/UseCase/Posts/PostUseCaseImpl";

export default function PageCameraViewModel() {
  const postUseCase = PostUseCaseImpl.getInstance();
  const navigate = useNavigate();

  const webcamRef = React.useRef<WebCam>(null);

  // state local
  const [captureImage, setCaptureImage] = React.useState<string>("");
  const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([]);
  const [activeDeviceId, setActiveDeviceId] = React.useState<
    string | undefined
  >(undefined);
  const [facingMode, setFacingMode] = React.useState<"user" | "environment">(
    "environment"
  );
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);
  const [croppedImage, setCroppedImage] = React.useState(null);
  const [flashLight, setFlashLight] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        const devices = await navigator?.mediaDevices?.enumerateDevices();
        const videoDevices = devices.filter((i) => i.kind === "videoinput");
        setDevices(videoDevices);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setCaptureImage(imageSrc || "");
  }, [webcamRef]);

  const onCropComplete = React.useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const showCroppedImage = React.useCallback(async () => {
    try {
      const croppedImage: any = await getCroppedImg(
        captureImage,
        croppedAreaPixels,
        0
      );
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedAreaPixels]);

  const handleCreateNewPost = async (
    data: ICreateNewPostRequest
  ): Promise<void> => {
    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("title", data.title);
    formData.append("place", data.place);
    data.characteristics?.forEach((item: any) => {
      if (
        item?.title !== "" ||
        item?.title !== null ||
        item?.title !== undefined
      ) {
        formData.append(
          "characteristics",
          JSON.stringify({
            title: item?.title,
          })
        );
      }
    });

    try {
      const responseCreateNewPost = await postUseCase.createPost(formData);
      if (responseCreateNewPost) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCancleCapture = (): void => {
    setCaptureImage("");
    setCroppedImage(null);
    setCroppedAreaPixels(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const onFlipCamera = (): void => {
    if (webcamRef.current) {
      if (facingMode === "user") {
        setFacingMode("environment");
      } else {
        setFacingMode("user");
      }
    }
  };

  const toggleFlashLight = (): void => {
    const SUPPORTS_MEDIA_DEVICES = "mediaDevices" in navigator;
    if (SUPPORTS_MEDIA_DEVICES) {
      try {
        const track = webcamRef.current?.stream?.getTracks();
        if (track) {
          track[0].applyConstraints({
            advanced: [{ torch: !flashLight }],
          });

          setFlashLight(!flashLight);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  return {
    webcamRef,
    capture,
    captureImage,
    setCaptureImage,
    devices,
    setDevices,
    activeDeviceId,
    facingMode,
    setFacingMode,
    setActiveDeviceId,
    crop,
    setCrop,
    zoom,
    setZoom,
    croppedAreaPixels,
    setCroppedAreaPixels,
    croppedImage,
    setCroppedImage,
    onCropComplete,
    showCroppedImage,
    onCancleCapture,
    onFlipCamera,
    toggleFlashLight,
    flashLight,
    setFlashLight,
    handleCreateNewPost,
  };
}
