package org.politiks.service.client;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.politiks.exception.ResourceNotFoundException;
import org.politiks.model.dto.PartidoDTO;

/**
 * Serviço cliente para comunicação com a API de partidos
 * Implementa o padrão Client-Server e o princípio de Separação de Responsabilidades (SRP) do SOLID
 */
@ApplicationScoped
public class PartidoClientService {

    @Inject
    @RestClient
    private PartidoRestClient partidoClient;

    /**
     * Verifica se um partido existe pelo ID
     * @param id ID do partido
     * @return true se o partido existe, false caso contrário
     */
    public boolean existsById(Long id) {
        try {
            partidoClient.buscarPorId(id);
            return true;
        } catch (WebApplicationException e) {
            if (e.getResponse().getStatus() == Response.Status.NOT_FOUND.getStatusCode()) {
                return false;
            }
            throw e;
        }
    }

    /**
     * Busca um partido pelo ID
     * @param id ID do partido
     * @return DTO do partido
     * @throws ResourceNotFoundException se o partido não for encontrado
     */
    public PartidoDTO buscarPorId(Long id) {
        try {
            return partidoClient.buscarPorId(id);
        } catch (WebApplicationException e) {
            if (e.getResponse().getStatus() == Response.Status.NOT_FOUND.getStatusCode()) {
                throw new ResourceNotFoundException("Partido", id);
            }
            throw e;
        }
    }

    /**
     * Interface para o cliente REST da API de partidos
     * Utiliza o padrão de interface para desacoplar a implementação do cliente
     */
    @RegisterRestClient(configKey = "partido-api")
    @Path("/partidos")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public interface PartidoRestClient {
        
        @GET
        @Path("/{id}")
        PartidoDTO buscarPorId(@PathParam("id") Long id);
    }
}
