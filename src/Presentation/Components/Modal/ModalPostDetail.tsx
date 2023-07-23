import React, { forwardRef, useLayoutEffect, useImperativeHandle } from "react";
import { Drawer } from "antd";
import { IPost } from "@/Contracts/Response/IPostsResponse";
import CardPost from "../CardPost/CardPost";
import { useAppSelector, useAppDispatch } from "@/Domain/Store/hooks";
import { getDetailPost } from "@/Domain/Reducer/postSlice";
import { toast } from "react-toastify";
import { useRefModalContext } from "@/Domain/Context/RefModal.context";

export type RefHandlerPostDetail = {
  openDrawerPostDetail: (post_id: number | string) => void;
  closeDrawerPostDetail: () => void;
};

type Props = {};

const DEFAULT_ERROR_MESSAGE = "Something went wrong";

const ModalPostDetail = forwardRef<RefHandlerPostDetail, Props>(
  (props: Props, ref) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const { setState: setStateModalContext } = useRefModalContext();

    const [modalDetailPostOpen, setModalDetailPostOpen] =
      React.useState<boolean>(false);

    const [postDetail, setPostDetail] = React.useState<IPost | null>(null);

    useLayoutEffect(() => {
      setStateModalContext((prev) => ({
        ...prev,
        modalPostDetailRef: ref as React.MutableRefObject<RefHandlerPostDetail>,
      }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useImperativeHandle to expose a ref to parent component
    useImperativeHandle(ref, () => ({
      openDrawerPostDetail: (post_id: string | number): void => {
        handleGetDetailPost(post_id);
      },
      closeDrawerPostDetail: (): void => {
        setModalDetailPostOpen(false);
      },
    }));

    const handleGetDetailPost = (post_id: number | string) => {
      dispatch(getDetailPost(post_id))
        .unwrap()
        .then((res) => {
          setPostDetail(res);
          setModalDetailPostOpen(true);
        })
        .catch((err) => {
          toast.error(err || DEFAULT_ERROR_MESSAGE);
        });
    };

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
            isMyPost={user?.id === postDetail?.user_id}
            userName={postDetail?.user?.username}
            userMajor={postDetail?.user?.usermajor}
            userImage={"https://picsum.photos/200"}
            postImage={postDetail?.image_url || "https://picsum.photos/400"}
            postTitle={postDetail?.title}
            postDescription={postDetail?.place}
            postDate={postDetail?.created_at}
            characteristics={postDetail?.characteristics}
          />
        )}
      </Drawer>
    );
  }
);

export default ModalPostDetail;
