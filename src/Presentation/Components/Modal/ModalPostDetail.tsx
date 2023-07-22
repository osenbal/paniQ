import React, { forwardRef, useImperativeHandle } from "react";
import { Drawer } from "antd";
import { IPost } from "@/Contracts/Response/IPostsResponse";
import CardPost from "../CardPost/CardPost";
import { useAppSelector } from "@/Domain/Store/hooks";

export type RefHandlerPostDetail = {
  openDrawerPostDetail: (data: IPost) => void;
  closeDrawerPostDetail: () => void;
};

type Props = {};

const ModalPostDetail = forwardRef<RefHandlerPostDetail, Props>(
  (props: Props, ref) => {
    const [modalDetailPostOpen, setModalDetailPostOpen] =
      React.useState<boolean>(false);
    const [postDetail, setPostDetail] = React.useState<IPost | null>(null);
    const { user } = useAppSelector((state) => state.auth);

    // useImperativeHandle to expose a ref to parent component
    useImperativeHandle(ref, () => ({
      openDrawerPostDetail: (data): void => {
        setPostDetail(data);
        setModalDetailPostOpen(true);
      },
      closeDrawerPostDetail: (): void => {
        setModalDetailPostOpen(false);
      },
    }));

    return (
      <Drawer
        title="Post Detail"
        placement="bottom"
        style={{ maxWidth: "768px", margin: "0 auto" }}
        height={window.innerHeight}
        onClose={() => setModalDetailPostOpen(false)}
        open={modalDetailPostOpen}
      >
        {postDetail === null ? null : (
          <CardPost
            id={postDetail?.id}
            user_id={postDetail?.user_id}
            isMyPost={user?.id === postDetail?.user_id}
            userName={postDetail?.user?.username}
            userMajor={postDetail?.user?.usermajor}
            userImage={"https://picsum.photos/200"}
            postImage={postDetail?.image_url || "https://picsum.photos/400"}
            postTitle={postDetail?.title}
            postDescription={postDetail?.place}
            postDate={postDetail?.created_at}
            characteristics={postDetail?.characteristics}
            openQrCode={() => {}}
          />
        )}
      </Drawer>
    );
  }
);

export default ModalPostDetail;
