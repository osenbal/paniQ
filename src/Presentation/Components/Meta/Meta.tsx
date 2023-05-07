import React from "react";
import { Helmet } from "react-helmet";

type MetaProps = {
  children?: React.ReactNode;
};

const Meta: React.FC<MetaProps> = ({ children }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="Web Untuk Membantu Mahasiswa UIN Jakarta Dalam Mencari Barang Yang Hilang"
      />
      {children}
    </Helmet>
  );
};

export default Meta;
