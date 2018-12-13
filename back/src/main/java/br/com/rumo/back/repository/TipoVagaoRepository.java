package br.com.rumo.back.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import br.com.rumo.back.domain.TipoVagao;


/**
 * Spring Data  repository for the TipoVagao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoVagaoRepository extends JpaRepository<TipoVagao, Long> {

}
