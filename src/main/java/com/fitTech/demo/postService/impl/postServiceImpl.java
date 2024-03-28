package com.fitTech.demo.postService.impl;

import com.fitTech.demo.postService.postService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class postServiceImpl implements postService {

    //Base URL for making requests to Edamam API
    String baseURL = "https://api.edamam.com/api/recipes/v2";

    //StringBuilder to contain URL that we will pass into the exchange method
    StringBuilder str = new StringBuilder(baseURL);
    @Autowired
    private RestTemplate restTemplate;

    //Importing method from postService
    @Override
    public List<Map<String, Object>> getPosts() {

        //Declaring HttpEntity
        //HttpEntity contains both the header and the payload for our request to the API. Currently there is just a
        //header, as I am testing a GET request which requires no payload.
        HttpEntity <Void> httpEntity = new HttpEntity<>(getHttpHeaders());


        //Setting final url
        //Commented out code is important to actually doing useful get requests, what this is currently is just a test
        String url = str.toString(); //.append().toString();
        var response = restTemplate.exchange(url, HttpMethod.GET, httpEntity, List.class);
        return response.getBody();
    }



    //Setting HTTP Headers
    private HttpHeaders getHttpHeaders(){
        HttpHeaders headers = new HttpHeaders();

        //Creates a header that says to accept JSON
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }
}
