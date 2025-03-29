package org.partidos.model.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "partidos")
public class Partido extends PanacheEntity {

    @NotBlank(message = "O nome do partido é obrigatório")
    @Size(min = 2, max = 100, message = "O nome do partido deve ter entre 2 e 100 caracteres")
    @Column(unique = true, nullable = false)
    private String nome;

    @NotBlank(message = "A sigla do partido é obrigatória")
    @Size(min = 2, max = 20, message = "A sigla do partido deve ter entre 2 e 20 caracteres")
    @Column(unique = true, nullable = false)
    private String sigla;

    @Column(length = 500)
    private String descricao;

    @Column(name = "data_fundacao")
    private String dataFundacao;

    public Partido() {
    }

    public Partido(String nome, String sigla) {
        this.nome = nome;
        this.sigla = sigla;
    }

    public Partido(String nome, String sigla, String descricao, String dataFundacao) {
        this.nome = nome;
        this.sigla = sigla;
        this.descricao = descricao;
        this.dataFundacao = dataFundacao;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSigla() {
        return sigla;
    }

    public void setSigla(String sigla) {
        this.sigla = sigla;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getDataFundacao() {
        return dataFundacao;
    }

    public void setDataFundacao(String dataFundacao) {
        this.dataFundacao = dataFundacao;
    }
}
