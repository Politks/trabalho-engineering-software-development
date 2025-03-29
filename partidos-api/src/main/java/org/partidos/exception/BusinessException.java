package org.partidos.exception;

/**
 * Exceção lançada quando ocorre uma violação de regra de negócio
 */
public class BusinessException extends RuntimeException {
    
    public BusinessException(String message) {
        super(message);
    }
}
