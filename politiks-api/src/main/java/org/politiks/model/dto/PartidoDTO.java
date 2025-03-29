package org.politiks.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * DTO para transferência de dados de Partido entre a API e o cliente.
 * Segue o padrão DTO para desacoplar a API da camada de domínio.
 */
public class PartidoDTO {
    
    private Long id;
    
    @NotBlank(message = "O nome do partido é obrigatório")
    @Size(min = 2, max = 100, message = "O nome do partido deve ter entre 2 e 100 caracteres")
    private String nome;
    
    @NotBlank(message = "A sigla do partido é obrigatória")
    @Size(min = 2, max = 20, message = "A sigla do partido deve ter entre 2 e 20 caracteres")
    private String sigla;
    
    private String descricao;
    
    private String dataFundacao;
    
    // Construtores
    public PartidoDTO() {
    }
    
    public PartidoDTO(Long id, String nome, String sigla, String descricao, String dataFundacao) {
        this.id = id;
        this.nome = nome;
        this.sigla = sigla;
        this.descricao = descricao;
        this.dataFundacao = dataFundacao;
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
