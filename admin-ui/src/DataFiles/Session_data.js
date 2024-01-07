export const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 1024 },
        items: 3,
        slidesToSlide: 1,
    },
    desktop: {
        breakpoint: { max: 1024, min: 800 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 800, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

export const sessionData = [
    {
        id: 1,
        imageurl:
            "data:image/jpeg;base64,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",
        Sname: "Emerging Trends in Frontend Development",
        presenterName: "Alex Johnson",
        time: "1 hour",
    },
    {
        id: 2,
        imageurl:
            "data:image/jpeg;base64,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",
        Sname: "Effective Team Collaboration in Tech",
        presenterName: "Laura Gomez",
        time: "30 minutes",
    },
    {
        id: 3,
        imageurl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBCK1dMRc6QDPXou3zyhcYdeplbHF4EGRCYw&usqp=CAU",
        Sname: "Advanced JavaScript Techniques",
        presenterName: " Carlos Rodriguez",
        time: "1 hour 30 minutes",
    },
    {
        id: 4,
        imageurl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe6x1O7c-QrFmvO8DIn4fW79gmCcAsUMTmPQ&usqp=CAU",
        Sname: "Cloud Computing for Developers",
        presenterName: "Omar Farooq",
        time: "30 minutes",
    },
    {
        id: 5,
        imageurl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWlBh-javXM6tYmARTZccgOCmR3wmSxdZzVA&usqp=CAU",
        Sname: "Introduction to AI for Web Developers",
        presenterName: "Omar Farooq",
        time: "30 minutes",
    },
    {
        id: 6,
        imageurl:
            "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        Sname: "Mastering TypeScript: Tips and Tricks",
        presenterName: "Sarah Kim",
        time: "45 minutes",
    },
    {
        id: 7,
        imageurl:
            "https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        Sname: "Deep Dive into Rust Programming",
        presenterName: "Raj Patel",
        time: "2 hours",
    },
    {
        id: 8,
        imageurl:
            "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        Sname: "Agile Methodologies Explained",
        presenterName: "Kevin Lee",
        time: "45 minutes",
    },
];