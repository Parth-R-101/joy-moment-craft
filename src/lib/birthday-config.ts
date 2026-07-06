// ============================================================
//  Birthday Surprise — Customizable Content
//  Replace text below, and drop files into the /public folders.
//  No code changes required.
// ============================================================

export const config = {
  // Password to unlock the site (leave empty "" to disable).
  password: "birthday",

  // Recipient
  name: "My Best Friend",

  // Landing message shown before the gift button
  landingMessage: "A little surprise made just for you...",

  // Background music file (place in /public/music/)
  musicFile: "/music/song.mp3",

  // Photo memories feed — files go in /public/photos/
  photos: [
    { src: "/photos/1.jpg", title: "Our First Photo", caption: "Where it all began.", date: "Jan 2020" },
    { src: "/photos/2.jpg", title: "Sunset Walks", caption: "Golden hours with you.", date: "Jun 2021" },
    { src: "/photos/3.jpg", title: "Late Night Talks", caption: "Endless laughter.", date: "Sep 2022" },
    { src: "/photos/4.jpg", title: "Little Adventures", caption: "Every day is a memory.", date: "May 2023" },
  ],

  // Vertical videos (9:16) — files go in /public/videos/
  videos: [
    { src: "/videos/1.mp4", caption: "That one dance 💃" },
    { src: "/videos/2.mp4", caption: "You being iconic ✨" },
  ],

  // Timeline items
  timeline: [
    { title: "First Meeting", text: "The day our story started." },
    { title: "First Trip", text: "Getting lost, together." },
    { title: "Funniest Day", text: "We still can't stop laughing." },
    { title: "College Memories", text: "Chapters we'll never forget." },
    { title: "Birthday Celebration", text: "Today. This moment. You." },
  ],

  // Handwritten letter (rendered with a typewriter effect)
  letter: `Dear friend,

Today is your day, and I wanted to give you something a little different.
Not a gift wrapped in paper, but wrapped in every memory we've made together.

You are the kind of person the world becomes softer around.
Thank you for your laugh, your patience, your loyalty, and your light.

Happy Birthday. Here's to another year of us.

— With love, always.`,

  // Photo gallery carousel — files go in /public/gallery/
  gallery: [
    "/gallery/1.jpg",
    "/gallery/2.jpg",
    "/gallery/3.jpg",
    "/gallery/4.jpg",
    "/gallery/5.jpg",
  ],

  // Polaroid wall — files go in /public/polaroids/
  polaroids: [
    "/polaroids/1.jpg",
    "/polaroids/2.jpg",
    "/polaroids/3.jpg",
    "/polaroids/4.jpg",
    "/polaroids/5.jpg",
    "/polaroids/6.jpg",
  ],

  // 10 reasons (flip cards)
  reasons: [
    { title: "Reason 01", text: "Your laugh could power a city." },
    { title: "Reason 02", text: "You listen — really listen." },
    { title: "Reason 03", text: "You make ordinary days feel special." },
    { title: "Reason 04", text: "You're braver than you know." },
    { title: "Reason 05", text: "Your kindness is a superpower." },
    { title: "Reason 06", text: "You show up, always." },
    { title: "Reason 07", text: "You make me a better human." },
    { title: "Reason 08", text: "Your taste in everything: elite." },
    { title: "Reason 09", text: "You turn chaos into memories." },
    { title: "Reason 10", text: "You're simply, wonderfully you." },
  ],

  // Ending
  endingMessage: "Thank you for being such an amazing friend ❤️",
};
