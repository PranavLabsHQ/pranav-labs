export const projectInquiryMessage =
  "Hi! Pranav Labs, I'm interested in discussing a software project.";

export function getWhatsAppHref(message = projectInquiryMessage) {
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918421723728";
  const businessNumber = rawNumber.replace(/[^\d]/g, "");
  const encodedMessage = encodeURIComponent(message).replace(/'/g, "%27");

  return `https://wa.me/${businessNumber}?text=${encodedMessage}`;
}

export function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}
