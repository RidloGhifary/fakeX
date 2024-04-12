import User from "../../assets/user.png";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import UserContent from "./UserContent";

const ProfileComp = () => {
  return (
    <section className="mx-auto max-w-[600px] px-3 pb-20 pt-4 md:px-0 md:py-20 md:pb-0">
      <section className="flex items-center justify-between">
        <h1 className="text-4xl">@rdllghifary_</h1>
        <img src={User} alt="user-photo" className="w-[120px]" />
      </section>
      <section className="font-light">
        <p className="font-medium text-white/50">Ridlo achmad ghifary</p>
        <p>
          lorem ipsum doler sir amet
          <br />
          lorem ipsum doler
          <br />
          lorem ipsum
        </p>

        <div className="my-7 flex items-center gap-4">
          <div className="relative flex items-center">
            <img src={User} alt="user-photo" className="w-[20px]" />
            <img
              src={User}
              alt="user-photo"
              className="absolute left-[50%] w-[20px]"
            />
          </div>
          <p className="text-sm font-medium text-white/50">234 followers</p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button className="w-[50%] bg-white/10 transition hover:scale-105 hover:bg-white/10">
            Edit profile
          </Button>
          <Button className="w-[50%] bg-white/10 transition hover:scale-105 hover:bg-white/10">
            Share profile
          </Button>
        </div>
      </section>

      <section className="py-7">
        <h1 className="text-center text-xl uppercase">your post</h1>
        {Array.from(
          [1, 2, 3, 4, 5, 6].map((_, i) => (
            <div key={i} className="">
              <Separator className="my-6 border-[.2px] border-gray-800" />
              <UserContent />
            </div>
          )),
        )}
      </section>
    </section>
  );
};

export default ProfileComp;
