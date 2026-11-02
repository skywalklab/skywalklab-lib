import { getContext, setContext } from "svelte";

export const defaultLabels = {
  previousSlide: "Go to previous slide",
  nextSlide: "Go to next slide",
  showSlide: (n: number) => `Show slide ${n}`,
  linearCarousel: "Linear carousel",
  carousel: "carousel",
  slideshow: "Slideshow",
  slideOf: (n: number, total: number) => `Slide ${n} of ${total}`,
  previousTestimonials: "Previous testimonials",
  nextTestimonials: "Next testimonials",
  previousImage: "Previous image",
  nextImage: "Next image",
  close: "Close",
  openContactMenu: "Open Contact Menu",
  aiChat: (company: string) => `${company} AI Chat`,
  openChatbot: (company: string) => `Open ${company} Chatbot`,
  copyMessage: "Copy message",
  scrollToBottom: "Scroll to bottom",
  sendMessage: "Send message",
  removeMessage: "Remove message",
  goTo: (key: string) => `Go to ${key}`,
  openHours: "Open hours",
  goToHomepage: "Go to homepage",
  mainNav: "Main",
  breadcrumb: "Breadcrumb",
  openItem: "Open Item",
  clearForm: "Clear form",
  backToTop: "Back to top"
};

export type LibraryLabels = typeof defaultLabels;

const key = Symbol("skywalklab-labels");

export const setLibraryLabels = (labels: Partial<LibraryLabels>) => {
  setContext(key, { ...defaultLabels, ...labels });
};

export const getLibraryLabels = (): LibraryLabels => getContext<LibraryLabels>(key) ?? defaultLabels;
