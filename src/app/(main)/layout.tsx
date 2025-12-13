import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="wrapper">{children}</div>;
};

export default MainLayout;
