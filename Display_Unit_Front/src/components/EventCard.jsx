import React from "react";

// EventCard component
export default function EventCard({ card }) {
  return (
    // Container for the event card with styling
    <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-5 max-w-sm mx-auto bg-amber-300">
      {/* Image for the event card */}
      {/* <img
        src={card.img}
        alt={card.title}
        className="absolute inset-0 h-full w-full object-cover"
      /> */}
      {/* Overlay with gradient to make text more readable */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div> */}

      {/* Title of the event */}
      <h3 className=" mt-3 text-2xl font-bold text-black">{card.title}</h3>

      {/* Description of the event */}
      <div className="gap-y-1 overflow-hidden text-sm leading-6 text-black">
        Location: {card.location}
      </div>
      <div className="gap-y-1 overflow-hidden text-sm leading-6 text-black">
        Start Time: {card.startTime}
      </div>
      <div className="gap-y-1 overflow-hidden text-sm leading-6 text-black">
        End Time: {card.endTime}
      </div>
    </article>
  );
}
