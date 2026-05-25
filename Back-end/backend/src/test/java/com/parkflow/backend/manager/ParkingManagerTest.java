package com.parkflow.backend.manager;

import com.parkflow.manager.ParkingManager;
import com.parkflow.service.auth.AuthService;
import com.parkflow.service.payment.PaymentService;
import com.parkflow.service.pricing.HourlyPricingService;
import com.parkflow.service.ticket.TicketService;
import com.parkflow.service.spot.SpotService;
import com.parkflow.repository.InMemoryTicketRepository;
import com.parkflow.domain.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.List;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(MockitoExtension.class)
@DisplayName("ParkingManager Tests")
class ParkingManagerTest {

    @Mock SpotService spotService;
    @Mock PaymentService paymentService;

    private TicketService ticketService;
    private AuthService authService;
    private HourlyPricingService pricingService;
    private ParkingManager manager;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(ParkingManager.class, "instance", null);
        ticketService = new TicketService(new InMemoryTicketRepository());
        authService = new AuthService();
        pricingService = new HourlyPricingService(3000.0);
        manager = ParkingManager.init(spotService, ticketService, pricingService, paymentService, authService);
    }

    @Test @DisplayName("admitVehicle con ATTENDANT crea ticket")
    void testAdmitVehicle() {
        User attendant = new User("c1", "Celador", Role.ATTENDANT);
        Vehicle v = new Car("ABC123", "owner1");
        Ticket t = manager.admitVehicleByAttendant(attendant, v, "S-01");
        assertNotNull(t);
        assertEquals("S-01", t.getSpotId());
        verify(spotService).occupy("S-01");
    }

    @Test @DisplayName("admitVehicle sin permiso lanza SecurityException")
    void testAdmitVehicleSinPermiso() {
        User user = new User("u1", "Usuario", Role.USER);
        Vehicle v = new Car("XYZ999", "owner2");
        assertThrows(SecurityException.class,
            () -> manager.admitVehicleByAttendant(user, v, "S-02"));
    }

    @Test @DisplayName("exitAndPay con pago exitoso")
    void testExitAndPay() {
        User attendant = new User("c2", "Celador2", Role.ATTENDANT);
        Vehicle v = new Car("BBB111", "owner3");
        Ticket t = manager.admitVehicleByAttendant(attendant, v, "S-03");
        when(paymentService.pay(anyString(), anyDouble())).thenReturn(true);
        boolean result = manager.exitAndPayByAttendant(attendant, t.getId());
        assertTrue(result);
        verify(spotService).release("S-03");
    }

    @Test @DisplayName("exitAndPay con ticket inexistente lanza excepción")
    void testExitAndPayInexistente() {
        User attendant = new User("c3", "Celador3", Role.ATTENDANT);
        assertThrows(IllegalArgumentException.class,
            () -> manager.exitAndPayByAttendant(attendant, "T-NOEXISTE"));
    }

    @Test @DisplayName("getAvailableSlots retorna lista")
    void testGetAvailableSlots() {
        when(spotService.listAvailable()).thenReturn(List.of());
        assertEquals(0, manager.getAvailableSlots());
    }

    @Test @DisplayName("getTodayRevenue retorna 0 sin tickets")
    void testGetTodayRevenue() {
        assertEquals(0.0, manager.getTodayRevenue());
    }

    @Test @DisplayName("getInstance retorna instancia inicializada")
    void testGetInstance() {
        assertNotNull(ParkingManager.getInstance());
    }
}