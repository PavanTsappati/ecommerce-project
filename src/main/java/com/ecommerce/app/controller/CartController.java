package com.ecommerce.app.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.ecommerce.app.entity.CartItem;
import com.ecommerce.app.service.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // Add to cart
    @PostMapping("/add")
    public CartItem addToCart(
            @RequestParam Long userId,
            @RequestParam Long productId) {

        return cartService.addToCart(userId, productId);
    }

    // View cart
    @GetMapping
    public List<CartItem> getCart(@RequestParam Long userId) {
        return cartService.getCartItems(userId);
    }

    // Remove cart item
    @DeleteMapping("/{cartItemId}")
    public String removeItem(@PathVariable Long cartItemId) {
        cartService.removeCartItem(cartItemId);
        return "Item removed from cart";
    }
}
