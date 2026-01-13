/**
 * Order processing utility
 * Demonstrates:
 * - Input validation
 * - Async operations
 * - Higher-order functions
 * - Error handling
 * - Complex branching logic
 */

/**
 * Simulates fetching tax rate from an external service
 */
async function fetchTaxRate(country) {
  const taxTable = {
    IN: 0.18,
    US: 0.07,
    UK: 0.2
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!taxTable[country]) {
        reject(new Error("Unsupported country"));
      }
      resolve(taxTable[country]);
    }, 200);
  });
}

/**
 * Main complex function
 */
async function processOrder(order, discountFn = () => 0) {
  if (!order || !Array.isArray(order.items)) {
    throw new Error("Invalid order format");
  }

  if (order.items.length === 0) {
    return {
      total: 0,
      tax: 0,
      payable: 0,
      message: "No items in order"
    };
  }

  // Calculate base price
  const baseTotal = order.items.reduce((sum, item) => {
    if (!item.price || !item.quantity || item.price < 0) {
      throw new Error(`Invalid item: ${JSON.stringify(item)}`);
    }
    return sum + item.price * item.quantity;
  }, 0);

  // Apply discount (higher-order function)
  const discount = discountFn(baseTotal);
  const discountedTotal = Math.max(baseTotal - discount, 0);

  let taxRate;
  try {
    taxRate = await fetchTaxRate(order.country);
  } catch (err) {
    taxRate = 0; // fallback logic
  }

  const tax = discountedTotal * taxRate;
  const payable = discountedTotal + tax;

  return {
    baseTotal,
    discount,
    taxRate,
    tax,
    payable,
    currency: order.currency || "INR",
    status: payable > 0 ? "SUCCESS" : "FREE_ORDER"
  };
}

/**
 * Example discount function
 */
function seasonalDiscount(total) {
  if (total > 5000) return total * 0.15;
  if (total > 2000) return total
