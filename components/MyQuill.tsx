"use client";

import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "./quill.css";

interface Props {
  value: string;
  setValue: (val: string) => void;
  disabled?: boolean;
}

const MyQuill = ({ value, setValue, disabled = false }: Props) => {
  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    // ["link", "image"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <ReactQuill readOnly={disabled} modules={modules} value={value} onChange={setValue} className="h-[50vh] w-full" />
  );
};

export default MyQuill;
