import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="container py-20 md:py-36">{children}</main>;
};

export default layout;
