package org.politiks.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.politiks.exception.BusinessException;
import org.politiks.exception.ResourceNotFoundException;
import org.politiks.model.dto.CandidatoDTO;
import org.politiks.model.dto.PartidoDTO;
import org.politiks.model.entity.Candidato;
import org.politiks.repository.CandidatoRepository;
import org.politiks.service.client.PartidoClientService;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Serviço para operações com Candidatos.
 * Implementa as regras de negócio e faz a mediação entre a camada de controle e a de persistência.
 * Segue o princípio SRP (Single Responsibility Principle) do SOLID.
 */
@ApplicationScoped
public class CandidatoService {

    private final CandidatoRepository candidatoRepository;
    private final PartidoClientService partidoClientService;

    @Inject
    public CandidatoService(CandidatoRepository candidatoRepository, PartidoClientService partidoClientService) {
        this.candidatoRepository = candidatoRepository;
        this.partidoClientService = partidoClientService;
    }

    /**
     * Lista todos os candidatos.
     *
     * @return Lista de DTOs de candidatos
     */
    public List<CandidatoDTO> listarTodos() {
        return candidatoRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Busca um candidato por ID.
     *
     * @param id ID do candidato
     * @return DTO do candidato
     * @throws ResourceNotFoundException se o candidato não for encontrado
     */
    public CandidatoDTO buscarPorId(Long id) {
        Candidato candidato = candidatoRepository.findByIdOptional(id)
                .orElseThrow(() -> new ResourceNotFoundException("Candidato", id));
        return convertToDTO(candidato);
    }

    /**
     * Lista candidatos por partido.
     *
     * @param partidoId ID do partido
     * @return Lista de DTOs de candidatos
     */
    public List<CandidatoDTO> listarPorPartido(Long partidoId) {
        if (!partidoClientService.existsById(partidoId)) {
            throw new ResourceNotFoundException("Partido", partidoId);
        }
        
        return candidatoRepository.findByPartidoId(partidoId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Cria um novo candidato.
     *
     * @param candidatoDTO DTO com os dados do candidato a ser criado
     * @return DTO do candidato criado
     * @throws BusinessException se o candidato já existir
     * @throws ResourceNotFoundException se o partido não for encontrado
     */
    @Transactional
    public CandidatoDTO criar(CandidatoDTO candidatoDTO) {
        validarCandidato(candidatoDTO);
        
        PartidoDTO partido = partidoClientService.buscarPorId(candidatoDTO.getPartidoId());
        
        Candidato candidato = new Candidato();
        candidato.setNome(candidatoDTO.getNome());
        candidato.setCpf(candidatoDTO.getCpf());
        candidato.setDataNascimento(candidatoDTO.getDataNascimento());
        candidato.setBiografia(candidatoDTO.getBiografia());
        candidato.setCargoPleiteado(candidatoDTO.getCargoPleiteado());
        candidato.setPartidoId(candidatoDTO.getPartidoId());
        
        candidatoRepository.persist(candidato);
        
        CandidatoDTO result = convertToDTO(candidato);
        result.setPartidoNome(partido.getNome());
        result.setPartidoSigla(partido.getSigla());
        
        return result;
    }

    /**
     * Atualiza um candidato existente.
     *
     * @param id ID do candidato
     * @param candidatoDTO DTO com os novos dados do candidato
     * @return DTO do candidato atualizado
     * @throws ResourceNotFoundException se o candidato ou partido não for encontrado
     * @throws BusinessException se o CPF já estiver em uso por outro candidato
     */
    @Transactional
    public CandidatoDTO atualizar(Long id, CandidatoDTO candidatoDTO) {
        Candidato candidato = candidatoRepository.findByIdOptional(id)
                .orElseThrow(() -> new ResourceNotFoundException("Candidato", id));
        
        if (!candidato.getCpf().equals(candidatoDTO.getCpf()) && 
                candidatoRepository.existsByCpf(candidatoDTO.getCpf())) {
            throw new BusinessException("Já existe um candidato com este CPF");
        }
        
        PartidoDTO partido = partidoClientService.buscarPorId(candidatoDTO.getPartidoId());
        
        candidato.setNome(candidatoDTO.getNome());
        candidato.setCpf(candidatoDTO.getCpf());
        candidato.setDataNascimento(candidatoDTO.getDataNascimento());
        candidato.setBiografia(candidatoDTO.getBiografia());
        candidato.setCargoPleiteado(candidatoDTO.getCargoPleiteado());
        candidato.setPartidoId(candidatoDTO.getPartidoId());
        
        candidatoRepository.persist(candidato);
        
        CandidatoDTO result = convertToDTO(candidato);
        result.setPartidoNome(partido.getNome());
        result.setPartidoSigla(partido.getSigla());
        
        return result;
    }

    /**
     * Remove um candidato.
     *
     * @param id ID do candidato
     * @throws ResourceNotFoundException se o candidato não for encontrado
     */
    @Transactional
    public void remover(Long id) {
        Candidato candidato = candidatoRepository.findByIdOptional(id)
                .orElseThrow(() -> new ResourceNotFoundException("Candidato", id));
        
        candidatoRepository.delete(candidato);
    }

    /**
     * Valida os dados de um candidato para criação.
     *
     * @param candidatoDTO DTO do candidato
     * @throws BusinessException se o candidato já existir
     */
    private void validarCandidato(CandidatoDTO candidatoDTO) {
        if (candidatoRepository.existsByCpf(candidatoDTO.getCpf())) {
            throw new BusinessException("Já existe um candidato com este CPF");
        }
    }

    /**
     * Converte uma entidade Candidato para DTO.
     *
     * @param candidato Entidade Candidato
     * @return DTO do candidato
     */
    private CandidatoDTO convertToDTO(Candidato candidato) {
        CandidatoDTO dto = new CandidatoDTO(
                candidato.id,
                candidato.getNome(),
                candidato.getCpf(),
                candidato.getDataNascimento(),
                candidato.getBiografia(),
                candidato.getCargoPleiteado(),
                candidato.getPartidoId()
        );
        
        try {
            PartidoDTO partido = partidoClientService.buscarPorId(candidato.getPartidoId());
            dto.setPartidoNome(partido.getNome());
            dto.setPartidoSigla(partido.getSigla());
        } catch (Exception e) {
        }
        
        return dto;
    }
}
