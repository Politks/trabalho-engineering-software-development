package org.politiks.exception;

/**
 * Exceção lançada quando um recurso não é encontrado.
 * Usada para padronizar o tratamento de recursos não encontrados na API.
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String resource, Long id) {
        super(String.format("%s com ID %d não encontrado", resource, id));
    }

    public ResourceNotFoundException(String resource, String field, String value) {
        super(String.format("%s com %s '%s' não encontrado", resource, field, value));
    }
}
