import React from "react";
import { Card, Button } from "antd";
import IconComment from "@/Assets/Icons/icon_comment.svg";
import IconPostQrScan from "@/Assets/Icons/icon_post_qrScan.svg";
import IconPostSave from "@/Assets/Icons/icon_post_save.svg";
import { ICharacteristic } from "@/Contracts/Response/IPostsResponse";
import { useRefModalContext } from "@/Domain/Context/RefModal.context";
// import DummyProfile from "@/Assets/Icons/icon_dummyProfile.svg";

import "./CardPost.modules.css";

const { Meta } = Card;

type Props = {
  id: number | string;
  isMyPost: boolean;
  indexZero?: boolean;
  userName: string;
  userMajor: string;
  userImage: string;
  postImage: string;
  postTitle: string;
  postDescription: string;
  postDate: string;
  characteristics: ICharacteristic[];
};

const maxTextLength = 100;

const cutText = (text: string) => {
  if (text.length > maxTextLength) {
    return text.slice(0, maxTextLength) + "...";
  }
  return text;
};

const CardPost: React.FC<Props> = ({
  id,
  isMyPost,
  userImage,
  userName,
  userMajor,
  postImage,
  postTitle,
  postDescription,
  postDate,
  characteristics,
  indexZero,
}) => {
  const { state: modalContextState } = useRefModalContext();

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Card
        hoverable={false}
        style={{
          width: "100%",
          boxShadow: "none",
          borderTop: "0.3px solid #F2F4F6",
          borderBottom: "0.3px solid #F2F4F6",
          borderRadius: "0px",
          paddingTop: "5px",
          paddingBottom: "14px",
        }}
        bordered={false}
        bodyStyle={{ padding: 0, boxShadow: "none" }}
        cover={
          <>
            <div className="px-2 mb-2">
              <div className="flex flex-row  items-center">
                <img
                  src={userImage}
                  alt="profile"
                  style={{ borderRadius: "50%", width: "40px" }}
                />
                <div style={{ lineHeight: "16px", marginLeft: "6px" }}>
                  <p>{userName}</p>
                  <p style={{ color: "#595959" }}>{userMajor}</p>
                </div>
              </div>
            </div>
            <div style={{ height: "412px" }}>
              <img
                alt="example"
                src={postImage}
                style={{
                  maxHeight: "412px",
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                  borderRadius: "0px",
                }}
              />
            </div>
          </>
        }
      >
        <Meta
          description={
            <>
              <div className="px-2.5 mt-5">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-3.5">
                    <Button
                      id={indexZero ? "my-seventh-step" : ""}
                      style={{ border: "none" }}
                      className="flex flex-row justify-center items-center"
                      icon={<img src={IconComment} alt="comment" />}
                      onClick={() => {
                        modalContextState.modalDisqusRef?.current?.openDrawerDisqus(
                          id.toString()
                        );
                      }}
                    ></Button>

                    {isMyPost ? (
                      <Button
                        id={indexZero ? "my-eighth-step" : ""}
                        onClick={() =>
                          modalContextState.modalQrcodeRef?.current?.openModalQrcode(
                            id.toString()
                          )
                        }
                        style={{ border: "none" }}
                        className="flex flex-row justify-center items-center"
                        icon={<img src={IconPostQrScan} alt="scan" />}
                      ></Button>
                    ) : null}
                  </div>
                  <Button
                    id={indexZero ? "my-ninth-step" : ""}
                    style={{ border: "none" }}
                    className="flex flex-row justify-center items-center"
                    icon={<img src={IconPostSave} alt="save post" />}
                    onClick={() => {
                      modalContextState.modalUnderMaintenanceRef?.current?.openModalUnderMaintenance(
                        "Under Development"
                      );
                    }}
                  ></Button>
                </div>
                <div>
                  <p className="color_navyBlue mt-2">
                    <span className="font-bold"> {userName} </span>
                    Telah menemukan{" "}
                    <span className="font-bold"> {postTitle}. </span>
                  </p>
                  <span>
                    {open
                      ? `${postDescription}`
                      : cutText(`${postDescription}`)}
                  </span>
                  {open ? (
                    <div className="cardPost_chraracteristic">
                      <p className="font-bold">Dengan ciri-ciri :</p>
                      <ol key={id}>
                        {characteristics.map((item, index) => {
                          return <li key={index}>{item.title}</li>;
                        })}
                      </ol>
                    </div>
                  ) : (
                    <span
                      onClick={() => setOpen(true)}
                      style={{ cursor: "pointer" }}
                      className="underline underline-offset-4 ml-1"
                    >
                      selengkapnya
                    </span>
                  )}
                </div>
              </div>
            </>
          }
        />
      </Card>
    </>
  );
};

export default CardPost;
