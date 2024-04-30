import { CornerDownLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <CornerDownLeft
      onClick={handleGoBack}
      className="cursor-pointer transition hover:scale-105"
    />
  );
};

export default BackButton;
