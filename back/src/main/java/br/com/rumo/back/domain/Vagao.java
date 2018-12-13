package br.com.rumo.back.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Vagao.
 */
@Entity
@Table(name = "vagao")
public class Vagao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "codigo", nullable = false, unique = true)
    private String codigo;

    @NotNull
    @Column(name = "descricao", nullable = false)
    private String descricao;

    @NotNull
    @Column(name = "altura", nullable = false)
    private String altura;

    @NotNull
    @Column(name = "comprimento", nullable = false)
    private String comprimento;

    @NotNull
    @Column(name = "largura", nullable = false)
    private String largura;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private TipoVagao tipoVagao;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public Vagao codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getDescricao() {
        return descricao;
    }

    public Vagao descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getAltura() {
        return altura;
    }

    public Vagao altura(String altura) {
        this.altura = altura;
        return this;
    }

    public void setAltura(String altura) {
        this.altura = altura;
    }

    public String getComprimento() {
        return comprimento;
    }

    public Vagao comprimento(String comprimento) {
        this.comprimento = comprimento;
        return this;
    }

    public void setComprimento(String comprimento) {
        this.comprimento = comprimento;
    }

    public String getLargura() {
        return largura;
    }

    public Vagao largura(String largura) {
        this.largura = largura;
        return this;
    }

    public void setLargura(String largura) {
        this.largura = largura;
    }

    public TipoVagao getTipoVagao() {
        return tipoVagao;
    }

    public Vagao tipoVagao(TipoVagao tipoVagao) {
        this.tipoVagao = tipoVagao;
        return this;
    }

    public void setTipoVagao(TipoVagao tipoVagao) {
        this.tipoVagao = tipoVagao;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Vagao vagao = (Vagao) o;
        if (vagao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vagao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Vagao{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", altura='" + getAltura() + "'" +
            ", comprimento='" + getComprimento() + "'" +
            ", largura='" + getLargura() + "'" +
            "}";
    }
}
