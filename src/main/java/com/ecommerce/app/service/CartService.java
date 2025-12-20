package com.ecommerce.app.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.app.entity.CartItem;
import com.ecommerce.app.entity.Product;
import com.ecommerce.app.repository.CartRepository;
import com.ecommerce.app.repository.ProductRepository;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    public CartService(CartRepository cartRepository,
                       ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    // Add product to cart
    @Transactional
    public CartItem addToCart(Long userId, Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        return cartRepository
                .findByUserIdAndProductId(userId, productId)
                .map(existing -> {
                    existing.setQuantity(existing.getQuantity() + 1);
                    return cartRepository.save(existing);
                })
                .orElseGet(() -> {
                    CartItem item = new CartItem(userId, product, 1);
                    return cartRepository.save(item);
                });
    }

    // View cart
    public List<CartItem> getCartItems(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    // Remove cart item
    @Transactional
    public void removeCartItem(Long cartItemId) {
        cartRepository.deleteById(cartItemId);
    }

    // Clear whole cart after placing order
    @Transactional
    public void clearCart(Long userId) {
        cartRepository.deleteByUserId(userId);
    }
}
