package org.politiks.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.politiks.model.entity.Candidato;

import java.util.List;
import java.util.Optional;

/**
 * Repositório para a entidade Candidato.
 * Implementa o padrão Repository com Panache para facilitar as operações de persistência.
 */
@ApplicationScoped
public class CandidatoRepository implements PanacheRepository<Candidato> {
    
    /**
     * Busca um candidato por CPF.
     * 
     * @param cpf CPF do candidato
     * @return Optional de Candidato
     */
    public Optional<Candidato> findByCpf(String cpf) {
        return find("cpf", cpf).firstResultOptional();
    }
    
    /**
     * Busca candidatos por partido ID.
     * 
     * @param partidoId ID do partido
     * @return Lista de candidatos do partido
     */
    public List<Candidato> findByPartidoId(Long partidoId) {
        return list("partidoId", partidoId);
    }
    
    /**
     * Busca candidatos por cargo pleiteado.
     * 
     * @param cargo Cargo pleiteado
     * @return Lista de candidatos por cargo
     */
    public List<Candidato> findByCargoPleiteado(String cargo) {
        return list("cargoPleiteado", cargo);
    }
    
    /**
     * Verifica se existe um candidato com o CPF especificado.
     * 
     * @param cpf CPF do candidato
     * @return true se existir, false caso contrário
     */
    public boolean existsByCpf(String cpf) {
        return count("cpf", cpf) > 0;
    }
}
