package org.partidos.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.partidos.model.entity.Partido;

@ApplicationScoped
public class PartidoRepository implements PanacheRepository<Partido> {
    
    /**
     * Busca um partido pela sigla
     * @param sigla Sigla do partido
     * @return Partido encontrado ou null
     */
    public Partido findBySigla(String sigla) {
        return find("sigla", sigla).firstResult();
    }
    
    /**
     * Busca um partido pelo nome
     * @param nome Nome do partido
     * @return Partido encontrado ou null
     */
    public Partido findByNome(String nome) {
        return find("nome", nome).firstResult();
    }
}
