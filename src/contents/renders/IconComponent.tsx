'use client'
import React from 'react';

interface IconComponentProps {
    Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    width?: number;
    height?: number;
    className?: string;
    color?: string;
}

export const IconComponent: React.FC<IconComponentProps> = ({
                                                                Icon,
                                                                width = 24,
                                                                height = 24,
                                                                color = "black",
                                                                className,

                                                            }) => {
    return <Icon style={{height, width}} className={className} color={color}/>;
};
