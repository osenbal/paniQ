import React from "react";
import useSlugPostViewModel from "./_slogViewModel";
import { Button } from "antd";
import BlockViewPosts from "@/Presentation/Components/Posts/BlockViewPosts";
import { basicColors, elementColor } from "@/Core/config/colors/colors";
import { header18 } from "@/Core/config/fonts/fonts";
import CarouselViewPosts from "@/Presentation/Components/Posts/CarouselViewPosts";

import IconLefArrow from "@/Assets/Icons/icon_leftArrow.svg";
import IconViewBlocks from "@/Assets/Icons/icon_viewBlocks.svg";
import IconViewCarousel from "@/Assets/Icons/icon_viewCarousel.svg";
import IconViewBlocksActive from "@/Assets/Icons/icon_viewBlocksActive.svg";
import IconViewCarouselActive from "@/Assets/Icons/icon_viewCarouselActive.svg";
import { SkeletonImagePost } from "@/Presentation/Components/CardPost/SkeletonCardPost";

import "./_slug.modules.css";

const _Slug: React.FC = () => {
  const {
    activeTab,
    onChange,
    onBack,
    setViews,
    views,
    myPosts,
    myPostLoading,
    myBookmarkLoading,
    myStuffReturnLoading,
  } = useSlugPostViewModel();

  const items = [
    {
      key: "bookmark",
      label: `Bookmark`,
    },
    {
      key: "my-post",
      label: `My Post`,
    },
    {
      key: "stuff-return",
      label: `Stuff Return`,
    },
  ];

  return (
    <>
      <div className="container_post_page">
        <div
          className="flex flex-row justify-around items-center tab_header"
          style={{ backgroundColor: basicColors.aqua }}
        >
          {items.map((item) => {
            return (
              <div
                key={item.key}
                className="py-4 tab_item"
                onClick={() => onChange(item.key)}
              >
                <p
                  className={`${activeTab === item.key ? "active" : ""}`}
                  style={{
                    ...header18,
                    color: elementColor.buttonText_navBlue,
                    borderColor: basicColors.navyBlue,
                  }}
                >
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>

        <div className="tab_control px-4 pt-5 pb-4 flex flex-row justify-between items-center">
          <Button
            onClick={onBack}
            style={{ border: "none" }}
            className="flex flex-row justify-center items-center"
            icon={<img src={IconLefArrow} alt="back" aria-label="left arrow" />}
          ></Button>

          <div className="flex flex-row justify-end items-center gap-3">
            <Button
              onClick={() => setViews("blocks")}
              style={{ border: "none" }}
              className="flex flex-row justify-center items-center"
              icon={
                <img
                  src={
                    views === "blocks" ? IconViewBlocksActive : IconViewBlocks
                  }
                  alt="view blocks"
                  aria-label="view blocks"
                />
              }
            ></Button>

            <Button
              onClick={() => setViews("carousel")}
              style={{ border: "none" }}
              className="flex flex-row justify-center items-center"
              icon={
                <img
                  src={
                    views === "carousel"
                      ? IconViewCarouselActive
                      : IconViewCarousel
                  }
                  alt="view carousel"
                  aria-label="view carousel"
                />
              }
            ></Button>
          </div>
        </div>

        <div className="tab_content">
          {activeTab === "bookmark" ? (
            myBookmarkLoading ? (
              <LoadingSkeleton />
            ) : (
              <>
                <p className="text-center">Under Development</p>
              </>
            )
          ) : null}
          {activeTab === "my-post" ? (
            myPostLoading ? (
              <LoadingSkeleton />
            ) : (
              <>
                {views === "blocks" ? (
                  <BlockViewPosts posts={myPosts} />
                ) : (
                  <>
                    <CarouselViewPosts posts={myPosts} />
                  </>
                )}
              </>
            )
          ) : null}
          {activeTab === "stuff-return" ? (
            myStuffReturnLoading ? (
              <LoadingSkeleton />
            ) : (
              <>
                <p className="text-center">Under Development</p>
              </>
            )
          ) : null}
        </div>
      </div>
    </>
  );
};

export default _Slug;

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="container_skeleton grid grid-cols-3 gap-0.5">
      <SkeletonImagePost />
      <SkeletonImagePost />
      <SkeletonImagePost />
    </div>
  );
};
