import logo from "../../assets/nehpets/Nehpets logo 1.svg";
import cardImage from "../../assets/nehpets/LinkCard_one.svg";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import userAvatarImage from "../../assets/nehpets/HomeUser_Avartar.svg";
import { Box } from "@mui/system";
import { post } from "services/fetch";
import Header from "features/header/header";
import { useState } from "react";
import { useSnackbar } from "notistack";

const CoachingForm = () => {
  const { enqueueSnackbar } = useSnackbar();

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

    console.log(e.target.value);
    console.log(e.target.value);
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

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

    const res = await post({
      endpoint: `book`,
      body: { ...formdata },
      auth: false,
    });
  };

  const pay = async () => {
    // let createCustomer = {

    // };

    const res = await post({
      endpoint: `pay`,
      body: { ...paydata },
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
      <div className="w- p-5 px-20 flex justify-center">
        <div class="w-3/5">
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
              <TextField
                className="w-full"
                id="outlined-basic"
                label="IELTS EXAM DATE"
                name="ieltsExamDate"
                onChange={onChange}
                variant="outlined"
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="IELTS REGISTRATION"
                name="ieltsReg"
                onChange={onChange}
                variant="outlined"
              />
            </div>
            <div class="flex gap-6">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Purpose</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  //   value={age}
                  label="Purpose"
                  //   onChange={handleChange}
                >
                  <MenuItem value={10}>IELTS Registration</MenuItem>
                  <MenuItem value={20}>
                    IELTS Reg / Tutorial/Study Materials
                  </MenuItem>
                  <MenuItem value={30}>Consultation</MenuItem>
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

      <div className="w- p-5 px-20 flex justify-center">
        <div class="w-3/5">
          <Typography
            className="pt-8  text-center  text-bold text-primary-main "
            variant="h3"
          >
            Payment Form
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
                onChange={onChangePay}
                variant="outlined"
                className="w-full"
                name="firstName"
              />
              <TextField
                id="outlined-basic"
                label="Last Name"
                onChange={onChangePay}
                variant="outlined"
                className="w-full"
                name="lastName"
              />
            </div>
            <div class="flex gap-6">
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Amount"
                name="amount"
                onChange={onChangePay}
                variant="outlined"
              />

              <TextField
                className="w-full"
                id="outlined-basic"
                label="Email"
                name="email"
                onChange={onChangePay}
                variant="outlined"
              />
            </div>

            <Button onClick={pay} className="h-10">
              Submit Form
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};
export default CoachingForm;
