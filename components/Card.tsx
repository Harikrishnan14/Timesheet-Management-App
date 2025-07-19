import React from "react";

interface CardProps {
    children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-8 w-full">
            {children}
        </div>
    );
};

export default Card;
