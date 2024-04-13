import User from "../../../assets/user.png";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";
import { ChangeEvent } from "react";

interface Props {
  textPostComment: string;
  handleChangePostComment: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmitPostComment: () => void;
}

const Comment = ({
  textPostComment,
  handleChangePostComment,
  handleSubmitPostComment,
}: Props) => {
  return (
    <div className="cursor-pointer rounded-full p-1 hover:scale-105">
      <Dialog>
        <DialogTrigger>
          <MessageCircle />
        </DialogTrigger>
        <DialogContent className="border-white/50 bg-black text-white">
          <DialogHeader>
            <DialogTitle>
              <div className="flex justify-start gap-4 overflow-hidden">
                <section className="flex flex-none flex-col items-center gap-4">
                  <img
                    src={User}
                    alt="user-photo"
                    className="w-10 rounded-full border"
                  />
                  <Separator
                    orientation="vertical"
                    className="h-[74%] border-[.2px] border-gray-800"
                  />
                </section>
                <section>
                  <p className="font-semibold">@rdllghifary_</p>
                  <p className="mt-2 line-clamp-3 text-sm font-light leading-normal">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repudiandae praesentium libero natus distinctio inventore
                    atque deserunt voluptas
                  </p>
                </section>
              </div>
              <div className="mt-4 flex justify-start gap-4 overflow-hidden">
                <section className="flex flex-none flex-col items-center gap-4">
                  <img
                    src={User}
                    alt="user-photo"
                    className="w-10 rounded-full border"
                  />
                  <Separator
                    orientation="vertical"
                    className="h-[74%] border-[.2px] border-gray-800"
                  />
                </section>
                <section className="flex-1">
                  <div className="w-full">
                    <p className="mb-2 text-left font-semibold">
                      @your_account
                    </p>
                    <Textarea
                      autoFocus={true}
                      value={textPostComment}
                      minLength={1}
                      maxLength={500}
                      onChange={handleChangePostComment}
                      contentEditable={true}
                      placeholder="Write for posting..."
                      className="h-auto min-h-[80px] w-full resize-none border-0 bg-transparent px-0 font-light focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-sm font-medium text-white/50">
                      add to public
                    </p>
                    <Button
                      disabled={textPostComment === ""}
                      onClick={handleSubmitPostComment}
                      className="rounded-full bg-white font-bold uppercase text-black transition  hover:bg-white/80 hover:text-black disabled:cursor-not-allowed disabled:bg-white/50"
                    >
                      post
                    </Button>
                  </div>
                </section>
              </div>
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Comment;
