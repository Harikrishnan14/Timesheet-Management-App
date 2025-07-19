import React from "react";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-[calc(100vh-68px)] bg-[#F8F8F8] py-10 px-28">
            {children}
        </div>
    );
};

export default MainLayout;
