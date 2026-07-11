package com.fahd.chatterLink;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.fahd.chatterLink"})
public class ChatterLinkApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChatterLinkApplication.class, args);
	}

}
