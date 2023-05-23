import React, { useState, useRef } from "react";
import { elementColor } from "@/Core/config/colors/colors";
import { title14, paragraph_regular } from "@/Core/config/fonts/fonts";

import IconArrowDown from "@/Assets/Icons/icon_arrowDown.svg";

import "./NotificationCollapse.modules.css";

// type Props = {
//   title: string;
//   description: string;
//   image: string;
// };

const NotificationCollapse: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const contentEl = useRef<any>();

  return (
    <>
      <div>
        <div
          onClick={() => setOpen(!open)}
          className="notification_collapse_title flex flex-row justify-between items-center"
          style={{
            backgroundColor: elementColor.button_aqua,
            cursor: "pointer",
          }}
        >
          <p className="truncate" style={{ ...title14 }}>
            Penemuan Iphone 14 Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Explicabo hic autem, voluptatibus laudantium
            consequuntur consequatur nulla beatae veritatis natus delectus
            consectetur ab ipsum. Hic voluptatem debitis blanditiis at eum
            perferendis?
          </p>

          <img
            className={`${open ? "open" : ""}`}
            src={IconArrowDown}
            alt="open"
          />
        </div>
        <div
          className={`${
            open ? "open" : ""
          } px-6 py-2 notification_collapse_content`}
        >
          <div
            ref={contentEl}
            style={
              open === true
                ? { height: contentEl.current.scrollHeight + 28 }
                : { height: "0px" }
            }
            className="content flex flex-row justify-center items-center gap-6 h-full"
          >
            <img
              src="https://picsum.photos/200"
              alt="feature post"
              style={{ width: "54px", height: "54px", borderRadius: "3px" }}
            />
            <p
              style={{ ...paragraph_regular }}
              className="notification_content_elipsis "
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet
              cupiditate soluta nemo atque provident quaerat cumque inventore
              nisi aperiam modi exercitationem placeat, odio, maiores incidunt
              laudantium temporibus, nostrum magnam debitis.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationCollapse;
