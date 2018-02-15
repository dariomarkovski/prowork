package com.dariomarkovski.finki.prowork;

import com.dariomarkovski.finki.prowork.security.JwtFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.dariomarkovski.finki.prowork.repository")
public class ProworkApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProworkApplication.class, args);
    }

    @Bean
    public FilterRegistrationBean jwtFilter() {
        final FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        filterRegistrationBean.setFilter(new JwtFilter());
        filterRegistrationBean.addUrlPatterns("/api/issue/*");
        filterRegistrationBean.addUrlPatterns("/api/user/*");
        filterRegistrationBean.addUrlPatterns("/api/comment/*");
        return filterRegistrationBean;
    }
}
