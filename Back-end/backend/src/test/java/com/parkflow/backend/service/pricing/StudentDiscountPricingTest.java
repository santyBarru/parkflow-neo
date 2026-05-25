package com.parkflow.backend.service.pricing;

import com.parkflow.service.pricing.HourlyPricingService;
import com.parkflow.service.pricing.StudentDiscountPricing;
import com.parkflow.domain.Ticket;
import com.parkflow.domain.Car;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("StudentDiscountPricing Tests")
class StudentDiscountPricingTest {

    private Ticket crearTicket(LocalDateTime entrada, LocalDateTime salida) {
        Ticket ticket = new Ticket("T-001", new Car("ABC123", "owner1"), "S-01", "celador", entrada);
        ticket.setExitTime(salida);
        return ticket;
    }

    @Test @DisplayName("Descuento del 50% sobre tarifa base")
    void testDescuento50() {
        HourlyPricingService base = new HourlyPricingService(5000.0);
        StudentDiscountPricing discount = new StudentDiscountPricing(base, 0.5);
        Ticket ticket = crearTicket(
            LocalDateTime.of(2026,1,1,10,0),
            LocalDateTime.of(2026,1,1,11,0)
        );
        assertEquals(2500.0, discount.calculateFee(ticket));
    }

    @Test @DisplayName("Descuento del 20% sobre tarifa base")
    void testDescuento20() {
        HourlyPricingService base = new HourlyPricingService(5000.0);
        StudentDiscountPricing discount = new StudentDiscountPricing(base, 0.2);
        Ticket ticket = crearTicket(
            LocalDateTime.of(2026,1,1,10,0),
            LocalDateTime.of(2026,1,1,11,0)
        );
        assertEquals(4000.0, discount.calculateFee(ticket));
    }

    @Test @DisplayName("Sin descuento - 0%")
    void testSinDescuento() {
        HourlyPricingService base = new HourlyPricingService(5000.0);
        StudentDiscountPricing discount = new StudentDiscountPricing(base, 0.0);
        Ticket ticket = crearTicket(
            LocalDateTime.of(2026,1,1,10,0),
            LocalDateTime.of(2026,1,1,11,0)
        );
        assertEquals(5000.0, discount.calculateFee(ticket));
    }

    @Test @DisplayName("Descuento sobre dos horas")
    void testDescuentoDosHoras() {
        HourlyPricingService base = new HourlyPricingService(5000.0);
        StudentDiscountPricing discount = new StudentDiscountPricing(base, 0.5);
        Ticket ticket = crearTicket(
            LocalDateTime.of(2026,1,1,10,0),
            LocalDateTime.of(2026,1,1,12,0)
        );
        assertEquals(5000.0, discount.calculateFee(ticket));
    }
}