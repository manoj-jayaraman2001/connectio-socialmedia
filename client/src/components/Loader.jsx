export const SpinLoader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary"></div>
    </div>
  );
};

export const SmallLoader = ()=>{
    return (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-3 w-3 border-t-4 border-white"></div>
        </div>
      );
}

export const DotLoader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex space-x-2">
        <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
        <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
        <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};
