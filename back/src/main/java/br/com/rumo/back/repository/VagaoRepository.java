package br.com.rumo.back.repository;

import br.com.rumo.back.domain.Vagao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Vagao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VagaoRepository extends JpaRepository<Vagao, Long> {

}
