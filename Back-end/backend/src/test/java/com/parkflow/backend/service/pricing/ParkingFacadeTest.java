package com.parkflow.backend.service.pricing;

import com.parkflow.entity.SpotEntity;
import com.parkflow.entity.TicketEntity;
import com.parkflow.repository.jpa.SpotJpaRepository;
import com.parkflow.repository.jpa.TicketJpaRepository;
import com.parkflow.service.ParkingFacade;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("ParkingFacade Tests")
class ParkingFacadeTest {

    @Mock SpotJpaRepository spotJpaRepo;
    @Mock TicketJpaRepository ticketJpaRepo;
    @InjectMocks ParkingFacade parkingFacade;

    @Test @DisplayName("findTicketEntity - no existe retorna vacío")
    void testFindTicketNoExiste() {
        when(ticketJpaRepo.findById("T-NOEXISTE")).thenReturn(Optional.empty());
        assertFalse(parkingFacade.findTicketEntity("T-NOEXISTE").isPresent());
    }

    @Test @DisplayName("findTicketEntity - existe retorna ticket")
    void testFindTicketExiste() {
        TicketEntity ticket = new TicketEntity();
        ticket.setId("T-001");
        when(ticketJpaRepo.findById("T-001")).thenReturn(Optional.of(ticket));
        assertTrue(parkingFacade.findTicketEntity("T-001").isPresent());
    }

    @Test @DisplayName("getActiveTickets retorna lista")
    void testGetActiveTickets() {
        TicketEntity ticket = new TicketEntity();
        ticket.setId("T-002"); ticket.setPaid(false);
        when(ticketJpaRepo.findByPaid(false)).thenReturn(List.of(ticket));
        assertEquals(1, parkingFacade.getActiveTickets().size());
    }

    @Test @DisplayName("getAvailableSpots retorna spots libres")
    void testGetAvailableSpots() {
        SpotEntity spot = new SpotEntity("C-01", "CAR");
        when(spotJpaRepo.findByOccupied(false)).thenReturn(List.of(spot));
        assertEquals(1, parkingFacade.getAvailableSpots().size());
    }

    @Test @DisplayName("getAvailableSpotsByType retorna spots por tipo")
    void testGetAvailableSpotsByType() {
        SpotEntity spot = new SpotEntity("C-01", "CAR");
        when(spotJpaRepo.findByTypeAndOccupied("CAR", false)).thenReturn(List.of(spot));
        assertEquals(1, parkingFacade.getAvailableSpotsByType("CAR").size());
    }

    @Test @DisplayName("getTotalSlots retorna count")
    void testGetTotalSlots() {
        when(spotJpaRepo.count()).thenReturn(9L);
        assertEquals(9, parkingFacade.getTotalSlots());
    }

    @Test @DisplayName("getAvailableCount retorna cantidad libres")
    void testGetAvailableCount() {
        when(spotJpaRepo.findByOccupied(false)).thenReturn(List.of(new SpotEntity("C-01","CAR")));
        assertEquals(1, parkingFacade.getAvailableCount());
    }

    @Test @DisplayName("getOccupiedCount retorna cantidad ocupadas")
    void testGetOccupiedCount() {
        when(spotJpaRepo.findByOccupied(true)).thenReturn(List.of());
        assertEquals(0, parkingFacade.getOccupiedCount());
    }

    @Test @DisplayName("getTodayRevenue retorna 0")
    void testGetTodayRevenue() {
        assertEquals(0.0, parkingFacade.getTodayRevenue());
    }

    @Test @DisplayName("exitAndPay - ticket no existe lanza excepción")
    void testExitAndPayNoExiste() {
        when(ticketJpaRepo.findById("T-XXX")).thenReturn(Optional.empty());
        assertThrows(IllegalArgumentException.class,
            () -> parkingFacade.exitAndPay("admin", "ADMIN", "T-XXX"));
    }

    @Test @DisplayName("exitAndPay - ticket ya pagado retorna true")
    void testExitAndPayYaPagado() {
        TicketEntity ticket = new TicketEntity();
        ticket.setId("T-003"); ticket.setPaid(true);
        when(ticketJpaRepo.findById("T-003")).thenReturn(Optional.of(ticket));
        assertTrue(parkingFacade.exitAndPay("admin", "ADMIN", "T-003"));
    }

    @Test @DisplayName("exitAndPay - ticket activo calcula monto")
    void testExitAndPayActivo() {
        TicketEntity ticket = new TicketEntity();
        ticket.setId("T-004");
        ticket.setPaid(false);
        ticket.setEntryTime(LocalDateTime.now().minusHours(2));
        when(ticketJpaRepo.findById("T-004")).thenReturn(Optional.of(ticket));
        when(ticketJpaRepo.save(any())).thenReturn(ticket);
        assertTrue(parkingFacade.exitAndPay("admin", "ADMIN", "T-004"));
        assertTrue(ticket.getAmount() >= 3000.0);
    }

    @Test @DisplayName("getPaidPendingRelease retorna lista")
    void testGetPaidPendingRelease() {
        when(ticketJpaRepo.findByPaidAndReleased(true, false)).thenReturn(List.of());
        assertNotNull(parkingFacade.getPaidPendingRelease());
    }

    @Test @DisplayName("releaseSpot actualiza spot y ticket")
    void testReleaseSpot() {
        TicketEntity ticket = new TicketEntity();
        ticket.setId("T-005");
        SpotEntity spot = new SpotEntity("C-01", "CAR");
        spot.setOccupied(true);
        when(ticketJpaRepo.findById("T-005")).thenReturn(Optional.of(ticket));
        when(spotJpaRepo.findById("C-01")).thenReturn(Optional.of(spot));
        parkingFacade.releaseSpot("C-01", "T-005");
        verify(ticketJpaRepo).save(ticket);
        verify(spotJpaRepo).save(spot);
    }
}