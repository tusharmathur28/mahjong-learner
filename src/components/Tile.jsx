import React from 'react';

export const Tile = ({ data, size = 'medium', onClick, isSelected }) => {
    const isLarge = size === 'large';
    const imagePath = data.image;

    // Dimensions
    const dimensions = isLarge ? 'w-32 h-44' : 'w-20 h-28';

    return (
        <div
            className={`
                relative group cursor-pointer select-none
                ${dimensions}
                transition-transform duration-200
                ${isSelected ? 'scale-110' : 'hover:-translate-y-1 hover:shadow-2xl'}
                active:scale-95
            `}
            onClick={onClick}
        >
            <div className={`
                w-full h-full rounded-xl overflow-hidden shadow-lg 
                bg-white border-2 border-slate-200
                flex items-center justify-center
            `}>
                <img
                    src={imagePath}
                    alt={data.meaning}
                    className="w-full h-full object-contain p-1"
                    draggable={false}
                />
            </div>

            {/* Visual shine/glare effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
        </div>
    );
};
