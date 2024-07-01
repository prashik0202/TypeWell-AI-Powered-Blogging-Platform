import React from "react";

const ProfilPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen container py-20 md:py-32">{children}</div>
  );
};

export default ProfilPageLayout;
