import { UseAppContext } from "@/context/AppContext";
import User from "../assets/user.png";

const ProfilePicture = () => {
  const { currentUser } = UseAppContext();

  return (
    <img
      src={currentUser?.profile_picture || User}
      alt={currentUser?.username || "user-photo"}
      className="h-10 w-10 rounded-full border object-cover"
      loading="lazy"
    />
  );
};

export default ProfilePicture;
