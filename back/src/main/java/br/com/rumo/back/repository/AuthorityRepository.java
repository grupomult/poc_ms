package br.com.rumo.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.rumo.back.domain.Authority;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
