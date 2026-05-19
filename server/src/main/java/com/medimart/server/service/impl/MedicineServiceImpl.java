package com.medimart.server.service.impl;


import java.util.List;

import org.springframework.stereotype.Service;

import com.medimart.server.entity.Medicine;
import com.medimart.server.repository.MedicineRepository;
import com.medimart.server.service.MedicineService;

@Service
public class MedicineServiceImpl implements MedicineService {

    private final MedicineRepository medicineRepository;

    public MedicineServiceImpl(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    @Override
    public Medicine addMedicine(Medicine medicine) {

        return medicineRepository.save(medicine);
    }

    @Override
    public List<Medicine> getAllMedicines() {

        return medicineRepository.findAll();
    }

    @Override
public Medicine getMedicineById(Long id) {

    return medicineRepository.findById(id)
            .orElseThrow();
}

@Override
public Medicine updateMedicine(Long id, Medicine medicine) {

    Medicine existingMedicine =
            medicineRepository.findById(id).orElseThrow();

    existingMedicine.setName(
            medicine.getName());

    existingMedicine.setComposition(
            medicine.getComposition());

    existingMedicine.setDescription(
            medicine.getDescription());

    existingMedicine.setAlternateMedicine(
            medicine.getAlternateMedicine());

    existingMedicine.setQuantity(
            medicine.getQuantity());

    existingMedicine.setPrice(
            medicine.getPrice());

    existingMedicine.setExpiryDate(
            medicine.getExpiryDate());

    return medicineRepository.save(existingMedicine);
}

    @Override
    public void deleteMedicine(Long id) {

        medicineRepository.deleteById(id);
    }
}