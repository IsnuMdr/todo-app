import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";

interface Props {
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
}

function CustomDateTimePicker(props: Props) {
  const {
    value,
    onChange,
    label,
    error,
    errorMessage,
    required = false,
  } = props;
  const [open, setOpen] = useState(false);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {label && (
        <label className="mb-2 block text-lg font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <DateTimePicker
        value={value}
        onChange={onChange}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        views={["year", "month", "day", "hours", "minutes"]}
        format="DD/MM/YYYY hh:mm A"
        slotProps={{
          textField: {
            fullWidth: true,
            onClick: () => setOpen(true),
          },
          popper: {
            sx: {
              "& .MuiPaper-root": {
                borderRadius: "16px",
                boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
              },
            },
          },
        }}
        sx={{
          "& .MuiPickersCalendarHeader-root": {
            justifyContent: "space-between",
            padding: "8px 16px",
          },
          "& .MuiPickersCalendarHeader-label": {
            fontWeight: 600,
            cursor: "pointer",
          },
          "& .MuiPickersDay-root.Mui-selected": {
            backgroundColor: "#0b3b8c",
          },
          "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "#f44336",
            },
          "& .MuiPickersInputBase-root": {
            height: "40px",
            cursor: "pointer",
            borderRadius: "8px",
          },
          "& .MuiInputBase-input": {
            padding: "8px 16px", // py-2 px-4
            fontSize: "16px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#d1d5db", // gray-300
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2563eb", // blue-600
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
            borderColor: "#2563eb",
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ef4444",
          },
        }}
      />
      {error && errorMessage && (
        <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
      )}
    </LocalizationProvider>
  );
}

export default CustomDateTimePicker;
