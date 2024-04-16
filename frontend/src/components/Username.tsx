import { UseAppContext } from "@/context/AppContext";

const Username = () => {
  const { currentUser } = UseAppContext();

  return (
    <p className="mb-2 text-left font-semibold">@{currentUser?.username}</p>
  );
};

export default Username;
