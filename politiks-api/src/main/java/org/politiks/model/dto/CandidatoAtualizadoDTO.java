package org.politiks.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * DTO para transferência de dados de Candidato
 * Versão atualizada que referencia o partido pelo ID em vez de usar a entidade Partido.
 */
public class CandidatoAtualizadoDTO {
    
    private Long id;
    
    @NotBlank(message = "O nome do candidato é obrigatório")
    @Size(min = 3, max = 100, message = "O nome do candidato deve ter entre 3 e 100 caracteres")
    private String nome;
    
    @NotBlank(message = "O CPF do candidato é obrigatório")
    @Size(min = 11, max = 14, message = "O CPF deve ter entre 11 e 14 caracteres")
    private String cpf;
    
    private String dataNascimento;
    
    private String biografia;
    
    private String cargoPleiteado;
    
    @NotNull(message = "O ID do partido é obrigatório")
    private Long partidoId;
    
    // Construtores
    public CandidatoAtualizadoDTO() {
    }
    
    public CandidatoAtualizadoDTO(Long id, String nome, String cpf, String dataNascimento, 
                           String biografia, String cargoPleiteado, Long partidoId) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.biografia = biografia;
        this.cargoPleiteado = cargoPleiteado;
        this.partidoId = partidoId;
    }
    
    // Getters e Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
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
