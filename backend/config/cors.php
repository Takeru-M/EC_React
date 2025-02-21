<?php

return [
  'paths' => ['api/*', 'sanctum/csrf-cookie', '/signup', '/signin', '/signout'],
  'allowed_methods' => ['*'],
  'allowed_origins' => ['http://localhost:3001', 'http://localhost:8001', 'http://react_frontend:3001', 'http://react_frontend:3000', 'http://laravel_app:8001', 'http://laravel_app:8000'],
  'allowed_origins_patterns' => [],
  'allowed_headers' => ['*'],
  'exposed_headers' => [],
  'max_age' => 0,
  'supports_credentials' => true,
];
