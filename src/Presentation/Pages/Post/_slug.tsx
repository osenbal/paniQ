import React from "react";
import useSlugPostViewModel from "./_slogViewModel";
import { Button } from "antd";
import BlockViewPosts from "@/Presentation/Components/Posts/BlockViewPosts";
import CarouselViewPosts from "@/Presentation/Components/Posts/CarouselViewPosts";
import { basicColors, elementColor } from "@/Core/config/colors/colors";
import { header18 } from "@/Core/config/fonts/fonts";

import IconLefArrow from "@/Assets/Icons/icon_leftArrow.svg";
import IconViewBlocks from "@/Assets/Icons/icon_viewBlocks.svg";
import IconViewCarousel from "@/Assets/Icons/icon_viewCarousel.svg";
import IconViewBlocksActive from "@/Assets/Icons/icon_viewBlocksActive.svg";
import IconViewCarouselActive from "@/Assets/Icons/icon_viewCarouselActive.svg";

import "./_slug.modules.css";

const _Slug: React.FC = () => {
  const {
    activeTab,
    onChange,
    onBack,
    setViews,
    views,
    // onClickDetail,
    getMyPost,
    posts,
  } = useSlugPostViewModel();

  const items = [
    {
      key: "bookmark",
      label: `Bookmark`,
      view: {
        blocks: <></>,
        carousel: <></>,
      },
    },
    {
      key: "my-post",
      label: `My Post`,
      view: {
        blocks: <BlockViewPosts posts={posts} />,
        carousel: <></>,
      },
    },
    {
      key: "stuff-return",
      label: `Stuff Return`,
      view: {
        blocks: (
          // <BlockViewPosts posts={getPosts()} onClickDetail={onClickDetail} />
          <></>
        ),
        carousel: <></>,
      },
    },
  ];

  return (
    <>
      <div className="container_post_page">
        <div
          className="flex flex-row justify-around items-center"
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

        <div className="px-4 pt-5 pb-4 flex flex-row justify-between items-center">
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

        {items.map((item) => {
          if (item.key === activeTab) {
            return (
              <div key={item.key} className="tab_content">
                {views === "blocks" ? item.view.blocks : item.view.carousel}
              </div>
            );
          }
          return null;
        })}
      </div>
    </>
  );
};

export default _Slug;
