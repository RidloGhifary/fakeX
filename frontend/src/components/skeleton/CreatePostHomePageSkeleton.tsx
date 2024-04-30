import { Skeleton } from "@/components/ui/skeleton";

const CreatePostHomePageSkeleton = () => {
  return (
    <div className="flex items-center justify-start gap-2">
      <Skeleton className="h-10 w-11 rounded-full" />
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  );
};

export default CreatePostHomePageSkeleton;
