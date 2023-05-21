import React from "react";
import { Card } from "antd";
import IconComment from "@/Assets/Icons/icon_comment.svg";
import IconPostQrScan from "@/Assets/Icons/icon_post_qrScan.svg";
import IconPostSave from "@/Assets/Icons/icon_post_save.svg";
// import DummyProfile from "@/Assets/Icons/icon_dummyProfile.svg";

import "./CardPost.modules.css";

const { Meta } = Card;

type Props = {
  userName: string;
  userMajor: string;
  userImage: string;
  postImage: string;
  postTitle: string;
  postDescription: string;
  postDate: string;
  characteristics: string[];
};

const maxTextLength = 100;

const cutText = (text: string) => {
  if (text.length > maxTextLength) {
    return text.slice(0, maxTextLength) + "...";
  }
  return text;
};

const CardPost: React.FC<Props> = ({
  userImage,
  userName,
  userMajor,
  postImage,
  postTitle,
  postDescription,
  postDate,
  characteristics,
}) => {
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
            <img
              alt="example"
              src={postImage}
              style={{
                maxHeight: "354px",
                height: "100%",
                width: "100%",
                objectFit: "cover",
                objectPosition: "top",
                borderRadius: "0px",
              }}
            />
          </>
        }
      >
        <Meta
          // title="Europe Street beat"
          description={
            <>
              <div className="px-2.5 mt-5">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-3.5">
                    <img src={IconComment} alt="comment" />
                    <img src={IconPostQrScan} alt="scan" />
                  </div>
                  <div>
                    <img src={IconPostSave} alt="save post" />
                  </div>
                </div>
                <div>
                  <p className="color_navyBlue mt-2">
                    <span className="font-bold"> {userName}</span>
                    Telah menemukan{" "}
                    <span className="font-bold"> {postTitle}. </span>
                  </p>
                  <p>
                    <span>
                      {open
                        ? `${postDescription}`
                        : cutText(`${postDescription}`)}
                    </span>
                    {open ? (
                      <>
                        <p className="font-bold">Dengan ciri-ciri :</p>
                        {characteristics.map((item, index) => {
                          return (
                            <>
                              <ol>
                                <li>{item}</li>
                              </ol>
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <span
                        onClick={() => setOpen(true)}
                        className="underline underline-offset-4 "
                      >
                        selengkapnya
                      </span>
                    )}
                  </p>
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
