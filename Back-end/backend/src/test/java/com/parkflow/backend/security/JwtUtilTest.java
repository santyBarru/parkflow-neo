package com.parkflow.backend.security;

import com.parkflow.security.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

class JwtUtilTest {

    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil();
        ReflectionTestUtils.setField(jwtUtil, "secret",
            "parkflow-super-secret-key-2024-must-be-long-enough-for-hs256");
        ReflectionTestUtils.setField(jwtUtil, "expiration", 86400000L);
    }

    @Test
    void deberiaGenerarTokenValido() {
        String token = jwtUtil.generateToken("admin", "ADMIN");
        assertNotNull(token);
        assertFalse(token.isEmpty());
    }

    @Test
    void deberiaExtraerUsernameCorrectamente() {
        String token = jwtUtil.generateToken("celador", "ATTENDANT");
        assertEquals("celador", jwtUtil.extractUsername(token));
    }

    @Test
    void deberiaExtraerRolCorrectamente() {
        String token = jwtUtil.generateToken("admin", "ADMIN");
        assertEquals("ADMIN", jwtUtil.extractRole(token));
    }

    @Test
    void tokenValidoDebeRetornarTrue() {
        String token = jwtUtil.generateToken("usuario", "USER");
        assertTrue(jwtUtil.isTokenValid(token));
    }

    @Test
    void tokenInvalidoDebeRetornarFalse() {
        assertFalse(jwtUtil.isTokenValid("esto.no.es.un.token"));
    }

    @Test
    void tokenManipuladoDebeSerInvalido() {
        String token = jwtUtil.generateToken("admin", "ADMIN");
        String tokenManipulado = token + "manipulado";
        assertFalse(jwtUtil.isTokenValid(tokenManipulado));
    }
}