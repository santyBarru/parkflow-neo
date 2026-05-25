package com.parkflow.backend.service;

import com.parkflow.service.auth.AuthService;
import com.parkflow.domain.User;
import com.parkflow.domain.Role;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.BeforeEach;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("AuthService Tests")
class AuthServiceTest {

    private AuthService authService;

    @BeforeEach
    void setUp() { authService = new AuthService(); }

    @Test @DisplayName("ATTENDANT puede registrar entrada")
    void testAttendantPuedeRegistrar() {
        User user = new User("u1", "Celador", Role.ATTENDANT);
        assertTrue(authService.canRegisterEntry(user));
    }

    @Test @DisplayName("ADMIN puede registrar entrada")
    void testAdminPuedeRegistrar() {
        User user = new User("u2", "Admin", Role.ADMIN);
        assertTrue(authService.canRegisterEntry(user));
    }

    @Test @DisplayName("USER no puede registrar entrada")
    void testUserNoPuedeRegistrar() {
        User user = new User("u3", "Usuario", Role.USER);
        assertFalse(authService.canRegisterEntry(user));
    }

    @Test @DisplayName("null no puede registrar entrada")
    void testNullNoPuedeRegistrar() {
        assertFalse(authService.canRegisterEntry(null));
    }

    @Test @DisplayName("ATTENDANT puede procesar salida")
    void testAttendantPuedeProcesarSalida() {
        User user = new User("u4", "Celador2", Role.ATTENDANT);
        assertTrue(authService.canProcessExit(user));
    }

    @Test @DisplayName("ADMIN es admin")
    void testIsAdmin() {
        User admin = new User("u5", "Admin", Role.ADMIN);
        User celador = new User("u6", "Celador", Role.ATTENDANT);
        assertTrue(authService.isAdmin(admin));
        assertFalse(authService.isAdmin(celador));
        assertFalse(authService.isAdmin(null));
    }
}