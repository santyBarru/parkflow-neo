package com.parkflow.backend.service.pricing;

import com.parkflow.entity.TicketEntity;
import com.parkflow.repository.jpa.SpotJpaRepository;
import com.parkflow.repository.jpa.TicketJpaRepository;
import com.parkflow.service.ParkingFacade;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class ParkingFacadeTest {

    @Mock
    private SpotJpaRepository spotJpaRepo;

    @Mock
    private TicketJpaRepository ticketJpaRepo;

    @InjectMocks
    private ParkingFacade parkingFacade;

    @Test
    void deberiaRetornarVacioCuandoTicketNoExiste() {
        when(ticketJpaRepo.findById("T-NOEXISTE")).thenReturn(Optional.empty());

        Optional<TicketEntity> result = parkingFacade.findTicketEntity("T-NOEXISTE");

        assertFalse(result.isPresent());
        verify(ticketJpaRepo, times(1)).findById("T-NOEXISTE");
    }

    @Test
    void deberiaEncontrarTicketPorId() {
        TicketEntity ticket = new TicketEntity();
        ticket.setId("T-001");
        when(ticketJpaRepo.findById("T-001")).thenReturn(Optional.of(ticket));

        Optional<TicketEntity> result = parkingFacade.findTicketEntity("T-001");

        assertTrue(result.isPresent());
        assertEquals("T-001", result.get().getId());
        verify(ticketJpaRepo, times(1)).findById("T-001");
    }

    @Test
    void deberiaRetornarTicketsActivos() {
        TicketEntity ticket = new TicketEntity();
        ticket.setId("T-002");
        ticket.setPaid(false);
        when(ticketJpaRepo.findByPaid(false)).thenReturn(List.of(ticket));

        List<TicketEntity> activos = parkingFacade.getActiveTickets();

        assertNotNull(activos);
        assertEquals(1, activos.size());
        verify(ticketJpaRepo, times(1)).findByPaid(false);
    }
}