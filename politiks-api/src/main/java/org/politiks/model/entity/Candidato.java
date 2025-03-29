package org.politiks.model.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * Entidade que representa um candidato político no sistema.
 */
@Entity
@Table(name = "candidatos")
public class Candidato extends PanacheEntity {

    @NotBlank(message = "O nome do candidato é obrigatório")
    @Size(min = 3, max = 100, message = "O nome do candidato deve ter entre 3 e 100 caracteres")
    @Column(nullable = false)
    private String nome;

    @NotBlank(message = "O CPF do candidato é obrigatório")
    @Size(min = 11, max = 14, message = "O CPF deve ter entre 11 e 14 caracteres")
    @Column(unique = true, nullable = false)
    private String cpf;

    @Column(name = "data_nascimento")
    private String dataNascimento;

    @Column(length = 500)
    private String biografia;

    @Column(name = "cargo_pleiteado")
    private String cargoPleiteado;

    @NotNull(message = "O candidato deve estar vinculado a um partido")
    @Column(name = "partido_id", nullable = false)
    private Long partidoId;

    // Construtores
    public Candidato() {
    }

    public Candidato(String nome, String cpf, Long partidoId) {
        this.nome = nome;
        this.cpf = cpf;
        this.partidoId = partidoId;
    }

    public Candidato(String nome, String cpf, String dataNascimento, String biografia, 
                    String cargoPleiteado, Long partidoId) {
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.biografia = biografia;
        this.cargoPleiteado = cargoPleiteado;
        this.partidoId = partidoId;
    }

    // Getters e Setters
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(String dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getBiografia() {
        return biografia;
    }

    public void setBiografia(String biografia) {
        this.biografia = biografia;
    }

    public String getCargoPleiteado() {
        return cargoPleiteado;
    }

    public void setCargoPleiteado(String cargoPleiteado) {
        this.cargoPleiteado = cargoPleiteado;
    }

    public Long getPartidoId() {
        return partidoId;
    }

    public void setPartidoId(Long partidoId) {
        this.partidoId = partidoId;
    }
}
