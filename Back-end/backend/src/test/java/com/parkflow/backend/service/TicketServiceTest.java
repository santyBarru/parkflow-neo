package com.parkflow.backend.service;

import com.parkflow.service.ticket.TicketService;
import com.parkflow.repository.InMemoryTicketRepository;
import com.parkflow.domain.Car;
import com.parkflow.domain.Ticket;
import com.parkflow.domain.Vehicle;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("TicketService Tests")
class TicketServiceTest {

    private TicketService ticketService;
    private InMemoryTicketRepository repo;

    @BeforeEach
    void setUp() {
        repo = new InMemoryTicketRepository();
        ticketService = new TicketService(repo);
    }

    @Test @DisplayName("Crear ticket genera ID y guarda")
    void testCrearTicket() {
        Vehicle v = new Car("ABC123", "owner1");
        Ticket t = ticketService.createTicket(v, "S-01", "celador1");
        assertNotNull(t);
        assertNotNull(t.getId());
        assertTrue(t.getId().startsWith("T-"));
        assertEquals("S-01", t.getSpotId());
        assertEquals("celador1", t.getCreatedBy());
    }

    @Test @DisplayName("Find por ID retorna ticket")
    void testFindById() {
        Vehicle v = new Car("XYZ999", "owner2");
        Ticket t = ticketService.createTicket(v, "S-02", "celador2");
        Optional<Ticket> found = ticketService.find(t.getId());
        assertTrue(found.isPresent());
        assertEquals(t.getId(), found.get().getId());
    }

    @Test @DisplayName("Find por ID inexistente retorna vacío")
    void testFindByIdInexistente() {
        Optional<Ticket> found = ticketService.find("T-NOEXISTE");
        assertFalse(found.isPresent());
    }

    @Test @DisplayName("FindActive retorna tickets activos")
    void testFindActive() {
        Vehicle v = new Car("AAA111", "owner3");
        ticketService.createTicket(v, "S-03", "celador3");
        assertFalse(ticketService.findActive().isEmpty());
    }

    @Test @DisplayName("CloseTicket setea exitTime")
    void testCloseTicket() {
        Vehicle v = new Car("BBB222", "owner4");
        Ticket t = ticketService.createTicket(v, "S-04", "celador4");
        ticketService.closeTicket(t.getId());
        Optional<Ticket> closed = ticketService.find(t.getId());
        assertTrue(closed.isPresent());
        assertNotNull(closed.get().getExitTime());
    }

    @Test @DisplayName("CloseTicket con ID inexistente lanza excepción")
    void testCloseTicketInexistente() {
        assertThrows(IllegalArgumentException.class,
            () -> ticketService.closeTicket("T-NOEXISTE"));
    }
}