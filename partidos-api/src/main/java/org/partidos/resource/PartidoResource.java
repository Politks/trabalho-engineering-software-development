package org.partidos.resource;

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
import org.partidos.exception.BusinessException;
import org.partidos.exception.ResourceNotFoundException;
import org.partidos.model.dto.PartidoDTO;
import org.partidos.service.PartidoService;

import java.util.List;

@Path("/partidos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Partido", description = "Operações relacionadas a partidos políticos")
public class PartidoResource {

    private final PartidoService partidoService;

    @Inject
    public PartidoResource(PartidoService partidoService) {
        this.partidoService = partidoService;
    }

    @GET
    @Operation(summary = "Lista todos os partidos",
            description = "Retorna uma lista com todos os partidos cadastrados")
    @APIResponse(responseCode = "200", 
            description = "Lista de partidos",
            content = @Content(mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(implementation = PartidoDTO.class)))
    public Response listarTodos() {
        List<PartidoDTO> partidos = partidoService.listarTodos();
        return Response.ok(partidos).build();
    }

    @GET
    @Path("/{id}")
    @Operation(summary = "Busca um partido pelo ID",
            description = "Retorna um partido específico com base no ID fornecido")
    @APIResponse(responseCode = "200", 
            description = "Partido encontrado",
            content = @Content(mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(implementation = PartidoDTO.class)))
    @APIResponse(responseCode = "404", description = "Partido não encontrado")
    public Response buscarPorId(
            @Parameter(description = "ID do partido", required = true)
            @PathParam("id") Long id) {
        try {
            PartidoDTO partido = partidoService.buscarPorId(id);
            return Response.ok(partido).build();
        } catch (ResourceNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ErrorResponse(e.getMessage()))
                    .build();
        }
    }

    @POST
    @Operation(summary = "Cria um novo partido",
            description = "Cria um novo partido com os dados fornecidos")
    @APIResponse(responseCode = "201", 
            description = "Partido criado com sucesso",
            content = @Content(mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(implementation = PartidoDTO.class)))
    @APIResponse(responseCode = "400", description = "Dados inválidos")
    public Response criar(@Valid PartidoDTO partidoDTO) {
        try {
            PartidoDTO partido = partidoService.criar(partidoDTO);
            return Response.created(
                    UriBuilder.fromResource(PartidoResource.class)
                            .path(String.valueOf(partido.getId()))
                            .build())
                    .entity(partido)
                    .build();
        } catch (BusinessException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(e.getMessage()))
                    .build();
        }
    }

    @PUT
    @Path("/{id}")
    @Operation(summary = "Atualiza um partido",
            description = "Atualiza os dados de um partido existente")
    @APIResponse(responseCode = "200", 
            description = "Partido atualizado com sucesso",
            content = @Content(mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(implementation = PartidoDTO.class)))
    @APIResponse(responseCode = "404", description = "Partido não encontrado")
    @APIResponse(responseCode = "400", description = "Dados inválidos")
    public Response atualizar(
            @Parameter(description = "ID do partido", required = true)
            @PathParam("id") Long id,
            @Valid PartidoDTO partidoDTO) {
        try {
            PartidoDTO partido = partidoService.atualizar(id, partidoDTO);
            return Response.ok(partido).build();
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
    @Operation(summary = "Remove um partido",
            description = "Remove um partido com base no ID fornecido")
    @APIResponse(responseCode = "204", description = "Partido removido com sucesso")
    @APIResponse(responseCode = "404", description = "Partido não encontrado")
    @APIResponse(responseCode = "400", description = "Não é possível remover o partido")
    public Response remover(
            @Parameter(description = "ID do partido", required = true)
            @PathParam("id") Long id) {
        try {
            partidoService.remover(id);
            return Response.noContent().build();
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
