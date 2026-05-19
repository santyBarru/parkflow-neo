package com.parkflow.backend.service.pricing;

import com.parkflow.service.pricing.HourlyPricingService;
import com.parkflow.domain.Ticket;
import com.parkflow.domain.Car;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class HourlyPricingServiceTest {

    private HourlyPricingService pricingService;

    @BeforeEach
    void setUp() {
        pricingService = new HourlyPricingService(5000.0);
    }

    private Ticket crearTicket(LocalDateTime entrada, LocalDateTime salida) {
        Ticket ticket = new Ticket(
            "T001",
            new Car("ABC123", "owner1"),
            "S01",
            "celador",
            entrada
        );
        ticket.setExitTime(salida);
        return ticket;
    }

    @Test
    void deberiaCalcularUnaHoraExacta() {
        Ticket ticket = crearTicket(
            LocalDateTime.of(2026, 1, 1, 10, 0),
            LocalDateTime.of(2026, 1, 1, 11, 0)
        );
        assertEquals(5000.0, pricingService.calculateFee(ticket));
    }

    @Test
    void deberiaRedondearHaciaArriba() {
        Ticket ticket = crearTicket(
            LocalDateTime.of(2026, 1, 1, 10, 0),
            LocalDateTime.of(2026, 1, 1, 10, 30)
        );
        assertEquals(5000.0, pricingService.calculateFee(ticket));
    }

    @Test
    void deberiaCobrarDosHorasPorHoraYMedia() {
        Ticket ticket = crearTicket(
            LocalDateTime.of(2026, 1, 1, 10, 0),
            LocalDateTime.of(2026, 1, 1, 11, 30)
        );
        assertEquals(10000.0, pricingService.calculateFee(ticket));
    }

    @Test
    void deberiaCobrarTresHoras() {
        Ticket ticket = crearTicket(
            LocalDateTime.of(2026, 1, 1, 8, 0),
            LocalDateTime.of(2026, 1, 1, 11, 0)
        );
        assertEquals(15000.0, pricingService.calculateFee(ticket));
    }

    @Test
    void sinExitTimeLanzaExcepcion() {
        Ticket ticket = new Ticket(
            "T002",
            new Car("XYZ999", "owner2"),
            "S02",
            "celador",
            LocalDateTime.of(2026, 1, 1, 10, 0)
        );
        assertThrows(IllegalArgumentException.class,
            () -> pricingService.calculateFee(ticket));
    }
}