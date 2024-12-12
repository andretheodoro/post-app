import React, { useState, useRef } from 'react';

interface TooltipWithHighlightProps {
    text: string;
    notes: Note[];
    position: string;
}

interface Note {
    id: number;
    postId: number;
    start: number;
    end: number;
    text: string;
}

const TooltipWithHighlight: React.FC<TooltipWithHighlightProps> = ({
    text,
    notes,
    position = 'top',
}) => {
    const [visible, setVisible] = useState(false);
    const [activeNote, setActiveNote] = useState<Note | null>(null);
    const highlightedTextRef = useRef<HTMLSpanElement | null>(null);

    const tooltipStyles: React.CSSProperties = {
        position: 'absolute',
        padding: '5px 10px',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        color: '#fff',
        borderRadius: '4px',
        fontSize: '12px',
        whiteSpace: 'nowrap',
        visibility: visible ? 'visible' : 'hidden',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        zIndex: 10,
    };

    const positionStyles: React.CSSProperties = {
        top: position === 'top' ? '-30px' : undefined,
        bottom: position === 'bottom' ? '-30px' : undefined,
        left: position === 'left' ? '-20px' : undefined,
        right: position === 'right' ? '-20px' : undefined,
    };

    const handleMouseEnter = (note: Note) => {
        setVisible(true);
        setActiveNote(note);
    };

    const handleMouseLeave = () => {
        setVisible(false);
        setActiveNote(null);
    };

    let currentIndex = 0;
    const elements: JSX.Element[] = [];

    const sortedNotes = [...notes].sort((a, b) => a.start - b.start);
    sortedNotes.forEach((note) => {
        if (note.start >= currentIndex) {
            elements.push(<span key={`before-${note.id}`}>{text.slice(currentIndex, note.start)}</span>

                // elements.push(<span key={`before-${(link unavailable)} `}>{text.slice(currentIndex, note.start)}</span>
            );
        }

        elements.push(
            <span
                ref={highlightedTextRef}
                className="high"
                style={{
                    backgroundColor: 'yellow',
                    cursor: 'pointer',
                    position: 'relative',
                    display: 'inline-block',
                }}
                onMouseEnter={() => handleMouseEnter(note)}
                onMouseLeave={handleMouseLeave}
            >
                {text.slice(note.start, note.end)}
                {visible && activeNote?.id === note.id && (
                    <div
                        style={{
                            ...tooltipStyles,
                            top: highlightedTextRef.current
                                ? highlightedTextRef.current.getBoundingClientRect().top +
                                window.scrollY -
                                30
                                : undefined,
                            left: highlightedTextRef.current
                                ? highlightedTextRef.current.getBoundingClientRect().left +
                                window.scrollX -
                                20
                                : undefined,
                            ...positionStyles,
                        }}
                    >
                        {note.text}
                    </div>
                )}
            </span>
        );

        currentIndex = note.end;
    });

    elements.push(<span key="after">{text.slice(currentIndex)}</span>);

    return <>{elements}</>;
};

export default TooltipWithHighlight;