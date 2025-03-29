package org.politiks.resource;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriBuilder;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.politiks.exception.BusinessException;
import org.politiks.exception.ResourceNotFoundException;
import org.politiks.model.dto.CandidatoDTO;
import org.politiks.service.CandidatoService;

import java.util.List;

/**
 * Endpoints REST para operações com Candidatos
 */
@Path("/candidatos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Candidato", description = "Operações relacionadas a candidatos políticos")
public class CandidatoResource {

    private final CandidatoService candidatoService;

    @Inject
    public CandidatoResource(CandidatoService candidatoService) {
        this.candidatoService = candidatoService;
    }

    @GET
    @Operation(summary = "Lista todos os candidatos",
            description = "Retorna uma lista com todos os candidatos cadastrados")
    @APIResponse(responseCode = "200", 
            description = "Lista de candidatos",
            content = @Content(mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(implementation = CandidatoDTO.class)))
    public Response listarTodos() {
        List<CandidatoDTO> candidatos = candidatoService.listarTodos();
        return Response.ok(candidatos).build();
    }

    @GET
    @Path("/{id}")
    @Operation(summary = "Busca um candidato pelo ID",
            description = "Retorna um candidato específico com base no ID fornecido")
    @APIResponse(responseCode = "200", 
            description = "Candidato encontrado",
            content = @Content(mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(implementation = CandidatoDTO.class)))
    @APIResponse(responseCode = "404", description = "Candidato não encontrado")
    public Response buscarPorId(
            @Parameter(description = "ID do candidato", required = true)
            @PathParam("id") Long id) {
        try {
            CandidatoDTO candidato = candidatoService.buscarPorId(id);
            return Response.ok(candidato).build();
        } catch (ResourceNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ErrorResponse(e.getMessage()))
                    .build();
        }
    }

    @GET
    @Path("/partido/{partidoId}")
    @Operation(summary = "Lista candidatos por partido",
            description = "Retorna uma lista de candidatos do partido especificado")
    @APIResponse(responseCode = "200", 
            description = "Lista de candidatos do partido",
            content = @Content(mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(implementation = CandidatoDTO.class)))
    public Response listarPorPartido(
            @Parameter(description = "ID do partido", required = true)
            @PathParam("partidoId") Long partidoId) {
        List<CandidatoDTO> candidatos = candidatoService.listarPorPartido(partidoId);
        return Response.ok(candidatos).build();
    }

    @POST
    @Operation(summary = "Cria um novo candidato",
            description = "Cria um novo candidato com os dados fornecidos")
    @APIResponse(responseCode = "201", 
            description = "Candidato criado com sucesso",
            content = @Content(mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(implementation = CandidatoDTO.class)))
    @APIResponse(responseCode = "400", description = "Dados inválidos")
    @APIResponse(responseCode = "404", description = "Partido não encontrado")
    public Response criar(@Valid CandidatoDTO candidatoDTO) {
        try {
            CandidatoDTO candidato = candidatoService.criar(candidatoDTO);
            return Response.created(
                    UriBuilder.fromResource(CandidatoResource.class)
                            .path(String.valueOf(candidato.getId()))
                            .build())
                    .entity(candidato)
                    .build();
        } catch (BusinessException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(e.getMessage()))
                    .build();
        } catch (ResourceNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ErrorResponse(e.getMessage()))
                    .build();
        }
    }

    @PUT
    @Path("/{id}")
    @Operation(summary = "Atualiza um candidato",
            description = "Atualiza os dados de um candidato existente")
    @APIResponse(responseCode = "200", 
            description = "Candidato atualizado com sucesso",
            content = @Content(mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(implementation = CandidatoDTO.class)))
    @APIResponse(responseCode = "404", description = "Candidato ou partido não encontrado")
    @APIResponse(responseCode = "400", description = "Dados inválidos")
    public Response atualizar(
            @Parameter(description = "ID do candidato", required = true)
            @PathParam("id") Long id,
            @Valid CandidatoDTO candidatoDTO) {
        try {
            CandidatoDTO candidato = candidatoService.atualizar(id, candidatoDTO);
            return Response.ok(candidato).build();
        } catch (ResourceNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ErrorResponse(e.getMessage()))
                    .build();
        } catch (BusinessException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(e.getMessage()))
                    .build();
        }
    }

    @DELETE
    @Path("/{id}")
    @Operation(summary = "Remove um candidato",
            description = "Remove um candidato com base no ID fornecido")
    @APIResponse(responseCode = "204", description = "Candidato removido com sucesso")
    @APIResponse(responseCode = "404", description = "Candidato não encontrado")
    public Response remover(
            @Parameter(description = "ID do candidato", required = true)
            @PathParam("id") Long id) {
        try {
            candidatoService.remover(id);
            return Response.noContent().build();
        } catch (ResourceNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ErrorResponse(e.getMessage()))
                    .build();
        }
    }

    public static class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
