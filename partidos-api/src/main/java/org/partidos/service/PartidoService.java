package org.partidos.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.partidos.exception.BusinessException;
import org.partidos.exception.ResourceNotFoundException;
import org.partidos.model.dto.PartidoDTO;
import org.partidos.model.entity.Partido;
import org.partidos.repository.PartidoRepository;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class PartidoService {

    private final PartidoRepository partidoRepository;

    @Inject
    public PartidoService(PartidoRepository partidoRepository) {
        this.partidoRepository = partidoRepository;
    }

    /**
     * Lista todos os partidos
     * @return Lista de DTOs de partidos
     */
    public List<PartidoDTO> listarTodos() {
        return partidoRepository.listAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Busca um partido pelo ID
     * @param id ID do partido
     * @return DTO do partido
     * @throws ResourceNotFoundException se o partido não for encontrado
     */
    public PartidoDTO buscarPorId(Long id) {
        Partido partido = partidoRepository.findById(id);
        if (partido == null) {
            throw new ResourceNotFoundException("Partido", id);
        }
        return toDTO(partido);
    }

    /**
     * Cria um novo partido
     * @param partidoDTO DTO com os dados do partido
     * @return DTO do partido criado
     * @throws BusinessException se já existir um partido com o mesmo nome ou sigla
     */
    @Transactional
    public PartidoDTO criar(PartidoDTO partidoDTO) {
`        if (partidoRepository.findByNome(partidoDTO.getNome()) != null) {
            throw new BusinessException("Já existe um partido com o nome " + partidoDTO.getNome());
        }
        if (partidoRepository.findBySigla(partidoDTO.getSigla()) != null) {
            throw new BusinessException("Já existe um partido com a sigla " + partidoDTO.getSigla());
        }

        Partido partido = toEntity(partidoDTO);
        partidoRepository.persist(partido);
        return toDTO(partido);
    }

    /**
     * Atualiza um partido existente
     * @param id ID do partido a ser atualizado
     * @param partidoDTO DTO com os novos dados
     * @return DTO do partido atualizado
     * @throws ResourceNotFoundException se o partido não for encontrado
     * @throws BusinessException se já existir outro partido com o mesmo nome ou sigla
     */
    @Transactional
    public PartidoDTO atualizar(Long id, PartidoDTO partidoDTO) {
        Partido partido = partidoRepository.findById(id);
        if (partido == null) {
            throw new ResourceNotFoundException("Partido", id);
        }

        Partido partidoComMesmoNome = partidoRepository.findByNome(partidoDTO.getNome());
        if (partidoComMesmoNome != null && !partidoComMesmoNome.id.equals(id)) {
            throw new BusinessException("Já existe um partido com o nome " + partidoDTO.getNome());
        }

        Partido partidoComMesmaSigla = partidoRepository.findBySigla(partidoDTO.getSigla());
        if (partidoComMesmaSigla != null && !partidoComMesmaSigla.id.equals(id)) {
            throw new BusinessException("Já existe um partido com a sigla " + partidoDTO.getSigla());
        }

        partido.setNome(partidoDTO.getNome());
        partido.setSigla(partidoDTO.getSigla());
        partido.setDescricao(partidoDTO.getDescricao());
        partido.setDataFundacao(partidoDTO.getDataFundacao());

        return toDTO(partido);
    }

    /**
     * Remove um partido
     * @param id ID do partido a ser removido
     * @throws ResourceNotFoundException se o partido não for encontrado
     */
    @Transactional
    public void remover(Long id) {
        Partido partido = partidoRepository.findById(id);
        if (partido == null) {
            throw new ResourceNotFoundException("Partido", id);
        }
        partidoRepository.delete(partido);
    }

    /**
     * Converte uma entidade Partido para DTO
     * @param partido Entidade a ser convertida
     * @return DTO correspondente
     */
    private PartidoDTO toDTO(Partido partido) {
        return new PartidoDTO(
                partido.id,
                partido.getNome(),
                partido.getSigla(),
                partido.getDescricao(),
                partido.getDataFundacao()
        );
    }

    /**
     * Converte um DTO para entidade Partido
     * @param dto DTO a ser convertido
     * @return Entidade correspondente
     */
    private Partido toEntity(PartidoDTO dto) {
        Partido partido = new Partido(
                dto.getNome(),
                dto.getSigla(),
                dto.getDescricao(),
                dto.getDataFundacao()
        );
        return partido;
    }
}
