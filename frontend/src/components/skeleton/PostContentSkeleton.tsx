import { Skeleton } from "@/components/ui/skeleton";

const PostContentSkeleton = () => {
  return (
    <div className="flex items-start justify-start gap-2">
      <Skeleton className="h-10 w-11 rounded-full" />
      <div className="flex w-full flex-col space-y-4">
        <Skeleton className="h-[125px] rounded-xl" />
        <div className="flex items-center justify-start space-x-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  );
};

export default PostContentSkeleton;
