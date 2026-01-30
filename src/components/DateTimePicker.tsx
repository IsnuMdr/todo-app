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
            error: error,
            helperText: error ? errorMessage : undefined,
            onClick: () => setOpen(true),
            style: { cursor: "pointer" },
            InputProps: {
              className:
                "w-full px-4 rounded-lg border py-2 transition focus:border-2 focus:border-blue-500 focus:outline-none focus:ring-transparent " +
                (error ? "border-red-500" : "border-gray-300"),
              sx: {
                "& svg": {
                  fontSize: 20,
                  width: 20,
                  height: 20,
                },
              },
            },
            inputProps: {
              className: "px-0 py-0 h-auto text-base",
            },
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
        }}
      />
    </LocalizationProvider>
  );
}

export default CustomDateTimePicker;
