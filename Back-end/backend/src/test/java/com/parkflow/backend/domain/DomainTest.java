package com.parkflow.backend.domain;

import com.parkflow.domain.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Domain Model Tests")
class DomainTest {

    static class TestCar extends Vehicle {
        public TestCar(String plate, String ownerId) { super(plate, ownerId); }
        @Override public VehicleType getType() { return VehicleType.CAR; }
    }

    @Test @DisplayName("Vehicle - getPlate y getOwnerId")
    void testVehicle() {
        Vehicle v = new TestCar("ABC123", "user1");
        assertEquals("ABC123", v.getPlate());
        assertEquals("user1", v.getOwnerId());
        assertEquals(VehicleType.CAR, v.getType());
    }

    @Test @DisplayName("Ticket - constructor y getters")
    void testTicketConstructor() {
        Vehicle v = new TestCar("XYZ999", "owner1");
        LocalDateTime entry = LocalDateTime.now();
        Ticket t = new Ticket("T-001", v, "S-01", "celador1", entry);
        assertEquals("T-001", t.getId());
        assertEquals(v, t.getVehicle());
        assertEquals("S-01", t.getSpotId());
        assertEquals("celador1", t.getCreatedBy());
        assertEquals(entry, t.getEntryTime());
        assertNull(t.getExitTime());
        assertFalse(t.isPaid());
        assertEquals(0.0, t.getAmount());
    }

    @Test @DisplayName("Ticket - setters")
    void testTicketSetters() {
        Vehicle v = new TestCar("AAA111", "owner2");
        Ticket t = new Ticket("T-002", v, "S-02", "celador2", LocalDateTime.now());
        LocalDateTime exit = LocalDateTime.now().plusHours(2);
        t.setExitTime(exit);
        t.setAmount(6000.0);
        t.setPaid(true);
        assertEquals(exit, t.getExitTime());
        assertEquals(6000.0, t.getAmount());
        assertTrue(t.isPaid());
    }

    @Test @DisplayName("Car - tipo de vehículo")
    void testCar() {
        Car car = new Car("CAR001", "user1");
        assertEquals(VehicleType.CAR, car.getType());
        assertEquals("CAR001", car.getPlate());
    }

    @Test @DisplayName("Motorcycle - tipo de vehículo")
    void testMotorcycle() {
        Motorcycle moto = new Motorcycle("MOTO01", "user2");
        assertEquals(VehicleType.MOTORCYCLE, moto.getType());
        assertEquals("MOTO01", moto.getPlate());
    }

    @Test @DisplayName("Truck - tipo de vehículo")
    void testTruck() {
        Truck truck = new Truck("TRUCK1", "user3");
        assertEquals(VehicleType.TRUCK, truck.getType());
        assertEquals("TRUCK1", truck.getPlate());
    }

    @Test @DisplayName("ParkingSlot - constructor y estado")
    void testParkingSlot() {
        ParkingSlot slot = new ParkingSlot("S-01", SpotType.CAR_SPOT);
        assertEquals("S-01", slot.getId());
        assertEquals(SpotType.CAR_SPOT, slot.getType());
        assertFalse(slot.isOccupied());
        slot.setOccupied(true);
        assertTrue(slot.isOccupied());
    }

    @Test @DisplayName("SpotType - valores del enum")
    void testSpotType() {
        assertEquals("CAR_SPOT", SpotType.CAR_SPOT.name());
        assertEquals("MOTORCYCLE_SPOT", SpotType.MOTORCYCLE_SPOT.name());
        assertEquals("TRUCK_SPOT", SpotType.TRUCK_SPOT.name());
        assertEquals("HANDICAPPED_SPOT", SpotType.HANDICAPPED_SPOT.name());
    }

    @Test @DisplayName("Role - valores del enum")
    void testRole() {
        assertEquals("ADMIN", Role.ADMIN.name());
        assertEquals("ATTENDANT", Role.ATTENDANT.name());
        assertEquals("USER", Role.USER.name());
    }

    @Test @DisplayName("VehicleType - valores del enum")
    void testVehicleType() {
        assertEquals("CAR", VehicleType.CAR.name());
        assertEquals("MOTORCYCLE", VehicleType.MOTORCYCLE.name());
        assertEquals("TRUCK", VehicleType.TRUCK.name());
    }

    @Test @DisplayName("User - constructor y getters")
    void testUser() {
        User user = new User("u001", "John Doe", Role.USER);
        assertEquals("u001", user.getId());
        assertEquals("John Doe", user.getName());
        assertEquals(Role.USER, user.getRole());
    }
}