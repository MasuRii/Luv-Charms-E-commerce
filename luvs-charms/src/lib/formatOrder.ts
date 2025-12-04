import { CartItem } from '@/context/CartContext';

/**
 * Generates a unique reference ID for the order
 * Format: #ORD-YYMMDD-XXXX (XXXX = 4-digit random number)
 */
function generateReferenceId(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
  
  return `#ORD-${year}${month}${day}-${random}`;
}

/**
 * Formats cart items into a readable order message
 * @param cartItems - Array of cart items
 * @param totalPrice - Total price of the order
 * @returns Formatted order string ready to send via messaging apps
 */
export function formatOrder(cartItems: CartItem[], totalPrice: number): string {
  const referenceId = generateReferenceId();
  
  // Build the header
  let message = `🛍️ *New Order from Luv's Charms!*\n\n`;
  message += `📋 *Order Reference:* ${referenceId}\n`;
  message += `📅 *Date:* ${new Date().toLocaleDateString()}\n\n`;
  
  // Add items
  message += `*Items:*\n`;
  message += `${'─'.repeat(40)}\n`;
  
  cartItems.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    message += `${index + 1}. *${item.name}*\n`;
    message += `   Qty: ${item.quantity} × $${item.price.toFixed(2)} = $${itemTotal.toFixed(2)}\n\n`;
  });
  
  // Add total
  message += `${'─'.repeat(40)}\n`;
  message += `*Total: $${totalPrice.toFixed(2)}*\n\n`;
  
  // Add footer
  message += `📞 Please confirm availability and delivery details.\n`;
  message += `Thank you for shopping with Luv's Charms! 💕`;
  
  return message;
}