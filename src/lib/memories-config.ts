export interface SectionCopy {
  overline: string;
  title: string;
}

export interface MemoryPhoto {
  src: string;
  title: string;
  caption: string;
  date: string;
}

export interface MemoryVideo {
  src: string;
  caption: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
}

export interface PolaroidItem {
  src: string;
  label: string;
  caption: string;
}

export interface OpeningCopy {
  introLine: string;
  message: string;
  inputPlaceholder: string;
  buttonLabel: string;
  hint: string;
  revealTitle: string;
  revealText: string;
  loadingText: string;
  giftButtonLabel: string;
  scrollHint: string;
}

export interface BirthdayConfig {
  password: string;
  name: string;
  landingMessage: string;
  musicFile: string;
  opening: OpeningCopy;
  photos: MemoryPhoto[];
  videos: MemoryVideo[];
  letter: string;
  gallery: GalleryItem[];
  polaroids: PolaroidItem[];
  endingMessage: string;
  sections: {
    photoMemories: SectionCopy;
    videos: SectionCopy;
    letter: SectionCopy;
    gallery: SectionCopy;
    polaroids: SectionCopy;
    ending: SectionCopy;
  };
}

export const memoriesConfig: BirthdayConfig = {
  password: "birthday",
  name: "My Best Friend",
  landingMessage: "A little surprise made just for you...",
  musicFile: "/music/song.mp3",
  opening: {
    introLine: "✨ Happy Birthday Riya✨",
    message: "I hope u like the gift i made for u! it’s a lil something to celebrate today and all the memories we’ve shared. 💖. ",
    inputPlaceholder: "secret word",
    buttonLabel: "Open the gift",
    hint: "Hint: it’s about today ✨",
    revealTitle: "The surprise is opening...",
    revealText: "A little magic is on its way.",
    loadingText: "Preparing your surprise…",
    giftButtonLabel: "Open Your Birthday Gift 🎁",
    scrollHint: "scroll gently ↓",
  },
  photos: [
    { src: "/photos/photo1.jpeg", title: "", caption: "", date: "" },
    { src: "/photos/photo2.jpeg", title: "", caption: "", date: "" },
    { src: "/photos/photo3.jpeg", title: "", caption: "Endless laughter.", date: "" },
    { src: "/photos/photo4.jpeg", title: "", caption: "", date: "" },
  ],
  videos: [
    { src: "/videos/video1.mp4", caption: "That one dance 💃" },
    { src: "/videos/video2.mp4", caption: "You being iconic ✨" },
  ],
  letter: `Dear friend,
Happy Birthday, Riya! ❤️
13 years... that's almost a lifetime of memories, and I honestly can't imagine my life without you in it. From being silly kids to growing up together, you've been my constant through every phase. Thank you for always being there—for the laughs, the random gossip, the endless support, and for making even ordinary days feel special.I'm so grateful that I got a best friend like you. No matter where life takes us, I hope we always stay this close. You deserve all the happiness, love, success, and everything beautiful this world has to offer.
Here's to many more birthdays, countless memories, and growing old while still behaving like the same crazy best friends we've always been. 😂❤️
I love you so much. Happy Birthday once again, Riya! Have the most amazing day—you deserve nothing less. 🫂🎂✨
Also please develop a good taste in men! `,
  gallery: [
    { src: "/gallery/gallery1.jpeg", alt: "A cherished memory", caption: "A cherished memory" },
    { src: "/gallery/gallery2.jpeg", alt: "A bright little moment", caption: "" },
    { src: "/gallery/gallery3.jpeg", alt: "A soft sunset scene", caption: "" },
    // { src: "/gallery/4.jpg", alt: "A favorite laugh", caption: "A favorite laugh" },
    // { src: "/gallery/5.jpg", alt: "A timeless keepsake", caption: "A timeless keepsake" },
  ],
  polaroids: [
    { src: "/polaroids/polaroids1.jpeg", label: "memory 01", caption: "" },
    { src: "/polaroids/polaroids2.jpeg", label: "memory 02", caption: "" },
    { src: "/polaroids/polaroids3.jpeg", label: "memory 03", caption: "" },
    { src: "/polaroids/polaroids4.jpeg", label: "memory 04", caption: "" },
    // { src: "/polaroids/5.jpg", label: "memory 05", caption: "" },
    // { src: "/polaroids/6.jpg", label: "memory 06", caption: "" },
  ],
  endingMessage: "Thank you for being such an amazing friend ❤️",
  sections: {
    photoMemories: { overline: "feed", title: "Photo Memories" },
    videos: { overline: "reels", title: "Little Moments" },
    letter: { overline: "from me to you", title: "A Letter" },
    gallery: { overline: "album", title: "Gallery" },
    polaroids: { overline: "scrapbook", title: "Polaroid Wall" },
    ending: { overline: "the end", title: "Happy Birthday Riya💕" },
  },
};

export const config = memoriesConfig;
