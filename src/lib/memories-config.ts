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
    { src: "/photos/1.jpg", title: "Our First Photo", caption: "Where it all began.", date: "Jan 2020" },
    { src: "/photos/2.jpg", title: "Sunset Walks", caption: "Golden hours with you.", date: "Jun 2021" },
    { src: "/photos/3.jpg", title: "Late Night Talks", caption: "Endless laughter.", date: "Sep 2022" },
    { src: "/photos/4.jpg", title: "Little Adventures", caption: "Every day is a memory.", date: "May 2023" },
  ],
  videos: [
    { src: "/videos/1.mp4", caption: "That one dance 💃" },
    { src: "/videos/2.mp4", caption: "You being iconic ✨" },
  ],
  letter: `Dear friend,

Today is your day, and I wanted to give you something a little different.
Not a gift wrapped in paper, but wrapped in every memory we've made together.

You are the kind of person the world becomes softer around.
Thank you for your laugh, your patience, your loyalty, and your light.

Happy Birthday. Here's to another year of us.

— With love, always.`,
  gallery: [
    { src: "/gallery/1.jpg", alt: "A cherished memory", caption: "A cherished memory" },
    { src: "/gallery/2.jpg", alt: "A bright little moment", caption: "A bright little moment" },
    { src: "/gallery/3.jpg", alt: "A soft sunset scene", caption: "A soft sunset scene" },
    { src: "/gallery/4.jpg", alt: "A favorite laugh", caption: "A favorite laugh" },
    { src: "/gallery/5.jpg", alt: "A timeless keepsake", caption: "A timeless keepsake" },
  ],
  polaroids: [
    { src: "/polaroids/1.jpg", label: "memory 01", caption: "One of the sweetest moments" },
    { src: "/polaroids/2.jpg", label: "memory 02", caption: "A little sparkle in the everyday" },
    { src: "/polaroids/3.jpg", label: "memory 03", caption: "A reminder of our favorite laughter" },
    { src: "/polaroids/4.jpg", label: "memory 04", caption: "A quiet, beautiful chapter" },
    { src: "/polaroids/5.jpg", label: "memory 05", caption: "A soft glow of friendship" },
    { src: "/polaroids/6.jpg", label: "memory 06", caption: "Something I never want to lose" },
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
