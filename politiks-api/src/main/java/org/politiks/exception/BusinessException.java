package org.politiks.exception;

/**
 * Exceção lançada quando ocorre uma violação de regra de negócio.
 * Usada para padronizar o tratamento de erros de negócio na API.
 */
public class BusinessException extends RuntimeException {

    public BusinessException(String message) {
        super(message);
    }
}
