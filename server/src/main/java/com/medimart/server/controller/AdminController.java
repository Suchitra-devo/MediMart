package com.medimart.server.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.medimart.server.entity.Medicine;
import com.medimart.server.service.MedicineService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    private final MedicineService medicineService;

    public AdminController(MedicineService medicineService) {
        this.medicineService = medicineService;
    }

    @PostMapping("/medicine")
    public Medicine addMedicine(@RequestBody Medicine medicine) {
        return medicineService.addMedicine(medicine);
    }

    @GetMapping("/medicine")
    public List<Medicine> getAllMedicines() {
        return medicineService.getAllMedicines();
    }

    @PutMapping("/medicine/{id}")
    public Medicine updateMedicine(
            @PathVariable Long id,
            @RequestBody Medicine medicine) {

        return medicineService.updateMedicine(id, medicine);
    }

    @DeleteMapping("/medicine/{id}")
    public String deleteMedicine(@PathVariable Long id) {

        medicineService.deleteMedicine(id);

        return "Medicine Deleted Successfully";
    }
}