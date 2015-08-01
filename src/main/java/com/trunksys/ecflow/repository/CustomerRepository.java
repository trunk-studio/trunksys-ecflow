package com.trunksys.ecflow.repository;

import com.trunksys.ecflow.domain.Customer;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Customer entity.
 */
public interface CustomerRepository extends JpaRepository<Customer,Long> {

}
