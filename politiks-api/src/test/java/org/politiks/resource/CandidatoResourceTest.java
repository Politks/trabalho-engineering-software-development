package org.politiks.resource;

import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.junit.mockito.InjectMock;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.politiks.exception.BusinessException;
import org.politiks.exception.ResourceNotFoundException;
import org.politiks.model.dto.CandidatoDTO;
import org.politiks.service.CandidatoService;

import java.util.Arrays;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;

@QuarkusTest
public class CandidatoResourceTest {

    @InjectMock
    CandidatoService candidatoService;

    @Test
    public void testListarTodos() {
        // Arrange - Preparação do cenário de teste
        CandidatoDTO candidato1 = new CandidatoDTO();
        candidato1.setId(1L);
        candidato1.setNome("João Silva");
        candidato1.setCpf("12345678901");
        candidato1.setCargoPleiteado("Vereador");
        candidato1.setPartidoId(1L);

        CandidatoDTO candidato2 = new CandidatoDTO();
        candidato2.setId(2L);
        candidato2.setNome("Maria Souza");
        candidato2.setCpf("98765432101");
        candidato2.setCargoPleiteado("Prefeita");
        candidato2.setPartidoId(2L);

        List<CandidatoDTO> candidatos = Arrays.asList(candidato1, candidato2);
        
        // Mock do serviço
        Mockito.when(candidatoService.listarTodos()).thenReturn(candidatos);

        // Act & Assert - Execução e verificação
        given()
            .when()
            .get("/candidatos")
            .then()
            .statusCode(200)
            .body("", hasSize(2))
            .body("[0].id", is(1))
            .body("[0].nome", is("João Silva"))
            .body("[0].cargoPleiteado", is("Vereador"))
            .body("[1].id", is(2))
            .body("[1].nome", is("Maria Souza"))
            .body("[1].cargoPleiteado", is("Prefeita"));
    }

    @Test
    public void testBuscarPorIdExistente() {
        // Arrange
        Long id = 1L;
        CandidatoDTO candidato = new CandidatoDTO();
        candidato.setId(id);
        candidato.setNome("João Silva");
        candidato.setCpf("12345678901");
        candidato.setCargoPleiteado("Vereador");
        candidato.setPartidoId(1L);
        
        // Mock do serviço
        Mockito.when(candidatoService.buscarPorId(id)).thenReturn(candidato);

        // Act & Assert
        given()
            .when()
            .get("/candidatos/{id}", id)
            .then()
            .statusCode(200)
            .body("id", is(1))
            .body("nome", is("João Silva"))
            .body("cargoPleiteado", is("Vereador"));
    }

    @Test
    public void testBuscarPorIdInexistente() {
        // Arrange
        Long id = 999L;
        
        // Mock do serviço para lançar exceção
        Mockito.when(candidatoService.buscarPorId(id))
            .thenThrow(new ResourceNotFoundException("Candidato", id));

        // Act & Assert
        given()
            .when()
            .get("/candidatos/{id}", id)
            .then()
            .statusCode(404);
    }

    @Test
    public void testListarPorPartido() {
        // Arrange
        Long partidoId = 1L;
        
        CandidatoDTO candidato1 = new CandidatoDTO();
        candidato1.setId(1L);
        candidato1.setNome("João Silva");
        candidato1.setCpf("12345678901");
        candidato1.setCargoPleiteado("Vereador");
        candidato1.setPartidoId(partidoId);

        CandidatoDTO candidato2 = new CandidatoDTO();
        candidato2.setId(3L);
        candidato2.setNome("Pedro Santos");
        candidato2.setCpf("45678912301");
        candidato2.setCargoPleiteado("Deputado");
        candidato2.setPartidoId(partidoId);

        List<CandidatoDTO> candidatos = Arrays.asList(candidato1, candidato2);
        
        // Mock do serviço
        Mockito.when(candidatoService.listarPorPartido(partidoId)).thenReturn(candidatos);

        // Act & Assert
        given()
            .when()
            .get("/candidatos/partido/{partidoId}", partidoId)
            .then()
            .statusCode(200)
            .body("", hasSize(2))
            .body("[0].id", is(1))
            .body("[0].nome", is("João Silva"))
            .body("[1].id", is(3))
            .body("[1].nome", is("Pedro Santos"));
    }

    @Test
    public void testCriarCandidatoValido() {
        // Arrange
        CandidatoDTO candidatoRequest = new CandidatoDTO();
        candidatoRequest.setNome("Novo Candidato");
        candidatoRequest.setCpf("11122233344");
        candidatoRequest.setDataNascimento("15/05/1980");
        candidatoRequest.setCargoPleiteado("Senador");
        candidatoRequest.setPartidoId(1L);

        CandidatoDTO candidatoResponse = new CandidatoDTO();
        candidatoResponse.setId(5L);
        candidatoResponse.setNome("Novo Candidato");
        candidatoResponse.setCpf("11122233344");
        candidatoResponse.setDataNascimento("15/05/1980");
        candidatoResponse.setCargoPleiteado("Senador");
        candidatoResponse.setPartidoId(1L);
        
        // Mock do serviço
        Mockito.when(candidatoService.criar(Mockito.any(CandidatoDTO.class))).thenReturn(candidatoResponse);

        // Act & Assert
        given()
            .contentType(ContentType.JSON)
            .body(candidatoRequest)
            .when()
            .post("/candidatos")
            .then()
            .statusCode(201)
            .body("id", is(5))
            .body("nome", is("Novo Candidato"))
            .body("cargoPleiteado", is("Senador"));
    }

    @Test
    public void testCriarCandidatoInvalido() {
        // Arrange
        CandidatoDTO candidatoRequest = new CandidatoDTO();
        candidatoRequest.setNome("Candidato Inválido");
        candidatoRequest.setCpf("11122233344");
        // Faltando partidoId, que é obrigatório
        
        // Mock do serviço para lançar exceção
        Mockito.when(candidatoService.criar(Mockito.any(CandidatoDTO.class)))
            .thenThrow(new BusinessException("Partido não informado"));

        // Act & Assert
        given()
            .contentType(ContentType.JSON)
            .body(candidatoRequest)
            .when()
            .post("/candidatos")
            .then()
            .statusCode(400);
    }

    @Test
    public void testAtualizarCandidatoValido() {
        // Arrange
        Long id = 1L;
        CandidatoDTO candidatoRequest = new CandidatoDTO();
        candidatoRequest.setNome("João Silva Atualizado");
        candidatoRequest.setCpf("12345678901");
        candidatoRequest.setCargoPleiteado("Deputado");
        candidatoRequest.setPartidoId(1L);

        CandidatoDTO candidatoResponse = new CandidatoDTO();
        candidatoResponse.setId(id);
        candidatoResponse.setNome("João Silva Atualizado");
        candidatoResponse.setCpf("12345678901");
        candidatoResponse.setCargoPleiteado("Deputado");
        candidatoResponse.setPartidoId(1L);
        
        // Mock do serviço
        Mockito.when(candidatoService.atualizar(Mockito.eq(id), Mockito.any(CandidatoDTO.class)))
            .thenReturn(candidatoResponse);

        // Act & Assert
        given()
            .contentType(ContentType.JSON)
            .body(candidatoRequest)
            .when()
            .put("/candidatos/{id}", id)
            .then()
            .statusCode(200)
            .body("id", is(1))
            .body("nome", is("João Silva Atualizado"))
            .body("cargoPleiteado", is("Deputado"));
    }

    @Test
    public void testRemoverCandidato() {
        // Arrange
        Long id = 1L;
        
        // Mock do serviço (não faz nada quando o método é chamado)
        Mockito.doNothing().when(candidatoService).remover(id);

        // Act & Assert
        given()
            .when()
            .delete("/candidatos/{id}", id)
            .then()
            .statusCode(204);
    }
}
