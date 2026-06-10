package com.codex;

import com.codex.service.UserService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {

        ApplicationContext context = SpringApplication.run(Application.class, args);

        UserService bean = context.getBean(UserService.class);

        System.out.println(bean);

        System.out.println("Spring Boot Running Successfully...");
    }

}
