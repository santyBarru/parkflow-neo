package com.parkflow.backend.security;

import com.parkflow.security.JwtFilter;
import com.parkflow.security.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.util.ReflectionTestUtils;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("JwtFilter Tests")
class JwtFilterTest {

    private JwtFilter jwtFilter;
    private JwtUtil jwtUtil;

    @Mock HttpServletRequest request;
    @Mock HttpServletResponse response;
    @Mock FilterChain filterChain;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil();
        ReflectionTestUtils.setField(jwtUtil, "secret",
            "parkflow-super-secret-key-2024-must-be-long-enough-for-hs256");
        ReflectionTestUtils.setField(jwtUtil, "expiration", 86400000L);
        jwtFilter = new JwtFilter(jwtUtil);
        SecurityContextHolder.clearContext();
    }

    @Test @DisplayName("Token válido - autenticación establecida")
    void testTokenValido() throws Exception {
        String token = jwtUtil.generateToken("admin", "ADMIN");
        when(request.getHeader("Authorization")).thenReturn("Bearer " + token);
        when(request.getHeader("X-Trace-ID")).thenReturn("trace-123");
        jwtFilter.doFilter(request, response, filterChain);
        assertNotNull(SecurityContextHolder.getContext().getAuthentication());
        assertEquals("admin", SecurityContextHolder.getContext().getAuthentication().getName());
        verify(filterChain).doFilter(request, response);
    }

    @Test @DisplayName("Sin header - sin autenticación")
    void testSinHeader() throws Exception {
        when(request.getHeader("Authorization")).thenReturn(null);
        jwtFilter.doFilter(request, response, filterChain);
        assertNull(SecurityContextHolder.getContext().getAuthentication());
        verify(filterChain).doFilter(request, response);
    }

    @Test @DisplayName("Token inválido - sin autenticación")
    void testTokenInvalido() throws Exception {
        when(request.getHeader("Authorization")).thenReturn("Bearer tokeninvalido");
        jwtFilter.doFilter(request, response, filterChain);
        assertNull(SecurityContextHolder.getContext().getAuthentication());
        verify(filterChain).doFilter(request, response);
    }

    @Test @DisplayName("Header sin Bearer - sin autenticación")
    void testHeaderSinBearer() throws Exception {
        when(request.getHeader("Authorization")).thenReturn("Basic abc123");
        jwtFilter.doFilter(request, response, filterChain);
        assertNull(SecurityContextHolder.getContext().getAuthentication());
        verify(filterChain).doFilter(request, response);
    }

    @Test @DisplayName("Token válido sin X-Trace-ID genera uno nuevo")
    void testTokenValidoSinTraceId() throws Exception {
        String token = jwtUtil.generateToken("celador", "ATTENDANT");
        when(request.getHeader("Authorization")).thenReturn("Bearer " + token);
        when(request.getHeader("X-Trace-ID")).thenReturn(null);
        jwtFilter.doFilter(request, response, filterChain);
        assertNotNull(SecurityContextHolder.getContext().getAuthentication());
        verify(response).setHeader(eq("X-Trace-ID"), anyString());
        verify(filterChain).doFilter(request, response);
    }
}