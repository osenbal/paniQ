import React, { useState } from "react";
import type { DrawerProps } from "antd";
import { Drawer, Space, Button, Form, Input } from "antd";
import { base64ToFile } from "@/utils/convertBase64ToImage";
import { ICreateNewPostRequest } from "@/Contracts/Requests/IPostRequest";

import IconPlus from "@/Assets/Icons/icon_plusFloating.svg";
import IconMinus from "@/Assets/Icons/icon_minus.svg";

type SizeType = Parameters<typeof Form>[0]["size"];

type Props = {
  onClose: () => void;
  position: DrawerProps["placement"];
  img: string;
  createNewPost: (data: ICreateNewPostRequest) => void;
};

const CropedImageDialog: React.FC<Props> = ({
  position,
  onClose,
  img,
  createNewPost,
}) => {
  const [form] = Form.useForm();
  const [placement] = useState<DrawerProps["placement"]>(position);
  const [characteristics] = useState([
    {
      title: "",
    },
  ]);
  const [isSending, setIsSending] = useState<boolean>(false);

  const handleSubmitPost = () => {
    if (isSending) return;
    setIsSending(true);
    form
      .validateFields(["name", "place", "characteristics"])
      .then(
        async () => {
          createNewPost({
            image: base64ToFile(img, "image.jpg"),
            title: form.getFieldValue("name"),
            place: form.getFieldValue("place"),
            characteristics: form.getFieldValue("characteristics"),
          });
        },
        (err) => {
          console.log("error", err);
        }
      )
      .finally(() => {
        setIsSending(false);
      });
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

        <div className="mt-4 flex flex-col justify-center items-center">
          <Form
            form={form}
            layout="vertical"
            name="form_post"
            autoComplete="off"
            initialValues={{ size: "medium" }}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            size={"large"}
            onFinish={handleSubmitPost}
            className="w-full"
          >
            <Form.Item
              label="Nama Barang"
              name="name"
              labelAlign="left"
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

            <Form.List
              name="characteristics"
              initialValue={characteristics}
              rules={[
                {
                  validator: async (_, characteristics) => {
                    if (!characteristics || characteristics.length < 1) {
                      return Promise.reject(new Error("Ciri-ciri harus diisi"));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <div key={field.key}>
                      <Form.Item
                        label={`Ciri-ciri ${index + 1}`}
                        name={[field.name, "title"]}
                        key={field.key}
                        rules={[
                          { required: true, message: "Ciri-ciri harus diisi" },
                        ]}
                      >
                        <div
                          style={{
                            justifyContent: "space-between",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Input
                            placeholder="Characteristic"
                            className="flex-1"
                          />
                          {index !== 0 ? (
                            <>
                              <div className="rounded-full shadow ml-5 w-10 h-10 flex justify-center items-center">
                                <img
                                  src={IconMinus}
                                  alt="remove"
                                  className="cursor-pointer"
                                  onClick={() => remove(field.name)}
                                />
                              </div>
                            </>
                          ) : null}
                        </div>
                      </Form.Item>
                    </div>
                  ))}

                  <Form.Item>
                    <Button
                      onClick={() => add()}
                      shape="circle"
                      block
                      className="flex flex-row justify-center items-center mx-auto"
                      type="primary"
                      icon={<img src={IconPlus} alt="add" />}
                    ></Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button
                loading={isSending}
                disabled={isSending}
                className="w-full mt-5"
                htmlType="submit"
                size="large"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </>
  );
};

export default CropedImageDialog;
