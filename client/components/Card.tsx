import React from 'react';

interface CardProps {
    title: string;
    icon?: string;
    color?: string;
    link: string;
    iconStyle?: boolean;
}
export const Card = ({
    title,
    icon,
    link,
    color = 'white',
    iconStyle = false,
}: CardProps) => {
    return (
        <a href={link} style={{ textDecoration: 'none' }}>
            <div
                className="card shadow rounded py-4 text-center"
                style={{ backgroundColor: color }}
            >
                <div className={`mb-2 ${!iconStyle ? 'icon' : 'platform'}`}>
                    <img src={icon} alt={title} />
                </div>
                <b>{title}</b>
            </div>
        </a>
    );
};
