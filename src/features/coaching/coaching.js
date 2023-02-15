import logo from "../../assets/nehpets/Nehpets logo 1.svg";
import cardImage from "../../assets/nehpets/LinkCard_one.svg";
import { Button, Typography } from "@mui/material";
import VisaImage from "../../assets/nehpets/NephetsStudentsPic.svg";
import backgroundImage from "../../assets/nehpets/NephetsCoachingBg.svg";
import Header from "features/header/header";
import { Link } from "react-router-dom";

const Visa = () => {
  return (
    <div className=" h-[260] w-100text-[11px] ">
      <Header />
      <div
        className="h-screen "
        style={{
          background: `url('${backgroundImage}')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="px-[10%]">
        <Typography className="my-16 text-center" variant="h4">
          What You Should Know Before Your Journey Starts
        </Typography>
        <div className="flex items-start gap-2 mb-4">
          <div
            style={{
              background: `url('${VisaImage}')`,
              backgroundSize: "auto",
              backgroundRepeat: "no-repeat",
            }}
            className="w-[800px] min-h-[280px] "
          >
            {/* <img className="w-full h-full" src={VisaImage} /> */}
          </div>
          <div className="w-full text-[11px] ">
            <Typography>
              Lorem ipsum dolor sit amet consectetur. Dolor sit odio sit
              sagittis morbi senectus amet at. Ut in gravida arcu semper.
              Ultrices amet justo tellus diam sed nunc ipsum pellentesque ut.
              Cras venenatis elementum proin in ut mi integer est. Facilisi
              felis mi mattis sed tortor. Id euismod neque id tempor sed
              maecenas purus mattis. Venenatis senectus ipsum et suspendisse
              urna sapien vel facilisis tellus. Etiam nulla nisi odio molestie
              malesuada. Ornare ac est sapien diam nullam commodo aliquet. Dui
              quis nisl fermentum velit aliquam ultricies id amet. Nisl sed nunc
              vestibulum maecenas rhoncus sociis non molestie. Est eget in non
              consequat mi ornare phasellus.
            </Typography>
          </div>
        </div>
        <Typography>
          Lorem ipsum dolor sit amet consectetur. Dolor sit odio sit sagittis
          morbi senectus amet at. Ut in gravida arcu semper. Ultrices amet justo
          tellus diam sed nunc ipsum pellentesque ut. Cras venenatis elementum
          proin in ut mi integer est. Facilisi felis mi mattis sed tortor. Id
          euismod neque id tempor sed maecenas purus mattis. Venenatis senectus
          ipsum et suspendisse urna sapien vel facilisis tellus. Etiam nulla
          nisi odio molestie malesuada. Ornare ac est sapien diam nullam commodo
          aliquet. Dui quis nisl fermentum velit aliquam ultricies id amet. Nisl
          sed nunc vestibulum maecenas rhoncus sociis non molestie. Est eget in
          non consequat mi ornare phasellus.
        </Typography>
        <div>
          <div className="my-12">
            <Typography variant="h6">Visa Types</Typography>
            <Typography>
              {" "}
              <Typography>
                Lorem ipsum dolor sit amet consectetur. Dolor sit odio sit
                sagittis morbi senectus amet at. Ut in gravida arcu semper.
                Ultrices amet justo tellus diam sed nunc ipsum pellentesque ut.
                Cras venenatis elementum proin in ut mi integer est. Facilisi
                felis mi mattis sed tortor. Id euismod neque id tempor sed
                maecenas purus mattis. Venenatis senectus ipsum et suspendisse
                urna sapien vel facilisis tellus. Etiam nulla nisi odio molestie
                malesuada. Ornare ac est sapien diam nullam commodo aliquet. Dui
                quis nisl fermentum velit aliquam ultricies id amet. Nisl sed
                nunc vestibulum maecenas rhoncus sociis non molestie. Est eget
                in non consequat mi ornare phasellus.
              </Typography>
            </Typography>
          </div>
          <div className="my-12">
            <Typography variant="h6">Requirements/Countries</Typography>
            <Typography>
              {" "}
              <Typography>
                Lorem ipsum dolor sit amet consectetur. Dolor sit odio sit
                sagittis morbi senectus amet at. Ut in gravida arcu semper.
                Ultrices amet justo tellus diam sed nunc ipsum pellentesque ut.
                Cras venenatis elementum proin in ut mi integer est. Facilisi
                felis mi mattis sed tortor. Id euismod neque id tempor sed
                maecenas purus mattis. Venenatis senectus ipsum et suspendisse
                urna sapien vel facilisis tellus. Etiam nulla nisi odio molestie
                malesuada. Ornare ac est sapien diam nullam commodo aliquet. Dui
                quis nisl fermentum velit aliquam ultricies id amet. Nisl sed
                nunc vestibulum maecenas rhoncus sociis non molestie. Est eget
                in non consequat mi ornare phasellus.
              </Typography>
            </Typography>
          </div>
          <div className="my-12">
            <Typography variant="h6">How To Apply</Typography>
            <Typography>
              {" "}
              <Typography>
                Lorem ipsum dolor sit amet consectetur. Dolor sit odio sit
                sagittis morbi senectus amet at. Ut in gravida arcu semper.
                Ultrices amet justo tellus diam sed nunc ipsum pellentesque ut.
                Cras venenatis elementum proin in ut mi integer est. Facilisi
                felis mi mattis sed tortor. Id euismod neque id tempor sed
                maecenas purus mattis. Venenatis senectus ipsum et suspendisse
                urna sapien vel facilisis tellus. Etiam nulla nisi odio molestie
                malesuada. Ornare ac est sapien diam nullam commodo aliquet. Dui
                quis nisl fermentum velit aliquam ultricies id amet. Nisl sed
                nunc vestibulum maecenas rhoncus sociis non molestie. Est eget
                in non consequat mi ornare phasellus.
              </Typography>
            </Typography>
          </div>
          <div className="flex justify-end">
            <Link to='/personal-info'><Button>Book Now</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Visa;
