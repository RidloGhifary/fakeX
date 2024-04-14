import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "../ui/separator";
import PostContent from "./PostContent";
import Logo from "../../assets/fakeX.png";

const SwitchContent = () => {
  return (
    <section className="block md:hidden">
      <div className="mx-0 w-full">
        <img src={Logo} alt="logo" className="mx-auto w-[100px]" />
      </div>
      <div className="my-4">
        <Tabs defaultValue="forYou" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900 text-white">
            <TabsTrigger value="forYou">For you</TabsTrigger>
            <TabsTrigger value="follow">Follow</TabsTrigger>
          </TabsList>
          <TabsContent value="forYou">
            {Array.from(
              [1, 2, 3, 4, 5, 6].map((_, i) => (
                <div key={i}>
                  <Separator className="my-6 border-[.2px] border-gray-800" />
                  <PostContent />
                </div>
              )),
            )}
          </TabsContent>
          <TabsContent value="follow">Ups it is empty.</TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default SwitchContent;