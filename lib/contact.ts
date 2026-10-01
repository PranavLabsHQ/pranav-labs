export const projectInquiryMessage =
  "Hi Pranav Labs,\n\nI'm interested in discussing a software project.";

export function getWhatsAppHref(message = projectInquiryMessage) {
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "910000000000";
  const businessNumber = rawNumber.replace(/[^\d]/g, "");

  return `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;
}

export function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}
