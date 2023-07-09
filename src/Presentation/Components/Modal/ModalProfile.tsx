import { useState, useImperativeHandle, forwardRef } from "react";
import { Modal, Input } from "antd";
import { IUser } from "@/Contracts/Response/IUserResponse";

import IconCrossCloseModal from "@/Assets/Icons/icon_crossCloseModal.svg";
import IconLogout from "@/Assets/Icons/icon_logout.svg";
import DummyImage from "@/Assets/DummyImage/dummy_profile_1.png";
import LogoApp from "../Logo/LogoApp";

import { elementColor, ilustrationColor } from "@/Core/config/colors/colors";
import { title14, title12 } from "@/Core/config/fonts/fonts";

export type RefHandlerModalProfile = {
  openModalProfile: () => void;
};

type Props = {
  user: IUser;
  onLogout: () => void;
};

const ModalProfile = forwardRef<RefHandlerModalProfile, Props>(
  (props: Props, ref) => {
    const [modalProfileOpen, setModalProfileOpen] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      openModalProfile: (): void => {
        setModalProfileOpen(true);
      },
    }));

    return (
      <Modal
        title={
          <>
            <div className="flex flex-row justify-between">
              <img
                onClick={() => setModalProfileOpen(false)}
                style={{ cursor: "pointer", alignSelf: "start" }}
                src={IconCrossCloseModal}
                alt="close"
              />
              <LogoApp width="80px" height="44px" />
              <img
                onClick={props.onLogout}
                style={{ cursor: "pointer", alignSelf: "start" }}
                src={IconLogout}
                alt="logout"
              />
            </div>
          </>
        }
        centered
        open={modalProfileOpen}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => setModalProfileOpen(false)}
        closable={false}
      >
        <div className="flex flex-col justify-center items-center gap-4 pb-8">
          <img
            src={DummyImage}
            alt="profile"
            style={{ width: "75px", height: "75px", borderRadius: "50%" }}
          />

          <div className="text-center">
            <p style={{ color: elementColor.headline_navyBlue, ...title14 }}>
              {props?.user.username ? props?.user.username : "Jhon Doew"}
            </p>
            <p style={{ color: elementColor.headline_navyBlue, ...title12 }}>
              {props?.user.email ? props?.user.email : "email@gmail.com"}
            </p>
          </div>

          <div className="information_profile flex flex-col justify-start items-center gap-4">
            <div className="flex flex-col">
              <label htmlFor="nimOrNip">NIP/NIM</label>
              <Input
                id="nimOrNip"
                type="text"
                placeholder={props?.user.nim !== "" ? "NIM" : "NIP"}
                maxLength={12}
                bordered={false}
                disabled={true}
                value={
                  props?.user.nim !== "" ? props?.user.nim : props?.user.nip
                }
                style={{
                  padding: "0px",
                  borderRadius: "0px",
                  borderBottom: "1px solid " + ilustrationColor.stroke_navBlue,
                  width: "100%",
                  ...title12,
                }}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="major">Major</label>
              <Input
                id="major"
                type="text"
                placeholder="ex: Sistem Informasi"
                maxLength={12}
                bordered={false}
                disabled={true}
                value={props?.user.major ? props?.user.major : "NULL"}
                style={{
                  padding: "0px",
                  borderRadius: "0px",
                  borderBottom: "1px solid " + ilustrationColor.stroke_navBlue,
                  width: "100%",
                  ...title12,
                }}
              />
            </div>

            {/* <div className="flex flex-col">
              <label htmlFor="faculty">Faculty</label>
              <Input
                id="faculty"
                type="text"
                placeholder="ex: Fakultas Ilmu Komputer"
                maxLength={12}
                bordered={false}
                disabled={true}
                value={"Fakultas Ilmu Komputer"}
                style={{
                  padding: "0px",
                  borderRadius: "0px",
                  borderBottom: "1px solid " + ilustrationColor.stroke_navBlue,
                  width: "100%",
                  ...title12,
                }}
              />
            </div> */}
          </div>
        </div>
      </Modal>
    );
  }
);

export default ModalProfile;
