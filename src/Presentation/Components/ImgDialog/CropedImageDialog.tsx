import React, { useState } from "react";
import type { DrawerProps } from "antd";
import { Drawer, Space, Button, Form, Input } from "antd";
import IconPlus from "@/Assets/Icons/icon_plusFloating.svg";
import IconMinus from "@/Assets/Icons/icon_minus.svg";

type SizeType = Parameters<typeof Form>[0]["size"];

type Props = {
  onClose: () => void;
  position: DrawerProps["placement"];
  img: any;
};

const CropedImageDialog: React.FC<Props> = ({ position, onClose, img }) => {
  const [placement] = useState<DrawerProps["placement"]>(position);
  const [characteristics, setCharacteristics] = useState<string[]>([""]);

  const addCharacteristics = () => {
    setCharacteristics([...characteristics, ""]);
  };

  const removeCharacteristics = (index: number) => () => {
    if (characteristics.length === 1) {
      return;
    }

    const newCharacteristics = [...characteristics];
    newCharacteristics.splice(index, 1);

    setCharacteristics(newCharacteristics);
  };

  const onChangeCharacteristic = (e: any, index: number) => {
    const newCharacteristics = [...characteristics];
    newCharacteristics[index] = e.target.value;
    setCharacteristics(newCharacteristics);
  };

  return (
    <>
      <Drawer
        height={window.innerHeight}
        title="Post Image"
        placement={placement}
        closable={false}
        onClose={onClose}
        open={!!img}
        style={{ maxWidth: "768px", margin: "0 auto" }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <img style={{ width: "100%" }} src={img} alt="cropped" />

        <div className="mt-4">
          <Form
            layout="vertical"
            initialValues={{ size: "large" }}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            size={"large" as SizeType}
          >
            <Form.Item
              label="Nama Barang"
              name="name"
              rules={[{ required: true, message: "Nama Barang harus diisi" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Tempat Ditemukan"
              name="place"
              rules={[
                { required: true, message: "Tempat Ditemukan harus diisi" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Ciri-ciri"
              name="description"
              rules={[{ required: true, message: "Ciri-ciri harus diisi" }]}
            >
              {characteristics.map((item: any, index: number) => {
                return (
                  <div className="flex flex-row justify-between items-center gap-x-2 mb-4">
                    <p>{index + 1}</p>
                    <Input
                      value={item}
                      onChange={(e) => onChangeCharacteristic(e, index)}
                    />
                    {index === 0 ? null : (
                      <Button
                        onClick={removeCharacteristics(index)}
                        shape="circle"
                        className="flex flex-row justify-center items-center mx-auto"
                        type="primary"
                        icon={<img src={IconMinus} alt="add" />}
                      ></Button>
                    )}
                  </div>
                );
              })}
            </Form.Item>

            <Button
              onClick={addCharacteristics}
              shape="circle"
              className="flex flex-row justify-center items-center mx-auto"
              type="primary"
              icon={<img src={IconPlus} alt="add" />}
            ></Button>
          </Form>
        </div>
      </Drawer>
    </>
  );
};

export default CropedImageDialog;
