import logo from "../../assets/nehpets/Nehpets logo 1.svg";
import cardImage from "../../assets/nehpets/LinkCard_one.svg";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import userAvatarImage from "../../assets/nehpets/HomeUser_Avartar.svg";
import { Box } from "@mui/system";
import { post } from "services/fetch";
import Header from "features/header/header";

const CoachingForm = () => {
  const add = async () => {
    let createCustomer = {
      firstName: "Daniel",
      lastName: "Ntoe",
      mobileNumber: "08105334020",
      age: "40",
      maritalStatus: "Single",
      email: "danino@g.com",
      nationality: "nigeria",
      address: "lagos",
      country: "nigeria",
      doYouHaveChildren: "no",
      listAllMembers: "yemi, john",
      job: "Software",
      passport: "Drivers licence",
      terms: "yes",
    };
    const res = await post({
      endpoint: `customers`,
      body: { ...createCustomer },
      auth: false,
    });
  };

  return (
    <div>
      <Header />
      <div className="w- p-5 px-20 flex justify-center">
        <div class="w-3/5">
          <Typography
            className="pt-8  text-center  text-bold text-black"
            variant="h3"
          >
            Enrollment Form
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
            <div class="flex gap-6">
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                className="w-full"
              />
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                className="w-full"
              />
            </div>
            <div class="flex gap-6">
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Age"
                variant="outlined"
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Phone Number (WhatsApp)"
                variant="outlined"
              />
            </div>
            <TextField
              className="w-full"
              id="outlined-basic"
              label=" Address "
              variant="outlined"
            />
            <div class="flex gap-6">
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Nationality (Country Of Birth)"
                variant="outlined"
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Country Of Residence"
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
                variant="outlined"
              />
            </div>
           
            <Button onClick={add} className="h-10">
              Submit Form
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};
export default CoachingForm;
