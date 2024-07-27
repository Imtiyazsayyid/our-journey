import Image from "next/image";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  value: Date | null;
  onChange: (value: Date | null) => void;
  containerClass?: string;
}

const MyDatePicker = ({ value, onChange, containerClass }: Props) => {
  return (
    <div className={`flex rounded-md border border-dark-500 bg-dark-400 ${containerClass}`}>
      <Image src="/assets/icons/calendar.svg" height={24} width={24} alt="calender" className="ml-2" />
      <DatePicker
        selected={value}
        onChange={(date) => onChange(date)}
        dateFormat={"dd MMMM, yyyy"}
        wrapperClassName="date-picker"
      />
    </div>
  );
};

export default MyDatePicker;
