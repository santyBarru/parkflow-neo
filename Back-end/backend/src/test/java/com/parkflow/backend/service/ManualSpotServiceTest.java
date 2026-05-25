package com.parkflow.backend.service;

import com.parkflow.service.spot.ManualSpotService;
import com.parkflow.repository.InMemorySpotRepository;
import com.parkflow.domain.ParkingSlot;
import com.parkflow.domain.SpotType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("ManualSpotService Tests")
class ManualSpotServiceTest {

    private ManualSpotService spotService;
    private InMemorySpotRepository repo;

    @BeforeEach
    void setUp() {
        repo = new InMemorySpotRepository();
        repo.save(new ParkingSlot("C-01", SpotType.CAR_SPOT));
        repo.save(new ParkingSlot("C-02", SpotType.CAR_SPOT));
        repo.save(new ParkingSlot("M-01", SpotType.MOTORCYCLE_SPOT));
        spotService = new ManualSpotService(repo);
    }

    @Test @DisplayName("listAll retorna todos los spots")
    void testListAll() {
        assertEquals(3, spotService.listAll().size());
    }

    @Test @DisplayName("listAvailable retorna spots libres")
    void testListAvailable() {
        assertEquals(3, spotService.listAvailable().size());
    }

    @Test @DisplayName("findById retorna spot existente")
    void testFindById() {
        assertTrue(spotService.findById("C-01").isPresent());
    }

    @Test @DisplayName("findById retorna vacío si no existe")
    void testFindByIdNoExiste() {
        assertFalse(spotService.findById("X-99").isPresent());
    }

    @Test @DisplayName("occupy marca spot como ocupado")
    void testOccupy() {
        spotService.occupy("C-01");
        assertTrue(spotService.findById("C-01").get().isOccupied());
    }

    @Test @DisplayName("occupy spot ya ocupado lanza excepción")
    void testOccupyYaOcupado() {
        spotService.occupy("C-01");
        assertThrows(IllegalStateException.class, () -> spotService.occupy("C-01"));
    }

    @Test @DisplayName("occupy spot inexistente lanza excepción")
    void testOccupyNoExiste() {
        assertThrows(IllegalArgumentException.class, () -> spotService.occupy("X-99"));
    }

    @Test @DisplayName("release libera spot ocupado")
    void testRelease() {
        spotService.occupy("C-01");
        spotService.release("C-01");
        assertFalse(spotService.findById("C-01").get().isOccupied());
    }

    @Test @DisplayName("release spot inexistente lanza excepción")
    void testReleaseNoExiste() {
        assertThrows(IllegalArgumentException.class, () -> spotService.release("X-99"));
    }

    @Test @DisplayName("listAvailable después de occupy reduce lista")
    void testListAvailableDespuesOccupy() {
        spotService.occupy("C-01");
        assertEquals(2, spotService.listAvailable().size());
    }
}