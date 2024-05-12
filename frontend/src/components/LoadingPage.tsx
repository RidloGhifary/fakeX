const LoadingPage = () => {
  return (
    <div className="flex h-screen items-center justify-center space-x-2 bg-black text-white dark:invert">
      <span className="sr-only">Loading...</span>
      <div className="h-8 w-8 animate-bounce rounded-full bg-white [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 animate-bounce rounded-full bg-white [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 animate-bounce rounded-full bg-white"></div>
    </div>
  );
};

export default LoadingPage;
