package com.medimart.server.controller;

import com.medimart.server.entity.Medicine;
import com.medimart.server.service.MedicineService;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "http://localhost:4200")
public class MedicineController {

    private final MedicineService service;

    public MedicineController(MedicineService service) {
        this.service = service;
    }

    // ADD
    @PostMapping
    public Medicine addMedicine(
            @RequestBody Medicine medicine) {

        return service.addMedicine(medicine);
    }

    // GET ALL
    @GetMapping
    public List<Medicine> getAllMedicines() {
        return service.getAllMedicines();
    }

    // GET BY ID
@GetMapping("/{id}")
public Medicine getMedicineById(
        @PathVariable Long id) {

    return service.getMedicineById(id);
}

    // UPDATE
    @PutMapping("/{id}")
    public Medicine updateMedicine(
            @PathVariable Long id,
            @RequestBody Medicine medicine) {

        return service.updateMedicine(id, medicine);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteMedicine(
            @PathVariable Long id) {

        service.deleteMedicine(id);
    }
}