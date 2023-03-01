import OverallTemperatureAlignment_1_5 from "../../images/TemperatureAlignment_1.5.png";
import OverallTemperatureAlignment_2_0 from "../../images/TemperatureAlignment_2.0.jpg";
import OverallTemperatureAlignment_2_5 from "../../images/TemperatureAlignment_2.5.jpg";
import OverallTemperatureAlignment_3_0 from "../../images/TemperatureAlignment_3.0.png";

const TemperatureAlignmentImage = ({ temperature }: { temperature: number }) => {
  if (temperature > 2.5) {
    return <img src={OverallTemperatureAlignment_3_0} alt="Image" />;
  } else if (temperature > 2) {
    return <img src={OverallTemperatureAlignment_2_5} alt="Image" />;
  } else if (temperature > 1.5) {
    return <img src={OverallTemperatureAlignment_2_0} alt="Image" />;
  } else {
    return <img src={OverallTemperatureAlignment_1_5} alt="Image" />;
  }
};

export default TemperatureAlignmentImage;
