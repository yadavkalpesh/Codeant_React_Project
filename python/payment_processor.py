import logging

logger = logging.getLogger(__name__)


class PaymentProcessor:
    def process_payment(self, amount: float, method: str, user_verified: bool) -> bool:
        if amount <= 0:
            logger.warning("Invalid payment amount: %s", amount)
            return False

        if not user_verified:
            logger.error("Unverified user attempted payment")
            return False

        if method == "CARD":
            return self._process_card(amount)
        elif method == "UPI":
            return self._process_upi(amount)
        elif method == "WALLET":
            return self._process_wallet(amount)
        else:
            logger.error("Unsupported payment method: %s", method)
            return False

    def _process_card(self, amount: float) -> bool:
        if amount > 50000:
            logger.error("Card limit exceeded")
            return False
        return True

    def _process_upi(self, amount: float) -> bool:
        if amount > 100000:
            logger.warning("UPI large transaction")
        return True

    def _process_wallet(self, amount: float) -> bool:
        return amount <= 20000
