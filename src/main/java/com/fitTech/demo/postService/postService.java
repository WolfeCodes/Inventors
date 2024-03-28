package com.fitTech.demo.postService;


import java.util.List;
import java.util.Map;


public interface postService {

    //Hashmap meant to represent the results of a request to the API
    List<Map<String, Object>> getPosts();
}
