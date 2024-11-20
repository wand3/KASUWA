from app import db
from app.models.product import Coupon

def apply_coupon_to_cart(cart_items, coupon_code):
    coupon = db.session.query(Coupon).filter_by(code=coupon_code).first()

    if not coupon or not coupon.is_valid():
        return False, "Invalid or expired coupon.", 0, 0  # Always return four elements

    total_product_price = sum(item.products_price() for item in cart_items)  # Total price of products only
    total_shipping_price = sum(item.ship_cost() for item in cart_items)  # Total shipping cost for all items

    if total_product_price < coupon.min_order_value:
        return False, f"Coupon requires a minimum order value of {coupon.min_order_value}.", 0, 0

    discounted_price = total_product_price  # Start with the product price

    if coupon.discount_type == 'percentage':
        discounted_price *= (1 - coupon.discount_value / 100)
        updated_shipping = total_shipping_price  # Shipping cost remains unchanged for percentage discount
    elif coupon.discount_type == 'fixed':
        discounted_price = max(0, total_product_price - coupon.discount_value)
        updated_shipping = total_shipping_price  # Shipping cost remains unchanged for fixed discount
    elif coupon.discount_type == 'free':
        discounted_price = total_product_price  # No discount on product price for free shipping
        updated_shipping = 0  # Free shipping means no shipping cost

    final_price = discounted_price + updated_shipping  # Add shipping after applying discount

    return True, f"Coupon {coupon_code} applied successfully!", final_price, updated_shipping


# def apply_coupon_to_cart(cart_items, coupon_code):
#     # Fetch the coupon
#     coupon = db.session.query(Coupon).filter_by(code=coupon_code).first()

#     if not coupon or not coupon.is_valid():
#         return False, "Invalid or expired coupon.", 0, 0  # Always return four elements

#     total_cart_price = sum(item.products_price() for item in cart_items)  # Only product prices

#     if total_cart_price < coupon.min_order_value:
#         return False, f"Coupon requires a minimum order value of {coupon.min_order_value}.", 0, 0

#     # Initialize values
#     discounted_price = total_cart_price
#     updated_shipping = 0

#     if coupon.discount_type == 'percentage':
#         discounted_price *= (1 - coupon.discount_value / 100)
#         updated_shipping = sum(item.ship_cost() for item in cart_items)  # Sum of all shipping costs

#     elif coupon.discount_type == 'fixed':
#         # Apply fixed discount only to the product price, no shipping cost added
#         discounted_price = max(0, total_cart_price - coupon.discount_value)
#         updated_shipping = sum(item.ship_cost() for item in cart_items)  # But we calculate shipping separately

#     elif coupon.discount_type == 'free':
#         # Free shipping: set shipping cost to zero
#         updated_shipping = 0  # No shipping cost
#         discounted_price = total_cart_price  # Only products' cost after applying free shipping

#     # The final discounted price is the product price after discount + shipping (if applicable)
#     final_price = discounted_price + updated_shipping

#     return True, f"Coupon {coupon_code} applied successfully!", final_price, updated_shipping

# def apply_coupon_to_cart(cart_items, coupon_code):
#     coupon = db.session.query(Coupon).filter_by(code=coupon_code).first()

#     if not coupon or not coupon.is_valid():
#         return False, "Invalid or expired coupon.", 0, 0

#     total_cart_price = sum(item.products_price() for item in cart_items)

#     if total_cart_price < coupon.min_order_value:
#         return False, f"Coupon requires a minimum order value of {coupon.min_order_value}.", 0, 0

#     discounted_price = total_cart_price
#     updated_shipping = 0

#     if coupon.discount_type == 'percentage':
#         discounted_price *= (1 - coupon.discount_value / 100)
#         updated_shipping = sum(item.ship_cost() for item in cart_items)

#     elif coupon.discount_type == 'fixed':
#         discounted_price = max(0, total_cart_price - coupon.discount_value)
#         updated_shipping = sum(item.ship_cost() for item in cart_items)

#     elif coupon.discount_type == 'free':
#         updated_shipping = 0
#         discounted_price = total_cart_price

#     final_price = discounted_price + updated_shipping

#     return True, f"Coupon {coupon_code} applied successfully!", final_price, updated_shipping

# def apply_coupon_to_cart(cart_items, coupon_code):
#     coupon = db.session.query(Coupon).filter_by(code=coupon_code).first()

#     if not coupon or not coupon.is_valid():
#         return False, "Invalid or expired coupon.", 0, 0  # Always return four elements

#     total_cart_price = sum(item.products_price() for item in cart_items)  # Assuming you need product prices without shipping

#     if total_cart_price < coupon.min_order_value:
#         return False, f"Coupon requires a minimum order value of {coupon.min_order_value}.", 0, 0

#     discounted_price = total_cart_price
#     updated_shipping = 0

#     if coupon.discount_type == 'percentage':
#         discounted_price *= (1 - coupon.discount_value / 100)
#     elif coupon.discount_type == 'fixed':
#         discounted_price = max(0, total_cart_price - coupon.discount_value)
#     elif coupon.discount_type == 'free':
#         updated_shipping = sum(item.ship_cost() for item in cart_items)
#         discounted_price = total_cart_price

#     return True, f"Coupon {coupon_code} applied successfully!", discounted_price, updated_shipping

# def apply_coupon_to_cart(cart_items, coupon_code):
#     # Fetch the coupon
#     coupon = db.session.query(Coupon).filter_by(code=coupon_code).first()

#     if not coupon or not coupon.is_valid():
#         return False, "Invalid or expired coupon.", 0

#     # Calculate the total product price (exclude shipping)
#     total_product_price = sum(item.products_price() for item in cart_items)

#     if total_product_price < coupon.min_order_value:
#         return False, f"Coupon requires a minimum order value of {coupon.min_order_value}.", 0

#     # Calculate discounted price based on coupon type
#     discounted_price = total_product_price
#     shipping_total = sum(item.ship_cost() for item in cart_items)

#     if coupon.discount_type == 'percentage':
#         discounted_price *= (1 - coupon.discount_value / 100)
#     elif coupon.discount_type == 'fixed':
#         discounted_price = max(0, total_product_price - coupon.discount_value)
#     elif coupon.discount_type == 'free':
#         discounted_price = total_product_price

#     return True, f"Coupon {coupon_code} applied successfully!", discounted_price, 0 if coupon.discount_type == 'free' else shipping_total
