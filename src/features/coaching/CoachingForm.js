import logo from "../../assets/nehpets/Nehpets logo 1.svg";
import cardImage from "../../assets/nehpets/LinkCard_one.svg";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import userAvatarImage from "../../assets/nehpets/HomeUser_Avartar.svg";
import { Box } from "@mui/system";
import { post } from "services/fetch";
import Header from "features/header/header";
import React, { useState } from "react";
import { useSnackbar } from "notistack";

const CoachingForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [start_date, setStart_date] = React.useState();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [formdata, setFormdata] = useState({
    firstName: " ",
    lastName: " ",
    phoneNumber: " ",
    email: " ",
    address: " ",
    purpose: " ",
    ieltsReg: " ",
    ieltsExamDate: " ",
    tutorial: " ",
    studyMaterials: " ",
    consultation: " ",
    examinationLocation: " ",
  });

  const [paydata, setPaydata] = useState({
    amount: "100",
    email: "oquantoe@outlook.com",
    firstName: "Daniel",
    lastName: "Okon",
  });

  const onChange = (e) => {
    // console.log(e?.target?.value);
    // console.log(e);
    // console.log(name);

    if (e.target.name == "purpose") {
      setFormdata({
        ...formdata,
        [e.target.name]:
          e.target.value == "100,000"
            ? "IELTS Registration"
            : e.target.value == "150,000"
            ? "IELTS Reg/Tutorial/materials "
            : e.target.value == "30,000"
            ? "IELTS Tutorial"
            : "",
      });
      return;
    }

    console.log(e.target.value);
    console.log(e.target.value);
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  console.log(formdata);

  const onChangePay = (e) => {
    // console.log(e?.target?.value);
    // console.log(e);
    // console.log(name);

    console.log(e.target.value);
    console.log(e.target.value);
    setPaydata({
      ...paydata,
      [e.target.name]: e.target.value,
    });
  };

  const add = async () => {
    // let createCustomer = {

    // };

    handleClickOpen();

    const res = await post({
      endpoint: `book`,
      body: { ...formdata },
      auth: false,
    });
  };

  const pay = async () => {
    let payload = {
      amount:
        paydata.amount == "100,000"
          ? 100000
          : paydata.amount == "150,000"
          ? 150000
          : paydata.amount == "30,000"
          ? 30000
          : null,
      email: formdata.email,
      firstName: formdata.firstName,
      lastName: formdata.lastName,
    };

    const res = await post({
      endpoint: `pay`,
      body: { ...payload },
      auth: false,
    });
    console.log(res);
    if (res.status == 200) {
      enqueueSnackbar(
        res?.data?.message || "Please wait while we re-direct you to Paystack",
        {
          variant: "success",
        }
      );
      setTimeout((window.location.href = `${res?.data?.url}`), 2000);
    } else {
      enqueueSnackbar(res?.data?.message || "Something went Wrond", {
        variant: "error",
      });
    }
  };

  return (
    <div>
      <Header />
      <div className="w- p-5 md:px-20 flex justify-center">
        <div class="md:w-3/5 pt-20">
          <Typography
            className="pt-8  text-center  text-bold text-primary-main "
            variant="h3"
          >
            IELTS Enrollment Form
          </Typography>
          <Typography className="pb-8 text-center  text-bold text-black">
            This will help us send you updates and recomendations.
          </Typography>
          <Box
            className="flex flex-col "
            component="form"
            sx={{
              "& > :not(style)": { m: 1, display: "flex" },
            }}
            noValidate
            autoComplete="off"
          >
            {/* : " ", : " ", : " ", : " ", : " ", : " ", : " ", : " ", tutorial: "
            ", studyMaterials: " ", consultation: " ", : " ", */}
            <div class="flex gap-6">
              <TextField
                id="outlined-basic"
                label="First Name"
                onChange={onChange}
                variant="outlined"
                className="w-full"
                name="firstName"
              />
              <TextField
                id="outlined-basic"
                label="Last Name"
                onChange={onChange}
                variant="outlined"
                className="w-full"
                name="lastName"
              />
            </div>
            <div class="flex gap-6">
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Phone Number (WhatsApp)"
                name="phoneNumber"
                onChange={onChange}
                variant="outlined"
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Email"
                onChange={onChange}
                variant="outlined"
                name="email"
              />
            </div>
            <TextField
              className="w-full"
              id="outlined-basic"
              label=" Address "
              onChange={onChange}
              variant="outlined"
              name="address"
            />
            <div class="flex gap-6">
              {/* <TextField
                className="w-full"
                id="outlined-basic"
                label="IELTS EXAM DATE"
                name="ieltsExamDate"
                onChange={onChange}
                variant="outlined"
              /> */}

              <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <div className="flex-between">
                    <DatePicker
                      fullWidth
                      className=" mr-8 w-full"
                      label="IELTS EXAM DATE"
                      value={start_date}
                      onChange={(newValue) => {
                        // setWorkList({ ...workList, start_date: newValue });
                        setStart_date(moment(newValue).format("YYYY-MM-DD"));
                        setFormdata({
                          ...formdata,
                          ieltsExamDate: moment(newValue).format("YYYY-MM-DD"),
                        });
                        // setValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </div>
                </LocalizationProvider>
              </div>
            </div>
            <div class="flex gap-6">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Purpose</InputLabel>
                <Select
                  name="purpose"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={formdata.purpose}
                  label="Purpose"
                  onChange={(e) => {
                    setPaydata({ amount: e.target.value });
                    onChange(e);
                  }}
                >
                  <MenuItem value={"100,000"}>IELTS Registration</MenuItem>
                  <MenuItem value={"30,000"}>IELTS Tutorial</MenuItem>
                  <MenuItem value={"150,000"}>
                    IELTS Reg/Tutorial/materials 
                  </MenuItem>
                </Select>
              </FormControl>
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Examination Location"
                onChange={onChange}
                variant="outlined"
                name="examinationLocation"
              />
            </div>
            <Button onClick={add} className="h-10">
              Submit Form
            </Button>
          </Box>
        </div>
      </div>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="lg"
          style={{ width: "" }}
          className=""
        >
          <DialogTitle id="alert-dialog-title"> Payment Form</DialogTitle>
          <DialogContent className="w-full ">
            <div className="py-5 md:px-20 flex justify-center">
              <div class="md:w-3/5 w-full">
                <Typography
                  className="py-8 text-center  text-bold text-primary-main "
                  variant="h5"
                >
                  You are Paying For {formdata.purpose}
                </Typography>

                <Box
                  className="flex flex-col"
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, display: "flex" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                
                  <div class="flex flex-col md:flex-row gap-6">
                    <TextField
                      disabled
                      fullWidth
                      value={formdata.firstName}
                      id="outlined-basic"
                      label="First Name"
                      // onChange={onChangePay}
                      variant="outlined"
                      className="w-full"
                      name="firstName"
                    />
                    <TextField
                      value={formdata.lastName}
                      disabled
                      id="outlined-basic"
                      label="Last Name"
                      // onChange={onChangePay}
                      variant="outlined"
                      className="w-full"
                      name="lastName"
                    />
                  </div>
                  <div class="flex gap-6 flex-col md:flex-row ">
                    <TextField
                      value={`${paydata.amount} naira`}
                      disabled
                      className="w-full"
                      id="outlined-basic"
                      label="Amount"
                      name="amount"
                      onChange={onChangePay}
                      variant="outlined"
                    />

                    <TextField
                      disabled
                      value={formdata.email}
                      className="w-full"
                      id="outlined-basic"
                      label="Email"
                      name="email"
                      onChange={onChangePay}
                      variant="outlined"
                    />
                  </div>

                  <Button onClick={pay} className="h-10 rounded-full">
                    Make Payment
                  </Button>
                </Box>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
export default CoachingForm;
