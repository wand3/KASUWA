from app import db
from app.models.product import Coupon

def apply_coupon_to_cart(cart_items, coupon_code):
    coupon = db.session.query(Coupon).filter_by(code=coupon_code).first()

    if not coupon or not coupon.is_valid():
        return False, "Invalid or expired coupon.", 0, 0

    total_product_price = sum(item.products_price() for item in cart_items)
    total_shipping_price = sum(item.ship_cost() for item in cart_items)

    if total_product_price < coupon.min_order_value:
        return False, f"Coupon requires a minimum order value of {coupon.min_order_value}.", 0, 0

    discounted_price = total_product_price

    if coupon.discount_type == 'percentage':
        discounted_price *= (1 - coupon.discount_value / 100)
        updated_shipping = total_shipping_price
    elif coupon.discount_type == 'fixed':
        discounted_price = max(0, total_product_price - coupon.discount_value)
        updated_shipping = total_shipping_price
    elif coupon.discount_type == 'free':
        discounted_price = total_product_price
        updated_shipping = 0

    final_price = discounted_price + updated_shipping

    return True, f"Coupon {coupon_code} applied successfully!", final_price, updated_shipping
