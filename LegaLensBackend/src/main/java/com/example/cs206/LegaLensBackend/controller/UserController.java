// package com.example.cs206.LegaLensBackend.controller;
// import org.springframework.http.HttpStatus;

// import com.example.cs206.LegaLensBackend.model.User;
// import com.example.cs206.LegaLensBackend.service.UserService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.net.http.HttpHeaders;
// import java.util.Optional;

// @RestController
// @RequestMapping("/api/users")
// public class UserController {
//     private final UserService userService;

//     @Autowired
//     public UserController(UserService userService) {
//         this.userService = userService;
//     }

//     @GetMapping("/{userId}")
//     public ResponseEntity<User> getUserBbyId(@PathVariable String userId) {
//         try {
//             Optional<User> user = userService.getUserById(userId);
//             if (user.isPresent()) {
//                 return ResponseEntity.ok(user.get());
//             } else {
//                 return ResponseEntity.notFound().build();
//             }
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//         }
//     }


// }

