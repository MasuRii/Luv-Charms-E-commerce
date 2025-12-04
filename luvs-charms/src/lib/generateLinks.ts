/**
 * Interface for messaging app links
 */
export interface MessagingLinks {
  whatsapp: string;
  messenger: string;
}

/**
 * Generates deep links for WhatsApp and Messenger
 * @param message - The formatted order message to send
 * @returns Object containing WhatsApp and Messenger URLs
 */
export function generateLinks(message: string): MessagingLinks {
  // URL encode the message for proper transmission
  const encodedMessage = encodeURIComponent(message);
  
  // Get environment variables (these should be set in .env.local)
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
  const messengerUsername = process.env.NEXT_PUBLIC_MESSENGER_USERNAME || '';
  
  // Generate WhatsApp link
  // Format: https://wa.me/[number]?text=[encoded_message]
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    : `https://wa.me/?text=${encodedMessage}`;
  
  // Generate Messenger link
  // Note: m.me with pre-filled messages is deprecated/unreliable
  // We just open the chat - user will need to paste the message
  const messengerUrl = messengerUsername
    ? `https://m.me/${messengerUsername}`
    : 'https://www.messenger.com/';
  
  return {
    whatsapp: whatsappUrl,
    messenger: messengerUrl,
  };
}

/**
 * Copies text to clipboard
 * @param text - The text to copy
 * @returns Promise that resolves when text is copied
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Failed to copy text:', err);
      throw new Error('Failed to copy to clipboard');
    } finally {
      document.body.removeChild(textArea);
    }
  }
}