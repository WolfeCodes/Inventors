package com.fitTech.demo.postService.impl;

import com.fitTech.demo.postService.postService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class postServiceImpl implements postService {

    //Base URL for making requests to edamam API
    String baseURL = "https://api.edamam.com/api/recipes/v2";

    //StringBuilder to contain URL that we will pass into the exchange method
    StringBuilder str = new StringBuilder();
    @Autowired
    private RestTemplate restTemplate;

    //Importing method from postService
    @Override
    public List<Map<String, Object>> getPosts() {
        return restTemplate.exchange();
    }
}
