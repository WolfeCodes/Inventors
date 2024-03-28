package com.fitTech.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class DemoApplication {




	//Creating Bean of RestTemplate
	@Bean
	public RestTemplate restTemplate(){
		//Creating instance of RestTemplate
		return new RestTemplate();
	}

	public static void main(String[] args) {

		SpringApplication.run(DemoApplication.class, args);

	}

}