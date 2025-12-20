package com.ecommerce.app.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.ecommerce.app.entity.Order;
import com.ecommerce.app.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // Place order
    @PostMapping("/place")
    public Order placeOrder(@RequestParam Long userId) {
        return orderService.placeOrder(userId);
    }

    // Orders page
    @GetMapping
    public List<Order> getOrders(@RequestParam Long userId) {
        return orderService.getOrdersByUser(userId);
    }
}
