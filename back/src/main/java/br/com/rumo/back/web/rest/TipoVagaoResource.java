package br.com.rumo.back.web.rest;

import com.codahale.metrics.annotation.Timed;

import br.com.rumo.back.domain.TipoVagao;
import br.com.rumo.back.repository.TipoVagaoRepository;
import br.com.rumo.back.web.rest.errors.BadRequestAlertException;
import br.com.rumo.back.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TipoVagao.
 */
@RestController
@RequestMapping("/api")
public class TipoVagaoResource {

    private final Logger log = LoggerFactory.getLogger(TipoVagaoResource.class);

    private static final String ENTITY_NAME = "tipoVagao";

    private final TipoVagaoRepository tipoVagaoRepository;

    public TipoVagaoResource(TipoVagaoRepository tipoVagaoRepository) {
        this.tipoVagaoRepository = tipoVagaoRepository;
    }

    /**
     * POST  /tipo-vagaos : Create a new tipoVagao.
     *
     * @param tipoVagao the tipoVagao to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tipoVagao, or with status 400 (Bad Request) if the tipoVagao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tipo-vagaos")
    @Timed
    public ResponseEntity<TipoVagao> createTipoVagao(@Valid @RequestBody TipoVagao tipoVagao) throws URISyntaxException {
        log.debug("REST request to save TipoVagao : {}", tipoVagao);
        if (tipoVagao.getId() != null) {
            throw new BadRequestAlertException("A new tipoVagao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoVagao result = tipoVagaoRepository.save(tipoVagao);
        return ResponseEntity.created(new URI("/api/tipo-vagaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tipo-vagaos : Updates an existing tipoVagao.
     *
     * @param tipoVagao the tipoVagao to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tipoVagao,
     * or with status 400 (Bad Request) if the tipoVagao is not valid,
     * or with status 500 (Internal Server Error) if the tipoVagao couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tipo-vagaos")
    @Timed
    public ResponseEntity<TipoVagao> updateTipoVagao(@Valid @RequestBody TipoVagao tipoVagao) throws URISyntaxException {
        log.debug("REST request to update TipoVagao : {}", tipoVagao);
        if (tipoVagao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoVagao result = tipoVagaoRepository.save(tipoVagao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tipoVagao.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tipo-vagaos : get all the tipoVagaos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tipoVagaos in body
     */
    @GetMapping("/tipo-vagaos")
    @Timed
    public List<TipoVagao> getAllTipoVagaos() {
        log.debug("REST request to get all TipoVagaos");
        return tipoVagaoRepository.findAll();
    }

    /**
     * GET  /tipo-vagaos/:id : get the "id" tipoVagao.
     *
     * @param id the id of the tipoVagao to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tipoVagao, or with status 404 (Not Found)
     */
    @GetMapping("/tipo-vagaos/{id}")
    @Timed
    public ResponseEntity<TipoVagao> getTipoVagao(@PathVariable Long id) {
        log.debug("REST request to get TipoVagao : {}", id);
        Optional<TipoVagao> tipoVagao = tipoVagaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoVagao);
    }

    /**
     * DELETE  /tipo-vagaos/:id : delete the "id" tipoVagao.
     *
     * @param id the id of the tipoVagao to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tipo-vagaos/{id}")
    @Timed
    public ResponseEntity<Void> deleteTipoVagao(@PathVariable Long id) {
        log.debug("REST request to delete TipoVagao : {}", id);

        tipoVagaoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
