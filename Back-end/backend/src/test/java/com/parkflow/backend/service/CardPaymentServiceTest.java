package com.parkflow.backend.service;

import com.parkflow.service.payment.CardPaymentService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("CardPaymentService Tests")
class CardPaymentServiceTest {

    @Test @DisplayName("pay retorna true siempre")
    void testPay() {
        CardPaymentService service = new CardPaymentService();
        assertTrue(service.pay("REF-001", 3000.0));
    }

    @Test @DisplayName("pay con monto cero retorna true")
    void testPayMontoCero() {
        CardPaymentService service = new CardPaymentService();
        assertTrue(service.pay("REF-002", 0.0));
    }

    @Test @DisplayName("pay con monto alto retorna true")
    void testPayMontoAlto() {
        CardPaymentService service = new CardPaymentService();
        assertTrue(service.pay("REF-003", 999999.0));
    }
}