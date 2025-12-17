
const Empty = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground border border-dashed rounded-xl">
      <div className="text-lg font-semibold mb-2">هیچ پیامی وجود ندارد</div>
      <div className="text-sm">
        هنوز با کسی چت نکرده‌اید. پیام بدهید تا اینجا پر شود!
      </div>
    </div>
  );
};

export default Empty;
