package br.com.rumo.back.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.rumo.back.domain.Vagao;
import br.com.rumo.back.repository.VagaoRepository;
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
 * REST controller for managing Vagao.
 */
@RestController
@RequestMapping("/api")
public class VagaoResource {

    private final Logger log = LoggerFactory.getLogger(VagaoResource.class);

    private static final String ENTITY_NAME = "backVagao";

    private final VagaoRepository vagaoRepository;

    public VagaoResource(VagaoRepository vagaoRepository) {
        this.vagaoRepository = vagaoRepository;
    }

    /**
     * POST  /vagaos : Create a new vagao.
     *
     * @param vagao the vagao to create
     * @return the ResponseEntity with status 201 (Created) and with body the new vagao, or with status 400 (Bad Request) if the vagao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/vagaos")
    @Timed
    public ResponseEntity<Vagao> createVagao(@Valid @RequestBody Vagao vagao) throws URISyntaxException {
        log.debug("REST request to save Vagao : {}", vagao);
        if (vagao.getId() != null) {
            throw new BadRequestAlertException("A new vagao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Vagao result = vagaoRepository.save(vagao);
        return ResponseEntity.created(new URI("/api/vagaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /vagaos : Updates an existing vagao.
     *
     * @param vagao the vagao to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated vagao,
     * or with status 400 (Bad Request) if the vagao is not valid,
     * or with status 500 (Internal Server Error) if the vagao couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/vagaos")
    @Timed
    public ResponseEntity<Vagao> updateVagao(@Valid @RequestBody Vagao vagao) throws URISyntaxException {
        log.debug("REST request to update Vagao : {}", vagao);
        if (vagao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Vagao result = vagaoRepository.save(vagao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, vagao.getId().toString()))
            .body(result);
    }

    /**
     * GET  /vagaos : get all the vagaos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of vagaos in body
     */
    @GetMapping("/vagaos")
    @Timed
    public List<Vagao> getAllVagaos() {
        log.debug("REST request to get all Vagaos");
        return vagaoRepository.findAll();
    }

    /**
     * GET  /vagaos/:id : get the "id" vagao.
     *
     * @param id the id of the vagao to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the vagao, or with status 404 (Not Found)
     */
    @GetMapping("/vagaos/{id}")
    @Timed
    public ResponseEntity<Vagao> getVagao(@PathVariable Long id) {
        log.debug("REST request to get Vagao : {}", id);
        Optional<Vagao> vagao = vagaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(vagao);
    }

    /**
     * DELETE  /vagaos/:id : delete the "id" vagao.
     *
     * @param id the id of the vagao to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/vagaos/{id}")
    @Timed
    public ResponseEntity<Void> deleteVagao(@PathVariable Long id) {
        log.debug("REST request to delete Vagao : {}", id);

        vagaoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
