package com.example.spring1.Errors;

public class NotFoundException extends RuntimeException {

    public NotFoundException() {
        super("Could not find this.");
    }

}
